'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export function initializeFirebase() {
  if (!getApps().length) {
    let firebaseApp: FirebaseApp;

    // ✅ DEV / Firebase Studio / Local : forcer le bon projet
    if (process.env.NODE_ENV !== 'production') {
      firebaseApp = initializeApp(firebaseConfig);
      return getSdks(firebaseApp);
    }

    // ✅ PROD / App Hosting : init sans args, mais on vérifie le projectId
    try {
      firebaseApp = initializeApp();

      const detectedProjectId = firebaseApp.options?.projectId;
      const expectedProjectId = firebaseConfig.projectId;

      // ✅ si App Hosting pointe vers un autre projet => fallback sur config explicite
      if (detectedProjectId && detectedProjectId !== expectedProjectId) {
        console.warn(
          '[Firebase] Project mismatch detected. Falling back to firebaseConfig.',
          { detectedProjectId, expectedProjectId }
        );
        firebaseApp = initializeApp(firebaseConfig);
      }

      // ✅ si projectId absent (rare), fallback aussi
      if (!firebaseApp.options?.projectId) {
        console.warn('[Firebase] Missing projectId from App Hosting init. Falling back to firebaseConfig.');
        firebaseApp = initializeApp(firebaseConfig);
      }
    } catch (e) {
      console.warn(
        'Automatic initialization failed. Falling back to firebase config object.',
        e
      );
      firebaseApp = initializeApp(firebaseConfig);
    }

    return getSdks(firebaseApp);
  }

  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
  };
}

export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
export * from './provider';
export { useUser } from './auth/use-user';
