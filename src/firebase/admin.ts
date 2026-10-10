import * as admin from 'firebase-admin';
import { firebaseConfig } from './config';

// This pattern ensures that Firebase Admin is initialized only once
// in a server environment with hot-reloading (like Next.js dev).

interface AdminServices {
  db: admin.firestore.Firestore;
  auth: admin.auth.Auth;
}

declare global {
  // eslint-disable-next-line no-var
  var __firebaseAdminServices: AdminServices | undefined;
}

if (!global.__firebaseAdminServices) {
  // If the services aren't cached, initialize them.
  const app = admin.apps.length > 0 ? admin.app() : admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: firebaseConfig.projectId,
  });

  const db = admin.firestore(app);
  
  // This is the critical setting for your named database 'ergrenov'.
  // This code block will only run once per server process start.
  try {
    db.settings({ databaseId: 'ergrenov' });
  } catch (e) {
      if (e instanceof Error && e.message.includes('Firestore has already been initialized')) {
        // This is expected in a development environment with hot-reloading.
      } else {
        throw e;
      }
  }
  
  const auth = admin.auth(app);

  // Cache the initialized services.
  global.__firebaseAdminServices = { db, auth };
}

// Export the cached instances.
export const adminDb: admin.firestore.Firestore = global.__firebaseAdminServices.db;
export const adminAuth: admin.auth.Auth = global.__firebaseAdminServices.auth;
