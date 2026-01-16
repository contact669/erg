'use server';

import { Resend } from 'resend';
import QuoteRequestAdminEmail from '@/emails/quote-request-admin';
import QuoteRequestClientEmail from '@/emails/quote-request-client';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = 'contact@erg-renovation.fr';
const FROM_EMAIL = 'ERG Rénovation <contact@erg-renovation.fr>';

interface SendNotificationsPayload {
  clientName: string;
  clientEmail: string;
  clientPhone?: string | null;
  projectDescription: string;
}

export async function sendQuoteNotifications(payload: SendNotificationsPayload) {
  try {
    const adminEmailPromise = resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject: `Nouvelle demande de devis de ${payload.clientName}`,
      react: QuoteRequestAdminEmail({
        clientName: payload.clientName,
        clientEmail: payload.clientEmail,
        clientPhone: payload.clientPhone,
        projectDescription: payload.projectDescription,
      }),
    });

    const clientEmailPromise = resend.emails.send({
      from: FROM_EMAIL,
      to: [payload.clientEmail],
      subject: 'Confirmation de votre demande de devis',
      react: QuoteRequestClientEmail({
        clientName: payload.clientName,
      }),
    });

    const [adminResult, clientResult] = await Promise.all([adminEmailPromise, clientEmailPromise]);

    if (adminResult.error) {
        console.error('Resend admin email error:', adminResult.error);
        throw new Error(`Failed to send admin email: ${adminResult.error.message}`);
    }
    if (clientResult.error) {
        console.error('Resend client email error:', clientResult.error);
        // Ne pas bloquer si l'email client échoue, mais logger l'erreur.
        // La notification admin est plus critique.
    }

    return { success: true };
  } catch (error) {
    console.error('sendQuoteNotifications error:', error);
    return { success: false, error: 'Failed to send notifications.' };
  }
}
