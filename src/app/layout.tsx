import type { Metadata, Viewport } from "next"
import "./globals.css"

import { Toaster } from "@/components/ui/toaster"
import StickyCallToAction from "@/components/sticky-call-to-action"
import CookieConsent from "@/components/cookie-consent"
import { FirebaseClientProvider } from "@/firebase"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/theme-provider"
import { buildLocalBusinessJsonLd, buildWebSiteJsonLd } from "@/lib/seo/jsonld";

const SITE_NAME = "ERG Rénovation"
const SITE_URL = "https://erg-renovation.fr"
const DEFAULT_TITLE = `${SITE_NAME} | Rénovation intérieure à Paris & Île-de-France`
const DEFAULT_DESCRIPTION =
  "Spécialiste de la rénovation intérieure à Paris et en Île-de-France : appartements, maisons, cuisines, salles de bain. Devis gratuit, finitions soignées, garantie décennale."

const PHONE = "+33699961375"
const ADDRESS = {
  streetAddress: "1 Sent. de la Pointe",
  postalCode: "75020",
  addressLocality: "Paris",
  addressRegion: "Île-de-France",
  addressCountry: "FR",
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "fr_FR",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0B0B",
}

const localBusiness = buildLocalBusinessJsonLd({
  name: "ERG Rénovation",
  siteUrl: SITE_URL,
  logoUrl: `${SITE_URL}/images/logo-clair.png`,
  imageUrl: `${SITE_URL}/images/og-image.jpg`,
  phone: PHONE,
  priceRange: "€€€",
  address: ADDRESS,
  areaServed: ["Paris (75)", "Hauts-de-Seine (92)", "Seine-Saint-Denis (93)", "Val-de-Marne (94)"],
});

const website = buildWebSiteJsonLd({
  name: "ERG Rénovation",
  siteUrl: SITE_URL,
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = [localBusiness, website];
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Fonts (OK). Variante perf supérieure : next/font (à faire ensuite si tu veux) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          id="jsonld-global"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <FirebaseClientProvider>
            <TooltipProvider>{children}</TooltipProvider>

            <Toaster />
            <StickyCallToAction />
            <CookieConsent />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
