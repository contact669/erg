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

interface QuoteRequestAdminEmailProps {
  clientName: string;
  clientEmail: string;
  clientPhone?: string | null;
  projectDescription: string;

  // Bonus (facultatifs, utiles en prod)
  submittedAt?: string; // ex: "16/01/2026 14:12"
  quoteRequestId?: string; // id Firestore
  dashboardUrl?: string; // lien direct vers la fiche
  siteName?: string; // défaut: "ERG Rénovation"
}

export const QuoteRequestAdminEmail = ({
  clientName,
  clientEmail,
  clientPhone,
  projectDescription,
  submittedAt,
  quoteRequestId,
  dashboardUrl,
  siteName = 'ERG Rénovation',
}: QuoteRequestAdminEmailProps) => {
  const safeName = (clientName || '—').trim();
  const safeEmail = (clientEmail || '').trim();
  const safePhone = (clientPhone || '').trim();
  const safeProject = (projectDescription || '').trim();

  const hasPhone = Boolean(safePhone);
  const hasMeta = Boolean(submittedAt || quoteRequestId);

  return (
    <Html lang="fr">
      <Head />
      <Preview>Nouvelle demande de devis — {safeName}</Preview>

      <Body style={main}>
        <Container style={container}>
          {/* Badge / en-tête */}
          <Section style={topBar}>
            <Text style={topBarText}>{siteName}</Text>
          </Section>

          <Heading style={h1}>Nouvelle demande de devis</Heading>
          <Text style={lead}>
            Une nouvelle demande de devis vient d’être soumise depuis le site.
          </Text>

          {hasMeta && (
            <Section style={metaWrap}>
              {submittedAt && (
                <Text style={metaText}>
                  <strong>Reçue le :</strong> {submittedAt}
                </Text>
              )}
              {quoteRequestId && (
                <Text style={metaText}>
                  <strong>ID :</strong> {quoteRequestId}
                </Text>
              )}
            </Section>
          )}

          {/* CTA (si lien dashboard) */}
          {dashboardUrl && (
            <Section style={ctaSection}>
              <Button href={dashboardUrl} style={button}>
                Ouvrir la demande dans le dashboard
              </Button>
              <Text style={smallMuted}>
                Si le bouton ne fonctionne pas, copie/colle ce lien :{' '}
                <Link href={dashboardUrl} style={link}>
                  {dashboardUrl}
                </Link>
              </Text>
            </Section>
          )}

          <Hr style={hr} />

          {/* Infos client */}
          <Section style={card}>
            <Text style={cardTitle}>Informations client</Text>

            <Section style={row}>
              <Text style={label}>Nom</Text>
              <Text style={value}>{safeName}</Text>
            </Section>

            <Section style={row}>
              <Text style={label}>Email</Text>
              <Text style={value}>
                <Link href={`mailto:${safeEmail}`} style={link}>
                  {safeEmail}
                </Link>
              </Text>
            </Section>

            {hasPhone && (
              <Section style={row}>
                <Text style={label}>Téléphone</Text>
                <Text style={value}>
                  <Link href={`tel:${safePhone}`} style={link}>
                    {safePhone}
                  </Link>
                </Text>
              </Section>
            )}
          </Section>

          {/* Projet */}
          <Section style={card}>
            <Text style={cardTitle}>Description du projet</Text>
            <Text style={{ ...value, whiteSpace: 'pre-wrap' }}>
              {safeProject || '—'}
            </Text>
          </Section>

          {/* Footer */}
          <Hr style={hr} />
          <Text style={footer}>
            Cet email a été généré automatiquement par {siteName}.<br />
            Merci de ne pas répondre directement à ce message.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default QuoteRequestAdminEmail;

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
  padding: '0',
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

const h1: React.CSSProperties = {
  color: '#0b1220',
  fontSize: 26,
  fontWeight: 800,
  margin: '22px 20px 8px',
  lineHeight: '32px',
};

const lead: React.CSSProperties = {
  color: '#334155',
  fontSize: 16,
  lineHeight: '24px',
  margin: '0 20px 16px',
};

const metaWrap: React.CSSProperties = {
  margin: '0 20px 8px',
};

const metaText: React.CSSProperties = {
  color: '#64748b',
  fontSize: 13,
  lineHeight: '18px',
  margin: '0 0 6px',
};

const ctaSection: React.CSSProperties = {
  padding: '8px 20px 6px',
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

const hr: React.CSSProperties = {
  borderColor: '#e6ebf1',
  margin: '18px 0',
};

const card: React.CSSProperties = {
  margin: '0 20px 16px',
  padding: '14px 14px',
  border: '1px solid #e6ebf1',
  borderRadius: 12,
  backgroundColor: '#fbfdff',
};

const cardTitle: React.CSSProperties = {
  color: '#0b1220',
  fontSize: 14,
  fontWeight: 800,
  margin: '0 0 10px',
  letterSpacing: '0.2px',
};

const row: React.CSSProperties = {
  margin: '0 0 10px',
};

const label: React.CSSProperties = {
  color: '#64748b',
  fontSize: 12,
  margin: '0 0 4px',
  lineHeight: '16px',
};

const value: React.CSSProperties = {
  color: '#0f172a',
  fontSize: 15,
  margin: 0,
  lineHeight: '22px',
};

const link: React.CSSProperties = {
  color: '#2563eb',
  textDecoration: 'underline',
};

const footer: React.CSSProperties = {
  color: '#64748b',
  fontSize: 12,
  lineHeight: '18px',
  margin: '0 20px 18px',
};
