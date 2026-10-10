export type TvaRate = 5.5 | 10 | 20;

export type LineUnit = 'm²' | 'm.l.' | 'U' | 'Ens.' | 'Forfait' | 'h' | 'kg' | 'm³';

export interface QuoteLineItem {
  id: string;
  designation: string;
  unit: LineUnit;
  quantity: number;
  unitPriceHT: number;
  tvaRate: TvaRate;
  totalHT: number;
}

export interface QuoteLot {
  id: string;
  name: string;
  description?: string;
  items: QuoteLineItem[];
  subtotalHT: number;
}

/** One step of a free payment schedule, e.g. "Au début des travaux" 30 %. */
export interface PaymentStep {
  id: string;
  label: string;
  percent: number;
}

export interface PaymentTerms {
  downPaymentPercent: number; // e.g. 30
  midTermPercent: number; // e.g. 40
  completionPercent: number; // e.g. 30
}

export interface QuoteData {
  id: string;
  number: string;
  date: string;
  validityDays: number;
  status: 'Brouillon' | 'Envoyé' | 'Accepté' | 'Refusé' | 'Facturé';
  
  // Client Info
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  
  // Site Info
  siteAddress: string;
  siteAccessDetails?: string; // Etage, Ascenseur, Digicode
  
  // Project Info
  projectTitle: string;
  projectDescription: string;
  
  // Technical Lots
  lots: QuoteLot[];
  
  // Conditions
  notes: string;
  paymentTerms: PaymentTerms;
  /** Free schedule; quotes without one use paymentTerms. */
  schedule?: PaymentStep[];
  
  // Totals
  totalHT: number;
  totalTVA55: number;
  totalTVA10: number;
  totalTVA20: number;
  totalTTC: number;
  
  createdAt?: any;
  updatedAt?: any;
}

export const PRESET_LOTS_TEMPLATES: Array<{ name: string; items: Omit<QuoteLineItem, 'id' | 'totalHT'>[] }> = [
  {
    name: "1. DÉMOLITION & PRÉPARATION DE CHANTIER",
    items: [
      {
        designation: "Protection intégrale du chantier (bâche renforcée, polyane, protection des parties communes et ascenseur)",
        unit: "Ens.",
        quantity: 1,
        unitPriceHT: 450,
        tvaRate: 10,
      },
      {
        designation: "Dépose soignée des anciens revêtements de sol (parquet, carrelage) et évacuation en déchetterie agréée",
        unit: "m²",
        quantity: 45,
        unitPriceHT: 28,
        tvaRate: 10,
      },
      {
        designation: "Démolition de cloisons non porteuses (briques plâtrières / carreaux de plâtre) avec évacuation",
        unit: "m²",
        quantity: 18,
        unitPriceHT: 42,
        tvaRate: 10,
      },
    ],
  },
  {
    name: "2. ÉLECTRICITÉ GÉNÉRALE NF C 15-100",
    items: [
      {
        designation: "Remplacement complet du tableau électrique général (Schneider Electric 4 rangées, interrupteurs différentiels 30mA)",
        unit: "Ens.",
        quantity: 1,
        unitPriceHT: 1450,
        tvaRate: 10,
      },
      {
        designation: "Création de circuits encastrés et pose d'appareillages (prises 16A, interrupteurs Legrand Dooxie / Céliane)",
        unit: "U",
        quantity: 26,
        unitPriceHT: 95,
        tvaRate: 10,
      },
      {
        designation: "Lignes dédiées cuisine haute puissance (32A pour plaque induction, 20A pour four / lave-vaisselle)",
        unit: "U",
        quantity: 4,
        unitPriceHT: 140,
        tvaRate: 10,
      },
    ],
  },
  {
    name: "3. PLOMBERIE & RÉSEAUX SANITAIRES",
    items: [
      {
        designation: "Réfection complète du réseau de distribution EF/EC en cuivre/PER et évacuation PVC sanitaire",
        unit: "Ens.",
        quantity: 1,
        unitPriceHT: 1850,
        tvaRate: 10,
      },
      {
        designation: "Création d'un espace douche italienne avec Système d'Étanchéité Liquide (SEL) sous carrelage et caniveau inox",
        unit: "U",
        quantity: 1,
        unitPriceHT: 1250,
        tvaRate: 10,
      },
      {
        designation: "Fourniture et pose d'un WC suspendu Geberit Duofix avec cuvette sans bride et plaque de déclenchement",
        unit: "U",
        quantity: 1,
        unitPriceHT: 890,
        tvaRate: 10,
      },
    ],
  },
  {
    name: "4. PLÂTRERIE, DOUBLAGE & ISOLATION THÉRMIQUE RGE",
    items: [
      {
        designation: "Doublage thermo-acoustique des murs extérieurs en laine de roche 100mm + Placoplatre BA13 (Éligible RGE 5,5%)",
        unit: "m²",
        quantity: 55,
        unitPriceHT: 68,
        tvaRate: 5.5,
      },
      {
        designation: "Faux-plafond suspendu en plaques de plâtre BA13 hydrofuge sur ossature métallique Stil",
        unit: "m²",
        quantity: 42,
        unitPriceHT: 52,
        tvaRate: 10,
      },
    ],
  },
  {
    name: "5. MENUISERIE & REVÊTEMENTS DE SOL",
    items: [
      {
        designation: "Fourniture et pose collée de parquet contrecollé chêne massif Panaget avec sous-couche acoustique haute densité",
        unit: "m²",
        quantity: 45,
        unitPriceHT: 78,
        tvaRate: 10,
      },
      {
        designation: "Fourniture et pose de blocs-portes intérieurs fin de chantier avec serrures magnétiques",
        unit: "U",
        quantity: 4,
        unitPriceHT: 390,
        tvaRate: 10,
      },
    ],
  },
  {
    name: "6. PEINTURE & FINITIONS HAUTE PRÉCISION",
    items: [
      {
        designation: "Préparation soignée des supports : égrenage, ratissage enduit général 2 passes et ponçage aspiration",
        unit: "m²",
        quantity: 180,
        unitPriceHT: 24,
        tvaRate: 10,
      },
      {
        designation: "Application d'une sous-couche d'impression et 2 couches de peinture Mat Velours haute résistance Tollens / Guittet",
        unit: "m²",
        quantity: 180,
        unitPriceHT: 19,
        tvaRate: 10,
      },
    ],
  },
  {
    name: "7. NETTOYAGE FIN DE CHANTIER & RÉCEPTION",
    items: [
      {
        designation: "Nettoyage approfondi de fin de chantier (dépoussiérage des surfaces, décapage sols, nettoyage vitres) & repli de chantier",
        unit: "Forfait",
        quantity: 1,
        unitPriceHT: 490,
        tvaRate: 10,
      },
    ],
  },
];
