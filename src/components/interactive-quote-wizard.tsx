"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  Bath,
  UtensilsCrossed,
  Building2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calculator,
  Phone,
  Mail,
  User,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  Calendar,
  Layers,
  Wrench
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { firestore } from "@/firebase/init"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { submitQuoteRequest } from "@/lib/submit-quote-request"

type ProjectType = "appartement" | "salle-de-bain" | "cuisine" | "maison"
type ScopeType = "rafraichissement" | "complete" | "lourde"
type FinishType = "standard" | "premium" | "luxe"

const PROJECT_TYPES = [
  {
    id: "appartement" as ProjectType,
    title: "Appartement complet",
    desc: "Rénovation générale, distribution, peinture, sols, électricité aux normes",
    icon: Home,
    estimatedDuration: "3 à 6 semaines",
  },
  {
    id: "salle-de-bain" as ProjectType,
    title: "Salle de bain",
    desc: "Plomberie, faïence, étanchéité, douche à l'italienne, meuble vasque",
    icon: Bath,
    estimatedDuration: "2 à 3 semaines",
  },
  {
    id: "cuisine" as ProjectType,
    title: "Cuisine sur-mesure",
    desc: "Aménagement, réseaux eau/électricité, crédence, îlot central",
    icon: UtensilsCrossed,
    estimatedDuration: "2 à 4 semaines",
  },
  {
    id: "maison" as ProjectType,
    title: "Maison & Haussmannien",
    desc: "Moulures, parquet point de Hongrie, isolation, rénovation globale",
    icon: Building2,
    estimatedDuration: "6 à 12 semaines",
  },
]

const SCOPE_OPTIONS = [
  {
    id: "rafraichissement" as ScopeType,
    title: "Rafraîchissement",
    desc: "Peintures, rénovation des sols, petites retouches électriques et décoration",
  },
  {
    id: "complete" as ScopeType,
    title: "Rénovation Complète",
    desc: "Remise aux normes électricité & plomberie, sols neufs, création de pièces",
  },
  {
    id: "lourde" as ScopeType,
    title: "Rénovation Lourde / Structurelle",
    desc: "Ouverture de mur porteur, isolation thermique, modification complète des espaces",
  },
]

const FINISH_OPTIONS = [
  {
    id: "standard" as FinishType,
    title: "Gamme Confort",
    desc: "Matériaux de qualité éprouvée, finitions soignées, durables et élégantes",
  },
  {
    id: "premium" as FinishType,
    title: "Gamme Premium",
    desc: "Matériaux haut de gamme, parquet massif, robinetterie encastrée, spots intégrés",
  },
  {
    id: "luxe" as FinishType,
    title: "Gamme Sur-Mesure / Luxe",
    desc: "Marbre, agencement d'ébénisterie sur-mesure, domotique et finitions d'exception",
  },
]

