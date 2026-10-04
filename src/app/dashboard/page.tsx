'use client';

import { useUser, useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { collection, query, where, orderBy, limit } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  PlusCircle,
  Users,
  HardHat,
  FileText,
  MoreHorizontal,
  Receipt,
  TrendingUp,
  Kanban,
  Building2,
  Sparkles,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case 'En cours':
      return 'default';
    case 'Terminé':
      return 'secondary';
    case 'Facturé':
      return 'outline';
    case 'Planification':
      return 'destructive';
    default:
      return 'default';
  }
}

const MONTHLY_PERFORMANCE = [
  { month: 'Avr', ca: 85000, objectif: 70000 },
  { month: 'Mai', ca: 110000, objectif: 85000 },
  { month: 'Juin', ca: 135000, objectif: 90000 },
  { month: 'Juil', ca: 95000, objectif: 80000 },
  { month: 'Août', ca: 60000, objectif: 50000 },
  { month: 'Sept', ca: 145000, objectif: 100000 },
];

const PIPELINE_DISTRIBUTION = [
  { name: 'Leads Entrants', value: 48000, color: '#3b82f6' },
  { name: 'Visites Planifiées', value: 95000, color: '#a855f7' },
  { name: 'En Chiffrage', value: 140000, color: '#f59e0b' },
  { name: 'Devis Envoyés', value: 197000, color: '#06b6d4' },
  { name: 'Chantiers Gagnés', value: 237000, color: '#10b981' },
];

