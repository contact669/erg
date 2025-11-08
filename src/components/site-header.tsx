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
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

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

        <nav className="hidden items-center gap-1 md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => {
                const isHomePage = pathname === '/';
                const isAnchorLink = item.href.startsWith('#');

                const href =
                  isHomePage && isAnchorLink
                    ? item.href
                    : isAnchorLink
                      ? `/${item.href}`
                      : item.href;

                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));

                if (item.title === 'Services') {
                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuTrigger
                        className={cn(
                          'group relative bg-transparent text-sm font-medium transition-colors',
                          'focus:bg-transparent focus:text-primary data-[active]:bg-transparent data-[state=open]:bg-transparent',
                          isActive
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-primary'
                        )}
                      >
                        <span>{item.title}</span>
                         <span className={cn(
                          'absolute bottom-2 left-0 h-0.5 w-full scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100',
                          isActive && 'scale-x-100'
                         )} />
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[600px] grid-cols-2 gap-4 p-4 md:w-[700px] lg:w-[800px]">
                          {services.map((service) => (
                            <ListItem
                              key={service.slug}
                              title={service.title}
                              href={`/services/${service.slug}`}
                              icon={service.icon}
                            >
                              {service.description}
                            </ListItem>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                return (
                  <NavigationMenuItem key={item.href}>
                    <Link href={href} passHref>
                       <NavigationMenuLink className={cn(
                          navigationMenuTriggerStyle(),
                          'group relative bg-transparent text-sm font-medium transition-colors',
                           'focus:bg-transparent focus:text-primary data-[active]:bg-transparent data-[state=open]:bg-transparent',
                           isActive
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-primary'
                        )}>
                        <span>{item.title}</span>
                         <span className={cn(
                          'absolute bottom-2 left-0 h-0.5 w-full scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100',
                          isActive && 'scale-x-100'
                         )} />
                       </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
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

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { title: string, icon: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <div>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-3">
             <div className="rounded-md bg-primary/10 p-2 text-accent">
               <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                {children}
              </p>
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </div>
  );
});
ListItem.displayName = 'ListItem';


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
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
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
              const href =
                isHomePage && isAnchorLink
                  ? item.href
                  : isAnchorLink
                    ? `/${item.href}`
                    : item.href;
              const isActive =
                pathname === href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <MobileLink
                  key={item.href}
                  href={href}
                  onOpenChange={setIsOpen}
                  className={isActive ? 'text-primary' : 'text-foreground'}
                >
                  {item.title}
                </MobileLink>
              );
            })}
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

function MobileLink({
  children,
  href,
  disabled,
  className,
  onOpenChange,
}: MobileLinkProps) {
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
