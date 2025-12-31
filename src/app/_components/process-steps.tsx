import Link from "next/link"
import { processSteps } from "@/lib/data"
import { Button } from "@/components/ui/button"

export default function ProcessSteps() {
  return (
    <section
      id="process"
      className="bg-secondary py-16 md:py-24"
      aria-labelledby="process-title"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="process-title" className="font-headline text-3xl font-bold md:text-4xl">
            Votre projet, simplifié en 4 étapes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            De la première idée à la livraison finale, nous assurons un suivi rigoureux et une communication transparente.
          </p>

          {/* ✅ Mini contenu SEO indexable */}
          <p className="mt-4 text-sm text-muted-foreground">
            Rénovation d’appartement, salle de bain ou cuisine : notre méthode garantit un chantier maîtrisé, des délais
            annoncés et une réception de fin de travaux propre.
          </p>
        </div>

        <div className="relative mt-12">
          {/* Ligne centrale (desktop) */}
          <div className="pointer-events-none absolute left-1/2 top-10 hidden h-[calc(100%-2.5rem)] w-px -translate-x-1/2 bg-border md:block" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="relative flex justify-center">
                  <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-background ring-8 ring-background">
                    <span className="font-headline text-2xl font-bold text-accent" aria-hidden="true">
                      {String(step.step).padStart(2, "0")}
                    </span>
                    <span className="sr-only">Étape {step.step}</span>
                  </div>
                </div>

                <h3 className="mt-6 font-headline text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          {/* ✅ CTA conversion */}
          <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center">
            <Button asChild className="min-w-[220px]">
              <Link href="/devis">Demander un devis gratuit</Link>
            </Button>
            <p className="text-xs text-muted-foreground">
              Devis détaillé • Planning clair • Interlocuteur unique
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
