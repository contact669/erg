import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface AdminEmailProps {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectDescription: string;
  requestId: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://erg-renovation.fr';

export default function AdminQuoteRequestEmail({
  clientName,
  clientEmail,
  clientPhone,
  projectDescription,
  requestId,
}: AdminEmailProps) {
  const previewText = `Nouvelle demande de devis : ${clientName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src={`${baseUrl}/images/logo-clair.png`}
              width="40"
              height="40"
              alt="ERG Rénovation"
            />
          </Section>
          <Heading style={h1}>Nouvelle Demande de Devis</Heading>
          <Text style={text}>
            Une nouvelle demande a été soumise depuis le site web.
          </Text>
          <Hr style={hr} />
          <Heading as="h2" style={h2}>
            Informations du contact
          </Heading>
          <Section style={infoSection}>
            <Text style={infoLabel}>Nom :</Text>
            <Text style={infoValue}>{clientName}</Text>
          </Section>
          <Section style={infoSection}>
            <Text style={infoLabel}>Email :</Text>
            <Text style={infoValue}>
              <Link href={`mailto:${clientEmail}`} style={link}>
                {clientEmail}
              </Link>
            </Text>
          </Section>
          {clientPhone && (
            <Section style={infoSection}>
              <Text style={infoLabel}>Téléphone :</Text>
              <Text style={infoValue}>{clientPhone}</Text>
            </Section>
          )}
          <Hr style={hr} />
          <Heading as="h2" style={h2}>
            Description du projet
          </Heading>
          <Text style={projectDescriptionStyle}>{projectDescription}</Text>
          <Section style={ctaSection}>
            <Link
              style={button}
              href={`${baseUrl}/dashboard/demandes/${requestId}`}
            >
              Voir la demande dans le dashboard
            </Link>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            ERG Rénovation • 1 Sente de la Pointe, 75020 Paris
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f0f0f0',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 40px',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
};

const logoContainer = {
  textAlign: 'center' as const,
  padding: '12px 0',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '1.2',
  margin: '30px 0 15px',
};

const h2 = {
  color: '#1a1a1a',
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '20px 0 10px',
};

const text = {
  color: '#525252',
  fontSize: '16px',
  lineHeight: '24px',
};

const infoSection = {
  marginBottom: '8px',
};

const infoLabel = {
  ...text,
  fontSize: '14px',
  color: '#737373',
  margin: '0',
};

const infoValue = {
  ...text,
  margin: '0',
  fontWeight: '500',
};

const projectDescriptionStyle = {
  ...text,
  backgroundColor: '#f5f5f5',
  padding: '16px',
  borderRadius: '6px',
  whiteSpace: 'pre-wrap' as const,
  lineHeight: '1.6',
  border: '1px solid #e5e5e5',
};

const link = {
  color: '#ca8a04', // accent color
  textDecoration: 'underline',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#171717', // primary color
  borderRadius: '8px',
  color: '#fafafa', // primary-foreground
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  fontWeight: '600',
};

const hr = {
  borderColor: '#e5e5e5',
  margin: '25px 0',
};

const footer = {
  color: '#a3a3a3',
  fontSize: '12px',
  lineHeight: '16px',
};
