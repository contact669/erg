"use client";

import { useUser, useCollection, useMemoFirebase } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { Bot } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import {
  collection,
  query,
  orderBy,
  where,
  runTransaction,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { useFirestore } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { generateQuote } from "@/ai/flows/generate-quote-flow";

const ADMIN_UID = "pHcnP0Mc32frrhPRzTT2nFwCxno1";

function toDateSafe(value: any): Date | null {
  if (value?.toDate && typeof value.toDate === "function") return value.toDate();
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

export default function DemandesPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  // ✅ admin client-side (évite de lancer des queries interdites)
  const isAdmin = useMemo(() => {
    return !!user && user.uid === ADMIN_UID;
  }, [user]);

  useEffect(() => {
    // Login requis
    if (!isUserLoading && !user) router.push("/connexion");
  }, [user, isUserLoading, router]);

  useEffect(() => {
    // ✅ si connecté mais pas admin => redirection (ou message)
    if (!isUserLoading && user && !isAdmin) {
      router.push("/dashboard"); // ou page "accès refusé"
    }
  }, [isUserLoading, user, isAdmin, router]);

  /**
   * ✅ Query admin UNIQUEMENT
   * Si pas admin => null => pas de list => pas d’erreur permissions
   */
  const requestsQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid || !isAdmin) return null;

    return query(
      collection(firestore, "quoteRequests"),
      where("status", "==", "Nouvelle Demande"),
      orderBy("createdAt", "desc")
    );
  }, [firestore, user?.uid, isAdmin]);

  const { data: requests, isLoading, error } = useCollection<any>(requestsQuery);

  useEffect(() => {
    if (!error) return;
    console.error("useCollection error:", error);
    toast({
      variant: "destructive",
      title: "Lecture impossible",
      description:
        "Accès refusé (règles Firestore) ou règles non publiées / mauvais projet Firebase.",
    });
  }, [error, toast]);

  const handleGenerateQuote = async (request: any) => {
    if (!firestore || !user?.uid || !isAdmin) return;

    setIsGenerating(request.id);
    toast({
      title: "🤖 Génération du devis...",
      description: "L’IA prépare un devis détaillé. Patientez quelques secondes.",
    });

    try {
      const aiQuote = await generateQuote({
        projectDescription: request.projectDescription,
        serviceType: "Inconnu - à définir depuis la description",
      });

      await runTransaction(firestore, async (transaction) => {
        const quoteDocRef = doc(collection(firestore, "quotes"));

        transaction.set(quoteDocRef, {
          ...aiQuote,
          clientName: request.clientName,
          clientEmail: request.clientEmail,
          clientPhone: request.clientPhone ?? null,
          projectDescription: request.projectDescription,
          service: "À catégoriser",
          status: "Brouillon",

          // ✅ pour l’admin / règles
          userId: user.uid,
          requestId: request.id,

          createdAt: serverTimestamp(),
        });

        const requestDocRef = doc(firestore, "quoteRequests", request.id);
        transaction.update(requestDocRef, {
          status: "Traité",
          processedAt: serverTimestamp(),
          processedBy: user.uid,
          quoteId: quoteDocRef.id,
        });
      });

      toast({
        title: "✅ Devis généré",
        description: "Le devis a été ajouté. Vous pouvez maintenant le consulter/modifier.",
      });

      router.push("/dashboard/devis");
    } catch (e) {
      console.error("Error generating quote:", e);
      toast({
        variant: "destructive",
        title: "❌ Erreur",
        description: "Impossible de générer le devis. Réessayez.",
      });
    } finally {
      setIsGenerating(null);
    }
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>
    );
  }

  // ✅ si connecté mais pas admin (au cas où, avant redirection)
  if (!isAdmin) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Accès refusé</h1>
        <p className="text-muted-foreground">
          Cette page est réservée à l’administrateur.
        </p>
        <Button onClick={() => router.push("/dashboard")}>Retour</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Demandes de devis</h1>
        <p className="text-muted-foreground">
          Toutes les demandes reçues via le site (statut : Nouvelle Demande).
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Demandes en attente</CardTitle>
          <CardDescription>
            Générez un devis à partir d’une demande client.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Projet</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="hidden sm:table-cell">Statut</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Chargement…
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && (!requests || requests.length === 0) && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Aucune nouvelle demande.
                  </TableCell>
                </TableRow>
              )}

              {!isLoading &&
                requests?.map((item: any) => {
                  const d = toDateSafe(item.createdAt);

                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="font-medium">{item.clientName}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.clientEmail}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="line-clamp-2 font-medium">
                          {item.projectDescription}
                        </div>
                      </TableCell>

                      <TableCell className="hidden sm:table-cell">
                        {d
                          ? format(d, "d MMMM yyyy 'à' HH:mm", { locale: fr })
                          : "-"}
                      </TableCell>

                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="destructive">{item.status}</Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          onClick={() => handleGenerateQuote(item)}
                          disabled={isGenerating === item.id}
                        >
                          {isGenerating === item.id ? (
                            "Génération…"
                          ) : (
                            <>
                              <Bot className="mr-2 h-4 w-4" />
                              Générer
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>

          <p className="mt-4 text-xs text-muted-foreground">
            Si Firestore demande un index (where status + orderBy createdAt), créez-le via le lien fourni dans la console.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
