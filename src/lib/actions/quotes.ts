
'use server';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '@/firebase/config';

let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const firestore = getFirestore(app);
const auth = getAuth(app);

interface QuoteRequestData {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectDescription: string;
}

// This function is placeholder for getting the admin UID. 
// In a real application, you would have a more secure way to identify the user
// who should own these requests, likely the currently logged-in admin user
// from the server context. For now, we hardcode it.
async function getAdminUid(): Promise<string> {
    return "pHcnP0Mc32frrhPRzTT2nFwCxno1";
}


export async function createQuoteRequest(data: QuoteRequestData) {
  const adminUID = await getAdminUid();
  
  if (!adminUID) {
    throw new Error("Could not determine admin user.");
  }

  try {
    const requestRef = await addDoc(collection(firestore, "quoteRequests"), {
        ...data,
        status: 'Nouvelle Demande',
        userId: adminUID,
        createdAt: serverTimestamp(),
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
