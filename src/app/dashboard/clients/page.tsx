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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

// Mock data - à remplacer par les données Firestore
const clients = [
  { id: 'CLI-001', name: 'Arnaud Migoux', email: 'arnaud.migoux@example.com', projects: 2, status: 'Actif', avatarId: 'testimonial-avatar-1' },
  { id: 'CLI-002', name: 'Nina G.', email: 'nina.g@example.com', projects: 1, status: 'Actif', avatarId: 'testimonial-avatar-2' },
  { id: 'CLI-003', name: 'Alex Leleka', email: 'alex.leleka@example.com', projects: 1, status: 'Actif', avatarId: 'testimonial-avatar-3' },
  { id: 'CLI-004', name: 'Chloé de NOMBEL', email: 'chloe.dn@example.com', projects: 1, status: 'Prospect', avatarId: 'founder-2' },
  { id: 'CLI-005', name: 'Ivano Isaia', email: 'ivano.isaia@example.com', projects: 1, status: 'Actif', avatarId: 'founder-1' },
  { id: 'CLI-006', name: 'Amanda Blassel', email: 'amanda.b@example.com', projects: 1, status: 'Archivé', avatarId: 'testimonial-avatar-2' },
];

function getStatusBadgeVariant(status: string) {
    switch (status) {
        case 'Actif': return 'default';
        case 'Prospect': return 'secondary';
        case 'Archivé': return 'outline';
        default: return 'default';
    }
}


export default function ClientsPage() {
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
                    <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
                    <p className="text-muted-foreground">
                        Gérez votre base de clients et de prospects.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Ajouter un client
                    </Button>
                </div>
            </div>

            <Card>
                 <CardHeader>
                    <CardTitle>Liste des clients</CardTitle>
                    <CardDescription>
                        Retrouvez ici tous vos contacts, qu'ils soient clients actifs ou prospects.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="sr-only">Avatar</span>
                                </TableHead>
                                <TableHead>
                                    <Button variant="ghost" className="p-0 hover:bg-transparent">
                                        Nom
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead className="hidden md:table-cell">Email</TableHead>
                                <TableHead className="hidden md:table-cell">
                                     <Button variant="ghost" className="p-0 hover:bg-transparent">
                                        Statut
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead className="hidden lg:table-cell">Projets</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.map((client) => {
                                const avatarImage = PlaceHolderImages.find(p => p.id === client.avatarId);
                                return (
                                <TableRow key={client.id}>
                                     <TableCell className="hidden sm:table-cell">
                                        <Avatar className="h-9 w-9">
                                            {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={`Avatar de ${client.name}`} />}
                                            <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{client.name}</div>
                                        <div className="text-sm text-muted-foreground md:hidden">{client.email}</div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{client.email}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Badge variant={getStatusBadgeVariant(client.status)}>
                                            {client.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell">{client.projects}</TableCell>
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
                                                <DropdownMenuItem>Voir le client</DropdownMenuItem>
                                                <DropdownMenuItem>Modifier</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                                                    Supprimer
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
