import type { Metadata } from "next"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Breadcrumbs from "@/components/breadcrumbs"
import CtaBanner from "@/app/_components/cta-banner"
import { ShieldCheck, Building2, Phone, Mail, FileText, Scale, Lock, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "Mentions Légales",
  description:
    "Mentions légales et informations juridiques d'ERG Rénovation : éditeur, hébergeur, propriété intellectuelle et données personnelles.",
  alternates: { canonical: "https://erg-renovation.fr/mentions-legales" },
}

export default function MentionsLegalesPage() {
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
                <Scale className="h-3.5 w-3.5 text-amber-600" /> Cadre Juridique & Transparence
              </div>

              <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
                Mentions Légales
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
                Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN), il est précisé aux utilisateurs du site <strong className="text-slate-900">erg-renovation.fr</strong> l’identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
              </p>

              {/* 1. Éditeur */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 font-bold">
                    1
                  </div>
                  <h2 className="font-headline text-xl font-bold text-slate-900">Éditeur du site</h2>
                </div>
                <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 text-sm text-slate-700 space-y-2">
                  <p><strong>Dénomination sociale / Nom commercial :</strong> ERG Rénovation</p>
                  <p><strong>Siège social :</strong> 1 Sente de la Pointe, 75020 Paris, France</p>
                  <p><strong>Téléphone direct :</strong> <a href="tel:+33699961375" className="text-amber-700 font-bold hover:underline">06 99 96 13 75</a></p>
                  <p><strong>Email :</strong> <a href="mailto:contact@erg-renovation.fr" className="text-amber-700 font-bold hover:underline">contact@erg-renovation.fr</a></p>
                  <p><strong>Activité :</strong> Rénovation intérieure et tous travaux de bâtiment (maçonnerie, plomberie, électricité, menuiserie, peinture).</p>
                </div>
              </div>

              {/* 2. Directeur de la publication */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 font-bold">
                    2
                  </div>
                  <h2 className="font-headline text-xl font-bold text-slate-900">Directeur de la publication</h2>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pl-12">
                  La direction de la publication est assurée par la gérance d'<strong>ERG Rénovation</strong>.
                </p>
              </div>

              {/* 3. Hébergement */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 font-bold">
                    3
                  </div>
                  <h2 className="font-headline text-xl font-bold text-slate-900">Hébergement</h2>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pl-12">
                  Le site est hébergé de manière sécurisée par Firebase / Google Cloud Platform (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA).
                </p>
              </div>

              {/* 4. Propriété intellectuelle */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 font-bold">
                    4
                  </div>
                  <h2 className="font-headline text-xl font-bold text-slate-900">Propriété intellectuelle</h2>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pl-12">
                  L’ensemble des contenus présents sur ce site (textes, photographies, graphismes, logos, icônes, vidéos, structure) est protégé par le droit d’auteur et la propriété intellectuelle. Toute reproduction ou représentation totale ou partielle est interdite sans autorisation écrite préalable d'ERG Rénovation.
                </p>
              </div>

              {/* 5. Données personnelles & Cookies */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 font-bold">
                    5
                  </div>
                  <h2 className="font-headline text-xl font-bold text-slate-900">Données personnelles & Cookies</h2>
                </div>
                <div className="pl-12 text-sm text-slate-600 space-y-2">
                  <p>
                    Les informations collectées via les formulaires sont destinées uniquement au traitement de vos demandes de devis et d'information.
                  </p>
                  <p>
                    Pour en savoir plus sur la gestion de vos données et exercer vos droits RGPD, consultez notre{" "}
                    <Link href="/confidentialite" className="font-bold text-slate-900 underline hover:text-amber-700">
                      Politique de confidentialité
                    </Link>{" "}
                    ainsi que notre{" "}
                    <Link href="/cookies" className="font-bold text-slate-900 underline hover:text-amber-700">
                      Politique des cookies
                    </Link>.
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
