
import Link from "next/link"
import Image from "next/image"
import { services, navItems } from "@/lib/data"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const SITE_NAME = "ERG Rénovation"
const PHONE_RAW = "+33699961375"
const PHONE_LABEL = "06 99 96 13 75"
const EMAIL = "contact@erg-renovation.fr"
const ADDRESS = "1 Sent. de la Pointe, 75020 Paris"

function DynamicLogo() {
  return (
    <>
      <Image src="/images/logo-clair.png" alt="ERG Rénovation Logo" width={24} height={24} className="h-6 w-6 dark:hidden" unoptimized />
      <Image src="/images/logo-sombre.png" alt="ERG Rénovation Logo" width={24} height={24} className="h-6 w-6 hidden dark:block" unoptimized />
    </>
  )
}

function resolveFooterHref(href: string) {
  if (href.startsWith("#")) return `/${href}`
  return href
}

function FooterTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h4 className={cn("font-headline text-sm font-semibold tracking-wide text-primary", className)}>
      {children}
    </h4>
  )
}

function FooterLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm text-muted-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
        className
      )}
    >
      {children}
    </Link>
  )
}

export default function SiteFooter() {
  const legalLinks = [
    { title: "Mentions légales", href: "/mentions-legales" },
    { title: "Politique de confidentialité", href: "/confidentialite" },
    { title: "Gestion des cookies", href: "/cookies" },
  ]

  return (
    <footer className="border-t bg-secondary text-secondary-foreground">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marque + contact */}
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-3" aria-label={`Accueil ${SITE_NAME}`}>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-background/60 ring-1 ring-border/60">
                <DynamicLogo />
              </span>
              <div className="leading-tight">
                <p className="font-headline font-semibold text-primary">ERG Rénovation</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Rénovation intérieure • Paris & IDF</p>
              </div>
            </Link>

            <p className="max-w-sm text-sm text-muted-foreground">
              Rénovation d’appartement, salle de bain, cuisine et finitions. Méthode claire, suivi structuré, exécution
              propre et garanties.
            </p>

            <div className="space-y-2 text-sm">
              <p className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <span>{ADDRESS}</span>
              </p>

              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <a
                  href={`tel:${PHONE_RAW}`}
                  className="text-muted-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  {PHONE_LABEL}
                </a>
              </p>

              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-muted-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  {EMAIL}
                </a>
              </p>
            </div>

            {/* CTA */}
            <div className="grid gap-2 pt-2 sm:max-w-xs">
              <Button asChild>
                <Link href="/devis" className="inline-flex items-center justify-center gap-2">
                  Demander un devis <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline">
                <a href={`tel:${PHONE_RAW}`} className="inline-flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  Appeler maintenant
                </a>
              </Button>

              <p className="text-xs text-muted-foreground">Intervention : Paris • 92 • 93 • 94</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-5">
            <FooterTitle>Navigation</FooterTitle>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <FooterLink href={resolveFooterHref(item.href)}>{item.title}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services + requêtes fréquentes */}
          <div className="space-y-5">
            <FooterTitle>Nos services</FooterTitle>

            <ul className="space-y-2">
              {services.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <FooterLink href={`/services/${service.slug}`}>{service.title}</FooterLink>
                </li>
              ))}
              <li className="pt-1">
                <FooterLink href="/services" className="font-medium text-foreground hover:text-primary">
                  Voir tous les services →
                </FooterLink>
              </li>
            </ul>

            {/* mini maillage interne (clean, non spammy) */}
            <div className="rounded-2xl border bg-background/60 p-4 ring-1 ring-border/50">
              <p className="text-xs font-semibold tracking-wide text-foreground">Recherches fréquentes</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <FooterLink href="/services/renovation-appartement">Rénovation appartement à Paris</FooterLink>
                </li>
                <li>
                  <FooterLink href="/services/renovation-salle-de-bain">Salle de bain clé en main</FooterLink>
                </li>
                <li>
                  <FooterLink href="/services/renovation-cuisine">Rénovation cuisine</FooterLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-5">
            <FooterTitle>Newsletter</FooterTitle>

            <p className="text-sm text-muted-foreground">
              Conseils travaux et dernières réalisations (1 à 2 emails/mois). Zéro spam.
            </p>

            {/* Server-safe */}
            <form className="grid gap-3" action="/api/newsletter" method="post">
              <label className="sr-only" htmlFor="newsletter-email">
                Email
              </label>

              <div className="flex gap-2">
                <Input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  placeholder="Votre email"
                  className="bg-background"
                  autoComplete="email"
                  required
                />
                <Button type="submit">OK</Button>
              </div>

              <label className="flex items-start gap-2 text-xs text-muted-foreground">
                <input name="consent" type="checkbox" value="yes" required className="mt-1" />
                <span>Désinscription en 1 clic. Données traitées conformément à la politique de confidentialité.</span>
              </label>
            </form>

            <p className="text-xs text-muted-foreground">
              En soumettant, vous acceptez notre{" "}
              <Link href="/confidentialite" className="underline underline-offset-4 hover:text-primary">
                politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Bas footer */}
        <div className="mt-12 flex flex-col gap-4 border-t border-border/70 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-xs text-muted-foreground md:text-left">
            © {new Date().getFullYear()} {SITE_NAME}. Tous droits réservés.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {legalLinks.map((l) => (
              <FooterLink key={l.href} href={l.href} className="text-xs">
                {l.title}
              </FooterLink>
            ))}
            <FooterLink href="/connexion" className="text-xs">
              Admin
            </FooterLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
