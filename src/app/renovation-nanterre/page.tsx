
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
  title: "Rénovation appartement Nanterre (92000) | ERG Rénovation",
  description:
    "Entreprise de rénovation à Nanterre (92000) : appartement, salle de bain, cuisine. Visite sur site, devis détaillé, finitions soignées.",
  alternates: {
    canonical: "https://www.erg-renovation.fr/renovation-nanterre",
  },
  robots: {
    index: true,
    follow: true,
  },
   openGraph: {
    title: "Rénovation appartement Nanterre (92000) | ERG Rénovation",
    description:
      "Entreprise de rénovation à Nanterre (92000) : appartement, salle de bain, cuisine. Visite sur site, devis détaillé, finitions soignées.",
    url: "https://www.erg-renovation.fr/renovation-nanterre",
    type: "website",
    locale: "fr_FR",
    siteName: "ERG Rénovation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rénovation appartement Nanterre (92000) | ERG Rénovation",
    description:
      "Entreprise de rénovation à Nanterre (92000) : appartement, salle de bain, cuisine. Visite sur site, devis détaillé, finitions soignées.",
  },
};

const heroPoints = [
    { text: "Intervention rapide à Nanterre" },
    { text: "Visite sur site gratuite" },
    { text: "Devis détaillé et transparent" },
    { text: "Un interlocuteur unique" },
];

const nanterreSpecificities = [
    {
        icon: Building2,
        title: "Un parc immobilier diversifié",
        description: "À Nanterre, les immeubles anciens du centre-ville côtoient des résidences plus récentes. Chaque projet de rénovation demande une approche technique adaptée, que nous maîtrisons.",
    },
    {
        icon: Hammer,
        title: "Un fort enjeu de valorisation",
        description: "Avec la proximité de La Défense, une rénovation de qualité est un investissement stratégique pour améliorer l'attractivité locative, faciliter une revente ou simplement améliorer son confort.",
    },
    {
        icon: Home,
        title: "Des attentes croissantes en confort",
        description: "Les propriétaires à Nanterre recherchent une meilleure isolation, des espaces plus fonctionnels et des matériaux durables. Une rénovation bien pensée transforme le quotidien.",
    }
];

const renovationServices = [
    {
        icon: Home,
        title: "Rénovation complète d’appartement",
        description: "Idéale pour un achat avec travaux, un projet locatif ou une résidence principale à moderniser. Nos prestations incluent étude, démolition, électricité, plomberie, isolation et finitions.",
        link: "/services/renovation-appartement"
    },
    {
        icon: Bath,
        title: "Rénovation de salle de bain",
        description: "Création de salles de bain modernes, fonctionnelles et durables : douche à l’italienne, optimisation des petits espaces, étanchéité renforcée et ventilation performante.",
        link: "/services/renovation-salle-de-bain"
    },
    {
        icon: UtensilsCrossed,
        title: "Rénovation de cuisine",
        description: "Cuisine ouverte ou fermée, nous optimisons les volumes, créons des rangements sur mesure et coordonnons tous les corps de métier pour un résultat esthétique et durable.",
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
        title: "Une connaissance approfondie du secteur",
        description: "Nous intervenons régulièrement à Nanterre et connaissons les spécificités des copropriétés, les attentes des syndics et les contraintes techniques locales."
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
        q: "Quel est le prix d’une rénovation à Nanterre ?",
        a: "Les prix varient selon la surface, l'état initial et le niveau de finition. À titre indicatif, comptez à partir de 750 €/m² pour une rénovation partielle et entre 1 100 et 1 600 €/m² pour une rénovation complète. Une visite sur site est indispensable pour un devis précis."
    },
    {
        q: "Quels sont les délais moyens pour rénover un appartement à Nanterre ?",
        a: "Une salle de bain se rénove en 2 à 4 semaines, tandis qu'une rénovation complète prend de 6 à 12 semaines. Les délais sont définis contractuellement avant le début des travaux."
    },
    {
        q: "Faut-il un accord de la copropriété pour des travaux à Nanterre ?",
        a: "Oui, pour certains travaux (murs porteurs, réseaux, ventilation, changement de fenêtres). Nous vous accompagnons dans la constitution du dossier administratif pour sécuriser vos démarches."
    },
    {
        q: "Peut-on rénover un appartement occupé ?",
        a: "Oui, c'est possible. Nous adaptons l'organisation du chantier en planifiant les interventions par phases et en protégeant les zones non concernées pour limiter au maximum les nuisances."
    }
];