export default function DashboardPage() {
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

  const clientsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'clients') : null),
    [firestore]
  );
  const { data: clients } = useCollection(clientsQuery);

  const projectsQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'projects'), orderBy('title', 'desc'), limit(5)) : null),
    [firestore]
  );
  const { data: recentProjects } = useCollection(projectsQuery);

  const quotesQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'quotes'), where('status', '==', 'Envoyé')) : null),
    [firestore]
  );
  const { data: pendingQuotes } = useCollection(quotesQuery);

  const invoicesQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'factures'), where('status', '==', 'Envoyée')) : null),
    [firestore]
  );
  const { data: unpaidInvoices } = useCollection(invoicesQuery);

  const stats = useMemo(
    () => [
      {
        title: 'Clients Actifs',
        value: clients?.length ?? 18,
        sub: 'Répertoire à jour',
        icon: Users,
        color: 'text-blue-600 bg-blue-500/10',
      },
      {
        title: 'Chantiers en Cours',
        value: recentProjects?.filter((p) => p.status === 'En cours').length ?? 7,
        sub: 'Paris & Petite Couronne',
        icon: HardHat,
        color: 'text-amber-600 bg-amber-500/10',
      },
      {
        title: 'Devis en Négociation',
        value: pendingQuotes?.length ?? 4,
        sub: 'Valeur : ~ 197 000 €',
        icon: FileText,
        color: 'text-purple-600 bg-purple-500/10',
      },
      {
        title: 'Factures Impayées',
        value: unpaidInvoices?.length ?? 2,
        sub: '34 500 € en attente',
        icon: Receipt,
        color: 'text-rose-600 bg-rose-500/10',
      },
    ],
    [clients, recentProjects, pendingQuotes, unpaidInvoices]
  );

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-amber-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* HEADER & QUICK ACTION BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
            <Sparkles className="h-4 w-4" />
            <span>Cockpit Exécutif ERG Rénovation</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Tableau de Bord
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Vue synthétique des performances financières, du pipeline commercial et des chantiers en cours.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <Button onClick={() => router.push('/dashboard/pipeline')} className="bg-amber-600 hover:bg-amber-500 text-white rounded-xl shadow-md font-bold">
            <Kanban className="mr-2 h-4 w-4" />
            Pipeline CRM
          </Button>

          <Button onClick={() => router.push('/dashboard/devis')} variant="outline" className="rounded-xl border-slate-300">
            <PlusCircle className="mr-2 h-4 w-4 text-amber-600" />
            Nouveau Devis
          </Button>

          <Button onClick={() => router.push('/dashboard/clients')} variant="outline" className="rounded-xl border-slate-300">
            <Users className="mr-2 h-4 w-4 text-amber-600" />
            Nouveau Client
          </Button>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">{stat.title}</CardTitle>
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {isClient ? stat.value : '...'}
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FINANCIAL & PIPELINE CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* MONTHLY REVENUE CHART */}
        <Card className="lg:col-span-7 rounded-2xl border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-amber-600" />
                Chiffre d'Affaires Mensuel (vs Objectif)
              </CardTitle>
              <CardDescription className="text-xs">Chantiers livrés et facturés sur les 6 derniers mois (€)</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs font-bold text-amber-700 bg-amber-500/10 border-amber-500/20">
              Objectif Annuel 1.2M€
            </Badge>
          </CardHeader>
          <CardContent>
            {isClient && (
              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MONTHLY_PERFORMANCE} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} tickFormatter={(val) => `${val / 1000}k€`} />
                    <RechartsTooltip formatter={(val: number) => [`${val.toLocaleString('fr-FR')} €`, 'Montant']} />
                    <Bar dataKey="ca" name="CA Réalisé (€)" fill="#b87333" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="objectif" name="Objectif (€)" fill="#94a3b8" opacity={0.3} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* PIPELINE DISTRIBUTION DONUT CHART */}
        <Card className="lg:col-span-5 rounded-2xl border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Kanban className="h-5 w-5 text-amber-600" />
              Répartition du Pipeline Commercial
            </CardTitle>
            <CardDescription className="text-xs">Valeur totale cumulée par étape de vente (€)</CardDescription>
          </CardHeader>
          <CardContent>
            {isClient && (
              <div className="h-72 w-full flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={PIPELINE_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {PIPELINE_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(val: number) => [`${val.toLocaleString('fr-FR')} €`, 'Valeur']} />
                    <Legend iconSize={8} layout="horizontal" verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* RECENT PROJECTS TABLE */}
      <Card className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-amber-600" />
              Chantiers Récents en Cours
            </CardTitle>
            <CardDescription className="text-xs">Suivez l'avancement et la livraison de vos derniers projets</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/chantiers')} className="rounded-xl text-xs font-bold border-slate-300">
            Voir tous les chantiers <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-slate-800">
                <TableHead className="font-bold text-slate-700 dark:text-slate-300">Chantier</TableHead>
                <TableHead className="hidden sm:table-cell font-bold text-slate-700 dark:text-slate-300">Client</TableHead>
                <TableHead className="hidden sm:table-cell font-bold text-slate-700 dark:text-slate-300">Statut</TableHead>
                <TableHead className="hidden md:table-cell font-bold text-slate-700 dark:text-slate-300">Avancement</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isClient && recentProjects && recentProjects.length > 0 ? (
                recentProjects.map((project: any) => (
                  <TableRow key={project.id} className="border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <TableCell>
                      <div className="font-bold text-slate-900 dark:text-white">{project.title}</div>
                      <div className="text-xs text-slate-500 md:hidden">{project.client}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-slate-600 dark:text-slate-300 font-medium">{project.client}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant={getStatusBadgeVariant(project.status)}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2 max-w-xs">
                        <Progress value={project.progress || 50} className="h-2" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{project.progress || 50}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/dashboard/chantiers`)}>
                            Voir le détail
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/dashboard/devis`)}>
                            Émettre une facture
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                /* Fallback mock display if DB empty */
                [
                  { id: 'm1', title: 'Rénovation Haussmannien 110m²', client: 'A. de Saint-Germain', status: 'En cours', progress: 65 },
                  { id: 'm2', title: 'Extension & Verrière Boulogne', client: 'F. & M. Morel', status: 'En cours', progress: 40 },
                  { id: 'm3', title: 'Loft 85m² Bas-Montreuil', client: 'J. Roche', status: 'Planification', progress: 15 },
                  { id: 'm4', title: 'Appartement Bourgeois Neuilly', client: 'E. Vasseur', status: 'En cours', progress: 85 },
                  { id: 'm5', title: 'Suite Parentale & SDB Vincennes', client: 'M. Lambert', status: 'Terminé', progress: 100 },
                ].map((project) => (
                  <TableRow key={project.id} className="border-slate-100 dark:border-slate-800">
                    <TableCell>
                      <div className="font-bold text-slate-900 dark:text-white">{project.title}</div>
                      <div className="text-xs text-slate-500 sm:hidden">{project.client}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-slate-600 dark:text-slate-300 font-medium">{project.client}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant={getStatusBadgeVariant(project.status)}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2 max-w-xs">
                        <Progress value={project.progress} className="h-2" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{project.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard/chantiers')} className="text-xs text-amber-700 font-bold">
                        Gérer →
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
