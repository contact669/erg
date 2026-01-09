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
function safeText(input?: string) {
  return (input ?? "").toString().trim()
}

function getInitials(name: string) {
  const base = name.split(",")[0].trim()
  return base
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("")
}

function safeLocationLabel(pageTitle: string) {
  // Ex: "Rénovation maison à Versailles (78)" -> "Versailles"
  const beforeParen = pageTitle.split("(")[0]?.trim()
  const parts = beforeParen.split(" à ")
  return (parts[1] ?? beforeParen).trim()
}

function safeDeptFromSlug(slug: string) {
  // ex: "hauts-de-seine-92"
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
  return url.startsWith(SITE_URL) ? url.replace(SITE_URL, "") || "/" : url
}

// ---------- Metadata (SEO complet) ----------
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = localLandingPages.find(
    (p) => p.slug === params.slug && p.parentService.slug === "renovation-maison"
  )

  if (!page) return { title: "Page non trouvée" }

  const url = `${SITE_URL}/${page.parentService.slug}/${page.slug}`

  const title = page.metaTitle ?? page.title
  const description = page.metaDescription ?? page.introduction

  return {
    title,
    description,
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
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "fr_FR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export async function generateStaticParams() {
  return localLandingPages
    .filter((p) => p.parentService.slug === "renovation-maison")
    .map((page) => ({ slug: page.slug }))
}

