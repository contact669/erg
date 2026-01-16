import * as admin from "firebase-admin";

/**
 * This pattern ensures that Firebase Admin is initialized only once,
 * even in a hot-reloading development environment.
 */
function getAdminServices() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
    // Apply settings right after initialization, and only once.
    admin.firestore().settings({ databaseId: "ergrenov" });
  }
  return {
    adminDb: admin.firestore(),
    adminAuth: admin.auth(),
  };
}

const { adminDb, adminAuth } = getAdminServices();

export { adminDb, adminAuth };
