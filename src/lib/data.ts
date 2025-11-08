import type { Service, Project, Testimonial, ProcessStep, NavItem } from './types';
import {
  Home,
  Bath,
  CookingPot,
  Building,
  Square,
  Building2,
  Paintbrush,
  Hammer
} from 'lucide-react';

export const navItems: NavItem[] = [
  { title: 'Services', href: '/services' },
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
    heroImageId: 'service-apartment',
    longDescription: "Que vous veniez d'acquérir un bien ou que vous souhaitiez rafraîchir votre lieu de vie, nous transformons votre appartement pour qu'il corresponde parfaitement à vos attentes. De la restructuration des volumes à la sélection des finitions, nous gérons chaque aspect pour créer un intérieur qui vous ressemble, en optimisant l'espace, la lumière et la fonctionnalité.",
    benefits: [
      {
        title: "Optimisation de l'espace",
        description: "Nous repensons les agencements pour maximiser chaque mètre carré et améliorer la fluidité de la circulation."
      },
      {
        title: "Valorisation de votre patrimoine",
        description: "Une rénovation de qualité augmente significativement la valeur de votre bien immobilier sur le marché parisien."
      },
      {
        title: "Confort et modernité",
        description: "Nous intégrons les dernières innovations en matière d'isolation, de domotique et d'équipements pour un confort de vie optimal."
      }
    ],
    relatedProjectSlugs: ['appartement-haussmannien-paris-16']
  },
  {
    title: 'Rénovation de maison',
    slug: 'renovation-maison',
    description: 'Rénovation intérieure et extérieure pour votre maison.',
    icon: Home,
    heroImageId: 'service-house',
    longDescription: "Votre maison est un projet de vie. Nous vous accompagnons pour la rénover, l'agrandir ou la moderniser. Du gros œuvre aux finitions, nous coordonnons tous les corps de métier pour garantir un résultat harmonieux et durable, en respectant le caractère de votre demeure tout en y apportant le confort et le style contemporain.",
    benefits: [
      {
        title: "Efficacité énergétique",
        description: "Améliorez l'isolation de votre maison pour réduire vos factures d'énergie et gagner en confort thermique."
      },
      {
        title: "Extension et surélévation",
        description: "Gagnez des mètres carrés précieux en créant de nouveaux espaces de vie adaptés à l'évolution de votre famille."
      },
      {
        title: "Cohérence architecturale",
        description: "Nous veillons à ce que chaque modification s'intègre parfaitement à l'existant pour un rendu esthétique et cohérent."
      }
    ],
    relatedProjectSlugs: ['maison-ville-moderne-boulogne']
  },
  {
    title: 'Rénovation de salle de bain',
    slug: 'renovation-salle-de-bain',
    description: 'Création de salles de bain modernes et fonctionnelles.',
    icon: Bath,
    heroImageId: 'service-bathroom',
    longDescription: "Transformez votre salle de bain en un véritable havre de paix. Douche à l'italienne, baignoire îlot, double vasque, nous concevons un espace sur mesure qui allie esthétique, fonctionnalité et bien-être. Nous portons une attention particulière à l'étanchéité, la ventilation et le choix de matériaux résistants et faciles d'entretien.",
    benefits: [
      {
        title: "Espace bien-être",
        description: "Créez une atmosphère relaxante avec des matériaux nobles, un éclairage soigné et des équipements de qualité."
      },
      {
        title: "Optimisation de petits espaces",
        description: "Nous avons des solutions astucieuses pour rendre les petites salles de bain à la fois belles et ultra-fonctionnelles."
      },
      {
        title: "Accessibilité et sécurité",
        description: "Nous pouvons adapter votre salle de bain pour les personnes à mobilité réduite (PMR) en respectant les normes en vigueur."
      }
    ],
    relatedProjectSlugs: ['suite-parentale-spa-neuilly', 'salle-eau-combles-versailles']
  },
  {
    title: 'Rénovation de cuisine',
    slug: 'renovation-cuisine',
    description: 'Conception et installation de cuisines sur mesure.',
    icon: CookingPot,
    heroImageId: 'service-kitchen',
    longDescription: "La cuisine est le cœur de la maison. Nous la concevons avec vous pour qu'elle soit conviviale, ergonomique et parfaitement équipée. De la conception des plans 3D à la pose des derniers éléments, nous assurons une installation millimétrée pour un résultat à la hauteur de vos ambitions culinaires.",
    benefits: [
      {
        title: "Ergonomie et fonctionnalité",
        description: "Nous optimisons le triangle d'activité (froid, lavage, cuisson) pour une utilisation intuitive et agréable au quotidien."
      },
      {
        title: "Matériaux de qualité",
        description: "Plans de travail, façades, crédences... nous vous proposons une large gamme de matériaux pour tous les styles et budgets."
      },
      {
        title: "Convivialité",
        description: "Cuisine ouverte avec îlot central, coin repas intégré... nous créons un espace qui invite au partage et à la convivialité."
      }
    ],
    relatedProjectSlugs: ['cuisine-ouverte-design-vincennes']
  },
  {
    title: 'Aménagement de combles',
    slug: 'amenagement-combles',
    description: "Transformez un espace perdu en une pièce de vie lumineuse.",
    icon: Hammer,
    heroImageId: 'service-attic',
    longDescription: "Ne laissez plus vos combles prendre la poussière ! Nous les transformons en chambres, suite parentale, bureau ou salle de jeu. De l'isolation à la création de fenêtres de toit, nous exploitons tout le potentiel de cet espace pour agrandir votre surface habitable et apporter une plus-value à votre bien.",
     benefits: [
      {
        title: "Gain de surface habitable",
        description: "C'est la solution la plus efficace pour agrandir votre maison sans modifier l'emprise au sol."
      },
      {
        title: "Luminosité et vue",
        description: "L'installation de fenêtres de toit (type Velux) inonde l'espace de lumière naturelle et offre des vues dégagées."
      },
      {
        title: "Isolation thermique performante",
        description: "Une bonne isolation des combles est essentielle pour réduire jusqu'à 30% des déperditions de chaleur de votre maison."
      }
    ],
    relatedProjectSlugs: ['salle-eau-combles-versailles']
  },
  {
    title: 'Peinture et finitions',
    slug: 'peinture-finitions',
    description: 'La touche finale qui sublime vos murs et vos espaces.',
    icon: Paintbrush,
    heroImageId: 'service-painting',
    longDescription: "La qualité d'une rénovation se voit dans les détails. Nos peintres experts maîtrisent toutes les techniques pour un rendu impeccable : préparation des supports, application de peintures écologiques, pose de papiers peints, enduits décoratifs... Nous vous conseillons sur les couleurs et les finitions pour créer l'ambiance qui vous correspond.",
    benefits: [
      {
        title: "Finition parfaite",
        description: "Une préparation minutieuse des murs est la clé d'un résultat lisse, durable et sans défaut."
      },
      {
        title: "Conseil en décoration",
        description: "Nous vous aidons à choisir les harmonies de couleurs qui mettront en valeur vos volumes et votre mobilier."
      },
      {
        title: "Matériaux de qualité",
        description: "Nous travaillons avec des peintures professionnelles reconnues pour leur pouvoir couvrant, leur résistance et leur faible taux de COV."
      }
    ],
    relatedProjectSlugs: ['appartement-haussmannien-paris-16']
  },
];

