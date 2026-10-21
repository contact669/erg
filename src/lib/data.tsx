

import type { Service, Project, Testimonial, ProcessStep, NavItem, BlogPost, LocalLandingPage, Area } from './types';
import { isPublishedService } from '@/lib/insurance-scope';
import localRedirects from '@/lib/seo/local-redirects.json';
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
import Link from 'next/link';
import { renovationGuides } from './seo/renovation-guides';
import { reviewedGuides } from './seo/reviewed-guides';
import { planningGuides } from './seo/planning-guides';

export const navItems: NavItem[] = [
  { title: 'Services', href: '/services' },
  { title: 'Réalisations', href: '/realisations' },
  { title: 'Zones', href: '/zones-intervention' },
  { title: 'À Propos', href: '/a-propos' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
];

// Every service, including those not published while their trades are not insured.
const allServices: Service[] = [
  {
    title: 'Rénovation d’appartement',
    slug: 'renovation-appartement',
    description: 'Transformation complète ou partielle de votre appartement.',
    icon: Building2,
    heroImageId: 'service-apartment',
    benefitImageId: 'service-pillar-kitchen',
    whyUsImageId: 'service-pillar-finish',
    longDescription: "Rénover un appartement commence par définir les pièces concernées, les installations à reprendre et les équipements à conserver. ERG Rénovation étudie avec vous les travaux d’électricité, de plomberie et de peinture intérieure, ainsi que la rénovation de la cuisine et de la salle de bain, à Paris et dans les départements 92, 93 et 94.",
    benefits: [
      {
        title: "Rénovation Complète d'Appartement",
        description: "Électricité, plomberie, peinture intérieure, cuisine et salle de bain : nous définissons les interventions nécessaires dans chaque pièce et leur ordre de réalisation."
      },
      {
        title: "Rénovation par Pièce",
        description: "Rénover une cuisine ou une salle de bain en conservant les autres pièces : nous examinons les raccordements, les équipements à remplacer et les finitions nécessaires autour de la zone de travaux."
      },
      {
        title: "Reprise des Installations Existantes",
        description: "Examen des points d’eau, des évacuations, des prises et des éclairages pour adapter la plomberie et l’électricité aux usages prévus dans le logement."
      },
      {
        title: "Rangements et Finitions Intérieures",
        description: "Préparation des murs, peintures, éclairage et électricité des rangements : nous coordonnons les finitions pour qu'elles s'intègrent à l'architecture de votre appartement."
      }
    ],
    process: [
        { step: 1, title: 'Consultation et Devis', description: 'Visite du logement à Paris, dans le 92, le 93 ou le 94, relevé des besoins et préparation d’un devis détaillé selon les travaux retenus.' },
        { step: 2, title: 'Conception et Planification', description: 'Validation des plans (si nécessaire avec architecte), choix des matériaux, établissement d\'un planning précis.' },
        { step: 3, title: 'Réalisation des Travaux', description: 'Pilotage de nos équipes qualifiées, réunions de chantier régulières, et un interlocuteur unique dédié à votre projet.' },
        { step: 4, title: 'Réception des Travaux', description: 'Vérification des travaux avec vous, consignation des éventuelles réserves et organisation de leur traitement.' }
    ],
    whyUs: [
        { title: "Un Projet Adapté à Votre Logement", description: "État des installations, pièces occupées, accès à l’étage et équipements conservés : ces informations sont examinées pour préparer les travaux et le devis.", icon: Award },
        { title: "Un Interlocuteur pour Organiser les Travaux", description: "Les interventions de plomberie, d’électricité et de peinture doivent s’enchaîner. Votre interlocuteur précise avec vous les étapes, les décisions à prendre et les changements éventuels de périmètre.", icon: Users },
        { title: 'Des Finitions Définies Ensemble', description: "Préparation des murs, teintes de peinture, appareillages et équipements : nous précisons les choix retenus et les fournitures comprises dans le devis.", icon: Sparkles },
        { title: 'Transparence et Garanties', description: "Nos travaux d'électricité, de plomberie et de peinture intérieure sont couverts par notre assurance décennale Allianz ; l'attestation est jointe au devis sur demande. Nos devis sont clairs et nos délais, tenus.", icon: ClipboardList }
    ],
    zones: {
        description: "Basée au cœur de la région, ERG Rénovation déploie ses équipes pour tous projets de rénovation d'appartement à Paris (75) et en Île-de-France. Cliquez sur votre département pour découvrir notre expertise locale :",
        list: [
            { name: 'Hauts-de-Seine (92)', slug: 'renovation-hauts-de-seine' },
            { name: 'Val-de-Marne (94)', slug: 'renovation-val-de-marne' },
            { name: 'Seine-Saint-Denis (93)', slug: 'renovation-seine-saint-denis' }
        ]
    },
    faq: [
        { question: "Quel est le prix moyen d'une rénovation d'appartement au m² à Paris ?", answer: "La surface ne suffit pas à chiffrer une rénovation. Le nombre de pièces concernées, les réseaux existants, l’état des supports, les fournitures et les accès font varier le montant. Lors de la visite, nous précisons les travaux souhaités pour établir un devis poste par poste, avec les options et les exclusions." },
        { question: "Combien de temps dure une rénovation complète ?", answer: "Le calendrier dépend des pièces concernées, des installations à reprendre, des temps de préparation et de séchage, ainsi que de la disponibilité des équipements. Nous précisons l’enchaînement des interventions après étude du logement et des travaux retenus. La surface seule ne permet pas de promettre une date de fin." },
        { question: "Peut-on rester dans l’appartement pendant les travaux ?", answer: "Des travaux dans quelques pièces peuvent parfois être organisés par zones. Une reprise générale des réseaux ou l’indisponibilité de la seule salle de bain rend le maintien dans le logement plus contraignant. Signalez dès le premier échange les pièces à garder accessibles et les périodes où vous pouvez libérer le logement." },
        { question: "Comment préparer un chantier en copropriété ?", answer: "Indiquez les règles de l’immeuble, les horaires d’intervention, les accès et les possibilités de livraison. Avant de valider un projet qui touche des éléments communs, précisez les démarches à examiner avec votre syndic. Ces contraintes doivent être connues avant d’arrêter le périmètre et le calendrier du chantier." },
        { question: "Possédez-vous la garantie décennale ?", answer: "Oui, c'est une obligation légale et notre plus grand gage de sérieux. Nous sommes assurés en responsabilité décennale (Allianz) pour l'électricité, la plomberie et la peinture intérieure : cette garantie couvre les dommages pouvant survenir dans les 10 ans suivant la réception. L'attestation est jointe au devis sur demande." }
    ],
    relatedProjectSlugs: ['renovation-appartement-65m2-paris', 'renovation-studio-paris-11']
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
        { title: 'Transparence et Garanties', description: "Nos travaux d'électricité, de plomberie et de peinture intérieure sont couverts par notre assurance décennale Allianz ; l'attestation est jointe au devis sur demande. Nos devis sont clairs et nos délais, tenus.", icon: ClipboardList }
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
    longDescription: "Une salle de bain difficile à utiliser, une baignoire à remplacer ou des équipements vieillissants : partez de ce que vous souhaitez améliorer. ERG Rénovation étudie la rénovation de votre salle de bain à Paris, dans les Hauts-de-Seine, en Seine-Saint-Denis et dans le Val-de-Marne. L’agencement, la plomberie, l’électricité, la ventilation et les supports sont examinés avant de définir les travaux et les fournitures du devis.",
    benefits: [
      {
        title: "Rénovation Complète (Plomberie, Électricité, Revêtements)",
        description: "Dépose, adaptation des réseaux, préparation des supports, revêtements et pose des équipements : le devis précise les postes retenus après examen de la pièce, ainsi que les éléments conservés."
      },
      {
        title: "Remplacement de Baignoire par une Douche",
        description: "La hauteur d’évacuation, la place disponible et l’état du sol déterminent les solutions possibles. Nous comparons avec vous l’implantation et le type de receveur avant de retenir un équipement."
      },
      {
        title: "Plomberie, Sanitaires et Faïence",
        description: "Remplacement des réseaux d'eau, pose des sanitaires, de la robinetterie et de la faïence murale, avec des finitions soignées."
      },
      {
        title: "Agencement d’une Petite Salle de Bain",
        description: "Dimensions du meuble vasque, ouverture de la douche, rangements et accès au lave-linge : chaque équipement doit trouver sa place sans gêner la circulation ni l’entretien."
      }
    ],
    process: [
        { step: 1, title: 'Visite et Étude de la Pièce', description: "Relevé des dimensions, échange sur les usages et examen des installations visibles. Les points qui restent à vérifier après dépose sont identifiés avant d’arrêter les travaux." },
        { step: 2, title: 'Choix des Matériaux & Devis', description: "Nous vous guidons dans le choix des robinetteries, sanitaires, carrelages et éclairages. Remise d'un devis transparent et détaillé." },
        { step: 3, title: 'Réalisation Pilotée', description: "Un interlocuteur unique gère le planning, coordonne les plombiers, les électriciens et les peintres, et protège vos espaces de vie pendant les travaux." },
        { step: 4, title: 'Réception et Garantie', description: "Nettoyage final, réception de chantier et procès-verbal signé, point de départ de la garantie décennale sur les travaux couverts." }
    ],
    whyUs: [
        { title: "Des Supports et Raccords Examinés", description: "Le choix des revêtements vient après l’examen des supports et du traitement des zones exposées à l’eau. Les préparations nécessaires doivent être identifiées dans le devis.", icon: ShieldCheck },
        { title: "Des Réseaux Adaptés au Projet", description: "Nous distinguons les installations conservées et celles à reprendre. Le nouvel agencement est étudié avec les arrivées d’eau, les évacuations, les équipements électriques et la ventilation.", icon: Wrench },
        { title: "Un Projet Étudié Avant la Pose", description: "Une douche de plain-pied ne convient pas à tous les sols. La solution retenue dépend notamment de la hauteur disponible et du raccordement à l’évacuation existante.", icon: Milestone }
    ],
    zones: {
      description: "Nous étudions les projets de salle de bain à Paris (75), dans les Hauts-de-Seine (92), en Seine-Saint-Denis (93) et dans le Val-de-Marne (94). Indiquez votre commune et les contraintes d’accès pour préparer la visite.",
      list: [
        { name: 'Paris 16e', slug: 'renovation-salle-de-bain/paris-16' },
        { name: 'Hauts-de-Seine (92)', slug: 'renovation-hauts-de-seine' }
      ]
    },
    faq: [
        { question: "Que faut-il préciser pour demander un devis de salle de bain ?", answer: "Indiquez les dimensions approximatives, les équipements à remplacer ou à conserver et vos priorités. Quelques photos et la position des points d’eau préparent l’échange. La visite permet de préciser la dépose, les supports, les réseaux, les fournitures et les exclusions du devis." },
        { question: "Combien de temps faut-il pour refaire une salle de bain ?", answer: "Le calendrier dépend de la dépose, des reprises de réseaux, de la préparation des supports, des temps de séchage et de la disponibilité des équipements. Si c’est votre seule salle de bain, signalez-le avant la planification afin d’examiner les périodes d’indisponibilité." },
        { question: "Peut-on remplacer une baignoire par une douche ?", answer: "C’est une possibilité à étudier sur place. La position de l’évacuation, la hauteur disponible, l’état du support et les dimensions utiles orientent le choix du receveur et des travaux. Une douche sans ressaut ne peut pas être confirmée sur une photo seule." },
        { question: "Comment rénover une petite salle de bain de 3 à 5 m² ?", answer: "Commencez par un relevé des dimensions et des ouvertures. Comparez ensuite la place des équipements, la circulation et les rangements. Conserver certains points d’eau peut limiter les modifications, mais le choix dépend aussi des évacuations et de la ventilation existantes." }
    ],
    relatedProjectSlugs: ['optimisation-salle-de-bain-3m2']
  },
  {
    title: 'Rénovation de cuisine',
    slug: 'renovation-cuisine',
    description: 'Rénovation de cuisine, adaptation des réseaux et finitions.',
    icon: UtensilsCrossed,
    heroImageId: 'service-kitchen',
    benefitImageId: 'project-kitchen-1',
    whyUsImageId: 'service-pillar-kitchen',
    longDescription: "Votre cuisine manque de rangements, les équipements vieillissent ou l’implantation ne convient plus à vos habitudes ? ERG Rénovation étudie les travaux à Paris et dans les départements 92, 93 et 94. Nous définissons les éléments à conserver ou à remplacer, les adaptations de plomberie et d’électricité et les finitions nécessaires. Le devis distingue les travaux, les fournitures et les équipements que vous apportez.",
    benefits: [
      {
        title: "Implantation et Équipements",
        description: "Dimensions des meubles, ouverture des portes et accès aux appareils : l’implantation est examinée avec les arrivées d’eau, les évacuations et les alimentations électriques existantes."
      },
      {
        title: "Plomberie, Électricité et Peinture",
        description: "Définir les raccordements à conserver ou à adapter, les besoins des appareils et les supports à reprendre avant la pose des meubles et la mise en peinture."
      },
      {
        title: "Réseaux de la Cuisine Ouverte",
        description: "Pour une cuisine déjà ouverte sur le séjour, les raccordements et les finitions sont étudiés avec l’usage de l’espace. Une modification de cloison ne fait pas partie d’une simple adaptation des réseaux."
      },
      {
        title: "Pose, Raccordements et Finitions",
        description: "Le périmètre de pose dépend des équipements retenus. Le devis précise les meubles, les raccordements, les reprises autour de la crédence et les fournitures comprises ou laissées à votre charge."
      }
    ],
    process: [
      { step: 1, title: 'Visite et Relevé des Besoins', description: "Dimensions, installations visibles, équipements conservés et usages souhaités : nous réunissons les éléments nécessaires à l’étude de votre cuisine." },
      { step: 2, title: 'Périmètre et Devis', description: "Définition des travaux préparatoires, des fournitures et des équipements, avec les options et les exclusions." },
      { step: 3, title: 'Préparation et Réseaux', description: "Dépose prévue au devis, adaptations de plomberie et d’électricité, puis préparation des supports selon les interventions retenues." },
      { step: 4, title: 'Pose et Réception', description: "Pose des équipements retenus, raccordements et finitions, puis vérification des travaux avec vous." }
    ],
    whyUs: [
        { title: "Des Choix Compatibles avec les Réseaux", description: "L’emplacement de l’évier et des appareils est étudié avant de confirmer les raccordements et les travaux nécessaires.", icon: Milestone },
        { title: "Des Fournitures Identifiées", description: "Les références, dimensions et responsabilités de fourniture doivent être connues avant la pose.", icon: Layers },
        { title: "Des Finitions Prévues dès le Devis", description: "Les reprises de murs, les raccords autour des meubles et la peinture sont à examiner avec les équipements remplacés.", icon: Sparkles }
    ],
    zones: {
        description: "Nous étudions la rénovation de cuisines à Paris (75), dans les Hauts-de-Seine (92), en Seine-Saint-Denis (93) et dans le Val-de-Marne (94).",
        list: "Précisez votre commune, l’étage et les contraintes de livraison lors de votre demande."
    },
    faq: [
      { question: "Peut-on rénover la cuisine en conservant certains meubles ?", answer: "Présentez les éléments à garder et leur état. Il faut examiner leur compatibilité avec les équipements remplacés, les raccordements et les reprises de finition. Une intervention partielle peut être étudiée sans prévoir automatiquement une cuisine entièrement neuve." },
      { question: "Combien de temps la cuisine restera-t-elle inutilisable ?", answer: "Cela dépend de la dépose, des réseaux à adapter, des supports et de la disponibilité des équipements. Les périodes sans évier ou sans appareils doivent être discutées avant de fixer les étapes, surtout si vous restez dans le logement." },
      { question: "Peut-on déplacer l’évier ou le lave-vaisselle ?", answer: "Le nouvel emplacement doit être étudié avec les alimentations et les évacuations existantes. Préparez un plan et les références des appareils ; la visite permettra de préciser les adaptations possibles." },
      { question: "Puis-je fournir mes meubles et mes appareils ?", answer: "Signalez-le dès la demande. Les dimensions, références et consignes d’installation permettent de définir la pose et les raccordements. Le devis précise les fournitures à votre charge, les prestations retenues et les éventuelles exclusions." }
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
    description: 'Préparation des supports et peinture intérieure de votre logement.',
    icon: Paintbrush,
    heroImageId: 'service-painting',
    benefitImageId: 'service-painting',
    whyUsImageId: 'service-pillar-finish',
    longDescription: "Murs marqués, plafonds à reprendre ou pièces à rafraîchir : ERG Rénovation étudie vos travaux de peinture intérieure à Paris et dans les départements 92, 93 et 94. L’état des supports, les surfaces concernées et l’occupation du logement déterminent les préparations et l’organisation. Le choix des teintes et des finitions vient compléter ce travail, avec un devis qui précise les prestations retenues.",
    benefits: [
      {
        title: "Préparation des Murs et Plafonds",
        description: "Examen des anciens revêtements et des défauts visibles pour définir nettoyage, reprises, enduits, ponçage et impression selon le support."
      },
      {
        title: "Peinture des Pièces de Vie",
        description: "Murs, plafonds et teintes sont définis ensemble. Les produits et finitions sont choisis selon le support, l’usage de la pièce et les conditions d’entretien."
      },
      {
        title: "Reprises après Travaux",
        description: "Après une intervention de plomberie ou d’électricité, les zones à reprendre et les raccords de finition sont identifiés pour définir les surfaces à traiter."
      },
      {
        title: "Portes, Plinthes et Moulures",
        description: "Les éléments concernés sont relevés séparément des murs et plafonds, avec les préparations et la finition prévues pour chaque support."
      }
    ],
    process: [
        { step: 1, title: 'Diagnostic et Conseil Couleur', description: "Analyse de la lumière, de l'état des supports et propositions de palettes de couleurs (ou de textures) adaptées à l'ambiance désirée." },
        { step: 2, title: 'Protection des Espaces', description: "Préparation des protections des sols, des meubles conservés et des éléments qui ne seront pas peints, selon le périmètre retenu." },
        { step: 3, title: 'Préparation du Support', description: "Réalisation des reprises, enduits et ponçages prévus après examen des supports." },
        { step: 4, title: 'Application et Réception', description: "Application des produits selon leurs conditions de mise en œuvre, respect des temps de séchage, puis vérification des travaux et nettoyage prévu." }
    ],
    whyUs: [
        { title: "Des Préparations Identifiées", description: "Les défauts visibles et les anciens revêtements sont examinés avant de définir les reprises nécessaires.", icon: Award },
        { title: "Des Finitions Définies Ensemble", description: "Teintes, aspect et conditions d’entretien sont discutés selon les pièces et les produits retenus.", icon: Sparkles },
        { title: "Une Organisation Adaptée au Logement", description: "Protections, déplacement des affaires et accès aux pièces sont précisés avec vous avant le démarrage.", icon: ClipboardList }
    ],
    zones: {
        description: "Nous étudions les travaux de peinture intérieure à Paris (75), dans les Hauts-de-Seine (92), en Seine-Saint-Denis (93) et dans le Val-de-Marne (94).",
        list: "Indiquez les pièces concernées et si le logement reste occupé pour préparer la visite."
    },
    faq: [
      { question: "Que doit préciser un devis de peinture intérieure ?", answer: "Les pièces, les surfaces, la préparation des supports, les produits et les finitions doivent être identifiés. Faites aussi préciser la protection des sols et des meubles, les exclusions et le nettoyage prévu." },
      { question: "Quelle finition choisir (Mat, Satin, Velours) ?", answer: "Le Mat Velouté, très tendance, offre un rendu poudré et chic, idéal pour les pièces à vivre. Le Satin est plus résistant et lessivable, parfait pour les cuisines, salles de bain et couloirs. Nous vous conseillons selon l'usage et la lumière de chaque pièce." },
      { question: "Peut-on rester dans le logement pendant les peintures ?", answer: "Une organisation par pièces peut être étudiée selon les surfaces et les préparations nécessaires. Précisez les espaces qui doivent rester accessibles et les meubles à déplacer. Les conditions de ventilation, de séchage et de remise en usage dépendent aussi des produits retenus." },
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
    metaTitle: 'Rénovation Appartement Neuilly-sur-Seine (92)',
    metaDescription: "Expert en rénovation d'appartements haut de gamme à Neuilly-sur-Seine. ERG Rénovation gère votre projet de A à Z : plans, travaux, finitions de luxe.",
    parentService: allServices.find(s => s.slug === 'renovation-appartement')!,
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
    slug: 'seine-saint-denis-93',
    type: 'department',
    title: "Rénovation d'Appartement et de Lofts à Fort Potentiel dans le 93",
    metaTitle: 'Rénovation Appartement & Loft Seine-Saint-Denis (93) | Expertise Luxe | ERG',
    metaDescription: 'Spécialiste de la rénovation d\'appartements et lofts à fort potentiel dans le 93 (Saint-Ouen, Montreuil). Création d\'espaces modernes et finitions haut de gamme.',
    parentService: allServices.find(s => s.slug === 'renovation-appartement')!,
    introduction: 'La Seine-Saint-Denis est un territoire de transformation, offrant des opportunités uniques de créer des espaces de vie modernes, des lofts spacieux et des appartements au standing élevé. ERG Rénovation est votre expert pour capitaliser sur ce potentiel immobilier en gérant les projets les plus ambitieux. Nous excellons dans la rénovation complète et la réhabilitation, apportant la rigueur et les finitions du luxe parisien dans le 93.',
    cta: {
      primary: 'Valoriser mon bien immobilier dans le 93',
      secondary: 'Voir nos projets de lofts à Saint-Ouen',
    },
    reassurancePoints: [
      'Expertise en transformation d\'espaces (Lofts, ateliers).',
      'Remise aux normes de l\'électricité et de la plomberie.',
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
                    <p className="text-muted-foreground">Spécialiste de la transformation d'anciennes surfaces industrielles en lofts. Traitement des murs bruts, peintures et gestion des réseaux électriques et de plomberie.</p>
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
    parentService: allServices.find(s => s.slug === 'renovation-appartement')!,
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
    parentService: allServices.find(s => s.slug === 'renovation-appartement')!,
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
                  <p className="text-muted-foreground">Création d'espaces de vie fluides et lumineux, avec la reprise de l'électricité, de la plomberie et des peintures autour de cuisines haut de gamme adaptées à la vie moderne.</p>
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
    title: "Rénovation d'Appartement à Saint-Cloud (92210)",
    metaTitle: "Rénovation Appartement Saint-Cloud (92210) | ERG",
    metaDescription: "Rénovation intérieure à Saint-Cloud : électricité, plomberie et peinture. Préparez votre chantier en appartement et demandez un devis détaillé à ERG.",
    parentService: allServices.find(s => s.slug === 'renovation-appartement')!,
    introduction: "Vous préparez des travaux dans un appartement à Saint-Cloud ? ERG Rénovation propose des interventions d'électricité, de plomberie et de peinture intérieure. Le projet se définit à partir de l'état du logement, des équipements à conserver et des pièces concernées. Une visite permet de préciser le périmètre avant de proposer un devis et un calendrier.",
    cta: {
      primary: 'Demander un devis à Saint-Cloud',
      secondary: 'Consulter nos réalisations',
    },
    reassurancePoints: [
      'Électricité, plomberie et peinture intérieure.',
      'Périmètre et fournitures précisés dans le devis.',
      'Accès et occupation du logement étudiés avant les travaux.',
    ],
    mainContent: (
      <>
        <h2 id="travaux-saint-cloud">Quels travaux prévoir dans votre appartement ?</h2>
        <p>Une rénovation intérieure peut concerner une pièce ou plusieurs postes techniques. Pour préparer une demande à Saint-Cloud, indiquez les surfaces, les défauts visibles et les changements souhaités. Des photos et un plan simple aident à préparer la visite ; ils ne remplacent pas l'examen des supports et des installations sur place.</p>
        <h3>Électricité : partir des usages du logement</h3>
        <p>Listez les appareils à alimenter, les prises à ajouter et les éclairages souhaités. Précisez les équipements que vous conservez et les pièces dont vous changez l'usage. Le périmètre des travaux électriques doit tenir compte de l'installation existante et être décrit dans le devis.</p>
        <h3>Plomberie : identifier les raccordements concernés</h3>
        <p>Pour une cuisine ou une salle de bain, distinguez le remplacement d'un équipement et son déplacement. Les arrivées d'eau, les évacuations et leur accessibilité influencent les interventions. Signalez les fuites ou défauts observés pour orienter les points à examiner lors de la visite.</p>
        <h3>Peinture : préciser la préparation des supports</h3>
        <p>La finition dépend aussi des travaux préparatoires : protection, nettoyage, rebouchage et reprises éventuelles. Faites préciser les surfaces traitées et les fournitures retenues. Une trace d'humidité nécessite d'en rechercher la cause avant de prévoir une simple remise en peinture.</p>
        <h2 id="organisation-saint-cloud">Organiser le chantier dans une copropriété à Saint-Cloud</h2>
        <p>Indiquez l'étage, les dimensions des accès, les conditions d'utilisation de l'ascenseur et les possibilités de livraison. Rapprochez-vous du syndic pour connaître les horaires et les protections attendues dans les parties communes. Les interventions touchant des éléments collectifs ou la structure nécessitent des démarches spécifiques ; ERG ne propose pas de travaux structurels.</p>
        <p>Si le logement reste occupé, identifiez les pièces indispensables au quotidien et discutez des coupures d'eau ou d'électricité. Le planning doit tenir compte de ces contraintes, des livraisons et des temps de séchage. Les conditions d'occupation se définissent avant le démarrage.</p>
        <h2 id="devis-saint-cloud">Comparer des devis sur le même périmètre</h2>
        <p>Le devis doit détailler les interventions, les fournitures, les options et les exclusions. La surface seule ne suffit pas à comparer les budgets : la préparation des supports et l'état des réseaux font varier les besoins. Retrouvez notre <a href="/blog/comparer-devis-renovation">guide pour comparer les devis de rénovation</a> et les prestations de <a href="/services/renovation-appartement">rénovation d'appartement</a>.</p>
        <p>Pour situer votre demande dans notre zone d'intervention, consultez la page <a href="/renovation-hauts-de-seine">rénovation dans les Hauts-de-Seine</a>. Nos <a href="/realisations">réalisations</a> illustrent des choix de travaux et de finitions ; elles ne constituent pas des références de chantiers à Saint-Cloud sans localisation explicite.</p>
      </>
    ),
  },
  {
    slug: 'garches',
    type: 'city',
    title: "Rénovation d'Appartement à Garches : Le Luxe du Calme et de l'Espace",
    metaTitle: "Rénovation Appartement Garches (92) | Calme & Standing",
    metaDescription: "Expert en rénovation d'appartements familiaux et de standing à Garches. Confort acoustique, design élégant et gestion de projet clé en main (92380).",
    parentService: allServices.find(s => s.slug === 'renovation-appartement')!,
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
    parentService: allServices.find(s => s.slug === 'renovation-appartement')!,
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
    parentService: allServices.find(s => s.slug === 'renovation-appartement')!,
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
    parentService: allServices.find(s => s.slug === 'renovation-appartement')!,
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
    metaTitle: "Rénovation Appartement Le Perreux-sur-Marne (94)",
    metaDescription: "Expert en rénovation d'appartements au Perreux-sur-Marne. Agencement, finitions de qualité et respect des délais pour votre projet dans le 94170. Devis.",
    parentService: allServices.find(s => s.slug === 'renovation-appartement')!,
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
    metaTitle: "Rénovation Maison & Appartement Saint-Maur (94)",
    metaDescription: "Votre expert en rénovation de maisons et appartements à Saint-Maur-des-Fossés. Gestion de projets A à Z pour un résultat haut de gamme. Devis sur mesure.",
    parentService: allServices.find(s => s.slug === 'renovation-appartement')!,
    introduction: "Saint-Maur-des-Fossés, avec son cadre de vie exceptionnel et son parc immobilier de grande qualité, est un lieu où la rénovation prend tout son sens. ERG Rénovation est le spécialiste des projets d'envergure à Saint-Maur, qu'il s'agisse de la rénovation d'une maison de maître, de la modernisation d'un appartement de standing ou de l'agrandissement d'un pavillon. Nous apportons une expertise technique et un sens du détail irréprochables.",
    cta: {
      primary: 'Mon projet de rénovation à Saint-Maur',
      secondary: 'Voir nos rénovations de maisons',
    },
    reassurancePoints: [
      'Expertise des maisons et grands volumes.',
      'Électricité, plomberie et peinture intérieure.',
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
        parentService: allServices.find(s => s.slug === 'renovation-maison')!,
        introduction: "Rénover une maison à Versailles, c'est toucher à l'histoire. ERG Rénovation est votre partenaire pour valoriser ce patrimoine unique, qu'il s'agisse d'une maison de ville, d'une demeure bourgeoise ou d'un pavillon. Nous maîtrisons les contraintes des secteurs sauvegardés et travaillons en respectant l'âme de votre bien.",
        cta: {
            primary: 'Mon projet de rénovation à Versailles',
            secondary: 'Voir nos réalisations dans les Yvelines',
        },
        reassurancePoints: [
            'Expertise des bâtisses anciennes.',
            'Respect du patrimoine architectural.',
            'Électricité, plomberie et peinture intérieure.',
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
        title: 'Rénovation de salle de bain à Paris 16 (75016)',
        metaTitle: 'Rénovation salle de bain Paris 16 (75016) : devis gratuit',
        metaDescription: "Salle de bain à rénover à Paris 16 (75016) ? Douche, agencement, plomberie et finitions : ERG Rénovation établit un devis détaillé après étude de votre pièce.",
        parentService: allServices.find(s => s.slug === 'renovation-salle-de-bain')!,
        introduction: "Une salle de bain à rénover dans le 75016 ? ERG Rénovation vous accompagne pour définir l’agencement, vérifier les réseaux existants et choisir des finitions adaptées à votre usage. Le devis distingue les travaux, les équipements et les options retenues après étude de votre pièce.",
        cta: { primary: 'Demander mon devis à Paris 16', secondary: 'Voir les prestations salle de bain' },
        reassurancePoints: ['Devis détaillé poste par poste.', 'Étude des réseaux et de la ventilation.', 'Choix des équipements selon votre pièce.'],
        mainContent: (
            <div className="space-y-8">
                <section className="space-y-3">
                    <h2 className="font-headline text-2xl font-semibold">Préparer une rénovation de salle de bain dans le 75016</h2>
                    <p>Avant de choisir une douche ou un meuble vasque, il faut relever les dimensions, les arrivées d’eau, les évacuations et le système de ventilation. À Paris 16, comme dans les autres arrondissements, les contraintes dépendent du bâtiment et de la pièce. Une visite permet de vérifier ce qui peut être conservé et ce qui doit être repris.</p>
                    <p>Si votre logement est en copropriété, les interventions sur les parties communes, les colonnes ou les planchers doivent être examinées avec le syndic avant les travaux concernés. Les horaires, la protection des circulations et l’accès au logement sont également à prévoir dans l’organisation du chantier.</p>
                </section>
                <section className="space-y-3">
                    <h2 className="font-headline text-2xl font-semibold">Douche, baignoire et rangement : choisir selon l’existant</h2>
                    <p>Remplacer une baignoire par une douche ne consiste pas seulement à changer un équipement. La hauteur disponible pour l’évacuation, l’accès aux raccordements et le traitement de l’étanchéité déterminent les solutions possibles. Une douche de plain-pied doit être étudiée sur place avant d’être promise.</p>
                    <p>Dans une petite salle de bain, la profondeur du meuble, le débattement de la porte et les passages comptent autant que le choix du carrelage. Nous examinons les priorités avec vous : facilité d’entretien, rangements, accès à la douche et confort quotidien.</p>
                </section>
                <section className="space-y-3">
                    <h2 className="font-headline text-2xl font-semibold">Que doit préciser votre devis de salle de bain ?</h2>
                    <p>Le chiffrage doit distinguer la dépose, la préparation des supports, la plomberie, l’électricité, la ventilation, l’étanchéité et les revêtements. Les équipements fournis, leurs références lorsqu’elles sont arrêtées, les options et les exclusions doivent être lisibles. Le calendrier est établi selon les travaux retenus et la disponibilité des fournitures.</p>
                    <p>Pour préparer le premier échange, indiquez la surface approximative, les équipements à remplacer, l’état actuel de la pièce et si le logement sera occupé pendant le chantier. Des photos et un plan, même simple, facilitent la compréhension du projet. Une estimation à distance reste à confirmer après vérification de l’existant.</p>
                </section>
                <section id="budget-salle-de-bain" className="scroll-mt-32 space-y-3">
                    <h2 className="font-headline text-2xl font-semibold">Quel budget prévoir pour votre salle de bain à Paris 16 ?</h2>
                    <p>Deux pièces de même surface peuvent demander des travaux très différents. Conserver la douche et les arrivées d’eau à leur place n’a pas le même coût que déplacer les équipements et reprendre les réseaux. L’état des supports après dépose, le système de ventilation et le choix des fournitures pèsent aussi dans le devis.</p>
                    <ul>
                        <li><strong>L’existant :</strong> revêtements à retirer, supports à réparer, raccordements à conserver ou à reprendre.</li>
                        <li><strong>L’aménagement :</strong> douche ou baignoire, emplacement du WC, rangements et circulation dans la pièce.</li>
                        <li><strong>Les équipements :</strong> références de robinetterie, meuble vasque, paroi et formats de carrelage.</li>
                        <li><strong>L’organisation :</strong> accès à l’étage, manutention, évacuation des déchets et maintien de l’usage du logement.</li>
                    </ul>
                    <p>Pour comparer les offres, demandez le même périmètre de travaux à chaque entreprise. Une ligne « rénovation complète » sans détail ne permet pas de savoir si la dépose, l’étanchéité ou les fournitures sont comprises. Nous préparons le chiffrage à partir de votre projet, sans tarif forfaitaire déduit de la seule surface.</p>
                </section>
                <section id="questions-salle-de-bain" className="scroll-mt-32 space-y-3">
                    <h2 className="font-headline text-2xl font-semibold">Vos questions avant de lancer les travaux</h2>
                    <details className="rounded-lg border px-4">
                        <summary className="cursor-pointer py-4 font-semibold">Peut-on rester dans l’appartement pendant la rénovation ?</summary>
                        <p className="pb-4">Cela dépend notamment de la présence d’un autre point d’eau et d’un autre WC. Si votre salle de bain est la seule du logement, il faut anticiper sa période d’indisponibilité. Indiquez dès le premier échange si vous habitez sur place : l’accès à la pièce, les coupures d’eau et la protection des espaces de passage devront être organisés avec vous.</p>
                    </details>
                    <details className="rounded-lg border px-4">
                        <summary className="cursor-pointer py-4 font-semibold">Combien de temps faut-il prévoir pour le chantier ?</summary>
                        <p className="pb-4">Le planning dépend de la dépose, des reprises de plomberie et d’électricité, de la préparation des supports et des temps de séchage. Les fournitures doivent également être disponibles au bon moment. Nous précisons le calendrier après étude des travaux retenus ; une date de fin ne peut pas être déduite uniquement du nombre de mètres carrés.</p>
                    </details>
                    <details className="rounded-lg border px-4">
                        <summary className="cursor-pointer py-4 font-semibold">Une douche de plain-pied est-elle toujours possible ?</summary>
                        <p className="pb-4">Non. Il faut vérifier la hauteur disponible, la pente d’évacuation et les possibilités de raccordement. Une solution avec receveur peut être plus adaptée lorsque l’existant ne permet pas d’encastrer l’évacuation. Le choix se fait après examen de la pièce, avant de commander les équipements.</p>
                    </details>
                    <details className="rounded-lg border px-4">
                        <summary className="cursor-pointer py-4 font-semibold">Quelles informations transmettre pour demander un devis ?</summary>
                        <p className="pb-4">Indiquez le code postal 75016, la surface approximative, les équipements à conserver ou à remplacer et si le logement sera occupé. Précisez aussi l’étage, l’accès par ascenseur et vos disponibilités. Au premier échange, nous pourrons vous indiquer les photos ou mesures utiles pour compléter l’étude.</p>
                    </details>
                    <p><Link className="underline" href="/devis?projet=salle-de-bain&page=%2Frenovation-salle-de-bain%2Fparis-16#demande-devis">Décrire ma salle de bain et demander un devis</Link></p>
                </section>
                <section className="space-y-3">
                    <h2 className="font-headline text-2xl font-semibold">Des exemples et des guides pour préparer votre projet</h2>
                    <p>Découvrez notre <Link className="underline" href="/realisations/optimisation-salle-de-bain-3m2">réalisation d’une petite salle de bain parisienne</Link> pour examiner les possibilités d’agencement. Cet exemple illustre notre travail sans être présenté comme un chantier situé dans le 16e.</p>
                    <p>Nos guides expliquent <Link className="underline" href="/blog/renovation-petite-salle-de-bain-budget">comment préparer le budget d’une petite salle de bain</Link> et <Link className="underline" href="/blog/comparer-devis-renovation">comment comparer des devis de rénovation</Link>. Pour l’ensemble des prestations, consultez notre <Link className="underline" href="/services/renovation-salle-de-bain">service de rénovation de salle de bain</Link>.</p>
                    <p>Si votre projet concerne aussi d’autres pièces, consultez la <Link className="underline" href="/renovation-paris/paris-16">rénovation d’appartement à Paris 16</Link> pour préparer une demande portant sur l’ensemble du logement.</p>
                </section>
            </div>
        ),
    },
];

/** Published services: those whose trades are covered by the décennale (see src/lib/insurance-scope.json). */
export const services: Service[] = allServices.filter((service) => isPublishedService(service.slug));

export const localLandingPages: LocalLandingPage[] = [
    ...renovationAppartementPages,
    ...renovationMaisonPages,
    ...renovationSalleDeBainPages,
].filter((page) => isPublishedService(page.parentService.slug) &&
    !Object.prototype.hasOwnProperty.call(localRedirects, `/${page.parentService.slug}/${page.slug}`));

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
    title: 'Rénovation d’une petite salle de bain à Paris',
    slug: 'optimisation-salle-de-bain-3m2',
    category: 'Salle de bain',
    images: { before: 'project-small-bathroom-before', after: 'project-small-bathroom-after', beforeLabel: 'Pendant les travaux' },
    photoCredit: { label: 'Photos publiées par Nina G. dans son avis Google — visite en août 2023', url: 'https://www.google.com/maps/contrib/116585932930128271372/reviews' },
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
        { title: "Rénovation intérieure", icon: Layers },
        { title: "Cuisine et Salle de Bain", icon: UtensilsCrossed },
        { title: "Mise aux normes électrique", icon: Wrench },
        { title: "Suivi de chantier rigoureux", icon: ClipboardList }
      ]
    }
  },
  {
    title: 'Rénovation d’une petite salle de bain à Paris',
    slug: 'optimisation-salle-de-bain-3m2',
    category: 'Salle de bain',
    images: { before: 'project-small-bathroom-before', after: 'project-small-bathroom-after', beforeLabel: 'Pendant les travaux' },
    photoCredit: { label: 'Photos publiées par Nina G. dans son avis Google — visite en août 2023', url: 'https://www.google.com/maps/contrib/116585932930128271372/reviews' },
    description: 'Transformation complète d\'une petite salle de bain parisienne. Le déplacement d\'une cloison a permis d\'optimiser l\'espace pour un résultat spacieux et moderne.',
    testimonial: {
      quote: "L'entreprise a été réactive, totalement à notre écoute et aussi force de proposition avec d’excellents conseils. Ces derniers nous ont permis d’optimiser notre espace et de bénéficier d’une salle de bain spacieuse et agréable.",
      author: "Nina G., Paris"
    },
    details: {
      challenge: <>
          <p>Nina G. souhaitait rénover sa petite salle de bain parisienne et optimiser son espace. Son avis Google décrit une rénovation complète avec le déplacement d’une cloison. Les photos qu’elle a publiées montrent la pièce pendant les travaux puis après la rénovation.</p>
      </>,
      solution: <>
          <p>La cliente confirme des travaux d’électricité, de peinture et de sol, ainsi que des conseils pour améliorer l’agencement. Elle souligne la qualité du travail, le soin apporté aux finitions et le respect des délais.</p>
          <p>Sur la photo du résultat, on distingue une douche avec paroi vitrée, des revêtements clairs à effet marbre, un meuble vasque et un miroir éclairé. La fenêtre apporte de la lumière naturelle à la pièce.</p>
          <p>Pour votre projet, consultez notre <Link className="underline" href="/services/renovation-salle-de-bain">service de rénovation de salle de bain</Link> ou <Link className="underline" href="/devis">demandez un devis après étude de votre logement</Link>.</p>
      </>,
      keyPoints: [
        { title: "Optimisation de l’agencement", icon: Scaling },
        { title: "Électricité, peinture et sol", icon: Wrench },
        { title: "Conseils et écoute", icon: Lightbulb },
        { title: "Photos partagées par la cliente", icon: Sparkles }
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
              <li><strong>Coordination du chantier :</strong> Plomberie, électricité et peinture pour une exécution fluide.</li>
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
    title: 'Rénovation de studio pour un projet locatif',
    slug: 'studio-optimise-marais',
    category: 'Studio',
    images: { before: 'project-studio-1-before', after: 'project-studio-1' },
    description: 'Rénovation intérieure d\'un studio destiné à la location : électricité, plomberie, kitchenette, salle d\'eau et peinture.',
    testimonial: {
      quote: "Studio entièrement rénové. Beau travail réalisé par l'entreprise ERG. M. AIT donne de bons conseils. Les délais sont respectés. Travaux de qualité. Je recommande sans hésiter la société ERG.",
      author: "t planchard"
    },
    details: {
      challenge: <>
          <p>L'objectif était de réaliser la rénovation complète d'un studio destiné à un investissement locatif. Le projet exigeait de maximiser l'attrait et la fonctionnalité du bien pour de futurs locataires, tout en maîtrisant le budget et en respectant des délais stricts pour limiter la vacance locative.</p>
      </>,
      solution: <>
          <p>Le projet associe la reprise des installations et les finitions intérieures :</p>
          <ul>
              <li><strong>Conseils stratégiques :</strong> Propositions d'aménagements et de matériaux optimisant le rapport qualité/prix et facilitant l'entretien.</li>
              <li><strong>Rénovation intégrale :</strong> Remise à neuf de l'électricité, de la plomberie, de la salle d'eau et de la kitchenette pour garantir la sécurité et le confort.</li>
              <li><strong>Peinture intérieure :</strong> Application de peintures neutres pour créer un espace lumineux et accueillant.</li>
              <li><strong>Respect du planning :</strong> La coordination efficace de nos équipes a permis de livrer le chantier dans les délais impartis.</li>
          </ul>
          <p>Pour préparer un projet similaire, consultez notre <a href="/blog/budget-renovation-appartement-paris">guide du budget de rénovation d'appartement</a> et les prestations de <a href="/services/renovation-appartement">rénovation d'appartement</a>. Le devis de votre logement dépend de son état et du périmètre des travaux retenus.</p>
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
        { title: "Rénovation intérieure", icon: Layers },
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
              <li><strong>Gestion de projet complète :</strong> Coordination du chantier, des réseaux aux finitions.</li>
              <li><strong>Rénovation intérieure :</strong> Intervention sur l'électricité, la plomberie, les murs et les plafonds.</li>
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
        description: 'Présentez-nous les pièces à rénover, vos priorités et les contraintes du logement. Nous convenons ensemble des informations et de la visite nécessaires au chiffrage.'
    },
    {
        step: 2,
        title: 'Conception & Planification',
        description: 'Nous précisons les prestations, les fournitures et les options dans le devis, puis organisons les étapes des travaux avec vous.'
    },
    {
        step: 3,
        title: 'Réalisation des Travaux',
        description: 'Nos artisans qualifiés réalisent les travaux avec des matériaux de qualité, dans le respect des délais.'
    },
    {
        step: 4,
        title: 'Livraison & Garantie',
        description: 'Nous vous livrons un chantier impeccable et la garantie décennale s\'applique aux travaux couverts par notre assurance.'
    }
];

export const blogPosts: BlogPost[] = [
  ...renovationGuides,
  ...reviewedGuides,
  ...planningGuides,
];

export const AREAS: Area[] = [
  {
    label: "Paris",
    code: "75",
    href: "/renovation-paris",
    description: "Tous arrondissements : rénovation intérieure, salle de bain, cuisine, rénovation complète.",
    cities: Array.from({ length: 20 }, (_, i) => {
      const n = i + 1;
      return { name: n === 1 ? "Paris 1er" : `Paris ${n}e`, code: `750${n < 10 ? '0' + n : n}`, href: `/renovation-paris/paris-${n}` };
    }),
  },
  {
    label: "Hauts-de-Seine",
    code: "92",
    href: "/renovation-hauts-de-seine",
    description: "Boulogne, Neuilly, Levallois, Courbevoie, Asnières, Colombes, Nanterre, Rueil…",
    cities: [
      { name: "Boulogne-Billancourt", code: "92100", href: "/renovation-boulogne-billancourt" },
      { name: "Neuilly-sur-Seine", code: "92200", href: "/renovation-neuilly-sur-seine" },
      { name: "Levallois-Perret", code: "92300", href: "/renovation-levallois-perret" },
      { name: "Courbevoie", code: "92400", href: "/renovation-courbevoie" },
      { name: "Rueil-Malmaison", code: "92500", href: "/renovation-rueil-malmaison" },
      { name: "Asnières-sur-Seine", code: "92600", href: "/renovation-asnieres-sur-seine" },
      { name: "Colombes", code: "92700", href: "/renovation-colombes" },
      { name: "Issy-les-Moulineaux", code: "92130", href: "/renovation-issy-les-moulineaux" },
      { name: "Suresnes", code: "92150", href: "/renovation-suresnes" },
      { name: "Clichy", code: "92110", href: "/renovation-clichy" },
      { name: "Nanterre", code: "92000", href: "/renovation-nanterre" },
    ],
  },
  {
    label: "Seine-Saint-Denis",
    code: "93",
    href: "/renovation-seine-saint-denis",
    description: "Montreuil, Pantin, Saint-Denis, Saint-Ouen, Les Lilas, Aubervilliers, Le Raincy…",
    cities: [
      { name: "Montreuil", code: "93100", href: "/renovation-montreuil" },
      { name: "Pantin", code: "93500", href: "/renovation-pantin" },
      { name: "Saint-Denis", code: "93000", href: "/renovation-saint-denis" },
      { name: "Saint-Ouen", code: "93400", href: "/renovation-saint-ouen" },
      { name: "Les Lilas", code: "93260", href: "/renovation-les-lilas" },
      { name: "Aubervilliers", code: "93300", href: "/renovation-aubervilliers" },
      { name: "Le Raincy", code: "93340", href: "/renovation-le-raincy" },
    ],
  },
  {
    label: "Val-de-Marne",
    code: "94",
    href: "/renovation-val-de-marne",
    description: "Vincennes, Saint-Mandé, Nogent, Le Perreux, Saint-Maur, Créteil, Maisons-Alfort, Ivry…",
    cities: [
      { name: "Vincennes", code: "94300", href: "/renovation-vincennes" },
      { name: "Saint-Mandé", code: "94160", href: "/renovation-saint-mande" },
      { name: "Nogent-sur-Marne", code: "94130", href: "/renovation-nogent-sur-marne" },
      { name: "Le Perreux-sur-Marne", code: "94170", href: "/renovation-le-perreux-sur-marne" },
      { name: "Saint-Maur-des-Fossés", code: "94100", href: "/renovation-saint-maur-des-fosses" },
      { name: "Créteil", code: "94000", href: "/renovation-creteil" },
      { name: "Maisons-Alfort", code: "94700", href: "/renovation-maisons-alfort" },
      { name: "Ivry-sur-Seine", code: "94200", href: "/renovation-ivry-sur-seine" },
    ],
  },
];
