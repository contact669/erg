import type { Metadata } from "next"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Breadcrumbs from "@/components/breadcrumbs"
import CtaBanner from "@/app/_components/cta-banner"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { navItems, services, allProjects, blogPosts, AREAS } from "@/lib/data"
import { ArrowRight, MapPin, Wrench, Home, BookOpen, Layers, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Plan du Site",
  description:
    "Explorez l'architecture de notre site. Retrouvez rapidement toutes nos pages : services, réalisations, zones d'intervention, blog et informations pratiques.",
  alternates: { canonical: "https://erg-renovation.fr/plan-du-site" },
}

export default function PlanDuSitePage() {
  const mainPages = navItems.filter(
    (item) => !["Services", "Réalisations", "Blog", "Zones d'intervention"].includes(item.title)
  )

  const allCityLinks = AREAS.flatMap((area) =>
    area.cities
      .filter((city) => city.href)
      .map((city) => ({ name: `Rénovation ${city.name}`, href: city.href! }))
  )

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50">
      <SiteHeader />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative isolate overflow-hidden bg-slate-50 border-b border-slate-200/80 py-12 md:py-16">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-50/80 to-slate-50" />
          </div>

          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <Breadcrumbs />

              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-semibold text-amber-700">
                <Layers className="h-3.5 w-3.5 text-amber-600" /> Navigation Intégrale ERG Rénovation
              </div>

              <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
                Plan du Site
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Accédez rapidement à l'ensemble de nos rubriques, guides techniques, pages locales et cas d'étude.
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT SITEMAP GRID */}
        <section className="py-12 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Main Pages */}
              <SitemapSection title="Pages Principales" icon={Home}>
                {mainPages.map((item) => (
                  <SitemapLink key={item.href} href={item.href}>
                    {item.title}
                  </SitemapLink>
                ))}
              </SitemapSection>

              {/* Services */}
              <SitemapSection title="Nos Prestations" icon={Wrench}>
                {services.map((service) => (
                  <SitemapLink key={service.slug} href={`/services/${service.slug}`}>
                    {service.title}
                  </SitemapLink>
                ))}
                <SitemapLink href="/services" className="font-bold text-amber-700 pt-1">
                  Voir tous les services →
                </SitemapLink>
              </SitemapSection>

              {/* Zones */}
              <SitemapSection title="Zones d'Intervention" icon={MapPin}>
                {AREAS.map((area) => (
                  <SitemapLink key={area.code} href={area.href}>
                    {area.label} ({area.code})
                  </SitemapLink>
                ))}
                <SitemapLink href="/zones-intervention" className="font-bold text-amber-700 pt-1">
                  Voir toutes les zones →
                </SitemapLink>
              </SitemapSection>

              {/* Villes Principales */}
              <SitemapSection title="Villes Principales (92 / 93 / 94)" icon={MapPin}>
                {allCityLinks.slice(0, 6).map((city) => (
                  <SitemapLink key={city.href} href={city.href}>
                    {city.name}
                  </SitemapLink>
                ))}
              </SitemapSection>

              {/* Réalisations */}
              <SitemapSection title="Nos Réalisations" icon={Sparkles}>
                {allProjects.slice(0, 5).map((project) => (
                  <SitemapLink key={project.slug} href={`/realisations/${project.slug}`}>
                    {project.title}
                  </SitemapLink>
                ))}
                <SitemapLink href="/realisations" className="font-bold text-amber-700 pt-1">
                  Voir toutes les réalisations →
                </SitemapLink>
              </SitemapSection>

              {/* Blog */}
              <SitemapSection title="Conseils & Journal" icon={BookOpen}>
                {blogPosts.slice(0, 5).map((post) => (
                  <SitemapLink key={post.slug} href={`/blog/${post.slug}`}>
                    {post.title}
                  </SitemapLink>
                ))}
                <SitemapLink href="/blog" className="font-bold text-amber-700 pt-1">
                  Voir tout le blog →
                </SitemapLink>
              </SitemapSection>
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>

      <SiteFooter />
    </div>
  )
}

function SitemapSection({
  title,
  icon: Icon,
  children,
}: {
  title: string
  icon?: any
  children: React.ReactNode
}) {
  return (
    <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="p-0 pb-4 border-b border-slate-100 flex items-center gap-3">
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <CardTitle className="font-headline text-lg font-bold text-slate-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pt-4">
        <ul className="space-y-2.5">{children}</ul>
      </CardContent>
    </Card>
  )
}

function SitemapLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <li className="text-xs sm:text-sm">
      <Link
        href={href}
        className={cn(
          "flex items-center justify-between font-semibold text-slate-600 hover:text-amber-700 transition-colors py-1 group",
          className
        )}
      >
        <span className="truncate pr-2">{children}</span>
        <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all shrink-0" />
      </Link>
    </li>
  )
}
