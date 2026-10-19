'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { collection, orderBy, query } from 'firebase/firestore';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { COMPANY } from '@/lib/company';
import { leadSourceLabel } from '@/lib/lead-source';
import { requestPipelineStages, type PipelineQuote } from '@/lib/crm/request-pipeline';

const STAGES = [
  { id: 'lead', label: 'À qualifier' },
  { id: 'quoting', label: 'Devis en préparation' },
  { id: 'sent', label: 'Devis envoyé' },
  { id: 'won', label: 'Devis accepté / facturé' },
  { id: 'lost', label: 'Devis refusé' },
] as const;
type Request = {
  clientName?: string;
  projectDescription?: string;
  postalCode?: string;
  status?: string;
  leadSource?: string | null;
  leadSourceMethod?: string | null;
};

export default function PipelinePage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const isAdmin = user?.uid === COMPANY.adminUid;
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (!isUserLoading && !user) router.push('/connexion');
  }, [user, isUserLoading, router]);
  const requestsQuery = useMemoFirebase(() => firestore && isAdmin
    ? query(collection(firestore, 'quoteRequests'), orderBy('createdAt', 'desc')) : null,
  [firestore, isAdmin]);
  const quotesQuery = useMemoFirebase(() => firestore && isAdmin
    ? collection(firestore, 'quotes') : null, [firestore, isAdmin]);
  const requests = useCollection<Request>(requestsQuery);
  const quotes = useCollection<PipelineQuote>(quotesQuery);
  const rows = useMemo(() => (requests.data ?? []).filter(request =>
    request.status !== 'Supprimée' &&
    [request.clientName, request.projectDescription, request.postalCode].some(value =>
      (value ?? '').toLocaleLowerCase('fr').includes(search.trim().toLocaleLowerCase('fr')))),
  [requests.data, search]);
  const stages = useMemo(() => requestPipelineStages(rows.map(row => row.id), quotes.data ?? []), [rows, quotes.data]);

  if (isUserLoading || !user) return <p>Chargement…</p>;
  if (!isAdmin) return <p>Accès réservé à l’administrateur.</p>;
  if (requests.error || quotes.error) return <Card><CardHeader>
    <CardTitle>Suivi indisponible</CardTitle>
    <CardDescription>Impossible de charger les demandes ou leurs devis. Aucun bilan commercial ne peut être calculé.</CardDescription>
  </CardHeader></Card>;
  if (requests.isLoading || quotes.isLoading || !requests.data || !quotes.data) return <p>Chargement des demandes et des devis…</p>;

  const accepted = rows.filter(row => stages.get(row.id)?.stage === 'won').length;
  const sent = rows.filter(row => stages.get(row.id)?.stage === 'sent').length;
  return <div className="space-y-6 pb-12">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Suivi commercial des demandes web</h1>
      <p className="mt-2 text-muted-foreground">Les étapes proviennent des devis liés à chaque demande, selon leur statut enregistré dans le CRM.</p>
      <Link href="/dashboard/demandes" className="mt-3 inline-block underline underline-offset-4">Toutes les demandes</Link>
    </div>
    <Card><CardHeader>
      <CardTitle>Périmètre du suivi</CardTitle>
      <CardDescription>Toutes périodes confondues, hors demandes archivées, selon la recherche ci-dessous. Un devis accepté ou facturé est un statut CRM ; ce tableau ne vérifie pas les signatures et ne mesure pas les encaissements. Une demande « traitée » ne devient jamais automatiquement gagnée.</CardDescription>
    </CardHeader><CardContent>
      <dl className="grid gap-4 sm:grid-cols-3">
        {[
          ['Demandes affichées', rows.length],
          ['Avec devis envoyé, sans acceptation', sent],
          ['Avec devis accepté ou facturé', accepted],
        ].map(([label, count]) => <div key={label} className="rounded-lg border p-4">
          <dt className="text-sm text-muted-foreground">{label}</dt>
          <dd className="mt-2 text-2xl font-semibold tabular-nums">{count}</dd>
        </div>)}
      </dl>
      <p className="mt-4 text-sm text-muted-foreground">Une demande comportant plusieurs devis est comptée une seule fois. L’origine déclarée par le visiteur ne prouve pas une attribution SEO.</p>
    </CardContent></Card>
    <div className="max-w-xl">
      <label htmlFor="pipeline-search" className="mb-2 block text-sm font-medium">Rechercher un client, un projet ou un code postal</label>
      <Input id="pipeline-search" value={search} onChange={event => setSearch(event.target.value)} />
    </div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {STAGES.map(stage => {
        const items = rows.filter(row => stages.get(row.id)?.stage === stage.id);
        return <section key={stage.id} className="min-w-0 rounded-xl border bg-muted/30 p-3" aria-label={stage.label}>
          <h2 className="mb-4 flex items-center justify-between gap-2 text-sm font-semibold">{stage.label}<Badge variant="secondary">{items.length}</Badge></h2>
          <div className="space-y-3">
            {!items.length && <p className="p-2 text-sm text-muted-foreground">Aucune demande à cette étape.</p>}
            {items.map(request => <Card key={request.id}><CardContent className="space-y-3 p-4">
              <Link className="font-semibold underline underline-offset-4" href={`/dashboard/demandes/${request.id}`}>{request.clientName || 'Client non renseigné'}</Link>
              <p className="line-clamp-3 text-sm">{request.projectDescription || 'Projet à préciser'}</p>
              {request.postalCode && <p className="text-sm text-muted-foreground">{request.postalCode}</p>}
              <p className="text-xs text-muted-foreground">Origine déclarée : {leadSourceLabel(request.leadSourceMethod === 'self-reported' ? request.leadSource : null)}</p>
              {stages.get(request.id)?.quotes.map(quote => <Link key={quote.id} href={`/dashboard/devis/${quote.id}`} className="block text-sm underline underline-offset-4">Devis : {quote.status || 'Statut à préciser'}</Link>)}
              {!stages.get(request.id)?.quotes.length && <p className="text-xs text-muted-foreground">Aucun devis lié. Qualification à effectuer par l’équipe.</p>}
            </CardContent></Card>)}
          </div>
        </section>;
      })}
    </div>
  </div>;
}
