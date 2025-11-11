'use server';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, doc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '@/firebase/config';
import { generateQuote, type GenerateQuoteOutput } from '@/ai/flows/generate-quote-flow';


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

// This function needs to run on the server, but it needs an authenticated admin user.
// In a real scenario, you'd likely have a secure way to identify the admin,
// possibly through a custom claim set on the user's token.
// For this context, we will assume a specific email identifies the admin.
async function getAdminUidByEmail(): Promise<string> {
    // This is a placeholder. In a production environment, you should not rely on this method
    // for authenticating a server-side action. This logic should be handled by checking
    // authentication status of the incoming request on the server.
    // For now, we will simulate getting the admin UID from a known email.
    // The UID is hardcoded for this example. Replace with your actual admin UID.
    return "pHcnP0Mc32frrhPRzTT2nFwCxno1";
}


export async function createQuoteRequest(data: QuoteRequestData) {
  const adminUID = await getAdminUidByEmail();
  
  if (!adminUID) {
    throw new Error("Could not determine admin user.");
  }

  try {
    // 1. Generate the quote using AI
    const aiQuote = await generateQuote({
        projectDescription: data.projectDescription,
        serviceType: 'Inconnu - à définir depuis la description'
    });

    const batch = writeBatch(firestore);

    const clientsRef = collection(firestore, 'clients');
    const clientQuery = query(clientsRef, where('email', '==', data.clientEmail));
    const clientSnapshot = await getDocs(clientQuery);

    let clientId: string;
    let clientDocRef;

    if (clientSnapshot.empty) {
      clientDocRef = doc(collection(firestore, 'clients'));
      batch.set(clientDocRef, {
        name: data.clientName,
        email: data.clientEmail,
        phone: data.clientPhone || null,
        userId: adminUID,
        createdAt: serverTimestamp(),
      });
      clientId = clientDocRef.id;
    } else {
      clientDocRef = clientSnapshot.docs[0].ref;
      clientId = clientSnapshot.docs[0].id;
    }

    const projectsRef = collection(firestore, 'projects');
    const projectDocRef = doc(projectsRef);
    batch.set(projectDocRef, {
      clientId: clientId,
      clientName: data.clientName,
      name: aiQuote.title,
      description: data.projectDescription,
      status: 'Devis Requis',
      userId: adminUID,
      createdAt: serverTimestamp(),
    });
    const projectId = projectDocRef.id;

    const quotesRef = collection(firestore, 'quotes');
    const quoteDocRef = doc(quotesRef);
    batch.set(quoteDocRef, {
      ...aiQuote, // Spread the AI-generated quote
      projectId: projectId,
      clientId: clientId,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      projectDescription: data.projectDescription,
      service: 'À catégoriser',
      status: 'Nouvelle Demande',
      userId: adminUID,
      createdAt: serverTimestamp(),
    });

    await batch.commit();
    return { success: true, quoteId: quoteDocRef.id };
  } catch (error) {
    console.error("Error creating quote request:", error);
    if (error instanceof Error) {
        return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred' };
  }
}
