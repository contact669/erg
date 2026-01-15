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

interface ClientEmailProps {
  clientName: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://erg-renovation.fr';

export default function ClientQuoteConfirmationEmail({
  clientName,
}: ClientEmailProps) {
  const previewText = 'Confirmation de votre demande de devis';

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
          <Heading style={h1}>Nous avons bien reçu votre demande</Heading>
          <Text style={text}>Bonjour {clientName},</Text>
          <Text style={text}>
            Merci de nous avoir contactés. Nous avons bien reçu votre demande
            de devis et nous vous remercions de votre confiance.
          </Text>
          <Text style={text}>
            Notre équipe va l'étudier attentivement et reviendra vers vous dans
            les plus brefs délais (généralement sous 24h ouvrées) pour discuter
            de votre projet.
          </Text>
          <Section style={ctaSection}>
            <Text style={text}>En attendant, n'hésitez pas à consulter nos réalisations :</Text>
            <Link
              style={button}
              href={`${baseUrl}/realisations`}
            >
              Voir nos projets
            </Link>
          </Section>
          <Hr style={hr} />
          <Text style={text}>Cordialement,</Text>
          <Text style={signature}>L'équipe ERG Rénovation</Text>
          <Hr style={hr} />
          <Text style={footer}>
            ERG Rénovation • 1 Sente de la Pointe, 75020 Paris •{' '}
            <Link href={`${baseUrl}`} style={footerLink}>
              erg-renovation.fr
            </Link>
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

const text = {
  color: '#525252',
  fontSize: '16px',
  lineHeight: '26px',
};

const signature = {
  ...text,
  fontWeight: '600',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#ca8a04', // accent color
  borderRadius: '8px',
  color: '#fafafa',
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

const footerLink = {
  color: '#a3a3a3',
  textDecoration: 'underline',
};
