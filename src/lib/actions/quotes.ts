'use server';

import { firestore } from '@/firebase/init';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

interface QuoteRequestData {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectDescription: string;
}

export async function createQuoteRequest(data: QuoteRequestData, userId: string) {
  try {
    const quoteRequestData = {
      ...data,
      userId: userId, // Assign the request to the logged-in admin
      status: 'Nouvelle Demande',
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(firestore, 'quoteRequests'), quoteRequestData);
    
    return { success: true, requestId: docRef.id };
  } catch (error) {
    console.error("Error creating quote request:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}
