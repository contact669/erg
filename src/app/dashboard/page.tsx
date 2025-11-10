'use client';

import { useUser, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/connexion');
    }
  }, [user, isUserLoading, router]);

  const handleSignOut = async () => {
    await auth.signOut();
    router.push('/');
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-border border-t-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-grow bg-secondary py-12">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-headline text-3xl font-bold">Tableau de Bord</h1>
            <Button variant="outline" onClick={handleSignOut}>
              Se déconnecter
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Bienvenue !</CardTitle>
              <CardDescription>
                Ceci est votre espace de gestion. D'ici, vous pourrez bientôt gérer vos clients, chantiers, devis et factures.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Email: {user.email}</p>
              <p className="text-sm text-muted-foreground">ID Utilisateur: {user.uid}</p>
            </CardContent>
          </Card>

        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
