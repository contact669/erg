
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Breadcrumbs from "@/components/breadcrumbs";
import CtaBanner from "@/app/_components/cta-banner";
import AnimatedSection from "@/components/animated-section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Zones d’intervention | Paris & Île-de-France | ERG Rénovation",
  description:
    "Zones d’intervention ERG Rénovation : Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94). Visite sur site et devis détaillé.",
  alternates: {
    canonical: "https://www.erg-renovation.fr/zones-intervention",
  },
  robots: { index: true, follow: true },
};

const PILLARS = [
  { name: "Paris (75)", href: "/renovation-paris", desc: "Tous arrondissements – rénovation intérieure, salle de bain, cuisine, rénovation complète." },
  { name: "Hauts-de-Seine (92)", href: "/renovation-hauts-de-seine", desc: "Boulogne, Courbevoie, Levallois, Asnières, Colombes, Nanterre…" },
  { name: "Seine-Saint-Denis (93)", href: "/renovation-seine-saint-denis", desc: "Montreuil, Pantin, Saint-Denis, Aubervilliers…" },
  { name: "Val-de-Marne (94)", href: "/renovation-val-de-marne", desc: "Vincennes, Créteil, Ivry-sur-Seine, Vitry-sur-Seine…" },
];

const CITIES_92 = [
  { name: "Boulogne-Billancourt", code: "92100", href: "/renovation-boulogne-billancourt" },
  { name: "Nanterre", code: "92000", href: "/renovation-nanterre" },
  { name: "Courbevoie", code: "92400", href: "/renovation-courbevoie" },
  { name: "Levallois-Perret", code: "92300", href: "/renovation-levallois-perret" },
  { name: "Asnières-sur-Seine", code: "92600", href: "/renovation-asnieres-sur-seine" },
  { name: "Colombes", code: "92700", href: "/renovation-colombes" },
];

const CITIES_93 = [
  { name: "Montreuil", code: "93100", href: "/renovation-montreuil" },
  // À compléter ensuite : Pantin, Saint-Denis, Aubervilliers, Noisy-le-Sec...
];

const CITIES_94 = [
  { name: "Vincennes", code: "94300", href: "/renovation-vincennes" },
  // À compléter ensuite : Ivry, Créteil, Vitry, Saint-Maur...
];

export default function ZonesInterventionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader />
      <main className="flex-grow">
        <Breadcrumbs />

        <section className="bg-secondary py-16 md:py-24">
            <div className="container text-center">
                <div className="mx-auto max-w-3xl">
                    <h1 className="font-headline text-4xl font-bold md:text-5xl mt-4">
                        Zones d’intervention – Paris & Île-de-France
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        ERG Rénovation intervient pour vos travaux de rénovation intérieure : appartement, salle de bain, cuisine,
                        et rénovation complète. Visite sur site, devis détaillé et suivi structuré.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Button asChild size="lg">
                            <Link href="/devis">Demander un devis gratuit</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/contact">Nous contacter</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        <AnimatedSection>
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PILLARS.map((p) => (
                    <Card key={p.href} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <MapPin className="h-6 w-6 text-accent"/>
                                <Link href={p.href} className="hover:underline">{p.name}</Link>
                            </CardTitle>
                            <CardDescription>{p.desc}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <ul className="space-y-2">
                              {p.name.includes("92") && CITIES_92.map(c => (
                                <li key={c.href}><Link href={c.href} className="text-sm text-muted-foreground hover:text-primary">{c.name}</Link></li>
                              ))}
                              {p.name.includes("93") && CITIES_93.map(c => (
                                <li key={c.href}><Link href={c.href} className="text-sm text-muted-foreground hover:text-primary">{c.name}</Link></li>
                              ))}
                              {p.name.includes("94") && CITIES_94.map(c => (
                                <li key={c.href}><Link href={c.href} className="text-sm text-muted-foreground hover:text-primary">{c.name}</Link></li>
                              ))}
                          </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-12 rounded-lg border bg-secondary/40 p-6 text-center">
                <h2 className="font-headline text-2xl font-bold">Vous êtes en dehors de ces communes ?</h2>
                <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                    Contactez-nous. Nous étudions les projets sur l'ensemble de l'Île-de-France en fonction de leur nature et de leur envergure.
                </p>
                <Button asChild className="mt-6">
                    <Link href="/contact">Parler à un conseiller <ArrowRight className="ml-2 h-4 w-4"/></Link>
                </Button>
            </div>
          </div>
        </section>
        </AnimatedSection>
        
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
