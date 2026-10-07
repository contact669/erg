"use client"

import * as React from "react"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { testimonials } from "@/lib/data"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { GoogleIcon } from "@/components/icons"
import { Star, ArrowRight, Quote, CheckCircle2, ShieldCheck } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"

function clampRating(rating: unknown) {
  const n = typeof rating === "number" ? rating : Number(rating)
  if (!Number.isFinite(n)) return 5
  return Math.max(0, Math.min(5, Math.round(n)))
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("")
}

function getGoogleReviewsUrl() {
  return "https://www.google.com/maps/search/?api=1&query=ERG-Entreprise+de+R%C3%A9novation+Appartement+%26+Salle+de+Bains+%C3%A0+Paris+et+%C3%8Ele-de-France"
}

export default function GoogleReviews() {
  const autoplay = React.useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  )

  const [stats, setStats] = React.useState<{ count: number; avg: number } | null>(null)
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
    const ratings = testimonials.map((t) => clampRating(t.rating)).filter((n) => n > 0)
    const avg =
      ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 4.9
    setStats({
      count: 36,
      avg: 4.9,
    })
  }, [])

  return (
    <section
      id="avis"
      aria-labelledby="reviews-title"
      className="relative overflow-hidden bg-slate-50/70 py-24 md:py-32 border-b border-slate-200/80"
    >
      {/* Background Subtle Glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header */}
        <header className="mx-auto mb-16 max-w-4xl text-center space-y-5">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-white border border-slate-200 px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm backdrop-blur-md">
            <GoogleIcon className="h-4 w-4" />
            <span>Avis Clients Certifiés • Google Reviews</span>
          </div>

          <h2
            id="reviews-title"
            className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]"
          >
            Ils Parlent de Nous,{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
              En Toute Transparence
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base sm:text-lg font-normal leading-relaxed text-slate-600">
            Notre priorité : un chantier maîtrisé, des finitions soignées et une expérience fluide. Voici quelques témoignages de nos clients à Paris et Île-de-France.
          </p>

          {/* Google Score Banner */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-white border border-slate-200/90 px-5 py-2.5 shadow-md">
              <GoogleIcon className="h-5 w-5" />
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base text-slate-900">4.9 / 5</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-500">Basé sur 36+ avis Google certifiés</span>
              </div>
            </div>

            <Link
              href={getGoogleReviewsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-white border border-slate-300 text-slate-900 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 px-5 py-3 text-xs font-bold transition-all shadow-sm"
              aria-label="Voir tous les avis Google ERG Rénovation"
            >
              Voir nos avis Google <ArrowRight className="h-4 w-4 text-amber-600" />
            </Link>
          </div>
        </header>

        {/* Carousel */}
        <div className="relative mx-auto max-w-6xl">
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[autoplay.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-3 md:-ml-6">
              {testimonials.map((testimonial) => {
                const avatarImage = PlaceHolderImages.find((img) => img.id === testimonial.avatar)
                const rating = clampRating(testimonial.rating)
                const key = `${testimonial.name}-${testimonial.date}`

                return (
                  <CarouselItem
                    key={key}
                    className="pl-3 md:pl-6 md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="h-full overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xl shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-2xl flex flex-col justify-between">
                      <CardContent className="p-0 flex h-full flex-col justify-between space-y-6">
                        <div>
                          {/* Header card */}
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-12 w-12 border-2 border-amber-500/30 shadow-sm">
                                {avatarImage ? (
                                  <AvatarImage
                                    src={avatarImage.imageUrl}
                                    alt={`Avatar de ${testimonial.name}`}
                                    data-ai-hint={avatarImage.imageHint}
                                    loading="lazy"
                                  />
                                ) : null}
                                <AvatarFallback className="bg-amber-500/10 text-amber-700 font-bold text-sm">
                                  {initials(testimonial.name)}
                                </AvatarFallback>
                              </Avatar>

                              <div className="min-w-0">
                                <p className="truncate font-bold text-slate-900 text-base">{testimonial.name}</p>
                                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                                  <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Avis vérifié
                                </span>
                              </div>
                            </div>

                            <Quote className="h-6 w-6 text-amber-500/30 shrink-0" aria-hidden />
                          </div>

                          {/* Stars */}
                          <div
                            className="mt-4 flex items-center gap-1"
                            aria-label={`${rating} étoiles sur 5`}
                          >
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-4 w-4",
                                  i < rating
                                    ? "fill-amber-500 text-amber-500"
                                    : "fill-transparent text-slate-300"
                                )}
                                aria-hidden
                              />
                            ))}
                          </div>

                          {/* Quote */}
                          <p className="mt-4 text-sm font-normal leading-relaxed text-slate-600 italic">
                            &quot;{testimonial.quote}&quot;
                          </p>
                        </div>

                        {/* Footer card */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                          <span>Paris & Île-de-France</span>
                          <span className="text-amber-600 font-bold">{testimonial.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                )
              })}
            </CarouselContent>

            {/* Nav Desktop Controls */}
            <div className="mt-8 flex justify-center gap-3 lg:hidden">
              <CarouselPrevious className="static translate-y-0" aria-label="Avis précédent" />
              <CarouselNext className="static translate-y-0" aria-label="Avis suivant" />
            </div>
            <CarouselPrevious className="hidden lg:flex -left-6" aria-label="Avis précédent" />
            <CarouselNext className="hidden lg:flex -right-6" aria-label="Avis suivant" />
          </Carousel>
        </div>

        {/* Bottom micro SEO */}
        <p className="mx-auto mt-12 max-w-3xl text-center text-xs font-medium text-slate-500">
          Avis vérifiés Google par nos clients (rénovation d'appartement, salle de bain, cuisine) à Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93) et Val-de-Marne (94).
        </p>
      </div>
    </section>
  )
}
