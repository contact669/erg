import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  CheckCircle,
  Building2,
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
  title: "Rénovation appartement Hauts-de-Seine (92) | ERG Rénovation",
  description:
    "Entreprise de rénovation dans les Hauts-de-Seine (92). Appartement, salle de bain, cuisine. Visite sur site, devis détaillé et suivi complet. Boulogne, Nanterre, Courbevoie...",
  alternates: {
    canonical: "https://www.erg-renovation.fr/renovation-appartement/hauts-de-seine-92",
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
        "name": "Hauts-de-Seine"
      },
      "serviceType": [
        "Rénovation d’appartement",
        "Rénovation de salle de bain",
        "Rénovation cuisine",
        "Travaux tous corps d’état",
      ],
      "description": "ERG Rénovation, entreprise spécialisée en rénovation intérieure d'appartements, cuisines et salles de bain dans les Hauts-de-Seine (92). Devis gratuit, garantie décennale."
    };
    return (
        <Script
            id="jsonld-renovation-92"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}

const heroPoints = [
    { text: "Intervention rapide" },
    { text: "Visite sur site gratuite" },
    { text: "Devis détaillé et transparent" },
    { text: "Un interlocuteur unique" },
];

const whyChooseUs = [
    {
        icon: ShieldCheck,
        title: "Une expertise locale confirmée",
        description: "Nous intervenons régulièrement dans le 92 et connaissons les copropriétés locales, les attentes des syndics, et les contraintes techniques par commune."
    },
    {
        icon: Users,
        title: "Un interlocuteur unique",
        description: "Un chef de projet dédié assure la coordination des artisans, le respect des délais, et le suivi qualité."
    },
    {
        icon: ClipboardList,
        title: "Une transparence totale",
        description: "Devis détaillé, planning clair, budget maîtrisé. Tous nos travaux sont couverts par notre assurance décennale et notre responsabilité civile professionnelle."
    }
]

const faqItems = [
    {
        question: "Quel est le prix d’une rénovation dans le 92 ?",
        answer: "Les prix varient selon la surface, l'état initial, et le niveau de finition. À titre indicatif, comptez à partir de 700 €/m² pour une rénovation partielle et entre 1 100 et 1 700 €/m² pour une rénovation complète. Un devis précis nécessite une visite sur site."
    },
    {
        question: "Quels sont les délais moyens ?",
        answer: "Comptez 2 à 4 semaines pour une salle de bain et 6 à 12 semaines pour une rénovation complète, en fonction de la complexité du projet. Les délais sont définis contractuellement."
    },
    {
        question: "Faut-il l’accord de la copropriété ?",
        answer: "Oui, un accord est souvent nécessaire pour les travaux touchant aux réseaux, aux murs porteurs ou à la ventilation. Nous vous accompagnons dans la constitution du dossier pour sécuriser votre projet."
    },
    {
        question: "Peut-on rénover un appartement occupé ?",
        answer: "Oui, c'est possible. Nous adaptons l’organisation du chantier en planifiant les interventions par phases et en protégeant les zones non concernées pour limiter les nuisances."
    }
]

export default function RenovationHautsDeSeinePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd />
      <SiteHeader />
      <main className="flex-grow">
        <Breadcrumbs />
        {/* Hero */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container text-center">
            <h1 className="font-headline text-4xl font-bold md:text-5xl lg:text-6xl">
              Rénovation d’appartement dans les Hauts-de-Seine (92)
            </h1>
            <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
              ERG Rénovation intervient dans tout le département des Hauts-de-Seine (92) pour vos projets de rénovation intérieure. Nous accompagnons propriétaires et investisseurs avec un suivi structuré et des finitions soignées.
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
                    <Link href="/devis">Obtenir mon devis dans le 92</Link>
                </Button>
            </div>
          </div>
        </section>

        {/* Why renovate in 92 */}
        <AnimatedSection>
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="text-center mx-auto max-w-3xl">
                    <h2 className="font-headline text-3xl font-bold">Pourquoi rénover un appartement dans les Hauts-de-Seine ?</h2>
                    <p className="mt-4 text-muted-foreground">
                        Le 92 présente un patrimoine immobilier varié, des immeubles anciens proches de Paris aux résidences modernes à forte valeur patrimoniale. Rénover, c’est moderniser, améliorer le confort et valoriser votre bien sur un marché exigeant.
                    </p>
                </div>
                <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    <Card>
                        <CardHeader>
                            <CardTitle>Un marché immobilier exigeant</CardTitle>
                            <CardDescription>À Boulogne, Courbevoie ou Neuilly, la rénovation augmente la valeur du bien, améliore la performance énergétique et séduit acquéreurs ou locataires.</CardDescription>
                        </CardHeader>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Des contraintes techniques spécifiques</CardTitle>
                            <CardDescription>Réseaux anciens, copropriétés structurées, normes acoustiques strictes... une rénovation réussie dans le 92 nécessite méthode et expertise.</CardDescription>
                        </CardHeader>
                    </Card>
                     <Card className="lg:col-span-1 md:col-span-2">
                        <CardHeader>
                            <CardTitle>Un besoin de confort et de modernité</CardTitle>
                            <CardDescription>Optimiser les espaces, créer des cuisines ouvertes, moderniser les salles de bain : nous adaptons les logements aux modes de vie actuels.</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </section>
        </AnimatedSection>
        
        {/* Services */}
        <AnimatedSection>
        <section className="bg-secondary py-16 md:py-24">
            <div className="container">
                <div className="text-center mx-auto max-w-2xl">
                    <h2 className="font-headline text-3xl font-bold">Nos services de rénovation dans le 92</h2>
                    <p className="mt-4 text-muted-foreground">
                        Nous réalisons des projets sur mesure, adaptés à chaque commune et à chaque typologie de logement.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div className="space-y-4">
                        <h3 className="font-headline text-xl font-bold flex items-center gap-3"><Home className="h-6 w-6 text-accent" />Rénovation complète d’appartement</h3>
                        <p className="text-muted-foreground">Idéal pour un achat avec travaux, une résidence principale ou un investissement locatif. Nos prestations incluent démolition, redistribution, électricité, plomberie, isolation et finitions. Un projet clé en main, piloté par un chef de projet dédié.</p>
                    </div>
                     <div className="space-y-4">
                        <h3 className="font-headline text-xl font-bold flex items-center gap-3"><Bath className="h-6 w-6 text-accent" />Rénovation de salle de bain</h3>
                        <p className="text-muted-foreground">Nous concevons des salles de bain modernes, fonctionnelles et durables : douche à l’italienne, optimisation des petits espaces, étanchéité renforcée, ventilation performante.</p>
                    </div>
                     <div className="space-y-4">
                        <h3 className="font-headline text-xl font-bold flex items-center gap-3"><UtensilsCrossed className="h-6 w-6 text-accent" />Rénovation de cuisine</h3>
                        <p className="text-muted-foreground">Cuisine ouverte ou fermée, nous optimisons les circulations, créons des rangements intelligents et coordonnons tous les corps d'état pour un résultat esthétique et durable.</p>
                    </div>
                     <div className="space-y-4">
                        <h3 className="font-headline text-xl font-bold flex items-center gap-3"><Hammer className="h-6 w-6 text-accent" />Rénovation partielle & aménagement</h3>
                        <p className="text-muted-foreground">Pour un rafraîchissement, une redistribution de pièces ou la création de rangements sur mesure, afin de moderniser un bien sans rénovation lourde.</p>
                    </div>
                </div>
            </div>
        </section>
        </AnimatedSection>

        {/* Why Choose Us */}
        <AnimatedSection>
        <section className="py-16 md:py-24">
            <div className="container">
                 <div className="text-center mx-auto max-w-2xl mb-12">
                    <h2 className="font-headline text-3xl font-bold">Pourquoi choisir ERG Rénovation dans les Hauts-de-Seine ?</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {whyChooseUs.map(item => (
                        <div key={item.title}>
                             <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                                <item.icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-muted-foreground mt-1">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        </AnimatedSection>
        
        {/* Villes */}
        <AnimatedSection>
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <div className="text-center mx-auto max-w-2xl">
              <h2 className="font-headline text-3xl font-bold">Intervention dans tout le 92</h2>
              <p className="mt-4 text-muted-foreground">Nous intervenons dans l’ensemble du département, notamment :</p>
            </div>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {['Boulogne-Billancourt', 'Nanterre', 'Courbevoie', 'Colombes', 'Asnières-sur-Seine', 'Levallois-Perret', 'Neuilly-sur-Seine', 'Suresnes', 'Rueil-Malmaison', 'Clamart'].map(city => (
                <div key={city} className="p-3 border rounded-lg bg-background text-center text-sm font-medium">
                  {city}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8">Des pages dédiées par ville seront progressivement mises en ligne pour un accompagnement encore plus localisé.</p>
          </div>
        </section>
        </AnimatedSection>

        {/* FAQ */}
        <AnimatedSection>
        <section className="py-16 md:py-24">
            <div className="container max-w-3xl mx-auto">
                <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold">FAQ – Rénovation dans les Hauts-de-Seine (92)</h2>
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
