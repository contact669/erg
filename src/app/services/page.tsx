import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import Image from "next/image"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import CtaBanner from "@/app/_components/cta-banner"
import AnimatedSection from "@/components/animated-section"
import Breadcrumbs from "@/components/breadcrumbs"

import { Button } from "@/components/ui/button"
import { services } from "@/lib/data"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

import {
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  ClipboardList,
  Wrench,
  Sparkles,
  BadgeCheck,
  Clock,
  Phone,
} from "lucide-react"

const SITE_NAME = "ERG Rénovation"
const SITE_URL = "https://erg-renovation.fr"
const PAGE_URL = `${SITE_URL}/services`
const PHONE_NUMBER = "+33699961375"
const PHONE_TEL = "tel:+33699961375"

export const metadata: Metadata = {
  title: `Prestations de rénovation | Appartement, salle de bain, cuisine | ${SITE_NAME}`,
  description:
    "Découvrez toutes nos prestations de rénovation intérieure à Paris et en Île-de-France : rénovation d’appartement, salle de bain, cuisine, finitions, coordination tous corps d’état. Devis gratuit.",
  alternates: { canonical: PAGE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `Prestations de rénovation | ${SITE_NAME}`,
    description:
      "Rénovation intérieure à Paris & Île-de-France : appartement, salle de bain, cuisine. Devis gratuit, suivi de chantier, finitions soignées.",
    url: PAGE_URL,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Prestations de rénovation | ${SITE_NAME}`,
    description:
      "Rénovation intérieure à Paris & Île-de-France : appartement, salle de bain, cuisine. Devis gratuit, suivi de chantier, finitions soignées.",
  },
}

function JsonLdServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "fr-FR",
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: `Prestations de rénovation | ${SITE_NAME}`,
        description:
          "Toutes nos prestations de rénovation intérieure à Paris et en Île-de-France : appartement, salle de bain, cuisine, finitions, coordination tous corps d’état.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: "fr-FR",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: PAGE_URL },
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        url: SITE_URL,
        telephone: PHONE_NUMBER,
        priceRange: "€€",
        address: {
          "@type": "PostalAddress",
          streetAddress: "1 Sent. de la Pointe",
          postalCode: "75020",
          addressLocality: "Paris",
          addressRegion: "Île-de-France",
          addressCountry: "FR",
        },
        areaServed: ["Paris", "Île-de-France"],
      },
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#services`,
        name: "Prestations de rénovation intérieure",
        itemListElement: services.map((s, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          url: `${SITE_URL}/services/${s.slug}`,
          name: s.title,
        })),
      },
    ],
  }

  return (
    <Script
      id="jsonld-services-page"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function ServicesPage() {
  const processImage = PlaceHolderImages.find((p) => p.id === "cta-banner-image")

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-grow">
        <JsonLdServicesPage />

        {/* HERO — intention, promesse, conversion */}
        <section className="relative overflow-hidden bg-secondary py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
               <Breadcrumbs />
              <p className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm text-muted-foreground mt-4">
                <ShieldCheck className="h-4 w-4 text-accent" />
                Paris & Île-de-France • Devis détaillé • Garantie décennale
              </p>

              <h1 className="mt-5 font-headline text-4xl font-bold md:text-5xl">
                Nos prestations de rénovation intérieure
              </h1>

              <p className="mt-4 text-lg text-muted-foreground">
                Appartement, salle de bain, cuisine : choisissez le service adapté à votre projet.
                Nous privilégions un chiffrage clair, un suivi structuré et des finitions soignées,
                du premier rendez-vous à la livraison.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/devis">Demander un devis</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={PHONE_TEL} aria-label="Appeler ERG Rénovation">
                    <Phone className="mr-2 h-4 w-4" />
                    Appeler
                  </a>
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 text-left text-sm text-muted-foreground sm:grid-cols-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-accent" />
                  <span>Devis poste par poste, options de finition</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-accent" />
                  <span>Interlocuteur unique, coordination tous corps d’état</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-accent" />
                  <span>Chantiers propres, protections et réception soignée</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GRILLE SERVICES */}
        <AnimatedSection>
          <section className="py-16 md:py-24" aria-labelledby="services-grid-title">
            <div className="container">
              <header className="mx-auto max-w-2xl text-center">
                <h2 id="services-grid-title" className="font-headline text-3xl font-bold md:text-4xl">
                  Choisissez le service adapté à votre projet
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Chaque prestation répond à un besoin précis, avec un niveau de finition ajustable.
                  Cliquez sur un service pour découvrir la méthode, les étapes et les options.
                </p>
              </header>

              <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => {
                  const serviceImage = PlaceHolderImages.find((p) => p.id === service.heroImageId)

                  return (
                    <Link key={service.slug} href={`/services/${service.slug}`} className="group block">
                      <Card className="h-full overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="relative h-56 w-full">
                          {serviceImage ? (
                            <Image
                              src={serviceImage.imageUrl}
                              alt={service.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              data-ai-hint={serviceImage.imageHint}
                            />
                          ) : (
                            <div className="h-full w-full bg-muted" />
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/90 text-white">
                              <service.icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-headline text-xl font-bold text-white">{service.title}</h3>
                          </div>
                        </div>

                        <CardContent className="p-6">
                          <p className="text-sm text-muted-foreground">{service.description}</p>

                          <div className="mt-4 inline-flex items-center font-semibold text-accent group-hover:underline">
                            Découvrir{" "}
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* PROCESS / GARANTIES */}
        <AnimatedSection>
          <section className="container pb-16 md:pb-24" aria-labelledby="process-title">
            <div className="rounded-lg bg-muted p-8 lg:p-12">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <h2 id="process-title" className="font-headline text-3xl font-bold">
                    Une méthode simple. Un résultat maîtrisé.
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    Nous sécurisons votre projet avec une organisation claire et des validations à chaque étape :
                    transparence, coordination et qualité d’exécution.
                  </p>

                  <div className="mt-6 grid gap-4">
                    <Card className="border-0 bg-background/60">
                      <CardHeader className="p-5">
                        <CardTitle className="flex items-center gap-3 text-base">
                          <ClipboardList className="h-5 w-5 text-accent" />
                          Devis détaillé et gratuit
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Un chiffrage poste par poste, avec des options de finition (essentiel / confort / premium).
                        </CardDescription>
                      </CardHeader>
                    </Card>

                    <Card className="border-0 bg-background/60">
                      <CardHeader className="p-5">
                        <CardTitle className="flex items-center gap-3 text-base">
                          <Wrench className="h-5 w-5 text-accent" />
                          Interlocuteur unique
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Un responsable dédié pour le suivi, la coordination et vos questions.
                        </CardDescription>
                      </CardHeader>
                    </Card>

                    <Card className="border-0 bg-background/60">
                      <CardHeader className="p-5">
                        <CardTitle className="flex items-center gap-3 text-base">
                          <BadgeCheck className="h-5 w-5 text-accent" />
                          Garantie décennale
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Des travaux couverts, pour une rénovation durable et sereine.
                        </CardDescription>
                      </CardHeader>
                    </Card>

                    <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                      <Button asChild>
                        <Link href="/devis">Obtenir un devis</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <a href={PHONE_TEL}>Appeler</a>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="relative h-64 overflow-hidden rounded-md md:h-full">
                  {processImage ? (
                    <Image
                      src={processImage.imageUrl}
                      alt="Planification et suivi de chantier"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      data-ai-hint="architectural blueprint"
                    />
                  ) : (
                    <div className="h-full w-full bg-background/40" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-background/80 p-4 backdrop-blur">
                    <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Clock className="h-4 w-4 text-accent" />
                      Planning réaliste • Protections • Réception soignée
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Une rénovation réussie, c’est surtout une exécution maîtrisée et des détails impeccables.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* MINI SEO indexable (utile + épuré) */}
        <section className="border-t bg-background">
          <div className="container py-12">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-8 md:grid-cols-3 md:items-start">
                <div className="md:col-span-2">
                  <h2 className="font-headline text-2xl font-bold md:text-3xl">
                    Rénovation à Paris et en Île-de-France : du devis aux finitions
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    Nos prestations couvrent les travaux essentiels d’un projet intérieur : préparation, rénovation,
                    coordination des corps de métier et finitions. L’objectif est simple : une rénovation propre,
                    cadrée, livrée dans les délais, avec un niveau de finition visible au quotidien.
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-accent" />
                      <span>Électricité, plomberie, cloisons, sols, peinture</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-accent" />
                      <span>Cuisine & salle de bain : technique + finitions</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-accent" />
                      <span>Organisation de chantier + validations par étapes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-accent" />
                      <span>Zone : Paris, 92, 93, 94 et Île-de-France</span>
                    </div>
                  </div>
                </div>

                <Card className="bg-secondary">
                  <CardContent className="p-6">
                    <p className="font-headline text-lg font-semibold">Parlons de votre projet</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Décrivez votre besoin (surface, état, objectifs). Nous revenons vers vous avec une proposition claire.
                    </p>
                    <div className="mt-4 space-y-2">
                      <Button asChild className="w-full">
                        <Link href="/devis">
                          Demander un devis <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <a href={PHONE_TEL}>Appeler</a>
                      </Button>
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground">
                      Conseil : indiquez votre ville + le type de rénovation (appartement, SDB, cuisine) pour une réponse plus rapide.
                    </p>
                  </CardContent>
                </Card>
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
