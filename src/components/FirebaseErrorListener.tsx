"use client"

import { useEffect, useRef, useState } from "react"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"

/**
 * Composant invisible : écoute les erreurs Firestore globales (permission-error)
 * et les "remonte" au boundary Next.js (global-error.tsx) en les lançant.
 *
 * ✅ Anti-boucle: évite de relancer la même erreur en boucle (Fast Refresh / re-mount)
 * ✅ Safe: cleanup garanti + pas de setState si unmount
 * ✅ Extensible: facile d'ajouter d'autres events plus tard
 */
export function FirebaseErrorListener() {
  const [error, setError] = useState<FirestorePermissionError | null>(null)

  // Empêche de relancer indéfiniment la même erreur
  const lastErrorKeyRef = useRef<string | null>(null)
  // Empêche setState après unmount
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true

    const handlePermissionError = (err: FirestorePermissionError) => {
      if (!mountedRef.current) return

      // On tente de construire une "signature" stable de l’erreur
      const key =
        (err as any)?.code ||
        (err as any)?.name ||
        (err as any)?.message ||
        "permission-error"

      // Si on reçoit la même erreur plusieurs fois, on ignore (évite boucle UI)
      if (lastErrorKeyRef.current === key) return
      lastErrorKeyRef.current = key

      setError(err)
    }

    errorEmitter.on("permission-error", handlePermissionError)

    return () => {
      mountedRef.current = false
      errorEmitter.off("permission-error", handlePermissionError)
    }
  }, [])

  // Important: lancer l’erreur pendant le render déclenche le Error Boundary.
  if (error) throw error

  return null
}
