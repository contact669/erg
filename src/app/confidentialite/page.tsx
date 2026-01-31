import type { Metadata } from "next"
import Link from "next/link"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Breadcrumbs from "@/components/breadcrumbs"

const SITE_NAME = "ERG Rénovation"
const SITE_URL = "https://erg-renovation.fr"
const PAGE_URL = `${SITE_URL}/confidentialite`

export const metadata: Metadata = {
  title: `Politique de confidentialité | ${SITE_NAME}`,
  description:
    "Politique de confidentialité d’ERG Rénovation : données collectées, finalités, base légale, durée de conservation, cookies, destinataires et droits RGPD.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Politique de confidentialité | ${SITE_NAME}`,
    description:
      "Données collectées, finalités, base légale, durée de conservation, cookies, destinataires et droits RGPD.",
    url: PAGE_URL,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "article",
  },
  robots: { index: true, follow: true },
}

export default function ConfidentialitePage() {
  const lastUpdated = "1 janvier 2026" // ✅ mets la date du jour lors de tes mises à jour

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-grow">
        <div className="container py-16 md:py-24">
          <header className="mx-auto mt-6 max-w-3xl text-center">
            <Breadcrumbs />
            <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Politique de confidentialité
            </h1>
            <p className="mt-4 text-muted-foreground">
              Dernière mise à jour : <span className="font-medium text-foreground">{lastUpdated}</span>
            </p>
          </header>

          <div className="prose prose-zinc mx-auto mt-10 max-w-3xl text-foreground prose-headings:font-headline prose-headings:tracking-tight prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
            <p>
              ERG Rénovation attache une grande importance à la protection de vos données personnelles. La présente
              politique explique quelles données nous collectons, pourquoi nous les collectons et quels sont vos droits,
              conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi “Informatique et Libertés”.
            </p>

            <h2>1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement est <strong>ERG Rénovation</strong>.
            </p>
            <p>
              <strong>Adresse :</strong> 1 Sent. de la Pointe, 75020 Paris
              <br />
              <strong>Email :</strong>{" "}
              <a href="mailto:contact@erg-renovation.fr">contact@erg-renovation.fr</a>
            </p>

            <h2>2. Données collectées</h2>
            <p>Nous collectons uniquement les données nécessaires au traitement de vos demandes, notamment :</p>
            <ul>
              <li>
                <strong>Données d’identification</strong> : nom, prénom (si renseignés)
              </li>
              <li>
                <strong>Données de contact</strong> : email, téléphone
              </li>
              <li>
                <strong>Données liées à votre projet</strong> : nature des travaux, contraintes, informations utiles à l’établissement d’un devis
              </li>
              <li>
                <strong>Données techniques</strong> : adresse IP, journaux (logs), informations de navigation (via cookies/traceurs selon votre choix)
              </li>
            </ul>

            <h2>3. Finalités et bases légales</h2>
            <p>Vos données peuvent être traitées pour les finalités suivantes :</p>
            <ul>
              <li>
                <strong>Répondre à vos demandes</strong> (contact, devis, informations) —{" "}
                <strong>base légale :</strong> exécution de mesures précontractuelles
              </li>
              <li>
                <strong>Suivi de relation commerciale</strong> (échanges, relances liées à votre demande) —{" "}
                <strong>base légale :</strong> intérêt légitime
              </li>
              <li>
                <strong>Amélioration du site</strong> (mesures d’audience, performance) —{" "}
                <strong>base légale :</strong> consentement (si traceurs non essentiels)
              </li>
              <li>
                <strong>Sécurité du site</strong> (prévention fraude/abus, logs) —{" "}
                <strong>base légale :</strong> intérêt légitime
              </li>
            </ul>

            <h2>4. Caractère obligatoire ou facultatif</h2>
            <p>
              Les champs indispensables au traitement de votre demande (ex : email/téléphone, description du besoin) sont
              indiqués sur le formulaire. À défaut, nous ne pourrons pas traiter votre demande dans de bonnes conditions.
            </p>

            <h2>5. Destinataires des données</h2>
            <p>
              Les données sont destinées aux équipes d’ERG Rénovation et, le cas échéant, à nos prestataires techniques
              strictement nécessaires au fonctionnement du site (hébergement, maintenance, emailing/CRM).
            </p>
            <p>
              Nous ne vendons pas vos données. Elles ne sont jamais cédées à des tiers à des fins commerciales.
            </p>

            <h2>6. Durées de conservation</h2>
            <p>Nous conservons vos données pendant une durée proportionnée aux finalités :</p>
            <ul>
              <li>
                <strong>Demandes de contact/devis</strong> : durée nécessaire au traitement puis archivage limité (généralement{" "}
                <strong>jusqu’à 36 mois</strong>) à des fins de suivi
              </li>
              <li>
                <strong>Relation client</strong> : durée contractuelle + obligations légales de conservation (facturation, comptabilité)
              </li>
              <li>
                <strong>Cookies/traceurs</strong> : selon leur nature (voir Politique cookies)
              </li>
              <li>
                <strong>Logs techniques</strong> : durée courte à des fins de sécurité (généralement quelques mois)
              </li>
            </ul>

            <h2>7. Cookies et traceurs</h2>
            <p>
              Nous utilisons des cookies et technologies similaires pour assurer le fonctionnement du site et, selon votre
              choix, mesurer l’audience et améliorer l’expérience.
            </p>
            <p>
              Pour en savoir plus et gérer vos préférences, consultez notre{" "}
              <Link href="/cookies">politique de gestion des cookies</Link>.
            </p>

            <h2>8. Transferts hors Union Européenne</h2>
            <p>
              Selon les prestataires utilisés (ex : outils de mesure d’audience, emailing), certaines données peuvent être
              traitées en dehors de l’Union Européenne. Dans ce cas, nous veillons à ce que des garanties appropriées soient
              mises en place (clauses contractuelles types, mesures de sécurité).
            </p>

            <h2>9. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données : accès limités,
              protections applicatives, journalisation, et sécurisation de l’hébergement.
            </p>

            <h2>10. Vos droits (RGPD)</h2>
            <p>
              Vous disposez des droits suivants : accès, rectification, effacement, limitation, opposition, portabilité et
              retrait du consentement (lorsqu’il constitue la base légale).
            </p>
            <p>
              Pour exercer vos droits, contactez-nous :{" "}
              <a href="mailto:contact@erg-renovation.fr">contact@erg-renovation.fr</a>. Nous pourrons vous demander un
              justificatif d’identité en cas de doute raisonnable.
            </p>
            <p>
              Vous pouvez également introduire une réclamation auprès de la{" "}
              <strong>CNIL</strong> (autorité de contrôle française).
            </p>

            <h2>11. Mise à jour de la politique</h2>
            <p>
              Nous pouvons mettre à jour cette politique pour refléter les évolutions légales ou techniques. La date de
              “dernière mise à jour” en haut de page indique la version en vigueur.
            </p>

            <hr />

            <p className="text-sm">
              <strong>Note :</strong> cette page fournit un cadre RGPD solide. Pour une conformité parfaite, adapte les
              durées de conservation et la section “prestataires” à tes outils réels (hébergeur, analytics, emailing,
              formulaire/devis, etc.).
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
