import { doc, serverTimestamp, updateDoc, type Firestore } from 'firebase/firestore';
import { COMPANY } from '@/lib/company';

export type ReminderLevel = 1 | 2 | 3;

export interface InvoiceReminder {
  date: string;
  level: ReminderLevel;
  to: string;
}

/** Fields of an invoice the reminders need (kept minimal so pure helpers are easy to test). */
export interface RemindableInvoice {
  id: string;
  number: string;
  kind?: string;
  date: string;
  dueDate: string;
  totalTTC: number;
  restant: number;
  status?: string;
  clientName: string;
  clientEmail: string;
  reminders?: InvoiceReminder[];
}

export const REMINDER_LABELS: Record<ReminderLevel, string> = {
  1: 'Relance amiable',
  2: 'Deuxième relance',
  3: 'Mise en demeure',
};

const DAY = 24 * 60 * 60 * 1000;
const toDay = (iso: string) => new Date(`${iso}T12:00:00`).getTime();
const euro = (value: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value || 0);
const frDate = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString('fr-FR');

export function daysBetween(fromIso: string, toIso: string): number {
  return Math.round((toDay(toIso) - toDay(fromIso)) / DAY);
}

/** An invoice is overdue when something is left to pay after its due date (credit notes excluded). */
export function isOverdue(invoice: RemindableInvoice, today: string): boolean {
  return invoice.kind !== 'avoir' && invoice.status !== 'Annulée' && invoice.status !== 'Payée'
    && (invoice.restant ?? 0) > 0.005 && !!invoice.dueDate && invoice.dueDate < today;
}

/** Overdue invoices, the oldest due date first. */
export function overdueInvoices<T extends RemindableInvoice>(invoices: T[], today: string): Array<T & { daysLate: number }> {
  return invoices
    .filter((invoice) => isOverdue(invoice, today))
    .map((invoice) => ({ ...invoice, daysLate: daysBetween(invoice.dueDate, today) }))
    .sort((a, b) => b.daysLate - a.daysLate);
}

export function lastReminder(invoice: RemindableInvoice): InvoiceReminder | null {
  const reminders = invoice.reminders ?? [];
  return reminders.length ? reminders[reminders.length - 1] : null;
}

/** 1st reminder, then 2nd, then formal notice; it stays at the formal notice afterwards. */
export function nextReminderLevel(invoice: RemindableInvoice): ReminderLevel {
  const last = lastReminder(invoice);
  return (last ? Math.min(3, last.level + 1) : 1) as ReminderLevel;
}

/** Prefilled subject and message; the admin can edit both before sending. */
export function reminderEmail(invoice: RemindableInvoice, level: ReminderLevel, today: string): { subject: string; message: string } {
  const greeting = `Bonjour ${invoice.clientName || 'Madame, Monsieur'},`;
  const facts = `notre facture N° ${invoice.number} du ${frDate(invoice.date)}, d'un montant de ${euro(invoice.totalTTC)} TTC, arrivée à échéance le ${frDate(invoice.dueDate)}`;
  const rest = `Le montant restant dû s'élève à ${euro(invoice.restant)}.`;
  const bank = COMPANY.iban ? `\n\nRèglement par virement : IBAN ${COMPANY.iban}${COMPANY.bic ? ` — BIC ${COMPANY.bic}` : ''}, en indiquant le numéro de facture.` : '';
  const signature = `\n\nCordialement,\n${COMPANY.name}\n${COMPANY.phoneLabel} — ${COMPANY.email}`;
  const late = daysBetween(invoice.dueDate, today);

  if (level === 1) {
    return {
      subject: `Rappel : facture ${invoice.number} en attente de règlement`,
      message: `${greeting}\n\nSauf erreur de notre part, ${facts}, n'a pas encore été réglée. ${rest}\n\nVous trouverez la facture en pièce jointe. Si le règlement a été effectué entre-temps, merci de ne pas tenir compte de ce message.${bank}${signature}`,
    };
  }
  if (level === 2) {
    return {
      subject: `Deuxième relance : facture ${invoice.number} impayée`,
      message: `${greeting}\n\nMalgré notre précédent rappel, ${facts}, reste impayée à ce jour, soit ${late} jours après l'échéance. ${rest}\n\nNous vous remercions de procéder au règlement sous 8 jours. À défaut, nous serons contraints d'appliquer les pénalités de retard prévues à nos conditions de règlement.${bank}${signature}`,
    };
  }
  return {
    subject: `Mise en demeure de payer : facture ${invoice.number}`,
    message: `${greeting}\n\nMalgré nos relances, ${facts}, demeure impayée, soit ${late} jours après l'échéance. ${rest}\n\nPar la présente, nous vous mettons en demeure de régler cette somme sous 8 jours à compter de la réception de ce message. Conformément à nos conditions de règlement, des pénalités de retard au taux de ${COMPANY.latePenalty} sont exigibles depuis le lendemain de l'échéance, ainsi que, pour les clients professionnels, l'indemnité forfaitaire pour frais de recouvrement de 40 € (art. L441-10 du Code de commerce).\n\nÀ défaut de règlement dans ce délai, nous engagerons une procédure de recouvrement.${bank}${signature}`,
  };
}

/** Recorded after the email is sent. Full array rather than arrayUnion, like payments. */
export async function recordReminder(firestore: Firestore, invoice: RemindableInvoice, reminder: InvoiceReminder): Promise<void> {
  await updateDoc(doc(firestore, 'factures', invoice.id), {
    reminders: [...(invoice.reminders ?? []), reminder],
    updatedAt: serverTimestamp(),
  });
}
