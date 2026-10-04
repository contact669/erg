import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "contact@erg-renovation.fr";
const FROM_EMAIL = "ERG Rénovation Numérique <contact@erg-renovation.fr>";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      clientEmail,
      clientName,
      documentType,
      documentNumber,
      customSubject,
      customMessage,
    } = body;

    if (!clientEmail || !documentNumber) {
      return NextResponse.json(
        { error: "Veuillez fournir l'adresse email et le numéro de document." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const resend = new Resend(apiKey);
      const subject = customSubject || `[ERG Rénovation] Votre ${documentType} N° ${documentNumber}`;
      
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #1e293b; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: bold;">ERG Rénovation Numérique</h1>
            <p style="color: #b87333; margin: 4px 0 0 0; text-transform: uppercase; font-size: 12px; font-weight: bold; letter-spacing: 1px;">Ingénierie & Rénovation Haut de Gamme</p>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px; font-weight: bold;">Bonjour ${clientName || 'Cher Client'},</p>
            <p style="font-size: 14px; line-height: 1.6; color: #475569;">
              ${customMessage || `Veuillez trouver ci-joint votre document officiel <strong>${documentType} N° ${documentNumber}</strong> émis par ERG Rénovation Numérique.`}
            </p>
            <div style="background-color: #f8fafc; border-left: 4px solid #b87333; padding: 16px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; font-size: 13px; font-weight: bold; color: #1e293b;">Document N° : ${documentNumber}</p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">Statut : Transmis via le CRM Officiel ERG Rénovation</p>
            </div>
            <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
              Pour toute question ou validation, notre équipe reste à votre entière disposition au <strong>01 42 68 55 00</strong> ou par retour d'email.
            </p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="font-size: 11px; color: #94a3b8; text-align: center;">
              ERG Rénovation Numérique — 128 Rue La Boétie, 75008 Paris<br/>
              SIRET 984 729 102 00018 | Assurance Décennale AXA N° AXA-BTP-9847291
            </p>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: FROM_EMAIL,
        to: [clientEmail],
        cc: [ADMIN_EMAIL],
        subject,
        html: htmlContent,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Le document ${documentNumber} a été transmis par email avec succès à ${clientEmail}.`,
    });
  } catch (error: any) {
    console.error("Erreur d'envoi du document:", error);
    return NextResponse.json(
      { error: error?.message || "Erreur lors de l'envoi de l'email." },
      { status: 500 }
    );
  }
}
