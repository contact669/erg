
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
  Building2,
  ArrowRight
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
import { InternalLinksHautsDeSeine } from "@/app/renovation-hauts-de-seine/_components/internal-links";

export const metadata: Metadata = {
  title: "Rénovation appartement Hauts-de-Seine (92) | ERG Rénovation",
  description:
    "Entreprise de rénovation dans les Hauts-de-Seine (92) : appartement, salle de bain, cuisine. Visite sur site, devis détaillé, finitions soignées.",
  alternates: {
    canonical: "https://www.erg-renovation.fr/renovation-hauts-de-seine",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Rénovation appartement Hauts-de-Seine (92) | ERG Rénovation",
    description: "Rénovation intérieure dans le 92 : appartement, salle de bain, cuisine. Visite sur site, devis détaillé et finitions soignées.",
    url: "https://www.erg-renovation.fr/renovation-hauts-de-seine",
    type: "website",
    locale: "fr_FR",
    siteName: "ERG Rénovation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rénovation appartement Hauts-de-Seine (92) | ERG Rénovation",
    description: "Entreprise de rénovation dans les Hauts-de-Seine : appartement, salle de bain, cuisine. Devis détaillé, suivi de chantier, finitions soignées.",
  },
};

const heroPoints = [
    { text: "Intervention rapide" },
    { text: "Visite sur site gratuite" },
    { text: "Devis détaillé et transparent" },
    { text: "Un interlocuteur unique" },
];

const hautsDeSeineSpecificities = [
    {
        icon: Building2,
        title: "Un marché immobilier exigeant",
        description: "À Boulogne-Billancourt, Courbevoie, ou Neuilly, la rénovation est un levier clé pour augmenter la valeur du bien, améliorer la performance énergétique et répondre aux attentes des acquéreurs.",
        imageUrl: "https://picsum.photos/seed/9201/800/600",
        imageAlt: "Rénovation d’un appartement dans les Hauts-de-Seine avec finitions soignées"
    },
    {
        icon: Hammer,
        title: "Des contraintes techniques spécifiques",
        description: "Réseaux parfois anciens, copropriétés structurées, normes acoustiques strictes et attentes élevées en matière de finition nécessitent méthode, expertise et coordination.",
        imageUrl: "https://picsum.photos/seed/9202/800/600",
        imageAlt: "Chantier de rénovation intérieure dans les Hauts-de-Seine (92)"
    },
    {
        icon: Home,
        title: "Un patrimoine immobilier varié",
        description: "Le 92 mêle immeubles anciens, résidences des années 60-80 et constructions récentes. Chaque projet est une occasion de moderniser tout en respectant le caractère du lieu.",
        imageUrl: "https://picsum.photos/seed/9203/800/600",
        imageAlt: "Rénovation de salle de bain moderne dans un appartement des Hauts-de-Seine"
    }
];

const renovationServices = [
    {
        icon: Home,
        title: "Rénovation complète d’appartement",
        description: "Idéal pour un achat avec travaux ou la remise à neuf d'un bien. Nous gérons étude, conception, démolition, électricité, plomberie, isolation et finitions. Un projet clé en main, piloté par un chef de projet dédié.",
        link: "/services/renovation-appartement"
    },
    {
        icon: Bath,
        title: "Rénovation de salle de bain",
        description: "Création d'espaces modernes et fonctionnels : douche à l’italienne, optimisation des petits espaces, étanchéité renforcée et ventilation performante. Nous adaptons chaque projet aux contraintes du logement.",
        link: "/services/renovation-salle-de-bain"
    },
    {
        icon: UtensilsCrossed,
        title: "Rénovation de cuisine",
        description: "Cuisine ouverte ou fermée, nous optimisons la circulation, créons des rangements intelligents et coordonnons tous les corps de métier pour un résultat esthétique, pratique et durable.",
        link: "/services/renovation-cuisine"
    },
    {
        icon: Sparkles,
        title: "Rénovation partielle & aménagement",
        description: "Pour un rafraîchissement, une redistribution de pièces, ou la création de rangements sur mesure. Idéal pour moderniser un bien sans engager une rénovation lourde.",
        link: "/services"
    }
];

