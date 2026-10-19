export type PipelineQuote = { id: string; requestId?: string | null; status?: string };
export type RequestStage = 'lead' | 'quoting' | 'sent' | 'won' | 'lost';

/** Commercial evidence comes from private quotes, never public request fields. */
export function requestPipelineStages(requestIds: readonly string[], quotes: readonly PipelineQuote[]) {
  const linked = new Map<string, PipelineQuote[]>();
  for (const quote of quotes) {
    if (!quote.requestId) continue;
    const group = linked.get(quote.requestId) ?? [];
    group.push(quote);
    linked.set(quote.requestId, group);
  }
  return new Map(requestIds.map(id => {
    const records = linked.get(id) ?? [];
    let stage: RequestStage = 'lead';
    if (records.some(q => q.status === 'Accepté' || q.status === 'Facturé')) stage = 'won';
    else if (records.some(q => q.status === 'Envoyé')) stage = 'sent';
    else if (records.length && records.every(q => q.status === 'Refusé')) stage = 'lost';
    else if (records.length) stage = 'quoting';
    return [id, { stage, quotes: records }] as const;
  }));
}
