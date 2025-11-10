
import Link from 'next/link';
import { ErgLogo } from './icons';
import { services, navItems } from '@/lib/data.tsx';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, MapPin, Phone } from 'lucide-react';

function StyledLogo() {
  return (
    <span className="font-headline text-2xl font-bold tracking-wider text-primary">
      <span className="tracking-widest">E</span>
      <span className="underline decoration-accent decoration-2 underline-offset-4">R</span>
      <span className="tracking-widest">G</span>
    </span>
  );
}

export default function SiteFooter() {
  const legalLinks = [
    { title: 'Mentions Légales', href: '/mentions-legales' },
    { title: 'Politique de confidentialité', href: '/confidentialite' },
    { title: 'Gestion des cookies', href: '/cookies' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <ErgLogo className="h-8 w-8 text-primary" />
              <StyledLogo />
            </Link>
            <p className="text-sm">
              L&apos;excellence en rénovation intérieure à Paris et en Île-de-France.
            </p>
            <div className="space-y-2 text-sm">
                 <p className="flex items-start gap-2">
                    <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                    <span>1 Sent. de la Pointe, 75020 Paris</span>
                </p>
                <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-accent" />
                    <a href="tel:+33699961375" className="hover:text-primary">06 99 96 13 75</a>
                </p>
                <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-accent" />
                    <a href="mailto:contact@erg-renovation.fr" className="hover:text-primary">contact@erg-renovation.fr</a>
                </p>
            </div>
          </div>

          <div>
            <h4 className="font-headline font-semibold text-primary">Navigation</h4>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-primary">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-semibold text-primary">Nos Services</h4>
            <ul className="mt-4 space-y-2">
              {services.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="text-sm hover:text-primary">
                    {service.title}
                  </Link>
                </li>
              ))}
                <li>
                  <Link href="/services" className="text-sm font-semibold hover:text-primary">
                    Voir tous les services &rarr;
                  </Link>
                </li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-semibold text-primary">Newsletter</h4>
            <p className="mt-4 text-sm">
              Recevez nos conseils et dernières réalisations.
            </p>
            <form className="mt-4 flex gap-2">
              <Input type="email" placeholder="Votre email" className="bg-background" />
              <Button type="submit" variant="default">S&apos;inscrire</Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
                Copyright &copy; {new Date().getFullYear()} ERG Rénovation. Tous droits réservés.
            </p>
            <div className="flex gap-4 items-center">
                {legalLinks.map(link => (
                    <Link href={link.href} key={link.href} className="text-xs text-muted-foreground hover:text-primary">
                        {link.title}
                    </Link>
                ))}
                 <Link href="/connexion" className="text-xs text-muted-foreground hover:text-primary">Admin</Link>
            </div>
        </div>

      </div>
    </footer>
  );
}
