import type { Metadata } from "next"
import Link from "next/link"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Breadcrumbs from "@/components/breadcrumbs"
import CtaBanner from "@/app/_components/cta-banner"
import { ShieldCheck, Lock, Eye, FileText, UserCheck, CheckCircle2 } from "lucide-react"

const SITE_NAME = "ERG Rénovation"
const SITE_URL = "https://erg-renovation.fr"
const PAGE_URL = `${SITE_URL}/confidentialite`

export const metadata: Metadata = {
  title: `Politique de Confidentialité`,
  description:
    "Politique de confidentialité d’ERG Rénovation : données collectées, finalités, base légale, durée de conservation, cookies et droits RGPD.",
  alternates: { canonical: PAGE_URL },
}

export default function ConfidentialitePage() {
  const lastUpdated = "1 janvier 2026"

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50">
      <SiteHeader />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative isolate overflow-hidden bg-slate-50 border-b border-slate-200/80 py-12 md:py-16">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-50/80 to-slate-50" />
          </div>

          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <Breadcrumbs />
              
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-semibold text-amber-700">
                <Lock className="h-3.5 w-3.5 text-amber-600" /> Protection des Données & Conforme RGPD
              </div>

              <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
                Politique de Confidentialité
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Dernière mise à jour : <strong className="text-slate-800">{lastUpdated}</strong>
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-12 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 md:p-12 shadow-lg space-y-8">
              <p className="text-sm text-slate-600 leading-relaxed">
                ERG Rénovation attache une grande importance à la protection de vos données personnelles. La présente politique explique quelles données nous collectons, pourquoi nous les collectons et quels sont vos droits, conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi “Informatique et Libertés”.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <ShieldCheck className="h-5 w-5 text-amber-600 mb-1" />
                  <h4 className="font-bold text-sm text-slate-900">Pas de Revente de Données</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Vos coordonnées servent uniquement au traitement de votre projet de rénovation.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <UserCheck className="h-5 w-5 text-amber-600 mb-1" />
                  <h4 className="font-bold text-sm text-slate-900">Droits RGPD Garantis</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Accès, modification et suppression sur simple demande par email.</p>
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-slate-100 text-sm text-slate-700 leading-relaxed">
                <div>
                  <h3 className="font-headline text-lg font-bold text-slate-900 mb-2">1. Responsable du traitement</h3>
                  <p className="text-slate-600">
                    Le responsable du traitement des données est la société <strong>ERG Rénovation</strong> (1 Sente de la Pointe, 75020 Paris • <a href="mailto:contact@erg-renovation.fr" className="text-amber-700 font-bold hover:underline">contact@erg-renovation.fr</a>).
                  </p>
                </div>

                <div>
                  <h3 className="font-headline text-lg font-bold text-slate-900 mb-2">2. Données collectées & Finalités</h3>
                  <p className="text-slate-600 mb-2">Nous collectons uniquement les informations nécessaires au traitement de vos demandes de devis et de contact :</p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>Nom et prénom (pour personnaliser nos échanges).</li>
                    <li>Adresse email et téléphone (pour transmettre votre devis et fixer la visite sur site).</li>
                    <li>Précisions sur votre chantier (surface, pièces, contraintes locales).</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-headline text-lg font-bold text-slate-900 mb-2">3. Durée de conservation</h3>
                  <p className="text-slate-600">
                    Les données relatives aux devis et prospects sont conservées jusqu'à 36 mois après le dernier contact, puis archivées conformément aux obligations comptables et légales de garantie décennale (10 ans).
                  </p>
                </div>

                <div>
                  <h3 className="font-headline text-lg font-bold text-slate-900 mb-2">4. Exercer vos droits</h3>
                  <p className="text-slate-600">
                    Pour exercer vos droits d'accès, de rectification ou de suppression de vos données, écrivez-nous à <a href="mailto:contact@erg-renovation.fr" className="text-amber-700 font-bold hover:underline">contact@erg-renovation.fr</a>. Vous pouvez également consulter notre <Link href="/cookies" className="font-bold text-slate-900 underline hover:text-amber-700">Politique de gestion des cookies</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>

      <SiteFooter />
    </div>
  )
}
