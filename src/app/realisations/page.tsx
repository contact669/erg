"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Search, Sparkles, X } from "lucide-react"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Breadcrumbs from "@/components/breadcrumbs"
import CtaBanner from "@/app/_components/cta-banner"

import { allProjects, projectCategories } from "@/lib/data"
import { PlaceHolderImages } from "@/lib/placeholder-images"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const PROJECTS_PER_PAGE = 9

export default function RealisationsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Tous")
  const [query, setQuery] = useState("")
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE)

  // reset pagination when filters change
  useEffect(() => {
    setVisibleCount(PROJECTS_PER_PAGE)
  }, [activeCategory, query])

  const normalizedQuery = query.trim().toLowerCase()

  const filteredProjects = useMemo(() => {
    const byCategory =
      activeCategory === "Tous"
        ? allProjects
        : allProjects.filter((p) => p.category === activeCategory)

    if (!normalizedQuery) return byCategory

    return byCategory.filter((p) => {
      const hay = `${p.title} ${p.description} ${p.category}`.toLowerCase()
      return hay.includes(normalizedQuery)
    })
  }, [activeCategory, normalizedQuery])

  const projectsToShow = useMemo(
    () => filteredProjects.slice(0, visibleCount),
    [filteredProjects, visibleCount]
  )

  const canLoadMore = visibleCount < filteredProjects.length

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-grow">
        <Breadcrumbs />

        {/* HERO — sobre, premium */}
        <section className="border-b bg-secondary/40">
          <div className="container py-14 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Réalisations • Avant / Après
              </p>

              <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight md:text-5xl">
                Des chantiers livrés avec une exigence de finition
              </h1>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                Parcourez une sélection de projets : rénovation d’appartement, salle de bain, cuisine et finitions.
                Chaque réalisation illustre notre méthode, notre précision et notre sens du détail.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
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
            </div>
          </div>
        </section>

        {/* CONTROLS — filtres + recherche (UX + SEO long-tail) */}
        <section className="py-10 md:py-12">
          <div className="container">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-headline text-2xl font-semibold tracking-tight md:text-3xl">
                    Explorer les réalisations
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Filtrez par catégorie ou recherchez un type de projet.
                  </p>
                </div>

                <div className="w-full md:max-w-sm">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Rechercher (ex : douche, cuisine, peinture...)"
                      className="pl-9"
                      aria-label="Rechercher une réalisation"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground hover:text-foreground"
                        aria-label="Effacer la recherche"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Filter chips */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Button
                  variant={activeCategory === "Tous" ? "default" : "outline"}
                  onClick={() => setActiveCategory("Tous")}
                  className="rounded-full"
                >
                  Tous
                </Button>

                {projectCategories.map((cat) => (
                  <Button
                    key={cat}
                    variant={activeCategory === cat ? "default" : "outline"}
                    onClick={() => setActiveCategory(cat)}
                    className="rounded-full"
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              {/* Results summary */}
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">{filteredProjects.length}</span>{" "}
                  {filteredProjects.length > 1 ? "projets" : "projet"} trouvés
                </p>
                {(activeCategory !== "Tous" || query) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setActiveCategory("Tous")
                      setQuery("")
                    }}
                  >
                    Réinitialiser
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="pb-16 md:pb-24">
          <div className="container">
            <div className="mx-auto max-w-6xl">
              {filteredProjects.length === 0 ? (
                <div className="rounded-xl border bg-secondary/30 p-10 text-center">
                  <p className="text-lg font-medium">Aucun projet ne correspond à votre recherche.</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Essayez un autre mot-clé ou réinitialisez les filtres.
                  </p>
                  <div className="mt-6 flex justify-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setActiveCategory("Tous")
                        setQuery("")
                      }}
                    >
                      Réinitialiser
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      layout
                      className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
                    >
                      {projectsToShow.map((project, index) => (
                        <motion.div
                          key={`${project.slug}-${activeCategory}-${normalizedQuery}`}
                          layout
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ duration: 0.25, delay: Math.min(index, 8) * 0.03 }}
                        >
                          <ProjectCard project={project} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  {canLoadMore && (
                    <div className="mt-14 text-center">
                      <Button size="lg" onClick={() => setVisibleCount((v) => v + PROJECTS_PER_PAGE)}>
                        Charger plus
                      </Button>
                      <p className="mt-3 text-xs text-muted-foreground">
                        Affichage : {Math.min(visibleCount, filteredProjects.length)} / {filteredProjects.length}
                      </p>
                    </div>
                  )}

                  {/* Mini contenu SEO propre (court, utile, indexable) */}
                  <div className="mt-16 rounded-xl border bg-secondary/20 p-8">
                    <h2 className="font-headline text-xl font-semibold tracking-tight md:text-2xl">
                      Avant / Après : une rénovation maîtrisée, du gros œuvre aux finitions
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Nos réalisations reflètent une approche “clé en main” : planification, coordination des corps de métier,
                      exécution rigoureuse et contrôle qualité. Pour estimer votre projet (appartement, salle de bain,
                      cuisine, peinture), demandez un devis : réponse rapide et chiffrage clair.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="/devis">Demander un devis</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href="/services">Voir nos services</Link>
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>

      <SiteFooter />
    </div>
  )
}

function ProjectCard({ project }: { project: (typeof allProjects)[0] }) {
  const beforeImage = PlaceHolderImages.find((img) => img.id === project.images.before)
  const afterImage = PlaceHolderImages.find((img) => img.id === project.images.after)

  return (
    <Card className="group h-full overflow-hidden">
      <CardContent className="p-0">
        <Tabs defaultValue="after" className="relative w-full">
          <div className="relative h-64 w-full overflow-hidden">
            {/* Overlay premium */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />

            <TabsContent value="after" className="m-0 h-full">
              {afterImage ? (
                <Image
                  src={afterImage.imageUrl}
                  alt={project.description}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  data-ai-hint={afterImage.imageHint}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
            </TabsContent>

            <TabsContent value="before" className="m-0 h-full">
              {beforeImage ? (
                <Image
                  src={beforeImage.imageUrl}
                  alt={`Avant - ${project.description}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  data-ai-hint={beforeImage.imageHint}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
            </TabsContent>

            {/* Tabs */}
            <TabsList className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 bg-black/30 backdrop-blur-md">
              <TabsTrigger value="before" className="text-white/80 data-[state=active]:text-white">
                Avant
              </TabsTrigger>
              <TabsTrigger value="after" className="text-white/80 data-[state=active]:text-white">
                <Sparkles className="mr-2 h-4 w-4 text-amber-300" />
                Après
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </CardContent>

      <div className="flex flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="secondary" className="w-fit">
            {project.category}
          </Badge>
        </div>

        <h3 className="pt-3 font-headline text-xl font-semibold tracking-tight">
          {project.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <CardFooter className="mt-5 p-0">
          <Button variant="link" asChild className="p-0 text-accent hover:text-accent">
            <Link href={`/realisations/${project.slug}`} className="inline-flex items-center gap-2">
              Voir les détails <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}
