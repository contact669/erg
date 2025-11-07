import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function CtaBanner() {
  const ctaImage = PlaceHolderImages.find(
    (img) => img.id === 'cta-banner-image'
  );

  return (
    <section className="relative w-full overflow-hidden bg-primary text-primary-foreground py-20 md:py-28">
      {ctaImage && (
        <Image
          src={ctaImage.imageUrl}
          alt={ctaImage.description}
          fill
          className="object-cover opacity-10"
          data-ai-hint={ctaImage.imageHint}
        />
      )}
      <div className="container relative z-10 text-center">
        <h2 className="font-headline text-3xl font-bold md:text-4xl">
          Prêt à donner vie à votre projet ?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
          Contactez-nous dès aujourd&apos;hui pour une consultation gratuite et recevez un devis personnalisé sous 48h.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/devis">Demander un devis gratuit</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
