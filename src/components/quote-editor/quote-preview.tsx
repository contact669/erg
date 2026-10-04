"use client";

import React, { useState } from "react";
import { QuoteData } from "./quote-types";
import { sanitizeProjectDescription } from "./quote-helpers";
import { Button } from "@/components/ui/button";
import { Printer, ShieldCheck, Download, Award, FileText, CheckCircle2, Building } from "lucide-react";

import { downloadElementAsPdf } from "@/lib/generate-pdf";

interface QuotePreviewProps {
  quote: QuoteData;
  onEditRequested?: () => void;
}

export function QuotePreview({ quote, onEditRequested }: QuotePreviewProps) {
  const [docType, setDocType] = useState<"DEVIS" | "FACTURE" | "ACOMPTE">("DEVIS");
  const [isDownloading, setIsDownloading] = useState(false);

  const formatEuro = (val: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(val);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `${docType === "DEVIS" ? "Devis" : "Facture"}_ERG_${getDocRefPrefix()}`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  const handleDirectDownload = async () => {
    setIsDownloading(true);
    const fileName = `${docType === "DEVIS" ? "Devis" : "Facture"}_ERG_${getDocRefPrefix()}.pdf`;
    await downloadElementAsPdf("quote-pdf-container", fileName);
    setIsDownloading(false);
  };

  const getDocTitle = () => {
    switch (docType) {
      case "FACTURE":
        return "FACTURE DE TRAVAUX";
      case "ACOMPTE":
        return "FACTURE D'ACOMPTE (30%)";
      default:
        return "DEVIS DES TRAVAUX";
    }
  };

  const getDocRefPrefix = () => {
    switch (docType) {
      case "FACTURE":
        return quote.number.replace("DEV-", "FAC-");
      case "ACOMPTE":
        return quote.number.replace("DEV-", "FAC-AC-");
      default:
        return quote.number;
    }
  };

  return (
    <div className="space-y-6">
      {/* ACTION & TYPE SWITCHER BAR (hidden on print) */}
      <div className="print:hidden flex flex-col md:flex-row items-center justify-between bg-slate-900 text-white p-4 rounded-xl shadow-lg gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold text-sm block">Aperçu PDF Épuré & Impression Haute Définition</span>
            <span className="text-xs text-slate-400">Rendu clair, sans fond foncé ni chevauchement — Conforme BTP & Code du Commerce</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Document Type Switcher */}
          <div className="bg-slate-800 p-1 rounded-lg flex items-center gap-1 text-xs border border-slate-700">
            <button
              onClick={() => setDocType("DEVIS")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                docType === "DEVIS" ? "bg-amber-600 text-white shadow" : "text-slate-300 hover:text-white"
              }`}
            >
              Devis Officiel
            </button>
            <button
              onClick={() => setDocType("ACOMPTE")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                docType === "ACOMPTE" ? "bg-amber-600 text-white shadow" : "text-slate-300 hover:text-white"
              }`}
            >
              Facture Acompte
            </button>
            <button
              onClick={() => setDocType("FACTURE")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                docType === "FACTURE" ? "bg-amber-600 text-white shadow" : "text-slate-300 hover:text-white"
              }`}
            >
              Facture Solde
            </button>
          </div>

          {onEditRequested && (
            <Button
              variant="outline"
              size="sm"
              onClick={onEditRequested}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              Modifier le chiffrage
            </Button>
          )}

          <Button
            onClick={handleDirectDownload}
            disabled={isDownloading}
            className="bg-amber-600 hover:bg-amber-500 text-white gap-2 font-bold shadow-md"
            size="sm"
          >
            <Download className="h-4 w-4" /> {isDownloading ? "Génération PDF..." : "Télécharger PDF Direct (1-Clic)"}
          </Button>

          <Button
            onClick={handlePrint}
            variant="outline"
            className="bg-slate-800 hover:bg-slate-700 text-white border-slate-700 gap-2 text-xs"
            size="sm"
          >
            <Printer className="h-3.5 w-3.5" /> Imprimer
          </Button>
        </div>
      </div>

      {/* MINIMALIST & SLEEK PDF DOCUMENT CANVAS */}
      <div
        id="quote-pdf-container"
        className="bg-white text-slate-900 p-8 sm:p-12 rounded-xl border border-slate-200 shadow-xl print:shadow-none print:border-none print:p-0 max-w-4xl mx-auto font-sans print:max-w-none relative"
      >
        {/* DOCUMENT HEADER */}
        <div className="flex flex-row justify-between items-start border-b border-slate-300 pb-6 gap-6">
          {/* Company Identity */}
          <div className="space-y-2.5 max-w-md">
            <img
              src="/images/logo-erg.webp"
              alt="ERG Rénovation Logo"
              className="h-20 sm:h-22 w-auto max-w-[280px] object-contain shrink-0"
            />

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              <strong className="text-slate-900 font-bold">ERG Rénovation</strong> — Entreprise Générale de Rénovation<br />
              1 sentier de la Pointe, 75020 PARIS<br />
              Tél : 06 99 96 13 75 / 09 80 93 84 18 — Email : contact@erg-renovation.fr<br />
              RCS PARIS 818 676 652 — SIRET : 818 676 652 00019 — Site : www.erg-renovation.fr
            </p>

            {/* Quality Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-900">
                <ShieldCheck className="h-3 w-3 text-amber-700" />
                Décennale AXA N° AXA-BTP-9847291
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700">
                <Award className="h-3 w-3 text-amber-600" />
                Certifié RGE Qualibat
              </span>
            </div>
          </div>

          {/* Document Title & Number Header */}
          <div className="text-right space-y-2 shrink-0">
            <div className="inline-block bg-amber-500/10 border border-amber-300 text-amber-950 px-4 py-1.5 rounded-lg text-sm font-black tracking-wider uppercase">
              {getDocTitle()}
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded inline-block">
                N° {getDocRefPrefix()}
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-0.5 font-medium">
              <p>Date d'émission : <span className="font-bold text-slate-900">{quote.date}</span></p>
              {docType === "DEVIS" && (
                <p>Validité de l'offre : <span className="font-bold text-slate-900">{quote.validityDays} jours</span></p>
              )}
              <p>Statut : <span className="font-bold uppercase text-amber-800">{quote.status}</span></p>
            </div>
          </div>
        </div>

        {/* CLIENT & SITE METADATA GRID */}
        <div className="grid grid-cols-2 gap-6 my-6 text-xs">
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-1">
            <h4 className="font-extrabold text-amber-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <Building className="h-3.5 w-3.5 text-amber-700" /> MAÎTRE D'OUVRAGE / CLIENT
            </h4>
            <p className="font-extrabold text-slate-900 text-sm pt-0.5">{quote.clientName}</p>
            {quote.clientAddress && <p className="text-slate-700 leading-snug whitespace-pre-wrap">{quote.clientAddress}</p>}
            {quote.clientEmail && <p className="text-slate-600">Email : <span className="font-semibold text-slate-900">{quote.clientEmail}</span></p>}
            {quote.clientPhone && <p className="text-slate-600">Tél : <span className="font-semibold text-slate-900">{quote.clientPhone}</span></p>}
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-1">
            <h4 className="font-extrabold text-amber-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-amber-700" /> ADRESSE DU CHANTIER & ACCÈS
            </h4>
            <p className="font-extrabold text-slate-900 text-sm pt-0.5">{quote.projectTitle}</p>
            <p className="text-slate-700 leading-snug whitespace-pre-wrap">{quote.siteAddress}</p>
            {quote.siteAccessDetails && (
              <p className="text-slate-500 italic pt-1 border-t border-slate-200 text-[11px]">
                Accès chantier : {quote.siteAccessDetails}
              </p>
            )}
          </div>
        </div>

        {/* PROJECT DESCRIPTION */}
        {quote.projectDescription && (
          <div className="mb-6 p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/80 text-xs text-slate-800 leading-relaxed">
            <strong className="font-bold text-amber-950 block mb-0.5">Descriptif des travaux :</strong>
            {sanitizeProjectDescription(quote.projectDescription)}
          </div>
        )}

        {/* TABLE OF TECHNICAL LOTS & ITEMS */}
        <div className="space-y-5 mb-6">
          {quote.lots.map((lot) => (
            <div key={lot.id} className="border border-slate-200 rounded-xl overflow-hidden shadow-xs break-inside-avoid">
              {/* Lot Header */}
              <div className="bg-slate-100 text-slate-900 px-4 py-2 flex justify-between items-center text-xs font-bold border-b border-slate-200">
                <span className="uppercase tracking-wider text-amber-900 font-extrabold">{lot.name}</span>
                <span className="font-mono text-slate-900">Sous-total Lot HT : {formatEuro(lot.subtotalHT)}</span>
              </div>

              {/* Items Table */}
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3 w-[48%]">Désignation des prestations & ouvrages</th>
                    <th className="py-2.5 px-2 w-[8%] text-center">Unité</th>
                    <th className="py-2.5 px-2 w-[8%] text-right">Qté</th>
                    <th className="py-2.5 px-2 w-[12%] text-right">P.U. HT</th>
                    <th className="py-2.5 px-2 w-[8%] text-center">TVA</th>
                    <th className="py-2.5 px-3 w-[16%] text-right">Total HT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lot.items.map((item) => (
                    <tr key={item.id} className="text-slate-800 hover:bg-slate-50/60 transition-colors">
                      <td className="py-2.5 px-3 leading-relaxed whitespace-pre-wrap font-medium align-top">
                        {item.designation}
                      </td>
                      <td className="py-2.5 px-2 text-center text-slate-500 font-mono align-top">{item.unit}</td>
                      <td className="py-2.5 px-2 text-right font-mono align-top">{item.quantity}</td>
                      <td className="py-2.5 px-2 text-right font-mono align-top">{formatEuro(item.unitPriceHT)}</td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-500 align-top">{item.tvaRate}%</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 align-top">
                        {formatEuro(item.totalHT)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* FINANCIAL SUMMARY & PAYMENT TERMS GRID */}
        <div className="grid grid-cols-2 gap-6 my-6 text-xs break-inside-avoid">
          {/* Payment Schedule Breakdown */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-2.5">
            <h4 className="font-extrabold text-amber-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-700" /> ÉCHÉANCIER DE RÈGLEMENT
            </h4>
            <div className="space-y-1.5 text-slate-700 text-xs">
              <div className="flex justify-between items-center pb-1 border-b border-slate-200">
                <span>1. Acompte à la commande ({quote.paymentTerms.downPaymentPercent}%) :</span>
                <span className="font-mono font-bold text-slate-900">
                  {formatEuro((quote.totalTTC * quote.paymentTerms.downPaymentPercent) / 100)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-1 border-b border-slate-200">
                <span>2. Avancement du chantier ({quote.paymentTerms.midTermPercent}%) :</span>
                <span className="font-mono font-bold text-slate-900">
                  {formatEuro((quote.totalTTC * quote.paymentTerms.midTermPercent) / 100)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>3. Solde à la réception ({quote.paymentTerms.completionPercent}%) :</span>
                <span className="font-mono font-bold text-slate-900">
                  {formatEuro((quote.totalTTC * quote.paymentTerms.completionPercent) / 100)}
                </span>
              </div>
            </div>

            {/* IBAN details */}
            <div className="p-2 rounded bg-white border border-slate-200 text-[10px] space-y-0.5 font-mono text-slate-600">
              <p className="font-sans font-bold text-slate-900 text-[10px]">Coordonnées bancaires virement :</p>
              <p>IBAN : <span className="font-bold text-slate-900">FR76 3000 4012 3456 7890 1234 567</span></p>
              <p>BIC : <span className="font-bold text-slate-900">BNPAFRPPXXX</span> (BNP Paribas Paris)</p>
            </div>
          </div>

          {/* Financial Totals Card */}
          <div className="p-4 rounded-xl border border-slate-300 bg-white space-y-3 flex flex-col justify-between shadow-xs">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-slate-700">
                <span className="font-bold text-xs uppercase tracking-wider">TOTAL GÉNÉRAL HT :</span>
                <span className="font-mono text-base font-bold text-slate-900">{formatEuro(quote.totalHT)}</span>
              </div>

              <div className="space-y-1 text-slate-600 text-[11px] pt-2 border-t border-slate-200">
                {quote.totalTVA55 > 0 && (
                  <div className="flex justify-between">
                    <span>TVA 5,5% (Isolation RGE) :</span>
                    <span className="font-mono text-slate-900">{formatEuro(quote.totalTVA55)}</span>
                  </div>
                )}
                {quote.totalTVA10 > 0 && (
                  <div className="flex justify-between">
                    <span>TVA 10% (Rénovation) :</span>
                    <span className="font-mono text-slate-900">{formatEuro(quote.totalTVA10)}</span>
                  </div>
                )}
                {quote.totalTVA20 > 0 && (
                  <div className="flex justify-between">
                    <span>TVA 20% (Neuf / Équipements) :</span>
                    <span className="font-mono text-slate-900">{formatEuro(quote.totalTVA20)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-lg border border-amber-300 flex justify-between items-center text-amber-950">
              <span className="font-black uppercase tracking-wider text-xs">TOTAL NET TTC :</span>
              <span className="font-mono text-2xl font-black text-amber-900">{formatEuro(quote.totalTTC)}</span>
            </div>
          </div>
        </div>

        {/* NOTES & LEGAL CLAUSES */}
        {quote.notes && (
          <div className="mb-6 p-3.5 rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed bg-slate-50/50 break-inside-avoid">
            <span className="font-bold text-slate-900 block mb-0.5">Conditions d'exécution & Garanties BTP :</span>
            {quote.notes}
          </div>
        )}

        {/* CLIENT SIGNATURE & APPROVAL BOX */}
        <div className="border border-slate-300 bg-slate-50/40 rounded-xl p-5 my-6 grid grid-cols-2 gap-6 text-xs break-inside-avoid">
          <div className="space-y-2">
            <p className="font-black text-slate-900 uppercase tracking-wide text-[11px]">POUR ERG RÉNOVATION</p>
            <div className="h-14 flex items-center text-slate-400 italic text-[11px]">
              [ Cachet entreprise & signature direction ]
            </div>
            <p className="text-[10px] text-slate-500">Document certifié conforme émis le {quote.date}</p>
          </div>

          <div className="space-y-2 border-l border-slate-200 pl-6">
            <p className="font-black text-slate-900 uppercase tracking-wide text-[11px]">BON POUR ACCORD ET ACCEPTATION DU DEVIS</p>
            <p className="text-[10px] text-slate-500 italic">
              Mention manuscrite obligatoire : "Bon pour accord et acceptation des travaux"
            </p>
            <div className="h-10 border-b border-dashed border-slate-400"></div>
            <div className="flex justify-between text-[10px] text-slate-600 pt-0.5">
              <span>Date : ____ / ____ / 2026</span>
              <span>Signature du client :</span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center text-[10px] text-slate-500 border-t border-slate-200 pt-3 font-medium">
          ERG Rénovation — RCS PARIS 818 676 652 — 1 sentier de la Pointe 75020 PARIS — Tél: 06 99 96 13 75 — www.erg-renovation.fr
        </div>
      </div>
    </div>
  );
}
