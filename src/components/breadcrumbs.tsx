"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment, useMemo, useState, useEffect } from "react"
import { ChevronRight, Home } from "lucide-react"

import { services, allProjects, blogPosts, localLandingPages } from "@/lib/data"
import { cn } from "@/lib/utils"

type Crumb = { href: string; label: string; isLast: boolean }

const HIDE_ON: string[] = ["/", "/dashboard"]

const CENTERED_ROUTES: string[] = [
  "/a-propos",
  "/realisations",
  "/blog",
  "/contact",
  "/devis",
  "/services",
  "/confidentialite",
  "/cookies",
  "/mentions-legales",
  "/connexion",
]

const MANUAL_LABELS: Record<string, string> = {
  "a-propos": "À propos",
  blog: "Blog",
  contact: "Contact",
  devis: "Devis",
  realisations: "Réalisations",
  services: "Services",
  confidentialite: "Confidentialité",
  cookies: "Cookies",
  "mentions-legales": "Mentions légales",
  connexion: "Connexion",
  "renovation-appartement": "Rénovation appartement",
  "renovation-maison": "Rénovation maison",
  "renovation-salle-de-bain": "Rénovation salle de bain",
  "renovation-cuisine": "Rénovation cuisine",
  "amenagement-combles": "Aménagement de combles",
  "peinture-finitions": "Peinture & finitions",
}

/** Fallback propre : "renovation-salle-de-bain" -> "Rénovation salle de bain" */
function humanizeSlug(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\p{L}/u, (m) => m.toUpperCase())
}

/** Coupe intelligemment le dernier crumb si trop long */
function truncateSmart(input: string, max = 56) {
  const t = input.trim()
  if (t.length <= max) return t
  return t.slice(0, max - 1).trimEnd() + "…"
}

function resolveLabel(slug: string, fullPath: string): string {
  if (MANUAL_LABELS[slug]) return MANUAL_LABELS[slug]

  // Recherche data “classique”
  const sources: any[] = [services, allProjects, blogPosts]
  for (const source of sources) {
    const found = source?.find?.((i: any) => i?.slug === slug)
    if (found?.title) return String(found.title)
  }

  // Recherche pages locales : /{parentServiceSlug}/{localSlug}
  const segments = fullPath.split("/").filter(Boolean)
  const parentServiceSlug = segments.length > 1 ? segments[0] : undefined
  const possibleParent = segments.length > 1 ? segments[segments.length - 2] : undefined

  const local = localLandingPages.find(
    (p: any) =>
      p?.slug === slug &&
      (p?.parentService?.slug === parentServiceSlug || p?.parentService?.slug === possibleParent)
  )
  if (local?.title) return String(local.title)

  return humanizeSlug(slug)
}

function shouldCenter(pathname: string) {
  if (CENTERED_ROUTES.includes(pathname)) return true
  if (pathname.startsWith("/blog/")) return true
  if (pathname.startsWith("/realisations/")) return true
  return false
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const crumbs = useMemo<Crumb[]>(() => {
    if (!pathname) return []
    const segments = pathname.split("/").filter(Boolean)

    return segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/")
      const isLast = index === segments.length - 1
      const label = resolveLabel(segment, pathname)
      return {
        href,
        isLast,
        label: isLast ? truncateSmart(label) : label,
      }
    })
  }, [pathname])

  if (!mounted || !pathname || HIDE_ON.includes(pathname)) return null

  const centered = shouldCenter(pathname)

  return (
    <div className={cn(!centered && "bg-secondary/60")}>
      <div className="container">
        <nav aria-label="Fil d’Ariane" className="py-3">
          <ol
            className={cn(
              "flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground",
              centered && "justify-center"
            )}
          >
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Home className="h-4 w-4" />
                <span>Accueil</span>
              </Link>
            </li>

            {crumbs.map((c) => (
              <Fragment key={c.href}>
                <li aria-hidden="true" className="select-none text-muted-foreground/70">
                  <ChevronRight className="h-4 w-4" />
                </li>

                <li>
                  {c.isLast ? (
                    <span
                      aria-current="page"
                      className="inline-flex max-w-[70vw] items-center truncate font-medium text-foreground md:max-w-[520px]"
                      title={c.label}
                    >
                      {c.label}
                    </span>
                  ) : (
                    <Link
                      href={c.href}
                      className="inline-flex items-center rounded-md px-1 py-0.5 transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {c.label}
                    </Link>
                  )}
                </li>
              </Fragment>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
}
