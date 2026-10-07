

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
import SeoExpertise from "./_components/seo-expertise"
import RelatedGuides from "@/components/related-guides"

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
  title: { absolute: `Entreprise de rénovation à ${CITY} | ${SITE_NAME}` },
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
    title: `Entreprise de rénovation à ${CITY}`,
    description: `Rénovation intérieure à ${CITY} : appartement, salle de bain, cuisine. Devis gratuit, suivi de chantier, finitions soignées, garantie décennale.`,
    url: PAGE_URL,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Entreprise de rénovation à ${CITY}`,
    description: `Rénovation intérieure à ${CITY} : appartement, salle de bain, cuisine. Devis gratuit, suivi de chantier, finitions soignées, garantie décennale.`,
  },
}

function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
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

        <AnimatedSection>
          <SeoExpertise />
        </AnimatedSection>
        <RelatedGuides />
      </main>

      <SiteFooter />
    </div>
  )
}
