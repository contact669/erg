import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface AdminQuoteRequestEmailProps {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectDescription: string;
  requestId: string;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://erg-renovation.fr';

export default function AdminQuoteRequestEmail({
  clientName,
  clientEmail,
  clientPhone,
  projectDescription,
  requestId,
}: AdminQuoteRequestEmailProps) {
  const previewText = `Nouvelle demande de devis de ${clientName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Nouvelle Demande de Devis</Heading>
          <Text style={paragraph}>Une nouvelle demande de devis a été soumise sur le site ERG Rénovation.</Text>
          
          <Hr style={hr} />

          <Section>
            <Text style={subheading}>Informations du client :</Text>
            <Text style={details}><strong>Nom :</strong> {clientName}</Text>
            <Text style={details}><strong>Email :</strong> <Link href={`mailto:${clientEmail}`} style={link}>{clientEmail}</Link></Text>
            {clientPhone && <Text style={details}><strong>Téléphone :</strong> {clientPhone}</Text>}
          </Section>
          
          <Hr style={hr} />

          <Section>
            <Text style={subheading}>Description du projet :</Text>
            <Text style={projectDescriptionStyle}>{projectDescription}</Text>
          </Section>

          <Section style={btnContainer}>
            <Button style={button} href={`${baseUrl}/dashboard/demandes/${requestId}`}>
              Voir la demande dans le Dashboard
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>Cet email a été envoyé automatiquement depuis le site erg-renovation.fr.</Text>
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

const subheading = {
  color: '#333',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '20px 0 10px',
};

const paragraph = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '24px',
};

const details = {
    ...paragraph,
    margin: '4px 0',
}

const projectDescriptionStyle = {
  ...paragraph,
  backgroundColor: '#f2f3f5',
  padding: '15px',
  borderRadius: '4px',
  whiteSpace: 'pre-wrap' as const,
  lineHeight: '1.6',
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

const link = {
  color: '#2754C5',
  textDecoration: 'underline',
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
