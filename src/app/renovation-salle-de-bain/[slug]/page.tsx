
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { localLandingPages } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import CtaBanner from '@/app/_components/cta-banner';
import { Button } from '@/components/ui/button';
import { CheckCircle, Award, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/animated-section';
import type { Metadata, ResolvingMetadata } from 'next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Breadcrumbs from '@/components/breadcrumbs';


type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = localLandingPages.find((p) => p.slug === params.slug && p.parentService.slug === 'renovation-salle-de-bain');

  if (!page) {
    return {
      title: 'Page non trouvée',
    }
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
  }
}

export async function generateStaticParams() {
  return localLandingPages
    .filter(p => p.parentService.slug === 'renovation-salle-de-bain')
    .map((page) => ({
      slug: page.slug,
  }));
}

export default function LocalLandingPage({ params }: { params: { slug: string } }) {
  const page = localLandingPages.find((p) => p.slug === params.slug && p.parentService.slug === 'renovation-salle-de-bain');

  if (!page) {
    notFound();
  }

  const { parentService } = page;
  const heroImage = PlaceHolderImages.find(p => p.id === parentService.heroImageId);
  const testimonialAvatar = PlaceHolderImages.find(p => p.id === 'testimonial-avatar-2');
  const departmentImage = PlaceHolderImages.find(p => p.id === 'project-bathroom-1');


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <section className="relative bg-primary text-primary-foreground py-16 md:py-24">
           {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={page.title}
              fill
              className="object-cover opacity-10"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="container relative z-10">
            <h1 className="font-headline text-4xl font-bold leading-tight md:text-5xl lg:text-6xl max-w-4xl mt-4">
              {page.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-primary-foreground/80 md:leading-relaxed">
              {page.introduction}
            </p>
             <div className="mt-8">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/devis">{page.cta.primary}</Link>
                </Button>
            </div>
             <div className="mt-6 flex flex-col sm:flex-row gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
                {page.reassurancePoints.map((point) => (
                    <div key={point} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        <span>{point}</span>
                    </div>
                ))}
            </div>
          </div>
        </section>

        {/* --- Main Content --- */}
        <AnimatedSection>
          <div className="container py-16 md:py-24">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-3">

              {/* Left/Main Column */}
              <div className="lg:col-span-2 space-y-12">
                <section>
                    <div className="prose max-w-none text-foreground prose-headings:font-headline prose-p:text-muted-foreground prose-headings:text-primary prose-a:text-accent prose-strong:text-foreground">
                        {page.mainContent}
                    </div>

                    {page.relatedLocations && (
                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {page.relatedLocations.map(location => (
                                <Button asChild variant="outline" key={location.slug}>
                                    <Link href={`/${parentService.slug}/${location.slug}`}>
                                        {location.name} <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    )}
                </section>
                
                {/* --- Testimonial Section --- */}
                <section>
                     <Card className="bg-secondary/50 border-0 shadow-none">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-6">
                                {testimonialAvatar && (
                                <Avatar className="h-16 w-16 border-2 border-accent hidden sm:flex">
                                    <AvatarImage src={testimonialAvatar.imageUrl} alt={page.testimonial.author} data-ai-hint={testimonialAvatar.imageHint}/>
                                    <AvatarFallback>{page.testimonial.author.split(',')[0].split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                )}
                                <div>
                                    <p className="text-lg italic text-foreground">&ldquo;{page.testimonial.quote}&rdquo;</p>
                                    <p className="mt-4 font-semibold text-primary">{page.testimonial.author}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <Button asChild size="lg" variant="outline">
                        <Link href={`/services/${parentService.slug}`}>{`En savoir plus sur la ${parentService.title}`}</Link>
                    </Button>
                </section>

              </div>

              {/* Right Column (Sidebar) */}
              <aside className="space-y-8 lg:sticky lg:top-28 h-fit">
                <Card className="bg-secondary">
                  <CardHeader>
                    <CardContent className="flex items-center gap-3 font-headline p-0">
                      <Award className="h-6 w-6 text-accent" />
                      Notre Engagement Qualité
                    </CardContent>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>✓ Devis rapide et transparent</p>
                    <p>✓ Interlocuteur unique</p>
                    <p>✓ Artisans qualifiés</p>
                    <p>✓ Respect des délais</p>
                    <p>✓ Garantie décennale</p>
                    <Button asChild className="mt-4 w-full">
                      <Link href="/devis">Obtenir mon devis</Link>
                    </Button>
                  </CardContent>
                </Card>

                {parentService.relatedProjectSlugs.length > 0 && departmentImage && (
                     <Card>
                        <CardHeader>
                            <CardContent className='p-0 font-headline'>
                                {page.type === 'department' 
                                ? `Nos réalisations dans le ${page.slug === 'paris-75' ? '75' : page.slug.split('-')[2]}`
                                : `Nos réalisations à ${page.title.split('(')[0].trim()}`
                                }
                            </CardContent>
                        </CardHeader>
                        <CardContent>
                            <div className="relative h-48 w-full rounded-md overflow-hidden">
                                <Image
                                    src={departmentImage.imageUrl}
                                    alt={`Réalisation à ${page.title}`}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={departmentImage.imageHint}
                                />
                            </div>
                            <Button variant="outline" asChild className="mt-4 w-full">
                                <Link href="/realisations">{page.cta.secondary}</Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
              </aside>
            </div>
          </div>
        </AnimatedSection>

        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
