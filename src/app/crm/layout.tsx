import { privateMetadata } from '@/lib/seo/metadata';
import { FirebaseClientProvider } from '@/firebase/client-provider';
export const metadata = privateMetadata;
export default function Layout({ children }: { children: React.ReactNode }) { return <FirebaseClientProvider>{children}</FirebaseClientProvider>; }
