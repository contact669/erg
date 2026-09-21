"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { GoogleIcon } from "@/components/icons"
import { Star, ShieldCheck, Clock, Phone, ArrowRight, Sparkles, CheckCircle2, Layers } from "lucide-react"
import BeforeAfterSlider from "@/components/ui/before-after-slider"

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
      ))}
    </div>
  )
}

function GoogleReviewBadge() {
  return (
    <a
      href="https://www.google.com/maps/search/?api=1&query=ERG-Entreprise+de+R%C3%A9novation+Appartement+%26+Salle+de+Bains+%C3%A0+Paris+et+%C3%8Ele-de-France"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 backdrop-blur-md px-4 py-2 text-xs sm:text-sm text-slate-900 transition hover:bg-white shadow-md"
    >
      <GoogleIcon className="h-5 w-5" />
      <span className="font-bold text-amber-600">4.9 / 5</span>
      <Stars rating={5} />
      <span className="hidden sm:inline text-slate-600">• 36 avis certifiés</span>
    </a>
  )
}

const HERO_PROJECTS = [
  {
    id: "studio-paris",
    title: "Studio 25m²",
    subtitle: "Paris 11e",
    beforeImage: "/images/realisations/renovation-studio-avant.webp",
    afterImage: "/images/realisations/renovation-studio-apres.webp",
    beforeLabel: "Studio Origine",
    afterLabel: "Studio ERG Rénové",
  },
  {
    id: "appartement-haussmann",
    title: "Appartement 65m²",
    subtitle: "Paris 16e",
    beforeImage: "/images/realisations/renovation-appartement-65m2-avant.webp",
    afterImage: "/images/realisations/renovation-appartement-65m2-apres.webp",
    beforeLabel: "Avant Travaux",
    afterLabel: "Après Rénovation",
  },
  {
    id: "salle-de-bain",
    title: "Salle de Bain 3m²",
    subtitle: "Optimisation & Luxe",
    beforeImage: "/images/realisations/renovation-salle-de-bain-3m2-avant.webp",
    afterImage: "/images/realisations/renovation-salle-de-bain-3m2-apres.webp",
    beforeLabel: "Ancienne SDB",
    afterLabel: "SDB Moderne ERG",
  },
  {
    id: "cuisine",
    title: "Cuisine Équipée",
    subtitle: "Sur-mesure",
    beforeImage: "/images/realisations/renovation-cuisine-avant.webp",
    afterImage: "/images/realisations/renovation-cuisine-apres.webp",
    beforeLabel: "Cuisine Démodée",
    afterLabel: "Cuisine Contemporaine",
  },
]

