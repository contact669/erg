import * as admin from 'firebase-admin';

// Check if the app is already initialized to prevent errors
if (!admin.apps.length) {
  try {
    // Attempt to initialize using Application Default Credentials
    // This is the standard way in Google Cloud environments like App Hosting
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`
    });
  } catch (error) {
    console.warn('Admin SDK initialization with default credentials failed. Falling back to project config.', error);
    // Fallback for local development or environments without ADC
    // This uses the project ID from the environment, which App Hosting provides.
    admin.initializeApp();
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
