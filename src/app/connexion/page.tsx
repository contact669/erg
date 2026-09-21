"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { useAuth } from "@/firebase"
import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Breadcrumbs from "@/components/breadcrumbs"
import CtaBanner from "@/app/_components/cta-banner"
import { GoogleIcon } from "@/components/icons"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import { useToast } from "@/hooks/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { ShieldCheck, Lock, Mail, ArrowRight, Eye, EyeOff, Building2, Layers, CheckCircle2 } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({ message: "Veuillez saisir une adresse email valide." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
})

type FormValues = z.infer<typeof formSchema>

function authErrorToMessage(error: unknown): { title: string; description: string } {
  let title = "Une erreur est survenue"
  let description = "Veuillez réessayer."

  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/user-not-found":
        title = "Compte non trouvé"
        description = "Aucun compte n’est associé à cette adresse email."
        break
      case "auth/wrong-password":
      case "auth/invalid-credential":
        title = "Identifiants incorrects"
        description = "L’email ou le mot de passe est incorrect."
        break
      case "auth/too-many-requests":
        title = "Trop de tentatives"
        description = "Veuillez patienter quelques minutes avant de réessayer."
        break
      case "auth/network-request-failed":
        title = "Problème réseau"
        description = "Connexion instable. Vérifiez votre accès internet et réessayez."
        break
      default:
        title = "Erreur d’authentification"
        description = error.message || description
    }
  }

  return { title, description }
}

export default function ConnexionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const auth = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  })

  const emailValue = form.watch("email")
  const canReset = useMemo(() => z.string().email().safeParse(emailValue).success, [emailValue])

  const ensureAuth = () => {
    if (!auth) {
      toast({
        variant: "destructive",
        title: "Erreur de configuration",
        description: "Le service d’authentification n’est pas disponible.",
      })
      return false
    }
    return true
  }

  const onSubmit = async (values: FormValues) => {
    if (!ensureAuth()) return

    setIsSubmitting(true)
    try {
      await signInWithEmailAndPassword(auth!, values.email, values.password)

      toast({ title: "Connexion réussie", description: "Bienvenue dans votre espace CRM." })
      router.push("/dashboard")
    } catch (error) {
      const msg = authErrorToMessage(error)
      toast({ variant: "destructive", ...msg })
    } finally {
      setIsSubmitting(false)
    }
  }

  const onResetPassword = async () => {
    if (!ensureAuth()) return

    const email = form.getValues("email")
    const valid = z.string().email().safeParse(email).success
    if (!valid) {
      toast({
        variant: "destructive",
        title: "Email requis",
        description: "Saisissez une adresse email valide pour recevoir le lien de réinitialisation.",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await sendPasswordResetEmail(auth!, email)
      toast({
        title: "Email envoyé",
        description: "Si un compte existe pour cette adresse, un lien a été envoyé.",
      })
      setShowReset(false)
    } catch (error) {
      const msg = authErrorToMessage(error)
      toast({ variant: "destructive", ...msg })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50">
      <SiteHeader />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative isolate overflow-hidden bg-slate-50 border-b border-slate-200/80 py-12 md:py-16">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-50/80 to-slate-50" />
          </div>

          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <Breadcrumbs />

              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-semibold text-amber-700">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-600" /> Portail CRM & Espace Artisan Sécurisé
              </div>

              <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
                {showReset ? "Réinitialiser le Mot de Passe" : "Connexion CRM & Artisan"}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {showReset
                  ? "Saisissez votre email professionnel pour recevoir un lien de réinitialisation sécurisé."
                  : "Accédez au tableau de bord ERG Rénovation pour gérer les chantiers, plannings et devis clients."}
              </p>
            </div>
          </div>
        </section>

        {/* LOGIN FORM SECTION */}
        <section className="py-12 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-md">
              <Card className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl space-y-6">
                <div className="text-center space-y-1">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 font-bold mb-3">
                    <Lock className="h-6 w-6" />
                  </div>
                  <h2 className="font-headline text-2xl font-bold text-slate-900">
                    {showReset ? "Mot de Passe Oublié" : "Espace Authentification"}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {showReset ? "Récupération sécurisée d'accès" : "Connexion réservée aux maîtres d'œuvre et artisans ERG."}
                  </p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={showReset ? (e) => e.preventDefault() : form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5 text-amber-600" /> Adresse Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="artisan@erg-renovation.fr"
                              autoComplete="email"
                              inputMode="email"
                              className="h-11 rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white text-sm"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {!showReset && (
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="space-y-1.5">
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                              <Lock className="h-3.5 w-3.5 text-amber-600" /> Mot de passe
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  placeholder="••••••••"
                                  autoComplete="current-password"
                                  className="h-11 rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white text-sm pr-10"
                                  {...field}
                                  disabled={isSubmitting}
                                />
                              </FormControl>
                              <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-700"
                                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {showReset ? (
                      <div className="grid gap-3 pt-2">
                        <Button
                          type="button"
                          onClick={onResetPassword}
                          disabled={isSubmitting || !canReset}
                          className="h-12 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md text-sm"
                        >
                          {isSubmitting ? "Envoi..." : "Envoyer le lien de réinitialisation"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowReset(false)}
                          disabled={isSubmitting}
                          className="h-11 border-slate-300 font-semibold rounded-xl text-xs"
                        >
                          Retour à la connexion
                        </Button>
                      </div>
                    ) : (
                      <div className="grid gap-3 pt-2">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="h-12 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 text-sm"
                        >
                          {isSubmitting ? "Connexion en cours..." : "Se connecter au CRM"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>

                        <div className="flex items-center justify-between pt-1">
                          <button
                            type="button"
                            className={cn(
                              "text-xs font-semibold text-slate-500 hover:text-amber-700 hover:underline",
                              isSubmitting && "pointer-events-none opacity-60"
                            )}
                            onClick={() => setShowReset(true)}
                          >
                            Mot de passe oublié ?
                          </button>

                          <Link
                            href="/confidentialite"
                            className="text-xs font-semibold text-slate-500 hover:text-slate-800 hover:underline"
                          >
                            Confidentialité
                          </Link>
                        </div>
                      </div>
                    )}
                  </form>
                </Form>

                <Separator />

                <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-4 space-y-2 text-xs text-slate-600">
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-amber-600" /> Espace Sécurisé ERG Rénovation
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    Plateforme dédiée à la gestion des dossiers clients, plannings d'artisans, réceptions de chantier et pièces comptables.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>

      <SiteFooter />
    </div>
  )
}
