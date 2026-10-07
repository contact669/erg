
import type { Metadata } from "next";
import ZonesInterventionClient from "./_components/zones-client";

export const metadata: Metadata = {
  title: `Zones d’intervention | Paris & Île-de-France`,
  description:
    "Zones d’intervention ERG Rénovation : Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94). Visite sur site offerte, devis détaillé et suivi de chantier.",
  alternates: { canonical: "https://erg-renovation.fr/zones-intervention" },
  robots: { index: true, follow: true },
};

export default function ZonesInterventionPage() {
  return <ZonesInterventionClient />;
}

    