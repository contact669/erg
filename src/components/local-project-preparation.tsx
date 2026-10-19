import Link from "next/link"
import { quoteHrefForService } from "@/lib/quote-project"

export default function LocalProjectPreparation({ location }: { location: "paris" | "montreuil" }) {
  const paris = location === "paris"
  const city = paris ? "Paris" : "Montreuil (93100)"
  return (
    <section className="container py-12 md:py-16" aria-labelledby={`preparation-${location}`}>
      <div className="mx-auto max-w-4xl space-y-8">
        <h2 id={`preparation-${location}`} className="font-headline text-2xl font-bold md:text-3xl">Préparer votre rénovation intérieure à {city}</h2>
        <div className="space-y-3">
          <h3 className="font-headline text-xl font-semibold">Définir les travaux avant de comparer les devis</h3>
          <p className="leading-relaxed text-slate-700">{paris ? "Une rénovation peut concerner une seule pièce, les réseaux ou plusieurs postes dans le logement. Commencez par distinguer les éléments à conserver, ceux à remplacer et les options encore ouvertes. Les dimensions, l’état des supports, les arrivées d’eau et les circuits électriques permettent de préparer une visite utile. Des photos et un plan simple facilitent le premier échange." : "À Montreuil, préparez votre demande à partir de l’usage souhaité : moderniser une cuisine, refaire une salle de bain ou remettre en état plusieurs pièces. Indiquez les éléments déjà fonctionnels et les changements indispensables. Un relevé des dimensions et des photos des murs, sols et raccordements permettent de préparer les points à examiner sur place."}</p>
          <p className="leading-relaxed text-slate-700">{paris ? "Pour un appartement parisien, précisez l’arrondissement, l’étage, l’accès par escalier ou ascenseur et si le logement reste occupé. Ces informations servent à organiser les livraisons, la protection des circulations et les interventions." : "Pour votre logement à Montreuil, précisez le quartier, le type de bien et les accès disponibles. Un appartement, un loft déjà habitable ou une pièce dans un ancien atelier ne présentent pas nécessairement les mêmes réseaux ni les mêmes supports. L’étude porte sur l’existant de votre logement, sans présumer de sa configuration."}</p>
        </div>
        <div className="space-y-3">
          <h3 className="font-headline text-xl font-semibold">Accès, voisinage et logement occupé</h3>
          <p className="leading-relaxed text-slate-700">Les horaires de travail, les protections, les évacuations de déchets et l’espace de stockage sont à préciser avant le démarrage. En copropriété, identifiez avec le syndic les démarches nécessaires lorsque le projet concerne des éléments collectifs. Les interventions sur la structure doivent faire l’objet d’une étude distincte ; cette page concerne la rénovation intérieure.</p>
          <p className="leading-relaxed text-slate-700">{paris ? "Si vous restez dans le logement, signalez les pièces indispensables au quotidien. Le phasage doit tenir compte des coupures d’eau, des interventions électriques et de l’accès aux sanitaires. Selon le périmètre, une occupation continue peut être difficile : ce point est à examiner avant de fixer le calendrier." : "Pour une rénovation par étapes à Montreuil, listez les dépendances entre les postes. Refaire la peinture avant une intervention sur les réseaux peut entraîner des reprises inutiles. Le calendrier doit prévoir les temps de préparation et de séchage, la réception des équipements et les accès nécessaires aux différentes pièces. Si le bien est occupé, convenez aussi des conditions d’utilisation de la cuisine et des sanitaires."}</p>
        </div>
        <div className="space-y-3">
          <h3 className="font-headline text-xl font-semibold">Un budget expliqué poste par poste</h3>
          <p className="leading-relaxed text-slate-700">{paris ? "La surface seule ne suffit pas à estimer le coût. La préparation des supports, les réseaux à reprendre, les équipements et les finitions font varier le chiffrage. Demandez que le devis distingue les travaux inclus, les fournitures retenues et les options. Les contraintes découvertes lors de la visite doivent être prises en compte avant de confirmer le montant et le planning." : "Pour comparer les offres sur votre logement à Montreuil, vérifiez qu’elles portent sur le même périmètre. Un prix de peinture peut inclure une préparation limitée ou une reprise plus importante des supports. En plomberie, conserver les raccordements existants et déplacer les équipements ne représentent pas le même travail. Faites préciser ces différences, les fournitures et les travaux exclus avant de retenir une proposition."}</p>
          <p className="leading-relaxed text-slate-700">Retrouvez notre <Link className="font-medium underline" href="/blog/comparer-devis-renovation">guide pour comparer les devis de rénovation</Link> et les prestations de <Link className="font-medium underline" href="/services/renovation-appartement">rénovation d’appartement</Link>. Pour une pièce précise, consultez nos services de <Link className="font-medium underline" href="/services/renovation-salle-de-bain">salle de bain</Link> et de <Link className="font-medium underline" href="/services/renovation-cuisine">cuisine</Link>.</p>
        </div>
        {!paris && (
          <div className="space-y-3">
            <h3 className="font-headline text-xl font-semibold">Rénover un studio à Montreuil : coordonner les usages et les réseaux</h3>
            <p className="leading-relaxed text-slate-700">Dans un studio, les prises, l’éclairage, le coin cuisine et les rangements doivent être étudiés ensemble. Commencez par positionner les équipements conservés et les meubles envisagés sur un plan. Le déplacement d’un point d’eau ne se décide pas indépendamment de l’évacuation et des raccordements disponibles.</p>
            <p className="leading-relaxed text-slate-700">Si le logement reste habité, précisez les espaces nécessaires pour dormir, cuisiner et accéder aux sanitaires. Notre guide pour <Link className="font-medium underline" href="/blog/renovation-appartement-habite-organisation">organiser une rénovation en appartement occupé</Link> détaille les points à discuter avant de fixer les étapes. Pour la salle d’eau, consultez aussi les <Link className="font-medium underline" href="/blog/renovation-petite-salle-de-bain-budget">choix d’agencement d’une petite salle de bain</Link>.</p>
          </div>
        )}
        <div className="space-y-3">
          <h3 className="font-headline text-xl font-semibold">Des exemples pour discuter de votre projet</h3>
          <p className="leading-relaxed text-slate-700">Notre <Link className="font-medium underline" href="/realisations/renovation-studio-paris-11">rénovation de studio à Paris 11</Link> et notre <Link className="font-medium underline" href="/realisations/optimisation-salle-de-bain-3m2">petite salle de bain parisienne</Link> illustrent des choix d’agencement et de finitions. Ces réalisations servent de références de travail ; elles ne sont pas présentées comme des chantiers réalisés dans votre quartier.</p>
          <Link href={paris ? "/devis" : quoteHrefForService('renovation-appartement', '/renovation-montreuil')} className="inline-block rounded-xl bg-amber-500 px-5 py-3 font-semibold text-slate-950 hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-700">Préparer mon devis à {city}</Link>
        </div>
      </div>
    </section>
  )
}
