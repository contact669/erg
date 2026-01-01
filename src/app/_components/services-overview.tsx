import Link from "next/link"
import { services } from "@/lib/data"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ServicesOverview() {
  return (
    <section
      id="services"
      className="bg-background py-16 md:py-24"
      aria-labelledby="services-title"
    >
      <div className="container">
        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-primary/90">
            Prestations • Tous corps d’état
          </p>

          <h2
            id="services-title"
            className="mt-3 font-headline text-3xl font-bold tracking-tight md:text-4xl"
          >
            Des prestations sur mesure, pensées pour durer
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Du rafraîchissement à la rénovation complète, nous pilotons votre
            chantier avec une méthode claire, un chiffrage précis et des
            finitions soignées.
          </p>

          {/* SEO micro-copy (naturelle) */}
          <p className="mt-4 text-sm text-muted-foreground">
            Rénovation d’appartement, salle de bain, cuisine, peinture, sols,
            plomberie et électricité : explorez nos services et demandez un devis
            gratuit.
          </p>

          {/* CTA header */}
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="outline" className="min-w-[220px]">
              <Link
                href="/services"
                aria-label="Voir tous les services de rénovation"
              >
                Voir tous les services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild className="min-w-[220px]">
              <Link href="/devis" aria-label="Demander un devis gratuit">
                Demander un devis gratuit
              </Link>
            </Button>
          </div>
        </header>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.slug}
              className={cn(
                "group relative h-full overflow-hidden rounded-2xl",
                "border bg-background shadow-sm transition-all",
                "hover:-translate-y-0.5 hover:shadow-md"
              )}
            >
              {/* subtle top accent */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-primary/30 opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />

              <CardHeader className="space-y-4">
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl border bg-primary/5 text-primary">
                  <service.icon className="h-7 w-7" aria-hidden="true" />
                </div>

                <div className="text-center">
                  <CardTitle className="font-headline text-xl tracking-tight">
                    {service.title}
                  </CardTitle>

                  <CardDescription className="mt-2 text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </div>

                <div className="pt-2 text-center">
                  <Button
                    asChild
                    variant="ghost"
                    className={cn(
                      "h-9 rounded-full px-4",
                      "text-primary hover:bg-primary hover:text-primary-foreground",
                      "focus-visible:ring-2 focus-visible:ring-primary/30"
                    )}
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      aria-label={`En savoir plus sur ${service.title}`}
                    >
                      En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Footer micro SEO + internal linking */}
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-xs text-muted-foreground">
            Besoin d’une rénovation clé en main à Paris ou en Île-de-France ?
            Consultez aussi nos{" "}
            <Link href="/realisations" className="underline underline-offset-4 hover:text-primary">
              réalisations
            </Link>{" "}
            pour voir nos finitions et nos avant/après.
          </p>
        </div>
      </div>
    </section>
  )
}
