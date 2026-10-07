import { pageMetadata } from '@/lib/seo/metadata';
import PageClient from './page-client';

export const metadata = pageMetadata("/realisations", "Réalisations : appartements et salles de bain rénovés", "Découvrez les réalisations ERG Rénovation : photos avant et après, travaux réalisés et solutions pour appartements, cuisines et salles de bain.");

export default function Page() { return <PageClient />; }
