import Link from "next/link"
import { services } from "@/lib/data"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function ServicesOverview() {
  return (
    <section id="services" className="bg-background py-16 md:py-24" aria-labelledby="services-title">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="services-title" className="font-headline text-3xl font-bold md:text-4xl">
            Des prestations sur mesure pour chaque projet
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Que ce soit pour un rafraîchissement ou une transformation complète, notre expertise couvre tous vos besoins
            en rénovation intérieure.
          </p>

          {/* ✅ Mini contenu SEO indexable + maillage interne */}
          <p className="mt-4 text-sm text-muted-foreground">
            Rénovation d’appartement, rénovation de salle de bain, cuisine, peinture, sols, plomberie et électricité :
            découvrez nos services et demandez un devis gratuit.
          </p>

          {/* ✅ CTA global (maillage + conversion) */}
          <div className="mt-6 flex justify-center">
            <Button asChild variant="outline">
              <Link href="/services" aria-label="Voir tous les services de rénovation">
                Voir tous les services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.slug}
              className="group flex transform flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <CardHeader>
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4 text-primary">
                    <service.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                </div>

                <CardTitle className="text-center font-headline text-xl">{service.title}</CardTitle>
                <CardDescription className="text-center">{service.description}</CardDescription>
              </CardHeader>

              <div className="p-6 pt-0 text-center">
                <Button
                  variant="ghost"
                  asChild
                  className="text-primary hover:text-primary-foreground hover:bg-primary"
                >
                  <Link href={`/services/${service.slug}`} aria-label={`En savoir plus : ${service.title}`}>
                    En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* ✅ Second CTA (conversion) */}
        <div className="mt-12 flex justify-center">
          <Button asChild className="min-w-[220px]">
            <Link href="/devis" aria-label="Demander un devis gratuit">
              Demander un devis gratuit
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
