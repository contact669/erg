import { processSteps } from '@/lib/data';

export default function ProcessSteps() {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Votre projet, simplifié en 4 étapes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            De la première idée à la livraison finale, nous assurons un suivi
            rigoureux et une communication transparente.
          </p>
        </div>

        <div className="relative mt-12">
            <div className="absolute left-1/2 top-10 hidden h-full w-px -translate-x-1/2 bg-border md:block"></div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
                <div key={step.step} className="text-center">
                    <div className="relative flex justify-center">
                         <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-background ring-8 ring-background">
                            <span className="font-headline text-2xl font-bold text-accent">{`0${step.step}`}</span>
                        </div>
                    </div>
                    <h3 className="mt-6 font-headline text-xl font-semibold">
                        {step.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                        {step.description}
                    </p>
                </div>
            ))}
            </div>
        </div>

      </div>
    </section>
  );
}
