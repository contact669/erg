import { collection, getDocs, type Firestore } from 'firebase/firestore';

const DIGITS = 5;

/**
 * Next number in an uninterrupted yearly sequence, e.g. DEV-2026-00001, DEV-2026-00002…
 * Older random numbers (DEV-2026-4821) have fewer digits and are ignored, so they never
 * push the sequence forward.
 */
export function nextNumberFrom(existing: Array<string | undefined>, prefix: string, year: number): string {
  const pattern = new RegExp(`^${prefix}-${year}-(\\d{${DIGITS}})$`);
  const highest = existing.reduce((max, number) => {
    const match = number?.match(pattern);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);
  return `${prefix}-${year}-${String(highest + 1).padStart(DIGITS, '0')}`;
}

export async function nextQuoteNumber(firestore: Firestore, date = new Date()): Promise<string> {
  const snapshot = await getDocs(collection(firestore, 'quotes'));
  return nextNumberFrom(snapshot.docs.map((d) => d.get('number')), 'DEV', date.getFullYear());
}

/**
 * Next number of a running series without year, e.g. F00307 after F00306. `floor` is the last number
 * issued before the CRM, so the series carries on without gap or duplicate.
 */
export function nextRunningNumber(existing: Array<string | undefined>, prefix: string, floor = 0): string {
  const pattern = new RegExp(`^${prefix}(\\d{${DIGITS}})$`);
  const highest = existing.reduce((max, number) => {
    const match = number?.match(pattern);
    return match ? Math.max(max, Number(match[1])) : max;
  }, floor);
  return `${prefix}${String(highest + 1).padStart(DIGITS, '0')}`;
}