const whyChooseUs = [
    {
        icon: ShieldCheck,
        title: "Une expertise locale confirmée",
        description: "Nous intervenons régulièrement dans le 92 et connaissons les copropriétés locales, les attentes des syndics et les contraintes techniques par commune."
    },
    {
        icon: Users,
        title: "Un interlocuteur unique",
        description: "Un chef de projet dédié assure la coordination des artisans, le respect des délais et le suivi qualité."
    },
    {
        icon: ClipboardList,
        title: "Une transparence totale",
        description: "Nos devis sont détaillés, nos plannings clairs et votre budget est maîtrisé du début à la fin."
    }
];

const faqItems = [
    {
        q: "Quel est le prix d’une rénovation dans le 92 ?",
        a: "Les prix varient selon la surface, l'état initial et le niveau de finition. À titre indicatif, comptez à partir de 700 €/m² pour une rénovation partielle et entre 1 100 et 1 700 €/m² pour une rénovation complète. Une visite sur site est indispensable pour un devis précis."
    },
    {
        q: "Quels sont les délais moyens ?",
        a: "Les délais sont définis contractuellement. Comptez 2 à 4 semaines pour une salle de bain et 6 à 12 semaines pour une rénovation complète, en fonction de la complexité du projet."
    },
    {
        q: "Faut-il l’accord de la copropriété ?",
        a: "Oui, un accord est souvent nécessaire pour les travaux touchant aux réseaux, aux murs porteurs ou à la ventilation. Nous vous accompagnons dans la constitution du dossier pour sécuriser les démarches."
    },
    {
        q: "Peut-on rénover un appartement occupé ?",
        a: "Oui, c'est possible. Nous adaptons l’organisation du chantier en planifiant les interventions par phases et en protégeant les zones non concernées pour limiter au maximum les nuisances."
    }
];

const SITE_URL = "https://www.erg-renovation.fr";

export default function RenovationHautsDeSeinePage() {
  const service = buildServiceJsonLd({
    businessName: "ERG Rénovation",
    siteUrl: SITE_URL,
    url: "/renovation-hauts-de-seine",
    department: "Hauts-de-Seine (92)",
    serviceType: "Rénovation intérieure",
  });

  const breadcrumb = buildBreadcrumbJsonLd(SITE_URL, [
    { name: "Accueil", url: "/" },
    { name: "Hauts-de-Seine (92)", url: "/renovation-hauts-de-seine" },
  ]);

  const faq = buildFaqJsonLd(faqItems);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd id="jsonld-hauts-de-seine" data={[service, breadcrumb, faq]} />
      <SiteHeader />
      <main className="flex-grow">
        <Breadcrumbs />
        
        <section className="bg-secondary py-16 md:py-24">
          <div className="container text-center">
            <h1 className="font-headline text-4xl font-bold md:text-5xl lg:text-6xl">
              Rénovation d’appartement dans les Hauts-de-Seine (92) – ERG Rénovation
            </h1>
            <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
              ERG Rénovation intervient dans tout le département des Hauts-de-Seine (92) pour vos projets de rénovation intérieure : appartement, salle de bain, cuisine ou rénovation complète. Nous accompagnons les propriétaires avec un suivi structuré, des artisans qualifiés et des finitions soignées.
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
                    <h2 className="font-headline text-3xl font-bold">Pourquoi rénover un appartement dans les Hauts-de-Seine ?</h2>
                    <p className="mt-4 text-muted-foreground">
                        Le 92 présente un patrimoine immobilier varié. Rénover, c’est chercher un équilibre entre modernisation, confort et valorisation immobilière sur un marché exigeant.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {hautsDeSeineSpecificities.map(item => (
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
                    <h2 className="font-headline text-3xl font-bold">Nos services de rénovation dans le 92</h2>
                    <p className="mt-4 text-muted-foreground">
                        Nous réalisons des projets sur mesure, adaptés à chaque commune et à chaque typologie de logement.
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
                        <Image src="https://picsum.photos/seed/9204/800/1000" alt="Exemple de projet de rénovation à Boulogne-Billancourt" fill className="object-cover"/>
                    </div>
                    <div>
                        <h2 className="font-headline text-3xl font-bold">Pourquoi choisir ERG Rénovation dans les Hauts-de-Seine ?</h2>
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
            <InternalLinksHautsDeSeine />
          </div>
        </AnimatedSection>

        <AnimatedSection>
        <section className="py-16 md:py-24">
            <div className="container max-w-3xl mx-auto">
                <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold">FAQ – Rénovation dans les Hauts-de-Seine (92)</h2>
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

    