'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { testimonials } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, Verified } from 'lucide-react';
import { GoogleIcon } from '@/components/icons';
import Autoplay from 'embla-carousel-autoplay';

export default function GoogleReviews() {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className='flex justify-center items-center gap-2 mb-4'>
            <GoogleIcon className="h-8 w-8" />
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Ce que nos clients disent de nous
            </h2>
          </div>
          <p className="mt-4 text-lg text-muted-foreground">
            La satisfaction de nos clients est notre plus grande fierté.
            Découvrez nos derniers avis certifiés sur Google.
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => {
              const avatarImage = PlaceHolderImages.find(
                (img) => img.id === testimonial.avatar
              );
              return (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1 h-full">
                    <Card className="h-full">
                      <CardContent className="flex h-full flex-col justify-between p-6">
                        <div>
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    {avatarImage && (
                                    <AvatarImage
                                        src={avatarImage.imageUrl}
                                        alt={`Avatar de ${testimonial.name}`}
                                        data-ai-hint={avatarImage.imageHint}
                                    />
                                    )}
                                    <AvatarFallback>
                                    {testimonial.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold capitalize">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                    {testimonial.date}
                                    </p>
                                </div>
                            </div>
                             <div className="mt-4 flex items-center">
                                {Array(testimonial.rating).fill(0).map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                        </div>

                        <p className="italic text-foreground mt-4">
                          &quot;{testimonial.quote}&quot;
                        </p>
                       
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </div>
    </section>
  );
}
