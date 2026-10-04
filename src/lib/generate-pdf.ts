import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Capture un élément HTML du DOM et le télécharge directement au format PDF HD (1-clic)
 */
export async function downloadElementAsPdf(
  elementId: string,
  fileName: string = "Document_ERG_Renovation.pdf"
): Promise<boolean> {
  try {
    const targetElement = document.getElementById(elementId);
    if (!targetElement) {
      console.error(`Élément introuvable avec l'ID '${elementId}'`);
      return false;
    }

    // Capture du canvas en haute densité (2x retina scale) avec réinitialisation des décalages de défilement
    const canvas = await html2canvas(targetElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
    });

    const imgData = canvas.toDataURL("image/png");

    // Format A4 ISO standard (210mm x 297mm)
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calcul de la hauteur relative en mm
    const imgHeightMm = (canvasHeight * pdfWidth) / canvasWidth;

    if (imgHeightMm <= pdfHeight) {
      // 1 seule page A4
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeightMm);
    } else {
      // Gestion multipages automatique
      let heightLeft = imgHeightMm;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeightMm);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeightMm);
        heightLeft -= pdfHeight;
      }
    }

    const finalFileName = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;
    pdf.save(finalFileName);
    return true;
  } catch (error) {
    console.error("Erreur lors de la génération directe du PDF:", error);
    return false;
  }
}
