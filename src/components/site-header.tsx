
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Menu,
  X,
  Phone,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  Clock,
  MapPin,
  ChevronDown,
  UserCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { navItems, services } from "@/lib/data"
import { cn } from "@/lib/utils"

/* --------------------------------- Helpers -------------------------------- */

function DynamicLogo() {
  return (
    <Image
      src="/images/logo-erg.webp"
      alt="ERG Rénovation Logo"
      width={280}
      height={100}
      className="h-16 sm:h-20 md:h-24 w-auto object-contain"
      priority
    />
  )
}

function isActiveLink(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  if (href.startsWith("/#")) return pathname === "/"
  return pathname === href || pathname.startsWith(href + "/")
}

function resolveNavHref(pathname: string, href: string) {
  const isAnchor = href.startsWith("#")
  if (!isAnchor) return href
  return pathname === "/" ? href : `/${href}`
}

/* -------------------------------- SiteHeader ------------------------------- */

export default function SiteHeader() {
  const pathnameRaw = usePathname()
  const [pathname, setPathname] = React.useState(pathnameRaw || "/")
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    setPathname(pathnameRaw || "/")
  }, [pathnameRaw])

  React.useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setIsScrolled(window.scrollY > 12))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const items = React.useMemo(() => {
    if (!isMounted) return navItems.map((item) => ({ ...item, href: item.href, active: false }))
    return navItems.map((item) => {
      const href = resolveNavHref(pathname, item.href)
      const active = isActiveLink(pathname, href)
      return { ...item, href, active }
    })
  }, [pathname, isMounted])

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      
      {/* Top Architectural Reassurance Ribbon */}
      <div className="hidden sm:block border-b border-stone-200/80 bg-[#FAF8F5]/90 backdrop-blur-md py-1.5 text-xs font-semibold text-slate-700">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-slate-900 font-bold">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>Rénovation Haute Précision • Paris & Île-de-France</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-500">
              <MapPin className="h-3 w-3 text-amber-600" /> 75 • 92 • 93 • 94
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1 text-slate-800">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
              Garantie Décennale 10 Ans
            </span>
            <a
              href="https://www.google.com/maps/search/?api=1&query=ERG-Entreprise+de+R%C3%A9novation+Appartement+%26+Salle+de+Bains+%C3%A0+Paris+et+%C3%8Ele-de-France"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-900 hover:text-amber-600 transition-colors font-bold"
            >
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>Consulter les avis Google</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navbar */}
      <div
        className={cn(
          "w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl transition-all duration-300",
          isScrolled ? "shadow-md shadow-slate-200/50 py-2.5" : "shadow-xs py-3.5"
        )}
      >
        <div className="container flex items-center justify-between gap-4">
          
          {/* Brand Logo & Tagline */}
          <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105" aria-label="Accueil ERG Rénovation">
            <DynamicLogo />
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center" aria-label="Navigation principale">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {items.map((item) => {
                  if (item.title === "Services") {
                    return (
                      <NavigationMenuItem key={item.href}>
                        <NavigationMenuTrigger
                          className={cn(
                            "bg-transparent text-sm font-semibold h-10 px-4 rounded-xl transition-all",
                            "hover:bg-slate-100/80 focus:bg-transparent data-[state=open]:bg-slate-100",
                            item.active ? "text-amber-700 font-extrabold" : "text-slate-800 hover:text-amber-700"
                          )}
                        >
                          Services
                        </NavigationMenuTrigger>

                        <NavigationMenuContent>
                          <div className="w-[720px] p-5 lg:w-[840px] bg-white rounded-3xl border border-slate-200 shadow-2xl">
                            <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
                              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-amber-600" />
                                Nos Prestations Tous Corps d'État
                              </span>
                              <span className="text-xs font-semibold text-amber-700">
                                Accompagnement de A à Z
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              {services.map((service) => (
                                <MegaMenuItem
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  title={service.title}
                                  description={service.description}
                                  icon={service.icon}
                                />
                              ))}
                            </div>

                            {/* Footer inside mega menu */}
                            <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-200/90 bg-slate-50 p-4">
                              <div className="flex items-center gap-3">
                                <UserCheck className="h-5 w-5 text-amber-600" />
                                <span className="text-xs font-semibold text-slate-800">
                                  Interlocuteur unique & devis poste par poste
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                <Link
                                  href="/services"
                                  className="text-xs font-bold text-slate-900 hover:text-amber-700 transition-colors"
                                >
                                  Toutes les prestations →
                                </Link>
                                <Button asChild size="sm" className="h-9 bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 rounded-xl">
                                  <Link href="/devis">Simuler mon devis</Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    )
                  }

                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "bg-transparent text-sm font-semibold h-10 px-4 rounded-xl transition-all",
                            "hover:bg-slate-100/80 focus:bg-transparent data-[active]:bg-transparent",
                            item.active
                              ? "text-amber-700 font-extrabold bg-amber-500/10 border border-amber-500/20"
                              : "text-slate-800 hover:text-amber-700"
                          )}
                          aria-current={item.active ? "page" : undefined}
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+33699961375"
              className="hidden md:inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-900 hover:bg-slate-100 transition-all shadow-2xs"
              aria-label="Appeler ERG Rénovation"
            >
              <Phone className="h-3.5 w-3.5 text-amber-600" />
              <span>06 99 96 13 75</span>
            </a>

            <Button
              asChild
              className="hidden sm:inline-flex bg-amber-500 text-slate-950 font-extrabold hover:bg-amber-400 shadow-md shadow-amber-500/20 rounded-xl px-5 h-10 text-xs sm:text-sm"
            >
              <Link href="/devis" aria-label="Demander un devis gratuit">
                Devis Gratuit <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>

            <MobileNav items={items} />
          </div>

        </div>
      </div>
    </header>
  )
}

