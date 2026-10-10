import { arrayUnion, collection, doc, getDocs, serverTimestamp, updateDoc, writeBatch, type Firestore } from 'firebase/firestore';
import type { QuoteData, QuoteLot } from '@/components/quote-editor/quote-types';
import { nextNumberFrom, nextRunningNumber } from '@/lib/crm/numbering';
import { COMPANY } from '@/lib/company';
import type { InvoiceReminder } from '@/lib/crm/reminders';

export type InvoiceKind = 'acompte' | 'solde' | 'totale' | 'avoir';
export type InvoiceStatus = 'Émise' | 'Partiellement payée' | 'Payée' | 'Annulée' | 'Émis';
export type CreditType = 'total' | 'partiel';

export interface InvoiceAmounts {
  totalHT: number;
  totalTVA55: number;
  totalTVA10: number;
  totalTVA20: number;
  totalTTC: number;
}

export interface InvoicePayment {
  date: string;
  amount: number;
}

export interface PreviousInvoice extends InvoiceAmounts {
  number: string;
  date: string;
  kind?: InvoiceKind;
}

/**
 * An issued invoice or credit note (kind "avoir", negative amounts). Amounts never change once
 * issued: only payments and the credited total are added (enforced by firestore.rules).
 */
export interface InvoiceData extends InvoiceAmounts {
  id: string;
  number: string;
  kind: InvoiceKind;
  percent: number | null;
  date: string;
  dueDate: string;
  quoteId: string;
  quoteNumber: string;
  clientId: string | null;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  siteAddress: string;
  projectTitle: string;
  projectName: string;
  lots: QuoteLot[];
  quoteTotals: InvoiceAmounts;
  previous: PreviousInvoice[];
  total: number;
  paid: number;
  restant: number;
  status: InvoiceStatus;
  payments: InvoicePayment[];
  /** Invoices: TTC total of the credit notes issued against it (positive). */
  credited?: number;
  creditNoteIds?: string[];
  /** Credit notes: the invoice it corrects. */
  invoiceId?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  creditType?: CreditType;
  reason?: string;
  /** Payment reminders sent from the CRM. */
  reminders?: InvoiceReminder[];
}

export const INVOICE_KIND_LABELS: Record<InvoiceKind, string> = {
  acompte: "Facture d'acompte",
  solde: 'Facture de solde',
  totale: 'Facture',
  avoir: 'Avoir',
};

const round2 = (value: number) => Math.round(value * 100) / 100;

function withTTC(amounts: Omit<InvoiceAmounts, 'totalTTC'>): InvoiceAmounts {
  const totalHT = round2(amounts.totalHT);
  const totalTVA55 = round2(amounts.totalTVA55);
  const totalTVA10 = round2(amounts.totalTVA10);
  const totalTVA20 = round2(amounts.totalTVA20);
  return { totalHT, totalTVA55, totalTVA10, totalTVA20, totalTTC: round2(totalHT + totalTVA55 + totalTVA10 + totalTVA20) };
}

export function quoteAmounts(quote: Pick<QuoteData, 'totalHT' | 'totalTVA55' | 'totalTVA10' | 'totalTVA20'>): InvoiceAmounts {
  return withTTC(quote);
}

/**
 * Amounts of a new invoice for a quote. A deposit is a share of every VAT rate; the balance is
 * the quote minus all previous invoices, so the series always adds up to the quote exactly.
 */
export function invoiceAmounts(quote: InvoiceAmounts, kind: InvoiceKind, percent: number, previous: InvoiceAmounts[]): InvoiceAmounts {
  if (kind === 'totale') return withTTC(quote);
  if (kind === 'acompte') {
    const share = percent / 100;
    return withTTC({
      totalHT: quote.totalHT * share,
      totalTVA55: quote.totalTVA55 * share,
      totalTVA10: quote.totalTVA10 * share,
      totalTVA20: quote.totalTVA20 * share,
    });
  }
  const sum = (key: keyof InvoiceAmounts) => previous.reduce((total, invoice) => total + (Number(invoice[key]) || 0), 0);
  return withTTC({
    totalHT: quote.totalHT - sum('totalHT'),
    totalTVA55: quote.totalTVA55 - sum('totalTVA55'),
    totalTVA10: quote.totalTVA10 - sum('totalTVA10'),
    totalTVA20: quote.totalTVA20 - sum('totalTVA20'),
  });
}

