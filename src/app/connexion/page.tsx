"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { useAuth } from "@/firebase"
import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Breadcrumbs from "@/components/breadcrumbs"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import { useToast } from "@/hooks/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { ShieldCheck, Lock, Mail, ArrowRight, Eye, EyeOff } from "lucide-react"

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean)

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
        description = "Aucun compte admin n’est associé à cette adresse email."
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

  const isAdminEmailAllowed = (email: string) => {
    if (ADMIN_EMAILS.length === 0) return true // si tu ne configures pas la whitelist, on laisse passer
    return ADMIN_EMAILS.includes(email.trim().toLowerCase())
  }

  const onSubmit = async (values: FormValues) => {
    if (!ensureAuth()) return

    // ✅ Whitelist email admin (recommandé)
    if (!isAdminEmailAllowed(values.email)) {
      toast({
        variant: "destructive",
        title: "Accès refusé",
        description: "Cette adresse email n’a pas accès à l’espace administrateur.",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await signInWithEmailAndPassword(auth!, values.email, values.password)

      // ✅ Optionnel mais recommandé : vérifier un flag “admin” via custom claims (voir section 2)
      // Si tu n’as pas encore de claims, laisse ça commenté.
      // const token = await auth!.currentUser?.getIdTokenResult()
      // if (!token?.claims?.admin) {
      //   await signOut(auth!)
      //   toast({ variant: "destructive", title: "Accès refusé", description: "Compte non autorisé (admin requis)." })
      //   return
      // }

      toast({ title: "Connexion réussie", description: "Bienvenue dans l’espace administrateur." })
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

    // (optionnel) on peut aussi restreindre le reset aux emails admin whitelistés
    if (!isAdminEmailAllowed(email)) {
      toast({
        variant: "destructive",
        title: "Accès refusé",
        description: "Cette adresse email n’est pas autorisée pour l’espace administrateur.",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await sendPasswordResetEmail(auth!, email)
      toast({
        title: "Email envoyé",
        description: "Si un compte admin existe pour cette adresse, un lien a été envoyé.",
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
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-grow">
        <Breadcrumbs />

        <section className="border-b bg-secondary/50">
          <div className="container py-10 md:py-14">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-accent" />
                Accès sécurisé — administrateur uniquement
              </div>

              <h1 className="mt-5 font-headline text-3xl font-bold tracking-tight md:text-5xl">
                {showReset ? "Réinitialiser le mot de passe" : "Connexion administrateur"}
              </h1>

              <p className="mt-3 text-muted-foreground md:text-lg">
                {showReset
                  ? "Recevez un lien de réinitialisation par email."
                  : "Connectez-vous pour accéder au tableau de bord et gérer le site."}
              </p>
            </div>
          </div>
        </section>

        <section className="container py-10 md:py-14">
          <div className="mx-auto max-w-md">
            <Card className="overflow-hidden">
              <CardHeader className="space-y-2 text-center">
                <CardTitle className="font-headline text-2xl">
                  {showReset ? "Mot de passe oublié" : "Espace Admin"}
                </CardTitle>
                <CardDescription>
                  {showReset
                    ? "Saisissez votre email admin. Nous vous enverrons un lien sécurisé."
                    : "Authentification via Firebase. Accès réservé."}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <Form {...form}>
                  <form
                    onSubmit={showReset ? (e) => e.preventDefault() : form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="inline-flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="admin@exemple.com"
                              autoComplete="email"
                              inputMode="email"
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
                          <FormItem>
                             <FormLabel className="inline-flex items-center gap-2">
                              <Lock className="h-4 w-4 text-muted-foreground" />
                              Mot de passe
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  placeholder="••••••••"
                                  autoComplete="current-password"
                                  {...field}
                                  disabled={isSubmitting}
                                  className="pr-10"
                                />
                              </FormControl>
                              <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                              >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {showReset ? (
                      <div className="grid gap-3">
                        <Button
                          type="button"
                          onClick={onResetPassword}
                          disabled={isSubmitting || !canReset}
                          className="w-full"
                        >
                          {isSubmitting ? "Envoi..." : "Envoyer le lien de réinitialisation"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowReset(false)}
                          disabled={isSubmitting}
                          className="w-full"
                        >
                          Retour à la connexion
                        </Button>
                      </div>
                    ) : (
                      <div className="grid gap-3">
                        <Button type="submit" disabled={isSubmitting} className="w-full">
                          {isSubmitting ? "Connexion..." : "Se connecter"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>

                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            className={cn(
                              "text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
                              isSubmitting && "pointer-events-none opacity-60"
                            )}
                            onClick={() => setShowReset(true)}
                          >
                            Mot de passe oublié ?
                          </button>

                          <Link
                            href="/confidentialite"
                            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                          >
                            Confidentialité
                          </Link>
                        </div>
                      </div>
                    )}
                  </form>
                </Form>

                <Separator />

                <p className="text-center text-xs text-muted-foreground">
                  En continuant, vous acceptez nos{" "}
                  <Link href="/mentions-legales" className="underline underline-offset-4 hover:text-foreground">
                    mentions légales
                  </Link>{" "}
                  et notre{" "}
                  <Link href="/confidentialite" className="underline underline-offset-4 hover:text-foreground">
                    politique de confidentialité
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>

            {/* Hint optionnel */}
            {ADMIN_EMAILS.length > 0 && (
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Accès limité aux emails admin autorisés.
              </p>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
