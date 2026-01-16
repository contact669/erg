'use server';

import { z } from 'zod';
import { adminDb } from '@/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { Resend } from 'resend';

// Schéma de validation des données du formulaire
const formSchema = z.object({
  clientName: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  clientEmail: z.string().email("Veuillez saisir une adresse email valide."),
  clientPhone: z.string().optional(),
  projectDescription: z.string().min(40, "La description est trop courte."),
});

// Initialisation de Resend avec la clé d'API depuis les variables d'environnement
const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = 'contact@erg-renovation.fr';
// IMPORTANT: Remplacez 'contact@yourdomain.com' par un email vérifié dans votre compte Resend.
const FROM_EMAIL = 'ERG Rénovation <onboarding@resend.dev>';

/**
 * Action Serveur pour traiter une demande de devis.
 * 1. Valide les données.
 * 2. Crée un document dans Firestore.
 * 3. Envoie un email à l'admin et au client.
 */
export async function sendQuoteRequest(data: unknown) {
  try {
    // 1. Valider les données
    const validatedData = formSchema.parse(data);
    const { clientName, clientEmail, clientPhone, projectDescription } = validatedData;

    // 2. Enregistrer la demande dans Firestore avec le SDK Admin
    const newRequestRef = await adminDb.collection("quoteRequests").add({
        clientName,
        clientEmail: clientEmail.toLowerCase(),
        clientPhone: clientPhone || null,
        projectDescription,
        status: 'Nouvelle Demande',
        createdAt: FieldValue.serverTimestamp(),
    });

    const newRequestId = newRequestRef.id;

    // 3. Envoyer les emails via Resend
    // Email de notification pour l'administrateur
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject: `Nouvelle demande de devis de ${clientName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>Nouvelle Demande de Devis</h2>
          <p>Une nouvelle demande de devis a été soumise sur le site ERG Rénovation.</p>
          <hr>
          <h3>Informations du client :</h3>
          <p><strong>Nom :</strong> ${clientName}</p>
          <p><strong>Email :</strong> <a href="mailto:${clientEmail}">${clientEmail}</a></p>
          ${clientPhone ? `<p><strong>Téléphone :</strong> ${clientPhone}</p>` : ''}
          <hr>
          <h3>Description du projet :</h3>
          <p style="white-space: pre-wrap;">${projectDescription}</p>
          <hr>
          <p><a href="https://erg-renovation.fr/dashboard/demandes/${newRequestId}">Voir la demande dans le dashboard</a></p>
        </div>
      `,
    });

    // Email de confirmation pour le client
    await resend.emails.send({
        from: FROM_EMAIL,
        to: [clientEmail],
        subject: 'Confirmation de votre demande de devis',
        html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
              <h2>Nous avons bien reçu votre demande</h2>
              <p>Bonjour ${clientName},</p>
              <p>Merci de nous avoir contactés. Nous avons bien reçu votre demande de devis et nous vous remercions de votre confiance.</p>
              <p>Notre équipe va l'étudier attentivement et reviendra vers vous dans les plus brefs délais (généralement sous 24h ouvrées) pour discuter de votre projet.</p>
              <hr>
              <p>Cordialement,</p>
              <p><strong>L'équipe ERG Rénovation</strong></p>
            </div>
        `,
    });

    return { success: true, message: "Demande envoyée avec succès." };
  } catch (error) {
    console.error("Erreur dans sendQuoteRequest:", error);
    if (error instanceof z.ZodError) {
        return { success: false, message: 'Les données du formulaire sont invalides.', errors: error.errors };
    }
    return { success: false, message: "Une erreur interne est survenue lors de l'envoi." };
  }
}
