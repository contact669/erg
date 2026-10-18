export const leadSources = [
  { value: "google-search", label: "Recherche Google" },
  { value: "google-maps", label: "Google Maps ou fiche Google" },
  { value: "recommendation", label: "Recommandation d’un proche ou d’un professionnel" },
  { value: "existing-client", label: "Je suis déjà client" },
  { value: "other", label: "Autre" },
] as const

export type LeadSource = "" | typeof leadSources[number]["value"]

export function readLeadSource(value: unknown): LeadSource {
  return leadSources.find(source => source.value === value)?.value ?? ""
}

export function leadSourceLabel(value: unknown): string {
  return leadSources.find(source => source.value === value)?.label ?? "Non renseignée"
}
