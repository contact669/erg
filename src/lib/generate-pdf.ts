import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Capture un élément HTML du DOM et le met en page sur une ou plusieurs pages A4.
 * `compact` produit un fichier plus léger (JPEG) pour l'envoi en pièce jointe.
 */
async function renderElementToPdf(elementId: string, compact = false): Promise<jsPDF | null> {
  const targetElement = document.getElementById(elementId);
  if (!targetElement) {
    console.error(`Élément introuvable avec l'ID '${elementId}'`);
    return null;
  }

  // Capture du canvas en haute densité avec réinitialisation des décalages de défilement
  const canvas = await html2canvas(targetElement, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: "#ffffff",
    scrollX: 0,
    scrollY: 0,
  });

  const format = compact ? "JPEG" : "PNG";
  const imgData = compact ? canvas.toDataURL("image/jpeg", 0.85) : canvas.toDataURL("image/png");

  // Format A4 ISO standard (210mm x 297mm)
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgHeightMm = (canvas.height * pdfWidth) / canvas.width;

  // Gestion multipages automatique
  let heightLeft = imgHeightMm;
  let position = 0;
  pdf.addImage(imgData, format, 0, position, pdfWidth, imgHeightMm);
  heightLeft -= pdfHeight;
  while (heightLeft > 0) {
    position -= pdfHeight;
    pdf.addPage();
    pdf.addImage(imgData, format, 0, position, pdfWidth, imgHeightMm);
    heightLeft -= pdfHeight;
  }
  return pdf;
}

/**
 * Capture un élément HTML du DOM et le télécharge directement au format PDF HD (1-clic)
 */
export async function downloadElementAsPdf(
  elementId: string,
  fileName: string = "Document_ERG_Renovation.pdf"
): Promise<boolean> {
  try {
    const pdf = await renderElementToPdf(elementId);
    if (!pdf) return false;
    pdf.save(fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`);
    return true;
  } catch (error) {
    console.error("Erreur lors de la génération directe du PDF:", error);
    return false;
  }
}

/** PDF encodé en base64 (sans préfixe data:), prêt à être joint à un email. */
export async function elementToPdfBase64(elementId: string): Promise<string | null> {
  try {
    const pdf = await renderElementToPdf(elementId, true);
    return pdf ? pdf.output("datauristring").split(",")[1] ?? null : null;
  } catch (error) {
    console.error("Erreur lors de la génération du PDF à joindre:", error);
    return null;
  }
}
