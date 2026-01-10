"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";

import { doc } from "firebase/firestore";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowLeft, Bot, Wand2 } from "lucide-react";

const ADMIN_UID = "pHcnP0Mc32frrhPRzTT2nFwCxno1";

function statusBadgeVariant(status: string) {
  if (status === "Nouvelle Demande") return "destructive";
  if (status === "Traité") return "outline";
  if (status === "Supprimée") return "secondary";
  return "secondary";
}

export default function DemandeDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const isAdmin = useMemo(() => !!user && user.uid === ADMIN_UID, [user]);

  useEffect(() => {
    if (isUserLoading) return;
    if (!user) router.push("/connexion");
    else if (!isAdmin) router.push("/dashboard");
  }, [user, isUserLoading, isAdmin, router]);

  const requestRef = useMemoFirebase(() => {
    if (!firestore || !id || !isAdmin) return null;
    return doc(firestore, "quoteRequests", id);
  }, [firestore, id, isAdmin]);

  const { data: request, isLoading, error } = useDoc<any>(requestRef);

  useEffect(() => {
    if (!error) return;
    console.error("Demande detail error:", error);
    toast({
      variant: "destructive",
      title: "Impossible de charger la demande",
      description: (error as any)?.message ?? String(error),
    });
  }, [error, toast]);

  if (isUserLoading || !user || !isAdmin || isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>
    );
  }

  if (!request) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => router.push("/dashboard/demandes")} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Retour
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Demande introuvable</CardTitle>
            <CardDescription>Le document n’existe pas (ou accès refusé).</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.push("/dashboard/demandes")} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Retour aux demandes
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <span>Demande #{id}</span>
            <Badge variant={statusBadgeVariant(request.status)}>{request.status}</Badge>
          </CardTitle>
          <CardDescription>Détails de la demande (lecture admin).</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Client</p>
            <p className="font-medium">{request.clientName ?? "—"}</p>
            <p className="text-sm text-muted-foreground">{request.clientEmail ?? "—"}</p>
            {request.clientPhone && <p className="text-sm text-muted-foreground">{request.clientPhone}</p>}
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Description</p>
            <p className="whitespace-pre-wrap">{request.projectDescription ?? "—"}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" className="gap-2" onClick={() => router.push(`/dashboard/devis?fromRequest=${id}`)}>
              <Bot className="h-4 w-4" />
              Convertir en brouillon
            </Button>
            <Button className="gap-2" onClick={() => router.push(`/dashboard/devis?fromRequestAI=${id}`)}>
              <Wand2 className="h-4 w-4" />
              Convertir via IA
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
