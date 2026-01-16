import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import QuoteRequestAdminEmail from '@/emails/quote-request-admin';
import QuoteRequestClientEmail from '@/emails/quote-request-client';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = 'contact@erg-renovation.fr';
const FROM_EMAIL = 'ERG Rénovation <contact@erg-renovation.fr>';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientName, clientEmail, clientPhone, projectDescription } = body;

    if (!clientName || !clientEmail || !projectDescription) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
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
    });

    const clientEmailPromise = resend.emails.send({
      from: FROM_EMAIL,
      to: [clientEmail],
      subject: 'Confirmation de votre demande de devis',
      react: QuoteRequestClientEmail({ clientName }),
    });

    const [adminResult, clientResult] = await Promise.all([adminEmailPromise, clientEmailPromise]);

    if (adminResult.error) {
        console.error('Resend admin email error:', adminResult.error);
        // We still return success if the client email succeeded, but log the admin failure.
    }
     if (clientResult.error) {
        console.error('Resend client email error:', clientResult.error);
         // Don't throw, the primary goal (admin notification) might have succeeded.
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('API send-quote-email error:', error);
    return NextResponse.json({ error: 'Failed to send emails.' }, { status: 500 });
  }
}
