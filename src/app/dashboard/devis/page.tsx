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
const devis = [
    { id: 'DEV-2024-001', client: 'Arnaud Migoux', projet: 'Rénovation Appartement Haussmannien', date: new Date('2024-07-15'), montant: 25400.00, status: 'Accepté' },
    { id: 'DEV-2024-002', client: 'Nina G.', projet: 'Optimisation SDB 3m²', date: new Date('2024-07-18'), montant: 6800.50, status: 'Facturé' },
    { id: 'DEV-2024-003', client: 'Chloé de NOMBEL', projet: 'Cuisine ouverte', date: new Date('2024-08-01'), montant: 12500.00, status: 'Envoyé' },
    { id: 'DEV-2024-004', client: 'Ivano Isaia', projet: 'Rénovation 2 pièces', date: new Date('2024-08-05'), montant: 18900.00, status: 'Brouillon' },
    { id: 'DEV-2024-005', client: 'Amanda Blassel', projet: 'Aménagement Combles Maison', date: new Date('2024-08-10'), montant: 35000.00, status: 'Refusé' },
];


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


export default function DevisPage() {
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
                        Retrouvez ici tous vos devis en cours, acceptés ou refusés.
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
                                <TableHead className="hidden sm:table-cell">
                                    <Button variant="ghost" className="p-0 hover:bg-transparent">
                                        Date
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead className="hidden md:table-cell text-right">
                                    <Button variant="ghost" className="p-0 hover:bg-transparent">
                                        Montant
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead className="hidden sm:table-cell">Statut</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {devis.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="font-medium">{item.id}</div>
                                        <div className="text-sm text-muted-foreground sm:hidden">{format(item.date, "d MMM yyyy", { locale: fr })}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{item.client}</div>
                                        <div className="text-sm text-muted-foreground">{item.projet}</div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {format(item.date, "d MMMM yyyy", { locale: fr })}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-right">
                                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.montant)}
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
                                                <DropdownMenuItem>Voir le devis</DropdownMenuItem>
                                                <DropdownMenuItem>Modifier</DropdownMenuItem>
                                                <DropdownMenuItem>Télécharger PDF</DropdownMenuItem>
                                                <DropdownMenuItem>Créer une facture</DropdownMenuItem>
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
