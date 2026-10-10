"use client"

import Link from "next/link"
import { services } from "@/lib/data"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Award, Star } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ServicesOverview() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-slate-50/70 py-24 md:py-32"
      aria-labelledby="services-title"
    >
      {/* Background Subtle Warm Ambient Glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] bg-slate-200/50 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header High-End Light */}
        <header className="mx-auto max-w-4xl text-center space-y-6">
          {/* Badge Lumineux */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-5 py-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 shadow-sm backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-amber-600 animate-pulse" />
            <span>Prestations Tous Corps d'État à Paris</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span className="text-slate-700 dark:text-slate-300 font-normal">Excellence Artisanale</span>
          </div>

          {/* Headline Titre Lumineux */}
          <h2
            id="services-title"
            className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]"
          >
            Savoir-Faire &{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
              Rénovation Sur-Mesure
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base sm:text-lg font-normal leading-relaxed text-slate-600">
            Du raffinement d'un appartement haussmannien à la restructuration globale d'une résidence, nous concevons des espaces d'exception guidés par la haute précision et des finitions irréprochables.
          </p>

          {/* Quality Metrics */}
          <div className="pt-2 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-600" /> Matériaux Nobles & Durables
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-600" /> Garantie Décennale 10 Ans
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" /> Conducteur de Travaux Dédié
            </span>
          </div>
        </header>

        {/* Grid des Services Premium Light Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <Card
              key={service.slug}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-3xl",
                "border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50 transition-all duration-500",
                "hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10"
              )}
            >
              {/* Ligne d'accent lumineuse supérieure */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-500 to-amber-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />

              <CardHeader className="p-8 space-y-6">
                {/* Header Icon + Number Badge */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-500 shadow-md">
                    <service.icon className="h-8 w-8" aria-hidden="true" />
                  </div>

                  <span className="font-headline text-2xl font-extrabold text-slate-300 group-hover:text-amber-500/60 transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                <div className="space-y-3">
                  <CardTitle className="font-headline text-2xl font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </CardTitle>

                  <CardDescription className="text-sm font-normal leading-relaxed text-slate-600">
                    {service.description}
                  </CardDescription>
                </div>
              </CardHeader>

              {/* Card Footer Action */}
              <div className="px-8 pb-8 pt-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-600" /> Suivi personnalisé
                </span>

                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="h-10 px-4 text-xs font-bold text-amber-600 hover:text-amber-700 hover:bg-amber-500/10 rounded-xl group/btn transition-all"
                >
                  <Link href={`/services/${service.slug}`}>
                    Découvrir <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Global CTA Bottom */}
        <div className="mt-16 text-center space-y-4">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-amber-500 text-slate-950 font-extrabold hover:bg-amber-400 shadow-xl shadow-amber-500/20 px-9 h-14 rounded-2xl text-base"
            >
              <Link href="/devis">
                Lancer mon projet & devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-slate-300 bg-white text-slate-900 hover:bg-slate-100 px-8 h-14 rounded-2xl text-base shadow-sm"
            >
              <Link href="/services">
                Explorer nos expertises
              </Link>
            </Button>
          </div>

          <p className="text-xs font-medium text-slate-500">
            Devis détaillé gratuit • Visite sur site gratuite à Paris & Île-de-France (92, 93, 94)
          </p>
          <p className="text-sm text-slate-600">
            Syndic, gestionnaire ou SCI ?{" "}
            <Link href="/travaux-copropriete-syndic" className="font-semibold text-amber-700 hover:underline">
              Nos travaux de parties communes
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
