'use server';

import { Resend } from 'resend';
import AdminQuoteRequestEmail from '@/emails/quote-request-admin-email';
import ClientQuoteConfirmationEmail from '@/emails/quote-request-confirmation-email';

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
        const { data: adminEmailData, error: adminEmailError } = await resend.emails.send({
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
        });

        if (adminEmailError) {
            console.error('Resend admin email error:', adminEmailError);
            return { error: adminEmailError.message };
        }

        const { data: clientEmailData, error: clientEmailError } = await resend.emails.send({
            from: 'ERG Rénovation <contact@erg-renovation.fr>',
            to: [payload.clientEmail],
            subject: 'Confirmation de votre demande de devis',
            react: ClientQuoteConfirmationEmail({
                clientName: payload.clientName,
            }),
        });
        
        if (clientEmailError) {
            console.error('Resend client email error:', clientEmailError);
            // L'e-mail admin a été envoyé, on peut considérer que c'est un succès partiel
            // mais on log l'erreur client.
            return { error: clientEmailError.message };
        }

        return { data: { adminEmailId: adminEmailData?.id, clientEmailId: clientEmailData?.id } };

    } catch (error) {
        console.error('Failed to send emails:', error);
        return { error: (error as Error).message };
    }
}
