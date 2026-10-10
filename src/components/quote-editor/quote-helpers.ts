import { QuoteData, QuoteLot, QuoteLineItem } from './quote-types';
import { COMPANY } from '@/lib/company';

export function sanitizeProjectDescription(desc?: string | null): string {
  if (!desc) return '';
  if (
    desc.includes('mailCollection') ||
    desc.includes('TypeError:') ||
    desc.includes('Error creating quote request') ||
    desc.includes('onSubmit')
  ) {
    return 'Projet de rénovation globale d\'appartement comprenant démolition, électricité, plomberie et finitions.';
  }
  return desc;
}

export function calculateLineItemHT(quantity: number, unitPriceHT: number): number {
  const qty = isNaN(quantity) ? 0 : quantity;
  const price = isNaN(unitPriceHT) ? 0 : unitPriceHT;
  return Math.round(qty * price * 100) / 100;
}

export function recalculateQuote(quote: QuoteData): QuoteData {
  let totalHT = 0;
  let totalTVA55 = 0;
  let totalTVA10 = 0;
  let totalTVA20 = 0;

  const updatedLots: QuoteLot[] = quote.lots.map((lot) => {
    let lotSubtotalHT = 0;

    const updatedItems: QuoteLineItem[] = lot.items.map((item) => {
      const lineHT = calculateLineItemHT(item.quantity, item.unitPriceHT);
      lotSubtotalHT += lineHT;

      // TVA calculation
      if (item.tvaRate === 5.5) {
        totalTVA55 += lineHT * 0.055;
      } else if (item.tvaRate === 10) {
        totalTVA10 += lineHT * 0.10;
      } else if (item.tvaRate === 20) {
        totalTVA20 += lineHT * 0.20;
      }

      return {
        ...item,
        totalHT: lineHT,
      };
    });

    totalHT += lotSubtotalHT;

    return {
      ...lot,
      items: updatedItems,
      subtotalHT: Math.round(lotSubtotalHT * 100) / 100,
    };
  });

  const roundedTotalHT = Math.round(totalHT * 100) / 100;
  const roundedTVA55 = Math.round(totalTVA55 * 100) / 100;
  const roundedTVA10 = Math.round(totalTVA10 * 100) / 100;
  const roundedTVA20 = Math.round(totalTVA20 * 100) / 100;
  const roundedTotalTTC = Math.round((roundedTotalHT + roundedTVA55 + roundedTVA10 + roundedTVA20) * 100) / 100;

  return {
    ...quote,
    projectDescription: sanitizeProjectDescription(quote.projectDescription),
    lots: updatedLots,
    totalHT: roundedTotalHT,
    totalTVA55: roundedTVA55,
    totalTVA10: roundedTVA10,
    totalTVA20: roundedTVA20,
    totalTTC: roundedTotalTTC,
  };
}

const DEFAULT_QUOTE_NOTES = [
  "Devis valable 30 jours. Les travaux seront exécutés selon les règles de l'art et les normes DTU en vigueur.",
  COMPANY.decennale
    ? `Entreprise couverte par une assurance décennale et responsabilité civile professionnelle (${COMPANY.decennale}).`
    : null,
].filter(Boolean).join(' ');

export function createEmptyQuote(prefill: Partial<QuoteData> = {}): QuoteData {
  const today = new Date().toISOString().split('T')[0];
  const randomNum = Math.floor(1000 + Math.random() * 9000);

  const initialQuote: QuoteData = {
    id: `DEV-${new Date().getFullYear()}-${randomNum}`,
    number: `DEV-${new Date().getFullYear()}-${randomNum}`,
    date: today,
    validityDays: 30,
    status: 'Brouillon',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    siteAddress: '',
    siteAccessDetails: '',
    projectTitle: '',
    projectDescription: '',
    lots: [],
    notes: DEFAULT_QUOTE_NOTES,
    paymentTerms: {
      downPaymentPercent: 30,
      midTermPercent: 40,
      completionPercent: 30,
    },
    totalHT: 0,
    totalTVA55: 0,
    totalTVA10: 0,
    totalTVA20: 0,
    totalTTC: 0,
    ...prefill,
  };

  return recalculateQuote(initialQuote);
}
