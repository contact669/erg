"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState, useTransition } from "react"
import Link from "next/link"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { useFirestore } from "@/firebase"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Breadcrumbs from "@/components/breadcrumbs"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Bot, User, ShieldCheck, Clock, ArrowRight } from "lucide-react"
import { sendQuoteNotifications } from "./_actions/send-notifications"

const PHONE = "+33699961375"

const formSchema = z.object({
  clientName: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  clientEmail: z.string().email("Veuillez saisir une adresse email valide."),
  clientPhone: z
    .string()
    .optional()
    .refine(
      (v) => !v || /^[0-9+().\s-]{6,20}$/.test(v),
      "Veuillez saisir un numéro valide."
    ),
  projectDescription: z
    .string()
    .min(40, "Décrivez votre projet avec plus de détails (au moins 40 caractères).")
    .max(2000, "Merci de limiter la description à 2000 caractères."),
})

type FormValues = z.infer<typeof formSchema>

function countChars(s: string) {
  return (s ?? "").trim().length
}

export default function DevisPage() {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const firestore = useFirestore()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      projectDescription: "",
    },
  })

  const description = form.watch("projectDescription")
  const chars = countChars(description)

  async function onSubmit(values: FormValues) {
    if (isPending || !firestore) {
      if (!firestore) {
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: "La connexion à la base de données a échoué. Veuillez rafraîchir la page.",
        })
      }
      return
    }

    startTransition(async () => {
      try {
        toast({
          title: "Envoi en cours…",
          description: "Nous enregistrons votre demande.",
        })

        // Étape 1 : Enregistrer la demande dans Firestore
        await addDoc(collection(firestore, "quoteRequests"), {
          clientName: values.clientName.trim(),
          clientEmail: values.clientEmail.trim().toLowerCase(),
          clientPhone: (values.clientPhone ?? "").trim() || null,
          projectDescription: values.projectDescription.trim(),
          status: "Nouvelle Demande",
          createdAt: serverTimestamp(),
        })

        // Étape 2 : Appeler l'action serveur pour envoyer les e-mails
        const notificationResult = await sendQuoteNotifications({
          clientName: values.clientName.trim(),
          clientEmail: values.clientEmail.trim().toLowerCase(),
          clientPhone: (values.clientPhone ?? "").trim() || null,
          projectDescription: values.projectDescription.trim(),
        })

        if (!notificationResult.success) {
          // La demande est sauvegardée, mais les notifications ont échoué.
          // On informe l'utilisateur sans bloquer.
          toast({
            variant: "destructive",
            title: "Demande enregistrée, mais...",
            description:
              "Nous n'avons pas pu envoyer les e-mails de notification. Nous traiterons votre demande manuellement.",
          })
        } else {
          toast({
            title: "Demande envoyée ✅",
            description:
              "Merci ! Nous avons bien reçu votre demande et vous avons envoyé un e-mail de confirmation.",
          })
        }

        form.reset()
      } catch (error) {
        console.error("Erreur lors de la création de la demande :", error)
        toast({
          variant: "destructive",
          title: "Impossible d'enregistrer la demande",
          description:
            "Une erreur est survenue lors de l'enregistrement. Veuillez réessayer ou nous contacter directement.",
        })
      }
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-grow">
        <Breadcrumbs />

        <section className="border-b bg-secondary py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-4 w-fit rounded-full bg-primary/10 p-3 text-primary">
                <Bot className="h-7 w-7" />
              </div>

              <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
                Demande de devis rénovation
              </h1>

              <p className="mt-4 text-lg text-muted-foreground">
                Décrivez votre projet en 2 minutes. Nous vous recontactons rapidement avec une estimation claire et les
                prochaines étapes.
              </p>

              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <a href={`tel:${PHONE}`} aria-label="Appeler ERG Rénovation">
                    Appeler maintenant <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/services">
                    Voir nos services <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4 text-accent" />
                  Réponse rapide
                </div>
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  Garantie décennale
                </div>
                <div className="flex items-center justify-center gap-2">
                  <User className="h-4 w-4 text-accent" />
                  Interlocuteur unique
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
            <Card className="overflow-hidden">
              <CardHeader className="border-b bg-background">
                <CardTitle className="font-headline text-2xl md:text-3xl">Votre demande</CardTitle>
                <CardDescription>
                  Plus vous êtes précis, plus notre estimation sera pertinente. (Vous pouvez ajouter des contraintes,
                  photos/plan plus tard.)
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <fieldset className="space-y-4 rounded-xl border p-5">
                      <legend className="-ml-1 px-1 text-sm font-medium text-foreground">
                        <span className="inline-flex items-center gap-2">
                          <User className="h-4 w-4 text-accent" /> Vos informations
                        </span>
                      </legend>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="clientName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom complet</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex : Amar Hachour" autoComplete="name" {...field} disabled={isPending} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="clientEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="ex : vous@email.com"
                                  autoComplete="email"
                                  inputMode="email"
                                  {...field}
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="clientPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone (optionnel)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ex : 06 12 34 56 78"
                                autoComplete="tel"
                                inputMode="tel"
                                {...field}
                                disabled={isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </fieldset>

                    <fieldset className="space-y-4 rounded-xl border p-5">
                      <legend className="-ml-1 px-1 text-sm font-medium text-foreground">
                        <span className="inline-flex items-center gap-2">
                          <Bot className="h-4 w-4 text-accent" /> Votre projet
                        </span>
                      </legend>

                      <FormField
                        control={form.control}
                        name="projectDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={[
                                  "Exemple : rénovation salle de bain 5m² à Paris 20e.",
                                  "Souhait : douche à l’italienne, meuble vasque, carrelage, reprise plomberie/électricité.",
                                  "Contraintes : immeuble ancien, horaires, date souhaitée, budget indicatif…",
                                ].join("\n")}
                                className="min-h-[200px] resize-y"
                                {...field}
                                disabled={isPending}
                              />
                            </FormControl>

                            <div className="mt-2 flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">
                                Indiquez : surface, ville, état actuel, éléments à remplacer, niveau de finition.
                              </span>
                              <span className={chars < 40 ? "text-destructive" : "text-muted-foreground"}>
                                {chars}/2000
                              </span>
                            </div>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </fieldset>

                    <div className="space-y-3">
                      <Button type="submit" size="lg" className="w-full" disabled={isPending}>
                        {isPending ? "Envoi en cours…" : "Envoyer ma demande"}
                      </Button>

                      <p className="text-center text-xs text-muted-foreground">
                        En envoyant, vous acceptez notre{" "}
                        <Link href="/confidentialite" className="underline underline-offset-4 hover:text-primary">
                          politique de confidentialité
                        </Link>
                        .
                      </p>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <aside className="h-fit space-y-6 lg:sticky lg:top-24">
              <Card className="bg-secondary/40">
                <CardHeader>
                  <CardTitle className="font-headline text-lg">Ce que vous obtenez</CardTitle>
                  <CardDescription>Une demande simple, un cadrage clair.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 h-4 w-4 text-accent" />
                      Estimation cohérente selon votre besoin + conseils techniques
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 text-accent" />
                      Prise de contact rapide (souvent sous 24h ouvrées)
                    </li>
                    <li className="flex items-start gap-2">
                      <User className="mt-0.5 h-4 w-4 text-accent" />
                      Un interlocuteur dédié pour organiser la suite
                    </li>
                  </ul>

                  <Separator />

                  <div>
                    <p className="font-medium text-foreground">Pour gagner du temps</p>
                    <p className="mt-1">
                      Indiquez (si possible) : ville/quartier, surface, photos, plans, date souhaitée et budget indicatif.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-lg">Zones d’intervention</CardTitle>
                  <CardDescription>Paris & Île-de-France</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Yvelines (78) selon projet.
                </CardContent>
              </Card>

              <div className="rounded-xl border p-5">
                <p className="text-sm font-medium text-foreground">Besoin d’une réponse immédiate ?</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Appelez-nous, on vous guide sur la faisabilité et les prochaines étapes.
                </p>
                <Button asChild className="mt-4 w-full">
                  <a href={`tel:${PHONE}`}>Appeler {PHONE.replace("+33", "0")}</a>
                </Button>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-t bg-background">
          <div className="container py-10">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-headline text-2xl font-bold md:text-3xl">
                Devis rénovation à Paris : une estimation claire, un suivi maîtrisé
              </h2>
              <p className="mt-4 text-muted-foreground">
                ERG Rénovation accompagne les projets de rénovation intérieure (appartement, salle de bain, cuisine) à
                Paris et en Île-de-France. Votre demande est étudiée avec attention pour proposer un cadrage fiable :
                contraintes techniques, niveau de finition, planification et coordination des corps de métier.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
