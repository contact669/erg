import Image from "next/image"
import Link from "next/link"
import { featuredProjects } from "@/lib/data"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export default function FeaturedProjects() {
  return (
    <section id="realisations" className="py-16 md:py-24" aria-labelledby="projects-title">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 id="projects-title" className="font-headline text-3xl font-bold md:text-4xl">
            Nos réalisations parlent pour nous
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Découvrez quelques-uns de nos projets récents et la qualité de notre savoir-faire.
          </p>

          {/* ✅ Mini contenu SEO indexable */}
          <p className="mt-4 text-sm text-muted-foreground">
            Avant / après, finitions, optimisation d’espace : nos réalisations illustrent notre expertise en rénovation
            d’appartement, salle de bain et cuisine à Paris et en Île-de-France.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project, idx) => {
            const projectImage = PlaceHolderImages.find((img) => img.id === project.images.after)

            return (
              <Card key={project.slug} className="group overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-56 w-full">
                    {projectImage && (
                      <Image
                        src={projectImage.imageUrl}
                        alt={project.description || `${project.title} – réalisation ERG Rénovation`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={projectImage.imageHint}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        // ✅ Si cette section est visible très tôt, ça aide le LCP; sinon retire.
                        priority={idx === 0}
                      />
                    )}
                  </div>
                </CardContent>

                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    {project.category}
                  </Badge>
                  <CardTitle className="pt-2 font-headline text-xl">{project.title}</CardTitle>
                </CardHeader>

                <CardFooter className="flex items-center justify-between gap-3">
                  <Button variant="link" asChild className="p-0 text-accent hover:text-accent">
                    <Link href={`/realisations/${project.slug}`} aria-label={`Voir le projet : ${project.title}`}>
                      Voir le projet <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  {/* ✅ Mini CTA conversion */}
                  <Link
                    href="/devis"
                    className="text-xs font-medium text-muted-foreground hover:text-primary"
                    aria-label="Demander un devis gratuit"
                  >
                    Devis gratuit →
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/realisations">Toutes nos réalisations</Link>
          </Button>

          <Button size="lg" variant="outline" asChild>
            <Link href="/devis">Demander un devis</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
