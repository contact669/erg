import type { Service, Project, Testimonial, ProcessStep, NavItem, BlogPost } from './types';
import {
  Home,
  Bath,
  CookingPot,
  Building,
  Hammer,
  Paintbrush
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
];

export const blogPosts: BlogPost[] = [
  {
    slug: '10-astuces-renovation-appartement-parisien',
    title: '10 Astuces pour Réussir la Rénovation de votre Appartement Parisien',
    description: 'Découvrez nos conseils d’experts pour naviguer les défis uniques de la rénovation à Paris, de l’optimisation de l’espace à la gestion de la copropriété.',
    date: '2024-07-15',
    author: 'Aïssa AIT',
    featuredImageId: 'blog-post-1',
    tags: ['Rénovation', 'Appartement', 'Conseils'],
    content: (
      <div>
        <p>Rénover un appartement à Paris présente des défis uniques : espaces contraints, réglementations de copropriété strictes, et le charme de l'ancien à préserver. Chez ERG Rénovation, nous avons l'habitude de jongler avec ces contraintes pour créer des intérieurs modernes et fonctionnels. Voici nos 10 astuces clés pour garantir le succès de votre projet.</p>
        
        <h2>1. Optimisez chaque mètre carré</h2>
        <p>Dans les appartements parisiens, chaque centimètre compte. Pensez "verticalité" avec des rangements toute hauteur, et "multifonctionnalité" avec du mobilier modulable. Une verrière d'atelier peut délimiter un espace sans bloquer la lumière, une solution idéale pour créer un coin bureau ou une chambre d'appoint.</p>
        
        <h2>2. La lumière, votre meilleure alliée</h2>
        <p>Favorisez la lumière naturelle en décloisonnant lorsque c'est possible. Utilisez des couleurs claires sur les murs et des miroirs stratégiquement placés pour agrandir visuellement l'espace et réfléchir la lumière. Un bon plan d'éclairage artificiel, avec plusieurs sources (directes et indirectes), est également crucial.</p>
        
        <h2>3. Respectez l'âme du lieu</h2>
        <p>Parquet en point de Hongrie, moulures, cheminées en marbre... L'ancien a un charme fou. Plutôt que de tout cacher, restaurez et mettez en valeur ces éléments. Ils peuvent être magnifiquement contrastés avec des éléments de design contemporain pour un style "parisien chic" très recherché.</p>

        <h2>4. Anticipez les démarches de copropriété</h2>
        <p>Ne sous-estimez pas les délais administratifs. Toute modification des murs porteurs, des fenêtres ou des parties communes nécessite l'accord de la copropriété. Présentez un dossier solide, préparé par des professionnels, pour mettre toutes les chances de votre côté.</p>
        
        <h2>5. Isolez, isolez, isolez !</h2>
        <p>L'isolation phonique et thermique est un investissement essentiel pour le confort. Contre les bruits de la rue et des voisins, des solutions efficaces existent (doublage des murs, fenêtres à double vitrage performant). Une bonne isolation thermique vous fera également faire des économies d'énergie substantielles.</p>
        
        <h3>6. Pensez aux rangements intégrés</h3>
        <p>Les rangements sur-mesure sont la clé d'un intérieur parisien réussi. Ils s'adaptent aux recoins, optimisent les volumes et se fondent dans le décor pour une sensation d'espace et d'ordre.</p>
        
        <h3>7. Choisissez des matériaux durables et adaptés</h3>
        <p>Un parquet massif sera plus résistant et pourra être rénové plusieurs fois. Dans la salle de bain, privilégiez des matériaux résistants à l'humidité. Nos artisans sauront vous conseiller les meilleurs choix en fonction de votre budget et de votre style de vie.</p>
        
        <h3>8. Ne négligez pas l'entrée</h3>
        <p>L'entrée donne la première impression. Elle doit être à la fois fonctionnelle et accueillante. Pensez à un petit meuble, un miroir et un éclairage soigné pour créer une transition élégante vers le reste de l'appartement.</p>
        
        <h3>9. Un chef de projet unique pour votre tranquillité</h3>
        <p>Coordonner les différents corps de métier (plombier, électricien, peintre...) peut vite devenir un casse-tête. Faire appel à une entreprise de rénovation tous corps d'état comme ERG Rénovation vous garantit un interlocuteur unique et une gestion de projet fluide.</p>
        
        <h3>10. Définissez un budget réaliste et prévoyez une marge</h3>
        <p>Un projet de rénovation réserve souvent des surprises. Nous vous aidons à établir un devis détaillé, mais il est toujours prudent de prévoir une marge de 10 à 15% pour les imprévus. Cette précaution vous permettra de mener votre projet à terme en toute sérénité.</p>
        
        <p>Prêt à vous lancer ? <a href="/devis">Contactez-nous pour une étude personnalisée de votre projet.</a></p>
      </div>
    )
  },
  {
    slug: 'comment-choisir-bon-artisan-travaux',
    title: 'Comment Choisir le Bon Artisan pour vos Travaux ?',
    description: 'La réussite de vos travaux dépend grandement du choix de vos artisans. Voici les critères essentiels à vérifier avant de vous engager.',
    date: '2024-06-28',
    author: 'Aïssa AIT',
    featuredImageId: 'blog-post-2',
    tags: ['Conseils', 'Artisans', 'Qualité'],
    content: (
        <div>
            <p>Engager des travaux de rénovation est un investissement important. Le choix de l'artisan ou de l'entreprise qui les réalisera est sans doute la décision la plus cruciale pour la réussite de votre projet. Un mauvais choix peut entraîner des malfaçons, des retards et des surcoûts importants. Alors, comment s'assurer de faire le bon choix ?</p>

            <h2>1. Vérifiez les qualifications et les assurances</h2>
            <p>C'est le point de départ non négociable. Un professionnel sérieux doit pouvoir vous présenter :</p>
            <ul>
                <li><strong>Son immatriculation au Répertoire des Métiers ou au Registre du Commerce.</strong></li>
                <li><strong>Son assurance de responsabilité civile professionnelle (RC Pro) :</strong> elle couvre les dommages que l'artisan pourrait causer chez vous durant les travaux.</li>
                <li><strong>Son assurance décennale :</strong> obligatoire pour le gros œuvre et les travaux pouvant affecter la solidité du bâtiment, elle vous couvre pendant 10 ans contre les malfaçons.</li>
            </ul>
            <p>N'hésitez pas à demander les attestations et à vérifier leur validité auprès des assureurs.</p>

            <h2>2. Analysez la clarté et le détail du devis</h2>
            <p>Un devis ne doit pas être une simple ligne avec un total. Un devis professionnel est un document détaillé qui doit mentionner :</p>
            <ul>
                <li>Le décompte détaillé de chaque prestation (en quantité et en prix unitaire).</li>
                <li>Les matériaux utilisés (marque, modèle, caractéristiques).</li>
                <li>La date de début et la durée estimée des travaux.</li>
                <li>Les conditions de paiement.</li>
                <li>Le taux de TVA applicable.</li>
            </ul>
            <p>Méfiez-vous des devis trop flous ou anormalement bas. Comparez au moins 3 devis pour avoir une idée juste du marché.</p>

            <h2>3. Demandez à voir des réalisations précédentes</h2>
            <p>Les photos, c'est bien. Visiter un chantier récemment terminé (avec l'accord du propriétaire), c'est mieux ! Cela vous permet de juger concrètement de la qualité des finitions et du soin apporté par l'artisan. C'est également l'occasion de discuter avec d'anciens clients de leur expérience.</p>

            <h2>4. Fiez-vous au bouche-à-oreille et aux avis</h2>
            <p>La réputation d'un artisan est un excellent indicateur. Sollicitez votre entourage. Consultez également les avis en ligne sur des plateformes spécialisées, en gardant un esprit critique. Plusieurs avis positifs et détaillés sont souvent un bon signe.</p>

            <h2>5. Évaluez le contact et la communication</h2>
            <p>Dès les premiers échanges, vous devez vous sentir en confiance. L'artisan est-il à votre écoute ? Est-il force de proposition ? Prend-il le temps de répondre clairement à vos questions ? Une bonne communication est essentielle pour une collaboration sereine tout au long du chantier.</p>

            <p>Chez ERG Rénovation, nous cochons toutes ces cases. Nous avons bâti notre réputation sur la transparence, la qualité de nos réalisations et la satisfaction de nos clients. Nous vous accompagnons avec un interlocuteur unique qui pilote l'ensemble des artisans qualifiés nécessaires à votre projet.</p>
            <p>Pour un projet mené en toute confiance, <a href="/contact">discutons ensemble de vos envies.</a></p>
        </div>
    )
  }
];
