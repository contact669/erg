import Link from 'next/link';
import { renovationGuides } from '@/lib/seo/renovation-guides';

export default function RelatedGuides({ serviceSlug, projectSlug }: { serviceSlug?: string; projectSlug?: string }) {
  const guides = renovationGuides.filter(guide =>
    (serviceSlug && guide.relatedServiceSlugs?.includes(serviceSlug)) ||
    (projectSlug && guide.relatedProjectSlugs?.includes(projectSlug)) ||
    (!serviceSlug && !projectSlug),
  );
  if (!guides.length) return null;
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-12 md:py-16">
      <div className="container">
        <h2 className="font-headline text-2xl font-bold text-slate-900">Préparer vos travaux : nos guides pratiques</h2>
        <p className="mt-3 max-w-2xl text-slate-600">Budget, choix techniques et lecture du devis : les questions à éclaircir avant de lancer votre projet.</p>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {guides.map(guide => (
            <li key={guide.slug} className="rounded-2xl border border-slate-200 bg-white p-6">
              <Link href={`/blog/${guide.slug}`} className="font-semibold text-slate-900 underline decoration-amber-500 underline-offset-4 hover:text-amber-700">{guide.title}</Link>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{guide.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
