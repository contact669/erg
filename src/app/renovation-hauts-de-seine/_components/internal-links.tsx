
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HDS_CITIES = [
  { name: "Boulogne-Billancourt (92100)", href: "/renovation-boulogne-billancourt" },
  { name: "Nanterre (92000)", href: "/renovation-nanterre" },
  { name: "Courbevoie (92400)", href: "/renovation-courbevoie" },
  { name: "Levallois-Perret (92300)", href: "/renovation-levallois-perret" },
  { name: "Asnières-sur-Seine (92600)", href: "/renovation-asnieres-sur-seine" },
  { name: "Colombes (92700)", href: "/renovation-colombes" },
];

const SERVICES = [
  { name: "Rénovation d’appartement", href: "/services/renovation-appartement" },
  { name: "Rénovation de salle de bain", href: "/services/renovation-salle-de-bain" },
  { name: "Rénovation de cuisine", href: "/services/renovation-cuisine" },
  { name: "Rénovation complète", href: "/services/renovation-complete" },
];

export function InternalLinksHautsDeSeine() {
  return (
    <section className="mt-12 space-y-8">
      {/* 1) Services */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Nos services de rénovation dans les Hauts-de-Seine (92)</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Rénovation intérieure tous corps d’état : appartement, salle de bain, cuisine et rénovation complète.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <li key={s.href}>
              <Link className="underline underline-offset-4 hover:text-accent" href={s.href}>
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 2) Villes principales */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Villes d’intervention principales dans le 92</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Nous intervenons rapidement dans tout le département. Voici les zones les plus demandées.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {HDS_CITIES.map((c) => (
            <li key={c.href}>
              <Link className="underline underline-offset-4 hover:text-accent" href={c.href}>
                Rénovation à {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 3) CTA */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Parlons de votre projet dans les Hauts-de-Seine</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Visite sur site, conseils techniques, devis détaillé et pilotage de chantier par un interlocuteur unique.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
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
      </div>
    </section>
  );
}

type NearbyLink = { name: string; href: string };

export function InternalLinksCity92({
  cityName,
  citySlug,
  nearby,
}: {
  cityName: string;
  citySlug: string;
  nearby: NearbyLink[];
}) {
  return (
    <section className="mt-12 space-y-8">
      {/* 1) Voir aussi : pilier 92 */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Travaux de rénovation dans le 92</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Pour une vision complète des prestations et zones couvertes dans le département.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link className="underline underline-offset-4 hover:text-accent" href="/renovation-hauts-de-seine">
            Rénovation Hauts-de-Seine (92)
          </Link>
        </div>
      </div>

      {/* 2) Services */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Nos services à {cityName}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Choisissez le type de travaux : rénovation d’appartement, salle de bain, cuisine ou rénovation complète.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <li key={s.href}>
              <Link className="underline underline-offset-4 hover:text-accent" href={s.href}>
                {s.name} à {cityName}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 3) Villes proches */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Villes proches</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Vous êtes dans une commune voisine ? Consultez aussi nos pages locales.
        </p>

        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {nearby.map((n) => (
            <li key={n.href}>
              <Link className="underline underline-offset-4 hover:text-accent" href={n.href}>
                Rénovation à {n.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-4 text-sm">
          <Link className="underline underline-offset-4 hover:text-accent" href={citySlug}>
            Retour à la page {cityName}
          </Link>
        </div>
      </div>
    </section>
  );
}
