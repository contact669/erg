
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
import { PlaceHolderImages } from "@/lib/placeholder-images";

export const metadata: Metadata = {
  title: "Rénovation appartement Vincennes (94300) | ERG Rénovation",
  description:
    "Entreprise de rénovation à Vincennes (94300) : appartement, salle de bain, cuisine. Visite sur site, devis détaillé, finitions soignées.",
  alternates: {
    canonical: "https://www.erg-renovation.fr/renovation-vincennes",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Rénovation appartement Vincennes (94300) | ERG Rénovation",
    description: "Entreprise de rénovation à Vincennes (94300) : appartement, salle de bain, cuisine. Visite sur site, devis détaillé, finitions soignées.",
    url: "https://www.erg-renovation.fr/renovation-vincennes",
    type: "website",
    locale: "fr_FR",
    siteName: "ERG Rénovation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rénovation appartement Vincennes (94300) | ERG Rénovation",
    description: "Entreprise de rénovation à Vincennes (94300) : appartement, salle de bain, cuisine. Visite sur site, devis détaillé, finitions soignées.",
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
        "name": "Vincennes"
      },
      "serviceType": [
        "Rénovation d’appartement",
        "Rénovation de salle de bain",
        "Rénovation de cuisine",
        "Travaux tous corps d’état",
      ],
      "description": "ERG Rénovation, entreprise spécialisée en rénovation d'appartements à Vincennes (94300). Devis gratuit, garantie décennale."
    };
    return (
        <Script
            id="jsonld-renovation-vincennes"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}

const heroPoints = [
    { text: "Intervention rapide à Vincennes" },
    { text: "Visite sur site gratuite" },
    { text: "Devis détaillé et transparent" },
    { text: "Un interlocuteur unique" },
];

const vincennesSpecificities = [
    {
        icon: Building2,
        title: "Un parc immobilier de caractère",
        description: "Vincennes mêle immeubles anciens en brique ou pierre et résidences de standing. Une rénovation réussie doit respecter ce cachet tout en modernisant l'intérieur.",
    },
    {
        icon: Hammer,
        title: "Des attentes élevées en finitions",
        description: "Les propriétaires vincennois sont particulièrement attentifs à la qualité des matériaux, aux détails de finition et à la durabilité des travaux. L'exigence est notre norme.",
    },
    {
        icon: Home,
        title: "L'optimisation des espaces familiaux",
        description: "La rénovation est souvent l'occasion d'optimiser l'agencement pour une vie de famille plus confortable : cuisine ouverte, suite parentale, rangements sur mesure.",
    }
];

const renovationServices = [
    {
        icon: Home,
        title: "Rénovation complète d’appartement",
        description: "Idéale pour un achat avec travaux ou une redistribution des espaces. Nous gérons l'étude, la démolition, l'électricité, la plomberie, l'isolation et les finitions.",
        link: "/services/renovation-appartement"
    },
    {
        icon: Bath,
        title: "Rénovation de salle de bain",
        description: "Création de salles de bain modernes, fonctionnelles et élégantes. Nous maîtrisons l'optimisation des petites surfaces, l'étanchéité et la pose de matériaux nobles.",
        link: "/services/renovation-salle-de-bain"
    },
    {
        icon: UtensilsCrossed,
        title: "Rénovation de cuisine",
        description: "Cuisine ouverte ou fermée, nous optimisons les volumes, créons des rangements intelligents et coordonnons tous les corps de métier pour un résultat esthétique et durable.",
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
        title: "Une parfaite connaissance de Vincennes",
        description: "Nous intervenons régulièrement à Vincennes et connaissons ses typologies d'immeubles, les contraintes de copropriété et les attentes locales en matière de finition."
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
        question: "Quel est le prix d’une rénovation à Vincennes ?",
        answer: "Les prix varient selon la surface, l'état initial et le niveau de finition. À titre indicatif, comptez à partir de 750 €/m² pour une rénovation partielle et entre 1 100 et 1 700 €/m² pour une rénovation complète. Une visite sur site est indispensable pour un devis précis."
    },
    {
        question: "Quels sont les délais moyens pour rénover un appartement à Vincennes ?",
        answer: "Une salle de bain se rénove en 2 à 4 semaines, tandis qu'une rénovation complète prend de 6 à 12 semaines. Les délais sont définis contractuellement avant le début des travaux."
    },
    {
        question: "Faut-il un accord de la copropriété pour des travaux à Vincennes ?",
        answer: "Oui, pour certains travaux (murs porteurs, réseaux, ventilation, changement de fenêtres). Nous vous accompagnons dans la constitution du dossier administratif pour sécuriser vos démarches."
    },
    {
        question: "Peut-on rénover un appartement occupé ?",
        answer: "Oui, c'est possible. Nous adaptons l'organisation du chantier en planifiant les interventions par phases et en protégeant les zones non concernées pour limiter au maximum les nuisances."
    }
];

export default function RenovationVincennesPage() {
  const whyUsImage = PlaceHolderImages.find(p => p.id === 'vincennes-why-us');
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd />
      <SiteHeader />
      <main className="flex-grow">
        <Breadcrumbs />
        
        <section className="bg-secondary py-16 md:py-24">
          <div className="container text-center">
            <h1 className="font-headline text-4xl font-bold md:text-5xl lg:text-6xl">
              Rénovation d’appartement à Vincennes (94300) – ERG Rénovation
            </h1>
            <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
              ERG Rénovation accompagne les propriétaires, bailleurs et investisseurs pour leurs travaux de rénovation à Vincennes. De la rénovation complète d'appartement à la salle de bain ou la cuisine, nous assurons un suivi structuré et des finitions haut de gamme.
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
                    <Link href="/devis">Demander mon devis à Vincennes</Link>
                </Button>
            </div>
          </div>
        </section>

        <AnimatedSection>
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="text-center mx-auto max-w-2xl">
                    <h2 className="font-headline text-3xl font-bold">Rénover à Vincennes : un projet à forte valeur ajoutée</h2>
                    <p className="mt-4 text-muted-foreground">
                        Rénover un appartement à Vincennes, c'est investir dans un cadre de vie exceptionnel tout en valorisant durablement son patrimoine immobilier.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {vincennesSpecificities.map(item => (
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
                    <h2 className="font-headline text-3xl font-bold">Nos services de rénovation à Vincennes</h2>
                    <p className="mt-4 text-muted-foreground">
                        Nous proposons des solutions sur mesure, adaptées à chaque projet et à chaque typologie d'appartement vincennois.
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
                        <h2 className="font-headline text-3xl font-bold">Pourquoi choisir ERG Rénovation à Vincennes ?</h2>
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
                    <h2 className="font-headline text-3xl font-bold">FAQ – Rénovation d’appartement à Vincennes</h2>
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
