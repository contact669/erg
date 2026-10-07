import SiteHeader from "@/components/site-header"
import { pageMetadata } from "@/lib/seo/metadata"

export const metadata = pageMetadata('/devis', 'Devis rénovation à Paris : préparer votre projet', 'Décrivez vos travaux de rénovation d’appartement, de cuisine ou de salle de bain à Paris et en Île-de-France. Demande de devis gratuit et sans engagement.')
import SiteFooter from "@/components/site-footer"
import Breadcrumbs from "@/components/breadcrumbs"
import InteractiveQuoteWizard from "@/components/interactive-quote-wizard"
import CtaBanner from "@/app/_components/cta-banner"
import { ShieldCheck, Clock, User, Phone, Sparkles, CheckCircle2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

const PHONE = "+33699961375"
const PHONE_DISPLAY = "06 99 96 13 75"

export default function DevisPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50 text-slate-900">
      <SiteHeader />

      <main className="flex-grow">
        {/* HERO SECTION — Premium Light Theme */}
        <section className="relative isolate overflow-hidden bg-slate-50 border-b border-slate-200/80 py-12 md:py-18 lg:py-20">
          {/* Ambient Warm Glow */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-50/80 to-slate-50" />
            <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-slate-200/40 blur-3xl" />
          </div>

          <div className="container relative z-10">
            <div className="mx-auto max-w-4xl text-center space-y-6">
              <div className="flex items-center justify-center">
                <Breadcrumbs />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 text-xs sm:text-sm font-semibold text-amber-700 shadow-sm">
                  <Sparkles className="h-4 w-4 text-amber-600" /> Visite sur site offerte & devis gratuit
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-1 text-xs text-slate-800 shadow-sm">
                  <FileText className="h-4 w-4 text-amber-600" />
                  <span className="font-bold text-slate-900">Poste par Poste</span>
                  <span className="text-slate-500">• Sans mauvaises surprises</span>
                </span>
              </div>

              <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Demande de Devis Rénovation : <br />
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                  Étude Personnalisée & Diagnostic Gratuit
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Configurez votre projet en 4 étapes simples. Un maître d'œuvre ERG Rénovation analyse votre besoin et organise une visite gratuite sur site sous 48h.
              </p>

              {/* Trust Features Bar */}
              <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/90 px-4 py-1.5 shadow-xs backdrop-blur-md">
                  <ShieldCheck className="h-4 w-4 text-amber-600" /> Garantie Décennale 10 Ans
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/90 px-4 py-1.5 shadow-xs backdrop-blur-md">
                  <Clock className="h-4 w-4 text-amber-600" /> Réponse sous 24h ouvrées
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/90 px-4 py-1.5 shadow-xs backdrop-blur-md">
                  <User className="h-4 w-4 text-amber-600" /> Interlocuteur Unique Dédié
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* WIZARD CONTAINER */}
        <section className="container py-12 md:py-20">
          <InteractiveQuoteWizard />
        </section>

        {/* DIRECT PHONE CALL SECTION */}
        <section className="border-t border-slate-200/80 bg-white py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-semibold text-amber-700">
                <Phone className="h-3.5 w-3.5 text-amber-600" /> Échange Direct par Téléphone
              </div>
              
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-slate-900">
                Vous préférez discuter de votre projet de vive voix ?
              </h2>

              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Nos conducteurs de travaux vous conseillent immédiatement sur la faisabilité technique, les arbitrages de matériaux et planifient une visite gratuite sur site.
              </p>

              <div className="pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 h-13 px-8 text-base shadow-xl rounded-xl"
                >
                  <a href={`tel:${PHONE}`}>
                    <Phone className="mr-2 h-5 w-5 text-slate-950" />
                    Appeler le {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-600" /> Visite sans engagement
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-600" /> Paris & Petite Couronne (75, 92, 93, 94)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-600" /> Lun-Sam • 9h–19h
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <CtaBanner />
      </main>

      <SiteFooter />
    </div>
  )
}
