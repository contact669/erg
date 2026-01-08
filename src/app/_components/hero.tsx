import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { GoogleIcon } from "@/components/icons"
import { Star, ShieldCheck, Clock, Users, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

function Stars({ rating = 5 }: { rating?: number }) {
  const r = Math.max(0, Math.min(5, Math.round(rating)))
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < r ? "fill-amber-300 text-amber-300" : "fill-transparent text-white/35"
          )}
        />
      ))}
    </div>
  )
}

function GoogleReviewBadge() {
  return (
    <a
      href="https://www.google.com/maps/search/?api=1&query=ERG-Entreprise+de+R%C3%A9novation+Appartement+%26+Salle+de+Bains+%C3%A0+Paris+et+%C3%8Ele-de-France"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-primary-foreground backdrop-blur-md transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      aria-label="Voir les avis Google ERG Rénovation"
    >
      <GoogleIcon className="h-5 w-5 opacity-95" />
      <span className="font-semibold">4.6</span>
      <span className="text-white/70">/</span>
      <span className="font-semibold">5</span>
      <Stars rating={5} />
      <span className="mx-1 hidden h-4 w-px bg-white/20 sm:inline" aria-hidden="true" />
      <span className="hidden text-white/80 sm:inline">36 avis certifiés</span>
      <span className="sr-only">36 avis certifiés</span>
      <span className="ml-1 inline-flex items-center text-white/80 transition group-hover:translate-x-0.5">
        <span className="sr-only">Voir</span>
      </span>
    </a>
  )
}

function ProofChips() {
  const items = [
    { icon: ShieldCheck, title: "Garantie décennale" },
    { icon: Clock, title: "Délais maîtrisés" },
    { icon: Users, title: "Interlocuteur unique" },
  ]

  return (
    <ul className="mt-6 flex flex-wrap justify-center gap-2">
      {items.map(({ icon: Icon, title }) => (
        <li
          key={title}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/90 backdrop-blur-md"
        >
          <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
          <span className="font-medium">{title}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image")

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate w-full overflow-hidden"
    >
      {/* Hauteur responsive plus “safe” */}
      <div className="relative min-h-[560px] md:min-h-[620px] lg:min-h-[720px]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description || "Chantier de rénovation intérieure à Paris"}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            data-ai-hint={heroImage.imageHint}
          />
        )}

        {/* Overlay premium : dégradé + vignette douce */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/55 via-primary/45 to-primary/70" />
        <div className="absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)] bg-black/35" />

        {/* Contenu */}
        <div className="container relative z-10 flex min-h-[560px] flex-col items-center justify-center px-4 py-24 text-center text-primary-foreground md:min-h-[620px] md:py-24 lg:min-h-[720px]">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
            <GoogleReviewBadge />

            {/* H1 SEO : clair, court, puissant */}
            <h1
              id="hero-title"
              className="mt-6 font-headline text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl"
            >
              Entreprise de rénovation à Paris{' '}
              <span className="text-primary-foreground/95">
                Appartements & salles de bain clé en main
              </span>
            </h1>

            {/* Sous-texte : plus clean, moins listé */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/85 md:text-xl">
              Rénovation intérieure à Paris 20 et en Île-de-France : conception, coordination, exécution.
              Un suivi de chantier structuré, des finitions soignées, un devis détaillé.
            </p>

            <ProofChips />

            {/* CTA : hiérarchie + lisibilité */}
            <div className="mt-9 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto"
              >
                <Link href="/devis">Obtenir un devis gratuit</Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-primary-foreground/70 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary sm:w-auto"
              >
                <a href="tel:+33699961375" aria-label="Appeler ERG Rénovation">
                  <span className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Appeler
                  </span>
                </a>
              </Button>

              <Link
                href="/services"
                className="mt-1 text-sm font-medium text-primary-foreground/90 underline underline-offset-4 hover:text-primary-foreground sm:mt-0"
              >
                Découvrir nos services
              </Link>
            </div>

            {/* Micro-rassurance */}
            <p className="mt-6 text-xs text-primary-foreground/70">
              Visite & estimation • Devis poste par poste • Réception de fin de chantier
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
