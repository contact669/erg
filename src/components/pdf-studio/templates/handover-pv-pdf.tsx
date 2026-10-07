"use client";

import React, { useState } from "react";
import { HandoverPVData } from "../pdf-types";
import { Button } from "@/components/ui/button";
import { Printer, ShieldCheck, CheckCircle2, AlertCircle, FileCheck, Download } from "lucide-react";
import { downloadElementAsPdf } from "@/lib/generate-pdf";

interface HandoverPvPdfProps {
  data: HandoverPVData;
  onEditRequested?: () => void;
}

export function HandoverPvPdf({ data, onEditRequested }: HandoverPvPdfProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDirectDownload = async () => {
    setIsDownloading(true);
    const fileName = `PV_Reception_ERG_${data.pvNumber || "PV-2026-001"}.pdf`;
    await downloadElementAsPdf("handover-pv-pdf-container", fileName);
    setIsDownloading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* ACTION BAR (hidden on print) */}
      <div className="print:hidden flex flex-col md:flex-row items-center justify-between bg-slate-900 text-white p-4 rounded-xl shadow-lg gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <FileCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold text-sm block">Procès-Verbal de Réception de Chantier (PV Officiel)</span>
            <span className="text-xs text-slate-400 font-medium">Rendu épuré, clair, sans fond foncé ni chevauchement</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {onEditRequested && (
            <Button
              variant="outline"
              size="sm"
              onClick={onEditRequested}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              Modifier le PV
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

      {/* A4 DOCUMENT CANVAS */}
      <div
        id="handover-pv-pdf-container"
        className="bg-white text-slate-900 p-8 sm:p-12 rounded-xl border border-slate-200 shadow-xl print:shadow-none print:border-none print:p-0 max-w-4xl mx-auto font-sans print:max-w-none relative"
      >
        {/* HEADER */}
        <div className="flex justify-between items-start border-b border-slate-300 pb-6 gap-6">
          <div className="space-y-2.5 max-w-md">
            <img
              src="/images/logo-erg.webp"
              alt="ERG Rénovation Logo"
              className="h-20 sm:h-22 w-auto max-w-[280px] object-contain shrink-0"
            />
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              <strong className="text-slate-900 font-bold">ERG Rénovation</strong> — Entreprise Générale de Rénovation<br />
              1 sentier de la Pointe, 75020 PARIS — Tél : 06 99 96 13 75 / 09 80 93 84 18<br />
              SIRET : 818 676 652 00014 — Email : contact@erg-renovation.fr — www.erg-renovation.fr
            </p>
          </div>

          <div className="text-right space-y-2 shrink-0">
            <div className="inline-block bg-amber-500/10 border border-amber-300 text-amber-950 px-4 py-1.5 rounded-lg text-sm font-black tracking-wider uppercase">
              PROCÈS-VERBAL DE RÉCEPTION
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded inline-block">
                N° {data.pvNumber}
              </span>
            </div>
            <div className="text-xs text-slate-600 space-y-0.5 font-medium">
              <p>Date de Réception : <span className="font-bold text-slate-900">{data.date}</span></p>
              <p>Point de départ Garanties : <span className="font-bold text-slate-900">{data.guaranteeStartDate}</span></p>
            </div>
          </div>
        </div>

        {/* METADATA GRID */}
        <div className="grid grid-cols-2 gap-6 my-6 text-xs">
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-1">
            <h4 className="font-extrabold text-amber-900 uppercase tracking-wider text-[10px]">
              MAÎTRE D'OUVRAGE (LE CLIENT)
            </h4>
            <p className="font-extrabold text-slate-900 text-sm pt-0.5">{data.clientName}</p>
            <p className="text-slate-700 leading-snug">{data.clientAddress}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-1">
            <h4 className="font-extrabold text-amber-900 uppercase tracking-wider text-[10px]">
              ENTREPRISE / MAÎTRE D'ŒUVRE
            </h4>
            <p className="font-extrabold text-slate-900 text-sm pt-0.5">{data.contractorName}</p>
            <p className="text-slate-700">{data.decennaleRef}</p>
          </div>
        </div>

        {/* SITE & DECISION DECLARATION */}
        <div className="mb-6 p-5 rounded-xl bg-slate-50 border border-slate-300 space-y-3">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-amber-900 font-extrabold block">
              Déclaration Formelle de Réception des Travaux
            </span>
            <p className="text-xs leading-relaxed text-slate-800">
              Le Maître d'Ouvrage soussigné, après avoir procédé à la visite contradictoire des lieux situés au :<br />
              <strong className="text-slate-900 underline">{data.siteAddress}</strong> pour le projet <strong className="text-slate-900 font-bold">{data.projectTitle}</strong>, déclare prononcer la réception des travaux.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-200 text-xs font-semibold">
            <span className="text-slate-700">Statut de la Réception :</span>
            {data.acceptanceType === 'SANS_RESERVES' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-black uppercase text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" /> RÉCEPTION SANS RÉSERVES
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300 font-black uppercase text-xs">
                <AlertCircle className="h-4 w-4 text-amber-700" /> RÉCEPTION AVEC RÉSERVES ({data.reservesCount})
              </span>
            )}
          </div>
        </div>

        {/* RESERVES TABLE IF ANY */}
        {data.acceptanceType === 'AVEC_RESERVES' && data.reservesList.length > 0 && (
          <div className="mb-6 space-y-2.5">
            <h3 className="font-extrabold text-amber-900 text-xs uppercase tracking-wider">
              LISTE CONTRADICTOIRE DES RÉSERVES À LEVER
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3 w-[10%] text-center">N°</th>
                    <th className="py-2.5 px-3 w-[25%]">Lot Concerné</th>
                    <th className="py-2.5 px-3 w-[45%]">Description de la Réserve</th>
                    <th className="py-2.5 px-3 w-[20%] text-center">Délai de Levée</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.reservesList.map((res, idx) => (
                    <tr key={res.id} className="hover:bg-slate-50/60">
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-900 align-top">R{idx + 1}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-800 align-top">{res.lot}</td>
                      <td className="py-2.5 px-3 text-slate-700 font-medium leading-relaxed align-top">{res.description}</td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-900 bg-amber-50/50 align-top">
                        {res.deadline}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* LEGAL GUARANTEES NOTICE */}
        <div className="mb-6 p-4 rounded-xl border border-slate-200 bg-slate-50/80 text-xs space-y-1.5 text-slate-700 leading-relaxed">
          <h4 className="font-extrabold text-amber-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-amber-700" />
            GARANTIES LÉGALES APPLICABLES À COMPTER DU {data.guaranteeStartDate}
          </h4>
          <ul className="space-y-1 text-[11px] list-disc list-inside">
            <li><strong>Garantie de Parfait Achèvement (Art. 1792-6 du Code Civil) :</strong> Couverture de tous désordres ou imperfections pendant 1 an.</li>
            <li><strong>Garantie de Bon Fonctionnement (Garantie Biennale - Art. 1792-3) :</strong> Couverture des équipements dissociables pendant 2 ans.</li>
            <li><strong>Garantie Décennale (Art. 1792 du Code Civil) :</strong> Couverture des dommages compromettant la solidité de l'ouvrage pendant 10 ans via <strong>{data.decennaleRef}</strong>.</li>
          </ul>
        </div>

        {/* NOTES */}
        {data.notes && (
          <div className="mb-6 p-3.5 rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed bg-slate-50/50">
            <span className="font-bold text-slate-900 block mb-0.5">Observations particulières :</span>
            {data.notes}
          </div>
        )}

        {/* SIGNATURES */}
        <div className="border border-slate-300 bg-slate-50/40 rounded-xl p-5 my-6 grid grid-cols-2 gap-6 text-xs break-inside-avoid">
          <div className="space-y-2">
            <p className="font-black text-slate-900 uppercase tracking-wide text-[11px]">POUR ERG RÉNOVATION</p>
            <div className="h-14 flex items-center text-slate-400 italic text-[11px]">
              [ Cachet entreprise & signature direction ]
            </div>
            <p className="text-[10px] text-slate-500">Signé le {data.date}</p>
          </div>

          <div className="space-y-2 border-l border-slate-200 pl-6">
            <p className="font-black text-slate-900 uppercase tracking-wide text-[11px]">LE MAÎTRE D'OUVRAGE (LE CLIENT)</p>
            <p className="text-[10px] text-slate-500 italic">
              Mention manuscrite obligatoire : "Lu et approuvé, bon pour réception"
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
          ERG Rénovation — RCS PARIS 818 676 652 — 1 sentier de la Pointe 75020 PARIS — Procès-Verbal Officiel de Réception
        </div>
      </div>
    </div>
  );
}
