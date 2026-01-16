'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { adminDb } from '@/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

import AdminQuoteRequestEmail from '@/emails/quote-request-admin-email';
import ClientQuoteConfirmationEmail from '@/emails/quote-request-client-email';

const resend = new Resend(process.env.RESEND_API_KEY);

const formSchema = z.object({
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
  clientPhone: z.string().optional(),
  projectDescription: z.string().min(40),
});

type FormValues = z.infer<typeof formSchema>;

const ADMIN_EMAIL = 'contact@erg-renovation.fr';
const FROM_EMAIL = 'onboarding@resend.dev';

export async function sendQuoteRequest(values: FormValues) {
  try {
    // 1. Validate data
    const validatedData = formSchema.parse(values);

    // 2. Save to Firestore
    const newRequestRef = await adminDb.collection('quoteRequests').add({
      ...validatedData,
      status: 'Nouvelle Demande',
      createdAt: FieldValue.serverTimestamp(),
    });

    // 3. Send emails via Resend
    await Promise.all([
      // Email to Admin
      resend.emails.send({
        from: `ERG Rénovation <${FROM_EMAIL}>`,
        to: ADMIN_EMAIL,
        subject: `Nouvelle demande de devis de ${validatedData.clientName}`,
        react: AdminQuoteRequestEmail({
          requestId: newRequestRef.id,
          ...validatedData,
        }),
      }),
      // Email to Client
      resend.emails.send({
        from: `ERG Rénovation <${FROM_EMAIL}>`,
        to: validatedData.clientEmail,
        subject: 'Confirmation de votre demande de devis',
        react: ClientQuoteConfirmationEmail({
          clientName: validatedData.clientName,
        }),
      }),
    ]);

    return { success: true, message: 'Demande envoyée avec succès.' };
  } catch (error) {
    console.error('Error in sendQuoteRequest:', error);
    return { success: false, message: "Une erreur est survenue lors de l'envoi de la demande." };
  }
}
