'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = 'contact@erg-renovation.fr';

type SendEmailPayload = {
    requestId: string;
    clientName: string;
    clientEmail: string;
    clientPhone?: string;
    projectDescription: string;
};

const adminEmailHtml = (payload: SendEmailPayload) => `
  <h1>Nouvelle Demande de Devis</h1>
  <p><strong>Nom:</strong> ${payload.clientName}</p>
  <p><strong>Email:</strong> ${payload.clientEmail}</p>
  ${payload.clientPhone ? `<p><strong>Téléphone:</strong> ${payload.clientPhone}</p>` : ''}
  <p><strong>Description du projet:</strong></p>
  <p>${payload.projectDescription}</p>
  <p>ID de la demande: ${payload.requestId}</p>
`;

const clientEmailHtml = (clientName: string) => `
  <h1>Confirmation de votre demande de devis</h1>
  <p>Bonjour ${clientName},</p>
  <p>Nous avons bien reçu votre demande de devis et nous vous remercions de votre confiance.</p>
  <p>Notre équipe va l'étudier attentivement et reviendra vers vous dans les plus brefs délais (généralement sous 24h ouvrées).</p>
  <p>Cordialement,</p>
  <p>L'équipe ERG Rénovation</p>
`;

export async function sendQuoteRequestEmail(payload: SendEmailPayload) {
    try {
        const { data: adminEmailData, error: adminEmailError } = await resend.emails.send({
            from: 'ERG Rénovation <contact@erg-renovation.fr>',
            to: [ADMIN_EMAIL],
            subject: `Nouvelle demande de devis de ${payload.clientName}`,
            html: adminEmailHtml(payload),
        });

        if (adminEmailError) {
            console.error('Resend admin email error:', adminEmailError);
            return { error: adminEmailError.message };
        }

        const { data: clientEmailData, error: clientEmailError } = await resend.emails.send({
            from: 'ERG Rénovation <contact@erg-renovation.fr>',
            to: [payload.clientEmail],
            subject: 'Confirmation de votre demande de devis',
            html: clientEmailHtml(payload.clientName),
        });
        
        if (clientEmailError) {
            console.error('Resend client email error:', clientEmailError);
            return { error: clientEmailError.message };
        }

        return { data: { adminEmailId: adminEmailData?.id, clientEmailId: clientEmailData?.id } };

    } catch (error) {
        console.error('Failed to send emails:', error);
        return { error: (error as Error).message };
    }
}
