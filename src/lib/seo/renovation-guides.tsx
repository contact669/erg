import Link from 'next/link';
import { quoteHrefForService } from '@/lib/quote-project';
import DocumentedWorkExamples from '@/components/documented-work-examples';
import type { BlogPost } from '@/lib/types';

export const renovationGuides: BlogPost[] = [
  {
    slug: 'renovation-appartement-habite-organisation',
    title: 'Rénover un appartement habité : organiser les travaux par étapes',
    description: 'Pièces accessibles, eau, électricité, meubles et poussière : préparez la rénovation de votre appartement occupé avec un périmètre et un planning adaptés.',
    date: '2026-10-19', author: 'Équipe ERG Rénovation', featuredImageId: 'service-apartment',
    tags: ['Appartement', 'Organisation', 'Logement occupé'],
    relatedServiceSlugs: ['renovation-appartement', 'peinture-finitions'], relatedProjectSlugs: [],
    toc: [
      { id: 'rester-ou-liberer', title: 'Peut-on rester pendant la rénovation ?', level: 'h2' },
      { id: 'pieces-disponibles', title: 'Identifier les pièces à garder accessibles', level: 'h2' },
      { id: 'ordre-interventions', title: 'Définir l’ordre des interventions', level: 'h2' },
      { id: 'meubles-protections', title: 'Préparer les affaires et les passages', level: 'h2' },
      { id: 'planning-occupe', title: 'Prévoir les échanges et les imprévus', level: 'h2' },
      { id: 'visite-appartement-habite', title: 'Préparer une visite utile', level: 'h2' },
    ],
    content: <>
      <p>Vous souhaitez refaire les peintures, reprendre l’électricité ou rénover une salle de bain tout en continuant à vivre dans votre appartement ? La première question n’est pas seulement la durée du chantier. Il faut savoir quelles pièces resteront utilisables, à quels moments et dans quelles conditions.</p>
      <p>Une organisation par zones peut convenir à certains travaux. Elle doit être discutée à partir des installations et de vos besoins quotidiens, avant de fixer le calendrier. Voici les informations à réunir pour préparer votre projet avec ERG Rénovation.</p>
      <h2 id="rester-ou-liberer">Peut-on rester pendant la rénovation ?</h2>
      <p>Repeindre une pièce en conservant une autre chambre disponible et reprendre les réseaux de tout l’appartement ne posent pas les mêmes contraintes. Une intervention localisée peut parfois être organisée par étapes. Si le chantier rend simultanément indisponibles le WC, l’eau ou les espaces de repos, une autre organisation du logement doit être envisagée.</p>
      <p>La décision dépend aussi des occupants. Signalez les enfants, les animaux, les horaires de travail à domicile ou les besoins particuliers qui ont un effet sur l’accès aux pièces. Le phasage peut limiter certaines gênes ; il ne permet pas de promettre un logement sans bruit ni poussière.</p>
      <h2 id="pieces-disponibles">Identifier les pièces à garder accessibles</h2>
      <p>Sur un plan, même simple, distinguez la zone de travaux, la zone de vie et les passages entre les deux. Pour chaque étape, vérifiez les usages réellement possibles plutôt que de considérer une pièce comme disponible parce qu’elle n’est pas directement en travaux.</p>
      <ul>
        <li><strong>WC et point d’eau :</strong> préciser les périodes de coupure ou d’indisponibilité à examiner.</li>
        <li><strong>Cuisine :</strong> identifier les équipements conservés et les raccordements concernés par les travaux.</li>
        <li><strong>Chambre :</strong> prévoir une pièce accessible, sans traverser une zone de travail encombrée.</li>
        <li><strong>Entrée et circulation :</strong> laisser les accès et les passages nécessaires au chantier et aux occupants.</li>
        <li><strong>Télétravail :</strong> ne pas supposer que le maintien d’une prise rend une pièce adaptée pendant une intervention bruyante à proximité.</li>
      </ul>
      <p>Dans un studio ou un petit appartement, il peut être difficile de séparer ces espaces. Il faut alors examiner la possibilité de libérer temporairement le logement plutôt que de compter sur un déplacement quotidien des mêmes meubles.</p>
      <h2 id="ordre-interventions">Définir l’ordre des interventions</h2>
      <p>Un chantier par étapes ne consiste pas toujours à terminer chaque pièce indépendamment. Une reprise de plomberie ou d’électricité peut concerner plusieurs zones avant les finitions. L’ordre doit tenir compte des raccordements, des supports à préparer et des temps de séchage prévus pour les produits employés.</p>
      <p>Demandez ce qui sera fait lors de chaque phase, ce qui restera à terminer et quelles décisions vous devrez avoir prises. Le choix tardif d’un équipement peut modifier l’organisation si ses dimensions ou ses raccordements diffèrent de ceux envisagés.</p>
      <p>Pour une seule salle d’eau, notre guide sur le <Link href="/blog/remplacer-baignoire-par-douche-appartement">remplacement d’une baignoire par une douche</Link> explique les vérifications qui précèdent la pose. Si plusieurs pièces sont concernées, consultez le périmètre de notre <Link href="/services/renovation-appartement">prestation de rénovation d’appartement</Link>.</p>
      <h2 id="meubles-protections">Préparer les affaires et les passages</h2>
      <p>Repérez les meubles à déplacer, les objets fragiles et les effets que vous devez garder à portée de main. Une pièce utilisée pour le stockage ne peut pas être considérée en même temps comme un espace de vie libre. Définissez avant le démarrage ce que vous retirez vous-même et ce qui est prévu dans l’intervention.</p>
      <p>Les protections doivent tenir compte des sols conservés, des meubles et des trajets de manutention. Précisez également les accès à l’étage, l’ascenseur, les livraisons et les règles de l’immeuble. L’évacuation des déchets et le nettoyage prévu doivent être identifiés dans le devis.</p>
      <p>Les produits appliqués peuvent avoir leurs propres conditions de ventilation, de séchage et de remise en usage. Faites préciser ces consignes pour les finitions retenues, sans vous fier uniquement à l’aspect sec d’une surface.</p>
      <h2 id="planning-occupe">Prévoir les échanges et les imprévus</h2>
      <p>Convenez de la façon dont seront annoncées les prochaines interventions, les coupures et les changements d’accès. Indiquez aussi comment l’équipe pourra entrer dans le logement lorsque vous êtes absent. Un planning utile décrit les étapes et les conditions qui permettent de les enchaîner.</p>
      <p>Certains points ne deviennent visibles qu’après dépose. Demandez comment une découverte sera documentée et comment les travaux supplémentaires éventuels seront discutés avant leur réalisation. Un changement de périmètre doit être distingué d’un simple choix de finition.</p>
      <p>La reprise des protections, les déplacements et le phasage peuvent modifier l’organisation par rapport à un appartement vide. Notre <Link href="/blog/comparer-devis-renovation">guide pour comparer les devis</Link> vous aide à vérifier que les propositions prévoient les mêmes conditions d’occupation.</p>
      <h2 id="visite-appartement-habite">Préparer une visite utile</h2>
      <p>Réunissez la liste des pièces et des travaux souhaités, quelques photos, les éléments à conserver et vos contraintes d’occupation. Précisez les périodes pendant lesquelles vous pouvez éventuellement libérer une partie ou la totalité du logement.</p>
      <p>Pour préparer l’échange, notez vos priorités : maintenir une chambre accessible, conserver certains équipements ou regrouper des interventions. Ces besoins doivent être confrontés à l’état du logement pour retenir un périmètre réaliste.</p>
      <aside className="my-6 rounded-2xl border border-slate-200 bg-white p-6" aria-label="Préparer les travaux de votre appartement habité">
        <p className="font-semibold text-slate-900">Vous préparez des travaux dans un appartement occupé ?</p>
        <p>Indiquez les pièces concernées, les interventions souhaitées et ce qui doit rester accessible. ERG Rénovation étudie votre projet à Paris et dans les départements 92, 93 et 94.</p>
        <Link href={quoteHrefForService('renovation-appartement', '/blog/renovation-appartement-habite-organisation')} className="font-semibold underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-700">Décrire les travaux de mon appartement habité</Link>
      </aside>
    </>,
  },
  {
    slug: 'remplacer-baignoire-par-douche-appartement',
    title: 'Remplacer une baignoire par une douche en appartement : préparer les travaux',
    description: 'Évacuation, hauteur du receveur, reprises des murs et organisation : les points à examiner avant de remplacer une baignoire par une douche à Paris.',
    date: '2026-10-19', author: 'Équipe ERG Rénovation', featuredImageId: 'service-bathroom',
    tags: ['Salle de bain', 'Douche', 'Travaux en appartement'],
    relatedServiceSlugs: ['renovation-salle-de-bain'], relatedProjectSlugs: [],
    toc: [
      { id: 'besoin-douche', title: 'Définir ce que la douche doit améliorer', level: 'h2' },
      { id: 'evacuation-receveur', title: 'Vérifier l’évacuation et la hauteur du receveur', level: 'h2' },
      { id: 'reprises-baignoire', title: 'Prévoir les reprises après dépose', level: 'h2' },
      { id: 'paroi-robinetterie', title: 'Choisir la paroi et la robinetterie', level: 'h2' },
      { id: 'organisation-travaux', title: 'Organiser les travaux dans l’appartement', level: 'h2' },
      { id: 'demande-devis-douche', title: 'Préparer la visite et le devis', level: 'h2' },
    ],
    content: <>
      <p>Vous utilisez peu votre baignoire, son rebord vous gêne ou vous souhaitez retrouver de la place dans la salle de bain ? Son remplacement par une douche peut répondre à ces besoins. Mais le projet ne se limite pas à poser un receveur à la place de la baignoire : l’évacuation, le sol et les murs doivent être examinés ensemble.</p>
      <p>Dans un appartement parisien, la hauteur disponible et l’emplacement des réseaux peuvent orienter le choix des équipements. Avant de commander une douche, voici les points à préparer pour une visite avec ERG Rénovation.</p>
      <h2 id="besoin-douche">Définir ce que la douche doit améliorer</h2>
      <p>Cherchez-vous un accès plus pratique, une zone de douche plus grande, un entretien plus simple ou de la place pour un meuble ? Ces objectifs ne conduisent pas nécessairement à la même implantation. Notez ce que vous souhaitez garder : vasque, lave-linge, rangement ou revêtement.</p>
      <p>Notre <Link href="/blog/renovation-petite-salle-de-bain-budget">guide des salles de bain de 3 à 5 m²</Link> vous aide à examiner les ouvertures et la circulation avant de choisir les dimensions des équipements.</p>
      <h2 id="evacuation-receveur">Vérifier l’évacuation et la hauteur du receveur</h2>
      <p>L’eau doit pouvoir rejoindre l’évacuation existante. La position du raccordement et la place nécessaire au système de vidage comptent autant que l’épaisseur visible du receveur. Le qualificatif « extra-plat » ne suffit donc pas à confirmer une pose de plain-pied dans votre logement.</p>
      <p>Selon la configuration, une solution posée au-dessus du sol peut être à comparer avec un équipement encastré. Une douche sans ressaut reste une possibilité à étudier sur place. Il faut également examiner l’état du support et les conséquences d’une éventuelle intervention dans le plancher.</p>
      <p>Si votre objectif est lié à une difficulté de mobilité, décrivez vos besoins d’accès et d’usage. Le seul remplacement de la baignoire ne permet pas de conclure que l’ensemble de la salle de bain sera adapté.</p>
      <h2 id="reprises-baignoire">Prévoir les reprises après dépose</h2>
      <p>La baignoire et son habillage peuvent masquer des zones sans revêtement, des raccordements ou des supports à reprendre. Une douche moins profonde peut laisser une bande de sol visible. Sur les murs, la zone exposée aux projections peut aussi dépasser l’ancien carrelage.</p>
      <ul>
        <li><strong>Le sol :</strong> repérer les raccords de revêtement à prévoir autour du receveur.</li>
        <li><strong>Les murs :</strong> examiner les surfaces découvertes et les finitions autour de la nouvelle robinetterie.</li>
        <li><strong>Les supports et jonctions :</strong> définir leur préparation et le traitement de l’étanchéité selon les équipements retenus.</li>
        <li><strong>Les points cachés :</strong> identifier dans le devis ce qui ne pourra être confirmé qu’après dépose.</li>
      </ul>
      <p>Le traitement des raccords entre le receveur et les parois fait partie du projet. Les fabricants documentent des solutions adaptées à différentes configurations, comme dans la <a href="https://www.wedi.net/fr/produits/accessoires-du-systeme/etancheite-et-desolidarisation/wedi-tools-kit-detancheite-pour-receveurs-de-douche-a-poser">documentation technique wedi sur l’étanchéité des receveurs</a>. Le système à employer dépendra du support et de la pose retenue pour votre pièce.</p>
      <h2 id="paroi-robinetterie">Choisir la paroi et la robinetterie</h2>
      <p>La paroi doit laisser un passage confortable et permettre de nettoyer la douche. Reportez sur un plan le débattement de la porte, la position du meuble et l’accès au lave-linge. Une ouverture coulissante ou pivotante répond à des contraintes différentes : comparez les modèles avec leurs dimensions réelles.</p>
      <p>L’emplacement de la robinetterie est à étudier avec les alimentations existantes et l’accès pendant l’usage. Si vous fournissez les équipements, leurs références doivent être connues avant de valider les raccordements et la pose.</p>
      <h2 id="organisation-travaux">Organiser les travaux dans l’appartement</h2>
      <p>Si c’est votre seule salle d’eau, signalez-le dès le premier échange. Les coupures d’eau et les périodes où la douche restera inutilisable doivent être discutées avant le démarrage. La dépose, les reprises et les temps de séchage ne se déduisent pas de la seule surface du receveur.</p>
      <p>Précisez l’étage, l’ascenseur, les possibilités de livraison et les règles d’accès de l’immeuble. La protection du passage et l’évacuation de la baignoire font partie de l’organisation. Tout projet touchant un réseau commun ou un élément du bâtiment doit être identifié avant de fixer le périmètre.</p>
      <h2 id="demande-devis-douche">Préparer la visite et le devis</h2>
      <p>Rassemblez quelques photos d’ensemble, les dimensions approximatives de la baignoire et de la pièce, puis la liste des équipements conservés. Ajoutez vos priorités et indiquez si le logement restera occupé.</p>
      <p>Le devis doit distinguer dépose et évacuation, plomberie, préparation des supports, revêtements, équipements et pose. Faites préciser les options, exclusions et points restant à vérifier. Notre <Link href="/blog/comparer-devis-renovation">méthode de comparaison des devis</Link> vous aide à relire ces postes sans vous limiter à l’intitulé « remplacement baignoire-douche ».</p>
      <aside className="my-6 rounded-2xl border border-slate-200 bg-white p-6" aria-label="Étudier votre remplacement de baignoire">
        <p className="font-semibold text-slate-900">Vous souhaitez remplacer votre baignoire à Paris ou dans les départements 92, 93 et 94 ?</p>
        <p>Présentez votre salle de bain et ce que vous souhaitez améliorer. La demande prépare l’échange ; les possibilités d’installation seront examinées sur place.</p>
        <Link href={quoteHrefForService('renovation-salle-de-bain', '/blog/remplacer-baignoire-par-douche-appartement')} className="font-semibold underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-700">Faire étudier mon remplacement de baignoire</Link>
        <p className="text-sm">Découvrez aussi le périmètre de notre <Link href="/services/renovation-salle-de-bain">service de rénovation de salle de bain</Link>.</p>
      </aside>
    </>,
  },
  {
    slug: 'budget-renovation-appartement-paris',
    title: 'Budget rénovation appartement à Paris : préparer un chiffrage fiable',
    description: 'Préparez votre demande de devis de rénovation d’appartement à Paris : travaux, fournitures, accès et points à vérifier lors de la visite de chiffrage.',
    date: '2026-10-07', author: 'Équipe ERG Rénovation', featuredImageId: 'service-apartment',
    updatedDate: '2026-10-24',
    tags: ['Budget', 'Appartement', 'Paris'],
    relatedServiceSlugs: ['renovation-appartement', 'peinture-finitions'],
    relatedProjectSlugs: ['renovation-studio-paris-11', 'renovation-appartement-65m2-paris'],
    toc: [
      { id: 'demande-devis-en-ligne', title: 'Demande en ligne et devis détaillé', level: 'h2' },
      { id: 'definir-travaux', title: 'Définir le périmètre des travaux', level: 'h2' },
      { id: 'facteurs-budget', title: 'Ce qui fait varier le budget', level: 'h2' },
      { id: 'grille-chiffrage', title: 'Les postes à faire chiffrer', level: 'h2' },
      { id: 'exemples-travaux', title: 'Exemples de travaux ERG', level: 'h2' },
      { id: 'preparer-visite', title: 'Préparer la visite de chiffrage', level: 'h2' },
      { id: 'comparer-budget', title: 'Comparer les devis à périmètre égal', level: 'h2' },
    ],
    content: <>
      <p>Le coût d’une rénovation d’appartement à Paris dépend des travaux réellement nécessaires. Une surface de 45 m² peut correspondre à une remise en peinture, à une réfection des pièces techniques ou à une redistribution complète. Un prix au mètre carré ne permet pas, à lui seul, de comparer ces projets.</p>
      <p>Pour construire un budget utile, commencez par distinguer ce que vous conservez, ce que vous remplacez et ce qui doit être vérifié sur place. Le devis peut ensuite détailler chaque poste et les options de finition.</p>
      <aside className="my-6 rounded-2xl border border-slate-200 bg-white p-6" aria-label="Faire chiffrer votre appartement">
        <p className="font-semibold text-slate-900">Vous cherchez un devis pour votre appartement ?</p>
        <p>Indiquez les pièces concernées, la surface approximative et vos priorités. La demande en ligne prépare l’échange ; le chiffrage détaillé est établi après étude du logement.</p>
        <Link href={quoteHrefForService('renovation-appartement', '/blog/budget-renovation-appartement-paris')} className="font-semibold">Décrire mon appartement pour préparer un devis</Link>
        <p className="text-sm">Vous souhaitez d’abord connaître notre intervention ? Consultez les <Link href="/services/renovation-appartement">prestations de rénovation d’appartement</Link>.</p>
      </aside>
      <h2 id="demande-devis-en-ligne">Demander un devis en ligne : que se passe-t-il ensuite ?</h2>
      <p>Le formulaire sert à présenter votre projet, pas à calculer automatiquement le coût des travaux. Décrivez les pièces concernées, ce qui fonctionne encore et les changements souhaités. Si les références des équipements restent à choisir, indiquez-le : leur fourniture et leur pose devront être distinguées dans le chiffrage.</p>
      <ol>
        <li><strong>Présenter les travaux :</strong> surface approximative, cuisine ou salle de bain concernée, peinture et interventions envisagées sur les réseaux.</li>
        <li><strong>Préciser le contexte :</strong> étage, accès, occupation du logement et période souhaitée, sans supposer que cette date est déjà confirmée.</li>
        <li><strong>Préparer la visite :</strong> réunir un plan, des photos de l’existant et les références utiles pour discuter des choix et des points à examiner.</li>
        <li><strong>Relire la proposition :</strong> vérifier les travaux retenus, les fournitures, les options et les hypothèses encore à confirmer avant de vous engager.</li>
      </ol>
      <p>Un montant évoqué lors d’un premier échange ne décrit pas nécessairement l’ensemble des travaux. Demandez ce qu’il comprend et quels éléments restent à vérifier sur place. Un changement d’implantation, d’équipement ou de finition doit ensuite être clarifié dans la proposition correspondante.</p>
      <p>Si votre demande concerne plusieurs pièces, consultez le <Link href="/services/renovation-appartement">périmètre de notre rénovation d’appartement</Link>. Pour préparer les interventions lorsque vous restez chez vous, le guide de la <Link href="/blog/renovation-appartement-habite-organisation">rénovation en logement occupé</Link> aide à identifier les usages à maintenir pendant le chantier.</p>
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
      <h2 id="grille-chiffrage">Les postes à faire chiffrer dans votre appartement</h2>
      <p>Cette grille sert à préparer la visite. Pour chaque poste, notez les pièces concernées et ce que vous souhaitez garder. L’entreprise pourra ensuite préciser les quantités, les fournitures et les interventions nécessaires.</p>
      <div className="overflow-x-auto">
        <table>
          <caption className="mb-3 text-left text-sm">Informations à réunir avant de comparer des montants</caption>
          <thead><tr><th scope="col">Poste</th><th scope="col">À préciser dans votre demande</th><th scope="col">À retrouver dans le devis</th></tr></thead>
          <tbody>
            <tr><th scope="row">Peinture</th><td>Pièces, plafonds et murs concernés ; fissures ou anciens revêtements visibles.</td><td>Préparation des supports, surfaces traitées et finitions retenues.</td></tr>
            <tr><th scope="row">Électricité</th><td>Prises et éclairages à déplacer ou à ajouter ; usages prévus.</td><td>Équipements concernés, circuits à reprendre et fournitures prévues après examen.</td></tr>
            <tr><th scope="row">Plomberie</th><td>Points d’eau conservés ou déplacés et équipements à remplacer.</td><td>Raccordements, évacuations et interventions sur les réseaux existants.</td></tr>
            <tr><th scope="row">Cuisine et salle de bain</th><td>Éléments conservés, équipements fournis par vous et choix restant à faire.</td><td>Dépose, préparation, pose, raccordements, fournitures et exclusions.</td></tr>
            <tr><th scope="row">Organisation</th><td>Étage, ascenseur, logement occupé, meubles à protéger et accès.</td><td>Protections, manutention, évacuation et nettoyage prévus.</td></tr>
          </tbody>
        </table>
      </div>
      <p>Une ligne sans montant peut correspondre à un poste exclu ou encore à étudier : demandez une précision avant de comparer les totaux. Si un équipement reste à choisir, faites distinguer sa fourniture et sa pose afin de repérer ce qui fera évoluer le budget.</p>
      <DocumentedWorkExamples />
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
      <p>Découvrez une <Link href="/realisations/renovation-studio-paris-11">rénovation de studio à Paris 11e</Link> et notre prestation de <Link href="/services/renovation-appartement">rénovation d’appartement</Link>. Pour votre propre logement, <Link href={quoteHrefForService('renovation-appartement', '/blog/budget-renovation-appartement-paris')}>préparez une demande de devis</Link> avec la surface, l’état actuel et vos priorités.</p>
    </>,
  },
  {
    slug: 'renovation-petite-salle-de-bain-budget',
    title: 'Rénover une salle de bain de 3 à 5 m² : agencement et choix techniques',
    description: 'Préparez la rénovation d’une petite salle de bain : agencement, plomberie, ventilation, revêtements et postes à comparer dans votre devis.',
    date: '2026-10-07', author: 'Équipe ERG Rénovation', featuredImageId: 'service-bathroom',
    updatedDate: '2026-10-19',
    tags: ['Budget', 'Salle de bain', 'Guide'],
    relatedServiceSlugs: ['renovation-salle-de-bain'],
    relatedProjectSlugs: ['optimisation-salle-de-bain-3m2'],
    toc: [
      { id: 'petite-surface', title: 'Une petite surface ne suffit pas à prévoir le coût', level: 'h2' },
      { id: 'agencement-sdb', title: 'Conserver ou déplacer les équipements', level: 'h2' },
      { id: 'plan-petite-sdb', title: 'Préparer le plan d’une pièce de 3 à 5 m²', level: 'h2' },
      { id: 'douche-baignoire', title: 'Choisir entre douche et baignoire', level: 'h2' },
      { id: 'postes-sdb', title: 'Les postes à faire apparaître au devis', level: 'h2' },
      { id: 'preparer-sdb', title: 'Les informations à préparer', level: 'h2' },
    ],
    content: <>
      <p>Dans une salle de bain de 3 à 5 m², l’enjeu est de gagner en confort sans encombrer la pièce. Le budget dépend surtout de l’agencement, de l’état des réseaux, des travaux préparatoires et des équipements choisis. La surface seule ne donne pas une estimation fiable.</p>
      <p>Une porte qui bute sur le meuble, une paroi difficile à nettoyer ou l’absence de place pour les serviettes peuvent peser davantage au quotidien que le style du carrelage. Avant de commander les équipements, relevez ce qui vous gêne et les usages que vous voulez conserver.</p>
      <h2 id="petite-surface">Une petite surface ne suffit pas à prévoir le coût</h2>
      <p>Une petite salle de bain rassemble plusieurs interventions : dépose, plomberie, électricité, ventilation, préparation des supports, protection contre l’eau, revêtements et installation des équipements. Réduire la surface ne supprime pas ces étapes.</p>
      <p>Comparez séparément les travaux techniques et les choix d’équipement. Vous pourrez alors ajuster un meuble, une robinetterie ou un revêtement sans confondre cette économie avec la suppression d’une préparation nécessaire.</p>
      <h2 id="agencement-sdb">Conserver ou déplacer les équipements</h2>
      <p>Conserver certains emplacements peut limiter les modifications de réseaux. Déplacer une douche, une vasque ou un lave-linge doit être étudié en fonction des arrivées d’eau, des évacuations et de l’espace disponible.</p>
      <p>Une douche à l’italienne n’est pas automatiquement adaptée à chaque logement. Les hauteurs disponibles et l’évacuation doivent être vérifiées. Un receveur peut constituer une autre solution à comparer lors de la visite.</p>
      <p>Prévoyez les usages quotidiens : ouverture des portes, dégagement devant le meuble, accès aux rangements et entretien. Avant de choisir les équipements, vérifiez leurs dimensions sur le plan.</p>
      <h2 id="plan-petite-sdb">Préparer le plan d’une pièce de 3 à 5 m²</h2>
      <p>Relevez la longueur et la largeur, mais aussi les renfoncements, la fenêtre, le radiateur et le sens d’ouverture de la porte. Positionnez les arrivées d’eau, l’évacuation et les équipements que vous gardez. Deux pièces de 4 m² peuvent demander des implantations très différentes selon leur forme et leurs accès.</p>
      <ul>
        <li><strong>Autour de 3 m² :</strong> partez des équipements indispensables et vérifiez les ouvertures. Un meuble moins profond n’aide que si la vasque reste confortable à utiliser.</li>
        <li><strong>Autour de 4 m² :</strong> comparez les implantations sur un plan à l’échelle. Si un lave-linge doit rester dans la pièce, prévoyez l’ouverture de son hublot et l’accès aux raccordements.</li>
        <li><strong>Autour de 5 m² :</strong> l’espace supplémentaire peut servir à la circulation ou aux rangements. Il ne rend pas automatiquement possible une douche et une baignoire dans la même pièce.</li>
      </ul>
      <p>Ces repères sont des pistes de réflexion, pas des plans types validés. Reportez les dimensions des modèles envisagés, y compris les débattements des portes et des tiroirs. Une implantation doit rester utilisable et permettre l’entretien des équipements.</p>
      <h2 id="douche-baignoire">Choisir entre douche et baignoire</h2>
      <p>Remplacer une baignoire par une douche peut libérer une partie de la pièce, mais le raccordement à l’évacuation reste déterminant. La dépose peut aussi laisser des surfaces à reprendre au sol et sur les murs. Faites examiner l’ensemble de cette zone plutôt que la seule pose d’un receveur.</p>
      <p>Si vous conservez la baignoire, vérifiez l’accès à la robinetterie, la protection contre les projections et les possibilités de rangement. Si vous choisissez une douche, comparez l’accès, l’ouverture de la paroi et le nettoyage. Le choix se fait avec les contraintes du logement et vos habitudes.</p>
      <p>Pour ce projet précis, consultez les vérifications et les travaux à prévoir pour <Link href="/blog/remplacer-baignoire-par-douche-appartement">remplacer une baignoire par une douche en appartement</Link>.</p>
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
      <p>Voyez une <Link href="/realisations/optimisation-salle-de-bain-3m2">petite salle de bain rénovée, avec les photos partagées par Nina G.</Link>. Retrouvez aussi les étapes de notre <Link href="/services/renovation-salle-de-bain">prestation de rénovation de salle de bain à Paris</Link>.</p>
      <aside className="my-6 rounded-2xl border border-slate-200 bg-white p-6" aria-label="Préparer votre projet de petite salle de bain">
        <p className="font-semibold text-slate-900">Votre salle de bain manque de place ?</p>
        <p>Indiquez les dimensions approximatives, les équipements à conserver et ce que vous aimeriez changer. Précisez si c’est votre seule salle d’eau. Ces éléments permettront de préparer une visite et un devis adapté.</p>
        <Link href={quoteHrefForService('renovation-salle-de-bain', '/blog/renovation-petite-salle-de-bain-budget')} className="font-semibold underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-700">Décrire ma petite salle de bain</Link>
      </aside>
    </>,
  },
  {
    slug: 'comparer-devis-renovation',
    title: 'Comment comparer deux devis de rénovation poste par poste ?',
    description: 'Une méthode pour comparer vos devis de travaux : périmètre, quantités, fournitures, préparation, exclusions, options et organisation du chantier.',
    date: '2026-10-07', author: 'Équipe ERG Rénovation', featuredImageId: 'blog-post-2',
    tags: ['Devis', 'Budget', 'Conseils'],
    relatedServiceSlugs: ['renovation-appartement', 'renovation-salle-de-bain', 'renovation-cuisine', 'peinture-finitions'],
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
