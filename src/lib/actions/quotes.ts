'use server';

import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

const firestore = admin.firestore();

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

async function getAdminUidByEmail(): Promise<string> {
    const adminEmail = 'contact@erg-renovation.fr';
    try {
        const adminUserRecord = await admin.auth().getUserByEmail(adminEmail);
        return adminUserRecord.uid;
    } catch (error) {
        console.error(`Admin user with email ${adminEmail} not found. Please ensure this user exists in Firebase Authentication.`);
        throw new Error(`Admin user not found: ${adminEmail}`);
    }
}


export async function createQuoteRequest(data: QuoteRequestData) {
  const adminUID = await getAdminUidByEmail();

  await firestore.runTransaction(async (transaction) => {
    const clientsRef = firestore.collection('clients');
    const clientQuery = clientsRef.where('email', '==', data.clientEmail).limit(1);
    const clientSnapshot = await transaction.get(clientQuery);
    
    let clientId: string;
    let clientDocRef: FirebaseFirestore.DocumentReference;

    if (clientSnapshot.empty) {
      clientDocRef = clientsRef.doc();
      transaction.set(clientDocRef, {
        name: data.clientName,
        email: data.clientEmail,
        phone: data.clientPhone || null,
        address: data.clientAddress,
        userId: adminUID,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      clientId = clientDocRef.id;
    } else {
      clientDocRef = clientSnapshot.docs[0].ref;
      clientId = clientSnapshot.docs[0].id;
    }

    const projectsRef = firestore.collection('projects');
    const projectDocRef = projectsRef.doc();
    transaction.set(projectDocRef, {
      clientId: clientId,
      clientName: data.clientName,
      name: data.projectName,
      description: data.projectDescription,
      address: data.clientAddress,
      status: 'Devis Requis',
      userId: adminUID,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    const projectId = projectDocRef.id;

    const quotesRef = firestore.collection('quotes');
    const quoteDocRef = quotesRef.doc();
    transaction.set(quoteDocRef, {
      projectId: projectId,
      clientId: clientId,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      projectName: data.projectName,
      projectDescription: data.projectDescription,
      estimatedBudget: data.estimatedBudget || null,
      status: 'Nouvelle Demande',
      userId: adminUID,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

  return { success: true };
}
