
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
  Hammer,
} from "lucide-react";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Breadcrumbs from "@/components/breadcrumbs";
import AnimatedSection from "@/components/animated-section";
import CtaBanner from "@/app/_components/cta-banner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const BRAND = "ERG Rénovation";
const SITE_URL = "https://www.erg-renovation.fr";
const PAGE_SLUG = "/renovation-paris";
const PAGE_URL = `${SITE_URL}${PAGE_SLUG}`;

const PHONE_E164 = "+33699961375";
const PHONE_DISPLAY = "06 99 96 13 75";

export const metadata: Metadata = {
  title: `Rénovation appartement Paris (75) | ${BRAND}`,
  description:
    "Entreprise de rénovation à Paris (75). Appartement, salle de bain, cuisine. Visite sur site, devis détaillé et suivi complet. Tous arrondissements.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: `Rénovation appartement Paris (75) | ${BRAND}`,
    description:
      "Rénovation intérieure à Paris : appartement, salle de bain, cuisine. Visite sur site, devis détaillé, finitions soignées.",
    url: PAGE_URL,
    type: "website",
    locale: "fr_FR",
    siteName: BRAND,
  },
  twitter: {
    card: "summary_large_image",
    title: `Rénovation appartement Paris (75) | ${BRAND}`,
    description:
      "Entreprise de rénovation à Paris (75) : appartement, salle de bain, cuisine. Devis détaillé, suivi de chantier, finitions soignées.",
  },
};

function JsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Rénovation appartement Paris (75)",
      url: PAGE_URL,
      isPartOf: { "@type": "WebSite", name: BRAND, url: SITE_URL },
      about: {
        "@type": "Service",
        name: "Rénovation intérieure (appartement, cuisine, salle de bain)",
        areaServed: "Paris",
      },
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
      areaServed: [{ "@type": "City", name: "Paris" }],
      serviceType: [
        "Rénovation d’appartement",
        "Rénovation de salle de bain",
        "Rénovation de cuisine",
        "Travaux tous corps d’état",
      ],
      description:
        "ERG Rénovation, entreprise spécialisée en rénovation intérieure d'appartements, cuisines et salles de bain à Paris. Devis gratuit, garantie décennale.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <Script
      id="jsonld-renovation-paris"
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

const parisProof = [
  {
    icon: Building2,
    title: "Bâti ancien, diagnostic précis",
    description:
      "Haussmanniens, planchers bois, murs porteurs, réseaux à remettre aux normes : une rénovation à Paris commence par l’analyse technique.",
  },
  {
    icon: Home,
    title: "Copropriété et règles à respecter",
    description:
      "Réseaux, ventilation, évacuation, nuisances : nous vous aidons à sécuriser le dossier syndic et à organiser un chantier propre.",
  },
  {
    icon: Sparkles,
    title: "Optimisation des m²",
    description:
      "Circulation, rangements, lumière, finitions : on valorise chaque mètre carré pour un confort durable et une meilleure valeur du bien.",
  },
];

const services = [
  {
    icon: Building2,
    title: "Rénovation complète d’appartement",
    description:
      "Idéal pour un achat avec travaux, votre résidence principale ou un investissement locatif. Nos prestations incluent démolition, redistribution des espaces, électricité, plomberie, isolation et finitions haut de gamme. Un projet clé en main, de la conception à la livraison.",
    link: "/services/renovation-appartement",
  },
  {
    icon: Bath,
    title: "Rénovation de salle de bain à Paris",
    description:
      "Spécialistes des petites surfaces parisiennes, nous concevons des salles de bain fonctionnelles, durables et esthétiques : douche à l’italienne, meubles sur mesure, étanchéité renforcée, ventilation performante.",
    link: "/services/renovation-salle-de-bain",
  },
  {
    icon: UtensilsCrossed,
    title: "Rénovation de cuisine",
    description:
      "Cuisine ouverte, semi-ouverte ou fermée. Nous optimisons les circulations, créons des rangements intelligents et coordonnons menuiserie, plomberie et électricité pour un résultat cohérent et durable.",
    link: "/services/renovation-cuisine",
  },
  {
    icon: Hammer,
    title: "Rénovation partielle & aménagement intérieur",
    description:
      "Pour un simple rafraîchissement, une redistribution de pièces, la création de rangements sur mesure ou l'optimisation de petits espaces, nous mettons notre expertise à votre service.",
    link: "/services",
  },
];

const whyUs = [
  {
    icon: MapPin,
    title: "Paris : expertise locale réelle",
    description:
      "Tous arrondissements : nous connaissons les contraintes d’accès, les immeubles anciens et les exigences des copropriétés.",
  },
  {
    icon: Users,
    title: "Chef de projet dédié",
    description:
      "Coordination artisans, planning, points d’avancement : vous avez un interlocuteur unique, le chantier est cadré.",
  },
  {
    icon: ShieldCheck,
    title: "Clarté, qualité, garantie",
    description:
      "Devis détaillé, étapes claires, contrôle qualité continu. Travaux couverts par la garantie décennale.",
  },
];

