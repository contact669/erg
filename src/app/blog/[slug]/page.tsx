
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts, services } from '@/lib/data.tsx';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import CtaBanner from '@/app/_components/cta-banner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Calendar, User, Award } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Breadcrumbs from '@/components/breadcrumbs';

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
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-grow">
        {/* Post Header */}
        <section className="relative h-[50vh] min-h-[350px] w-full">
          {featuredImage && (
            <Image
              src={featuredImage.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              data-ai-hint={featuredImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-primary/70" />
          <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
             <Breadcrumbs />
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4">
              {post.tags.map(tag => (
                 <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-none">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="mt-4 font-headline text-4xl font-bold leading-tight md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>{format(new Date(post.date), "d MMMM yyyy", { locale: fr })}</time>
                </div>
            </div>
          </div>
        </section>

        {/* Post Content */}
        <div className="container py-16 md:py-24">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div className="prose max-w-none text-foreground prose-headings:font-headline prose-headings:text-primary prose-a:text-accent prose-strong:text-foreground">
                       {post.content}
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="space-y-8">
                     <Card className="bg-secondary text-center">
                        <CardHeader>
                            <div className="flex justify-center">
                                <Avatar className="h-24 w-24 border-4 border-accent">
                                    {authorImage && <AvatarImage src={authorImage.imageUrl} alt={`Portrait de ${post.author}`} data-ai-hint={authorImage.imageHint} />}
                                    <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                            </div>
                            <CardTitle className="pt-4">
                                Écrit par {post.author}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Expert en rénovation et co-fondateur d'ERG Rénovation, {post.author} partage son expérience pour vous aider à réussir vos projets.</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Nos services</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                            {services
                                .slice(0, 5)
                                .map(service => (
                                <li key={service.slug}>
                                    <Button variant="ghost" asChild className="w-full justify-start text-muted-foreground hover:text-accent">
                                    <Link href={`/services/${service.slug}`}>
                                        <service.icon className="mr-3 h-4 w-4" />
                                        {service.title}
                                    </Link>
                                    </Button>
                                </li>
                                ))}
                            </ul>
                            <Button variant="outline" asChild className="mt-4 w-full">
                            <Link href="/services">Voir tous les services</Link>
                            </Button>
                        </CardContent>
                    </Card>

                     {otherPosts.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">À lire aussi</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {otherPosts.map(otherPost => {
                                    const otherPostImage = PlaceHolderImages.find(p => p.id === otherPost.featuredImageId);
                                    return (
                                        <Link href={`/blog/${otherPost.slug}`} key={otherPost.slug} className="group flex items-center gap-4">
                                             <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                                                {otherPostImage && (
                                                    <Image 
                                                        src={otherPostImage.imageUrl}
                                                        alt={otherPost.title}
                                                        fill
                                                        className="object-cover transition-transform group-hover:scale-105"
                                                        sizes="64px"
                                                    />
                                                )}
                                             </div>
                                            <div>
                                                <h4 className="font-semibold leading-tight group-hover:text-accent">{otherPost.title}</h4>
                                                <p className="text-xs text-muted-foreground mt-1">{format(new Date(otherPost.date), "d MMMM yyyy", { locale: fr })}</p>
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

    