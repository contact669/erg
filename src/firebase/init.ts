'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

function getSdks(app: FirebaseApp) {
  return {
    firebaseApp: app,
    auth: getAuth(app),
    // Correction: On spécifie la base de données 'ergrenov' ici.
    firestore: getFirestore(app, 'ergrenov'),
  };
}

function initializeFirebaseOnce() {
  // S'il y a déjà une app Firebase initialisée, on la réutilise.
  if (getApps().length) {
    const app = getApp();
    return getSdks(app);
  }

  // Sinon, on l'initialise.
  const app = initializeApp(firebaseConfig);
  return getSdks(app);
}

// On exporte les instances uniques pour toute l'application.
const { firebaseApp, auth, firestore } = initializeFirebaseOnce();

export { firebaseApp, auth, firestore };
