import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { services, allProjects } from '@/lib/data.tsx';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import CtaBanner from '@/app/_components/cta-banner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Award } from 'lucide-react';
import AnimatedSection from '@/components/animated-section';

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const relatedProjects = allProjects.filter(p => service.relatedProjectSlugs.includes(p.slug));
  const serviceImage = PlaceHolderImages.find(p => p.id === service.heroImageId);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] w-full">
          {serviceImage && (
            <Image
              src={serviceImage.imageUrl}
              alt={service.title}
              fill
              className="object-cover"
              priority
              data-ai-hint={serviceImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-primary/60" />
          <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
            <div className='flex items-center gap-4 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20'>
              <service.icon className="h-6 w-6 text-accent" />
              <p className="text-sm font-medium">Service</p>
            </div>
            <h1 className="mt-4 font-headline text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              {service.title}
            </h1>
          </div>
        </section>

        {/* Main Content */}
        <AnimatedSection>
          <div className="container py-16 md:py-24">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
              {/* Left Column (Description) */}
              <div className="lg:col-span-2">
                <h2 className="font-headline text-3xl font-bold">
                  Une expertise complète pour votre projet de {service.title.toLowerCase()}
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  {service.longDescription}
                </p>

                <div className="mt-12">
                  <h3 className="font-headline text-2xl font-semibold">Les points clés de notre intervention</h3>
                  <ul className="mt-6 space-y-6">
                    {service.benefits.map((benefit) => (
                      <li key={benefit.title} className="flex items-start gap-4">
                        <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                        <div>
                          <h4 className="font-semibold">{benefit.title}</h4>
                          <p className="text-muted-foreground">{benefit.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column (Quick Info & Other Services) */}
              <div className="space-y-8">
                <Card className="bg-secondary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline">
                      <Award className="h-6 w-6 text-accent" />
                      Notre Engagement Qualité
                    </CardTitle>
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

                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline">Nos autres services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {services
                        .filter(s => s.slug !== service.slug)
                        .slice(0, 4)
                        .map(otherService => (
                          <li key={otherService.slug}>
                            <Button variant="ghost" asChild className="w-full justify-start text-muted-foreground hover:text-accent">
                              <Link href={`/services/${otherService.slug}`}>
                                <otherService.icon className="mr-3 h-4 w-4" />
                                {otherService.title}
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
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <AnimatedSection>
            <section className="bg-secondary py-16 md:py-24">
              <div className="container">
                <h2 className="text-center font-headline text-3xl font-bold">
                  Nos réalisations en {service.title.toLowerCase()}
                </h2>
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedProjects.map((project) => {
                    const projectImage = PlaceHolderImages.find(img => img.id === project.images.after);
                    return (
                      <Card key={project.slug} className="group overflow-hidden">
                        <CardContent className="p-0">
                          <div className="relative h-56 w-full">
                            {projectImage && (
                              <Image
                                src={projectImage.imageUrl}
                                alt={project.description}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={projectImage.imageHint}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            )}
                          </div>
                        </CardContent>
                        <CardHeader>
                          <Badge variant="secondary" className="w-fit">{project.category}</Badge>
                          <CardTitle className="pt-2 font-headline text-xl">{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Button variant="link" asChild className="p-0 text-accent hover:text-accent">
                            <Link href={`/realisations/${project.slug}`}>
                              Voir le projet <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                <div className="mt-12 text-center">
                  <Button asChild size="lg">
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
