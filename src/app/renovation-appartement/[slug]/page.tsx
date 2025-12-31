
import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"
import Script from "next/script"
import Link from "next/link"
import Image from "next/image"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import CtaBanner from "@/app/_components/cta-banner"
import AnimatedSection from "@/components/animated-section"
import Breadcrumbs from "@/components/breadcrumbs"

import { localLandingPages } from "@/lib/data"
import { PlaceHolderImages } from "@/lib/placeholder-images"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { CheckCircle, Award, ArrowRight } from "lucide-react"

type Props = {
  params: { slug: string }
}

const SITE_NAME = "ERG Rénovation"
const SITE_URL = "https://erg-renovation.fr"
const PHONE = "+33699961375"

// Utilitaires safe
function getInitials(name: string) {
  const base = name.split(",")[0].trim()
  return base
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("")
}

function safeText(input?: string) {
  return (input ?? "").toString().trim()
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = localLandingPages.find((p) => p.slug === params.slug && p.parentService.slug === 'renovation-appartement')

  if (!page) return { title: "Page non trouvée" }

  const url = `${SITE_URL}/${page.parentService.slug}/${page.slug}`

  // Si tu as une image de couverture dédiée par page, tu peux la brancher ici
  const ogTitle = page.metaTitle ?? page.title
  const ogDesc = page.metaDescription ?? page.introduction

  return {
    title: ogTitle,
    description: ogDesc,
    alternates: { canonical: url },
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
      title: ogTitle,
      description: ogDesc,
      url,
      siteName: SITE_NAME,
      locale: "fr_FR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDesc,
    },
  }
}

export async function generateStaticParams() {
  return localLandingPages.filter(p => p.parentService.slug === 'renovation-appartement').map((page) => ({ slug: page.slug }))
}

