import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, ArrowRight } from "lucide-react"

const PARIS_ARRONDISSEMENTS = [
  "Paris 1", "Paris 2", "Paris 3", "Paris 4", "Paris 5",
  "Paris 6", "Paris 7", "Paris 8", "Paris 9", "Paris 10",
  "Paris 11", "Paris 12", "Paris 13", "Paris 14", "Paris 15",
  "Paris 16", "Paris 17", "Paris 18", "Paris 19", "Paris 20",
]

export default function ServiceAreas() {
  return (
    <section
      id="zones"
      className="bg-background py-16 md:py-24"
      aria-labelledby="zones-title"
    >
      <div className="container">
        {/* Titre SEO */}
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="zones-title"
            className="font-headline text-3xl font-bold md:text-4xl"
          >
            Zones d’intervention – Paris & Île-de-France
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            ERG Rénovation intervient rapidement pour vos travaux de rénovation
            d’appartement, salle de bain et cuisine à Paris et en Île-de-France.
          </p>
        </div>

        {/* Paris */}
        <div className="mt-12">
          <h3 className="flex items-center justify-center gap-2 text-xl font-semibold">
            <MapPin className="h-5 w-5 text-primary" />
            Paris – Tous arrondissements
          </h3>

          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {PARIS_ARRONDISSEMENTS.map((area) => (
              <li key={area} className="text-center">
                <Link
                  href={`/renovation-${area.toLowerCase().replace(" ", "-")}`}
                  className="hover:text-primary"
                >
                  {area}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* IDF */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <AreaCard
            title="Hauts-de-Seine (92)"
            description="Boulogne-Billancourt, Nanterre, Courbevoie, Colombes, Asnières…"
            href="/renovation-92"
          />
          <AreaCard
            title="Seine-Saint-Denis (93)"
            description="Montreuil, Saint-Denis, Pantin, Aubervilliers, Noisy-le-Sec…"
            href="/renovation-93"
          />
          <AreaCard
            title="Val-de-Marne (94)"
            description="Vincennes, Ivry-sur-Seine, Créteil, Vitry-sur-Seine…"
            href="/renovation-94"
          />
        </div>

        {/* CTA Appels */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <a href="tel:+33699961375">
              <Phone className="mr-2 h-4 w-4" />
              Appeler maintenant
            </a>
          </Button>

          <Button asChild size="lg" variant="outline">
            <Link href="/devis">
              Demander un devis <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Micro SEO */}
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-muted-foreground">
          Rénovation appartement Paris • Rénovation salle de bain Paris 20 •
          Rénovation intérieure 92, 93, 94 • Devis gratuit • Garantie décennale
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
    <div className="rounded-xl border p-6 text-center">
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4">
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Voir la zone <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