export const projectCategories = [
  "Appartement",
  "Maison",
  "Studio",
  "Cuisine",
  "Salle de bain",
  "Bureaux",
  "Loft"
];


export const featuredProjects: Project[] = [
  {
    title: 'Appartement Haussmannien',
    slug: 'appartement-haussmannien-paris-16',
    category: 'Appartement',
    images: { before: 'project-apartment-1-before', after: 'project-apartment-1' },
    description: 'Rénovation complète d’un appartement de 120m² dans le 16ème arrondissement.'
  },
  {
    title: 'Cuisine Ouverte Design',
    slug: 'cuisine-ouverte-design-vincennes',
    category: 'Cuisine',
    images: { before: 'project-kitchen-1-before', after: 'project-kitchen-1' },
    description: 'Création d’une cuisine avec îlot central et matériaux nobles.'
  },
  {
    title: 'Suite parentale avec spa',
    slug: 'suite-parentale-spa-neuilly',
    category: 'Salle de bain',
    images: { before: 'project-bathroom-1-before', after: 'project-bathroom-1' },
    description: 'Transformation d’une salle de bain en un espace de détente luxueux.'
  },
  {
    title: 'Loft industriel',
    slug: 'loft-industriel-montreuil',
    category: 'Loft',
    images: { before: 'project-office-1-before', after: 'project-office-1' },
    description: 'Aménagement d’un ancien atelier en un loft moderne et lumineux.'
  },
];

export const allProjects: Project[] = [
  ...featuredProjects,
  {
    title: 'Studio optimisé',
    slug: 'studio-optimise-marais',
    category: 'Studio',
    images: { before: 'project-studio-1-before', after: 'project-studio-1' },
    description: 'Optimisation de l\'espace pour ce studio de 25m² au coeur du Marais.',
  },
  {
    title: 'Maison de ville moderne',
    slug: 'maison-ville-moderne-boulogne',
    category: 'Maison',
    images: { before: 'project-house-1-before', after: 'project-house-1' },
    description: 'Rénovation et extension d\'une maison de ville à Boulogne-Billancourt.',
  },
  {
    title: 'Bureaux d\'avocats',
    slug: 'bureaux-avocats-paris-8',
    category: 'Bureaux',
    images: { before: 'project-office-2-before', after: 'project-office-2' },
    description: 'Aménagement d\'un plateau de bureaux pour un cabinet d\'avocats prestigieux.',
  },
  {
    title: 'Salle d\'eau sous combles',
    slug: 'salle-eau-combles-versailles',
    category: 'Salle de bain',
    images: { before: 'project-bathroom-2-before', after: 'project-bathroom-2' },
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
