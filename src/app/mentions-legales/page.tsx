
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import Breadcrumbs from '@/components/breadcrumbs';

export default function MentionsLegalesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-grow">
        <div className="container py-16 md:py-24">
           <div className="prose mx-auto max-w-3xl">
            <Breadcrumbs />
            <h1 className="mt-4 text-center">Mentions Légales</h1>
            
            <h2>1. Éditeur du site</h2>
            <p>
              <strong>Nom de l'entreprise :</strong> ERG Rénovation<br />
              <strong>Forme juridique :</strong> [À compléter, ex: SARL, SAS, Auto-entrepreneur]<br />
              <strong>Adresse du siège social :</strong> 1 Sente de la Pointe, 75020 Paris<br />
              <strong>Numéro de téléphone :</strong> 06 99 96 13 75<br />
              <strong>Adresse e-mail :</strong> contact@erg-renovation.fr<br />
              <strong>SIRET :</strong> [À compléter]<br />
              <strong>RCS :</strong> [À compléter]<br />
              <strong>Capital social :</strong> [À compléter, si applicable]<br />
              <strong>Numéro de TVA intracommunautaire :</strong> [À compléter]
            </p>

            <h2>2. Directeur de la publication</h2>
            <p>
              Le directeur de la publication est [Nom du dirigeant], en sa qualité de Gérant.
            </p>

            <h2>3. Hébergement</h2>
            <p>
              Le site est hébergé par [Nom de l'hébergeur, ex: Vercel, OVH, etc.].<br />
              <strong>Adresse :</strong> [Adresse de l'hébergeur]<br />
              <strong>Numéro de téléphone :</strong> [Téléphone de l'hébergeur]
            </p>

            <h2>4. Propriété intellectuelle</h2>
            <p>
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
            <p>
              La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
            </p>

            <h2>5. Données personnelles</h2>
            <p>
              Les informations recueillies via les formulaires de contact sont nécessaires pour répondre à votre demande. Elles sont destinées à ERG Rénovation et ne seront pas transmises à des tiers. Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données vous concernant. Pour exercer ce droit, veuillez nous contacter à l'adresse contact@erg-renovation.fr.
            </p>

            <h2>6. Cookies</h2>
            <p>
              Ce site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de visite. Vous pouvez à tout moment choisir de désactiver ces cookies. Pour plus d'informations, veuillez consulter notre <a href="/cookies">Politique de gestion des cookies</a>.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

    
