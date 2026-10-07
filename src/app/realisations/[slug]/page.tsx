import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Breadcrumbs from "@/components/breadcrumbs"
import AnimatedSection from "@/components/animated-section"
import CtaBanner from "@/app/_components/cta-banner"

import { allProjects } from "@/lib/data"
import { PlaceHolderImages } from "@/lib/placeholder-images"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ArrowRight, Sparkles, Star, Quote, Award, ShieldCheck, Clock } from "lucide-react"

// ✅ SSG params
export async function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }))
}

// ✅ Metadata propre + description courte
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = allProjects.find((p) => p.slug === params.slug)

  if (!project) {
    return { title: "Projet non trouvé" }
  }

  const description = `Avant / Après : ${project.title}. ${project.description}`.slice(0, 155)

  return {
    title: `${project.title}`,
    description,
    alternates: {
      canonical: `https://erg-renovation.fr/realisations/${project.slug}`,
    },
    openGraph: {
      title: `${project.title}`,
      description,
      type: "article",
      url: `https://erg-renovation.fr/realisations/${project.slug}`,
    },
  }
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = allProjects.find((p) => p.slug === params.slug)
  if (!project) notFound()

  const beforeImage = PlaceHolderImages.find((p) => p.id === project.images.before)
  const afterImage = PlaceHolderImages.find((p) => p.id === project.images.after)

  const relatedProjects = allProjects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3)

  const hasDetails =
    Boolean(project.details?.challenge) ||
    Boolean(project.details?.solution) ||
    Boolean(project.details?.keyPoints?.length)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-grow">
        {/* HERO — premium, sobre */}
        <section className="border-b bg-secondary/35">
          <div className="container py-14 md:py-20">
            <div className="mx-auto max-w-4xl text-center">
              <Breadcrumbs />
              <Badge variant="secondary" className="mt-4">
                {project.category}
              </Badge>

              <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight md:text-5xl">
                {project.title}
              </h1>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                {project.description}
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md rounded-xl">
                  <Link href="/devis">
                    Demander un devis <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="tel:+33699961375" aria-label="Appeler ERG Rénovation">
                    Appeler
                  </a>
                </Button>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Chantier livré • Finitions soignées • Garantie décennale
              </p>
            </div>
          </div>
        </section>

        {/* AVANT / APRÈS — rendu “magazine”, très clean */}
        <AnimatedSection>
          <section className="py-14 md:py-20">
            <div className="container">
              <div className="mx-auto max-w-6xl">
                <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                  <Tabs defaultValue="after" className="w-full">
                    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="font-headline text-2xl font-semibold tracking-tight">
                          Avant / Après
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Comparez le rendu final : volumes, matériaux, lumière et finitions.
                        </p>
                      </div>

                      <TabsList className="bg-secondary/60">
                        <TabsTrigger value="before">Avant</TabsTrigger>
                        <TabsTrigger value="after">
                          <Sparkles className="mr-2 h-4 w-4 text-amber-300" />
                          Après
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <div className="relative">
                      {/* overlay */}
                      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />

                      <TabsContent value="before" className="m-0">
                        <div className="relative aspect-video w-full bg-muted">
                          {beforeImage && (
                            <Image
                              src={beforeImage.imageUrl}
                              alt={`Avant - ${project.title}`}
                              fill
                              className="object-cover"
                              data-ai-hint={beforeImage.imageHint}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 1200px"
                              priority
                            />
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="after" className="m-0">
                        <div className="relative aspect-video w-full bg-muted">
                          {afterImage && (
                            <Image
                              src={afterImage.imageUrl}
                              alt={`Après - ${project.title}`}
                              fill
                              className="object-cover"
                              data-ai-hint={afterImage.imageHint}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 1200px"
                              priority
                            />
                          )}
                        </div>
                      </TabsContent>

                      {/* micro badges */}
                      <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
                        <span className="rounded-full bg-black/35 px-3 py-1 text-xs text-white/90 backdrop-blur">
                          {project.category}
                        </span>
                        <span className="rounded-full bg-black/35 px-3 py-1 text-xs text-white/90 backdrop-blur">
                          Projet livré
                        </span>
                      </div>
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* DETAILS + SIDEBAR */}
        {(hasDetails || project.testimonial) && (
          <section className="pb-16 md:pb-24">
            <div className="container">
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-14">
                {/* Main */}
                <div className="lg:col-span-2 space-y-12">
                  {project.details?.challenge && (
                    <div>
                      <h2 className="font-headline text-3xl font-bold tracking-tight">Le défi</h2>
                      <div className="prose mt-4 max-w-none text-muted-foreground prose-p:my-4">
                        {project.details.challenge}
                      </div>
                    </div>
                  )}

                  {project.details?.solution && (
                    <div>
                      <h2 className="font-headline text-3xl font-bold tracking-tight">Notre solution</h2>
                      <div className="prose mt-4 max-w-none text-muted-foreground prose-p:my-4">
                        {project.details.solution}
                      </div>
                    </div>
                  )}

                  {project.testimonial && (
                    <div>
                      <h2 className="font-headline text-3xl font-bold tracking-tight">Avis client</h2>

                      <Card className="mt-6 overflow-hidden border bg-secondary/30">
                        <CardContent className="relative p-7 md:p-8">
                          <Quote className="absolute right-6 top-6 h-6 w-6 text-primary/30" />

                          <div className="mb-3 flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>

                          <p className="text-base italic leading-relaxed md:text-lg">
                            &ldquo;{project.testimonial.quote}&rdquo;
                          </p>

                          <p className="mt-4 font-semibold text-primary">
                            {project.testimonial.author}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <aside className="space-y-8 lg:sticky lg:top-28 h-fit">
                  {/* Points clés */}
                  {project.details?.keyPoints?.length ? (
                    <Card className="bg-secondary/35">
                      <CardHeader>
                        <CardTitle className="font-headline text-xl">Points clés du projet</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {project.details.keyPoints.map((point) => (
                          <div key={point.title} className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-md bg-background text-primary">
                              <point.icon className="h-5 w-5" />
                            </div>
                            <div className="leading-tight">
                              <p className="text-sm font-semibold text-foreground">{point.title}</p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ) : null}

                  {/* Qualité (universel) */}
                  <Card className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="font-headline text-xl">Notre engagement</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-amber-600" />
                        <span>Finitions soignées & contrôle qualité</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-amber-600" />
                        <span>Travaux couverts par garantie décennale</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-600" />
                        <span>Organisation & coordination des étapes</span>
                      </div>

                      <div className="pt-4">
                        <Button asChild className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md">
                          <Link href="/devis">Demander un devis gratuit</Link>
                        </Button>
                        <p className="mt-3 text-xs text-muted-foreground">
                          Réponse rapide • Chiffrage clair • Visite sur site
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </aside>
              </div>
            </div>
          </section>
        )}

        {/* RELATED */}
        {relatedProjects.length > 0 && (
          <AnimatedSection>
            <section className="border-t bg-secondary/25 py-16 md:py-24">
              <div className="container">
                <div className="mx-auto max-w-6xl">
                  <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight">
                      Autres réalisations similaires
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
                      D’autres projets dans la même catégorie, avec la même exigence de finition.
                    </p>
                  </div>

                  <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedProjects.map((p) => (
                      <RelatedProjectCard key={p.slug} project={p} />
                    ))}
                  </div>

                  <div className="mt-12 text-center">
                    <Button asChild size="lg" variant="outline">
                      <Link href="/realisations">Voir toutes nos réalisations</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </AnimatedSection>
        )}
        <CtaBanner />
      </main>

      <SiteFooter />
    </div>
  )
}

function RelatedProjectCard({ project }: { project: (typeof allProjects)[0] }) {
  const image = PlaceHolderImages.find((p) => p.id === project.images.after)

  return (
    <Link href={`/realisations/${project.slug}`} className="group block">
      <Card className={cn("h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl")}>
        <div className="relative h-56 w-full bg-muted">
          {image && (
            <>
              <Image
                src={image.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={image.imageHint}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
            </>
          )}

          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-black/35 text-white backdrop-blur">
              {project.category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="font-headline text-xl font-semibold tracking-tight group-hover:text-amber-600">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-0">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 group-hover:underline">
            Voir le projet
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
