

import type { Service, Project, Testimonial, ProcessStep, NavItem, BlogPost, LocalLandingPage, Area } from './types';
import {
  Home,
  Bath,
  UtensilsCrossed,
  Building2,
  Hammer,
  Paintbrush,
  Sparkles,
  ClipboardList,
  Award,
  BookOpen,
  Layers,
  Milestone,
  ShieldCheck,
  ThermometerSun,
  CheckCircle,
  Wrench,
  Scaling,
  Lightbulb,
  Droplets,
  Calendar,
  Wallet,
  Users,
  Gem,
  LogOut
} from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from './placeholder-images';
import Link from 'next/link';

export const navItems: NavItem[] = [
  { title: 'Services', href: '/services' },
  { title: 'Réalisations', href: '/realisations' },
  { title: 'Zones d\'intervention', href: '/zones-intervention' },
  { title: 'À Propos', href: '/a-propos' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
];

export const services: Service[] = [
  {
    title: 'Rénovation d’appartement',
    slug: 'renovation-appartement',
    description: 'Transformation complète ou partielle de votre appartement.',
    icon: Building2,
    heroImageId: 'service-apartment',
    benefitImageId: 'service-pillar-kitchen',
    whyUsImageId: 'service-pillar-finish',
    longDescription: "Transformer un appartement parisien ou francilien en un lieu de vie exceptionnel exige une expertise de la structure, une gestion de projet rigoureuse et une passion pour les finitions parfaites. Nous gérons chaque détail de votre projet à Paris, dans les Hauts-de-Seine (92), la Seine-Saint-Denis (93), le Val-de-Marne (94) et les Yvelines (78).",
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
        { title: 'Transparence et Garanties', description: "Tous nos travaux sont couverts par une assurance décennale et une assurance responsabilité civile. Nos devis sont clairs et nos délais, tenus.", icon: ClipboardList }
    ],
    zones: {
        description: "Basée au cœur de la région, ERG Rénovation déploie ses équipes pour tous projets de rénovation d'appartement à Paris (75) et en Île-de-France. Cliquez sur votre département pour découvrir notre expertise locale :",
        list: [
            { name: 'Hauts-de-Seine (92)', slug: 'renovation-hauts-de-seine' },
            { name: 'Val-de-Marne (94)', slug: 'renovation-val-de-marne' },
            { name: 'Yvelines (78)', slug: 'yvelines-78' },
            { name: 'Seine-Saint-Denis (93)', slug: 'renovation-seine-saint-denis' }
        ]
    },
    faq: [
        { question: "Quel est le prix moyen d'une rénovation d'appartement au m² à Paris ?", answer: "Le coût d'une rénovation haut de gamme à Paris varie généralement entre 1 500 € et 2 500 € par mètre carré, selon la complexité, les matériaux choisis et l'état initial du bien. Chez ERG Rénovation, nous nous engageons à fournir un devis détaillé et transparent, sans frais cachés, pour que vous maîtrisiez parfaitement votre budget." },
        { question: "Combien de temps dure une rénovation complète ?", answer: "Pour un appartement de 50m², une rénovation complète dure en moyenne entre 2 et 4 mois. Pour 100m², il faut compter entre 4 et 6 mois. Ces délais dépendent de l'ampleur des travaux. Nous établissons un planning précis et nous nous y tenons." },
        { question: "Gérez-vous les autorisations de travaux (copropriété, mairie) ?", answer: "Oui, absolument. Nous vous accompagnons dans toutes les démarches administratives. Que ce soit la déclaration de travaux en mairie ou la présentation du projet en assemblée générale de copropriété, nous préparons les dossiers pour vous garantir une tranquillité totale." },
        { question: "Possédez-vous la garantie décennale ?", answer: "Oui, c'est une obligation légale et notre plus grand gage de sérieux. Tous nos travaux sont couverts par notre garantie décennale, qui assure la réparation des dommages pouvant survenir dans les 10 ans suivant la réception du chantier. Votre investissement est ainsi protégé." }
    ],
    relatedProjectSlugs: ['appartement-haussmannien-paris-16', 'studio-optimise-marais', 'renovation-appartement-cloisons-vincennes']
  },
  {
    title: 'Rénovation de maison',
    slug: 'renovation-maison',
    description: 'Rénovation intérieure et extérieure pour votre maison.',
    icon: Home,
    heroImageId: 'service-house',
    benefitImageId: 'project-house-1',
    whyUsImageId: 'project-bathroom-1',
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
        { title: 'Des Finitions "Sur Mesure"', description: "Votre maison est unique. Nous ne proposons pas de solutions standards, mais un projet entièrement sur mesure, des plans d'agencement aux menuiseries intégrées.", icon: Sparkles },
        { title: 'Transparence et Garanties', description: "Tous nos travaux sont couverts par une assurance décennale et une assurance responsabilité civile. Nos devis sont clairs et nos délais, tenus.", icon: ClipboardList }
    ],
    zones: {
        description: "ERG Rénovation est le spécialiste des projets résidentiels haut de gamme en Île-de-France. Nos équipes interviennent pour la rénovation de maisons dans les Yvelines (78) (Versailles, Saint-Germain-en-Laye...) et les Hauts-de-Seine (92) (Meudon, Saint-Cloud, Sceaux...), où se concentrent de nombreux pavillons et demeures de caractère.",
        list: [
            { name: 'Yvelines (78)', slug: 'yvelines-78' },
            { name: 'Hauts-de-Seine (92)', slug: 'renovation-hauts-de-seine' },
            { name: 'Val-de-Marne (94)', slug: 'renovation-val-de-marne' },
            { name: 'Seine-Saint-Denis (93)', slug: 'renovation-seine-saint-denis' }
        ]
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
    benefitImageId: 'project-bathroom-1',
    whyUsImageId: 'project-small-bathroom-after',
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
        { title: "Plomberie et Électricité aux Normes", description: "Tous nos réseaux sont neufs, testés sous pression (plomberie) et conformes aux volumes de sécurité électrique (NF C 15-100).", icon: Wrench },
        { title: "Gestion de la Pente (Douche Italienne)", description: "Nous garantissons une pente parfaite pour l'évacuation, un détail technique crucial que seuls les experts maîtrisent.", icon: Milestone }
    ],
    zones: {
      description: "Notre expertise en rénovation de salle de bain s'exerce dans les appartements haussmanniens de Paris (75), où l'optimisation est reine, comme dans les maisons des Hauts-de-Seine (92) et des Yvelines (78) (création de suites parentales).",
      list: [
        { name: 'Paris 16e', slug: 'renovation-salle-de-bain/paris-16' },
        { name: 'Hauts-de-Seine (92)', slug: 'renovation-hauts-de-seine' }
      ]
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
    icon: UtensilsCrossed,
    heroImageId: 'service-kitchen',
    benefitImageId: 'project-kitchen-1',
    whyUsImageId: 'service-pillar-kitchen',
    longDescription: "La cuisine n'est plus seulement un lieu de préparation, c'est le cœur battant de votre intérieur. Sa rénovation est un projet complexe qui touche à tous les corps de métier : plomberie, électricité, plâtrerie, et agencement de précision. ERG Rénovation orchestre votre projet de A à Z, de la conception de votre cuisine sur mesure à l'installation impeccable, à Paris et en Île-de-France (75, 92, 93, 94, 78).",
    benefits: [
      {
        title: "Conception et Aménagement sur Mesure",
        description: "Optimisation de l'ergonomie (triangle d'activité), conception de plans 3D, et création de mobilier sur mesure (îlot central, rangements intégrés, verrières)."
      },
      {
        title: "Travaux Tous Corps d'État (TCE)",
        description: "La clé d'une cuisine réussie. Modification des réseaux (plomberie, électricité), gestion de l'extraction (hotte), pose de crédence et de revêtements de sol (parquet, carrelage)."
      },
      {
        title: "Ouverture de Cuisine (Projet Structurel)",
        description: "Spécialistes de la création de cuisines ouvertes. Nous gérons l'abattage de murs porteurs (avec étude de bureau d'ingénierie et pose d'IPN) en toute sécurité."
      },
      {
        title: "Pose et Finitions Haut de Gamme",
        description: "Installation millimétrique de vos meubles, pose de plans de travail nobles (marbre, granit, quartz, Dekton), raccordement de l'électroménager et intégration des éclairages (LED sous meubles, spots)."
      }
    ],
    process: [
      { step: 1, title: 'Atelier de Conception', description: "Visite à domicile pour analyser vos besoins, votre style de vie et les contraintes techniques de votre logement (Paris, 92, 93, 94, 78)." },
      { step: 2, title: 'Chiffrage et Plans', description: "Proposition de plans 3D et d'un devis détaillé poste par poste (travaux préparatoires, mobilier, électroménager, pose)." },
      { step: 3, title: 'Phase Travaux', description: "Notre conducteur de travaux dédié pilote la démolition, la mise aux normes des réseaux et la préparation des supports (murs, sols)." },
      { step: 4, title: 'Pose et Réception', description: "Installation de la cuisine par nos menuisiers-poseurs, finitions et réception de chantier. Votre cuisine est prête à l'emploi." }
    ],
    whyUs: [
        { title: "Plans de Travail", description: "Quartz (Silestone, Caesarstone), matériaux ultra-compacts (Dekton), pierre naturelle (marbre, granit) ou bois massif.", icon: Milestone },
        { title: "Façades", description: "Laques mates ou brillantes, finitions bois nobles (chêne, noyer), Fénix (mat anti-traces), ou façades techniques (Inox).", icon: Layers },
        { title: "Crédences & Robinetterie", description: "Solutions design et fonctionnelles (Zellige, verre, inox, robinetterie avec douchette, eau filtrante...).", icon: Sparkles }
    ],
    zones: {
        description: "Nous intervenons pour la rénovation de cuisines dans les appartements parisiens (Paris 75), où l'optimisation de l'espace est cruciale. Notre expertise est également reconnue dans les Hauts-de-Seine (92) et les Yvelines (78) pour des projets d'envergure (cuisines ouvertes sur réception dans des maisons).",
        list: "Nous couvrons aussi le Val-de-Marne (94) et la Seine-Saint-Denis (93)."
    },
    faq: [
      { question: "Quel budget pour une rénovation complète de cuisine haut de gamme ?", answer: "Le budget varie grandement selon la taille, les matériaux et l'électroménager. Une prestation complète fournie-posée par ERG Rénovation commence généralement autour de 15 000€ et peut dépasser 50 000€ pour des projets de luxe. Nous fournissons un devis transparent pour chaque projet." },
      { question: "Combien de temps faut-il pour rénover une cuisine ?", answer: "En moyenne, il faut compter entre 3 et 5 semaines pour une rénovation complète, incluant les travaux préparatoires (plomberie, électricité) et la pose. Notre pilotage intégral garantit le respect de ce planning." },
      { question: "Faut-il un permis pour abattre la cloison entre la cuisine et le salon ?", answer: "Si le mur n'est pas porteur, une simple déclaration préalable de travaux peut suffire. S'il est porteur, une étude structurelle par un ingénieur et un permis de construire sont obligatoires. Nous nous occupons de gérer ces démarches pour vous." },
      { question: "Gérez-vous la commande et la livraison de l'électroménager ?", answer: "Oui, nous offrons un service clé en main. Nous pouvons intégrer une offre complète incluant l'électroménager négocié auprès de nos partenaires, ou assurer la pose parfaite de l'équipement que vous avez choisi vous-même." }
    ],
    relatedProjectSlugs: ['cuisine-ouverte-design-vincennes']
  },
  {
    title: 'Aménagement de combles',
    slug: 'amenagement-combles',
    description: "Transformez un espace perdu en une pièce de vie lumineuse.",
    icon: Hammer,
    heroImageId: 'service-attic',
    benefitImageId: 'service-attic',
    whyUsImageId: 'project-bathroom-2',
    longDescription: "Et si vous aviez un étage en plus ? L'aménagement de combles est la solution la plus intelligente pour augmenter votre surface habitable sans déménager. C'est cependant l'un des projets de rénovation les plus techniques. ERG Rénovation est votre expert en transformation de combles à Paris et en Île-de-France (75, 78, 92, 93, 94), maîtrisant l'isolation, la structure et la création d'espaces de vie exceptionnels sous les toits.",
     benefits: [
      {
        title: "Aménagement Complet de Combles",
        description: "Création d'un espace de vie A à Z : plancher porteur, isolation, électricité, plomberie (pour salle d'eau), chauffage et finitions."
      },
      {
        title: "Isolation Thermique et Phonique",
        description: "La clé du confort sous les toits. Nous mettons en œuvre les meilleures solutions (laine de roche haute densité, isolants minces...) pour un confort parfait été comme hiver (mention RGE si applicable)."
      },
      {
        title: "Création d'Ouvertures (Fenêtres de Toit, Lucarnes)",
        description: "Faire entrer la lumière. Nous maîtrisons la pose de Velux, de verrières de toit ou la création de lucarnes (\"chiens-assis\") dans le respect des règles d'urbanisme."
      },
      {
        title: "Travaux de Structure et d'Accès",
        description: "Modification de charpente (type fermette), renforcement de plancher, et création de la trémie pour un escalier sur mesure (design ou gain de place)."
      }
    ],
    process: [
        { step: 1, title: 'Visite & Faisabilité', description: "Analyse de vos combles (hauteur sous faîtage, pente du toit, type de charpente) et de vos besoins (suite parentale, salle de jeux, bureau...)." },
        { step: 2, title: 'Conception & Chiffrage', description: "Proposition de plans d'aménagement optimisés et d'un devis détaillé (incluant isolation, structure, finitions)." },
        { step: 3, title: 'Autorisations d\'Urbanisme', description: "Prise en charge complète du dossier administratif (DP ou PC)." },
        { step: 4, title: 'Réalisation des Travaux', description: "Pilotage des équipes (charpentiers, couvreurs, plaquistes, plombiers...) par un conducteur de travaux unique." }
    ],
    whyUs: [
        { title: "Étude de Structure", description: "Avant tout projet, nous vérifions la capacité portante du plancher et l'état de la charpente. Nous travaillons avec des bureaux d'études structure si nécessaire.", icon: Layers },
        { title: "Gestion Administrative (Permis)", description: "Nous prenons en charge le montage et le dépôt de votre dossier : Déclaration Préalable de Travaux ou Permis de Construire.", icon: Wrench },
        { title: 'Confort Thermique Garanti', description: "Notre priorité absolue est d'éviter l'effet \"fournaise\" en été. Nous soignons l'isolation et la ventilation (VMC) pour un espace habitable toute l'année.", icon: ThermometerSun }
    ],
    zones: {
        description: "Nous intervenons sur l'aménagement de combles des maisons dans les Yvelines (78), les Hauts-de-Seine (92), le Val-de-Marne (94) et la Seine-Saint-Denis (93).",
        list: "Notre expertise s'applique également aux projets complexes de réunion de lots ou d'aménagement des \"chambres de bonne\" au dernier étage des immeubles à Paris (75)."
    },
    faq: [
      { question: "Mes combles sont-ils aménageables ?", answer: "Les prérequis sont une hauteur sous faîtage de plus de 1m80 et une pente de toit supérieure à 30%. La charpente peut souvent être modifiée. Nous évaluons cela lors de notre visite de faisabilité." },
      { question: "Faut-il un permis de construire ou une déclaration de travaux ?", answer: "Oui. Une Déclaration Préalable (DP) pour une pose de Velux ou une création de surface inférieure à 20m². Un Permis de Construire (PC) au-delà, ou si vous modifiez la structure porteuse ou la façade. Nous gérons intégralement ces dossiers." },
      { question: "Comment éviter d'avoir trop chaud en été sous les toits ?", answer: "C'est notre priorité. Nous utilisons une isolation très performante, des pare-soleil extérieurs sur les fenêtres de toit et nous assurons une ventilation efficace (VMC)." },
      { question: "Quel est le prix au m² pour un aménagement de combles ?", answer: "C'est un coût de 'création de m²'. Il varie selon la complexité (structure, accès...) mais se situe généralement entre 1 500 € et 3 000 €/m² pour une prestation complète. Notre devis est détaillé et transparent." }
    ],
    relatedProjectSlugs: ['salle-eau-combles-versailles']
  },
  {
    title: 'Peinture et finitions',
    slug: 'peinture-finitions',
    description: 'La touche finale qui sublime vos murs et vos espaces.',
    icon: Paintbrush,
    heroImageId: 'service-painting',
    benefitImageId: 'service-painting',
    whyUsImageId: 'service-pillar-finish',
    longDescription: "Le succès d'une rénovation se juge à la perfection de ses finitions. Une peinture ou un revêtement mural impeccablement posé est la touche finale qui confère à votre intérieur son caractère \"très très haut de gamme\". Chez ERG Rénovation, nos peintres décorateurs sont des compagnons, garants d'une préparation minutieuse des supports et d'un résultat sans défaut à Paris, dans les Hauts-de-Seine, les Yvelines, et toute l'Île-de-France.",
    benefits: [
      {
        title: "Préparation Minutieuse des Supports (Le Fondement)",
        description: "C'est notre engagement \"haut de gamme\". Lessivage, traitement des fissures, application d'enduit de lissage, ponçage fin, et application de sous-couches techniques uniformes. Un support parfait est non-négociable."
      },
      {
        title: "Peinture Décorative et Technique",
        description: "Application de peintures de haute qualité (mat velouté pour les plafonds, satin pour les murs, laque tendue pour les boiseries). Maîtrise des techniques de rechampi et des finitions sans trace."
      },
      {
        title: "Revêtements Muraux et Papiers Peints",
        description: "Pose de tous types de revêtements : papiers peints haut de gamme (vinyle, intissé, panoramique), toiles à peindre, et enduits décoratifs (stucs, Tadelakt si pertinent)."
      },
      {
        title: "Finitions des Boiseries et Moulures",
        description: "Restauration, décapage et mise en peinture (laque) des portes, plinthes, moulures et cimaises. Rénovation des parquets (ponçage et vitrification)."
      }
    ],
    process: [
        { step: 1, title: 'Diagnostic et Conseil Couleur', description: "Analyse de la lumière, de l'état des supports et propositions de palettes de couleurs (ou de textures) adaptées à l'ambiance désirée." },
        { step: 2, title: 'Protection Totale du Chantier', description: "Démontage, bâchage soigné des sols et masquage précis de toutes les zones (interrupteurs, prises, menuiseries). Le chantier doit rester impeccable." },
        { step: 3, title: 'Préparation du Support', description: "Application des enduits et ponçages fins nécessaires. C'est le secret d'une finition parfaite." },
        { step: 4, title: 'Application Multicouche et Contrôle', description: "Respect des temps de séchage, application des couches successives, contrôle qualité et nettoyage minutieux pour une livraison parfaite." }
    ],
    whyUs: [
        { title: "Le Savoir-Faire de Nos Compagnons Peintres", description: "Nos artisans sont sélectionnés pour leur expertise dans les finitions tendues (sans effet \"peau d'orange\") et leur minutie, essentiels pour le luxe.", icon: Award },
        { title: "Des Matériaux qui Font la Différence", description: "Nous travaillons avec des peintures et revêtements reconnus pour leur qualité, leur tenue dans le temps et leur rendu esthétique (Ressource, Little Greene...).", icon: Sparkles },
        { title: "Un Chantier Propre, une Prestation Sans Souci", description: "La propreté est partie intégrante de notre service haut de gamme. Protection, nettoyage quotidien et respect de votre domicile sont assurés.", icon: ClipboardList }
    ],
    zones: {
        description: "Qu'il s'agisse de restaurer les moulures d'un Haussmannien à Paris (75) ou d'apporter des finitions contemporaines à une maison des Yvelines (78) ou des Hauts-de-Seine (92), nos équipes sont à votre disposition.",
        list: "Nous intervenons sur tous projets exigeants dans les départements 93 et 94."
    },
    faq: [
      { question: "Qu'est-ce qui justifie le prix d'une peinture haut de gamme ?", answer: "Environ 80% du coût réside dans la préparation minutieuse du support (enduits, ponçages multiples) et dans la main d'œuvre qualifiée, bien plus que dans le prix du pot de peinture lui-même. C'est ce qui garantit une finition parfaite et durable." },
      { question: "Quelle finition choisir (Mat, Satin, Velours) ?", answer: "Le Mat Velouté, très tendance, offre un rendu poudré et chic, idéal pour les pièces à vivre. Le Satin est plus résistant et lessivable, parfait pour les cuisines, salles de bain et couloirs. Nous vous conseillons selon l'usage et la lumière de chaque pièce." },
      { question: "Combien de temps faut-il prévoir pour une peinture complète ?", answer: "Pour un appartement de type T3 (environ 70m²), il faut compter entre 1 et 2 semaines. Ce délai inclut le temps de séchage incompressible entre les couches, qui est un gage de qualité." },
      { question: "Proposez-vous des conseils en colorimétrie ?", answer: "Oui, nos chefs de projet vous accompagnent dans le choix des teintes et des harmonies pour qu'elles correspondent parfaitement à l'ambiance que vous souhaitez créer et à la luminosité de votre intérieur." }
    ],
    relatedProjectSlugs: ['appartement-haussmannien-paris-16']
  },
];

