
'use client';

import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

function getStatusBadgeVariant(status: string) {
    switch (status) {
        case 'Payée': return 'default';
        case 'Partiellement Payée': return 'secondary';
        case 'Envoyée': return 'outline';
        case 'En retard': return 'destructive';
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

export default function FacturesPage() {
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

    const invoicesQuery = useMemoFirebase(() => 
        (firestore && user) ? query(collection(firestore, 'factures'), orderBy('date', 'desc')) : null
    , [firestore, user]);
    const { data: dbFactures, isLoading } = useCollection<any>(invoicesQuery);

    const factures = dbFactures ?? [];

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
                    <h1 className="text-3xl font-bold tracking-tight">Factures</h1>
                    <p className="text-muted-foreground">
                        Suivez les paiements et gérez la facturation de vos chantiers.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button onClick={() => router.push('/dashboard/documents?type=facture')} className="bg-amber-600 hover:bg-amber-500 font-bold">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Générer Facture PDF
                    </Button>
                </div>
            </div>

            <Card>
                 <CardHeader>
                    <CardTitle>Liste des factures</CardTitle>
                    <CardDescription>
                        Retrouvez ici toutes vos factures, des acomptes aux soldes.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Numéro</TableHead>
                                <TableHead>Client / Projet</TableHead>
                                <TableHead className="hidden sm:table-cell text-right">Date</TableHead>
                                <TableHead className="hidden md:table-cell text-right">Total</TableHead>
                                <TableHead className="hidden md:table-cell text-right">Restant Dû</TableHead>
                                <TableHead className="hidden sm:table-cell">Statut</TableHead>
                                <TableHead className="text-right">
                                    <span>Actions & PDF</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center">Chargement...</TableCell>
                                </TableRow>
                            )}
                            {isClient && !isLoading && factures.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">Aucune facture enregistrée pour le moment.</TableCell>
                                </TableRow>
                            )}
                            {isClient && factures.map((item: any) => {
                              const date = toDateSafe(item.date);
                              return (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="font-medium">{item.id}</div>
                                        <div className="text-sm text-muted-foreground sm:hidden">{item.clientName}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{item.clientName}</div>
                                        <div className="text-sm text-muted-foreground">{item.projectName}</div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell text-right">
                                        {date && isClient ? format(date, "d MMM yyyy", { locale: fr }) : item.date}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-right">
                                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.total)}
                                    </TableCell>
                                     <TableCell className="hidden md:table-cell text-right font-medium">
                                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.restant)}
                                    </TableCell>
                                     <TableCell className="hidden sm:table-cell">
                                        <Badge variant={getStatusBadgeVariant(item.status)}>
                                            {item.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Ouvrir le menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => router.push('/dashboard/documents?type=facture')}>
                                                    Voir / Télécharger PDF A4
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => router.push('/dashboard/documents?type=facture')}>
                                                    Enregistrer un paiement
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
