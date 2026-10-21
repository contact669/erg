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
} from "lucide-react";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Breadcrumbs from "@/components/breadcrumbs";
import LocalProjectPreparation from "@/components/local-project-preparation";
import CourbevoieProjectPreparation from "@/components/courbevoie-project-preparation";
import AnimatedSection from "@/components/animated-section";
import CtaBanner from "@/app/_components/cta-banner";
import BeforeAfterSlider from "@/components/ui/before-after-slider";
import { quoteHrefForService } from "@/lib/quote-project";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { SUBURBS_DATA, SuburbCityData } from "@/lib/seo/suburbs-data";

const BRAND = "ERG Rénovation";
const SITE_URL = "https://erg-renovation.fr";
const PHONE_E164 = "+33699961375";
const PHONE_DISPLAY = "06 99 96 13 75";

export function getSuburbMetadata(slug: string): Metadata {
  const data = SUBURBS_DATA[slug];
  if (!data) return { title: `Rénovation appartement` };

  const canonicalUrl = `${SITE_URL}/renovation-${data.slug}`;

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: canonicalUrl,
      type: "website",
      locale: "fr_FR",
      siteName: BRAND,
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
    },
  };
}

function JsonLdScript({ data }: { data: SuburbCityData }) {
  const pageUrl = `${SITE_URL}/renovation-${data.slug}`;
  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: data.heroTitle,
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
        "Rénovation de maison",
        "Rénovation de salle de bain",
        "Rénovation de cuisine",
        "Électricité, plomberie et peinture",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Rénovation d'appartement et maison à ${data.name}`,
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
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Zones d'intervention", item: `${SITE_URL}/zones-intervention` },
        { "@type": "ListItem", position: 3, name: data.departmentName, item: `${SITE_URL}/${data.departmentSlug}` },
        { "@type": "ListItem", position: 4, name: data.name, item: pageUrl },
      ],
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

