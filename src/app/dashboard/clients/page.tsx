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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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

    const clientsQuery = useMemoFirebase(() => 
        firestore ? query(collection(firestore, 'clients'), orderBy('name', 'asc')) : null
    , [firestore]);
    const { data: clients, isLoading } = useCollection<any>(clientsQuery);

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
                             {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">Chargement...</TableCell>
                                </TableRow>
                            )}
                            {isClient && clients && clients.map((client) => {
                                const avatarImage = PlaceHolderImages.find(p => p.id === client.avatarId);
                                return (
                                <TableRow key={client.id}>
                                     <TableCell className="hidden sm:table-cell">
                                        <Avatar className="h-9 w-9">
                                            {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={`Avatar de ${client.name}`} />}
                                            <AvatarFallback>{client.name.split(' ').map((n:string) => n[0]).join('')}</AvatarFallback>
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
                                    <TableCell className="hidden lg:table-cell">{client.projectsCount || 0}</TableCell>
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
                            {isClient && !isLoading && !clients?.length && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24">Aucun client trouvé.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
