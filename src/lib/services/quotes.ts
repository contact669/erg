'use client';

import { firestore } from '@/firebase/init';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

interface QuoteRequestData {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectDescription: string;
}

export async function createQuoteRequestFromClient(data: QuoteRequestData): Promise<string> {
  // This is the UID of the admin user who will receive the quote requests.
  const adminUID = "sCjC4gqf3aWd6tYqZ8xP9jB2vF3h"; 
  
  const quoteRequestData = {
    ...data,
    status: 'Nouvelle Demande',
    userId: adminUID,
    createdAt: serverTimestamp(),
  };

  const collectionRef = collection(firestore, 'quoteRequests');
  const docRef = await addDoc(collectionRef, quoteRequestData);
  
  return docRef.id;
}
