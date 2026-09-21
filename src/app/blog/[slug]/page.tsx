import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts, services } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import CtaBanner from '@/app/_components/cta-banner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Calendar, User, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Breadcrumbs from '@/components/breadcrumbs';
import TableOfContents from '@/components/table-of-contents';
import { cn } from '@/lib/utils';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const featuredImage = PlaceHolderImages.find(p => p.id === post.featuredImageId);
  const authorImage = PlaceHolderImages.find(p => p.id === (post.author === 'A. AIT' ? 'founder-2' : 'founder-1'));
  const otherPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50">
      <SiteHeader />
      <main className="flex-grow">
        {/* Post Header Banner */}
        <section className="relative h-[45vh] min-h-[360px] w-full overflow-hidden bg-slate-900">
          {featuredImage && (
            <Image
              src={featuredImage.imageUrl}
              alt={post.title}
              fill
              className="object-cover opacity-40 blur-xs scale-105"
              priority
              data-ai-hint={featuredImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/50" />
          
          <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white space-y-4">
            <Breadcrumbs variant="dark" />
            
            <div className="flex flex-wrap items-center justify-center gap-2">
              {post.tags && post.tags.map(tag => (
                <span key={tag} className="rounded-full bg-amber-500/20 border border-amber-400/40 px-3.5 py-1 text-xs font-bold text-amber-300">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-4xl">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-amber-400" />
                <span>{post.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <time dateTime={post.date}>{format(new Date(post.date), "d MMMM yyyy", { locale: fr })}</time>
              </div>
            </div>
          </div>
        </section>

        {/* Post Content */}
        <div className="container py-12 md:py-20">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-16">
            {/* Main Article Content */}
            <div className="lg:col-span-3">
              <article className="prose prose-slate max-w-none prose-headings:font-headline prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-amber-600 hover:prose-a:text-amber-700 prose-strong:text-slate-900 prose-img:rounded-2xl text-slate-700 text-base leading-relaxed">
                {post.content}
              </article>

              {/* Author Reassurance Footer Box */}
              <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-center gap-6">
                <Avatar className="h-20 w-20 ring-4 ring-amber-500/30 shrink-0">
                  {authorImage && <AvatarImage src={authorImage.imageUrl} alt={`Portrait de ${post.author}`} data-ai-hint={authorImage.imageHint} />}
                  <AvatarFallback className="bg-slate-900 text-amber-400 font-extrabold">{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="space-y-2 text-center sm:text-left">
                  <h4 className="font-headline text-lg font-bold text-slate-900">À propos de l'auteur : {post.author}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Co-fondateur d'ERG Rénovation et expert en rénovation intérieure à Paris. Il veille à la qualité d'exécution des chantiers et partage ses conseils pratiques pour des projets réussis.
                  </p>
                  <div className="pt-1 flex items-center justify-center sm:justify-start gap-3">
                    <Button asChild size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs">
                      <Link href="/devis">Demander un devis</Link>
                    </Button>
                    <Button asChild size="sm" variant="outline" className="border-slate-300 text-slate-900 rounded-xl text-xs">
                      <Link href="/contact">Nous contacter</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-28 h-fit">
              {/* Author Card */}
              <Card className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <CardHeader className="p-0 space-y-3">
                  <div className="flex justify-center">
                    <Avatar className="h-20 w-20 ring-4 ring-amber-500/30">
                      {authorImage && <AvatarImage src={authorImage.imageUrl} alt={`Portrait de ${post.author}`} data-ai-hint={authorImage.imageHint} />}
                      <AvatarFallback className="bg-slate-900 text-amber-400 font-extrabold">{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="font-headline text-lg font-bold text-slate-900">
                    Écrit par {post.author}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-3">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Expert BTP & co-fondateur d'ERG Rénovation à Paris et Île-de-France.
                  </p>
                </CardContent>
              </Card>

              {post.toc && post.toc.length > 0 && (
                <TableOfContents sections={post.toc} />
              )}

              {/* Services Navigation */}
              <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <CardHeader className="p-0 pb-3">
                  <CardTitle className="font-headline text-lg font-bold text-slate-900">Nos Prestations</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-2">
                  <ul className="space-y-1">
                    {services
                      .slice(0, 5)
                      .map(service => (
                        <li key={service.slug}>
                          <Link
                            href={`/services/${service.slug}`}
                            className={cn(
                              "flex items-center gap-2.5 rounded-xl p-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-amber-700 transition-colors"
                            )}
                          >
                            <service.icon className="h-4 w-4 shrink-0 text-amber-600" />
                            <span className="truncate">{service.title}</span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                  <Button variant="outline" asChild className="mt-4 w-full border-slate-300 font-semibold text-slate-900 hover:bg-slate-100 rounded-xl text-xs">
                    <Link href="/services">Voir tous nos services</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Related Posts */}
              {otherPosts.length > 0 && (
                <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <CardHeader className="p-0 pb-3">
                    <CardTitle className="font-headline text-lg font-bold text-slate-900">À lire aussi</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-4">
                    {otherPosts.map(otherPost => {
                      const otherPostImage = PlaceHolderImages.find(p => p.id === otherPost.featuredImageId);
                      return (
                        <Link href={`/blog/${otherPost.slug}`} key={otherPost.slug} className="group flex items-center gap-3">
                          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-200">
                            {otherPostImage && (
                              <Image 
                                src={otherPostImage.imageUrl}
                                alt={otherPost.title}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                                sizes="56px"
                              />
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-tight">
                              {otherPost.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-1">
                              {format(new Date(otherPost.date), "d MMMM yyyy", { locale: fr })}
                            </p>
                          </div>
                        </Link>
                      )
                    })}
                  </CardContent>
                </Card>
              )}
            </aside>
          </div>
        </div>
        
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
