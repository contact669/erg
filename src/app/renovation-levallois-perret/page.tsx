
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

export const metadata: Metadata = {
  title: "Rénovation appartement Levallois-Perret (92300) | ERG Rénovation",
  description:
    "Entreprise de rénovation à Levallois-Perret (92300) : appartement, salle de bain, cuisine. Devis détaillé, finitions haut de gamme.",
  alternates: {
    canonical: "https://www.erg-renovation.fr/renovation-levallois-perret",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const heroPoints = [
    { text: "Intervention rapide à Levallois-Perret" },
    { text: "Visite sur site gratuite" },
    { text: "Devis détaillé et transparent" },
    { text: "Un interlocuteur unique" },
];

const levalloisSpecificities = [
    {
        icon: Building2,
        title: "Un parc immobilier dense et qualitatif",
        description: "À Levallois-Perret, les immeubles anciens avec cachet côtoient des résidences modernes. Chaque projet exige une approche technique précise et une exécution irréprochable.",
        imageUrl: "https://picsum.photos/seed/92301/800/600",
        imageAlt: "Rénovation d'un appartement à Levallois-Perret avec finitions haut de gamme",
        imageHint: "luxury apartment"
    },
    {
        icon: Hammer,
        title: "Des attentes très élevées en finition",
        description: "Les propriétaires levalloisiens sont particulièrement attentifs à la qualité des matériaux, aux détails de finition et à la durabilité. Notre exigence est notre norme.",
        imageUrl: "https://picsum.photos/seed/92302/800/600",
        imageAlt: "Chantier de rénovation intérieure à Levallois-Perret",
        imageHint: "renovation site"
    },
    {
        icon: Home,
        title: "Un investissement patrimonial majeur",
        description: "Rénover à Levallois-Perret, c'est investir pour valoriser durablement son patrimoine sur un marché immobilier très dynamique et recherché.",
        imageUrl: "https://picsum.photos/seed/92303/800/600",
        imageAlt: "Cuisine moderne rénovée à Levallois-Perret",
        imageHint: "modern kitchen"
    }
];

const renovationServices = [
    {
        icon: Home,
        title: "Rénovation complète d’appartement",
        description: "Idéale pour un achat avec travaux, une rénovation globale ou un projet locatif haut de gamme. Projet clé en main, piloté par un chef de projet dédié.",
        link: "/services/renovation-appartement"
    },
    {
        icon: Bath,
        title: "Rénovation de salle de bain",
        description: "Création de salles de bain modernes, élégantes et parfaitement fonctionnelles. Nous maîtrisons l'optimisation des petites surfaces et l'étanchéité.",
        link: "/services/renovation-salle-de-bain"
    },
    {
        icon: UtensilsCrossed,
        title: "Rénovation de cuisine",
        description: "Cuisine ouverte ou fermée, nous optimisons les circulations, créons des rangements sur mesure et coordonnons tous les corps de métier pour un résultat durable.",
        link: "/services/renovation-cuisine"
    },
    {
        icon: Sparkles,
        title: "Rénovation partielle & aménagement",
        description: "Pour un rafraîchissement, une redistribution de pièces ou la création de rangements intégrés. Idéal pour valoriser rapidement un bien immobilier.",
        link: "/services"
    }
];

const whyChooseUs = [
    {
        icon: ShieldCheck,
        title: "Une parfaite connaissance du secteur",
        description: "Nous intervenons régulièrement à Levallois-Perret et connaissons les copropriétés locales, les exigences des syndics et les attentes des propriétaires."
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
        q: "Quel est le prix d’une rénovation à Levallois-Perret ?",
        a: "Les prix varient selon la surface, l’état initial et le niveau de finition. À titre indicatif, comptez à partir de 850 €/m² pour une rénovation partielle et entre 1 300 et 1 900 €/m² pour une rénovation complète. Un devis précis nécessite une visite sur site."
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

export default function RenovationLevalloisPage() {
  const service = buildServiceJsonLd({
    businessName: "ERG Rénovation",
    siteUrl: SITE_URL,
    url: "/renovation-levallois-perret",
    city: "Levallois-Perret",
    postalCode: "92300",
    serviceType: "Rénovation intérieure",
  });

  const breadcrumb = buildBreadcrumbJsonLd(SITE_URL, [
    { name: "Accueil", url: "/" },
    { name: "Hauts-de-Seine (92)", url: "/renovation-hauts-de-seine" },
    { name: "Levallois-Perret", url: "/renovation-levallois-perret" },
  ]);

  const faq = buildFaqJsonLd(faqItems);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd id="jsonld-levallois" data={[service, breadcrumb, faq]} />
      <SiteHeader />
      <main className="flex-grow">
        <Breadcrumbs />
        
        <section className="bg-secondary py-16 md:py-24">
          <div className="container text-center">
            <h1 className="font-headline text-4xl font-bold md:text-5xl lg:text-6xl">
              Rénovation d’appartement à Levallois-Perret (92300) – ERG Rénovation
            </h1>
            <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
              ERG Rénovation accompagne les propriétaires, cadres et investisseurs pour leurs travaux de rénovation à Levallois-Perret. Appartement, salle de bain, cuisine ou rénovation complète, nous assurons un pilotage précis et des finitions haut de gamme.
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
                    <Link href="/devis">Mon devis à Levallois-Perret</Link>
                </Button>
            </div>
          </div>
        </section>

        <AnimatedSection>
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="text-center mx-auto max-w-2xl">
                    <h2 className="font-headline text-3xl font-bold">Rénover à Levallois-Perret : un projet exigeant</h2>
                    <p className="mt-4 text-muted-foreground">
                      La rénovation dans cette ville prisée demande une expertise pointue pour allier esthétique, fonctionnalité et valorisation patrimoniale.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {levalloisSpecificities.map(item => (
                        <Card key={item.title} className="overflow-hidden">
                            <div className="relative h-56 w-full">
                                <Image src={item.imageUrl} alt={item.imageAlt} fill className="object-cover" data-ai-hint={item.imageHint} />
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
                    <h2 className="font-headline text-3xl font-bold">Nos services de rénovation à Levallois-Perret</h2>
                    <p className="mt-4 text-muted-foreground">
                        Nous proposons des projets sur mesure, adaptés aux contraintes urbaines et aux exigences d'un public premium.
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
                        <Image src="https://picsum.photos/seed/92304/800/1000" alt="Chantier de rénovation d'un appartement à Levallois-Perret" fill className="object-cover" data-ai-hint="renovation site" />
                    </div>
                    <div>
                        <h2 className="font-headline text-3xl font-bold">Pourquoi choisir ERG Rénovation à Levallois-Perret ?</h2>
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
                    <h2 className="font-headline text-3xl font-bold">FAQ – Rénovation d’appartement à Levallois-Perret</h2>
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
