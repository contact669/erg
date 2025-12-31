import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { GoogleIcon } from "@/components/icons"
import { Star, ShieldCheck, Clock, Users, Phone } from "lucide-react"

function GoogleReviewBadge() {
  return (
    <a
      href="https://www.google.com/maps/search/?api=1&query=ERG-Entreprise+de+R%C3%A9novation+Appartement+%26+Salle+de+Bains+%C3%A0+Paris+et+%C3%8Ele-de-France"
      target="_blank"
      rel="noopener noreferrer"
      className="mb-6 inline-flex items-center gap-3 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-primary-foreground backdrop-blur-sm transition-colors hover:bg-white/20"
      aria-label="Voir les avis Google ERG Rénovation"
    >
      <GoogleIcon className="h-5 w-5" />
      <div className="flex items-center">
        <span className="font-semibold">4.6</span>
        <span className="mx-1.5">/</span>
        <span className="font-semibold">5</span>
        <div className="ml-2 flex items-center" aria-hidden="true">
          {[...Array(4)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-300 text-amber-300" />
          ))}
          <Star className="h-4 w-4 fill-amber-300/50 text-amber-300" />
        </div>
      </div>
      <span className="h-4 w-px bg-white/20" aria-hidden="true" />
      <span className="text-white/80">36 avis certifiés</span>
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
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/90 backdrop-blur-sm"
        >
          <Icon className="h-4 w-4 text-accent" />
          <span className="font-medium">{title}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image")

  return (
    <section className="relative h-[80vh] min-h-[560px] w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description || "Chantier de rénovation intérieure à Paris"}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          data-ai-hint={heroImage.imageHint}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/45" />

      <div className="container relative z-10 flex h-full flex-col items-center justify-center pt-24 text-center text-primary-foreground md:pt-12">
        <GoogleReviewBadge />

        {/* ✅ H1 SEO (intention claire) */}
        <h1 className="font-headline text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          Entreprise de rénovation à Paris
          <br />
          Appartements & salles de bain clé en main
        </h1>

        {/* ✅ Sous-texte orienté conversion */}
        <p className="mt-6 max-w-2xl text-lg text-primary-foreground/85 md:text-xl">
          ERG Rénovation intervient à Paris 20 et en Île-de-France : rénovation complète, cuisine, salle de bain,
          peinture, sols, électricité & plomberie. Devis gratuit et suivi de chantier structuré.
        </p>

        <ProofChips />

        {/* ✅ CTA : devis en primaire + appel + services */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/devis">Obtenir un devis gratuit</Link>
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

          <Link
            href="/services"
            className="text-sm font-medium text-primary-foreground/90 underline underline-offset-4 hover:text-primary-foreground"
          >
            Découvrir nos services
          </Link>
        </div>

        {/* Micro-rassurance */}
        <p className="mt-5 text-xs text-primary-foreground/70">
          Visite & estimation • Devis détaillé • Réception de fin de chantier
        </p>
      </div>
    </section>
  )
}
