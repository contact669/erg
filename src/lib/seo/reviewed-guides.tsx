import Link from 'next/link';
import type { BlogPost } from '@/lib/types';
import { quoteHrefForService } from '@/lib/quote-project';

export const reviewedGuides: BlogPost[] = [
  {
    slug: 'renovation-energetique-paris-guide-complet',
    title: 'Rénovation énergétique et travaux intérieurs à Paris : coordonner votre projet',
    description: 'Distinguez étude énergétique et travaux intérieurs : questions à préparer sur les réseaux, les finitions et la coordination dans votre appartement parisien.',
    date: '2025-11-15', updatedDate: '2026-10-21', author: 'Équipe ERG Rénovation',
    featuredImageId: 'blog-post-1', tags: ['Appartement', 'Organisation', 'Rénovation énergétique'],
    relatedServiceSlugs: ['renovation-appartement'],
    toc: [
      { id: 'pourquoi-renover-energetiquement', title: 'Distinguer les objectifs du projet', level: 'h2' },
      { id: 'specificites-parisiennes', title: 'Réunir les informations sur l’appartement et l’immeuble', level: 'h2' },
      { id: 'etape-1-diagnostic', title: 'Commencer par une étude adaptée', level: 'h2' },
      { id: 'etape-2-isoler', title: 'Anticiper les effets d’une isolation sur l’intérieur', level: 'h2' },
      { id: 'etape-3-fenetres', title: 'Prévoir les raccords autour des fenêtres', level: 'h2' },
      { id: 'etape-4-chauffage', title: 'Identifier les équipements et les réseaux concernés', level: 'h2' },
      { id: 'etape-5-ventilation', title: 'Examiner la ventilation dans l’ensemble du projet', level: 'h2' },
      { id: 'etape-6-hierarchiser', title: 'Définir l’ordre des interventions', level: 'h2' },
      { id: 'budget', title: 'Distinguer les périmètres dans les devis', level: 'h2' },
      { id: 'erreurs-a-eviter', title: 'Les points à clarifier avant de commencer', level: 'h2' },
    ],
    content: <>
      <p>Vous préparez une rénovation énergétique et souhaitez aussi refaire votre cuisine, votre salle de bain ou les peintures de votre appartement ? Ces travaux peuvent se croiser, mais ils ne répondent pas tous au même objectif. Définir le rôle de chaque intervenant permet d’anticiper les raccordements et les reprises de finition.</p>
      <p>Ce guide aide à préparer cette coordination. L’intervention d’ERG concerne les travaux intérieurs définis au devis, notamment l’électricité, la plomberie et la peinture. Elle ne constitue pas une offre de rénovation énergétique globale ni une prestation d’audit énergétique.</p>
      <h2 id="pourquoi-renover-energetiquement">Distinguer les objectifs du projet</h2>
      <p>Améliorer la performance énergétique demande une étude du logement et du bâtiment. Réorganiser une pièce, remplacer ses équipements ou repeindre les murs répond à d’autres besoins. Notez séparément les difficultés de confort, les travaux préconisés par une étude et les changements d’usage souhaités.</p>
      <h2 id="specificites-parisiennes">Réunir les informations sur l’appartement et l’immeuble</h2>
      <p>Rassemblez les plans disponibles, les diagnostics existants et les informations connues sur les équipements individuels ou collectifs. Signalez les projets de la copropriété : ils peuvent avoir un effet sur les décisions concernant votre appartement. La configuration réelle compte davantage qu’une recommandation générale liée à l’âge de l’immeuble.</p>
      <h2 id="etape-1-diagnostic">Commencer par une étude adaptée</h2>
      <p>Avant de choisir un programme énergétique, adressez-vous à un interlocuteur compétent pour évaluer les besoins. Les <a href="https://france-renov.gouv.fr/preparer-projet/trouver-conseiller">conseillers France Rénov’</a> apportent une information gratuite et personnalisée sur la préparation du projet et les professionnels à solliciter.</p>
      <p>Une visite de chiffrage pour repeindre ou reprendre des réseaux ne remplace pas cette étude. Faites préciser les qualifications et le périmètre de chaque professionnel, sans déduire une compétence d’audit d’une offre de rénovation intérieure.</p>
      <h2 id="etape-2-isoler">Anticiper les effets d’une isolation sur l’intérieur</h2>
      <p>Si une isolation intérieure est retenue par les professionnels concernés, demandez les dimensions finies et les surfaces touchées. La position des prises, des équipements, des meubles et des plinthes peut devoir être revue. Les travaux d’isolation ne sont pas proposés ici comme une prestation ERG.</p>
      <h2 id="etape-3-fenetres">Prévoir les raccords autour des fenêtres</h2>
      <p>Un remplacement de fenêtre peut laisser des raccords à prévoir sur les tableaux, les murs ou les finitions. Définissez avec l’entreprise chargée de la pose ce qu’elle réalise et ce qui reste à reprendre. Communiquez ces limites avant de faire chiffrer la peinture des pièces concernées.</p>
      <h2 id="etape-4-chauffage">Identifier les équipements et les réseaux concernés</h2>
      <p>Pour tout changement d’équipement, rassemblez les références prévues et les besoins de raccordement à examiner. Distinguez le choix et la pose du système énergétique des interventions éventuelles sur la plomberie ou l’électricité. Le devis de chaque entreprise doit refléter cette répartition.</p>
      <h2 id="etape-5-ventilation">Examiner la ventilation dans l’ensemble du projet</h2>
      <p>La ventilation doit être examinée avec les travaux envisagés et le fonctionnement du bâtiment. Signalez les entrées d’air, les extractions et les traces d’humidité observées. Une solution ne peut pas être choisie uniquement parce que la pièce possède ou non une fenêtre.</p>
      <h2 id="etape-6-hierarchiser">Définir l’ordre des interventions</h2>
      <p>Il n’existe pas d’ordre universel à appliquer sans étude. Réunissez les programmes des intervenants pour identifier les dépendances : supports disponibles, réseaux à adapter, équipements à recevoir, puis finitions à réaliser. Repeindre avant une reprise prévue des murs peut entraîner des travaux à refaire.</p>
      <p>Si vous restez dans le logement, notre guide de la <Link href="/blog/renovation-appartement-habite-organisation">rénovation en appartement habité</Link> aide à préciser les accès et les usages à maintenir.</p>
      <h2 id="budget">Distinguer les périmètres dans les devis</h2>
      <p>Demandez des prestations identifiées : études, travaux énergétiques, adaptations intérieures et finitions. Précisez qui prend en charge les raccords entre les interventions et les éléments conservés. Notre <Link href="/blog/comparer-devis-renovation">guide de comparaison des devis</Link> vous aide à vérifier les fournitures, les options et les exclusions.</p>
      <h2 id="erreurs-a-eviter">Les points à clarifier avant de commencer</h2>
      <ul>
        <li>Qui définit le programme énergétique et en vérifie la cohérence ?</li>
        <li>Quels travaux relèvent du logement et lesquels concernent l’immeuble ?</li>
        <li>Qui réalise les raccordements et les reprises après chaque intervention ?</li>
        <li>Quels choix doivent être validés avant les réseaux et les finitions ?</li>
      </ul>
      <p>Pour les travaux intérieurs de votre appartement, consultez le <Link href="/services/renovation-appartement">périmètre d’intervention d’ERG Rénovation</Link>. Vous pouvez <Link href={quoteHrefForService('renovation-appartement', '/blog/renovation-energetique-paris-guide-complet')}>décrire les travaux intérieurs à coordonner</Link>, en distinguant les interventions déjà confiées à d’autres professionnels.</p>
    </>,
  },
  {
    slug: 'reussir-renovation-salle-de-bain-paris',
    title: 'Rénovation de salle de bain à Paris : les étapes pour préparer votre chantier',
    description: 'Du premier relevé à la réception : les décisions à prendre, les informations à réunir et les points à vérifier avant de rénover votre salle de bain.',
    date: '2025-10-25', updatedDate: '2026-10-21', author: 'Équipe ERG Rénovation',
    featuredImageId: 'service-bathroom', tags: ['Salle de bain', 'Organisation', 'Guide'],
    relatedServiceSlugs: ['renovation-salle-de-bain'],
    toc: [
      { id: 'pourquoi-renover', title: 'Décrire les problèmes à résoudre', level: 'h2' },
      { id: 'specificites-parisiennes-sdb', title: 'Préparer le relevé et les accès', level: 'h2' },
      { id: 'etape-1-projet', title: 'Définir le périmètre avant les équipements', level: 'h2' },
      { id: 'etape-2-agencement', title: 'Valider l’implantation', level: 'h2' },
      { id: 'etape-3-materiaux', title: 'Arrêter les fournitures et les finitions', level: 'h2' },
      { id: 'etape-4-technique', title: 'Préciser les travaux techniques', level: 'h2' },
      { id: 'etape-5-ventilation-etancheite', title: 'Prévoir supports, eau et ventilation', level: 'h2' },
      { id: 'etape-6-lumiere', title: 'Définir les éclairages', level: 'h2' },
      { id: 'budget-sdb', title: 'Relire le devis et les étapes', level: 'h2' },
      { id: 'erreurs-a-eviter-sdb', title: 'Préparer la réception', level: 'h2' },
    ],
    content: <>
      <p>Une rénovation de salle de bain demande plusieurs décisions avant le début des travaux : ce que vous gardez, ce que vous remplacez et les équipements qui doivent être disponibles au bon moment. Ce guide suit ces décisions dans l’ordre de préparation du projet. Pour connaître les prestations proposées, consultez notre <Link href="/services/renovation-salle-de-bain">service de rénovation de salle de bain à Paris</Link>.</p>
      <h2 id="pourquoi-renover">Décrire les problèmes à résoudre</h2>
      <p>Listez ce qui vous gêne : accès à la baignoire, rangement insuffisant, meuble encombrant, équipements usés ou entretien difficile. Distinguez ces besoins d’une préférence de décoration. Cette liste permettra de comparer les solutions en gardant vos usages quotidiens au centre du projet.</p>
      <h2 id="specificites-parisiennes-sdb">Préparer le relevé et les accès</h2>
      <p>Quelques photos d’ensemble, un plan et les dimensions approximatives préparent le premier échange. Ajoutez les ouvertures, les équipements conservés et la position visible des raccordements. Dans l’immeuble, précisez l’étage, l’ascenseur, les accès et les contraintes connues de livraison ou d’évacuation.</p>
      <p>L’état des réseaux et des supports reste à examiner sur place. Une photo ne permet pas de confirmer ce qui se trouve sous une baignoire ou derrière un ancien revêtement.</p>
      <h2 id="etape-1-projet">Définir le périmètre avant les équipements</h2>
      <p>Le remplacement d’un meuble et la reprise de toute la pièce ne constituent pas le même chantier. Définissez les équipements, revêtements et installations concernés, puis les éléments conservés. Identifiez aussi les décisions encore ouvertes pour pouvoir chiffrer les options sans les confondre avec les travaux retenus.</p>
      <h2 id="etape-2-agencement">Valider l’implantation</h2>
      <p>Reportez sur un plan les dimensions réelles des modèles envisagés, les passages et l’ouverture des portes. Les évacuations et la hauteur disponible doivent être étudiées avant de confirmer un déplacement de douche. Une implantation séduisante sur une photo peut ne pas convenir à votre pièce.</p>
      <p>Pour approfondir un besoin précis, retrouvez nos guides sur les <Link href="/blog/renovation-petite-salle-de-bain-budget">salles de bain de 3 à 5 m²</Link> et le <Link href="/blog/remplacer-baignoire-par-douche-appartement">remplacement d’une baignoire par une douche</Link>.</p>
      <h2 id="etape-3-materiaux">Arrêter les fournitures et les finitions</h2>
      <p>Faites préciser les références, dimensions et accessoires des équipements choisis. Distinguez ce que vous fournissez de ce que l’entreprise prévoit. Les conditions de pose et d’entretien des produits doivent être compatibles avec le projet ; une finition ne se choisit pas seulement à partir de son apparence.</p>
      <h2 id="etape-4-technique">Préciser les travaux techniques</h2>
      <p>Demandez quels raccordements sont conservés, adaptés ou remplacés. Les besoins électriques dépendent aussi des équipements et de leur implantation. Les travaux doivent être définis par les intervenants compétents après examen de l’existant. Si une intervention concerne un réseau commun, identifiez ce point avant d’arrêter le chantier.</p>
      <h2 id="etape-5-ventilation-etancheite">Prévoir supports, eau et ventilation</h2>
      <p>La préparation des supports et le traitement des zones exposées à l’eau font partie du périmètre à discuter. Signalez les traces d’humidité et les défauts visibles. La ventilation existante doit être examinée avec le fonctionnement du logement ; la présence d’une fenêtre ne suffit pas à définir la solution.</p>
      <h2 id="etape-6-lumiere">Définir les éclairages</h2>
      <p>Précisez les usages : éclairage général, miroir et accès aux rangements. Positionnez les points lumineux avec les équipements avant les finitions. Les choix d’appareils et leur installation sont à valider dans le cadre de l’étude électrique de la pièce.</p>
      <h2 id="budget-sdb">Relire le devis et les étapes</h2>
      <p>Vérifiez dépose, évacuation, réseaux, supports, revêtements, équipements, pose et nettoyage prévu. Faites distinguer les options et exclusions. Le <Link href="/blog/comparer-devis-renovation">guide pour comparer les devis</Link> détaille cette lecture sans réduire le projet à un montant global.</p>
      <p>Si c’est votre seule salle d’eau, discutez des coupures et des périodes d’indisponibilité avant le démarrage. Les temps de préparation, de séchage et la réception des équipements interviennent dans le calendrier. Le guide de l’<Link href="/blog/renovation-appartement-habite-organisation">appartement habité pendant les travaux</Link> vous aide à préparer ces contraintes.</p>
      <h2 id="erreurs-a-eviter-sdb">Préparer la réception</h2>
      <p>Prévoyez un échange sur les travaux réalisés, le fonctionnement des équipements et les éventuels points à reprendre. Demandez les consignes d’entretien et de remise en usage correspondant aux produits posés. Les choix ou modifications intervenus pendant le chantier doivent pouvoir être rapprochés du périmètre convenu.</p>
      <aside className="my-6 rounded-2xl border border-slate-200 bg-white p-6" aria-label="Préparer votre rénovation de salle de bain">
        <p className="font-semibold text-slate-900">Votre projet est prêt à être étudié ?</p>
        <p>Indiquez les équipements concernés, les dimensions approximatives et les contraintes du logement. Ces informations prépareront la visite et le devis.</p>
        <Link href={quoteHrefForService('renovation-salle-de-bain', '/blog/reussir-renovation-salle-de-bain-paris')} className="font-semibold underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-700">Préparer mon projet de salle de bain</Link>
      </aside>
    </>,
  },
];
