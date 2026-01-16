import * as admin from "firebase-admin";

function getAdminServices() {
    if (admin.apps.length > 0) {
        const app = admin.app();
        return { adminDb: admin.firestore(app), adminAuth: admin.auth(app) };
    }

    const app = admin.initializeApp({
        credential: admin.credential.applicationDefault(),
    });

    const db = admin.firestore(app);
    db.settings({ databaseId: "ergrenov" });

    return { adminDb: db, adminAuth: admin.auth(app) };
}

const { adminDb, adminAuth } = getAdminServices();

export { adminDb, adminAuth };
