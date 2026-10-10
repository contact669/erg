import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, ClipboardList, Droplets, FileText, Lightbulb, Paintbrush, Phone, ShieldCheck, Wrench } from "lucide-react";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Breadcrumbs from "@/components/breadcrumbs";
import CtaBanner from "@/app/_components/cta-banner";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/company";
import { pageMetadata, SITE_URL, SITE_NAME } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildServiceJsonLd } from "@/lib/seo/jsonld";

const PATH = "/travaux-copropriete-syndic";

export const metadata = pageMetadata(
  PATH,
  "Travaux de parties communes pour syndics et copropriétés à Paris",
  "Peinture de cage d'escalier et de hall, électricité et plomberie des parties communes à Paris et en petite couronne : devis détaillé HT/TVA, échéancier, PV de réception, factures et attestation décennale pour syndics, conseils syndicaux et SCI.",
);

// Only trades covered by the company's décennale insurance are listed here.
const interventions = [
  {
    icon: Paintbrush,
    title: "Peinture des parties communes",
    items: [
      "Cages d'escalier, paliers, halls d'entrée et couloirs",
      "Préparation des supports, enduits, deux couches de finition",
      "Peinture des canalisations apparentes et des plinthes",
      "Revêtements muraux souples et faïence en complément",
    ],
  },
  {
    icon: Lightbulb,
    title: "Électricité des parties communes",
    items: [
      "Éclairage des halls, escaliers et caves : plafonniers, appliques, minuteries",
      "Précâblage et pose de luminaires choisis par le conseil syndical",
      "Remplacement des goulottes et reprise des circuits apparents",
      "Mise en conformité ponctuelle des installations communes",
    ],
  },
  {
    icon: Droplets,
    title: "Plomberie",
    items: [
      "Remplacement de chauffe-eau et de ballons d'eau chaude",
      "Robinetterie des cours, locaux poubelles et parties communes",
      "Réseaux d'alimentation et d'évacuation, descentes d'eaux pluviales",
      "Recherche et réparation de fuites sur les installations accessibles",
    ],
  },
  {
    icon: Wrench,
    title: "Petites réparations et remises en état",
    items: [
      "Interventions après sinistre sur les embellissements",
      "Remise en état avant une assemblée générale ou une vente",
      "Travaux d'entretien courant planifiés avec le gestionnaire",
    ],
  },
];

const method = [
  { icon: FileText, title: "Devis détaillé", text: "Chaque ligne avec quantité, prix unitaire HT et taux de TVA, totaux HT, TVA et TTC, durée des travaux et échéancier de règlement adapté au calendrier du syndic." },
  { icon: Building2, title: "Respect de l'immeuble", text: "Protection de la zone d'intervention, nettoyage quotidien des parties communes, horaires et accès convenus avec le gestionnaire et le gardien." },
  { icon: ClipboardList, title: "Suivi et réception", text: "Un interlocuteur unique pendant le chantier, puis un procès-verbal de réception signé avec le représentant du syndicat." },
  { icon: ShieldCheck, title: "Documents en règle", text: "Factures numérotées avec les mentions légales, relances professionnelles, attestation d'assurance décennale transmise sur simple demande." },
];

const faq = [
  {
    q: "Quel taux de TVA s'applique aux travaux de parties communes ?",
    a: "Pour des travaux d'amélioration, d'aménagement ou d'entretien sur les parties communes d'un immeuble d'habitation achevé depuis plus de deux ans, le taux réduit de 10 % s'applique en règle générale. Le devis précise le taux retenu ligne par ligne, et l'éligibilité est confirmée avec le syndic avant le démarrage.",
  },
  {
    q: "Travaillez-vous directement avec les syndics et les gestionnaires ?",
    a: "Oui. Nous établissons le devis au nom du syndicat des copropriétaires ou de la SCI, nous coordonnons les accès avec le gestionnaire et le conseil syndical, et la facture est adressée au syndic pour règlement.",
  },
  {
    q: "Êtes-vous assurés pour ces travaux ?",
    a: `${COMPANY.name} est couverte par une assurance de responsabilité décennale pour la peinture intérieure, l'électricité et la plomberie. L'attestation en cours de validité est transmise sur simple demande avec le devis.`,
  },
  {
    q: "Comment se passe le règlement ?",
    a: "Le devis fixe un échéancier, par exemple 30 % au démarrage, deux acomptes en cours de chantier et 10 % à la réception, ou 50 % / 50 % pour les petites interventions. Chaque étape fait l'objet d'une facture numérotée, payable par virement.",
  },
  {
    q: "Quels sont les délais d'intervention ?",
    a: "Le devis est généralement établi après une visite sur place. La durée des travaux y est indiquée : de une journée pour un remplacement de chauffe-eau à quelques semaines pour la peinture complète d'une cage d'escalier.",
  },
  {
    q: "Dans quelles villes intervenez-vous ?",
    a: "À Paris (tous arrondissements) et dans les Hauts-de-Seine, la Seine-Saint-Denis et le Val-de-Marne.",
  },
];

