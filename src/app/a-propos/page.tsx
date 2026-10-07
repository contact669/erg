import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import CtaBanner from "@/app/_components/cta-banner"
import Breadcrumbs from "@/components/breadcrumbs"
import AnimatedSection from "@/components/animated-section"
import { GoogleIcon } from "@/components/icons"

import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

import {
  Handshake,
  Diamond,
  Heart,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Phone,
  Clock,
  Building2,
  Award,
  Users
} from "lucide-react"

const SITE_NAME = "ERG Rénovation"
const SITE_URL = "https://erg-renovation.fr"
const PAGE_URL = `${SITE_URL}/a-propos`

export const metadata: Metadata = {
  title: `À propos`,
  description:
    "Découvrez l’histoire et les valeurs d’ERG Rénovation : entreprise familiale spécialisée en rénovation intérieure à Paris et en Île-de-France. Exécution soignée, transparence, garantie décennale.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `À propos`,
    description:
      "Entreprise familiale de rénovation intérieure à Paris & Île-de-France : savoir-faire, méthode, transparence, garantie décennale.",
    url: PAGE_URL,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: `À propos`,
    description:
      "Entreprise familiale de rénovation intérieure à Paris & Île-de-France : savoir-faire, méthode, transparence, garantie décennale.",
  },
}

const values = [
  {
    icon: Diamond,
    title: "Excellence artisanale",
    description:
      "Préparation des supports, alignements, coupes, joints, finitions : la qualité se joue dans les détails — et nous n’en laissons aucun au hasard.",
  },
  {
    icon: Handshake,
    title: "Confiance & transparence",
    description:
      "Un devis lisible, poste par poste. Des points réguliers. Une communication claire : vous savez où en est le chantier, et pourquoi.",
  },
  {
    icon: Heart,
    title: "Esprit de famille",
    description:
      "Une équipe soudée, des habitudes de travail propres, un respect constant de votre logement : c’est ce qui rend l’expérience sereine.",
  },
  {
    icon: ShieldCheck,
    title: "Engagement & garanties",
    description:
      "Planification, coordination, contrôle qualité et réception : notre méthode vise un résultat durable, couvert par la garantie décennale.",
  },
]

