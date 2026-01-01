import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"
import Script from "next/script"
import Link from "next/link"
import Image from "next/image"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import CtaBanner from "@/app/_components/cta-banner"
import AnimatedSection from "@/components/animated-section"

import { localLandingPages } from "@/lib/data"
import { PlaceHolderImages } from "@/lib/placeholder-images"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  CheckCircle,
  Award,
  ArrowRight,
  ShieldCheck,
  Clock,
  ClipboardList,
  Hammer,
  Sparkles,
  Home,
  Paintbrush,
  Wrench,
  Layers,
  BadgeCheck,
} from "lucide-react"

type Props = {
  params: { slug: string }
}

const SITE_NAME = "ERG Rénovation"
const SITE_URL = "https://erg-renovation.fr"
const PHONE = "+33699961375"

// ---------- Utils safe ----------
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

function safeLocationLabel(pageTitle: string) {
  // Ex: "Rénovation d'appartement à Paris (75)" -> "Paris"
  const beforeParen = pageTitle.split("(")[0]?.trim()
  const parts = beforeParen.split(" à ")
  return (parts[1] ?? beforeParen).trim()
}

function safeDeptFromSlug(slug: string) {
  // ex: "paris-75" or "hauts-de-seine-92"
  const m = slug.match(/-(\d{2})$/)
  return m?.[1] ?? ""
}

function joinHuman(list: string[]) {
  if (!list.length) return ""
  if (list.length === 1) return list[0]
  if (list.length === 2) return `${list[0]} et ${list[1]}`
  return `${list.slice(0, -1).join(", ")} et ${list[list.length - 1]}`
}

function toPath(url: string) {
  // Convertit une URL absolue en path (utile pour Link)
  return url.startsWith(SITE_URL) ? url.replace(SITE_URL, "") || "/" : url
}

// ---------- Metadata ----------
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = localLandingPages.find(
    (p) => p.slug === params.slug && p.parentService.slug === "renovation-appartement"
  )

  if (!page) return { title: "Page non trouvée" }

  const url = `${SITE_URL}/${page.parentService.slug}/${page.slug}`

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
  return localLandingPages
    .filter((p) => p.parentService.slug === "renovation-appartement")
    .map((page) => ({ slug: page.slug }))
}

// ---------- JSON-LD (safe, sans champs non typés) ----------
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
      // Business
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

