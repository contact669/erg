import type { Metadata, Viewport } from "next"
import Script from "next/script"
import "./globals.css"

import { Toaster } from "@/components/ui/toaster"
import StickyCallToAction from "@/components/sticky-call-to-action"
import CookieConsent from "@/components/cookie-consent"
import { FirebaseClientProvider } from "@/firebase"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/theme-provider"

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
    // images: [{ url: "/og.jpg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    // images: ["/og.jpg"],
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

function JsonLdGlobal() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "fr-FR",
      },
      {
        // Home as WebPage (utile pour Google, même si d’autres pages ont leur propre JSON-LD)
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: "fr-FR",
      },
      {
        // LocalBusiness (à enrichir si tu ajoutes SIRET, geo, sameAs, openingHours, etc.)
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        url: SITE_URL,
        telephone: PHONE,
        priceRange: "€€",
        address: {
          "@type": "PostalAddress",
          ...ADDRESS,
        },
        areaServed: ["Paris", "Île-de-France"],
      },
      {
        // Organization (optionnel, mais utile si tu veux séparer “business” et “marque”)
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        telephone: PHONE,
      },
    ],
  }

  return (
    <Script
      id="jsonld-global"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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

        {/* JSON-LD global (ne remplace pas les JSON-LD spécifiques des pages service/local) */}
        <JsonLdGlobal />

        {/* (Optionnel) Perf: hint pour accélérer les appels tel / maps / etc.
            <link rel="dns-prefetch" href="//www.google-analytics.com" />
        */}
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