// ---------- JSON-LD (safe, sans dépendre de champs non typés) ----------
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
        serviceType: "Rénovation maison",
      },
    ],
  }

  return (
    <Script
      id="jsonld-local-landing-house"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// ---------- SEO fallback (si page.mainContent est vide) ----------
function SeoContentFallback({ page, areaServed }: { page: any; areaServed: string[] }) {
  const locationLabel = safeLocationLabel(safeText(page.title))
  const dept = safeDeptFromSlug(page.slug)
  const zone = joinHuman(areaServed)

  const isIleDeFrance =
    areaServed.some((x) => x.includes("Île-de-France")) ||
    areaServed.some((x) => x.includes("Paris")) ||
    areaServed.some((x) => x.includes("(92)")) ||
    areaServed.some((x) => x.includes("(93)")) ||
    areaServed.some((x) => x.includes("(94)"))

  const pains = [
    "Coordonner plusieurs corps d’état sans retards ni surcoûts",
    "Rénover proprement (protections, tri/évacuation, nettoyage)",
    "Sécuriser le budget avec un devis détaillé poste par poste",
    "Améliorer confort et performance (isolation, ventilation, chauffage)",
    "Livrer des finitions irréprochables : alignements, joints, détails",
  ]

  const process = [
    {
      title: "1) Visite technique & cadrage",
      text: "Analyse de l’existant, contraintes, objectifs (confort, esthétique, valeur), priorités.",
    },
    {
      title: "2) Devis détaillé & planning réaliste",
      text: "Chiffrage transparent, options, calendrier, approvisionnements et jalons de validation.",
    },
    {
      title: "3) Travaux & suivi structuré",
      text: "Interlocuteur unique, points réguliers, contrôles qualité par étape.",
    },
    {
      title: "4) Réception & finitions",
      text: "Vérifications, levée de réserves, nettoyage, documents de garantie si applicable.",
    },
  ]

  const lots = [
    {
      title: "Gros & préparation",
      text: "Dépose, reprises supports, cloisons, faux plafonds, ouvertures (selon projet).",
    },
    {
      title: "Réseaux",
      text: "Électricité, plomberie, VMC/ventilation, mise aux normes si nécessaire.",
    },
    {
      title: "Finitions",
      text: "Peinture, sols, carrelage, faïence, menuiseries intérieures, détails.",
    },
    {
      title: "Pièces clés",
      text: "Cuisine, salle de bain, rangements sur-mesure, optimisation des volumes.",
    },
  ]

  const faqs = [
    {
      q: `Combien coûte une rénovation de maison à ${locationLabel} ?`,
      a: `Le prix dépend de la surface, de l’état initial et du niveau de prestation (réseaux, cuisine/SDB, isolation, finitions). Après visite, nous établissons un devis détaillé avec postes séparés et options, pour décider en connaissance de cause.`,
    },
    {
      q: "Quel délai prévoir pour rénover une maison ?",
      a: `Le délai dépend du périmètre : rafraîchissement, rénovation complète, ou rénovation lourde. Nous construisons un planning réaliste à partir des lots, des temps de séchage, et des approvisionnements, avec des jalons de validation.`,
    },
    {
      q: "Peut-on habiter pendant les travaux ?",
      a: `Cela dépend. Pour un chantier par zones, c’est parfois possible. Pour une rénovation complète, c’est souvent plus confortable de libérer la maison. Nous vous conseillons selon les nuisances, la sécurité et le calendrier.`,
    },
    {
      q: "Comment éviter les mauvaises surprises ?",
      a: `Visite technique, devis poste par poste, validations à des étapes clés, et avenants clairs avant toute modification. C’est la meilleure méthode pour sécuriser le budget et le résultat.`,
    },
    {
      q: `Intervenez-vous uniquement à ${locationLabel} ?`,
      a: `Nous intervenons sur ${zone}. Si votre projet est proche, contactez-nous : nous vous confirmons rapidement la faisabilité et les délais.`,
    },
  ]

  return (
    <div className="prose max-w-none text-foreground prose-headings:font-headline prose-headings:text-primary prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-accent">
      <h2>{`Rénovation de maison à ${locationLabel} : un chantier cadré, une livraison propre`}</h2>

      <p>
        Une rénovation de maison réussie repose sur 3 piliers : <strong>un périmètre clair</strong>,{" "}
        <strong>un chiffrage précis</strong> et <strong>une exécution maîtrisée</strong>. Chez{" "}
        <strong>{SITE_NAME}</strong>, nous gérons votre rénovation avec une méthode simple : visite technique, devis détaillé,
        planning réaliste, suivi régulier et contrôle qualité à chaque étape.
      </p>

      <p>
        {dept ? (
          <>
            Nous intervenons sur le secteur <strong>{locationLabel}</strong> et plus largement dans le{" "}
            <strong>{dept}</strong>, en tenant compte des contraintes locales (accès, évacuation, voisinage, logistique).
          </>
        ) : (
          <>
            Nous intervenons à <strong>{locationLabel}</strong> et alentours, avec la même exigence : protections, propreté,
            finitions et respect du planning.
          </>
        )}
      </p>

      <h3>{`Ce qui bloque souvent une rénovation… et comment on l’évite`}</h3>
      <ul>
        {pains.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <h3>Travaux pris en charge (selon votre projet)</h3>
      <p>
        Du rafraîchissement à la rénovation complète, nous intervenons sur les lots essentiels :
        dépose, reprises, cloisons, réseaux, isolation ciblée, sols, peinture, cuisine et salle de bain,
        jusqu’aux finitions.
      </p>

      <div className="not-prose mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {lots.map((l) => (
          <Card key={l.title} className="bg-secondary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-base">
                
                {l.title}
              </CardTitle>
              <CardDescription>{l.text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <h3 className="mt-10">Notre méthode en 4 étapes</h3>
      <p>
        Pour tenir la qualité et les délais, nous privilégions une organisation de chantier carrée et lisible.
        Vous savez toujours où on en est, ce qui arrive ensuite, et ce qui est validé.
      </p>

      <div className="not-prose mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {process.map((s) => (
          <Card key={s.title} className="bg-secondary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-base">
                
                {s.title}
              </CardTitle>
              <CardDescription>{s.text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <h3 className="mt-10">Devis rénovation maison : ce que vous devez exiger</h3>
      <ul>
        <li>
          <strong>Postes séparés</strong> : préparation, fournitures, main d’œuvre, finitions.
        </li>
        <li>
          <strong>Options</strong> quand c’est utile (gammes matériaux, variantes techniques).
        </li>
        <li>
          <strong>Planning</strong> cohérent (temps de séchage, approvisionnements).
        </li>
        <li>
          <strong>Cadre de modification</strong> : avenant avant exécution.
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

      <h3 className="mt-10">{`Demander un devis rénovation maison à ${locationLabel}`}</h3>
      <p>
        Indiquez la surface, l’état (à rafraîchir / à refaire), vos priorités (cuisine, SDB, réseaux, isolation),
        et si la maison est occupée. Nous vous répondons rapidement avec une proposition claire et un planning réaliste.
      </p>

      <p className="text-sm">
        Zone d’intervention : <strong>{zone}</strong>.
      </p>
    </div>
  )
}

// ---------- Page ----------
export default function LocalLandingPage({ params }: { params: { slug: string } }) {
  const page = localLandingPages.find(
    (p) => p.slug === params.slug && p.parentService.slug === "renovation-maison"
  )

  if (!page) notFound()

  const { parentService } = page

  const pageUrl = `${SITE_URL}/${parentService.slug}/${page.slug}`

  const heroImage = PlaceHolderImages.find((p) => p.id === parentService.heroImageId)
  const testimonialAvatar = PlaceHolderImages.find((p) => p.id === "testimonial-avatar-1")
  const departmentImage = PlaceHolderImages.find((p) => p.id === "project-house-1")

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
  const h2Title = `Rénovation de maison à ${locationLabel} : un chantier cadré, des finitions premium`
  const leadText =
    "Devis détaillé, organisation carrée, protections soignées et suivi régulier : une rénovation maîtrisée, du premier rendez-vous à la réception."

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
            {/* Breadcrumbs HTML safe */}
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
                Rénovation maison • Devis détaillé • Garantie décennale
              </p>

              <h1 className="mt-5 max-w-4xl font-headline text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
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

        {/* CONTENT */}
        <AnimatedSection>
          <section className="container py-16 md:py-24">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-3">
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
                      <div className="prose max-w-none text-foreground prose-headings:font-headline prose-p:text-muted-foreground prose-headings:text-primary prose-a:text-accent prose-strong:text-foreground">
                        {page.mainContent}
                      </div>
                    ) : (
                      <SeoContentFallback page={page} areaServed={areaServed} />
                    )}
                  </div>

                  {/* Maillage interne local */}
                  {page.relatedLocations?.length ? (
                    <div className="mt-10">
                      <h3 className="font-headline text-xl font-semibold">Interventions proches</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Découvrez nos pages locales associées au même service.
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
                              Rénovation maison — organisation, finitions et respect du planning.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>
                ) : null}

                {/* CTA parent */}
                <section className="pt-2">
                  <Card className="border-0 bg-secondary/30">
                    <CardContent className="flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-headline text-lg font-semibold text-primary">
                          En savoir plus sur ce service
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Prestations, options, méthode, et exemples de chantiers.
                        </p>
                      </div>
                      <Button asChild size="lg" variant="outline">
                        <Link href={`/services/${parentService.slug}`}>
                          {`En savoir plus sur la ${parentService.title}`}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </section>
              </div>

              {/* SIDEBAR */}
              <aside className="space-y-8 lg:sticky lg:top-28 h-fit">
                <Card className="bg-secondary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline">
                      <Award className="h-6 w-6 text-accent" />
                      Engagement qualité
                    </CardTitle>
                    <CardDescription>Une méthode claire, un suivi structuré, une livraison propre.</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>✓ Devis rapide et transparent</p>
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

                {parentService.relatedProjectSlugs?.length > 0 && departmentImage ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-headline">
                        {page.type === "department"
                          ? `Nos réalisations dans le ${safeDeptFromSlug(page.slug) || "secteur"}`
                          : `Nos réalisations à ${safeLocationLabel(page.title)}`}
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
