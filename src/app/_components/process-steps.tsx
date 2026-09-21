"use client"

import Link from "next/link"
import { processSteps } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ClipboardList,
  Compass,
  Wrench,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  UserCheck
} from "lucide-react"
import { cn } from "@/lib/utils"

const STEP_ICONS = [ClipboardList, Compass, Wrench, ShieldCheck]

export default function ProcessSteps() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-white py-24 md:py-32 border-b border-slate-200/80"
      aria-labelledby="process-title"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-amber-500/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header Section */}
        <header className="mx-auto max-w-4xl text-center space-y-5">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-5 py-2 text-xs font-bold uppercase tracking-wider text-amber-700 shadow-sm backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-amber-600 animate-pulse" />
            <span>Méthodologie & Pilotage de Chantier</span>
          </div>

          <h2
            id="process-title"
            className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]"
          >
            Votre Projet,{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
              Maîtrisé en 4 Étapes
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base sm:text-lg font-normal leading-relaxed text-slate-600">
            Un cadre rigoureux, une communication transparente, et une direction de chantier dédiée pour garantir le respect strict des délais et des finitions d'exception.
          </p>

          <div className="pt-2 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-600 font-semibold">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-600" /> Planning Respecté à la Lettre
            </span>
            <span className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-amber-600" /> Interlocuteur Unique Dédié
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-600" /> Réception Sans Surprise
            </span>
          </div>
        </header>

        {/* 4-Step Process Timeline Cards */}
        <div className="relative mx-auto mt-16 max-w-6xl">
          {/* Horizontal Desktop Connecting Bar */}
          <div className="pointer-events-none absolute left-12 right-12 top-[68px] hidden h-1 bg-gradient-to-r from-amber-500/20 via-amber-500/40 to-amber-500/20 lg:block rounded-full" />

          <ol className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, idx) => {
              const Icon = STEP_ICONS[idx] || ClipboardList
              return (
                <li key={step.step} className="h-full">
                  <Card
                    className={cn(
                      "group relative flex flex-col justify-between h-full rounded-3xl border border-slate-200/80 bg-slate-50/70 p-7 shadow-lg transition-all duration-500",
                      "hover:-translate-y-2 hover:bg-white hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10"
                    )}
                  >
                    {/* Top Accent Line */}
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-500 to-amber-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-t-3xl"
                      aria-hidden="true"
                    />

                    <div>
                      {/* Step Header Badge & Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/30 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-500 shadow-md">
                          <Icon className="h-7 w-7" aria-hidden="true" />
                        </div>

                        <span className="font-headline text-3xl font-black text-slate-300 group-hover:text-amber-500/80 transition-colors">
                          0{step.step}
                        </span>
                      </div>

                      {/* Step Content */}
                      <h3 className="font-headline text-xl font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-sm font-normal leading-relaxed text-slate-600">
                        {step.description}
                      </p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-8 pt-4 border-t border-slate-200/60">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                        <span>Étape {step.step} / 4</span>
                        <span className="text-amber-600 font-bold">{((idx + 1) / 4) * 100}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
                          style={{ width: `${((idx + 1) / 4) * 100}%` }}
                        />
                      </div>
                    </div>
                  </Card>
                </li>
              )
            })}
          </ol>

          {/* Bottom Call to Action */}
          <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center">
            <Button
              asChild
              size="lg"
              className="bg-amber-500 text-slate-950 font-extrabold hover:bg-amber-400 shadow-xl shadow-amber-500/20 px-9 h-14 rounded-2xl text-base"
            >
              <Link href="/devis">
                Démarrer mon projet & devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-xs font-medium text-slate-500">
              Devis détaillé poste par poste • Visite sur site offerte • Garantie décennale 10 ans
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
