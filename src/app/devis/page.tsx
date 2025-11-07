import Link from 'next/link';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DevisPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-grow">
        <div className="container py-16 md:py-24">
            <div className="flex items-center justify-center">
                <Card className="w-full max-w-2xl text-center">
                    <CardHeader>
                        <CardTitle className="font-headline text-3xl md:text-4xl">Demande de Devis</CardTitle>
                        <CardDescription className="text-lg">
                        Notre formulaire de devis détaillé arrive bientôt.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                        Pour toute demande, veuillez nous contacter directement par téléphone ou par email. Nous serons ravis de discuter de votre projet.
                        </p>
                        <div className='flex justify-center gap-4'>
                            <Button asChild>
                                <a href="tel:+33123456789">Appeler maintenant</a>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/">Retour à l'accueil</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
