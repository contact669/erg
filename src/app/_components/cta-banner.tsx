import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { ArrowRight, Phone } from "lucide-react"

const PHONE_DISPLAY = "06 99 96 13 75"
const PHONE_TEL = "+33699961375"

export default function CtaBanner() {
  const ctaImage = PlaceHolderImages.find((img) => img.id === "cta-banner-image")

  return (
    <section
      id="cta"
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden border-t bg-primary text-primary-foreground"
    >
      {/* Décor : image + overlays (non-intrusif, stable) */}
      {ctaImage && (
        <div aria-hidden className="absolute inset-0">
          <Image
            src={ctaImage.imageUrl}
            alt=""
            fill
            className="object-cover opacity-15"
            data-ai-hint={ctaImage.imageHint}
            sizes="100vw"
            // image décorative : pas de priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/85 to-primary" />
          <div className="absolute inset-0 [background:radial-gradient(60%_50%_at_50%_30%,rgba(255,255,255,0.10),transparent_70%)]" />
        </div>
      )}

      <div className="container relative py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium tracking-wider text-primary-foreground/80">
            PARIS • 92 • 93 • 94
          </p>

          <h2
            id="cta-title"
            className="mt-3 font-headline text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          >
            Prêt à concrétiser votre rénovation ?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/85 md:text-lg">
            Décrivez votre projet en quelques mots. Nous vous rappelons rapidement avec une estimation claire et un devis
            détaillé.
          </p>

          {/* Micro-rassurance (court, lisible, SEO-friendly) */}
          <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-primary-foreground/80">
            <li className="rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1">
              Garantie décennale
            </li>
            <li className="rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1">
              Interlocuteur unique
            </li>
            <li className="rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1">
              Délais maîtrisés
            </li>
          </ul>

          {/* CTA */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/devis" aria-label="Demander un devis gratuit">
                Demander un devis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <a href={`tel:${PHONE_TEL}`} aria-label={`Appeler ERG Rénovation au ${PHONE_DISPLAY}`}>
                <span className="inline-flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  {PHONE_DISPLAY}
                </span>
              </a>
            </Button>
          </div>

          {/* “Small print” utile (sans blabla) */}
          <p className="mt-4 text-xs text-primary-foreground/70">
            Réponse rapide • Visite sur site si nécessaire • Devis détaillé et transparent
          </p>
        </div>
      </div>
    </section>
  )
}
