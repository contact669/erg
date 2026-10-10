import { collection, doc, getDocs, limit, query, serverTimestamp, updateDoc, where, writeBatch, type Firestore } from 'firebase/firestore';

export type ProjectStatus = 'Planification' | 'En cours' | 'Terminé' | 'Réceptionné';

export const PROJECT_STATUSES: ProjectStatus[] = ['Planification', 'En cours', 'Terminé', 'Réceptionné'];

export interface ProjectNote {
  date: string;
  text: string;
}

/** A job site, created from an accepted quote (collection "projects"). */
export interface ProjectData {
  id: string;
  title: string;
  quoteId: string;
  quoteNumber: string;
  clientId: string | null;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  siteAddress: string;
  siteAccessDetails: string;
  status: ProjectStatus;
  progress: number;
  startDate: string;
  plannedEndDate: string;
  receptionDate: string;
  notes: ProjectNote[];
}

export function clampProgress(value: number): number {
  return Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
}

/** Status that follows a progress change; an accepted handover is never undone by the slider. */
export function statusForProgress(progress: number, current: ProjectStatus): ProjectStatus {
  if (current === 'Réceptionné') return current;
  if (progress >= 100) return 'Terminé';
  if (progress > 0) return 'En cours';
  return 'Planification';
}

/** Invoicing of the project's quote: net amount billed (credit notes included) and paid. */
export function billingSummary(
  quoteTTC: number,
  invoices: Array<{ totalTTC?: number; paid?: number; kind?: string }>,
): { billed: number; paid: number; toBill: number; billedPercent: number } {
  const round = (value: number) => Math.round(value * 100) / 100;
  const billed = round(invoices.reduce((sum, invoice) => sum + (Number(invoice.totalTTC) || 0), 0));
  const paid = round(invoices.filter((invoice) => invoice.kind !== 'avoir').reduce((sum, invoice) => sum + (Number(invoice.paid) || 0), 0));
  return {
    billed,
    paid,
    toBill: round(Math.max(0, quoteTTC - billed)),
    billedPercent: quoteTTC > 0 ? Math.min(100, Math.round((billed / quoteTTC) * 100)) : 0,
  };
}

/** Opens the job site of a quote, creating it the first time (one project per quote). */
export async function openProjectForQuote(
  firestore: Firestore,
  quote: {
    id: string;
    number: string;
    projectTitle?: string;
    clientId?: string | null;
    clientName?: string;
    clientEmail?: string;
    clientAddress?: string;
    siteAddress?: string;
    siteAccessDetails?: string;
  },
): Promise<string> {
  const existing = await getDocs(query(collection(firestore, 'projects'), where('quoteId', '==', quote.id), limit(1)));
  if (!existing.empty) return existing.docs[0].id;

  const ref = doc(collection(firestore, 'projects'));
  const project: ProjectData = {
    id: ref.id,
    title: quote.projectTitle || `Chantier ${quote.clientName ?? ''}`.trim(),
    quoteId: quote.id,
    quoteNumber: quote.number,
    clientId: quote.clientId ?? null,
    clientName: quote.clientName ?? '',
    clientEmail: quote.clientEmail ?? '',
    clientAddress: quote.clientAddress ?? '',
    siteAddress: quote.siteAddress ?? '',
    siteAccessDetails: quote.siteAccessDetails ?? '',
    status: 'Planification',
    progress: 0,
    startDate: '',
    plannedEndDate: '',
    receptionDate: '',
    notes: [],
  };
  const batch = writeBatch(firestore);
  batch.set(ref, { ...project, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  batch.update(doc(firestore, 'quotes', quote.id), { projectId: ref.id, updatedAt: serverTimestamp() });
  await batch.commit();
  return ref.id;
}

export async function updateProject(firestore: Firestore, id: string, changes: Partial<Omit<ProjectData, 'id'>>): Promise<void> {
  await updateDoc(doc(firestore, 'projects', id), { ...changes, updatedAt: serverTimestamp() });
}
