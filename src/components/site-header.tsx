'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ErgLogo } from '@/components/icons.tsx';
import { navItems } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/lib/types';

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm transition-shadow duration-300',
        isScrolled ? 'shadow-md' : 'shadow-none'
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ErgLogo className="h-8 w-8" />
          <span className="font-headline text-xl font-bold text-primary">
            ERG Rénovation
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            // Adjust href for smooth scroll on homepage
            const href = pathname === '/' && item.href.startsWith('#') ? item.href : (item.href.startsWith('#') ? `/${item.href}` : item.href);
            const isActive = pathname === href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:flex">
            <Link href="/devis">Demander un devis</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Ouvrir le menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px]">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b pb-4">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <ErgLogo className="h-8 w-8" />
              <span className="font-headline text-xl font-bold text-primary">
                ERG
              </span>
            </Link>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Fermer le menu</span>
                </Button>
            </SheetTrigger>
          </div>
          <nav className="mt-6 flex flex-col gap-6">
            {navItems.map((item) => {
               const href = pathname === '/' && item.href.startsWith('#') ? item.href : (item.href.startsWith('#') ? `/${item.href}` : item.href);
               const isActive = pathname === href || (item.href !== '/' && pathname.startsWith(item.href));

              return (
              <MobileLink
                key={item.href}
                href={href}
                onOpenChange={setIsOpen}
                className={isActive ? 'text-primary' : 'text-foreground'}
              >
                {item.title}
              </MobileLink>
            )})}
          </nav>
          <Button asChild className="mt-auto">
            <Link href="/devis">Demander un devis</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string;
  disabled?: boolean;
  className?: string;
  onOpenChange?: (open: boolean) => void;
}

function MobileLink({ children, href, disabled, className, onOpenChange }: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'text-lg font-medium transition-colors hover:text-primary',
        disabled && 'pointer-events-none opacity-60',
        className
      )}
      onClick={() => onOpenChange?.(false)}
    >
      {children}
    </Link>
  );
}
