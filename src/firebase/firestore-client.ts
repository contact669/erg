"use client"

import { firebaseConfig } from "@/firebase/config"
import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Public quote forms need Firestore, but do not need to initialize Firebase Auth.
export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const firestore = getFirestore(firebaseApp, "ergrenov")
