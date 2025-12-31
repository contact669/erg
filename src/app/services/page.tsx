
import type { Metadata } from "next"
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
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle } from "lucide-react"

const SITE_NAME = "ERG Rénovation"
const SITE_URL = "https://erg-renovation.fr"
const PAGE_URL = `${SITE_URL}/services`

export const metadata: Metadata = {
  title: `Prestations de rénovation | Appartement, salle de bain, cuisine | ${SITE_NAME}`,
  description:
    "Découvrez toutes nos prestations de rénovation intérieure à Paris et en Île-de-France : rénovation d’appartement, salle de bain, cuisine, finitions, coordination tous corps d’état. Devis gratuit.",
  alternates: { canonical: PAGE_URL },
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

export default function ServicesPage() {
  const processImage = PlaceHolderImages.find((p) => p.id === "cta-banner-image")

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-grow">
        {/* Hero services */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container text-center">
            <Breadcrumbs />

            <div className="mx-auto max-w-3xl">
              <h1 className="mt-4 font-headline text-4xl font-bold md:text-5xl">
                Nos prestations de rénovation intérieure
              </h1>

              <p className="mt-4 text-lg text-muted-foreground">
                Appartement, salle de bain, cuisine : découvrez nos services et notre manière de travailler.
                Un chiffrage clair, un suivi structuré et des finitions soignées, du premier rendez-vous à la livraison.
              </p>
            </div>
          </div>
        </section>

        {/* Grille services */}
        <AnimatedSection>
          <section className="py-16 md:py-24" aria-labelledby="services-grid-title">
            <div className="container">
              <header className="mx-auto max-w-2xl text-center">
                <h2 id="services-grid-title" className="font-headline text-3xl font-bold md:text-4xl">
                  Choisissez le service adapté à votre projet
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Chaque prestation est pensée pour répondre à un besoin précis, avec un niveau de finition ajustable.
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
                            <h3 className="font-headline text-xl font-bold text-white">
                              {service.title}
                            </h3>
                          </div>
                        </div>

                        <CardContent className="p-6">
                          <p className="text-sm text-muted-foreground">{service.description}</p>

                          <div className="mt-4 inline-flex items-center font-semibold text-accent group-hover:underline">
                            Découvrir <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
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

        {/* Process / garanties */}
        <AnimatedSection>
          <section className="container pb-16 md:pb-24" aria-labelledby="process-title">
            <div className="rounded-lg bg-muted p-8 lg:p-12">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <h2 id="process-title" className="font-headline text-3xl font-bold">
                    Une méthode simple. Un résultat maîtrisé.
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    Nous privilégions une organisation claire et un suivi régulier pour sécuriser votre projet :
                    transparence, coordination et qualité d’exécution.
                  </p>

                  <ul className="mt-6 space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                      <div>
                        <h3 className="font-semibold">Devis détaillé et gratuit</h3>
                        <p className="text-sm text-muted-foreground">
                          Un chiffrage clair, poste par poste, avec des options de finition.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                      <div>
                        <h3 className="font-semibold">Interlocuteur unique</h3>
                        <p className="text-sm text-muted-foreground">
                          Un responsable dédié pour le suivi, la coordination et vos questions.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                      <div>
                        <h3 className="font-semibold">Garantie décennale</h3>
                        <p className="text-sm text-muted-foreground">
                          Des travaux couverts, pour une rénovation durable et sereine.
                        </p>
                      </div>
                    </li>
                  </ul>
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
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Mini SEO indexable (épure + utile) */}
        <section className="border-t bg-background">
          <div className="container py-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-headline text-2xl font-bold md:text-3xl">
                Rénovation à Paris et en Île-de-France : un service complet, du devis aux finitions
              </h2>
              <p className="mt-4 text-muted-foreground">
                Nos prestations couvrent les travaux essentiels d’un projet intérieur : préparation, rénovation,
                coordination des corps de métier et finitions. Pour un projet clair et bien suivi, contactez-nous pour une
                visite et un devis détaillé.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild>
                  <Link href="/devis">Demander un devis</Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="tel:+33699961375">Appeler</a>
                </Button>
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
