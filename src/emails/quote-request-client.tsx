import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface QuoteRequestClientEmailProps {
  clientName: string;
}

export const QuoteRequestClientEmail = ({ clientName }: QuoteRequestClientEmailProps) => (
  <Html>
    <Head />
    <Preview>Confirmation de votre demande de devis</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Nous avons bien reçu votre demande</Heading>
        <Text style={paragraph}>Bonjour {clientName},</Text>
        <Text style={paragraph}>
          Merci de nous avoir contactés. Nous avons bien reçu votre demande de devis et nous vous remercions de votre confiance.
        </Text>
        <Text style={paragraph}>
          Notre équipe va l'étudier attentivement et reviendra vers vous dans les plus brefs délais (généralement sous 24h ouvrées) pour discuter de votre projet.
        </Text>
        <Hr style={hr} />
        <Text style={paragraph}>
          Cordialement,
          <br />
          L'équipe ERG Rénovation
        </Text>
      </Container>
    </Body>
  </Html>
);

export default QuoteRequestClientEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 48px',
  marginBottom: '64px',
  border: '1px solid #e6ebf1',
  borderRadius: '8px',
};

const heading = {
  color: '#1a1a1a',
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '24px',
  textAlign: 'center' as const,
};

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};
