
import type { Service, Project, Testimonial, ProcessStep, NavItem, BlogPost } from './types';
import {
  Home,
  Bath,
  CookingPot,
  Building,
  Hammer,
  Paintbrush,
  Sparkles,
  ClipboardCheck,
  Users,
  Award,
  BookOpen,
  FileOutput,
  Layers,
  Milestone,
  ShieldCheck
} from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from './placeholder-images';

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
        title: "Rénovation Complète d'Appartement",
        description: "Démolition, redistribution des espaces, refonte des réseaux (plomberie, électricité), isolation (phonique et thermique), jusqu'aux finitions."
      },
      {
        title: "Rénovation par Pièce",
        description: "Spécialistes des pièces techniques : conception de cuisines sur-mesure, création de salles de bain, optimisation de l'espace et de la lumière."
      },
      {
        title: "Rénovation Énergétique",
        description: "Améliorez votre confort et la valeur de votre bien : isolation des murs, remplacement de fenêtres, installation de systèmes de chauffage performants."
      },
      {
        title: "Agencement et Menuiserie sur Mesure",
        description: "Création de dressings, bibliothèques, et solutions de rangement intégrées qui s'adaptent parfaitement à l'architecture de votre appartement."
      }
    ],
    process: [
        { step: 1, title: 'Consultation et Devis', description: 'Visite sur site (Paris, 92, 93, 94, 78), écoute de vos besoins, analyse technique et remise d\'un devis détaillé et transparent.' },
        { step: 2, title: 'Conception et Planification', description: 'Validation des plans (si nécessaire avec architecte), choix des matériaux, établissement d\'un planning précis.' },
        { step: 3, title: 'Réalisation des Travaux', description: 'Pilotage de nos équipes qualifiées (tous corps d\'état), réunions de chantier régulières, et un interlocuteur unique dédié à votre projet.' },
        { step: 4, title: 'Livraison et Garanties', description: 'Réception des travaux sans réserve, remise des documents (dont la garantie décennale) et service après-vente réactif.' }
    ],
    whyUs: [
        { title: "Une Expertise Reconnue à Paris et en Île-de-France", description: "Notre connaissance des spécificités de l'immobilier francilien (immeubles anciens, contraintes de copropriété, normes) est votre meilleure garantie. Nous intervenons quotidiennement dans le 75, 92, 93, 94 et 78.", icon: Award },
        { title: "La Garantie d'un Interlocuteur Unique", description: "Fini le stress de la coordination. Votre chef de projet dédié est votre seul point de contact. Il pilote les artisans, gère le planning et assure le contrôle qualité permanent.", icon: Users },
        { title: 'Des Finitions "Haut de Gamme"', description: "Le 'très très haut niveau' se voit dans les détails. Nous travaillons avec des matériaux nobles et nos artisans sont sélectionnés pour leur excellence (peintures soignées, pose de parquet, marbrerie...).", icon: Sparkles },
        { title: 'Transparence et Garanties', description: "Tous nos travaux sont couverts par une assurance décennale et une assurance responsabilité civile. Nos devis sont clairs et nos délais, tenus.", icon: ClipboardCheck }
    ],
    zones: {
        description: "Basée au cœur de la région, ERG Rénovation déploie ses équipes pour tous projets de rénovation d'appartement à Paris (75), de l'Haussmannien aux lofts. Notre expertise s'étend également à la petite couronne.",
        list: "Hauts-de-Seine (92) (Neuilly-sur-Seine, Boulogne-Billancourt...), Seine-Saint-Denis (93) (Montreuil, Saint-Ouen...), Val-de-Marne (94) (Vincennes, Saint-Mandé...) et dans les Yvelines (78) (Versailles, Saint-Germain-en-Laye...)."
    },
    faq: [
        { question: "Quel est le prix moyen d'une rénovation d'appartement au m² à Paris ?", answer: "Le coût d'une rénovation haut de gamme à Paris varie généralement entre 1 500 € et 2 500 € par mètre carré, selon la complexité, les matériaux choisis et l'état initial du bien. Chez ERG Rénovation, nous nous engageons à fournir un devis détaillé et transparent, sans frais cachés, pour que vous maîtrisiez parfaitement votre budget." },
        { question: "Combien de temps dure une rénovation complète ?", answer: "Pour un appartement de 50m², une rénovation complète dure en moyenne entre 2 et 4 mois. Pour 100m², il faut compter entre 4 et 6 mois. Ces délais dépendent de l'ampleur des travaux. Nous établissons un planning précis et nous nous y tenons." },
        { question: "Gérez-vous les autorisations de travaux (copropriété, mairie) ?", answer: "Oui, absolument. Nous vous accompagnons dans toutes les démarches administratives. Que ce soit la déclaration de travaux en mairie ou la présentation du projet en assemblée générale de copropriété, nous préparons les dossiers pour vous garantir une tranquillité totale." },
        { question: "Possédez-vous la garantie décennale ?", answer: "Oui, c'est une obligation légale et notre plus grand gage de sérieux. Tous nos travaux sont couverts par notre garantie décennale, qui assure la réparation des dommages pouvant survenir dans les 10 ans suivant la réception du chantier. Votre investissement est ainsi protégé." }
    ],
    relatedProjectSlugs: ['appartement-haussmannien-paris-16', 'studio-optimise-marais']
  },
  {
    title: 'Rénovation de maison',
    slug: 'renovation-maison',
    description: 'Rénovation intérieure et extérieure pour votre maison.',
    icon: Home,
    heroImageId: 'service-house',
    longDescription: "Votre maison est un projet de vie. Nous vous accompagnons pour la rénover, l'agrandir et la transformer en l'espace dont vous avez toujours rêvé. Qu'il s'agisse de moderniser une bâtisse ancienne dans les Yvelines, d'agrandir un pavillon dans les Hauts-de-Seine ou de réhabiliter une maison de ville à Paris, ERG Rénovation est votre maître d'œuvre unique pour un projet géré avec excellence.",
    benefits: [
      {
        title: "Rénovation Complète et Réhabilitation",
        description: "Repenser intégralement votre intérieur. Redistribution des volumes, mise aux normes (électricité, plomberie), isolation, et finitions. Nous transformons les contraintes de l'ancien en atouts de caractère."
      },
      {
        title: "Extension, Agrandissement et Surélévation",
        description: "Besoin de plus d'espace ? Nous concevons et réalisons votre extension (ossature bois, traditionnelle) ou votre surélévation, en gérant les démarches administratives (permis de construire) et les défis structurels."
      },
      {
        title: "Rénovation Énergétique et Façade",
        description: "Valorisez votre patrimoine et améliorez votre confort. Isolation thermique par l'extérieur (ITE) ou l'intérieur (ITI), ravalement de façade, remplacement des menuiseries et optimisation de votre système de chauffage."
      },
      {
        title: "Aménagement de Combles et Sous-sols",
        description: "Créez de nouvelles pièces de vie (suite parentale, salle de jeux, bureau) en exploitant les espaces perdus de votre maison."
      }
    ],
    process: [
        { step: 1, title: 'L\'Écoute & la Faisabilité', description: 'Rencontre à votre domicile (Paris, 78, 92, 93, 94), analyse de vos besoins, étude de la faisabilité technique et réglementaire (PLU).' },
        { step: 2, title: 'Conception & Chiffrage', description: 'Proposition de plans (avec nos architectes partenaires si besoin), sélection rigoureuse des matériaux et remise d\'un devis détaillé, poste par poste.' },
        { step: 3, title: 'Pilotage & Réalisation', description: 'Un conducteur de travaux unique dédié à votre projet. Il pilote nos équipes, garantit la qualité d\'exécution et organise les réunions de chantier.' },
        { step: 4, title: 'Livraison Sereine', description: 'Réception des travaux, levée des réserves, et remise de votre dossier de garanties (décennale). Votre projet de vie est devenu réalité.' }
    ],
    whyUs: [
        { title: "La Maîtrise des Projets Complexes", description: "Une extension, une ouverture de mur porteur ou une réhabilitation complète ne s'improvisent pas. Nous disposons des assurances (décennale) et des compétences techniques (bureau d'études structure) pour sécuriser ces interventions majeures.", icon: Layers },
        { title: "Votre Interlocuteur Unique, du Plan à la Finition", description: "Nous internalisons ou pilotons l'ensemble des métiers : maçons, couvreurs, menuisiers... Vous n'avez qu'un seul responsable : ERG Rénovation.", icon: Users },
        { title: 'La Passion du "Sur Mesure"', description: "Votre maison est unique. Nous ne proposons pas de solutions standards, mais un projet entièrement sur mesure, des plans d'agencement aux menuiseries intégrées.", icon: Sparkles },
        { title: 'Transparence et Garanties', description: "Tous nos travaux sont couverts par une assurance décennale et une assurance responsabilité civile. Nos devis sont clairs et nos délais, tenus.", icon: ClipboardCheck }
    ],
    zones: {
        description: "ERG Rénovation est le spécialiste des projets résidentiels haut de gamme en Île-de-France. Nos équipes interviennent pour la rénovation de maisons dans les Yvelines (78) (Versailles, Saint-Germain-en-Laye...) et les Hauts-de-Seine (92) (Meudon, Saint-Cloud, Sceaux...), où se concentrent de nombreux pavillons et demeures de caractère.",
        list: "Nous gérons également les projets de maisons de ville à Paris (75), ainsi que les rénovations dans le Val-de-Marne (94) (Nogent-sur-Marne, Saint-Maur-des-Fossés) et en Seine-Saint-Denis (93) (Le Raincy, Montreuil)."
    },
    faq: [
        { question: "Faut-il un permis de construire pour une extension de maison ?", answer: "Pour une extension jusqu'à 40m² en zone urbaine couverte par un PLU, une déclaration préalable de travaux suffit généralement. Au-delà, un permis de construire est nécessaire. ERG Rénovation s'occupe de la constitution et du dépôt de votre dossier en mairie." },
        { question: "Quelles aides financières pour une rénovation énergétique ?", answer: "Vous pouvez bénéficier de plusieurs aides comme MaPrimeRénov', l'Éco-prêt à taux zéro (Eco-PTZ) ou la TVA à taux réduit. Si nous sommes certifiés RGE (Reconnu Garant de l'Environnement), nous vous aidons à monter les dossiers pour maximiser vos subventions." },
        { question: "Combien de temps durent les travaux de rénovation d'une maison ?", answer: "Cela dépend de l'ampleur. Une rénovation intérieure complète (100-120m²) dure environ 3 à 4 mois. Pour une rénovation lourde avec extension ou surélévation, il faut compter entre 6 et 9 mois. Nous vous fournissons un planning détaillé dès le départ." },
        { question: "Gérez-vous les relations avec les Architectes des Bâtiments de France (ABF) ?", answer: "Oui. Si votre maison est située en secteur sauvegardé ou à proximité d'un monument historique, l'avis de l'ABF est requis. Notre expérience de ces dossiers complexes fluidifie les échanges et assure la conformité de votre projet." }
    ],
    relatedProjectSlugs: ['maison-ville-moderne-boulogne']
  },
  {
    title: 'Rénovation de salle de bain',
    slug: 'renovation-salle-de-bain',
    description: 'Création de salles de bain modernes et fonctionnelles.',
    icon: Bath,
    heroImageId: 'service-bathroom',
    longDescription: "Plus qu'une simple pièce d'eau, votre salle de bain est un sanctuaire. La transformer en un espace de détente digne d'un spa, tout en optimisant chaque mètre carré, est un art qui exige une précision technique absolue. ERG Rénovation est le spécialiste de la conception et de la rénovation de salles de bain haut de gamme à Paris et en Île-de-France (75, 92, 93, 94, 78), garantissant des finitions parfaites et une étanchéité irréprochable.",
    benefits: [
      {
        title: "Rénovation Complète (Plomberie, Électricité, Revêtements)",
        description: "Dépose complète, refonte des réseaux de plomberie et d'électricité (norme NF C 15-100), gestion de la ventilation (VMC) et pose de tous revêtements."
      },
      {
        title: "Conception et Installation de Douche à l'Italienne",
        description: "Notre cœur de métier. Étanchéité parfaite (système S.E.L.), pose de receveur extra-plat ou maçonné, parois de verre sur mesure et robinetterie de luxe (encastrée ou non)."
      },
      {
        title: "Pose de Matériaux Nobles (Marbre, Carrelage Grand Format, Mosaïque)",
        description: "La finition \"haut de gamme\" réside dans la pose. Nos artisans maîtrisent la pose de marbre, de faïence, de mosaïque et de carrelage grand format avec une précision millimétrique."
      },
      {
        title: "Agencement et Mobilier sur Mesure",
        description: "Optimisation de l'espace avec des meubles-vasques sur mesure, création de niches murales éclairées, et intégration de rangements invisibles pour une esthétique épurée."
      }
    ],
    process: [
        { step: 1, title: 'Rendez-vous Conseil & Conception', description: "Visite sur site (Paris et IDF), écoute de vos envies (style \"spa\", \"design\", \"classique\"), prise de cotes et proposition de plans 3D pour visualiser votre futur espace." },
        { step: 2, title: 'Choix des Matériaux & Devis', description: "Nous vous guidons dans le choix des robinetteries, sanitaires, carrelages et éclairages. Remise d'un devis transparent et détaillé." },
        { step: 3, title: 'Réalisation Pilotée', description: "Un interlocuteur unique gère le planning, coordonne les plombiers, électriciens et carreleurs, et protège vos espaces de vie pendant les travaux." },
        { step: 4, title: 'Réception et Garantie', description: "Nettoyage final, réception de chantier sans réserve, et activation de votre garantie décennale sur l'ensemble des travaux." }
    ],
    whyUs: [
        { title: "Étanchéité Infalible", description: "Nous appliquons des systèmes d'étanchéité liquide (S.E.L.) sous carrelage et des bandes de renfort dans tous les angles, dépassant les normes DTU pour une sécurité maximale.", icon: ShieldCheck },
        { title: "Plomberie et Électricité aux Normes", description: "Tous nos réseaux sont neufs, testés sous pression (plomberie) et conformes aux volumes de sécurité électrique (NF C 15-100).", icon: Users },
        { title: "Gestion de la Pente (Douche Italienne)", description: "Nous garantissons une pente parfaite pour l'évacuation, un détail technique crucial que seuls les experts maîtrisent.", icon: Milestone }
    ],
    zones: {
      description: "Notre expertise en rénovation de salle de bain s'exerce dans les appartements haussmanniens de Paris (75), où l'optimisation est reine, comme dans les maisons des Hauts-de-Seine (92) et des Yvelines (78) (création de suites parentales).",
      list: "Nous intervenons également sur des projets exigeants en Seine-Saint-Denis (93) et dans le Val-de-Marne (94)."
    },
    faq: [
        { question: "Quel est le prix d'une rénovation complète de salle de bain haut de gamme ?", answer: "Le prix dépend des matériaux (marbre vs. carrelage) et de la robinetterie, mais une prestation ERG Rénovation se situe généralement à partir de 2 000 €/m². Nous fournissons un devis détaillé pour une transparence totale." },
        { question: "Combien de temps faut-il pour refaire une salle de bain ?", answer: "Entre 2 et 4 semaines en moyenne pour une rénovation complète. Nous nous engageons fermement à respecter le planning que nous établissons avec vous." },
        { question: "Comment garantissez-vous l'étanchéité d'une douche à l'italienne ?", answer: "C'est notre priorité absolue. Nous utilisons des systèmes d'étanchéité liquide (S.E.L) sous carrelage, effectuons des tests de mise en eau et l'ensemble est couvert par notre garantie décennale." },
        { question: "Faut-il une autorisation pour refaire sa salle de bain à Paris ?", answer: "Généralement non, une déclaration de travaux n'est pas nécessaire sauf si vous modifiez un mur porteur ou la colonne d'évacuation de l'immeuble. Si c'est le cas, nous nous occupons de toutes les démarches." }
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
];

export const blogPosts: BlogPost[] = [
  {
    slug: '10-astuces-renovation-appartement-parisien',
    title: '10 Astuces pour Réussir la Rénovation de votre Appartement Parisien',
    description: 'Découvrez nos conseils d’experts pour naviguer les défis uniques de la rénovation à Paris, de l’optimisation de l’espace à la gestion de la copropriété.',
    date: '2025-11-08',
    author: 'A. AIT',
    featuredImageId: 'blog-post-1',
    tags: ['Rénovation', 'Appartement', 'Conseils'],
    content: (() => {
      const verriereImage = PlaceHolderImages.find(p => p.id === 'blog-image-verriere');
      const parquetImage = PlaceHolderImages.find(p => p.id === 'blog-image-parquet');

      return (
        <>
          <p>Rénover un appartement à Paris présente des défis uniques : <strong>espaces contraints</strong>, <strong>réglementations de copropriété strictes</strong>, et le charme de l'ancien à préserver. Chez ERG Rénovation, nous avons l'habitude de jongler avec ces contraintes pour créer des intérieurs modernes et fonctionnels. Voici nos 10 astuces clés pour garantir le succès de votre projet.</p>
          
          <h2>1. Optimisez chaque mètre carré</h2>
          <p>Dans les appartements parisiens, chaque centimètre compte. Pensez "verticalité" avec des <strong>rangements toute hauteur</strong>, et "multifonctionnalité" avec du mobilier modulable. Une verrière d'atelier peut délimiter un espace sans bloquer la lumière, une solution idéale pour créer un coin bureau ou une chambre d'appoint.</p>
          
          {verriereImage && (
            <div className="my-8 overflow-hidden rounded-lg">
              <Image 
                src={verriereImage.imageUrl} 
                alt={verriereImage.description} 
                width={800}
                height={500}
                className="w-full h-auto object-cover"
                data-ai-hint={verriereImage.imageHint} 
              />
            </div>
          )}

          <h2>2. La lumière, votre meilleure alliée</h2>
          <p>Favorisez la lumière naturelle en décloisonnant lorsque c'est possible. Utilisez des <strong>couleurs claires</strong> sur les murs et des <strong>miroirs stratégiquement placés</strong> pour agrandir visuellement l'espace et réfléchir la lumière. Un bon plan d'éclairage artificiel, avec plusieurs sources (directes et indirectes), est également crucial.</p>
          
          <h2>3. Respectez l'âme du lieu</h2>
          <p><strong>Parquet en point de Hongrie</strong>, <strong>moulures</strong>, <strong>cheminées en marbre</strong>... L'ancien a un charme fou. Plutôt que de tout cacher, restaurez et mettez en valeur ces éléments. Ils peuvent être magnifiquement contrastés avec des éléments de design contemporain pour un style "parisien chic" très recherché.</p>

          {parquetImage && (
            <div className="my-8 overflow-hidden rounded-lg">
              <Image 
                src={parquetImage.imageUrl} 
                alt={parquetImage.description} 
                width={800}
                height={500}
                className="w-full h-auto object-cover"
                data-ai-hint={parquetImage.imageHint} 
              />
            </div>
          )}

          <h2>4. Anticipez les démarches de copropriété</h2>
          <p>Ne sous-estimez pas les délais administratifs. Toute modification des murs porteurs, des fenêtres ou des parties communes nécessite l'accord de la copropriété. Présentez un <strong>dossier solide</strong>, préparé par des professionnels, pour mettre toutes les chances de votre côté.</p>
          
          <h2>5. Isolez, isolez, isolez !</h2>
          <p>L'<strong>isolation phonique et thermique</strong> est un investissement essentiel pour le confort. Contre les bruits de la rue et des voisins, des solutions efficaces existent (doublage des murs, fenêtres à double vitrage performant). Une bonne isolation thermique vous fera également faire des économies d'énergie substantielles.</p>
          
          <h2>6. Pensez aux rangements intégrés</h2>
          <p>Les <strong>rangements sur-mesure</strong> sont la clé d'un intérieur parisien réussi. Ils s'adaptent aux recoins, optimisent les volumes et se fondent dans le décor pour une sensation d'espace et d'ordre. Découvrez nos solutions d'<a href="/services/renovation-appartement">aménagement intérieur</a>.</p>
          
          <h2>7. Choisissez des matériaux durables et adaptés</h2>
          <p>Un parquet massif sera plus résistant et pourra être rénové plusieurs fois. Dans la salle de bain, privilégiez des matériaux résistants à l'humidité. Nos artisans sauront vous conseiller les meilleurs choix en fonction de votre budget et de votre style de vie.</p>
          
          <h2>8. Ne négligez pas l'entrée</h2>
          <p>L'entrée donne la première impression. Elle doit être à la fois fonctionnelle et accueillante. Pensez à un petit meuble, un miroir et un éclairage soigné pour créer une transition élégante vers le reste de l'appartement.</p>
          
          <h2>9. Un chef de projet unique pour votre tranquillité</h2>
          <p>Coordonner les différents corps de métier (plombier, électricien, peintre...) peut vite devenir un casse-tête. Faire appel à une entreprise de rénovation tous corps d'état comme ERG Rénovation vous garantit un interlocuteur unique et une gestion de projet fluide.</p>
          
          <h2>10. Définissez un budget réaliste et prévoyez une marge</h2>
          <p>Un projet de rénovation réserve souvent des surprises. Nous vous aidons à établir un devis détaillé, mais il est toujours prudent de prévoir une <strong>marge de 10 à 15%</strong> pour les imprévus. Cette précaution vous permettra de mener votre projet à terme en toute sérénité.</p>
          
          <p>Prêt à vous lancer ? <a href="/devis"><strong>Contactez-nous pour une étude personnalisée de votre projet.</strong></a></p>
        </>
      )
    })()
  },
  {
    slug: 'comment-choisir-bon-artisan-travaux',
    title: 'Comment Choisir le Bon Artisan pour vos Travaux ? Les 5 points clés',
    description: 'La réussite de vos travaux dépend grandement du choix de vos artisans. Voici les critères essentiels à vérifier avant de vous engager.',
    date: '2025-10-15',
    author: 'K. AIT',
    featuredImageId: 'blog-post-2',
    tags: ['Conseils', 'Artisans', 'Qualité'],
    content: (
        <>
            <p>Engager des travaux de rénovation est un investissement important. Le choix de l'artisan ou de l'entreprise qui les réalisera est sans doute la décision la plus cruciale pour la réussite de votre projet. Un mauvais choix peut entraîner des <strong>malfaçons, des retards et des surcoûts importants</strong>. Alors, comment s'assurer de faire le bon choix ?</p>

            <h2>1. Vérifiez les qualifications et les assurances</h2>
            <p>C'est le point de départ non négociable. Un professionnel sérieux doit pouvoir vous présenter :</p>
            <ul>
                <li><strong>Son immatriculation au Répertoire des Métiers</strong> ou au Registre du Commerce.</li>
                <li><strong>Son assurance de responsabilité civile professionnelle (RC Pro) :</strong> elle couvre les dommages que l'artisan pourrait causer chez vous durant les travaux.</li>
                <li><strong>Son assurance décennale :</strong> obligatoire pour le gros œuvre et les travaux pouvant affecter la solidité du bâtiment, elle vous couvre pendant 10 ans contre les malfaçons.</li>
            </ul>
            <p><strong>N'hésitez pas à demander les attestations</strong> et à vérifier leur validité auprès des assureurs.</p>

            <h2>2. Analysez la clarté et le détail du devis</h2>
            <p>Un devis ne doit pas être une simple ligne avec un total. Un devis professionnel est un document détaillé qui doit mentionner :</p>
            <ul>
                <li>Le décompte détaillé de chaque prestation (en quantité et en prix unitaire).</li>
                <li>Les matériaux utilisés (marque, modèle, caractéristiques).</li>
                <li>La date de début et la durée estimée des travaux.</li>
                <li>Les conditions de paiement.</li>
                <li>Le taux de TVA applicable.</li>
            </ul>
            <p>Méfiez-vous des devis trop flous ou <strong>anormalement bas</strong>. Comparez au moins 3 devis pour avoir une idée juste du marché.</p>

            <h2>3. Demandez à voir des réalisations précédentes</h2>
            <p>Les photos, c'est bien. Visiter un chantier récemment terminé (avec l'accord du propriétaire), c'est mieux ! Cela vous permet de juger concrètement de la <strong>qualité des finitions</strong> et du soin apporté par l'artisan. C'est également l'occasion de discuter avec d'anciens clients de leur expérience. Vous pouvez consulter nos <a href="/realisations">projets ici</a>.</p>

            <h2>4. Fiez-vous au bouche-à-oreille et aux avis</h2>
            <p>La réputation d'un artisan est un excellent indicateur. Sollicitez votre entourage. Consultez également les avis en ligne sur des plateformes spécialisées, en gardant un esprit critique. Plusieurs avis positifs et détaillés sont souvent un bon signe.</p>

            <h2>5. Évaluez le contact et la communication</h2>
            <p>Dès les premiers échanges, vous devez vous sentir en confiance. L'artisan est-il <strong>à votre écoute</strong> ? Est-il <strong>force de proposition</strong> ? Prend-il le temps de répondre clairement à vos questions ? Une bonne communication est essentielle pour une collaboration sereine tout au long du chantier.</p>

            <p>Chez ERG Rénovation, nous cochons toutes ces cases. Nous avons bâti notre réputation sur la transparence, la qualité de nos réalisations et la satisfaction de nos clients. Nous vous accompagnons avec un <strong>interlocuteur unique</strong> qui pilote l'ensemble des artisans qualifiés nécessaires à votre projet.</p>
            <p>Pour un projet mené en toute confiance, <a href="/contact"><strong>discutons ensemble de vos envies.</strong></a></p>
        </>
    )
  }
];
    

