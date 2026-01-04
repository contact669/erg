"use client";

import React, { useMemo, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getApp } from "firebase/app";

import { useFirestore } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type QuoteRequestForm = {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  projectDescription: string;
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function cleanPhone(v: string) {
  return v.replace(/[^\d+]/g, "").trim();
}

export default function QuoteRequestPage() {
  const firestore = useFirestore();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<QuoteRequestForm>({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    projectDescription: "",
  });

  const errors = useMemo(() => {
    const e: Partial<Record<keyof QuoteRequestForm, string>> = {};

    if (!form.clientName.trim()) e.clientName = "Veuillez renseigner votre nom.";
    if (!form.clientEmail.trim()) e.clientEmail = "Veuillez renseigner votre email.";
    else if (!isEmail(form.clientEmail)) e.clientEmail = "Email invalide.";
    if (form.projectDescription.trim().length < 10) {
      e.projectDescription = "Décrivez votre projet (au moins 10 caractères).";
    }

    return e;
  }, [form]);

  const canSubmit = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const onChange = (key: keyof QuoteRequestForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ----- logs de diagnostic (ne cassent rien) -----
    try {
      const app = getApp();
      console.log("[QuoteRequest] firebase projectId:", app.options.projectId);
    } catch {
      console.log("[QuoteRequest] getApp() unavailable");
    }
    console.log("[QuoteRequest] target collection:", "quoteRequests");
    // -----------------------------------------------

    if (!firestore) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Firestore n’est pas initialisé (config Firebase).",
      });
      return;
    }

    if (!canSubmit) {
      toast({
        variant: "destructive",
        title: "Formulaire incomplet",
        description: "Merci de corriger les champs indiqués.",
      });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        clientName: form.clientName.trim(),
        clientEmail: form.clientEmail.trim().toLowerCase(),
        clientPhone: cleanPhone(form.clientPhone) || null,
        projectDescription: form.projectDescription.trim(),
        status: "Nouvelle Demande",
        createdAt: serverTimestamp(),
        source: "site",
      };

      // ✅ CREATE garanti (compatible rules allow create: if true)
      const ref = await addDoc(collection(firestore, "quoteRequests"), payload);

      console.log("[QuoteRequest] created doc id:", ref.id);

      toast({
        title: "✅ Demande envoyée",
        description: "Merci ! Nous vous recontactons rapidement.",
      });

      setForm({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        projectDescription: "",
      });
    } catch (err: any) {
      console.error("Error creating quote request:", err);
      console.error("[QuoteRequest] error code:", err?.code);
      console.error("[QuoteRequest] error message:", err?.message);

      // message utile selon code
      const code = err?.code ?? "";
      const msg =
        code === "permission-denied"
          ? "Accès refusé : App Check (enforced), mauvais projet Firebase, ou chemin de collection différent."
          : code === "unauthenticated"
          ? "Vous n’êtes pas authentifié."
          : "Impossible d’envoyer la demande. Réessayez.";

      toast({
        variant: "destructive",
        title: "❌ Erreur",
        description: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Demande de devis</CardTitle>
          <CardDescription>
            Décrivez votre projet. Nous vous répondons rapidement.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-1">
              <label className="text-sm font-medium">Nom</label>
              <Input
                value={form.clientName}
                onChange={onChange("clientName")}
                placeholder="Votre nom"
                aria-invalid={!!errors.clientName}
              />
              {errors.clientName && (
                <p className="text-sm text-destructive">{errors.clientName}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <Input
                value={form.clientEmail}
                onChange={onChange("clientEmail")}
                placeholder="vous@exemple.com"
                aria-invalid={!!errors.clientEmail}
              />
              {errors.clientEmail && (
                <p className="text-sm text-destructive">{errors.clientEmail}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Téléphone (optionnel)</label>
              <Input
                value={form.clientPhone}
                onChange={onChange("clientPhone")}
                placeholder="06 12 34 56 78"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Description du projet</label>
              <Textarea
                value={form.projectDescription}
                onChange={onChange("projectDescription")}
                placeholder="Ex : rénovation salle de bain, 6m², remplacement baignoire, carrelage..."
                className="min-h-[140px]"
                aria-invalid={!!errors.projectDescription}
              />
              {errors.projectDescription && (
                <p className="text-sm text-destructive">{errors.projectDescription}</p>
              )}
            </div>

            <Button type="submit" disabled={loading || !canSubmit} className="w-full">
              {loading ? "Envoi..." : "Envoyer la demande"}
            </Button>

            <p className="text-xs text-muted-foreground">
              Si tu as encore “Missing permissions” avec ce code, la cause est quasi sûre :{" "}
              <span className="font-medium">App Check enforced</span> ou{" "}
              <span className="font-medium">mauvais projet Firebase</span>.
              Les logs console afficheront le <span className="font-medium">projectId</span>.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
