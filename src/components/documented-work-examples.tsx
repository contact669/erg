const examples = [
  {
    title: "Rénovation intérieure d’un appartement F2",
    source: "Devis ERG établi en mars 2025",
    scope: [
      "Déposes, reprises de supports, chape, parois et portes.",
      "Électricité, plomberie, ventilation et chauffe-eau.",
      "Équipements de salle de bain, faïence, carrelage, rénovation du parquet, peinture et doublage.",
    ],
    note: "Le document décrit plusieurs lots techniques et de finition. Il ne permet pas, à lui seul, de confirmer l’exécution de l’ensemble des travaux.",
  },
  {
    title: "Peinture et sols d’un appartement",
    source: "Devis ERG établi en mars 2025",
    scope: [
      "Préparation et peinture des murs, plafonds et boiseries ; surface au sol mentionnée pour ce poste : 67,8 m².",
      "Dépose de moquette et pose de parquet contrecollé sur 50 m², avec sous-couche et plinthes.",
      "Protection, nettoyage et évacuation des déchets prévus au devis.",
    ],
    note: "La préparation des supports, la peinture et les sols sont des interventions distinctes à organiser ensemble. Cet exemple décrit les prestations prévues au devis.",
  },
  {
    title: "Fourniture et pose d’un chauffe-eau de 75 litres",
    source: "Intervention décrite sur une facture ERG de mai 2026",
    scope: [
      "Chauffe-eau électrique vertical de 75 litres et groupe de sécurité.",
      "Pose, plomberie et remplacement de la goulotte existante.",
      "Protection et nettoyage de la zone d’intervention.",
    ],
    note: "Cette intervention ciblée porte sur l’eau chaude sanitaire et ne correspond pas à la rénovation complète d’une salle de bain.",
  },
];

export default function DocumentedWorkExamples() {
  return <section aria-labelledby="exemples-travaux" className="my-10">
    <h2 id="exemples-travaux">Trois exemples de travaux décrits dans les documents ERG</h2>
    <p>Ces exemples anonymisés illustrent différents périmètres d’intervention. Les deux premiers décrivent des travaux prévus dans des devis, sans confirmation de leur réalisation. Le troisième s’appuie sur une facture d’intervention.</p>
    <div className="not-prose space-y-5">
      {examples.map(example => <div key={example.title} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <p className="text-xs font-medium text-slate-600">{example.source} · Exemple anonymisé</p>
        <h3 className="mt-2 font-headline text-xl font-semibold text-slate-900">{example.title}</h3>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
          {example.scope.map(item => <li key={item}>{item}</li>)}
        </ul>
        <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-600">{example.note}</p>
      </div>)}
    </div>
    <p>Pour votre logement, les travaux à retenir dépendent de l’état des installations, des supports et des équipements conservés. Les documents d’origine et les coordonnées des clients ne sont pas publiés.</p>
  </section>;
}
