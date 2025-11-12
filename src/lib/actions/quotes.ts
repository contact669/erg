'use server';

import { adminDb } from '@/firebase/admin';
import { Timestamp } from 'firebase-admin/firestore';

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
      createdAt: Timestamp.now(),
    };

    const docRef = await adminDb.collection('quoteRequests').add(quoteRequestData);
    
    return { success: true, requestId: docRef.id };
  } catch (error) {
    console.error("Error creating quote request:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}