"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

import { useUser, useFirestore, useMemoFirebase } from "@/firebase";
import { useToast } from "@/hooks/use-toast";

import { generateQuote } from "@/ai/flows/generate-quote-flow";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import {
  MoreHorizontal,
  Eye,
  Trash2,
  Bot,
  ArrowRight,
  RefreshCw,
  Wand2,
  X,
} from "lucide-react";

import { format } from "date-fns";
import { fr } from "date-fns/locale";

const ADMIN_UID = "pHcnP0Mc32frrhPRzTT2nFwCxno1";

// Statuts “métier”
type RequestStatus = "Nouvelle Demande" | "Traité" | "Supprimée";
type StatusFilter = "all" | RequestStatus;

function toDateSafe(value: any): Date | null {
  if (value?.toDate && typeof value.toDate === "function") return value.toDate();
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

function formatDate(value: any) {
  const d = toDateSafe(value);
  if (!d) return "—";
  return format(d, "d MMM yyyy à HH:mm", { locale: fr });
}

function normalize(s: any) {
  return String(s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function statusBadgeVariant(status: RequestStatus | string) {
  if (status === "Nouvelle Demande") return "destructive";
  if (status === "Traité") return "outline";
  if (status === "Supprimée") return "secondary";
  return "secondary";
}

function safeCurrency(value: any) {
  const n = typeof value === "number" ? value : Number(value);
  if (!isFinite(n)) return null;
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
}

export default function DemandesPage() {
  const router = useRouter();
  const { toast } = useToast();

  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const isAdmin = useMemo(() => !!user && user.uid === ADMIN_UID, [user]);

  // UI states
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Nouvelle Demande");
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null); // action en cours sur 1 ligne
  const [bulkBusy, setBulkBusy] = useState(false);
  const [confirm, setConfirm] = useState<{
    type: "deleteOne" | "deleteBulk";
    ids: string[];
  } | null>(null);

  // Data states
  const [allRequests, setAllRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [snapError, setSnapError] = useState<any>(null);

  // Selected rows
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  // 🔐 Redirects
  useEffect(() => {
    if (isUserLoading) return;
    if (!user) router.push("/connexion");
    else if (!isAdmin) router.push("/dashboard");
  }, [user, isUserLoading, isAdmin, router]);

  // Query: on charge TOUT (admin only) => filtres + compteurs côté UI
  const baseQuery = useMemoFirebase(() => {
    if (!firestore || !isAdmin) return null;
    return query(collection(firestore, "quoteRequests"), orderBy("createdAt", "desc"));
  }, [firestore, isAdmin]);

  // onSnapshot (car ton hook useCollection wrappe trop “permission error” et masquait l’index / failed-precondition)
  useEffect(() => {
    if (!baseQuery) return;

    setLoading(true);
    setSnapError(null);

    const unsub = onSnapshot(
      baseQuery,
      (snap) => {
        const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setAllRequests(rows);
        setLoading(false);
      },
      (err) => {
        console.error("DemandesPage onSnapshot error:", err);
        setSnapError(err);
        setAllRequests([]);
        setLoading(false);

        const code = (err as any)?.code;
        const msg = (err as any)?.message ?? String(err);

        if (code === "failed-precondition" && msg.includes("requires an index")) {
          toast({
            variant: "destructive",
            title: "Index Firestore requis",
            description:
              "Votre requête nécessite un index. Ouvrez le lien fourni par Firebase dans la console pour le créer.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Impossible de charger les demandes",
            description: msg,
          });
        }
      }
    );

    return () => unsub();
  }, [baseQuery, toast]);

  // Compteurs (sur toutes les demandes)
  const counters = useMemo(() => {
    let n: Record<RequestStatus, number> = {
      "Nouvelle Demande": 0,
      "Traité": 0,
      "Supprimée": 0,
    };
    for (const r of allRequests) {
      const s = r.status as RequestStatus;
      if (s in n) n[s] += 1;
    }
    return n;
  }, [allRequests]);

  // Filtrage + recherche (côté client)
  const filteredRequests = useMemo(() => {
    const q = normalize(search.trim());
    return allRequests.filter((r) => {
      const s = (r.status ?? "") as RequestStatus;
      if (statusFilter !== "all" && s !== statusFilter) return false;

      if (!q) return true;

      const hay = normalize(
        [
          r.clientName,
          r.clientEmail,
          r.clientPhone,
          r.projectDescription,
          r.status,
        ].join(" ")
      );

      return hay.includes(q);
    });
  }, [allRequests, statusFilter, search]);

  // Sélection: ids visibles
  const visibleIds = useMemo(() => filteredRequests.map((r) => r.id), [filteredRequests]);

  const selectedIds = useMemo(() => {
    return Object.entries(selected)
      .filter(([_, v]) => v)
      .map(([k]) => k);
  }, [selected]);

  const selectedVisibleIds = useMemo(() => {
    const setVisible = new Set(visibleIds);
    return selectedIds.filter((id) => setVisible.has(id));
  }, [selectedIds, visibleIds]);

  const allVisibleSelected = useMemo(() => {
    if (visibleIds.length === 0) return false;
    return visibleIds.every((id) => selected[id]);
  }, [visibleIds, selected]);

  const toggleSelectAllVisible = (checked: boolean) => {
    setSelected((prev) => {
      const next = { ...prev };
      for (const id of visibleIds) next[id] = checked;
      return next;
    });
  };

  const clearSelection = () => setSelected({});

  // ✅ LOG helper: quoteRequests/{id}/history/{logId}
  const writeHistory = async (
    tx: any,
    requestId: string,
    action: string,
    meta: Record<string, any> = {}
  ) => {
    const hRef = doc(collection(firestore!, "quoteRequests", requestId, "history"));
    tx.set(hRef, {
      action,
      meta,
      actorUid: user!.uid,
      actorEmail: user!.email ?? null,
      createdAt: serverTimestamp(),
    });
  };

  // 🧹 Soft delete (unitaire)
  const softDeleteOne = async (requestId: string) => {
    if (!firestore || !isAdmin || !user?.uid) return;
    setBusyId(requestId);

    try {
      await runTransaction(firestore, async (tx) => {
        const ref = doc(firestore, "quoteRequests", requestId);
        tx.update(ref, {
          status: "Supprimée",
          deletedAt: serverTimestamp(),
          deletedBy: user.uid,
          updatedAt: serverTimestamp(),
        });

        await writeHistory(tx, requestId, "request.soft_delete", {});
      });

      toast({ title: "🗑️ Demande supprimée", description: "Soft delete effectué." });
    } catch (e: any) {
      console.error("softDeleteOne error:", e);
      toast({
        variant: "destructive",
        title: "Suppression impossible",
        description: e?.message ?? "Erreur inconnue",
      });
    } finally {
      setBusyId(null);
    }
  };

  // 🧹 Soft delete (bulk)
  const softDeleteBulk = async (ids: string[]) => {
    if (!firestore || !isAdmin || !user?.uid) return;
    setBulkBusy(true);

    let ok = 0;
    let ko = 0;

    for (const id of ids) {
      try {
        await runTransaction(firestore, async (tx) => {
          const ref = doc(firestore, "quoteRequests", id);
          tx.update(ref, {
            status: "Supprimée",
            deletedAt: serverTimestamp(),
            deletedBy: user.uid,
            updatedAt: serverTimestamp(),
          });
          await writeHistory(tx, id, "request.soft_delete", { bulk: true });
        });
        ok += 1;
      } catch (e) {
        console.error("softDeleteBulk item error:", id, e);
        ko += 1;
      }
    }

    toast({
      title: "Suppression groupée terminée",
      description: `${ok} ok • ${ko} erreur(s)`,
    });

    setBulkBusy(false);
    clearSelection();
  };

  // 🔁 Convert -> devis brouillon (sans IA)
  const convertToQuote = async (requestItem: any) => {
    if (!firestore || !isAdmin || !user?.uid) return;

    setBusyId(requestItem.id);
    try {
      const quoteId = await runTransaction(firestore, async (tx) => {
        const quoteRef = doc(collection(firestore, "quotes"));
        const requestRef = doc(firestore, "quoteRequests", requestItem.id);

        tx.set(quoteRef, {
          title: `Devis – ${requestItem.clientName ?? "Client"}`,
          status: "Brouillon",
          userId: user.uid,
          requestId: requestItem.id,

          clientName: requestItem.clientName ?? null,
          clientEmail: requestItem.clientEmail ?? null,
          clientPhone: requestItem.clientPhone ?? null,
          projectDescription: requestItem.projectDescription ?? null,

          // champs “devis”
          items: [],
          subtotal: null,
          total: null,

          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        tx.update(requestRef, {
          status: "Traité",
          processedAt: serverTimestamp(),
          processedBy: user.uid,
          quoteId: quoteRef.id,
          updatedAt: serverTimestamp(),
        });

        await writeHistory(tx, requestItem.id, "request.convert_to_quote", {
          quoteId: quoteRef.id,
          mode: "manual",
        });

        return quoteRef.id;
      });

      toast({ title: "✅ Devis créé", description: "Conversion effectuée (brouillon)." });
      router.push(`/dashboard/devis?open=${encodeURIComponent(quoteId)}`);
    } catch (e: any) {
      console.error("convertToQuote error:", e);
      toast({
        variant: "destructive",
        title: "Conversion impossible",
        description: e?.message ?? "Erreur inconnue",
      });
    } finally {
      setBusyId(null);
    }
  };

  // ✨ Convert via IA (remplit items + total si dispo)
  const convertToQuoteWithAI = async (requestItem: any) => {
    if (!firestore || !isAdmin || !user?.uid) return;

    setBusyId(requestItem.id);

    try {
      toast({
        title: "🤖 Génération IA en cours…",
        description: "On prépare un devis pré-rempli (items + total).",
      });

      const ai = await generateQuote({
        projectDescription: requestItem.projectDescription ?? "",
        serviceType: requestItem.serviceType ?? "Rénovation (à préciser)",
      });

      const quoteId = await runTransaction(firestore, async (tx) => {
        const quoteRef = doc(collection(firestore, "quotes"));
        const requestRef = doc(firestore, "quoteRequests", requestItem.id);

        // On “normalise” le résultat IA (sans casser si ai.* n’existe pas)
        const aiItems = (ai as any)?.items ?? (ai as any)?.lines ?? [];
        const aiTotal = (ai as any)?.total ?? (ai as any)?.grandTotal ?? null;
        const aiTitle = (ai as any)?.title ?? `Devis – ${requestItem.clientName ?? "Client"}`;

        tx.set(quoteRef, {
          title: aiTitle,
          status: "Brouillon",
          userId: user.uid,
          requestId: requestItem.id,

          clientName: requestItem.clientName ?? null,
          clientEmail: requestItem.clientEmail ?? null,
          clientPhone: requestItem.clientPhone ?? null,
          projectDescription: requestItem.projectDescription ?? null,

          // IA
          items: Array.isArray(aiItems) ? aiItems : [],
          total: aiTotal ?? null,

          // optionnel : tu peux stocker un “raw” IA
          aiRaw: ai ?? null,

          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        tx.update(requestRef, {
          status: "Traité",
          processedAt: serverTimestamp(),
          processedBy: user.uid,
          quoteId: quoteRef.id,
          updatedAt: serverTimestamp(),
        });

        await writeHistory(tx, requestItem.id, "request.convert_to_quote", {
          quoteId: quoteRef.id,
          mode: "ai",
          aiTotal: aiTotal ?? null,
          aiItemsCount: Array.isArray(aiItems) ? aiItems.length : 0,
        });

        return quoteRef.id;
      });

      toast({ title: "✅ Devis IA créé", description: "Devis pré-rempli disponible." });
      router.push(`/dashboard/devis?open=${encodeURIComponent(quoteId)}`);
    } catch (e: any) {
      console.error("convertToQuoteWithAI error:", e);
      toast({
        variant: "destructive",
        title: "IA : échec",
        description: e?.message ?? "Impossible de générer le devis IA.",
      });
    } finally {
      setBusyId(null);
    }
  };

  // Bulk convert (sans IA)
  const bulkConvert = async (ids: string[]) => {
    setBulkBusy(true);
    let ok = 0;
    let ko = 0;

    for (const id of ids) {
      const item = allRequests.find((r) => r.id === id);
      if (!item) continue;

      try {
        await convertToQuote(item);
        ok += 1;
      } catch {
        ko += 1;
      }
    }

    toast({ title: "Conversion groupée terminée", description: `${ok} ok • ${ko} erreur(s)` });
    setBulkBusy(false);
    clearSelection();
  };

  // Bulk convert (IA)
  const bulkConvertAI = async (ids: string[]) => {
    setBulkBusy(true);
    let ok = 0;
    let ko = 0;

    for (const id of ids) {
      const item = allRequests.find((r) => r.id === id);
      if (!item) continue;

      try {
        await convertToQuoteWithAI(item);
        ok += 1;
      } catch {
        ko += 1;
      }
    }

    toast({ title: "Conversion IA groupée terminée", description: `${ok} ok • ${ko} erreur(s)` });
    setBulkBusy(false);
    clearSelection();
  };

  // Loading guard
  if (isUserLoading || !user || !isAdmin) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>
    );
  }

  const bulkCount = selectedVisibleIds.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Demandes</h1>
          <p className="text-muted-foreground">
            Filtre, recherche, actions groupées et conversion IA.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.refresh()} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Rafraîchir
          </Button>
          <Button onClick={() => router.push("/dashboard/devis")} className="gap-2">
            Aller aux devis <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters + Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between gap-2">
            <span>Organisation</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="h-8">
                {loading ? "…" : `${filteredRequests.length} résultat(s)`}
              </Badge>
              <Badge variant="outline" className="h-8">
                Nouvelles: {counters["Nouvelle Demande"]} • Traitées: {counters["Traité"]} • Supprimées:{" "}
                {counters["Supprimée"]}
              </Badge>
            </div>
          </CardTitle>
          <CardDescription>Filtre par statut + recherche multi-champs.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
            <TabsList className="flex w-full flex-wrap justify-start gap-2">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="Nouvelle Demande">Nouvelles</TabsTrigger>
              <TabsTrigger value="Traité">Traitées</TabsTrigger>
              <TabsTrigger value="Supprimée">Supprimées</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <div className="flex-1">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher : nom, email, téléphone, description…"
              />
            </div>

            {search && (
              <Button variant="ghost" className="gap-2" onClick={() => setSearch("")}>
                <X className="h-4 w-4" />
                Effacer
              </Button>
            )}
          </div>

          {/* Bulk actions bar */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between rounded-lg border p-3">
            <div className="text-sm text-muted-foreground">
              {bulkCount > 0 ? (
                <>
                  <b>{bulkCount}</b> sélection(s) (sur la liste filtrée)
                </>
              ) : (
                <>Sélectionne une ou plusieurs demandes pour actions groupées.</>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                onClick={() => toggleSelectAllVisible(!allVisibleSelected)}
                disabled={loading || visibleIds.length === 0}
              >
                {allVisibleSelected ? "Désélectionner tout" : "Sélectionner tout"}
              </Button>

              <Button
                variant="ghost"
                onClick={clearSelection}
                disabled={Object.keys(selected).length === 0}
              >
                Vider sélection
              </Button>

              <Button
                variant="secondary"
                className="gap-2"
                disabled={bulkBusy || bulkCount === 0}
                onClick={() => bulkConvert(selectedVisibleIds)}
              >
                <Bot className="h-4 w-4" />
                Convertir (brouillon)
              </Button>

              <Button
                className="gap-2"
                disabled={bulkBusy || bulkCount === 0}
                onClick={() => bulkConvertAI(selectedVisibleIds)}
              >
                <Wand2 className="h-4 w-4" />
                Convertir via IA
              </Button>

              <Button
                variant="destructive"
                className="gap-2"
                disabled={bulkBusy || bulkCount === 0}
                onClick={() => setConfirm({ type: "deleteBulk", ids: selectedVisibleIds })}
              >
                <Trash2 className="h-4 w-4" />
                Supprimer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste</CardTitle>
          <CardDescription>Actions ligne + menu (voir / convertir / IA / supprimer).</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[44px]">
                  <span className="sr-only">Select</span>
                </TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Projet</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">Statut</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Chargement…
                  </TableCell>
                </TableRow>
              )}

              {!loading && filteredRequests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Aucun résultat.
                  </TableCell>
                </TableRow>
              )}

              {!loading &&
                filteredRequests.map((item) => {
                  const busy = busyId === item.id;
                  const status = (item.status ?? "Nouvelle Demande") as RequestStatus;

                  return (
                    <TableRow key={item.id}>
                      <TableCell className="align-top">
                        <Checkbox
                          checked={!!selected[item.id]}
                          onCheckedChange={(v) =>
                            setSelected((prev) => ({ ...prev, [item.id]: !!v }))
                          }
                          aria-label="Sélectionner"
                        />
                      </TableCell>

                      <TableCell className="align-top">
                        <div className="font-medium">{item.clientName ?? "—"}</div>
                        <div className="text-sm text-muted-foreground">{item.clientEmail ?? "—"}</div>
                        {item.clientPhone && (
                          <div className="text-sm text-muted-foreground">{item.clientPhone}</div>
                        )}
                      </TableCell>

                      <TableCell className="align-top">
                        <div className="line-clamp-3 text-sm">{item.projectDescription ?? "—"}</div>
                        {item.quoteId && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            Devis lié : <span className="font-mono">{item.quoteId}</span>
                            {" • "}
                            <span className="text-foreground">
                              {safeCurrency(item.total) ?? ""}
                            </span>
                          </div>
                        )}
                      </TableCell>

                      <TableCell className="hidden md:table-cell align-top">
                        {formatDate(item.createdAt)}
                      </TableCell>

                      <TableCell className="hidden md:table-cell align-top">
                        <Badge variant={statusBadgeVariant(status)}>{status}</Badge>
                      </TableCell>

                      <TableCell className="text-right align-top">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost" disabled={busy || bulkBusy}>
                              {busy ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-primary" />
                              ) : (
                                <MoreHorizontal className="h-4 w-4" />
                              )}
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end" className="w-60">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuItem
                              className="gap-2"
                              onClick={() => router.push(`/dashboard/demandes/${item.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                              Visualiser
                            </DropdownMenuItem>

                            <DropdownMenuItem className="gap-2" onClick={() => convertToQuote(item)}>
                              <Bot className="h-4 w-4" />
                              Convertir (brouillon)
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              className="gap-2"
                              onClick={() => convertToQuoteWithAI(item)}
                            >
                              <Wand2 className="h-4 w-4" />
                              Convertir via IA
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              className="gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
                              onClick={() => setConfirm({ type: "deleteOne", ids: [item.id] })}
                            >
                              <Trash2 className="h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>

          {snapError && (
            <p className="mt-4 text-xs text-destructive">
              Erreur Firestore : {(snapError as any)?.message ?? String(snapError)}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Confirm dialogs */}
      <AlertDialog
        open={!!confirm}
        onOpenChange={(open) => {
          if (!open) setConfirm(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirm?.type === "deleteBulk" ? "Supprimer les demandes sélectionnées ?" : "Supprimer cette demande ?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Suppression en <b>soft delete</b> : status = <b>Supprimée</b> + log d’action.
              La demande ne sera plus visible dans “Nouvelles”, mais restera en base.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={async () => {
                if (!confirm) return;

                if (confirm.type === "deleteOne") {
                  await softDeleteOne(confirm.ids[0]);
                } else {
                  await softDeleteBulk(confirm.ids);
                }
                setConfirm(null);
              }}
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
