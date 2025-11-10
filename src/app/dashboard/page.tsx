'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Users, HardHat, FileText, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock data - replace with Firestore data later
const stats = [
    { title: 'Clients Actifs', value: '12', icon: Users },
    { title: 'Chantiers en Cours', value: '5', icon: HardHat },
    { title: 'Devis en Attente', value: '8', icon: FileText },
    { title: 'Factures Impayées', value: '3', total: '2,750€', icon: FileText },
];

const recentProjects = [
    { id: 'PROJ-001', name: 'Rénovation Appartement Haussmannien', client: 'Arnaud Migoux', status: 'En cours', progress: 65 },
    { id: 'PROJ-002', name: 'Optimisation SDB 3m²', client: 'Nina G.', status: 'Terminé', progress: 100 },
    { id: 'PROJ-003', name: 'Rénovation Studio 11e', client: 'Alex Leleka', status: 'Facturé', progress: 100 },
    { id: 'PROJ-004', name: 'Cuisine ouverte', client: 'Chloé de NOMBEL', status: 'En cours', progress: 40 },
    { id: 'PROJ-005', name: 'Rénovation 2 pièces', client: 'Ivano Isaia', status: 'Planification', progress: 10 },
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

export default function DashboardPage() {
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
                    <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord</h1>
                    <p className="text-muted-foreground">
                        Vue d'ensemble de votre activité.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nouveau Client
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            {stat.total && <p className="text-xs text-muted-foreground">pour un total de {stat.total}</p>}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Chantiers Récents</CardTitle>
                    <CardDescription>
                        Suivez l'avancement de vos derniers chantiers.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Chantier</TableHead>
                                <TableHead className="hidden sm:table-cell">Client</TableHead>
                                <TableHead className="hidden sm:table-cell">Statut</TableHead>
                                <TableHead className="hidden md:table-cell">Avancement</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentProjects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>
                                        <div className="font-medium">{project.name}</div>
                                        <div className="text-sm text-muted-foreground md:hidden">{project.client}</div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{project.client}</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge variant={getStatusBadgeVariant(project.status)}>
                                            {project.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex items-center gap-2">
                                            <Progress value={project.progress} className="h-2" />
                                            <span>{project.progress}%</span>
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
                                                <DropdownMenuItem>Voir le chantier</DropdownMenuItem>
                                                <DropdownMenuItem>Voir le client</DropdownMenuItem>
                                                <DropdownMenuItem>Générer une facture</DropdownMenuItem>
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
