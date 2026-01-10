
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SERVICES = [
  { name: "Rénovation d’appartement", href: "/services/renovation-appartement" },
  { name: "Rénovation de salle de bain", href: "/services/renovation-salle-de-bain" },
  { name: "Rénovation de cuisine", href: "/services/renovation-cuisine" },
  { name: "Rénovation complète", href: "/services/renovation-complete" },
];

const CITIES_92_PRIMARY = [
  { name: "Boulogne-Billancourt", code: "92100", href: "/renovation-boulogne-billancourt" },
  { name: "Nanterre", code: "92000", href: "/renovation-nanterre" },
  { name: "Courbevoie", code: "92400", href: "/renovation-courbevoie" },
  { name: "Levallois-Perret", code: "92300", href: "/renovation-levallois-perret" },
  { name: "Asnières-sur-Seine", code: "92600", href: "/renovation-asnieres-sur-seine" },
  { name: "Colombes", code: "92700", href: "/renovation-colombes" },
];

export function InternalLinksHautsDeSeine() {
  return (
    <section className="mt-12 space-y-8">
      {/* Header */}
      <header className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Zones principales – Hauts-de-Seine (92)</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          ERG Rénovation intervient dans tout le département pour vos travaux de rénovation intérieure
          (appartement, salle de bain, cuisine et rénovation complète), avec visite sur site, devis détaillé
          et pilotage de chantier par un interlocuteur unique.
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
          <Button asChild variant="outline">
            <Link href="/zones-intervention">
              Toutes nos zones
            </Link>
          </Button>
        </div>
      </header>

      {/* Services */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h3 className="text-xl font-semibold">Nos services de rénovation dans le 92</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Choisissez le type de travaux selon votre besoin : optimisation d’espace, modernisation, remise aux normes,
          ou rénovation complète clé en main.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <li key={s.href}>
              <Link className="underline underline-offset-4 hover:text-accent" href={s.href}>
                {s.name} dans les Hauts-de-Seine
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Cities */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h3 className="text-xl font-semibold">Villes les plus demandées (92)</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Consultez nos pages locales pour des contenus adaptés aux contraintes de votre commune (copropriété, ancien,
          optimisation de surface, isolation, etc.).
        </p>

        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {CITIES_92_PRIMARY.map((c) => (
            <li key={c.href}>
              <Link className="underline underline-offset-4 hover:text-accent" href={c.href}>
                Rénovation à {c.name} ({c.code})
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-5 rounded-xl bg-muted/30 p-4 text-sm">
          <p className="font-medium">Astuce :</p>
          <p className="mt-1 text-muted-foreground">
            Pour maximiser votre SEO local, ces pages villes doivent ensuite renvoyer vers cette page pilier (92),
            vers les services, et vers 3 à 6 villes proches.
          </p>
        </div>
      </div>

      {/* Secondary CTA */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h3 className="text-xl font-semibold">Prêt à lancer vos travaux dans le 92 ?</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Nous planifions une visite sur site, puis nous vous remettons un devis clair et un planning réaliste.
          Vous gardez une visibilité totale sur le chantier.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/devis">
              Obtenir un devis détaillé
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/services/renovation-complete">
              Voir la rénovation complète
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
