import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Bath,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Home,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Users,
  Hammer,
  ChevronRight,
} from "lucide-react";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Breadcrumbs from "@/components/breadcrumbs";
import AnimatedSection from "@/components/animated-section";
import CtaBanner from "@/app/_components/cta-banner";
import BeforeAfterSlider from "@/components/ui/before-after-slider";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const BRAND = "ERG Rénovation";
const SITE_URL = "https://erg-renovation.fr";
const PHONE_E164 = "+33699961375";
const PHONE_DISPLAY = "06 99 96 13 75";

export interface ParisArrondissementData {
  number: number;
  name: string;
  postalCode: string;
  slug: string;
  neighborhoods: string[];
  architecturalStyle: string;
  description: string;
  specifics: string;
  avgPricePerSqm: string;
  beforeAfterProject: {
    beforeImage: string;
    afterImage: string;
    beforeLabel: string;
    afterLabel: string;
    title: string;
  };
  faqs: { q: string; a: string }[];
}

export const PARIS_ARRONDISSEMENTS: Record<string, ParisArrondissementData> = {
  "paris-1": {
    number: 1,
    name: "Paris 1er (Louvre / Palais-Royal)",
    postalCode: "75001",
    slug: "paris-1",
    neighborhoods: ["Palais-Royal", "Saint-Germain-l'Auxerrois", "Les Halles", "Place Vendôme"],
    architecturalStyle: "Bâtiments historiques XVIIe-XVIIIe siècles, poutres apparentes, hauteur sous plafond",
    description: "Rénovation d'appartement de prestige et pied-à-terre dans le cœur historique du 1er arrondissement de Paris.",
    specifics: "Contraintes patrimoniales strictes, rénovation de parquets anciens, modernisation des installations plomberie/électricité sans dénaturer le cachet.",
    avgPricePerSqm: "1 200 € à 1 800 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-appartement-65m2-avant.webp",
      afterImage: "/images/realisations/renovation-appartement-65m2-apres.webp",
      beforeLabel: "Avant Travaux",
      afterLabel: "Après Rénovation ERG",
      title: "Rénovation complète appartement bourgeois",
    },
    faqs: [
      { q: "Quelles sont les contraintes pour rénover dans le 1er arrondissement ?", a: "Le 1er arrondissement comporte de nombreux immeubles classés ou inscrits aux Bâtiments de France. Les travaux impactant l'extérieur ou la structure nécessitent une concertation avec l'Architecte des Bâtiments de France (ABF)." },
      { q: "Combien de temps dure un chantier de rénovation dans le 75001 ?", a: "Comptez 3 à 4 semaines pour une salle de bain ou cuisine, et 8 à 12 semaines pour la rénovation complète d'un appartement." },
    ],
  },
  "paris-2": {
    number: 2,
    name: "Paris 2e (Bourse / Montorgueil)",
    postalCode: "75002",
    slug: "paris-2",
    neighborhoods: ["Montorgueil", "Sentier", "Bonne-Nouvelle", "Gaillon"],
    architecturalStyle: "Immeubles anciens à pans de bois, lofts textiles et appartements haussmanniens",
    description: "Rénovation d'appartements et lofts dans le 2ème arrondissement de Paris, quartier dynamique et prisé.",
    specifics: "Optimisation de l'isolation phonique et thermique, redistribution des espaces dans les appartements anciens.",
    avgPricePerSqm: "1 100 € à 1 700 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-studio-avant.webp",
      afterImage: "/images/realisations/renovation-studio-apres.webp",
      beforeLabel: "Origine",
      afterLabel: "Rénové ERG",
      title: "Optimisation de surface & cuisine ouverte",
    },
    faqs: [
      { q: "Comment réussir la rénovation d'un appartement ancien dans le Sentier ?", a: "Il est primordial d'analyser l'état des planchers bois et de la structure avant de redistribution des pièces et de poser du carrelage ou du parquet." },
    ],
  },
  "paris-3": {
    number: 3,
    name: "Paris 3e (Le Marais / Temple)",
    postalCode: "75003",
    slug: "paris-3",
    neighborhoods: ["Haut-Marais", "Arts-et-Métiers", "Enfants-Rouges", "Archives"],
    architecturalStyle: "Hôtels particuliers du XVIIe siècle, ateliers et appartements typiques du Marais",
    description: "Entreprise de rénovation haut de gamme dans le 3ème arrondissement de Paris (Haut Marais).",
    specifics: "Mise en valeur de la pierre apparente, restauration de parquets de chêne et conception de salles de bain modernes.",
    avgPricePerSqm: "1 200 € à 1 900 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-salle-de-bain-3m2-avant.webp",
      afterImage: "/images/realisations/renovation-salle-de-bain-3m2-apres.webp",
      beforeLabel: "Ancienne SDB",
      afterLabel: "SDB Sur-mesure",
      title: "Création de salle de bain d'architecte",
    },
    faqs: [
      { q: "Faut-il une autorisation pour abattre une cloison dans le Marais ?", a: "Oui, si la cloison s'est avérée semi-porteuse au fil du temps ou si le syndic exige un diagnostic structure par un bureau d'études (BET)." },
    ],
  },
  "paris-4": {
    number: 4,
    name: "Paris 4e (Notre-Dame / Île Saint-Louis)",
    postalCode: "75004",
    slug: "paris-4",
    neighborhoods: ["Île Saint-Louis", "Île de la Cité", "Marais Sud", "Bastille"],
    architecturalStyle: "Bâtiments historiques d'exception, toitures Mansart, boiseries d'époque",
    description: "Rénovation d'appartements d'exception et biens d'investissement dans le 4ème arrondissement de Paris.",
    specifics: "Logistique d'accès étroite (rues historiques), protection stricte des parties communes lors des livraisons.",
    avgPricePerSqm: "1 300 € à 2 000 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-cuisine-avant.webp",
      afterImage: "/images/realisations/renovation-cuisine-apres.webp",
      beforeLabel: "Avant",
      afterLabel: "Après ERG",
      title: "Cuisine contemporaine intégrée",
    },
    faqs: [
      { q: "Comment gérons-nous la logistique de chantier sur l'Île Saint-Louis ?", a: "Nous organisons des livraisons groupées aux heures autorisées et assurons la protection renforcée des escaliers et ascenseurs." },
    ],
  },
  "paris-5": {
    number: 5,
    name: "Paris 5e (Quartier Latin / Panthéon)",
    postalCode: "75005",
    slug: "paris-5",
    neighborhoods: ["Panthéon", "Val-de-Grâce", "Sorbonne", "Jardin des Plantes"],
    architecturalStyle: "Immeubles haussmanniens classiques et immeubles en pierre de taille",
    description: "Spécialiste de la rénovation d'appartements familiaux et studios d'étudiants dans le 5ème arrondissement.",
    specifics: "Renforcement d'isolation phonique entre étages, rénovation de parquets Point de Hongrie et moulures.",
    avgPricePerSqm: "1 000 € à 1 600 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-studio-avant.webp",
      afterImage: "/images/realisations/renovation-studio-apres.webp",
      beforeLabel: "Studio Avant",
      afterLabel: "Studio Après",
      title: "Rénovation studio Quartier Latin",
    },
    faqs: [
      { q: "Quel est le délai pour rénover un studio dans le 5ème ?", a: "Comptez environ 3 à 4 semaines de travaux intensifs clé en main." },
    ],
  },
  "paris-6": {
    number: 6,
    name: "Paris 6e (Saint-Germain-des-Prés / Luxembourg)",
    postalCode: "75006",
    slug: "paris-6",
    neighborhoods: ["Saint-Germain-des-Prés", "Odéon", "Notre-Dame-des-Champs", "Monnaie"],
    architecturalStyle: "Immeubles de grand standing, hauts plafonds sculptés, cheminées en marbre",
    description: "Rénovation intérieure sur-mesure et luxe dans le 6ème arrondissement de Paris.",
    specifics: "Prestations d'ébénisterie sur-mesure, domotique, intégration de matériaux nobles (marbre de Carrare, laiton).",
    avgPricePerSqm: "1 400 € à 2 200 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-appartement-65m2-avant.webp",
      afterImage: "/images/realisations/renovation-appartement-65m2-apres.webp",
      beforeLabel: "Origine",
      afterLabel: "Haute Précision ERG",
      title: "Rénovation d'appartement de prestige",
    },
    faqs: [
      { q: "Pouvez-vous réaliser des finitions de luxe sur-mesure ?", a: "Oui, nos équipes et partenaires artisans maîtrisent le travail du marbre, des parquets d'art et de la menuiserie intégrée." },
    ],
  },
  "paris-7": {
    number: 7,
    name: "Paris 7e (Tour Eiffel / Invalides)",
    postalCode: "75007",
    slug: "paris-7",
    neighborhoods: ["Gros-Caillou", "Invalides", "École-Militaire", "Saint-Thomas-d'Aquin"],
    architecturalStyle: "Haussmannien majestueux, immeubles pierre de taille de standing",
    description: "Rénovation complète d'appartements haussmanniens et duplex de haut standing dans le 7ème arrondissement.",
    specifics: "Rénovation énergétique avec fenêtres double vitrage bois sur-mesure agréées Bâtiments de France.",
    avgPricePerSqm: "1 300 € à 2 100 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-complete-appartement-avant.webp",
      afterImage: "/images/realisations/renovation-complete-appartement-apres.webp",
      beforeLabel: "Avant",
      afterLabel: "Après Rénovation",
      title: "Rénovation complète haussmannien 110m²",
    },
    faqs: [
      { q: "Peut-on remplacer les fenêtres dans un immeuble haussmannien du 7e ?", a: "Oui, en respectant les moulures bois d'origine et la couleur imposée par le règlement de copropriété." },
    ],
  },
  "paris-8": {
    number: 8,
    name: "Paris 8e (Champs-Élysées / Madeleine)",
    postalCode: "75008",
    slug: "paris-8",
    neighborhoods: ["Madeleine", "Europe", "Faubourg-du-Roule", "Champs-Élysées"],
    architecturalStyle: "Grands appartements haussmanniens, bureaux convertis en logements",
    description: "Entreprise de rénovation TCE à Paris 8ème pour appartements d'exception et réagencement d'espaces.",
    specifics: "Création de suites parentales avec dressing et salle de bain privative, climatisation réversible encastrée.",
    avgPricePerSqm: "1 200 € à 2 000 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-salle-de-bain-3m2-avant.webp",
      afterImage: "/images/realisations/renovation-salle-de-bain-3m2-apres.webp",
      beforeLabel: "Ancienne SDB",
      afterLabel: "Suite Parentale",
      title: "Création de suite parentale moderne",
    },
    faqs: [
      { q: "Intervenez-vous pour la transformation de locaux professionnels en appartements ?", a: "Oui, nous gérons la remise aux normes complète, l'isolation et l'aménagement résidentiel." },
    ],
  },
  "paris-9": {
    number: 9,
    name: "Paris 9e (Opéra / Pigalle / Saint-Georges)",
    postalCode: "75009",
    slug: "paris-9",
    neighborhoods: ["Saint-Georges", "Rochechouart", "Chaussée-d'Antin", "Faubourg-Montmartre"],
    architecturalStyle: "Immeubles haussmanniens et style Nouvelle Athènes",
    description: "Rénovation d'appartements familiaux et lofts d'artistes dans le 9ème arrondissement de Paris.",
    specifics: "Ouverture de pièces de vie avec verrières d'atelier en acier, parquets chêne massif.",
    avgPricePerSqm: "1 100 € à 1 700 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-2-pieces-avant.webp",
      afterImage: "/images/realisations/renovation-2-pieces-apres.webp",
      beforeLabel: "Avant",
      afterLabel: "Après ERG",
      title: "Rénovation 2 pièces avec verrière",
    },
    faqs: [
      { q: "Combien coûte une verrière sur-mesure dans un appartement du 9e ?", a: "Une verrière atelier sur-mesure en acier thermolaqué varie de 1 500 € à 3 500 € selon les dimensions et le vitrage." },
    ],
  },
  "paris-10": {
    number: 10,
    name: "Paris 10e (Canal Saint-Martin / République)",
    postalCode: "75010",
    slug: "paris-10",
    neighborhoods: ["Canal Saint-Martin", "Porte Saint-Denis", "Porte Saint-Martin", "Hôpital Saint-Louis"],
    architecturalStyle: "Anciens entrepôts, lofts et immeubles faubouriens",
    description: "Rénovation créative et optimisation d'espace dans le 10ème arrondissement de Paris.",
    specifics: "Optimisation du volume sous plafond (mezzanines), cuisines ouvertes ergonomiques.",
    avgPricePerSqm: "1 000 € à 1 550 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-cuisine-avant.webp",
      afterImage: "/images/realisations/renovation-cuisine-apres.webp",
      beforeLabel: "Avant",
      afterLabel: "Après",
      title: "Rénovation cuisine & espace de vie",
    },
    faqs: [
      { q: "Comment maximiser la lumière naturelle dans un appartement du 10e ?", a: "En déposant les cloisons non porteuses, en installant une cuisine semi-ouverte et des verrières intérieures." },
    ],
  },
  "paris-11": {
    number: 11,
    name: "Paris 11e (Bastille / Oberkampf / Nation)",
    postalCode: "75011",
    slug: "paris-11",
    neighborhoods: ["Oberkampf", "Roquette", "Sainte-Marguerite", "Folie-Méricourt"],
    architecturalStyle: "Appartements faubouriens, cour artisanales et petites copropriétés",
    description: "Entreprise de rénovation référence dans le 11ème arrondissement de Paris (Bastille & Oberkampf).",
    specifics: "Rénovation clé en main de studios, 2 pièces et 3 pièces avec optimisation poste par poste.",
    avgPricePerSqm: "1 000 € à 1 550 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-studio-avant.webp",
      afterImage: "/images/realisations/renovation-studio-apres.webp",
      beforeLabel: "Studio Origine",
      afterLabel: "Studio Rénové ERG",
      title: "Rénovation complète studio 25m² Paris 11",
    },
    faqs: [
      { q: "Quel est le prix moyen d'une rénovation complète dans le 11e ?", a: "Le budget se situe entre 900 € et 1 500 € / m² selon l'ampleur des travaux électriques, plomberie et finitions." },
    ],
  },
  "paris-12": {
    number: 12,
    name: "Paris 12e (Bercy / Daumesnil / Reuilly)",
    postalCode: "75012",
    slug: "paris-12",
    neighborhoods: ["Bel-Air", "Picpus", "Bercy", "Quinze-Vingts"],
    architecturalStyle: "Immeubles 1930, copropriétés récentes et haussmanniens de l'Est parisien",
    description: "Rénovation d'appartements familiaux et mise aux normes énergétiques dans le 12ème arrondissement.",
    specifics: "Isolation thermique intérieure (ITI), rénovation globale de salles de bain et cuisines.",
    avgPricePerSqm: "950 € à 1 450 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-salle-de-bain-3m2-avant.webp",
      afterImage: "/images/realisations/renovation-salle-de-bain-3m2-apres.webp",
      beforeLabel: "Ancienne SDB",
      afterLabel: "SDB Italienne",
      title: "Rénovation salle de bain 5m² Daumesnil",
    },
    faqs: [
      { q: "Peut-on améliorer le DPE d'un appartement dans le 12e ?", a: "Oui, par l'isolation des murs extérieurs par l'intérieur, le remplacement des fenêtres et l'installation d'une VMC performante." },
    ],
  },
  "paris-13": {
    number: 13,
    name: "Paris 13e (Gobelins / Butte-aux-Cailles / Tolbiac)",
    postalCode: "75013",
    slug: "paris-13",
    neighborhoods: ["Butte-aux-Cailles", "Maison-Blanche", "Salpêtrière", "Gare"],
    architecturalStyle: "Maisons de ville Butte-aux-Cailles, appartements récents et tours modernistes",
    description: "Rénovation d'appartements et maisons dans le 13ème arrondissement de Paris.",
    specifics: "Rénovation électrique aux normes NF C 15-100, création de douches à l'italienne étanches.",
    avgPricePerSqm: "900 € à 1 400 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-appartement-65m2-avant.webp",
      afterImage: "/images/realisations/renovation-appartement-65m2-apres.webp",
      beforeLabel: "Avant",
      afterLabel: "Après ERG",
      title: "Rénovation appartement 4 pièces Butte-aux-Cailles",
    },
    faqs: [
      { q: "Est-il possible de créer une douche à l'italienne dans un appartement du 13e ?", a: "Oui, si la réservation dans la chape le permet ou en créant une marche technique d'accès." },
    ],
  },
  "paris-14": {
    number: 14,
    name: "Paris 14e (Montparnasse / Alésia / Denfert)",
    postalCode: "75014",
    slug: "paris-14",
    neighborhoods: ["Montparnasse", "Plaisance", "Petit-Montrouge", "Parc-de-Montsouris"],
    architecturalStyle: "Immeubles Art Déco, appartements ateliers et copropriétés pierre de taille",
    description: "Rénovation intérieure sur-mesure dans le 14ème arrondissement de Paris.",
    specifics: "Aménagement sur-mesure de placards et bibliothèques intégrées, pose de parquets chêne massif.",
    avgPricePerSqm: "950 € à 1 500 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-2-pieces-avant.webp",
      afterImage: "/images/realisations/renovation-2-pieces-apres.webp",
      beforeLabel: "Avant",
      afterLabel: "Après",
      title: "Rénovation 3 pièces Montparnasse",
    },
    faqs: [
      { q: "Quels sont les avantages d'un interlocuteur unique pour son chantier ?", a: "Un seul coordinateur gère le planning des électriciens, plombiers, peintres et menuisiers pour un respect strict des délais." },
    ],
  },
  "paris-15": {
    number: 15,
    name: "Paris 15e (Vaugirard / Grenelle / Convention)",
    postalCode: "75015",
    slug: "paris-15",
    neighborhoods: ["Saint-Lambert", "Necker", "Grenelle", "Javel"],
    architecturalStyle: "Grands ensembles familiaux, résidences de standing et haussmanniens",
    description: "Spécialiste rénovation appartement familial et cuisine équipée dans le 15ème arrondissement de Paris.",
    specifics: "Redistribution 3 et 4 pièces, création de secondes salles d'eau pour les familles.",
    avgPricePerSqm: "950 € à 1 500 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-complete-appartement-avant.webp",
      afterImage: "/images/realisations/renovation-complete-appartement-apres.webp",
      beforeLabel: "Avant",
      afterLabel: "Après ERG",
      title: "Rénovation appartement familial 85m² Convention",
    },
    faqs: [
      { q: "Combien de temps faut-il pour rénover un 4 pièces dans le 15e ?", a: "Comptez généralement entre 6 et 10 semaines de chantier selon l'ampleur des démolitions et finitions." },
    ],
  },
  "paris-16": {
    number: 16,
    name: "Paris 16e (Auteuil / Passy / Trocadéro)",
    postalCode: "75016",
    slug: "paris-16",
    neighborhoods: ["Auteuil", "Passy", "Muette", "Porte-Dauphine"],
    architecturalStyle: "Immeubles haussmanniens d'envergure, Art Nouveau (Guimard) et pierre de taille d'exception",
    description: "Entreprise de rénovation haut de gamme d'appartements bourgeois dans le 16ème arrondissement de Paris.",
    specifics: "Restauration d'éléments d'époque (staff, moulures, dorures), salles de bain marbre et menuiserie d'art.",
    avgPricePerSqm: "1 200 € à 1 950 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-appartement-65m2-avant.webp",
      afterImage: "/images/realisations/renovation-appartement-65m2-apres.webp",
      beforeLabel: "Avant Travaux",
      afterLabel: "Après Rénovation ERG",
      title: "Rénovation d'appartement d'exception 120m² Passy",
    },
    faqs: [
      { q: "Comment préserver les moulures d'origine lors d'un doublage ou passage de câbles ?", a: "Nous réalisons des saignées techniques ciblées et faisons intervenir un staffeur pour reproduire à l'identique les ornements." },
    ],
  },
  "paris-17": {
    number: 17,
    name: "Paris 17e (Ternes / Batignolles / Monceau)",
    postalCode: "75017",
    slug: "paris-17",
    neighborhoods: ["Batignolles", "Ternes", "Plaine de Monceau", "Épinettes"],
    architecturalStyle: "Haussmannien classique (Monceau), lofts et éco-quartiers modernes (Clichy-Batignolles)",
    description: "Rénovation d'appartements et rénovations énergétiques dans le 17ème arrondissement de Paris.",
    specifics: "Conception de grandes pièces de vie ouvertes, réfection totale des peintures et revêtements.",
    avgPricePerSqm: "1 100 € à 1 750 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-2-pieces-avant.webp",
      afterImage: "/images/realisations/renovation-2-pieces-apres.webp",
      beforeLabel: "Avant",
      afterLabel: "Après ERG",
      title: "Rénovation appartement 3 pièces Batignolles",
    },
    faqs: [
      { q: "Quelles sont les finitions de peinture conseillées ?", a: "Nous appliquons des peintures écologiques dépoussiérantes classe A+ avec impression et ponçage pour un rendu rendu parfait." },
    ],
  },
  "paris-18": {
    number: 18,
    name: "Paris 18e (Montmartre / Abbesses / Lamarck)",
    postalCode: "75018",
    slug: "paris-18",
    neighborhoods: ["Montmartre", "Goutte-d'Or", "Grandes-Carrières", "La Chapelle"],
    architecturalStyle: "Immeubles villageois, appartements sous combles et immeubles 1900",
    description: "Rénovation d'appartements à fort caractère et réagencement sur Montmartre et le 18ème arrondissement.",
    specifics: "Isolation sous toiture, aménagement de sous-pentes et création de puits de lumière.",
    avgPricePerSqm: "950 € à 1 500 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-studio-avant.webp",
      afterImage: "/images/realisations/renovation-studio-apres.webp",
      beforeLabel: "Origine",
      afterLabel: "Rénové",
      title: "Aménagement sous-comble Montmartre",
    },
    faqs: [
      { q: "Comment isoler un dernier étage sous combles ?", a: "Par une isolation en laine de roche ou panneaux sous rampant combinée à une membrane étanche à l'air." },
    ],
  },
  "paris-19": {
    number: 19,
    name: "Paris 19e (La Villette / Buttes-Chaumont)",
    postalCode: "75019",
    slug: "paris-19",
    neighborhoods: ["Buttes-Chaumont", "Villette", "Pont-de-Flandre", "Combat"],
    architecturalStyle: "Copropriétés récentes, lofts industriels et résidences verdoyantes",
    description: "Rénovation d'appartements lumineux et réagencement intérieur dans le 19ème arrondissement de Paris.",
    specifics: "Pose de parquets contrecollés chêne, rénovation complète de salles de bain familiales.",
    avgPricePerSqm: "850 € à 1 350 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-salle-de-bain-3m2-avant.webp",
      afterImage: "/images/realisations/renovation-salle-de-bain-3m2-apres.webp",
      beforeLabel: "Avant",
      afterLabel: "Après",
      title: "Rénovation salle de bain Buttes-Chaumont",
    },
    faqs: [
      { q: "Est-il possible d'ouvrir une cuisine sur le séjour ?", a: "Oui, après étude de la cloison (simple plâtre ou cloison alvéolaire) et validation technique." },
    ],
  },
  "paris-20": {
    number: 20,
    name: "Paris 20e (Belleville / Ménilmontant / Gambetta)",
    postalCode: "75020",
    slug: "paris-20",
    neighborhoods: ["Belleville", "Ménilmontant", "Père-Lachaise", "Charonne"],
    architecturalStyle: "Immeubles faubouriens, petites maisons de ville et ateliers d'artistes",
    description: "Entreprise de rénovation basée dans le 20ème arrondissement de Paris (Gambetta / Charonne).",
    specifics: "Expertise de proximité, rénovations complètes d'appartements et optimisation d'investissements.",
    avgPricePerSqm: "850 € à 1 350 € / m²",
    beforeAfterProject: {
      beforeImage: "/images/realisations/renovation-complete-appartement-avant.webp",
      afterImage: "/images/realisations/renovation-complete-appartement-apres.webp",
      beforeLabel: "Avant Travaux",
      afterLabel: "Après Rénovation ERG",
      title: "Rénovation complète appartement Gambetta",
    },
    faqs: [
      { q: "Pourquoi choisir ERG Rénovation dans le 20e ?", a: "Nos équipes sont basées à Paris 20e (1 Sentier de la Pointe) et connaissent parfaitement le bâti et les copropriétés du secteur." },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(PARIS_ARRONDISSEMENTS).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const data = PARIS_ARRONDISSEMENTS[params.slug];
  if (!data) return { title: `Rénovation appartement Paris` };

  const pageTitle = `Rénovation appartement Paris ${data.number === 1 ? '1er' : `${data.number}e`} (${data.postalCode})`;
  const pageDescription = `Entreprise de rénovation d'appartement à ${data.name} (${data.postalCode}). Devis gratuit poste par poste, garantie décennale, suivi sur-mesure. ${data.neighborhoods.join(", ")}.`;
  const canonicalUrl = `${SITE_URL}/renovation-paris/${data.slug}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      type: "website",
      locale: "fr_FR",
      siteName: BRAND,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

function JsonLd({ data }: { data: ParisArrondissementData }) {
  const pageUrl = `${SITE_URL}/renovation-paris/${data.slug}`;
  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Rénovation appartement ${data.name}`,
      url: pageUrl,
      isPartOf: { "@type": "WebSite", name: BRAND, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      name: BRAND,
      url: SITE_URL,
      telephone: PHONE_E164,
      priceRange: "€€€",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1 Sent. de la Pointe",
        addressLocality: "Paris",
        postalCode: "75020",
        addressCountry: "FR",
      },
      areaServed: [{ "@type": "City", name: data.name, postalCode: data.postalCode }],
      serviceType: [
        "Rénovation d'appartement",
        "Rénovation de salle de bain",
        "Rénovation de cuisine",
        "Travaux tous corps d'état",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Rénovation d'appartement à ${data.name}`,
      serviceType: "Rénovation intérieure",
      provider: { "@type": "HomeAndConstructionBusiness", name: BRAND, url: SITE_URL },
      areaServed: { "@type": "City", name: data.name, postalCode: data.postalCode },
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: pageUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <Script
      id={`jsonld-renovation-${data.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function ParisArrondissementPage({ params }: { params: { slug: string } }) {
  const data = PARIS_ARRONDISSEMENTS[params.slug];
  if (!data) notFound();

  const otherArrondissements = Object.values(PARIS_ARRONDISSEMENTS).filter((a) => a.slug !== data.slug);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd data={data} />
      <SiteHeader />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-slate-900 py-16 md:py-24 text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#amber-500_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="container relative z-10">
            <div className="mx-auto max-w-4xl text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
                <Link href="/" className="hover:underline">Accueil</Link>
                <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                <Link href="/renovation-paris" className="hover:underline">Paris</Link>
                <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                <span className="text-white">{data.postalCode}</span>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400">
                <MapPin className="h-4 w-4" />
                {data.name} • Tous Quartiers
              </span>

              <h1 className="font-headline text-4xl font-extrabold sm:text-5xl lg:text-6xl tracking-tight leading-tight">
                Rénovation d’Appartement à <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                  {data.name}
                </span>
              </h1>

              <p className="mt-4 mx-auto max-w-3xl text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                {data.description} Profitez d'un interlocuteur unique, d'un devis transparent poste par poste et d'une garantie décennale 10 ans.
              </p>

              {/* Badges */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-3 backdrop-blur-md">
                  <ShieldCheck className="h-5 w-5 text-amber-400 mb-1" />
                  <span className="block text-xs font-bold text-white">Garantie 10 Ans</span>
                  <span className="text-[11px] text-slate-400">Décennale vérifiée</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-3 backdrop-blur-md">
                  <Clock3 className="h-5 w-5 text-amber-400 mb-1" />
                  <span className="block text-xs font-bold text-white">Devis sous 24h</span>
                  <span className="text-[11px] text-slate-400">Visite offerte</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-3 backdrop-blur-md">
                  <Users className="h-5 w-5 text-amber-400 mb-1" />
                  <span className="block text-xs font-bold text-white">Interlocuteur Unique</span>
                  <span className="text-[11px] text-slate-400">Chef de projet dédié</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-3 backdrop-blur-md">
                  <CheckCircle2 className="h-5 w-5 text-amber-400 mb-1" />
                  <span className="block text-xs font-bold text-white">Clé en Main</span>
                  <span className="text-[11px] text-slate-400">Conception & Travaux</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="h-14 px-8 bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 text-base shadow-xl rounded-xl w-full sm:w-auto">
                  <Link href="/devis">
                    Simuler mon devis à {data.postalCode} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-6 border-slate-700 bg-slate-800/80 text-white hover:bg-slate-800 text-base rounded-xl w-full sm:w-auto">
                  <a href={`tel:${PHONE_E164}`}>
                    <Phone className="mr-2 h-5 w-5 text-amber-400" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ARRONDISSEMENT SPECIFICS SECTION */}
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-700">
                  <Sparkles className="h-3.5 w-3.5 text-amber-600" /> Expertise Locale & Architecture
                </div>

                <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  Spécificités de Rénovation dans le <span className="text-amber-600">{data.postalCode}</span>
                </h2>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  {data.specifics}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Style Architectural Dominate</span>
                    <span className="text-sm font-semibold text-slate-900 block">{data.architecturalStyle}</span>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Fourchette indicative de travaux</span>
                    <span className="text-sm font-bold text-amber-700 block">{data.avgPricePerSqm}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Quartiers d'intervention couverts :</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.neighborhoods.map((q) => (
                      <span key={q} className="rounded-lg bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 shadow-2xs">
                        📍 {q}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Before/After Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-white p-4 shadow-2xl border border-slate-200 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
                    Exemple de transformation ERG
                  </span>
                  <BeforeAfterSlider
                    beforeImage={data.beforeAfterProject.beforeImage}
                    afterImage={data.beforeAfterProject.afterImage}
                    beforeLabel={data.beforeAfterProject.beforeLabel}
                    afterLabel={data.beforeAfterProject.afterLabel}
                    alt={"Exemple de rénovation ERG — photos illustratives, localisation non attribuée"}
                    aspectRatio="aspect-[4/3]"
                    className="rounded-2xl overflow-hidden shadow-md"
                  />
                  <span className="block text-xs font-bold text-slate-900 text-center pt-1">
                    {"Exemple de rénovation ERG — photos illustratives, localisation non attribuée"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES OFFERED */}
        <AnimatedSection>
          <section className="py-16 md:py-24 bg-white border-b border-slate-200">
            <div className="container">
              <div className="mx-auto max-w-2xl text-center space-y-3">
                <h2 className="font-headline text-3xl font-bold text-slate-900">
                  Nos Prestations de Rénovation à {data.name}
                </h2>
                <p className="text-slate-600 text-base">
                  Du simple rafraîchissement à la rénovation lourde avec modification de cloisons.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-2">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">Rénovation Appartement Clé en Main</CardTitle>
                    <CardDescription>
                      Démolition, redistribution d'espace, électricité NF C 15-100, plomberie, parquets et peintures de précision.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" asChild className="p-0 text-amber-700 font-bold">
                      <Link href="/services/renovation-appartement">
                        En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-2">
                      <Bath className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">Rénovation Salle de Bain</CardTitle>
                    <CardDescription>
                      Douches à l'italienne, étanchéité SEL sous carrelage, meuble vasque sur-mesure et robinetterie encastrée.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" asChild className="p-0 text-amber-700 font-bold">
                      <Link href="/services/renovation-salle-de-bain">
                        En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-2">
                      <UtensilsCrossed className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">Rénovation Cuisine Sur-Mesure</CardTitle>
                    <CardDescription>
                      Ouverture sur séjour, verrières, îlots centraux, plans de travail quartz/granit et raccordements techniques.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" asChild className="p-0 text-amber-700 font-bold">
                      <Link href="/services/renovation-cuisine">
                        En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* FAQ SECTION */}
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="container max-w-3xl mx-auto">
            <div className="text-center space-y-3">
              <h2 className="font-headline text-3xl font-bold text-slate-900">
                FAQ — Rénovation dans le {data.name}
              </h2>
              <p className="text-slate-600 text-base">
                Vos questions fréquentes pour réussir vos travaux dans le {data.postalCode}.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full mt-8 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              {data.faqs.map((f, i) => (
                <AccordionItem value={`item-${i}`} key={i}>
                  <AccordionTrigger className="text-left font-semibold text-slate-900">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* OTHER ARRONDISSEMENTS NAVIGATION */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h3 className="font-headline text-2xl font-bold text-slate-900">
                Nos interventions dans les autres arrondissements parisiens
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
              {otherArrondissements.map((arr) => (
                <Button key={arr.slug} asChild variant="outline" className="h-11 rounded-xl text-xs font-bold border-slate-200 hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-700 transition-all">
                  <Link href={`/renovation-paris/${arr.slug}`}>
                    {arr.name.split(" ")[0]} {arr.name.split(" ")[1]} ({arr.postalCode})
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>

      <SiteFooter />
    </div>
  );
}
