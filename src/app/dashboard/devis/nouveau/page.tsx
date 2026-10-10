"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { arrayUnion, collection, doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useUser, useFirestore } from "@/firebase";
import { QuoteBuilder } from "@/components/quote-editor/quote-builder";
import { QuotePreview } from "@/components/quote-editor/quote-preview";
import { QuoteData } from "@/components/quote-editor/quote-types";
import { createEmptyQuote } from "@/components/quote-editor/quote-helpers";
import { findOrCreateClient } from "@/lib/crm/clients";
import { nextQuoteNumber } from "@/lib/crm/numbering";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Eye, Edit3, CheckCircle, Sparkles } from "lucide-react";

export default function NouveauDevisPage() {
  return (
    <Suspense fallback={<div className="p-6">Chargement…</div>}>
      <NouveauDevis />
    </Suspense>
  );
}

function NouveauDevis() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromRequest = searchParams.get("fromRequest");
  const fromClient = searchParams.get("client");
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const [quote, setQuote] = useState<QuoteData>(() => createEmptyQuote());
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [isSaving, setIsSaving] = useState(false);
  const [clientId, setClientId] = useState<string | null>(fromClient);
  const [autoNumber, setAutoNumber] = useState<string | null>(null);

  // Propose the next number of the yearly sequence; it is confirmed again when saving.
  useEffect(() => {
    if (!firestore || !user) return;
    nextQuoteNumber(firestore)
      .then((number) => {
        setAutoNumber(number);
        setQuote((current) => ({ ...current, number }));
      })
      .catch((error) => console.error("Numérotation du devis impossible:", error));
  }, [firestore, user]);

  // Pre-fill the quote from a website request or an existing client.
  useEffect(() => {
    if (!firestore || !user) return;
    const source = fromRequest ? doc(firestore, "quoteRequests", fromRequest) : fromClient ? doc(firestore, "clients", fromClient) : null;
    if (!source) return;
    getDoc(source)
      .then((snapshot) => {
        if (!snapshot.exists()) return;
        const data = snapshot.data();
        const address = [data.address, [data.postalCode, data.city].filter(Boolean).join(" ")].filter(Boolean).join(", ");
        setQuote((current) => createEmptyQuote({
          number: current.number,
          clientName: data.clientName ?? data.name ?? "",
          clientEmail: data.clientEmail ?? data.email ?? "",
          clientPhone: data.clientPhone ?? data.phone ?? "",
          clientAddress: address,
          siteAddress: address,
          projectTitle: data.projectType ?? "",
          projectDescription: data.projectDescription ?? "",
        }));
      })
      .catch((error) => {
        console.error("Pré-remplissage du devis impossible:", error);
        toast({ variant: "destructive", title: "Impossible de charger les informations du client" });
      });
  }, [firestore, user, fromRequest, fromClient, toast]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>
    );
  }

  const handleSaveNewQuote = async () => {
    if (!firestore || !user?.uid) return;

    setIsSaving(true);
    try {
      const quotesCol = collection(firestore, "quotes");
      const newDocRef = doc(quotesCol);

      // Keep a number typed by hand; otherwise take the latest free number in the sequence.
      const number = !autoNumber || quote.number === autoNumber ? await nextQuoteNumber(firestore) : quote.number;
      const finalQuote: QuoteData = {
        ...quote,
        number,
        id: newDocRef.id,
      };

      // Every quote is attached to a client record, created on the fly if needed.
      let linkedClientId = clientId;
      if (!linkedClientId && quote.clientName.trim()) {
        linkedClientId = await findOrCreateClient(firestore, {
          name: quote.clientName,
          email: quote.clientEmail,
          phone: quote.clientPhone,
          address: quote.clientAddress,
          source: fromRequest ? "Site web" : "Saisie manuelle",
          requestId: fromRequest ?? undefined,
        });
        setClientId(linkedClientId);
      }

      await setDoc(newDocRef, {
        ...finalQuote,
        total: finalQuote.totalTTC,
        clientId: linkedClientId ?? null,
        requestId: fromRequest ?? null,
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      if (fromRequest) {
        await updateDoc(doc(firestore, "quoteRequests", fromRequest), {
          status: "Traité",
          pipelineStage: "quoting",
          quoteIds: arrayUnion(newDocRef.id),
          clientId: linkedClientId ?? null,
        });
      }

      router.push(`/dashboard/devis/${newDocRef.id}`);
    } catch (err) {
      console.error("Erreur lors de la création du devis:", err);
      toast({ variant: "destructive", title: "Le devis n'a pas pu être enregistré", description: "Vérifiez votre connexion puis réessayez." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-background border p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/devis")} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Retour
          </Button>
          <div>
            <h1 className="font-bold text-xl tracking-tight flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-600" />
              Nouveau Devis Rénovation
            </h1>
            <p className="text-xs text-muted-foreground">Chiffrage par lots techniques et pré-chiffrage automatique</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-muted p-1 rounded-lg flex items-center gap-1 text-xs">
            <button
              onClick={() => setActiveTab("edit")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "edit"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Edit3 className="h-3.5 w-3.5 text-amber-600" /> Éditeur
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "preview"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye className="h-3.5 w-3.5 text-amber-600" /> Aperçu PDF
            </button>
          </div>

          <Button
            onClick={handleSaveNewQuote}
            disabled={isSaving}
            className="bg-amber-600 hover:bg-amber-500 text-white font-semibold gap-2"
          >
            <Save className="h-4 w-4" /> {isSaving ? "Création..." : "Enregistrer le devis"}
          </Button>
        </div>
      </div>

      {activeTab === "edit" ? (
        <QuoteBuilder quote={quote} onChange={(updated) => setQuote(updated)} />
      ) : (
        <QuotePreview quote={quote} onEditRequested={() => setActiveTab("edit")} />
      )}
    </div>
  );
}
