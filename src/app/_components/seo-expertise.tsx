import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Sparkles,
  Layers,
  ChevronRight,
} from "lucide-react"

const PHONE = "+33699961375"
const PHONE_DISPLAY = "06 99 96 13 75"
const SERVICE_AREAS = ["Paris (75)", "Hauts-de-Seine (92)", "Seine-Saint-Denis (93)", "Val-de-Marne (94)"]

export default function SeoExpertise() {
  return (
    <section
      id="expertise"
      aria-labelledby="seo-home-title"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50/50 via-white to-slate-50/70 py-24 md:py-32 border-t border-slate-200/80"
    >
      {/* Subtle Background Glows */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 bg-slate-900/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            
            {/* Left Column: Brand Story & Persuasive Value Prop */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Badge Tag */}
              <div className="inline-flex items-center gap-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-5 py-2 text-xs font-bold uppercase tracking-wider text-amber-700 shadow-xs">
                <Sparkles className="h-4 w-4 text-amber-600 animate-pulse" />
                <span>Savoir-Faire & Exigence Parisienne</span>
              </div>

              {/* Headline */}
              <h2
                id="seo-home-title"
                className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18]"
              >
                Entreprise de Rénovation à Paris :{" "}
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                  Un Chantier Maîtrisé, Du 1er RDV Aux Finitions
                </span>
              </h2>

              {/* Story Paragraphs */}
              <div className="space-y-5 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                <p className="border-l-4 border-amber-500 pl-4 py-1.5 bg-amber-500/5 rounded-r-xl">
                  Chez <strong className="text-slate-900 font-semibold">ERG Rénovation</strong>, nous rénovons des intérieurs à Paris et en Île-de-France avec une exigence simple :{" "}
                  <span className="font-bold text-slate-900 underline decoration-amber-500/40 underline-offset-4">livrer propre</span>,{" "}
                  <span className="font-bold text-slate-900 underline decoration-amber-500/40 underline-offset-4">dans les règles</span>, et{" "}
                  <span className="font-bold text-slate-900 underline decoration-amber-500/40 underline-offset-4">sans zones floues</span>.{" "}
                  L’objectif n’est pas seulement “beau” : c’est <strong className="text-slate-900 font-bold">durable</strong>, <strong className="text-slate-900 font-bold">précis</strong>, et <strong className="text-slate-900 font-bold">bien suivi</strong>.
                </p>

                <p>
                  Pour une rénovation d’appartement, de salle de bain ou de cuisine, vous bénéficiez d’un{" "}
                  <strong className="text-slate-900 font-semibold">interlocuteur unique</strong>, d’une{" "}
                  <strong className="text-slate-900 font-semibold">coordination tous corps d’état</strong>, et d’un{" "}
                  <strong className="text-slate-900 font-semibold">devis détaillé (poste par poste)</strong> pour arbitrer sereinement les options de finitions et de matériaux.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-amber-500 text-slate-950 font-extrabold hover:bg-amber-400 shadow-xl shadow-amber-500/20 px-8 h-14 rounded-2xl text-base"
                >
                  <Link href="/devis" aria-label="Décrire mon projet de rénovation">
                    Décrire mon projet <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-slate-300 bg-white text-slate-900 hover:bg-slate-100 px-7 h-14 rounded-2xl text-base shadow-sm"
                >
                  <a href={`tel:${PHONE}`} aria-label={`Appeler ERG Rénovation au ${PHONE_DISPLAY}`}>
                    <Phone className="mr-2 h-5 w-5 text-amber-600" />
                    Appeler maintenant
                  </a>
                </Button>
              </div>

              {/* Reassurance Chips */}
              <div className="pt-4 flex flex-wrap gap-2.5 text-xs font-semibold text-slate-700">
                <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 shadow-xs">
                  <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>{SERVICE_AREAS.join(" • ")}</span>
                </span>
                
                <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 shadow-xs">
                  <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>Visite sur site & estimation claire</span>
                </span>

                <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 shadow-xs">
                  <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>Protection & propreté du chantier</span>
                </span>
              </div>
            </div>

            {/* Right Column: 3 Architectural Pillar Cards + Quick Links Nav */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 1: Devis clair & arbitrages */}
              <Card className="group overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-lg shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-xl">
                <CardContent className="p-0 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700 font-extrabold text-lg border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    01
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-headline text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors flex items-center gap-2">
                      Devis clair & arbitrages facilités
                    </h3>
                    <p className="text-sm font-normal leading-relaxed text-slate-600">
                      Un chiffrage lisible, des options de finitions, et une logique simple pour décider sans surprises.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Card 2: Coordination tous corps d'état */}
              <Card className="group overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-lg shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-xl">
                <CardContent className="p-0 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700 font-extrabold text-lg border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    02
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-headline text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors flex items-center gap-2">
                      Coordination tous corps d’état
                    </h3>
                    <p className="text-sm font-normal leading-relaxed text-slate-600">
                      Une organisation claire : planification, enchaînement des étapes, et contrôles réguliers.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Card 3: Finitions & propreté */}
              <Card className="group overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-lg shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-xl">
                <CardContent className="p-0 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700 font-extrabold text-lg border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    03
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-headline text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors flex items-center gap-2">
                      Finitions & propreté : la différence
                    </h3>
                    <p className="text-sm font-normal leading-relaxed text-slate-600">
                      Protection des lieux, finitions soignées, réception cadrée : un rendu premium, livré propre.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Card (Services Clés) */}
              <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 text-white shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-amber-400" />
                    <span className="font-headline font-extrabold text-base tracking-wide text-white">
                      Explorer nos services clés
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                    Paris & IDF
                  </span>
                </div>

                <ul className="grid gap-2.5 pt-1 text-sm font-medium">
                  <li>
                    <Link
                      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200 transition hover:bg-white/10 hover:text-amber-400"
                      href="/services/renovation-appartement"
                    >
                      <span>Rénovation d’appartement</span>
                      <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-amber-400" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200 transition hover:bg-white/10 hover:text-amber-400"
                      href="/services/renovation-salle-de-bain"
                    >
                      <span>Rénovation salle de bain</span>
                      <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-amber-400" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200 transition hover:bg-white/10 hover:text-amber-400"
                      href="/services/renovation-cuisine"
                    >
                      <span>Rénovation cuisine</span>
                      <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-amber-400" />
                    </Link>
                  </li>
                  <li className="pt-1">
                    <Link
                      className="inline-flex items-center text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                      href="/services"
                    >
                      Voir toutes les prestations <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
