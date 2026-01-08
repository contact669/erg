
import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"
import Script from "next/script"
import Link from "next/link"
import Image from "next/image"

import { services, allProjects } from "@/lib/data"
import { PlaceHolderImages } from "@/lib/placeholder-images"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import CtaBanner from "@/app/_components/cta-banner"
import AnimatedSection from "@/components/animated-section"

import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { cn } from "@/lib/utils"
import {
  ArrowRight,
  CheckCircle,
  Award,
  ShieldCheck,
  Clock,
  Sparkles,
  ClipboardList,
  Wrench,
  BadgeCheck,
  Phone,
  MapPin,
  Layers,
} from "lucide-react"

type Props = {
  params: { slug: string }
}

const SITE_NAME = "ERG Rénovation"
const SITE_URL = "https://erg-renovation.fr"
const PHONE_NUMBER = "+33699961375"
const PHONE_TEL = "tel:+33699961375"

const PILLAR_SLUGS = [
  "renovation-appartement",
  "renovation-maison",
  "renovation-salle-de-bain",
  "renovation-cuisine",
  "amenagement-combles",
  "peinture-finitions",
] as const

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

function joinHuman(list: string[]) {
  if (!list.length) return ""
  if (list.length === 1) return list[0]
  if (list.length === 2) return `${list[0]} et ${list[1]}`
  return `${list.slice(0, -1).join(", ")} et ${list[list.length - 1]}`
}

function toAbsUrl(pathname: string) {
  if (!pathname) return SITE_URL
  return pathname.startsWith("http") ? pathname : `${SITE_URL}${pathname.startsWith("/") ? "" : "/"}${pathname}`
}

function toRelPath(absOrRel: string) {
  return absOrRel.startsWith(SITE_URL) ? absOrRel.replace(SITE_URL, "") || "/" : absOrRel
}

function inferAreaServed(slug: string) {
  // Tu peux affiner selon ton business réel
  if (slug === "renovation-appartement" || slug === "renovation-salle-de-bain" || slug === "renovation-cuisine") {
    return ["Paris (75)", "Hauts-de-Seine (92)", "Seine-Saint-Denis (93)", "Val-de-Marne (94)", "Yvelines (78)"]
  }
  if (slug === "renovation-maison" || slug === "amenagement-combles") {
    return ["Paris (75)", "Yvelines (78)", "Hauts-de-Seine (92)", "Seine-Saint-Denis (93)", "Val-de-Marne (94)"]
  }
  return ["Paris", "Île-de-France"]
}

/**
 * JSON-LD : WebSite + WebPage + Breadcrumbs + LocalBusiness + Service
 * (et ItemList de projets liés si présents)
 */
