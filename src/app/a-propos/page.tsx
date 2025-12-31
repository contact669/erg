
import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import CtaBanner from '@/app/_components/cta-banner';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AnimatedSection from '@/components/animated-section';
import { Handshake, Diamond, Heart, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/breadcrumbs';

const values = [
  {
    icon: Diamond,
    title: 'Excellence Artisanale',
    description: "Nous sommes fiers de notre savoir-faire. Chaque finition est réalisée avec une précision d'orfèvre pour un résultat qui dure.",
  },
  {
    icon: Handshake,
    title: 'Confiance & Transparence',
    description: "Votre confiance est notre priorité. Nous établissons des devis clairs et maintenons une communication ouverte tout au long du projet.",
  },
  {
    icon: Heart,
    title: 'Esprit de Famille',
    description: "Plus qu'une entreprise, nous sommes une famille. Cette cohésion se ressent dans la collaboration et le respect que nous portons à nos clients.",
  },
  {
    icon: ShieldCheck,
    title: 'Engagement & Garantie',
    description: "Nous nous engageons sur les délais et la qualité. Tous nos travaux sont couverts par la garantie décennale pour votre tranquillité d'esprit.",
  },
];

export default function AboutPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'about-hero');
  const founder1Image = PlaceHolderImages.find((img) => img.id === 'founder-1');
  const founder2Image = PlaceHolderImages.find((img) => img.id === 'founder-2');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-grow">
        <Breadcrumbs />
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] w-full">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-primary/60" />
          <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
            <h1 className="font-headline text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mt-4">
              Bâtir sur la confiance,
              <br />
              rénover avec passion
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-primary-foreground/80 md:text-xl">
              L'histoire d'ERG Rénovation est celle d'une passion familiale pour l'artisanat, transmise pour créer des espaces de vie qui vous ressemblent.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <AnimatedSection>
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div className='relative h-80 lg:h-full rounded-lg overflow-hidden'>
                    <Image 
                        src={PlaceHolderImages.find(p => p.id === 'about-story')?.imageUrl || ''}
                        alt="Frères artisans travaillant ensemble"
                        fill
                        className='object-cover'
                        data-ai-hint='craftsmen working'
                    />
                </div>
                <div>
                  <h2 className="font-headline text-3xl font-bold">
                    Une histoire de frères, une passion commune
                  </h2>
                  <p className="mt-6 text-lg text-muted-foreground">
                    Fondée en 2015 par les frères AIT, ERG Rénovation est née d'une vision partagée : celle d'offrir un service de rénovation d'excellence, basé sur un savoir-faire rigoureux et une relation de confiance.
                  </p>
                  <p className="mt-4 text-muted-foreground">
                    Professionnels aguerris du bâtiment, nous avons uni nos compétences pour créer une entreprise à notre image : familiale, sérieuse et entièrement dévouée à la satisfaction de nos clients. Depuis nos débuts à Paris, nous avons à cœur de transformer chaque projet en un succès, en alliant techniques traditionnelles et innovations modernes pour des intérieurs à la fois esthétiques et fonctionnels.
                  </p>
                  <Button asChild className="mt-8" size="lg">
                    <Link href="/realisations">Découvrir nos projets</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
        
        {/* Values Section */}
        <AnimatedSection>
            <section className="bg-secondary py-16 md:py-24">
                <div className="container">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <h2 className="font-headline text-3xl font-bold md:text-4xl">
                            Nos Valeurs Fondamentales
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Quatre piliers qui guident chacune de nos actions et garantissent la réussite de votre projet.
                        </p>
                    </div>
                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((value) => (
                            <div key={value.title} className="text-center">
                                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-background text-accent shadow-md">
                                    <value.icon className="h-8 w-8" />
                                </div>
                                <h3 className="font-headline text-xl font-semibold">{value.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AnimatedSection>
        
        {/* Founders Section */}
        <AnimatedSection>
            <section className="py-16 md:py-24">
                <div className="container">
                     <div className="mx-auto mb-12 max-w-2xl text-center">
                        <h2 className="font-headline text-3xl font-bold md:text-4xl">
                            À la direction du projet : les fondateurs
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                           Deux frères, deux experts, un seul objectif : votre satisfaction.
                        </p>
                    </div>
                    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 sm:grid-cols-2">
                        <div className="flex flex-col items-center text-center">
                            <Avatar className="h-32 w-32 border-4 border-accent">
                                {founder1Image && <AvatarImage src={founder1Image.imageUrl} alt="Portrait du premier frère AIT" data-ai-hint={founder1Image.imageHint} />}
                                <AvatarFallback>K.A</AvatarFallback>
                            </Avatar>
                            <h3 className="mt-6 font-headline text-2xl font-bold">K. AIT</h3>
                            <p className="mt-1 text-accent font-semibold">Co-fondateur & Maître d'œuvre</p>
                            <p className="mt-3 text-muted-foreground">Avec 20 ans d'expérience sur le terrain, K. AIT est le garant de la qualité technique. Il supervise chaque chantier avec une rigueur et une expertise inégalées, s'assurant que chaque détail est conforme aux règles de l'art.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <Avatar className="h-32 w-32 border-4 border-accent">
                                {founder2Image && <AvatarImage src={founder2Image.imageUrl} alt="Portrait du second frère AIT" data-ai-hint={founder2Image.imageHint} />}
                                <AvatarFallback>A.A</AvatarFallback>
                            </Avatar>
                            <h3 className="mt-6 font-headline text-2xl font-bold">A. AIT</h3>
                            <p className="mt-1 text-accent font-semibold">Co-fondateur & Chargé de projet</p>
                            <p className="mt-3 text-muted-foreground">A. AIT est votre interlocuteur privilégié. Il vous accompagne de la conception à la livraison, s'assurant que le projet correspond à vos attentes, respecte votre budget et se déroule en toute sérénité.</p>
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
