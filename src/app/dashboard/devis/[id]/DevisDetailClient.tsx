"use client";

import { useEffect, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { doc } from "firebase/firestore";

import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

function getStatusBadgeVariant(status?: string) {
  switch (status) {
    case "Accepté":
      return "default";
    case "Facturé":
      return "secondary";
    case "Envoyé":
      return "outline";
    case "Brouillon":
      return "destructive";
    case "Refusé":
      return "destructive";
    default:
      return "outline";
  }
}

export default function DevisDetailClient() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams(); // ✅ ok ici car on est dans un Client Component, et page.tsx est en Suspense

  const id = params?.id;

  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  useEffect(() => {
    if (!isUserLoading && !user) router.push("/connexion");
  }, [user, isUserLoading, router]);

  const ref = useMemoFirebase(() => {
    if (!firestore || !id || !user?.uid) return null;
    return doc(firestore, "quotes", id);
  }, [firestore, id, user?.uid]);

  const { data: quote, isLoading, error } = useDoc<any>(ref);

  const mode = useMemo(() => searchParams?.get("mode") ?? "view", [searchParams]);

  if (isUserLoading || !user || isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>
    );
  }

  if (!quote || error) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/devis")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Retour
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Devis introuvable</CardTitle>
            <CardDescription>
              Le document n’existe pas (ou accès refusé).
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/devis")}
          className="gap-2 w-fit"
        >
          <ArrowLeft className="h-4 w-4" /> Retour aux devis
        </Button>

        <div className="flex items-center gap-2">
          <Badge variant={getStatusBadgeVariant(quote.status)}>
            {quote.status ?? "—"}
          </Badge>

          <Button
            variant="outline"
            onClick={() => router.push(`/dashboard/devis/${id}?mode=edit`)}
          >
            Passer en édition
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-3">
            <span>Devis #{id}</span>
            <span className="text-sm text-muted-foreground">
              {mode === "edit" ? "Mode édition" : "Lecture"}
            </span>
          </CardTitle>
          <CardDescription>
            Détails du devis (lecture/édition).
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Client</p>
            <p className="font-medium">{quote.clientName ?? "—"}</p>
            <p className="text-sm text-muted-foreground">{quote.clientEmail ?? "—"}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Projet</p>
            <p className="whitespace-pre-wrap">{quote.projectDescription ?? "—"}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Montant</p>
            <p className="font-medium">
              {quote.total
                ? new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(
                    quote.total
                  )
                : "À définir"}
            </p>
          </div>

          {/* ✅ Tu pourras compléter ici : items, main d’oeuvre, TVA, etc. */}
          {Array.isArray(quote.items) && quote.items.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Lignes</p>
              <div className="rounded-lg border">
                <div className="divide-y">
                  {quote.items.map((it: any, idx: number) => (
                    <div key={idx} className="flex items-start justify-between gap-4 p-3">
                      <div className="min-w-0">
                        <p className="font-medium">{it.label ?? it.title ?? `Ligne ${idx + 1}`}</p>
                        {it.description && (
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {it.description}
                          </p>
                        )}
                      </div>
                      <div className="shrink-0 text-right text-sm">
                        {typeof it.total === "number"
                          ? new Intl.NumberFormat("fr-FR", {
                              style: "currency",
                              currency: "EUR",
                            }).format(it.total)
                          : "—"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {mode === "edit" && (
            <div className="rounded-lg border p-4">
              <p className="font-medium">Zone édition (à brancher)</p>
              <p className="text-sm text-muted-foreground">
                Ici tu brancheras ton formulaire d’édition + updateDoc().
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
