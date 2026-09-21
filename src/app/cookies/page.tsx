import type { Metadata } from "next"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Breadcrumbs from "@/components/breadcrumbs"
import CtaBanner from "@/app/_components/cta-banner"
import { Cookie, ShieldCheck, CheckCircle2, Lock } from "lucide-react"

export const metadata: Metadata = {
  title: "Gestion des Cookies | ERG Rénovation",
  description:
    "Informations sur l’utilisation des cookies sur le site ERG Rénovation : types de cookies, finalités, durée de conservation et gestion de vos préférences.",
  alternates: { canonical: "https://erg-renovation.fr/cookies" },
}

export default function CookiesPage() {
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
                <Cookie className="h-3.5 w-3.5 text-amber-600" /> Respect de Votre Vie Privée
              </div>

              <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
                Politique de Gestion des Cookies
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Dernière mise à jour : <strong className="text-slate-800">{lastUpdated}</strong>
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT GRID */}
        <section className="py-12 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
              {/* Main Article */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg space-y-6 text-sm text-slate-700 leading-relaxed">
                <div>
                  <h2 className="font-headline text-xl font-bold text-slate-900 mb-2">1. Définition d'un Cookie</h2>
                  <p className="text-slate-600">
                    Un cookie est un fichier texte temporaire déposé sur votre appareil lors de la navigation. Il permet de mémoriser vos préférences de navigation et d'assurer le fonctionnement optimal du site.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h2 className="font-headline text-xl font-bold text-slate-900 mb-3">2. Cookies Utilisés sur ERG Rénovation</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                        <CheckCircle2 className="h-4 w-4 text-amber-600" />
                        <span>Cookies Essentiels (Fonctionnement)</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Indispensables à la navigation, la mémoire de vos préférences de consentement et la sécurité des formulaires.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                        <CheckCircle2 className="h-4 w-4 text-amber-600" />
                        <span>Cookies d'Audience Anonymisés (Analytics)</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Utilisés pour mesurer la fréquentation globale de notre site sans identification nominative.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h2 className="font-headline text-xl font-bold text-slate-900 mb-2">3. Gestion & Refus via le Navigateur</h2>
                  <p className="text-slate-600 mb-2">
                    Vous pouvez désactiver les cookies à tout moment dans les options de votre navigateur Internet (Chrome, Firefox, Safari, Edge).
                  </p>
                </div>
              </div>

              {/* Sidebar Summary */}
              <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-md space-y-4">
                <h3 className="font-headline text-lg font-bold text-slate-900">En Résumé</h3>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <p className="font-bold text-slate-900 mb-0.5">Choix de Consentement</p>
                    <p>Mémorisé pour 12 mois dans votre navigateur.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <p className="font-bold text-slate-900 mb-0.5">Données Sécurisées</p>
                    <p>Aucun cookie publicitaire tiers n'est revendu.</p>
                  </div>

                  <div className="pt-2">
                    <a
                      href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-amber-700 hover:underline"
                    >
                      Conseils de la CNIL →
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>

      <SiteFooter />
    </div>
  )
}
