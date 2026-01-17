import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Breadcrumbs from "@/components/breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { navItems, services, allProjects, blogPosts, AREAS } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Plan du Site | ERG Rénovation",
  description: "Explorez l'architecture de notre site. Retrouvez rapidement toutes nos pages : services, réalisations, zones d'intervention, blog et informations pratiques.",
  alternates: {
    canonical: "https://www.erg-renovation.fr/plan-du-site",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PlanDuSitePage() {
  const mainPages = navItems.filter(
    (item) => !["Services", "Réalisations", "Blog", "Zones d'intervention"].includes(item.title)
  );
  
  const allCityLinks = AREAS.flatMap(area => 
    area.cities.filter(city => city.href).map(city => ({ name: `Rénovation ${city.name}`, href: city.href! }))
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-grow">
        <Breadcrumbs />
        <section className="container py-16 md:py-24">
          <header className="mx-auto max-w-3xl text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Plan du Site
            </h1>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Retrouvez l'ensemble de nos pages et contenus pour naviguer plus facilement sur le site d'ERG Rénovation.
            </p>
          </header>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            
            <SitemapSection title="Pages Principales">
              {mainPages.map((item) => (
                <SitemapLink key={item.href} href={item.href}>
                  {item.title}
                </SitemapLink>
              ))}
            </SitemapSection>

            <SitemapSection title="Nos Services">
              {services.map((service) => (
                <SitemapLink key={service.slug} href={`/services/${service.slug}`}>
                  {service.title}
                </SitemapLink>
              ))}
               <SitemapLink href="/services" className="font-bold">
                  Voir tous les services
                </SitemapLink>
            </SitemapSection>

            <SitemapSection title="Zones d'intervention">
              {AREAS.map((area) => (
                <SitemapLink key={area.code} href={area.href}>
                  {area.label} ({area.code})
                </SitemapLink>
              ))}
               <SitemapLink href="/zones-intervention" className="font-bold">
                  Voir toutes les zones
                </SitemapLink>
            </SitemapSection>

            <SitemapSection title="Villes principales">
              {allCityLinks.slice(0, 6).map((city) => (
                 <SitemapLink key={city.href} href={city.href}>
                  {city.name}
                </SitemapLink>
              ))}
            </SitemapSection>
            
            <SitemapSection title="Nos Réalisations">
                {allProjects.slice(0, 5).map((project) => (
                    <SitemapLink key={project.slug} href={`/realisations/${project.slug}`}>
                        {project.title}
                    </SitemapLink>
                ))}
                <SitemapLink href="/realisations" className="font-bold">
                    Voir toutes les réalisations
                </SitemapLink>
            </SitemapSection>

             <SitemapSection title="Derniers Articles">
              {blogPosts.slice(0, 5).map((post) => (
                <SitemapLink key={post.slug} href={`/blog/${post.slug}`}>
                  {post.title}
                </SitemapLink>
              ))}
              <SitemapLink href="/blog" className="font-bold">
                  Voir tout le blog
                </SitemapLink>
            </SitemapSection>

          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function SitemapSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">{children}</ul>
      </CardContent>
    </Card>
  );
}

function SitemapLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <li className="text-sm">
      <Link href={href} className={cn("flex items-center justify-between text-muted-foreground hover:text-primary hover:underline", className)}>
        <span>{children}</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </li>
  );
}
