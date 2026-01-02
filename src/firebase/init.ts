'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

function getSdks(app: FirebaseApp) {
  return {
    firebaseApp: app,
    auth: getAuth(app),
    firestore: getFirestore(app),
  };
}

function initializeFirebaseOnce() {
  if (getApps().length) return getSdks(getApp());

  let app: FirebaseApp;

  // ✅ PROD App Hosting : tenter env-injected init (typing workaround)
  if (process.env.NODE_ENV === 'production') {
    try {
      app = initializeApp(undefined as any); // ✅ typing fix
      return getSdks(app);
    } catch (e) {
      console.warn('Auto init failed, fallback to firebaseConfig.', e);
    }
  }

  // ✅ DEV / fallback : explicit config
  app = initializeApp(firebaseConfig);
  return getSdks(app);
}

const svcs = initializeFirebaseOnce();

export const firebaseApp: FirebaseApp = svcs.firebaseApp;
export const auth: Auth = svcs.auth;
export const firestore: Firestore = svcs.firestore;
