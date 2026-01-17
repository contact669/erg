"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Search, X } from "lucide-react"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Breadcrumbs from "@/components/breadcrumbs"
import CtaBanner from "@/app/_components/cta-banner"

import { allProjects, projectCategories } from "@/lib/data"
import { PlaceHolderImages } from "@/lib/placeholder-images"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const PROJECTS_PER_PAGE = 9

export default function RealisationsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Tous")
  const [query, setQuery] = useState("")
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE)

  useEffect(() => {
    setVisibleCount(PROJECTS_PER_PAGE)
  }, [activeCategory, query])

  const normalizedQuery = query.trim().toLowerCase()

  const filteredProjects = useMemo(() => {
    const base =
      activeCategory === "Tous"
        ? allProjects
        : allProjects.filter((p) => p.category === activeCategory)

    if (!normalizedQuery) return base

    return base.filter((p) => {
      const hay = `${p.title} ${p.description} ${p.category}`.toLowerCase()
      return hay.includes(normalizedQuery)
    })
  }, [activeCategory, normalizedQuery])

  const projectsToShow = useMemo(
    () => filteredProjects.slice(0, visibleCount),
    [filteredProjects, visibleCount]
  )

  const canLoadMore = visibleCount < filteredProjects.length
  const hasFilters = activeCategory !== "Tous" || !!query

  const resetFilters = () => {
    setActiveCategory("Tous")
    setQuery("")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-grow">
        <Breadcrumbs />

        {/* HERO — très sobre */}
        <section className="border-b bg-secondary/30">
          <div className="container py-12 md:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Réalisations
              </p>

              <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight md:text-5xl">
                Avant / Après : des finitions nettes, un chantier maîtrisé
              </h1>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Rénovation d’appartement, salle de bain, cuisine : une sélection de projets livrés avec méthode,
                précision et souci du détail.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
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

        {/* CONTROLS — clean */}
        <section className="py-10 md:py-12">
          <div className="container">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-headline text-2xl font-semibold tracking-tight md:text-3xl">
                    Explorer
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Filtrez par catégorie ou recherchez un mot-clé.
                  </p>
                </div>

                <div className="w-full md:max-w-sm">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Ex : douche, cuisine, peinture…"
                      className="pl-9 pr-10"
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

              {/* Chips catégorie — plus sobres */}
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip
                  active={activeCategory === "Tous"}
                  onClick={() => setActiveCategory("Tous")}
                >
                  Tous
                </Chip>
                {projectCategories.map((cat) => (
                  <Chip
                    key={cat}
                    active={activeCategory === cat}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </Chip>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">{filteredProjects.length}</span>{" "}
                  {filteredProjects.length > 1 ? "projets" : "projet"}
                </p>

                {hasFilters && (
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
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
                <EmptyState onReset={resetFilters} />
              ) : (
                <>
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      layout
                      className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
                    >
                      {projectsToShow.map((project) => (
                        <motion.div
                          key={project.slug}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.22 }}
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

                  {/* Bloc SEO propre (court + utile) */}
                  <div className="mt-16 rounded-xl border bg-secondary/20 p-8">
                    <h2 className="font-headline text-xl font-semibold tracking-tight md:text-2xl">
                      Une rénovation “clé en main”, du gros œuvre aux finitions
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Planification, coordination, exécution rigoureuse et contrôle qualité : nos réalisations montrent
                      une méthode claire et des finitions soignées. Pour estimer votre projet, demandez un devis : réponse
                      rapide et chiffrage détaillé.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Button asChild>
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

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-sm font-medium transition-colors border",
        active
          ? "bg-foreground text-background border-foreground"
          : "bg-background text-foreground border-border hover:bg-secondary",
      ].join(" ")}
    >
      {children}
    </button>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-xl border bg-secondary/20 p-10 text-center">
      <p className="text-lg font-medium">Aucun projet ne correspond à votre recherche.</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Essayez un autre mot-clé ou réinitialisez les filtres.
      </p>
      <div className="mt-6 flex justify-center">
        <Button variant="outline" onClick={onReset}>
          Réinitialiser
        </Button>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: (typeof allProjects)[0] }) {
  const beforeImage = PlaceHolderImages.find((img) => img.id === project.images.before)
  const afterImage = PlaceHolderImages.find((img) => img.id === project.images.after)

  const [mode, setMode] = useState<"after" | "before">("after")

  const img = mode === "after" ? afterImage : beforeImage
  const alt =
    mode === "after"
      ? project.description
      : `Avant – ${project.description}`

  return (
    <Card className="group h-full overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-64 w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />

          {img ? (
            <Image
              src={img.imageUrl}
              alt={alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              data-ai-hint={img.imageHint}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          ) : (
            <div className="h-full w-full bg-muted" />
          )}

          {/* Toggle Avant/Après — simple & clean */}
          <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2">
            <div className="inline-flex overflow-hidden rounded-full border bg-black/30 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setMode("before")}
                className={[
                  "px-4 py-2 text-sm font-medium transition-colors",
                  mode === "before" ? "text-white bg-white/10" : "text-white/75 hover:text-white",
                ].join(" ")}
              >
                Avant
              </button>
              <button
                type="button"
                onClick={() => setMode("after")}
                className={[
                  "px-4 py-2 text-sm font-medium transition-colors",
                  mode === "after" ? "text-white bg-white/10" : "text-white/75 hover:text-white",
                ].join(" ")}
              >
                Après
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {project.category}
          </p>

          <h3 className="mt-2 font-headline text-xl font-semibold tracking-tight">
            {project.title}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-5">
            <Button variant="link" asChild className="p-0 text-accent hover:text-accent">
              <Link href={`/realisations/${project.slug}`} className="inline-flex items-center gap-2">
                Voir les détails{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
