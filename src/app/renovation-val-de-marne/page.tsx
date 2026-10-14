
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
  MapPin,
  Clock3,
} from "lucide-react";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CtaBanner from "@/app/_components/cta-banner";
import AnimatedSection from "@/components/animated-section";
import Breadcrumbs from "@/components/breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildServiceJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo/jsonld";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const PAGE_URL = "https://erg-renovation.fr/renovation-val-de-marne";
const SITE_URL = "https://erg-renovation.fr";
const BUSINESS_NAME = "ERG Rénovation";
const PHONE_DISPLAY = "06 99 96 13 75";
const PHONE_E164 = "+33699961375";

export const metadata: Metadata = {
  title: "Rénovation appartement Val-de-Marne (94)",
  description:
    "Entreprise de rénovation dans le Val-de-Marne (94) : appartement, salle de bain, cuisine. Visite sur site, devis détaillé, finitions soignées.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Rénovation appartement Val-de-Marne (94)",
    description:
      "Rénovation intérieure dans le 94 : appartement, salle de bain, cuisine. Visite sur site, devis détaillé et finitions soignées.",
    url: PAGE_URL,
    type: "website",
    locale: "fr_FR",
    siteName: BUSINESS_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "Rénovation appartement Val-de-Marne (94)",
    description:
      "Entreprise de rénovation dans le Val-de-Marne (94) : appartement, salle de bain, cuisine. Devis détaillé, suivi de chantier, finitions soignées.",
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
    description:
      "À Vincennes, Ivry-sur-Seine ou Saint-Mandé, la demande est forte. Une rénovation bien réalisée permet de vendre plus vite et de louer plus facilement.",
  },
  {
    icon: Hammer,
    title: "Des contraintes techniques à anticiper",
    description:
      "Réseaux parfois vieillissants, isolation insuffisante, règles de copropriété strictes et attentes élevées en matière de finition. L'anticipation est la clé.",
  },
  {
    icon: Home,
    title: "Un parc immobilier varié",
    description:
      "Le 94 mêle immeubles anciens proches de Paris, résidences des années 60-90 et logements récents. Chaque projet est une opportunité de moderniser et valoriser.",
  },
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
        description: "Pour un rafraîchissement, une redistribution de pièces ou la création de rangements sur mesure. Idéal pour valoriser un bien sans chantier lourd.",
        link: "/services"
    }
];

const whyChooseUs = [
    {
        icon: ShieldCheck,
        title: "Une expertise locale confirmée",
        description: "Interventions régulières dans le 94 : typologies de logements, copropriétés, contraintes et bonnes pratiques.",
    },
    {
        icon: Users,
        title: "Un interlocuteur unique",
        description: "Un chef de projet dédié coordonne les artisans, sécurise le planning et contrôle la qualité à chaque étape.",
    },
    {
        icon: ClipboardList,
        title: "Une transparence totale",
        description: "Devis clairs et détaillés, délais contractualisés, budget maîtrisé. Électricité, plomberie et peinture couvertes par notre assurance décennale.",
    }
];

const faqItems = [
  {
    q: "Quel est le prix d’une rénovation dans le 94 ?",
    a:
      "Le budget dépend des supports à préparer, des réseaux à reprendre, des équipements et des finitions. La visite permet de définir les travaux inclus et les options avant de confirmer un devis détaillé. La surface seule ne suffit pas à chiffrer le projet.",
  },
  {
    q: "Quels sont les délais moyens ?",
    a:
      "Une salle de bain se rénove généralement en 2 à 4 semaines. Une rénovation complète d’appartement prend souvent 6 à 12 semaines selon l’ampleur des travaux. Les délais sont définis et contractualisés avant le démarrage.",
  },
  {
    q: "Faut-il l’accord de la copropriété ?",
    a:
      "Oui, pour certains travaux (réseaux, ventilation, modification structurelle, murs porteurs). Nous vous aidons à préparer un dossier clair pour sécuriser l’autorisation.",
  },
  {
    q: "Peut-on rénover un logement occupé ?",
    a:
      "Oui. Nous planifions le chantier par phases pour limiter les nuisances, sécuriser les zones et maintenir un maximum de confort au quotidien.",
  },
];

