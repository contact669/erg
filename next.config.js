const insuranceScope = require('./src/lib/insurance-scope.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Services whose trades are not covered by the décennale are not published (see insurance-scope.json).
    const unpublished = insuranceScope.unpublishedServiceSlugs.flatMap((slug) => [
      { source: `/services/${slug}`, destination: insuranceScope.redirectTo, permanent: true },
      { source: `/${slug}/:path*`, destination: insuranceScope.redirectTo, permanent: true },
    ]);
    return [
      { source: '/renovation-appartement/val-de-marne-94', destination: '/renovation-val-de-marne', permanent: true },
      { source: '/renovation-appartement/creteil', destination: '/renovation-creteil', permanent: true },
      { source: '/renovation-appartement/maisons-alfort', destination: '/renovation-maisons-alfort', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'www.erg-renovation.fr' }], destination: 'https://erg-renovation.fr/:path*', permanent: true },
      ...unpublished,
    ];
  },
  async headers() {
    return ['/dashboard/:path*', '/crm/:path*', '/connexion/:path*', '/api/:path*'].map(source => ({
      source, headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
    }));
  },
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'placehold.co',
          },
          {
              protocol: 'https',
              hostname: 'images.unsplash.com',
          },
          {
              protocol: 'https',
              hostname: 'picsum.photos',
          },
      ],
  },
};

module.exports = nextConfig;
