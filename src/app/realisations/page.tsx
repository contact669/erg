
'use client';

import { useState, useMemo } from 'react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { allProjects, projectCategories } from '@/lib/data.tsx';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import CtaBanner from '../_components/cta-banner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumbs from '@/components/breadcrumbs';

const PROJECTS_PER_PAGE = 6;

export default function RealisationsPage() {
  const [filter, setFilter] = useState('Tous');
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

  const filteredProjects = useMemo(() => {
    if (filter === 'Tous') {
      return allProjects;
    }
    return allProjects.filter((project) => project.category === filter);
  }, [filter]);

  const projectsToShow = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  const canLoadMore = visibleCount < filteredProjects.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PROJECTS_PER_PAGE);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-grow">
        <section className="bg-secondary py-16 md:py-24">
          <div className="container text-center">
            <Breadcrumbs />
            <div className="mx-auto max-w-3xl">
              <h1 className="mt-4 font-headline text-4xl font-bold md:text-5xl">
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
            <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
              <Button
                variant={filter === 'Tous' ? 'default' : 'ghost'}
                onClick={() => setFilter('Tous')}
                className="rounded-full"
              >
                Tous
              </Button>
              {projectCategories.map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? 'default' : 'ghost'}
                  onClick={() => setFilter(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            <AnimatePresence>
              <motion.div
                layout
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {projectsToShow.map((project, index) => (
                  <motion.div
                    key={`${project.slug}-${filter}`}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: (index % PROJECTS_PER_PAGE) * 0.05 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {canLoadMore && (
              <div className="mt-16 text-center">
                <Button size="lg" onClick={handleLoadMore}>
                  Charger plus de projets
                </Button>
              </div>
            )}
          </div>
        </section>

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
