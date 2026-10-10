"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { doc } from "firebase/firestore";
import { ArrowLeft, BellRing, Download, Euro, FileMinus, Loader2, Printer, Receipt, Send } from "lucide-react";

import { useDoc, useFirestore, useMemoFirebase, useUser } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SendDocumentModal } from "@/components/pdf-studio/send-document-modal";
import { INVOICE_PDF_CONTAINER_ID, InvoicePreview } from "@/components/invoice/invoice-preview";
import { CreditNoteDialog } from "@/components/invoice/credit-note-dialog";
import { INVOICE_KIND_LABELS, displayStatus, recordPayment, type InvoiceData } from "@/lib/crm/invoices";
import { downloadElementAsPdf } from "@/lib/generate-pdf";
import {
  REMINDER_LABELS,
  daysBetween,
  isOverdue,
  lastReminder,
  nextReminderLevel,
  recordReminder,
  reminderEmail,
} from "@/lib/crm/reminders";

const euro = (value: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value || 0);
const today = () => new Date().toISOString().split("T")[0];

export default function FactureDetailClient() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const id = params?.id;
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const [isSendOpen, setIsSendOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentDate, setPaymentDate] = useState(today);
  const [isRecording, setIsRecording] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [isCreditOpen, setIsCreditOpen] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  // Level frozen when the dialog opens, so recording the reminder does not swap the draft under the user.
  const [openLevel, setOpenLevel] = useState<1 | 2 | 3 | null>(null);
  const [reminderNotice, setReminderNotice] = useState("");

  useEffect(() => {
    if (!isUserLoading && !user) router.push("/connexion");
  }, [user, isUserLoading, router]);

  const ref = useMemoFirebase(() => (firestore && id && user ? doc(firestore, "factures", id) : null), [firestore, id, user]);
  const { data: invoice, isLoading } = useDoc<InvoiceData>(ref);

  // Opened from the dashboard "Relancer" button.
  const wantsReminder = searchParams?.get("relance") === "1";
  useEffect(() => {
    if (wantsReminder && invoice && isOverdue(invoice, today())) {
      setOpenLevel(nextReminderLevel(invoice));
      setIsReminderOpen(true);
    }
  }, [wantsReminder, invoice?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isUserLoading || !user || isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => router.push("/dashboard/factures")} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Retour
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Facture introuvable</CardTitle>
            <CardDescription>Cette facture n'existe pas ou n'est plus accessible.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const status = displayStatus(invoice);
  const isCreditNote = invoice.kind === "avoir";
  const pdfName = `${isCreditNote ? "Avoir" : "Facture"}_ERG_${invoice.number}`;
  const overdue = isOverdue(invoice, today());
  const reminderLevel = openLevel ?? nextReminderLevel(invoice);
  const openReminder = () => {
    setOpenLevel(nextReminderLevel(invoice));
    setIsReminderOpen(true);
  };
  const reminderDraft = reminderEmail(invoice, reminderLevel, today());
  const previousReminder = lastReminder(invoice);

  const handleReminderSent = async (to: string) => {
    if (!firestore) return;
    try {
      await recordReminder(firestore, invoice, { date: today(), level: reminderLevel, to });
      setReminderNotice("");
    } catch (error) {
      // Usually firestore.rules not yet republished with the "reminders" field.
      console.error("Enregistrement de la relance impossible:", error);
      setReminderNotice("La relance a bien été envoyée, mais elle n'a pas pu être enregistrée dans l'historique (règles Firestore à republier).");
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    await downloadElementAsPdf(INVOICE_PDF_CONTAINER_ID, pdfName);
    setIsDownloading(false);
  };

  const openPayment = () => {
    setPaymentAmount(invoice.restant);
    setPaymentDate(today());
    setPaymentError("");
    setIsPaymentOpen(true);
  };

  const handleRecordPayment = async () => {
    if (!firestore) return;
    if (!(paymentAmount > 0) || paymentAmount > invoice.restant + 0.005) {
      setPaymentError(`Le montant doit être compris entre 0,01 € et ${euro(invoice.restant)}.`);
      return;
    }
    setIsRecording(true);
    try {
      await recordPayment(firestore, invoice, { date: paymentDate, amount: Math.round(paymentAmount * 100) / 100 });
      setIsPaymentOpen(false);
    } catch (error) {
      console.error("Enregistrement du paiement impossible:", error);
      setPaymentError("Le paiement n'a pas pu être enregistré.");
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-background border p-4 rounded-xl shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/factures")} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Retour
          </Button>
          <div>
            <h1 className="font-bold text-xl tracking-tight flex items-center gap-2">
              <Receipt className="h-5 w-5 text-amber-600" /> {INVOICE_KIND_LABELS[invoice.kind]} N° {invoice.number}
            </h1>
            <p className="text-xs text-muted-foreground">
              {invoice.clientName} — devis{" "}
              <button className="underline" onClick={() => router.push(`/dashboard/devis/${invoice.quoteId}?mode=preview`)}>
                {invoice.quoteNumber}
              </button>
              {isCreditNote && invoice.invoiceId && (
                <>
                  {" "}— facture{" "}
                  <button className="underline" onClick={() => router.push(`/dashboard/factures/${invoice.invoiceId}`)}>
                    {invoice.invoiceNumber}
                  </button>
                </>
              )}
              {(invoice.creditNoteIds ?? []).length > 0 && <> — {invoice.creditNoteIds!.length} avoir(s) émis</>}
            </p>
          </div>
          <Badge variant={status === "Payée" ? "default" : status === "En retard" ? "destructive" : "outline"}>{status}</Badge>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!isCreditNote && status !== "Annulée" && (
            <Button onClick={() => setIsCreditOpen(true)} size="sm" variant="outline" className="gap-1.5 font-semibold">
              <FileMinus className="h-4 w-4" /> Émettre un avoir
            </Button>
          )}
          {overdue && (
            <Button onClick={openReminder} size="sm" className="gap-1.5 font-bold bg-rose-600 hover:bg-rose-500 text-white">
              <BellRing className="h-4 w-4" /> Relancer ({REMINDER_LABELS[reminderLevel].toLowerCase()})
            </Button>
          )}
          {!isCreditNote && invoice.restant > 0.005 && (
            <Button onClick={openPayment} size="sm" variant="outline" className="gap-1.5 font-semibold">
              <Euro className="h-4 w-4" /> Enregistrer un paiement
            </Button>
          )}
          <Button onClick={handleDownload} disabled={isDownloading} size="sm" className="gap-1.5 font-bold bg-amber-600 hover:bg-amber-500 text-white">
            <Download className="h-4 w-4" /> {isDownloading ? "Génération PDF…" : "Télécharger le PDF"}
          </Button>
          <Button onClick={() => window.print()} size="sm" variant="outline" className="gap-1.5">
            <Printer className="h-4 w-4" /> Imprimer
          </Button>
          <Button onClick={() => setIsSendOpen(true)} size="sm" className="gap-1.5 font-bold bg-amber-600 hover:bg-amber-500 text-white">
            <Send className="h-4 w-4" /> Envoyer par email
          </Button>
        </div>
      </div>

      {reminderNotice && (
        <p className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 print:hidden">{reminderNotice}</p>
      )}

      {(overdue || (invoice.reminders ?? []).length > 0) && (
        <Card className="print:hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Relances</CardTitle>
            <CardDescription className="text-xs">
              {overdue ? `Échéance dépassée de ${daysBetween(invoice.dueDate, today())} jours. ` : ""}
              {previousReminder
                ? `Dernière relance il y a ${daysBetween(previousReminder.date, today())} jours.`
                : "Aucune relance envoyée."}
            </CardDescription>
          </CardHeader>
          {(invoice.reminders ?? []).length > 0 && (
            <CardContent className="text-sm space-y-1">
              {invoice.reminders!.map((reminder, index) => (
                <div key={`${reminder.date}-${index}`} className="flex justify-between gap-4">
                  <span>{new Date(`${reminder.date}T12:00:00`).toLocaleDateString("fr-FR")} — {REMINDER_LABELS[reminder.level]}</span>
                  <span className="text-muted-foreground truncate">{reminder.to}</span>
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      )}

      {(invoice.payments ?? []).length > 0 && (
        <Card className="print:hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Paiements reçus</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            {invoice.payments.map((payment, index) => (
              <div key={`${payment.date}-${index}`} className="flex justify-between">
                <span>{new Date(`${payment.date}T12:00:00`).toLocaleDateString("fr-FR")}</span>
                <span className="font-mono">{euro(payment.amount)}</span>
              </div>
            ))}
            <div className="flex justify-between border-t pt-1 font-semibold">
              <span>Reste à payer</span>
              <span className="font-mono">{euro(invoice.restant)}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <InvoicePreview invoice={invoice} />

      {!isCreditNote && <CreditNoteDialog invoice={invoice} isOpen={isCreditOpen} onClose={() => setIsCreditOpen(false)} />}

      <SendDocumentModal
        isOpen={isSendOpen}
        onClose={() => setIsSendOpen(false)}
        documentType={INVOICE_KIND_LABELS[invoice.kind]}
        documentNumber={invoice.number}
        defaultClientName={invoice.clientName}
        defaultClientEmail={invoice.clientEmail}
        pdfElementId={INVOICE_PDF_CONTAINER_ID}
      />

      {overdue && (
        <SendDocumentModal
          isOpen={isReminderOpen}
          onClose={() => {
            setIsReminderOpen(false);
            setOpenLevel(null);
          }}
          documentType={`${REMINDER_LABELS[reminderLevel]} — ${INVOICE_KIND_LABELS[invoice.kind]}`}
          documentNumber={invoice.number}
          defaultClientName={invoice.clientName}
          defaultClientEmail={invoice.clientEmail}
          defaultSubject={reminderDraft.subject}
          defaultMessage={reminderDraft.message}
          pdfElementId={INVOICE_PDF_CONTAINER_ID}
          onSent={handleReminderSent}
        />
      )}

      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-[420px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Enregistrer un paiement</DialogTitle>
            <DialogDescription className="text-xs">
              Facture {invoice.number} — reste à payer {euro(invoice.restant)}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Montant reçu (€)</Label>
              <Input type="number" step="0.01" min={0} value={paymentAmount} onChange={(e) => setPaymentAmount(Number(e.target.value))} className="h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Date du paiement</Label>
              <Input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} className="h-9" />
            </div>
          </div>
          {paymentError && <p className="text-xs text-destructive">{paymentError}</p>}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsPaymentOpen(false)} disabled={isRecording}>Annuler</Button>
            <Button onClick={handleRecordPayment} disabled={isRecording} className="bg-amber-600 hover:bg-amber-500 text-white font-bold">
              {isRecording ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enregistrer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
