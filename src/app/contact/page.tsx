
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';
import AnimatedSection from '@/components/animated-section';
import Breadcrumbs from '@/components/breadcrumbs';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Le nom doit contenir au moins 2 caractères.',
  }),
  email: z.string().email({
    message: 'Veuillez saisir une adresse email valide.',
  }),
  phone: z.string().optional(),
  subject: z.string().min(5, {
    message: 'Le sujet doit contenir au moins 5 caractères.',
  }),
  message: z.string().min(10, {
    message: 'Le message doit contenir au moins 10 caractères.',
  }),
});

export default function ContactPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // NOTE: This is a mock submission. In a real app, you would send this data to a server.
    console.log(values);
    toast({
      title: 'Message envoyé !',
      description:
        'Merci pour votre message. Nous vous répondrons dans les plus brefs délais.',
    });
    form.reset();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <Breadcrumbs />
      <main className="flex-grow">
        <section className="bg-secondary py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-headline text-4xl font-bold md:text-5xl">
                Contactez-Nous
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Une question ? Une demande de devis ? Un projet à nous confier
                ? Nous sommes à votre écoute pour discuter de vos envies et vous
                accompagner.
              </p>
            </div>
          </div>
        </section>

        <AnimatedSection>
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
                {/* Contact Info */}
                <div className="space-y-8">
                  <div>
                    <h2 className="font-headline text-2xl font-bold">
                      Nos Coordonnées
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Contactez-nous directement ou via le formulaire.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Téléphone</h3>
                        <p className="text-muted-foreground">
                          Appelez-nous pour une réponse immédiate.
                        </p>
                        <a
                          href="tel:+33699961375"
                          className="font-medium text-accent hover:underline"
                        >
                          06 99 96 13 75
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-muted-foreground">
                          Envoyez-nous un email, nous vous répondrons sous 24h.
                        </p>
                        <a
                          href="mailto:contact@erg-renovation.fr"
                          className="font-medium text-accent hover:underline"
                        >
                          contact@erg-renovation.fr
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Adresse</h3>
                        <p className="text-muted-foreground">
                          1 Sente de la Pointe, 75020 Paris
                        </p>
                        <p className="font-medium">
                          Intervention sur toute l&apos;Île-de-France
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Google Maps embed */}
                   <div className='mt-8'>
                     <Card>
                        <CardContent className="p-2">
                           <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-md">
                             <iframe
                               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.790322238495!2d2.404283876878344!3d48.86240409971911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66d86a42e7c4b%3A0x82b5774a3382d625!2s1%20Sente%20de%20la%20Pointe%2C%2075020%20Paris%2C%20France!5e0!3m2!1sen!2sus!4v1726056586053!5m2!1sen!2sus"
                               width="100%"
                               height="300"
                               style={{ border: 0 }}
                               allowFullScreen
                               loading="lazy"
                               referrerPolicy="no-referrer-when-downgrade"
                             ></iframe>
                           </div>
                         </CardContent>
                      </Card>
                    </div>
                </div>

                {/* Contact Form */}
                <Card className="p-6 lg:p-8">
                    <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom complet</FormLabel>
                                <FormControl>
                                <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                <Input
                                    placeholder="john.doe@example.com"
                                    {...field}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </div>
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Téléphone (Optionnel)</FormLabel>
                                <FormControl>
                                <Input placeholder="06 12 34 56 78" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sujet</FormLabel>
                                <FormControl>
                                <Input
                                    placeholder="Demande de devis pour une cuisine"
                                    {...field}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Votre message</FormLabel>
                                <FormControl>
                                <Textarea
                                    placeholder="Décrivez votre projet en quelques mots..."
                                    className="min-h-[120px]"
                                    {...field}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" size="lg" className="w-full">
                           Envoyer le message
                        </Button>
                    </form>
                    </Form>
                </Card>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>
      <SiteFooter />
    </div>
  );
}
