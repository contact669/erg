
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

export const metadata: Metadata = {
  title: "Rénovation appartement Val-de-Marne (94) | ERG Rénovation",
  description:
    "Entreprise de rénovation dans le Val-de-Marne (94) : appartement, salle de bain, cuisine. Visite sur site, devis détaillé, finitions soignées.",
  alternates: {
    canonical: "https://www.erg-renovation.fr/renovation-val-de-marne",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Rénovation appartement Val-de-Marne (94) | ERG Rénovation",
    description: "Rénovation intérieure dans le 94 : appartement, salle de bain, cuisine. Visite sur site, devis détaillé et finitions soignées.",
    url: "https://www.erg-renovation.fr/renovation-val-de-marne",
    type: "website",
    locale: "fr_FR",
    siteName: "ERG Rénovation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rénovation appartement Val-de-Marne (94) | ERG Rénovation",
    description: "Entreprise de rénovation dans le Val-de-Marne (94) : appartement, salle de bain, cuisine. Devis détaillé, suivi de chantier, finitions soignées.",
  },
};

const heroPoints = [
    { text: "Intervention rapide dans le Val-de-Marne" },
    { text: "Visite sur site gratuite" },
    { text: "Devis détaillé et transparent" },
    { text: "Un interlocuteur unique" },
];

const valDeMarneSpecificities = [
    {
        icon: Building2,
        title: "Un marché immobilier dynamique",
        description: "À Vincennes, Ivry-sur-Seine ou Saint-Mandé, la demande est forte. Une rénovation bien réalisée permet de vendre plus vite et de louer plus facilement.",
        imageUrl: "https://picsum.photos/seed/9401/800/600",
        imageAlt: "Rénovation d’un appartement dans le Val-de-Marne avec finitions soignées",
        imageHint: "renovated apartment"
    },
    {
        icon: Hammer,
        title: "Des contraintes techniques à anticiper",
        description: "Réseaux parfois vieillissants, isolation insuffisante, règles de copropriété strictes et attentes élevées en matière de finition. L'anticipation est la clé.",
        imageUrl: "https://picsum.photos/seed/9402/800/600",
        imageAlt: "Chantier de rénovation intérieure à Vincennes dans le Val-de-Marne",
        imageHint: "renovation site"
    },
    {
        icon: Home,
        title: "Un parc immobilier varié",
        description: "Le 94 mêle immeubles anciens proches de Paris, résidences des années 60-90 et logements récents. Chaque projet est une opportunité de moderniser et valoriser.",
        imageUrl: "https://picsum.photos/seed/9403/800/600",
        imageAlt: "Rénovation de salle de bain moderne dans un appartement du Val-de-Marne",
        imageHint: "modern bathroom"
    }
];

const renovationServices = [
    {
        icon: Home,
        title: "Rénovation complète d’appartement",
        description: "Idéale pour un achat avec travaux, une rénovation globale ou un projet locatif. Nous gérons étude, démolition, électricité, plomberie, isolation et finitions.",
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
        title: "Une expertise locale confirmée",
        description: "Nous intervenons régulièrement dans le 94 et connaissons ses typologies de logements, les copropriétés locales et les contraintes administratives."
    },
    {
        icon: Users,
        title: "Un interlocuteur unique",
        description: "Un chef de projet dédié assure la coordination des artisans, le respect du planning et le contrôle qualité, pour votre tranquillité."
    },
    {
        icon: ClipboardList,
        title: "Une transparence totale",
        description: "Nos devis sont clairs et détaillés, nos délais contractualisés et votre budget est maîtrisé. Tous nos travaux sont couverts par la garantie décennale."
    }
];

const faqItems = [
    {
        q: "Quel est le prix d’une rénovation dans le 94 ?",
        a: "Les prix varient selon la surface, l'état du logement et le niveau de prestation. À titre indicatif, comptez à partir de 700 €/m² pour une rénovation partielle et entre 1 000 et 1 600 €/m² pour une rénovation complète. Une visite sur site est indispensable pour un devis précis."
    },
    {
        q: "Quels sont les délais moyens ?",
        a: "Une salle de bain se rénove en 2 à 4 semaines, tandis qu'une rénovation complète d'appartement prend de 6 à 12 semaines. Les délais sont contractualisés avant le début des travaux."
    },
    {
        q: "Faut-il l’accord de la copropriété ?",
        a: "Oui, pour certains travaux (réseaux, murs porteurs, ventilation). Nous vous accompagnons dans la constitution du dossier pour sécuriser les démarches."
    },
    {
        q: "Peut-on rénover un logement occupé ?",
        a: "Oui. Nous adaptons l’organisation du chantier en planifiant les interventions par phases pour limiter au maximum les nuisances."
    }
];

