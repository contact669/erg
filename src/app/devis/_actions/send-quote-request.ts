'use server';

import { Resend } from 'resend';
import AdminQuoteRequestEmail from '@/emails/quote-request-admin-email';
import ClientQuoteConfirmationEmail from '@/emails/quote-request-confirmation-email';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = 'contact@erg-renovation.fr';

interface sendQuoteRequestEmailProps {
    requestId: string;
    clientName: string;
    clientEmail: string;
    clientPhone?: string;
    projectDescription: string;
}

export async function sendQuoteRequestEmail({
    requestId,
    clientName,
    clientEmail,
    clientPhone,
    projectDescription,
}: sendQuoteRequestEmailProps) {
    try {
        await resend.batch.send([
            {
                from: 'ERG Rénovation <contact@erg-renovation.fr>',
                to: [ADMIN_EMAIL],
                subject: `Nouvelle demande de devis de ${clientName}`,
                react: AdminQuoteRequestEmail({
                    requestId,
                    clientName,
                    clientEmail,
                    clientPhone,
                    projectDescription
                }),
            },
            {
                from: 'ERG Rénovation <contact@erg-renovation.fr>',
                to: [clientEmail],
                subject: 'Confirmation de votre demande de devis',
                react: ClientQuoteConfirmationEmail({ clientName }),
            },
        ]);
    } catch (error) {
        console.error('Error sending emails:', error);
        throw new Error('Failed to send emails.');
    }
}
