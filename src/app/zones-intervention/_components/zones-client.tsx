
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Breadcrumbs from "@/components/breadcrumbs";
import AnimatedSection from "@/components/animated-section";
import CtaBanner from "@/app/_components/cta-banner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, ArrowRight, Phone, CheckCircle2, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AREAS } from "@/lib/data";


const PHONE_E164 = "+33699961375";
const PHONE_DISPLAY = "06 99 96 13 75";

const heroBullets = [
  "Visite sur site offerte",
  "Devis détaillé et transparent",
  "Interlocuteur unique",
  "Suivi de chantier structuré",
];

export default function ZonesInterventionClient() {
  const [query, setQuery] = useState("");

  const allCities = useMemo(() => {
    const items: { areaCode: string; areaLabel: string; areaHref: string; city: any }[] = [];
    for (const a of AREAS) {
      for (const city of a.cities) {
        items.push({ areaCode: a.code, areaLabel: a.label, areaHref: a.href, city });
      }
    }
    return items;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const normalize = (s: string) =>
      s
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[-'’]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const nq = normalize(q);

    return allCities
      .filter(({ city, areaCode, areaLabel }) => {
        const hay = normalize(`${city.name} ${city.code ?? ""} ${areaLabel} ${areaCode}`);
        return hay.includes(nq);
      })
      .slice(0, 20); // limite UX
  }, [query, allCities]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-grow">
        <Breadcrumbs />

        {/* HERO */}
        <section className="bg-secondary border-b">
          <div className="container py-14 md:py-20">
            <div className="mx-auto max-w-4xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm font-medium text-foreground/80">
                <MapPin className="h-4 w-4" />
                Paris & Petite Couronne
              </p>

              <h1 className="mt-4 font-headline text-4xl font-bold md:text-5xl tracking-tight">
                Zones d’intervention
              </h1>

              <p className="mt-4 text-lg text-muted-foreground mx-auto max-w-3xl">
                Trouvez votre département ou votre ville pour accéder à la page dédiée (services, conseils, contraintes
                locales, FAQ).
              </p>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto text-left">
                {heroBullets.map((t) => (
                  <div key={t} className="flex items-center gap-2 rounded-lg border bg-background px-4 py-3">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <span className="font-medium">{t}</span>
                  </div>
                ))}
              </div>

              {/* Search */}
              <div className="mt-8 mx-auto max-w-2xl">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher une ville (ex : Courbevoie, 92400, Montreuil…)"
                    className="pl-9 pr-10 bg-background"
                    aria-label="Rechercher une ville"
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground hover:text-foreground"
                      aria-label="Effacer la recherche"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>

                {query && (
                  <div className="mt-3 rounded-lg border bg-background p-3 text-left">
                    {results.length ? (
                      <ul className="space-y-1">
                        {results.map((r) => {
                          const href = r.city.href ?? r.areaHref; // fallback SEO propre
                          return (
                            <li key={`${r.areaCode}-${r.city.name}`}>
                              <Link
                                href={href}
                                className="flex items-center justify-between gap-3 rounded-md px-3 py-2 hover:bg-secondary"
                              >
                                <span className="text-sm font-medium">
                                  {r.city.name}
                                  {r.city.code ? (
                                    <span className="text-muted-foreground">{` (${r.city.code})`}</span>
                                  ) : null}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {r.areaLabel} ({r.areaCode})
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Aucun résultat. Essayez une autre orthographe ou recherchez par code postal.
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="/devis">Demander un devis</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                    <a href={`tel:${PHONE_E164}`}>
                      <span className="inline-flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Appeler  {PHONE_DISPLAY}
                      </span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AREAS */}
        <AnimatedSection>
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-headline text-3xl font-bold">Pages locales par département</h2>
                <p className="mt-4 text-muted-foreground">
                  Commencez par la page “pilier” de votre département, puis accédez aux pages villes.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                {AREAS.map((a) => (
                  <Card key={a.code} className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <MapPin className="h-6 w-6 text-accent" />
                        <Link href={a.href} className="hover:underline underline-offset-4">
                          {a.label} ({a.code})
                        </Link>
                      </CardTitle>
                      <CardDescription>{a.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="flex-grow">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {a.cities.slice(0, 12).map((c) =>
                          c.href ? (
                            <Link
                              key={c.name}
                              href={c.href}
                              className="rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                              {c.name}
                            </Link>
                          ) : (
                            <div
                              key={c.name}
                              className="rounded-md border bg-background px-3 py-2 text-sm font-medium text-muted-foreground"
                            >
                              {c.name}
                            </div>
                          )
                        )}
                      </div>

                      {a.cities.length > 12 && (
                        <p className="mt-3 text-xs text-muted-foreground">
                          + {a.cities.length - 12} autres localités (pages dédiées en cours de publication).
                        </p>
                      )}

                      <div className="mt-7">
                        <Button asChild variant="outline" className="w-full sm:w-auto">
                          <Link href={a.href}>
                            Voir la page {a.label} <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* fallback */}
              <div className="mt-12 rounded-lg border bg-secondary/40 p-6 text-center">
                <h2 className="font-headline text-2xl font-bold">Votre ville n’est pas listée ?</h2>
                <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                  Contactez-nous : nous intervenons selon la nature et la taille du projet.
                </p>
                <Button asChild className="mt-6">
                  <Link href="/contact">
                    Nous contacter <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
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

    