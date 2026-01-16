import * as admin from 'firebase-admin';

// Define a type for our cached services to avoid using `any`
interface AdminServices {
  db: admin.firestore.Firestore;
  auth: admin.auth.Auth;
}

// Extend the NodeJS.Global interface to declare our cache property
// Using `var` to allow for re-declaration in hot-reload environments.
declare global {
  // eslint-disable-next-line no-var
  var __firebaseAdminServices: AdminServices | undefined;
}

function initializeAdminServices(): AdminServices {
  // If services are already initialized and cached, return them.
  if (global.__firebaseAdminServices) {
    return global.__firebaseAdminServices;
  }

  // If no apps are initialized, this is the first run.
  if (admin.apps.length === 0) {
    const app = admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
    
    const db = admin.firestore(app);
    // CRITICAL: Apply settings right after getting the Firestore instance.
    db.settings({ databaseId: 'ergrenov' });
    
    const auth = admin.auth(app);
    
    // Cache the initialized services on the global object.
    global.__firebaseAdminServices = { db, auth };
    
    return { db, auth };
  }

  // If an app already exists (e.g., from a hot-reload), use it.
  // We assume the settings were applied on the first run.
  const app = admin.app();
  const db = admin.firestore(app);
  const auth = admin.auth(app);
  
  // Cache this so we don't re-run this logic on subsequent reloads.
  global.__firebaseAdminServices = { db, auth };
  
  return { db, auth };
}

const services = initializeAdminServices();

export const adminDb = services.db;
export const adminAuth = services.auth;
