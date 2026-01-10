'use client';

import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

function getStatusBadgeVariant(status: string) {
    switch (status) {
        case 'Nouvelle Demande': return 'destructive';
        case 'Traité': return 'default';
        case 'Supprimée': return 'secondary';
        default: return 'outline';
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

export default function DemandesPage() {
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

    const requestsQuery = useMemoFirebase(() => 
        firestore ? query(collection(firestore, 'quoteRequests'), orderBy('createdAt', 'desc')) : null
    , [firestore]);
    const { data: requests, isLoading } = useCollection<any>(requestsQuery);

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
                    <h1 className="text-3xl font-bold tracking-tight">Demandes de devis</h1>
                    <p className="text-muted-foreground">
                        Gérez les nouvelles demandes de contact et de devis.
                    </p>
                </div>
            </div>

            <Card>
                 <CardHeader>
                    <CardTitle>Dernières demandes</CardTitle>
                    <CardDescription>
                        Retrouvez ici toutes les demandes reçues depuis le site web.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                     <Button variant="ghost" className="p-0 hover:bg-transparent">
                                        Client
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead>Projet</TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    <Button variant="ghost" className="p-0 hover:bg-transparent">
                                        Statut
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead className="hidden md:table-cell text-right">Date</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">Chargement des demandes...</TableCell>
                                </TableRow>
                            )}
                            {isClient && requests && requests.map((request) => {
                                const createdAt = toDateSafe(request.createdAt);
                                return (
                                <TableRow key={request.id} className="cursor-pointer" onClick={() => router.push(`/dashboard/demandes/${request.id}`)}>
                                    <TableCell>
                                        <div className="font-medium">{request.clientName}</div>
                                        <div className="text-sm text-muted-foreground">{request.clientEmail}</div>
                                    </TableCell>
                                    <TableCell>
                                         <p className="font-medium line-clamp-2">{request.projectDescription}</p>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge variant={getStatusBadgeVariant(request.status)}>
                                            {request.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-right" suppressHydrationWarning>
                                        {createdAt && isClient ? formatDistanceToNow(createdAt, { addSuffix: true, locale: fr }) : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost" onClick={(e) => e.stopPropagation()}>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Ouvrir le menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => router.push(`/dashboard/demandes/${request.id}`)}>Voir la demande</DropdownMenuItem>
                                                <DropdownMenuItem>Marquer comme traité</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                                                    Archiver
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )})}
                             {isClient && !isLoading && !requests?.length && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24">Aucune demande trouvée.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
