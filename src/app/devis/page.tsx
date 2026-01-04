"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
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


const PHONE = "+33699961375"

const formSchema = z.object({
  clientName: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  clientEmail: z.string().email("Veuillez saisir une adresse email valide."),
  clientPhone: z
    .string()
    .optional()
    .transform((v) => (v ?? "").trim())
    .refine(
      (v) => v === "" || /^[+0-9().\s-]{6,}$/.test(v),
      "Veuillez saisir un numéro de téléphone valide."
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
  const [isSubmitting, setIsSubmitting] = useState(false)
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
    if (isSubmitting || !firestore) {
      if(!firestore) {
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: "La connexion à la base de données a échoué. Veuillez rafraîchir la page.",
        })
      }
      return
    }

    setIsSubmitting(true)

    toast({
      title: "Envoi en cours…",
      description: "Nous enregistrons votre demande de devis.",
    })

    try {
      // Étape 1 : Créer la demande de devis
      const requestRef = await addDoc(collection(firestore, "quoteRequests"), {
        clientName: values.clientName.trim(),
        clientEmail: values.clientEmail.trim().toLowerCase(),
        clientPhone: (values.clientPhone ?? "").trim() || null,
        projectDescription: values.projectDescription.trim(),
        status: 'Nouvelle Demande',
        createdAt: serverTimestamp(),
      });
      
      // Étape 2: Préparer les e-mails pour l'extension
      const mailCollection = collection(firestore, "mail");

      // E-mail de confirmation pour le client
      await addDoc(mailCollection, {
        to: values.clientEmail,
        template: {
          name: "quote-request-confirmation",
        },
        // Variables à la racine du document
        clientName: values.clientName,
      });

      // E-mail de notification pour l'admin
      await addDoc(mailCollection, {
        to: "contact@erg-renovation.fr",
        template: {
          name: "quote-request-admin",
        },
        // Variables à la racine du document
        clientName: values.clientName,
        clientEmail: values.clientEmail,
        clientPhone: values.clientPhone || "Non fourni",
        projectDescription: values.projectDescription,
        requestId: requestRef.id,
      });

      toast({
        title: "Demande envoyée ✅",
        description:
          "Merci. Nous avons bien reçu votre demande et nous vous avons envoyé un e-mail de confirmation.",
      })

      form.reset()
    } catch (error) {
      console.error("Error creating quote request:", error);
      toast({
        variant: "destructive",
        title: "Impossible d’envoyer la demande",
        description: "Une erreur est survenue lors de l'enregistrement. Veuillez réessayer ou nous contacter directement.",
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

        {/* Hero (pro, épuré, conversion) */}
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

        {/* Form + Sidebar */}
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
                    {/* Vos infos */}
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
                                <Input placeholder="Ex : Amar Hachour" autoComplete="name" {...field} />
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
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </fieldset>

                    {/* Description projet */}
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
                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande"}
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

            {/* Sidebar : rassurance + SEO utile */}
            <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
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
                      Ajoutez (si possible) : ville/quartier, surface, photos, plans, date souhaitée et budget indicatif.
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

        {/* Mini bloc SEO indexable (léger) */}
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
