import Link from "next/link"
import { processSteps } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ProcessSteps() {
  return (
    <section
      id="process"
      className="border-y bg-secondary/40 py-16 md:py-24"
      aria-labelledby="process-title"
    >
      <div className="container">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-primary/90">
            Méthode de travail
          </p>

          <h2
            id="process-title"
            className="mt-3 font-headline text-3xl font-bold tracking-tight md:text-4xl"
          >
            Votre projet, maîtrisé en 4 étapes
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Un cadre simple, une communication claire, et un pilotage rigoureux
            pour des délais tenus et des finitions soignées.
          </p>

          {/* Micro-contenu SEO (propre, naturel) */}
          <p className="mt-4 text-sm text-muted-foreground">
            Rénovation d’appartement, salle de bain ou cuisine à Paris et en
            Île-de-France : nous planifions, coordonnons les corps de métier et
            contrôlons la qualité jusqu’à la réception.
          </p>
        </header>

        <div className="relative mx-auto mt-12 max-w-6xl">
          {/* Timeline horizontale (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-[34px] hidden h-px bg-border lg:block" />

          <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, idx) => (
              <li key={step.step} className="h-full">
                <article
                  className={cn(
                    "group relative h-full rounded-2xl border bg-background/70 p-6 shadow-sm",
                    "transition-all duration-300 hover:-translate-y-0.5 hover:bg-background hover:shadow-md"
                  )}
                  aria-labelledby={`process-step-${step.step}-title`}
                  aria-describedby={`process-step-${step.step}-desc`}
                >
                  {/* Point sur la ligne (desktop) */}
                  <div className="hidden lg:block">
                    <div className="absolute left-1/2 top-[26px] h-4 w-4 -translate-x-1/2 rounded-full border bg-background shadow-sm" />
                    <div className="absolute left-1/2 top-[26px] h-4 w-4 -translate-x-1/2 rounded-full bg-primary/15" />
                  </div>

                  {/* Badge étape */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-foreground">
                      <span className="text-primary" aria-hidden="true">
                        {String(step.step).padStart(2, "0")}
                      </span>
                      <span className="text-muted-foreground">
                        Étape {step.step}
                      </span>
                    </div>

                    {/* Mini repère visuel (raffiné) */}
                    <span className="h-2 w-10 rounded-full bg-primary/15" aria-hidden="true" />
                  </div>

                  <h3
                    id={`process-step-${step.step}-title`}
                    className="mt-5 font-headline text-lg font-semibold tracking-tight"
                  >
                    {step.title}
                  </h3>

                  <p
                    id={`process-step-${step.step}-desc`}
                    className="mt-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    {step.description}
                  </p>

                  {/* Micro “progress” */}
                  <div className="mt-5">
                    <div className="h-1.5 w-full rounded-full bg-muted">
                      <div
                        className="h-1.5 rounded-full bg-primary/60"
                        style={{ width: `${((idx + 1) / 4) * 100}%` }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center">
            <Button asChild size="lg" className="min-w-[240px]">
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
