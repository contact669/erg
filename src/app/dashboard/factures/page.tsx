'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Mock data - à remplacer par les données Firestore
const factures = [
    { id: 'FAC-2024-001', client: 'Nina G.', projet: 'Optimisation SDB 3m²', date: new Date('2024-07-25'), total: 6800.50, paye: 6800.50, restant: 0.00, status: 'Payée' },
    { id: 'FAC-2024-002', client: 'Arnaud Migoux', projet: 'Rénovation Appartement Haussmannien', date: new Date('2024-08-01'), total: 25400.00, paye: 12700.00, restant: 12700.00, status: 'Partiellement Payée' },
    { id: 'FAC-2024-003', client: 'Alex Leleka', projet: 'Rénovation Studio 11e', date: new Date('2024-08-10'), total: 9500.00, paye: 9500.00, restant: 0.00, status: 'Payée' },
    { id: 'FAC-2024-004', client: 'Chloé de NOMBEL', projet: 'Cuisine ouverte', date: new Date('2024-08-20'), total: 12500.00, paye: 0.00, restant: 12500.00, status: 'Envoyée' },
];


function getStatusBadgeVariant(status: string) {
    switch (status) {
        case 'Payée': return 'default';
        case 'Partiellement Payée': return 'secondary';
        case 'Envoyée': return 'outline';
        case 'En retard': return 'destructive';
        default: return 'default';
    }
}


export default function FacturesPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/connexion');
        }
    }, [user, isUserLoading, router]);

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
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Créer une facture
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
                                <TableHead>
                                    <Button variant="ghost" className="p-0 hover:bg-transparent">
                                        Numéro
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead>Client / Projet</TableHead>
                                <TableHead className="hidden sm:table-cell text-right">
                                    <Button variant="ghost" className="p-0 hover:bg-transparent">
                                        Date
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead className="hidden md:table-cell text-right">Total</TableHead>
                                <TableHead className="hidden md:table-cell text-right">Restant Dû</TableHead>
                                <TableHead className="hidden sm:table-cell">Statut</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {factures.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="font-medium">{item.id}</div>
                                        <div className="text-sm text-muted-foreground sm:hidden">{item.client}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{item.client}</div>
                                        <div className="text-sm text-muted-foreground">{item.projet}</div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell text-right">
                                        {format(item.date, "d MMM yyyy", { locale: fr })}
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
                                                <DropdownMenuItem>Voir la facture</DropdownMenuItem>
                                                <DropdownMenuItem>Télécharger PDF</DropdownMenuItem>
                                                <DropdownMenuItem>Enregistrer un paiement</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                                                    Archiver
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
