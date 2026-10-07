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
  Wrench,
  Sparkles,
  ClipboardList,
  BadgeCheck,
  Droplets,
  ShowerHead,
  ThermometerSun,
  Check,
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
  // Ex: "Rénovation salle de bain à Paris (75)" -> "Paris"
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
  return url.startsWith(SITE_URL) ? url.replace(SITE_URL, "") || "/" : url
}

// ---------- Metadata (SEO complet) ----------
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = localLandingPages.find(
    (p) => p.slug === params.slug && p.parentService.slug === "renovation-salle-de-bain"
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
    .filter((p) => p.parentService.slug === "renovation-salle-de-bain")
    .map((page) => ({ slug: page.slug }))
}

// ---------- JSON-LD (safe) ----------
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
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "fr-FR",
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: "fr-FR",
      },
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
          streetAddress: "1 Sentier de la Pointe",
          postalCode: "75020",
          addressLocality: "Paris",
          addressRegion: "Île-de-France",
          addressCountry: "FR",
        },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: pageTitle,
        description: pageDescription,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed,
        serviceType: "Rénovation salle de bain",
      },
    ],
  }

  return (
    <Script
      id="jsonld-local-landing-bathroom"
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

  const painPoints = [
    "Étanchéité (douche à l’italienne, receveur, joints) : zéro compromis",
    "Réseaux (plomberie/évacuations) : fiabilité et accessibilité",
    "Ventilation : limiter l’humidité et les moisissures",
    "Choix matériaux : carrelage, faïence, robinetterie, meubles",
    "Finitions : alignements, pentes, joints, découpes, détails",
  ]

  const packs = [
    {
      title: "Douche / baignoire",
      text: "Remplacement, création douche à l’italienne, robinetterie, parois, receveur, pentes.",
    },
    {
      title: "Plomberie & évacuations",
      text: "Reprise/optimisation des réseaux, sécurisation des raccords, tests d’étanchéité.",
    },
    {
      title: "Confort & ventilation",
      text: "VMC/ventilation, sèche-serviettes, optimisation chauffage et circulation d’air.",
    },
    {
      title: "Finitions & pose",
      text: "Carrelage/faïence, joints, peintures adaptées pièces humides, détails soignés.",
    },
  ]

  const process = [
    {
      title: "1) Visite technique",
      text: "Mesures, analyse de l’existant, contraintes (évacuations, hauteur, ventilation, accès).",
    },
    {
      title: "2) Devis détaillé",
      text: "Postes clairs + options (gammes matériaux), planning réaliste, étapes validées.",
    },
    {
      title: "3) Chantier sécurisé",
      text: "Protections, organisation, suivi, contrôles (pentes, joints, étanchéité).",
    },
    {
      title: "4) Réception & finitions",
      text: "Contrôle final, levée de réserves, nettoyage, conseils d’entretien.",
    },
  ]

  const faqs = [
    {
      q: `Quel budget prévoir pour rénover une salle de bain à ${locationLabel} ?`,
      a: `Le budget dépend des réseaux (plomberie/évacuation), du type de douche/baignoire, des surfaces à carreler et des matériaux (robinetterie, meubles). Après visite technique, nous établissons un devis poste par poste avec options, pour arbitrer sans mauvaise surprise.`,
    },
    {
      q: "Douche à l’italienne : est-ce possible chez moi ?",
      a: `Oui dans de nombreux cas, mais la faisabilité dépend des hauteurs disponibles, des évacuations et des pentes nécessaires. Lors de la visite, nous vérifions l’existant et proposons la solution la plus sûre (douche italienne, receveur extra-plat, etc.).`,
    },
    {
      q: "Combien de temps durent les travaux ?",
      a: `Cela dépend du périmètre : simple remplacement d’équipements ou rénovation complète (dépose, réseaux, carrelage, finitions). Nous proposons un planning réaliste tenant compte des temps de séchage et des approvisionnements.`,
    },
    {
      q: "Comment garantir l’étanchéité ?",
      a: `Nous sécurisons l’étanchéité par la préparation des supports, l’utilisation des systèmes adaptés (SPEC/SEL selon les zones), des joints soignés, et des contrôles à chaque étape critique.`,
    },
    {
      q: `Intervenez-vous uniquement à ${locationLabel} ?`,
      a: `Nous intervenons sur ${zone}. Si votre projet est proche, contactez-nous : nous confirmons rapidement la faisabilité et les délais.`,
    },
  ]

  return (
    <div className="prose max-w-none text-foreground prose-headings:font-headline prose-headings:text-primary prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-accent">
      <h2>{`Rénovation de salle de bain à ${locationLabel} : étanchéité, confort et finitions`}</h2>

      <p>
        Une salle de bain réussie, c’est un équilibre entre <strong>technique</strong> (réseaux, ventilation, étanchéité),
        <strong> confort</strong> (douche/baignoire, rangements, circulation) et <strong>finitions</strong> (carrelage, joints,
        alignements). Chez <strong>{SITE_NAME}</strong>, on pilote votre rénovation avec une méthode carrée : visite technique,
        devis détaillé, planning réaliste et contrôles qualité à chaque étape.
      </p>

      <p>
        Nous intervenons à <strong>{locationLabel}</strong>
        {dept ? (
          <>
            {" "}
            et plus largement dans le <strong>{dept}</strong>
          </>
        ) : null}
        , avec une attention particulière aux points critiques d’une pièce humide : protections, étanchéité, ventilation et
        finitions.
      </p>

      <h3>Les points critiques (et comment on les sécurise)</h3>
      <ul>
        {painPoints.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <h3>Prestations possibles (selon votre projet)</h3>
      <div className="not-prose mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {packs.map((p) => (
          <Card key={p.title} className="bg-secondary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-base">
                
                {p.title}
              </CardTitle>
              <CardDescription>{p.text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <h3 className="mt-10">Notre méthode en 4 étapes</h3>
      <p>
        Pour éviter les imprévus, on cadre le chantier et on valide les étapes clés. Vous gardez la maîtrise du budget, du
        planning et du résultat final.
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

      <h3 className="mt-10">Ce que doit contenir un devis salle de bain (pour comparer correctement)</h3>
      <ul>
        <li>
          <strong>Dépose & préparation</strong> (supports, reprises, traitement humidité si nécessaire).
        </li>
        <li>
          <strong>Réseaux</strong> (plomberie/évacuations, tests, accessibilité).
        </li>
        <li>
          <strong>Étanchéité</strong> (zones douche/sol, systèmes adaptés, mise en œuvre).
        </li>
        <li>
          <strong>Finitions</strong> (carrelage/faïence, joints, alignements, peintures adaptées).
        </li>
        <li>
          <strong>Options</strong> utiles (gammes robinetterie, meubles, parois, receveur).
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

      <h3 className="mt-10">{`Demander un devis rénovation salle de bain à ${locationLabel}`}</h3>
      <p>
        Indiquez la surface, l’état actuel (à refaire / à moderniser), votre objectif (douche à l’italienne, optimisation,
        accessibilité) et vos contraintes (logement occupé, accès, copropriété). Nous vous répondons rapidement avec une
        proposition claire et un planning réaliste.
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
    (p) => p.slug === params.slug && p.parentService.slug === "renovation-salle-de-bain"
  )

  if (!page) notFound()

  const { parentService } = page
  const pageUrl = `${SITE_URL}/${parentService.slug}/${page.slug}`

  const heroImage = PlaceHolderImages.find((p) => p.id === parentService.heroImageId)
  const testimonialAvatar = PlaceHolderImages.find((p) => p.id === "testimonial-avatar-2")
  const departmentImage = PlaceHolderImages.find((p) => p.id === "project-bathroom-1")

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
  const h2Title = `Rénovation de salle de bain à ${locationLabel} : une pièce humide sécurisée, un rendu premium`
  const leadText =
    "Étanchéité, réseaux, ventilation et finitions : une rénovation cadrée, propre et durable, du devis à la réception."

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

        {/* HERO */}
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
            {/* Breadcrumbs HTML safe (évite les erreurs de typage) */}
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
                Salle de bain • Étanchéité • Devis détaillé • Garantie décennale
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
                  <Sparkles className="h-4 w-4 text-accent" />
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
                              Salle de bain — propreté, finitions et respect du planning.
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
