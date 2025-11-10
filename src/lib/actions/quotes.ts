'use server';

import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    // The SDK will automatically use the GOOGLE_APPLICATION_CREDENTIALS
    // environment variable for authentication on the server.
  });
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

/**
 * Finds the admin user's UID by their email address.
 * This is necessary because server-side actions don't have a user context by default.
 * @returns The UID of the admin user.
 * @throws If the admin user is not found.
 */
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

  // Use a Firestore transaction to ensure all writes succeed or fail together.
  await firestore.runTransaction(async (transaction) => {
    // 1. Create or find the client under the admin's user space
    const clientsRef = firestore.collection(`users/${adminUID}/clients`);
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
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      clientId = clientDocRef.id;
    } else {
      clientDocRef = clientSnapshot.docs[0].ref;
      clientId = clientSnapshot.docs[0].id;
    }

    // 2. Create the project under the admin's user space
    const projectsRef = firestore.collection(`users/${adminUID}/projects`);
    const projectDocRef = projectsRef.doc();
    transaction.set(projectDocRef, {
      clientId: clientId,
      clientName: data.clientName,
      name: data.projectName,
      description: data.projectDescription,
      address: data.clientAddress,
      status: 'Devis Requis',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    const projectId = projectDocRef.id;

    // 3. Create the quote request under the admin's user space
    const quotesRef = firestore.collection(`users/${adminUID}/quotes`);
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
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

  return { success: true };
}