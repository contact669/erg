import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import QuoteRequestAdminEmail from "@/emails/quote-request-admin"
import QuoteRequestClientEmail from "@/emails/quote-request-client"
import { quoteRequestSchema } from '@/lib/quote-request-schema'
import { clientIp, isRateLimited } from '@/lib/server/rate-limit'

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const ADMIN_EMAIL = "contact@erg-renovation.fr"
const FROM_EMAIL = "ERG Rénovation <contact@erg-renovation.fr>"

export async function POST(req: NextRequest) {
  // A visitor rarely sends more than one or two requests; this stops the route being used to mass-mail.
  if (isRateLimited(`quote:${clientIp(req)}`, 3, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Trop de demandes envoyées. Merci de nous appeler directement.' }, { status: 429 })
  }
  try {
    let body: unknown
    try { body = await req.json() } catch {
      return NextResponse.json({ error: 'Demande invalide.' }, { status: 400 })
    }
    const parsed = quoteRequestSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: 'Veuillez vérifier les informations de votre demande.' }, { status: 400 })
    const { clientName, clientEmail, clientPhone, projectDescription } = parsed.data
    if (isRateLimited(`quote-email:${clientEmail.toLowerCase()}`, 2, 24 * 60 * 60 * 1000)) {
      return NextResponse.json({ error: 'Une demande a déjà été envoyée avec cette adresse aujourd’hui.' }, { status: 429 })
    }
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("RESEND_API_KEY is missing (server env).")
      return NextResponse.json(
        { error: "La notification email est momentanément indisponible." },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)

    const adminEmailPromise = resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject: `Nouvelle demande de devis de ${clientName}`,
      react: QuoteRequestAdminEmail({
        clientName,
        clientEmail,
        clientPhone,
        projectDescription,
      }),
    })

    const clientEmailPromise = resend.emails.send({
      from: FROM_EMAIL,
      to: [clientEmail],
      subject: "Confirmation de votre demande de devis",
      react: QuoteRequestClientEmail({ clientName }),
    })

    const [adminResult, clientResult] = await Promise.all([
      adminEmailPromise,
      clientEmailPromise,
    ])

    if ((adminResult as any)?.error) {
      console.error("Resend admin email error:", (adminResult as any).error)
    }

    if ((clientResult as any)?.error) {
      console.error("Resend client email error:", (clientResult as any).error)
    }

    if (adminResult.error || clientResult.error) {
      return NextResponse.json({ success: false, error: 'Une notification email n’a pas pu être envoyée.' }, { status: 502 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API send-quote-email error:", error)
    return NextResponse.json(
      { error: "Failed to send emails." },
      { status: 500 }
    )
  }
}
