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
  Button
} from '@react-email/components';
import * as React from 'react';

interface QuoteRequestConfirmationEmailProps {
  clientName: string;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function QuoteRequestConfirmationEmail({
  clientName,
}: QuoteRequestConfirmationEmailProps) {
  const previewText = `Confirmation de votre demande de devis chez ERG Rénovation`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Votre demande a bien été reçue !</Heading>
          <Text style={paragraph}>Bonjour {clientName},</Text>
          <Text style={paragraph}>
            Nous vous remercions pour votre demande de devis. Nous avons bien reçu les détails de votre projet et nous allons l'étudier avec la plus grande attention.
          </Text>
          <Text style={paragraph}>
            Notre équipe reviendra vers vous très rapidement, généralement sous 24 heures ouvrées, pour discuter des prochaines étapes.
          </Text>
          
          <Hr style={hr} />

          <Section>
            <Text style={subheading}>Que se passe-t-il ensuite ?</Text>
            <Text style={details}><strong>1. Analyse de votre projet :</strong> Nous étudions les informations que vous nous avez fournies.</Text>
            <Text style={details}><strong>2. Prise de contact :</strong> Nous vous appellerons pour affiner certains points si nécessaire.</Text>
            <Text style={details}><strong>3. Proposition :</strong> Vous recevrez une première estimation ou une proposition de rendez-vous pour un devis détaillé.</Text>
          </Section>
          
          <Hr style={hr} />

          <Section style={{ textAlign: 'center' }}>
            <Text style={paragraph}>En attendant, n'hésitez pas à découvrir nos réalisations :</Text>
            <Button style={button} href={`${baseUrl}/realisations`}>
              Voir nos projets
            </Button>
          </Section>

          <Text style={footer}>
            Cordialement,
            <br />
            L'équipe ERG Rénovation
            <br />
            <Link href="tel:+33699961375" style={footerLink}>06 99 96 13 75</Link> | <Link href={`${baseUrl}`} style={footerLink}>erg-renovation.fr</Link>
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
    color: '#333'
}

const button = {
  backgroundColor: '#3056d3',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 20px',
  marginTop: '10px'
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
  textDecoration: 'underline'
}
