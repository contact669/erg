import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface EmailProps {
  clientName: string
  clientEmail: string
  clientPhone?: string
  projectDescription: string
  quoteRequestId: string
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://erg-renovation.fr'

export default function QuoteRequestAdminEmail({
  clientName,
  clientEmail,
  clientPhone,
  projectDescription,
  quoteRequestId,
}: EmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nouvelle demande de devis de {clientName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Nouvelle Demande de Devis</Heading>
          <Text style={paragraph}>Une nouvelle demande de devis a été soumise sur le site.</Text>
          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>Nom du client :</Text>
            <Text style={value}>{clientName}</Text>

            <Text style={label}>Email :</Text>
            <Link href={`mailto:${clientEmail}`} style={link}>
              {clientEmail}
            </Link>

            {clientPhone && (
              <>
                <Text style={label}>Téléphone :</Text>
                <Text style={value}>{clientPhone}</Text>
              </>
            )}
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>Description du projet :</Text>
            <Text style={{ ...value, whiteSpace: 'pre-wrap' }}>{projectDescription}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link href={`${baseUrl}/dashboard/demandes/${quoteRequestId}`} style={button}>
              Voir dans le tableau de bord
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #eee',
  borderRadius: '5px',
}

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#24292e',
  margin: '0 0 16px',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#586069',
}

const section = {
  padding: '12px 0',
}

const label = {
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#586069',
  textTransform: 'uppercase' as const,
  margin: '0',
}

const value = {
  fontSize: '16px',
  color: '#24292e',
  margin: '4px 0 0',
}

const link = {
  color: '#0366d6',
  fontSize: '16px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const button = {
  backgroundColor: '#2ea44f',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
}
