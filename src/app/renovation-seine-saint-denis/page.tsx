
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
  title: "Rénovation appartement Seine-Saint-Denis (93) | ERG Rénovation",
  description:
    "Entreprise de rénovation en Seine-Saint-Denis (93) : appartement, salle de bain, cuisine. Devis détaillé, visite sur site et finitions soignées.",
  alternates: {
    canonical: "https://www.erg-renovation.fr/renovation-seine-saint-denis",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Rénovation appartement Seine-Saint-Denis (93) | ERG Rénovation",
    description: "Rénovation intérieure dans le 93 : appartement, salle de bain, cuisine. Devis détaillé, visite sur site et finitions soignées.",
    url: "https://www.erg-renovation.fr/renovation-seine-saint-denis",
    type: "website",
    locale: "fr_FR",
    siteName: "ERG Rénovation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rénovation appartement Seine-Saint-Denis (93) | ERG Rénovation",
    description: "Entreprise de rénovation en Seine-Saint-Denis (93) : appartement, salle de bain, cuisine. Devis détaillé, suivi de chantier, finitions soignées.",
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
        "@type": "AdministrativeArea",
        "name": "Seine-Saint-Denis"
      },
      "serviceType": [
        "Rénovation d’appartement",
        "Rénovation de salle de bain",
        "Rénovation de cuisine",
        "Travaux tous corps d’état",
      ],
      "description": "ERG Rénovation, entreprise spécialisée en rénovation intérieure d'appartements, cuisines et salles de bain en Seine-Saint-Denis (93)."
    };
    return (
        <Script
            id="jsonld-renovation-seine-saint-denis"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}

const heroPoints = [
    { text: "Intervention rapide dans le 93" },
    { text: "Visite sur site gratuite" },
    { text: "Devis détaillé et transparent" },
    { text: "Un interlocuteur unique" },
];

const seineSaintDenisSpecificities = [
    {
        icon: Building2,
        title: "Un parc immobilier hétérogène",
        description: "À Montreuil, Pantin ou Saint-Denis, les logements anciens côtoient des constructions plus récentes, présentant des défis uniques : réseaux à moderniser, isolation à repenser et distributions à optimiser.",
        imageUrl: "https://picsum.photos/seed/9301/800/600",
        imageAlt: "Rénovation d’un appartement en Seine-Saint-Denis avec finitions soignées"
    },
    {
        icon: Hammer,
        title: "Un fort enjeu de valorisation",
        description: "Dans ce département dynamique, une rénovation de qualité est un investissement stratégique pour améliorer l'attractivité locative, faciliter une revente ou simplement améliorer son confort de vie.",
        imageUrl: "https://picsum.photos/seed/9302/800/600",
        imageAlt: "Chantier de rénovation intérieure à Montreuil en Seine-Saint-Denis"
    },
    {
        icon: Home,
        title: "Le potentiel des volumes",
        description: "Anciens ateliers ou appartements familiaux, le 93 offre de belles opportunités de transformation. Une rénovation bien pensée permet de créer des espaces de vie modernes et fonctionnels.",
        imageUrl: "https://picsum.photos/seed/9303/800/600",
        imageAlt: "Rénovation de cuisine sur mesure en Seine-Saint-Denis"
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
        description: "Cuisine ouverte ou fermée, nous optimisons la circulation, créons des rangements intelligents et coordonnons tous les corps de métier pour un résultat esthétique et durable.",
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
        title: "Une connaissance terrain du 93",
        description: "Nous intervenons régulièrement dans le département et connaissons ses spécificités techniques, les copropriétés et les attentes des propriétaires."
    },
    {
        icon: Users,
        title: "Un interlocuteur unique",
        description: "Un chef de projet dédié assure la coordination des artisans, le respect des délais et le contrôle qualité, pour votre tranquillité."
    },
    {
        icon: ClipboardList,
        title: "Une transparence totale",
        description: "Nos devis sont détaillés, nos plannings clairs et votre budget est maîtrisé du début à la fin. Tous nos travaux sont couverts par la garantie décennale."
    }
];

