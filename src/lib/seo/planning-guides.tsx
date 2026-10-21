import Link from 'next/link';
import type { BlogPost } from '@/lib/types';
import { quoteHrefForService } from '@/lib/quote-project';

export const planningGuides: BlogPost[] = [
  {
    slug: '10-astuces-renovation-appartement-parisien',
    title: 'Rénover un appartement parisien : 10 choix à préparer avant les travaux',
    description: 'Agencement, lumière, rangements et éléments conservés : préparez les choix de votre appartement parisien avant les réseaux et les finitions.',
    date: '2025-11-08', updatedDate: '2026-10-21', author: 'Équipe ERG Rénovation',
    featuredImageId: 'blog-post-1', tags: ['Appartement', 'Agencement', 'Préparation'],
    relatedServiceSlugs: ['renovation-appartement'],
    toc: [
      { id: 'optimiser-metre-carre', title: '1. Partir des usages et des dimensions', level: 'h2' },
      { id: 'lumiere-fil-conducteur', title: '2. Positionner les éclairages avec le mobilier', level: 'h2' },
      { id: 'sublimer-ancien', title: '3. Identifier les éléments à conserver', level: 'h2' },
      { id: 'anticiper-copropriete', title: '4. Réunir les contraintes de l’immeuble', level: 'h2' },
      { id: 'isolation-performante', title: '5. Distinguer confort et travaux spécialisés', level: 'h2' },
      { id: 'rangements-integres', title: '6. Prévoir l’accès aux rangements', level: 'h2' },
      { id: 'materiaux-durables', title: '7. Choisir les finitions selon l’usage', level: 'h2' },
      { id: 'soigner-entree', title: '8. Examiner les passages depuis l’entrée', level: 'h2' },
      { id: 'interlocuteur-unique', title: '9. Repérer les décisions entre plusieurs métiers', level: 'h2' },
      { id: 'budget-realiste', title: '10. Classer les travaux et les options', level: 'h2' },
    ],
    content: <>
      <p>Dans un appartement, le choix d’un meuble peut modifier l’emplacement d’une prise, et celui d’une douche dépendre de l’évacuation existante. Avant de choisir les finitions, mettez les usages, les dimensions et les éléments conservés sur un même plan. Ces dix points servent à préparer vos décisions ; les travaux proposés par ERG sont décrits sur notre <Link href="/services/renovation-appartement">page rénovation d’appartement</Link>.</p>
      <h2 id="optimiser-metre-carre">1. Partir des usages et des dimensions</h2>
      <p>Listez ce que chaque pièce doit permettre : cuisiner, dormir, travailler, recevoir ou ranger. Relevez les dimensions utiles avec les ouvertures et les obstacles. Dans un studio, reportez le couchage déplié et les portes des meubles : un espace libre sur le plan peut devenir inutilisable au quotidien.</p>
      <h2 id="lumiere-fil-conducteur">2. Positionner les éclairages avec le mobilier</h2>
      <p>Repérez les zones de lecture, de préparation et de passage avant de fixer les points lumineux. L’emplacement des prises et des commandes doit être étudié avec les usages et les installations existantes. Une teinte claire ne remplace pas un éclairage adapté à une tâche.</p>
      <h2 id="sublimer-ancien">3. Identifier les éléments à conserver</h2>
      <p>Photographiez les portes, moulures, sols ou équipements que vous souhaitez garder. Leur état et les travaux proches déterminent les protections et les raccords à prévoir. Conserver un élément ne signifie pas qu’une restauration spécialisée est comprise dans le devis.</p>
      <h2 id="anticiper-copropriete">4. Réunir les contraintes de l’immeuble</h2>
      <p>Précisez l’étage, l’ascenseur, les accès et les règles de livraison connues. Si le projet concerne un réseau commun ou un élément du bâtiment, identifiez les démarches et intervenants nécessaires avant de figer l’agencement. Une modification de structure ne fait pas partie d’une simple rénovation de plomberie, d’électricité ou de peinture.</p>
      <h2 id="isolation-performante">5. Distinguer confort et travaux spécialisés</h2>
      <p>Décrivez les difficultés constatées : bruit, humidité, sensation de froid ou équipement peu pratique. Leurs causes ne se déduisent pas d’une photo. Si une étude énergétique ou acoustique est nécessaire, séparez-la des travaux intérieurs et faites préciser le rôle des professionnels concernés. Notre guide sur la <Link href="/blog/renovation-energetique-paris-guide-complet">coordination entre projet énergétique et travaux intérieurs</Link> explique cette distinction.</p>
      <h2 id="rangements-integres">6. Prévoir l’accès aux rangements</h2>
      <p>Vérifiez les profondeurs, l’ouverture des tiroirs et le passage devant les meubles. Pensez aussi à l’entretien et à l’accès aux raccordements. Le mobilier envisagé doit être dimensionné avant de confirmer les travaux autour de lui ; sa fabrication n’est pas automatiquement incluse dans l’intervention.</p>
      <h2 id="materiaux-durables">7. Choisir les finitions selon l’usage</h2>
      <p>Comparez l’entretien, l’exposition à l’eau et la compatibilité avec le support. Demandez les références des produits retenus et leurs conditions de mise en œuvre. Une finition adaptée à une chambre ne répond pas nécessairement aux mêmes besoins qu’un mur près d’un évier.</p>
      <h2 id="soigner-entree">8. Examiner les passages depuis l’entrée</h2>
      <p>Reportez les portes, les équipements et les zones de rangement sur le plan. Vérifiez la circulation au quotidien, mais aussi l’acheminement des fournitures. Une implantation doit permettre d’utiliser le logement et d’intervenir sur les équipements sans encombrer durablement les accès.</p>
      <h2 id="interlocuteur-unique">9. Repérer les décisions entre plusieurs métiers</h2>
      <p>Un emplacement d’évier concerne la plomberie, mais aussi les meubles et les finitions. Notez les choix à valider avant chaque intervention et qui les confirme avec vous. Pour l’organisation quotidienne du chantier, retrouvez notre guide de la <Link href="/blog/renovation-appartement-habite-organisation">rénovation en logement occupé</Link>.</p>
      <h2 id="budget-realiste">10. Classer les travaux et les options</h2>
      <p>Distinguez les besoins indispensables, les équipements conservés et les options encore ouvertes. Ce classement prépare un devis exploitable. Notre guide pour <Link href="/blog/budget-renovation-appartement-paris">préparer le chiffrage d’un appartement</Link> détaille les informations à réunir, sans appliquer un forfait à tous les logements.</p>
      <aside className="my-6 rounded-2xl border border-slate-200 bg-white p-6" aria-label="Préparer votre appartement">
        <p className="font-semibold text-slate-900">Quels changements souhaitez-vous dans votre appartement ?</p>
        <p>Présentez les pièces concernées, ce que vous conservez et vos priorités. ERG étudie les travaux intérieurs à Paris et dans les départements 92, 93 et 94.</p>
        <Link href={quoteHrefForService('renovation-appartement', '/blog/10-astuces-renovation-appartement-parisien')} className="font-semibold underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-700">Préparer les choix de mon appartement</Link>
      </aside>
    </>,
  },
  {
    slug: 'comment-choisir-bon-artisan-travaux',
    title: 'Choisir une entreprise de rénovation : les vérifications avant de vous engager',
    description: 'Identité, périmètre, assurances, références et organisation : les questions à poser pour choisir une entreprise adaptée à vos travaux intérieurs.',
    date: '2025-10-15', updatedDate: '2026-10-21', author: 'Équipe ERG Rénovation',
    featuredImageId: 'blog-post-2', tags: ['Entreprise', 'Travaux', 'Préparation'],
    relatedServiceSlugs: ['renovation-appartement','renovation-salle-de-bain'],
    toc: [
      { id: 'pourquoi-choix-artisan-capital', title: 'Définir la prestation recherchée', level: 'h2' },
      { id: 'verifier-qualifications-assurances', title: 'Vérifier identité et activités assurées', level: 'h2' },
      { id: 'analyser-clarte-devis', title: 'Relier la proposition au besoin', level: 'h2' },
      { id: 'voir-realisations-concretes', title: 'Examiner des références pertinentes', level: 'h2' },
      { id: 'reputation-avis', title: 'Lire les avis dans leur contexte', level: 'h2' },
      { id: 'evaluer-communication', title: 'Comprendre le suivi proposé', level: 'h2' },
      { id: 'entreprise-tous-corps-etat', title: 'Clarifier la coordination et les limites', level: 'h2' },
    ],
    content: <>
      <p>Pour choisir une entreprise de rénovation, cherchez une correspondance entre votre projet, les interventions proposées et les éléments que vous pouvez vérifier. Une belle présentation ou une note d’avis ne suffisent pas à expliquer comment seront organisés les travaux de votre appartement ou de votre salle de bain.</p>
      <h2 id="pourquoi-choix-artisan-capital">Définir la prestation recherchée</h2>
      <p>Listez les travaux : peinture, plomberie, électricité, équipements de cuisine ou salle de bain. Indiquez ce qui doit être conservé. L’entreprise doit pouvoir expliquer ce qu’elle propose, ce qui demande une vérification et ce qui ne relève pas de son intervention.</p>
      <h2 id="verifier-qualifications-assurances">Vérifier identité et activités assurées</h2>
      <p>Rapprochez le nom et le numéro d’identification figurant sur la proposition des informations publiques de l’<a href="https://annuaire-entreprises.data.gouv.fr/">Annuaire des Entreprises</a>. Cette vérification renseigne sur l’identité de l’entreprise ; elle ne prouve pas la qualité d’exécution d’un chantier.</p>
      <p>Demandez les attestations adaptées aux travaux et examinez l’entreprise assurée, la période et les activités mentionnées. Une attestation ne doit pas être interprétée comme couvrant automatiquement toutes les prestations. Le <a href="https://entreprendre.service-public.gouv.fr/vosdroits/R44868">modèle officiel d’attestation décennale</a> permet de repérer ces rubriques. En cas de doute sur une couverture, demandez une clarification à l’assureur.</p>
      <h2 id="analyser-clarte-devis">Relier la proposition au besoin</h2>
      <p>Vérifiez que la proposition décrit votre logement et les interventions discutées, plutôt qu’un intitulé général interchangeable. Faites préciser les éléments non compris et les choix restant à faire. Pour comparer les quantités, fournitures et options de plusieurs offres, utilisez notre <Link href="/blog/comparer-devis-renovation">guide de comparaison des devis</Link>.</p>
      <h2 id="voir-realisations-concretes">Examiner des références pertinentes</h2>
      <p>Recherchez un exemple proche de votre besoin : petite salle d’eau, appartement occupé ou travaux partiels. Demandez ce qui a réellement été réalisé et dans quelles conditions. Des photos illustratives ne prouvent pas une réalisation ; une vue avant et une vue après doivent concerner le même chantier pour permettre une comparaison.</p>
      <p>Les <Link href="/realisations">réalisations présentées par ERG</Link> servent à discuter des travaux et des choix. Une visite chez un ancien client ou un échange avec lui suppose son accord ; ce n’est pas une condition à exiger sans tenir compte de sa vie privée.</p>
      <h2 id="reputation-avis">Lire les avis dans leur contexte</h2>
      <p>Examinez les travaux évoqués, les éléments concrets sur le suivi et les réponses apportées. Une note seule ne décrit ni le périmètre du chantier ni ses difficultés. Un avis bref ne suffit pas davantage à conclure à un manque de fiabilité : confrontez les informations disponibles et vos échanges.</p>
      <h2 id="evaluer-communication">Comprendre le suivi proposé</h2>
      <p>Qui répond aux questions ? Comment sont annoncées les prochaines interventions ? Comment un changement de choix ou une découverte après dépose sera-t-il discuté ? Demandez un fonctionnement compréhensible, particulièrement si vous restez dans le logement.</p>
      <h2 id="entreprise-tous-corps-etat">Clarifier la coordination et les limites</h2>
      <p>Un interlocuteur facilite les échanges, mais il faut toujours savoir quelles interventions sont prévues et qui les réalise. Les travaux spécialisés éventuels doivent être identifiés séparément. Ne déduisez pas d’une présentation « tous corps d’état » qu’une entreprise réalise ou assure toutes les activités du bâtiment.</p>
      <p>Pour examiner notre intervention sur votre projet, consultez les prestations de <Link href="/services/renovation-appartement">rénovation d’appartement</Link> ou de <Link href="/services/renovation-salle-de-bain">salle de bain</Link>. Vous pouvez <Link href="/contact">poser une question sur le périmètre d’ERG</Link> ou <Link href="/devis">préparer une demande de devis</Link> avec les travaux souhaités.</p>
    </>,
  },
];
