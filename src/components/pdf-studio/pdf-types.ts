export type DocumentType = 'DEVIS' | 'FACTURE' | 'SUIVI_CHANTIER' | 'PV_RECEPTION';

export interface SiteReportData {
  id: string;
  reportNumber: string;
  date: string;
  clientName: string;
  siteAddress: string;
  projectTitle: string;
  siteManager: string; // Conducteur de travaux
  overallProgressPercent: number; // e.g. 65%
  weatherConditions: string; // e.g. "Soleil 19°C, Conditions idéales"
  workforceCount: number; // e.g. 6 artisans sur site
  lotsProgress: Array<{
    lotName: string;
    progressPercent: number;
    status: 'En cours' | 'Terminé' | 'En attente' | 'En retard';
    notes: string;
  }>;
  safetyCheck: {
    protectionPartiesCommunes: boolean;
    evacuationDechets: boolean;
    conformiteEPI: boolean;
  };
  keyMilestonesCompleted: string[];
  nextWeekPlan: string[];
  notesAndReserves: string;
}

export interface HandoverPVData {
  id: string;
  pvNumber: string;
  date: string;
  clientName: string;
  clientAddress: string;
  siteAddress: string;
  projectTitle: string;
  contractorName: string; // ERG Rénovation
  guaranteeStartDate: string;
  decennaleRef: string;
  reservesCount: number; // e.g. 2 réserves mineures
  reservesList: Array<{
    id: string;
    lot: string;
    description: string;
    deadline: string; // e.g. 15 jours
  }>;
  acceptanceType: 'SANS_RESERVES' | 'AVEC_RESERVES';
  notes: string;
}
