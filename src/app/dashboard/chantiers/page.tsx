'use client';

import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PlusCircle, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from '@/components/ui/dropdown-menu';

function getStatusBadgeVariant(status: string) {
    switch (status) {
        case 'En cours': return 'default';
        case 'Terminé': return 'secondary';
        case 'Facturé': return 'outline';
        case 'Planification': return 'destructive';
        default: return 'default';
    }
}




export default function ChantiersPage() {
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

    const projectsQuery = useMemoFirebase(() => 
        firestore ? query(collection(firestore, 'projects'), orderBy('title', 'desc')) : null
    , [firestore]);
    const { data: dbChantiers, isLoading } = useCollection<any>(projectsQuery);

    const chantiers = dbChantiers ?? [];

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
                    <h1 className="text-3xl font-bold tracking-tight">Chantiers</h1>
                    <p className="text-muted-foreground">
                        Suivez et gérez tous vos projets de rénovation.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button onClick={() => router.push('/dashboard/documents?type=suivi')} className="bg-amber-600 hover:bg-amber-500 font-bold">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Générer Rapport de Chantier PDF
                    </Button>
                </div>
            </div>

            <Card>
                 <CardHeader>
                    <CardTitle>Liste des chantiers</CardTitle>
                    <CardDescription>
                        Retrouvez ici tous vos chantiers, de la planification à la réception.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom du chantier</TableHead>
                                <TableHead className="hidden sm:table-cell">Client</TableHead>
                                <TableHead className="hidden sm:table-cell">Statut</TableHead>
                                <TableHead className="hidden md:table-cell">Avancement</TableHead>
                                <TableHead className="text-right">
                                    <span>Actions PDF & Gestion</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">Chargement...</TableCell>
                                </TableRow>
                            )}
                            {isClient && !isLoading && chantiers.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">Aucun chantier enregistré pour le moment.</TableCell>
                                </TableRow>
                            )}
                            {isClient && chantiers.map((chantier: any) => (
                                <TableRow key={chantier.id}>
                                    <TableCell>
                                        <div className="font-medium">{chantier.title}</div>
                                        <div className="text-sm text-muted-foreground sm:hidden">{chantier.clientName}</div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{chantier.clientName}</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge variant={getStatusBadgeVariant(chantier.status)}>
                                            {chantier.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex items-center gap-2">
                                            <Progress value={chantier.progress} className="h-2 w-[80px]" />
                                            <span className="text-xs text-muted-foreground">{chantier.progress}%</span>
                                        </div>
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
                                                <DropdownMenuLabel>Actions & Documents</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => router.push('/dashboard/documents?type=suivi')}>
                                                    Imprimer Rapport de Chantier PDF
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => router.push('/dashboard/documents?type=pv')}>
                                                    Imprimer le PV de réception
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => router.push('/dashboard/documents?type=devis')}>
                                                    Générer Devis Avenant
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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