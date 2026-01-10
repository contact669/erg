import Link from "next/link";
import { Button } from "./ui/button";

const PILLARS = [
  { name: "Rénovation à Paris (75)", href: "/renovation-paris" },
  { name: "Rénovation Hauts-de-Seine (92)", href: "/renovation-hauts-de-seine" },
  { name: "Rénovation Seine-Saint-Denis (93)", href: "/renovation-seine-saint-denis" },
  { name: "Rénovation Val-de-Marne (94)", href: "/renovation-val-de-marne" },
];

const POPULAR_CITIES = [
  { name: "Boulogne-Billancourt", href: "/renovation-boulogne-billancourt" },
  { name: "Courbevoie", href: "/renovation-courbevoie" },
  { name: "Levallois-Perret", href: "/renovation-levallois-perret" },
  { name: "Nanterre", href: "/renovation-nanterre" },
  { name: "Asnières-sur-Seine", href: "/renovation-asnieres-sur-seine" },
  { name: "Colombes", href: "/renovation-colombes" },
  { name: "Montreuil", href: "/renovation-montreuil" },
  { name: "Vincennes", href: "/renovation-vincennes" },
];

export default function InternalLinksService({ serviceLabel }: { serviceLabel: string }) {
  return (
    <section className="mt-12 space-y-8">
      {/* Zones */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Zones desservies pour {serviceLabel}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Accédez à nos pages locales pour des informations adaptées à votre secteur et à vos contraintes (copropriété, ancien, accès…).
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {PILLARS.map((p) => (
            <li key={p.href}>
              <Link className="underline underline-offset-4 hover:text-accent" href={p.href}>
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Villes populaires */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Villes populaires</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sélection de communes où la demande est forte. (Liste évolutive, ajout progressif de pages.)
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR_CITIES.map((c) => (
            <li key={c.href}>
              <Link className="underline underline-offset-4 hover:text-accent" href={c.href}>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-4 text-sm">
          <Link className="underline underline-offset-4 hover:text-accent" href="/zones-intervention">
            Voir toutes les zones d’intervention
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Besoin d’un devis pour {serviceLabel} ?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Visite sur site, conseils techniques, devis détaillé et planification réaliste.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/devis">
              Demander un devis
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">
              Poser une question
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
