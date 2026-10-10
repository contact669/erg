import { SiteReportData, HandoverPVData } from './pdf-types';
import { COMPANY } from '@/lib/company';

export function createDefaultSiteReport(): SiteReportData {
  const today = new Date().toISOString().split('T')[0];
  const randomNum = Math.floor(100 + Math.random() * 900);

  return {
    id: `REP-${randomNum}`,
    reportNumber: `CR-CHANTIER-2026-${randomNum}`,
    date: today,
    clientName: 'M. et Mme Dupont',
    siteAddress: '15 Avenue Montaigne, 75008 Paris',
    projectTitle: 'Rénovation Complète Appartement Haussmannien 120m²',
    siteManager: 'Karim Ait (Conducteur de Travaux Principal)',
    overallProgressPercent: 65,
    weatherConditions: 'Beau temps, 21°C — Conditions de chantier optimales',
    workforceCount: 7,
    lotsProgress: [
      {
        lotName: '1. DÉMOLITION & CURAGE',
        progressPercent: 100,
        status: 'Terminé',
        notes: 'Démolition cloisons et évacuation benne terminées sans réserve.',
      },
      {
        lotName: '2. ÉLECTRICITÉ NF C 15-100',
        progressPercent: 85,
        status: 'En cours',
        notes: 'Câblage sous gaine ICTA finalisé à 90%. Tableau Schneider 4 rangées posé.',
      },
      {
        lotName: '3. PLOMBERIE & SANITAIRES',
        progressPercent: 70,
        status: 'En cours',
        notes: 'Réseau PER/Cuivre posé. Étanchéité liquide SEL douche italienne effectuée.',
      },
      {
        lotName: '4. PLÂTRERIE & ISOLATION RGE',
        progressPercent: 80,
        status: 'En cours',
        notes: 'Faux-plafond BA13 hydrofuge terminé. Doublage thermique laine de roche 100mm en cours.',
      },
      {
        lotName: '5. MENUISERIE & PARQUETS',
        progressPercent: 40,
        status: 'En cours',
        notes: 'Livraison parquet contrecollé Panaget. Préparation et ragréage des sols.',
      },
      {
        lotName: '6. PEINTURE & FINITIONS',
        progressPercent: 20,
        status: 'En cours',
        notes: 'Ratissage enduit général 1ère passe sur plafonds et murs.',
      },
    ],
    safetyCheck: {
      protectionPartiesCommunes: true,
      evacuationDechets: true,
      conformiteEPI: true,
    },
    keyMilestonesCompleted: [
      'Validation de la dépose complète et curage des réseaux existants.',
      'Pose du nouveau tableau électrique Schneider aux normes NF C 15-100.',
      'Mise en œuvre de l\'étanchéité SEL sous carrelage dans la suite parentale.',
    ],
    nextWeekPlan: [
      'Pose du parquet contrecollé chêne massif Panaget dans les chambres et le séjour.',
      'Application de la 2ème passe d\'enduit et mise en peinture Tollens Mat Velours.',
      'Pose des blocs-portes fin de chantier et serrures magnétiques.',
    ],
    notesAndReserves: 'Le chantier avance conformément au planning prévisionnel sans aucun retard. Prochain point de situation le mardi avec le maître d\'ouvrage.',
  };
}

export function createDefaultHandoverPV(): HandoverPVData {
  const today = new Date().toISOString().split('T')[0];
  const randomNum = Math.floor(100 + Math.random() * 900);

  return {
    id: `PV-${randomNum}`,
    pvNumber: `PV-REC-2026-${randomNum}`,
    date: today,
    clientName: 'M. et Mme Dupont',
    clientAddress: '15 Avenue Montaigne, 75008 Paris',
    siteAddress: '15 Avenue Montaigne, 75008 Paris',
    projectTitle: 'Rénovation Globale Appartement Haussmannien 120m²',
    contractorName: COMPANY.name,
    guaranteeStartDate: today,
    decennaleRef: COMPANY.decennale ?? '',
    reservesCount: 2,
    reservesList: [
      {
        id: 'res-1',
        lot: 'Menuiserie / Peinture',
        description: 'Retouche de peinture de finition sur plinthe couloir côté droit.',
        deadline: '8 jours',
      },
      {
        id: 'res-2',
        lot: 'Plomberie',
        description: 'Ajustement du joint silicone transparent sous le meuble vasque salle de bain.',
        deadline: '8 jours',
      },
    ],
    acceptanceType: 'AVEC_RESERVES',
    notes: 'Les travaux sont déclarés reçus et acceptés par le Maître d\'Ouvrage. Prise d\'effet des garanties légales (Garantie de Parfait Achèvement 1 an, Garantie Biennale 2 ans et Garantie Décennale AXA 10 ans) à compter de ce jour.',
  };
}
