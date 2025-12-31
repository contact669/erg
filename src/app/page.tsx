import type { Metadata } from "next"
import Script from "next/script"

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
import Link from "next/link"
import { Phone, ArrowRight, CheckCircle2 } from "lucide-react"

const SITE_NAME = "ERG Rénovation"
const SITE_URL = "https://erg-renovation.fr"
const PAGE_URL = `${SITE_URL}/`
const PHONE = "+33699961375"
const CITY = "Paris"
const REGION = "Île-de-France"
const SERVICE_AREAS = [
  "Paris",
  "Hauts-de-Seine (92)",
  "Seine-Saint-Denis (93)",
  "Val-de-Marne (94)",
]

export const metadata: Metadata = {
  title: `Entreprise de rénovation à ${CITY} | Appartements & salles de bain | ${SITE_NAME}`,
  description: `ERG Rénovation : rénovation d’appartement, salle de bain et cuisine à ${CITY} et en ${REGION}. Devis gratuit, interlocuteur unique, finitions soignées, garantie décennale.`,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Entreprise de rénovation à ${CITY} | ${SITE_NAME}`,
    description: `Rénovation clé en main à ${CITY} : appartement, salle de bain, cuisine. Devis gratuit, suivi de chantier, garantie décennale.`,
    url: PAGE_URL,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Entreprise de rénovation à ${CITY} | ${SITE_NAME}`,
    description: `Rénovation clé en main à ${CITY} : appartement, salle de bain, cuisine. Devis gratuit, suivi de chantier, garantie décennale.`,
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
        <Hero />

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

        {/* ✅ CONTENU SEO INDEXABLE — version centrée, pro, épurée */}
        <section className="border-t bg-background">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <header className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Entreprise de rénovation à {CITY}, orientée qualité et maîtrise
              </h2>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {SITE_NAME} accompagne vos projets de rénovation intérieure à {CITY} et en {REGION} : appartement, salle de
                bain et cuisine. Notre engagement repose sur une méthode claire, un chiffrage précis et une exécution
                rigoureuse, du premier rendez-vous jusqu’à la livraison du chantier.
              </p>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Vous bénéficiez d’un <span className="font-medium text-foreground">interlocuteur unique</span>, d’une{" "}
                <span className="font-medium text-foreground">coordination tous corps d’état</span>, et d’un{" "}
                <span className="font-medium text-foreground">suivi structuré</span> garantissant des délais maîtrisés et des
                finitions soignées.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <a href={`tel:${PHONE}`} aria-label="Appeler ERG Rénovation">
                    <Phone className="mr-2 h-4 w-4" />
                    Appeler maintenant
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/devis">
                    Demander un devis <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Paris & Île-de-France (92, 93, 94) • Visite sur site • Estimation claire • Devis détaillé
              </p>
            </header>

            {/* 3 piliers — pro & épuré */}
            <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
              <div className="rounded-xl border p-5">
                <h3 className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Devis clair et transparent
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Chiffrage détaillé, poste par poste, avec des options de matériaux et de finitions adaptées à votre
                  projet.
                </p>
              </div>

              <div className="rounded-xl border p-5">
                <h3 className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Planification et coordination
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Étapes planifiées en amont, corps de métier coordonnés, points réguliers et suivi structuré du chantier.
                </p>
              </div>

              <div className="rounded-xl border p-5">
                <h3 className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Qualité d’exécution et propreté
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Protection des lieux, finitions soignées, contrôle qualité et réception du chantier dans des conditions
                  propres et conformes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
