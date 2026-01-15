import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ClientQuoteConfirmationEmailProps {
  clientName: string;
}

export default function ClientQuoteConfirmationEmail({ clientName }: ClientQuoteConfirmationEmailProps) {
  const previewText = `Confirmation de votre demande de devis`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
            <strong>L'équipe ERG Rénovation</strong>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
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

const heading = {
  color: '#000',
  fontSize: '24px',
  fontWeight: 'bold',
  lineHeight: '1.2',
  margin: '30px 0',
};

const paragraph = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '24px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};
