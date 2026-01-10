import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

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
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow container mx-auto w-full max-w-5xl px-4 py-12">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Zones d’intervention – Paris & Île-de-France</h1>
          <p className="text-muted-foreground">
            ERG Rénovation intervient pour vos travaux de rénovation intérieure : appartement, salle de bain, cuisine,
            et rénovation complète. Visite sur site, devis détaillé et suivi structuré.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/devis">
                Demander un devis
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">
                Nous contacter
              </Link>
            </Button>
          </div>
        </header>

        {/* Piliers */}
        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {PILLARS.map((p) => (
            <div key={p.href} className="rounded-2xl border bg-background p-6 shadow-sm">
              <h2 className="text-xl font-semibold">
                <Link className="underline underline-offset-4 hover:text-accent" href={p.href}>
                  {p.name}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </section>

        {/* 92 */}
        <section className="mt-8 rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">
            <Link className="underline underline-offset-4 hover:text-accent" href="/renovation-hauts-de-seine">
              Hauts-de-Seine (92)
            </Link>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Villes principales couvertes (liste évolutive). Chaque page ville contient des infos locales, FAQ et maillage interne.
          </p>

          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {CITIES_92.map((c) => (
              <li key={c.href}>
                <Link className="underline underline-offset-4 hover:text-accent" href={c.href}>
                  {c.name} ({c.code})
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 93 */}
        <section className="mt-8 rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">
            <Link className="underline underline-offset-4 hover:text-accent" href="/renovation-seine-saint-denis">
              Seine-Saint-Denis (93)
            </Link>
          </h2>

          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {CITIES_93.map((c) => (
              <li key={c.href}>
                <Link className="underline underline-offset-4 hover:text-accent" href={c.href}>
                  {c.name} ({c.code})
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 94 */}
        <section className="mt-8 rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">
            <Link className="underline underline-offset-4 hover:text-accent" href="/renovation-val-de-marne">
              Val-de-Marne (94)
            </Link>
          </h2>

          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {CITIES_94.map((c) => (
              <li key={c.href}>
                <Link className="underline underline-offset-4 hover:text-accent" href={c.href}>
                  {c.name} ({c.code})
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA final */}
        <section className="mt-12 rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Vous êtes en dehors de ces communes ?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Contactez-nous : nous intervenons plus largement en Île-de-France selon la nature du projet.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/devis">
                Demander un devis
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">
                Parler à un conseiller
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
