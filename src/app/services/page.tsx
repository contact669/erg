
import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import CtaBanner from '@/app/_components/cta-banner';
import { services } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/animated-section';
import Breadcrumbs from '@/components/breadcrumbs';

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-grow">
        <section className="bg-secondary py-16 md:py-24">
          <div className="container text-center">
            <Breadcrumbs />
            <div className="mx-auto max-w-3xl">
              <h1 className="mt-4 font-headline text-4xl font-bold md:text-5xl">
                Nos Prestations, Votre Vision
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                De la conception à la réalisation, nous donnons vie à vos projets de rénovation avec passion et expertise. Découvrez l'étendue de notre savoir-faire pour transformer chaque espace en un lieu de vie unique et fonctionnel.
              </p>
            </div>
          </div>
        </section>
        
        <AnimatedSection>
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => {
                  const serviceImage = PlaceHolderImages.find(p => p.id === service.heroImageId);
                  return (
                  <Link key={service.slug} href={`/services/${service.slug}`} className="group block">
                    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                      <div className="relative h-56 w-full">
                        {serviceImage && (
                          <Image
                            src={serviceImage.imageUrl}
                            alt={service.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            data-ai-hint={serviceImage.imageHint}
                          />
                        )}
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                         <div className="absolute bottom-4 left-4 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/90 text-white">
                                <service.icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-headline text-xl font-bold text-white">
                              {service.title}
                            </h3>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <CardDescription>{service.description}</CardDescription>
                        <div className="mt-4 font-semibold text-accent group-hover:underline">
                          Découvrir le service <ArrowRight className="ml-1 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )})}
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
            <section className='container pb-16 md:pb-24'>
                <div className='bg-muted p-8 rounded-lg lg:p-12'>
                    <div className='grid md:grid-cols-2 gap-8 items-center'>
                        <div>
                            <h2 className="font-headline text-3xl font-bold">Un processus transparent, un résultat garanti</h2>
                            <p className="mt-4 text-muted-foreground">
                            Nous croyons en une collaboration étroite avec nos clients à chaque étape. Notre processus structuré garantit que votre projet se déroule sans accroc, dans le respect des délais et du budget.
                            </p>
                             <ul className="mt-6 space-y-4">
                                <li className="flex items-start gap-3">
                                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                                <div>
                                    <h4 className="font-semibold">Devis détaillé et gratuit</h4>
                                    <p className="text-sm text-muted-foreground">Aucune surprise, nous détaillons chaque poste pour une transparence totale.</p>
                                </div>
                                </li>
                                <li className="flex items-start gap-3">
                                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                                <div>
                                    <h4 className="font-semibold">Chef de projet dédié</h4>
                                    <p className="text-sm text-muted-foreground">Un interlocuteur unique pour suivre votre chantier et répondre à vos questions.</p>
                                </div>
                                </li>
                                <li className="flex items-start gap-3">
                                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                                <div>
                                    <h4 className="font-semibold">Garantie décennale</h4>
                                    <p className="text-sm text-muted-foreground">Travaillez avec nous en toute sérénité, vos travaux sont couverts pendant 10 ans.</p>
                                </div>
                                </li>
                            </ul>
                        </div>
                        <div className='relative h-64 md:h-full rounded-md overflow-hidden'>
                             <Image
                                src={PlaceHolderImages.find(p => p.id === 'cta-banner-image')?.imageUrl || ''}
                                alt="Processus de rénovation"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                data-ai-hint="architectural blueprint"
                            />
                        </div>
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