const cities94 = [
  { name: "Vincennes", href: "/renovation-vincennes" },
  { name: "Saint-Mandé", href: "/renovation-saint-mande" },
  { name: "Nogent-sur-Marne", href: "/renovation-nogent-sur-marne" },
  { name: "Le Perreux-sur-Marne", href: "/renovation-le-perreux-sur-marne" },
  { name: "Saint-Maur-des-Fossés", href: "/renovation-saint-maur-des-fosses" },
  { name: "Créteil", href: "/renovation-creteil" },
  { name: "Maisons-Alfort", href: "/renovation-maisons-alfort" },
  { name: "Ivry-sur-Seine", href: "/renovation-ivry-sur-seine" },
];

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
  
  const faq = buildFaqJsonLd(faqItems.map(item => ({ q: item.q, a: item.a })));
  const whyUsImage = PlaceHolderImages.find(p => p.id === 'val-de-marne-why-us');
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd id="jsonld-renovation-val-de-marne" data={[service, breadcrumb, faq]} />
      <SiteHeader />

      <main className="flex-grow">
        <Breadcrumbs />

        <section className="bg-secondary py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm font-medium text-foreground/80">
                <MapPin className="h-4 w-4" />
                Val-de-Marne (94) • Île-de-France
              </p>

              <h1 className="mt-4 font-headline text-4xl font-bold md:text-5xl lg:text-6xl tracking-tight">
                Rénovation d’appartement dans le Val-de-Marne (94)
              </h1>

              <p className="mt-5 mx-auto max-w-3xl text-lg text-muted-foreground">
                Appartement, salle de bain, cuisine ou rénovation complète : ERG Rénovation accompagne
                propriétaires et investisseurs avec une méthode rigoureuse, un suivi de chantier structuré
                et des finitions soignées.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
                {heroPoints.map((point) => (
                  <span key={point.text} className="flex items-center gap-2 font-medium">
                    <CheckCircle className="h-5 w-5 text-slate-600" />
                    {point.text}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/devis">Obtenir mon devis gratuit</Link>
                </Button>

                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <a href={`tel:${PHONE_E164}`} aria-label={`Appeler ${BUSINESS_NAME}`}>
                    <span className="inline-flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Appeler {PHONE_DISPLAY}
                    </span>
                  </a>
                </Button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Clock3 className="h-4 w-4" />
                <span>Réponse rapide • Visite sur site offerte • Devis détaillé</span>
              </div>
            </div>
          </div>
        </section>

        <AnimatedSection>
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="text-center mx-auto max-w-2xl">
                <h2 className="font-headline text-3xl font-bold">
                  Pourquoi rénover un appartement dans le Val-de-Marne ?
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Département stratégique aux portes de Paris, la rénovation y améliore le confort
                  et valorise durablement votre patrimoine.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {valDeMarneSpecificities.map((item) => (
                    <Card key={item.title} className="overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <item.icon className="h-6 w-6 text-slate-600" />
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
                <h2 className="font-headline text-3xl font-bold">
                  Nos services de rénovation dans le Val-de-Marne
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Des prestations sur mesure, adaptées à chaque logement et à chaque commune du 94.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {renovationServices.map((service) => (
                  <Card key={service.title} className="flex flex-col">
                    <CardHeader className="flex-row items-start gap-4">
                      <div className="mt-1 flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <service.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {service.description}
                        </CardDescription>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-grow flex items-end">
                      <Button variant="link" asChild className="p-0 text-slate-600">
                        <Link href={service.link}>
                          En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
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
                    <Image
                      src={whyUsImage.imageUrl}
                      alt={whyUsImage.description}
                      fill
                      className="object-cover"
                      data-ai-hint={whyUsImage.imageHint}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}

                <div>
                  <h2 className="font-headline text-3xl font-bold">
                    Pourquoi choisir ERG Rénovation dans le Val-de-Marne ?
                  </h2>

                  <div className="mt-8 space-y-6">
                    {whyChooseUs.map((item) => (
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

                  <div className="mt-10 flex flex-col sm:flex-row gap-3">
                    <Button asChild className="w-full sm:w-auto">
                      <Link href="/devis">Demander un devis</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full sm:w-auto">
                      <Link href="/realisations">Voir des réalisations</Link>
                    </Button>
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
                <h2 className="font-headline text-3xl font-bold">
                  Villes d’intervention dans le Val-de-Marne (94)
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Nous couvrons l’ensemble du département.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
                {cities94.map((city) =>
                  city.href ? (
                    <Button
                      key={city.name}
                      asChild
                      variant="outline"
                      className="font-medium bg-background hover:bg-accent hover:text-accent-foreground"
                    >
                      <Link href={city.href}>{city.name}</Link>
                    </Button>
                  ) : (
                    <div
                      key={city.name}
                      className="p-3 border rounded-lg bg-background text-center text-sm font-medium"
                    >
                      {city.name}
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="py-16 md:py-24">
            <div className="container max-w-3xl mx-auto">
              <div className="text-center">
                <h2 className="font-headline text-3xl font-bold">
                  FAQ – Rénovation dans le Val-de-Marne (94)
                </h2>
              </div>

              <Accordion type="single" collapsible className="w-full mt-8">
                {faqItems.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left font-semibold text-lg">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        </AnimatedSection>

        <section className="container py-12 md:py-16" aria-labelledby="preparer-appartement-94">
          <div className="mx-auto max-w-4xl space-y-5">
            <h2 id="preparer-appartement-94" className="font-headline text-2xl font-bold md:text-3xl">Préparer une rénovation d’appartement dans le Val-de-Marne</h2>
            <p className="leading-relaxed text-muted-foreground">Votre projet peut concerner une remise en peinture, une cuisine, une salle de bain ou plusieurs pièces. Distinguez les équipements à conserver de ceux à remplacer et les changements indispensables des options de finition. Des photos, les dimensions et un plan simple permettent de préparer les vérifications lors de la visite.</p>
            <p className="leading-relaxed text-muted-foreground">Dans un logement familial, examinez les circulations et les besoins quotidiens avant de décider de l’agencement. Si l’appartement reste occupé, les interventions sur l’électricité et la plomberie doivent être coordonnées avec l’accès aux sanitaires et à la cuisine. Les conditions d’accès à l’immeuble, les protections et les livraisons sont à préciser pour votre adresse.</p>
            <p className="leading-relaxed text-muted-foreground">Le devis doit expliquer la préparation des supports, les interventions sur les réseaux, les fournitures et les travaux exclus. Les caractéristiques du logement et le périmètre retenu déterminent le budget et le planning. Une estimation générale ne remplace pas cette étude.</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 font-medium">
              <li><Link href="/services/renovation-appartement" className="underline">Prestations de rénovation d’appartement</Link></li>
              <li><Link href="/blog/comparer-devis-renovation" className="underline">Comparer des devis à périmètre égal</Link></li>
              <li><Link href="/blog/renovation-petite-salle-de-bain-budget" className="underline">Préparer le budget d’une petite salle de bain</Link></li>
            </ul>
          </div>
        </section>
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
