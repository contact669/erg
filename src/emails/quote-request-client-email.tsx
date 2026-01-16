import {
  Body,
  Button,
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

interface ClientQuoteConfirmationEmailProps {
  clientName: string;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://erg-renovation.fr';

export default function ClientQuoteConfirmationEmail({ clientName }: ClientQuoteConfirmationEmailProps) {
  const previewText = `Confirmation de votre demande de devis chez ERG Rénovation`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/images/logo-clair.png`}
            width="48"
            height="48"
            alt="ERG Rénovation"
            style={logo}
          />
          <Heading style={heading}>Nous avons bien reçu votre demande.</Heading>
          <Text style={paragraph}>Bonjour {clientName},</Text>
          <Text style={paragraph}>
            Merci de nous avoir contactés pour votre projet de rénovation. Nous avons bien reçu votre demande et nous vous remercions de votre confiance.
          </Text>
          <Text style={paragraph}>
            Notre équipe va l'étudier attentivement et reviendra vers vous dans les plus brefs délais (généralement sous 24h ouvrées) pour discuter plus en détail de vos besoins.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={baseUrl}>
              Retourner sur le site
            </Button>
          </Section>
          <Text style={paragraph}>
            Cordialement,
            <br />
            L'équipe ERG Rénovation
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            ERG Rénovation, 1 Sente de la Pointe, 75020 Paris. <Link href={`${baseUrl}/confidentialite`} style={footerLink}>Politique de confidentialité</Link>.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 40px',
  marginBottom: '64px',
  border: '1px solid #eee',
  borderRadius: '5px',
};

const logo = {
  margin: '0 auto',
};

const heading = {
  color: '#000',
  fontSize: '24px',
  fontWeight: 'bold',
  lineHeight: '1.2',
  margin: '30px 0',
  textAlign: 'center' as const,
};

const paragraph = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '24px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#0A0A0A',
  color: '#FAFAFA',
  padding: '12px 20px',
  textDecoration: 'none',
  borderRadius: '6px',
  display: 'inline-block',
  fontWeight: 'bold',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};

const footerLink = {
  color: '#8898aa',
  textDecoration: 'underline',
};
