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
import { quoteOriginPages, quoteOriginFromRequest, quoteOriginLabel } from '@/lib/quote-project';
import { requestPipelineStages, requestInPeriod, type PipelineQuote } from '@/lib/crm/request-pipeline';

const STAGES = [
  { id: 'lead', label: 'À qualifier' },
  { id: 'quoting', label: 'Devis en préparation' },
  { id: 'sent', label: 'Devis envoyé' },
  { id: 'won', label: 'Devis accepté / facturé' },
  { id: 'lost', label: 'Devis refusé' },
] as const;
type Request = {
  createdAt?: unknown;
  clientName?: string;
  projectDescription?: string;
  postalCode?: string;
  status?: string;
  leadSource?: string | null;
  leadSourceMethod?: string | null;
  quoteOriginPage?: string | null;
  quoteOriginMethod?: string | null;
};

export default function PipelinePage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const isAdmin = user?.uid === COMPANY.adminUid;
  const [search, setSearch] = useState('');
  const [originFilter, setOriginFilter] = useState('all');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
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
    requestInPeriod(request.createdAt, from, to) &&
    (originFilter === 'all' || (quoteOriginFromRequest(request) ?? 'unknown') === originFilter) &&
    [request.clientName, request.projectDescription, request.postalCode].some(value =>
      (value ?? '').toLocaleLowerCase('fr').includes(search.trim().toLocaleLowerCase('fr')))),
  [requests.data, search, originFilter, from, to]);
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
      <CardDescription>{from || to ? 'Demandes reçues dans la période sélectionnée' : 'Toutes périodes confondues'}, hors demandes archivées, selon les filtres ci-dessous. Les étapes correspondent au statut actuel des devis associés, même si celui-ci a changé après la période. Un devis accepté ou facturé est un statut CRM ; ce tableau ne vérifie pas les signatures et ne mesure pas les encaissements. Une demande « traitée » ne devient jamais automatiquement gagnée.</CardDescription>
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
      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="pipeline-from" className="mb-2 block text-sm font-medium">Demandes reçues à partir du</label><Input id="pipeline-from" type="date" value={from} max={to || undefined} onChange={event => setFrom(event.target.value)} /></div>
        <div><label htmlFor="pipeline-to" className="mb-2 block text-sm font-medium">Jusqu’au (inclus)</label><Input id="pipeline-to" type="date" value={to} min={from || undefined} onChange={event => setTo(event.target.value)} /></div>
      </div>
      {(from || to) && <p className="mb-4 text-sm text-muted-foreground">Dates du calendrier local. Les demandes sans date exploitable sont exclues de cette période. <button type="button" className="underline underline-offset-4" onClick={() => { setFrom(''); setTo(''); }}>Toutes les dates</button></p>}
      {from && to && from > to && <p role="alert" className="mb-4 text-sm text-destructive">La date de début doit précéder la date de fin.</p>}
      <label htmlFor="pipeline-search" className="mb-2 block text-sm font-medium">Rechercher un client, un projet ou un code postal</label>
      <Input id="pipeline-search" value={search} onChange={event => setSearch(event.target.value)} />
      <label htmlFor="pipeline-origin" className="mb-2 mt-4 block text-sm font-medium">Page associée au lien de demande</label>
      <select id="pipeline-origin" value={originFilter} onChange={event => setOriginFilter(event.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
        <option value="all">Toutes les pages et demandes</option>
        {quoteOriginPages.map(page => <option key={page.path} value={page.path}>{page.label}</option>)}
        <option value="unknown">Page non renseignée</option>
      </select>
      <p className="mt-2 text-xs text-muted-foreground">Contexte transmis par certains liens du site, sans suivi de navigation. Une demande directe ou ancienne peut rester non renseignée.</p>
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
              <p className="text-xs text-muted-foreground">Page du lien : {quoteOriginLabel(quoteOriginFromRequest(request))}</p>
              {stages.get(request.id)?.quotes.map(quote => <Link key={quote.id} href={`/dashboard/devis/${quote.id}`} className="block text-sm underline underline-offset-4">Devis : {quote.status || 'Statut à préciser'}</Link>)}
              {!stages.get(request.id)?.quotes.length && <p className="text-xs text-muted-foreground">Aucun devis lié. Qualification à effectuer par l’équipe.</p>}
            </CardContent></Card>)}
          </div>
        </section>;
      })}
    </div>
  </div>;
}