export function SuburbCityPageView({ slug }: { slug: string }) {
  const data = SUBURBS_DATA[slug];
  if (!data) notFound();

  // Find other cities in the same department
  const nearbyCities = Object.values(SUBURBS_DATA).filter(
    (c) => c.departmentCode === data.departmentCode && c.slug !== data.slug
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <JsonLdScript data={data} />
      <SiteHeader />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-slate-950 text-white pt-24 pb-16 md:pt-32 md:pb-24 border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(148,163,184,0.08),transparent_60%)]" />
          
          <div className="container relative z-10">
            <Breadcrumbs variant="dark" />

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-300 px-3.5 py-1.5 text-xs font-semibold text-slate-600">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Entreprise de Rénovation à {data.name} ({data.postalCode})</span>
                </div>

                <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {data.heroTitle}
                </h1>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                  {data.description} Devis détaillé et transparent poste par poste, suivi de chantier rigoureux et garantie décennale 10 ans.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <ShieldCheck className="h-4 w-4 text-slate-300 flex-shrink-0" />
                    <span>Garantie Décennale 10 ans</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <Clock3 className="h-4 w-4 text-slate-300 flex-shrink-0" />
                    <span>Respect des Délais</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <ClipboardCheck className="h-4 w-4 text-slate-300 flex-shrink-0" />
                    <span>Devis gratuit et détaillé</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-lg">
                    <Link href="/devis">
                      Demander mon devis à {data.name} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <Button asChild variant="outline" size="lg" className="border-slate-700 text-white hover:bg-slate-800 rounded-xl">
                    <a href={`tel:${PHONE_E164}`}>
                      <Phone className="mr-2 h-4 w-4 text-slate-300" />
                      {PHONE_DISPLAY}
                    </a>
                  </Button>
                </div>
              </div>

              {/* HERO REASSURANCE CARD */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl backdrop-blur-md space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-slate-300" />
                    Pourquoi choisir ERG à {data.name} ?
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-slate-300 mt-0.5 flex-shrink-0" />
                      <span><strong>Interlocuteur Unique :</strong> Un conducteur de travaux dédié de la conception à la réception.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-slate-300 mt-0.5 flex-shrink-0" />
                      <span><strong>Nos métiers :</strong> Électricité NF C 15-100, plomberie et sanitaires, peintures et finitions intérieures.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-slate-300 mt-0.5 flex-shrink-0" />
                      <span><strong>Spécificités {data.postalCode} :</strong> Maîtrise des règlements de copropriété et du bâti local.</span>
                    </li>
                  </ul>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>Retours de nos clients</span>
                    <span className="font-bold text-slate-300">Témoignages clients</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOCAL ARCHITECTURE & BEFORE/AFTER */}
        <section className="py-16 md:py-24 bg-slate-100/70 border-b border-slate-200">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Expertise Locale {data.postalCode}
                </div>

                <h2 className="font-headline text-2xl sm:text-3xl font-bold text-slate-900">
                  Rénover son bien immobilier à {data.name}
                </h2>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  {data.specifics}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">{data.showBeforeAfter === false ? "À examiner dans votre logement" : "Style Architectural"}</span>
                    <span className="text-sm font-semibold text-slate-900 block">{data.architecturalStyle}</span>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">{data.avgPricePerSqm.includes("€") ? "Fourchette indicative de travaux" : "Budget du projet"}</span>
                    <span className="text-sm font-bold text-slate-600 block">{data.avgPricePerSqm}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Quartiers d'intervention à {data.name} :</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.neighborhoods.map((q) => (
                      <span key={q} className="rounded-lg bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 shadow-2xs">
                        📍 {q}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Before/After Card */}
              <div className="lg:col-span-5">
                {data.showBeforeAfter === false ? (
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4">
                    <h3 className="font-headline text-xl font-semibold text-slate-900">Les informations utiles pour votre visite</h3>
                    <ul className="list-disc space-y-2 pl-5 text-slate-600">
                      <li>Pièces concernées et équipements conservés.</li>
                      <li>Photos, dimensions et choix encore à définir.</li>
                      <li>Accès à l’immeuble et occupation du logement.</li>
                    </ul>
                    <Link href={quoteHrefForService('renovation-appartement', `/renovation-${data.slug}`)} className="inline-flex rounded-xl bg-amber-500 px-5 py-3 font-semibold text-slate-950 hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-700">Décrire mon projet à {data.name}</Link>
                  </div>
                ) : (
                <div className="rounded-3xl bg-white p-4 shadow-2xl border border-slate-200 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
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
                )}
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
                  Électricité, plomberie et peinture intérieure : des interventions définies selon votre projet.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-2">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">Rénovation intérieure du logement</CardTitle>
                    <CardDescription>
                      Travaux électriques, reprise de plomberie et peinture intérieure, après examen des installations et des supports.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" asChild className="p-0 text-slate-600 font-bold">
                      <Link href="/services/renovation-appartement">
                        En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-2">
                      <Bath className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">Rénovation Salle de Bain</CardTitle>
                    <CardDescription>
                      Interventions de plomberie et d'électricité dans la salle de bain, selon les raccordements existants et les équipements retenus.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" asChild className="p-0 text-slate-600 font-bold">
                      <Link href="/services/renovation-salle-de-bain">
                        En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-2">
                      <UtensilsCrossed className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">Travaux dans la cuisine</CardTitle>
                    <CardDescription>
                      Adaptation des points d'eau, des alimentations électriques et des peintures pour votre projet de cuisine.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" asChild className="p-0 text-slate-600 font-bold">
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
                FAQ — Rénovation à {data.name} ({data.postalCode})
              </h2>
              <p className="text-slate-600 text-base">
                Vos questions fréquentes pour réussir votre chantier en toute sérénité.
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

        {/* NEARBY CITIES IN SAME DEPARTMENT */}
        {nearbyCities.length > 0 && (
          <section className="py-16 bg-white border-b border-slate-200">
            <div className="container">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h3 className="font-headline text-2xl font-bold text-slate-900">
                  Nos autres zones d'intervention dans les {data.departmentName} ({data.departmentCode})
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
                {nearbyCities.map((city) => (
                  <Button key={city.slug} asChild variant="outline" className="h-11 rounded-xl text-xs font-bold border-slate-200 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-600 transition-all">
                    <Link href={`/renovation-${city.slug}`}>
                      {city.name} ({city.postalCode})
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </section>
        )}

        {data.slug === "montreuil" && <LocalProjectPreparation location="montreuil" />}
        {data.slug === "courbevoie" && <CourbevoieProjectPreparation />}
        {data.projectPreparation && (
          <section className="container py-12 md:py-16" aria-labelledby={`preparation-${data.slug}`}>
            <div className="mx-auto max-w-4xl space-y-5">
              <h2 id={`preparation-${data.slug}`} className="font-headline text-2xl font-bold md:text-3xl">{data.projectPreparation.title}</h2>
              {data.projectPreparation.paragraphs.map(paragraph => <p key={paragraph} className="leading-relaxed text-slate-700">{paragraph}</p>)}
              <ul className="flex flex-wrap gap-x-6 gap-y-3 font-medium">
                <li><Link href="/services/renovation-appartement" className="underline">Prestations de rénovation d’appartement</Link></li>
                <li><Link href="/blog/comparer-devis-renovation" className="underline">Comparer les devis de rénovation</Link></li>
                {data.slug === "boulogne-billancourt" && <li><Link href="/blog/10-astuces-renovation-appartement-parisien" className="underline">Préparer les choix d’agencement</Link></li>}
                <li><Link href={`/${data.departmentSlug}`} className="underline">Rénovation dans les {data.departmentName}</Link></li>
              </ul>
            </div>
          </section>
        )}
        <CtaBanner />
      </main>

      <SiteFooter />
    </div>
  );
}
