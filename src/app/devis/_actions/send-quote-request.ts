'use server'

import { z } from 'zod'
import { adminDb } from '@/firebase/admin'
import { Resend } from 'resend'
import QuoteRequestAdminEmail from '@/emails/quote-request-admin'
import QuoteRequestClientEmail from '@/emails/quote-request-client'

const formSchema = z.object({
  clientName: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères.' }),
  clientEmail: z.string().email({ message: 'Veuillez saisir une adresse email valide.' }),
  clientPhone: z.string().optional(),
  projectDescription: z
    .string()
    .min(40, { message: 'La description doit contenir au moins 40 caractères.' })
    .max(2000, { message: 'La description ne doit pas dépasser 2000 caractères.' }),
})

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = 'ERG Rénovation <contact@erg-renovation.fr>'
const ADMIN_EMAIL = 'contact@erg-renovation.fr'

export async function sendQuoteRequest(formData: unknown) {
  const parsed = formSchema.safeParse(formData)

  if (!parsed.success) {
    const errorMessages = parsed.error.issues.map((issue) => issue.message).join(', ')
    return { success: false, error: errorMessages }
  }

  const data = parsed.data

  try {
    const newRequestRef = await adminDb.collection('quoteRequests').add({
      ...data,
      createdAt: new Date(),
      status: 'Nouvelle Demande',
    })

    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `Nouvelle demande de devis de ${data.clientName}`,
        react: QuoteRequestAdminEmail({
          ...data,
          clientPhone: data.clientPhone || null,
          quoteRequestId: newRequestRef.id,
        }),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: data.clientEmail,
        subject: 'Confirmation de votre demande de devis',
        react: QuoteRequestClientEmail({ clientName: data.clientName }),
      }),
    ])

    return { success: true }
  } catch (error: any) {
    console.error("Erreur lors de la création de la demande de devis :", error)
    return { success: false, error: error.message || "Une erreur interne est survenue." }
  }
}
