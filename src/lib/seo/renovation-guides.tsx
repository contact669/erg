import Link from 'next/link';
import type { BlogPost } from '@/lib/types';

export const renovationGuides: BlogPost[] = [
  {
    slug: 'budget-renovation-appartement-paris',
    title: 'Budget rénovation appartement à Paris : préparer un chiffrage fiable',
    description: 'Surface, état du logement, réseaux, matériaux et accès : les éléments à préciser pour obtenir un devis de rénovation d’appartement à Paris.',
    date: '2026-10-07', author: 'Équipe ERG Rénovation', featuredImageId: 'service-apartment',
    tags: ['Budget', 'Appartement', 'Paris'],
    relatedServiceSlugs: ['renovation-appartement', 'peinture-finitions'],
    relatedProjectSlugs: ['renovation-studio-paris-11', 'renovation-appartement-65m2-paris'],
    toc: [
      { id: 'definir-travaux', title: 'Définir le périmètre des travaux', level: 'h2' },
      { id: 'facteurs-budget', title: 'Ce qui fait varier le budget', level: 'h2' },
      { id: 'preparer-visite', title: 'Préparer la visite de chiffrage', level: 'h2' },
      { id: 'comparer-budget', title: 'Comparer les devis à périmètre égal', level: 'h2' },
    ],
    content: <>
      <p>Le coût d’une rénovation d’appartement à Paris dépend des travaux réellement nécessaires. Une surface de 45 m² peut correspondre à une remise en peinture, à une réfection des pièces techniques ou à une redistribution complète. Un prix au mètre carré ne permet pas, à lui seul, de comparer ces projets.</p>
      <p>Pour construire un budget utile, commencez par distinguer ce que vous conservez, ce que vous remplacez et ce qui doit être vérifié sur place. Le devis peut ensuite détailler chaque poste et les options de finition.</p>
      <h2 id="definir-travaux">Définir le périmètre des travaux</h2>
      <ul>
        <li><strong>Rafraîchissement :</strong> préparation des supports, peintures, revêtements de sol et finitions, en conservant l’organisation des pièces.</li>
        <li><strong>Rénovation complète :</strong> intervention sur plusieurs pièces, équipements de cuisine ou de salle de bain, réseaux et finitions.</li>
        <li><strong>Transformation des espaces :</strong> modification de cloisons, déplacement d’équipements et adaptation des réseaux. La faisabilité doit être étudiée avant le chiffrage définitif.</li>
      </ul>
      <p>Présentez vos priorités dans l’ordre : sécurité et état des équipements, confort, agencement, puis choix décoratifs. Cela permet de proposer des options plutôt que de retirer arbitrairement des prestations lorsque le budget est limité.</p>
      <h2 id="facteurs-budget">Ce qui fait varier le budget</h2>
      <p>L’état des murs et des sols, la conservation ou le remplacement des réseaux et le niveau d’équipement modifient le chiffrage. Une cuisine ou une salle de bain concentre davantage de postes techniques qu’une chambre de même surface.</p>
      <p>À Paris, l’étage, l’ascenseur, les possibilités de livraison et l’évacuation des gravats comptent aussi. Précisez si le logement restera occupé : la protection, le phasage et le maintien d’accès aux pièces peuvent changer l’organisation du chantier.</p>
      <p>Demandez de distinguer les fournitures, leur pose et les travaux préparatoires. Un parquet, par exemple, ne se résume pas au prix de ses lames : le support, les raccords, les plinthes et les finitions doivent être décrits.</p>
      <h2 id="preparer-visite">Préparer la visite de chiffrage</h2>
      <ul>
        <li>Un plan ou les dimensions des pièces et quelques photos de l’état actuel.</li>
        <li>La liste des éléments à conserver : parquet, moulures, portes, équipements.</li>
        <li>Les pièces concernées et les changements d’agencement souhaités.</li>
        <li>Les contraintes d’accès, d’occupation et de disponibilité du logement.</li>
        <li>Votre enveloppe cible et les choix de matériaux déjà arrêtés.</li>
      </ul>
      <p>Les points impossibles à vérifier lors de la visite doivent apparaître comme des hypothèses ou des réserves dans le devis. Prévoyez une marge adaptée aux incertitudes identifiées, plutôt qu’un pourcentage présenté comme universel.</p>
      <h2 id="comparer-budget">Comparer les devis à périmètre égal</h2>
      <p>Vérifiez les quantités, la préparation des supports, les références d’équipements, la protection et le nettoyage. Distinguez les postes inclus, les options et les exclusions. Notre guide pour <Link href="/blog/comparer-devis-renovation">comparer deux devis de rénovation</Link> vous aide à organiser cette lecture.</p>
      <p>Découvrez une <Link href="/realisations/renovation-studio-paris-11">rénovation de studio à Paris 11e</Link> et notre prestation de <Link href="/services/renovation-appartement">rénovation d’appartement</Link>. Pour votre propre logement, <Link href="/devis">préparez une demande de devis</Link> avec la surface, l’état actuel et vos priorités.</p>
    </>,
  },
  {
    slug: 'renovation-petite-salle-de-bain-budget',
    title: 'Rénover une salle de bain de 3 à 5 m² : budget et choix techniques',
    description: 'Préparez la rénovation d’une petite salle de bain : agencement, plomberie, ventilation, revêtements et postes à comparer dans votre devis.',
    date: '2026-10-07', author: 'Équipe ERG Rénovation', featuredImageId: 'service-bathroom',
    tags: ['Budget', 'Salle de bain', 'Guide'],
    relatedServiceSlugs: ['renovation-salle-de-bain'],
    relatedProjectSlugs: ['optimisation-salle-de-bain-3m2'],
    toc: [
      { id: 'petite-surface', title: 'Une petite surface ne suffit pas à prévoir le coût', level: 'h2' },
      { id: 'agencement-sdb', title: 'Conserver ou déplacer les équipements', level: 'h2' },
      { id: 'postes-sdb', title: 'Les postes à faire apparaître au devis', level: 'h2' },
      { id: 'preparer-sdb', title: 'Les informations à préparer', level: 'h2' },
    ],
    content: <>
      <p>Dans une salle de bain de 3 à 5 m², l’enjeu est de gagner en confort sans encombrer la pièce. Le budget dépend surtout de l’agencement, de l’état des réseaux, des travaux préparatoires et des équipements choisis. La surface seule ne donne pas une estimation fiable.</p>
      <h2 id="petite-surface">Une petite surface ne suffit pas à prévoir le coût</h2>
      <p>Une petite salle de bain rassemble plusieurs interventions : dépose, plomberie, électricité, ventilation, préparation des supports, protection contre l’eau, revêtements et installation des équipements. Réduire la surface ne supprime pas ces étapes.</p>
      <p>Comparez séparément les travaux techniques et les choix d’équipement. Vous pourrez alors ajuster un meuble, une robinetterie ou un revêtement sans confondre cette économie avec la suppression d’une préparation nécessaire.</p>
      <h2 id="agencement-sdb">Conserver ou déplacer les équipements</h2>
      <p>Conserver certains emplacements peut limiter les modifications de réseaux. Déplacer une douche, une vasque ou un lave-linge doit être étudié en fonction des arrivées d’eau, des évacuations et de l’espace disponible.</p>
      <p>Une douche à l’italienne n’est pas automatiquement adaptée à chaque logement. Les hauteurs disponibles et l’évacuation doivent être vérifiées. Un receveur peut constituer une autre solution à comparer lors de la visite.</p>
      <p>Prévoyez les usages quotidiens : ouverture des portes, dégagement devant le meuble, accès aux rangements et entretien. Avant de choisir les équipements, vérifiez leurs dimensions sur le plan.</p>
      <h2 id="postes-sdb">Les postes à faire apparaître au devis</h2>
      <ul>
        <li>Dépose des équipements et des revêtements, puis évacuation.</li>
        <li>Adaptation des arrivées d’eau et des évacuations.</li>
        <li>Travaux électriques et ventilation prévus après examen de l’existant.</li>
        <li>Préparation des supports et traitement des zones exposées à l’eau.</li>
        <li>Surfaces de carrelage, références, pose et finitions.</li>
        <li>Équipements avec leurs dimensions et accessoires inclus.</li>
        <li>Essais de fonctionnement, nettoyage et réception.</li>
      </ul>
      <h2 id="preparer-sdb">Les informations à préparer</h2>
      <p>Transmettez les dimensions, des photos, la position des équipements et vos besoins de rangement. Indiquez si c’est la seule salle de bain du logement et si vous y resterez pendant les travaux. Les coupures et les étapes doivent être discutées avant de fixer le planning.</p>
      <p>Voyez comment un agencement a été repensé dans notre <Link href="/realisations/optimisation-salle-de-bain-3m2">réalisation de salle de bain de 3 m²</Link>. Retrouvez notre service de <Link href="/services/renovation-salle-de-bain">rénovation de salle de bain</Link>, puis <Link href="/devis">décrivez votre projet</Link> pour un devis adapté à votre pièce.</p>
    </>,
  },
  {
    slug: 'comparer-devis-renovation',
    title: 'Comment comparer deux devis de rénovation poste par poste ?',
    description: 'Une méthode pour comparer vos devis de travaux : périmètre, quantités, fournitures, préparation, exclusions, options et organisation du chantier.',
    date: '2026-10-07', author: 'Équipe ERG Rénovation', featuredImageId: 'blog-post-2',
    tags: ['Devis', 'Budget', 'Conseils'],
    relatedServiceSlugs: ['renovation-appartement', 'renovation-salle-de-bain', 'renovation-cuisine', 'renovation-maison', 'peinture-finitions', 'amenagement-combles'],
    relatedProjectSlugs: [],
    toc: [
      { id: 'meme-perimetre', title: 'Comparer le même périmètre', level: 'h2' },
      { id: 'grille-devis', title: 'Une grille de lecture par poste', level: 'h2' },
      { id: 'questions-devis', title: 'Les questions à poser', level: 'h2' },
      { id: 'choisir-devis', title: 'Arbitrer avant de décider', level: 'h2' },
    ],
    content: <>
      <p>Deux montants différents ne signifient pas nécessairement que l’un des devis est trop cher. Ils peuvent prévoir des fournitures, des quantités ou des travaux préparatoires différents. La première étape consiste à comparer ce qui est réellement inclus.</p>
      <h2 id="meme-perimetre">Comparer le même périmètre</h2>
      <p>Établissez une liste commune des pièces et des travaux demandés. Pour chaque offre, repérez les prestations incluses, les options et les éléments laissés à votre charge. Vérifiez aussi que les totaux comparés sont présentés sur la même base, en distinguant les montants hors taxes et toutes taxes comprises.</p>
      <p>Ne comparez pas une ligne « peinture complète » à une autre sans connaître les surfaces, la préparation et la finition prévues. Cette règle s’applique aussi aux sols, aux réseaux et à la pose des équipements.</p>
      <h2 id="grille-devis">Une grille de lecture par poste</h2>
      <div className="overflow-x-auto">
        <table><thead><tr><th>Poste</th><th>Éléments à comparer</th></tr></thead><tbody>
          <tr><td>Préparation du chantier</td><td>Protection, accès, dépose et évacuation.</td></tr>
          <tr><td>Murs et sols</td><td>Quantités, état du support, préparation, matériaux et finition.</td></tr>
          <tr><td>Réseaux</td><td>Parties conservées, remplacées ou déplacées et essais prévus.</td></tr>
          <tr><td>Équipements</td><td>Références, dimensions, accessoires, fourniture et pose.</td></tr>
          <tr><td>Organisation</td><td>Phasage, interlocuteur, contraintes d’occupation et nettoyage.</td></tr>
          <tr><td>Options et exclusions</td><td>Prestations séparées, hypothèses et éléments non compris.</td></tr>
        </tbody></table>
      </div>
      <h2 id="questions-devis">Les questions à poser avant de choisir</h2>
      <ul>
        <li>Les quantités ont-elles été relevées lors d’une visite ?</li>
        <li>Quels éléments de l’existant sont conservés et dans quel état ?</li>
        <li>Quels matériaux sont précisément prévus ?</li>
        <li>Quelles incertitudes restent à examiner après dépose ?</li>
        <li>Comment seront discutés et chiffrés les changements demandés en cours de chantier ?</li>
        <li>Quelles sont les étapes du planning et les contraintes à lever avant le démarrage ?</li>
      </ul>
      <h2 id="choisir-devis">Arbitrer avant de décider</h2>
      <p>Demandez des précisions écrites pour les lignes ambiguës. Si votre budget cible est dépassé, faites distinguer les travaux nécessaires, les options de confort et les choix décoratifs. La comparaison devient plus utile lorsqu’elle porte sur des prestations identifiées.</p>
      <p>Consultez nos guides sur le <Link href="/blog/budget-renovation-appartement-paris">budget d’une rénovation d’appartement à Paris</Link> et la <Link href="/blog/renovation-petite-salle-de-bain-budget">rénovation d’une petite salle de bain</Link>. Vous pouvez aussi <Link href="/devis">préparer votre demande de devis ERG</Link> ou <Link href="/contact">poser une question sur votre projet</Link>.</p>
    </>,
  },
];
