import { pageMetadata } from '@/lib/seo/metadata';
import PageClient from './page-client';

export const metadata = pageMetadata("/contact", "Contact — votre projet de rénovation à Paris", "Contactez ERG Rénovation pour vos travaux à Paris et en Île-de-France. Décrivez votre projet ou appelez le 06 99 96 13 75.");

export default function Page() { return <PageClient />; }
