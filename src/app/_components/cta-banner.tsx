import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Phone } from "lucide-react"

export default function CtaBanner() {
  const ctaImage = PlaceHolderImages.find((img) => img.id === "cta-banner-image")

  return (
    <section
      id="cta"
      className="relative w-full overflow-hidden bg-primary py-20 text-primary-foreground md:py-28"
      aria-labelledby="cta-title"
    >
      {ctaImage && (
        <Image
          src={ctaImage.imageUrl}
          alt={ctaImage.description || "Projet de rénovation intérieure"}
          fill
          className="object-cover opacity-10"
          data-ai-hint={ctaImage.imageHint}
          sizes="100vw"
        />
      )}

      <div className="container relative z-10 text-center">
        <h2 id="cta-title" className="font-headline text-3xl font-bold md:text-4xl">
          Prêt à donner vie à votre projet ?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/85">
          Contactez-nous dès aujourd&apos;hui pour une consultation gratuite et recevez un devis personnalisé sous 48h.
        </p>

        {/* ✅ Micro-rassurance */}
        <p className="mx-auto mt-3 max-w-2xl text-sm text-primary-foreground/75">
          Garantie décennale • Délais maîtrisés • Interlocuteur unique
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/devis">Demander un devis gratuit</Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            <a href="tel:+33699961375" aria-label="Appeler ERG Rénovation">
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Appeler
              </span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
