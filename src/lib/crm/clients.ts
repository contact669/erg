import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type Firestore,
} from 'firebase/firestore';

export interface ClientInput {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  source?: 'Site web' | 'Saisie manuelle';
  requestId?: string;
}

export function normalizeEmail(email?: string | null): string {
  return (email ?? '').trim().toLowerCase();
}

/**
 * Returns the id of the client with this email, creating the client when none exists.
 * Clients without an email are always created, since there is nothing reliable to match on.
 */
export async function findOrCreateClient(firestore: Firestore, input: ClientInput): Promise<string> {
  const clients = collection(firestore, 'clients');
  const email = normalizeEmail(input.email);

  if (email) {
    const existing = await getDocs(query(clients, where('email', '==', email), limit(1)));
    if (!existing.empty) {
      const found = existing.docs[0];
      const missing: Record<string, string> = {};
      for (const key of ['phone', 'address', 'postalCode', 'city'] as const) {
        if (input[key] && !found.get(key)) missing[key] = input[key]!;
      }
      if (Object.keys(missing).length) await updateDoc(found.ref, { ...missing, updatedAt: serverTimestamp() });
      return found.id;
    }
  }

  const created = await addDoc(clients, {
    name: input.name.trim(),
    email,
    phone: input.phone?.trim() ?? '',
    address: input.address?.trim() ?? '',
    postalCode: input.postalCode?.trim() ?? '',
    city: input.city?.trim() ?? '',
    status: 'Prospect',
    source: input.source ?? 'Saisie manuelle',
    requestIds: input.requestId ? [input.requestId] : [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return created.id;
}
