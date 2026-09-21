"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Phone, MapPin, ArrowRight, Sparkles, Navigation, ShieldCheck, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const AREAS = [
  {
    code: "75",
    title: "Paris (75)",
    description: "20e, 11e, 19e et tous les 20 arrondissements parisiens",
    highlight: "Appartements haussmanniens & studios design",
    href: "/renovation-paris",
  },
  {
    code: "92",
    title: "Hauts-de-Seine (92)",
    description: "Boulogne-Billancourt, Nanterre, Courbevoie, Neuilly, Asnières...",
    highlight: "Résidences de standing & pavillons",
    href: "/renovation-hauts-de-seine",
  },
  {
    code: "93",
    title: "Seine-Saint-Denis (93)",
    description: "Montreuil, Saint-Denis, Pantin, Aubervilliers, Noisy-le-Sec…",
    highlight: "Lofts, ateliers & espaces à fort potentiel",
    href: "/renovation-seine-saint-denis",
  },
  {
    code: "94",
    title: "Val-de-Marne (94)",
    description: "Vincennes, Saint-Mandé, Ivry-sur-Seine, Créteil, Vitry-sur-Seine…",
    highlight: "Appartements familiaux & rénovations complètes",
    href: "/renovation-val-de-marne",
  },
]

export default function ServiceAreas() {
  return (
    <section
      id="zones"
      className="relative overflow-hidden bg-slate-50/70 py-24 md:py-32 border-b border-slate-200/80"
      aria-labelledby="zones-title"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header */}
        <header className="mx-auto max-w-4xl text-center space-y-5">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-5 py-2 text-xs font-bold uppercase tracking-wider text-amber-700 shadow-sm backdrop-blur-md">
            <Navigation className="h-4 w-4 text-amber-600 animate-pulse" />
            <span>Périmètre d'Intervention Régionale</span>
          </div>

          <h2
            id="zones-title"
            className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]"
          >
            Zones d'Intervention :{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
              Paris & Île-de-France
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base sm:text-lg font-normal leading-relaxed text-slate-600">
            ERG Rénovation intervient pour vos travaux de rénovation intérieure : appartement, salle de bain et cuisine, avec un suivi structuré et des finitions soignées.
          </p>

          <div className="pt-2 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-600 font-semibold">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber-600" /> Déplacement & Visite sur Site Offerts
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-600" /> Garantie Décennale 10 Ans
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-600" /> Interlocuteur Unique
            </span>
          </div>
        </header>

        {/* 4 Cards Grid */}
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((area) => (
            <Card
              key={area.code}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-3xl",
                "border border-slate-200/80 bg-white p-7 shadow-xl shadow-slate-200/50 transition-all duration-500",
                "hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10"
              )}
            >
              {/* Ligne d'accent lumineuse supérieure */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-500 to-amber-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-t-3xl"
                aria-hidden="true"
              />

              <div className="space-y-5">
                {/* Header Icon + Department Code */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/30 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-500 shadow-md">
                    <MapPin className="h-7 w-7" aria-hidden="true" />
                  </div>

                  <span className="font-headline text-2xl font-black text-slate-300 group-hover:text-amber-500/80 transition-colors">
                    {area.code}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-headline text-xl font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                    {area.title}
                  </h3>

                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-500">
                    {area.highlight}
                  </p>

                  <p className="text-sm font-normal leading-relaxed text-slate-600">
                    {area.description}
                  </p>
                </div>
              </div>

              {/* Action Button Link */}
              <div className="mt-8 pt-4 border-t border-slate-100">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-between h-11 px-4 text-xs font-bold text-slate-900 group-hover:text-amber-600 hover:bg-amber-500/10 rounded-xl transition-all"
                >
                  <Link href={area.href} aria-label={`Voir la zone ${area.title}`}>
                    <span>Voir la zone</span>
                    <ArrowRight className="h-4 w-4 text-amber-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Global CTA Buttons */}
        <div className="mt-16 text-center space-y-4">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-amber-500 text-slate-950 font-extrabold hover:bg-amber-400 shadow-xl shadow-amber-500/20 px-9 h-14 rounded-2xl text-base"
            >
              <a href="tel:+33699961375" aria-label="Appeler ERG Rénovation">
                <Phone className="mr-2 h-5 w-5" /> Appeler maintenant (06 99 96 13 75)
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-slate-300 bg-white text-slate-900 hover:bg-slate-100 px-8 h-14 rounded-2xl text-base shadow-sm"
            >
              <Link href="/devis">
                Demander un devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <p className="text-xs font-medium text-slate-500">
            Rénovation appartement Paris • Salle de bain clé en main • Rénovation intérieure 92, 93, 94 • Garantie décennale 10 ans
          </p>
        </div>
      </div>
    </section>
  )
}
