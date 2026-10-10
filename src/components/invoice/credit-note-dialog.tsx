"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where } from "firebase/firestore";
import { AlertTriangle, Loader2 } from "lucide-react";

import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  createCreditNote,
  creditNoteAmounts,
  creditNoteError,
  remainingToCredit,
  type CreditType,
  type InvoiceData,
} from "@/lib/crm/invoices";

const euro = (value: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value || 0);
const today = () => new Date().toISOString().split("T")[0];

interface CreditNoteDialogProps {
  invoice: InvoiceData;
  isOpen: boolean;
  onClose: () => void;
}

export function CreditNoteDialog({ invoice, isOpen, onClose }: CreditNoteDialogProps) {
  const router = useRouter();
  const firestore = useFirestore();

  const notesQuery = useMemoFirebase(
    () => (firestore && isOpen ? query(collection(firestore, "factures"), where("invoiceId", "==", invoice.id)) : null),
    [firestore, isOpen, invoice.id],
  );
  const { data: notes, isLoading } = useCollection<InvoiceData>(notesQuery);
  const remaining = remainingToCredit(invoice, notes ?? []);

  const [type, setType] = useState<CreditType>("total");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(today);
  const [reason, setReason] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setType("total");
    setAmount(0);
    setDate(today());
    setReason("");
    setSaveError("");
  }, [isOpen]);

  const validationError = creditNoteError(invoice, remaining, type, amount, reason);
  const amounts = creditNoteAmounts(remaining, type, amount);

  const handleCreate = async () => {
    if (!firestore || validationError) return;
    setIsSaving(true);
    setSaveError("");
    try {
      const id = await createCreditNote(firestore, invoice, { type, amountTTC: amount, date, reason });
      onClose();
      router.push(`/dashboard/factures/${id}`);
    } catch (error) {
      console.error("Création de l'avoir impossible:", error);
      setSaveError(error instanceof Error ? error.message : "L'avoir n'a pas pu être créé.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Émettre un avoir sur la facture {invoice.number}</DialogTitle>
          <DialogDescription className="text-xs">
            Facture de {euro(invoice.totalTTC)} TTC
            {(invoice.credited ?? 0) > 0 && <>, avoirs déjà émis : {euro(invoice.credited ?? 0)}</>} — reste annulable :{" "}
            {euro(remaining.totalTTC)} TTC
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-sm">
          <div className="grid grid-cols-2 gap-2">
            {(["total", "partiel"] as CreditType[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setType(option)}
                className={`rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-colors ${
                  type === option ? "border-amber-600 bg-amber-50 text-amber-900" : "hover:bg-muted"
                }`}
              >
                {option === "total" ? "Avoir total" : "Avoir partiel"}
                <span className="block font-normal text-muted-foreground">
                  {option === "total" ? "Annule tout le reste de la facture" : "Un montant TTC à déduire"}
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {type === "partiel" && (
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Montant TTC (€)</Label>
                <Input type="number" step="0.01" min={0} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="h-9" />
              </div>
            )}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Date de l'avoir</Label>
              <Input type="date" value={date} min={invoice.date} onChange={(e) => setDate(e.target.value)} className="h-9" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Motif (obligatoire, imprimé sur l'avoir)</Label>
            <Textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ex. : erreur de quantité sur le lot peinture, prestation annulée…"
              className="text-xs"
            />
          </div>

          <div className="rounded-xl border bg-muted/40 p-3 text-xs space-y-1">
            <div className="flex justify-between"><span>Total HT</span><span className="font-mono">{euro(amounts.totalHT)}</span></div>
            <div className="flex justify-between">
              <span>TVA</span>
              <span className="font-mono">{euro(amounts.totalTVA55 + amounts.totalTVA10 + amounts.totalTVA20)}</span>
            </div>
            <div className="flex justify-between font-bold text-sm"><span>Avoir TTC</span><span className="font-mono">{euro(amounts.totalTTC)}</span></div>
          </div>

          {(validationError || saveError) && (
            <p className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-2.5 text-xs text-destructive">
              <AlertTriangle className="h-4 w-4 shrink-0" /> {validationError || saveError}
            </p>
          )}
          {(invoice.paid ?? 0) > 0 && (
            <p className="text-xs text-amber-800">
              {euro(invoice.paid)} ont déjà été réglés sur cette facture : la part payée au-delà du nouveau montant dû est à rembourser au client.
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            L'avoir reçoit le numéro suivant de la série AV et ne peut plus être modifié ni supprimé.
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>Annuler</Button>
          <Button onClick={handleCreate} disabled={isSaving || isLoading || !!validationError} className="bg-amber-600 hover:bg-amber-500 text-white font-bold">
            {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Émission…</> : "Émettre l'avoir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
