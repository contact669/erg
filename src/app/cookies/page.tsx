
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import Breadcrumbs from '@/components/breadcrumbs';

export default function CookiesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-grow">
        <div className="container py-16 md:py-24">
          <div className="prose mx-auto max-w-3xl">
            <Breadcrumbs />
            <h1 className="mt-4 text-center mb-12">Politique de Gestion des Cookies</h1>
            <p>Dernière mise à jour : [Date]</p>
            
            <h2>Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte déposé sur votre ordinateur lors de la visite d'un site ou de la consultation d'une publicité. Ils ont notamment pour but de collecter des informations relatives à votre navigation sur les sites et de vous adresser des services personnalisés. Dans votre ordinateur, les cookies sont gérés par votre navigateur internet.
            </p>

            <h2>Les cookies que nous utilisons</h2>
            <p>Ce site utilise principalement un type de cookie :</p>
            <ul>
              <li>
                <strong>Cookie de consentement :</strong> Ce cookie (nommé `cookie_consent`) est utilisé pour mémoriser votre choix concernant l'utilisation des cookies sur notre site. Si vous acceptez, nous nous souvenons de ce choix pour ne pas vous le demander à nouveau lors de vos prochaines visites. Sa durée de vie est d'un an.
              </li>
              <li>
                <strong>Cookies de mesure d'audience (si applicable) :</strong> Nous pourrions utiliser des outils comme Google Analytics pour mesurer le trafic sur notre site de manière anonyme. Ces cookies nous aident à comprendre comment les visiteurs interagissent avec le site (pages les plus visitées, temps passé, etc.) afin de l'améliorer. Aucune information personnelle identifiable n'est collectée.
              </li>
            </ul>
            
            <h2>Accepter ou refuser les cookies</h2>
            <p>
              Lors de votre première visite sur notre site, un bandeau vous informe de la présence de ces cookies et vous invite à indiquer votre choix. Ils ne sont déposés que si vous les acceptez.
            </p>
            <p>
              Vous pouvez à tout moment vous informer et paramétrer vos cookies pour les accepter ou les refuser en vous rendant sur [Lien vers un futur gestionnaire de cookies si nécessaire] ou en modifiant les paramètres de votre navigateur.
            </p>
            <p>Pour la gestion des cookies et de vos choix, la configuration de chaque navigateur est différente. Elle est décrite dans le menu d'aide de votre navigateur, qui vous permettra de savoir de quelle manière modifier vos souhaits en matière de cookies :</p>
            <ul>
              <li>Pour Internet Explorer™</li>
              <li>Pour Safari™</li>
              <li>Pour Chrome™</li>
              <li>Pour Firefox™</li>
              <li>Pour Opera™</li>
            </ul>

            <h2>Plus d'informations sur les cookies</h2>
            <p>
              Pour plus d'informations sur les cookies, vous pouvez vous rendre sur le site de la CNIL : 
              <a href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser" target="_blank" rel="noopener noreferrer">https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser</a>.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

    