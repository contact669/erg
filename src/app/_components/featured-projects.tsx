import Image from 'next/image';
import Link from 'next/link';
import { featuredProjects } from '@/lib/data.tsx';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProjects() {
  return (
    <section id="realisations" className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Nos réalisations parlent pour nous
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Découvrez quelques-uns de nos projets récents et la qualité de notre
            savoir-faire.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project) => {
            const projectImage = PlaceHolderImages.find(
              (img) => img.id === project.images.after
            );
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
                  <CardTitle className="pt-2 font-headline text-xl">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                    <Button variant="link" asChild className="p-0 text-accent hover:text-accent">
                        <Link href={`/realisations/${project.slug}`}>
                            Voir le projet <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/realisations">Toutes nos réalisations</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
