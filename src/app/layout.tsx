import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import StickyCallToAction from '@/components/sticky-call-to-action';
import CookieConsent from '@/components/cookie-consent';
import { FirebaseClientProvider } from '@/firebase';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'ERG Rénovation - Rénovation intérieure à Paris',
  description:
    'Spécialiste de la rénovation intérieure à Paris 20 et en Île-de-France. Appartements, maisons, cuisines, salles de bain. Devis gratuit.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
            <Toaster />
            <StickyCallToAction />
            <CookieConsent />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
