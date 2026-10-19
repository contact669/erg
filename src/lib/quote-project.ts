export type QuoteProject = "appartement" | "salle-de-bain" | "cuisine" | "travaux-cibles"

const projects: QuoteProject[] = ["appartement", "salle-de-bain", "cuisine", "travaux-cibles"]

export function readQuoteProject(value: string | null): QuoteProject | null {
  return projects.includes(value as QuoteProject) ? value as QuoteProject : null
}

export const quoteOriginPages = [
  { path: "/services/renovation-appartement", label: "Rénovation d’appartement" },
  { path: "/services/renovation-salle-de-bain", label: "Rénovation de salle de bain" },
  { path: "/services/renovation-cuisine", label: "Rénovation de cuisine" },
  { path: "/services/peinture-finitions", label: "Peinture et finitions" },
  { path: "/renovation-salle-de-bain/paris-16", label: "Salle de bain à Paris 16" },
  { path: "/blog/budget-renovation-appartement-paris", label: "Guide du budget d’un appartement" },
] as const

// Only known public paths are stored; never arbitrary URLs, queries or referrers.
export function readQuoteOrigin(value: unknown): string | null {
  return quoteOriginPages.find(page => page.path === value)?.path ?? null
}

export function quoteOriginLabel(value: unknown): string {
  return quoteOriginPages.find(page => page.path === value)?.label ?? "Non renseignée"
}

export function quoteOriginFromRequest(request: { quoteOriginPage?: unknown; quoteOriginMethod?: unknown }): string | null {
  return request.quoteOriginMethod === "link-parameter" ? readQuoteOrigin(request.quoteOriginPage) : null
}

export function quoteHrefForService(slug: string, originPath = `/services/${slug}`): string {
  const project: Record<string, QuoteProject> = {
    "renovation-appartement": "appartement",
    "renovation-salle-de-bain": "salle-de-bain",
    "renovation-cuisine": "cuisine",
    "peinture-finitions": "travaux-cibles",
  }
  if (!Object.prototype.hasOwnProperty.call(project, slug)) return "/devis"
  const origin = readQuoteOrigin(originPath)
  return `/devis?projet=${project[slug]}${origin ? `&page=${encodeURIComponent(origin)}` : ""}#demande-devis`
}
