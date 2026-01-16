import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
} from '@react-email/components';
import * as React from 'react';

interface QuoteRequestClientEmailProps {
  clientName: string;

  // Bonus (facultatifs mais très utiles)
  siteName?: string; // défaut: "ERG Rénovation"
  responseDelay?: string; // défaut: "sous 24h ouvrées"
  phone?: string; // ex: "01 23 45 67 89"
  phoneHref?: string; // ex: "+33123456789"
  replyEmail?: string; // ex: "contact@erg-renovation.fr"
  dashboardUrl?: string; // si tu as un espace client (sinon ignore)
}

export const QuoteRequestClientEmail = ({
  clientName,
  siteName = 'ERG Rénovation',
  responseDelay = 'sous 24h ouvrées',
  phone,
  phoneHref,
  replyEmail = 'contact@erg-renovation.fr',
  dashboardUrl,
}: QuoteRequestClientEmailProps) => {
  const safeName = (clientName || '').trim() || '—';

  const hasPhone = Boolean(phone && (phoneHref || phone));
  const hasDashboard = Boolean(dashboardUrl);

  const telHref = phoneHref
    ? `tel:${phoneHref}`
    : phone
      ? `tel:${phone.replace(/\s+/g, '')}`
      : undefined;

  return (
    <Html lang="fr">
      <Head />
      <Preview>Confirmation — votre demande de devis a bien été reçue</Preview>

      <Body style={main}>
        <Container style={container}>
          {/* Top bar */}
          <Section style={topBar}>
            <Text style={topBarText}>{siteName}</Text>
          </Section>

          <Heading style={h1}>Nous avons bien reçu votre demande</Heading>

          <Section style={content}>
            <Text style={paragraph}>Bonjour {safeName},</Text>

            <Text style={paragraph}>
              Merci de nous avoir contactés. Votre demande de devis a bien été prise en compte et nous
              vous remercions de votre confiance.
            </Text>

            <Section style={infoCard}>
              <Text style={infoTitle}>Prochaine étape</Text>
              <Text style={infoText}>
                Notre équipe étudie votre projet et revient vers vous {responseDelay}.
              </Text>
              <Text style={infoText}>
                Pour accélérer le traitement, vous pouvez répondre à cet email en ajoutant :
              </Text>
              <Text style={bullet}>• Adresse du chantier + étage / accès (ascenseur, stationnement)</Text>
              <Text style={bullet}>• Délais souhaités</Text>
              <Text style={bullet}>• Photos ou plans si disponibles</Text>
            </Section>

            {/* CTA optionnel */}
            {hasDashboard && (
              <Section style={ctaSection}>
                <Button href={dashboardUrl!} style={button}>
                  Suivre ma demande
                </Button>
                <Text style={smallMuted}>
                  Si le bouton ne fonctionne pas :{' '}
                  <Link href={dashboardUrl!} style={link}>
                    {dashboardUrl}
                  </Link>
                </Text>
              </Section>
            )}

            <Hr style={hr} />

            <Section style={contactCard}>
              <Text style={contactTitle}>Besoin de nous joindre ?</Text>

              <Text style={contactText}>
                Email :{' '}
                <Link href={`mailto:${replyEmail}`} style={link}>
                  {replyEmail}
                </Link>
              </Text>

              {hasPhone && telHref && (
                <Text style={contactText}>
                  Téléphone :{' '}
                  <Link href={telHref} style={link}>
                    {phone}
                  </Link>
                </Text>
              )}
            </Section>

            <Text style={signature}>
              Cordialement,
              <br />
              L’équipe {siteName}
            </Text>

            <Text style={finePrint}>
              Cet email est automatique. Vous pouvez répondre directement pour compléter votre demande.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default QuoteRequestClientEmail;

/* ----------------------------- Styles (inline) ----------------------------- */

const main: React.CSSProperties = {
  backgroundColor: '#f6f9fc',
  margin: 0,
  padding: '32px 12px',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container: React.CSSProperties = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: 0,
  border: '1px solid #e6ebf1',
  borderRadius: 12,
  overflow: 'hidden',
  maxWidth: 640,
};

const topBar: React.CSSProperties = {
  backgroundColor: '#0b1220',
  padding: '12px 20px',
};

const topBarText: React.CSSProperties = {
  color: '#ffffff',
  fontSize: 12,
  margin: 0,
  letterSpacing: '0.4px',
  textTransform: 'uppercase',
};

const content: React.CSSProperties = {
  padding: '0 20px 18px',
};

const h1: React.CSSProperties = {
  color: '#0b1220',
  fontSize: 24,
  fontWeight: 800,
  margin: '22px 20px 10px',
  lineHeight: '30px',
};

const paragraph: React.CSSProperties = {
  color: '#334155',
  fontSize: 16,
  lineHeight: '24px',
  textAlign: 'left',
  margin: '0 0 12px',
};

const infoCard: React.CSSProperties = {
  margin: '10px 0 16px',
  padding: '14px 14px',
  border: '1px solid #e6ebf1',
  borderRadius: 12,
  backgroundColor: '#fbfdff',
};

const infoTitle: React.CSSProperties = {
  color: '#0b1220',
  fontSize: 14,
  fontWeight: 800,
  margin: '0 0 8px',
};

const infoText: React.CSSProperties = {
  color: '#0f172a',
  fontSize: 14,
  lineHeight: '22px',
  margin: '0 0 8px',
};

const bullet: React.CSSProperties = {
  color: '#0f172a',
  fontSize: 14,
  lineHeight: '22px',
  margin: '0 0 6px',
};

const ctaSection: React.CSSProperties = {
  padding: '4px 0 14px',
};

const button: React.CSSProperties = {
  backgroundColor: '#2563eb',
  color: '#ffffff',
  borderRadius: 10,
  fontSize: 14,
  fontWeight: 700,
  padding: '12px 14px',
  textDecoration: 'none',
  display: 'inline-block',
};

const smallMuted: React.CSSProperties = {
  color: '#64748b',
  fontSize: 12,
  lineHeight: '18px',
  margin: '10px 0 0',
};

const contactCard: React.CSSProperties = {
  margin: '0 0 14px',
  padding: '12px 14px',
  border: '1px solid #e6ebf1',
  borderRadius: 12,
  backgroundColor: '#ffffff',
};

const contactTitle: React.CSSProperties = {
  color: '#0b1220',
  fontSize: 14,
  fontWeight: 800,
  margin: '0 0 8px',
};

const contactText: React.CSSProperties = {
  color: '#0f172a',
  fontSize: 14,
  lineHeight: '22px',
  margin: '0 0 6px',
};

const link: React.CSSProperties = {
  color: '#2563eb',
  textDecoration: 'underline',
};

const hr: React.CSSProperties = {
  borderColor: '#e6ebf1',
  margin: '16px 0',
};

const signature: React.CSSProperties = {
  color: '#0f172a',
  fontSize: 15,
  lineHeight: '22px',
  margin: '0 0 10px',
};

const finePrint: React.CSSProperties = {
  color: '#64748b',
  fontSize: 12,
  lineHeight: '18px',
  margin: 0,
};