/* ----------------------------- Mega menu item ----------------------------- */

const MegaMenuItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string
    description: string
    icon: React.ElementType
  }
>(({ className, title, description, icon: Icon, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "group flex items-start gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-3.5",
          "transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-500/40 hover:shadow-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
          className
        )}
        {...props}
      >
        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 font-bold border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>

        <span className="min-w-0 space-y-0.5">
          <span className="block text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
            {title}
          </span>
          <span className="block line-clamp-2 text-xs font-normal leading-relaxed text-slate-600">
            {description}
          </span>
        </span>
      </a>
    </NavigationMenuLink>
  )
})
MegaMenuItem.displayName = "MegaMenuItem"

/* -------------------------------- MobileNav ------------------------------ */

function MobileNav({
  items,
}: {
  items: Array<{ title: string; href: string; active: boolean }>
}) {
  const pathnameRaw = usePathname()
  const pathname = pathnameRaw ?? "/"
  const [open, setOpen] = React.useState(false)

  const servicesLinks = React.useMemo(
    () =>
      services.map((s) => ({
        title: s.title,
        href: `/services/${s.slug}`,
      })),
    []
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200" aria-label="Ouvrir le menu">
          <Menu className="h-5 w-5 text-slate-900" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[320px] sm:w-[380px] p-0 bg-white">
        <SheetHeader className="border-b border-slate-200 px-6 py-4">
          <SheetTitle className="sr-only">Menu principal</SheetTitle>

          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setOpen(false)}
              aria-label="Retour à l’accueil"
            >
              <DynamicLogo />
            </Link>

            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl" aria-label="Fermer le menu">
                <X className="h-5 w-5 text-slate-700" />
              </Button>
            </SheetTrigger>
          </div>
        </SheetHeader>

        <div className="flex h-[calc(100vh-80px)] flex-col justify-between px-6 py-6 overflow-y-auto">
          <nav className="space-y-6" aria-label="Navigation mobile">
            
            {/* Main links */}
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Navigation
              </p>
              {items
                .filter((i) => i.title !== "Services")
                .map((item) => (
                  <MobileLink
                    key={item.href}
                    href={resolveNavHref(pathname, item.href)}
                    active={item.active}
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </MobileLink>
                ))}
            </div>

            {/* Services */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Nos Services Clés
              </p>
              <div className="space-y-1">
                {servicesLinks.slice(0, 6).map((s) => (
                  <MobileSubLink
                    key={s.href}
                    href={s.href}
                    onClick={() => setOpen(false)}
                  >
                    {s.title}
                  </MobileSubLink>
                ))}
                <Link
                  href="/services"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-amber-700 hover:underline pt-1"
                >
                  Voir tous les services <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Direct Call Box */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
              <span className="text-xs font-bold text-slate-900 block flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-600" /> Contact direct
              </span>
              <a
                href="tel:+33699961375"
                className="text-base font-extrabold text-slate-900 hover:text-amber-600 transition-colors block"
              >
                06 99 96 13 75
              </a>
              <p className="text-[11px] text-slate-500 font-medium">Paris (75) • 92 • 93 • 94</p>
            </div>
          </nav>

          {/* Bottom Action Button */}
          <div className="pt-6 border-t border-slate-100">
            <Button asChild size="lg" className="w-full bg-amber-500 text-slate-950 font-extrabold hover:bg-amber-400 h-12 rounded-xl text-base shadow-md">
              <Link href="/devis" onClick={() => setOpen(false)}>
                Simuler mon Devis Gratuit
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function MobileLink({
  href,
  children,
  active,
  onClick,
}: React.PropsWithChildren<{
  href: string
  active?: boolean
  onClick?: () => void
}>) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center justify-between rounded-xl px-3 py-2.5 text-base font-semibold transition-colors",
        active ? "bg-amber-500/10 text-amber-700 font-extrabold" : "text-slate-800 hover:bg-slate-100"
      )}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 text-slate-400" />
    </Link>
  )
}

function MobileSubLink({
  href,
  children,
  onClick,
}: React.PropsWithChildren<{ href: string; onClick?: () => void }>) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </Link>
  )
}

