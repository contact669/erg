import type { Metadata } from "next"
import ConnexionPage from "../connexion/page"

export const metadata: Metadata = {
  title: "Portail CRM & Espace Artisan | ERG Rénovation",
  description: "Espace sécurisé de gestion de chantier, plannings et suivi de projet pour les maîtres d'œuvre et artisans ERG Rénovation.",
  alternates: { canonical: "https://erg-renovation.fr/crm" },
}

export default function CRMPage() {
  return <ConnexionPage />
}
