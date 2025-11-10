import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { GoogleIcon } from '@/components/icons';
import { Star } from 'lucide-react';

function GoogleReviewBadge() {
    return (
        <a 
            href="https://www.google.com/maps/search/?api=1&query=ERG-Entreprise+de+Rénovation+Appartement+%26+Salle+de+Bains+%C3%A0+Paris+et+%C3%8Ele-de-France" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mb-6 inline-flex items-center gap-3 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-primary-foreground backdrop-blur-sm transition-colors hover:bg-white/20"
        >
            <GoogleIcon className="h-5 w-5" />
            <div className="flex items-center">
                <span className="font-semibold">4.6</span>
                <span className="mx-1.5">/</span>
                <span className="font-semibold">5</span>
                <div className='ml-2 flex items-center'>
                    {[...Array(4)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-300 text-amber-300" />)}
                    <Star className="h-4 w-4 fill-amber-300/50 text-amber-300" />
                </div>
            </div>
            <span className="h-4 w-px bg-white/20" aria-hidden="true"></span>
            <span className="text-white/80">36 avis certifiés</span>
        </a>
    )
}


export default function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

  return (
    <section className="relative h-[80vh] min-h-[500px] w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-primary/60" />
      <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
        <GoogleReviewBadge />
        <h1 className="font-headline text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          L&apos;art de la rénovation,
          <br />
          l&apos;excellence à votre service
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80 md:text-xl">
          ERG Rénovation transforme vos espaces de vie à Paris 20 et en Île-de-France.
          Qualité, respect des délais et satisfaction garantie.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/services">Découvrir nos services</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary">
            <Link href="/devis">Obtenir un devis gratuit</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
