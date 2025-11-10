'use server';

import { getFirestore, collection, addDoc, serverTimestamp, doc, where, query, getDocs } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

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
  // The UID for 'contact@erg-renovation.fr' is hardcoded here for stability.
  // In a production scenario with multiple admins, this might be handled differently,
  // e.g., by assigning to a general 'unassigned' pool or based on round-robin logic.
  const adminUID = 'pHcnP0Mc32frrhPRzTT2nFwCxno1';

  if (!adminUID) {
    throw new Error("Admin user account UID is not configured.");
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

    