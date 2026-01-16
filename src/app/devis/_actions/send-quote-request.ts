'use server'

import * as React from 'react'
import { Resend } from 'resend'
import * as z from 'zod'
import { adminDb } from '@/firebase/admin'
import { Timestamp } from 'firebase-admin/firestore'

import QuoteRequestAdminEmail from '@/emails/quote-request-admin'
import QuoteRequestClientEmail from '@/emails/quote-request-client'

const resend = new Resend(process.env.RESEND_API_KEY)

const formSchema = z.object({
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
  clientPhone: z.string().optional(),
  projectDescription: z.string().min(40),
})

const ADMIN_EMAIL = 'contact@erg-renovation.fr'

export async function sendQuoteRequest(data: unknown) {
  // 1. Validate data
  const parsed = formSchema.safeParse(data)

  if (!parsed.success) {
    console.error('Invalid form data:', parsed.error)
    return { success: false, error: 'Données invalides.' }
  }

  const { clientName, clientEmail, clientPhone, projectDescription } = parsed.data
  let newRequestId = ''

  // 2. Save to Firestore
  try {
    const newRequest = await adminDb.collection('quoteRequests').add({
      clientName,
      clientEmail,
      clientPhone: clientPhone || null,
      projectDescription,
      status: 'Nouvelle Demande',
      createdAt: Timestamp.now(),
    })
    newRequestId = newRequest.id
  } catch (error) {
    console.error('Erreur Firestore:', error)
    const errorMessage = error instanceof Error ? error.message : "Une erreur inconnue est survenue.";
    return { success: false, error: `Erreur Firestore: ${errorMessage}` }
  }

  // 3. Send emails
  try {
    await Promise.all([
      // Email pour l'admin
      resend.emails.send({
        from: 'ERG Rénovation <contact@erg-renovation.fr>',
        to: ADMIN_EMAIL,
        subject: `Nouvelle demande de devis : ${clientName}`,
        react: React.createElement(QuoteRequestAdminEmail, {
          clientName,
          clientEmail,
          clientPhone,
          projectDescription,
          quoteRequestId: newRequestId,
        }),
      }),

      // Email pour le client
      resend.emails.send({
        from: 'ERG Rénovation <contact@erg-renovation.fr>',
        to: clientEmail,
        subject: 'Confirmation de votre demande de devis',
        react: React.createElement(QuoteRequestClientEmail, {
          clientName,
        }),
      }),
    ])

    return { success: true }
  } catch (error) {
    console.error('Erreur Resend:', error)
    // Optional: We could try to delete the Firestore doc here, but it's often better
    // to keep the request and handle the email failure manually (e.g., resend later).
    return { success: false, error: "Une erreur interne est survenue lors de l'envoi." }
  }
}
