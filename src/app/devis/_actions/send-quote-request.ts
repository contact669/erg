'use server';

import { Resend } from 'resend';
import AdminQuoteRequestEmail from '../../../emails/quote-request-admin-email';
import ClientQuoteConfirmationEmail from '../../../emails/quote-request-confirmation-email';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = 'contact@erg-renovation.fr';

type SendEmailPayload = {
    requestId: string;
    clientName: string;
    clientEmail: string;
    clientPhone?: string;
    projectDescription: string;
};

export async function sendQuoteRequestEmail(payload: SendEmailPayload) {
    try {
        const emails = [
            {
                from: 'ERG Rénovation <contact@erg-renovation.fr>',
                to: [ADMIN_EMAIL],
                subject: `Nouvelle demande de devis de ${payload.clientName}`,
                react: AdminQuoteRequestEmail({
                  clientName: payload.clientName,
                  clientEmail: payload.clientEmail,
                  clientPhone: payload.clientPhone,
                  projectDescription: payload.projectDescription,
                  requestId: payload.requestId,
                }),
            },
            {
                from: 'ERG Rénovation <contact@erg-renovation.fr>',
                to: [payload.clientEmail],
                subject: 'Confirmation de votre demande de devis',
                react: ClientQuoteConfirmationEmail({ clientName: payload.clientName }),
            },
        ];

        const { data, error } = await resend.batch.send(emails);

        if (error) {
            console.error('Resend batch email error:', error);
            return { error: error.message };
        }

        return { data };

    } catch (error) {
        console.error('Failed to send emails:', error);
        return { error: (error as Error).message };
    }
}
