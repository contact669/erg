import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { services, allProjects } from '@/lib/data.tsx';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import CtaBanner from '@/app/_components/cta-banner';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, Award, ShieldCheck, Clock, Coins, Sparkles, Milestone } from 'lucide-react';
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

  if (service.slug === 'renovation-appartement') {
    return {
      title: "Rénovation Appartement Paris & IDF (92, 93, 94, 78) | ERG Rénovation",
      description: "Confiez votre projet de rénovation d'appartement à Paris et IDF à ERG Rénovation. Expertise haut de gamme, gestion de A à Z, devis sur-mesure.",
    }
  }

  if (service.slug === 'renovation-maison') {
    return {
        title: "Rénovation Maison Paris & IDF (78, 92, 93, 94) | ERG Rénovation",
        description: "Votre maison est un projet de vie. ERG Rénovation gère sa rénovation, extension ou aménagement en Île-de-France. Expertise haut de gamme de A à Z.",
    }
  }

    if (service.slug === 'renovation-salle-de-bain') {
    return {
      title: "Rénovation Salle de Bain Paris & IDF (92, 93, 94, 78) | ERG Rénovation",
      description: "Transformez votre salle de bain en un espace bien-être. ERG Rénovation, expert en rénovation haut de gamme à Paris et IDF. Devis pour votre douche à l'italienne.",
    }
  }

  if (service.slug === 'renovation-cuisine') {
    return {
      title: "Rénovation Cuisine Paris & IDF (92, 93, 94, 78) | ERG Rénovation",
      description: "ERG Rénovation gère la rénovation complète de votre cuisine à Paris et IDF. Conception sur mesure, îlot central, finitions haut de gamme. Devis A à Z.",
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
  const isPillarPage = ['renovation-appartement', 'renovation-maison', 'renovation-salle-de-bain', 'renovation-cuisine'].includes(service.slug);
  
  const kitchenImage = PlaceHolderImages.find(p => p.id === 'service-pillar-kitchen');
  const finishImage = PlaceHolderImages.find(p => p.id === 'service-pillar-finish');
  
  const pageTitles:any = {
    'renovation-appartement': {
      h1: "Rénovation d'Appartement à Paris et Île-de-France : L'Excellence par ERG Rénovation",
      intro: "Transformer un appartement parisien ou francilien en un lieu de vie exceptionnel exige une expertise de la structure, une gestion de projet rigoureuse et une passion pour les finitions parfaites. Nous gérons chaque détail de votre projet à Paris, dans les Hauts-de-Seine (92), la Seine-Saint-Denis (93), le Val-de-Marne (94) et les Yvelines (78).",
      cta: "Obtenir mon devis personnalisé",
      benefitsTitle: "Nos Prestations de Rénovation sur Mesure",
      benefitsIntro: "Que vous envisagiez une refonte complète de votre bien, la modernisation d'un appartement ancien ou la rénovation énergétique, ERG Rénovation orchestre tous les corps de métier pour un résultat impeccable.",
      processTitle: "L'Approche ERG Rénovation : Votre Projet en 4 Étapes Clés",
      processIntro: "La réussite d'une rénovation \"haut de gamme\" repose sur une méthodologie éprouvée. Nous avons simplifié le processus pour vous garantir une tranquillité d'esprit totale.",
      whyUsTitle: "Pourquoi Confier Votre Appartement Parisien à ERG Rénovation ?",
      faqTitle: "Questions Fréquentes sur la Rénovation d'Appartement",
    },
    'renovation-maison': {
      h1: "Rénovation de Maison à Paris et Île-de-France : Donnons Vie à Votre Projet",
      intro: "Votre maison est un projet de vie. Nous vous accompagnons pour la rénover, l'agrandir et la transformer en l'espace dont vous avez toujours rêvé. Qu'il s'agisse de moderniser une bâtisse ancienne dans les Yvelines, d'agrandir un pavillon dans les Hauts-de-Seine ou de réhabiliter une maison de ville à Paris, ERG Rénovation est votre maître d'œuvre unique pour un projet géré avec excellence.",
      cta: "Discutons de votre projet de vie",
      benefitsTitle: "Notre Savoir-Faire au Service de Votre Maison",
      benefitsIntro: "La rénovation d'une maison implique des compétences multiples, de la structure à la décoration. ERG Rénovation maîtrise l'ensemble des corps d'état pour répondre à toutes les ambitions.",
      processTitle: "L'Accompagnement ERG Rénovation : Votre Sérénité, Notre Priorité",
      processIntro: "Un projet de vie ne doit pas devenir une source de stress. Notre méthodologie est conçue pour vous garantir une transparence totale et un respect absolu de vos attentes.",
      whyUsTitle: "Pourquoi ERG Rénovation pour Votre Maison en Île-de-France ?",
      faqTitle: "Vos Questions sur la Rénovation de Maison",
    },
    'renovation-salle-de-bain': {
      h1: "Rénovation de Salle de Bain à Paris & IDF : Créez Votre Espace Bien-Être sur Mesure",
      intro: "Plus qu'une simple pièce d'eau, votre salle de bain est un sanctuaire. La transformer en un espace de détente digne d'un spa, tout en optimisant chaque mètre carré, est un art qui exige une précision technique absolue. ERG Rénovation est le spécialiste de la conception et de la rénovation de salles de bain haut de gamme à Paris et en Île-de-France (75, 92, 93, 94, 78), garantissant des finitions parfaites et une étanchéité irréprochable.",
      cta: "Obtenir mon devis pour une salle de bain d'exception",
      benefitsTitle: "Nos Prestations pour une Salle de Bain Haut de Gamme",
      benefitsIntro: "De la refonte complète d'une salle de bain ancienne à la création d'une suite parentale, nos équipes maîtrisent tous les aspects de votre projet.",
      processTitle: "Votre Projet de A à Z : Conception, Pilotage, Finitions",
      processIntro: "Un projet de vie ne doit pas devenir une source de stress. Notre méthodologie est conçue pour vous garantir une transparence totale et un respect absolu de vos attentes.",
      whyUsTitle: "L'Expertise Technique : Le Luxe de la Tranquillité",
      whyUsIntro: "Une belle salle de bain est avant tout une salle de bain qui dure. Dans les appartements parisiens, où un dégât des eaux est critique, notre priorité absolue est la technique.",
      faqTitle: "Questions Fréquentes sur la Rénovation de Salle de Bain",
    },
    'renovation-cuisine': {
      h1: "Rénovation de Cuisine à Paris & IDF : L'Alliance du Design et de la Fonctionnalité",
      intro: "La cuisine n'est plus seulement un lieu de préparation, c'est le cœur battant de votre intérieur. Sa rénovation est un projet complexe qui touche à tous les corps de métier : plomberie, électricité, plâtrerie, et agencement de précision. ERG Rénovation orchestre votre projet de A à Z, de la conception de votre cuisine sur mesure à l'installation impeccable, à Paris et en Île-de-France (75, 92, 93, 94, 78).",
      cta: "Concevoir ma future cuisine",
      benefitsTitle: "Une Expertise Complète pour Votre Projet de Cuisine",
      benefitsIntro: "Nous ne sommes pas de simples poseurs. Nous sommes des rénovateurs. Nous gérons la totalité des travaux pour garantir que votre nouvelle cuisine s'intègre parfaitement à votre espace de vie.",
      processTitle: "La Méthode ERG Rénovation : Votre Cuisine Livrée Clé en Main",
      processIntro: "Évitez le casse-tête de la coordination entre le cuisiniste, le plombier et l'électricien. Notre pilotage intégral vous assure une exécution fluide et un respect des délais.",
      whyUsTitle: "Le Choix des Matériaux : L'Alliance de l'Esthétique et de la Durabilité",
      whyUsIntro: "Une cuisine d'exception se définit par ses matériaux. Nous travaillons avec les meilleurs fournisseurs pour vous proposer :",
      faqTitle: "Vos Questions sur la Rénovation de Cuisine",
    }
  }

  const content = isPillarPage ? pageTitles[service.slug as keyof typeof pageTitles] : null;

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
              {content ? content.h1 : service.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-primary-foreground/80 md:leading-relaxed">
              {content ? content.intro : service.longDescription}
            </p>
             <div className="mt-8">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/devis">{content ? content.cta : "Obtenir un devis"}</Link>
                </Button>
            </div>
             <div className="mt-6 flex flex-col sm:flex-row gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-accent" />
                    <span>{service.slug === 'renovation-maison' ? 'Gestion de Projet Intégrale' : (service.slug === 'renovation-cuisine' ? 'Interlocuteur Unique (Travaux + Pose)' : 'Gestion de projet A à Z')}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-accent" />
                    <span>{service.slug === 'renovation-maison' ? 'Expertise Structurelle' : (service.slug === 'renovation-cuisine' ? 'Conception et Plans 3D' : 'Garantie décennale')}</span>
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
                        {content ? content.benefitsTitle : "Une expertise complète pour votre projet"}
                    </h2>
                    <div className="prose max-w-none text-muted-foreground mt-4">
                        <p>
                            {content ? content.benefitsIntro : service.longDescription }
                        </p>
                    </div>
                    
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className='space-y-6'>
                            {service.benefits.slice(0, 2).map((benefit) => (
                            <div key={benefit.title} className="flex items-start gap-4">
                                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                                <div>
                                <h3 className="font-headline font-semibold text-lg">{benefit.title}</h3>
                                <p className="text-muted-foreground md:leading-relaxed">{benefit.description}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                        {kitchenImage && (
                            <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
                                <Image 
                                    src={kitchenImage.imageUrl}
                                    alt={kitchenImage.description}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={kitchenImage.imageHint}
                                />
                            </div>
                        )}
                        <div className='space-y-6 md:col-span-2 grid md:grid-cols-2 gap-8'>
                             {service.benefits.slice(2).map((benefit) => (
                            <div key={benefit.title} className="flex items-start gap-4">
                                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                                <div>
                                <h3 className="font-headline font-semibold text-lg">{benefit.title}</h3>
                                <p className="text-muted-foreground md:leading-relaxed">{benefit.description}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* --- Process Section --- */}
                {service.process && content && (
                    <section>
                         <h2 className="font-headline text-3xl font-bold">
                            {content.processTitle}
                        </h2>
                        <div className="prose max-w-none text-muted-foreground mt-4">
                           <p>
                           {content.processIntro}
                           </p>
                        </div>
                        <div className="mt-8 space-y-8">
                            {service.process.map((step) => (
                                <div key={step.step} className="flex items-start gap-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-accent font-bold font-headline text-xl shrink-0">{`0${step.step}`}</div>
                                    <div>
                                        <h3 className="font-headline font-semibold text-lg">{step.title}</h3>
                                        <p className="text-muted-foreground md:leading-relaxed">{step.description}</p>
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
                {service.whyUs && content && (
                    <section>
                        <h2 className="font-headline text-3xl font-bold">
                           {content.whyUsTitle}
                        </h2>
                          {content.whyUsIntro && (
                            <div className="prose max-w-none text-muted-foreground mt-4">
                                <p>{content.whyUsIntro}</p>
                            </div>
                          )}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-6">
                                {service.whyUs.map((item) => (
                                    <Card key={item.title} className={cn(
                                        ['renovation-salle-de-bain', 'renovation-cuisine'].includes(service.slug) ? 'bg-transparent shadow-none border-0' : 'bg-secondary/50 border-0 shadow-none'
                                    )}>
                                        <CardHeader className="flex flex-row items-center gap-4 p-4">
                                            <div className={cn(
                                                "flex h-10 w-10 items-center justify-center rounded-md shrink-0",
                                                ['renovation-salle-de-bain', 'renovation-cuisine'].includes(service.slug) ? 'bg-primary/10 text-primary' : 'bg-background text-primary'
                                                )}>
                                                <item.icon className="h-5 w-5" />
                                            </div>
                                            <h3 className="font-headline font-semibold text-base">{item.title}</h3>
                                        </CardHeader>
                                        {item.description && (
                                            <CardContent className='p-4 pt-0 pl-14'>
                                                <p className="text-muted-foreground text-sm md:leading-relaxed">{item.description}</p>
                                            </CardContent>
                                        )}
                                    </Card>
                                ))}
                            </div>
                            {finishImage && (
                                <div className="relative h-80 md:h-full w-full rounded-lg overflow-hidden">
                                     <Image 
                                        src={finishImage.imageUrl}
                                        alt={finishImage.description}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={finishImage.imageHint}
                                    />
                                </div>
                            )}
                        </div>
                    </section>
                )}


                {/* --- Zones d'intervention Section --- */}
                {service.zones && (
                    <section>
                        <h2 className="font-headline text-3xl font-bold">
                            Nos Zones d'Intervention Privilégiées en Île-de-France
                        </h2>
                        <div className="prose max-w-none text-muted-foreground mt-4">
                            <p>
                                {service.zones.description}
                            </p>
                             <p className="text-sm font-semibold text-primary">
                                {service.zones.list}
                            </p>
                        </div>
                    </section>
                )}

                {/* --- FAQ Section --- */}
                {service.faq && service.faq.length > 0 && content && (
                    <section>
                        <h2 className="font-headline text-3xl font-bold">
                            {content.faqTitle}
                        </h2>
                        <Accordion type="single" collapsible className="w-full mt-6">
                            {service.faq.map((item, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="text-left font-semibold hover:no-underline text-base">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="prose max-w-none text-muted-foreground">
                                    <p>{item.answer}</p>
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
                  {relatedProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
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

function ProjectCard({ project }: { project: (typeof allProjects)[0] }) {
  const beforeImage = PlaceHolderImages.find(
    (img) => img.id === project.images.before
  );
  const afterImage = PlaceHolderImages.find(
    (img) => img.id === project.images.after
  );

  return (
    <Card className="group flex h-full flex-col overflow-hidden">
      <CardContent className="p-0">
        <Tabs defaultValue="after" className="relative w-full">
          <div className="relative h-64 w-full">
            <TabsContent value="after" className="m-0 h-full">
              {afterImage && (
                <Image
                  src={afterImage.imageUrl}
                  alt={project.description}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={afterImage.imageHint}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
            </TabsContent>
            <TabsContent value="before" className="m-0 h-full">
              {beforeImage && (
                <Image
                  src={beforeImage.imageUrl}
                  alt={`Avant - ${project.description}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={beforeImage.imageHint}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
            </TabsContent>
          </div>
          <TabsList className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm">
            <TabsTrigger value="before" className="text-white/80 data-[state=active]:text-white">Avant</TabsTrigger>
            <TabsTrigger value="after" className="text-white/80 data-[state=active]:text-white">
              <Sparkles className="mr-2 h-4 w-4 text-amber-300" />
              Après
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
      <div className="flex flex-1 flex-col p-6">
        <Badge variant="secondary" className="w-fit">
          {project.category}
        </Badge>
        <CardTitle className="pt-2 font-headline text-xl">
          {project.title}
        </CardTitle>
        <p className="mt-2 flex-grow text-sm text-muted-foreground">{project.description}</p>
      </div>
      <CardFooter className="p-6 pt-0">
        <Button
          variant="link"
          asChild
          className="p-0 text-accent hover:text-accent"
        >
          <Link href={`/realisations/${project.slug}`}>
            Voir les détails <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');