function JsonLd({
  pageTitle,
  pageDescription,
  pageUrl,
  breadcrumbs,
  areaServed,
}: {
  pageTitle: string
  pageDescription: string
  pageUrl: string
  breadcrumbs: Array<{ name: string; item: string }>
  areaServed: string[]
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // Site
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "fr-FR",
      },
      // Page
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: "fr-FR",
      },
      // Breadcrumbs
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        itemListElement: breadcrumbs.map((b, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: b.name,
          item: b.item,
        })),
      },
      // Business (à affiner si tu as des données exactes : SIRET, geo, sameAs, etc.)
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        url: SITE_URL,
        telephone: PHONE,
        priceRange: "€€",
        areaServed,
        address: {
          "@type": "PostalAddress",
          streetAddress: "1 Sent. de la Pointe",
          postalCode: "75020",
          addressLocality: "Paris",
          addressRegion: "Île-de-France",
          addressCountry: "FR",
        },
      },
      // Service
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: pageTitle,
        description: pageDescription,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed,
        serviceType: "Rénovation intérieure",
      },
    ],
  }

  return (
    <Script
      id="jsonld-local-landing"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function LocalLandingPage({ params }: { params: { slug: string } }) {
  const page = localLandingPages.find((p) => p.slug === params.slug && p.parentService.slug === 'renovation-appartement')
  if (!page) notFound()

  const { parentService } = page

  const pageUrl = `${SITE_URL}/${parentService.slug}/${page.slug}`

  const heroImageId =
    page.slug === "paris-75" ? "project-apartment-paris-75" : parentService.heroImageId
  const heroImage = PlaceHolderImages.find((p) => p.id === heroImageId)

  const testimonialAvatar = PlaceHolderImages.find((p) => p.id === "testimonial-avatar-1")

  const departmentImage = PlaceHolderImages.find((p) => p.id === "project-apartment-hauts-de-seine")

  const reassurance = (page.reassurancePoints ?? []).slice(0, 4)
  const areaServed =
    page.type === "city"
      ? ["Paris", "Hauts-de-Seine (92)", "Seine-Saint-Denis (93)", "Val-de-Marne (94)"]
      : ["Paris", "Île-de-France"]

  const breadcrumbs = [
    { name: "Accueil", item: SITE_URL },
    { name: "Services", item: `${SITE_URL}/services` },
    { name: parentService.title, item: `${SITE_URL}/services/${parentService.slug}` },
    { name: safeText(page.title), item: pageUrl },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-grow">
        <JsonLd
            pageTitle={safeText(page.metaTitle ?? page.title)}
            pageDescription={safeText(page.metaDescription ?? page.introduction)}
            pageUrl={pageUrl}
            breadcrumbs={breadcrumbs}
            areaServed={areaServed}
        />
        {/* HERO — sobre, premium, conversion */}
        <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground md:py-24">
          {heroImage ? (
            <Image
              src={heroImage.imageUrl}
              alt={safeText(page.title)}
              fill
              className="object-cover opacity-10"
              priority
              data-ai-hint={heroImage.imageHint}
              sizes="100vw"
            />
          ) : null}

          <div className="container relative z-10">
            <div className="mt-6 max-w-4xl">
              <h1 className="font-headline text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                {page.title}
              </h1>

              <p className="mt-6 max-w-3xl text-lg text-primary-foreground/80 md:leading-relaxed">
                {page.introduction}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/devis">{page.cta?.primary ?? "Demander un devis"}</Link>
                </Button>

                <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <a href={`tel:${PHONE}`} aria-label="Appeler ERG Rénovation">
                    Appeler maintenant
                  </a>
                </Button>
              </div>

              {reassurance.length > 0 ? (
                <div className="mt-8 flex flex-col gap-2 text-sm text-primary-foreground/80 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
                  {reassurance.map((point) => (
                    <div key={point} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* CONTENU — structure SEO + lecture ultra clean */}
        <AnimatedSection>
          <section className="container py-16 md:py-24">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
              {/* MAIN */}
              <div className="lg:col-span-2 space-y-12">
                {/* Contenu principal (indexable) */}
                <section aria-labelledby="main-content-title">
                  <h2 id="main-content-title" className="sr-only">
                    Détails du service
                  </h2>

                  <div className="prose max-w-none text-foreground prose-headings:font-headline prose-headings:text-primary prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-accent">
                    {page.mainContent}
                  </div>

                  {/* Maillage interne local — discret et puissant */}
                  {page.relatedLocations?.length ? (
                    <div className="mt-10">
                      <h3 className="font-headline text-xl font-semibold">
                        Interventions proches
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Découvrez nos pages locales associées au même service.
                      </p>

                      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {page.relatedLocations.map((location) => (
                          <Button asChild key={location.slug} variant="outline" className="justify-between">
                            <Link href={`/${parentService.slug}/${location.slug}`}>
                              {location.name}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </section>

                {/* Témoignage — premium */}
                {page.testimonial?.quote ? (
                  <section aria-labelledby="testimonial-title">
                    <h2 id="testimonial-title" className="sr-only">
                      Avis client
                    </h2>

                    <Card className="border-0 bg-secondary/40 shadow-none">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                          {testimonialAvatar ? (
                            <Avatar className="hidden h-16 w-16 border-2 border-accent sm:flex">
                              <AvatarImage
                                src={testimonialAvatar.imageUrl}
                                alt={`Avatar de ${page.testimonial.author}`}
                                data-ai-hint={testimonialAvatar.imageHint}
                              />
                              <AvatarFallback>{getInitials(page.testimonial.author)}</AvatarFallback>
                            </Avatar>
                          ) : null}

                          <div className="space-y-3">
                            <p className="text-lg italic text-foreground">
                              &ldquo;{page.testimonial.quote}&rdquo;
                            </p>
                            <p className="font-semibold text-primary">{page.testimonial.author}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>
                ) : null}

                {/* CTA vers service parent */}
                <section className="pt-2">
                  <Button asChild size="lg" variant="outline">
                    <Link href={`/services/${parentService.slug}`}>
                      En savoir plus sur : {parentService.title}
                    </Link>
                  </Button>
                </section>
              </div>

              {/* SIDEBAR — conversion + preuves */}
              <aside className="space-y-8 lg:sticky lg:top-28 h-fit">
                <Card className="bg-secondary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline">
                      <Award className="h-6 w-6 text-accent" />
                      Engagement qualité
                    </CardTitle>
                    <CardDescription>
                      Une méthode claire, un suivi structuré, une livraison propre.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>✓ Devis détaillé et transparent</p>
                    <p>✓ Interlocuteur unique</p>
                    <p>✓ Artisans qualifiés</p>
                    <p>✓ Respect des délais</p>
                    <p>✓ Garantie décennale</p>

                    <div className="pt-2 space-y-2">
                      <Button asChild className="w-full">
                        <Link href="/devis">Obtenir mon devis</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <a href={`tel:${PHONE}`}>Appeler</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Réalisations locales — preuve visuelle */}
                {parentService.relatedProjectSlugs?.length > 0 && departmentImage ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-headline">
                        {page.type === "department"
                          ? `Réalisations dans le ${
                              page.slug === "paris-75" ? "75" : page.slug.split("-")[2]
                            }`
                          : `Réalisations à ${page.title.split("(")[0].trim()}`}
                      </CardTitle>
                      <CardDescription>Avant / après, finitions, détails.</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="relative h-48 w-full overflow-hidden rounded-md">
                        <Image
                          src={departmentImage.imageUrl}
                          alt={`Réalisation - ${page.title}`}
                          fill
                          className="object-cover"
                          data-ai-hint={departmentImage.imageHint}
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      </div>

                      <Button variant="outline" asChild className="mt-4 w-full">
                        <Link href="/realisations">{page.cta?.secondary ?? "Voir nos réalisations"}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : null}
              </aside>
            </div>
          </section>
        </AnimatedSection>

        <CtaBanner />
      </main>

      <SiteFooter />
    </div>
  )
}
