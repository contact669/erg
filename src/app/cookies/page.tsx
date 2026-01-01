import type { Metadata } from "next"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Breadcrumbs from "@/components/breadcrumbs"

export const metadata: Metadata = {
  title: "Politique de gestion des cookies | ERG Rénovation",
  description:
    "Informations sur l’utilisation des cookies sur le site ERG Rénovation : types de cookies, finalités, durée de conservation et moyens de gestion de vos préférences.",
  alternates: { canonical: "https://erg-renovation.fr/cookies" },
  robots: { index: true, follow: true },
}

const LAST_UPDATE = "1 janvier 2026"

export default function CookiesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-grow">
        <div className="container py-14 md:py-20">
          <Breadcrumbs />

          <header className="mx-auto max-w-3xl text-center">
            <h1 className="mt-6 font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Politique de gestion des cookies
            </h1>
            <p className="mt-4 text-muted-foreground">
              Dernière mise à jour : <span className="font-medium text-foreground">{LAST_UPDATE}</span>
            </p>
          </header>

          <section className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
            {/* Contenu principal */}
            <article className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-headline prose-a:text-accent">
              <h2>1) Définition</h2>
              <p>
                Un cookie est un petit fichier texte enregistré sur votre terminal (ordinateur, mobile, tablette) lors de
                la consultation d’un site. Il permet notamment de mémoriser des informations liées à votre navigation
                (langue, préférences, consentement) afin d’améliorer votre expérience.
              </p>

              <h2>2) Cookies utilisés sur ce site</h2>
              <p>
                Nous utilisons des cookies strictement nécessaires au fonctionnement du site et, le cas échéant, des
                cookies optionnels (mesure d’audience) uniquement si vous y consentez.
              </p>

              <h3>2.1 Cookies strictement nécessaires</h3>
              <p>
                Ces cookies sont indispensables au fonctionnement du site (ex : mémoriser votre choix concernant les
                cookies).
              </p>

              <ul>
                <li>
                  <strong>cookie_consent</strong> : mémorise votre choix (acceptation/refus).<br />
                  <strong>Finalité</strong> : gestion du consentement.<br />
                  <strong>Durée</strong> : 12 mois.<br />
                  <strong>Base légale</strong> : intérêt légitime / obligation de prouver le consentement selon le cas.
                </li>
              </ul>

              <h3>2.2 Cookies de mesure d’audience (si activés)</h3>
              <p>
                Ils nous aident à comprendre l’utilisation du site (pages consultées, temps de visite, sources de trafic)
                afin d’améliorer la performance et les contenus. Ils ne sont déposés <strong>qu’avec votre consentement</strong>.
              </p>
              <ul>
                <li>
                  <strong>Outil éventuel</strong> : Google Analytics (ou équivalent).<br />
                  <strong>Finalité</strong> : statistiques anonymisées / agrégées.<br />
                  <strong>Durée</strong> : variable selon l’outil et la configuration.<br />
                  <strong>Base légale</strong> : consentement.
                </li>
              </ul>

              <h2>3) Accepter, refuser ou modifier vos préférences</h2>
              <p>
                Lors de votre première visite, un bandeau vous permet d’accepter ou de refuser les cookies non essentiels.
                Vous pouvez ensuite modifier votre choix à tout moment :
              </p>
              <ul>
                <li>
                  via votre navigateur (suppression/gestion des cookies), ou
                </li>
                <li>
                  en supprimant le cookie de consentement <strong>cookie_consent</strong> pour réafficher le bandeau lors
                  de votre prochaine visite.
                </li>
              </ul>

              <h2>4) Paramétrage via votre navigateur</h2>
              <p>
                La configuration dépend de votre navigateur. Vous pouvez notamment supprimer des cookies, bloquer tous
                les cookies ou autoriser uniquement certains cookies.
              </p>
              <ul>
                <li>Chrome™</li>
                <li>Firefox™</li>
                <li>Safari™</li>
                <li>Edge™</li>
                <li>Opera™</li>
              </ul>

              <h2>5) Plus d’informations</h2>
              <p>
                Pour en savoir plus sur les cookies et vos droits, vous pouvez consulter les ressources de la CNIL :
                {" "}
                <a
                  href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cookies : les outils pour les maîtriser
                </a>.
              </p>

              <h2>6) Contact</h2>
              <p>
                Pour toute question concernant cette politique, vous pouvez nous contacter :
                <br />
                <strong>ERG Rénovation</strong>
                <br />
                1 Sente de la Pointe, 75020 Paris
                <br />
                contact@erg-renovation.fr
              </p>
            </article>

            {/* Encadré “pro” */}
            <aside className="h-fit rounded-xl border bg-secondary/40 p-6">
              <h3 className="font-headline text-lg font-semibold">En résumé</h3>

              <div className="mt-4 space-y-4 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">Cookie de consentement</p>
                  <p>Indispensable pour mémoriser votre choix (12 mois).</p>
                </div>

                <div>
                  <p className="font-medium text-foreground">Mesure d’audience</p>
                  <p>Optionnelle, déposée uniquement si vous acceptez.</p>
                </div>

                <div>
                  <p className="font-medium text-foreground">Modifier vos préférences</p>
                  <p>
                    Via votre navigateur, ou en supprimant <code>cookie_consent</code>.
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-accent hover:underline"
                  >
                    Ressources CNIL →
                  </a>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
