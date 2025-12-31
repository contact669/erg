import Link from "next/link"
import { ErgLogo } from "./icons"
import { services, navItems } from "@/lib/data"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react"

function StyledLogo() {
  return (
    <span className="font-headline text-2xl font-bold tracking-wider text-primary">
      <span className="tracking-widest">E</span>
      <span className="underline decoration-accent decoration-2 underline-offset-4">R</span>
      <span className="tracking-widest">G</span>
    </span>
  )
}

function resolveFooterHref(href: string) {
  // si un item est "#section", depuis une autre page il faut "/#section"
  if (href.startsWith("#")) return `/${href}`
  return href
}

export default function SiteFooter() {
  const legalLinks = [
    { title: "Mentions Légales", href: "/mentions-legales" },
    { title: "Politique de confidentialité", href: "/confidentialite" },
    { title: "Gestion des cookies", href: "/cookies" },
  ]

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Bloc marque + contact */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2" aria-label="Retour à l'accueil">
              <ErgLogo className="h-8 w-8 text-primary" />
              <StyledLogo />
            </Link>

            <p className="text-sm">
              L&apos;excellence en rénovation intérieure à Paris et en Île-de-France : appartements, cuisines, salles de bain,
              finitions soignées.
            </p>

            <div className="space-y-2 text-sm">
              <p className="flex items-start gap-2">
                <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                <span>1 Sent. de la Pointe, 75020 Paris</span>
              </p>

              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <a href="tel:+33699961375" className="hover:text-primary">
                  06 99 96 13 75
                </a>
              </p>

              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:contact@erg-renovation.fr" className="hover:text-primary">
                  contact@erg-renovation.fr
                </a>
              </p>
            </div>

            {/* ✅ CTA conversion */}
            <div className="grid gap-2 pt-2 sm:max-w-xs">
              <Button asChild>
                <Link href="/devis" className="inline-flex items-center justify-center gap-2">
                  Demander un devis <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <a
                href="tel:+33699961375"
                className="inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                <Phone className="h-4 w-4" />
                Appeler maintenant
              </a>

              <p className="text-xs text-muted-foreground">Intervention : Paris • 92 • 93 • 94</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-headline font-semibold text-primary">Navigation</h4>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={resolveFooterHref(item.href)} className="text-sm hover:text-primary">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-headline font-semibold text-primary">Nos Services</h4>
            <ul className="mt-4 space-y-2">
              {services.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="text-sm hover:text-primary">
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-sm font-semibold hover:text-primary">
                  Voir tous les services &rarr;
                </Link>
              </li>
            </ul>

            {/* Mini maillage interne SEO */}
            <div className="mt-6 rounded-lg border bg-background/40 p-4">
              <p className="text-sm font-medium">Recherches fréquentes</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/services/renovation-appartement" className="hover:text-primary">
                    Rénovation appartement à Paris
                  </Link>
                </li>
                <li>
                  <Link href="/services/renovation-salle-de-bain" className="hover:text-primary">
                    Rénovation salle de bain clé en main
                  </Link>
                </li>
                <li>
                  <Link href="/services/renovation-cuisine" className="hover:text-primary">
                    Rénovation cuisine
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter (server-safe : pas de onSubmit) */}
          <div>
            <h4 className="font-headline font-semibold text-primary">Newsletter</h4>
            <p className="mt-4 text-sm">
              Recevez nos conseils travaux et nos dernières réalisations (1 à 2 emails/mois).
            </p>

            {/* ✅ IMPORTANT : pas de handler ici (Server Component). 
                Tu peux brancher /api/newsletter plus tard. */}
            <form className="mt-4 grid gap-2" action="/api/newsletter" method="post">
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
                <Button type="submit" variant="default">
                  S&apos;inscrire
                </Button>
              </div>

              {/* RGPD light */}
              <label className="flex items-start gap-2 text-xs text-muted-foreground">
                <input name="consent" type="checkbox" value="yes" required className="mt-1" />
                <span>
                  J&apos;accepte de recevoir des emails de la part d&apos;ERG Rénovation. Désinscription en 1 clic.
                </span>
              </label>
            </form>

            <p className="mt-2 text-xs text-muted-foreground">
              En soumettant, vous acceptez notre{" "}
              <Link href="/confidentialite" className="underline underline-offset-4 hover:text-primary">
                politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Bas de footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            Copyright &copy; {new Date().getFullYear()} ERG Rénovation. Tous droits réservés.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-muted-foreground hover:text-primary">
                {link.title}
              </Link>
            ))}
            <Link href="/connexion" className="text-xs text-muted-foreground hover:text-primary">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
