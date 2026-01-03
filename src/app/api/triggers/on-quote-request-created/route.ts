import { NextResponse } from 'next/server';
import { adminDb } from '@/firebase/admin';

// Note: L'envoi d'email est maintenant géré par l'extension Firebase "Trigger Email"
// Cette fonction a pour seul rôle de préparer les documents email dans Firestore.

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received trigger payload for email preparation:', body);

    const { clientName, clientEmail, clientPhone, projectDescription } = body.data;
    
    if (!clientName || !clientEmail || !projectDescription) {
      console.error('Missing data in payload for email preparation');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const mailCollection = adminDb.collection('mail');

    // 1. Préparer l'e-mail de confirmation pour le client
    const confirmationEmail = {
      to: [clientEmail],
      template: {
        name: 'quote-request-confirmation', // Nom du template à créer dans la collection "templates"
        data: {
          clientName: clientName,
        },
      },
    };

    // 2. Préparer l'e-mail de notification pour l'administrateur
    const adminNotificationEmail = {
      to: ['contact@erg-renovation.fr'],
      template: {
        name: 'quote-request-admin', // Nom du template à créer dans la collection "templates"
        data: {
          clientName,
          clientEmail,
          clientPhone: clientPhone || 'Non fourni',
          projectDescription,
        },
      },
    };

    // Ajout des deux documents emails à la collection 'mail'
    // L'extension "Trigger Email from Firestore" prendra le relais.
    await Promise.all([
      mailCollection.add(confirmationEmail),
      mailCollection.add(adminNotificationEmail),
    ]);
    
    console.log('Email documents created successfully for client and admin.');
    return NextResponse.json({ success: true, message: 'Email documents created.' });

  } catch (error) {
    console.error('Error creating email documents in Firestore:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred while creating email documents' }, { status: 500 });
  }
}
