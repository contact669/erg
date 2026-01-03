"use client"

import { firebaseConfig } from "@/firebase/config"
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const DATABASE_ID = "ergrenov"

function getSdks(app: FirebaseApp) {
  return {
    firebaseApp: app,
    auth: getAuth(app),
    firestore: getFirestore(app, DATABASE_ID),
  }
}

function initializeFirebaseOnce() {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  return getSdks(app)
}

const { firebaseApp, auth, firestore } = initializeFirebaseOnce()
export { firebaseApp, auth, firestore }
