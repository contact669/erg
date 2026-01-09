import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const PARIS_ARRONDISSEMENTS = [
  "Paris 1", "Paris 2", "Paris 3", "Paris 4", "Paris 5",
  "Paris 6", "Paris 7", "Paris 8", "Paris 9", "Paris 10",
  "Paris 11", "Paris 12", "Paris 13", "Paris 14", "Paris 15",
  "Paris 16", "Paris 17", "Paris 18", "Paris 19", "Paris 20",
] as const

function toSlug(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD") // enlève accents
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "et")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/**
 * ⚠️ Assure-toi que ces routes existent :
 * - /renovation-paris-1 ... /renovation-paris-20
 * - /renovation-92, /renovation-93, /renovation-94
 */
function parisHref(area: string) {
  // "Paris 10" -> "paris-10"
  const slug = toSlug(area)
  return `/renovation-${slug}`
}

export default function ServiceAreas() {
  return (
    <section
      id="zones"
      className="border-y bg-background py-16 md:py-24"
      aria-labelledby="zones-title"
    >
      <div className="container">
        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-primary/90">
            Zones d’intervention
          </p>

          <h2
            id="zones-title"
            className="mt-3 font-headline text-3xl font-bold tracking-tight md:text-4xl"
          >
            Paris & Île-de-France
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            ERG Rénovation intervient pour vos travaux de rénovation intérieure :
            appartement, salle de bain et cuisine, avec un suivi structuré et des
            finitions soignées.
          </p>
        </header>

        {/* IDF cards */}
        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AreaCard
            title="Paris (75)"
            description="Intervention dans tous les arrondissements."
            href="/renovation-appartement/paris-75"
          />
          <AreaCard
            title="Hauts-de-Seine (92)"
            description="Boulogne-Billancourt, Nanterre, Courbevoie, Colombes, Asnières…"
            href="/renovation-appartement/hauts-de-seine-92"
          />
          <AreaCard
            title="Seine-Saint-Denis (93)"
            description="Montreuil, Saint-Denis, Pantin, Aubervilliers, Noisy-le-Sec…"
            href="/renovation-appartement/seine-saint-denis-93"
          />
          <AreaCard
            title="Val-de-Marne (94)"
            description="Vincennes, Ivry-sur-Seine, Créteil, Vitry-sur-Seine…"
            href="/renovation-appartement/val-de-marne-94"
          />
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="min-w-[220px] bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <a href="tel:+33699961375" aria-label="Appeler ERG Rénovation">
              <Phone className="mr-2 h-4 w-4" />
              Appeler maintenant
            </a>
          </Button>

          <Button asChild size="lg" variant="outline" className="min-w-[220px]">
            <Link href="/devis">
              Demander un devis <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Micro SEO (propre) */}
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-muted-foreground">
          Rénovation appartement à Paris • Salle de bain clé en main • Rénovation
          intérieure en 92, 93, 94 • Devis gratuit • Garantie décennale
        </p>
      </div>
    </section>
  )
}

function AreaCard({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <article className="group rounded-2xl border bg-background/70 p-6 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:bg-background hover:shadow-md">
      <h4 className="text-base font-semibold tracking-tight">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <div className="mt-4">
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          aria-label={`Voir la zone ${title}`}
        >
          Voir la zone <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  )
}
