'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PlusCircle, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from '@/components/ui/dropdown-menu';

// Mock data - à remplacer par les données Firestore
const chantiers = [
    { id: 'PROJ-001', name: 'Rénovation Appartement Haussmannien', client: 'Arnaud Migoux', status: 'En cours', progress: 65 },
    { id: 'PROJ-002', name: 'Optimisation SDB 3m²', client: 'Nina G.', status: 'Terminé', progress: 100 },
    { id: 'PROJ-003', name: 'Rénovation Studio 11e', client: 'Alex Leleka', status: 'Facturé', progress: 100 },
    { id: 'PROJ-004', name: 'Cuisine ouverte', client: 'Chloé de NOMBEL', status: 'En cours', progress: 40 },
    { id: 'PROJ-005', name: 'Rénovation 2 pièces', client: 'Ivano Isaia', status: 'Planification', progress: 10 },
    { id: 'PROJ-006', name: 'Aménagement Combles Maison', client: 'Amanda Blassel', status: 'Planification', progress: 5 },
];


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
                    <h1 className="text-3xl font-bold tracking-tight">Chantiers</h1>
                    <p className="text-muted-foreground">
                        Suivez et gérez tous vos projets de rénovation.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Ajouter un chantier
                    </Button>
                </div>
            </div>

            <Card>
                 <CardHeader>
                    <CardTitle>Liste des chantiers</CardTitle>
                    <CardDescription>
                        Retrouvez ici tous vos chantiers, de la planification à la facturation.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                     <Button variant="ghost" className="p-0 hover:bg-transparent">
                                        Nom du chantier
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead className="hidden sm:table-cell">Client</TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    <Button variant="ghost" className="p-0 hover:bg-transparent">
                                        Statut
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead className="hidden md:table-cell">Avancement</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {chantiers.map((chantier) => (
                                <TableRow key={chantier.id}>
                                    <TableCell>
                                        <div className="font-medium">{chantier.name}</div>
                                        <div className="text-sm text-muted-foreground sm:hidden">{chantier.client}</div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{chantier.client}</TableCell>
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
                                                <DropdownMenuItem>Voir le chantier</DropdownMenuItem>
                                                <DropdownMenuItem>Modifier</DropdownMenuItem>
                                                <DropdownMenuItem>Générer un devis</DropdownMenuItem>
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
