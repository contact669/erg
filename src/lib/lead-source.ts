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

export function summarizeLeadSources(requests: readonly {
  status?: string;
  leadSource?: unknown;
  leadSourceMethod?: unknown;
}[]) {
  const sources = [...leadSources.map(source => ({ ...source, count: 0 })),
    { value: "", label: "Non renseignée", count: 0 }];
  let total = 0;
  let pending = 0;
  for (const request of requests) {
    if (request.status === "Supprimée") continue;
    total++;
    if ((request.status ?? "Nouvelle Demande") === "Nouvelle Demande") pending++;
    const source = request.leadSourceMethod === "self-reported" ? readLeadSource(request.leadSource) : "";
    sources.find(item => item.value === source)!.count++;
  }
  return { total, pending, sources };
}