/** Reason the invoice cannot be issued, or null when it can. */
export function invoiceError(quote: InvoiceAmounts, kind: InvoiceKind, percent: number, previous: InvoiceAmounts[]): string | null {
  if (quote.totalTTC <= 0) return 'Le devis n’a pas de montant à facturer.';
  const alreadyInvoiced = round2(previous.reduce((total, invoice) => total + (Number(invoice.totalTTC) || 0), 0));
  // Credit notes are part of "previous" with negative amounts, so a cancelled invoice no longer counts.
  if (kind === 'avoir') return 'Un avoir s’émet depuis la facture à corriger.';
  if (kind === 'totale' && alreadyInvoiced > 0.005) return 'Des factures existent déjà pour ce devis : émettez une facture de solde.';
  if (kind === 'solde' && alreadyInvoiced <= 0.005) return 'Aucun acompte n’a été facturé : émettez une facture totale.';
  if (kind === 'acompte') {
    if (!(percent > 0 && percent < 100)) return 'Le pourcentage d’acompte doit être compris entre 1 et 99 %.';
    const amount = invoiceAmounts(quote, kind, percent, previous).totalTTC;
    if (alreadyInvoiced + amount >= quote.totalTTC - 0.005) return 'Cet acompte dépasse le reste à facturer : émettez la facture de solde.';
  }
  if (kind === 'solde' && quote.totalTTC - alreadyInvoiced <= 0.005) return 'Ce devis est déjà entièrement facturé.';
  return null;
}

