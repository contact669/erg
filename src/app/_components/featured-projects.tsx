import Image from "next/image"
import Link from "next/link"
import { featuredProjects } from "@/lib/data"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, MapPin, Layers, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function FeaturedProjects() {
  return (
    <section
      id="realisations"
      aria-labelledby="projects-title"
      className="relative overflow-hidden bg-[#FAF8F5] py-24 md:py-32 border-b border-stone-200/80"
    >
      {/* Editorial Decorative Background Elements */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header Architectural Monograph Style */}
        <header className="mx-auto max-w-4xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-stone-100/90 px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-stone-700 uppercase shadow-xs">
            <Layers className="h-3.5 w-3.5 text-amber-700" />
            <span>Portfolios & Études de Cas</span>
          </div>

          <h2
            id="projects-title"
            className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]"
          >
            Des Réalisations Qui Prouvent{" "}
            <span className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 bg-clip-text text-transparent">
              Notre Exigence
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base sm:text-lg font-normal leading-relaxed text-slate-600">
            Chaque chantier est piloté avec rigueur : préparation, coordination des corps d’état, finitions et réception de fin de travaux.
          </p>

          <div className="pt-2 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-600 font-semibold">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-700" /> Garantie Décennale 10 Ans
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-700" /> Interlocuteur Unique
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-700" /> Finitions Haut de Gamme
            </span>
          </div>
        </header>

        {/* Gallery Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project, idx) => {
            const projectImage = PlaceHolderImages.find((img) => img.id === project.images.after)

            return (
              <Link
                key={project.slug}
                href={`/realisations/${project.slug}`}
                aria-label={`Voir la réalisation : ${project.title}`}
                className="group block"
              >
                <article className="h-full overflow-hidden rounded-3xl border border-stone-200/90 bg-white shadow-xl shadow-stone-200/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-amber-600/40 flex flex-col justify-between">
                  <div>
                    {/* Image Box */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200">
                      {projectImage && (
                        <Image
                          src={projectImage.imageUrl}
                          alt={`Projet de rénovation ${project.title} à Paris et IDF - ${project.description || "Réalisation ERG Rénovation"}`}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          priority={idx === 0}
                        />
                      )}

                      {/* Image Top Overlay Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="rounded-full bg-white/95 border border-slate-200 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-slate-900 shadow-md">
                          {project.category}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-slate-950 shadow-md">
                          <Sparkles className="h-3 w-3" />
                          Avant / Après
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 space-y-3">
                      <h3 className="font-headline text-lg font-bold leading-snug text-slate-900 group-hover:text-amber-700 transition-colors">
                        {project.title}
                      </h3>

                      <p className="line-clamp-2 text-xs font-normal leading-relaxed text-slate-600">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Bar */}
                  <div className="px-6 pb-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-stone-600">
                      <MapPin className="h-3.5 w-3.5 text-amber-700" /> Paris & Île-de-France
                    </span>

                    <span className="inline-flex items-center font-bold text-amber-700 group-hover:text-amber-800">
                      Voir le projet <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-16 text-center space-y-4">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-amber-500 text-slate-950 font-extrabold hover:bg-amber-400 shadow-xl shadow-amber-500/20 px-9 h-14 rounded-2xl text-base"
            >
              <Link href="/realisations">
                Voir toutes nos réalisations <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-stone-300 bg-white text-slate-900 hover:bg-stone-100 px-8 h-14 rounded-2xl text-base shadow-sm"
            >
              <Link href="/devis">
                Demander un devis
              </Link>
            </Button>
          </div>

          <p className="text-xs font-medium text-slate-500">
            Rénovation d'appartement à Paris • Salle de bain clé en main • Devis gratuit • Garantie décennale
          </p>
        </div>
      </div>
    </section>
  )
}
