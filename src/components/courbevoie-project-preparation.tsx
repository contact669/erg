import Link from "next/link"

export default function CourbevoieProjectPreparation() {
  return (
    <section className="container py-12 md:py-16" aria-labelledby="preparer-courbevoie">
      <div className="mx-auto max-w-4xl space-y-8">
        <h2 id="preparer-courbevoie" className="font-headline text-2xl font-bold md:text-3xl">Votre devis de rénovation à Courbevoie : les points à préparer</h2>
        <div className="space-y-3">
          <h3 className="font-headline text-xl font-semibold">Partir de votre appartement, pas d’un prix au mètre carré</h3>
          <p className="leading-relaxed text-slate-700">Pour un projet à Bécon-les-Bruyères, au Faubourg de l’Arche ou ailleurs dans le 92400, indiquez les pièces concernées et l’état des équipements. Une cuisine à moderniser, une salle de bain à reprendre et une remise en peinture ne demandent pas les mêmes interventions. La visite sert à examiner les supports, les raccordements et les dimensions avant de confirmer les travaux proposés.</p>
          <p className="leading-relaxed text-slate-700">Préparez des photos, un plan si vous en disposez et une liste de vos priorités. Distinguez les travaux indispensables des options de confort ou de finition. Si vous avez déjà choisi des équipements, transmettez leurs dimensions et leurs références pour vérifier leur compatibilité avec la pièce.</p>
        </div>
        <div className="space-y-3">
          <h3 className="font-headline text-xl font-semibold">Organiser les accès et l’ordre des interventions</h3>
          <p className="leading-relaxed text-slate-700">Précisez l’étage, les conditions d’accès à l’immeuble et les possibilités de livraison. Les protections, le stockage et l’évacuation des déchets sont à prévoir dans l’organisation du chantier. Le quartier ne suffit pas à déduire ces contraintes : elles doivent être vérifiées pour votre adresse.</p>
          <p className="leading-relaxed text-slate-700">Si le logement reste occupé, discutez du maintien des accès à la cuisine et aux sanitaires. Les travaux sur les réseaux, la préparation des supports et les finitions doivent être coordonnés pour limiter les reprises. Le calendrier tient aussi compte des fournitures disponibles et des temps de séchage nécessaires.</p>
        </div>
        <div className="space-y-3">
          <h3 className="font-headline text-xl font-semibold">Comparer les prestations réellement incluses</h3>
          <p className="leading-relaxed text-slate-700">Un devis lisible distingue les travaux, les équipements, les options et les exclusions. En peinture, vérifiez la préparation prévue pour les murs. Pour la salle de bain ou la cuisine, faites préciser les raccordements conservés ou modifiés. Une estimation générale ne remplace pas l’examen de ces postes.</p>
          <p className="leading-relaxed text-slate-700">Consultez notre <Link href="/blog/comparer-devis-renovation" className="font-medium underline">guide de comparaison des devis</Link> et nos prestations de <Link href="/services/renovation-cuisine" className="font-medium underline">rénovation de cuisine</Link>, de <Link href="/services/renovation-salle-de-bain" className="font-medium underline">salle de bain</Link> et de <Link href="/services/peinture-finitions" className="font-medium underline">peinture intérieure</Link>.</p>
          <p className="leading-relaxed text-slate-700">Notre <Link href="/realisations/optimisation-salle-de-bain-3m2" className="font-medium underline">réalisation de petite salle de bain parisienne</Link> illustre des choix d’agencement. Elle sert de référence sans être présentée comme un chantier situé à Courbevoie.</p>
          <Link href="/devis" className="inline-block rounded-xl bg-amber-500 px-5 py-3 font-semibold text-slate-950 hover:bg-amber-400">Préparer mon devis à Courbevoie</Link>
        </div>
      </div>
    </section>
  )
}
