
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

export const metadata: Metadata = {
  title: "Rénovation appartement Courbevoie (92400) | ERG Rénovation",
  description:
    "Entreprise de rénovation à Courbevoie (92400) près de La Défense : appartement, salle de bain, cuisine. Devis détaillé, finitions soignées.",
  alternates: {
    canonical: "https://www.erg-renovation.fr/renovation-courbevoie",
  },
  robots: {
    index: true,
    follow: true,
  },
   openGraph: {
    title: "Rénovation appartement Courbevoie (92400) | ERG Rénovation",
    description:
      "Entreprise de rénovation à Courbevoie (92400) près de La Défense : appartement, salle de bain, cuisine. Devis détaillé, finitions soignées.",
    url: "https://www.erg-renovation.fr/renovation-courbevoie",
    type: "website",
    locale: "fr_FR",
    siteName: "ERG Rénovation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rénovation appartement Courbevoie (92400) | ERG Rénovation",
    description:
      "Entreprise de rénovation à Courbevoie (92400) près de La Défense : appartement, salle de bain, cuisine. Devis détaillé, finitions soignées.",
  },
};

function JsonLd() {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "ERG Rénovation",
      "url": "https://www.erg-renovation.fr",
      "telephone": "+33699961375",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1 Sent. de la Pointe",
        "addressLocality": "Paris",
        "postalCode": "75020",
        "addressCountry": "FR"
      },
      "priceRange": "€€",
      "areaServed": {
        "@type": "City",
        "name": "Courbevoie"
      },
      "serviceType": [
        "Rénovation d’appartement",
        "Rénovation de salle de bain",
        "Rénovation de cuisine",
        "Travaux tous corps d’état",
      ],
      "description": "ERG Rénovation, entreprise spécialisée en rénovation d'appartements à Courbevoie (92400) près de La Défense. Devis gratuit, garantie décennale."
    };
    return (
        <Script
            id="jsonld-renovation-courbevoie"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}

const heroPoints = [
    { text: "Intervention rapide à Courbevoie" },
    { text: "Visite sur site gratuite" },
    { text: "Devis détaillé et transparent" },
    { text: "Un interlocuteur unique" },
];

const courbevoieSpecificities = [
    {
        icon: Building2,
        title: "Un parc immobilier dense et contrasté",
        description: "À Courbevoie, les immeubles anciens du centre côtoient les résidences modernes du Faubourg de l'Arche. Chaque projet exige une approche technique adaptée.",
        imageUrl: "https://picsum.photos/seed/92401/800/600",
        imageAlt: "Rénovation d’un appartement à Courbevoie avec finitions soignées"
    },
    {
        icon: Hammer,
        title: "Un enjeu de confort et d'esthétique",
        description: "La proximité de La Défense et de Paris impose des standards élevés. Les occupants recherchent des espaces fonctionnels, bien isolés et aux finitions irréprochables.",
        imageUrl: "https://picsum.photos/seed/92402/800/600",
        imageAlt: "Chantier de rénovation intérieure à Courbevoie près de La Défense"
    },
    {
        icon: Home,
        title: "Un investissement locatif stratégique",
        description: "Rénover un bien à Courbevoie, c'est garantir une attractivité maximale pour attirer des locataires exigeants (cadres, expatriés) et sécuriser son investissement.",
        imageUrl: "https://picsum.photos/seed/92403/800/600",
        imageAlt: "Cuisine moderne rénovée dans un appartement à Courbevoie"
    }
];

const renovationServices = [
    {
        icon: Home,
        title: "Rénovation complète d’appartement",
        description: "Idéale pour un achat avec travaux, un projet locatif haut de gamme ou une résidence principale à moderniser. Projet clé en main, piloté par un chef de projet dédié.",
        link: "/services/renovation-appartement"
    },
    {
        icon: Bath,
        title: "Rénovation de salle de bain",
        description: "Création d'espaces modernes et fonctionnels : douche à l’italienne, optimisation des petites surfaces, étanchéité renforcée et ventilation performante.",
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
        description: "Pour un rafraîchissement, une redistribution de pièces ou la création de rangements sur mesure. Idéal pour augmenter rapidement la valeur locative.",
        link: "/services"
    }
];

