import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import CtaBanner from "@/app/_components/cta-banner"
import Breadcrumbs from "@/components/breadcrumbs"
import AnimatedSection from "@/components/animated-section"

import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

import { Handshake, Diamond, Heart, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react"

const SITE_NAME = "ERG Rénovation"
const SITE_URL = "https://erg-renovation.fr"
const PAGE_URL = `${SITE_URL}/a-propos`

export const metadata: Metadata = {
  title: `À propos | ${SITE_NAME}`,
  description:
    "Découvrez l’histoire et les valeurs d’ERG Rénovation : entreprise familiale spécialisée en rénovation intérieure à Paris et en Île-de-France. Exécution soignée, transparence, garantie décennale.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `À propos | ${SITE_NAME}`,
    description:
      "Entreprise familiale de rénovation intérieure à Paris & Île-de-France : savoir-faire, méthode, transparence, garantie décennale.",
    url: PAGE_URL,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: `À propos | ${SITE_NAME}`,
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
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-grow">
        {/* HERO — sobre, premium */}
        <section className="relative overflow-hidden">
          <div className="relative h-[58vh] min-h-[420px] w-full">
            {heroImage ? (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description || "À propos ERG Rénovation"}
                fill
                priority
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                sizes="100vw"
              />
            ) : (
              <div className="h-full w-full bg-muted" />
            )}

            {/* overlays propres */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60" />
            <div className="absolute inset-0 bg-primary/20" />

            <div className="container absolute inset-0 z-10 flex flex-col items-center justify-center">
              <Breadcrumbs variant="dark" />
              <div className="mx-auto max-w-4xl text-center text-primary-foreground">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Entreprise familiale • Paris & Île-de-France
                </p>

                <h1 className="mt-4 font-headline text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                  Bâtir sur la confiance,
                  <br className="hidden sm:block" />
                  rénover avec exigence
                </h1>

                <p className="mt-6 text-base leading-relaxed text-white/80 md:text-lg">
                  Chez ERG Rénovation, nous pilotons des rénovations intérieures avec une méthode claire, une exécution
                  soignée et une obsession des finitions. Objectif : un chantier serein, un résultat durable.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/devis">Demander un devis</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/25 bg-transparent text-white hover:bg-white hover:text-primary">
                    <Link href="/realisations">
                      Voir nos réalisations <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="mt-6 flex flex-col items-center justify-center gap-2 text-xs text-white/70 sm:flex-row sm:gap-5">
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" /> Interlocuteur unique
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" /> Suivi structuré
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" /> Garantie décennale
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STORY — contenu SEO propre + image */}
        <AnimatedSection>
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="relative overflow-hidden rounded-2xl border bg-muted/40">
                  <div className="relative h-80 w-full lg:h-[520px]">
                    {storyImage ? (
                      <Image
                        src={storyImage.imageUrl}
                        alt={storyImage.description || "Artisans en rénovation intérieure"}
                        fill
                        className="object-cover"
                        data-ai-hint={storyImage.imageHint || "craftsmen working"}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-muted" />
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-accent">Notre histoire</p>
                  <h2 className="mt-3 font-headline text-3xl font-bold tracking-tight md:text-4xl">
                    Une histoire de frères, une exigence commune
                  </h2>

                  <div className="mt-6 space-y-4 text-muted-foreground md:text-lg md:leading-relaxed">
                    <p>
                      ERG Rénovation est née d’une vision simple : proposer une rénovation intérieure hautement maîtrisée,
                      où la qualité d’exécution et la clarté du suivi comptent autant que le rendu final.
                    </p>
                    <p>
                      Nous avons structuré notre méthode autour de trois piliers :{" "}
                      <span className="font-medium text-foreground">diagnostic précis</span>,{" "}
                      <span className="font-medium text-foreground">coordination tous corps d’état</span> et{" "}
                      <span className="font-medium text-foreground">contrôle des finitions</span>. Résultat : des chantiers
                      plus fluides, des décisions plus simples, et une réception plus sereine.
                    </p>
                    <p>
                      Basés à Paris, nous intervenons également en petite couronne (92, 93, 94) selon les projets, avec le
                      même niveau d’exigence.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button asChild size="lg">
                      <Link href="/realisations">Découvrir nos projets</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link href="/services">
                        Voir nos services <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* mini bloc “méthode” (SEO utile + conversion) */}
              <div className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-3">
                <Card className="bg-secondary/40">
                  <CardContent className="p-6">
                    <p className="text-sm font-semibold text-foreground">1) Cadrage</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Visite, contraintes, objectifs, options : on clarifie le projet avant de chiffrer.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-secondary/40">
                  <CardContent className="p-6">
                    <p className="text-sm font-semibold text-foreground">2) Exécution</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Planification, protections, coordination : le chantier avance proprement, étape par étape.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-secondary/40">
                  <CardContent className="p-6">
                    <p className="text-sm font-semibold text-foreground">3) Finitions</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Contrôle qualité, reprises si nécessaire, réception : un rendu net et durable.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* VALUES — plus premium, cartes épurées */}
        <AnimatedSection>
          <section className="bg-secondary/40 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto mb-10 max-w-2xl text-center">
                <p className="text-sm font-medium text-accent">Notre engagement</p>
                <h2 className="mt-3 font-headline text-3xl font-bold tracking-tight md:text-4xl">
                  Des valeurs visibles dans chaque détail
                </h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                  Quatre piliers qui guident nos choix, du devis à la réception.
                </p>
              </div>

              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {values.map((v) => (
                  <Card key={v.title} className="border bg-background/70">
                    <CardContent className="p-6">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <v.icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 font-headline text-lg font-semibold">{v.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* FOUNDERS — plus “brand”, plus crédible */}
        <AnimatedSection>
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto mb-10 max-w-2xl text-center">
                <p className="text-sm font-medium text-accent">L’équipe</p>
                <h2 className="mt-3 font-headline text-3xl font-bold tracking-tight md:text-4xl">
                  À la direction : un pilotage clair, une exigence constante
                </h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                  Deux profils complémentaires pour sécuriser la technique, le planning et la qualité finale.
                </p>
              </div>

              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
                {/* Founder 1 */}
                <Card className="overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-28 w-28 ring-2 ring-accent/60">
                        {founder1Image ? (
                          <AvatarImage
                            src={founder1Image.imageUrl}
                            alt="Portrait du co-fondateur"
                            data-ai-hint={founder1Image.imageHint}
                          />
                        ) : null}
                        <AvatarFallback>K.A</AvatarFallback>
                      </Avatar>

                      <h3 className="mt-5 font-headline text-2xl font-bold">K. AIT</h3>
                      <p className="mt-1 text-sm font-semibold text-accent">Co-fondateur • Maître d’œuvre</p>

                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        Garant de la qualité technique : conformité, méthodes de pose, étanchéité, finitions. Supervision
                        chantier et contrôle des points critiques pour un résultat durable.
                      </p>

                      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                        <span className="rounded-full border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
                          Contrôle qualité
                        </span>
                        <span className="rounded-full border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
                          Coordination artisans
                        </span>
                        <span className="rounded-full border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
                          Réception chantier
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Founder 2 */}
                <Card className="overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-28 w-28 ring-2 ring-accent/60">
                        {founder2Image ? (
                          <AvatarImage
                            src={founder2Image.imageUrl}
                            alt="Portrait du co-fondateur"
                            data-ai-hint={founder2Image.imageHint}
                          />
                        ) : null}
                        <AvatarFallback>A.A</AvatarFallback>
                      </Avatar>

                      <h3 className="mt-5 font-headline text-2xl font-bold">A. AIT</h3>
                      <p className="mt-1 text-sm font-semibold text-accent">Co-fondateur • Chargé de projet</p>

                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        Votre interlocuteur : cadrage du besoin, budget, planning, arbitrages. Un suivi structuré et des
                        points réguliers pour une expérience fluide, du devis à la livraison.
                      </p>

                      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                        <span className="rounded-full border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
                          Devis & chiffrage
                        </span>
                        <span className="rounded-full border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
                          Planning
                        </span>
                        <span className="rounded-full border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
                          Communication
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* CTA final contextuel */}
              <div className="mx-auto mt-10 max-w-3xl text-center">
                <p className="text-muted-foreground">
                  Vous avez un projet à Paris ou en Île-de-France ? Décrivez-nous vos objectifs : nous vous répondrons avec
                  une estimation claire et une méthode de travail simple.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="/devis">Demander un devis</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/contact">
                      Nous contacter <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <CtaBanner />
      </main>

      <SiteFooter />
    </div>
  )
}
