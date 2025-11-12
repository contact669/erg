
'use server';

import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialise l'application admin Firebase.
// Si elle est déjà initialisée, on récupère l'instance existante.
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
  // L'ID de l'admin à qui les demandes sont assignées.
  const adminUID = "sCjC4gqf3aWd6tYqZ8xP9jB2vF3h";

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