export default function InteractiveQuoteWizard() {
  const { toast } = useToast()
  const [step, setStep] = useState<number>(1)
  const [projectType, setProjectType] = useState<ProjectType>("appartement")
  const [surface, setSurface] = useState<number>(45)
  const [scope, setScope] = useState<ScopeType>("complete")
  const [finish, setFinish] = useState<FinishType>("premium")

  // Form State
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [details, setDetails] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [notificationSent, setNotificationSent] = useState(true)

  const selectedProj = useMemo(
    () => PROJECT_TYPES.find((p) => p.id === projectType) || PROJECT_TYPES[0],
    [projectType]
  )
  const selectedScope = useMemo(
    () => SCOPE_OPTIONS.find((s) => s.id === scope) || SCOPE_OPTIONS[1],
    [scope]
  )
  const selectedFinish = useMemo(
    () => FINISH_OPTIONS.find((f) => f.id === finish) || FINISH_OPTIONS[1],
    [finish]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !phone || !email) {
      toast({
        title: "Champs requis manquants",
        description: "Veuillez renseigner votre nom, téléphone et adresse email.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const formattedDescription = `[Projet : ${selectedProj.title}] [Surface : ${surface} m²] [Ampleur : ${selectedScope.title}] [Finition : ${selectedFinish.title}]${details ? `\n\nPrécisions client : ${details}` : ""}`
      const result = await submitQuoteRequest({
        clientName: fullName, clientEmail: email, clientPhone: phone,
        projectDescription: formattedDescription,
      }, payload => addDoc(collection(firestore, "quoteRequests"), {
        ...payload, postalCode: postalCode.trim(),
        department: postalCode.trim().substring(0, 2), projectType: selectedProj.title,
        surface: `${surface} m²`, status: "Nouvelle Demande", createdAt: serverTimestamp(),
      }))
      setNotificationSent(result.notificationSent)
      setIsSubmitted(true)
      toast({ title: "Demande enregistrée", description: "Votre projet a bien été enregistré. Notre équipe vous recontactera." })
    } catch {
      toast({ title: "Enregistrement impossible", description: "Votre demande n’a pas été confirmée. Vos informations sont conservées : réessayez ou appelez-nous au 06 99 96 13 75.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="mx-auto max-w-4xl border border-slate-200/80 bg-white/95 shadow-2xl backdrop-blur-xl rounded-3xl overflow-hidden">
      {/* Progress Header */}
      <div className="bg-slate-900 px-6 py-6 text-white border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-bold shadow-lg">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-white">Votre demande de devis ERG Rénovation</h3>
              <p className="text-xs text-slate-400">Étude technique personnalisée & devis gratuit sans engagement</p>
            </div>
          </div>
          <span className="rounded-full bg-slate-800 px-3.5 py-1 text-xs font-semibold text-amber-400 border border-slate-700">
            Étape {step} / 4
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
            initial={{ width: "25%" }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <CardContent className="p-6 md:p-10">
        <AnimatePresence mode="wait">
          {/* STEP 1: PROJECT TYPE */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h4 className="font-headline text-xl font-bold text-slate-900">
                  Quel est votre projet de rénovation ?
                </h4>
                <p className="text-sm text-slate-500">
                  Sélectionnez le type d'intervention souhaité pour votre logement à Paris ou en Île-de-France.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {PROJECT_TYPES.map((item) => {
                  const Icon = item.icon
                  const isSelected = projectType === item.id
                  return (
                    <div
                      key={item.id}
                      onClick={() => setProjectType(item.id)}
                      className={`relative cursor-pointer rounded-2xl border p-5 transition-all duration-200 ${
                        isSelected
                          ? "border-amber-500 bg-amber-500/10 shadow-md ring-2 ring-amber-500/50"
                          : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                            isSelected ? "bg-amber-500 text-slate-950" : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="font-semibold text-slate-900">{item.title}</h5>
                          <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="absolute top-4 right-4 h-5 w-5 text-amber-500" />
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={() => setStep(2)}
                  size="lg"
                  className="bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 shadow-lg h-12 px-7 rounded-xl"
                >
                  Étape suivante <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: SURFACE & SCOPE */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h4 className="font-headline text-xl font-bold text-slate-900">
                  Surface & Ampleur des Travaux
                </h4>
                <p className="text-sm text-slate-500">
                  Indiquez la superficie concernée et le niveau d'intervention technique souhaité.
                </p>
              </div>

              {/* Surface Slider */}
              <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50/80 space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold text-slate-900">
                    Superficie à rénover :
                  </Label>
                  <span className="rounded-xl bg-amber-500/20 px-4 py-1.5 text-lg font-bold text-amber-800 border border-amber-500/30">
                    {surface} m²
                  </span>
                </div>
                <Slider
                  value={[surface]}
                  onValueChange={(val) => setSurface(val[0])}
                  min={projectType === "salle-de-bain" || projectType === "cuisine" ? 1 : 10}
                  max={200}
                  step={1}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>{projectType === "salle-de-bain" || projectType === "cuisine" ? "1 m²" : "10 m²"}</span>
                  <span>75 m² (T3 / T4)</span>
                  <span>200+ m² (Maison / Grand bien)</span>
                </div>
              </div>

              {/* Scope Options */}
              <div className="space-y-3">
                <Label className="text-base font-semibold text-slate-900">
                  Degré d'intervention technique :
                </Label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {SCOPE_OPTIONS.map((item) => {
                    const isSelected = scope === item.id
                    return (
                      <div
                        key={item.id}
                        onClick={() => setScope(item.id)}
                        className={`cursor-pointer rounded-xl border p-4 transition-all ${
                          isSelected
                            ? "border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <h5 className="font-semibold text-sm text-slate-900 mb-1">{item.title}</h5>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)} className="rounded-xl">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  size="lg"
                  className="bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 shadow-lg h-12 px-7 rounded-xl"
                >
                  Étape suivante <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: FINISH LEVEL & SUMMARY (NO PRICES) */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h4 className="font-headline text-xl font-bold text-slate-900">
                  Niveau de Finition & Gamme de Matériaux
                </h4>
                <p className="text-sm text-slate-500">
                  Sélectionnez la qualité d'équipements et d'aménagements que vous désirez.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {FINISH_OPTIONS.map((item) => {
                  const isSelected = finish === item.id
                  return (
                    <div
                      key={item.id}
                      onClick={() => setFinish(item.id)}
                      className={`relative cursor-pointer rounded-2xl border p-6 transition-all ${
                        isSelected
                          ? "border-amber-500 bg-amber-500/10 shadow-lg ring-2 ring-amber-500/50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <Sparkles
                        className={`h-6 w-6 mb-3 ${isSelected ? "text-amber-600" : "text-slate-400"}`}
                      />
                      <h5 className="font-bold text-base text-slate-900 mb-2">{item.title}</h5>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  )
                })}
              </div>

              {/* TECHNICAL SUMMARY BOX (REPLACING PRICE BOX) */}
              <div className="rounded-2xl bg-slate-900 p-6 text-white border border-slate-800 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
                      <Sparkles className="h-3.5 w-3.5" /> Synthèse de Votre Demande
                    </span>
                    <h5 className="text-xl font-bold text-white mt-1">
                      {selectedProj.title} • {surface} m²
                    </h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {selectedScope.title} — {selectedFinish.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700 text-xs font-semibold text-amber-300">
                    <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>Durée estimée : {selectedProj.estimatedDuration}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>Visite sur site offerte sous 48h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>Devis poste par poste sans surprise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>Garantie Décennale 10 Ans</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    onClick={() => setStep(4)}
                    size="lg"
                    className="w-full sm:w-auto bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 shadow-lg h-12 px-7 rounded-xl"
                  >
                    Demander mon devis détaillé <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setStep(2)} className="rounded-xl">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: CONTACT & LEAD CAPTURE */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h4 className="font-headline text-xl font-bold text-slate-900">
                      Recevez votre étude & devis détaillé
                    </h4>
                    <p className="text-sm text-slate-500">
                      Un conducteur de travaux ERG Rénovation étudiera votre projet et vous recontactera sous 24h ouvrées.
                    </p>
                  </div>

                  {/* Summary card */}
                  <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs sm:text-sm">
                      <span className="font-semibold text-slate-900">Projet sélectionné : </span>
                      <span className="font-bold text-amber-800">
                        {selectedProj.title} ({surface} m²) — {selectedScope.title}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 bg-white/80 px-2.5 py-1 rounded-md border border-slate-200">
                      {selectedFinish.title}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                        <User className="h-4 w-4 text-amber-600" /> Nom & Prénom *
                      </Label>
                      <Input
                        id="fullName"
                        className="h-11 rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white focus:border-amber-500 text-sm"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Jean Dupont"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                        <Phone className="h-4 w-4 text-amber-600" /> Téléphone *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        className="h-11 rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white focus:border-amber-500 text-sm"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="06 12 34 56 78"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                        <Mail className="h-4 w-4 text-amber-600" /> Adresse Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        className="h-11 rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white focus:border-amber-500 text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jean.dupont@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                        <MapPin className="h-4 w-4 text-amber-600" /> Ville ou Code Postal
                      </Label>
                      <Input
                        id="postalCode"
                        className="h-11 rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white focus:border-amber-500 text-sm"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="Paris 11e, 92100, 94000..."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="details" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Précisions sur vos envies ou contraintes (optionnel)
                    </Label>
                    <Textarea
                      id="details"
                      className="min-h-[90px] rounded-xl border-slate-200 bg-slate-50/70 focus:bg-white text-sm p-3"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Ex : ouverture cuisine sur séjour, réfection complète de la salle d'eau, appartement haussmannien..."
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="h-4 w-4 text-amber-600" /> Garantie Décennale
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="h-4 w-4 text-amber-600" /> Réponse sous 24h
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-amber-600" /> Visite offerte
                    </span>
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button type="button" variant="outline" onClick={() => setStep(3)} className="rounded-xl">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 shadow-lg h-13 px-8 rounded-xl text-base"
                    >
                      {isSubmitting ? "Transmission..." : "Envoyer ma demande de devis"}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="font-headline text-2xl font-bold text-slate-900">
                    Votre demande de devis est enregistrée !
                  </h4>
                  <p className="max-w-md mx-auto text-sm text-slate-600 leading-relaxed">
                    Merci <strong>{fullName}</strong>. Notre maître d'œuvre étudie votre projet ({surface} m², {selectedProj.title}) et vous rappellera au <strong>{phone}</strong> sous 24h ouvrées.
                  </p>
                  {!notificationSent && <p className="text-sm text-slate-600">La notification par email n’a pas pu être confirmée. Votre demande reste bien enregistrée ; vous pouvez nous joindre au 06 99 96 13 75.</p>}
                  <Button
                    onClick={() => {
                      setIsSubmitted(false)
                      setStep(1)
                    }}
                    variant="outline"
                    className="mt-4 rounded-xl border-slate-300 font-semibold"
                  >
                    Préparer un autre projet
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
