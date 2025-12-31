
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { services, allProjects, blogPosts, localLandingPages } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Fragment } from 'react';

function slugToTitle(slug: string, fullPath: string): string {
    const segments = fullPath.split('/').filter(Boolean);
    const parentServiceSlug = segments.length > 1 ? segments[0] : undefined;

    const dataSources = [services, allProjects, blogPosts];
    for (const source of dataSources) {
        const item = source.find((i: any) => i.slug === slug);
        if (item) return item.title;
    }
    
    const localPage = localLandingPages.find(p => p.slug === slug && p.parentService.slug === parentServiceSlug);
    if(localPage) return localPage.title;


    // Fallback for simple slugs
    const manualSlugs: { [key: string]: string } = {
        'a-propos': 'À Propos',
        'blog': 'Blog',
        'contact': 'Contact',
        'devis': 'Devis',
        'realisations': 'Réalisations',
        'services': 'Services',
        'renovation-appartement': 'Rénovation Appartement',
        'renovation-maison': 'Rénovation Maison',
        'renovation-salle-de-bain': 'Rénovation Salle de Bain',
        'confidentialite': 'Confidentialité',
        'cookies': 'Cookies',
        'mentions-legales': 'Mentions Légales',
    };

    if (manualSlugs[slug]) {
        return manualSlugs[slug];
    }

    return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function truncateTitle(title: string): string {
    const words = title.split(' ');
    if (words.length > 5) {
        return words.slice(0, 5).join(' ') + '...';
    }
    return title;
}


export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // Do not show breadcrumbs on the homepage
  if (pathname === '/') {
    return null;
  }
  
  // Do not show breadcrumbs on the main dashboard page
  if (pathname === '/dashboard') {
    return null;
  }

  const darkTextPages = [
    '/blog',
    '/contact',
    '/devis',
    '/mentions-legales',
    '/confidentialite',
    '/cookies',
    '/realisations',
    '/a-propos',
    '/services',
    '/renovation-appartement',
    '/renovation-maison',
    '/renovation-salle-de-bain'
  ];

  const useDarkText = darkTextPages.some(page => pathname.startsWith(page));

  const isCentered = ['/a-propos', '/blog', '/contact', '/devis', '/mentions-legales', '/confidentialite', '/cookies', '/realisations', '/services'].includes(pathname);

  return (
    <div className={cn(
      !useDarkText && "text-primary-foreground/80"
    )}>
        <nav aria-label="breadcrumb">
            <ol className={cn(
                "flex items-center gap-2 text-sm",
                 useDarkText && "text-muted-foreground",
                 isCentered && "justify-center",
            )}>
            <li>
                <Link href="/" className={cn(
                    "flex items-center gap-1.5 transition-colors",
                    useDarkText ? "hover:text-primary" : "hover:text-white"
                )}>
                    <Home className="h-4 w-4" />
                    <span>Accueil</span>
                </Link>
            </li>
            {segments.map((segment, index) => {
                const href = '/' + segments.slice(0, index + 1).join('/');
                const isLast = index === segments.length - 1;
                
                let title = slugToTitle(segment, pathname);
                
                if (isLast) {
                    title = truncateTitle(title);
                }

                return (
                <Fragment key={href}>
                    <li>
                        <ChevronRight className="h-4 w-4" />
                    </li>
                    <li>
                    <Link
                        href={href}
                        aria-current={isLast ? 'page' : undefined}
                        className={cn(
                        'transition-colors',
                        isLast 
                            ? (useDarkText ? "text-foreground" : "text-white") + " font-medium pointer-events-none"
                            : (useDarkText ? "hover:text-primary" : "hover:text-white")
                        )}
                    >
                        {title}
                    </Link>
                    </li>
                </Fragment>
                );
            })}
            </ol>
        </nav>
    </div>
  );
}