const faqItems = [
    {
        question: "Quel est le prix d’une rénovation dans le 93 ?",
        answer: "Les prix varient selon la surface, l'état du logement et le niveau de prestation. À titre indicatif, comptez à partir de 650 €/m² pour une rénovation partielle et entre 1 000 et 1 500 €/m² pour une rénovation complète. Un devis précis nécessite une visite sur site."
    },
    {
        question: "Quels sont les délais moyens ?",
        answer: "Une salle de bain se rénove en 2 à 4 semaines, tandis qu'une rénovation complète d'appartement prend de 6 à 12 semaines. Les délais sont contractualisés avant le début des travaux."
    },
    {
        question: "Faut-il l’accord de la copropriété ?",
        answer: "Oui, un accord est souvent nécessaire pour les travaux touchant aux réseaux, aux murs porteurs ou à la ventilation. Nous vous accompagnons dans ces démarches pour sécuriser votre projet."
    },
    {
        question: "Peut-on rénover un logement occupé ?",
        answer: "Oui, c'est possible. Dans ce cas, nous adaptons l'organisation du chantier en planifiant les interventions par phases pour limiter au maximum les nuisances."
    }
];

const cities93 = [
    "Montreuil", "Saint-Denis", "Pantin", "Aubervilliers", "Noisy-le-Sec",
    "Bobigny", "Drancy", "Bagnolet", "Les Lilas", "Romainville"
];


export default function RenovationSeineSaintDenisPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd />
      <SiteHeader />
      <main className="flex-grow">
        <Breadcrumbs />
        
        <section className="bg-secondary py-16 md:py-24">
          <div className="container text-center">
            <h1 className="font-headline text-4xl font-bold md:text-5xl lg:text-6xl">
              Rénovation d’appartement en Seine-Saint-Denis (93) – ERG Rénovation
            </h1>
            <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
              ERG Rénovation intervient dans toute la Seine-Saint-Denis (93) pour vos projets de rénovation intérieure : appartement, salle de bain, cuisine et rénovation complète. Nous accompagnons propriétaires et investisseurs avec une approche structurée, des artisans qualifiés et une exigence sur la qualité des finitions.
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
                    <Link href="/devis">Obtenir mon devis gratuit</Link>
                </Button>
            </div>
          </div>
        </section>

        <AnimatedSection>
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="text-center mx-auto max-w-2xl">
                    <h2 className="font-headline text-3xl font-bold">Rénover en Seine-Saint-Denis : un enjeu stratégique</h2>
                    <p className="mt-4 text-muted-foreground">
                        Le 93, département en pleine mutation, offre un potentiel de valorisation immobilière unique. Une rénovation bien menée y est un investissement particulièrement rentable.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {seineSaintDenisSpecificities.map(item => (
                        <Card key={item.title} className="overflow-hidden">
                            <div className="relative h-56 w-full">
                                <Image src={item.imageUrl} alt={item.imageAlt} fill className="object-cover"/>
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
                    <h2 className="font-headline text-3xl font-bold">Nos services de rénovation en Seine-Saint-Denis</h2>
                    <p className="mt-4 text-muted-foreground">
                        Nous réalisons des rénovations sur mesure, adaptées aux besoins de chaque logement et de chaque commune du 93.
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
                        <Image src="https://picsum.photos/seed/9304/800/1000" alt="Équipe ERG Rénovation en réunion de chantier" fill className="object-cover"/>
                    </div>
                    <div>
                        <h2 className="font-headline text-3xl font-bold">Pourquoi choisir ERG Rénovation en Seine-Saint-Denis ?</h2>
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
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <div className="text-center mx-auto max-w-2xl">
              <h2 className="font-headline text-3xl font-bold">Villes d’intervention en Seine-Saint-Denis (93)</h2>
              <p className="mt-4 text-muted-foreground">Nous couvrons l'ensemble du département.</p>
            </div>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {cities93.map(city => (
                <div key={city} className="p-3 border rounded-lg bg-background text-center text-sm font-medium">
                  {city}
                </div>
              ))}
            </div>
          </div>
        </section>
        </AnimatedSection>

        <AnimatedSection>
        <section className="py-16 md:py-24">
            <div className="container max-w-3xl mx-auto">
                <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold">FAQ – Rénovation en Seine-Saint-Denis (93)</h2>
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