const renovationAppartementPages: LocalLandingPage[] = [
  {
    slug: 'neuilly-sur-seine',
    type: 'city',
    title: "Rénovation d'Appartement à Neuilly-sur-Seine (92200)",
    metaTitle: 'Rénovation Appartement Neuilly-sur-Seine (92) | ERG Rénovation',
    metaDescription: "Expert en rénovation d'appartements haut de gamme à Neuilly-sur-Seine. ERG Rénovation gère votre projet de A à Z : plans, travaux, finitions de luxe.",
    parentService: services.find(s => s.slug === 'renovation-appartement')!,
    introduction: "La rénovation d'un appartement à Neuilly-sur-Seine exige une compréhension fine de son patrimoine architectural unique et un niveau de finition irréprochable. ERG Rénovation est votre partenaire de confiance, spécialisé dans la transformation d'appartements de standing, des hôtels particuliers aux résidences modernes.",
    cta: {
      primary: 'Demander un devis pour mon projet à Neuilly',
      secondary: 'Voir nos réalisations à Neuilly-sur-Seine',
    },
    reassurancePoints: [
      'Expertise des appartements de luxe',
      'Gestion des contraintes de copropriété',
      'Finitions "haute couture"',
    ],
    mainContent: (
      <>
        <h2 id="savoir-faire-neuilly">Un savoir-faire adapté au prestige de Neuilly-sur-Seine</h2>
        <p>Notre expérience à Neuilly-sur-Seine nous permet de maîtriser les spécificités locales : respect des architectures (Art Déco, modernes...), collaboration avec les syndics de copropriété exigeants et mise en œuvre de matériaux nobles. Nous ne rénovons pas seulement un appartement, nous valorisons votre patrimoine.</p>
        <div className="mt-8 space-y-4">
          <div className="flex items-start gap-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
            <div>
              <h3 className="font-headline font-semibold text-lg">Rénovation d'appartements haussmanniens et Art Déco</h3>
              <p className="text-muted-foreground">Restauration des parquets, moulures et cheminées, tout en modernisant les réseaux et en optimisant les plans.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
            <div>
              <h3 className="font-headline font-semibold text-lg">Conception de cuisines et salles de bains de luxe</h3>
              <p className="text-muted-foreground">Intégration de marbre, de robinetterie haut de gamme et d'agencements sur mesure pour des pièces d'exception.</p>
            </div>
          </div>
        </div>
      </>
    ),
    testimonial: {
      quote: "ERG Rénovation a su comprendre nos exigences pour notre appartement à Neuilly. Le suivi de chantier a été d'une rigueur exemplaire et les finitions sont absolument parfaites. C'est un vrai partenaire de confiance.",
      author: "M. et Mme Lambert, Neuilly-sur-Seine",
    },
  },
  {
    slug: 'val-de-marne-94',
    type: 'department',
    title: "Rénovation d'Appartement Haut de Gamme dans le Val-de-Marne (94)",
    metaTitle: "Rénovation Appartement Val-de-Marne (94) | Vincennes, Saint-Maur | ERG",
    metaDescription: "Expert en rénovation d'appartements de qualité dans le 94 (Vincennes, Nogent-sur-Marne). Optimisation d'espace et finitions haut de gamme pour votre confort. Devis.",
    parentService: services.find(s => s.slug === 'renovation-appartement')!,
    introduction: "Le Val-de-Marne offre un cadre de vie prisé, alliant espaces verts et excellente connexion à Paris. La rénovation d'un appartement dans le 94 nécessite de créer des intérieurs qui valorisent cette qualité de vie : lumineux, fonctionnels et durables. ERG Rénovation apporte son expertise de la rénovation de luxe dans des villes comme Vincennes, Nogent-sur-Marne ou Saint-Maur-des-Fossés, assurant un projet mené avec la même rigueur que dans la capitale.",
    cta: {
      primary: 'Demander une étude personnalisée dans le 94',
      secondary: 'Voir nos réalisations à Vincennes',
    },
    reassurancePoints: [
      'Maîtrise des projets familiaux (Suites parentales, chambres multiples).',
      'Expertise en isolation acoustique et thermique (Confort durable).',
      'Gestion de projet de A à Z par un interlocuteur unique.',
    ],
    mainContent: (
      <>
        <h2 id="savoir-faire-94">Notre Savoir-Faire : Optimisation et Esthétique dans le 94</h2>
        <p>Dans le Val-de-Marne, nos projets sont souvent axés sur la création de pièces à vivre harmonieuses et l'augmentation du confort.</p>
        <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                <div>
                    <h3 className="font-headline font-semibold text-lg">Création d'Espaces de Vie Ouverts et Lumineux</h3>
                    <p className="text-muted-foreground">De la cuisine ouverte à l'abattage de cloisons non-porteuses, nous transformons l'agencement pour maximiser la lumière naturelle, un atout majeur du 94.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                <div>
                    <h3 className="font-headline font-semibold text-lg">Rénovation Complète des Chambres et Suites Parentales</h3>
                    <p className="text-muted-foreground">Intégration de dressings sur mesure, création de salles d'eau privatives et isolation des murs pour un confort phonique optimal.</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                <div>
                    <h3 className="font-headline font-semibold text-lg">Rénovation de Balcons et Terrasses Privatives</h3>
                    <p className="text-muted-foreground">Dans les résidences modernes du 94, nous étendons la qualité des finitions aux espaces extérieurs (dalles sur plots, étanchéité, garde-corps design) pour une véritable extension de l'appartement.</p>
                </div>
            </div>
        </div>
        <h2 id="villes-94">Les Villes du Val-de-Marne où Nous Intervenons</h2>
        <p className="mt-4">Nous sommes le partenaire privilégié des propriétaires exigeants dans les communes du 94, particulièrement :</p>
      </>
    ),
    testimonial: {
      quote: "La rénovation de notre 4 pièces à Saint-Maur-des-Fossés s'est faite sans stress, avec une qualité de finitions exceptionnelle.",
      author: "Famille Martin, Saint-Maur-des-Fossés (94)",
    },
    relatedLocations: [
      { name: 'Vincennes', slug: 'vincennes' },
      { name: 'Saint-Mandé', slug: 'saint-mande' },
      { name: 'Nogent-sur-Marne', slug: 'nogent-sur-marne' },
      { name: 'Le Perreux-sur-Marne', slug: 'le-perreux-sur-marne' },
      { name: 'Saint-Maur-des-Fossés', slug: 'saint-maur-des-fosses' },
      { name: 'Créteil', slug: 'creteil' },
      { name: 'Maisons-Alfort', slug: 'maisons-alfort' },
    ]
  },
  {
    slug: 'seine-saint-denis-93',
    type: 'department',
    title: "Rénovation d'Appartement et de Lofts à Fort Potentiel dans le 93",
    metaTitle: 'Rénovation Appartement & Loft Seine-Saint-Denis (93) | Expertise Luxe | ERG',
    metaDescription: 'Spécialiste de la rénovation d\'appartements et lofts à fort potentiel dans le 93 (Saint-Ouen, Montreuil). Création d\'espaces modernes et finitions haut de gamme.',
    parentService: services.find(s => s.slug === 'renovation-appartement')!,
    introduction: 'La Seine-Saint-Denis est un territoire de transformation, offrant des opportunités uniques de créer des espaces de vie modernes, des lofts spacieux et des appartements au standing élevé. ERG Rénovation est votre expert pour capitaliser sur ce potentiel immobilier en gérant les projets les plus ambitieux. Nous excellons dans la rénovation complète et la réhabilitation, apportant la rigueur et les finitions du luxe parisien dans le 93.',
    cta: {
      primary: 'Valoriser mon bien immobilier dans le 93',
      secondary: 'Voir nos projets de lofts à Saint-Ouen',
    },
    reassurancePoints: [
      'Expertise en transformation d\'espaces (Lofts, ateliers).',
      'Maîtrise des projets d\'ouverture structurelle.',
      'Finitions haut de gamme pour une plus-value garantie.',
    ],
    mainContent: (
      <>
        <h2 id="savoir-faire-93">Notre Savoir-Faire en Transformation et Réhabilitation (93)</h2>
        <p>Le 93 demande de l'audace technique et une vision pour transformer l'existant. Nos services sont conçus pour relever ces défis.</p>
        <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                <div>
                    <h3 className="font-headline font-semibold text-lg">Aménagement et Création de Lofts</h3>
                    <p className="text-muted-foreground">Spécialiste de la transformation d'anciennes surfaces industrielles en lofts. Gestion des volumes, création de mezzanines, traitement des murs bruts et gestion des réseaux complexes.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                <div>
                    <h3 className="font-headline font-semibold text-lg">Réunion de Lots et Optimisation de Grands Volumes</h3>
                    <p className="text-muted-foreground">Fusionner plusieurs lots (ou d'anciennes chambres de service) pour créer un appartement familial ou de réception, avec gestion des murs porteurs et des planchers.</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                <div>
                    <h3 className="font-headline font-semibold text-lg">Isolation et Confort de l'Habitat</h3>
                    <p className="text-muted-foreground">Solutions d'isolation thermique et acoustique performantes, indispensables dans les immeubles anciens et les transformations de bâtiments.</p>
                </div>
            </div>
        </div>
        <h2 id="villes-93">Les Villes de Seine-Saint-Denis où Nous Intervenons</h2>
        <p className="mt-4">Nous ciblons les zones à forte valeur ajoutée et les projets d'exception dans le 93 :</p>
      </>
    ),
    testimonial: {
      quote: "La transformation de notre atelier en loft à Montreuil a été gérée de manière experte. Le résultat est conforme aux standards parisiens.",
      author: "C. David, Montreuil (93)",
    },
    relatedLocations: [
      { name: 'Saint-Ouen', slug: 'saint-ouen' },
      { name: 'Montreuil', slug: 'montreuil' },
      { name: 'Le Raincy', slug: 'le-raincy' },
      { name: 'Les Lilas', slug: 'les-lilas' },
      { name: 'Saint-Denis', slug: 'saint-denis' },
    ]
  },
  {
    slug: 'yvelines-78',
    type: 'department',
    title: "Rénovation d'Appartement de Prestige dans les Yvelines (78)",
    metaTitle: "Rénovation Appartement Prestige Yvelines (78) | Versailles, Saint-Germain | ERG",
    metaDescription: "Expert en rénovation d'appartements et de grands volumes dans le 78. Restauration, confort moderne et finitions de prestige. Devis Yvelines.",
    parentService: services.find(s => s.slug === 'renovation-appartement')!,
    introduction: "Le département des Yvelines abrite un patrimoine immobilier d'une richesse exceptionnelle, des grands appartements de standing à Versailles aux résidences élégantes de Saint-Germain-en-Laye. La rénovation dans le 78 est un projet d'envergure qui exige de moderniser l'espace et le confort, tout en préservant l'âme des lieux. ERG Rénovation est votre partenaire de confiance pour orchestrer la réhabilitation complète de votre appartement dans les Yvelines, avec des finitions et une rigueur technique au plus haut niveau.",
    cta: {
      primary: 'Demander une étude pour mon bien dans le 78',
      secondary: 'Voir nos rénovations à Versailles',
    },
    reassurancePoints: [
      'Expertise en grands volumes et surfaces.',
      'Connaissance des Bâtiments de France (ABF) si besoin.',
      'Garantie de l\'isolation et du confort thermique.',
    ],
    mainContent: (
      <>
        <h2 id="savoir-faire-78">Notre Savoir-Faire : Quand le Luxe Rencontre la Fonctionnalité</h2>
        <p>Nos services sont conçus pour répondre aux besoins spécifiques des propriétaires d'appartements de prestige dans le 78 : confort, discrétion, et haute qualité des matériaux.</p>
        <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                <div>
                    <h3 className="font-headline font-semibold text-lg">Modernisation des Réseaux Techniques Anciens</h3>
                    <p className="text-muted-foreground">Dans les immeubles historiques du 78, nous refaisons intégralement les réseaux de plomberie et d'électricité pour un confort et une sécurité optimaux, souvent en préservant les gaines d'origine.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                <div>
                    <h3 className="font-headline font-semibold text-lg">Création de Suites Parentales et Salles de Bains de Luxe</h3>
                    <p className="text-muted-foreground">Aménagement complet de l'espace nuit, avec dressing sur mesure, salle de bain attenante haut de gamme (douche, baignoire îlot) et isolation phonique.</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                <div>
                    <h3 className="font-headline font-semibold text-lg">Amélioration de la Performance Énergétique (RGE si applicable)</h3>
                    <p className="text-muted-foreground">Isolation par l'intérieur, remplacement de menuiseries (fenêtres), et optimisation du chauffage (plancher chauffant) pour une réduction significative des charges.</p>
                </div>
            </div>
        </div>
        <h2 id="villes-78">Les Villes des Yvelines où Nous Intervenons Prioritairement</h2>
        <p className="mt-4">Nous mettons notre expertise au service des projets les plus exigeants dans les communes suivantes :</p>
      </>
    ),
    testimonial: {
      quote: "La rénovation de notre grand appartement à Saint-Germain-en-Laye a été parfaitement gérée, de la structure aux finitions en marbre.",
      author: "Famille de G., Saint-Germain-en-Laye (78)",
    },
    relatedLocations: [
      { name: 'Versailles', slug: 'versailles' },
      { name: 'Saint-Germain-en-Laye', slug: 'saint-germain-en-laye' },
      { name: 'Le Vésinet', slug: 'le-vesinet' },
      { name: 'Chatou', slug: 'chatou' },
      { name: 'Maisons-Laffitte', slug: 'maisons-laffitte' },
      { name: 'Marly-le-Roi', slug: 'marly-le-roi' },
    ]
  },
  {
    slug: 'boulogne-billancourt',
    type: 'city',
    title: "Rénovation d'Appartement à Boulogne-Billancourt : Du 1930 au Design Contemporain",
    metaTitle: "Rénovation Appartement Boulogne-Billancourt (92) | 1930 & Luxe | ERG",
    metaDescription: "Expert en rénovation d'appartements de standing à Boulogne-Billancourt. Maîtrise des projets 1930, finitions sur mesure. Devis 92100.",
    parentService: services.find(s => s.slug === 'renovation-appartement')!,
    introduction: "Boulogne-Billancourt se distingue par son riche patrimoine architectural, notamment ses immeubles emblématiques des années 1930 et ses résidences contemporaines près du Trapèze. La rénovation dans cette ville exige une double compétence : la préservation du cachet (parquets, moulures) et la modernisation des volumes (isolation, réseaux, lumière). ERG Rénovation est votre partenaire privilégié, connaissant parfaitement les spécificités structurelles des appartements boulonnais.",
    cta: {
      primary: 'Demander un diagnostic pour mon appartement à Boulogne',
      secondary: 'Voir nos exemples de rénovations 1930',
    },
    reassurancePoints: [
      'Spécialiste de l\'architecture des années 30.',
      'Rigueur dans la gestion de copropriété (Voisinage exigeant).',
      'Maîtrise de l\'isolation phonique.',
    ],
    mainContent: (
      <>
        <h2 id="savoir-faire-boulogne">Notre Expertise pour les Spécificités de Boulogne-Billancourt</h2>
        <p>Que vous soyez près de la Place Marcel Sembat ou dans les nouveaux quartiers du Pont de Sèvres, notre savoir-faire s'adapte à votre bien.</p>
        <div className="mt-8 space-y-6">
          <div className="flex items-start gap-4">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
              <div>
                  <h3 className="font-headline font-semibold text-lg">Restauration et Valorisation de l'Ancien (Architecture 1930)</h3>
                  <p className="text-muted-foreground">Travail sur les corniches, les bow-windows, les parquets et les ferronneries typiques. Nous assurons une restauration fidèle et élégante.</p>
              </div>
          </div>
          <div className="flex items-start gap-4">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
              <div>
                  <h3 className="font-headline font-semibold text-lg">Solutions d'Isolation Phonique et Thermique</h3>
                  <p className="text-muted-foreground">Crucial dans les résidences anciennes. Nous intégrons des solutions d'isolation performantes pour les sols, murs et plafonds, optimisant le confort sans perte d'espace.</p>
              </div>
          </div>
          <div className="flex items-start gap-4">
              <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
              <div>
                  <h3 className="font-headline font-semibold text-lg">Conception d'Espaces Réception et de Cuisines Ouvertes</h3>
                  <p className="text-muted-foreground">Création d'espaces de vie fluides et lumineux, avec gestion des ouvertures structurelles (murs porteurs) et l'intégration de cuisines haut de gamme adaptées à la vie moderne.</p>
              </div>
          </div>
        </div>
        <h2 id="secteurs-boulogne">Nos Réalisations et Secteurs d'Intervention à Boulogne</h2>
        <p className="mt-4">Nous sommes actifs dans tous les secteurs de Boulogne, avec une expertise reconnue dans : Centre-Ville / Rives de Seine, Quartiers Rives de Seine / Trapèze, et Point du Jour / Les Princes.</p>
      </>
    ),
    testimonial: {
      quote: "La rénovation de notre appartement à Boulogne a été gérée avec une grande rigueur, dans le respect des délais annoncés. Les finitions sont exceptionnelles, notamment la restauration de nos parquets d’origine.",
      author: "Mme R., Boulevard Jean Jaurès, Boulogne-Billancourt",
    },
  },
  {
    slug: 'saint-cloud',
    type: 'city',
    title: "Rénovation d'Appartement à Saint-Cloud : Élégance et Vue sur Grand Paysage",
    metaTitle: "Rénovation Appartement Saint-Cloud (92) | Luxe & Vue | ERG Rénovation",
    metaDescription: "Expert en rénovation d'appartements de prestige à Saint-Cloud. Optimisation des vues, matériaux nobles et gestion de chantier discrète. Devis 92210.",
    parentService: services.find(s => s.slug === 'renovation-appartement')!,
    introduction: "Saint-Cloud offre un cadre de vie exceptionnel, souvent caractérisé par la proximité du Parc et une architecture résidentielle de qualité. La rénovation y est synonyme d'ouverture sur l'extérieur et d'utilisation de matériaux qui captent la lumière naturelle. ERG Rénovation excelle à transformer votre appartement de Saint-Cloud en un lieu de vie baigné de lumière, avec une gestion de projet qui respecte la quiétude de ce quartier privilégié.",
    cta: {
      primary: 'Planifier une visite conseil à Saint-Cloud',
      secondary: 'Voir nos réalisations avec vue et lumière',
    },
    reassurancePoints: [
      'Spécialiste de la maximisation des vues et de la luminosité.',
      'Gestion de projet avec haute discrétion.',
      'Expertise en grandes surfaces et volumes.',
    ],
    mainContent: (
      <>
        <h2 id="savoir-faire-saint-cloud">Notre Savoir-Faire : Intégration Esthétique et Confort à Saint-Cloud</h2>
        <p>Nos services sont orientés vers la valorisation de l'espace, la durabilité et l'harmonisation de votre intérieur avec le standing de Saint-Cloud.</p>
        <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                <div>
                    <h3 className="font-headline font-semibold text-lg">Menuiseries et Baies Vitrées Hautes Performances</h3>
                    <p className="text-muted-foreground">Installation et rénovation de menuiseries de qualité (double vitrage, isolation thermique et phonique) pour maximiser les vues tout en garantissant le confort énergétique.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                <div>
                    <h3 className="font-headline font-semibold text-lg">Design d'Intérieur Axé sur la Lumière</h3>
                    <p className="text-muted-foreground">Utilisation de finitions et de couleurs claires, de miroirs et d'éclairages indirects (domotisés si besoin) pour augmenter la perception de l'espace et la clarté.</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                <div>
                    <h3 className="font-headline font-semibold text-lg">Rénovation de Sols Nobles</h3>
                    <p className="text-muted-foreground">Maîtrise de la pose de parquets massifs (point de Hongrie, dalles), de pierre naturelle ou de carrelages grand format, avec pose de systèmes de chauffage au sol.</p>
                </div>
            </div>
        </div>
        <h2 id="exigence-saint-cloud">L'Exigence ERG Rénovation : Un Partenaire de Confiance à Saint-Cloud</h2>
        <p className="mt-4">Nos équipes sont habituées aux contraintes des résidences haut de gamme clodoaldiennes, assurant une intervention sans perturbation :</p>
      </>
    ),
    testimonial: {
      quote: "La rénovation de notre duplex à Saint-Cloud a été un modèle de discrétion. Le résultat est à la hauteur du standing de notre résidence.",
      author: "Un client, Saint-Cloud",
    },
  },
  {
    slug: 'garches',
    type: 'city',
    title: "Rénovation d'Appartement à Garches : Le Luxe du Calme et de l'Espace",
    metaTitle: "Rénovation Appartement Garches (92) | Calme & Standing | ERG Rénovation",
    metaDescription: "Expert en rénovation d'appartements familiaux et de standing à Garches. Confort acoustique, design élégant et gestion de projet clé en main (92380).",
    parentService: services.find(s => s.slug === 'renovation-appartement')!,
    introduction: "Garches est reconnue pour sa tranquillité et ses résidences de qualité, offrant un cadre de vie idéal aux familles. La rénovation dans cette ville doit amplifier le sentiment de bien-être, en intégrant des solutions d'isolation de pointe et des agencements qui fluidifient la vie quotidienne. ERG Rénovation est votre expert pour transformer votre appartement de Garches en un havre de paix fonctionnel et élégant, avec une attention particulière aux détails qui garantissent la pérennité de votre confort.",
    cta: {
      primary: 'Organiser un diagnostic de confort à Garches',
      secondary: 'Découvrir nos solutions d\'isolation phonique',
    },
    reassurancePoints: [
      'Expertise en isolation phonique (Murs, plafonds, sols).',
      'Solutions d\'agencement adaptées à la vie de famille.',
      'Respect des résidences et des copropriétés de haut standing.',
    ],
    mainContent: (
      <>
        <h2 id="competences-garches">Nos Compétences : Créer des Espaces de Vie Optimaux à Garches</h2>
        <p>Dans le 92380, la qualité de vie passe par des finitions irréprochables et des solutions techniques invisibles qui assurent un confort absolu.</p>
        <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                <div>
                    <h3 className="font-headline font-semibold text-lg">Isolation Acoustique et Thermique de Premier Ordre</h3>
                    <p className="text-muted-foreground">Nous traitons les appartements pour garantir le silence (isolation des sols et des plafonds contre les bruits d'impact) et une parfaite régulation thermique, essentielle dans les résidences anciennes.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                <div>
                    <h3 className="font-headline font-semibold text-lg">Aménagement de Pièces à Vivre Flexibles</h3>
                    <p className="text-muted-foreground">Conception de salons-salles à manger modulables, de bureaux à domicile discrets, et de zones de rangement intégrées pour maintenir l'ordre et l'esthétique.</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                <div>
                    <h3 className="font-headline font-semibold text-lg">Rénovation des Espaces Eau/Détente</h3>
                    <p className="text-muted-foreground">Création de salles de bains familiales ou de suites parentales avec douches à l'italienne et matériaux résistants à l'usure, conjuguant luxe et fonctionnalité.</p>
                </div>
            </div>
        </div>
        <h2 id="exigence-garches">L'Exigence ERG Rénovation pour Votre Sérénité à Garches</h2>
        <p className="mt-4">Notre méthodologie est adaptée aux exigences des propriétaires de Garches. Nos équipes sont formées au respect des protocoles stricts de chantier :</p>
      </>
    ),
    testimonial: {
      quote: "ERG Rénovation a transformé notre appartement familial à Garches. L'isolation est parfaite et le résultat est d'une élégance intemporelle.",
      author: "Un client, Garches (92380)",
    },
  },
  {
    slug: 'vincennes',
    type: 'city',
    title: "Rénovation d'Appartement à Vincennes (94300)",
    metaTitle: "Rénovation Appartement Vincennes (94) | Qualité & Devis | ERG",
    metaDescription: "Expert en rénovation d'appartements à Vincennes (94300). Optimisation d'espace, finitions de qualité et gestion de projet de A à Z. Devis gratuit.",
    parentService: services.find(s => s.slug === 'renovation-appartement')!,
    introduction: "Rénover un appartement à Vincennes, c'est valoriser un bien au cœur d'une ville royale, alliant charme de l'ancien et dynamisme. ERG Rénovation est votre spécialiste pour les projets vincennois, de l'appartement familial proche du bois à l'optimisation de surfaces plus modestes en centre-ville. Nous maîtrisons les enjeux de la rénovation dans des immeubles de caractère.",
    cta: {
      primary: 'Mon devis de rénovation à Vincennes',
      secondary: 'Voir nos réalisations à Vincennes',
    },
    reassurancePoints: [
      'Expertise des appartements familiaux.',
      'Respect du cachet de l\'ancien.',
      'Gestion de projet clé en main.',
    ],
    mainContent: (
      <>
        <h2 id="savoir-faire-vincennes">Un savoir-faire dédié aux appartements de Vincennes</h2>
        <p>Nos interventions à Vincennes se concentrent sur la création d'intérieurs à la fois esthétiques, fonctionnels et respectueux de l'architecture locale.</p>
        <div className="mt-8 space-y-4">
          <div className="flex items-start gap-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
            <div>
              <h3 className="font-headline font-semibold text-lg">Optimisation des plans pour la vie de famille</h3>
              <p className="text-muted-foreground">Création de cuisines ouvertes, réagencement des chambres et création de rangements sur mesure pour un quotidien plus fluide.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
            <div>
              <h3 className="font-headline font-semibold text-lg">Rénovation de pièces d'eau</h3>
              <p className="text-muted-foreground">Modernisation complète de salles de bain et cuisines, en garantissant une étanchéité parfaite et des finitions durables.</p>
            </div>
          </div>
        </div>
      </>
    ),
    testimonial: {
      quote: "L'équipe d'ERG Rénovation a fait un travail remarquable dans notre appartement à Vincennes. Ils ont été de très bon conseil pour optimiser l'espace. Le résultat est superbe.",
      author: "Sophie D., Vincennes",
    },
  },
  {
    slug: 'saint-mande',
    type: 'city',
    title: "Rénovation d'Appartement de Standing à Saint-Mandé (94160)",
    metaTitle: "Rénovation Appartement Saint-Mandé (94) | Haut de Gamme | ERG",
    metaDescription: "Spécialiste de la rénovation d'appartements de standing à Saint-Mandé. Finitions de luxe, respect des copropriétés et gestion de projet rigoureuse. Devis.",
    parentService: services.find(s => s.slug === 'renovation-appartement')!,
    introduction: "À Saint-Mandé, aux portes de Paris, la rénovation d'appartement rime avec élégance et finitions haut de gamme. ERG Rénovation vous accompagne pour transformer votre bien en un espace de vie qui reflète le prestige de la ville. Nous sommes experts dans la gestion de projets au sein des belles copropriétés de Saint-Mandé, en alliant savoir-faire artisanal et matériaux nobles.",
    cta: {
      primary: 'Mon projet haut de gamme à Saint-Mandé',
      secondary: 'Découvrir nos finitions',
    },
    reassurancePoints: [
      'Finitions de luxe (peinture, parquets).',
      'Gestion discrète en copropriété.',
      'Interlocuteur unique et dédié.',
    ],
    mainContent: (
      <>
        <h2 id="excellence-saint-mande">L'Excellence pour votre bien à Saint-Mandé</h2>
        <p>La proximité avec le bois de Vincennes et le standing des immeubles de Saint-Mandé appellent à des rénovations qui privilégient la lumière et la qualité des matériaux.</p>
        <div className="mt-8 space-y-4">
          <div className="flex items-start gap-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
            <div>
              <h3 className="font-headline font-semibold text-lg">Mise en valeur des volumes et de la lumière</h3>
              <p className="text-muted-foreground">Travail sur les couleurs et les éclairages pour créer des atmosphères chaleureuses et agrandir visuellement les espaces.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
            <div>
              <h3 className="font-headline font-semibold text-lg">Restauration de parquets et boiseries</h3>
              <p className="text-muted-foreground">Nos artisans redonnent vie aux parquets anciens et subliment les boiseries pour conserver le cachet de votre appartement.</p>
            </div>
          </div>
        </div>
      </>
    ),
    testimonial: {
      quote: "Le professionnalisme d'ERG Rénovation a été déterminant pour notre projet à Saint-Mandé. Le chantier a été parfaitement tenu et le résultat est à la hauteur de nos attentes.",
      author: "Charles G., Saint-Mandé",
    },
  },
  {
    slug: 'nogent-sur-marne',
    type: 'city',
    title: "Rénovation Appartement et Maison à Nogent-sur-Marne (94130)",
    metaTitle: "Rénovation Maison & Appartement Nogent-sur-Marne (94) | ERG",
    metaDescription: "ERG Rénovation, votre expert pour la rénovation d'appartements et maisons à Nogent-sur-Marne. Projets clé en main, de la conception aux finitions. Devis.",
    parentService: services.find(s => s.slug === 'renovation-appartement')!,
    introduction: "Nogent-sur-Marne, avec son cadre de vie privilégié en bord de Marne, offre une grande diversité de biens, des appartements de standing aux maisons de caractère. ERG Rénovation met son expertise au service de vos projets nogentais, qu'il s'agisse de moderniser un appartement familial ou de rénover une maison pour l'adapter aux standards de confort actuels.",
    cta: {
      primary: 'Discuter de mon projet à Nogent',
      secondary: 'Voir nos réalisations de maisons',
    },
    reassurancePoints: [
      'Expertise appartements et maisons.',
      'Solutions pour l\'efficacité énergétique.',
      'Gestion de projet rigoureuse.',
    ],
    mainContent: (
      <>
        <h2 id="approche-nogent">Une approche sur-mesure pour votre bien à Nogent</h2>
        <p>Nous adaptons nos compétences à la typologie de votre bien, qu'il s'agisse d'un appartement en résidence ou d'une maison individuelle.</p>
        <div className="mt-8 space-y-4">
          <div className="flex items-start gap-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
            <div>
              <h3 className="font-headline font-semibold text-lg">Rénovation énergétique</h3>
              <p className="text-muted-foreground">Nous vous proposons des solutions d'isolation et de chauffage performants pour améliorer votre confort et réduire vos factures d'énergie.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
            <div>
              <h3 className="font-headline font-semibold text-lg">Aménagement d'espaces de vie</h3>
              <p className="text-muted-foreground">Création de cuisines ouvertes, de suites parentales ou de bureaux à domicile pour correspondre à votre mode de vie.</p>
            </div>
          </div>
        </div>
      </>
    ),
    testimonial: {
      quote: "L'équipe d'ERG a été très à l'écoute et a su nous guider dans nos choix pour la rénovation de notre maison à Nogent-sur-Marne. Nous les recommandons sans hésiter.",
      author: "Famille L., Nogent-sur-Marne",
    },
  },
  {
    slug: 'le-perreux-sur-marne',
    type: 'city',
    title: "Rénovation d'Appartement au Perreux-sur-Marne (94170)",
    metaTitle: "Rénovation Appartement Le Perreux-sur-Marne (94) | ERG Rénovation",
    metaDescription: "Expert en rénovation d'appartements au Perreux-sur-Marne. Agencement, finitions de qualité et respect des délais pour votre projet dans le 94170. Devis.",
    parentService: services.find(s => s.slug === 'renovation-appartement')!,
    introduction: "Au Perreux-sur-Marne, la qualité de vie est une priorité. La rénovation de votre appartement doit refléter cet art de vivre, en créant des espaces confortables, lumineux et parfaitement finis. ERG Rénovation vous apporte son expertise pour tous vos projets au Perreux, de la rénovation complète à la modernisation de votre cuisine ou de votre salle de bain, avec un interlocuteur unique pour votre tranquillité.",
    cta: {
      primary: 'Obtenir mon devis au Perreux',
      secondary: 'Découvrir nos cuisines',
    },
    reassurancePoints: [
      'Respect des délais et du budget.',
      'Finitions impeccables.',
      'Interlocuteur unique.',
    ],
    mainContent: (
      <>
        <h2 id="projet-le-perreux">Votre projet de rénovation au Perreux-sur-Marne</h2>
        <p>Nous mettons un point d'honneur à réaliser des projets qui améliorent durablement votre quotidien.</p>
        <div className="mt-8 space-y-4">
          <div className="flex items-start gap-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
            <div>
              <h3 className="font-headline font-semibold text-lg">Agencement sur mesure</h3>
              <p className="text-muted-foreground">Nous concevons des solutions de rangement et d'agencement intelligentes pour optimiser chaque mètre carré.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
            <div>
              <h3 className="font-headline font-semibold text-lg">Qualité des matériaux</h3>
              <p className="text-muted-foreground">Nous sélectionnons avec vous des matériaux durables et esthétiques pour un résultat qui traverse le temps.</p>
            </div>
          </div>
        </div>
      </>
    ),
    testimonial: {
      quote: "Un grand merci à ERG Rénovation pour leur travail dans notre appartement du Perreux. Le chantier a été mené de main de maître, et le résultat est magnifique.",
      author: "Paul et Virginie, Le Perreux-sur-Marne",
    },
  },
  {
    slug: 'saint-maur-des-fosses',
    type: 'city',
    title: "Rénovation Appartement & Maison à Saint-Maur-des-Fossés (94)",
    metaTitle: "Rénovation Maison & Appartement Saint-Maur (94) | ERG Rénovation",
    metaDescription: "Votre expert en rénovation de maisons et appartements à Saint-Maur-des-Fossés. Gestion de projets A à Z pour un résultat haut de gamme. Devis sur mesure.",
    parentService: services.find(s => s.slug === 'renovation-appartement')!,
    introduction: "Saint-Maur-des-Fossés, avec son cadre de vie exceptionnel et son parc immobilier de grande qualité, est un lieu où la rénovation prend tout son sens. ERG Rénovation est le spécialiste des projets d'envergure à Saint-Maur, qu'il s'agisse de la rénovation d'une maison de maître, de la modernisation d'un appartement de standing ou de l'agrandissement d'un pavillon. Nous apportons une expertise technique et un sens du détail irréprochables.",
    cta: {
      primary: 'Mon projet de rénovation à Saint-Maur',
      secondary: 'Voir nos rénovations de maisons',
    },
    reassurancePoints: [
      'Expertise des maisons et grands volumes.',
      'Gestion des projets d\'extension.',
      'Finitions haut de gamme garanties.',
    ],
    mainContent: (
      <>
        <h2 id="expertise-saint-maur">Notre expertise pour les biens de caractère à Saint-Maur</h2>
        <p>Nous comprenons les enjeux de la rénovation à Saint-Maur : préserver le cachet tout en intégrant un confort moderne.</p>
        <div className="mt-8 space-y-4">
          <div className="flex items-start gap-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
            <div>
              <h3 className="font-headline font-semibold text-lg">Rénovation complète de maisons</h3>
              <p className="text-muted-foreground">Nous pilotons tous les corps d'état, de la structure à la décoration, pour une réhabilitation complète de votre maison.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
            <div>
              <h3 className="font-headline font-semibold text-lg">Aménagement de suites parentales</h3>
              <p className="text-muted-foreground">Création d'espaces nuit d'exception avec dressing et salle de bain privée, pour un confort absolu.</p>
            </div>
          </div>
        </div>
      </>
    ),
    testimonial: {
      quote: "La rénovation de notre 4 pièces à Saint-Maur-des-Fossés s'est faite sans stress, avec une qualité de finitions exceptionnelle. L'équipe a été à notre écoute du début à la fin.",
      author: "Famille Martin, Saint-Maur-des-Fossés (94)",
    },
  },
  {
    slug: 'creteil',
    type: 'city',
    title: "Rénovation d'Appartement à Créteil (94000)",
    metaTitle: "Rénovation Appartement Créteil (94) | Moderne & Fonctionnel | ERG",
    metaDescription: "ERG Rénovation modernise votre appartement à Créteil. Projets clé en main pour un intérieur fonctionnel et esthétique. Devis gratuit pour votre projet dans le 94000.",
    parentService: services.find(s => s.slug === 'renovation-appartement')!,
    introduction: "À Créteil, ville dynamique du Val-de-Marne, la rénovation d'appartement vise à créer des espaces de vie modernes, lumineux et parfaitement fonctionnels. ERG Rénovation est votre partenaire pour tous vos projets à Créteil, de la rénovation complète d'un appartement familial à la modernisation d'une cuisine ou d'une salle de bain. Nous vous garantissons un projet géré avec rigueur, de la conception à la livraison.",
    cta: {
      primary: 'Moderniser mon appartement à Créteil',
      secondary: 'Voir nos réalisations d\'appartements',
    },
    reassurancePoints: [
      'Optimisation des plans et de la lumière.',
      'Rénovation complète clé en main.',
      'Respect de votre budget et des délais.',
    ],
    mainContent: (
      <>
        <h2 id="solutions-creteil">Des solutions modernes pour votre appartement à Créteil</h2>
        <p>Nous vous accompagnons pour transformer votre appartement en un lieu de vie qui vous ressemble, alliant esthétique contemporaine et confort.</p>
        <div className="mt-8 space-y-4">
          <div className="flex items-start gap-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
            <div>
              <h3 className="font-headline font-semibold text-lg">Création d'espaces ouverts</h3>
              <p className="text-muted-foreground">Nous optimisons les volumes en créant des cuisines ouvertes et des espaces de vie plus grands et plus lumineux.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
            <div>
              <h3 className="font-headline font-semibold text-lg">Rénovation électrique et plomberie</h3>
              <p className="text-muted-foreground">Mise aux normes complète de vos installations pour plus de sécurité et de confort au quotidien.</p>
            </div>
          </div>
        </div>
      </>
    ),
    testimonial: {
      quote: "Un suivi de chantier très professionnel pour la rénovation de notre appartement à Créteil. L'équipe a été réactive et le résultat est à la hauteur de nos espérances.",
      author: "M. Dubois, Créteil",
    },
  },
  {
    slug: 'maisons-alfort',
    type: 'city',
    title: "Rénovation Appartement et Maison à Maisons-Alfort (94700)",
    metaTitle: "Rénovation Maison & Appartement Maisons-Alfort (94) | ERG",
    metaDescription: "Votre entreprise de rénovation pour appartements et maisons à Maisons-Alfort. Projets tous corps d'état gérés de A à Z par une équipe d'experts. Devis.",
    parentService: services.find(s => s.slug === 'renovation-appartement')!,
    introduction: "À Maisons-Alfort, ville appréciée pour son cadre de vie et sa proximité de Paris, la rénovation permet de moderniser des appartements et des maisons de caractère. ERG Rénovation est votre spécialiste pour tous types de projets à Maisons-Alfort, de la rénovation d'un appartement familial à la réhabilitation d'une maison. Nous vous garantissons une gestion de projet experte et des finitions de grande qualité.",
    cta: {
      primary: 'Mon projet de rénovation à Maisons-Alfort',
      secondary: 'Voir nos projets d\'aménagement',
    },
    reassurancePoints: [
      'Expertise tous corps d\'état.',
      'Projets de rénovation complets.',
      'Qualité et respect des délais.',
    ],
    mainContent: (
      <>
        <h2 id="partenaire-maisons-alfort">Un partenaire unique pour votre projet à Maisons-Alfort</h2>
        <p>Confiez-nous votre projet de rénovation et bénéficiez d'un accompagnement complet et professionnel.</p>
        <div className="mt-8 space-y-4">
          <div className="flex items-start gap-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
            <div>
              <h3 className="font-headline font-semibold text-lg">Rénovation énergétique</h3>
              <p className="text-muted-foreground">Nous vous proposons des solutions d'isolation et de chauffage pour améliorer votre confort et réduire vos factures d'énergie.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
            <div>
              <h3 className="font-headline font-semibold text-lg">Aménagement d'intérieur</h3>
              <p className="text-muted-foreground">Nous optimisons vos espaces pour les rendre plus fonctionnels, plus lumineux et plus agréables à vivre.</p>
            </div>
          </div>
        </div>
      </>
    ),
    testimonial: {
      quote: "L'équipe d'ERG a été très à l'écoute et a su nous guider dans nos choix pour la rénovation de notre maison à Maisons-Alfort. Nous les recommandons sans hésiter.",
      author: "Famille Petit, Maisons-Alfort",
    },
  },
];

const renovationMaisonPages: LocalLandingPage[] = [
    // You can add specific landing pages for "rénovation de maison" here
    // Example for Versailles
    {
        slug: 'versailles',
        type: 'city',
        title: 'Rénovation de Maison à Versailles (78000) - ERG Rénovation',
        metaTitle: 'Rénovation Maison Versailles (78) | Expert Patrimoine | ERG',
        metaDescription: "Spécialiste de la rénovation de maisons de caractère à Versailles. ERG Rénovation allie respect du patrimoine et confort moderne. Devis pour votre projet.",
        parentService: services.find(s => s.slug === 'renovation-maison')!,
        introduction: "Rénover une maison à Versailles, c'est toucher à l'histoire. ERG Rénovation est votre partenaire pour valoriser ce patrimoine unique, qu'il s'agisse d'une maison de ville, d'une demeure bourgeoise ou d'un pavillon. Nous maîtrisons les contraintes des secteurs sauvegardés et travaillons en respectant l'âme de votre bien.",
        cta: {
            primary: 'Mon projet de rénovation à Versailles',
            secondary: 'Voir nos réalisations dans les Yvelines',
        },
        reassurancePoints: [
            'Expertise des bâtisses anciennes.',
            'Respect du patrimoine architectural.',
            'Gestion des projets d\'extension.',
        ],
        mainContent: (
            <>
                <h2 id="savoir-faire-versailles">Un savoir-faire d'exception pour les maisons de Versailles</h2>
                <p>Notre intervention allie techniques traditionnelles et innovations pour un confort moderne dans un écrin d'histoire.</p>
                <div className="mt-8 space-y-4">
                    <div className="flex items-start gap-4">
                        <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                        <div>
                            <h3 className="font-headline font-semibold text-lg">Restauration et rénovation énergétique</h3>
                            <p className="text-muted-foreground">Nous améliorons la performance énergétique de votre maison (isolation, fenêtres) tout en préservant ses éléments de caractère.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                        <div>
                            <h3 className="font-headline font-semibold text-lg">Agrandissement et aménagement de jardin</h3>
                            <p className="text-muted-foreground">Création d'extensions en harmonie avec l'existant et aménagement de vos extérieurs pour un cadre de vie idyllique.</p>
                        </div>
                    </div>
                </div>
            </>
        ),
        testimonial: {
            quote: "ERG Rénovation a mené la rénovation de notre maison à Versailles avec un grand respect pour son histoire. Le résultat est un mélange parfait entre le charme de l'ancien et le confort d'aujourd'hui.",
            author: "Famille G., Versailles",
        },
    },
];

const renovationSalleDeBainPages: LocalLandingPage[] = [
    // You can add specific landing pages for "rénovation de salle de bain" here
    // Example for Paris 16e
    {
        slug: 'paris-16',
        type: 'district',
        title: 'Rénovation Salle de Bain de Luxe à Paris 16e - ERG Rénovation',
        metaTitle: 'Rénovation Salle de Bain Paris 16 (75016) | Luxe & Marbre | ERG',
        metaDescription: "Expert en création de salle de bain de luxe à Paris 16. Douche à l'italienne, marbre, robinetterie haut de gamme. Devis pour votre projet dans le 75016.",
        parentService: services.find(s => s.slug === 'renovation-salle-de-bain')!,
        introduction: "Dans le 16ème arrondissement de Paris, la salle de bain est une pièce de luxe et de bien-être. ERG Rénovation est le spécialiste de la conception et de la réalisation de salles de bain haut de gamme, alliant matériaux nobles, agencement sur mesure et une expertise technique irréprochable pour une étanchéité parfaite.",
        cta: {
            primary: 'Concevoir ma salle de bain dans le 16e',
            secondary: 'Découvrir nos finitions en marbre',
        },
        reassurancePoints: [
            "Expert en douche à l'italienne.",
            'Maîtrise de la pose de marbre.',
            'Étanchéité garantie 10 ans.',
        ],
        mainContent: (
            <>
                <h2 id="prestations-luxe-paris-16">Des prestations haut de gamme pour votre salle de bain à Paris 16</h2>
                <p>Nous transformons votre salle de bain en un espace d'exception, digne des plus grands hôtels.</p>
                <div className="mt-8 space-y-4">
                    <div className="flex items-start gap-4">
                        <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                        <div>
                            <h3 className="font-headline font-semibold text-lg">Utilisation de matériaux nobles</h3>
                            <p className="text-muted-foreground">Marbre, pierre naturelle, robinetterie de luxe... Nous sélectionnons les meilleurs matériaux pour une salle de bain d'exception.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                        <div>
                            <h3 className="font-headline font-semibold text-lg">Agencement et mobilier sur mesure</h3>
                            <p className="text-muted-foreground">Nous concevons des meubles vasques, des rangements et des éclairages sur mesure pour un espace unique et fonctionnel.</p>
                        </div>
                    </div>
                </div>
            </>
        ),
        testimonial: {
            quote: "Le travail réalisé par ERG Rénovation dans notre salle de bain est tout simplement parfait. Le souci du détail et la qualité des finitions sont impressionnants.",
            author: "M. et Mme Dubois, Paris 16e",
        },
    },
];

export const localLandingPages: LocalLandingPage[] = [
    ...renovationAppartementPages,
    ...renovationMaisonPages,
    ...renovationSalleDeBainPages,
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
    title: 'Rénovation totale de studio',
    slug: 'renovation-studio-paris-11',
    category: 'Studio',
    images: { before: 'project-studio-2-before', after: 'project-studio-2' },
    description: 'Rénovation complète d\'un studio dans le 11e, incluant une intervention d\'urgence pour une fuite. Un projet mené avec réactivité et professionnalisme.'
  },
  {
    title: 'Rénovation appartement 65m²',
    slug: 'renovation-appartement-65m2-paris',
    category: 'Appartement',
    images: { before: 'project-apartment-2-before', after: 'project-apartment-2' },
    description: 'Refonte totale d\'un appartement de 65m², incluant cuisine, salle de bain, électricité et peinture. Un résultat de grande qualité salué par le client.'
  },
  {
    title: 'Optimisation d\'une salle de bain 3m²',
    slug: 'optimisation-salle-de-bain-3m2',
    category: 'Salle de bain',
    images: { before: 'project-small-bathroom-before', after: 'project-small-bathroom-after' },
    description: 'Transformation complète d\'une petite salle de bain parisienne. Le déplacement d\'une cloison a permis d\'optimiser l\'espace pour un résultat spacieux et moderne.'
  },
  {
    title: 'Rénovation 2 pièces parisien',
    slug: 'renovation-2-pieces-paris',
    category: 'Appartement',
    images: { before: 'project-apartment-3-before', after: 'project-apartment-3' },
    description: 'Rénovation complète d\'un appartement de 2 pièces à Paris, menée avec des conseils avisés et un suivi de chantier rigoureux.'
  },
];

export const allProjects: Project[] = [
  {
    title: 'Rénovation totale de studio',
    slug: 'renovation-studio-paris-11',
    category: 'Studio',
    images: { before: 'project-studio-2-before', after: 'project-studio-2' },
    description: 'Rénovation complète d\'un studio dans le 11e, incluant une intervention d\'urgence pour une fuite. Un projet mené avec réactivité et professionnalisme.',
    testimonial: {
      quote: "Intervention en urgence en plein mois d'Aout pour une grosse fuite puis rénovation complète de mon studio dans le 11ème, je ne peux que recommander cette entreprise familiale pour son professionnalisme et sa réactivité. Merci à vous !",
      author: "Alex Leleka, Paris 11e"
    },
    details: {
      challenge: <>
          <p>Le projet a commencé par une urgence : une fuite d'eau importante en plein mois d'août nécessitant une intervention immédiate. Au-delà de la réparation, le client souhaitait profiter de l'occasion pour réaliser une rénovation complète du studio afin de le moderniser et d'optimiser l'espace.</p>
      </>,
      solution: <>
          <p>Notre équipe est intervenue en urgence pour maîtriser la fuite et sécuriser l'appartement. Par la suite, nous avons planifié et exécuté une rénovation complète qui incluait :</p>
          <ul>
              <li><strong>Réparation de la plomberie :</strong> Remplacement des éléments défectueux à l'origine de la fuite.</li>
              <li><strong>Modernisation de l'espace :</strong> Refonte de la salle d'eau, optimisation de la kitchenette et rénovation de la pièce principale.</li>
              <li><strong>Finitions complètes :</strong> Reprise des peintures, des sols et de l'électricité pour un résultat impeccable.</li>
          </ul>
          <p>La réactivité et le professionnalisme de nos équipes ont permis de transformer une situation de crise en une opportunité de valorisation du bien.</p>
      </>,
      keyPoints: [
        { title: "Intervention d'urgence", icon: Milestone },
        { title: "Rénovation complète du studio", icon: Sparkles },
        { title: "Plomberie et électricité", icon: Wrench },
        { title: "Gestion de projet réactive", icon: Users }
      ]
    }
  },
  {
    title: 'Rénovation appartement 65m²',
    slug: 'renovation-appartement-65m2-paris',
    category: 'Appartement',
    images: { before: 'project-apartment-2-before', after: 'project-apartment-2' },
    description: 'Refonte totale d\'un appartement de 65m², incluant cuisine, salle de bain, électricité et peinture. Un résultat de grande qualité salué par le client.',
    testimonial: {
      quote: "Notre appartement de 65 mètres carrés a été entièrement rénové par l'équipe ERG Rénovation (cuisine, salle de bain, électricité, peinture). Le résultat est de grande qualité. Ils sont de bons conseils et le suivi de chantier est rigoureux. Nous recommandons !",
      author: "Adrien Puichaud, Paris"
    },
    details: {
      challenge: <>
          <p>Le défi était de mener une rénovation complète d'un appartement de 65m² en assurant une coordination parfaite entre tous les corps de métier (plomberie, électricité, peinture) pour livrer un projet clé en main de haute qualité dans le respect des délais.</p>
      </>,
      solution: <>
          <p>En tant qu'entreprise générale, nous avons piloté l'intégralité du projet avec un interlocuteur unique pour le client. Notre intervention a couvert :</p>
          <ul>
              <li><strong>Cuisine :</strong> Conception et pose d'une nouvelle cuisine fonctionnelle et moderne.</li>
              <li><strong>Salle de bain :</strong> Rénovation complète incluant plomberie, étanchéité et pose de nouveaux sanitaires et carrelages.</li>
              <li><strong>Électricité :</strong> Mise aux normes complète du tableau et du réseau électrique.</li>
              <li><strong>Finitions :</strong> Préparation des murs et application de peintures de qualité pour un rendu impeccable.</li>
          </ul>
          <p>Un suivi de chantier rigoureux et une communication constante ont permis de garantir un résultat final à la hauteur des attentes du client.</p>
      </>,
      keyPoints: [
        { title: "Rénovation Tous Corps d'État", icon: Layers },
        { title: "Cuisine et Salle de Bain", icon: UtensilsCrossed },
        { title: "Mise aux normes électrique", icon: Wrench },
        { title: "Suivi de chantier rigoureux", icon: ClipboardList }
      ]
    }
  },
  {
    title: 'Optimisation d\'une salle de bain 3m²',
    slug: 'optimisation-salle-de-bain-3m2',
    category: 'Salle de bain',
    images: { before: 'project-small-bathroom-before', after: 'project-small-bathroom-after' },
    description: 'Transformation complète d\'une petite salle de bain parisienne. Le déplacement d\'une cloison a permis d\'optimiser l\'espace pour un résultat spacieux et moderne.',
    testimonial: {
      quote: "L'entreprise a été réactive, totalement à notre écoute et aussi force de proposition avec d’excellents conseils. Ces derniers nous ont permis d’optimiser notre espace et de bénéficier d’une salle de bain spacieuse et agréable.",
      author: "Nina G., Paris"
    },
    details: {
      challenge: <>
          <p>Le principal défi était de transformer une salle de bain parisienne exiguë d'à peine 3m². L'agencement initial était peu fonctionnel, avec un espace mal exploité qui donnait une sensation d'étroitesse. La cliente souhaitait non seulement moderniser l'esthétique mais surtout gagner en confort et en praticité au quotidien, ce qui passait par un réagencement complet, incluant le déplacement de la douche et de la machine à laver.</p>
      </>,
      solution: <>
          <p>Notre approche a été de repenser entièrement les volumes. En déplaçant une cloison non-porteuse, nous avons redéfini la géométrie de la pièce pour y intégrer une douche plus confortable et un emplacement optimisé pour la machine à laver. Cette modification structurelle a été le point de départ d'une rénovation totale :</p>
          <ul>
              <li><strong>Plomberie & Électricité :</strong> L'ensemble des réseaux a été repensé et mis aux normes pour s'adapter au nouvel agencement.</li>
              <li><strong>Revêtements :</strong> Le choix d'un carrelage clair et de grand format, tant au sol que sur les murs, a permis d'agrandir visuellement l'espace.</li>
              <li><strong>Agencement sur mesure :</strong> Des étagères et des niches ont été créées pour offrir du rangement sans encombrer la pièce.</li>
          </ul>
          <p>Le résultat est une salle de bain qui, malgré sa petite surface, paraît plus spacieuse, lumineuse et est infiniment plus fonctionnelle.</p>
      </>,
      keyPoints: [
        { title: "Réagencement des volumes", icon: Scaling },
        { title: "Plomberie et électricité neuves", icon: Wrench },
        { title: "Optimisation de l'espace", icon: Lightbulb },
        { title: "Finitions soignées", icon: Sparkles }
      ]
    }
  },
  {
    title: 'Rénovation 2 pièces parisien',
    slug: 'renovation-2-pieces-paris',
    category: 'Appartement',
    images: { before: 'project-apartment-3-before', after: 'project-apartment-3' },
    description: 'Rénovation complète d\'un appartement de 2 pièces à Paris, menée avec des conseils avisés et un suivi de chantier rigoureux.',
    testimonial: {
      quote: "J'ai fait appel à ERG dans le cadre de la rénovation d'un deux pièces. Ils ont su être à l'écoute et de très bons conseils. Le suivi de chantier est rigoureux, ce qui est très appréciable. Le travail est de qualité. Je les recommande.",
      author: "Ivano Isaia, Paris"
    },
    details: {
      challenge: <>
          <p>Rénover un appartement de deux pièces à Paris demande de trouver le juste équilibre entre la modernisation des équipements, l'optimisation des espaces de vie et de rangement, tout en respectant un budget et des délais précis. Le client recherchait un partenaire de confiance capable de le conseiller et de piloter le projet de A à Z.</p>
      </>,
      solution: <>
          <p>Nous avons accompagné le client à chaque étape, en étant force de proposition sur les agencements et le choix des matériaux. Notre intervention a compris :</p>
          <ul>
              <li><strong>Conseil en amont :</strong> Suggestions pour optimiser les plans et les fonctionnalités de l'appartement.</li>
              <li><strong>Gestion Tous Corps d'État :</strong> Coordination de l'ensemble des travaux (plomberie, électricité, peinture, sols) pour une exécution fluide.</li>
              <li><strong>Suivi de chantier :</strong> Des points réguliers ont été organisés pour tenir le client informé de l'avancement et valider les étapes clés.</li>
          </ul>
          <p>Cette approche a permis de livrer un appartement entièrement rénové, conforme aux attentes du client, avec des finitions de qualité et une gestion de projet sans stress.</p>
      </>,
      keyPoints: [
        { title: "Rénovation complète", icon: Building2 },
        { title: "Force de proposition", icon: Lightbulb },
        { title: "Suivi de chantier rigoureux", icon: ClipboardList },
        { title: "Qualité des finitions", icon: Sparkles }
      ]
    }
  },
  {
    title: 'Studio optimisé pour investisseur',
    slug: 'studio-optimise-marais',
    category: 'Studio',
    images: { before: 'project-studio-1-before', after: 'project-studio-1' },
    description: 'Rénovation complète d\'un studio destiné à la location. Un travail de qualité, respect des délais et des conseils pertinents pour un investissement réussi.',
    testimonial: {
      quote: "Studio entièrement rénové. Beau travail réalisé par l'entreprise ERG. M. AIT donne de bons conseils. Les délais sont respectés. Travaux de qualité. Je recommande sans hésiter la société ERG.",
      author: "t planchard"
    },
    details: {
      challenge: <>
          <p>L'objectif était de réaliser la rénovation complète d'un studio destiné à un investissement locatif. Le projet exigeait de maximiser l'attrait et la fonctionnalité du bien pour de futurs locataires, tout en maîtrisant le budget et en respectant des délais stricts pour limiter la vacance locative.</p>
      </>,
      solution: <>
          <p>Nous avons accompagné l'investisseur avec une approche axée sur la rentabilité et la durabilité :</p>
          <ul>
              <li><strong>Conseils stratégiques :</strong> Propositions d'aménagements et de matériaux optimisant le rapport qualité/prix et facilitant l'entretien.</li>
              <li><strong>Rénovation intégrale :</strong> Remise à neuf de l'électricité, de la plomberie, de la salle d'eau et de la kitchenette pour garantir la sécurité et le confort.</li>
              <li><strong>Finitions soignées :</strong> Application de peintures neutres et pose de sols résistants pour créer un espace lumineux et accueillant, facile à s'approprier.</li>
              <li><strong>Respect du planning :</strong> La coordination efficace de nos équipes a permis de livrer le chantier dans les délais impartis.</li>
          </ul>
          <p>Le résultat est un studio clé en main, prêt à être loué, représentant un investissement sûr et valorisé.</p>
      </>,
      keyPoints: [
        { title: "Projet d'investissement locatif", icon: Wallet },
        { title: "Rénovation intégrale", icon: Sparkles },
        { title: "Respect des délais", icon: Calendar },
        { title: "Conseils en aménagement", icon: Lightbulb }
      ]
    }
  },
  {
    title: 'Maison de ville moderne',
    slug: 'maison-ville-moderne-boulogne',
    category: 'Maison',
    images: { before: 'project-house-1-before', after: 'project-house-1' },
    description: 'Transformation de deux salles de bains dans une maison, un projet salué pour son excellence et sa qualité d\'exécution du début à la fin.',
    testimonial: {
      quote: "Les frères Ait (ERG Renovation) ont transformé deux salles de bains et douche dans notre maison. Leur travail a été excellent du début à la fin. Ils sont très professionnels, fiables et leur travail est de très haute qualité.",
      author: "amanda blassel"
    },
    details: {
      challenge: <>
          <p>Le projet consistait à rénover simultanément deux salles de bain dans une maison habitée. Le défi était de réaliser une transformation complète et haut de gamme pour ces deux pièces techniques, tout en minimisant les désagréments pour les occupants et en assurant une cohérence esthétique entre les deux espaces.</p>
      </>,
      solution: <>
          <p>Notre équipe a mis en place une planification rigoureuse pour orchestrer les travaux. L'intervention a inclus :</p>
          <ul>
              <li><strong>Conception personnalisée :</strong> Chaque salle de bain a été pensée en fonction de son usage, avec des matériaux et des agencements spécifiques.</li>
              <li><strong>Rénovation complète :</strong> Dépose des anciens éléments, refonte totale de la plomberie et de l'électricité, et application de systèmes d'étanchéité de pointe.</li>
              <li><strong>Finitions haut de gamme :</strong> Pose de carrelage de précision, installation de sanitaires et robinetteries modernes, et création de douches à l'italienne.</li>
          </ul>
          <p>La fiabilité de nos équipes et la qualité constante de l'exécution, du premier jour à la livraison, ont permis de livrer deux salles de bain d'exception, transformant durablement le confort de la maison.</p>
      </>,
      keyPoints: [
        { title: "Deux salles de bain", icon: Bath },
        { title: "Finitions haute qualité", icon: Award },
        { title: "Gestion de chantier fiable", icon: Users },
        { title: "Plomberie et étanchéité", icon: Droplets }
      ]
    }
  },
  {
    title: 'Bureaux d\'avocats',
    slug: 'bureaux-avocats-paris-8',
    category: 'Bureaux',
    images: { before: 'project-office-2-before', after: 'project-office-2' },
    description: 'Aménagement d\'un plateau de bureaux pour un cabinet d\'avocats prestigieux, alliant fonctionnalité et image de marque.',
  },
  {
    title: 'Salle d\'eau sous combles',
    slug: 'salle-eau-combles-versailles',
    category: 'Salle de bain',
    images: { before: 'project-bathroom-2-before', after: 'project-bathroom-2' },
    description: 'Création d\'une salle d\'eau fonctionnelle et élégante sous les toits, optimisant un espace complexe avec des solutions sur mesure.',
  },
   {
    title: 'Appartement haussmannien',
    slug: 'appartement-haussmannien-paris-16',
    category: 'Appartement',
    images: { before: 'project-apartment-1-before', after: 'project-apartment-1' },
    description: 'Rénovation de deux appartements (3 et 2 pièces) avec un résultat remarquable salué par le client.',
    testimonial: {
      quote: "La société ERG a fait un remarquable travail de rénovation dans deux appartements de trois et deux pièces à Paris. Nous avons beaucoup apprécié leur professionnalisme et leur écoute tout au long du chantier.",
      author: "Arnaud Migoux, Paris"
    },
    details: {
      challenge: <>
          <p>Le projet consistait à gérer la rénovation simultanée de deux appartements distincts (un 3 pièces et un 2 pièces) pour un même client. Le défi logistique et organisationnel était de mener les deux chantiers en parallèle tout en garantissant un niveau de qualité et de finition identique pour les deux biens.</p>
      </>,
      solution: <>
          <p>Nous avons déployé deux équipes supervisées par un chef de projet unique pour assurer une communication fluide et une progression homogène. Pour chaque appartement, nous avons réalisé :</p>
          <ul>
              <li><strong>Une rénovation complète :</strong> Electricité, plomberie, sols, murs et plafonds.</li>
              <li><strong>Une écoute attentive :</strong> Des points réguliers ont été faits avec le client pour s'assurer que ses attentes étaient satisfaites sur les deux lots.</li>
              <li><strong>Des finitions soignées :</strong> La qualité d'exécution, signature d'ERG Rénovation, a été appliquée avec la même rigueur sur les deux projets.</li>
          </ul>
          <p>Grâce à notre professionnalisme et à une organisation sans faille, les deux appartements ont été livrés avec un résultat remarquable, à la grande satisfaction du client.</p>
      </>,
      keyPoints: [
        { title: "Gestion de deux chantiers", icon: Layers },
        { title: "Rénovation complète", icon: Sparkles },
        { title: "Professionnalisme et écoute", icon: Users },
        { title: "Qualité des finitions", icon: Award }
      ]
    }
  },
  {
    title: 'Cuisine ouverte et suppression de cloisons',
    slug: 'renovation-appartement-cloisons-vincennes',
    category: 'Appartement',
    images: { before: 'project-kitchen-1-before', after: 'project-kitchen-1' },
    description: "Rénovation complète d'un appartement incluant la cuisine, la salle de bain et la suppression de cloisons pour un espace de vie ouvert.",
    testimonial: {
      quote: "Je recommande vivement ! Rénovations complètes de mon appartement (cuisine, salle de bain, électricité, suppression de cloisons...). Le résultat est superbe et de qualité. Professionnels, réactifs, et de très bon conseil.",
      author: "Chloé de NOMBEL"
    },
    details: {
      challenge: <>
          <p>La demande était une rénovation complète d'un appartement, avec un focus particulier sur la création d'une cuisine moderne et d'une salle de bain fonctionnelle. Le projet impliquait la suppression de cloisons pour créer des espaces plus ouverts et lumineux, nécessitant une expertise en plomberie, électricité et finitions.</p>
      </>,
      solution: <>
          <p>En tant qu'interlocuteur unique, nous avons orchestré l'ensemble des corps de métier. Notre intervention s'est articulée autour de :</p>
          <ul>
              <li><strong>Décloisonnement :</strong> Suppression de cloisons pour agrandir l'espace de vie et créer une cuisine ouverte sur le séjour.</li>
              <li><strong>Rénovation des pièces techniques :</strong> Refonte complète de la cuisine et de la salle de bain, avec mise aux normes des réseaux d'eau et d'électricité.</li>
              <li><strong>Conseils et accompagnement :</strong> Nous avons conseillé la cliente sur les choix d'agencement et de matériaux pour un résultat esthétique et durable.</li>
          </ul>
          <p>Le résultat est un appartement transformé, avec des espaces de vie conviviaux et des pièces techniques entièrement modernisées, le tout livré avec un haut niveau de qualité.</p>
      </>,
      keyPoints: [
        { title: "Cuisine et Salle de Bain", icon: UtensilsCrossed },
        { title: "Suppression de cloisons", icon: Scaling },
        { title: "Rénovation Tous Corps d'État", icon: Layers },
        { title: "Conseils en aménagement", icon: Lightbulb }
      ]
    }
  },
    {
    title: 'Rénovation intégrale d\'un appartement parisien',
    slug: 'renovation-integrale-appartement-parisien',
    category: 'Appartement',
    images: { before: 'project-apartment-3-before', after: 'project-apartment-paris-75' },
    description: 'Rénovation complète d\'un appartement parisien, un projet mené par une équipe professionnelle et sérieuse pour un résultat de grande qualité.',
    testimonial: {
      quote: "Une équipe sympathique, sérieuse et professionnelle ! Mon appart a été rénové en entier par cette équipe, très contente du résultat, je recommande vivement !",
      author: "nathalie leroy"
    },
    details: {
      challenge: <>
          <p>Le projet consistait à rénover entièrement un appartement parisien. La cliente souhaitait une transformation complète, gérée par une équipe de confiance capable de livrer un résultat de haute qualité.</p>
      </>,
      solution: <>
          <p>Notre équipe a pris en charge l'intégralité de la rénovation, en s'assurant de maintenir une communication constante avec la cliente. Nos actions ont inclus :</p>
          <ul>
              <li><strong>Gestion de projet complète :</strong> Coordination de tous les aspects du chantier, du gros œuvre aux finitions.</li>
              <li><strong>Rénovation Tous Corps d'État :</strong> Intervention sur l'électricité, la plomberie, les sols, les murs et les plafonds.</li>
              <li><strong>Équipe professionnelle :</strong> Mise à disposition d'une équipe sympathique et sérieuse, à l'écoute des besoins de la cliente.</li>
          </ul>
          <p>La satisfaction de la cliente et le résultat final témoignent de notre engagement à fournir un travail de qualité, mené par des professionnels fiables.</p>
      </>,
      keyPoints: [
        { title: "Rénovation intégrale", icon: Sparkles },
        { title: "Équipe professionnelle", icon: Users },
        { title: "Qualité et sérieux", icon: Award },
        { title: "Satisfaction client", icon: CheckCircle }
      ]
    }
  }
];


export const testimonials: Testimonial[] = [
  {
    name: 'amanda blassel',
    location: 'Paris',
    quote:
      'Les frères Ait (ERG Renovation) ont transformé deux salles de bains et douche dans notre maison. Leur travail a été excellent du début à la fin. Ils sont très professionnels, fiables et leur travail est de très haute qualité.',
    avatar: 'testimonial-avatar-2',
    date: 'mars 2019',
    rating: 5,
  },
  {
    name: 'Chloé de NOMBEL',
    location: 'Paris',
    quote:
      'Je recommande vivement ! Rénovations complètes de mon appartement (cuisine, salle de bain, électricité, suppression de cloisons...). Le résultat est superbe et de qualité. Professionnels, réactifs, et de très bon conseil.',
    avatar: 'testimonial-avatar-2',
    date: 'sept. 2018',
    rating: 5,
  },
  {
    name: 'Frédéric Langlois',
    location: 'Paris',
    quote: 'Artisan ponctuel et sympathique, travail sérieux. Professionnel du début à la fin.',
    avatar: 'testimonial-avatar-3',
    date: 'juil. 2018',
    rating: 5,
  },
  {
    name: 'Greta Margherita',
    location: 'Paris',
    quote: "Notre salle de Bain avait besoin d'une rénovation complète et Mr. Ait et son équipe ont été dès le premier appel réactifs, professionnels et de très bon conseil... Le résultat est impeccable, propre, exactement comme nous le souhaitions.",
    avatar: 'testimonial-avatar-2',
    date: 'janv. 2018',
    rating: 5,
  },
  {
    name: 'Institut Océane',
    location: 'Paris',
    quote: "Merci à toute l'équipe d'ERG pour votre excellent travail. Vous avez réalisé une belle transformation de notre vieille salle de bains. Nous sommes très contents du résultat. Nous recommandons cette entreprise.",
    avatar: 'testimonial-avatar-2',
    date: 'nov. 2016',
    rating: 5,
  },
   {
    name: 'Coco BiggY',
    location: 'Paris',
    quote: "Ma salle de bains avait besoin d être refaite entièrement. Le gérant s est déplacé chez nous: il a été à notre écoute, nous a bien conseillé... Une équipe dynamique, rapide et très pro. Je recommande vivement cette entreprise.",
    avatar: 'testimonial-avatar-3',
    date: 'sept. 2016',
    rating: 5,
  },
  {
    name: 'Romain Desprez',
    location: 'Paris',
    quote: "Un travail de qualité, des artisans sérieux et qualifiés, en plus d'un contact des plus agréable. A recommander. Merci a vous.",
    avatar: 'testimonial-avatar-1',
    date: 'juil. 2016',
    rating: 5,
  },
  {
    name: 'nathalie leroy',
    location: 'Paris',
    quote: "Une équipe sympathique, sérieuse et professionnelle ! Mon appart a été rénové en entier par cette équipe, très contente du résultat, je recommande vivement !",
    avatar: 'testimonial-avatar-2',
    date: 'juil. 2016',
    rating: 5,
  }
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
    slug: 'renovation-energetique-paris-guide-complet',
    title: 'Rénovation énergétique à Paris : améliorer confort et factures sans dénaturer son appartement',
    description: 'Guide expert complet pour réussir la rénovation énergétique de votre appartement ancien à Paris : isolation, fenêtres, chauffage, et aides disponibles.',
    date: '2025-11-15',
    author: 'K. AIT',
    featuredImageId: 'blog-post-1',
    tags: ['Rénovation énergétique', 'Paris', 'Guide', 'Isolation'],
    toc: [
      { id: 'pourquoi-renover-energetiquement', title: 'Pourquoi la rénovation énergétique est un enjeu majeur à Paris', level: 'h2' },
      { id: 'specificites-parisiennes', title: 'Comprendre les spécificités de la rénovation énergétique parisienne', level: 'h2' },
      { id: 'etape-1-diagnostic', title: 'Étape 1 : Réaliser un diagnostic énergétique intelligent', level: 'h2' },
      { id: 'etape-2-isoler', title: 'Étape 2 : Isoler intelligemment sans perdre en confort', level: 'h2' },
      { id: 'etape-3-fenetres', title: 'Étape 3 : Remplacer les fenêtres sans trahir l’esthétique', level: 'h2' },
      { id: 'etape-4-chauffage', title: 'Étape 4 : Moderniser le chauffage et la production d’eau chaude', level: 'h2' },
      { id: 'etape-5-ventilation', title: 'Étape 5 : Ventilation et qualité de l’air intérieur', level: 'h2' },
      { id: 'etape-6-hierarchiser', title: 'Étape 6 : Hiérarchiser les travaux pour un retour sur investissement optimal', level: 'h2' },
      { id: 'budget', title: 'Budget : combien investir pour une rénovation énergétique à Paris ?', level: 'h2' },
      { id: 'erreurs-a-eviter', title: 'Les erreurs fréquentes à éviter', level: 'h2' },
    ],
    content: (() => {
      const isolationImage = PlaceHolderImages.find(p => p.id === 'service-attic');
      const fenetreImage = PlaceHolderImages.find(p => p.id === 'blog-image-verriere');

      return (
        <>
          <p>La rénovation énergétique est devenue un sujet central pour les propriétaires parisiens. Hausse du coût de l’énergie, nouvelles réglementations, interdiction progressive de mise en location des passoires thermiques, exigence de confort accru… Aujourd’hui, améliorer la performance énergétique de son appartement à Paris n’est plus une option, mais une nécessité stratégique.</p>
          <p>Pourtant, rénover énergétiquement un appartement parisien – souvent ancien, parfois classé, presque toujours en copropriété – est un exercice délicat. Comment isoler sans perdre de surface ? Comment remplacer les fenêtres sans trahir le cachet haussmannien ? Quels travaux sont réellement efficaces ? Et surtout, comment investir intelligemment sans dépenses inutiles ?</p>
          
          <h2 id="pourquoi-renover-energetiquement">Pourquoi la rénovation énergétique est un enjeu majeur à Paris</h2>
          <h3>1. Un parc immobilier ancien et énergivore</h3>
          <p>Plus de la moitié des logements parisiens ont été construits avant 1949. Ces immeubles offrent un charme incomparable, mais présentent souvent des murs peu ou pas isolés, des fenêtres anciennes, des systèmes de chauffage obsolètes, et une ventilation insuffisante.</p>
          <h3>2. Des obligations réglementaires de plus en plus strictes</h3>
          <p>La réglementation évolue rapidement, avec une interdiction progressive de location des logements classés F et G. Anticiper ces évolutions, c’est sécuriser la valeur de son bien.</p>
          <h3>3. Un levier puissant de valorisation immobilière</h3>
          <p>Un appartement énergétiquement performant se vend plus vite, se loue plus facilement et attire des acquéreurs plus exigeants.</p>

          <h2 id="specificites-parisiennes">Comprendre les spécificités de la rénovation énergétique parisienne</h2>
          <p>Rénover à Paris ne s’improvise pas. Il faut composer avec les contraintes de copropriété, la préciosité de chaque mètre carré et le respect du cachet architectural.</p>
          
          <h2 id="etape-1-diagnostic">Étape 1 : Réaliser un diagnostic énergétique intelligent</h2>
          <p>Un audit énergétique sérieux est la vraie boussole de votre projet. Il permet d’identifier les sources de déperdition, de hiérarchiser les travaux et d’éviter les investissements inutiles.</p>

          <h2 id="etape-2-isoler">Étape 2 : Isoler intelligemment sans perdre en confort</h2>
          <h3>L’isolation des murs par l’intérieur (ITI)</h3>
          <p>À Paris, c’est la solution privilégiée. Elle améliore le confort thermique et phonique, avec une perte de surface minimale si bien réalisée.</p>
          {isolationImage && (
            <div className="my-8 overflow-hidden rounded-lg">
              <Image src={isolationImage.imageUrl} alt={isolationImage.description} width={800} height={500} className="w-full h-auto object-cover" data-ai-hint={isolationImage.imageHint} />
            </div>
          )}
          <h3>L’isolation des plafonds et planchers</h3>
          <p>Isoler le plafond (si logement au-dessus non chauffé) ou le plancher (au-dessus d'une cave) sont des postes souvent très rentables.</p>

          <h2 id="etape-3-fenetres">Étape 3 : Remplacer les fenêtres sans trahir l’esthétique</h2>
          <p>Il est aujourd'hui possible de conserver l'aspect bois et de respecter les profils anciens tout en améliorant considérablement l'isolation thermique et acoustique, un double bénéfice à Paris.</p>
           {fenetreImage && (
            <div className="my-8 overflow-hidden rounded-lg">
              <Image src={fenetreImage.imageUrl} alt={fenetreImage.description} width={800} height={500} className="w-full h-auto object-cover" data-ai-hint={fenetreImage.imageHint} />
            </div>
          )}

          <h2 id="etape-4-chauffage">Étape 4 : Moderniser le chauffage et la production d’eau chaude</h2>
          <p>Le remplacement de radiateurs anciens, une régulation intelligente ou des thermostats programmables apportent de vrais gains, même sans changer la chaudière collective.</p>
          
          <h2 id="etape-5-ventilation">Étape 5 : Ventilation et qualité de l’air intérieur</h2>
          <p>Un logement mieux isolé doit mieux respirer. Une VMC performante est obligatoire pour éviter l’humidité et les moisissures.</p>

          <h2 id="etape-6-hierarchiser">Étape 6 : Hiérarchiser les travaux pour un retour sur investissement optimal</h2>
          <p>L'ordre de priorité recommandé est : 1. Isolation (murs, plafonds), 2. Fenêtres, 3. Chauffage, 4. Ventilation.</p>
          
          <h2 id="budget">Budget : combien investir pour une rénovation énergétique à Paris ?</h2>
          <p>Les coûts varient, mais prévoyez entre 5 000 et 10 000 € pour des actions ciblées, et de 15 000 à 30 000 € ou plus pour une rénovation globale. N'oubliez pas la marge de 10-15% pour les imprévus.</p>
          
          <h2 id="erreurs-a-eviter">Les erreurs fréquentes à éviter</h2>
          <ul>
            <li>Isoler sans traiter la ventilation.</li>
            <li>Changer le chauffage sans isoler.</li>
            <li>Négliger la copropriété.</li>
          </ul>

          <h3>Conclusion : rénover énergétiquement, c’est investir intelligemment</h3>
          <p>La rénovation énergétique à Paris est un levier de confort, une protection contre la hausse des coûts, un atout réglementaire, et une valorisation patrimoniale durable. Bien pensée, elle respecte l’âme de votre appartement tout en l’adaptant aux exigences contemporaines.</p>
          <p>👉 <strong>Vous envisagez une rénovation énergétique à Paris ?</strong> <Link href="/devis">Contactez ERG Rénovation pour une étude personnalisée, un diagnostic précis et un accompagnement expert de A à Z.</Link></p>
        </>
      )
    })()
  },
  {
    slug: 'reussir-renovation-salle-de-bain-paris',
    title: 'Réussir la rénovation de votre salle de bain à Paris',
    description: 'Guide complet, erreurs à éviter et conseils d’experts pour transformer votre salle de bain en un espace de confort et de valeur.',
    date: '2025-10-25',
    author: 'K. AIT',
    featuredImageId: 'service-bathroom',
    tags: ['Salle de bain', 'Rénovation', 'Paris', 'Guide'],
    toc: [
      { id: 'pourquoi-renover', title: 'Pourquoi rénover sa salle de bain à Paris ?', level: 'h2' },
      { id: 'specificites-parisiennes-sdb', title: 'Les spécificités d’une salle de bain parisienne', level: 'h2' },
      { id: 'etape-1-projet', title: 'Étape 1 : Définir un projet clair et réaliste', level: 'h2' },
      { id: 'etape-2-agencement', title: 'Étape 2 : Optimiser l’agencement', level: 'h2' },
      { id: 'etape-3-materiaux', title: 'Étape 3 : Choisir des matériaux adaptés', level: 'h2' },
      { id: 'etape-4-technique', title: 'Étape 4 : Plomberie et électricité', level: 'h2' },
      { id: 'etape-5-ventilation-etancheite', title: 'Étape 5 : Ventilation et étanchéité', level: 'h2' },
      { id: 'etape-6-lumiere', title: 'Étape 6 : Lumière et ambiance', level: 'h2' },
      { id: 'budget-sdb', title: 'Budget : Combien coûte une rénovation ?', level: 'h2' },
      { id: 'erreurs-a-eviter-sdb', title: 'Les erreurs fréquentes à éviter', level: 'h2' },
    ],
    content: (() => {
      const agencementImage = PlaceHolderImages.find(p => p.id === 'project-small-bathroom-after');
      const finitionImage = PlaceHolderImages.find(p => p.id === 'project-bathroom-1');

      return (
        <>
          <p>La salle de bain est aujourd’hui bien plus qu’une simple pièce fonctionnelle. À Paris, où les surfaces sont souvent limitées et les immeubles anciens nombreux, la rénovation d’une salle de bain représente un véritable défi technique et esthétique. Pourtant, lorsqu’elle est bien pensée, elle devient un espace de confort, de détente et un puissant levier de valorisation immobilière.</p>
          
          <h2 id="pourquoi-renover">Pourquoi rénover sa salle de bain à Paris est un projet stratégique</h2>
          <ul>
            <li><strong>Confort quotidien :</strong> Une meilleure circulation, plus de rangements et une bonne ventilation.</li>
            <li><strong>Valeur du bien :</strong> Un atout majeur pour la revente ou la location sur le marché parisien.</li>
            <li><strong>Mise aux normes :</strong> L'occasion de sécuriser les installations de plomberie et d'électricité.</li>
          </ul>

          <h2 id="specificites-parisiennes-sdb">Les spécificités d’une salle de bain parisienne</h2>
          <p>Rénover à Paris ne s’improvise pas. Il faut intégrer les contraintes des surfaces réduites, des immeubles anciens (murs irréguliers, colonnes techniques) et des règles de copropriété.</p>
          
          <h2 id="etape-1-projet">Étape 1 : Définir un projet clair et réaliste</h2>
          <p>Hiérarchisez vos priorités : douche ou baignoire ? Rénovation esthétique ou complète ? Budget vs. matériaux haut de gamme ? Mieux vaut une salle de bain simple mais parfaitement exécutée qu’un projet ambitieux mal maîtrisé.</p>

          <h2 id="etape-2-agencement">Étape 2 : Optimiser l’agencement dans un petit espace</h2>
          {agencementImage && (
            <div className="my-8 overflow-hidden rounded-lg">
              <Image src={agencementImage.imageUrl} alt={agencementImage.description} width={800} height={500} className="w-full h-auto object-cover" data-ai-hint={agencementImage.imageHint} />
            </div>
          )}
          <p>La douche à l’italienne, les meubles suspendus et les équipements compacts (WC, vasques) sont vos meilleurs alliés pour libérer l'espace au sol et agrandir visuellement la pièce.</p>

          <h2 id="etape-3-materiaux">Étape 3 : Choisir des matériaux adaptés à la salle de bain</h2>
          <p>Privilégiez le carrelage grand format, les peintures spéciales pièces humides, les sols antidérapants (norme R10/R11) et du mobilier traité hydrofuge pour garantir la durabilité.</p>

          <h2 id="etape-4-technique">Étape 4 : Plomberie et électricité – le socle invisible</h2>
          <p>Refaire la plomberie dans l'ancien sécurise l'installation. L'électricité doit respecter des volumes de sécurité stricts (norme NF C 15-100) pour garantir votre sécurité.</p>

          <h2 id="etape-5-ventilation-etancheite">Étape 5 : Ventilation et étanchéité, deux points critiques</h2>
          <p>Une VMC performante est obligatoire pour éviter l'humidité, surtout dans les salles de bain sans fenêtre. L'étanchéité (SPEC) est non-négociable pour garantir la durabilité et éviter les sinistres.</p>
          {finitionImage && (
            <div className="my-8 overflow-hidden rounded-lg">
              <Image src={finitionImage.imageUrl} alt={finitionImage.description} width={800} height={500} className="w-full h-auto object-cover" data-ai-hint={finitionImage.imageHint} />
            </div>
          )}

          <h2 id="etape-6-lumiere">Étape 6 : Lumière et ambiance</h2>
          <p>Combinez un éclairage fonctionnel (miroir) et décoratif (lumières indirectes) avec des couleurs claires pour agrandir l'espace.</p>

          <h2 id="budget-sdb">Budget : Combien coûte une rénovation de salle de bain à Paris ?</h2>
          <p>À Paris, comptez entre 7 000€ et 10 000€ pour une rénovation complète standard, et 12 000€ ou plus pour un projet haut de gamme. Prévoyez toujours une marge de 10-15% pour les imprévus.</p>
          
          <h2 id="erreurs-a-eviter-sdb">Les erreurs fréquentes à éviter absolument</h2>
          <ul>
              <li>Sous-estimer la partie technique.</li>
              <li>Choisir un artisan uniquement sur le prix.</li>
              <li>Négliger la ventilation (VMC).</li>
              <li>Multiplier les intervenants sans coordination.</li>
          </ul>

          <h3>Conclusion : Une salle de bain parisienne réussie</h3>
          <p>👉 <strong>Vous avez un projet de rénovation de salle de bain ?</strong> <Link href="/devis">Contactez ERG Rénovation pour une étude personnalisée et un accompagnement de A à Z.</Link></p>
        </>
      )
    })()
  },
  {
    slug: '10-astuces-renovation-appartement-parisien',
    title: '10 astuces expertes pour réussir la rénovation de votre appartement parisien',
    description: 'Découvrez nos conseils d’experts pour naviguer les défis uniques de la rénovation à Paris, de l’optimisation de l’espace à la gestion de la copropriété.',
    date: '2025-11-08',
    author: 'A. AIT',
    featuredImageId: 'blog-post-1',
    tags: ['Rénovation', 'Appartement', 'Conseils'],
    toc: [
      { id: 'optimiser-metre-carre', title: '1. Optimisez chaque mètre carré', level: 'h2' },
      { id: 'lumiere-fil-conducteur', title: '2. Faites de la lumière votre fil conducteur', level: 'h2' },
      { id: 'sublimer-ancien', title: '3. Respectez et sublimez l’âme de l’ancien', level: 'h2' },
      { id: 'anticiper-copropriete', title: '4. Anticipez les règles de copropriété', level: 'h2' },
      { id: 'isolation-performante', title: '5. Investissez dans une isolation performante', level: 'h2' },
      { id: 'rangements-integres', title: '6. Privilégiez les rangements intégrés', level: 'h2' },
      { id: 'materiaux-durables', title: '7. Choisissez des matériaux durables', level: 'h2' },
      { id: 'soigner-entree', title: '8. Soignez l’entrée', level: 'h2' },
      { id: 'interlocuteur-unique', title: '9. Confiez votre projet à un interlocuteur unique', level: 'h2' },
      { id: 'budget-realiste', title: '10. Définissez un budget réaliste', level: 'h2' },
    ],
    content: (() => {
      const verriereImage = PlaceHolderImages.find(p => p.id === 'blog-image-verriere');
      const parquetImage = PlaceHolderImages.find(p => p.id === 'blog-image-parquet');
      const cuisineImage = PlaceHolderImages.find(p => p.id === 'project-kitchen-1');
      const sdbImage = PlaceHolderImages.find(p => p.id === 'project-small-bathroom-after');
      const finitionImage = PlaceHolderImages.find(p => p.id === 'service-pillar-finish');

      return (
        <>
          <p>Rénover un appartement à Paris est un exercice d’équilibriste. Entre les surfaces souvent réduites, les contraintes de copropriété, les normes techniques exigeantes et le respect du cachet de l’ancien, chaque décision compte. Une rénovation réussie ne se limite pas à l’esthétique : elle doit améliorer le confort, valoriser le bien et anticiper les usages de demain.</p>
          
          <h2 id="optimiser-metre-carre">1. Optimisez chaque mètre carré (penser volume avant surface)</h2>
          <p>Dans un appartement parisien, chaque centimètre a de la valeur. L’optimisation ne consiste pas seulement à « gagner de la place », mais à mieux exploiter les volumes.</p>
          <ul>
            <li><strong>Verticalité :</strong> rangements toute hauteur, bibliothèques intégrées, placards sur mesure jusqu’au plafond.</li>
            <li><strong>Multifonction :</strong> canapé convertible de qualité, table escamotable, lit avec tiroirs.</li>
            <li><strong>Cloisons intelligentes :</strong> verrières d’atelier, claustras ou portes coulissantes qui structurent sans assombrir.</li>
          </ul>
          
          {verriereImage && (
            <div className="my-8 overflow-hidden rounded-lg">
              <Image src={verriereImage.imageUrl} alt={verriereImage.description} width={800} height={500} className="w-full h-auto object-cover" data-ai-hint={verriereImage.imageHint} />
            </div>
          )}

          <h2 id="lumiere-fil-conducteur">2. Faites de la lumière votre fil conducteur</h2>
          <p>À Paris, la lumière est précieuse. La rénovation doit la capter, la diffuser et la mettre en scène. Décloisonner, utiliser des couleurs claires et des miroirs stratégiques transforme radicalement la perception d’un espace.</p>
          
          <h2 id="sublimer-ancien">3. Respectez et sublimez l’âme de l’ancien</h2>
          <p>Parquet, moulures, cheminées... Ces éléments peuvent être restaurés et mis en valeur par un contraste contemporain pour un style « parisien chic » intemporel.</p>

          {parquetImage && (
            <div className="my-8 overflow-hidden rounded-lg">
              <Image src={parquetImage.imageUrl} alt={parquetImage.description} width={800} height={500} className="w-full h-auto object-cover" data-ai-hint={parquetImage.imageHint} />
            </div>
          )}

          <h2 id="anticiper-copropriete">4. Anticipez les règles de copropriété (et gagnez du temps)</h2>
          <p>La modification d’un mur porteur ou le changement de fenêtres sont soumis à autorisation. Un dossier solide préparé par des professionnels accélère l’accord et sécurise le planning.</p>

          <h2 id="isolation-performante">5. Investissez dans une isolation performante (confort et économies)</h2>
          <p>Bruit de la rue, voisins proches, déperditions thermiques… Une bonne isolation phonique et thermique augmente immédiatement la qualité de vie et la valeur du bien.</p>
          
          <h2 id="rangements-integres">6. Privilégiez les rangements intégrés sur mesure</h2>
          <p>Les solutions sur mesure permettent d’exploiter les recoins, de maintenir une harmonie visuelle et de libérer l’espace au sol. Un intérieur ordonné paraît toujours plus grand.</p>
          
           {cuisineImage && (
            <div className="my-8 overflow-hidden rounded-lg">
              <Image src={cuisineImage.imageUrl} alt={cuisineImage.description} width={800} height={500} className="w-full h-auto object-cover" data-ai-hint={cuisineImage.imageHint} />
            </div>
          )}

          <h2 id="materiaux-durables">7. Choisissez des matériaux durables et adaptés à la vie urbaine</h2>
          <p>Un logement parisien est intensément utilisé. Optez pour du parquet massif, du carrelage grand format et des peintures lessivables pour un intérieur qui dure.</p>
           
           {sdbImage && (
            <div className="my-8 overflow-hidden rounded-lg">
              <Image src={sdbImage.imageUrl} alt={sdbImage.description} width={800} height={500} className="w-full h-auto object-cover" data-ai-hint={sdbImage.imageHint} />
            </div>
          )}

          <h2 id="soigner-entree">8. Soignez l’entrée, véritable carte de visite</h2>
          <p>Une entrée bien pensée avec des rangements, un miroir et un éclairage chaleureux crée une transition fluide et améliore le quotidien.</p>

          <h2 id="interlocuteur-unique">9. Confiez votre projet à un interlocuteur unique</h2>
          <p>Faire appel à une entreprise tous corps d’état comme ERG Rénovation vous assure un chef de projet dédié, un planning maîtrisé et une responsabilité claire. C’est la clé d’une rénovation sereine.</p>

          {finitionImage && (
            <div className="my-8 overflow-hidden rounded-lg">
              <Image src={finitionImage.imageUrl} alt={finitionImage.description} width={800} height={500} className="w-full h-auto object-cover" data-ai-hint={finitionImage.imageHint} />
            </div>
          )}

          <h2 id="budget-realiste">10. Définissez un budget réaliste (et prévoyez une marge)</h2>
          <p>À Paris, les imprévus sont fréquents. Un devis détaillé et une marge de sécurité de 10-15% vous permettent de terminer votre projet sans stress.</p>
          
          <h3>En conclusion</h3>
          <p>Rénover un appartement parisien est un projet ambitieux qui demande expertise et précision. En suivant ces 10 astuces, vous posez les bases d’un projet réussi, durable et valorisant.</p>
          <p>👉 <strong>Vous avez un projet de rénovation à Paris ou en petite couronne ?</strong> <Link href="/devis">Contactez ERG Rénovation pour une étude personnalisée et un devis clair.</Link></p>
        </>
      )
    })()
  },
  {
    slug: 'comment-choisir-bon-artisan-travaux',
    title: 'Comment Choisir le Bon Artisan pour vos Travaux ?',
    description: 'Les 5 points clés pour éviter les erreurs et réussir votre projet de rénovation en toute confiance.',
    date: '2025-10-15',
    author: 'K. AIT',
    featuredImageId: 'blog-post-2',
    tags: ['Artisan', 'Travaux', 'Conseils'],
    toc: [
      { id: 'pourquoi-choix-artisan-capital', title: 'Pourquoi le choix de l’artisan est capital', level: 'h2' },
      { id: 'verifier-qualifications-assurances', title: '1. Vérifiez les qualifications et assurances', level: 'h2' },
      { id: 'analyser-clarte-devis', title: '2. Analysez la clarté du devis', level: 'h2' },
      { id: 'voir-realisations-concretes', title: '3. Demandez à voir des réalisations', level: 'h2' },
      { id: 'reputation-avis', title: '4. Appuyez-vous sur la réputation', level: 'h2' },
      { id: 'evaluer-communication', title: '5. Évaluez la communication', level: 'h2' },
      { id: 'entreprise-tous-corps-etat', title: 'Pourquoi choisir une entreprise tous corps d’état', level: 'h2' },
    ],
    content: (() => {
      const artisanImage = PlaceHolderImages.find(p => p.id === 'about-hero');
      return (
      <>
          <p>Choisir un artisan pour ses travaux est une décision déterminante. Que vous envisagiez une rénovation complète d’appartement, une salle de bain, une cuisine ou de simples travaux d’aménagement, le professionnel que vous sélectionnez conditionne la réussite – ou l’échec – de votre projet.</p>
          <p>Un bon artisan, c’est : des travaux réalisés dans les règles de l’art, un chantier maîtrisé, des délais respectés, un budget tenu, et une expérience sereine. À l’inverse, un mauvais choix peut entraîner retards, surcoûts, malfaçons, conflits et stress inutile. Dans un contexte comme Paris et l’Île-de-France, où les contraintes techniques et réglementaires sont nombreuses, cette décision est encore plus stratégique.</p>
          <p>Fort de notre expérience chez ERG Rénovation, nous vous livrons dans cet article les 5 points clés incontournables pour choisir le bon artisan en toute confiance.</p>

          <h2 id="pourquoi-choix-artisan-capital">Pourquoi le choix de l’artisan est capital pour vos travaux</h2>
          <p>Avant d’entrer dans le détail, il est important de comprendre ce qui est réellement en jeu. Un chantier de rénovation, ce n’est pas seulement poser du carrelage ou repeindre des murs. C’est : intervenir sur un bâti existant (souvent ancien), coordonner plusieurs corps de métier, respecter des normes techniques strictes, composer avec un logement occupé ou une copropriété, et anticiper les imprévus. L’artisan est le chef d’orchestre de cette complexité. D’où l’importance de ne rien laisser au hasard.</p>

          {artisanImage && (
            <div className="my-8 overflow-hidden rounded-lg">
              <Image src={artisanImage.imageUrl} alt={artisanImage.description} width={800} height={500} className="w-full h-auto object-cover" data-ai-hint={artisanImage.imageHint} />
            </div>
          )}

          <h2 id="verifier-qualifications-assurances">1. Vérifiez les qualifications et les assurances (le socle non négociable)</h2>
          <p>C’est la première vérification, et elle doit être systématique. Un artisan sérieux n’a rien à cacher et vous fournira spontanément les documents suivants.</p>
          <h3>✔️ L’immatriculation officielle</h3>
          <p>Un professionnel doit être inscrit au Répertoire des Métiers (artisan) ou au Registre du Commerce et des Sociétés (RCS). Cette immatriculation prouve l’existence légale de l’entreprise et vous protège en cas de litige.</p>
          <h3>✔️ L’assurance responsabilité civile professionnelle (RC Pro)</h3>
          <p>Elle couvre les dommages que l’artisan pourrait causer pendant les travaux : dégât des eaux, casse, détérioration d’un bien existant, dommages à un tiers. Sans RC Pro valide, vous prenez un risque financier important.</p>
          <h3>✔️ L’assurance décennale (obligatoire pour certains travaux)</h3>
          <p>Indispensable pour le gros œuvre, les travaux structurels, l’électricité, la plomberie, l’étanchéité, et certains travaux de rénovation lourde. Elle vous protège pendant 10 ans contre les malfaçons affectant la solidité du bâtiment ou le rendant impropre à son usage.</p>
          <p><strong>Conseil d’expert :</strong> Demandez les attestations et vérifiez leur validité (dates, nature des travaux couverts, nom exact de l’entreprise).</p>
          
          <h2 id="analyser-clarte-devis">2. Analysez la clarté et le niveau de détail du devis</h2>
          <p>Le devis est bien plus qu’un simple document financier : c’est un engagement contractuel.</p>
          <h3>❌ Les signaux d’alerte à éviter</h3>
          <ul>
            <li>Une seule ligne avec un montant global</li>
            <li>Des termes vagues : “travaux divers”, “forfait rénovation”</li>
            <li>Aucune mention des matériaux</li>
            <li>Aucun délai indiqué</li>
            <li>Un prix anormalement bas</li>
          </ul>
          <h3>✅ Ce qu’un devis professionnel doit impérativement contenir</h3>
          <ul>
            <li>Le détail de chaque prestation (nature, quantités, prix unitaires)</li>
            <li>Les matériaux utilisés (marques, références)</li>
            <li>Le planning (date de début, durée estimée)</li>
            <li>Les conditions de paiement (acompte, échéancier)</li>
            <li>Le taux de TVA applicable</li>
          </ul>
          <p><strong>Règle d’or :</strong> comparez toujours au moins 3 devis. Cela vous permet d’évaluer le prix du marché et de détecter les incohérences.</p>

          <h2 id="voir-realisations-concretes">3. Demandez à voir des réalisations concrètes (preuve par l’exemple)</h2>
          <p>Les discours sont importants, mais les preuves le sont encore plus. Un artisan sérieux dispose de photos avant/après et de chantiers documentés. Cela permet de juger la qualité des finitions, le style, et la diversité des projets réalisés. L'idéal est de visiter un chantier récemment livré pour échanger avec un ancien client sur le respect des délais, la communication et la gestion des imprévus.</p>
          
          <h2 id="reputation-avis">4. Appuyez-vous sur la réputation et les avis (avec discernement)</h2>
          <p>Une recommandation directe reste l’un des meilleurs indicateurs de fiabilité. Les avis en ligne (Google, plateformes spécialisées) sont aussi utiles, mais analysez la qualité des commentaires plutôt que la note seule. Méfiez-vous des avis trop courts, des notes parfaites sans contenu, ou des profils douteux.</p>

          <h2 id="evaluer-communication">5. Évaluez la communication et le relationnel (clé d’un chantier serein)</h2>
          <p>Un bon artisan est à l'écoute, propose des solutions adaptées et explique clairement les contraintes techniques. La confiance et la communication sont aussi importantes que la technique. Un bon professionnel sait conseiller sans imposer, alerter sans inquiéter, et trouver des solutions en cas d’imprévu.</p>

          <h2 id="entreprise-tous-corps-etat">Pourquoi choisir une entreprise tous corps d’état change tout</h2>
          <p>Coordonner plusieurs artisans indépendants peut vite devenir un casse-tête. Faire appel à une entreprise tous corps d’état comme ERG Rénovation offre un interlocuteur unique, une coordination fluide, un planning maîtrisé et une responsabilité centralisée. Résultat : un chantier plus rapide, plus sûr et plus serein.</p>
          
          <h3>Les erreurs fréquentes à éviter absolument</h3>
          <ul>
            <li>choisir uniquement sur le prix,</li>
            <li>ne pas vérifier les assurances,</li>
            <li>accepter un devis flou,</li>
            <li>négliger la communication,</li>
            <li>multiplier les intervenants sans coordination.</li>
          </ul>

          <h3>En résumé : les 5 points clés à retenir</h3>
          <ol>
            <li>Vérifiez systématiquement les qualifications et assurances</li>
            <li>Analysez un devis clair, détaillé et réaliste</li>
            <li>Exigez des références et réalisations concrètes</li>
            <li>Tenez compte de la réputation et des avis</li>
            <li>Privilégiez la qualité du contact et de la communication</li>
          </ol>
          <p>Faites le choix de la sérénité pour vos travaux. Chez ERG Rénovation, nous avons bâti notre réputation sur la transparence, la qualité d’exécution, la maîtrise des chantiers, et la satisfaction client. Nous vous accompagnons de la conception à la livraison, avec un chef de projet dédié et des artisans qualifiés.</p>
          <p>👉 <strong>Vous avez un projet de rénovation ?</strong> <Link href="/devis">Discutons ensemble de vos envies et construisons un projet solide, maîtrisé et durable.</Link></p>
        </>
      )
    })()
  }
];

export const AREAS: Area[] = [
  {
    label: "Paris",
    code: "75",
    href: "/renovation-paris",
    description: "Tous arrondissements : rénovation intérieure, salle de bain, cuisine, rénovation complète.",
    cities: Array.from({ length: 20 }, (_, i) => {
      const n = i + 1;
      return { name: n === 1 ? "Paris 1er" : `Paris ${n}e`, href: null };
    }),
  },
  {
    label: "Hauts-de-Seine",
    code: "92",
    href: "/renovation-hauts-de-seine",
    description: "Boulogne, Courbevoie, Levallois, Asnières, Colombes, Nanterre…",
    cities: [
      { name: "Boulogne-Billancourt", code: "92100", href: "/renovation-boulogne-billancourt" },
      { name: "Courbevoie", code: "92400", href: "/renovation-courbevoie" },
      { name: "Levallois-Perret", code: "92300", href: "/renovation-levallois-perret" },
      { name: "Asnières-sur-Seine", code: "92600", href: "/renovation-asnieres-sur-seine" },
      { name: "Colombes", code: "92700", href: "/renovation-colombes" },
      { name: "Nanterre", code: "92000", href: "/renovation-nanterre" },
    ],
  },
  {
    label: "Seine-Saint-Denis",
    code: "93",
    href: "/renovation-seine-saint-denis",
    description: "Montreuil, Pantin, Saint-Denis, Aubervilliers…",
    cities: [
      { name: "Montreuil", code: "93100", href: "/renovation-montreuil" },
      // add later
    ],
  },
  {
    label: "Val-de-Marne",
    code: "94",
    href: "/renovation-val-de-marne",
    description: "Vincennes, Créteil, Ivry-sur-Seine, Vitry-sur-Seine…",
    cities: [
      { name: "Vincennes", code: "94300", href: "/renovation-vincennes" },
      // add later
    ],
  },
];
    

    