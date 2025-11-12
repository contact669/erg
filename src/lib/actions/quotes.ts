
'use server';

import { firestore } from '@/firebase/init';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

interface QuoteRequestData {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectDescription: string;
}

export async function createQuoteRequest(data: QuoteRequestData) {
  try {
    const quoteRequestData = {
      ...data,
      status: 'Nouvelle Demande',
      createdAt: serverTimestamp(),
      // Le userId n'est plus nécessaire pour la soumission publique.
      // Il sera associé à l'admin qui traite la demande plus tard.
    };

    const docRef = await addDoc(collection(firestore, 'quoteRequests'), quoteRequestData);
    
    return { success: true, requestId: docRef.id };
  } catch (error) {
    console.error("Error creating quote request:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}
