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

import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

import { Mail, MapPin, Phone, ArrowRight, ShieldCheck, Clock } from "lucide-react"

const PHONE = "+33699961375"
const EMAIL = "contact@erg-renovation.fr"
const ADDRESS = "1 Sente de la Pointe, 75020 Paris"
const HOURS = "Lun–Sam • 9h–19h"

// ✅ Schema “lead-friendly” : téléphone optionnel mais validé si fourni
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
  // honeypot anti-spam
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
      consent: true, // tu peux mettre false si tu préfères un opt-in explicite
      website: "",
    },
  })

  const messageValue = form.watch("message")
  const remaining = useMemo(() => Math.max(0, 20 - (messageValue?.length ?? 0)), [messageValue])

  async function onSubmit(values: FormValues) {
    // Anti-spam simple (honeypot)
    if (values.website && values.website.trim().length > 0) return

    setIsSubmitting(true)
    try {
      // ✅ Branche ici ton endpoint (Resend / Firebase Function / API route)
      // await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) })

      toast({
        title: "Message envoyé",
        description: "Merci ! Nous revenons vers vous dans les plus brefs délais (souvent sous 24h ouvrées).",
      })
      form.reset({ consent: true, website: "" })
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Envoi impossible",
        description: "Une erreur est survenue. Réessayez ou contactez-nous par téléphone.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-grow">
        <Breadcrumbs />

        {/* Hero plus “premium” + orienté conversion */}
        <section className="border-b bg-secondary/50">
          <div className="container py-12 md:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-accent" />
                Devis & conseils — réponse rapide
              </div>

              <h1 className="mt-5 font-headline text-4xl font-bold tracking-tight md:text-5xl">
                Parlons de votre projet
              </h1>

              <p className="mt-4 text-lg text-muted-foreground">
                Une question, une demande de devis, une rénovation à planifier ? Décrivez votre besoin : nous vous
                rappelons rapidement avec une première estimation.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <a href={`tel:${PHONE}`} aria-label="Appeler ERG Rénovation">
                    <Phone className="mr-2 h-4 w-4" />
                    Appeler maintenant
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={`mailto:${EMAIL}`}>
                    Écrire un email <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Paris • 92 • 93 • 94 • Intervention Île-de-France — {HOURS}
              </p>
            </div>
          </div>
        </section>

        <AnimatedSection>
          <section className="container py-12 md:py-16">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2">
              {/* Colonne infos + map */}
              <div className="space-y-6">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">Nos coordonnées</CardTitle>
                    <CardDescription>Contact direct ou via le formulaire ci-contre.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold">Téléphone</p>
                        <p className="text-sm text-muted-foreground">Pour une réponse immédiate.</p>
                        <a href={`tel:${PHONE}`} className="mt-1 inline-flex items-center font-medium text-accent hover:underline">
                          06 99 96 13 75
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold">Email</p>
                        <p className="text-sm text-muted-foreground">Réponse sous 24h ouvrées.</p>
                        <a href={`mailto:${EMAIL}`} className="mt-1 inline-flex items-center font-medium text-accent hover:underline">
                          {EMAIL}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold">Adresse</p>
                        <p className="text-sm text-muted-foreground">{ADDRESS}</p>
                        <p className="mt-1 text-sm font-medium">Intervention : Paris & Île-de-France</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold">Horaires</p>
                        <p className="text-sm text-muted-foreground">{HOURS}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="rounded-lg border bg-background/40 p-4">
                      <p className="text-sm font-medium">Pour aller plus vite</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                        <li>Surface (m²) + adresse (Paris / 92 / 93 / 94)</li>
                        <li>Pièces concernées (cuisine, SDB, appartement complet)</li>
                        <li>Photos / contraintes (accès, copropriété, délais)</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Map responsive sans aspect-w/h (souvent pas installé) */}
                <Card className="overflow-hidden">
                  <CardContent className="p-2">
                    <div className="relative h-[320px] w-full overflow-hidden rounded-md">
                      <iframe
                        title="ERG Rénovation — Carte"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.790322238495!2d2.404283876878344!3d48.86240409971911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66d86a42e7c4b%3A0x82b5774a3382d625!2s1%20Sente%20de%20la%20Pointe%2C%2075020%20Paris%2C%20France!5e0!3m2!1sfr!2sfr!4v1726056586053!5m2!1sfr!2sfr"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Formulaire */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Envoyer une demande</CardTitle>
                  <CardDescription>
                    Décrivez votre projet : nous vous répondons rapidement avec les prochaines étapes.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* honeypot */}
                    <div className="hidden">
                      <label htmlFor="website">Website</label>
                      <input id="website" {...form.register("website")} />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium">Nom complet</label>
                        <Input
                          className={cn("mt-2")}
                          placeholder="Votre nom"
                          autoComplete="name"
                          disabled={isSubmitting}
                          {...form.register("name")}
                        />
                        <p className="mt-1 text-sm text-destructive">{form.formState.errors.name?.message as any}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input
                          className={cn("mt-2")}
                          placeholder="vous@email.com"
                          autoComplete="email"
                          inputMode="email"
                          disabled={isSubmitting}
                          {...form.register("email")}
                        />
                        <p className="mt-1 text-sm text-destructive">{form.formState.errors.email?.message as any}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium">Téléphone (optionnel)</label>
                        <Input
                          className={cn("mt-2")}
                          placeholder="06 12 34 56 78"
                          autoComplete="tel"
                          inputMode="tel"
                          disabled={isSubmitting}
                          {...form.register("phone")}
                        />
                        <p className="mt-1 text-sm text-destructive">{form.formState.errors.phone?.message as any}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Sujet</label>
                        <Input
                          className={cn("mt-2")}
                          placeholder="Ex : rénovation salle de bain"
                          disabled={isSubmitting}
                          {...form.register("subject")}
                        />
                        <p className="mt-1 text-sm text-destructive">{form.formState.errors.subject?.message as any}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Votre message</label>
                      <Textarea
                        className="mt-2 min-h-[140px]"
                        placeholder="Surface, pièces, contraintes, délai souhaité…"
                        disabled={isSubmitting}
                        {...form.register("message")}
                      />
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="text-destructive">{form.formState.errors.message?.message as any}</span>
                        <span>{remaining > 0 ? `Ajoutez encore ${remaining} caractères` : "Parfait"}</span>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-secondary/40 p-4">
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          className="mt-1"
                          disabled={isSubmitting}
                          defaultChecked
                          {...form.register("consent")}
                        />
                        <p className="text-xs text-muted-foreground">
                          J’accepte la{" "}
                          <Link href="/confidentialite" className="underline underline-offset-4 hover:text-foreground">
                            politique de confidentialité
                          </Link>{" "}
                          et j’autorise ERG Rénovation à me recontacter dans le cadre de ma demande.
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-destructive">
                        {form.formState.errors.consent?.message as any}
                      </p>
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Envoi..." : "Envoyer ma demande"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      Besoin immédiat ?{" "}
                      <a href={`tel:${PHONE}`} className="underline underline-offset-4 hover:text-foreground">
                        Appelez-nous
                      </a>{" "}
                      (réponse plus rapide).
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>
        </AnimatedSection>

        {/* SEO “utile” et épuré (indexable) */}
        <section className="border-t bg-background">
          <div className="container py-12">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-headline text-2xl font-bold md:text-3xl">
                Contact rénovation à Paris et Île-de-France
              </h2>
              <p className="mt-3 text-muted-foreground">
                ERG Rénovation intervient sur des projets de rénovation intérieure (appartement, salle de bain, cuisine)
                à Paris et dans les départements 92, 93, 94. Contactez-nous pour une visite sur site et un devis détaillé.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
