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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowRight, CheckCircle, Award, ShieldCheck, Clock, Coins } from 'lucide-react';
import AnimatedSection from '@/components/animated-section';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: 'Service non trouvé',
    }
  }

  // Si c'est la page de rénovation d'appartement, on utilise les métadonnées SEO spécifiques
  if (service.slug === 'renovation-appartement') {
    return {
      title: "Rénovation Appartement Paris & IDF (92, 93, 94, 78) | ERG Rénovation",
      description: "Confiez votre projet de rénovation d'appartement à Paris et IDF à ERG Rénovation. Expertise haut de gamme, gestion de A à Z, devis sur-mesure.",
    }
  }

  // Sinon, on génère des métadonnées standards
  return {
    title: `${service.title} | ERG Rénovation`,
    description: service.longDescription.substring(0, 155) + '...',
  }
}


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
  const isPillarPage = service.slug === 'renovation-appartement';

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <section className="relative bg-primary text-primary-foreground py-16 md:py-24">
           {serviceImage && (
            <Image
              src={serviceImage.imageUrl}
              alt={service.title}
              fill
              className="object-cover opacity-10"
              priority
              data-ai-hint={serviceImage.imageHint}
            />
          )}
          <div className="container relative z-10">
            <h1 className="font-headline text-4xl font-bold leading-tight md:text-5xl lg:text-6xl max-w-4xl">
              {isPillarPage ? "Rénovation d'Appartement à Paris et Île-de-France : L'Excellence par ERG Rénovation" : service.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-primary-foreground/80">
              {isPillarPage ? "Transformer un appartement parisien ou francilien en un lieu de vie exceptionnel exige une expertise de la structure, une gestion de projet rigoureuse et une passion pour les finitions parfaites. Nous gérons chaque détail de votre projet à Paris, dans les Hauts-de-Seine (92), la Seine-Saint-Denis (93), le Val-de-Marne (94) et les Yvelines (78)." : service.longDescription}
            </p>
             <div className="mt-8">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/devis">Obtenir mon devis personnalisé</Link>
                </Button>
            </div>
             <div className="mt-6 flex flex-col sm:flex-row gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-accent" />
                    <span>Gestion de projet A à Z</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-accent" />
                    <span>Garantie décennale</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent" />
                    <span>Respect des délais et du budget</span>
                </div>
            </div>
          </div>
        </section>

        {/* --- Main Content --- */}
        <AnimatedSection>
          <div className="container py-16 md:py-24">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-3">

              {/* Left/Main Column */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* --- Prestations Section --- */}
                <section>
                    <h2 className="font-headline text-3xl font-bold">
                        {isPillarPage ? "Nos Prestations de Rénovation sur Mesure" : "Une expertise complète pour votre projet"}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        {isPillarPage ? "Que vous envisagiez une refonte complète de votre bien, la modernisation d'un appartement ancien ou la rénovation énergétique, ERG Rénovation orchestre tous les corps de métier pour un résultat impeccable." : service.longDescription }
                    </p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {service.benefits.map((benefit) => (
                        <div key={benefit.title} className="flex items-start gap-4">
                            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                            <div>
                            <h3 className="font-headline font-semibold text-lg">{benefit.title}</h3>
                            <p className="text-muted-foreground">{benefit.description}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </section>
                
                {/* --- Process Section --- */}
                {service.process && (
                    <section>
                         <h2 className="font-headline text-3xl font-bold">
                            L'Approche ERG Rénovation : Votre Projet en 4 Étapes Clés
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                           La réussite d'une rénovation "haut de gamme" repose sur une méthodologie éprouvée. Nous avons simplifié le processus pour vous garantir une tranquillité d'esprit totale.
                        </p>
                        <div className="mt-8 space-y-8">
                            {service.process.map((step) => (
                                <div key={step.step} className="flex items-start gap-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-accent font-bold font-headline text-xl shrink-0">{`0${step.step}`}</div>
                                    <div>
                                        <h3 className="font-headline font-semibold text-lg">{step.title}</h3>
                                        <p className="text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                         <div className="mt-10">
                            <Button asChild size="lg" variant="outline">
                                <Link href="/realisations">Découvrir nos réalisations (Avant/Après)</Link>
                            </Button>
                        </div>
                    </section>
                )}
                
                 {/* --- Pourquoi Nous Choisir Section --- */}
                {service.whyUs && (
                    <section>
                        <h2 className="font-headline text-3xl font-bold">
                           Pourquoi Confier Votre Appartement Parisien à ERG Rénovation ?
                        </h2>
                        <div className="mt-8 space-y-6">
                            {service.whyUs.map((item) => (
                                <Card key={item.title} className="bg-secondary/50">
                                    <CardHeader className="flex flex-row items-center gap-4">
                                         <div className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary text-primary shrink-0">
                                            <item.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="font-headline font-semibold text-lg">{item.title}</h3>
                                    </CardHeader>
                                    <CardContent className='pt-0'>
                                        <p className="text-muted-foreground">{item.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}


                {/* --- Zones d'intervention Section --- */}
                {service.zones && (
                    <section>
                        <h2 className="font-headline text-3xl font-bold">
                            Nos Zones d'Intervention Privilégiées en Île-de-France
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            {service.zones.description}
                        </p>
                         <p className="mt-4 text-sm font-semibold text-primary">
                            {service.zones.list}
                        </p>
                    </section>
                )}

                {/* --- FAQ Section --- */}
                {service.faq && service.faq.length > 0 && (
                    <section>
                        <h2 className="font-headline text-3xl font-bold">
                            Questions Fréquentes sur la Rénovation d'Appartement
                        </h2>
                        <Accordion type="single" collapsible className="w-full mt-6">
                            {service.faq.map((item, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground">
                                    {item.answer}
                                </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </section>
                )}

              </div>

              {/* Right Column (Sidebar) */}
              <aside className="space-y-8 lg:sticky lg:top-28 h-fit">
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
              </aside>
            </div>
          </div>
        </AnimatedSection>
        
        {/* --- Related Projects Section --- */}
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