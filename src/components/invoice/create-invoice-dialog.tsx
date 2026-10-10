"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where } from "firebase/firestore";
import { AlertTriangle, Loader2, Receipt } from "lucide-react";

import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { QuoteData } from "@/components/quote-editor/quote-types";
import { createEmptyQuote, recalculateQuote } from "@/components/quote-editor/quote-helpers";
import { COMPANY } from "@/lib/company";
import { nextStepInvoice, quoteSchedule, scheduleProgress } from "@/lib/crm/payment-schedule";
import {
  INVOICE_KIND_LABELS,
  addDays,
  createInvoice,
  invoiceAmounts,
  invoiceError,
  quoteAmounts,
  type InvoiceData,
  type InvoiceKind,
} from "@/lib/crm/invoices";

const euro = (value: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value || 0);
const today = () => new Date().toISOString().split("T")[0];

interface CreateInvoiceDialogProps {
  /** Quote document as stored in Firestore (with its id), or null when closed. */
  quote: (Partial<QuoteData> & { id: string; clientId?: string | null }) | null;
  onClose: () => void;
}

export function CreateInvoiceDialog({ quote, onClose }: CreateInvoiceDialogProps) {
  const router = useRouter();
  const firestore = useFirestore();

  const previousQuery = useMemoFirebase(
    () => (firestore && quote ? query(collection(firestore, "factures"), where("quoteId", "==", quote.id)) : null),
    [firestore, quote?.id],
  );
  const { data: previousDocs, isLoading } = useCollection<InvoiceData>(previousQuery);
  const previous = previousDocs ?? [];

  const fullQuote = useMemo(
    () => (quote ? recalculateQuote({ ...createEmptyQuote(), ...quote, lots: quote.lots ?? [] } as QuoteData) : null),
    [quote],
  );
  const totals = fullQuote ? quoteAmounts(fullQuote) : null;
  // Credit notes are stored with negative amounts, so this is the net amount invoiced.
  const invoicedTTC = previous.reduce((sum, invoice) => sum + (invoice.totalTTC || 0), 0);
  const hasInvoiced = invoicedTTC > 0.005;
  const steps = fullQuote ? quoteSchedule(fullQuote) : [];
  const progress = scheduleProgress(steps, previous);
  const nextStep = nextStepInvoice(steps, previous, invoicedTTC);

  const [kind, setKind] = useState<InvoiceKind>("acompte");
  const [percent, setPercent] = useState(30);
  // Schedule step billed, or null for a free amount.
  const [stepIndex, setStepIndex] = useState<number | null>(null);
  const [date, setDate] = useState(today);
  const [dueDate, setDueDate] = useState(() => addDays(today(), COMPANY.paymentDays));
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Sensible default once the quote and its previous invoices are known.
  useEffect(() => {
    if (!quote || isLoading) return;
    if (nextStep) {
      setKind(nextStep.kind);
      setPercent(nextStep.percent);
      setStepIndex(nextStep.index);
    } else {
      setKind(hasInvoiced ? "solde" : "acompte");
      setPercent(30);
      setStepIndex(null);
    }
    setDate(today());
    setDueDate(addDays(today(), COMPANY.paymentDays));
    setSaveError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quote?.id, isLoading]);

  if (!quote || !fullQuote || !totals) return null;

  const validationError = invoiceError(totals, kind, percent, previous);
  const amounts = invoiceAmounts(totals, kind, percent, previous);

  const handleCreate = async () => {
    if (!firestore || validationError) return;
    setIsSaving(true);
    setSaveError("");
    try {
      const stepLabel = stepIndex !== null ? steps[stepIndex]?.label ?? null : null;
      const id = await createInvoice(
        firestore,
        { ...fullQuote, id: quote.id, clientId: quote.clientId ?? null },
        { kind, percent, date, dueDate, stepIndex, stepLabel },
      );
      onClose();
      router.push(`/dashboard/factures/${id}`);
    } catch (error) {
      console.error("Création de facture impossible:", error);
      setSaveError(error instanceof Error ? error.message : "La facture n'a pas pu être créée.");
    } finally {
      setIsSaving(false);
    }
  };

  const kinds: InvoiceKind[] = hasInvoiced ? ["acompte", "solde"] : ["acompte", "totale"];

  return (
    <Dialog open={!!quote} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[520px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-amber-600" /> Facturer le devis {fullQuote.number}
          </DialogTitle>
          <DialogDescription className="text-xs">
            {fullQuote.clientName || "Client"} — devis de {euro(totals.totalTTC)} TTC
            {previous.length > 0 && <>, déjà facturé (avoirs déduits) : {euro(invoicedTTC)} TTC ({previous.map((p) => p.number).join(", ")})</>}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-sm">
          {steps.length > 0 && (
            <div className="rounded-xl border p-3 space-y-1.5 text-xs">
              <p className="font-semibold">Échéancier du devis</p>
              {progress.map(({ step, index, invoice }) => (
                <div key={step.id} className="flex items-center justify-between gap-2">
                  <span className={stepIndex === index ? "font-semibold text-amber-900" : ""}>
                    {index + 1}. {step.label} — {String(step.percent).replace(".", ",")} %
                  </span>
                  {invoice ? (
                    <span className="font-mono text-emerald-700">facturée {invoice.number}</span>
                  ) : nextStep?.index === index ? (
                    <button
                      type="button"
                      onClick={() => {
                        setKind(nextStep.kind);
                        setPercent(nextStep.percent);
                        setStepIndex(nextStep.index);
                      }}
                      className={`rounded-md px-2 py-0.5 font-semibold ${stepIndex === index ? "bg-amber-600 text-white" : "border hover:bg-muted"}`}
                    >
                      {stepIndex === index ? "étape suivante ✓" : "facturer cette étape"}
                    </button>
                  ) : (
                    <span className="text-muted-foreground">à facturer</span>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            {kinds.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setKind(option);
                  setStepIndex(null);
                }}
                className={`rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-colors ${
                  kind === option ? "border-amber-600 bg-amber-50 text-amber-900" : "hover:bg-muted"
                }`}
              >
                {INVOICE_KIND_LABELS[option]}
                <span className="block font-normal text-muted-foreground">
                  {option === "acompte" ? "Un pourcentage du devis" : option === "solde" ? "Le reste, acomptes déduits" : "La totalité du devis"}
                </span>
              </button>
            ))}
          </div>

          {kind === "acompte" && (
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Pourcentage du devis (%)</Label>
              <Input
                type="number"
                min={1}
                max={99}
                value={percent}
                onChange={(e) => {
                  setPercent(Number(e.target.value));
                  setStepIndex(null);
                }}
                className="h-9"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Date de la facture</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setDueDate(addDays(e.target.value, COMPANY.paymentDays));
                }}
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Date d'échéance</Label>
              <Input type="date" value={dueDate} min={date} onChange={(e) => setDueDate(e.target.value)} className="h-9" />
            </div>
          </div>

          <div className="rounded-xl border bg-muted/40 p-3 text-xs space-y-1">
            <div className="flex justify-between"><span>Total HT</span><span className="font-mono">{euro(amounts.totalHT)}</span></div>
            <div className="flex justify-between">
              <span>TVA</span>
              <span className="font-mono">{euro(amounts.totalTVA55 + amounts.totalTVA10 + amounts.totalTVA20)}</span>
            </div>
            <div className="flex justify-between font-bold text-sm"><span>Total TTC</span><span className="font-mono">{euro(amounts.totalTTC)}</span></div>
          </div>

          {(validationError || saveError) && (
            <p className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-2.5 text-xs text-destructive">
              <AlertTriangle className="h-4 w-4 shrink-0" /> {validationError || saveError}
            </p>
          )}
          {!COMPANY.decennale && (
            <p className="text-xs text-amber-800">
              L'assurance décennale n'est pas encore renseignée dans src/lib/company.ts : elle n'apparaîtra pas sur la facture.
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Une facture émise reçoit le numéro suivant de la série {COMPANY.invoicePrefix} (après {COMPANY.invoicePrefix}{String(COMPANY.lastInvoiceBeforeCrm).padStart(5, "0")} et les factures du CRM) et ne peut plus être modifiée ni supprimée.
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>Annuler</Button>
          <Button onClick={handleCreate} disabled={isSaving || isLoading || !!validationError} className="bg-amber-600 hover:bg-amber-500 text-white font-bold">
            {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Émission…</> : "Émettre la facture"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
