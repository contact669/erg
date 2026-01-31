
import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import CtaBanner from '@/app/_components/cta-banner';
import { blogPosts } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User } from 'lucide-react';
import AnimatedSection from '@/components/animated-section';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Breadcrumbs from '@/components/breadcrumbs';

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);
  const featuredPostImage = PlaceHolderImages.find(p => p.id === featuredPost.featuredImageId);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-grow">
        <section className="bg-secondary py-16 md:py-24">
          <div className="container text-center">
            <div className="mx-auto max-w-3xl">
              <Breadcrumbs />
              <h1 className="font-headline text-4xl font-bold md:text-5xl mt-4">
                Le Blog ERG Rénovation
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Conseils, astuces et inspiration pour tous vos projets de rénovation. Découvrez les coulisses de notre savoir-faire et prenez les bonnes décisions pour votre intérieur.
              </p>
            </div>
          </div>
        </section>
        
        <AnimatedSection>
          <section className="py-16 md:py-24">
            <div className="container">
              {/* Featured Post */}
              {featuredPost && featuredPostImage && (
                <Link href={`/blog/${featuredPost.slug}`} className="group block">
                  <Card className="mb-16 grid grid-cols-1 overflow-hidden md:grid-cols-2 lg:grid-cols-5">
                    <div className="relative h-64 w-full md:h-full lg:col-span-3">
                      <Image
                        src={featuredPostImage.imageUrl}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 60vw"
                        data-ai-hint={featuredPostImage.imageHint}
                        priority
                      />
                    </div>
                    <div className="flex flex-col p-6 lg:col-span-2 lg:p-8">
                      {featuredPost.tags && featuredPost.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {featuredPost.tags.map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      )}
                      <h2 className="mt-4 font-headline text-2xl font-bold lg:text-3xl">
                        {featuredPost.title}
                      </h2>
                      <CardDescription className="mt-4 flex-grow text-base">
                        {featuredPost.description}
                      </CardDescription>
                      <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Par {featuredPost.author}</span>
                        <span>•</span>
                        <time dateTime={featuredPost.date}>{format(new Date(featuredPost.date), "d MMMM yyyy", { locale: fr })}</time>
                      </div>
                      <div className="mt-6 font-semibold text-accent group-hover:underline">
                        Lire l'article <ArrowRight className="ml-1 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Card>
                </Link>
              )}

              {/* Other Posts */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {otherPosts.map((post) => {
                  const postImage = PlaceHolderImages.find(p => p.id === post.featuredImageId);
                  return (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                        <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                            <div className="relative h-56 w-full">
                                {postImage && (
                                    <Image
                                    src={postImage.imageUrl}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    data-ai-hint={postImage.imageHint}
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                     {post.tags && post.tags.length > 0 && (
                                       <div className="flex flex-wrap gap-2">
                                          {post.tags.map(tag => (
                                              <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-none text-xs">
                                                  {tag}
                                              </Badge>
                                          ))}
                                       </div>
                                     )}
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <CardTitle className="font-headline text-xl font-bold group-hover:text-accent">
                                    {post.title}
                                </CardTitle>
                                <CardDescription className="mt-3 text-sm">
                                    {post.description}
                                </CardDescription>
                            </CardContent>
                             <CardFooter className="flex justify-between items-center text-xs text-muted-foreground p-6 pt-0">
                                <div className="flex items-center gap-2">
                                    <User className="h-3.5 w-3.5" /> {post.author}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <time dateTime={post.date}>{format(new Date(post.date), "d MMM yyyy", { locale: fr })}</time>
                                </div>
                            </CardFooter>
                        </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </AnimatedSection>
        
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
