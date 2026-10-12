import scope from './insurance-scope.json';

/** Trades covered by the décennale insurance (Allianz Solution BTP n° 62929418). */
export const INSURED_TRADES = ['Électricité', 'Peinture et décoration intérieure', 'Plomberie et sanitaires'] as const;

/** Service pages kept in the code but not published while their trades are not insured. */
export const UNPUBLISHED_SERVICE_SLUGS: readonly string[] = scope.unpublishedServiceSlugs;

export const isPublishedService = (slug: string) => !UNPUBLISHED_SERVICE_SLUGS.includes(slug);