export default function TravauxCoproprieteSyndicPage() {
  const jsonLd = [
    buildServiceJsonLd({
      siteUrl: SITE_URL,
      url: PATH,
      businessName: SITE_NAME,
      name: "Travaux de parties communes pour syndics et copropriétés",
      serviceType: "Peinture, électricité et plomberie des parties communes",
      department: "Paris et petite couronne",
    }),
    buildBreadcrumbJsonLd(SITE_URL, [
      { name: "Accueil", url: "/" },
      { name: "Travaux de copropriété", url: PATH },
    ]),
    buildFaqJsonLd(faq),
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-grow">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <section className="bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
            <Breadcrumbs />
            <p className="mt-6 text-xs font-bold uppercase tracking-wider text-amber-700">Syndics · Gestionnaires · Conseils syndicaux · SCI</p>
            <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Travaux de parties communes pour syndics et copropriétés à Paris
            </h1>
            <p className="mt-4 max-w-3xl text-base md:text-lg text-slate-600 leading-relaxed">
              Peinture de cages d'escalier et de halls, électricité et plomberie des parties communes : {COMPANY.name} intervient
              pour les syndics, les gestionnaires d'immeubles et les SCI à Paris et en petite couronne, avec des devis
              détaillés, un chantier propre et des documents prêts pour la comptabilité de la copropriété.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="bg-amber-600 hover:bg-amber-500 text-white font-bold">
                <Link href="/devis">
                  Demander un devis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href={`tel:${COMPANY.phone}`}>
                  <Phone className="mr-2 h-4 w-4" /> {COMPANY.phoneLabel}
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Nos interventions en parties communes</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {interventions.map((block) => (
              <div key={block.title} className="rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700">
                    <block.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{block.title}</h3>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Pour les travaux privatifs dans les appartements, voir aussi nos pages{" "}
            <Link href="/services/peinture-finitions" className="text-amber-700 underline">peinture et finitions</Link> et{" "}
            <Link href="/renovation-paris" className="text-amber-700 underline">rénovation à Paris</Link>.
          </p>
        </section>

        <section className="bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Comment nous travaillons avec les syndics</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {method.map((step) => (
                <div key={step.title} className="rounded-2xl bg-white border border-slate-200 p-5">
                  <step.icon className="h-6 w-6 text-amber-600" />
                  <h3 className="mt-3 font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Zone d'intervention</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Paris, tous arrondissements, et la petite couronne :{" "}
            <Link href="/renovation-hauts-de-seine" className="text-amber-700 underline">Hauts-de-Seine (92)</Link>,{" "}
            <Link href="/renovation-seine-saint-denis" className="text-amber-700 underline">Seine-Saint-Denis (93)</Link> et{" "}
            <Link href="/renovation-val-de-marne" className="text-amber-700 underline">Val-de-Marne (94)</Link>. Siège : {COMPANY.address}.
          </p>
        </section>

        <section className="container mx-auto max-w-4xl px-4 pb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Questions fréquentes des syndics</h2>
          <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {faq.map((item) => (
              <details key={item.q} className="group p-5">
                <summary className="cursor-pointer list-none font-semibold text-slate-900 flex justify-between gap-4">
                  {item.q}
                  <span className="text-amber-600 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild className="bg-amber-600 hover:bg-amber-500 text-white font-bold">
              <Link href="/devis">
                Demander un devis pour votre copropriété <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