const SITE_URL = "https://www.erg-renovation.fr";

export default function RenovationNanterrePage() {
    const service = buildServiceJsonLd({
        businessName: "ERG Rénovation",
        siteUrl: SITE_URL,
        url: "/renovation-nanterre",
        city: "Nanterre",
        postalCode: "92000",
        serviceType: "Rénovation intérieure",
    });

    const breadcrumb = buildBreadcrumbJsonLd(SITE_URL, [
        { name: "Accueil", url: "/" },
        { name: "Hauts-de-Seine (92)", url: "/renovation-hauts-de-seine" },
        { name: "Nanterre", url: "/renovation-nanterre" },
    ]);

    const faq = buildFaqJsonLd(faqItems);
    const whyUsImage = PlaceHolderImages.find(p => p.id === 'nanterre-why-us');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd id="jsonld-nanterre" data={[service, breadcrumb, faq]} />
      <SiteHeader />
      <main className="flex-grow">
        <Breadcrumbs />
        
        <section className="bg-secondary py-16 md:py-24">
          <div className="container text-center">
            <h1 className="font-headline text-4xl font-bold md:text-5xl lg:text-6xl">
              Rénovation d’appartement à Nanterre (92000) – ERG Rénovation
            </h1>
            <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
              ERG Rénovation accompagne les propriétaires pour leurs travaux de rénovation à Nanterre. De la rénovation complète d'appartement à la salle de bain ou la cuisine, nous assurons un suivi structuré et des finitions soignées.
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
                    <Link href="/devis">Mon devis à Nanterre</Link>
                </Button>
            </div>
          </div>
        </section>

        <AnimatedSection>
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="text-center mx-auto max-w-2xl">
                    <h2 className="font-headline text-3xl font-bold">Pourquoi rénover à Nanterre ?</h2>
                    <p className="mt-4 text-muted-foreground">
                      À Nanterre, la rénovation est un projet à fort enjeu pour le confort, la modernité et la valorisation patrimoniale.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {nanterreSpecificities.map(item => (
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
                    ))}
                </div>
            </div>
        </section>
        </AnimatedSection>
        
        <AnimatedSection>
        <section className="bg-secondary py-16 md:py-24">
            <div className="container">
                <div className="text-center mx-auto max-w-2xl">
                    <h2 className="font-headline text-3xl font-bold">Nos services de rénovation à Nanterre</h2>
                    <p className="mt-4 text-muted-foreground">
                        Nous proposons des solutions sur mesure, adaptées à chaque projet et à chaque typologie d'appartement nanterrien.
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
                        <h2 className="font-headline text-3xl font-bold">Pourquoi choisir ERG Rénovation à Nanterre ?</h2>
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
                cityName="Nanterre"
                citySlug="/renovation-nanterre"
                nearby={[
                    { name: "Courbevoie", href: "/renovation-courbevoie" },
                    { name: "Colombes", href: "/renovation-colombes" },
                    { name: "Asnières-sur-Seine", href: "/renovation-asnieres-sur-seine" },
                    { name: "Levallois-Perret", href: "/renovation-levallois-perret" },
                    { name: "Boulogne-Billancourt", href: "/renovation-boulogne-billancourt" },
                ]}
                />
            </div>
        </AnimatedSection>

        <AnimatedSection>
        <section className="py-16 md:py-24">
            <div className="container max-w-3xl mx-auto">
                <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold">FAQ – Rénovation d’appartement à Nanterre</h2>
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
