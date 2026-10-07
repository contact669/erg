import Link from 'next/link';
import { privateMetadata } from '@/lib/seo/metadata';
export const metadata = privateMetadata;
import DashboardSidebar from "./_components/dashboard-sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 print:bg-white print:p-0">
            <div className="print:hidden">
                <DashboardSidebar />
            </div>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 flex-grow print:p-0 print:m-0 print:pl-0">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 print:p-0 print:m-0 print:block">
                    {children}
                </main>
                <footer className="text-center text-sm text-muted-foreground p-6 print:hidden">
                    <p>
                        &copy; {new Date().getFullYear()} ERG Rénovation. Tous droits réservés. | <Link href="/" className="hover:underline">Retour au site</Link>
                    </p>
                </footer>
            </div>
        </div>
    );
}