export function addDays(isoDate: string, days: number): string {
  const date = new Date(`${isoDate}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

export function paymentStatus(total: number, paid: number): InvoiceStatus {
  if (paid <= 0.005) return 'Émise';
  return total - paid <= 0.005 ? 'Payée' : 'Partiellement payée';
}

/** Amount left to pay and status of an invoice, once payments and credit notes are counted. */
export function invoiceBalance(totalTTC: number, paid: number, credited: number): { restant: number; status: InvoiceStatus } {
  if (credited >= totalTTC - 0.005) return { restant: 0, status: 'Annulée' };
  const due = round2(totalTTC - credited);
  return { restant: round2(Math.max(0, due - paid)), status: paymentStatus(due, paid) };
}

/** Status shown in the CRM: an unpaid invoice past its due date is late. */
export function displayStatus(
  invoice: Pick<InvoiceData, 'status' | 'restant' | 'dueDate'> & { kind?: InvoiceKind },
  today = new Date().toISOString().split('T')[0],
): string {
  if (invoice.kind === 'avoir') return 'Avoir';
  if (invoice.status === 'Annulée') return 'Annulée';
  if (invoice.status !== 'Payée' && (invoice.restant ?? 0) > 0.005 && invoice.dueDate && invoice.dueDate < today) return 'En retard';
  return invoice.status ?? 'Émise';
}

const AMOUNT_KEYS = ['totalHT', 'totalTVA55', 'totalTVA10', 'totalTVA20'] as const;

/** Part of an invoice not yet cancelled by credit notes (credit notes carry negative amounts). */
export function remainingToCredit(invoice: InvoiceAmounts, creditNotes: InvoiceAmounts[]): InvoiceAmounts {
  const remaining = { totalHT: 0, totalTVA55: 0, totalTVA10: 0, totalTVA20: 0 };
  for (const key of AMOUNT_KEYS) remaining[key] = invoice[key] + creditNotes.reduce((sum, note) => sum + (Number(note[key]) || 0), 0);
  return withTTC(remaining);
}

/**
 * Negative amounts of a credit note. A full one cancels whatever is left of the invoice; a partial
 * one takes the TTC amount entered and splits it across VAT rates like the invoice.
 */
export function creditNoteAmounts(remaining: InvoiceAmounts, type: CreditType, amountTTC: number): InvoiceAmounts {
  const share = type === 'total' || remaining.totalTTC <= 0 ? 1 : amountTTC / remaining.totalTTC;
  const note = withTTC({
    totalHT: -remaining.totalHT * share,
    totalTVA55: -remaining.totalTVA55 * share,
    totalTVA10: -remaining.totalTVA10 * share,
    totalTVA20: -remaining.totalTVA20 * share,
  });
  if (type === 'partiel') {
    // Keep the TTC exactly as entered: a rounding cent goes on the HT amount.
    const gap = round2(-amountTTC - note.totalTTC);
    return { ...note, totalHT: round2(note.totalHT + gap), totalTTC: round2(-amountTTC) };
  }
  return note;
}

export function creditNoteError(
  invoice: { kind?: InvoiceKind },
  remaining: InvoiceAmounts,
  type: CreditType,
  amountTTC: number,
  reason: string,
): string | null {
  if (invoice.kind === 'avoir') return 'Un avoir ne peut pas être annulé par un autre avoir.';
  if (remaining.totalTTC <= 0.005) return 'Cette facture est déjà entièrement annulée.';
  if (!reason.trim()) return 'Indiquez le motif de l’avoir.';
  if (type === 'partiel' && !(amountTTC > 0 && amountTTC < remaining.totalTTC)) {
    return `Le montant d’un avoir partiel doit être compris entre 0,01 € et ${remaining.totalTTC.toFixed(2).replace('.', ',')} € (sinon, avoir total).`;
  }
  return null;
}

/** Issues the invoice: takes the next number of the F series (deposits included) and links it to the quote. */
export async function createInvoice(
  firestore: Firestore,
  quote: QuoteData & { clientId?: string | null },
  options: { kind: InvoiceKind; percent: number; date: string; dueDate: string },
): Promise<string> {
  const snapshot = await getDocs(collection(firestore, 'factures'));
  const all = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Partial<InvoiceData>) }));
  const previous: PreviousInvoice[] = all
    .filter((invoice) => invoice.quoteId === quote.id)
    .sort((a, b) => String(a.number).localeCompare(String(b.number)))
    .map((invoice) => ({
      number: invoice.number ?? '',
      date: invoice.date ?? '',
      kind: invoice.kind,
      totalHT: invoice.totalHT ?? 0,
      totalTVA55: invoice.totalTVA55 ?? 0,
      totalTVA10: invoice.totalTVA10 ?? 0,
      totalTVA20: invoice.totalTVA20 ?? 0,
      totalTTC: invoice.totalTTC ?? 0,
    }));

  const totals = quoteAmounts(quote);
  const error = invoiceError(totals, options.kind, options.percent, previous);
  if (error) throw new Error(error);

  const amounts = invoiceAmounts(totals, options.kind, options.percent, previous);
  const number = nextRunningNumber(all.map((invoice) => invoice.number), COMPANY.invoicePrefix, COMPANY.lastInvoiceBeforeCrm);
  const ref = doc(collection(firestore, 'factures'));
  const invoice: InvoiceData = {
    id: ref.id,
    number,
    kind: options.kind,
    percent: options.kind === 'acompte' ? options.percent : null,
    date: options.date,
    dueDate: options.dueDate,
    quoteId: quote.id,
    quoteNumber: quote.number,
    clientId: quote.clientId ?? null,
    clientName: quote.clientName,
    clientEmail: quote.clientEmail,
    clientPhone: quote.clientPhone,
    clientAddress: quote.clientAddress,
    siteAddress: quote.siteAddress,
    projectTitle: quote.projectTitle,
    projectName: quote.projectTitle,
    lots: quote.lots,
    quoteTotals: totals,
    previous: options.kind === 'solde' ? previous : [],
    ...amounts,
    total: amounts.totalTTC,
    paid: 0,
    restant: amounts.totalTTC,
    status: 'Émise',
    payments: [],
  };

  const batch = writeBatch(firestore);
  batch.set(ref, { ...invoice, createdAt: serverTimestamp() });
  batch.update(doc(firestore, 'quotes', quote.id), {
    invoiceIds: arrayUnion(ref.id),
    status: options.kind === 'acompte' ? 'Accepté' : 'Facturé',
    updatedAt: serverTimestamp(),
  });
  await batch.commit();
  return ref.id;
}

export async function recordPayment(firestore: Firestore, invoice: InvoiceData, payment: InvoicePayment): Promise<void> {
  const paid = round2((invoice.paid ?? 0) + payment.amount);
  await updateDoc(doc(firestore, 'factures', invoice.id), {
    // Full array rather than arrayUnion, which would drop a second identical payment.
    payments: [...(invoice.payments ?? []), payment],
    paid,
    ...invoiceBalance(invoice.totalTTC, paid, invoice.credited ?? 0),
    updatedAt: serverTimestamp(),
  });
}

/** Issues a credit note (AV series) against an invoice and updates what is left to pay on it. */
export async function createCreditNote(
  firestore: Firestore,
  invoice: InvoiceData,
  options: { type: CreditType; amountTTC: number; date: string; reason: string },
): Promise<string> {
  const snapshot = await getDocs(collection(firestore, 'factures'));
  const all = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Partial<InvoiceData>) }));
  const existingNotes = all.filter((note) => note.kind === 'avoir' && note.invoiceId === invoice.id) as InvoiceAmounts[];
  const remaining = remainingToCredit(invoice, existingNotes);
  const error = creditNoteError(invoice, remaining, options.type, options.amountTTC, options.reason);
  if (error) throw new Error(error);

  const amounts = creditNoteAmounts(remaining, options.type, options.amountTTC);
  const number = nextNumberFrom(all.map((note) => note.number), 'AV', new Date(`${options.date}T12:00:00`).getFullYear());
  const ref = doc(collection(firestore, 'factures'));
  const note: InvoiceData = {
    id: ref.id,
    number,
    kind: 'avoir',
    percent: null,
    date: options.date,
    dueDate: options.date,
    quoteId: invoice.quoteId,
    quoteNumber: invoice.quoteNumber,
    clientId: invoice.clientId ?? null,
    clientName: invoice.clientName,
    clientEmail: invoice.clientEmail,
    clientPhone: invoice.clientPhone,
    clientAddress: invoice.clientAddress,
    siteAddress: invoice.siteAddress,
    projectTitle: invoice.projectTitle,
    projectName: invoice.projectName ?? invoice.projectTitle,
    lots: [],
    quoteTotals: invoice.quoteTotals,
    previous: [],
    ...amounts,
    total: amounts.totalTTC,
    paid: 0,
    restant: 0,
    status: 'Émis',
    payments: [],
    invoiceId: invoice.id,
    invoiceNumber: invoice.number,
    invoiceDate: invoice.date,
    creditType: options.type,
    reason: options.reason.trim(),
  };

  const credited = round2((invoice.credited ?? 0) - amounts.totalTTC);
  const batch = writeBatch(firestore);
  batch.set(ref, { ...note, createdAt: serverTimestamp() });
  batch.update(doc(firestore, 'factures', invoice.id), {
    credited,
    creditNoteIds: arrayUnion(ref.id),
    ...invoiceBalance(invoice.totalTTC, invoice.paid ?? 0, credited),
    updatedAt: serverTimestamp(),
  });
  if (invoice.quoteId) {
    // The cancelled part of the quote can be invoiced again.
    batch.update(doc(firestore, 'quotes', invoice.quoteId), {
      invoiceIds: arrayUnion(ref.id),
      status: 'Accepté',
      updatedAt: serverTimestamp(),
    });
  }
  await batch.commit();
  return ref.id;
}
