import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { allProjects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CtaBanner from '../_components/cta-banner';

export default function RealisationsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-grow">
        <section className="bg-secondary py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-headline text-4xl font-bold md:text-5xl">
                Notre Savoir-Faire en Images
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Chaque projet est une nouvelle histoire que nous écrivons avec
                nos clients. Découvrez la qualité, la précision et la passion
                qui animent chacune de nos réalisations, de la conception à la
                finition.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allProjects.map((project) => {
                const projectImage = PlaceHolderImages.find(
                  (img) => img.id === project.image
                );
                return (
                  <Card key={project.slug} className="group overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative h-64 w-full">
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
                      <Badge variant="secondary" className="w-fit">
                        {project.category}
                      </Badge>
                      <CardTitle className="pt-2 font-headline text-xl">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <div className="p-6 pt-0">
                      <Button
                        variant="link"
                        asChild
                        className="p-0 text-accent hover:text-accent"
                      >
                        <Link href={`/realisations/${project.slug}`}>
                          Voir le projet{' '}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}

    