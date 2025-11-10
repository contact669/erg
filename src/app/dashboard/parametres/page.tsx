'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

export default function ParametresPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/connexion');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-border border-t-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">
          Gérez les paramètres de l'application et de votre compte.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Choisissez comment vous souhaitez recevoir les notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="new-devis" className="flex flex-col space-y-1">
                <span>Nouveau devis reçu</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Recevoir une notification par email.
                </span>
              </Label>
              <Switch id="new-devis" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="chantier-update" className="flex flex-col space-y-1">
                <span>Mise à jour d'un chantier</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Recevoir une notification par email.
                </span>
              </Label>
              <Switch id="chantier-update" />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="facture-paid" className="flex flex-col space-y-1">
                <span>Facture payée</span>
                 <span className="font-normal leading-snug text-muted-foreground">
                  Recevoir une notification par email.
                </span>
              </Label>
              <Switch id="facture-paid" defaultChecked />
            </div>
          </CardContent>
        </Card>
        
         <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informations de l'entreprise</CardTitle>
            <CardDescription>
              Mettez à jour les informations légales de votre entreprise.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="company-name">Nom de l'entreprise</Label>
                <Input id="company-name" defaultValue="ERG Rénovation" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="company-address">Adresse</Label>
                <Input id="company-address" defaultValue="1 Sente de la Pointe, 75020 Paris" />
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="company-siret">SIRET</Label>
                    <Input id="company-siret" placeholder="123 456 789 00010" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="company-vat">Numéro de TVA</Label>
                    <Input id="company-vat" placeholder="FR12345678901" />
                </div>
            </div>
             <Button>Enregistrer les modifications</Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
