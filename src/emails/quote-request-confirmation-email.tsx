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
  const previewText = `Votre demande de devis chez ERG Rénovation`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Votre demande a bien été reçue !</Heading>
          <Text style={paragraph}>Bonjour {clientName},</Text>
          <Text style={paragraph}>
            Nous vous remercions pour votre demande de devis. Nous avons bien reçu les détails de votre projet et allons l'étudier avec la plus grande attention.
          </Text>
          <Text style={paragraph}>
            Notre équipe reviendra vers vous très rapidement, généralement sous 24 heures ouvrées, pour discuter des prochaines étapes.
          </Text>
          
          <Hr style={hr} />

          <Section style={btnContainer}>
             <Button style={button} href={`${baseUrl}/realisations`}>
              Découvrir nos réalisations
            </Button>
          </Section>

          <Text style={footer}>
            Cordialement,
            <br />
            L'équipe ERG Rénovation
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
  margin: '30px 0 20px',
};

const paragraph = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '24px',
};

const btnContainer = {
  textAlign: 'center' as const,
  width: '100%',
  margin: '32px 0',
};

const button = {
  backgroundColor: '#0B0B0B',
  color: '#fff',
  fontWeight: '600',
  borderRadius: '6px',
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
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
