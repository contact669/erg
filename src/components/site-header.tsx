'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ErgLogo } from '@/components/icons.tsx';
import { navItems, services } from '@/lib/data.tsx';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
            const isHomePage = pathname === '/';
            const isAnchorLink = item.href.startsWith('#');
            
            const href = isHomePage && isAnchorLink ? item.href : (isAnchorLink ? `/${item.href}` : item.href);
            
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            if (item.title === 'Services') {
              return (
                <DropdownMenu key={item.href}>
                  <DropdownMenuTrigger asChild>
                    <div
                      className={cn(
                        'group relative cursor-pointer text-sm font-medium transition-colors',
                        isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                      )}
                    >
                      <span>{item.title}</span>
                       <span
                        className={cn(
                          'absolute -bottom-1 left-0 h-0.5 w-full bg-accent transition-transform duration-300 ease-out',
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        )}
                        style={{transformOrigin: 'left'}}
                      />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-96 p-4">
                    <div className="grid grid-cols-2 gap-4">
                      {services.map((service) => (
                        <DropdownMenuItem key={service.slug} asChild>
                          <Link
                            href={`/services/${service.slug}`}
                            className="flex items-center gap-3 rounded-md p-3 hover:bg-secondary"
                          >
                            <div className="rounded-md bg-primary/10 p-2 text-accent">
                               <service.icon className="h-5 w-5" />
                            </div>
                            <div className='flex flex-col'>
                                <span className="font-semibold">{service.title}</span>
                                <span className="text-xs text-muted-foreground">{service.description}</span>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  'group relative text-sm font-medium transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                )}
              >
                <span>{item.title}</span>
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-0.5 w-full bg-accent transition-transform duration-300 ease-out',
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )}
                  style={{transformOrigin: 'left'}}
                />
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
               const isHomePage = pathname === '/';
               const isAnchorLink = item.href.startsWith('#');
               const href = isHomePage && isAnchorLink ? item.href : (isAnchorLink ? `/${item.href}` : item.href);
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
