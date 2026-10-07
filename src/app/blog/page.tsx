import { pageMetadata } from '@/lib/seo/metadata';
import PageClient from './page-client';

export const metadata = pageMetadata("/blog", "Conseils rénovation : budget, délais et préparation", "Guides pour préparer vos travaux : rénovation d’appartement, salle de bain, budget et choix des artisans à Paris et en Île-de-France.");

export default function Page() { return <PageClient />; }
