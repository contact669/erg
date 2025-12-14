
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import Breadcrumbs from '@/components/breadcrumbs';

export default function ConfidentialitePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-grow">
        <div className="container py-16 md:py-24">
          <div className="prose mx-auto max-w-3xl">
            <Breadcrumbs />
            <h1 className="mt-4 text-center mb-12">Politique de Confidentialité</h1>
            <p>Dernière mise à jour : [Date]</p>
            
            <p>
              ERG Rénovation accorde une grande importance à la protection de vos données personnelles. Cette politique de confidentialité vise à vous informer de la manière dont nous collectons, utilisons et protégeons les informations que vous nous transmettez.
            </p>

            <h2>1. Collecte de l'information</h2>
            <p>
              Nous collectons des informations lorsque vous utilisez notre formulaire de contact ou de demande de devis. Les informations collectées incluent votre nom, votre adresse e-mail, votre numéro de téléphone et le contenu de votre message.
            </p>
            <p>
              En outre, nous recevons et enregistrons automatiquement des informations à partir de votre ordinateur et navigateur, y compris votre adresse IP, vos logiciels et votre matériel, et la page que vous demandez (via des cookies).
            </p>

            <h2>2. Utilisation des informations</h2>
            <p>Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :</p>
            <ul>
              <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
              <li>Vous contacter par e-mail ou par téléphone dans le cadre de votre demande</li>
              <li>Améliorer notre site Web</li>
              <li>Améliorer le service client et vos besoins de prise en charge</li>
            </ul>

            <h2>3. Confidentialité</h2>
            <p>
              Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement, en dehors de ce qui est nécessaire pour répondre à une demande ou une transaction.
            </p>

            <h2>4. Protection des informations</h2>
            <p>
              Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Seuls les employés qui ont besoin d'effectuer un travail spécifique (par exemple, la facturation ou le service à la clientèle) ont accès aux informations personnelles identifiables.
            </p>

            <h2>5. Cookies</h2>
            <p>
              Nous utilisons des cookies pour améliorer l'accès à notre site et identifier les visiteurs réguliers. Pour en savoir plus sur notre utilisation des cookies, veuillez consulter notre <a href="/cookies">Politique de gestion des cookies</a>.
            </p>
            
            <h2>6. Vos droits</h2>
            <p>
              Conformément à la loi "Informatique et Libertés" et au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression, de portabilité et d'opposition aux données vous concernant. Vous pouvez exercer ce droit en nous contactant à :
            </p>
            <p>
              <strong>ERG Rénovation</strong><br />
              1 Sente de la Pointe, 75020 Paris<br />
              contact@erg-renovation.fr
            </p>

            <h2>7. Consentement</h2>
            <p>
              En utilisant notre site, vous consentez à notre politique de confidentialité.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

    
