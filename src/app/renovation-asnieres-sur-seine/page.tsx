
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  CheckCircle,
  Home,
  Hammer,
  Sparkles,
  Bath,
  UtensilsCrossed,
  ShieldCheck,
  Users,
  ClipboardList,
  Phone,
  ArrowRight,
  Building2,
} from "lucide-react";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CtaBanner from "@/app/_components/cta-banner";
import AnimatedSection from "@/components/animated-section";
import Breadcrumbs from "@/components/breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildServiceJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo/jsonld";
import { InternalLinksCity92 } from "../renovation-hauts-de-seine/_components/internal-links";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export const metadata: Metadata = {
  title: "Rénovation appartement Asnières-sur-Seine (92600) | ERG Rénovation",
  description:
    "Entreprise de rénovation à Asnières-sur-Seine (92600) : appartement, salle de bain, cuisine. Visite sur site, devis détaillé, finitions soignées.",
  alternates: {
    canonical: "https://www.erg-renovation.fr/renovation-asnieres-sur-seine",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const heroPoints = [
    { text: "Intervention rapide à Asnières-sur-Seine" },
    { text: "Visite sur site gratuite" },
    { text: "Devis détaillé et transparent" },
    { text: "Un interlocuteur unique" },
];

const asnieresSpecificities = [
    {
        icon: Building2,
        title: "Un parc immobilier majoritairement ancien",
        description: "À Asnières, les immeubles des années 1900 à 1980 sont nombreux. La rénovation y est cruciale pour moderniser, isoler et sécuriser les logements.",
    },
    {
        icon: Hammer,
        title: "Un fort impact sur la valeur",
        description: "Dans cette ville en plein essor, une rénovation bien menée augmente le confort de vie et représente un investissement pertinent pour la valorisation du bien.",
    },
    {
        icon: Home,
        title: "Une demande forte pour les logements familiaux",
        description: "Les familles recherchent des espaces fonctionnels, lumineux et dotés de rangements optimisés, avec des finitions propres et durables.",
    }
];

const renovationServices = [
    {
        icon: Home,
        title: "Rénovation complète d’appartement",
        description: "Idéale pour un achat avec travaux ou un projet locatif. Nous pilotons le projet de A à Z : étude, démolition, électricité, plomberie, isolation et finitions.",
        link: "/services/renovation-appartement"
    },
    {
        icon: Bath,
        title: "Rénovation de salle de bain",
        description: "Création de salles de bain modernes et fonctionnelles. Nous maîtrisons l'optimisation des petites surfaces, l'étanchéité et la ventilation.",
        link: "/services/renovation-salle-de-bain"
    },
    {
        icon: UtensilsCrossed,
        title: "Rénovation de cuisine",
        description: "Cuisine ouverte ou fermée, nous optimisons les volumes, créons des rangements sur mesure et coordonnons tous les corps de métier pour un résultat durable.",
        link: "/services/renovation-cuisine"
    },
    {
        icon: Sparkles,
        title: "Rénovation partielle & aménagement",
        description: "Pour un rafraîchissement, une redistribution de pièces ou la création de rangements sur mesure. Idéal pour valoriser un bien sans rénovation lourde.",
        link: "/services"
    }
];

const whyChooseUs = [
    {
        icon: ShieldCheck,
        title: "Une connaissance fine du tissu local",
        description: "Nous intervenons régulièrement à Asnières et connaissons les copropriétés locales, les contraintes techniques et les attentes des familles et investisseurs."
    },
    {
        icon: Users,
        title: "Un interlocuteur unique pour votre projet",
        description: "Un chef de projet dédié assure la coordination des artisans, le respect du planning et le contrôle qualité, pour votre tranquillité d'esprit."
    },
    {
        icon: ClipboardList,
        title: "Une transparence totale et des garanties",
        description: "Nos devis sont clairs et détaillés, nos délais contractualisés et votre budget est maîtrisé. Tous nos travaux sont couverts par la garantie décennale."
    }
];

const faqItems = [
    {
        q: "Quel est le prix d’une rénovation à Asnières-sur-Seine ?",
        a: "Les prix varient selon la surface, l'état initial et le niveau de finition. À titre indicatif, comptez à partir de 750 €/m² pour une rénovation partielle et entre 1 100 et 1 600 €/m² pour une rénovation complète. Une visite sur site est indispensable pour un devis précis."
    },
    {
        q: "Quels sont les délais moyens ?",
        a: "Une salle de bain se rénove en 2 à 4 semaines, tandis qu'une rénovation complète prend de 6 à 12 semaines. Les délais sont définis contractuellement."
    },
    {
        q: "Faut-il l’accord de la copropriété ?",
        a: "Oui, pour certains travaux (murs porteurs, réseaux, ventilation). Nous vous accompagnons dans les démarches administratives."
    },
    {
        q: "Peut-on rénover un appartement occupé ?",
        a: "Oui. L’organisation du chantier est adaptée pour limiter les nuisances."
    }
];

const SITE_URL = "https://www.erg-renovation.fr";

export default function RenovationAsnieresPage() {
  const service = buildServiceJsonLd({
    businessName: "ERG Rénovation",
    siteUrl: SITE_URL,
    url: "/renovation-asnieres-sur-seine",
    city: "Asnières-sur-Seine",
    postalCode: "92600",
    serviceType: "Rénovation intérieure",
  });

  const breadcrumb = buildBreadcrumbJsonLd(SITE_URL, [
    { name: "Accueil", url: "/" },
    { name: "Hauts-de-Seine (92)", url: "/renovation-hauts-de-seine" },
    { name: "Asnières-sur-Seine", url: "/renovation-asnieres-sur-seine" },
  ]);

  const faq = buildFaqJsonLd(faqItems);
  const whyUsImage = PlaceHolderImages.find(p => p.id === 'renovation-site');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd id="jsonld-asnieres" data={[service, breadcrumb, faq]} />
      <SiteHeader />
      <main className="flex-grow">
        <Breadcrumbs />
        
        <section className="bg-secondary py-16 md:py-24">
          <div className="container text-center">
            <h1 className="font-headline text-4xl font-bold md:text-5xl lg:text-6xl">
              Rénovation d’appartement à Asnières-sur-Seine (92600) – ERG Rénovation
            </h1>
            <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
              ERG Rénovation accompagne les propriétaires, familles et investisseurs pour leurs travaux de rénovation à Asnières-sur-Seine. Appartement, salle de bain, cuisine ou rénovation complète, nous intervenons avec une méthodologie rigoureuse et des finitions soignées.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
                {heroPoints.map(point => (
                    <span key={point.text} className="flex items-center gap-2 font-medium">
                        <CheckCircle className="h-5 w-5 text-accent"/>
                        {point.text}
                    </span>
                ))}
            </div>
            <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/devis">Mon devis à Asnières-sur-Seine</Link>
                </Button>
            </div>
          </div>
        </section>

        <AnimatedSection>
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="text-center mx-auto max-w-2xl">
                    <h2 className="font-headline text-3xl font-bold">Rénover à Asnières : un projet à fort potentiel</h2>
                    <p className="mt-4 text-muted-foreground">
                      Dans une ville en plein essor, la rénovation est essentielle pour améliorer le confort, mettre aux normes et valoriser son patrimoine.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {asnieresSpecificities.map(item => {
                      return (
                        <Card key={item.title} className="overflow-hidden">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <item.icon className="h-6 w-6 text-accent"/>
                                    {item.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">{item.description}</p>
                            </CardContent>
                        </Card>
                      )
                    })}
                </div>
            </div>
        </section>
        </AnimatedSection>
        
        <AnimatedSection>
        <section className="bg-secondary py-16 md:py-24">
            <div className="container">
                <div className="text-center mx-auto max-w-2xl">
                    <h2 className="font-headline text-3xl font-bold">Nos services de rénovation à Asnières-sur-Seine</h2>
                    <p className="mt-4 text-muted-foreground">
                        Nous proposons des projets 100 % sur mesure, adaptés aux objectifs de chaque client.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {renovationServices.map(service => (
                        <Card key={service.title} className="flex flex-col">
                            <CardHeader className="flex-row items-start gap-4">
                                <div className="mt-1 flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                    <service.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <CardTitle>{service.title}</CardTitle>
                                    <CardDescription className="mt-2">{service.description}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow flex items-end">
                                <Button variant="link" asChild className="p-0 text-accent">
                                    <Link href={service.link}>En savoir plus <ArrowRight className="ml-2 h-4 w-4"/></Link>
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
                      <div className="relative h-80 md:h-[500px] w-full rounded-xl overflow-hidden">
                          <Image src={whyUsImage.imageUrl} alt={whyUsImage.description} fill className="object-cover" data-ai-hint={whyUsImage.imageHint} />
                      </div>
                    )}
                    <div>
                        <h2 className="font-headline text-3xl font-bold">Pourquoi choisir ERG Rénovation à Asnières-sur-Seine ?</h2>
                        <div className="mt-8 space-y-6">
                            {whyChooseUs.map(item => (
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
                    </div>
                </div>
            </div>
        </section>
        </AnimatedSection>
        
        <AnimatedSection>
          <div className="container py-16 md:py-24">
            <InternalLinksCity92
              cityName="Asnières-sur-Seine"
              citySlug="/renovation-asnieres-sur-seine"
              nearby={[
                { name: "Levallois-Perret", href: "/renovation-levallois-perret" },
                { name: "Colombes", href: "/renovation-colombes" },
                { name: "Courbevoie", href: "/renovation-courbevoie" },
                { name: "Nanterre", href: "/renovation-nanterre" },
              ]}
            />
          </div>
        </AnimatedSection>

        <AnimatedSection>
        <section className="py-16 md:py-24">
            <div className="container max-w-3xl mx-auto">
                <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold">FAQ – Rénovation d’appartement à Asnières-sur-Seine</h2>
                </div>
                <Accordion type="single" collapsible className="w-full mt-8">
                    {faqItems.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-left font-semibold text-lg">{item.q}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
        </AnimatedSection>

        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
