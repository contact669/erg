

import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import AnimatedSection from "@/components/animated-section"

import Hero from "@/app/_components/hero"
import ServicesOverview from "@/app/_components/services-overview"
import ProcessSteps from "./_components/process-steps"
import ServiceAreas from "./_components/ServiceAreas"
import FeaturedProjects from "./_components/featured-projects"
import GoogleReviews from "./_components/google-reviews"
import CtaBanner from "./_components/cta-banner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Phone, ArrowRight, CheckCircle2, ShieldCheck, Clock, Sparkles, MapPin, ClipboardList } from "lucide-react"

const SITE_NAME = "ERG Rénovation"
const SITE_URL = "https://erg-renovation.fr"
const PAGE_URL = `${SITE_URL}/`
const PHONE = "+33699961375"
const CITY = "Paris"
const REGION = "Île-de-France"
const SERVICE_AREAS = ["Paris", "Hauts-de-Seine (92)", "Seine-Saint-Denis (93)", "Val-de-Marne (94)"]

export const metadata: Metadata = {
  title: `Entreprise de rénovation à ${CITY} | Appartement, salle de bain, cuisine | ${SITE_NAME}`,
  description: `${SITE_NAME} : rénovation intérieure clé en main à ${CITY} et en ${REGION} (92, 93, 94). Devis détaillé gratuit, interlocuteur unique, finitions soignées, garantie décennale.`,
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
    title: `Entreprise de rénovation à ${CITY} | ${SITE_NAME}`,
    description: `Rénovation intérieure à ${CITY} : appartement, salle de bain, cuisine. Devis gratuit, suivi de chantier, finitions soignées, garantie décennale.`,
    url: PAGE_URL,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Entreprise de rénovation à ${CITY} | ${SITE_NAME}`,
    description: `Rénovation intérieure à ${CITY} : appartement, salle de bain, cuisine. Devis gratuit, suivi de chantier, finitions soignées, garantie décennale.`,
  },
}

function JsonLd() {
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
        name: `Entreprise de rénovation à ${CITY} | ${SITE_NAME}`,
        description: `${SITE_NAME} : rénovation intérieure à ${CITY} et en ${REGION}.`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: "fr-FR",
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        url: SITE_URL,
        telephone: PHONE,
        priceRange: "€€",
        areaServed: SERVICE_AREAS,
        address: {
          "@type": "PostalAddress",
          streetAddress: "1 Sent. de la Pointe",
          postalCode: "75020",
          addressLocality: CITY,
          addressRegion: REGION,
          addressCountry: "FR",
        },
        serviceType: [
          "Rénovation d’appartement",
          "Rénovation de salle de bain",
          "Rénovation cuisine",
          "Travaux tous corps d’état",
        ],
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service-renovation`,
        name: `Travaux de rénovation à ${CITY}`,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: SERVICE_AREAS,
        serviceType: "Rénovation intérieure",
      },
    ],
  }

  return (
    <Script
      id="jsonld-home"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd />
      <SiteHeader />

      <main className="flex-grow">
        {/* HERO (ton composant) */}
        <Hero />

        {/* Bar “preuves” ultra épurée (au-dessus de Services) */}
        <section aria-label="Preuves et promesses" className="border-b bg-background">
          <div className="container py-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card className="border-muted/60">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <ShieldCheck className="h-4 w-4 text-accent" />
                    Garantie décennale
                  </CardTitle>
                  <CardDescription>Travaux durables, couverts et conformes.</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-muted/60">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <ClipboardList className="h-4 w-4 text-accent" />
                    Devis détaillé gratuit
                  </CardTitle>
                  <CardDescription>Poste par poste, options de finitions.</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-muted/60">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <Clock className="h-4 w-4 text-accent" />
                    Suivi structuré
                  </CardTitle>
                  <CardDescription>Planning clair, points réguliers.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <AnimatedSection>
          <ServicesOverview />
        </AnimatedSection>

        <AnimatedSection>
          <ProcessSteps />
        </AnimatedSection>

        <AnimatedSection>
          <ServiceAreas />
        </AnimatedSection>

        <AnimatedSection>
          <FeaturedProjects />
        </AnimatedSection>

        <AnimatedSection>
          <GoogleReviews />
        </AnimatedSection>

        <AnimatedSection>
          <CtaBanner />
        </AnimatedSection>

        {/* ✅ SEO INDEXABLE (ultra clean, unique, conversion + E-E-A-T) */}
        <section className="border-t bg-background" aria-labelledby="seo-home-title">
          <div className="container py-16 md:py-20">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Col texte */}
              <div className="lg:col-span-7">
                <h2 id="seo-home-title" className="font-headline text-2xl font-bold tracking-tight md:text-3xl">
                  Entreprise de rénovation à Paris : un chantier maîtrisé, du premier rendez-vous aux finitions
                </h2>

                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  Chez ERG Rénovation, nous rénovons des intérieurs à Paris et en Île-de-France avec une exigence simple : <strong className="text-foreground">livrer propre</strong>,{" "}
                  <strong className="text-foreground">dans les règles</strong>, et{" "}
                  <strong className="text-foreground">sans zones floues</strong>.
                  L’objectif n’est pas seulement “beau” : c’est <strong className="text-foreground">durable</strong>,{" "}
                  <strong className="text-foreground">précis</strong>, et <strong className="text-foreground">bien suivi</strong>.
                </p>

                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Pour une rénovation d’appartement, de salle de bain ou de cuisine, vous bénéficiez d’un{" "}
                  <strong className="text-foreground">interlocuteur unique</strong>, d’une{" "}
                  <strong className="text-foreground">coordination tous corps d’état</strong>, et d’un{" "}
                  <strong className="text-foreground">devis détaillé</strong> (poste par poste) pour arbitrer sereinement les
                  options de finitions et de matériaux.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/devis">
                      Décrire mon projet <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href={`tel:${PHONE}`} aria-label="Appeler ERG Rénovation">
                      <Phone className="mr-2 h-4 w-4" />
                      Appeler maintenant
                    </a>
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1">
                    <MapPin className="h-3.5 w-3.5 text-accent" />
                    {SERVICE_AREAS.join(" • ")}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                    Visite sur site & estimation claire
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                    Protection & propreté du chantier
                  </span>
                </div>
              </div>

              {/* Col “piliers” */}
              <div className="lg:col-span-5">
                <div className="grid gap-4">
                  <Card className="border-muted/60">
                    <CardContent className="p-6">
                      <h3 className="flex items-center gap-2 font-semibold">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        Devis clair & arbitrages facilités
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Un chiffrage lisible, des options de finitions, et une logique simple pour décider sans surprises.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-muted/60">
                    <CardContent className="p-6">
                      <h3 className="flex items-center gap-2 font-semibold">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        Coordination tous corps d’état
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Une organisation claire : planification, enchaînement des étapes, et contrôles réguliers.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-muted/60">
                    <CardContent className="p-6">
                      <h3 className="flex items-center gap-2 font-semibold">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        Finitions & propreté : la différence
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Protection des lieux, finitions soignées, réception cadrée : un rendu premium, livré propre.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Mini maillage interne (SEO + UX, discret) */}
                  <div className="rounded-2xl border bg-secondary/30 p-6">
                    <p className="text-sm font-semibold">Explorer nos services clés</p>
                    <ul className="mt-3 grid gap-2 text-sm">
                      <li>
                        <Link className="inline-flex items-center text-muted-foreground hover:text-accent" href="/services/renovation-appartement">
                          Rénovation d’appartement <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </li>
                      <li>
                        <Link className="inline-flex items-center text-muted-foreground hover:text-accent" href="/services/renovation-salle-de-bain">
                          Rénovation salle de bain <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </li>
                      <li>
                        <Link className="inline-flex items-center text-muted-foreground hover:text-accent" href="/services/renovation-cuisine">
                          Rénovation cuisine <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </li>
                      <li>
                        <Link className="inline-flex items-center text-muted-foreground hover:text-accent" href="/services">
                          Voir toutes les prestations <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
