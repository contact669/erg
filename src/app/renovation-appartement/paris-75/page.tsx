
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import CtaBanner from "@/app/_components/cta-banner"
import AnimatedSection from "@/components/animated-section"
import Breadcrumbs from "@/components/breadcrumbs"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  CheckCircle,
  Hammer,
  Home,
  Bath,
  UtensilsCrossed,
  Layers,
  Sparkles,
  Award,
  Users,
  Phone,
  ArrowRight,
  ClipboardList,
  Building2,
  Bricks,
  Scale,
  PlugZap,
  Gem,
  Maximize,
  ShieldCheck,
  Building,
  DraftingCompass,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Rénovation appartement Paris (75) | ERG Rénovation",
  description:
    "Entreprise de rénovation à Paris (75). Appartement, salle de bain, cuisine. Visite sur site, devis détaillé et suivi complet. Tous arrondissements.",
  alternates: {
    canonical: "https://www.erg-renovation.fr/renovation-appartement/paris-75",
  },
};

export default function RenovationParisPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'project-apartment-paris-75');
  const sdbImage = PlaceHolderImages.find(p => p.id === 'project-small-bathroom-after');
  const cuisineImage = PlaceHolderImages.find(p => p.id === 'project-kitchen-1');
  const apartmentImage = PlaceHolderImages.find(p => p.id === 'project-apartment-1');

  const faqs = [
    {
      q: "Quel est le prix d’une rénovation à Paris ?",
      a: "Les prix varient selon la surface, l'état initial et le niveau de finition. À titre indicatif, une rénovation partielle commence à partir de 600 €/m², tandis qu'une rénovation complète se situe entre 1 000 et 1 600 €/m². Un devis précis nécessite toujours une visite sur site."
    },
    {
      q: "Quels sont les délais moyens ?",
      a: "Pour une salle de bain, comptez 2 à 3 semaines. Pour une rénovation complète, prévoyez de 6 à 10 semaines. Les délais précis sont définis contractuellement avant le début des travaux."
    },
    {
      q: "Faut-il l’accord de la copropriété ?",
      a: "Oui, pour certains travaux comme la modification de murs porteurs, l'intervention sur les réseaux collectifs ou la ventilation. Nous vous aidons à préparer un dossier conforme pour présenter à votre syndic et éviter les blocages."
    },
    {
      q: "Peut-on rénover un appartement occupé ?",
      a: "Oui, c'est possible. Nous adaptons l'organisation du chantier en procédant par phases et en protégeant soigneusement les zones non concernées pour limiter les nuisances."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-grow">
        <Breadcrumbs />

        <section className="bg-secondary/40 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Rénovation d’appartement à Paris (75)
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                ERG Rénovation accompagne les particuliers, propriétaires occupants et investisseurs pour leurs travaux de rénovation à Paris, tous arrondissements confondus.
                De la rénovation complète d’appartement à la salle de bain ou à la cuisine, nous assurons un suivi structuré, des finitions soignées et une maîtrise totale du chantier, dans le respect des contraintes parisiennes.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-muted-foreground md:grid-cols-4">
                <span className="inline-flex items-center justify-center gap-1.5"><CheckCircle className="h-4 w-4 text-accent" /> Intervention rapide</span>
                <span className="inline-flex items-center justify-center gap-1.5"><CheckCircle className="h-4 w-4 text-accent" /> Visite sur site gratuite</span>
                <span className="inline-flex items-center justify-center gap-1.5"><CheckCircle className="h-4 w-4 text-accent" /> Devis détaillé</span>
                <span className="inline-flex items-center justify-center gap-1.5"><CheckCircle className="h-4 w-4 text-accent" /> Un interlocuteur unique</span>
              </div>
            </div>
          </div>
        </section>

        <AnimatedSection>
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                  <h2 className="font-headline text-3xl font-bold">Rénover un appartement à Paris : un projet exigeant</h2>
                  <p className="mt-4 text-muted-foreground">
                    Rénover à Paris ne s’improvise pas. Le bâti ancien, la densité urbaine et les règles de copropriété imposent une approche rigoureuse et expérimentée.
                  </p>
              </div>
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
                  <Card className="border-0 bg-secondary/30 shadow-none">
                    <CardHeader>
                      <CardTitle>Un parc immobilier ancien</CardTitle>
                       <CardDescription>
                        À Paris, une grande partie des logements date d’avant 1975, voire du XIXᵉ siècle. Chaque projet nécessite une analyse technique précise avant travaux.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p>Immeubles haussmanniens</p>
                      <p>Planchers bois</p>
                      <p>Murs porteurs épais</p>
                      <p>Réseaux parfois vétustes</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 bg-secondary/30 shadow-none">
                    <CardHeader>
                      <CardTitle>Des contraintes de copropriété</CardTitle>
                       <CardDescription>
                        Autorisation pour : modification de cloisons, intervention sur les réseaux, évacuation, ventilation, nuisances sonores et horaires. Nous vous accompagnons dans ces démarches pour sécuriser votre projet.
                      </CardDescription>
                    </CardHeader>
                     <CardContent className="space-y-3">
                      <p>Modification de cloisons</p>
                      <p>Intervention sur les réseaux</p>
                      <p>Évacuation, ventilation</p>
                      <p>Nuisances sonores et horaires</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 bg-secondary/30 shadow-none">
                    <CardHeader>
                      <CardTitle>Des surfaces à optimiser</CardTitle>
                      <CardDescription>
                        À Paris, chaque mètre carré compte. La rénovation doit conjuguer : fonctionnalité, esthétique, optimisation des volumes, et durabilité.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                       <p>Fonctionnalité</p>
                       <p>Esthétique</p>
                       <p>Optimisation des volumes</p>
                       <p>Durabilité</p>
                    </CardContent>
                  </Card>
              </div>
            </div>
          </section>
        </AnimatedSection>
        
        <section className="bg-secondary/40 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 id="nos-services" className="font-headline text-3xl font-bold">Nos services de rénovation à Paris</h2>
              <p className="mt-4 text-muted-foreground">Nous réalisons des projets de rénovation intérieure sur mesure, adaptés à chaque typologie d’appartement parisien.</p>
            </div>
            
            <div className="mt-12 text-center">
                <Card className="inline-block">
                    <CardHeader>
                        <CardTitle>Demandez votre devis rénovation à Paris</CardTitle>
                        <CardDescription>
                        Vous avez un projet de rénovation à Paris ? Nous vous accompagnons de A à Z, avec sérieux, transparence et exigence. Contactez-nous pour une visite sur site et un devis gratuit.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/devis">Demander un devis gratuit</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle>Rénovation complète d’appartement</CardTitle>
                  <CardDescription>Idéal pour : achat avec travaux, résidence principale, investissement locatif. Nos prestations incluent : démolition et redistribution des espaces, électricité et plomberie aux normes, isolation thermique et phonique, sols, murs, plafonds, finitions haut de gamme. Un projet clé en main, de la conception à la livraison.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Rénovation de salle de bain à Paris</CardTitle>
                  <CardDescription>Spécialistes des petites surfaces parisiennes, nous concevons des salles de bain : fonctionnelles, durables, esthétiques. Prestations possibles : douche à l’italienne, meubles sur mesure, étanchéité renforcée, ventilation performante.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Rénovation de cuisine</CardTitle>
                  <CardDescription>Cuisine ouverte, semi-ouverte ou fermée : optimisation des circulations, rangements intelligents, matériaux résistants, intégration technique parfaite. Nous coordonnons menuiserie, plomberie et électricité pour un résultat cohérent et durable.</CardDescription>
                </CardHeader>
              </Card>
               <Card>
                <CardHeader>
                  <CardTitle>Rénovation partielle & aménagement intérieur</CardTitle>
                  <CardDescription>Rafraîchissement, redistribution de pièces, création de rangements sur mesure, optimisation des petits espaces.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <AnimatedSection>
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                 {apartmentImage &&
                  <div className="relative h-80 w-full overflow-hidden rounded-lg lg:h-[450px] order-last lg:order-first">
                    <Image src={apartmentImage.imageUrl} alt="Rénovation d’un appartement haussmannien à Paris avec finitions soignées" fill className="object-cover" data-ai-hint={apartmentImage.imageHint} sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                }
                <div>
                  <h2 className="font-headline text-3xl font-bold">Pourquoi choisir ERG Rénovation pour vos travaux à Paris ?</h2>
                  <ul className="mt-6 space-y-6">
                    <li className="flex items-start gap-4">
                      <div>
                        <h3 className="font-semibold">Une expertise locale réelle</h3>
                        <p className="text-sm text-muted-foreground">Nous intervenons quotidiennement à Paris, dans tous les arrondissements. Nous connaissons les immeubles anciens, les contraintes des syndics, et les attentes des clients parisiens.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div>
                        <h3 className="font-semibold">Un interlocuteur unique</h3>
                        <p className="text-sm text-muted-foreground">Un chef de projet dédié pilote l’ensemble du chantier : coordination des corps de métier, respect des délais, contrôle qualité.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div>
                        <h3 className="font-semibold">Des artisans qualifiés et assurés</h3>
                        <p className="text-sm text-muted-foreground">Assurance décennale, responsabilité civile et respect des normes en vigueur.</p>
                      </div>
                    </li>
                     <li className="flex items-start gap-4">
                      <div>
                        <h3 className="font-semibold">Une transparence totale</h3>
                        <p className="text-sm text-muted-foreground">Devis détaillé, planning clair, budget maîtrisé.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
        
        <section className="bg-secondary/40 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-headline text-3xl font-bold">Rénovation à Paris : tous les arrondissements (75)</h2>
                <p className="mt-4 text-muted-foreground">
                    Nous intervenons dans l’ensemble des arrondissements parisiens. Des pages dédiées par arrondissement seront progressivement mises en ligne pour un accompagnement encore plus localisé.
                </p>
            </div>
             <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
                {[...Array(20)].map((_, i) => (
                    <Button variant="outline" asChild key={i}>
                        <Link href={`/renovation-appartement/paris-${i+1}`}>Paris {i+1}{i === 0 ? 'er' : 'e'}</Link>
                    </Button>
                ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
             <div className="container">
                <div className="mx-auto max-w-3xl text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold">Exemples de projets réalisés à Paris</h2>
                    <p className="mt-4 text-muted-foreground">
                        Chaque projet est conçu pour valoriser durablement le bien.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Rénovation complète d’un appartement haussmannien</CardTitle>
                            <CardDescription>Redistribution des espaces</CardDescription>
                        </CardHeader>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Création d’une salle de bain compacte dans un studio</CardTitle>
                            <CardDescription>Optimisation de l'espace</CardDescription>
                        </CardHeader>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Rénovation de cuisine avec ouverture sur séjour</CardTitle>
                            <CardDescription>Modernisation et convivialité</CardDescription>
                        </CardHeader>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Optimisation d’un appartement locatif</CardTitle>
                            <CardDescription>Valorisation pour mise en location</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
             </div>
        </section>

        <section className="bg-secondary/40 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-headline text-3xl font-bold">FAQ – Rénovation d’appartement à Paris</h2>
            </div>
            <Accordion type="single" collapsible className="mt-8 max-w-3xl mx-auto">
              {faqs.map((faq, i) => (
                <AccordionItem value={`item-${i}`} key={i}>
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container text-center">
            <h2 className="font-headline text-3xl font-bold">Demandez votre devis rénovation à Paris</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Vous avez un projet de rénovation à Paris ? Nous vous accompagnons de A à Z, avec sérieux, transparence et exigence. Contactez-nous pour une visite sur site et un devis gratuit.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/devis">Demander un devis gratuit <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
               <Button asChild size="lg" variant="outline">
                <a href="tel:+33699961375">
                  <Phone className="mr-2 h-4 w-4" /> Appeler maintenant
                </a>
              </Button>
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  )
}
