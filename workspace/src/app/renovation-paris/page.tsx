
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
import JsonLd from "@/components/JsonLd";
import { buildServiceJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Rénovation appartement Paris (75) | ERG Rénovation",
  description:
    "Entreprise de rénovation à Paris (75). Appartement, salle de bain, cuisine. Visite sur site, devis détaillé et suivi complet. Tous arrondissements.",
  alternates: {
    canonical: "https://www.erg-renovation.fr/renovation-paris",
  },
};

const heroPoints = [
    { text: "Intervention rapide" },
    { text: "Visite sur site gratuite" },
    { text: "Devis détaillé et transparent" },
    { text: "Un interlocuteur unique" },
];

const parisConstraints = [
    {
        icon: Building2,
        title: "Un parc immobilier ancien",
        description: "Immeubles haussmanniens, planchers bois, murs porteurs épais, réseaux parfois vétustes. Chaque projet nécessite une analyse technique précise avant travaux.",
        imageUrl: "/images/realisations/renovation-appartement-65m2-apres.webp",
        imageAlt: "Rénovation d’un appartement haussmannien à Paris avec finitions soignées"
    },
    {
        icon: Home,
        title: "Des contraintes de copropriété",
        description: "Autorisation pour la modification de cloisons, l'intervention sur les réseaux, l'évacuation, la ventilation, et la gestion des nuisances sonores. Nous vous accompagnons dans ces démarches pour sécuriser votre projet.",
        imageUrl: "/images/realisations-erg.webp",
        imageAlt: "Chantier de rénovation intérieure d’un appartement à Paris"
    },
    {
        icon: Sparkles,
        title: "Des surfaces à optimiser",
        description: "À Paris, chaque mètre carré compte. La rénovation doit conjuguer fonctionnalité, esthétique, optimisation des volumes et durabilité pour valoriser pleinement votre bien.",
        imageUrl: "/images/realisations/renovation-cuisine-apres.webp",
        imageAlt: "Rénovation de cuisine sur mesure dans un appartement à Paris"
    }
];

const renovationServices = [
    {
        icon: Building2,
        title: "Rénovation complète d’appartement",
        description: "Idéal pour un achat avec travaux, votre résidence principale ou un investissement locatif. Nos prestations incluent démolition, redistribution des espaces, électricité, plomberie, isolation et finitions haut de gamme. Un projet clé en main, de la conception à la livraison.",
        link: "/services/renovation-appartement"
    },
    {
        icon: Bath,
        title: "Rénovation de salle de bain à Paris",
        description: "Spécialistes des petites surfaces parisiennes, nous concevons des salles de bain fonctionnelles, durables et esthétiques : douche à l’italienne, meubles sur mesure, étanchéité renforcée, ventilation performante.",
        link: "/services/renovation-salle-de-bain"
    },
    {
        icon: UtensilsCrossed,
        title: "Rénovation de cuisine",
        description: "Cuisine ouverte, semi-ouverte ou fermée. Nous optimisons les circulations, créons des rangements intelligents et coordonnons menuiserie, plomberie et électricité pour un résultat cohérent et durable.",
        link: "/services/renovation-cuisine"
    },
    {
        icon: Hammer,
        title: "Rénovation partielle & aménagement intérieur",
        description: "Pour un simple rafraîchissement, une redistribution de pièces, la création de rangements sur mesure ou l'optimisation de petits espaces, nous mettons notre expertise à votre service.",
        link: "/services"
    }
]

const whyChooseUs = [
    {
        icon: ShieldCheck,
        title: "Une expertise locale réelle",
        description: "Nous intervenons quotidiennement à Paris, dans tous les arrondissements. Nous connaissons les immeubles anciens, les contraintes des syndics et les attentes des clients parisiens."
    },
    {
        icon: Users,
        title: "Un interlocuteur unique",
        description: "Un chef de projet dédié pilote l’ensemble du chantier : coordination des corps de métier, respect des délais et contrôle qualité."
    },
    {
        icon: ClipboardList,
        title: "Une transparence totale",
        description: "Devis détaillé, planning clair, budget maîtrisé."
    }
]