const faqs = [
  {
    q: "Quel budget prévoir pour une rénovation à Paris ?",
    a: "Selon la surface, l’état initial et le niveau de finition : dès 600 €/m² pour une rénovation partielle et environ 1 000 à 1 600 €/m² pour une rénovation complète. Une visite sur site permet un devis précis.",
  },
  {
    q: "Quels délais pour des travaux à Paris ?",
    a: "Ils dépendent du périmètre. Comptez souvent 2 à 3 semaines pour une salle de bain et 6 à 10 semaines pour une rénovation complète. Les délais sont définis et contractualisés avant démarrage.",
  },
  {
    q: "Faut-il l’accord de la copropriété ?",
    a: "Oui pour certains travaux (murs porteurs, réseaux collectifs, ventilation). Nous vous aidons à préparer un dossier conforme pour éviter les blocages.",
  },
  {
    q: "Peut-on rénover un appartement occupé ?",
    a: "Oui. Nous planifions le chantier par phases, protégeons les zones non concernées et limitons les nuisances au maximum.",
  },
];

const arrondissements = Array.from({ length: 20 }, (_, i) => i + 1).map((n) => ({
  name: n === 1 ? "Paris 1er" : `Paris ${n}e`,
  href: null as string | null, // mettra un lien quand la page sera prête
}));

export default function RenovationParisPage() {
  const whyUsImage = PlaceHolderImages.find(p => p.id === 'about-hero');
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd faqs={faqs} />
      <SiteHeader />

      <main className="flex-grow">
        <Breadcrumbs />

        <section className="border-b bg-secondary">
          <div className="container py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm font-medium text-foreground/80">
                <MapPin className="h-4 w-4" />
                Paris (75) • Tous arrondissements
              </p>

              <h1 className="mt-4 font-headline text-4xl font-bold md:text-5xl lg:text-6xl tracking-tight">
                Rénovation d’appartement à Paris (75)
              </h1>

              <p className="mt-5 mx-auto max-w-3xl text-lg text-muted-foreground">
                Rénovation complète, salle de bain, cuisine : un chantier cadré, une communication claire,
                et des finitions soignées — du devis à la livraison.
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

        <AnimatedSection>
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-headline text-3xl font-bold">
                  Rénover à Paris : un projet exigeant, une méthode indispensable
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Bâti ancien, copropriété, optimisation des mètres carrés : l’anticipation technique et
                  la qualité d’exécution font toute la différence.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {parisProof.map((item) => (
                    <Card key={item.title} className="overflow-hidden">
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

        <AnimatedSection>
          <section className="bg-secondary py-16 md:py-24 border-y">
            <div className="container">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-headline text-3xl font-bold">Nos services de rénovation à Paris</h2>
                <p className="mt-4 text-muted-foreground">
                  Une rénovation sur mesure, adaptée aux appartements parisiens : exécution propre, coordination TCE,
                  finitions soignées.
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
                        <Link href={s.link}>
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

        <AnimatedSection>
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {whyUsImage && (
                  <div className="relative h-80 md:h-[520px] w-full rounded-xl overflow-hidden">
                    <Image
                      src={whyUsImage.imageUrl}
                      alt={whyUsImage.description}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      data-ai-hint={whyUsImage.imageHint}
                    />
                  </div>
                )}

                <div>
                  <h2 className="font-headline text-3xl font-bold">
                    Une rénovation maîtrisée, du devis aux finitions
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    Un chef de projet dédié, un planning clair, un contrôle qualité continu : vous avancez
                    sereinement, le chantier reste sous contrôle.
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
                      <ShieldCheck className="h-4 w-4" />
                      Garantie décennale • Devis détaillé • Suivi de chantier
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="bg-secondary py-16 md:py-24 border-y">
            <div className="container">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-headline text-3xl font-bold">Paris : tous les arrondissements (75)</h2>
                <p className="mt-4 text-muted-foreground">
                  Nous intervenons dans tout Paris. Des pages dédiées par arrondissement seront publiées progressivement.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
                {arrondissements.map((a) =>
                  a.href ? (
                    <Button
                      key={a.name}
                      asChild
                      variant="outline"
                      className="font-medium bg-background hover:bg-accent hover:text-accent-foreground"
                    >
                      <Link href={a.href}>{a.name}</Link>
                    </Button>
                  ) : (
                    <div
                      key={a.name}
                      className="p-3 border rounded-lg bg-background text-center text-sm font-medium"
                    >
                      {a.name}
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

        <AnimatedSection>
          <section className="py-16 md:py-24">
            <div className="container max-w-3xl mx-auto">
              <div className="text-center">
                <h2 className="font-headline text-3xl font-bold">FAQ – Rénovation d’appartement à Paris</h2>
                <p className="mt-4 text-muted-foreground">
                  L’essentiel à savoir avant de lancer des travaux dans un appartement parisien.
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full mt-8">
                {faqs.map((f, i) => (
                  <AccordionItem value={`item-${i}`} key={i}>
                    <AccordionTrigger className="text-left font-semibold text-lg">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {f.a}
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

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Astuce : pour accélérer le devis, indiquez la surface, l’adresse (arrondissement) et vos priorités (budget / délais / niveau de finition).
              </p>
            </div>
          </section>
        </AnimatedSection>

        <CtaBanner />
      </main>

      <SiteFooter />
    </div>
  );
}
