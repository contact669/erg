'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumbs from '@/components/breadcrumbs';
import { services } from '@/lib/data';
import { useState } from 'react';
import { createQuoteRequest } from '@/lib/actions/quotes';

const formSchema = z.object({
  clientName: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  clientEmail: z.string().email("Veuillez saisir une adresse email valide."),
  clientPhone: z.string().optional(),
  clientAddress: z.string().min(5, "L'adresse est requise."),
  
  service: z.string({ required_error: "Veuillez sélectionner un type de service." }),
  projectName: z.string().min(3, "Le nom du projet est requis."),
  projectDescription: z.string().min(20, "Veuillez décrire votre projet plus en détail."),
  estimatedBudget: z.string().optional(),
});

export default function DevisPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      clientAddress: '',
      projectName: '',
      projectDescription: '',
      estimatedBudget: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await createQuoteRequest(values);
      toast({
        title: 'Demande de devis envoyée !',
        description:
          'Merci pour votre demande. Nous l\'étudions et reviendrons vers vous rapidement.',
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Une erreur est survenue',
        description: 'Impossible d\'envoyer votre demande. Veuillez réessayer.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <Breadcrumbs />
      <main className="flex-grow">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl md:text-4xl">Demande de Devis Personnalisé</CardTitle>
                <CardDescription className="text-lg">
                  Remplissez ce formulaire pour nous donner les clés de votre projet. Nous vous recontacterons sous 48h.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Client Info */}
                    <fieldset className="space-y-4 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">Vos Coordonnées</legend>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField control={form.control} name="clientName" render={({ field }) => (
                          <FormItem><FormLabel>Nom complet</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="clientEmail" render={({ field }) => (
                          <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="votre@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="clientAddress" render={({ field }) => (
                        <FormItem><FormLabel>Adresse du projet</FormLabel><FormControl><Input placeholder="123 Rue du Projet, 75000 Paris" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                       <FormField control={form.control} name="clientPhone" render={({ field }) => (
                        <FormItem><FormLabel>Téléphone (Optionnel)</FormLabel><FormControl><Input placeholder="06 12 34 56 78" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </fieldset>

                    {/* Project Info */}
                    <fieldset className="space-y-4 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">Votre Projet</legend>
                      <FormField control={form.control} name="service" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type de prestation</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Sélectionnez un service..." /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services.map(s => <SelectItem key={s.slug} value={s.title}>{s.title}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />

                       <FormField control={form.control} name="projectName" render={({ field }) => (
                          <FormItem><FormLabel>Nom ou titre du projet</FormLabel><FormControl><Input placeholder="Ex: Rénovation de ma cuisine" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />

                      <FormField control={form.control} name="projectDescription" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description de votre projet</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Décrivez vos envies, les pièces concernées, les dimensions approximatives, le style souhaité..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      
                      <FormField control={form.control} name="estimatedBudget" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget estimé (Optionnel)</FormLabel>
                          <FormControl><Input placeholder="Ex: 20 000 €" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                    </fieldset>
                    
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande de devis'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
