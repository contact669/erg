import { arrayUnion, collection, doc, getDocs, serverTimestamp, updateDoc, writeBatch, type Firestore } from 'firebase/firestore';
import type { QuoteData, QuoteLot } from '@/components/quote-editor/quote-types';
import { nextNumberFrom } from '@/lib/crm/numbering';

export type InvoiceKind = 'acompte' | 'solde' | 'totale';
export type InvoiceStatus = 'Émise' | 'Partiellement payée' | 'Payée';

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
}

/** An issued invoice. It is never edited afterwards: only payments are added. */
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
}

export const INVOICE_KIND_LABELS: Record<InvoiceKind, string> = {
  acompte: "Facture d'acompte",
  solde: 'Facture de solde',
  totale: 'Facture',
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
  if (kind === 'totale' && previous.length > 0) return 'Des factures existent déjà pour ce devis : émettez une facture de solde.';
  if (kind === 'solde' && previous.length === 0) return 'Aucun acompte n’a été facturé : émettez une facture totale.';
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

/** Status shown in the CRM: an unpaid invoice past its due date is late. */
export function displayStatus(invoice: Pick<InvoiceData, 'status' | 'restant' | 'dueDate'>, today = new Date().toISOString().split('T')[0]): string {
  if (invoice.status !== 'Payée' && (invoice.restant ?? 0) > 0.005 && invoice.dueDate && invoice.dueDate < today) return 'En retard';
  return invoice.status ?? 'Émise';
}

/** Issues the invoice: takes the next number of the FAC series and links it to the quote. */
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
  const number = nextNumberFrom(all.map((invoice) => invoice.number), 'FAC', new Date(`${options.date}T12:00:00`).getFullYear());
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
    restant: round2(Math.max(0, invoice.totalTTC - paid)),
    status: paymentStatus(invoice.totalTTC, paid),
    updatedAt: serverTimestamp(),
  });
}
