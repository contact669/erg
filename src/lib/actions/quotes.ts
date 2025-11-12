
'use server';

import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Use admin SDK for server-side operations
if (!getApps().length) {
  initializeApp();
}

const firestore = getFirestore();

interface QuoteRequestData {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectDescription: string;
}

export async function createQuoteRequest(data: QuoteRequestData) {
  // Hardcoded admin UID. In a real app, this should be handled securely.
  const adminUID = "pHcnP0Mc32frrhPRzTT2nFwCxno1";

  try {
    const requestRef = await firestore.collection("quoteRequests").add({
        ...data,
        status: 'Nouvelle Demande',
        userId: adminUID,
        createdAt: new Date(),
    });

    return { success: true, requestId: requestRef.id };
  } catch (error) {
    console.error("Error creating quote request:", error);
    if (error instanceof Error) {
        return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred' };
  }
}
