'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Phone, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';

export default function StickyCallToAction() {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/70 p-2 backdrop-blur-sm md:hidden">
      <div className="container flex items-center justify-center gap-2">
        <Button asChild className="flex-1" size="lg">
          <Link href="/devis">
            <Calendar className="mr-2 h-4 w-4" /> Devis gratuit
          </Link>
        </Button>
        <Button asChild variant="outline" className="flex-1" size="lg">
          <a href="tel:+33699961375">
            <Phone className="mr-2 h-4 w-4" /> Nous appeler
          </a>
        </Button>
      </div>
    </div>
  );
}
