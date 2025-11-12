
'use server';

import { initializeApp, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseConfig } from '@/firebase/config';

// Use admin SDK for server-side operations
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

const app = !getApps().length
  ? initializeApp({
      credential: serviceAccount ? (require('firebase-admin/app')).cert(serviceAccount) : undefined,
      projectId: firebaseConfig.projectId,
    })
  : getApp();

const firestore = getFirestore(app);

interface QuoteRequestData {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectDescription: string;
}

// This function is placeholder for getting the admin UID. 
// In a real application, you would have a more secure way to identify the user
// who should own these requests.
async function getAdminUid(): Promise<string> {
    // This should be replaced with a secure method to get the admin ID,
    // for example, from a configuration file or an environment variable.
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
        createdAt: new Date(), // Using new Date() for server-side timestamp
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