const faqItems = [
    {
        q: "Quel est le prix d’une rénovation à Paris ?",
        a: "Les prix varient selon la surface, l'état initial et le niveau de finition. À titre indicatif, comptez à partir de 600 €/m² pour une rénovation partielle et entre 1 000 et 1 600 €/m² pour une rénovation complète. Une visite sur site est indispensable pour un devis précis."
    },
    {
        q: "Quels sont les délais moyens ?",
        a: "Les délais sont définis contractuellement. Comptez 2 à 3 semaines pour une salle de bain et 6 à 10 semaines pour une rénovation complète, en fonction de la complexité du projet."
    },
    {
        q: "Faut-il l’accord de la copropriété ?",
        a: "Oui, l'accord est nécessaire pour certains travaux comme la modification de murs porteurs, l'intervention sur les réseaux collectifs ou la ventilation. Nous vous aidons à préparer un dossier conforme pour éviter tout blocage."
    },
    {
        q: "Peut-on rénover un appartement occupé ?",
        a: "Oui, c'est possible. Nous adaptons l'organisation du chantier en planifiant les interventions par phases et en protégeant les zones non concernées pour limiter les nuisances."
    }
]

const SITE_URL = "https://www.erg-renovation.fr";

export default function RenovationParisPage() {
  const service = buildServiceJsonLd({
    businessName: "ERG Rénovation",
    siteUrl: SITE_URL,
    url: "/renovation-paris",
    city: "Paris",
    postalCode: "75000",
    serviceType: "Rénovation intérieure",
  });

  const breadcrumb = buildBreadcrumbJsonLd(SITE_URL, [
    { name: "Accueil", url: "/" },
    { name: "Paris (75)", url: "/renovation-paris" },
  ]);

  const faq = buildFaqJsonLd(faqItems);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd id="jsonld-renovation-paris" data={[service, breadcrumb, faq]} />
      <SiteHeader />
      <main className="flex-grow">
        <Breadcrumbs />
        {/* Hero */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container text-center">
            <h1 className="font-headline text-4xl font-bold md:text-5xl lg:text-6xl">
              Rénovation d’appartement à Paris (75) – ERG Rénovation
            </h1>
            <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
              ERG Rénovation accompagne les particuliers, propriétaires occupants et investisseurs pour leurs travaux de rénovation à Paris, tous arrondissements confondus. De la rénovation complète d’appartement à la salle de bain ou à la cuisine, nous assurons un suivi structuré, des finitions soignées et une maîtrise totale du chantier.
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

        {/* Contraintes parisiennes */}
        <AnimatedSection>
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="text-center mx-auto max-w-2xl">
                    <h2 className="font-headline text-3xl font-bold">Rénover un appartement à Paris : un projet exigeant</h2>
                    <p className="mt-4 text-muted-foreground">
                        Rénover à Paris ne s’improvise pas. Le bâti ancien, la densité urbaine et les règles de copropriété imposent une approche rigoureuse et expérimentée.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {parisConstraints.map(item => (
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
        
        {/* Services */}
        <AnimatedSection>
        <section className="bg-secondary py-16 md:py-24">
            <div className="container">
                <div className="text-center mx-auto max-w-2xl">
                    <h2 className="font-headline text-3xl font-bold">Nos services de rénovation à Paris</h2>
                    <p className="mt-4 text-muted-foreground">
                        Nous réalisons des projets de rénovation intérieure sur mesure, adaptés à chaque typologie d’appartement parisien.
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

        {/* Why Choose Us */}
        <AnimatedSection>
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-80 md:h-[500px] w-full rounded-xl overflow-hidden">
                        <Image src="/images/equipe-erg-renovation.webp" alt="Rénovation de salle de bain moderne dans un appartement parisien" fill className="object-cover"/>
                    </div>
                    <div>
                        <h2 className="font-headline text-3xl font-bold">Pourquoi choisir ERG Rénovation pour vos travaux à Paris ?</h2>
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
        
        {/* Arrondissements */}
        <AnimatedSection>
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <div className="text-center mx-auto max-w-2xl">
              <h2 className="font-headline text-3xl font-bold">Rénovation à Paris : tous les arrondissements (75)</h2>
              <p className="mt-4 text-muted-foreground">Nous intervenons dans l’ensemble des arrondissements parisiens.</p>
            </div>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                <div key={num} className="p-3 border rounded-lg bg-background text-center text-sm font-medium">
                  Paris {num}{num === 1 ? 'er' : 'e'}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8">Des pages dédiées par arrondissement seront progressivement mises en ligne pour un accompagnement encore plus localisé.</p>
          </div>
        </section>
        </AnimatedSection>

        {/* FAQ */}
        <AnimatedSection>
        <section className="py-16 md:py-24">
            <div className="container max-w-3xl mx-auto">
                <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold">FAQ – Rénovation d’appartement à Paris</h2>
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