const cities94 = [
    "Vincennes", "Ivry-sur-Seine", "Créteil", "Vitry-sur-Seine", "Saint-Mandé",
    "Charenton-le-Pont", "Maisons-Alfort", "Alfortville", "Villejuif", "Le Kremlin-Bicêtre"
];

const SITE_URL = "https://www.erg-renovation.fr";

export default function RenovationValDeMarnePage() {
    const service = buildServiceJsonLd({
        businessName: "ERG Rénovation",
        siteUrl: SITE_URL,
        url: "/renovation-val-de-marne",
        department: "Val-de-Marne (94)",
        serviceType: "Rénovation intérieure",
    });

    const breadcrumb = buildBreadcrumbJsonLd(SITE_URL, [
        { name: "Accueil", url: "/" },
        { name: "Val-de-Marne (94)", url: "/renovation-val-de-marne" },
    ]);
    
    const faq = buildFaqJsonLd(faqItems);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd id="jsonld-renovation-val-de-marne" data={[service, breadcrumb, faq]} />
      <SiteHeader />
      <main className="flex-grow">
        <Breadcrumbs />
        
        <section className="bg-secondary py-16 md:py-24">
          <div className="container text-center">
            <h1 className="font-headline text-4xl font-bold md:text-5xl lg:text-6xl">
              Rénovation d’appartement dans le Val-de-Marne (94) – ERG Rénovation
            </h1>
            <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground">
              ERG Rénovation intervient dans tout le Val-de-Marne (94) pour vos projets de rénovation intérieure : appartement, salle de bain, cuisine ou rénovation complète. Nous accompagnons propriétaires et investisseurs avec une approche rigoureuse, un pilotage de chantier structuré et des finitions soignées.
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
                    <h2 className="font-headline text-3xl font-bold">Pourquoi rénover un appartement dans le Val-de-Marne ?</h2>
                    <p className="mt-4 text-muted-foreground">
                        Le 94, département stratégique aux portes de Paris, offre un cadre de vie recherché. La rénovation y est un investissement pertinent pour le confort et la valorisation patrimoniale.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {valDeMarneSpecificities.map(item => (
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
                    <h2 className="font-headline text-3xl font-bold">Nos services de rénovation dans le Val-de-Marne</h2>
                    <p className="mt-4 text-muted-foreground">
                        Nous réalisons des projets sur mesure, adaptés à chaque logement et à chaque commune du 94.
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
                        <Image src="https://picsum.photos/seed/9404/800/1000" alt="Rénovation de cuisine sur mesure dans le Val-de-Marne (94)" fill className="object-cover" data-ai-hint="custom kitchen"/>
                    </div>
                    <div>
                        <h2 className="font-headline text-3xl font-bold">Pourquoi choisir ERG Rénovation dans le Val-de-Marne ?</h2>
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
              <h2 className="font-headline text-3xl font-bold">Villes d’intervention dans le Val-de-Marne (94)</h2>
              <p className="mt-4 text-muted-foreground">Nous couvrons l'ensemble du département.</p>
            </div>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {cities94.map(city => {
                if (city === "Vincennes") {
                  return (
                    <Button key={city} asChild variant="outline" className="font-medium bg-background hover:bg-accent hover:text-accent-foreground">
                      <Link href="/renovation-vincennes">{city}</Link>
                    </Button>
                  )
                }
                return (
                  <div key={city} className="p-3 border rounded-lg bg-background text-center text-sm font-medium">
                    {city}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        </AnimatedSection>

        <AnimatedSection>
        <section className="py-16 md:py-24">
            <div className="container max-w-3xl mx-auto">
                <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold">FAQ – Rénovation dans le Val-de-Marne (94)</h2>
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
