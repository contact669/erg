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
import { Star, ArrowRight, Quote } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"

function clampRating(rating: unknown) {
  const n = typeof rating === "number" ? rating : Number(rating)
  if (!Number.isFinite(n)) return 0
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
      delay: 5200,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  )

  // Mini stats (optionnel) à partir de tes datas locales
  const stats = React.useMemo(() => {
    const ratings = testimonials.map((t) => clampRating(t.rating)).filter((n) => n > 0)
    const avg =
      ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0
    return {
      count: testimonials.length,
      avg: avg ? Math.round(avg * 10) / 10 : 0,
    }
  }, [])

  return (
    <section
      id="avis"
      aria-labelledby="reviews-title"
      className="border-t bg-secondary py-16 md:py-20 lg:py-24"
    >
      <div className="container">
        {/* Header */}
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-medium tracking-wider text-muted-foreground">
            AVIS CLIENTS • GOOGLE • RÉNOVATION À PARIS & ÎLE-DE-FRANCE
          </p>

          <h2
            id="reviews-title"
            className="mt-3 font-headline text-3xl font-bold tracking-tight md:text-4xl"
          >
            Ils parlent de nous, en toute transparence
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Notre priorité : un chantier maîtrisé, des finitions soignées et une expérience fluide.
            Voici quelques retours récents.
          </p>

          {/* Micro-preuve */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {stats.avg > 0 && (
              <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm">
                <span className="font-medium">{stats.avg}/5</span>
                <span className="text-muted-foreground">sur {stats.count} avis</span>
              </span>
            )}
            <Link
              href={getGoogleReviewsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm font-medium text-primary hover:bg-primary/5"
              aria-label="Voir les avis Google ERG Rénovation"
            >
              Voir nos avis Google <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        {/* Carousel */}
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial) => {
              const avatarImage = PlaceHolderImages.find((img) => img.id === testimonial.avatar)
              const rating = clampRating(testimonial.rating)
              const key = `${testimonial.name}-${testimonial.date}`

              return (
                <CarouselItem
                  key={key}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="h-full overflow-hidden border bg-background">
                    <CardContent className="flex h-full flex-col p-6">
                      {/* Header card */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10 border">
                            {avatarImage ? (
                              <AvatarImage
                                src={avatarImage.imageUrl}
                                alt={`Avatar de ${testimonial.name}`}
                                data-ai-hint={avatarImage.imageHint}
                                loading="lazy"
                              />
                            ) : null}
                            <AvatarFallback className="text-xs">
                              {initials(testimonial.name)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0">
                            <p className="truncate font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                          </div>
                        </div>

                        <Quote className="h-5 w-5 text-muted-foreground/60" aria-hidden />
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
                                ? "fill-amber-400 text-amber-400"
                                : "fill-transparent text-muted-foreground/35"
                            )}
                            aria-hidden
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                        <span className="line-clamp-5 italic">
                          &quot;{testimonial.quote}&quot;
                        </span>
                      </p>

                      {/* Footer light */}
                      <div className="mt-5 border-t pt-4">
                        <Link
                          href="/devis"
                          className="inline-flex items-center text-sm font-medium text-accent hover:underline"
                          aria-label="Demander un devis gratuit"
                        >
                          Demander un devis <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )
            })}
          </CarouselContent>

          {/* Nav desktop only */}
          <CarouselPrevious className="hidden lg:flex" aria-label="Avis précédent" />
          <CarouselNext className="hidden lg:flex" aria-label="Avis suivant" />
        </Carousel>

        {/* Mini SEO discret */}
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
          Avis clients sur nos rénovations (appartement, salle de bain, cuisine) : qualité, suivi de chantier et finitions.
          Intervention à Paris et en Île-de-France (92, 93, 94).
        </p>
      </div>
    </section>
  )
}
