"use client"

import { firebaseApp, firestore } from "@/firebase/firestore-client"
import { getAuth } from "firebase/auth"
const auth = getAuth(firebaseApp)
export { firebaseApp, auth, firestore }
