'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { services, allProjects, blogPosts, localLandingPages } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Fragment } from 'react';

function slugToTitle(slug: string): string {
    const dataSources = [services, allProjects, blogPosts, localLandingPages];
    for (const source of dataSources) {
        const item = source.find((i: any) => i.slug === slug);
        if (item) return item.title;
    }

    // Fallback for simple slugs
    const manualSlugs: { [key: string]: string } = {
        'a-propos': 'À Propos',
        'blog': 'Blog',
        'contact': 'Contact',
        'devis': 'Devis',
        'realisations': 'Réalisations',
        'services': 'Services',
        'renovation-appartement': 'Rénovation Appartement'
    };

    if (manualSlugs[slug]) {
        return manualSlugs[slug];
    }

    return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function truncateTitle(title: string): string {
    const words = title.split(' ');
    if (words.length > 2) {
        return words.slice(0, 2).join(' ') + '...';
    }
    return title;
}


export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  return (
    <div className="bg-secondary">
        <div className="container py-3">
        <nav aria-label="breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
                <Link href="/" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <Home className="h-4 w-4" />
                    <span>Accueil</span>
                </Link>
            </li>
            {segments.map((segment, index) => {
                const href = '/' + segments.slice(0, index + 1).join('/');
                const isLast = index === segments.length - 1;
                
                let title = slugToTitle(segment);
                const isBlogPostPage = segments[0] === 'blog' && segments.length > 1 && isLast;
                if (isBlogPostPage) {
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
                        'hover:text-primary transition-colors',
                        isLast && 'text-foreground font-medium pointer-events-none'
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
    </div>
  );
}
