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

export async function createQuoteRequest(data: QuoteRequestData) {
  // In a real app, you'd get the admin user ID. For now, we'll hardcode it.
  // This would typically be a specific admin user who receives all quote requests.
  const adminUserId = 'contact@erg-renovation.fr'; // This needs to be a real user UID in your auth system eventually.
  
  // For the demo, we assume there's one admin account that handles all quotes.
  // The security rules allow the owner (`userId`) to write to their own subcollections.
  // We need to find the UID for 'contact@erg-renovation.fr' to write the quote.
  // This is a placeholder for a more robust admin user retrieval system.
  // In a real app, this might be a Cloud Function backend or a known admin UID.
  const adminUID = "iMhxT13aVYS2G5a1x5a1VfGzY8E2"; // Hardcoded UID for 'contact@erg-renovation.fr'

  if (!adminUID) {
    throw new Error("Admin user not found.");
  }

  // 1. Create or find the client
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

  // 2. Create the project
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

  // 3. Create the quote request
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
