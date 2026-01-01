
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, LogIn, LayoutDashboard, ArrowRight, ShieldCheck, Clock, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ErgLogo } from "@/components/icons"
import { navItems, services } from "@/lib/data"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useUser } from "@/firebase"
import { ModeToggle } from "./mode-toggle"

function AuthButton() {
  const { user, isUserLoading } = useUser()

  if (isUserLoading) {
    return (
      <Button variant="ghost" size="icon" className="md:h-10 md:w-auto md:px-4">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
      </Button>
    )
  }

  if (user) {
    return (
      <Button asChild className="hidden lg:inline-flex">
        <Link href="/dashboard">
          <LayoutDashboard className="lg:mr-2 h-4 w-4" />
          <span className="hidden lg:inline">Tableau de bord</span>
        </Link>
      </Button>
    )
  }

  return (
    <Button asChild className="hidden lg:inline-flex" variant="secondary">
      <Link href="/connexion">
        <LogIn className="lg:mr-2 h-4 w-4" />
        <span className="hidden lg:inline">Espace Pro</span>
      </Link>
    </Button>
  )
}

function StyledLogo() {
  return (
    <span className="font-headline text-2xl font-bold tracking-wider text-primary">
      <span className="tracking-widest">E</span>
      <span className="underline decoration-accent decoration-2 underline-offset-4">R</span>
      <span className="tracking-widest">G</span>
    </span>
  )
}

function isActiveLink(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(href + "/")
}

function resolveNavHref(pathname: string, href: string) {
  const isHomePage = pathname === "/"
  const isAnchor = href.startsWith("#")
  if (isHomePage && isAnchor) return href
  if (isAnchor) return `/${href}` // => "/#section"
  return href
}

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm transition-shadow duration-300",
        isScrolled ? "shadow-md" : "shadow-none"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="Accueil ERG Rénovation">
          <ErgLogo className="h-8 w-8" />
          <StyledLogo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => {
                const href = resolveNavHref(pathname, item.href)
                const isActive = isActiveLink(pathname, item.href)

                if (item.title === "Services") {
                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuTrigger
                        className={cn(
                          "group relative bg-transparent text-sm font-medium transition-colors",
                          "focus:bg-transparent focus:text-primary data-[active]:bg-transparent data-[state=open]:bg-transparent",
                          isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                        )}
                      >
                        <span>{item.title}</span>
                      </NavigationMenuTrigger>

                      <NavigationMenuContent>
                        {/* Mega menu : 2 colonnes services + colonne preuves + footer link */}
                        <div className="w-[820px] p-4 lg:w-[920px]">
                          <div className="grid grid-cols-12 gap-4">
                            {/* Services list (2 colonnes) */}
                            <div className="col-span-12 lg:col-span-8">
                              <div className="mb-3 flex items-center justify-between">
                                <p className="text-sm font-medium">Nos services</p>
                                <Link
                                  href="/services"
                                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                                >
                                  Voir tous les services <ArrowRight className="h-4 w-4" />
                                </Link>
                              </div>

                              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                {services.map((service) => (
                                  <MenuServiceItem
                                    key={service.slug}
                                    title={service.title}
                                    href={`/services/${service.slug}`}
                                    icon={service.icon}
                                  >
                                    {service.description}
                                  </MenuServiceItem>
                                ))}
                              </div>
                            </div>

                            {/* Proof / reassurance column */}
                            <div className="col-span-12 lg:col-span-4">
                              <div className="rounded-xl border bg-card p-4">
                                <p className="text-sm font-medium">Pourquoi ERG ?</p>

                                <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
                                  <li className="flex gap-3">
                                    <span className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">
                                      <ShieldCheck className="h-4 w-4" />
                                    </span>
                                    <div>
                                      <p className="font-medium text-foreground">Garantie décennale</p>
                                      <p className="text-xs leading-relaxed">Travaux conformes et couverts.</p>
                                    </div>
                                  </li>

                                  <li className="flex gap-3">
                                    <span className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">
                                      <Clock className="h-4 w-4" />
                                    </span>
                                    <div>
                                      <p className="font-medium text-foreground">Délais maîtrisés</p>
                                      <p className="text-xs leading-relaxed">Planning clair, suivi de chantier.</p>
                                    </div>
                                  </li>

                                  <li className="flex gap-3">
                                    <span className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">
                                      <Star className="h-4 w-4" />
                                    </span>
                                    <div>
                                      <p className="font-medium text-foreground">Avis clients</p>
                                      <p className="text-xs leading-relaxed">Satisfaction et finitions soignées.</p>
                                    </div>
                                  </li>
                                </ul>

                                <div className="mt-4 grid gap-2">
                                  <Button asChild className="w-full">
                                    <Link href="/devis">Demander un devis</Link>
                                  </Button>

                                  <a
                                    href="tel:0699961375"
                                    className="inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent"
                                  >
                                    <Phone className="h-4 w-4" />
                                    <span>06 99 96 13 75</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Footer line */}
                          <div className="mt-4 flex items-center justify-between border-t pt-3">
                            <p className="text-xs text-muted-foreground">
                              Devis gratuit • Intervention Paris / 92 / 93 / 94
                            </p>
                            <Link
                              href="/realisations"
                              className="text-xs font-medium text-muted-foreground hover:text-primary"
                            >
                              Voir nos réalisations →
                            </Link>
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
                        href={href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "group relative bg-transparent text-sm font-medium transition-colors",
                          "focus:bg-transparent focus:text-primary data-[active]:bg-transparent data-[state=open]:bg-transparent",
                          isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                        )}
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

        {/* Right side */}
        <div className="flex items-center gap-2">
          <a
            href="tel:0699961375"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            <span>06 99 96 13 75</span>
          </a>

          <Button asChild className="hidden md:flex">
            <Link href="/devis">Demander un devis</Link>
          </Button>

          <ModeToggle />
          <AuthButton />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

const MenuServiceItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; icon: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "group block select-none rounded-lg border bg-background p-3 no-underline outline-none transition-colors",
          "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          <div className="rounded-md bg-primary/10 p-2 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="mt-1 line-clamp-2 text-xs leading-snug text-muted-foreground group-hover:text-accent-foreground/80">
              {children}
            </p>
          </div>
        </div>
      </a>
    </NavigationMenuLink>
  )
})
MenuServiceItem.displayName = "MenuServiceItem"

function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Ouvrir le menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[320px]">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <ErgLogo className="h-8 w-8" />
              <StyledLogo />
            </Link>

            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <X className="h-6 w-6" />
                <span className="sr-only">Fermer le menu</span>
              </Button>
            </SheetTrigger>
          </div>
        </SheetHeader>

        <div className="flex h-full flex-col">
          <nav className="mt-6 flex flex-col gap-4" aria-label="Navigation mobile">
            {navItems.map((item) => {
              const href = resolveNavHref(pathname, item.href)
              const isActive = isActiveLink(pathname, item.href)

              return (
                <MobileLink
                  key={item.href}
                  href={href}
                  onOpenChange={setIsOpen}
                  className={isActive ? "text-primary" : "text-foreground"}
                >
                  {item.title}
                </MobileLink>
              )
            })}
          </nav>

          <div className="mt-auto flex flex-col gap-4 border-t pt-6">
             <div className="grid gap-2">
                <Button asChild>
                <Link href="/devis">Demander un devis</Link>
                </Button>
                <a
                href="tel:0699961375"
                className="inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                <Phone className="h-4 w-4" />
                <span>Appeler</span>
                </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string
  disabled?: boolean
  className?: string
  onOpenChange?: (open: boolean) => void
}

function MobileLink({ children, href, disabled, className, onOpenChange }: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-lg font-medium transition-colors hover:text-primary",
        disabled && "pointer-events-none opacity-60",
        className
      )}
      onClick={() => onOpenChange?.(false)}
    >
      {children}
    </Link>
  )
}
