"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { doc, updateDoc, setDoc, serverTimestamp } from "firebase/firestore";

import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { QuoteBuilder } from "@/components/quote-editor/quote-builder";
import { QuotePreview } from "@/components/quote-editor/quote-preview";
import { QuoteData } from "@/components/quote-editor/quote-types";
import { createEmptyQuote, recalculateQuote } from "@/components/quote-editor/quote-helpers";
import { ArrowLeft, Save, Eye, Edit3, CheckCircle, FileText, Receipt } from "lucide-react";
import { CreateInvoiceDialog } from "@/components/invoice/create-invoice-dialog";

export default function DevisDetailClient() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const id = params?.id;

  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [localQuote, setLocalQuote] = useState<QuoteData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) router.push("/connexion");
  }, [user, isUserLoading, router]);

  useEffect(() => {
    const mode = searchParams?.get("mode");
    if (mode === "preview" || mode === "view") {
      setActiveTab("preview");
    } else {
      setActiveTab("edit");
    }
  }, [searchParams]);

  const ref = useMemoFirebase(() => {
    if (!firestore || !id || !user?.uid) return null;
    return doc(firestore, "quotes", id);
  }, [firestore, id, user?.uid]);

  const { data: quoteDoc, isLoading, error } = useDoc<any>(ref);

  useEffect(() => {
    if (quoteDoc) {
      // Hydrater le devis local avec recalcul propre
      const baseQuote: QuoteData = {
        id: id || quoteDoc.id || "DEV-2026-0000",
        number: quoteDoc.number || quoteDoc.id || `DEV-${id}`,
        date: quoteDoc.date || new Date().toISOString().split("T")[0],
        validityDays: quoteDoc.validityDays || 30,
        status: quoteDoc.status || "Brouillon",
        clientName: quoteDoc.clientName || quoteDoc.name || "",
        clientEmail: quoteDoc.clientEmail || quoteDoc.email || "",
        clientPhone: quoteDoc.clientPhone || quoteDoc.phone || "",
        clientAddress: quoteDoc.clientAddress || "",
        siteAddress: quoteDoc.siteAddress || quoteDoc.address || "",
        siteAccessDetails: quoteDoc.siteAccessDetails || "",
        projectTitle: quoteDoc.projectTitle || quoteDoc.title || "Projet de Rénovation",
        projectDescription: quoteDoc.projectDescription || quoteDoc.description || "",
        lots: Array.isArray(quoteDoc.lots) ? quoteDoc.lots : [],
        notes: quoteDoc.notes || "Devis conforme aux normes DTU en vigueur.",
        paymentTerms: quoteDoc.paymentTerms || { downPaymentPercent: 30, midTermPercent: 40, completionPercent: 30 },
        totalHT: quoteDoc.totalHT || 0,
        totalTVA55: quoteDoc.totalTVA55 || 0,
        totalTVA10: quoteDoc.totalTVA10 || 0,
        totalTVA20: quoteDoc.totalTVA20 || 0,
        totalTTC: quoteDoc.totalTTC || quoteDoc.total || 0,
      };

      setLocalQuote(recalculateQuote(baseQuote));
    } else if (!isLoading && !quoteDoc && id === "nouveau") {
      setLocalQuote(createEmptyQuote());
    }
  }, [quoteDoc, isLoading, id]);

  const handleSave = async () => {
    if (!firestore || !localQuote || !ref) return;

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const payload = {
        ...localQuote,
        total: localQuote.totalTTC, // compatibilité avec le reste du dashboard
        updatedAt: serverTimestamp(),
      };

      await setDoc(ref, payload, { merge: true });
      setSaveSuccess(true);

      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Erreur de sauvegarde devis Firestore:", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isUserLoading || !user || (isLoading && id !== "nouveau")) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>
    );
  }

  if (!localQuote && !isLoading && id !== "nouveau" && error) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => router.push("/dashboard/devis")} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Retour
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Devis introuvable</CardTitle>
            <CardDescription>Le document demandée n'existe pas ou les accès sont restreints.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const currentQuote = localQuote || createEmptyQuote();

  return (
    <div className="space-y-6 pb-16">
      {/* TOP NAV BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-background border p-4 rounded-xl shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/devis")} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Retour
          </Button>
          <div>
            <h1 className="font-bold text-xl tracking-tight flex items-center gap-2">
              <FileText className="h-5 w-5 text-amber-600" />
              Devis N° {currentQuote.number}
            </h1>
            <p className="text-xs text-muted-foreground">{currentQuote.clientName || "Client non renseigné"}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* TABS */}
          <div className="bg-muted p-1 rounded-lg flex items-center gap-1 text-xs">
            <button
              onClick={() => setActiveTab("edit")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "edit"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Edit3 className="h-3.5 w-3.5 text-amber-600" /> Éditeur & Lots
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "preview"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye className="h-3.5 w-3.5 text-amber-600" /> Aperçu PDF Officiel
            </button>
          </div>

          {quoteDoc && (
            <Button variant="outline" onClick={() => setIsInvoiceOpen(true)} className="gap-2 font-semibold">
              <Receipt className="h-4 w-4 text-amber-600" /> Facturer
            </Button>
          )}

          {/* SAVE BUTTON */}
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-amber-600 hover:bg-amber-500 text-white font-semibold gap-2"
          >
            {saveSuccess ? (
              <>
                <CheckCircle className="h-4 w-4 text-white" /> Sauvegardé !
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> {isSaving ? "Sauvegarde..." : "Enregistrer Devis"}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* TAB CONTENT */}
      {activeTab === "edit" ? (
        <QuoteBuilder quote={currentQuote} onChange={(updated) => setLocalQuote(updated)} />
      ) : (
        <QuotePreview quote={currentQuote} onEditRequested={() => setActiveTab("edit")} />
      )}

      <CreateInvoiceDialog
        // The saved version is invoiced, not unsaved edits.
        quote={isInvoiceOpen && quoteDoc ? { ...quoteDoc, id: quoteDoc.id } : null}
        onClose={() => setIsInvoiceOpen(false)}
      />
    </div>
  );
}
