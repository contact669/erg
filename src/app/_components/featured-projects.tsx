import Image from "next/image"
import Link from "next/link"
import { featuredProjects } from "@/lib/data"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"

export default function FeaturedProjects() {
  return (
    <section
      id="realisations"
      aria-labelledby="projects-title"
      className="border-t bg-background py-16 md:py-20 lg:py-24"
    >
      <div className="container">
        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium tracking-wider text-muted-foreground">
            AVANT / APRÈS • FINITIONS • OPTIMISATION D’ESPACE
          </p>

          <h2
            id="projects-title"
            className="mt-3 font-headline text-3xl font-bold tracking-tight md:text-4xl"
          >
            Des réalisations qui prouvent notre exigence
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Chaque chantier est piloté avec rigueur : préparation, coordination des corps d’état, finitions et réception.
            Découvrez une sélection de projets menés à Paris et en Île-de-France.
          </p>

          {/* Micro-proof discret */}
          <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            <li className="rounded-full border bg-background px-3 py-1">Garantie décennale</li>
            <li className="rounded-full border bg-background px-3 py-1">Interlocuteur unique</li>
            <li className="rounded-full border bg-background px-3 py-1">Finitions haut de gamme</li>
          </ul>
        </header>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project, idx) => {
            const projectImage = PlaceHolderImages.find((img) => img.id === project.images.after)

            return (
              <Link
                key={project.slug}
                href={`/realisations/${project.slug}`}
                aria-label={`Voir la réalisation : ${project.title}`}
                className="group block focus:outline-none"
              >
                <Card className="h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      {projectImage && (
                        <Image
                          src={projectImage.imageUrl}
                          alt={project.description || `${project.title} – réalisation ERG Rénovation`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          data-ai-hint={projectImage.imageHint}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          // ✅ Mets true uniquement si cette section est très haut sur la page
                          priority={idx === 0}
                        />
                      )}

                      {/* Overlay premium */}
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-90" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <Badge variant="secondary" className="bg-white/90 text-foreground">
                          {project.category}
                        </Badge>
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
                          <Sparkles className="h-3.5 w-3.5" />
                          Après
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardHeader className="space-y-2">
                    <CardTitle className="font-headline text-lg leading-snug md:text-xl">
                      {project.title}
                    </CardTitle>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </CardHeader>

                  <CardFooter className="flex items-center justify-between">
                    <span className="inline-flex items-center text-sm font-medium text-accent">
                      Voir le projet
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>

                    {/* Petit lien conversion discret */}
                    <span className="text-xs text-muted-foreground group-hover:text-primary">
                      Devis gratuit →
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* CTA bas */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/realisations">Voir toutes nos réalisations</Link>
          </Button>

          <Button size="lg" variant="outline" asChild>
            <Link href="/devis">Demander un devis</Link>
          </Button>
        </div>

        {/* Mini SEO (léger, propre, indexable) */}
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
          Rénovation d’appartement, salle de bain et cuisine : nos réalisations “avant / après” illustrent notre méthode,
          la qualité d’exécution et le soin apporté aux finitions à Paris et en Île-de-France.
        </p>
      </div>
    </section>
  )
}
