"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useUser, useFirestore } from "@/firebase";
import { QuoteBuilder } from "@/components/quote-editor/quote-builder";
import { QuotePreview } from "@/components/quote-editor/quote-preview";
import { QuoteData } from "@/components/quote-editor/quote-types";
import { createEmptyQuote } from "@/components/quote-editor/quote-helpers";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Eye, Edit3, CheckCircle, Sparkles } from "lucide-react";

export default function NouveauDevisPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const [quote, setQuote] = useState<QuoteData>(() => createEmptyQuote());
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [isSaving, setIsSaving] = useState(false);

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

      const finalQuote: QuoteData = {
        ...quote,
        id: newDocRef.id,
      };

      await setDoc(newDocRef, {
        ...finalQuote,
        total: finalQuote.totalTTC,
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      router.push(`/dashboard/devis/${newDocRef.id}`);
    } catch (err) {
      console.error("Erreur lors de la création du devis:", err);
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
            <Save className="h-4 w-4" /> {isSaving ? "Création..." : "Enregistrer & Enregistrer"}
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
