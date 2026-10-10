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
  // From the Allianz certificate (contract subscribed 01/02/2024). Validity dates are not printed:
  // keep the current year's certificate on file.
  decennale: "Allianz IARD, 1 cours Michelet, CS 30051, 92076 Paris La Défense Cedex — contrat Allianz Solution BTP n° 62929418 — couverture : France métropolitaine et DROM" as string | null,
  // Company RIB (Société Générale, Paris Maraîchers).
  iban: "FR76 3000 3035 9200 0200 3040 107" as string | null,
  bic: "SOGEFRPP" as string | null,
  certifications: [] as string[], // e.g. ["RGE Qualibat n° …"], only if currently valid
  // Checked on 10 October 2026: VAT number valid in the EU VIES database; capital as published in the registry.
  rcs: "RCS Paris 818 676 652",
  shareCapital: "1 500 €" as string | null,
  vatNumber: "FR56818676652" as string | null,
  // Invoices continue the series started outside the CRM (last one: F00306, 4 October 2026).
  invoicePrefix: "F",
  lastInvoiceBeforeCrm: 306,
  // Payment conditions printed on every invoice.
  paymentDays: 30,
  latePenalty: "trois fois le taux d'intérêt légal en vigueur",
} as const;

/** One-line legal identity required on quotes, invoices and other business documents. */
export function companyLegalLine(): string {
  return [
    COMPANY.shareCapital ? `SAS au capital de ${COMPANY.shareCapital}` : "SAS",
    COMPANY.rcs,
    `SIRET ${COMPANY.siret}`,
    COMPANY.vatNumber ? `TVA ${COMPANY.vatNumber}` : null,
  ].filter(Boolean).join(" — ");
}
