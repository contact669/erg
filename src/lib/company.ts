// Registered identity checked against the Annuaire des entreprises on 7 October 2026.
export const COMPANY = {
  name: "ERG Rénovation",
  legalName: "ENTREPRISE DE RENOVATION GENERALE",
  legalForm: "SAS, société par actions simplifiée",
  siren: "818 676 652",
  siret: "818 676 652 00014",
  streetAddress: "1 Sentier de la Pointe",
  address: "1 Sentier de la Pointe, 75020 Paris",
  phone: "+33699961375",
  phoneLabel: "06 99 96 13 75",
  email: "contact@erg-renovation.fr",
  siteUrl: "https://erg-renovation.fr",
  registryUrl: "https://annuaire-entreprises.data.gouv.fr/entreprise/818676652",
  // Firebase Auth account allowed to use the CRM (must match firestore.rules).
  adminUid: "pHcnP0Mc32frrhPRzTT2nFwCxno1",
  // Shown on quotes, PV and emails only once filled with the real values from
  // the insurance certificate and bank RIB. Never put example values here.
  decennale: null as string | null, // e.g. "Assureur — police n° …"
  iban: null as string | null,
  bic: null as string | null,
  certifications: [] as string[], // e.g. ["RGE Qualibat n° …"], only if currently valid
} as const;
