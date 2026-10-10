import { MetadataRoute } from 'next';
import { services, allProjects, blogPosts, localLandingPages, AREAS } from '@/lib/data';
import { SUBURBS_DATA } from '@/lib/seo/suburbs-data';
import { PARIS_ARRONDISSEMENTS } from '@/lib/seo/paris-arrondissements';

const SITE_URL = 'https://erg-renovation.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '/',
    '/services',
    '/realisations',
    '/zones-intervention',
    '/a-propos',
    '/blog',
    '/contact',
    '/devis',
    '/mentions-legales',
    '/confidentialite',
    '/cookies',
    '/plan-du-site',
  ];

  const staticPages = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    priority: route === '/' ? 1.0 : 0.8,
  }));

  const servicePages = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    priority: 0.9,
  }));

  const projectPages = allProjects.map((project) => ({
    url: `${SITE_URL}/realisations/${project.slug}`,
    priority: 0.7,
  }));

  const blogPostPages = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    priority: 0.7,
  }));

  const departmentPages = AREAS.map((area) => ({
    url: `${SITE_URL}${area.href}`,
    priority: 0.8,
  }));
  
  const cityPages = AREAS.flatMap(area => 
    area.cities
      .filter(city => city.href)
      .map(city => ({
        url: `${SITE_URL}${city.href!}`,
        priority: 0.7,
      }))
  );

  const localLandingPagesUrls = localLandingPages.map((page) => ({
    url: `${SITE_URL}/${page.parentService.slug}/${page.slug}`,
    priority: 0.6,
  }));
  
  // Combine and remove duplicates just in case
  const allUrls = [
      ...Object.values(SUBURBS_DATA).map(city => ({ url: `${SITE_URL}/renovation-${city.slug}`, priority: 0.7 })),
      ...Object.keys(PARIS_ARRONDISSEMENTS).map((slug) => ({ url: `${SITE_URL}/renovation-paris/${slug}`, priority: 0.7 })),
      ...staticPages,
      ...servicePages,
      ...projectPages,
      ...blogPostPages,
      ...departmentPages,
      ...cityPages,
      ...localLandingPagesUrls,
  ];

  const uniqueUrls = Array.from(new Map(allUrls.map(item => [item.url, item])).values());
  
  return uniqueUrls;
}
