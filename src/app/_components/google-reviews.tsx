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
import { Star, ArrowRight } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"

function clampRating(rating: unknown) {
  const n = typeof rating === "number" ? rating : Number(rating)
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.min(5, Math.floor(n)))
}

export default function GoogleReviews() {
  const autoplay = React.useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  )

  return (
    <section id="avis" className="bg-secondary py-16 md:py-24" aria-labelledby="reviews-title">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 id="reviews-title" className="font-headline text-3xl font-bold md:text-4xl">
            Ce que nos clients disent de nous
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            La satisfaction de nos clients est notre plus grande fierté. Découvrez quelques avis récents.
          </p>

          <div className="mt-6 flex justify-center">
            <Link
              href="https://www.google.com/maps/search/?api=1&query=ERG-Entreprise+de+R%C3%A9novation+Appartement+%26+Salle+de+Bains+%C3%A0+Paris+et+%C3%8Ele-de-France"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              aria-label="Voir les avis Google ERG Rénovation"
            >
              Voir nos avis Google <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <Carousel opts={{ align: "start", loop: true }} plugins={[autoplay.current]} className="w-full">
          <CarouselContent>
            {testimonials.map((testimonial) => {
              const avatarImage = PlaceHolderImages.find((img) => img.id === testimonial.avatar)
              const rating = clampRating(testimonial.rating)
              const key = `${testimonial.name}-${testimonial.date}`

              return (
                <CarouselItem key={key} className="md:basis-1/2 lg:basis-1/3">
                  <div className="h-full p-1">
                    <Card className="h-full">
                      <CardContent className="flex h-full flex-col justify-between p-6">
                        <div>
                          <div className="flex items-center gap-4">
                            <Avatar>
                              {avatarImage ? (
                                <AvatarImage
                                  src={avatarImage.imageUrl}
                                  alt={`Avatar de ${testimonial.name}`}
                                  data-ai-hint={avatarImage.imageHint}
                                  loading="lazy"
                                />
                              ) : null}
                              <AvatarFallback>
                                {testimonial.name
                                  .split(" ")
                                  .filter(Boolean)
                                  .map((n) => n[0]?.toUpperCase())
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            <div>
                              <p className="font-semibold capitalize">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center" aria-label={`${rating} étoiles sur 5`}>
                            {Array.from({ length: rating }).map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>

                        <p className="mt-4 italic text-foreground">&quot;{testimonial.quote}&quot;</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>

          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </div>
    </section>
  )
}