export default function Hero() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const activeProject = HERO_PROJECTS[activeProjectIndex]

  const heroBg = PlaceHolderImages.find((img) => img.id === "hero-image")?.imageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"

  return (
    <section className="relative isolate w-full overflow-hidden bg-slate-50/90 py-10 sm:py-16 md:py-20 lg:py-24 border-b border-slate-200/80">
      {/* Background Image with Enhanced Opacity & Depth */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt="Rénovation appartement Paris haut de gamme"
          fill
          priority
          className="object-cover opacity-25 blur-[2px] scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-slate-50/90 to-slate-50/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="flex flex-wrap items-center gap-3">
              <GoogleReviewBadge />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-700">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" /> Rénovation Clé en Main à Paris & 92/93/94
              </span>
            </div>

            <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              L'Art de la Rénovation <br />
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                Haute Précision à Paris.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Appartements haussmanniens, studios & salles de bain sur-mesure. Profitez d'un <strong className="text-slate-900 font-semibold">interlocuteur unique</strong>, d'un <strong className="text-slate-900 font-semibold">suivi rigoureux</strong> et d'un devis transparent poste par poste.
            </p>

            {/* Proof Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white/90 p-3 text-slate-800 shadow-sm backdrop-blur-md">
                <ShieldCheck className="h-5 w-5 text-amber-600 shrink-0" />
                <div className="text-xs font-medium">
                  <span className="block font-bold text-slate-900">Garantie Décennale</span>
                  Couverture complète
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white/90 p-3 text-slate-800 shadow-sm backdrop-blur-md">
                <Clock className="h-5 w-5 text-amber-600 shrink-0" />
                <div className="text-xs font-medium">
                  <span className="block font-bold text-slate-900">Délais Engagés</span>
                  Planning respecté
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white/90 p-3 text-slate-800 shadow-sm backdrop-blur-md">
                <CheckCircle2 className="h-5 w-5 text-amber-600 shrink-0" />
                <div className="text-xs font-medium">
                  <span className="block font-bold text-slate-900">Devis gratuit 24h</span>
                  Poste par poste
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 text-base shadow-xl shadow-amber-500/20 rounded-xl"
              >
                <Link href="/devis">
                  Simuler mon projet & devis <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 px-6 border-slate-300 bg-white text-slate-900 hover:bg-slate-100 text-base rounded-xl shadow-sm"
              >
                <a href="tel:+33699961375">
                  <Phone className="mr-2 h-5 w-5 text-amber-600" />
                  06 99 96 13 75
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column: ENLARGED & PERFECTLY CONTAINED Interactive Before/After Visual Showcase */}
          <div className="lg:col-span-6 relative w-full">
            <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
              {/* Decorative Glow */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-amber-500/30 via-amber-400/20 to-amber-600/30 blur-2xl opacity-85" />
              
              {/* Unified White Card Container encompassing Main Image & Project Selector */}
              <div className="relative rounded-3xl bg-white p-4 sm:p-5 shadow-2xl border border-slate-200/90 backdrop-blur-xl space-y-4 overflow-hidden w-full">
                {/* Main Expanded Before/After Slider */}
                <div className="relative w-full overflow-hidden">
                  <BeforeAfterSlider
                    key={activeProject.id}
                    beforeImage={activeProject.beforeImage}
                    afterImage={activeProject.afterImage}
                    beforeLabel={activeProject.beforeLabel}
                    afterLabel={activeProject.afterLabel}
                    alt={`Rénovation ${activeProject.title} ${activeProject.subtitle}`}
                    aspectRatio="aspect-[4/3] sm:aspect-[16/11]"
                    className="w-full rounded-2xl shadow-inner overflow-hidden border border-slate-200/60"
                  />
                  
                  {/* Floating caption badge */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        {activeProject.title} — <span className="text-amber-600 font-medium">{activeProject.subtitle}</span>
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                      ↔ Glissez le curseur pour comparer
                    </span>
                  </div>
                </div>

                {/* Separator */}
                <div className="h-px w-full bg-slate-100" />

                {/* Multi-project Selector Thumbnails inside the White Card */}
                <div className="w-full">
                  <div className="mb-2.5 flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Projets de rénovation à la une :</span>
                    <span className="text-[11px] font-normal text-slate-500 hidden sm:inline">Cliquez pour afficher</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full">
                    {HERO_PROJECTS.map((proj, idx) => {
                      const isActive = idx === activeProjectIndex
                      return (
                        <button
                          key={proj.id}
                          onClick={() => setActiveProjectIndex(idx)}
                          type="button"
                          className={`group relative flex flex-col items-start p-2 rounded-xl text-left border transition-all duration-200 ${
                            isActive
                              ? "bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/40 shadow-sm scale-[1.02]"
                              : "bg-slate-50/80 border-slate-200/80 hover:bg-slate-100/80 hover:border-slate-300"
                          }`}
                        >
                          <div className="relative w-full h-16 sm:h-20 rounded-lg overflow-hidden mb-1.5 bg-slate-900">
                            <Image
                              src={proj.afterImage}
                              alt={proj.title}
                              fill
                              sizes="(max-width: 640px) 25vw, 15vw"
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                            <span className="absolute bottom-1 left-1.5 text-[10px] font-bold text-white uppercase tracking-wider bg-black/40 backdrop-blur-xs px-1.5 py-0.5 rounded">
                              {proj.title}
                            </span>
                          </div>
                          <span className={`text-[11px] font-bold truncate w-full ${isActive ? "text-amber-700" : "text-slate-800"}`}>
                            {proj.title}
                          </span>
                          <span className="text-[10px] text-slate-500 truncate w-full">
                            {proj.subtitle}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

