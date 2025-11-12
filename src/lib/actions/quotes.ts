'use server';

import { adminDb } from '@/firebase/admin';

interface QuoteRequestData {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectDescription: string;
}

export async function createQuoteRequest(data: QuoteRequestData) {
  try {
    // This is the UID of the admin user who will receive the quote requests.
    const adminUID = "sCjC4gqf3aWd6tYqZ8xP9jB2vF3h";

    const quoteRequestData = {
      ...data,
      status: 'Nouvelle Demande',
      userId: adminUID, // All requests are assigned to the admin
      createdAt: new Date(), // Using server date
    };

    const docRef = await adminDb.collection('quoteRequests').add(quoteRequestData);
    
    return { success: true, requestId: docRef.id };
  } catch (error) {
    console.error("Error creating quote request:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    // In a real app, you might want to log this to a more persistent logging service
    return { success: false, error: errorMessage };
  }
}
