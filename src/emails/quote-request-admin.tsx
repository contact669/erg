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
  Link,
} from '@react-email/components';
import * as React from 'react';

interface QuoteRequestAdminEmailProps {
  clientName: string;
  clientEmail: string;
  clientPhone?: string | null;
  projectDescription: string;
}

export const QuoteRequestAdminEmail = ({
  clientName,
  clientEmail,
  clientPhone,
  projectDescription,
}: QuoteRequestAdminEmailProps) => (
  <Html>
    <Head />
    <Preview>Nouvelle demande de devis de {clientName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Nouvelle Demande de Devis</Heading>
        <Text style={paragraph}>Une nouvelle demande de devis a été soumise sur le site ERG Rénovation.</Text>
        <Hr style={hr} />
        <Section>
          <Text style={subheading}>Informations du client :</Text>
          <Text style={paragraph}><strong>Nom :</strong> {clientName}</Text>
          <Text style={paragraph}><strong>Email :</strong> <Link href={`mailto:${clientEmail}`} style={link}>{clientEmail}</Link></Text>
          {clientPhone && <Text style={paragraph}><strong>Téléphone :</strong> {clientPhone}</Text>}
        </Section>
        <Hr style={hr} />
        <Section>
          <Text style={subheading}>Description du projet :</Text>
          <Text style={{ ...paragraph, whiteSpace: 'pre-wrap' }}>{projectDescription}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>ERG Rénovation</Text>
      </Container>
    </Body>
  </Html>
);

export default QuoteRequestAdminEmail;

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

const subheading = {
    color: '#1a1a1a',
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '24px',
};

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const link = {
  color: '#5e6ad2',
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
