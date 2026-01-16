import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Text } from '@react-email/components'
import * as React from 'react'

interface EmailProps {
  clientName: string
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://erg-renovation.fr'

export default function QuoteRequestClientEmail({ clientName }: EmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirmation de votre demande de devis</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Nous avons bien reçu votre demande</Heading>
          <Text style={paragraph}>Bonjour {clientName},</Text>
          <Text style={paragraph}>
            Merci de nous avoir contactés. Nous avons bien reçu votre demande de devis et nous vous remercions de votre
            confiance.
          </Text>
          <Text style={paragraph}>
            Notre équipe va l'étudier attentivement et reviendra vers vous dans les plus brefs délais (généralement sous
            24h ouvrées) pour discuter des prochaines étapes de votre projet.
          </Text>
          <Hr style={hr} />
          <Text style={paragraph}>Cordialement,</Text>
          <Text style={signature}>L'équipe ERG Rénovation</Text>
          <Link href={baseUrl} style={link}>
            www.erg-renovation.fr
          </Link>
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

const signature = {
  ...paragraph,
  fontWeight: 'bold',
  margin: '16px 0 4px',
}

const link = {
  color: '#0366d6',
  fontSize: '14px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}
