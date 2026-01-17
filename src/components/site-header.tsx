"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, LogIn, ArrowRight } from "lucide-react"

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
import { useUser } from "@/firebase"
import { ModeToggle } from "@/components/mode-toggle"


/* --------------------------------- Helpers -------------------------------- */

function DynamicLogo() {
  return (
    <>
      <Image
        src="/images/logo-clair.png"
        alt="ERG Rénovation Logo"
        width={131}
        height={75}
        className="dark:hidden"
        unoptimized
      />
      <Image
        src="/images/logo-sombre.png"
        alt="ERG Rénovation Logo"
        width={131}
        height={75}
        className="hidden dark:block"
        unoptimized
      />
    </>
  )
}

function isActiveLink(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  if (href.startsWith("/#")) return pathname === "/"
  return pathname === href || pathname.startsWith(href + "/")
}

/**
 * Si un item est "#section":
 * - sur la home : "#section"
 * - ailleurs : "/#section"
 */
function resolveNavHref(pathname: string, href: string) {
  const isAnchor = href.startsWith("#")
  if (!isAnchor) return href
  return pathname === "/" ? href : `/${href}`
}

/* -------------------------------- AuthBtn -------------------------------- */

function AuthButton() {
  const { user, isUserLoading } = useUser()

  if (isUserLoading) {
    return (
      <Button variant="ghost" size="icon" className="md:h-10 md:w-auto md:px-4">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
        <span className="sr-only">Chargement</span>
      </Button>
    )
  }

  if (user) return null

  return (
    <Button asChild variant="outline" className="hidden md:inline-flex">
      <Link href="/connexion" aria-label="Accéder à l’espace professionnel">
        <LogIn className="mr-2 h-4 w-4" />
        Espace Pro
      </Link>
    </Button>
  )
}

/* -------------------------------- SiteHeader ------------------------------- */

export default function SiteHeader() {
  const pathnameRaw = usePathname()
  const pathname = pathnameRaw ?? "/" // ✅ Fix: never null
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setIsScrolled(window.scrollY > 8))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const items = React.useMemo(() => {
    return navItems.map((item) => {
      const href = resolveNavHref(pathname, item.href) // ✅ pathname is string
      const active = isActiveLink(pathname, href) // ✅ pathname is string
      return { ...item, href, active }
    })
  }, [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "border-b border-border/60 bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "transition-shadow duration-300",
        isScrolled ? "shadow-sm" : "shadow-none"
      )}
      role="banner"
    >
      <div className="container flex h-auto items-center justify-between gap-3 py-2">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2" aria-label="Aller à l’accueil">
          <DynamicLogo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center md:flex" aria-label="Navigation principale">
          <NavigationMenu>
            <NavigationMenuList>
              {items.map((item) => {
                if (item.title === "Services") {
                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuTrigger
                        className={cn(
                          "bg-transparent text-sm font-medium",
                          "focus:bg-transparent data-[state=open]:bg-transparent",
                          item.active ? "text-primary" : "text-muted-foreground hover:text-primary-foreground"
                        )}
                      >
                        Services
                      </NavigationMenuTrigger>

                      <NavigationMenuContent>
                        <div className="w-[680px] p-4 lg:w-[820px]">
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

                          {/* Footer mega menu */}
                          <div className="mt-4 flex items-center justify-between rounded-xl border bg-secondary/50 px-4 py-3">
                            <Link
                              href="/services"
                              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                            >
                              Voir tous les services <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Button asChild size="sm" className="h-9">
                              <Link href="/devis" aria-label="Demander un devis gratuit">
                                Demander un devis
                              </Link>
                            </Button>
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
                          "bg-transparent text-sm font-medium",
                          "focus:bg-transparent data-[active]:bg-transparent",
                          item.active ? "text-primary" : "text-muted-foreground hover:text-primary-foreground"
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

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <a
            href="tel:+33699961375"
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary md:flex"
            aria-label="Appeler ERG Rénovation"
          >
            <Phone className="h-4 w-4" />
            <span>06 99 96 13 75</span>
          </a>

          <Button asChild className="hidden md:inline-flex">
            <Link href="/devis">Devis</Link>
          </Button>

          <AuthButton />
          <ModeToggle />

          <MobileNav items={items} />
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
          "group flex gap-3 rounded-xl border bg-background p-3",
          "transition-colors hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
          className
        )}
        {...props}
      >
        <span className="mt-0.5 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-accent-foreground/15 group-hover:text-accent-foreground">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>

        <span className="min-w-0">
          <span className="block text-sm font-semibold leading-tight">{title}</span>
          <span className="mt-1 block line-clamp-2 text-xs leading-relaxed text-muted-foreground group-hover:text-accent-foreground/80">
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
  const pathname = pathnameRaw ?? "/" // ✅ Fix: never null
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
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="Ouvrir le menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[320px] p-0">
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle className="sr-only">Menu</SheetTitle>

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
              <Button variant="ghost" size="icon" aria-label="Fermer le menu">
                <X className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          </div>
        </SheetHeader>

        <div className="flex h-full flex-col px-5 pb-6">
          <nav className="mt-6 space-y-6" aria-label="Navigation mobile">
            {/* Main links */}
            <div className="space-y-1">
              {items
                .filter((i) => i.title !== "Services")
                .map((item) => (
                  <MobileLink
                    key={item.href}
                    href={resolveNavHref(pathname, item.href)} // ✅ pathname is string
                    active={item.active}
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </MobileLink>
                ))}
            </div>

            {/* Services */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Services
              </p>
              <div className="space-y-1">
                {servicesLinks.slice(0, 8).map((s) => (
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
                  className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Voir tous les services <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-xl border bg-secondary/40 p-4">
              <a
                href="tel:+33699961375"
                className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                06 99 96 13 75
              </a>
              <p className="mt-1 text-xs text-muted-foreground">Paris • 92 • 93 • 94</p>
            </div>
          </nav>

          {/* CTA bottom */}
          <div className="mt-auto grid gap-2 pt-6">
            <Button asChild size="lg">
              <Link href="/devis" onClick={() => setOpen(false)}>
                Demander un devis
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/connexion" onClick={() => setOpen(false)}>
                Espace Pro
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
        "flex items-center justify-between rounded-xl px-3 py-2 text-base font-medium",
        "transition-colors hover:bg-secondary",
        active ? "text-primary" : "text-foreground"
      )}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 text-muted-foreground" />
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
      className="block rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
    >
      {children}
    </Link>
  )
}
