
'use server';

import { adminDb } from '@/firebase/admin';
import { Timestamp } from 'firebase-admin/firestore';
import { Resend } from 'resend';
import QuoteRequestEmail from '@/emails/quote-request-email';

interface QuoteRequestData {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectDescription: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createQuoteRequest(data: QuoteRequestData) {
  try {
    // 1. Save the request to Firestore
    const quoteRequestData = {
      ...data,
      status: 'Nouvelle Demande',
      createdAt: Timestamp.now(),
      // Add a default user ID for now, can be replaced with real user ID if they are logged in
      userId: 'admin_user_placeholder', 
    };
    const docRef = await adminDb.collection('quoteRequests').add(quoteRequestData);
    
    // 2. Send an email notification (commented out for now to ensure DB save works first)
    /*
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Demande de Devis <noreply@erg-renovation.fr>', // Use a verified domain
        to: 'contact@erg-renovation.fr',
        subject: `Nouvelle demande de devis de ${data.clientName}`,
        react: QuoteRequestEmail({
          clientName: data.clientName,
          clientEmail: data.clientEmail,
          clientPhone: data.clientPhone,
          projectDescription: data.projectDescription
        }),
      });
    } else {
        console.warn("RESEND_API_KEY is not set. Email notification was skipped.");
    }
    */

    return { success: true, requestId: docRef.id };
  } catch (error) {
    console.error("Error creating quote request:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    // Re-throw the error to be caught by the client-side logic
    throw new Error(errorMessage);
  }
}