export default function AboutPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "about-hero")
  const storyImage = PlaceHolderImages.find((img) => img.id === "about-story")
  const founder1Image = PlaceHolderImages.find((img) => img.id === "founder-1")
  const founder2Image = PlaceHolderImages.find((img) => img.id === "founder-2")

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50">
      <SiteHeader />

      <main className="flex-grow">
        {/* HERO SECTION — Premium Light Theme */}
        <section className="relative isolate overflow-hidden bg-slate-50 border-b border-slate-200/80 py-14 md:py-20 lg:py-24">
          {/* Ambient Warm Gradients */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {heroImage ? (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description || "À propos ERG Rénovation"}
                fill
                priority
                className="object-cover opacity-[0.08] blur-xs"
                data-ai-hint={heroImage.imageHint}
                sizes="100vw"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/95 to-slate-50" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
          </div>

          <div className="container relative z-10">
            <div className="mx-auto max-w-4xl text-center space-y-6">
              <div className="flex items-center justify-center">
                <Breadcrumbs />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 text-xs sm:text-sm font-semibold text-amber-700 shadow-sm">
                  <Sparkles className="h-4 w-4 text-amber-600" /> Entreprise Familiale • Paris & Île-de-France
                </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=ERG-Entreprise+de+R%C3%A9novation+Appartement+%26+Salle+de+Bains+%C3%A0+Paris+et+%C3%8Ele-de-France"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-1 text-xs text-slate-800 shadow-sm hover:bg-white"
                >
                  <GoogleIcon className="h-4 w-4" />
                  <span className="font-bold text-amber-600">Avis clients</span>
                  <span className="text-slate-500">• Témoignages clients</span>
                </a>
              </div>

              <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Bâtir sur la Confiance, <br />
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                  Rénover avec Exigence.
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Chez ERG Rénovation, nous accompagnons les propriétaires et investisseurs parisiens avec une méthode rigoureuse,
                un suivi transparent et une réelle exigence dans les finitions.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="h-13 px-8 bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 text-base shadow-lg shadow-amber-500/20 rounded-xl"
                >
                  <Link href="/devis">
                    Estimer mon projet gratuitement <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-13 px-6 border-slate-300 bg-white text-slate-900 hover:bg-slate-100 text-base rounded-xl shadow-sm"
                >
                  <Link href="/realisations">
                    Voir nos réalisations
                  </Link>
                </Button>
              </div>

              {/* Trust Features Bar */}
              <div className="pt-4 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700">
                <span className="inline-flex items-center gap-2 bg-white/80 border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-xs">
                  <CheckCircle2 className="h-4 w-4 text-amber-600" /> Interlocuteur Unique
                </span>
                <span className="inline-flex items-center gap-2 bg-white/80 border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-xs">
                  <CheckCircle2 className="h-4 w-4 text-amber-600" /> Coordination Tous Corps d'État
                </span>
                <span className="inline-flex items-center gap-2 bg-white/80 border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-xs">
                  <ShieldCheck className="h-4 w-4 text-amber-600" /> Garantie Décennale 10 Ans
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* STORY SECTION */}
        <AnimatedSection>
          <section className="py-16 md:py-24 bg-white border-b border-slate-200/60">
            <div className="container">
              <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                {/* Left Column Image */}
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl group">
                  <div className="relative h-80 w-full lg:h-[500px]">
                    {storyImage ? (
                      <Image
                        src={storyImage.imageUrl}
                        alt={storyImage.description || "Artisans en rénovation intérieure ERG"}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        data-ai-hint={storyImage.imageHint || "craftsmen working"}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-slate-200" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-bold shrink-0">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Engagement & Qualité ERG</p>
                        <p className="text-[11px] text-slate-600">Supervision directe de chaque chantier par les fondateurs.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column Text */}
                <div className="space-y-6">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full">
                    Notre Histoire & Philosophie
                  </span>

                  <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                    Une Histoire de Frères, Une Exigence Commune.
                  </h2>

                  <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                    <p>
                      ERG Rénovation est née d’une vision simple : offrir aux particuliers et investisseurs parisiens une rénovation intérieure de haute précision, où la rigueur du suivi et la propreté du chantier comptent tout autant que la beauté des finitions.
                    </p>
                    <p>
                      Nous avons bâti notre réputation sur trois engagements indéfectibles : un <strong className="text-slate-900 font-semibold">diagnostic initial gratuit et sans zones floues</strong>, une <strong className="text-slate-900 font-semibold">coordination tous corps d'état maîtrisée</strong> et un <strong className="text-slate-900 font-semibold">contrôle qualité systématique</strong> avant chaque réception.
                    </p>
                    <p>
                      Basés à Paris, nous intervenons également dans les Hauts-de-Seine (92), la Seine-Saint-Denis (93) et le Val-de-Marne (94) avec une équipe d'artisans fidèles et passionnés.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-bold">
                      <Link href="/realisations">Découvrir nos réalisations</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-slate-300 text-slate-900 hover:bg-slate-100 rounded-xl">
                      <Link href="/services">
                        Nos prestations <ArrowRight className="ml-2 h-4 w-4 text-amber-600" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* METHODOLOGY 3 STEPS CARDS */}
              <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3">
                <Card className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-xs hover:shadow-md hover:border-amber-500/40 transition-all">
                  <CardContent className="p-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-100/80 px-2.5 py-1 rounded-md">Étape 01</span>
                      <Building2 className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="font-headline text-lg font-bold text-slate-900">01. Cadrage & Diagnostic</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Visite gratuite sur site, analyse des contraintes de copropriété, choix des finitions et devis transparent poste par poste.
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-xs hover:shadow-md hover:border-amber-500/40 transition-all">
                  <CardContent className="p-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-100/80 px-2.5 py-1 rounded-md">Étape 02</span>
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="font-headline text-lg font-bold text-slate-900">02. Exécution & Pilotage</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Protection des parties communes, coordination des plombiers, électriciens, peintres et points d'avancement réguliers.
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-xs hover:shadow-md hover:border-amber-500/40 transition-all">
                  <CardContent className="p-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-100/80 px-2.5 py-1 rounded-md">Étape 03</span>
                      <ShieldCheck className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="font-headline text-lg font-bold text-slate-900">03. Contrôle & Finitions</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Vérification minutieuse des joints, alignements et peintures, nettoyage de fin de chantier et livraison clés en main.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* VALUES SECTION */}
        <AnimatedSection>
          <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-200/60">
            <div className="container">
              <div className="mx-auto mb-12 max-w-2xl text-center space-y-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-semibold text-amber-700">
                  <Heart className="h-3.5 w-3.5 text-amber-600" /> Nos Piliers de Confiance
                </span>
                <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-slate-900">
                  Des Valeurs Visibles Dans Chaque Détail
                </h2>
                <p className="text-slate-600 text-base">
                  Quatre convictions fondamentales qui guident nos équipes, du premier devis jusqu'à la remise des clés.
                </p>
              </div>

              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {values.map((v) => (
                  <Card
                    key={v.title}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardContent className="p-0 space-y-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                        <v.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-headline text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                        {v.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {v.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* FOUNDERS SECTION */}
        <AnimatedSection>
          <section className="py-16 md:py-24 bg-white">
            <div className="container">
              <div className="mx-auto mb-12 max-w-2xl text-center space-y-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-semibold text-amber-700">
                  <Users className="h-3.5 w-3.5 text-amber-600" /> Direction & Coordination
                </span>
                <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-slate-900">
                  À la Direction : Un Pilotage Clair & Une Exigence Constante
                </h2>
                <p className="text-slate-600 text-base">
                  Deux profils complémentaires pour garantir la rigueur technique, le respect des délais et une communication transparente.
                </p>
              </div>

              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
                {/* Founder 1 */}
                <Card className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg hover:shadow-xl hover:border-amber-500/40 transition-all duration-300">
                  <CardContent className="p-0 flex flex-col items-center text-center">
                    <Avatar className="h-28 w-28 ring-4 ring-amber-500/30 shadow-md">
                      {founder1Image ? (
                        <AvatarImage
                          src={founder1Image.imageUrl}
                          alt="Portrait du co-fondateur K. AIT"
                          data-ai-hint={founder1Image.imageHint}
                        />
                      ) : null}
                      <AvatarFallback className="bg-slate-900 text-amber-400 font-extrabold text-xl">K.A</AvatarFallback>
                    </Avatar>

                    <h3 className="mt-5 font-headline text-2xl font-extrabold text-slate-900">K. AIT</h3>
                    <p className="mt-1 text-sm font-bold text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full">
                      Co-fondateur • Maître d’œuvre
                    </p>

                    <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600">
                      Garant de la conformité technique : gestion des structures, réseaux de plomberie, électricité aux normes NF C 15-100 et finitions soignées. Il supervise le travail des artisans sur le terrain.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                        Contrôle Qualité
                      </span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                        Supervision Chantier
                      </span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                        Normes BTP
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Founder 2 */}
                <Card className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg hover:shadow-xl hover:border-amber-500/40 transition-all duration-300">
                  <CardContent className="p-0 flex flex-col items-center text-center">
                    <Avatar className="h-28 w-28 ring-4 ring-amber-500/30 shadow-md">
                      {founder2Image ? (
                        <AvatarImage
                          src={founder2Image.imageUrl}
                          alt="Portrait du co-fondateur A. AIT"
                          data-ai-hint={founder2Image.imageHint}
                        />
                      ) : null}
                      <AvatarFallback className="bg-slate-900 text-amber-400 font-extrabold text-xl">A.A</AvatarFallback>
                    </Avatar>

                    <h3 className="mt-5 font-headline text-2xl font-extrabold text-slate-900">A. AIT</h3>
                    <p className="mt-1 text-sm font-bold text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full">
                      Co-fondateur • Chargé de Projet Client
                    </p>

                    <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600">
                      Votre interlocuteur privilégié : étude de vos besoins, chiffrage transparent poste par poste, planification et communication continue pour un projet zéro stress.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                        Devis & Chiffrage
                      </span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                        Gestion Planning
                      </span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                        Relation Client
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Final Reassurance Banner */}
              <div className="mx-auto mt-16 max-w-3xl text-center space-y-6 bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-sm">
                <h3 className="font-headline text-2xl font-bold text-slate-900">
                  Prêt à concrétiser votre projet de rénovation ?
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Décrivez-nous votre appartement ou salle de bain à Paris et en Île-de-France. Nous organisons une visite rapide sur site pour établir un chiffrage clair et détaillé.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md h-12 px-8">
                    <Link href="/devis">Simuler mon devis gratuit</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-slate-300 text-slate-900 hover:bg-slate-100 rounded-xl h-12 px-6">
                    <a href="tel:+33699961375">
                      <Phone className="mr-2 h-4 w-4 text-amber-600" />
                      06 99 96 13 75
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* CTA BANNER */}
        <CtaBanner />
      </main>

      <SiteFooter />
    </div>
  )
}
