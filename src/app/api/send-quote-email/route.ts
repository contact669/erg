import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import QuoteRequestAdminEmail from "@/emails/quote-request-admin"
import QuoteRequestClientEmail from "@/emails/quote-request-client"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const ADMIN_EMAIL = "contact@erg-renovation.fr"
const FROM_EMAIL = "ERG Rénovation <contact@erg-renovation.fr>"

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("RESEND_API_KEY is missing (server env).")
      return NextResponse.json(
        { error: "Server misconfiguration: RESEND_API_KEY missing." },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)

    const body = await req.json()
    const { clientName, clientEmail, clientPhone, projectDescription } = body

    if (!clientName || !clientEmail || !projectDescription) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

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
      // on ne throw pas : on renvoie success (comme ton intention)
    }

    if ((clientResult as any)?.error) {
      console.error("Resend client email error:", (clientResult as any).error)
      // on ne throw pas : même logique
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
