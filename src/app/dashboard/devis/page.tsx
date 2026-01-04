
'use client';

import { useUser, useCollection, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MoreHorizontal, FileText } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { collection, query, orderBy, where } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case 'Accepté': return 'default';
    case 'Facturé': return 'secondary';
    case 'Envoyé': return 'outline';
    case 'Brouillon': return 'destructive';
    case 'Refusé': return 'destructive';
    default: return 'default';
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
  const firestore = useFirestore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/connexion');
    }
  }, [user, isUserLoading, router]);

  const quotesQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) {
      return null;
    }
    return query(
      collection(firestore, 'quotes'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
  }, [firestore, user?.uid]);

  const { data: quotes, isLoading } = useCollection<any>(quotesQuery);

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
          <h1 className="text-3xl font-bold tracking-tight">Devis</h1>
          <p className="text-muted-foreground">
            Créez, suivez et gérez tous vos devis clients.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Créer un devis
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des devis</CardTitle>
          <CardDescription>
            Retrouvez ici tous vos devis générés.
          </CardDescription>
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
                <TableHead><span className="sr-only">Actions</span></TableHead>
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
              {isClient && !isLoading && quotes && quotes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Aucun devis trouvé. Créez-en un depuis une demande.
                  </TableCell>
                </TableRow>
              )}
              {isClient && !isLoading && quotes && quotes.map((item) => {
                const createdAt = toDateSafe(item.createdAt);
                return(
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-medium">{item.clientName}</div>
                    <div className="text-sm text-muted-foreground">{item.clientEmail}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {item.projectDescription}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {createdAt ? format(createdAt, "d MMMM yyyy", { locale: fr }) : '-'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right">
                    {item.total
                      ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.total)
                      : 'À définir'}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
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
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          Voir le devis
                        </DropdownMenuItem>
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          Archiver
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
