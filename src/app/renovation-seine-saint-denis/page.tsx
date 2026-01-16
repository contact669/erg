import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowRight,
  Bath,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Home,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Users,
} from "lucide-react";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Breadcrumbs from "@/components/breadcrumbs";
import AnimatedSection from "@/components/animated-section";
import CtaBanner from "@/app/_components/cta-banner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BRAND = "ERG Rénovation";
const SITE_URL = "https://www.erg-renovation.fr";
const PAGE_SLUG = "/renovation-seine-saint-denis";
const PAGE_URL = `${SITE_URL}${PAGE_SLUG}`;

const PHONE_E164 = "+33699961375";
const PHONE_DISPLAY = "06 99 96 13 75";

export const metadata: Metadata = {
  title: `Rénovation appartement Seine-Saint-Denis (93) | ${BRAND}`,
  description:
    "Entreprise de rénovation en Seine-Saint-Denis (93) : appartement, salle de bain, cuisine. Visite sur site, devis détaillé, finitions soignées.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: `Rénovation appartement Seine-Saint-Denis (93) | ${BRAND}`,
    description:
      "Rénovation intérieure dans le 93 : appartement, salle de bain, cuisine. Visite sur site, devis détaillé, finitions soignées.",
    url: PAGE_URL,
    type: "website",
    locale: "fr_FR",
    siteName: BRAND,
  },
  twitter: {
    card: "summary_large_image",
    title: `Rénovation appartement Seine-Saint-Denis (93) | ${BRAND}`,
    description:
      "Entreprise de rénovation en Seine-Saint-Denis (93) : appartement, salle de bain, cuisine. Devis détaillé, suivi de chantier, finitions soignées.",
  },
};

