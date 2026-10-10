import type { PaymentStep, PaymentTerms } from '@/components/quote-editor/quote-types';

export const SCHEDULE_PRESETS: Array<{ id: string; label: string; steps: Array<Omit<PaymentStep, 'id'>> }> = [
  {
    id: '30-30-30-10',
    label: '30 / 30 / 30 / 10',
    steps: [
      { label: 'Au début des travaux', percent: 30 },
      { label: 'À la réalisation de la moitié des travaux', percent: 30 },
      { label: 'À la réalisation des 3/4 des travaux', percent: 30 },
      { label: 'À la fin des travaux', percent: 10 },
    ],
  },
  {
    id: '50-50',
    label: '50 / 50',
    steps: [
      { label: 'Au début des travaux', percent: 50 },
      { label: 'À la fin des travaux', percent: 50 },
    ],
  },
  {
    id: '30-40-30',
    label: '30 / 40 / 30',
    steps: [
      { label: 'Acompte à la commande', percent: 30 },
      { label: 'Avancement du chantier', percent: 40 },
      { label: 'Solde à la réception', percent: 30 },
    ],
  },
];

let counter = 0;
const stepId = () => `step-${Date.now().toString(36)}-${(counter++).toString(36)}`;

export function presetSteps(presetId: string): PaymentStep[] {
  const preset = SCHEDULE_PRESETS.find((p) => p.id === presetId) ?? SCHEDULE_PRESETS[0];
  return preset.steps.map((step) => ({ ...step, id: stepId() }));
}

/** Steps of a quote; quotes saved before schedules existed fall back to their 3 fixed percentages. */
export function quoteSchedule(quote: { schedule?: PaymentStep[]; paymentTerms?: PaymentTerms }): PaymentStep[] {
  if (quote.schedule && quote.schedule.length > 0) return quote.schedule;
  const terms = quote.paymentTerms ?? { downPaymentPercent: 30, midTermPercent: 40, completionPercent: 30 };
  return [
    { id: 'legacy-1', label: 'Acompte à la commande', percent: terms.downPaymentPercent },
    { id: 'legacy-2', label: 'Avancement du chantier', percent: terms.midTermPercent },
    { id: 'legacy-3', label: 'Solde à la réception', percent: terms.completionPercent },
  ].filter((step) => step.percent > 0);
}

export function scheduleTotal(steps: PaymentStep[]): number {
  return Math.round(steps.reduce((sum, step) => sum + (Number(step.percent) || 0), 0) * 100) / 100;
}

export function scheduleError(steps: PaymentStep[]): string | null {
  if (steps.length === 0) return 'Ajoutez au moins une échéance.';
  if (steps.some((step) => !(step.percent > 0))) return 'Chaque échéance doit avoir un pourcentage supérieur à 0.';
  if (steps.some((step) => !step.label.trim())) return 'Chaque échéance doit avoir un libellé.';
  const total = scheduleTotal(steps);
  if (total !== 100) return `Le total des échéances fait ${String(total).replace('.', ',')} % au lieu de 100 %.`;
  return null;
}

interface StepInvoice {
  id?: string;
  number?: string;
  kind?: string;
  status?: string;
  stepIndex?: number | null;
}

/** Each step with the invoice that bills it, if any (cancelled invoices free their step again). */
export function scheduleProgress<T extends StepInvoice>(steps: PaymentStep[], invoices: T[]): Array<{ step: PaymentStep; index: number; invoice: T | null }> {
  const active = invoices.filter((invoice) => invoice.kind !== 'avoir' && invoice.status !== 'Annulée');
  return steps.map((step, index) => ({ step, index, invoice: active.find((invoice) => invoice.stepIndex === index) ?? null }));
}

/**
 * The next step to bill and how: a deposit for its percentage, except the last step, which is the
 * balance (quote minus everything invoiced, credit notes included) so the total matches to the cent.
 */
export function nextStepInvoice(
  steps: PaymentStep[],
  invoices: StepInvoice[],
  netInvoicedTTC: number,
): { index: number; label: string; kind: 'acompte' | 'solde' | 'totale'; percent: number } | null {
  const pending = scheduleProgress(steps, invoices).find((entry) => !entry.invoice);
  if (!pending) return null;
  const isLast = scheduleProgress(steps, invoices).every((entry) => entry.index === pending.index || entry.invoice);
  if (isLast) {
    return { index: pending.index, label: pending.step.label, kind: netInvoicedTTC > 0.005 ? 'solde' : 'totale', percent: pending.step.percent };
  }
  return { index: pending.index, label: pending.step.label, kind: 'acompte', percent: pending.step.percent };
}
