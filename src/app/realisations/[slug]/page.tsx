
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { allProjects } from '@/lib/data.tsx';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import CtaBanner from '@/app/_components/cta-banner';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Star, Sparkles, Award } from 'lucide-react';
import AnimatedSection from '@/components/animated-section';
import Breadcrumbs from '@/components/breadcrumbs';
import type { Metadata } from 'next';


export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = allProjects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Projet non trouvé',
    }
  }

  return {
    title: `${project.title} | ERG Rénovation`,
    description: `Découvrez en détail le projet ${project.title}. ${project.description}`,
  }
}


export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = allProjects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const beforeImage = PlaceHolderImages.find(p => p.id === project.images.before);
  const afterImage = PlaceHolderImages.find(p => p.id === project.images.after);
  const relatedProjects = allProjects.filter(p => p.category === project.category && p.slug !== project.slug).slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-grow">
        {/* Project Header */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container">
            <Breadcrumbs />
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="default" className="mb-4 mt-4">{project.category}</Badge>
              <h1 className="font-headline text-4xl font-bold md:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {project.description}
              </p>
            </div>
          </div>
        </section>

        {/* Before/After Section */}
        <AnimatedSection>
          <div className="container py-16 md:py-24">
             <Tabs defaultValue="after" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mx-auto max-w-md">
                    <TabsTrigger value="before">Avant</TabsTrigger>
                    <TabsTrigger value="after">
                        <Sparkles className="mr-2 h-4 w-4 text-amber-300" />
                        Après
                    </TabsTrigger>
                </TabsList>
                <div className="mt-8 rounded-lg overflow-hidden border shadow-lg">
                    <TabsContent value="before" className="m-0">
                        {beforeImage && (
                            <div className="relative aspect-video w-full">
                                <Image src={beforeImage.imageUrl} alt={`Avant - ${project.title}`} fill className="object-cover" data-ai-hint={beforeImage.imageHint} />
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="after" className="m-0">
                         {afterImage && (
                            <div className="relative aspect-video w-full">
                                <Image src={afterImage.imageUrl} alt={`Après - ${project.title}`} fill className="object-cover" data-ai-hint={afterImage.imageHint} />
                            </div>
                        )}
                    </TabsContent>
                </div>
            </Tabs>
          </div>
        </AnimatedSection>
        
        {/* Project Details Section */}
        <div className="container pb-16 md:pb-24">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
                <div className="lg:col-span-2 space-y-12">
                     {project.details && (
                        <>
                            <section>
                                <h2 className="font-headline text-3xl font-bold">Le Défi</h2>
                                <div className="prose max-w-none text-muted-foreground mt-4 prose-p:my-4">
                                   {project.details.challenge}
                                </div>
                            </section>
                            <section>
                                <h2 className="font-headline text-3xl font-bold">Notre Solution</h2>
                                <div className="prose max-w-none text-muted-foreground mt-4 prose-p:my-4">
                                    {project.details.solution}
                                </div>
                            </section>
                        </>
                    )}
                    {project.testimonial && (
                        <section>
                            <h2 className="font-headline text-3xl font-bold mb-6">L'avis de notre client</h2>
                            <Card className="bg-secondary/50 border-0 shadow-none">
                                <CardContent className="p-8">
                                    <div className="flex items-center mb-2">
                                        {Array(5).fill(0).map((_, i) => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
                                    </div>
                                    <p className="text-lg italic text-foreground">&ldquo;{project.testimonial.quote}&rdquo;</p>
                                    <p className="mt-4 font-semibold text-primary">{project.testimonial.author}</p>
                                </CardContent>
                            </Card>
                        </section>
                    )}
                </div>
                <aside className="space-y-8 lg:sticky lg:top-28 h-fit">
                    {project.details && project.details.keyPoints.length > 0 && (
                        <Card className="bg-secondary">
                          <CardHeader>
                            <CardTitle className="font-headline text-xl">Points Clés du Projet</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {project.details.keyPoints.map(point => (
                                <div key={point.title} className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <point.icon className="h-5 w-5 flex-shrink-0 text-accent" />
                                    <span className="font-medium text-foreground">{point.title}</span>
                                </div>
                            ))}
                          </CardContent>
                        </Card>
                    )}
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Un projet similaire ?</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-sm text-muted-foreground mb-4">Discutons ensemble de vos envies et transformons votre espace.</p>
                           <Button asChild className="w-full">
                            <Link href="/devis">Demander un devis gratuit</Link>
                           </Button>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <AnimatedSection>
            <section className="bg-secondary py-16 md:py-24">
              <div className="container">
                <h2 className="text-center font-headline text-3xl font-bold">
                  Autres réalisations similaires
                </h2>
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedProjects.map((relatedProject) => {
                     const image = PlaceHolderImages.find(p => p.id === relatedProject.images.after);
                     return (
                        <Link href={`/realisations/${relatedProject.slug}`} key={relatedProject.slug} className="group block">
                            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                <div className="relative h-56 w-full">
                                    {image && <Image src={image.imageUrl} alt={relatedProject.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" data-ai-hint={image.imageHint} />}
                                </div>
                                <CardContent className="p-6">
                                    <Badge variant="secondary" className="w-fit">{relatedProject.category}</Badge>
                                    <CardTitle className="font-headline text-xl font-bold mt-2 group-hover:text-accent">
                                        {relatedProject.title}
                                    </CardTitle>
                                </CardContent>
                                <CardFooter>
                                    <span className="font-semibold text-accent group-hover:underline">
                                        Voir le projet <ArrowRight className="ml-1 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </CardFooter>
                            </Card>
                        </Link>
                     )
                  })}
                </div>
                <div className="mt-12 text-center">
                  <Button asChild size="lg" variant="outline">
                    <Link href="/realisations">Voir toutes nos réalisations</Link>
                  </Button>
                </div>
              </div>
            </section>
          </AnimatedSection>
        )}
        
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}

    
