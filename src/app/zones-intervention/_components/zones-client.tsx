"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Breadcrumbs from "@/components/breadcrumbs";
import AnimatedSection from "@/components/animated-section";
import CtaBanner from "@/app/_components/cta-banner";
import { GoogleIcon } from "@/components/icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  MapPin,
  ArrowRight,
  Phone,
  CheckCircle2,
  Search,
  X,
  Sparkles,
  ShieldCheck,
  Clock,
  Building2,
  ChevronRight,
  Car
} from "lucide-react";
import { AREAS } from "@/lib/data";

const PHONE_E164 = "+33699961375";
const PHONE_DISPLAY = "06 99 96 13 75";

const heroBullets = [
  { label: "Visite sur site offerte", desc: "Diagnostic gratuit & conseil personnalisé" },
  { label: "Devis détaillé sous 24h", desc: "Chiffrage lisible poste par poste" },
  { label: "Interlocuteur unique", desc: "Suivi rigoureux tous corps d'état" },
  { label: "Garantie Décennale", desc: "Conformité et normes de sécurité" },
];

const popularCities = [
  { name: "Paris 11e", href: "/renovation-paris" },
  { name: "Boulogne-Billancourt", href: "/renovation-boulogne-billancourt" },
  { name: "Courbevoie", href: "/renovation-courbevoie" },
  { name: "Levallois-Perret", href: "/renovation-levallois-perret" },
  { name: "Montreuil", href: "/renovation-montreuil" },
  { name: "Vincennes", href: "/renovation-vincennes" },
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
      .slice(0, 15);
  }, [query, allCities]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50">
      <SiteHeader />

      <main className="flex-grow">
        {/* HERO SECTION — Premium Light Theme */}
        <section className="relative isolate overflow-hidden bg-slate-50 border-b border-slate-200/80 py-12 md:py-18 lg:py-20">
          {/* Subtle Ambient Light Glows */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-50/80 to-slate-50" />
            <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-slate-200/40 blur-3xl" />
          </div>

          <div className="container relative z-10">
            <div className="mx-auto max-w-4xl text-center space-y-6">
              <div className="flex items-center justify-center">
                <Breadcrumbs />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 text-xs sm:text-sm font-semibold text-amber-700 shadow-sm">
                  <MapPin className="h-4 w-4 text-amber-600" /> Paris & Petite Couronne (75, 92, 93, 94)
                </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=ERG-Entreprise+de+R%C3%A9novation+Appartement+%26+Salle+de+Bains+%C3%A0+Paris+et+%C3%8Ele-de-France"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-1 text-xs text-slate-800 shadow-sm hover:bg-white"
                >
                  <GoogleIcon className="h-4 w-4" />
                  <span className="font-bold text-amber-600">Avis clients</span>
                  <span className="text-slate-500">• Artisans de confiance</span>
                </a>
              </div>

              <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Nos Zones d’Intervention : <br />
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                  Artisans de Proximité à Paris & Île-de-France
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                ERG Rénovation intervient dans tous les arrondissements de Paris ainsi que dans les Hauts-de-Seine (92), la Seine-Saint-Denis (93) et le Val-de-Marne (94).
              </p>

              {/* Trust Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-left">
                {heroBullets.map((b) => (
                  <div
                    key={b.label}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-sm backdrop-blur-md"
                  >
                    <CheckCircle2 className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-xs sm:text-sm text-slate-900">{b.label}</span>
                      <span className="text-xs text-slate-500 leading-snug">{b.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* SEARCH MODULE */}
              <div className="pt-4 max-w-2xl mx-auto space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-lg relative">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Rechercher votre commune ou code postal (ex: Courbevoie, 92400, Montreuil...)"
                      className="pl-11 pr-10 h-12 rounded-xl border-slate-200 bg-slate-50/70 text-sm sm:text-base text-slate-900 focus:bg-white focus:border-amber-500 focus:ring-amber-500/20"
                      aria-label="Rechercher une ville ou un code postal"
                    />
                    {query ? (
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
                        aria-label="Effacer la recherche"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>

                  {/* Dynamic Dropdown Results */}
                  {query && (
                    <div className="mt-3 rounded-xl border border-slate-200 bg-white p-2 text-left shadow-xl max-h-72 overflow-y-auto divide-y divide-slate-100">
                      {results.length ? (
                        results.map((r) => {
                          const href = r.city.href ?? r.areaHref;
                          return (
                            <Link
                              key={`${r.areaCode}-${r.city.name}`}
                              href={href}
                              className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-amber-50/80 transition-colors group"
                            >
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
                                <span className="text-sm font-bold text-slate-900 group-hover:text-amber-700">
                                  {r.city.name}
                                  {r.city.code ? (
                                    <span className="text-slate-500 font-normal ml-1">({r.city.code})</span>
                                  ) : null}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold bg-amber-100/70 px-2.5 py-1 rounded-full">
                                <span>{r.areaLabel} ({r.areaCode})</span>
                                <ChevronRight className="h-3.5 w-3.5" />
                              </div>
                            </Link>
                          );
                        })
                      ) : (
                        <div className="p-4 text-center text-sm text-slate-600">
                          Aucun résultat pour "{query}". Nous intervenons néanmoins dans votre secteur ! Contactez-nous pour une validation rapide.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Popular Searches Shortcuts */}
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Accès rapide :</span>
                  {popularCities.map((city) => (
                    <Link
                      key={city.name}
                      href={city.href}
                      className="rounded-full bg-white border border-slate-200 px-3 py-1 font-medium text-slate-700 hover:border-amber-500 hover:text-amber-700 shadow-2xs transition-colors"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="h-13 px-7 bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 text-base shadow-lg shadow-amber-500/20 rounded-xl"
                >
                  <Link href="/devis">
                    Simuler mon projet dans ma ville <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-13 px-6 border-slate-300 bg-white text-slate-900 hover:bg-slate-100 text-base rounded-xl shadow-sm"
                >
                  <a href={`tel:${PHONE_E164}`}>
                    <Phone className="mr-2 h-4 w-4 text-amber-600" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* DEPARTMENTS GRID SECTION */}
        <AnimatedSection>
          <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center space-y-3 mb-12">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-semibold text-amber-700">
                  <Building2 className="h-3.5 w-3.5 text-amber-600" /> Couverture Régionale Paris & Île-de-France
                </span>
                <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-slate-900">
                  Nos Pages Locales par Département
                </h2>
                <p className="text-slate-600 text-base">
                  Sélectionnez votre département pour découvrir nos chantiers réalisés, nos conseils sur les copropriétés locales et nos informations d'intervention.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {AREAS.map((area) => (
                  <Card
                    key={area.code}
                    className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-md hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                  >
                    <div className="space-y-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                            <MapPin className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-headline text-2xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                              {area.label}
                            </h3>
                            <span className="text-xs font-semibold text-slate-500">
                              Département {area.code}
                            </span>
                          </div>
                        </div>

                        <span className="inline-flex items-center justify-center rounded-full bg-slate-900 text-amber-400 font-extrabold text-sm px-3.5 py-1 shadow-sm">
                          {area.code}
                        </span>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        {area.description}
                      </p>

                      <div className="pt-2 border-t border-slate-100">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                          Communes & Arrondissements Couverts :
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {area.cities.slice(0, 12).map((city) =>
                            city.href ? (
                              <Link
                                key={city.name}
                                href={city.href}
                                className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200 text-center truncate"
                              >
                                {city.name}
                              </Link>
                            ) : (
                              <div
                                key={city.name}
                                className="rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2 text-xs font-medium text-slate-600 text-center truncate"
                              >
                                {city.name}
                              </div>
                            )
                          )}
                        </div>

                        {area.cities.length > 12 && (
                          <p className="mt-3 text-xs text-slate-500 italic">
                            + {area.cities.length - 12} autres communes desservies au quotidien.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full h-11 border-slate-300 bg-white font-bold text-slate-900 hover:bg-slate-900 hover:text-white rounded-xl shadow-xs group-hover:border-amber-500/50"
                      >
                        <Link href={area.href} className="inline-flex items-center justify-center gap-2">
                          <span>Accéder à la page {area.label} ({area.code})</span>
                          <ArrowRight className="h-4 w-4 text-amber-600 group-hover:text-amber-400 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {/* PROXIMITY REASSURANCE CARD */}
              <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-lg max-w-6xl mx-auto relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-semibold text-amber-700">
                      <Car className="h-4 w-4 text-amber-600" /> Réactivité & Proximité
                    </div>

                    <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-slate-900">
                      Votre commune n’est pas directement listée ?
                    </h2>

                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      Nos équipes d'artisans tous corps d'état interviennent sur l'ensemble de la région parisienne. Que votre projet concerne un appartement, un studio ou un pavillon, nous organisons une visite d'estimation offerte sous 48h.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 pt-2">
                      <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                        <CheckCircle2 className="h-4 w-4 text-amber-600" /> Visite gratuite
                      </span>
                      <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                        <CheckCircle2 className="h-4 w-4 text-amber-600" /> Devis sous 24h
                      </span>
                      <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                        <CheckCircle2 className="h-4 w-4 text-amber-600" /> Garantie décennale
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="h-12 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md"
                    >
                      <Link href="/contact">
                        Nous contacter pour un projet <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-12 border-slate-300 text-slate-900 hover:bg-slate-100 rounded-xl"
                    >
                      <a href={`tel:${PHONE_E164}`}>
                        <Phone className="mr-2 h-4 w-4 text-amber-600" />
                        {PHONE_DISPLAY}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* CTA BANNER */}
        <CtaBanner />
      </main>

      <SiteFooter />
    </div>
  );
}
