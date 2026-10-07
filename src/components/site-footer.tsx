import Link from "next/link"
import Image from "next/image"
import { services, navItems } from "@/lib/data"
import { Mail, MapPin, Phone, ArrowRight, ShieldCheck, Star, Award, Clock, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const SITE_NAME = "ERG Rénovation"
const PHONE_RAW = "+33699961375"
const PHONE_LABEL = "06 99 96 13 75"
const EMAIL = "contact@erg-renovation.fr"
const ADDRESS = "1 Sentier de la Pointe, 75020 Paris"

function DynamicLogo() {
  return (
    <Image
      src="/images/logo-erg.webp"
      alt="ERG Rénovation Logo"
      width={240}
      height={80}
      className="h-14 sm:h-16 md:h-20 w-auto object-contain"
    />
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
    <h4 className={cn("font-headline text-xs font-bold uppercase tracking-widest text-slate-900", className)}>
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
        "text-sm font-normal text-slate-600 transition-colors hover:text-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm inline-flex items-center gap-1.5",
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
    { title: "Plan du site", href: "/plan-du-site" },
  ]

  return (
    <footer className="relative overflow-hidden bg-[#FAF8F5] border-t border-stone-200/90 text-slate-900">
      
      {/* Top Pre-Footer Trust Ribbon */}
      <div className="border-b border-stone-200/80 bg-white/70 backdrop-blur-md">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 p-2">
              <ShieldCheck className="h-5 w-5 text-amber-600 shrink-0" />
              <div className="text-left text-xs font-semibold text-slate-800">
                <span className="block font-bold text-slate-900">Garantie Décennale</span>
                Couverture 10 ans
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 p-2">
              <Award className="h-5 w-5 text-amber-600 shrink-0" />
              <div className="text-left text-xs font-semibold text-slate-800">
                <span className="block font-bold text-slate-900">Devis Poste par Poste</span>
                Clair & transparent
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 p-2">
              <Clock className="h-5 w-5 text-amber-600 shrink-0" />
              <div className="text-left text-xs font-semibold text-slate-800">
                <span className="block font-bold text-slate-900">Interlocuteur Unique</span>
                Suivi de A à Z
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 p-2">
              <Star className="h-5 w-5 text-amber-600 fill-amber-500 shrink-0" />
              <div className="text-left text-xs font-semibold text-slate-800">
                <span className="block font-bold text-slate-900">4.9 / 5 sur Google</span>
                36+ avis certifiés
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          
          {/* Brand & Contact Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center group transition-transform hover:scale-105" aria-label={`Accueil ${SITE_NAME}`}>
              <DynamicLogo />
            </Link>

            <p className="text-sm font-normal leading-relaxed text-slate-600 max-w-sm">
              Spécialiste de la rénovation intérieure haut de gamme à Paris et en Île-de-France. Appartements, salles de bain, cuisines et rénovation complète avec garantie décennale.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-2.5 text-xs font-medium text-slate-700 pt-2">
              <div className="flex items-center gap-3 rounded-xl border border-stone-200/90 bg-white p-3 shadow-2xs">
                <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
                <span>{ADDRESS}</span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-stone-200/90 bg-white p-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-amber-600 shrink-0" />
                  <a href={`tel:${PHONE_RAW}`} className="font-bold text-slate-900 hover:text-amber-600 transition-colors">
                    {PHONE_LABEL}
                  </a>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Devis sous 24h
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-stone-200/90 bg-white p-3 shadow-2xs">
                <Mail className="h-4 w-4 text-amber-600 shrink-0" />
                <a href={`mailto:${EMAIL}`} className="hover:text-amber-600 transition-colors truncate">
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>

          {/* Nos Prestations Column (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <FooterTitle>Nos Prestations Clés</FooterTitle>
            <ul className="space-y-3">
              <li>
                <FooterLink href="/services/renovation-appartement">
                  Rénovation d'Appartement
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/services/renovation-salle-de-bain">
                  Rénovation Salle de Bain
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/services/renovation-cuisine">
                  Rénovation Cuisine Sur-Mesure
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/services/renovation-maison">
                  Rénovation de Maison
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/services/amenagement-combles">
                  Aménagement de Combles
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/services/peinture-finitions">
                  Peinture & Finitions
                </FooterLink>
              </li>
              <li className="pt-1">
                <Link
                  href="/services"
                  className="inline-flex items-center text-xs font-bold text-amber-700 hover:text-amber-800"
                >
                  Voir tous les services <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Zones d'Intervention (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <FooterTitle>Zones d'Intervention</FooterTitle>
            <ul className="space-y-3">
              <li><FooterLink href="/renovation-paris">Paris (75)</FooterLink></li>
              <li><FooterLink href="/renovation-hauts-de-seine">Hauts-de-Seine (92)</FooterLink></li>
              <li><FooterLink href="/renovation-seine-saint-denis">Seine-Saint-Denis (93)</FooterLink></li>
              <li><FooterLink href="/renovation-val-de-marne">Val-de-Marne (94)</FooterLink></li>
              <li><FooterLink href="/renovation-boulogne-billancourt">Boulogne-Billancourt</FooterLink></li>
              <li><FooterLink href="/renovation-vincennes">Vincennes</FooterLink></li>
              <li><FooterLink href="/renovation-neuilly-sur-seine">Neuilly-sur-Seine</FooterLink></li>
            </ul>
          </div>

          {/* Navigation & Demande (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <FooterTitle>Navigation & Devis</FooterTitle>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <FooterLink href={resolveFooterHref(item.href)}>{item.title}</FooterLink>
                </li>
              ))}
              <li><FooterLink href="/blog">Blog & Conseils Rénovation</FooterLink></li>
            </ul>

            {/* Micro Quote Banner Card */}
            <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                Estimation Gratuite
              </span>
              <p className="text-xs text-slate-600 font-normal">
                Préparez votre demande de devis en 4 étapes simples.
              </p>
              <Link
                href="/devis"
                className="mt-2 inline-flex items-center justify-center w-full rounded-xl bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold hover:bg-amber-400 transition-colors shadow-sm"
              >
                Préparer mon devis →
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Footer Section */}
        <div className="mt-16 flex flex-col gap-4 border-t border-stone-200/80 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-xs font-medium text-slate-500 md:text-left">
            © {new Date().getFullYear()} {SITE_NAME}. Tous droits réservés. Entreprise de rénovation tous corps d’état à Paris.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-600">
            {legalLinks.map((l) => (
              <FooterLink key={l.href} href={l.href} className="text-xs">
                {l.title}
              </FooterLink>
            ))}
            <FooterLink href="/connexion" className="text-xs font-bold text-slate-800">
              CRM
            </FooterLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