function JsonLd() {
  // ✅ Minimal & “rich-results-ready” (sans surcharger)
  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Rénovation appartement Seine-Saint-Denis (93)",
      url: PAGE_URL,
      isPartOf: { "@type": "WebSite", name: BRAND, url: SITE_URL },
      about: { "@type": "Service", name: "Rénovation intérieure (appartement, cuisine, salle de bain)" },
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: BRAND,
      url: SITE_URL,
      telephone: PHONE_E164,
      priceRange: "€€",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1 Sent. de la Pointe",
        addressLocality: "Paris",
        postalCode: "75020",
        addressCountry: "FR",
      },
      areaServed: [{ "@type": "AdministrativeArea", name: "Seine-Saint-Denis" }],
      serviceType: [
        "Rénovation d’appartement",
        "Rénovation de salle de bain",
        "Rénovation de cuisine",
        "Travaux tous corps d’état",
      ],
      description:
        "ERG Rénovation est spécialisée en rénovation intérieure d'appartements, cuisines et salles de bain en Seine-Saint-Denis (93).",
    },
  ];

  return (
    <Script
      id="jsonld-renovation-93"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

const heroBadges = [
  { icon: CheckCircle2, text: "Visite sur site offerte" },
  { icon: ClipboardCheck, text: "Devis détaillé et transparent" },
  { icon: Users, text: "Interlocuteur unique" },
  { icon: ShieldCheck, text: "Garantie décennale" },
];

const proofCards = [
  {
    icon: Building2,
    title: "Parc immobilier hétérogène",
    description:
      "Logements anciens, copropriétés et résidences récentes : nous adaptons les solutions (réseaux, isolation, distribution, finitions).",
    imageUrl: "https://picsum.photos/seed/9301/900/650",
    imageAlt: "Rénovation d’un appartement en Seine-Saint-Denis (93) avec finitions soignées",
    hint: "renovated apartment",
  },
  {
    icon: Sparkles,
    title: "Valorisation rentable",
    description:
      "Une rénovation maîtrisée améliore l’attractivité locative, sécurise une revente et augmente le confort au quotidien.",
    imageUrl: "https://picsum.photos/seed/9302/900/650",
    imageAlt: "Travaux de rénovation intérieure en Seine-Saint-Denis (93)",
    hint: "renovation site",
  },
  {
    icon: Home,
    title: "Optimisation des volumes",
    description:
      "Réagencement, rangements, lumière, circulation : on transforme des contraintes en espaces de vie fonctionnels et durables.",
    imageUrl: "https://picsum.photos/seed/9303/900/650",
    imageAlt: "Cuisine rénovée sur mesure en Seine-Saint-Denis (93)",
    hint: "custom kitchen",
  },
];

const services = [
  {
    icon: Home,
    title: "Rénovation complète d’appartement",
    description:
      "Étude, démolition, électricité, plomberie, isolation, sols, peinture : un pilotage global, un résultat propre.",
    href: "/services/renovation-appartement",
  },
  {
    icon: Bath,
    title: "Rénovation de salle de bain",
    description:
      "Douche à l’italienne, optimisation des petits espaces, étanchéité, ventilation : confort et durabilité.",
    href: "/services/renovation-salle-de-bain",
  },
  {
    icon: UtensilsCrossed,
    title: "Rénovation de cuisine",
    description:
      "Cuisine ouverte ou fermée : circulation, rangements intelligents, finitions soignées et coordination TCE.",
    href: "/services/renovation-cuisine",
  },
  {
    icon: Sparkles,
    title: "Rénovation partielle & aménagement",
    description:
      "Rafraîchissement, redistribution, rangements sur mesure : valoriser sans tout refaire.",
    href: "/services",
  },
];

const whyUs = [
  {
    icon: MapPin,
    title: "Connaissance terrain du 93",
    description:
      "Copropriétés, typologies de logements, contraintes techniques : on anticipe les points bloquants pour gagner du temps.",
  },
  {
    icon: Users,
    title: "Un chef de projet dédié",
    description:
      "Coordination artisans, planning, contrôle qualité : vous êtes informé, le chantier avance, les finitions suivent.",
  },
  {
    icon: ShieldCheck,
    title: "Clarté et maîtrise",
    description:
      "Devis détaillé, étapes claires, budget suivi. Travaux couverts par la garantie décennale.",
  },
];

const faq = [
  {
    q: "Quel budget prévoir pour une rénovation dans le 93 ?",
    a: "Selon la surface, l’état initial et le niveau de prestation : dès 650 €/m² pour une rénovation partielle, et environ 1 000 à 1 500 €/m² pour une rénovation complète. Une visite sur site permet un chiffrage précis.",
  },
  {
    q: "Quels délais pour des travaux ?",
    a: "Salle de bain : 2 à 4 semaines. Appartement complet : 6 à 12 semaines selon l’ampleur. Les délais sont définis et contractualisés avant démarrage.",
  },
  {
    q: "Faut-il l’accord de la copropriété ?",
    a: "Souvent oui pour les réseaux, la ventilation, ou toute modification structurelle. Nous vous accompagnons pour préparer le dossier et sécuriser l’autorisation.",
  },
  {
    q: "Peut-on rénover un logement occupé ?",
    a: "Oui. Nous planifions le chantier par phases pour limiter les nuisances et maintenir un maximum de confort.",
  },
];

const cities = [
  { name: "Montreuil", href: "/renovation-montreuil" },
  { name: "Saint-Denis", href: null },
  { name: "Pantin", href: null },
  { name: "Aubervilliers", href: null },
  { name: "Noisy-le-Sec", href: null },
  { name: "Bobigny", href: null },
  { name: "Drancy", href: null },
  { name: "Bagnolet", href: null },
  { name: "Les Lilas", href: null },
  { name: "Romainville", href: null },
];

export default function RenovationSeineSaintDenisPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd />
      <SiteHeader />

      <main className="flex-grow">
        <Breadcrumbs />

        {/* HERO — épuré + conversion */}
        <section className="border-b bg-secondary">
          <div className="container py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm font-medium text-foreground/80">
                <MapPin className="h-4 w-4" />
                Seine-Saint-Denis (93) • Île-de-France
              </p>

              <h1 className="mt-4 font-headline text-4xl font-bold md:text-5xl lg:text-6xl tracking-tight">
                Rénovation d’appartement en Seine-Saint-Denis (93)
              </h1>

              <p className="mt-5 mx-auto max-w-3xl text-lg text-muted-foreground">
                Appartement, salle de bain, cuisine ou rénovation complète : un pilotage de chantier
                structuré, des finitions soignées, et un devis clair.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto text-left">
                {heroBadges.map((b) => (
                  <div
                    key={b.text}
                    className="flex items-center gap-2 rounded-lg border bg-background px-4 py-3"
                  >
                    <b.icon className="h-5 w-5 text-accent" />
                    <span className="font-medium">{b.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/devis">Obtenir mon devis gratuit</Link>
                </Button>

                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <a href={`tel:${PHONE_E164}`} aria-label={`Appeler ${BRAND}`}>
                    <span className="inline-flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Appeler {PHONE_DISPLAY}
                    </span>
                  </a>
                </Button>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Clock3 className="h-4 w-4" />
                <span>Réponse rapide • Visite sur site offerte • Devis sous 24–48h (selon projet)</span>
              </div>
            </div>
          </div>
        </section>

        {/* PREUVES / CONTEXTE LOCAL — 3 cartes visuelles */}
        <AnimatedSection>
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-headline text-3xl font-bold">
                  Rénover dans le 93 : transformer, optimiser, valoriser
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Le 93 combine logements anciens, copropriétés et projets récents : une rénovation réussie
                  repose sur l’anticipation technique et la qualité de finition.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {proofCards.map((item) => (
                  <Card key={item.title} className="overflow-hidden">
                    <div className="relative h-56 w-full">
                      <Image
                        src={item.imageUrl}
                        alt={item.imageAlt}
                        fill
                        className="object-cover"
                        data-ai-hint={item.hint}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <item.icon className="h-6 w-6 text-accent" />
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* SERVICES — bloc clair, orienté intention */}
        <AnimatedSection>
          <section className="bg-secondary py-16 md:py-24 border-y">
            <div className="container">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-headline text-3xl font-bold">
                  Nos services de rénovation en Seine-Saint-Denis
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Du rafraîchissement à la rénovation complète : une exécution propre, des matériaux adaptés,
                  et une coordination tous corps d’état.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {services.map((s) => (
                  <Card key={s.title} className="flex flex-col">
                    <CardHeader className="flex-row items-start gap-4">
                      <div className="mt-1 flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <s.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle>{s.title}</CardTitle>
                        <CardDescription className="mt-2">{s.description}</CardDescription>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-grow flex items-end">
                      <Button variant="link" asChild className="p-0 text-accent">
                        <Link href={s.href}>
                          En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* WHY US — 2 colonnes + image, très propre */}
        <AnimatedSection>
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative h-80 md:h-[520px] w-full rounded-xl overflow-hidden">
                  <Image
                    src="https://picsum.photos/seed/9304/900/1100"
                    alt="Réunion de chantier et coordination travaux en Seine-Saint-Denis (93)"
                    fill
                    className="object-cover"
                    data-ai-hint="construction meeting"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div>
                  <h2 className="font-headline text-3xl font-bold">
                    Une rénovation maîtrisée, du devis aux finitions
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    Notre priorité : une exécution propre, une communication claire, et un contrôle qualité
                    continu — pour un résultat durable.
                  </p>

                  <div className="mt-8 space-y-6">
                    {whyUs.map((item) => (
                      <div key={item.title} className="flex items-start gap-4">
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <item.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <p className="text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-col sm:flex-row gap-3">
                    <Button asChild className="w-full sm:w-auto">
                      <Link href="/devis">Demander un devis</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full sm:w-auto">
                      <Link href="/realisations">Voir des réalisations</Link>
                    </Button>
                  </div>

                  <div className="mt-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" /> Garantie décennale • Devis détaillé • Suivi de chantier
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* VILLES — UX simple : liens seulement si pages dispo */}
        <AnimatedSection>
          <section className="bg-secondary py-16 md:py-24 border-y">
            <div className="container">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-headline text-3xl font-bold">
                  Villes d’intervention en Seine-Saint-Denis (93)
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Nous couvrons tout le département. Les villes ci-dessous disposent d’une page dédiée lorsque
                  disponible.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
                {cities.map((city) =>
                  city.href ? (
                    <Button
                      key={city.name}
                      asChild
                      variant="outline"
                      className="font-medium bg-background hover:bg-accent hover:text-accent-foreground"
                    >
                      <Link href={city.href}>{city.name}</Link>
                    </Button>
                  ) : (
                    <div
                      key={city.name}
                      className="p-3 border rounded-lg bg-background text-center text-sm font-medium"
                    >
                      {city.name}
                    </div>
                  )
                )}
              </div>

              <div className="mt-10 text-center">
                <Button asChild size="lg">
                  <Link href="/devis">Obtenir une estimation</Link>
                </Button>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* FAQ — concise, orientée conversion */}
        <AnimatedSection>
          <section className="py-16 md:py-24">
            <div className="container max-w-3xl mx-auto">
              <div className="text-center">
                <h2 className="font-headline text-3xl font-bold">FAQ – Rénovation dans le 93</h2>
                <p className="mt-4 text-muted-foreground">
                  Réponses aux questions les plus fréquentes avant de demander un devis.
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full mt-8">
                {faq.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left font-semibold text-lg">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/devis">Demander un devis gratuit</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <a href={`tel:${PHONE_E164}`}>
                    <span className="inline-flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Appeler {PHONE_DISPLAY}
                    </span>
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <CtaBanner />
      </main>

      <SiteFooter />
    </div>
  );
}
