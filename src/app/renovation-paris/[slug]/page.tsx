import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Bath,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Home,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Users,
  Hammer,
  ChevronRight,
} from "lucide-react";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Breadcrumbs from "@/components/breadcrumbs";
import AnimatedSection from "@/components/animated-section";
import CtaBanner from "@/app/_components/cta-banner";
import BeforeAfterSlider from "@/components/ui/before-after-slider";

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
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  PARIS_ARRONDISSEMENTS,
  type ParisArrondissementData,
} from "@/lib/seo/paris-arrondissements";

const BRAND = "ERG Rénovation";
const SITE_URL = "https://erg-renovation.fr";
const PHONE_E164 = "+33699961375";
const PHONE_DISPLAY = "06 99 96 13 75";

export function generateStaticParams() {
  return Object.keys(PARIS_ARRONDISSEMENTS).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const data = PARIS_ARRONDISSEMENTS[params.slug];
  if (!data) return { title: `Rénovation appartement Paris` };

  const pageTitle = `Rénovation appartement Paris ${data.number === 1 ? '1er' : `${data.number}e`} (${data.postalCode})`;
  const pageDescription = `Entreprise de rénovation d'appartement à ${data.name} (${data.postalCode}). Devis gratuit poste par poste, garantie décennale, suivi sur-mesure. ${data.neighborhoods.join(", ")}.`;
  const canonicalUrl = `${SITE_URL}/renovation-paris/${data.slug}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      type: "website",
      locale: "fr_FR",
      siteName: BRAND,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

function JsonLd({ data }: { data: ParisArrondissementData }) {
  const pageUrl = `${SITE_URL}/renovation-paris/${data.slug}`;
  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Rénovation appartement ${data.name}`,
      url: pageUrl,
      isPartOf: { "@type": "WebSite", name: BRAND, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      name: BRAND,
      url: SITE_URL,
      telephone: PHONE_E164,
      priceRange: "€€€",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1 Sentier de la Pointe",
        addressLocality: "Paris",
        postalCode: "75020",
        addressCountry: "FR",
      },
      areaServed: [{ "@type": "City", name: data.name, postalCode: data.postalCode }],
      serviceType: [
        "Rénovation d'appartement",
        "Rénovation de salle de bain",
        "Rénovation de cuisine",
        "Travaux tous corps d'état",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Rénovation d'appartement à ${data.name}`,
      serviceType: "Rénovation intérieure",
      provider: { "@type": "HomeAndConstructionBusiness", name: BRAND, url: SITE_URL },
      areaServed: { "@type": "City", name: data.name, postalCode: data.postalCode },
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: pageUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <Script
      id={`jsonld-renovation-${data.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function ParisArrondissementPage({ params }: { params: { slug: string } }) {
  const data = PARIS_ARRONDISSEMENTS[params.slug];
  if (!data) notFound();

  const otherArrondissements = Object.values(PARIS_ARRONDISSEMENTS).filter((a) => a.slug !== data.slug);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd data={data} />
      <SiteHeader />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-slate-900 py-16 md:py-24 text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#amber-500_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="container relative z-10">
            <div className="mx-auto max-w-4xl text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
                <Link href="/" className="hover:underline">Accueil</Link>
                <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                <Link href="/renovation-paris" className="hover:underline">Paris</Link>
                <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                <span className="text-white">{data.postalCode}</span>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400">
                <MapPin className="h-4 w-4" />
                {data.name} • Tous Quartiers
              </span>

              <h1 className="font-headline text-4xl font-extrabold sm:text-5xl lg:text-6xl tracking-tight leading-tight">
                Rénovation d’Appartement à <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                  {data.name}
                </span>
              </h1>

              <p className="mt-4 mx-auto max-w-3xl text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                {data.description} Profitez d'un interlocuteur unique, d'un devis transparent poste par poste et d'une garantie décennale 10 ans.
              </p>

              {/* Badges */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-3 backdrop-blur-md">
                  <ShieldCheck className="h-5 w-5 text-amber-400 mb-1" />
                  <span className="block text-xs font-bold text-white">Garantie 10 Ans</span>
                  <span className="text-[11px] text-slate-400">Décennale vérifiée</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-3 backdrop-blur-md">
                  <Clock3 className="h-5 w-5 text-amber-400 mb-1" />
                  <span className="block text-xs font-bold text-white">Devis sous 24h</span>
                  <span className="text-[11px] text-slate-400">Visite offerte</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-3 backdrop-blur-md">
                  <Users className="h-5 w-5 text-amber-400 mb-1" />
                  <span className="block text-xs font-bold text-white">Interlocuteur Unique</span>
                  <span className="text-[11px] text-slate-400">Chef de projet dédié</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-3 backdrop-blur-md">
                  <CheckCircle2 className="h-5 w-5 text-amber-400 mb-1" />
                  <span className="block text-xs font-bold text-white">Clé en Main</span>
                  <span className="text-[11px] text-slate-400">Conception & Travaux</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="h-14 px-8 bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 text-base shadow-xl rounded-xl w-full sm:w-auto">
                  <Link href="/devis">
                    Simuler mon devis à {data.postalCode} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-6 border-slate-700 bg-slate-800/80 text-white hover:bg-slate-800 text-base rounded-xl w-full sm:w-auto">
                  <a href={`tel:${PHONE_E164}`}>
                    <Phone className="mr-2 h-5 w-5 text-amber-400" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ARRONDISSEMENT SPECIFICS SECTION */}
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-700">
                  <Sparkles className="h-3.5 w-3.5 text-amber-600" /> Expertise Locale & Architecture
                </div>

                <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  Spécificités de Rénovation dans le <span className="text-amber-600">{data.postalCode}</span>
                </h2>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  {data.specifics}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Style Architectural Dominate</span>
                    <span className="text-sm font-semibold text-slate-900 block">{data.architecturalStyle}</span>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Fourchette indicative de travaux</span>
                    <span className="text-sm font-bold text-amber-700 block">{data.avgPricePerSqm}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Quartiers d'intervention couverts :</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.neighborhoods.map((q) => (
                      <span key={q} className="rounded-lg bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 shadow-2xs">
                        📍 {q}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Before/After Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-white p-4 shadow-2xl border border-slate-200 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
                    Exemple de transformation ERG
                  </span>
                  <BeforeAfterSlider
                    beforeImage={data.beforeAfterProject.beforeImage}
                    afterImage={data.beforeAfterProject.afterImage}
                    beforeLabel={data.beforeAfterProject.beforeLabel}
                    afterLabel={data.beforeAfterProject.afterLabel}
                    alt={"Exemple de rénovation ERG — photos illustratives, localisation non attribuée"}
                    aspectRatio="aspect-[4/3]"
                    className="rounded-2xl overflow-hidden shadow-md"
                  />
                  <span className="block text-xs font-bold text-slate-900 text-center pt-1">
                    {"Exemple de rénovation ERG — photos illustratives, localisation non attribuée"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES OFFERED */}
        <AnimatedSection>
          <section className="py-16 md:py-24 bg-white border-b border-slate-200">
            <div className="container">
              <div className="mx-auto max-w-2xl text-center space-y-3">
                <h2 className="font-headline text-3xl font-bold text-slate-900">
                  Nos Prestations de Rénovation à {data.name}
                </h2>
                <p className="text-slate-600 text-base">
                  Du simple rafraîchissement à la rénovation lourde avec modification de cloisons.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-2">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">Rénovation Appartement Clé en Main</CardTitle>
                    <CardDescription>
                      Démolition, redistribution d'espace, électricité NF C 15-100, plomberie, parquets et peintures de précision.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" asChild className="p-0 text-amber-700 font-bold">
                      <Link href="/services/renovation-appartement">
                        En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-2">
                      <Bath className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">Rénovation Salle de Bain</CardTitle>
                    <CardDescription>
                      Douches à l'italienne, étanchéité SEL sous carrelage, meuble vasque sur-mesure et robinetterie encastrée.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" asChild className="p-0 text-amber-700 font-bold">
                      <Link href="/services/renovation-salle-de-bain">
                        En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-2">
                      <UtensilsCrossed className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">Rénovation Cuisine Sur-Mesure</CardTitle>
                    <CardDescription>
                      Ouverture sur séjour, verrières, îlots centraux, plans de travail quartz/granit et raccordements techniques.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" asChild className="p-0 text-amber-700 font-bold">
                      <Link href="/services/renovation-cuisine">
                        En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* FAQ SECTION */}
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="container max-w-3xl mx-auto">
            <div className="text-center space-y-3">
              <h2 className="font-headline text-3xl font-bold text-slate-900">
                FAQ — Rénovation dans le {data.name}
              </h2>
              <p className="text-slate-600 text-base">
                Vos questions fréquentes pour réussir vos travaux dans le {data.postalCode}.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full mt-8 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              {data.faqs.map((f, i) => (
                <AccordionItem value={`item-${i}`} key={i}>
                  <AccordionTrigger className="text-left font-semibold text-slate-900">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* OTHER ARRONDISSEMENTS NAVIGATION */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h3 className="font-headline text-2xl font-bold text-slate-900">
                Nos interventions dans les autres arrondissements parisiens
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
              {otherArrondissements.map((arr) => (
                <Button key={arr.slug} asChild variant="outline" className="h-11 rounded-xl text-xs font-bold border-slate-200 hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-700 transition-all">
                  <Link href={`/renovation-paris/${arr.slug}`}>
                    {arr.name.split(" ")[0]} {arr.name.split(" ")[1]} ({arr.postalCode})
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>

      <SiteFooter />
    </div>
  );
}
