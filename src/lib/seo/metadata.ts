import type { Metadata } from 'next';

export const SITE_URL = 'https://erg-renovation.fr';
export const SITE_NAME = 'ERG Rénovation';

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = new URL(path, SITE_URL).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website', url, siteName: SITE_NAME, locale: 'fr_FR',
      title: `${title} | ${SITE_NAME}`, description,
      images: [{ url: `${SITE_URL}/images/og-image.png`, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image', title: `${title} | ${SITE_NAME}`, description,
      images: [`${SITE_URL}/images/og-image.png`],
    },
  };
}

export const privateMetadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};
