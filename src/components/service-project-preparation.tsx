import Link from "next/link"
import { quoteHrefForService } from "@/lib/quote-project"

export default function ServiceProjectPreparation({ slug }: { slug: string }) {
  if (slug === "renovation-cuisine" || slug === "peinture-finitions") {
    const kitchen = slug === "renovation-cuisine"
    return (
      <section className="border-t border-slate-200 bg-white py-14 md:py-20" aria-labelledby="prepare-project-title">
        <div className="container max-w-4xl space-y-6 text-slate-600">
          <h2 id="prepare-project-title" className="font-headline text-3xl font-bold text-slate-900">{kitchen ? "Préparer les travaux de votre cuisine" : "Préparer vos travaux de peinture intérieure"}</h2>
          {kitchen ? (
            <>
              <p>Avant de choisir les meubles, faites la liste des équipements qui restent et de ceux qui changent. Un évier déplacé, un nouvel appareil ou une crédence déposée peuvent entraîner des reprises de réseaux et de supports. Ces travaux doivent être examinés avec l’implantation prévue.</p>
              <h3 className="text-xl font-semibold text-slate-900">Les éléments à réunir avant la visite</h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>Un plan avec les dimensions, les ouvertures et la position actuelle des appareils.</li>
                <li>Les références des meubles et appareils choisis, en précisant qui les fournit.</li>
                <li>Les points d’eau, prises et éclairages à conserver ou à déplacer.</li>
                <li>Les contraintes de livraison et les périodes où vous pouvez vous passer de cuisine.</li>
              </ul>
              <p>Si vous restez dans l’appartement, précisez les usages à maintenir pendant la dépose et les raccordements. Notre guide pour <Link className="underline" href="/blog/renovation-appartement-habite-organisation">organiser des travaux dans un logement habité</Link> aide à préparer cet échange.</p>
            </>
          ) : (
            <>
              <p>Indiquez les murs, plafonds, portes et plinthes concernés. Des photos d’ensemble et de détail permettent de signaler les anciens revêtements, les fissures visibles ou les zones à examiner. Le choix d’une teinte ne remplace pas l’étude du support.</p>
              <h3 className="text-xl font-semibold text-slate-900">Comparer les mêmes travaux préparatoires</h3>
              <p>Deux devis portant sur les mêmes pièces peuvent prévoir des préparations différentes. Faites préciser les reprises, les surfaces traitées, les produits, les protections et le nettoyage. Si des traces d’humidité sont présentes, signalez-les avant de prévoir la finition : leur origine doit être examinée.</p>
              <p>Listez les meubles à déplacer et les pièces à garder accessibles. Le guide de la <Link className="underline" href="/blog/renovation-appartement-habite-organisation">rénovation en appartement occupé</Link> aide à anticiper les passages et le stockage de vos affaires.</p>
            </>
          )}
          <p>Pour relire les prestations et les exclusions, consultez notre <Link className="underline" href="/blog/comparer-devis-renovation">méthode de comparaison des devis</Link>. Si les travaux concernent plusieurs pièces et leurs réseaux, retrouvez notre <Link className="underline" href="/services/renovation-appartement">prestation de rénovation d’appartement</Link>.</p>
          <Link href={quoteHrefForService(slug)} className="inline-flex rounded-xl bg-amber-500 px-6 py-3 font-bold text-slate-950 hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-700">{kitchen ? "Décrire les travaux de ma cuisine" : "Décrire mon projet de peinture"}</Link>
        </div>
      </section>
    )
  }
  if (slug !== "renovation-salle-de-bain" && slug !== "renovation-appartement") return null
  const bathroom = slug === "renovation-salle-de-bain"
  return (
    <section className="border-t border-slate-200 bg-white py-14 md:py-20" aria-labelledby="prepare-project-title">
      <div className="container max-w-4xl space-y-6 text-slate-600">
        <h2 id="prepare-project-title" className="font-headline text-3xl font-bold text-slate-900">
          {bathroom ? "Préparer la rénovation de votre salle de bain" : "Préparer les travaux de votre appartement"}
        </h2>
        {bathroom ? (
          <>
            <p>Avant de choisir une douche ou un meuble vasque, partez de ce qui vous gêne aujourd’hui : manque de rangement, accès difficile, équipements vieillissants ou pièce peu pratique à entretenir. Ces priorités orientent l’agencement et permettent de distinguer les travaux indispensables des options.</p>
            <h3 className="text-xl font-semibold text-slate-900">Ce que nous examinons avec vous</h3>
            <ul className="list-disc space-y-2 pl-5">
              <li>La place disponible, l’ouverture de la porte et la circulation entre les équipements.</li>
              <li>Les arrivées d’eau, les évacuations, la ventilation et les équipements électriques existants.</li>
              <li>Les supports à reprendre et les équipements que vous souhaitez conserver ou remplacer.</li>
              <li>L’utilisation de la pièce pendant le chantier, notamment s’il s’agit de votre seule salle d’eau.</li>
            </ul>
            <p>Pour préparer notre échange, quelques photos d’ensemble, les dimensions approximatives et la liste de vos besoins suffisent. Le choix d’un équipement dépend ensuite des vérifications sur place : une photo seule ne permet pas de confirmer un nouvel emplacement de douche.</p>
            <p>Vous pouvez voir une <Link className="font-semibold text-slate-900 underline" href="/realisations/optimisation-salle-de-bain-3m2">petite salle de bain parisienne rénovée, avec les photos partagées par Nina G.</Link>. Pour organiser votre budget, notre <Link className="underline" href="/blog/renovation-petite-salle-de-bain-budget">guide des petites salles de bain</Link> explique les postes à examiner.</p>
          </>
        ) : (
          <>
            <p>Refaire l’ensemble d’un appartement et intervenir dans quelques pièces ne demandent pas la même organisation. Commencez par les usages : les pièces qui ne conviennent plus, les équipements à remplacer et ce que vous souhaitez conserver. Le devis doit rendre cette différence de périmètre visible.</p>
            <h3 className="text-xl font-semibold text-slate-900">Les informations utiles avant la visite</h3>
            <ul className="list-disc space-y-2 pl-5">
              <li>Les pièces concernées et les travaux souhaités : peinture, électricité, plomberie, cuisine ou salle de bain.</li>
              <li>L’occupation du logement pendant les travaux et les pièces qui doivent rester utilisables.</li>
              <li>L’étage, l’ascenseur, les accès et les contraintes de livraison connues.</li>
              <li>Les équipements conservés, ceux que vous fournissez et les choix qui restent à arbitrer.</li>
            </ul>
            <p>Dans un appartement ancien, l’état des installations et des supports compte autant que la surface. Le chiffrage précise les prestations retenues, les fournitures, les options et les éventuelles exclusions pour que vous puissiez comparer les propositions sur une même base.</p>
            <h3 className="text-xl font-semibold text-slate-900">Rénover un studio : prévoir les usages dans une seule pièce</h3>
            <p>Dans un studio, la cuisine, le couchage et les rangements partagent souvent le même espace. Repérez les équipements à alimenter, les points d’eau conservés et les meubles qui doivent rester accessibles. Le déplacement d’un évier ou l’ajout de prises doit être étudié avec les installations existantes, avant de figer l’agencement.</p>
            <p>Si vous souhaitez conserver un parquet, des portes ou des moulures, indiquez-le dès la visite : les protections et les raccords de finition autour des travaux sont à prévoir. Vous pouvez consulter le <Link className="underline" href="/realisations/renovation-studio-paris-11">témoignage sur une rénovation de studio à Paris 11e</Link> pour découvrir un projet décrit par notre client.</p>
            <h3 className="text-xl font-semibold text-slate-900">Rénovation partielle ou complète : où placer la limite ?</h3>
            <p>Vous pouvez conserver une cuisine qui vous convient et concentrer les travaux sur la salle de bain, l’électricité ou les peintures. À l’inverse, si plusieurs pièces et leurs réseaux doivent être repris, une organisation commune permet d’anticiper les passages d’un métier à l’autre. Le bon périmètre dépend des besoins du logement, pas d’un forfait identique pour tous les appartements.</p>
            <h3 className="text-xl font-semibold text-slate-900">Organiser les travaux dans un logement occupé</h3>
            <p>Avant d’établir le planning, précisez les pièces dans lesquelles vous devez pouvoir circuler, travailler ou dormir. L’accès au WC et à un point d’eau, le rangement des meubles et les protections sont à examiner avec l’équipe. Un chantier par zones peut être envisagé selon les interventions ; il ne supprime pas les nuisances ni les périodes d’indisponibilité.</p>
            <p>Notre guide pour <Link className="underline" href="/blog/renovation-appartement-habite-organisation">rénover un appartement habité</Link> détaille les points à préparer avant la visite : pièces à garder accessibles, affaires à déplacer et questions sur les étapes du chantier.</p>
            <h3 className="text-xl font-semibold text-slate-900">Construire un budget à partir des travaux réels</h3>
            <p>Pour un même nombre de mètres carrés, repeindre des murs en bon état et reprendre les installations de plusieurs pièces représentent des besoins différents. Demandez que la préparation des supports, les fournitures, la dépose et l’évacuation soient identifiées. Notre <Link className="underline" href="/blog/budget-renovation-appartement-paris">guide du budget de rénovation d’appartement à Paris</Link> vous aide à préparer ces arbitrages avant la visite.</p>
            <p>Consultez notre <Link className="underline" href="/blog/comparer-devis-renovation">méthode pour comparer deux devis</Link> et les <Link className="font-semibold text-slate-900 underline" href="/realisations/renovation-appartement-65m2-paris">travaux de l’appartement de 65 m² décrits par notre client</Link>. Si votre priorité concerne une pièce d’eau, retrouvez notre <Link className="underline" href="/services/renovation-salle-de-bain">prestation de rénovation de salle de bain</Link>.</p>
            <p>Pour situer les différents périmètres, consultez nos <Link className="underline" href="/blog/budget-renovation-appartement-paris#exemples-travaux">exemples anonymisés de travaux d’appartement et de plomberie</Link>, issus des documents ERG.</p>
          </>
        )}
        <Link href={quoteHrefForService(slug)} className="inline-flex rounded-xl bg-amber-500 px-6 py-3 font-bold text-slate-950 hover:bg-amber-400">
          {bathroom ? "Décrire mon projet de salle de bain" : "Décrire les travaux de mon appartement"}
        </Link>
      </div>
    </section>
  )
}