function JsonLdServicePage({
  pageTitle,
  pageDescription,
  pageUrl,
  breadcrumbs,
  areaServed,
  serviceName,
  projects,
}: {
  pageTitle: string
  pageDescription: string
  pageUrl: string
  breadcrumbs: Array<{ name: string; item: string }>
  areaServed: string[]
  serviceName: string
  projects: Array<{ title: string; slug: string }>
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
        telephone: PHONE_NUMBER,
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
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: serviceName,
        description: pageDescription,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed,
        serviceType: "Rénovation intérieure",
      },
      ...(projects.length
        ? [
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#projects`,
              name: "Réalisations associées",
              itemListElement: projects.map((p, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                name: p.title,
                url: `${SITE_URL}/realisations/${p.slug}`,
              })),
            },
          ]
        : []),
    ],
  }

  return (
    <Script
      id="jsonld-service-page"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/**
 * Copy premium (fallback) : seulement si service n’a pas assez de contenu.
 * (N’utilise AUCUN champ non existant : uniquement title, longDescription, benefits, process, whyUs, zones)
 */
function SeoFallbackBlock({
  serviceTitle,
  areaServed,
}: {
  serviceTitle: string
  areaServed: string[]
}) {
  const zone = joinHuman(areaServed)
  return (
    <div className="prose max-w-none text-foreground prose-headings:font-headline prose-headings:text-primary prose-p:text-muted-foreground prose-a:text-accent prose-strong:text-foreground">
      <h2>{`Un service ${serviceTitle.toLowerCase()} cadré, propre et durable`}</h2>
      <p>
        Une rénovation réussie, c’est un chantier <strong>maîtrisé</strong> : un devis clair, un planning réaliste,
        des protections soignées, et des finitions impeccables. Chez <strong>{SITE_NAME}</strong>, nous pilotons votre
        projet de A à Z, avec un suivi régulier et une exécution rigoureuse.
      </p>

      <h3>Ce que vous obtenez (concrètement)</h3>
      <ul>
        <li>
          <strong>Chiffrage transparent</strong> : poste par poste, options de finitions (essentiel / confort / premium).
        </li>
        <li>
          <strong>Interlocuteur unique</strong> : coordination des corps d’état et réponses rapides.
        </li>
        <li>
          <strong>Qualité d’exécution</strong> : contrôles, respect des règles, finitions propres.
        </li>
        <li>
          <strong>Sérénité</strong> : méthode, planning et réception soignée.
        </li>
      </ul>

      <h3>Zone d’intervention</h3>
      <p>
        Nous intervenons sur <strong>{zone}</strong>. Vous êtes proche ? Contactez-nous : on valide rapidement la
        faisabilité et les délais.
      </p>
    </div>
  )
}

/** Titres H1 + intro + sections “premium” pour les pages piliers */
const pageTitles: Record<
  string,
  {
    h1: string
    intro: string
    cta: string
    benefitsTitle: string
    benefitsIntro: string
    processTitle: string
    processIntro: string
    whyUsTitle: string
    whyUsIntro?: string
    faqTitle: string
  }
> = {
  "renovation-appartement": {
    h1: "Rénovation d’Appartement à Paris & Île-de-France : l’excellence, du devis aux finitions",
    intro:
      "Transformer un appartement parisien ou francilien en un lieu de vie exceptionnel exige une expertise technique, une gestion de projet rigoureuse et une obsession du détail. ERG Rénovation pilote votre chantier de A à Z à Paris, dans les Hauts-de-Seine (92), la Seine-Saint-Denis (93), le Val-de-Marne (94) et les Yvelines (78).",
    cta: "Obtenir mon devis personnalisé",
    benefitsTitle: "Nos prestations de rénovation sur mesure",
    benefitsIntro:
      "Rénovation complète, modernisation d’un appartement ancien, redistribution des espaces, reprise des réseaux : nous coordonnons tous les corps d’état pour un résultat impeccable.",
    processTitle: "Votre projet en 4 étapes : une méthode claire, un résultat maîtrisé",
    processIntro:
      "La réussite d’une rénovation haut de gamme repose sur une méthodologie éprouvée : cadrage, planification, exécution contrôlée et réception soignée.",
    whyUsTitle: "Pourquoi confier votre appartement à ERG Rénovation ?",
    faqTitle: "Questions fréquentes sur la rénovation d’appartement",
  },
  "renovation-maison": {
    h1: "Rénovation de Maison en Île-de-France : un projet de vie, piloté avec excellence",
    intro:
      "Votre maison est un projet de vie. Nous vous accompagnons pour la rénover, l’agrandir et la transformer en l’espace dont vous avez toujours rêvé. ERG Rénovation est votre interlocuteur unique pour une rénovation maîtrisée.",
    cta: "Discutons de votre projet de vie",
    benefitsTitle: "Notre savoir-faire au service de votre maison",
    benefitsIntro:
      "Structure, isolation, redistribution des volumes, finitions : nous maîtrisons l’ensemble des corps d’état pour répondre à toutes les ambitions.",
    processTitle: "Une rénovation sans stress : transparence, planning, suivi",
    processIntro:
      "Notre méthode est conçue pour vous garantir une visibilité totale sur le budget, les étapes et les livrables, avec des validations régulières.",
    whyUsTitle: "Pourquoi ERG Rénovation pour votre maison ?",
    faqTitle: "Vos questions sur la rénovation de maison",
  },
  "renovation-salle-de-bain": {
    h1: "Rénovation de Salle de Bain à Paris & IDF : technique irréprochable, rendu premium",
    intro:
      "Votre salle de bain doit être belle, confortable… et surtout durable. Étanchéité, réseaux, ventilation, finitions : ERG Rénovation conçoit et rénove des salles de bain haut de gamme à Paris et en Île-de-France (75, 92, 93, 94, 78).",
    cta: "Obtenir mon devis salle de bain",
    benefitsTitle: "Nos prestations pour une salle de bain haut de gamme",
    benefitsIntro:
      "Refonte complète, douche à l’italienne, optimisation de l’espace, mobilier, carrelage/faïence : nous pilotons l’ensemble du projet, avec une exigence forte sur les points techniques.",
    processTitle: "Conception, pilotage, finitions : un projet de A à Z",
    processIntro:
      "Dans une pièce humide, la qualité se joue sur ce qu’on ne voit pas : supports, pentes, étanchéité, raccords. Notre méthode sécurise chaque étape critique.",
    whyUsTitle: "L’expertise technique : le luxe de la tranquillité",
    whyUsIntro:
      "Une belle salle de bain est avant tout une salle de bain qui dure. Notre priorité absolue : sécuriser la technique (étanchéité, réseaux, ventilation) avant d’atteindre un rendu premium.",
    faqTitle: "Questions fréquentes sur la rénovation de salle de bain",
  },
  "renovation-cuisine": {
    h1: "Rénovation de Cuisine à Paris & IDF : design, fonctionnalité, exécution parfaite",
    intro:
      "La cuisine est le cœur de votre intérieur. Sa rénovation touche à tous les corps de métier : plomberie, électricité, plâtrerie, pose, finitions. ERG Rénovation orchestre votre projet de A à Z à Paris et en Île-de-France (75, 92, 93, 94, 78).",
    cta: "Concevoir ma future cuisine",
    benefitsTitle: "Une expertise complète pour votre cuisine",
    benefitsIntro:
      "Nous gérons la totalité des travaux pour garantir une intégration parfaite : réseaux, éclairage, crédences, sols, peinture, pose et ajustements.",
    processTitle: "Une cuisine livrée clé en main, sans casse-tête de coordination",
    processIntro:
      "Notre pilotage intégral assure une exécution fluide et des délais tenus : un seul interlocuteur, des étapes validées, une réception propre.",
    whyUsTitle: "Matériaux & durabilité : l’alliance de l’esthétique et du quotidien",
    whyUsIntro:
      "Une cuisine d’exception se définit par ses matériaux et la précision d’exécution. Nous vous guidons dans les choix pour concilier design, résistance et entretien.",
    faqTitle: "Vos questions sur la rénovation de cuisine",
  },
  "amenagement-combles": {
    h1: "Aménagement de Combles à Paris & IDF : créez un nouvel espace de vie",
    intro:
      "Gagnez des m² sans déménager. L’aménagement de combles est un projet très technique (structure, isolation, ventilation, lumière). ERG Rénovation sécurise votre transformation à Paris et en Île-de-France (75, 78, 92, 93, 94).",
    cta: "Demander une étude de faisabilité",
    benefitsTitle: "Transformer l’inexploité en espace de vie",
    benefitsIntro:
      "Des combles perdus à la suite parentale : nous gérons l’étude, la structure, l’isolation, les réseaux et les finitions, pour un résultat confortable et durable.",
    processTitle: "De l’étude à la livraison : un projet structurel sécurisé",
    processIntro:
      "Votre toiture et votre charpente ne laissent pas place à l’approximation. Notre expertise technique (et la décennale) protège votre projet.",
    whyUsTitle: "Maîtrise technique : un chantier sécurisé",
    whyUsIntro:
      "Isolation performante, traitement des points singuliers, confort été/hiver : nos choix techniques visent le confort et la pérennité.",
    faqTitle: "Vos questions sur l’aménagement de combles",
  },
  "peinture-finitions": {
    h1: "Peinture & Finitions : la signature d’un intérieur haut de gamme",
    intro:
      "Le succès d’une rénovation se juge à la perfection des finitions : préparation des supports, alignements, teintes, lumière. ERG Rénovation réalise des finitions haut de gamme à Paris et en Île-de-France.",
    cta: "Demander un devis finitions",
    benefitsTitle: "Notre maîtrise des finitions d’intérieur",
    benefitsIntro:
      "Le secret d’un mur parfait est invisible : préparation, enduits, ponçage, primaires, couches tendues. Chaque étape est exécutée avec rigueur.",
    processTitle: "Le processus de l’excellence : préparation, exécution, contrôle",
    processIntro:
      "Notre méthode garantit un rendu final conforme à nos standards — et aux vôtres — avec un chantier propre et respectueux de votre intérieur.",
    whyUsTitle: "Artisans, matériaux, propreté : l’engagement qualité",
    whyUsIntro:
      "Protection, nettoyage quotidien, respect de votre domicile : la propreté fait partie intégrante de notre service haut de gamme.",
    faqTitle: "Questions fréquentes sur la peinture & les finitions",
  },
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug)

  if (!service) return { title: "Service non trouvé" }

  // URLs
  const url = `${SITE_URL}/services/${service.slug}`

  // Title/desc : tu as déjà des titres fixes, on les garde + on complète OG/robots/canonical
  const computed = (() => {
    if (service.slug === "renovation-appartement") {
      return {
        title: "Rénovation Appartement Paris & IDF (92, 93, 94, 78) | ERG Rénovation",
        description:
          "Confiez votre projet de rénovation d'appartement à Paris et IDF à ERG Rénovation. Expertise haut de gamme, gestion de A à Z, devis sur-mesure.",
      }
    }
    if (service.slug === "renovation-maison") {
      return {
        title: "Rénovation Maison Paris & IDF (78, 92, 93, 94) | ERG Rénovation",
        description:
          "Votre maison est un projet de vie. ERG Rénovation gère sa rénovation, extension ou aménagement en Île-de-France. Expertise haut de gamme de A à Z.",
      }
    }
    if (service.slug === "renovation-salle-de-bain") {
      return {
        title: "Rénovation Salle de Bain Paris & IDF (92, 93, 94, 78) | ERG Rénovation",
        description:
          "Transformez votre salle de bain en un espace bien-être. ERG Rénovation, expert en rénovation haut de gamme à Paris et IDF. Devis pour votre douche à l'italienne.",
      }
    }
    if (service.slug === "renovation-cuisine") {
      return {
        title: "Rénovation Cuisine Paris & IDF (92, 93, 94, 78) | ERG Rénovation",
        description:
          "ERG Rénovation gère la rénovation complète de votre cuisine à Paris et IDF. Conception sur mesure, îlot central, finitions haut de gamme. Devis A à Z.",
      }
    }
    if (service.slug === "amenagement-combles") {
      return {
        title: "Aménagement de Combles Paris & IDF (78, 92, 94, 93) | ERG Rénovation",
        description:
          "Gagnez des m² précieux. ERG Rénovation gère l'aménagement de vos combles à Paris et IDF. Isolation, structure, suite parentale. Gestion A à Z.",
      }
    }
    if (service.slug === "peinture-finitions") {
      return {
        title: "Peinture & Finitions Haut de Gamme Paris & IDF | ERG Rénovation",
        description:
          "Finitions impeccables pour vos murs et plafonds à Paris et IDF. Préparation minutieuse, matériaux d'exception. Demandez votre diagnostic finition.",
      }
    }
    return {
      title: `${service.title} | ${SITE_NAME}`,
      description: `${safeText(service.longDescription).slice(0, 155)}...`,
    }
  })()

  return {
    title: computed.title,
    description: computed.description,
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
      title: computed.title,
      description: computed.description,
      url,
      siteName: SITE_NAME,
      locale: "fr_FR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: computed.title,
      description: computed.description,
    },
  }
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) notFound()

  const isPillarPage = PILLAR_SLUGS.includes(service.slug as any)
  const content = isPillarPage ? pageTitles[service.slug] : null

  const serviceImage = PlaceHolderImages.find((p) => p.id === service.heroImageId)
  
  const benefitImage = PlaceHolderImages.find((p) => p.id === service.benefitImageId);
  const whyUsImage = PlaceHolderImages.find((p) => p.id === service.whyUsImageId);

  const relatedProjects = allProjects.filter((p) => service.relatedProjectSlugs?.includes(p.slug))

  const areaServed = inferAreaServed(service.slug)
  const pageUrl = `${SITE_URL}/services/${service.slug}`

  const breadcrumbs = [
    { name: "Accueil", item: SITE_URL },
    { name: "Services", item: `${SITE_URL}/services` },
    { name: service.title, item: pageUrl },
  ]

  const heroBadges = (() => {
    if (service.slug === "renovation-maison" || service.slug === "amenagement-combles") {
      return [
        { icon: ShieldCheck, text: "Expertise structurelle" },
        { icon: BadgeCheck, text: "Garantie décennale" },
        { icon: Clock, text: "Planning réaliste" },
      ]
    }
    if (service.slug === "renovation-cuisine") {
      return [
        { icon: Layers, text: "Travaux + pose coordonnés" },
        { icon: BadgeCheck, text: "Garantie décennale" },
        { icon: Clock, text: "Délais & budget maîtrisés" },
      ]
    }
    if (service.slug === "peinture-finitions") {
      return [
        { icon: Sparkles, text: "Préparation des supports" },
        { icon: ShieldCheck, text: "Rendu haut de gamme" },
        { icon: Clock, text: "Chantier propre" },
      ]
    }
    return [
      { icon: ShieldCheck, text: "Gestion de projet A à Z" },
      { icon: Award, text: "Garantie décennale" },
      { icon: Clock, text: "Respect des délais" },
    ]
  })()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-grow">
        <JsonLdServicePage
          pageTitle={safeText(content?.h1 ?? service.title)}
          pageDescription={safeText(content?.intro ?? service.longDescription)}
          pageUrl={pageUrl}
          breadcrumbs={breadcrumbs}
          areaServed={areaServed}
          serviceName={service.title}
          projects={relatedProjects.map((p) => ({ title: p.title, slug: p.slug }))}
        />

        {/* HERO */}
        <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground md:py-24">
          {serviceImage ? (
            <Image
              src={serviceImage.imageUrl}
              alt={service.title}
              fill
              className="object-cover opacity-10"
              priority
              data-ai-hint={serviceImage.imageHint}
              sizes="100vw"
            />
          ) : null}

          <div className="container relative z-10">
            {/* Breadcrumbs safe (HTML) */}
            <nav aria-label="Fil d’ariane" className="text-sm text-primary-foreground/80">
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
                        <Link href={toRelPath(b.item)} className="hover:underline">
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
                <MapPin className="h-4 w-4 text-accent" />
                Paris & Île-de-France • Devis détaillé • Garantie décennale
              </p>

              <h1 className="mt-5 max-w-4xl font-headline text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                {content ? content.h1 : service.title}
              </h1>

              <p className="mt-6 max-w-3xl text-lg text-primary-foreground/80 md:leading-relaxed">
                {content ? content.intro : service.longDescription}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/devis">{content ? content.cta : "Obtenir un devis"}</Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <a href={PHONE_TEL} aria-label="Appeler ERG Rénovation">
                    <Phone className="mr-2 h-4 w-4" />
                    Appeler maintenant
                  </a>
                </Button>
              </div>

              <div className="mt-8 flex flex-col gap-2 text-sm text-primary-foreground/80 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
                {heroBadges.map((b) => (
                  <div key={b.text} className="flex items-center gap-2">
                    <b.icon className="h-4 w-4 text-accent" />
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AnimatedSection>
          <section className="container py-16 md:py-24">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-3">
              {/* MAIN */}
              <div className="lg:col-span-2 space-y-12">
                {/* Prestations */}
                <section aria-labelledby="benefits-title">
                  <h2 id="benefits-title" className="font-headline text-3xl font-bold">
                    {content ? content.benefitsTitle : "Une expertise complète pour votre projet"}
                  </h2>

                  <div className="prose max-w-none text-muted-foreground mt-4 prose-p:my-4">
                    <p>{content ? content.benefitsIntro : safeText(service.longDescription)}</p>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-6">
                      {service.benefits?.slice(0, 2).map((benefit) => (
                        <div key={benefit.title} className="flex items-start gap-4">
                          <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                          <div>
                            <h3 className="font-headline text-lg font-semibold">{benefit.title}</h3>
                            <p className="text-muted-foreground md:leading-relaxed">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {benefitImage && (
                      <div className="relative h-64 overflow-hidden rounded-lg md:h-auto">
                        <Image
                          src={benefitImage.imageUrl}
                          alt={safeText(benefitImage.description)}
                          fill
                          className="object-cover"
                          data-ai-hint={benefitImage.imageHint}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    )}

                    <div className="space-y-6 md:col-span-2 grid gap-8 md:grid-cols-2">
                      {service.benefits?.slice(2).map((benefit) => (
                        <div key={benefit.title} className="flex items-start gap-4">
                          <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                          <div>
                            <h3 className="font-headline text-lg font-semibold">{benefit.title}</h3>
                            <p className="text-muted-foreground md:leading-relaxed">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Si un service a peu de bénéfices, on ajoute un bloc indexable premium */}
                    {(!service.benefits || service.benefits.length < 3) ? (
                      <div className="md:col-span-2">
                        <SeoFallbackBlock serviceTitle={service.title} areaServed={areaServed} />
                      </div>
                    ) : null}
                  </div>
                </section>

                {/* Process */}
                {service.process?.length ? (
                  <section aria-labelledby="process-title">
                    <h2 id="process-title" className="font-headline text-3xl font-bold">
                      {content ? content.processTitle : "Notre méthode de travail"}
                    </h2>

                    {content?.processIntro ? (
                      <div className="prose max-w-none text-muted-foreground mt-4 prose-p:my-4">
                        <p>{content.processIntro}</p>
                      </div>
                    ) : null}

                    <div className="mt-8 space-y-8">
                      {service.process.map((step) => (
                        <div key={step.step} className="flex items-start gap-6">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-accent font-bold font-headline text-xl">
                            {`0${step.step}`}
                          </div>
                          <div>
                            <h3 className="font-headline text-lg font-semibold">{step.title}</h3>
                            <p className="text-muted-foreground md:leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                      <Button asChild size="lg" variant="outline">
                        <Link href="/realisations">Découvrir nos réalisations (Avant/Après)</Link>
                      </Button>
                      <Button asChild size="lg">
                        <Link href="/devis">Demander un devis</Link>
                      </Button>
                    </div>
                  </section>
                ) : null}

                {/* Why us */}
                {service.whyUs?.length ? (
                  <section aria-labelledby="why-title">
                    <h2 id="why-title" className="font-headline text-3xl font-bold">
                      {content ? content.whyUsTitle : "Pourquoi nous choisir ?"}
                    </h2>

                    {content?.whyUsIntro ? (
                      <div className="prose max-w-none text-muted-foreground mt-4 prose-p:my-4">
                        <p>{content.whyUsIntro}</p>
                      </div>
                    ) : null}

                    <div className="mt-8 grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                      <div className="space-y-6">
                        {service.whyUs.map((item) => (
                          <Card
                            key={item.title}
                            className="bg-transparent shadow-none border-0"
                          >
                            <CardHeader className="flex flex-row items-center gap-4 p-4">
                              <div
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
                              >
                                <item.icon className="h-5 w-5" />
                              </div>
                              <h3 className="font-headline text-base font-semibold">{item.title}</h3>
                            </CardHeader>

                            {item.description ? (
                              <CardContent className="p-4 pt-0 pl-14">
                                <p className="text-sm text-muted-foreground md:leading-relaxed">{item.description}</p>
                              </CardContent>
                            ) : null}
                          </Card>
                        ))}
                      </div>

                      {whyUsImage && (
                        <div className="relative h-80 w-full overflow-hidden rounded-lg md:h-full">
                          <Image
                            src={whyUsImage.imageUrl}
                            alt={safeText(whyUsImage.description)}
                            fill
                            className="object-cover"
                            data-ai-hint={whyUsImage.imageHint}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </div>
                      )}
                    </div>
                  </section>
                ) : null}

                {/* Zones */}
                {service.zones ? (
                  <section aria-labelledby="zones-title">
                    <h2 id="zones-title" className="font-headline text-3xl font-bold">
                      Nos zones d’intervention en Île-de-France
                    </h2>

                    {service.zones.description ? (
                      <div className="prose max-w-none text-muted-foreground mt-4 prose-p:my-4">
                        <p>{service.zones.description}</p>
                      </div>
                    ) : null}

                    {Array.isArray(service.zones.list) ? (
                      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {service.zones.list.map((zone: any) => (
                          <Button asChild variant="outline" key={zone.slug}>
                            <Link href={`/${service.slug}/${zone.slug}`}>{zone.name}</Link>
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-4 text-sm font-semibold text-primary">{service.zones.list}</p>
                    )}
                  </section>
                ) : null}

                {/* FAQ */}
                {service.faq?.length ? (
                  <section aria-labelledby="faq-title">
                    <h2 id="faq-title" className="font-headline text-3xl font-bold">
                      {content ? content.faqTitle : "Questions fréquentes"}
                    </h2>

                    <Accordion type="single" collapsible className="mt-6 w-full">
                      {service.faq.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                          <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="prose max-w-none text-muted-foreground prose-p:my-4">
                            <p>{item.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                ) : null}
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
                        <a href={PHONE_TEL}>Appeler</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline">Nos autres services</CardTitle>
                    <CardDescription>Pour compléter votre projet.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {services
                        .filter((s) => s.slug !== service.slug)
                        .slice(0, 4)
                        .map((otherService) => (
                          <li key={otherService.slug}>
                            <Link
                              href={`/services/${otherService.slug}`}
                              className={cn(
                                "flex items-start gap-3 rounded-md p-2 text-sm text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              )}
                            >
                              <otherService.icon className="mt-1 h-4 w-4 shrink-0" />
                              <span className="flex-1 whitespace-normal">{otherService.title}</span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                    <Button variant="outline" asChild className="mt-4 w-full">
                      <Link href="/services">Voir tous les services</Link>
                    </Button>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </section>
        </AnimatedSection>

        {/* RELATED PROJECTS */}
        {relatedProjects.length > 0 ? (
          <AnimatedSection>
            <section className="bg-secondary py-16 md:py-24">
              <div className="container">
                <h2 className="text-center font-headline text-3xl font-bold">
                  Nos réalisations en {service.title.toLowerCase()}
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
                  Avant / après, détails, finitions : explorez des chantiers représentatifs et projetez-vous.
                </p>

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <Button asChild size="lg">
                    <Link href="/realisations">Voir toutes nos réalisations</Link>
                  </Button>
                </div>
              </div>
            </section>
          </AnimatedSection>
        ) : null}

        <CtaBanner />
      </main>

      <SiteFooter />
    </div>
  )
}

function ProjectCard({ project }: { project: (typeof allProjects)[0] }) {
  const beforeImage = PlaceHolderImages.find((img) => img.id === project.images.before)
  const afterImage = PlaceHolderImages.find((img) => img.id === project.images.after)

  return (
    <Card className="group flex h-full flex-col overflow-hidden">
      <CardContent className="p-0">
        <Tabs defaultValue="after" className="relative w-full">
          <div className="relative h-64 w-full">
            <TabsContent value="after" className="m-0 h-full">
              {afterImage ? (
                <Image
                  src={afterImage.imageUrl}
                  alt={project.description}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={afterImage.imageHint}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
            </TabsContent>

            <TabsContent value="before" className="m-0 h-full">
              {beforeImage ? (
                <Image
                  src={beforeImage.imageUrl}
                  alt={`Avant - ${project.description}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={beforeImage.imageHint}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
            </TabsContent>
          </div>

          <TabsList className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm">
            <TabsTrigger value="before" className="text-white/80 data-[state=active]:text-white">
              Avant
            </TabsTrigger>
            <TabsTrigger value="after" className="text-white/80 data-[state=active]:text-white">
              <Sparkles className="mr-2 h-4 w-4 text-amber-300" />
              Après
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>

      <div className="flex flex-1 flex-col p-6">
        <Badge variant="secondary" className="w-fit">
          {project.category}
        </Badge>
        <CardTitle className="pt-2 font-headline text-xl">{project.title}</CardTitle>
        <p className="mt-2 flex-grow text-sm text-muted-foreground">{project.description}</p>
      </div>

      <CardFooter className="p-6 pt-0">
        <Button variant="link" asChild className="p-0 text-accent hover:text-accent">
          <Link href={`/realisations/${project.slug}`}>
            Voir les détails <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
