// CSV exports for the accountant. Semicolons, decimal commas and a UTF-8 BOM so Excel (French
// settings) opens them directly with accents and numbers intact.

export interface ExportableInvoice {
  number: string;
  kind?: string;
  date: string;
  dueDate?: string;
  quoteNumber?: string;
  invoiceNumber?: string;
  clientName: string;
  totalHT: number;
  totalTVA55: number;
  totalTVA10: number;
  totalTVA20: number;
  totalTTC: number;
  paid?: number;
  restant?: number;
  status?: string;
  payments?: Array<{ date: string; amount: number }>;
}

const KIND_LABELS: Record<string, string> = {
  acompte: "Facture d'acompte",
  solde: 'Facture de solde',
  totale: 'Facture',
  avoir: 'Avoir',
};

const amount = (value: number | undefined) => (Math.round((Number(value) || 0) * 100) / 100).toFixed(2).replace('.', ',');
const frDate = (iso?: string) => (iso ? iso.split('-').reverse().join('/') : '');

function cell(value: string): string {
  return /[";\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

function toCsv(rows: string[][]): string {
  return `﻿${rows.map((row) => row.map(cell).join(';')).join('\r\n')}\r\n`;
}

const inPeriod = (date: string | undefined, from: string, to: string) => !!date && date >= from && date <= to;
const sum = (rows: ExportableInvoice[], key: keyof ExportableInvoice) => rows.reduce((total, row) => total + (Number(row[key]) || 0), 0);

/** Invoices and credit notes issued in the period, in number order, with a totals line. */
export function invoicesCsv(invoices: ExportableInvoice[], from: string, to: string): string {
  const rows = invoices
    .filter((invoice) => inPeriod(invoice.date, from, to))
    .sort((a, b) => a.date.localeCompare(b.date) || a.number.localeCompare(b.number));
  const header = ['Date', 'Numéro', 'Type', 'Client', 'Devis', 'Facture d’origine', 'Total HT', 'TVA 5,5 %', 'TVA 10 %', 'TVA 20 %', 'Total TTC', 'Réglé', 'Reste dû', 'Échéance', 'Statut'];
  const lines = rows.map((invoice) => [
    frDate(invoice.date),
    invoice.number,
    KIND_LABELS[invoice.kind ?? ''] ?? 'Facture',
    invoice.clientName ?? '',
    invoice.quoteNumber ?? '',
    invoice.invoiceNumber ?? '',
    amount(invoice.totalHT),
    amount(invoice.totalTVA55),
    amount(invoice.totalTVA10),
    amount(invoice.totalTVA20),
    amount(invoice.totalTTC),
    amount(invoice.paid),
    amount(invoice.restant),
    invoice.kind === 'avoir' ? '' : frDate(invoice.dueDate),
    invoice.status ?? '',
  ]);
  const totals = [
    'TOTAL', `${rows.length} document(s)`, '', '', '', '',
    amount(sum(rows, 'totalHT')), amount(sum(rows, 'totalTVA55')), amount(sum(rows, 'totalTVA10')), amount(sum(rows, 'totalTVA20')),
    amount(sum(rows, 'totalTTC')), amount(sum(rows, 'paid')), amount(sum(rows, 'restant')), '', '',
  ];
  return toCsv([header, ...lines, totals]);
}

/** Payments received in the period (whatever the invoice date), by payment date. */
export function paymentsCsv(invoices: ExportableInvoice[], from: string, to: string): string {
  const rows = invoices
    .flatMap((invoice) => (invoice.payments ?? []).map((payment) => ({ invoice, payment })))
    .filter(({ payment }) => inPeriod(payment.date, from, to))
    .sort((a, b) => a.payment.date.localeCompare(b.payment.date) || a.invoice.number.localeCompare(b.invoice.number));
  const total = rows.reduce((t, { payment }) => t + (Number(payment.amount) || 0), 0);
  return toCsv([
    ['Date du paiement', 'Facture', 'Date de la facture', 'Client', 'Montant'],
    ...rows.map(({ invoice, payment }) => [frDate(payment.date), invoice.number, frDate(invoice.date), invoice.clientName ?? '', amount(payment.amount)]),
    ['TOTAL', `${rows.length} paiement(s)`, '', '', amount(total)],
  ]);
}

export function downloadCsv(content: string, fileName: string): void {
  const url = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