const whyChooseUs = [
    {
        icon: ShieldCheck,
        title: "Une connaissance approfondie du secteur de La Défense",
        description: "Nous intervenons régulièrement à Courbevoie et connaissons les copropriétés locales, les exigences des syndics et les attentes des investisseurs et cadres."
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
        question: "Quel est le prix d’une rénovation à Courbevoie ?",
        answer: "Les prix varient selon la surface, l'état initial et le niveau de finition. À titre indicatif, comptez à partir de 800 €/m² pour une rénovation partielle et entre 1 200 et 1 800 €/m² pour une rénovation complète. Une visite sur site est indispensable pour un devis précis."
    },
    {
        question: "Quels sont les délais moyens pour rénover un appartement à Courbevoie ?",
        answer: "Une salle de bain se rénove en 2 à 4 semaines, tandis qu'une rénovation complète prend de 6 à 12 semaines. Les délais sont définis contractuellement avant le début des travaux."
    },
    {
        question: "Faut-il un accord de la copropriété pour des travaux à Courbevoie ?",
        answer: "Oui, pour certains travaux (murs porteurs, réseaux, ventilation, changement de fenêtres). Nous vous accompagnons dans la constitution du dossier administratif pour sécuriser vos démarches."
    },
    {
        question: "Peut-on rénover un appartement occupé ?",
        answer: "Oui, c'est possible. Nous adaptons l'organisation du chantier en planifiant les interventions par phases et en protégeant les zones non concernées pour limiter au maximum les nuisances."
    }
];

export default function RenovationCourbevoiePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd />
      <SiteHeader />
      <main className="flex-grow">
        <Breadcrumbs />
        
        <section className="bg-secondary py-16 md:py-24">
          <div className="container text-center">
            <h1 className="font-headline text-4xl font-bold md:text-5xl lg:text-6xl">
              Rénovation d’appartement à Courbevoie (92400) – ERG Rénovation
            </h1>
            <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
              ERG Rénovation accompagne les propriétaires pour leurs travaux de rénovation à Courbevoie et près de La Défense. Appartement, salle de bain, cuisine, nous assurons un pilotage structuré et des finitions soignées.
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
                    <Link href="/devis">Mon devis à Courbevoie</Link>
                </Button>
            </div>
          </div>
        </section>

        <AnimatedSection>
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="text-center mx-auto max-w-2xl">
                    <h2 className="font-headline text-3xl font-bold">Rénover à Courbevoie : un projet à enjeu stratégique</h2>
                    <p className="mt-4 text-muted-foreground">
                      La proximité du quartier d'affaires de La Défense rend la qualité de la rénovation primordiale, pour le confort comme pour la valeur patrimoniale.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {courbevoieSpecificities.map(item => (
                        <Card key={item.title} className="overflow-hidden">
                            <div className="relative h-56 w-full">
                                <Image src={item.imageUrl} alt={item.imageAlt} fill className="object-cover" data-ai-hint={item.title.toLowerCase()} />
                            </div>
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
                    <h2 className="font-headline text-3xl font-bold">Nos services de rénovation à Courbevoie</h2>
                    <p className="mt-4 text-muted-foreground">
                        Nous réalisons des projets sur mesure, adaptés aux contraintes urbaines et aux usages intensifs des logements proches de La Défense.
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
                    <div className="relative h-80 md:h-[500px] w-full rounded-xl overflow-hidden">
                        <Image src="https://picsum.photos/seed/92404/800/1000" alt="Chantier de rénovation d'un appartement à Courbevoie" fill className="object-cover" data-ai-hint="renovation site" />
                    </div>
                    <div>
                        <h2 className="font-headline text-3xl font-bold">Pourquoi choisir ERG Rénovation à Courbevoie ?</h2>
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
        <section className="py-16 md:py-24">
            <div className="container max-w-3xl mx-auto">
                <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold">FAQ – Rénovation d’appartement à Courbevoie</h2>
                </div>
                <Accordion type="single" collapsible className="w-full mt-8">
                    {faqItems.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-left font-semibold text-lg">{item.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
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
