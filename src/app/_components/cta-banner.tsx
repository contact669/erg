import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { ArrowRight, Phone, Sparkles, ShieldCheck, UserCheck, Clock } from "lucide-react"

const PHONE_DISPLAY = "06 99 96 13 75"
const PHONE_TEL = "+33699961375"

export default function CtaBanner() {
  const ctaImage = PlaceHolderImages.find((img) => img.id === "cta-banner-image")

  return (
    <section
      id="cta"
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden bg-slate-50/70 py-20 md:py-28 border-t border-slate-200/80"
    >
      {/* Background Subtle Ambient Glows */}
      {ctaImage && (
        <div aria-hidden className="absolute inset-0 z-0">
          <Image
            src={ctaImage.imageUrl}
            alt=""
            fill
            className="object-cover opacity-10 blur-sm scale-105"
            data-ai-hint={ctaImage.imageHint}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/95 to-slate-50/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-80" />
        </div>
      )}

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 md:p-16 shadow-2xl shadow-slate-200/80 backdrop-blur-xl text-center space-y-8">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-5 py-2 text-xs font-bold uppercase tracking-wider text-amber-700 shadow-sm backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-amber-600 animate-pulse" />
            <span>Paris • 92 • 93 • 94 • Accompagnement sur-mesure</span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h2
              id="cta-title"
              className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]"
            >
              Prêt à Concrétiser{" "}
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                Votre Rénovation ?
              </span>
            </h2>

            <p className="mx-auto max-w-2xl text-base sm:text-lg font-normal leading-relaxed text-slate-600">
              Décrivez votre projet en quelques mots. Nous vous rappelons rapidement avec une estimation claire et un devis détaillé poste par poste.
            </p>
          </div>

          {/* Reassurance Chips */}
          <div className="flex flex-wrap justify-center items-center gap-3 pt-2 text-xs font-semibold text-slate-700">
            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 shadow-xs">
              <ShieldCheck className="h-4 w-4 text-amber-600" />
              <span>Garantie Décennale 10 Ans</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 shadow-xs">
              <UserCheck className="h-4 w-4 text-amber-600" />
              <span>Interlocuteur Unique Dédié</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 shadow-xs">
              <Clock className="h-4 w-4 text-amber-600" />
              <span>Délais & Budget Maîtrisés</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-amber-500 text-slate-950 font-extrabold hover:bg-amber-400 shadow-xl shadow-amber-500/20 px-9 h-14 rounded-2xl text-base"
            >
              <Link href="/devis" aria-label="Demander un devis gratuit">
                Demander un devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-slate-300 bg-white text-slate-900 hover:bg-slate-100 px-8 h-14 rounded-2xl text-base shadow-sm"
            >
              <a href={`tel:${PHONE_TEL}`} aria-label={`Appeler ERG Rénovation au ${PHONE_DISPLAY}`}>
                <Phone className="mr-2 h-5 w-5 text-amber-600" />
                Appeler le {PHONE_DISPLAY}
              </a>
            </Button>
          </div>

          {/* Footer Subtext */}
          <p className="text-xs font-medium text-slate-500 pt-2">
            ⚡ Réponse garantie sous 24h • Visite sur site offerte à Paris & Île-de-France • Devis détaillé et transparent sans engagement
          </p>
        </div>
      </div>
    </section>
  )
}
