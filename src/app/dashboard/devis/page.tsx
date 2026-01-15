
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { collection, query, orderBy, where } from 'firebase/firestore';

import { useUser, useCollection, useMemoFirebase, useFirestore } from '@/firebase';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { PlusCircle, MoreHorizontal, FileText, Pencil, Archive } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case 'Accepté':
      return 'default';
    case 'Facturé':
      return 'secondary';
    case 'Envoyé':
      return 'outline';
    case 'Brouillon':
      return 'destructive';
    case 'Refusé':
      return 'destructive';
    default:
      return 'default';
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

export default function DevisPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  const firestore = useFirestore();

  const [isClient, setIsClient] = useState(false);
  const [highlightId, setHighlightId] = useState<string | null>(null);

  useEffect(() => {
      setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isUserLoading && !user) router.push('/connexion');
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (!searchParams) return;
    const open = searchParams.get('open');
    setHighlightId(open || null);
  }, [searchParams]);

  const quotesQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;

    return query(
      collection(firestore, 'quotes'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
  }, [firestore, user?.uid]);

  const { data: quotes, isLoading, error } = useCollection<any>(quotesQuery);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>
    );
  }

  const handleView = (id: string) => {
    router.push(`/dashboard/devis/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/devis/${id}?mode=edit`);
  };

  const handleArchive = (id: string) => {
    console.log('archive', id);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Devis</h1>
          <p className="text-muted-foreground">
            Créez, suivez et gérez tous vos devis clients.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => router.push('/dashboard/demandes')}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Créer depuis une demande
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des devis</CardTitle>
          <CardDescription>Retrouvez ici tous vos devis générés.</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Projet</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell text-right">Montant</TableHead>
                <TableHead className="hidden sm:table-cell">Statut</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Chargement...
                  </TableCell>
                </TableRow>
              )}

              {isClient && !isLoading && error && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-destructive">
                    Impossible de charger les devis (règles Firestore / index / projet).
                  </TableCell>
                </TableRow>
              )}

              {isClient && !isLoading && quotes?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Aucun devis trouvé. Créez-en un depuis une demande.
                  </TableCell>
                </TableRow>
              )}

              {isClient &&
                !isLoading &&
                quotes?.map((item) => {
                  const createdAt = toDateSafe(item.createdAt);
                  const isHighlighted = !!highlightId && item.id === highlightId;

                  return (
                    <TableRow
                      key={item.id}
                      className={isHighlighted ? 'bg-primary/5' : undefined}
                    >
                      <TableCell>
                        <div className="font-medium">{item.clientName ?? '—'}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.clientEmail ?? ''}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="font-medium">{item.title ?? 'Devis'}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {item.projectDescription ?? '—'}
                        </div>
                      </TableCell>

                      <TableCell className="hidden sm:table-cell">
                        {createdAt ? format(createdAt, 'd MMMM yyyy', { locale: fr }) : '...'}
                      </TableCell>

                      <TableCell className="hidden md:table-cell text-right">
                        {item.total
                          ? new Intl.NumberFormat('fr-FR', {
                              style: 'currency',
                              currency: 'EUR',
                            }).format(item.total)
                          : 'À définir'}
                      </TableCell>

                      <TableCell className="hidden sm:table-cell">
                        <Badge variant={getStatusBadgeVariant(item.status)}>
                          {item.status ?? '—'}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Ouvrir le menu</span>
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuItem onClick={() => handleView(item.id)}>
                              <FileText className="mr-2 h-4 w-4" />
                              Voir le devis
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => handleEdit(item.id)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onClick={() => handleArchive(item.id)}
                              className="text-destructive focus:text-destructive focus:bg-destructive/10"
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
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
