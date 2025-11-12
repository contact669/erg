/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
      // Continue d'ignorer les erreurs de type pendant la construction
      ignoreBuildErrors: true, 
  },
  eslint: {
      // Continue d'ignorer les erreurs ESLint pendant la construction
      ignoreDuringBuilds: true,
  },
  images: {
      // Les remotePatterns sont correctement définis
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

// Exportation requise par Next.js pour un fichier .js
module.exports = nextConfig;