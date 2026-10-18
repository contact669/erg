export type QuoteProject = "appartement" | "salle-de-bain" | "cuisine" | "travaux-cibles"

const projects: QuoteProject[] = ["appartement", "salle-de-bain", "cuisine", "travaux-cibles"]

export function readQuoteProject(value: string | null): QuoteProject | null {
  return projects.includes(value as QuoteProject) ? value as QuoteProject : null
}

export function quoteHrefForService(slug: string): string {
  const project: Record<string, QuoteProject> = {
    "renovation-appartement": "appartement",
    "renovation-salle-de-bain": "salle-de-bain",
    "renovation-cuisine": "cuisine",
    "peinture-finitions": "travaux-cibles",
  }
  return project[slug] ? `/devis?projet=${project[slug]}#demande-devis` : "/devis"
}
