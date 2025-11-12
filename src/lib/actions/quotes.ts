
'use server';

import { initializeApp, getApps, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let app: App;
if (!getApps().length) {
  // Initialise l'application sans chercher de crédentials par défaut,
  // ce qui est adapté pour un environnement de développement local ou émulé.
  app = initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  });
} else {
  app = getApps()[0];
}

const firestore = getFirestore(app);

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
    // Ensure the returned error is a plain, serializable object for the Server Action.
    if (error instanceof Error) {
        return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred' };
  }
}
