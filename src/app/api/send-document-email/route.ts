import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { COMPANY } from "@/lib/company";
import { escapeHtml } from "@/lib/escape-html";
import { isAdminRequest } from "@/lib/server/require-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = COMPANY.email;
const FROM_EMAIL = `${COMPANY.name} <${COMPANY.email}>`;

const documentEmailSchema = z.object({
  clientEmail: z.string().trim().email().max(254),
  clientName: z.string().trim().max(120).optional().default(""),
  documentType: z.string().trim().min(1).max(80),
  documentNumber: z.string().trim().min(1).max(60),
  customSubject: z.string().trim().max(200).optional().default(""),
  customMessage: z.string().trim().max(5000).optional().default(""),
  copyAdmin: z.boolean().optional().default(true),
  // Base64 PDF generated in the CRM (about 15 MB of base64 at most).
  pdfBase64: z.string().max(20_000_000).regex(/^[A-Za-z0-9+/=]+$/).optional(),
  pdfFileName: z.string().trim().max(120).optional(),
});

export async function POST(req: NextRequest) {
  // Only the CRM admin may send emails from the company address.
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Accès refusé." }, { status: 401 });
  }

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Demande invalide." }, { status: 400 });
  }
  const parsed = documentEmailSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Veuillez fournir une adresse email valide et le numéro de document." },
      { status: 400 }
    );
  }
  const { clientEmail, clientName, documentType, documentNumber, customSubject, customMessage, copyAdmin, pdfBase64, pdfFileName } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is missing (server env).");
    return NextResponse.json({ error: "L'envoi d'email est momentanément indisponible." }, { status: 500 });
  }

  const type = escapeHtml(documentType);
  const number = escapeHtml(documentNumber);
  const name = escapeHtml(clientName || "Madame, Monsieur");
  const message = customMessage
    ? escapeHtml(customMessage).replace(/\n/g, "<br/>")
    : `Veuillez trouver ${pdfBase64 ? "ci-joint " : ""}votre document <strong>${type} N° ${number}</strong> émis par ${escapeHtml(COMPANY.name)}.`;
  const attachmentName = `${(pdfFileName || `${documentType}_${documentNumber}`).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w.-]+/g, "_").replace(/_+/g, "_")}.pdf`;
  const legalLine = [
    `${COMPANY.name} (${COMPANY.legalName}) — ${COMPANY.address}`,
    `SIRET ${COMPANY.siret}`,
    COMPANY.decennale ? `Assurance décennale : ${COMPANY.decennale}` : null,
  ].filter(Boolean).map(line => escapeHtml(line as string)).join("<br/>");

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #1e293b; padding: 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: bold;">${escapeHtml(COMPANY.name)}</h1>
        <p style="color: #b87333; margin: 4px 0 0 0; text-transform: uppercase; font-size: 12px; font-weight: bold; letter-spacing: 1px;">Rénovation intérieure à Paris et en Île-de-France</p>
      </div>
      <div style="padding: 24px;">
        <p style="font-size: 16px; font-weight: bold;">Bonjour ${name},</p>
        <p style="font-size: 14px; line-height: 1.6; color: #475569;">${message}</p>
        <div style="background-color: #f8fafc; border-left: 4px solid #b87333; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0; font-size: 13px; font-weight: bold; color: #1e293b;">${type} N° ${number}</p>
        </div>
        <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
          Pour toute question, nous restons à votre disposition au <strong>${escapeHtml(COMPANY.phoneLabel)}</strong> ou par retour d'email.
        </p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="font-size: 11px; color: #94a3b8; text-align: center;">${legalLine}</p>
      </div>
    </div>
  `;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: FROM_EMAIL,
      to: [clientEmail],
      cc: copyAdmin ? [ADMIN_EMAIL] : undefined,
      subject: customSubject || `[${COMPANY.name}] Votre ${documentType} N° ${documentNumber}`,
      html: htmlContent,
      attachments: pdfBase64 ? [{ filename: attachmentName, content: Buffer.from(pdfBase64, "base64") }] : undefined,
    });
    if (error) {
      console.error("Resend document email error:", error);
      return NextResponse.json({ error: "L'email n'a pas pu être envoyé." }, { status: 502 });
    }
    return NextResponse.json({
      success: true,
      message: `Le document ${documentNumber} a été envoyé à ${clientEmail}.`,
    });
  } catch (error) {
    console.error("Erreur d'envoi du document:", error);
    return NextResponse.json({ error: "Erreur lors de l'envoi de l'email." }, { status: 500 });
  }
}
