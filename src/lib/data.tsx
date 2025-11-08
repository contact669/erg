
import type { Service, Project, Testimonial, ProcessStep, NavItem, BlogPost, LocalLandingPage } from './types';
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
  ShieldCheck,
  Thermometer,
  CheckCircle,
} from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from './placeholder-images';
import Link from 'next/link';

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
        { title: 'Transparence et Garanties', description: "Tous nos travaux sont couverts par une assurance décennale et une assurance responsabilité civile. Nos devis sont clairs et nos délais, tenus.", icon: ClipboardCheck }
    ],
    zones: {
        description: "Basée au cœur de la région, ERG Rénovation déploie ses équipes pour tous projets de rénovation d'appartement à Paris (75) et en Île-de-France. Cliquez sur votre département pour découvrir notre expertise locale :",
        list: [
            { name: 'Paris (75)', slug: 'paris-75' },
            { name: 'Hauts-de-Seine (92)', slug: 'hauts-de-seine-92' },
            { name: 'Yvelines (78)', slug: 'yvelines-78' },
            { name: 'Val-de-Marne (94)', slug: 'val-de-marne-94' },
            { name: 'Seine-Saint-Denis (93)', slug: 'seine-saint-denis-93' }
        ]
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
      { step: 1, title: 'Visite & Faisabilité', description: "Analyse de vos combles (hauteur sous plafond, pente du toit, type de charpente) et de vos besoins (suite parentale, salle de jeux, bureau...)." },
      { step: 2, title: 'Conception & Chiffrage', description: "Proposition de plans d'aménagement optimisés et d'un devis détaillé (incluant isolation, structure, finitions)." },
      { step: 3, title: 'Autorisations d\'Urbanisme', description: "Prise en charge complète du dossier administratif (DP ou PC)." },
      { step: 4, title: 'Réalisation des Travaux', description: "Pilotage des équipes (charpentiers, couvreurs, plaquistes, plombiers...) par un conducteur de travaux unique." }
    ],
    whyUs: [
        { title: "Étude de Structure", description: "Avant tout projet, nous vérifions la capacité portante du plancher et l'état de la charpente. Nous travaillons avec des bureaux d'études structure si nécessaire.", icon: Layers },
        { title: "Gestion Administrative (Permis)", description: "Nous prenons en charge le montage et le dépôt de votre dossier : Déclaration Préalable de Travaux ou Permis de Construire.", icon: FileOutput },
        { title: 'Confort Thermique Garanti', description: "Notre priorité absolue est d'éviter l'effet \"fournaise\" en été. Nous soignons l'isolation et la ventilation (VMC) pour un espace habitable toute l'année.", icon: Thermometer }
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
        { title: "Un Chantier Propre, une Prestation Sans Souci", description: "La propreté est partie intégrante de notre service haut de gamme. Protection, nettoyage quotidien et respect de votre domicile sont assurés.", icon: ClipboardCheck }
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

export const localLandingPages: LocalLandingPage[] = [
  {
    slug: 'neuilly-sur-seine',
    type: 'city',
    title: 'Rénovation d\'Appartement à Neuilly-sur-Seine (92200)',
    metaTitle: 'Rénovation Appartement Neuilly-sur-Seine (92) | ERG Rénovation',
    metaDescription: 'Expert en rénovation d\'appartements haut de gamme à Neuilly-sur-Seine. ERG Rénovation gère votre projet de A à Z : plans, travaux, finitions de luxe.',
    parentService: services.find(s => s.slug === 'renovation-appartement')!,
    introduction: 'La rénovation d\'un appartement à Neuilly-sur-Seine exige une compréhension fine de son patrimoine architectural unique et un niveau de finition irréprochable. ERG Rénovation est votre partenaire de confiance, spécialisé dans la transformation d\'appartements de standing, des hôtels particuliers aux résidences modernes.',
    cta: {
      primary: 'Demander un devis pour mon projet à Neuilly',
      secondary: 'Voir nos réalisations dans le 92',
    },
    reassurancePoints: [
      'Expertise des appartements de luxe',
      'Gestion des contraintes de copropriété',
      'Finitions "haute couture"',
    ],
    mainContent: (
      <>
        <h2 className="font-headline text-3xl font-bold">Un savoir-faire adapté au prestige de Neuilly-sur-Seine</h2>
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
    slug: 'hauts-de-seine-92',
    type: 'department',
    title: 'Rénovation d\'Appartement Haut de Gamme dans les Hauts-de-Seine (92)',
    metaTitle: 'Rénovation Appartement Hauts-de-Seine (92) | Neuilly, Boulogne | ERG',
    metaDescription: 'Expert en rénovation d\'appartements de standing dans le 92 (Neuilly-sur-Seine, Boulogne, Saint-Cloud). Maîtrise des projets complexes en copropriété. Devis.',
    parentService: services.find(s => s.slug === 'renovation-appartement')!,
    introduction: 'Les Hauts-de-Seine (92) regroupent certaines des adresses les plus prisées d\'Île-de-France, de Neuilly-sur-Seine à Boulogne-Billancourt, en passant par Saint-Cloud. La rénovation d\'un appartement dans ce département exige une expertise particulière : connaissance des immeubles des années 30 et Haussmanniens, gestion des contraintes de la copropriété, et exigence sur les finitions. ERG Rénovation est votre partenaire unique pour un projet d\'excellence dans le 92.',
    cta: {
      primary: 'Demander une étude personnalisée dans le 92',
      secondary: 'Voir toutes nos réalisations',
    },
    reassurancePoints: [
      'Maîtrise des règlements de copropriété du 92',
      'Expertise en isolation phonique (Appartements voisins)',
      'Garantie décennale pour vos travaux structurels',
    ],
    mainContent: (
      <>
        <h2 className="font-headline text-3xl font-bold">Notre Expertise pour Votre Appartement dans le 92</h2>
        <p>Que vous souhaitiez ouvrir l'espace, réhabiliter des volumes anciens ou créer une suite parentale, nous gérons l'intégralité des travaux (TCE).</p>
        <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                <div>
                    <h3 className="font-headline font-semibold text-lg">Abattage de Murs Porteurs et Ouverture d'Espace</h3>
                    <p className="text-muted-foreground">La transformation la plus courante dans le 92. Nous gérons l'étude structurelle, la pose d'IPN/HEA et l'obtention des autorisations de copropriété.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                <div>
                    <h3 className="font-headline font-semibold text-lg">Optimisation des Espaces et Création de Rangements</h3>
                    <p className="text-muted-foreground">Conception et intégration de dressings, bibliothèques et meubles sur mesure pour maximiser la valeur de chaque mètre carré.</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
                <div>
                    <h3 className="font-headline font-semibold text-lg">Rénovation Complète des Salles d'Eau et Cuisines</h3>
                    <p className="text-muted-foreground">Expertise technique dans les pièces humides, avec des finitions haut de gamme pour les cuisines et salles de bain (plomberie, étanchéité, carrelage grand format).</p>
                </div>
            </div>
        </div>
        <h2 className="font-headline text-3xl font-bold mt-12">Les Villes du 92 où Nous Intervenons Prioritairement</h2>
        <p className="mt-4">Notre expérience s'étend sur l'ensemble des Hauts-de-Seine, avec une forte concentration de projets d'exception dans les secteurs suivants :</p>
      </>
    ),
    testimonial: {
      quote: "La rénovation de notre appartement à Boulogne a été gérée avec une grande rigueur, sans aucune plainte de la copropriété.",
      author: "Famille Dubois, Boulogne-Billancourt (92)",
    },
    relatedLocations: [
      { name: 'Neuilly-sur-Seine', slug: 'neuilly-sur-seine' },
      { name: 'Boulogne-Billancourt', slug: 'boulogne-billancourt' },
      { name: 'Saint-Cloud', slug: 'saint-cloud' },
      { name: 'Garches', slug: 'garches' },
      { name: 'Sèvres', slug: 'sevres' },
      { name: 'Sceaux', slug: 'sceaux' },
      { name: 'Rueil-Malmaison', slug: 'rueil-malmaison' },
    ]
  }
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
            <p>La réussite de vos travaux dépend en grande partie du professionnel que vous choisissez. Un bon artisan peut transformer votre projet en succès, tandis qu'un mauvais choix peut mener à des retards, des surcoûts et du stress. Voici les 5 points clés à vérifier pour faire le bon choix.</p>
            
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
