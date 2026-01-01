import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Breadcrumbs from "@/components/breadcrumbs"
import Link from "next/link"

export default function MentionsLegalesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-grow">
        <div className="container py-16 md:py-24">
          <div className="prose prose-neutral mx-auto max-w-3xl prose-headings:font-headline prose-headings:tracking-tight prose-h1:text-center prose-h1:mb-10 prose-h2:mt-10 prose-h2:mb-3 prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
            <Breadcrumbs />

            <h1 className="mt-4">Mentions légales</h1>

            <p className="text-sm">
              Dernière mise à jour : <strong>[Date]</strong>
            </p>

            <p>
              Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie
              numérique (LCEN), il est précisé aux utilisateurs du site{" "}
              <strong>erg-renovation.fr</strong> l’identité des différents intervenants dans le cadre de sa réalisation et
              de son suivi.
            </p>

            <h2>1) Éditeur du site</h2>
            <p>
              <strong>Raison sociale / Nom commercial :</strong> ERG Rénovation
              <br />
              <strong>Forme juridique :</strong> [À compléter : SAS / SARL / EI / Micro-entreprise…]
              <br />
              <strong>Adresse du siège social :</strong> 1 Sente de la Pointe, 75020 Paris, France
              <br />
              <strong>Téléphone :</strong>{" "}
              <a href="tel:+33699961375">06 99 96 13 75</a>
              <br />
              <strong>Email :</strong>{" "}
              <a href="mailto:contact@erg-renovation.fr">contact@erg-renovation.fr</a>
              <br />
              <strong>SIRET :</strong> [À compléter]
              <br />
              <strong>RCS / RM :</strong> [À compléter : RCS Paris n°… ou RM n°… selon le cas]
              <br />
              <strong>Capital social :</strong> [À compléter, si applicable]
              <br />
              <strong>N° TVA intracommunautaire :</strong> [À compléter, si applicable]
            </p>

            <h2>2) Directeur de la publication</h2>
            <p>
              <strong>[Nom et prénom du responsable]</strong>, en qualité de{" "}
              <strong>[Gérant / Président]</strong>.
            </p>

            <h2>3) Hébergement</h2>
            <p>
              Le site est hébergé par : <strong>[Nom de l’hébergeur]</strong>
              <br />
              <strong>Adresse :</strong> [Adresse de l’hébergeur]
              <br />
              <strong>Téléphone :</strong> [Téléphone de l’hébergeur]
              <br />
              <strong>Site web :</strong> [URL de l’hébergeur]
            </p>

            <h2>4) Contact</h2>
            <p>
              Pour toute question, vous pouvez nous contacter :
              <br />
              • par email : <a href="mailto:contact@erg-renovation.fr">contact@erg-renovation.fr</a>
              <br />
              • par téléphone : <a href="tel:+33699961375">06 99 96 13 75</a>
              <br />
              • via la page{" "}
              <Link href="/contact" className="underline underline-offset-4">
                Contact
              </Link>
              .
            </p>

            <h2>5) Propriété intellectuelle</h2>
            <p>
              L’ensemble des contenus présents sur ce site (textes, images, photographies, graphismes, logos, icônes,
              vidéos, structure, mise en page, code source, etc.) est protégé par le droit d’auteur et/ou le droit de la
              propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie du site, quel
              que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l’éditeur.
            </p>

            <h2>6) Données personnelles</h2>
            <p>
              Les informations susceptibles d’être collectées via les formulaires (contact, devis) sont utilisées
              uniquement pour traiter votre demande et vous recontacter. Elles ne sont pas vendues ni cédées à des tiers.
            </p>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi « Informatique et
              Libertés », vous disposez de droits (accès, rectification, effacement, opposition, limitation, portabilité)
              sur vos données.
            </p>
            <p>
              Pour exercer vos droits, contactez-nous à :{" "}
              <a href="mailto:contact@erg-renovation.fr">contact@erg-renovation.fr</a>.
              <br />
              Pour plus de détails, consultez notre{" "}
              <Link href="/confidentialite" className="underline underline-offset-4">
                Politique de confidentialité
              </Link>
              .
            </p>

            <h2>7) Cookies</h2>
            <p>
              Le site peut utiliser des cookies afin d’améliorer l’expérience utilisateur, mesurer l’audience et
              sécuriser certains services. Vous pouvez gérer vos préférences à tout moment.
            </p>
            <p>
              Pour en savoir plus, consultez notre{" "}
              <Link href="/cookies" className="underline underline-offset-4">
                Politique de gestion des cookies
              </Link>
              .
            </p>

            <h2>8) Responsabilité</h2>
            <p>
              L’éditeur s’efforce de fournir sur le site des informations aussi précises que possible. Toutefois, il ne
              pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu’elles
              soient de son fait ou du fait des tiers partenaires.
            </p>
            <p>
              L’utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive. L’éditeur ne pourra
              être tenu responsable des dommages directs ou indirects liés à l’utilisation du site.
            </p>

            <h2>9) Liens hypertextes</h2>
            <p>
              Le site peut contenir des liens vers d’autres sites. ERG Rénovation n’exerce aucun contrôle sur ces sites et
              ne peut être tenue responsable de leur contenu, ni des éventuels dommages liés à leur consultation.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
