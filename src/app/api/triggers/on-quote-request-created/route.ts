import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import QuoteRequestAdminEmail from '@/emails/quote-request-admin-email';
import QuoteRequestConfirmationEmail from '@/emails/quote-request-confirmation-email';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = 'contact@erg-renovation.fr';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received trigger payload:', body);

    const { clientName, clientEmail, clientPhone, projectDescription } = body.data;
    
    if (!clientName || !clientEmail || !projectDescription) {
      console.error('Missing data in payload');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Envoyer l'e-mail à l'administrateur
    await resend.emails.send({
      from: `ERG Rénovation <notification@erg-renovation.fr>`,
      to: ADMIN_EMAIL,
      subject: `Nouvelle demande de devis de ${clientName}`,
      react: QuoteRequestAdminEmail({
        clientName,
        clientEmail,
        clientPhone,
        projectDescription,
      }),
    });

    // 2. Envoyer l'e-mail de confirmation au client
    await resend.emails.send({
      from: `ERG Rénovation <contact@erg-renovation.fr>`,
      to: clientEmail,
      subject: 'Confirmation de votre demande de devis',
      react: QuoteRequestConfirmationEmail({ clientName }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
