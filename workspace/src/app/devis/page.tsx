
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
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumbs from '@/components/breadcrumbs';
import { useState } from 'react';
import { createQuoteRequest } from '@/lib/actions/quotes';
import { Bot, User } from 'lucide-react';

const formSchema = z.object({
  clientName: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  clientEmail: z.string().email("Veuillez saisir une adresse email valide."),
  clientPhone: z.string().optional(),
  projectDescription: z.string().min(20, "Veuillez décrire votre projet avec suffisamment de détails (au moins 20 caractères)."),
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
      projectDescription: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    toast({
      title: 'Envoi de votre demande...',
      description: 'Veuillez patienter pendant que nous enregistrons votre projet.',
    });
    try {
      await createQuoteRequest(values);
      toast({
        title: 'Demande de devis envoyée !',
        description:
          'Merci pour votre demande. Notre équipe va l\'étudier et reviendra vers vous très rapidement.',
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
      <main className="flex-grow">
        <div className="container py-16 md:py-24">
           <Breadcrumbs />
          <div className="mx-auto max-w-3xl mt-8">
            <Card>
              <CardHeader className="text-center">
                 <div className="mx-auto w-fit rounded-full bg-primary/10 p-3 text-primary mt-4">
                  <Bot className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-3xl md:text-4xl">Demande de Devis Simplifiée</CardTitle>
                <CardDescription className="text-lg">
                  Décrivez-nous simplement votre projet. Notre équipe d'experts l'étudiera et reviendra vers vous au plus vite.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Project Info */}
                    <fieldset className="space-y-4 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium flex items-center gap-2"><User className="h-4 w-4" /> Vos informations</legend>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField control={form.control} name="clientName" render={({ field }) => (
                          <FormItem><FormLabel>Nom complet</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="clientEmail" render={({ field }) => (
                          <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="votre@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                       <FormField control={form.control} name="clientPhone" render={({ field }) => (
                        <FormItem><FormLabel>Téléphone (Optionnel)</FormLabel><FormControl><Input placeholder="06 12 34 56 78" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </fieldset>

                    {/* Project Description */}
                    <fieldset className="space-y-4 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium flex items-center gap-2"><Bot className="h-4 w-4" /> Décrivez votre projet</legend>

                      <FormField control={form.control} name="projectDescription" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Votre projet en quelques mots</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Exemple : Je souhaite rénover la salle de bain de mon appartement de 50m² à Paris. J'aimerais une douche à l'italienne, un meuble double vasque et du carrelage effet marbre. J'ai aussi besoin de refaire l'électricité et la plomberie..."
                              className="min-h-[180px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </fieldset>
                    
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
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
