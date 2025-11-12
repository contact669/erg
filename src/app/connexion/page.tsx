'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { FirebaseError } from 'firebase/app';

const formSchema = z.object({
  email: z.string().email({ message: 'Veuillez saisir une adresse email valide.' }),
  password: z
    .string()
    .min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ConnexionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleAuthAction = async (action: 'signIn' | 'signUp', values: FormValues) => {
    if (!auth) {
      toast({
        variant: 'destructive',
        title: 'Erreur de configuration',
        description: "Le service d'authentification n'est pas disponible.",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      if (action === 'signIn') {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        toast({
          title: 'Connexion réussie',
          description: 'Vous êtes maintenant connecté.',
        });
      } else {
        await createUserWithEmailAndPassword(auth, values.email, values.password);
        toast({
          title: 'Inscription réussie',
          description: 'Votre compte a été créé. Vous êtes maintenant connecté.',
        });
      }
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      let title = 'Une erreur est survenue';
      let description = 'Veuillez réessayer.';

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
            title = 'Compte non trouvé';
            description = 'Aucun compte n\'est associé à cette adresse email. Veuillez créer un compte.';
            break;
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            title = 'Identifiants incorrects';
            description = 'L\'email ou le mot de passe est incorrect. Veuillez réessayer.';
            break;
          case 'auth/email-already-in-use':
            title = 'Email déjà utilisé';
            description = 'Cette adresse email est déjà associée à un compte. Essayez de vous connecter.';
            break;
          case 'auth/invalid-email':
            title = 'Email invalide';
            description = 'Veuillez vérifier votre adresse email.';
            break;
          case 'auth/weak-password':
            title = 'Mot de passe trop faible';
            description = 'Le mot de passe doit contenir au moins 6 caractères.';
            break;
          default:
            title = 'Erreur d\'authentification';
            description = error.message;
        }
      }
      
      toast({
        variant: 'destructive',
        title,
        description,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-grow flex items-center justify-center bg-secondary p-4 md:py-16 my-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl">Espace Professionnel</CardTitle>
            <CardDescription>
              Connectez-vous ou créez un compte pour gérer vos projets.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="votre@email.com"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="button"
                    onClick={form.handleSubmit((values) => handleAuthAction('signIn', values))}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Connexion...' : 'Se connecter'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={form.handleSubmit((values) => handleAuthAction('signUp', values))}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Création...' : 'Créer un compte'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
