"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Breadcrumbs from "@/components/breadcrumbs"
import AnimatedSection from "@/components/animated-section"
import CtaBanner from "@/app/_components/cta-banner"
import { GoogleIcon } from "@/components/icons"

import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { firestore } from "@/firebase/init"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { submitQuoteRequest } from "@/lib/submit-quote-request"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  CheckCircle2,
  Building2,
  Send
} from "lucide-react"

const PHONE = "+33699961375"
const PHONE_DISPLAY = "06 99 96 13 75"
const EMAIL = "contact@erg-renovation.fr"
const ADDRESS = "1 Sente de la Pointe, 75020 Paris"
const HOURS = "Lun–Sam • 9h–19h"

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez saisir une adresse email valide." }),
  phone: z
    .string()
    .optional()
    .refine(
      (v) => !v || /^[0-9+().\s-]{6,20}$/.test(v),
      "Veuillez saisir un numéro valide."
    ),
  subject: z.string().min(5, { message: "Le sujet doit contenir au moins 5 caractères." }),
  message: z.string().min(20, { message: "Décrivez un peu plus votre demande (au moins 20 caractères)." }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Veuillez accepter la politique de confidentialité." }),
  }),
  website: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      consent: true,
      website: "",
    },
  })

  const messageValue = form.watch("message")
  const remaining = useMemo(() => Math.max(0, 20 - (messageValue?.length ?? 0)), [messageValue])

  async function onSubmit(values: FormValues) {
    if (values.website && values.website.trim().length > 0) return

    setIsSubmitting(true)
    try {
      const result = await submitQuoteRequest({
        clientName: values.name, clientEmail: values.email, clientPhone: values.phone || "",
        projectDescription: `[Sujet : ${values.subject}]\n\n${values.message}`,
      }, payload => addDoc(collection(firestore, "quoteRequests"), {
        ...payload, department: "", projectType: "Contact Direct",
        status: "Nouvelle Demande", createdAt: serverTimestamp(),
      }))
      toast({
        title: "Message enregistré",
        description: result.notificationSent
          ? "Votre demande a bien été enregistrée. Nous vous recontactons dans les plus brefs délais."
          : "Votre demande est enregistrée, mais la notification email n’a pas pu être confirmée. Vous pouvez nous joindre au 06 99 96 13 75.",
      })
      form.reset({ consent: true, website: "" })
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Envoi impossible",
        description: "Une erreur est survenue. Réessayez ou appelez-nous directement.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50">
      <SiteHeader />

      <main className="flex-grow">
        {/* HERO SECTION — Premium Light Theme */}
        <section className="relative isolate overflow-hidden bg-slate-50 border-b border-slate-200/80 py-12 md:py-18 lg:py-20">
          {/* Subtle Ambient Gradients */}
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
                  <ShieldCheck className="h-4 w-4 text-amber-600" /> Visite sur Site Offerte & Devis Rapide
                </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=ERG-Entreprise+de+R%C3%A9novation+Appartement+%26+Salle+de+Bains+%C3%A0+Paris+et+%C3%8Ele-de-France"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3.5 py-1 text-xs text-slate-800 shadow-sm hover:bg-white"
                >
                  <GoogleIcon className="h-4 w-4" />
                  <span className="font-bold text-amber-600">4.9 / 5</span>
                  <span className="text-slate-500">• Réponse sous 24h</span>
                </a>
              </div>

              <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Parlons de Votre Projet : <br />
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                  Une Réponse Rapide & Un Chiffrage Clair.
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Une question, une rénovation d'appartement ou une salle de bain à planifier ? Décrivez votre besoin ou appelez-nous pour organiser une première visite sur site.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="h-13 px-8 bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 text-base shadow-lg shadow-amber-500/20 rounded-xl"
                >
                  <a href={`tel:${PHONE}`}>
                    <Phone className="mr-2 h-5 w-5 text-slate-950" />
                    Appeler le {PHONE_DISPLAY}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-13 px-6 border-slate-300 bg-white text-slate-900 hover:bg-slate-100 text-base rounded-xl shadow-sm"
                >
                  <Link href="/devis">
                    Simuler un devis complet <ArrowRight className="ml-2 h-4 w-4 text-amber-600" />
                  </Link>
                </Button>
              </div>

              <p className="text-xs font-semibold text-slate-500 pt-1">
                Paris (75) • Hauts-de-Seine (92) • Seine-Saint-Denis (93) • Val-de-Marne (94) — {HOURS}
              </p>
            </div>
          </div>
        </section>

        {/* MAIN CONTACT CONTENT */}
        <AnimatedSection>
          <section className="py-12 md:py-20">
            <div className="container">
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2">
                {/* LEFT COLUMN: CONTACT DETAILS & GOOGLE MAPS */}
                <div className="space-y-6">
                  {/* Coordinates Card */}
                  <Card className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg space-y-6">
                    <div>
                      <h2 className="font-headline text-2xl font-bold text-slate-900">Nos Coordonnées Directes</h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Discutez directement avec nos chargés de projet.
                      </p>
                    </div>

                    <div className="space-y-5">
                      {/* Phone */}
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 shrink-0">
                          <Phone className="h-6 w-6" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-slate-900">Téléphone Direct</p>
                          <p className="text-xs text-slate-500">Pour un échange immédiat avec un artisan.</p>
                          <a
                            href={`tel:${PHONE}`}
                            className="mt-1 inline-flex items-center font-extrabold text-amber-700 text-base hover:text-amber-800 transition"
                          >
                            {PHONE_DISPLAY}
                          </a>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 shrink-0">
                          <Mail className="h-6 w-6" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-slate-900">Adresse Email</p>
                          <p className="text-xs text-slate-500">Réponse sous 24h ouvrées.</p>
                          <a
                            href={`mailto:${EMAIL}`}
                            className="mt-1 inline-flex items-center font-bold text-amber-700 text-sm hover:underline"
                          >
                            {EMAIL}
                          </a>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 shrink-0">
                          <MapPin className="h-6 w-6" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-slate-900">Siège Social & Bureau</p>
                          <p className="text-sm font-semibold text-slate-800">{ADDRESS}</p>
                          <p className="text-xs text-slate-500 mt-0.5">Intervention : Paris & Île-de-France</p>
                        </div>
                      </div>

                      {/* Hours */}
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 shrink-0">
                          <Clock className="h-6 w-6" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-slate-900">Horaires d'Ouverture</p>
                          <p className="text-sm font-semibold text-slate-800">{HOURS}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Fast Checklist Card */}
                    <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-4 space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Pour accélérer votre chiffrage :
                      </p>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
                          <span>Mentionnez la surface approximative (m²) & la ville</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
                          <span>Indiquez les pièces concernées (Cuisine, SDB, Rénovation totale)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
                          <span>Précisez les éventuelles contraintes d'accès ou de délai</span>
                        </li>
                      </ul>
                    </div>
                  </Card>

                  {/* Google Map Card */}
                  <Card className="rounded-3xl border border-slate-200 bg-white p-2 shadow-md overflow-hidden">
                    <div className="relative h-[300px] w-full overflow-hidden rounded-2xl">
                      <iframe
                        title="ERG Rénovation — Localisation Paris"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.790322238495!2d2.404283876878344!3d48.86240409971911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66d86a42e7c4b%3A0x82b5774a3382d625!2s1%20Sente%20de%20la%20Pointe%2C%2075020%20Paris%2C%20France!5e0!3m2!1sfr!2sfr!4v1726056586053!5m2!1sfr!2sfr"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </Card>
                </div>

                {/* RIGHT COLUMN: HIGH-END CONTACT FORM */}
                <Card className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl h-fit space-y-6">
                  <div>
                    <h2 className="font-headline text-2xl font-bold text-slate-900">Envoyer Une Demande</h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Décrivez brièvement votre projet : nous vous répondons rapidement avec une estimation.
                    </p>
                  </div>

                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {/* Honeypot */}
                    <div className="hidden">
                      <label htmlFor="website">Website</label>
                      <input id="website" {...form.register("website")} />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Nom Complet</label>
                        <Input
                          className="h-11 rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white focus:border-amber-500 focus:ring-amber-500/20 text-sm"
                          placeholder="Votre nom & prénom"
                          autoComplete="name"
                          disabled={isSubmitting}
                          {...form.register("name")}
                        />
                        {form.formState.errors.name && (
                          <p className="text-xs text-destructive">{form.formState.errors.name.message as string}</p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Adresse Email</label>
                        <Input
                          className="h-11 rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white focus:border-amber-500 focus:ring-amber-500/20 text-sm"
                          placeholder="votre.email@exemple.fr"
                          autoComplete="email"
                          inputMode="email"
                          disabled={isSubmitting}
                          {...form.register("email")}
                        />
                        {form.formState.errors.email && (
                          <p className="text-xs text-destructive">{form.formState.errors.email.message as string}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Téléphone (Optionnel)</label>
                        <Input
                          className="h-11 rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white focus:border-amber-500 focus:ring-amber-500/20 text-sm"
                          placeholder="06 12 34 56 78"
                          autoComplete="tel"
                          inputMode="tel"
                          disabled={isSubmitting}
                          {...form.register("phone")}
                        />
                        {form.formState.errors.phone && (
                          <p className="text-xs text-destructive">{form.formState.errors.phone.message as string}</p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Sujet Du Projet</label>
                        <Input
                          className="h-11 rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white focus:border-amber-500 focus:ring-amber-500/20 text-sm"
                          placeholder="Ex : Rénovation studio 11e"
                          disabled={isSubmitting}
                          {...form.register("subject")}
                        />
                        {form.formState.errors.subject && (
                          <p className="text-xs text-destructive">{form.formState.errors.subject.message as string}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Votre Message / Détails</label>
                      <Textarea
                        className="min-h-[130px] rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white focus:border-amber-500 focus:ring-amber-500/20 text-sm p-3.5"
                        placeholder="Surface, état actuel, pièces concernées, contraintes d'accès ou délais souhaités..."
                        disabled={isSubmitting}
                        {...form.register("message")}
                      />
                      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                        {form.formState.errors.message ? (
                          <span className="text-destructive">{form.formState.errors.message.message as string}</span>
                        ) : (
                          <span>Plus vous détaillez, plus l'estimation sera précise.</span>
                        )}
                        <span className="font-medium">
                          {remaining > 0 ? `${remaining} car. min.` : "Prêt"}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-4">
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          id="consent"
                          className="mt-0.5 h-4 w-4 rounded-md border-slate-300 text-amber-600 focus:ring-amber-500"
                          disabled={isSubmitting}
                          defaultChecked
                          {...form.register("consent")}
                        />
                        <label htmlFor="consent" className="text-xs text-slate-600 leading-snug cursor-pointer">
                          J’accepte la{" "}
                          <Link href="/confidentialite" className="font-semibold text-slate-900 underline hover:text-amber-700">
                            politique de confidentialité
                          </Link>{" "}
                          et j’autorise ERG Rénovation à me recontacter pour mon projet.
                        </label>
                      </div>
                      {form.formState.errors.consent && (
                        <p className="mt-1 text-xs text-destructive">
                          {form.formState.errors.consent.message as string}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-13 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Transmission..." : "Envoyer ma demande de devis"}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>

                    <p className="text-center text-xs text-slate-500 pt-1">
                      Besoin d'une réponse immédiate ?{" "}
                      <a href={`tel:${PHONE}`} className="font-bold text-slate-900 underline hover:text-amber-700">
                        Appelez-nous au {PHONE_DISPLAY}
                      </a>
                    </p>
                  </form>
                </Card>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* SEO REASSURANCE SECTION */}
        <section className="border-t border-slate-200/60 bg-white py-12">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center space-y-3">
              <h2 className="font-headline text-2xl font-bold text-slate-900 md:text-3xl">
                Entreprise de Rénovation à Paris & Île-de-France
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                ERG Rénovation est une entreprise générale du bâtiment basée à Paris 20e. Nous réalisons des travaux tous corps d'état (démolition, maçonnerie, plomberie, électricité, menuiserie, peinture) avec garantie décennale et suivi quotidien.
              </p>
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
