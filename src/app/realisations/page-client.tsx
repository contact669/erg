"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Search,
  X,
  Sparkles,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Phone,
  Quote,
  MapPin,
  SlidersHorizontal,
  ChevronRight,
  Eye
} from "lucide-react"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Breadcrumbs from "@/components/breadcrumbs"
import CtaBanner from "@/app/_components/cta-banner"
import BeforeAfterSlider from "@/components/ui/before-after-slider"
import { GoogleIcon } from "@/components/icons"

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

  // Count projects per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Tous: allProjects.length }
    allProjects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [])

  const filteredProjects = useMemo(() => {
    const base =
      activeCategory === "Tous"
        ? allProjects
        : allProjects.filter((p) => p.category === activeCategory)

    if (!normalizedQuery) return base

    return base.filter((p) => {
      const hay = `${p.title} ${p.description} ${p.category} ${p.testimonial?.quote || ""}`.toLowerCase()
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

  // Find featured project for showcase (Studio Paris 11)
  const featuredProject = useMemo(() => {
    return allProjects.find((p) => p.slug === "renovation-studio-paris-11") || allProjects[0]
  }, [])

  const featuredBeforeImage = PlaceHolderImages.find(
    (img) => img.id === featuredProject.images.before
  )?.imageUrl || "/images/realisations/renovation-studio-avant.webp"

  const featuredAfterImage = PlaceHolderImages.find(
    (img) => img.id === featuredProject.images.after
  )?.imageUrl || "/images/realisations/renovation-studio-apres.webp"

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50">
      <SiteHeader />

      <main className="flex-grow">
        {/* HERO SECTION — Premium Light Theme */}
        <section className="relative isolate overflow-hidden bg-slate-50 border-b border-slate-200/80 py-12 md:py-16 lg:py-20">
          {/* Subtle Ambient Light Gradients */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-50/80 to-slate-50" />
            <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-slate-200/40 blur-3xl" />
          </div>

          <div className="container relative z-10">
            <div className="mx-auto max-w-4xl text-center space-y-6">
              <div className="flex items-center justify-center">
                <Breadcrumbs />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 text-xs sm:text-sm font-semibold text-amber-700 shadow-sm">
                  <Sparkles className="h-4 w-4 text-amber-600" /> Galerie Projets & Avant / Après
                </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=ERG-Entreprise+de+R%C3%A9novation+Appartement+%26+Salle+de+Bains+%C3%A0+Paris+et+%C3%8Ele-de-France"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-1 text-xs text-slate-800 shadow-sm hover:bg-white"
                >
                  <GoogleIcon className="h-4 w-4" />
                  <span className="font-bold text-amber-600">4.9 / 5</span>
                  <span className="text-slate-500">• 36 avis certifiés</span>
                </a>
              </div>

              <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Nos Réalisations de Rénovation à Paris : <br />
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                  Des Finitions Nettes & Un Chantier Maîtrisé.
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Découvrez nos transformations complètes d'appartements, studios et salles de bain à Paris et en Île-de-France.
                Chaque projet illustre notre rigueur tous corps d'état, le respect des délais et une transparence totale poste par poste.
              </p>

              {/* Trust Badges Bar */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs sm:text-sm font-medium text-slate-700">
                <div className="flex items-center gap-1.5 bg-white/80 border border-slate-200/80 rounded-full px-3.5 py-1.5 shadow-sm">
                  <ShieldCheck className="h-4 w-4 text-amber-600" />
                  <span>Garantie Décennale</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/80 border border-slate-200/80 rounded-full px-3.5 py-1.5 shadow-sm">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <span>Planning Respecté</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/80 border border-slate-200/80 rounded-full px-3.5 py-1.5 shadow-sm">
                  <CheckCircle2 className="h-4 w-4 text-amber-600" />
                  <span>Interlocuteur Unique</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/80 border border-slate-200/80 rounded-full px-3.5 py-1.5 shadow-sm">
                  <MapPin className="h-4 w-4 text-amber-600" />
                  <span>Paris • 92 • 93 • 94</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="h-13 px-7 bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 text-base shadow-lg shadow-amber-500/20 rounded-xl"
                >
                  <Link href="/devis">
                    Estimer mon projet de rénovation <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-13 px-6 border-slate-300 bg-white text-slate-900 hover:bg-slate-100 text-base rounded-xl shadow-sm"
                >
                  <a href="tel:+33699961375">
                    <Phone className="mr-2 h-4 w-4 text-amber-600" />
                    06 99 96 13 75
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED SHOWCASE — Focus on Studio Paris 11 */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200/60">
          <div className="container">
            <div className="mx-auto max-w-6xl">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 lg:p-10 shadow-xl relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Featured Description */}
                  <div className="lg:col-span-6 space-y-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-semibold text-amber-700">
                      <Sparkles className="h-3.5 w-3.5 text-amber-600" /> Projet à la Une • Avant / Après
                    </div>

                    <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                      {featuredProject.title}
                    </h2>

                    <p className="text-slate-600 text-base leading-relaxed">
                      {featuredProject.description}
                    </p>

                    {featuredProject.testimonial && (
                      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 sm:p-5 relative">
                        <Quote className="h-6 w-6 text-amber-500/40 absolute top-4 left-4" />
                        <p className="pl-6 text-xs sm:text-sm text-slate-700 italic font-medium leading-relaxed">
                          "{featuredProject.testimonial.quote}"
                        </p>
                        <p className="pl-6 mt-2 text-xs font-bold text-amber-700">
                          — {featuredProject.testimonial.author}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <Button
                        asChild
                        className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-semibold shadow-md"
                      >
                        <Link href={`/realisations/${featuredProject.slug}`}>
                          Voir la fiche complète du chantier <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                      <span className="text-xs text-slate-500 font-medium">
                        Catégorie : <strong className="text-slate-800">{featuredProject.category}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Interactive Before / After Slider */}
                  <div className="lg:col-span-6">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                      <BeforeAfterSlider
                        beforeImage={featuredBeforeImage}
                        afterImage={featuredAfterImage}
                        beforeLabel="Studio Avant"
                        afterLabel="Studio Après ERG"
                        alt={featuredProject.title}
                        aspectRatio="aspect-[4/3]"
                      />
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 rounded-full bg-white/90 border border-slate-200 px-3.5 py-1 text-[11px] font-semibold text-slate-800 shadow-md backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        Glissez le curseur pour comparer l'Avant / Après
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH & FILTERS BAR — Sticky & Sleek */}
        <section className="sticky top-20 z-30 py-6 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
          <div className="container">
            <div className="mx-auto max-w-6xl space-y-4">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher un mot-clé (ex: studio, douche, parquet, 11e)..."
                    className="pl-10 pr-10 h-11 rounded-xl border-slate-200 bg-slate-50/80 text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:ring-amber-500/20 shadow-inner"
                    aria-label="Rechercher une réalisation"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
                      aria-label="Effacer la recherche"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Counter & Reset */}
                <div className="flex items-center justify-between md:justify-end gap-3 text-xs sm:text-sm font-medium text-slate-600">
                  <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200">
                    <SlidersHorizontal className="h-4 w-4 text-amber-600" />
                    <span>
                      <strong className="text-slate-900 font-bold">{filteredProjects.length}</strong>{" "}
                      {filteredProjects.length > 1 ? "réalisations trouvées" : "réalisation trouvée"}
                    </span>
                  </div>

                  {hasFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="h-9 px-3 text-amber-700 hover:text-amber-800 hover:bg-amber-50 font-semibold text-xs rounded-lg"
                    >
                      Réinitialiser les filtres
                    </Button>
                  )}
                </div>
              </div>

              {/* Category Filter Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Chip
                  active={activeCategory === "Tous"}
                  count={categoryCounts["Tous"]}
                  onClick={() => setActiveCategory("Tous")}
                >
                  Tous les projets
                </Chip>
                {projectCategories.map((cat) => (
                  <Chip
                    key={cat}
                    active={activeCategory === cat}
                    count={categoryCounts[cat] || 0}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS GRID */}
        <section className="py-12 md:py-20 bg-slate-50/50">
          <div className="container">
            <div className="mx-auto max-w-6xl">
              {filteredProjects.length === 0 ? (
                <EmptyState onReset={resetFilters} />
              ) : (
                <>
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      layout
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                      {projectsToShow.map((project) => (
                        <motion.div
                          key={project.slug}
                          layout
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          transition={{ duration: 0.25 }}
                        >
                          <ProjectCard project={project} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  {canLoadMore && (
                    <div className="mt-16 text-center space-y-3">
                      <Button
                        size="lg"
                        onClick={() => setVisibleCount((v) => v + PROJECTS_PER_PAGE)}
                        className="h-12 px-8 bg-white border border-slate-300 text-slate-900 font-bold hover:bg-slate-100 hover:border-slate-400 rounded-xl shadow-md text-sm"
                      >
                        Charger plus de réalisations
                      </Button>
                      <p className="text-xs text-slate-500 font-medium">
                        Affichage de {Math.min(visibleCount, filteredProjects.length)} sur {filteredProjects.length} projets
                      </p>
                    </div>
                  )}

                  {/* SEO & METHODOLOGY CARD */}
                  <div className="mt-20 rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-lg relative overflow-hidden">
                    <div className="max-w-3xl space-y-4">
                      <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-semibold text-amber-700">
                        <ShieldCheck className="h-4 w-4 text-amber-600" /> Savoir-Faire & Exigence ERG
                      </div>

                      <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-slate-900">
                        Une Rénovation "Clé en Main" à Paris & Île-de-France
                      </h2>

                      <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                        Chez ERG Rénovation, nous nous engageons sur un résultat impeccable. Du diagnostic initial au suivi de chantier hebdomadaire jusqu'au nettoyage final, tous nos corps de métier (plomberie, électricité, maçonnerie, menuiserie, peinture) interviennent en synergie sous la conduite d'un <strong className="text-slate-900">interlocuteur unique</strong>.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                          <CheckCircle2 className="h-5 w-5 text-amber-600 mb-2" />
                          <h4 className="font-bold text-sm text-slate-900">Devis Transparent</h4>
                          <p className="text-xs text-slate-600 mt-1">Chiffrage clair poste par poste sans mauvaises surprises.</p>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                          <Clock className="h-5 w-5 text-amber-600 mb-2" />
                          <h4 className="font-bold text-sm text-slate-900">Délais Garantis</h4>
                          <p className="text-xs text-slate-600 mt-1">Planning d'exécution validé et scrupuleusement tenu.</p>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                          <ShieldCheck className="h-5 w-5 text-amber-600 mb-2" />
                          <h4 className="font-bold text-sm text-slate-900">Garantie Décennale</h4>
                          <p className="text-xs text-slate-600 mt-1">Tous vos travaux sous assurance et normes en vigueur.</p>
                        </div>
                      </div>

                      <div className="pt-4 flex flex-wrap gap-4">
                        <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md">
                          <Link href="/devis">
                            Demander un devis gratuit <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-slate-300 text-slate-900 hover:bg-slate-100 rounded-xl">
                          <Link href="/services">Découvrir nos services</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <CtaBanner />
      </main>

      <SiteFooter />
    </div>
  )
}

function Chip({
  active,
  count,
  children,
  onClick,
}: {
  active: boolean
  count?: number
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 border shadow-xs",
        active
          ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300",
      ].join(" ")}
    >
      <span>{children}</span>
      {typeof count === "number" && (
        <span
          className={[
            "rounded-full px-2 py-0.5 text-[11px] font-bold",
            active ? "bg-amber-500 text-slate-950" : "bg-slate-100 text-slate-600",
          ].join(" ")}
        >
          {count}
        </span>
      )}
    </button>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm max-w-xl mx-auto my-12">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 border border-amber-200 mb-4 text-amber-600">
        <Search className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">Aucune réalisation ne correspond à votre recherche</h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
        Essayez d'utiliser un autre mot-clé ou modifiez la catégorie sélectionnée.
      </p>
      <div className="mt-6 flex justify-center">
        <Button
          variant="outline"
          onClick={onReset}
          className="border-slate-300 font-semibold text-slate-900 hover:bg-slate-100 rounded-xl"
        >
          Réinitialiser la recherche
        </Button>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: (typeof allProjects)[0] }) {
  const beforeImage = PlaceHolderImages.find((img) => img.id === project.images.before)
  const afterImage = PlaceHolderImages.find((img) => img.id === project.images.after)

  const [mode, setMode] = useState<"after" | "before">("after")

  const currentImg = mode === "after" ? afterImage : beforeImage
  const imageUrl = currentImg?.imageUrl || (mode === "after" ? "/images/realisations/renovation-studio-apres.webp" : "/images/realisations/renovation-studio-avant.webp")
  const altText = mode === "after" ? project.title : `Avant travaux — ${project.title}`

  return (
    <Card className="group flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0 flex flex-col h-full">
        {/* IMAGE CONTAINER */}
        <div className="relative h-64 w-full overflow-hidden bg-slate-100">
          <Image
            src={imageUrl}
            alt={altText}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />

          {/* Top Category Badge */}
          <div className="absolute top-3 left-3 z-20">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/85 backdrop-blur-md px-3 py-1 text-xs font-bold text-white shadow-md">
              {project.category}
            </span>
          </div>

          {/* Interactive Dual Mode Toggle Pill (Avant / Après) */}
          <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2">
            <div className="inline-flex p-1 rounded-full bg-slate-950/80 border border-white/20 backdrop-blur-md shadow-lg">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setMode("before")
                }}
                className={[
                  "px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200",
                  mode === "before"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/10",
                ].join(" ")}
              >
                Avant
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setMode("after")
                }}
                className={[
                  "px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200",
                  mode === "after"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/10",
                ].join(" ")}
              >
                Après
              </button>
            </div>
          </div>
        </div>

        {/* CARD DETAILS */}
        <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
          <div className="space-y-2">
            <h3 className="font-headline text-xl font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
              {project.title}
            </h3>

            <p className="line-clamp-3 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
              {project.description}
            </p>
          </div>

          {project.testimonial && (
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 relative">
              <p className="text-xs text-slate-700 italic line-clamp-2">
                "{project.testimonial.quote}"
              </p>
              <p className="mt-1 text-[11px] font-bold text-amber-700">
                — {project.testimonial.author}
              </p>
            </div>
          )}

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <Link
              href={`/realisations/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors"
            >
              <span>Voir la réalisation</span>
              <ArrowRight className="h-4 w-4 text-amber-600 transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
              Paris & IDF
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
