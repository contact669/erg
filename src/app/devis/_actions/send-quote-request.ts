'use server';

import { z } from 'zod';
import { adminDb } from '@/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

// Schéma de validation des données du formulaire
const formSchema = z.object({
  clientName: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  clientEmail: z.string().email("Veuillez saisir une adresse email valide."),
  clientPhone: z.string().optional(),
  projectDescription: z.string().min(40, "La description est trop courte."),
});


/**
 * Action Serveur pour traiter une demande de devis.
 * 1. Valide les données.
 * 2. Crée un document dans la collection 'quoteRequests' de Firestore.
 */
export async function sendQuoteRequest(data: unknown) {
  try {
    // 1. Valider les données
    const validatedData = formSchema.parse(data);
    const { clientName, clientEmail, clientPhone, projectDescription } = validatedData;

    // 2. Enregistrer la demande dans Firestore
    await adminDb.collection("quoteRequests").add({
        clientName,
        clientEmail: clientEmail.toLowerCase(),
        clientPhone: clientPhone || null,
        projectDescription,
        status: 'Nouvelle Demande',
        createdAt: FieldValue.serverTimestamp(),
    });

    return { success: true, message: "Demande enregistrée avec succès." };

  } catch (error) {
    console.error("Erreur dans sendQuoteRequest:", error);
    if (error instanceof z.ZodError) {
        return { success: false, message: 'Les données du formulaire sont invalides.', errors: error.errors };
    }
    return { success: false, message: "Une erreur est survenue lors de l'enregistrement de la demande." };
  }
}
