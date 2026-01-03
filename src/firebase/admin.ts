import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

// ✅ Firestore Admin SDK
const adminDb = admin.firestore();

// ✅ Si tu utilises une DB nommée "ergrenov"
adminDb.settings({ databaseId: "ergrenov" });

export { adminDb };
export const adminAuth = admin.auth();
