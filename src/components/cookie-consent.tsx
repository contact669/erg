'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const consent = document.cookie.split('; ').find(row => row.startsWith('cookie_consent='));
      if (!consent) {
        setIsOpen(true);
      }
    } catch (error) {
      // document is not available on server
    }
  }, []);

  const handleAccept = () => {
    document.cookie = `cookie_consent=true; path=/; max-age=${60 * 60 * 24 * 365}`;
    setIsOpen(false);
  };

  const handleDecline = () => {
    document.cookie = `cookie_consent=false; path=/; max-age=${60 * 60 * 24 * 365}`;
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="container p-4">
            <div className="bg-secondary/95 backdrop-blur-sm p-6 rounded-lg shadow-2xl border border-border/50 flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-shrink-0">
                    <Cookie className="h-8 w-8 text-accent" />
                </div>
                <div className="flex-grow">
                    <h3 className="font-headline font-semibold text-foreground">Gestion des cookies</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant, vous acceptez notre{' '}
                        <Link href="/confidentialite" className="underline hover:text-primary">
                        politique de confidentialité
                        </Link>
                        .
                    </p>
                </div>
                <div className="flex gap-3 self-end md:self-center flex-shrink-0">
                    <Button variant="outline" size="sm" onClick={handleDecline}>
                        Refuser
                    </Button>
                    <Button size="sm" onClick={handleAccept}>
                        Accepter
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
}
