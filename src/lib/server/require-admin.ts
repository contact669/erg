import type { NextRequest } from 'next/server';
import { COMPANY } from '@/lib/company';

// Verifies the Firebase ID token sent by the CRM and checks it belongs to the admin account.
export async function isAdminRequest(req: NextRequest): Promise<boolean> {
  const token = req.headers.get('authorization')?.match(/^Bearer (.+)$/)?.[1];
  if (!token) return false;
  try {
    const { adminAuth } = await import('@/firebase/admin');
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded.uid === COMPANY.adminUid;
  } catch (error) {
    console.error('Admin token verification failed:', error);
    return false;
  }
}
