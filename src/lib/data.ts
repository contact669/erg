import type { Service, Project, Testimonial, ProcessStep, NavItem } from './types';
import {
  Home,
  Bath,
  CookingPot,
  Building,
  Sofa,
  Building2,
  Square,
} from 'lucide-react';

export const navItems: NavItem[] = [
  { title: 'Services', href: '#services' },
  { title: 'Réalisations', href: '/realisations' },
  { title: 'À Propos', href: '/a-propos' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
];

export const services: Service[] = [
  {
    title: 'Rénovation d’appartement',
    slug: 'renovation-appartement',
    description: 'Transformation complète ou partielle de votre appartement.',
    icon: Building,
  },
  {
    title: 'Rénovation de studio',
    slug: 'renovation-studio',
    description: 'Optimisation d’espace et modernisation de studios.',
    icon: Square,
  },
  {
    title: 'Rénovation de maison',
    slug: 'renovation-maison',
    description: 'Rénovation intérieure et extérieure pour votre maison.',
    icon: Home,
  },
  {
    title: 'Rénovation de salle de bain',
    slug: 'renovation-salle-de-bain',
    description: 'Création de salles de bain modernes et fonctionnelles.',
    icon: Bath,
  },
  {
    title: 'Rénovation de cuisine',
    slug: 'renovation-cuisine',
    description: 'Conception et installation de cuisines sur mesure.',
    icon: CookingPot,
  },
  {
    title: 'Rénovation de bureaux',
    slug: 'renovation-bureaux',
    description: 'Aménagement et rénovation de vos espaces professionnels.',
    icon: Building2,
  },
];

export const featuredProjects: Project[] = [
  {
    title: 'Appartement Haussmannien',
    slug: 'appartement-haussmannien-paris-16',
    category: 'Appartement',
    image: 'project-apartment-1',
    description: 'Rénovation complète d’un appartement de 120m² dans le 16ème arrondissement.'
  },
  {
    title: 'Cuisine Ouverte Design',
    slug: 'cuisine-ouverte-design-vincennes',
    category: 'Cuisine',
    image: 'project-kitchen-1',
    description: 'Création d’une cuisine avec îlot central et matériaux nobles.'
  },
  {
    title: 'Suite parentale avec spa',
    slug: 'suite-parentale-spa-neuilly',
    category: 'Salle de bain',
    image: 'project-bathroom-1',
    description: 'Transformation d’une salle de bain en un espace de détente luxueux.'
  },
  {
    title: 'Loft industriel',
    slug: 'loft-industriel-montreuil',
    category: 'Loft',
    image: 'project-office-1',
    description: 'Aménagement d’un ancien atelier en un loft moderne et lumineux.'
  },
];

export const allProjects: Project[] = [
  ...featuredProjects,
  {
    title: 'Studio optimisé',
    slug: 'studio-optimise-marais',
    category: 'Studio',
    image: 'project-studio-1',
    description: 'Optimisation de l\'espace pour ce studio de 25m² au coeur du Marais.',
  },
  {
    title: 'Maison de ville moderne',
    slug: 'maison-ville-moderne-boulogne',
    category: 'Maison',
    image: 'project-house-1',
    description: 'Rénovation et extension d\'une maison de ville à Boulogne-Billancourt.',
  },
  {
    title: 'Bureaux d\'avocats',
    slug: 'bureaux-avocats-paris-8',
    category: 'Bureaux',
    image: 'project-office-2',
    description: 'Aménagement d\'un plateau de bureaux pour un cabinet d\'avocats prestigieux.',
  },
  {
    title: 'Salle d\'eau sous combles',
    slug: 'salle-eau-combles-versailles',
    category: 'Salle de bain',
    image: 'project-bathroom-2',
    description: 'Création d\'une salle d\'eau fonctionnelle et élégante sous les toits.',
  },
];


export const testimonials: Testimonial[] = [
  {
    name: 'Famille Durand',
    location: 'Paris 20ème',
    quote:
      'ERG Rénovation a transformé notre appartement au-delà de nos espérances. Professionnalisme et finitions impeccables. Nous recommandons vivement !',
    avatar: 'testimonial-avatar-1',
  },
  {
    name: 'Sophie L.',
    location: 'Boulogne-Billancourt',
    quote:
      'Un grand merci à toute l’équipe pour la rénovation de ma cuisine. Le résultat est magnifique et fonctionnel. Le suivi de chantier était parfait.',
    avatar: 'testimonial-avatar-2',
  },
  {
    name: 'M. Martin',
    location: 'Vincennes',
    quote:
      'J’ai confié la rénovation de mon studio à ERG et je suis ravi. Les délais ont été respectés et l’espace a été optimisé de manière très intelligente.',
    avatar: 'testimonial-avatar-3',
  },
];

export const processSteps: ProcessStep[] = [
    {
        step: 1,
        title: 'Premier Contact & Devis',
        description: 'Discutons de votre projet. Nous vous fournissons une estimation détaillée et transparente sous 48h.'
    },
    {
        step: 2,
        title: 'Conception & Planification',
        description: 'Nos architectes d’intérieur conçoivent les plans 3D et nous planifions chaque étape du chantier.'
    },
    {
        step: 3,
        title: 'Réalisation des Travaux',
        description: 'Nos artisans qualifiés réalisent les travaux avec des matériaux de qualité, dans le respect des délais.'
    },
    {
        step: 4,
        title: 'Livraison & Garantie',
        description: 'Nous vous livrons un chantier impeccable et vous bénéficiez de toutes nos garanties décennales.'
    }
]

    