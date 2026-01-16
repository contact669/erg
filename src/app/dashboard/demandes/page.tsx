'use client';

import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import {
  collection,
  query,
  orderBy,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

import { MoreHorizontal, ArrowUpDown, CheckCircle2, Archive, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const ADMIN_UID = 'pHcnP0Mc32frrhPRzTT2nFwCxno1';

type QuoteRequest = {
  id: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string | null;
  projectDescription?: string;
  status?: string;
  createdAt?: any;
};

function getStatusBadgeVariant(status?: string) {
  switch (status) {
    case 'Nouvelle Demande':
      return 'destructive';
    case 'Traité':
      return 'default';
    case 'Supprimée':
      return 'secondary';
    default:
      return 'outline';
  }
}

function toDateSafe(value: any): Date | null {
  if (value?.toDate && typeof value.toDate === 'function') return value.toDate();
  if (value instanceof Date) return value;
  if (typeof value === 'string' || typeof value === 'number') {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

function truncate(s?: string, n = 120) {
  const str = (s ?? '').trim();
  if (!str) return '';
  return str.length > n ? str.slice(0, n - 1) + '…' : str;
}

export default function DemandesPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  // ✅ éviter mismatch sur "il y a ..."
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isAdmin = useMemo(() => user?.uid === ADMIN_UID, [user?.uid]);

  useEffect(() => {
    if (!isUserLoading && !user) router.push('/connexion');
  }, [user, isUserLoading, router]);

  const requestsQuery = useMemoFirebase(
    () =>
      firestore && isAdmin
        ? query(collection(firestore, 'quoteRequests'), orderBy('createdAt', 'desc'))
        : null,
    [firestore, isAdmin]
  );

  const { data: requests, isLoading } = useCollection<QuoteRequest>(requestsQuery);

  const setStatus = useCallback(
    async (id: string, status: 'Traité' | 'Supprimée') => {
      if (!firestore) return;

      const ref = doc(firestore, 'quoteRequests', id);
      await updateDoc(ref, {
        status,
        updatedAt: serverTimestamp(),
      });
    },
    [firestore]
  );

  // UI Loading stable
  if (isUserLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-border border-t-primary animate-spin" />
      </div>
    );
  }

  // Redirect via effect, mais on garde un rendu stable
  if (!user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-border border-t-primary animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Accès restreint</CardTitle>
          <CardDescription>Vous n’avez pas l’autorisation d’accéder à cette page.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            Retour au dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  const list = requests ?? [];

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Demandes de devis</h1>
          <p className="text-muted-foreground">
            Centralisez les demandes reçues depuis le site et suivez leur traitement.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline">{list.length} demande{list.length > 1 ? 's' : ''}</Badge>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle>Dernières demandes</CardTitle>
          <CardDescription>Tri par date décroissante. Cliquez sur une ligne pour ouvrir le détail.</CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    className="p-0 hover:bg-transparent"
                    type="button"
                    // (optionnel) : ici tu pourras ajouter un tri si tu veux
                  >
                    Client <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Projet</TableHead>
                <TableHead className="hidden sm:table-cell">
                  <Button variant="ghost" className="p-0 hover:bg-transparent" type="button">
                    Statut <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="hidden md:table-cell text-right">Date</TableHead>
                <TableHead className="w-[56px]">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    Chargement des demandes…
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && list.map((request) => {
                const createdAt = toDateSafe(request.createdAt);
                const status = request.status ?? 'Nouvelle Demande';

                return (
                  <TableRow
                    key={request.id}
                    className="cursor-pointer hover:bg-muted/40"
                    onClick={() => router.push(`/dashboard/demandes/${request.id}`)}
                  >
                    <TableCell className="align-top">
                      <div className="font-medium">{request.clientName || '—'}</div>
                      <div className="text-sm text-muted-foreground">{request.clientEmail || '—'}</div>
                    </TableCell>

                    <TableCell className="align-top">
                      <p className="font-medium">{truncate(request.projectDescription, 140) || '—'}</p>
                    </TableCell>

                    <TableCell className="hidden sm:table-cell align-top">
                      <Badge variant={getStatusBadgeVariant(status)}>{status}</Badge>
                    </TableCell>

                    <TableCell className="hidden md:table-cell align-top text-right text-sm text-muted-foreground">
                      {createdAt
                        ? (mounted
                            ? formatDistanceToNow(createdAt, { addSuffix: true, locale: fr })
                            : '…')
                        : '…'}
                    </TableCell>

                    <TableCell className="align-top">
                      <DropdownMenu>
                        {/* ✅ IMPORTANT : on évite asChild + Button, source fréquente de mismatch svg */}
                        <DropdownMenuTrigger asChild={false}>
                          <button
                            type="button"
                            aria-label="Ouvrir le menu"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          <DropdownMenuItem onClick={() => router.push(`/dashboard/demandes/${request.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir la demande
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={async () => {
                              await setStatus(request.id, 'Traité');
                            }}
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Marquer comme traité
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={async () => {
                              await setStatus(request.id, 'Supprimée');
                            }}
                          >
                            <Archive className="mr-2 h-4 w-4" />
                            Archiver
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}

              {!isLoading && list.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                    Aucune demande trouvée.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
