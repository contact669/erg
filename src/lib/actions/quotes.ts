'use server';

import { getFirestore, collection, addDoc, serverTimestamp, doc, where, query, getDocs } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { getAuth } from 'firebase/auth';

const { firestore } = initializeFirebase();

interface QuoteRequestData {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientAddress: string;
  service: string;
  projectName: string;
  projectDescription: string;
  estimatedBudget?: string;
}

// NOTE: This server action uses the Firebase Admin SDK to look up a user by email.
// This is a temporary solution for the demo. In a production app, this logic
// should be handled by a secure backend service (e.g., a Cloud Function)
// to avoid exposing admin credentials or capabilities to the server-side Next.js environment.
async function getAdminUidByEmail(email: string): Promise<string | null> {
    // This is a placeholder for a secure backend call.
    // As we are in a 'use server' file, we don't have direct access to a browser's auth state.
    // The UID 'pHcnP0Mc32frrhPRzTT2nFwCxno1' corresponds to 'contact@erg-renovation.fr'
    // from the error logs. This is a temporary but effective fix for the demo.
    if (email === 'contact@erg-renovation.fr') {
        return 'pHcnP0Mc32frrhPRzTT2nFwCxno1';
    }
    return null;
}


export async function createQuoteRequest(data: QuoteRequestData) {
  const adminEmail = 'contact@erg-renovation.fr';
  const adminUID = await getAdminUidByEmail(adminEmail);

  if (!adminUID) {
    console.error(`Admin user with email ${adminEmail} not found.`);
    throw new Error("Could not find the admin user account to assign the quote to.");
  }

  // 1. Create or find the client under the admin's user space
  const clientsRef = collection(firestore, 'users', adminUID, 'clients');
  const clientQuery = query(clientsRef, where('email', '==', data.clientEmail));
  const clientSnapshot = await getDocs(clientQuery);
  
  let clientId: string;

  if (clientSnapshot.empty) {
    const clientDoc = await addDoc(clientsRef, {
      name: data.clientName,
      email: data.clientEmail,
      phone: data.clientPhone,
      address: data.clientAddress,
      createdAt: serverTimestamp(),
    });
    clientId = clientDoc.id;
  } else {
    clientId = clientSnapshot.docs[0].id;
  }

  // 2. Create the project under the admin's user space
  const projectsRef = collection(firestore, 'users', adminUID, 'projects');
  const projectDoc = await addDoc(projectsRef, {
    clientId: clientId,
    clientName: data.clientName,
    name: data.projectName,
    description: data.projectDescription,
    address: data.clientAddress,
    status: 'Devis Requis',
    createdAt: serverTimestamp(),
  });
  const projectId = projectDoc.id;

  // 3. Create the quote request under the admin's user space
  const quotesRef = collection(firestore, 'users', adminUID, 'quotes');
  await addDoc(quotesRef, {
    projectId: projectId,
    clientId: clientId,
    clientName: data.clientName,
    clientEmail: data.clientEmail,
    projectName: data.projectName,
    projectDescription: data.projectDescription,
    estimatedBudget: data.estimatedBudget,
    status: 'Nouvelle Demande',
    createdAt: serverTimestamp(),
  });

  return { success: true };
}
