'use client';

import { useState } from 'react';
import { useFirestore } from '@/firebase';
import { findOrCreateClient } from '@/lib/crm/clients';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const EMPTY = { name: '', email: '', phone: '', address: '', postalCode: '', city: '' };

export function NewClientDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [form, setForm] = useState(EMPTY);
  const [isSaving, setIsSaving] = useState(false);

  const set = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast({ variant: 'destructive', title: 'Le nom du client est obligatoire' });
      return;
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      toast({ variant: 'destructive', title: 'Adresse email invalide' });
      return;
    }
    setIsSaving(true);
    try {
      await findOrCreateClient(firestore, { ...form, source: 'Saisie manuelle' });
      toast({ title: 'Client enregistré' });
      setForm(EMPTY);
      onOpenChange(false);
    } catch (error) {
      console.error('Création du client impossible:', error);
      toast({ variant: 'destructive', title: "Le client n'a pas pu être enregistré", description: 'Réessayez dans un instant.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Nouveau client</DialogTitle>
          <DialogDescription className="text-xs">
            Si un client existe déjà avec cet email, sa fiche est complétée au lieu d&apos;en créer une deuxième.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="client-name">Nom *</Label>
            <Input id="client-name" value={form.name} onChange={set('name')} placeholder="Nom et prénom ou société" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="client-email">Email</Label>
              <Input id="client-email" type="email" value={form.email} onChange={set('email')} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="client-phone">Téléphone</Label>
              <Input id="client-phone" type="tel" value={form.phone} onChange={set('phone')} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="client-address">Adresse</Label>
            <Input id="client-address" value={form.address} onChange={set('address')} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="client-postal">Code postal</Label>
              <Input id="client-postal" value={form.postalCode} onChange={set('postalCode')} />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="client-city">Ville</Label>
              <Input id="client-city" value={form.city} onChange={set('city')} />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>Annuler</Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-amber-600 hover:bg-amber-500 text-white font-bold">
            {isSaving ? 'Enregistrement…' : 'Enregistrer le client'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
