/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: '/:path*', has: [{ type: 'host', value: 'www.erg-renovation.fr' }], destination: 'https://erg-renovation.fr/:path*', permanent: true }];
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
