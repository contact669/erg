'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc } from 'firebase/firestore';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import {
  Kanban,
  Search,
  Plus,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Euro,
  MoreVertical,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  Building2,
  Sparkles,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

export interface DealItem {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  projectTitle: string;
  location: string;
  department: string;
  estimatedValue: number;
  stage: 'lead' | 'visit' | 'quoting' | 'sent' | 'won' | 'lost';
  createdAt: string;
  type: string;
}

const STAGES = [
  { id: 'lead', title: '📥 Leads Entrants', color: 'border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-400' },
  { id: 'visit', title: '📐 Visite Planifiée', color: 'border-purple-500 bg-purple-500/10 text-purple-700 dark:text-purple-400' },
  { id: 'quoting', title: '✍️ En Chiffrage', color: 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400' },
  { id: 'sent', title: '📬 Devis Envoyé', color: 'border-cyan-500 bg-cyan-500/10 text-cyan-700 dark:text-cyan-400' },
  { id: 'won', title: '🎉 Chantier Gagné', color: 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' },
  { id: 'lost', title: '📁 Classé / Perdu', color: 'border-slate-500 bg-slate-500/10 text-slate-700 dark:text-slate-400' },
];


function toDateSafe(value: any): Date | null {
  if (!value) return null;
  if (value?.toDate && typeof value.toDate === 'function') return value.toDate();
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
  if (typeof value === 'string' || typeof value === 'number') {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

function formatDateSafe(value: any): string {
  const d = toDateSafe(value);
  if (!d) return 'Récents';
  try {
    return d.toISOString().split('T')[0];
  } catch {
    return 'Récents';
  }
}

export default function PipelinePage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [deals, setDeals] = useState<DealItem[]>([]);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/connexion');
    }
  }, [user, isUserLoading, router]);

  // Fetch quoteRequests from Firestore if available
  const requestsQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'quoteRequests'), orderBy('createdAt', 'desc')) : null),
    [firestore]
  );
  const { data: dbRequests } = useCollection<any>(requestsQuery);

  // Every deal is a real quote request; its stage is stored on the request itself.
  useEffect(() => {
    if (dbRequests) {
      const dbItems: DealItem[] = dbRequests.map((req: any) => ({
        id: req.id,
        clientName: req.clientName || 'Prospect sans nom',
        clientEmail: req.clientEmail || 'Non renseigné',
        clientPhone: req.clientPhone || 'Non renseigné',
        projectTitle: req.projectDescription || 'Projet de rénovation',
        location: req.postalCode || req.location || 'Non renseigné',
        department: req.department || '',
        estimatedValue: Number(req.estimatedBudget) || 0,
        stage: req.pipelineStage ?? (req.status === 'Traité' ? 'won' : req.status === 'Supprimée' ? 'lost' : 'lead'),
        createdAt: formatDateSafe(req.createdAt),
        type: req.projectType || 'Rénovation',
      }));
      setDeals(dbItems);
    }
  }, [dbRequests]);

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      const matchesSearch =
        deal.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = departmentFilter === 'all' || deal.department === departmentFilter;

      return matchesSearch && matchesDept;
    });
  }, [deals, searchQuery, departmentFilter]);

  const pipelineStats = useMemo(() => {
    const totalValue = filteredDeals.reduce((sum, d) => sum + (d.stage !== 'lost' ? d.estimatedValue : 0), 0);
    const wonValue = filteredDeals.filter((d) => d.stage === 'won').reduce((sum, d) => sum + d.estimatedValue, 0);
    const totalDeals = filteredDeals.length;
    const wonDeals = filteredDeals.filter((d) => d.stage === 'won').length;
    const conversionRate = totalDeals > 0 ? Math.round((wonDeals / totalDeals) * 100) : 0;
    const avgDealValue = totalDeals > 0 ? Math.round(totalValue / totalDeals) : 0;

    return { totalValue, wonValue, totalDeals, wonDeals, conversionRate, avgDealValue };
  }, [filteredDeals]);

  const moveStage = async (dealId: string, newStage: DealItem['stage']) => {
    const previous = deals;
    setDeals((prev) => prev.map((d) => (d.id === dealId ? { ...d, stage: newStage } : d)));
    try {
      await updateDoc(doc(firestore, 'quoteRequests', dealId), { pipelineStage: newStage });
    } catch (error) {
      console.error('Pipeline stage update failed:', error);
      setDeals(previous);
      window.alert("Le changement d'étape n'a pas pu être enregistré. Réessayez.");
    }
  };

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
            <Kanban className="h-4 w-4" />
            <span>Pilotage Commercial & Deals</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Pipeline CRM & Opportunités
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Suivez la progression de vos prospects, de la première prise de contact jusqu'à la signature des chantiers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => router.push('/dashboard/demandes')} variant="outline" className="rounded-xl border-slate-300">
            <Clock className="mr-2 h-4 w-4 text-amber-600" />
            Demandes Web
          </Button>
          <Button onClick={() => router.push('/dashboard/devis')} className="bg-amber-600 hover:bg-amber-500 text-white rounded-xl shadow-md">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau Devis
          </Button>
        </div>
      </div>

      {/* KPI METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Valeur Totale Pipeline</span>
              <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Euro className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
              {pipelineStats.totalValue.toLocaleString('fr-FR')} €
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              <span>{pipelineStats.totalDeals} opportunités actives</span>
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Chantiers Signés (Gagnés)</span>
              <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-extrabold text-emerald-600">
              {pipelineStats.wonValue.toLocaleString('fr-FR')} €
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span>{pipelineStats.wonDeals} contrats validés</span>
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Taux de Conversion</span>
              <div className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
              {pipelineStats.conversionRate} %
            </div>
            <p className="text-xs text-slate-500 mt-1">Ratio devis signés / totaux</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Panier Moyen Chantier</span>
              <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <Building2 className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
              {pipelineStats.avgDealValue.toLocaleString('fr-FR')} €
            </div>
            <p className="text-xs text-slate-500 mt-1">Valeur moyenne par projet</p>
          </CardContent>
        </Card>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Rechercher prospect, projet, ville..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-48 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <Filter className="mr-2 h-4 w-4 text-slate-500" />
              <SelectValue placeholder="Département" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les secteurs</SelectItem>
              <SelectItem value="75">Paris (75)</SelectItem>
              <SelectItem value="92">Hauts-de-Seine (92)</SelectItem>
              <SelectItem value="93">Seine-Saint-Denis (93)</SelectItem>
              <SelectItem value="94">Val-de-Marne (94)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KANBAN BOARD BOARD COLUMNS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageDeals = filteredDeals.filter((d) => d.stage === stage.id);
          const stageTotal = stageDeals.reduce((sum, d) => sum + d.estimatedValue, 0);

          return (
            <div key={stage.id} className="flex flex-col rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-3 min-w-[280px]">
              {/* STAGE HEADER */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{stage.title}</span>
                  <Badge variant="secondary" className="rounded-full text-xs font-bold px-2">
                    {stageDeals.length}
                  </Badge>
                </div>
              </div>

              <div className="text-xs font-extrabold text-slate-600 dark:text-slate-400 mb-3 px-1">
                Total : {stageTotal.toLocaleString('fr-FR')} €
              </div>

              {/* DEAL CARDS */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[650px] pr-1">
                {stageDeals.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl bg-white/50 dark:bg-slate-900/50">
                    Aucune affaire à cette étape
                  </div>
                ) : (
                  stageDeals.map((deal) => (
                    <Card
                      key={deal.id}
                      className="rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                    >
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-amber-600 transition-colors">
                            {deal.clientName}
                          </span>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md">
                                <MoreVertical className="h-4 w-4 text-slate-400" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <div className="px-2 py-1.5 text-xs font-bold text-slate-500">Changer l'étape :</div>
                              {STAGES.map((s) => (
                                <DropdownMenuItem key={s.id} onClick={() => moveStage(deal.id, s.id as any)} className="text-xs font-medium cursor-pointer">
                                  {s.title}
                                </DropdownMenuItem>
                              ))}
                              <div className="my-1 h-px bg-slate-100 dark:bg-slate-800" />
                              <DropdownMenuItem onClick={() => router.push(`/dashboard/demandes/${deal.id}`)} className="text-xs font-medium cursor-pointer">
                                Voir la demande
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => router.push(`/dashboard/devis/nouveau?fromRequest=${deal.id}`)} className="text-xs font-bold cursor-pointer text-amber-700">
                                Créer le client et le devis
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 font-medium">
                          {deal.projectTitle}
                        </p>

                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <MapPin className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                          <span className="truncate">{deal.location}</span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                          <span className="font-extrabold text-amber-700 dark:text-amber-400 text-sm">
                            {deal.estimatedValue > 0 ? `${deal.estimatedValue.toLocaleString('fr-FR')} €` : 'À chiffrer'}
                          </span>
                          <Badge variant="outline" className="text-[10px] font-semibold">
                            {deal.type}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-2">
                            <a href={`tel:${deal.clientPhone}`} className="h-7 w-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-500/10 text-slate-600 hover:text-amber-600 flex items-center justify-center transition-colors">
                              <Phone className="h-3.5 w-3.5" />
                            </a>
                            <a href={`mailto:${deal.clientEmail}`} className="h-7 w-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-500/10 text-slate-600 hover:text-amber-600 flex items-center justify-center transition-colors">
                              <Mail className="h-3.5 w-3.5" />
                            </a>
                          </div>

                          <span className="text-[10px] text-slate-400">{deal.createdAt}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
