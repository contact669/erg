'use client';

import { useUser, useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { collection, query, orderBy } from 'firebase/firestore';

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

const PIPELINE_STAGES = [
  { id: 'lead', name: 'Leads entrants', color: '#3b82f6' },
  { id: 'visit', name: 'Visites planifiées', color: '#a855f7' },
  { id: 'quoting', name: 'En chiffrage', color: '#f59e0b' },
  { id: 'sent', name: 'Devis envoyés', color: '#06b6d4' },
  { id: 'won', name: 'Chantiers gagnés', color: '#10b981' },
];

function toDateSafe(value: any): Date | null {
  if (value?.toDate && typeof value.toDate === 'function') return value.toDate();
  const d = value ? new Date(value) : null;
  return d && !isNaN(d.getTime()) ? d : null;
}

function requestStage(req: any): string {
  return req.pipelineStage ?? (req.status === 'Traité' ? 'won' : req.status === 'Supprimée' ? 'lost' : 'lead');
}

const euro = (value: number) => `${Math.round(value).toLocaleString('fr-FR')} €`;

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
    () => (firestore ? query(collection(firestore, 'projects'), orderBy('title', 'desc')) : null),
    [firestore]
  );
  const { data: projects } = useCollection(projectsQuery);
  const recentProjects = projects?.slice(0, 5);

  const quotesQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'quotes') : null),
    [firestore]
  );
  const { data: quotes } = useCollection(quotesQuery);

  const invoicesQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'factures') : null),
    [firestore]
  );
  const { data: invoices } = useCollection(invoicesQuery);

  const requestsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'quoteRequests') : null),
    [firestore]
  );
  const { data: requests } = useCollection(requestsQuery);

  const pendingQuotes = useMemo(() => (quotes ?? []).filter((q: any) => q.status === 'Envoyé'), [quotes]);
  const unpaidInvoices = useMemo(() => (invoices ?? []).filter((f: any) => f.status !== 'Payée' && (Number(f.restant ?? f.total) || 0) > 0), [invoices]);

  // Invoiced amount per month over the last six months, from the factures collection.
  const monthlyRevenue = useMemo(() => {
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
      return { key: `${d.getFullYear()}-${d.getMonth()}`, month: d.toLocaleDateString('fr-FR', { month: 'short' }), ca: 0 };
    });
    for (const invoice of invoices ?? []) {
      const date = toDateSafe((invoice as any).date);
      const bucket = date && months.find((m) => m.key === `${date.getFullYear()}-${date.getMonth()}`);
      if (bucket) bucket.ca += Number((invoice as any).total) || 0;
    }
    return months;
  }, [invoices]);

  const pipelineDistribution = useMemo(
    () => PIPELINE_STAGES
      .map((stage) => ({ ...stage, value: (requests ?? []).filter((r: any) => requestStage(r) === stage.id).length }))
      .filter((stage) => stage.value > 0),
    [requests]
  );

  const stats = useMemo(
    () => [
      {
        title: 'Clients Actifs',
        value: clients?.length ?? 0,
        sub: 'Répertoire à jour',
        icon: Users,
        color: 'text-blue-600 bg-blue-500/10',
      },
      {
        title: 'Chantiers en Cours',
        value: projects?.filter((p: any) => p.status === 'En cours').length ?? 0,
        sub: 'Paris & Petite Couronne',
        icon: HardHat,
        color: 'text-amber-600 bg-amber-500/10',
      },
      {
        title: 'Devis en Négociation',
        value: pendingQuotes.length,
        sub: `Valeur : ${euro(pendingQuotes.reduce((sum: number, q: any) => sum + (Number(q.total ?? q.totalTTC) || 0), 0))}`,
        icon: FileText,
        color: 'text-purple-600 bg-purple-500/10',
      },
      {
        title: 'Factures Impayées',
        value: unpaidInvoices.length,
        sub: `${euro(unpaidInvoices.reduce((sum: number, f: any) => sum + (Number(f.restant ?? f.total) || 0), 0))} en attente`,
        icon: Receipt,
        color: 'text-rose-600 bg-rose-500/10',
      },
    ],
    [clients, projects, pendingQuotes, unpaidInvoices]
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
                Chiffre d'affaires facturé
              </CardTitle>
              <CardDescription className="text-xs">Total des factures émises sur les 6 derniers mois (€)</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {isClient && (
              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} tickFormatter={(val) => `${val / 1000}k€`} />
                    <RechartsTooltip formatter={(val: number) => [`${val.toLocaleString('fr-FR')} €`, 'Montant']} />
                    <Bar dataKey="ca" name="Facturé (€)" fill="#b87333" radius={[6, 6, 0, 0]} />
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
            <CardDescription className="text-xs">Nombre de demandes par étape (hors classées)</CardDescription>
          </CardHeader>
          <CardContent>
            {isClient && pipelineDistribution.length === 0 && (
              <div className="h-72 flex items-center justify-center text-sm text-slate-500">Aucune demande en cours.</div>
            )}
            {isClient && pipelineDistribution.length > 0 && (
              <div className="h-72 w-full flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pipelineDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pipelineDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(val: number) => [val, 'Demandes']} />
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
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-slate-500">Aucun chantier enregistré pour le moment.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
