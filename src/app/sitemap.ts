import { MetadataRoute } from 'next';
import { services, allProjects, blogPosts, localLandingPages, AREAS } from '@/lib/data';

const SITE_URL = 'https://www.erg-renovation.fr';

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
  ];

  const staticPages = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    priority: route === '/' ? 1.0 : 0.8,
  }));

  const servicePages = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: new Date().toISOString(),
    priority: 0.9,
  }));

  const projectPages = allProjects.map((project) => ({
    url: `${SITE_URL}/realisations/${project.slug}`,
    lastModified: new Date().toISOString(),
    priority: 0.7,
  }));

  const blogPostPages = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    priority: 0.7,
  }));

  const departmentPages = AREAS.map((area) => ({
    url: `${SITE_URL}${area.href}`,
    lastModified: new Date().toISOString(),
    priority: 0.8,
  }));
  
  const cityPages = AREAS.flatMap(area => 
    area.cities
      .filter(city => city.href)
      .map(city => ({
        url: `${SITE_URL}${city.href!}`,
        lastModified: new Date().toISOString(),
        priority: 0.7,
      }))
  );

  const localLandingPagesUrls = localLandingPages.map((page) => ({
    url: `${SITE_URL}/${page.parentService.slug}/${page.slug}`,
    lastModified: new Date().toISOString(),
    priority: 0.6,
  }));
  
  // Combine and remove duplicates just in case
  const allUrls = [
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
