'use client';

import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  PlusCircle,
  MoreHorizontal,
  Search,
  Phone,
  Mail,
  MapPin,
  FileText,
  Building2,
  Users,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case 'Actif':
      return 'default';
    case 'Prospect':
      return 'secondary';
    case 'Archivé':
      return 'outline';
    default:
      return 'default';
  }
}

const MOCK_CLIENTS = [
  {
    id: 'cli-1',
    name: 'Alexandre de Saint-Germain',
    email: 'a.stgermain@gmail.com',
    phone: '06 12 34 56 78',
    city: 'Paris 7e (Invalides)',
    status: 'Actif',
    projectsCount: 2,
    totalSpent: 165000,
    avatarUrl: '/images/fondateurs/k-ait.webp',
  },
  {
    id: 'cli-2',
    name: 'Florence Morel',
    email: 'f.morel@orange.fr',
    phone: '06 98 76 54 32',
    city: 'Boulogne-Billancourt (92)',
    status: 'Prospect',
    projectsCount: 1,
    totalSpent: 140000,
    avatarUrl: null,
  },
  {
    id: 'cli-3',
    name: 'Julien Roche',
    email: 'julien.roche@tech.io',
    phone: '06 45 12 89 33',
    city: 'Montreuil (93)',
    status: 'Prospect',
    projectsCount: 1,
    totalSpent: 95000,
    avatarUrl: null,
  },
  {
    id: 'cli-4',
    name: 'Édouard Vasseur',
    email: 'e.vasseur@cabinet-law.fr',
    phone: '06 33 22 11 00',
    city: 'Neuilly-sur-Seine (92)',
    status: 'Actif',
    projectsCount: 3,
    totalSpent: 310000,
    avatarUrl: null,
  },
  {
    id: 'cli-5',
    name: 'Marie-Christine Lambert',
    email: 'mc.lambert@neuf.fr',
    phone: '06 77 88 99 00',
    city: 'Vincennes (94)',
    status: 'Prospect',
    projectsCount: 1,
    totalSpent: 48000,
    avatarUrl: null,
  },
];

export default function ClientsPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/connexion');
    }
  }, [user, isUserLoading, router]);

  const clientsQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'clients'), orderBy('name', 'asc')) : null),
    [firestore]
  );
  const { data: dbClients, isLoading } = useCollection<any>(clientsQuery);

  const displayClients = useMemo(() => {
    const list = dbClients && dbClients.length > 0 ? dbClients : MOCK_CLIENTS;

    if (!searchQuery.trim()) return list;

    return list.filter((c: any) =>
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [dbClients, searchQuery]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-amber-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
            <Users className="h-4 w-4" />
            <span>Répertoire CRM & Contacts</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Fiches Clients 360°
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Gérez vos clients, prospects, historiques de devis et opportunités de chantiers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => router.push('/dashboard/pipeline')} variant="outline" className="rounded-xl border-slate-300">
            Pipeline CRM
          </Button>
          <Button onClick={() => router.push('/dashboard/devis')} className="bg-amber-600 hover:bg-amber-500 text-white rounded-xl shadow-md font-bold">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau Client / Devis
          </Button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Rechercher par nom, email, ville..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          />
        </div>
      </div>

      {/* CLIENTS TABLE */}
      <Card className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Répertoire Général ({displayClients.length})</CardTitle>
          <CardDescription className="text-xs">
            Vue à 360° avec actions directes de contact et accès aux devis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-slate-800">
                <TableHead className="w-[60px]"></TableHead>
                <TableHead className="font-bold text-slate-700 dark:text-slate-300">Client</TableHead>
                <TableHead className="hidden md:table-cell font-bold text-slate-700 dark:text-slate-300">Localisation</TableHead>
                <TableHead className="hidden md:table-cell font-bold text-slate-700 dark:text-slate-300">Statut</TableHead>
                <TableHead className="hidden lg:table-cell font-bold text-slate-700 dark:text-slate-300">Valeur Cumulée</TableHead>
                <TableHead className="text-right">Contact / Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isClient && displayClients.map((client: any) => {
                const initials = (client.name || 'U')
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')
                  .slice(0, 2);

                return (
                  <TableRow key={client.id} className="border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <TableCell>
                      <Avatar className="h-9 w-9">
                        {client.avatarUrl && <AvatarImage src={client.avatarUrl} alt={client.name} />}
                        <AvatarFallback className="bg-amber-500/10 text-amber-700 font-bold text-xs">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>

                    <TableCell>
                      <div className="font-bold text-slate-900 dark:text-white">{client.name}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <Mail className="h-3 w-3 text-slate-400" />
                        <span>{client.email}</span>
                      </div>
                    </TableCell>

                    <TableCell className="hidden md:table-cell text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-amber-600" />
                        <span>{client.city || 'Paris & IDF'}</span>
                      </div>
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      <Badge variant={getStatusBadgeVariant(client.status || 'Actif')}>
                        {client.status || 'Actif'}
                      </Badge>
                    </TableCell>

                    <TableCell className="hidden lg:table-cell font-extrabold text-amber-700 dark:text-amber-400 text-sm">
                      {(client.totalSpent || 85000).toLocaleString('fr-FR')} €
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {client.phone && (
                          <a
                            href={`tel:${client.phone}`}
                            className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-500/10 text-slate-600 hover:text-amber-600 flex items-center justify-center transition-colors"
                            title="Appeler"
                          >
                            <Phone className="h-3.5 w-3.5" />
                          </a>
                        )}

                        <a
                          href={`mailto:${client.email}`}
                          className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-500/10 text-slate-600 hover:text-amber-600 flex items-center justify-center transition-colors"
                          title="Envoyer Email"
                        >
                          <Mail className="h-3.5 w-3.5" />
                        </a>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions Client</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => router.push('/dashboard/pipeline')}>
                              Voir dans le Pipeline
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push('/dashboard/devis')}>
                              Émettre un nouveau devis
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
