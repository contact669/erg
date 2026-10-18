const insuranceScope = require('./src/lib/insurance-scope.json');
const localRedirects = require('./src/lib/seo/local-redirects.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Services whose trades are not covered by the décennale are not published (see insurance-scope.json).
    const unpublished = insuranceScope.unpublishedServiceSlugs.flatMap((slug) => [
      { source: `/services/${slug}`, destination: insuranceScope.redirectTo, permanent: true },
      { source: `/${slug}/:path*`, destination: insuranceScope.redirectTo, permanent: true },
    ]);
    return [
      ...Object.entries(localRedirects).map(([source, destination]) => ({ source, destination, permanent: true })),
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
      // App Hosting otherwise disables the Next.js optimizer during deployment.
      unoptimized: false,
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
