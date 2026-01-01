
'use client';

import { useUser, useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Bot, ArrowRight } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { collection, query, orderBy, where, runTransaction, doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { generateQuote, type GenerateQuoteOutput } from '@/ai/flows/generate-quote-flow';

export default function DemandesPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/connexion');
    }
  }, [user, isUserLoading, router]);

  const requestsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    // For now, we fetch all new requests as we have a placeholder user id
    return query(
      collection(firestore, 'quoteRequests'),
      where('status', '==', 'Nouvelle Demande'),
      orderBy('createdAt', 'desc')
    );
  }, [firestore]);

  const { data: requests, isLoading } = useCollection<any>(requestsQuery);

  const handleGenerateQuote = async (request: any) => {
    if (!firestore || !user?.uid) return;
    setIsGenerating(request.id);
    toast({
      title: "🤖 Génération du devis par l'IA...",
      description: "Notre assistant intelligent analyse la demande et prépare un devis détaillé. Veuillez patienter.",
    });

    try {
      // 1. Generate the quote using AI
      const aiQuote = await generateQuote({
        projectDescription: request.projectDescription,
        serviceType: 'Inconnu - à définir depuis la description'
      });

      // 2. Run a transaction to create the quote and update the request status
      await runTransaction(firestore, async (transaction) => {
        // Create the new quote document
        const quoteDocRef = doc(collection(firestore, 'quotes'));
        transaction.set(quoteDocRef, {
          ...aiQuote,
          clientName: request.clientName,
          clientEmail: request.clientEmail,
          projectDescription: request.projectDescription,
          service: 'À catégoriser',
          status: 'Brouillon', // New quotes start as drafts
          userId: user.uid,
          createdAt: new Date(), // Use current date for the quote
          requestId: request.id,
        });

        // Update the original request status
        const requestDocRef = doc(firestore, 'quoteRequests', request.id);
        transaction.update(requestDocRef, { status: 'Traité' });
      });

      toast({
        title: "✅ Devis généré avec succès !",
        description: "Le devis a été ajouté à votre liste. Vous pouvez maintenant le consulter et le modifier.",
      });
      router.push('/dashboard/devis');

    } catch (error) {
      console.error("Error generating quote:", error);
      toast({
        variant: 'destructive',
        title: "❌ Erreur de génération",
        description: "L'IA n'a pas pu générer le devis. Veuillez réessayer.",
      });
    } finally {
      setIsGenerating(null);
    }
  };


  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-border border-t-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Demandes de Devis</h1>
          <p className="text-muted-foreground">
            Voici les nouvelles demandes de devis provenant de votre site.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Demandes en attente</CardTitle>
          <CardDescription>
            Générez un devis à partir d'une demande client.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Projet</TableHead>
                <TableHead className="hidden sm:table-cell">Date de la demande</TableHead>
                <TableHead className="hidden sm:table-cell">Statut</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Chargement des nouvelles demandes...
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && requests && requests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Aucune nouvelle demande de devis.
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && requests && requests.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-medium">{item.clientName}</div>
                    <div className="text-sm text-muted-foreground">{item.clientEmail}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium line-clamp-2">{item.projectDescription}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {item.createdAt ? format(item.createdAt.toDate(), "d MMMM yyyy 'à' HH:mm", { locale: fr }) : '-'}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={"destructive"}>{item.status}</Badge>
                  </TableCell>
                  <TableCell>
                     <Button 
                      onClick={() => handleGenerateQuote(item)} 
                      disabled={isGenerating === item.id}
                      size="sm"
                    >
                       {isGenerating === item.id ? 'Génération...' : (
                        <>
                          <Bot className="mr-2 h-4 w-4" />
                          Générer le devis
                        </>
                       )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