// ---------- Contenu SEO premium fallback (si page.mainContent est vide) ----------
function SeoContentFallback({
  page,
  areaServed,
}: {
  page: any
  areaServed: string[]
}) {
  const locationLabel = safeLocationLabel(safeText(page.title))
  const dept = safeDeptFromSlug(page.slug)
  const isParis =
    page.slug === "paris-75" || locationLabel.toLowerCase().includes("paris")

  const zone = joinHuman(areaServed)

  const localSpecificity =
    page.type === "city"
      ? `Notre organisation est pensée pour les contraintes de ${locationLabel} : accès, stationnement, copropriété, nuisances sonores et coordination avec le syndic si nécessaire.`
      : `Nous intervenons sur l’ensemble du département${dept ? ` (${dept})` : ""} avec une logique de chantier structurée : visite technique, estimation réaliste et planification maîtrisée.`

  const pains =
    isParis
      ? [
          "Optimiser les délais malgré les contraintes d’accès et de stationnement",
          "Protéger les parties communes (cage d’escalier, ascenseur, couloirs)",
          "Respecter les règles de copropriété (horaires, bruit, évacuation des gravats)",
          "Tenir un niveau de finition irréprochable, même en surfaces réduites",
        ]
      : [
          "Rénover sans mauvaise surprise grâce à un devis clair et détaillé",
          "Maîtriser le budget avec des arbitrages intelligents (priorités / options)",
          "Assurer une exécution propre : protections, évacuation, nettoyage",
          "Garder le contrôle avec un suivi simple et régulier de l’avancement",
        ]

  const process = [
    {
      icon: Home,
      title: "1) Visite & écoute du besoin",
      text: "Objectifs, style, contraintes techniques, niveau de gamme, délais.",
    },
    {
      icon: ClipboardList,
      title: "2) Devis détaillé & planning",
      text: "Postes clairs, variantes, calendrier réaliste et engagement sur le périmètre.",
    },
    {
      icon: Wrench,
      title: "3) Réalisation & suivi",
      text: "Interlocuteur unique, points réguliers, validations à chaque étape clé.",
    },
    {
      icon: BadgeCheck,
      title: "4) Contrôle qualité & livraison",
      text: "Réception, finitions, conseils d’entretien et documents de garantie.",
    },
  ]

  const inclus = [
    {
      icon: ClipboardList,
      t: "Étude & chiffrage précis",
      d: "Visite technique, métrés, options, postes détaillés et transparents.",
    },
    {
      icon: Layers,
      t: "Préparation & protections",
      d: "Protection sols/murs, sécurisation des zones, plan de circulation sur chantier.",
    },
    {
      icon: Hammer,
      t: "Travaux tous corps d’état",
      d: "Dépose, cloisons, sols, peinture, plomberie, électricité, cuisine & SDB.",
    },
    {
      icon: Sparkles,
      t: "Finitions & réception",
      d: "Contrôle qualité, levée de réserves, nettoyage de fin de chantier.",
    },
  ]

  const faqs = [
    {
      q: `Quel budget prévoir pour une rénovation d’appartement à ${locationLabel} ?`,
      a: `Le budget dépend surtout de l’état initial, de la surface et du niveau de finition (sols, peinture, cuisine, salle de bain, électricité/plomberie). Après une visite technique, nous proposons un devis détaillé avec postes séparés et options, pour arbitrer sans sacrifier l’essentiel.`,
    },
    {
      q: "Faut-il quitter le logement pendant les travaux ?",
      a: `Pas toujours. Pour une rénovation légère (peinture/sols), une organisation par zones peut suffire. Pour une rénovation complète (cuisine/SDB/élec), il est souvent plus confortable de libérer le logement. On vous conseille en fonction du planning et des nuisances.`,
    },
    {
      q: "Combien de temps dure un chantier ?",
      a: `La durée dépend du périmètre. Une remise en état peut se faire rapidement, tandis qu’une rénovation complète nécessite plusieurs semaines. Notre planning est construit à partir de votre cahier des charges, des approvisionnements et des contraintes d’accès/copropriété.`,
    },
    {
      q: "Comment éviter les surprises en cours de chantier ?",
      a: `Nous sécurisons le projet par une visite technique, un devis poste par poste, et des validations à des jalons (dépose, réseaux, supports, finitions). Toute modification passe par un avenant clair avant exécution.`,
    },
    {
      q: "Proposez-vous une garantie décennale ?",
      a: `Oui, les travaux concernés par la décennale sont couverts. Nous privilégions une exécution conforme et documentée (matériaux, mise en œuvre, contrôles) pour une tranquillité durable.`,
    },
    {
      q: `Intervenez-vous uniquement à ${locationLabel} ?`,
      a: `Nous intervenons sur ${zone}. Si votre projet est à proximité, contactez-nous : nous vous confirmerons la faisabilité et les délais d’intervention.`,
    },
  ]

  return (
    <div className="prose max-w-none text-foreground prose-headings:font-headline prose-headings:text-primary prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-accent">
      <h2>{`Rénovation d’appartement à ${locationLabel} : méthode premium, résultat durable`}</h2>
      <p>
        Vous cherchez une <strong>rénovation d’appartement</strong> sérieuse,
        propre et parfaitement finie ? Chez <strong>{SITE_NAME}</strong>, nous
        privilégions une approche simple : un chiffrage précis, un suivi clair,
        et une livraison conforme aux attentes (et aux contraintes du lieu).
      </p>

      <p>
        {localSpecificity} Notre objectif : une rénovation{" "}
        <strong>maîtrisée</strong>, sans flou, avec un niveau de finition visible
        dans le quotidien (alignements, joints, aplombs, peintures, détails).
      </p>

      <h3>{`Les points qui font la différence à ${locationLabel}`}</h3>
      <ul>
        {pains.map((p: string) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <h3>Ce que nous prenons en charge</h3>
      <p>
        Du rafraîchissement à la rénovation complète, nous intervenons sur les
        lots clés : <strong>dépose</strong>, préparation des supports,{" "}
        <strong>sols</strong>, <strong>peinture</strong>,{" "}
        <strong>plomberie</strong>, <strong>électricité</strong>, cuisine, salle
        de bain, rangements, finitions.
      </p>

      <h3>Notre process en 4 étapes</h3>
      <p>
        Un chantier serein, c’est d’abord un cadre clair : responsabilités,
        jalons, validations, et anticipation des risques.
      </p>

      <div className="not-prose mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {process.map((s) => (
          <Card key={s.title} className="bg-secondary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-base">
                <s.icon className="h-5 w-5 text-accent" />
                {s.title}
              </CardTitle>
              <CardDescription>{s.text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <h3 className="mt-10">Ce que contient un devis ERG (vraiment exploitable)</h3>
      <p>
        Un devis utile doit permettre de comparer, arbitrer, et décider. Nous
        détaillons les postes (préparation, fournitures, main d’œuvre, finitions)
        et proposons des options lorsque c’est pertinent, pour garder la main sur
        le budget.
      </p>

      <div className="not-prose mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {inclus.map((item) => (
          <Card key={item.t} className="border-0 bg-secondary/40 shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-base font-semibold">
                <item.icon className="h-5 w-5 text-accent" />
                {item.t}
              </CardTitle>
              <CardDescription>{item.d}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <h3 className="mt-10">{`Travaux fréquents : ${locationLabel}`}</h3>
      <p>
        Selon la typologie (ancien, semi-récent, rénovation partielle), les
        demandes reviennent souvent : <strong>remise à niveau des supports</strong>, modernisation des sols et peintures,
        optimisation cuisine/SDB, rénovation des réseaux, amélioration du confort
        (isolation ciblée, éclairages, ventilation).
      </p>

      <h3>Qualité, propreté, suivi : nos engagements</h3>
      <ul>
        <li>
          <strong>Interlocuteur unique</strong> et points d’avancement réguliers.
        </li>
        <li>
          <strong>Protections</strong> et organisation du chantier (zones,
          circulation, nuisances).
        </li>
        <li>
          <strong>Contrôle qualité</strong> en fin d’étape (supports, aplombs,
          finitions).
        </li>
        <li>
          <strong>Respect du périmètre</strong> : modifications = avenant clair
          avant exécution.
        </li>
      </ul>

      <h3>Questions fréquentes</h3>
      <div className="not-prose mt-4 space-y-3">
        {faqs.map((f) => (
          <Card key={f.q}>
            <CardHeader>
              <CardTitle className="text-base">{f.q}</CardTitle>
              <CardDescription className="text-sm">{f.a}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <h3 className="mt-10">{`Demander un devis rénovation à ${locationLabel}`}</h3>
      <p>
        Dites-nous l’objectif (rafraîchissement, rénovation complète, cuisine/SDB),
        la surface et vos contraintes (occupé/non, accès, copropriété). Nous vous
        répondons rapidement avec une proposition claire et un planning réaliste.
      </p>
    </div>
  )
}

// ---------- Page ----------
export default function LocalLandingPage({ params }: { params: { slug: string } }) {
  const page = localLandingPages.find(
    (p) => p.slug === params.slug && p.parentService.slug === "renovation-appartement"
  )
  if (!page) notFound()

  const { parentService } = page
  const pageUrl = `${SITE_URL}/${parentService.slug}/${page.slug}`

  const heroImageId =
    page.slug === "paris-75" ? "project-apartment-paris-75" : parentService.heroImageId
  const heroImage = PlaceHolderImages.find((p) => p.id === heroImageId)

  const testimonialAvatar = PlaceHolderImages.find((p) => p.id === "testimonial-avatar-1")
  const departmentImage = PlaceHolderImages.find((p) => p.id === "project-apartment-hauts-de-seine")

  const reassurance = (page.reassurancePoints ?? []).slice(0, 6)

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

  const locationLabel = safeLocationLabel(safeText(page.title))
  const h2Title = `Rénovation d’appartement à ${locationLabel} : un chantier cadré, des finitions premium`
  const leadText =
    "Devis détaillé, méthode claire, protections soignées et suivi régulier : tout est pensé pour une rénovation sans stress, avec un rendu durable."

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

        {/* HERO — premium + conversion */}
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
            {/* Breadcrumbs HTML (safe, SEO-friendly) */}
            <nav aria-label="Fil d’ariane" className="mt-4 text-sm text-primary-foreground/80">
              <ol className="flex flex-wrap items-center gap-2">
                {breadcrumbs.map((b, idx) => {
                  const isLast = idx === breadcrumbs.length - 1
                  return (
                    <li key={b.item} className="flex items-center gap-2">
                      {isLast ? (
                        <span aria-current="page" className="font-medium text-primary-foreground">
                          {b.name}
                        </span>
                      ) : (
                        <Link href={toPath(b.item)} className="hover:underline">
                          {b.name}
                        </Link>
                      )}
                      {!isLast ? <span className="opacity-60">/</span> : null}
                    </li>
                  )
                })}
              </ol>
            </nav>

            <div className="mt-6 max-w-4xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground/90">
                <ShieldCheck className="h-4 w-4 text-accent" />
                Rénovation intérieure • Devis détaillé • Garantie décennale
              </p>

              <h1 className="mt-5 font-headline text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                {page.title}
              </h1>

              <p className="mt-6 max-w-3xl text-lg text-primary-foreground/80 md:leading-relaxed">
                {page.introduction}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/devis">{page.cta?.primary ?? "Demander un devis"}</Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <a href={`tel:${PHONE}`} aria-label="Appeler ERG Rénovation">
                    Appeler maintenant
                  </a>
                </Button>
              </div>

              {reassurance.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 gap-2 text-sm text-primary-foreground/80 sm:grid-cols-2 sm:gap-x-6">
                  {reassurance.map((point: string) => (
                    <div key={point} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3 text-xs text-primary-foreground/70">
                <span className="inline-flex items-center gap-2 rounded-md bg-primary-foreground/10 px-3 py-2">
                  <Clock className="h-4 w-4 text-accent" />
                  Réponse rapide
                </span>
                <span className="inline-flex items-center gap-2 rounded-md bg-primary-foreground/10 px-3 py-2">
                  <Paintbrush className="h-4 w-4 text-accent" />
                  Finitions soignées
                </span>
                <span className="inline-flex items-center gap-2 rounded-md bg-primary-foreground/10 px-3 py-2">
                  <Wrench className="h-4 w-4 text-accent" />
                  Tous corps d’état
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENU — structure SEO + lecture clean */}
        <AnimatedSection>
          <section className="container py-16 md:py-24">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
              {/* MAIN */}
              <div className="space-y-12 lg:col-span-2">
                <section aria-labelledby="main-content-title">
                  <h2
                    id="main-content-title"
                    className="font-headline text-2xl font-semibold text-primary md:text-3xl"
                  >
                    {h2Title}
                  </h2>

                  <p className="mt-4 text-muted-foreground">{leadText}</p>

                  <div className="mt-10">
                    {page.mainContent ? (
                      <div className="prose max-w-none text-foreground prose-headings:font-headline prose-headings:text-primary prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-accent">
                        {page.mainContent}
                      </div>
                    ) : (
                      <SeoContentFallback page={page} areaServed={areaServed} />
                    )}
                  </div>

                  {/* Maillage interne local */}
                  {page.relatedLocations?.length ? (
                    <div className="mt-12">
                      <h3 className="font-headline text-xl font-semibold">Interventions proches</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Accédez aux pages locales liées au même service pour affiner votre recherche.
                      </p>

                      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {page.relatedLocations.map((location: any) => (
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

                {/* Témoignage */}
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
                            <p className="text-sm text-muted-foreground">
                              Rénovation intérieure — respect des délais et finitions propres.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>
                ) : null}

                {/* CTA vers service parent */}
                <section className="pt-2">
                  <Card className="border-0 bg-secondary/30">
                    <CardContent className="flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-headline text-lg font-semibold text-primary">
                          Besoin de plus de détails sur le service ?
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Prestations, options, exemples de chantiers et méthode complète.
                        </p>
                      </div>
                      <Button asChild size="lg" variant="outline">
                        <Link href={`/services/${parentService.slug}`}>
                          En savoir plus sur : {parentService.title}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </section>
              </div>

              {/* SIDEBAR */}
              <aside className="h-fit space-y-8 lg:sticky lg:top-28">
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
                    <p className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" /> Devis détaillé et transparent
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" /> Interlocuteur unique
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" /> Artisans qualifiés
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" /> Respect des délais
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" /> Garantie décennale
                    </p>

                    <div className="pt-2 space-y-2">
                      <Button asChild className="w-full">
                        <Link href="/devis">Obtenir mon devis</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <a href={`tel:${PHONE}`}>Appeler</a>
                      </Button>
                    </div>

                    <div className="pt-4 text-xs text-muted-foreground/80">
                      Astuce : indiquez la surface, l’état (à rafraîchir / à refaire), et si le logement est occupé.
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-secondary/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline">
                      <ShieldCheck className="h-6 w-6 text-accent" />
                      Chantier cadré
                    </CardTitle>
                    <CardDescription>Moins d’imprévus, plus de contrôle.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-accent" /> Validation par étapes
                    </p>
                    <p className="flex items-center gap-2">
                      <Hammer className="h-4 w-4 text-accent" /> Exécution propre & organisée
                    </p>
                    <p className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-accent" /> Finitions contrôlées
                    </p>
                  </CardContent>
                </Card>

                {/* Réalisations */}
                {parentService.relatedProjectSlugs?.length > 0 && departmentImage ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-headline">
                        {page.type === "department"
                          ? `Réalisations dans le ${safeDeptFromSlug(page.slug) || "secteur"}`
                          : `Réalisations à ${safeLocationLabel(page.title)}`}
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
                        <Link href="/realisations">
                          {page.cta?.secondary ?? "Voir nos réalisations"}
                        </Link>
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
