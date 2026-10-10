import type { NextRequest } from 'next/server';

// In-memory limiter: enough while App Hosting runs a single instance (apphosting.yaml maxInstances: 1).
const hits = new Map<string, number[]>();

export function clientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.ip || 'unknown';
}

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter(time => now - time < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, times] of hits) if (times.every(time => now - time >= windowMs)) hits.delete(k);
  }
  return recent.length > limit;
}
