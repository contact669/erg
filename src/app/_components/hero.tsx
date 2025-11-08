import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
