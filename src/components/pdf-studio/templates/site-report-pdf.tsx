"use client";

import React, { useState } from "react";
import { SiteReportData } from "../pdf-types";
import { Button } from "@/components/ui/button";
import { Printer, ShieldCheck, CheckCircle2, AlertTriangle, Construction, UserCheck, Calendar, Download } from "lucide-react";
import { downloadElementAsPdf } from "@/lib/generate-pdf";

interface SiteReportPdfProps {
  data: SiteReportData;
  onEditRequested?: () => void;
}

export function SiteReportPdf({ data, onEditRequested }: SiteReportPdfProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDirectDownload = async () => {
    setIsDownloading(true);
    const fileName = `Rapport_Chantier_ERG_${data.reportNumber || "RAP-2026-001"}.pdf`;
    await downloadElementAsPdf("site-report-pdf-container", fileName);
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
          <div className="h-9 w-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Construction className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold text-sm block">Rapport de Suivi de Chantier & Audit Technique PDF</span>
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
              Modifier le rapport
            </Button>
          )}

          <Button
            onClick={handleDirectDownload}
            disabled={isDownloading}
            className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2 font-bold shadow-md"
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
        id="site-report-pdf-container"
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
              SIRET : 818 676 652 00019 — Email : contact@erg-renovation.fr — www.erg-renovation.fr
            </p>
          </div>

          <div className="text-right space-y-2 shrink-0">
            <div className="inline-block bg-emerald-500/10 border border-emerald-300 text-emerald-950 px-4 py-1.5 rounded-lg text-sm font-black tracking-wider uppercase">
              RAPPORT DE CHANTIER
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded inline-block">
                N° {data.reportNumber}
              </span>
            </div>
            <div className="text-xs text-slate-600 space-y-0.5 font-medium">
              <p>Date d'inspection : <span className="font-bold text-slate-900">{data.date}</span></p>
              <p>Conducteur : <span className="font-bold text-slate-900">{data.siteManager}</span></p>
            </div>
          </div>
        </div>

        {/* METADATA GRID */}
        <div className="grid grid-cols-2 gap-6 my-6 text-xs">
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-1">
            <h4 className="font-extrabold text-amber-900 uppercase tracking-wider text-[10px]">
              INFORMATIONS CHANTIER
            </h4>
            <p className="font-extrabold text-slate-900 text-sm pt-0.5">{data.projectTitle}</p>
            <p className="text-slate-700 leading-snug">{data.siteAddress}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-1">
            <h4 className="font-extrabold text-amber-900 uppercase tracking-wider text-[10px]">
              MAÎTRE D'OUVRAGE / CLIENT
            </h4>
            <p className="font-extrabold text-slate-900 text-sm pt-0.5">{data.clientName}</p>
            <p className="text-slate-700">Inspecté le {data.date} par <span className="font-bold text-slate-900">{data.siteManager}</span></p>
          </div>
        </div>

        {/* OVERALL PROGRESS & CONDITIONS SUMMARY */}
        <div className="mb-6 p-5 rounded-xl bg-slate-50 border border-slate-300 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-600 block font-bold">
                Avancement Global du Chantier
              </span>
              <span className="text-3xl font-black text-emerald-700 font-mono">
                {data.overallProgressPercent}% EFFECTUÉ
              </span>
            </div>
            <div className="text-right text-xs text-slate-700 space-y-0.5 font-medium">
              <p>Météo : <span className="font-bold text-slate-900">{data.weatherConditions}</span></p>
              <p>Effectif sur site : <span className="font-bold text-emerald-800">{data.workforceCount} artisans qualifiés</span></p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5 border border-slate-300">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${data.overallProgressPercent}%` }}
            />
          </div>

          {/* Safety Checklist */}
          <div className="pt-1 flex flex-wrap items-center gap-4 text-[11px] text-slate-700 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className={`h-4 w-4 ${data.safetyCheck.protectionPartiesCommunes ? 'text-emerald-600' : 'text-slate-400'}`} />
              Protection des parties communes OK
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className={`h-4 w-4 ${data.safetyCheck.evacuationDechets ? 'text-emerald-600' : 'text-slate-400'}`} />
              Évacuation des déchets OK
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className={`h-4 w-4 ${data.safetyCheck.conformiteEPI ? 'text-emerald-600' : 'text-slate-400'}`} />
              Conformité sécurité EPI OK
            </span>
          </div>
        </div>

        {/* LOTS PROGRESS TABLE */}
        <div className="mb-6 space-y-2.5">
          <h3 className="font-extrabold text-amber-900 text-xs uppercase tracking-wider">
            AVANCEMENT PAR LOT TECHNIQUE
          </h3>
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3 w-[35%]">Lot Technique</th>
                  <th className="py-2.5 px-3 w-[20%]">Progression</th>
                  <th className="py-2.5 px-2 w-[15%] text-center">Statut</th>
                  <th className="py-2.5 px-3 w-[30%]">Observations & Détails</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.lotsProgress.map((lot, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="py-2.5 px-3 font-bold text-slate-900 align-top">{lot.lotName}</td>
                    <td className="py-2.5 px-3 align-top">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-800">
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden shrink-0 max-w-[70px]">
                          <div
                            className="bg-emerald-600 h-full rounded-full"
                            style={{ width: `${lot.progressPercent}%` }}
                          />
                        </div>
                        <span>{lot.progressPercent}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-2 text-center align-top">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        lot.status === 'Terminé' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {lot.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 text-[11px] leading-relaxed align-top">{lot.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MILESTONES & NEXT STEPS GRID */}
        <div className="grid grid-cols-2 gap-6 my-6 text-xs break-inside-avoid">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-2">
            <h4 className="font-extrabold text-emerald-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" /> ÉTAPES DE CHANTIER VALIDÉES
            </h4>
            <ul className="space-y-1 text-slate-700 list-disc list-inside text-[11px]">
              {data.keyMilestonesCompleted.map((m, idx) => (
                <li key={idx} className="leading-snug">{m}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-2">
            <h4 className="font-extrabold text-amber-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <Construction className="h-3.5 w-3.5 text-amber-700" /> PLANNING DE LA SEMAINE PROCHAINE
            </h4>
            <ul className="space-y-1 text-slate-700 list-disc list-inside text-[11px]">
              {data.nextWeekPlan.map((p, idx) => (
                <li key={idx} className="leading-snug">{p}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* NOTES & SIGNATURES */}
        {data.notesAndReserves && (
          <div className="mb-6 p-3.5 rounded-xl border border-slate-200 text-[11px] text-slate-700 leading-relaxed bg-slate-50/50 break-inside-avoid">
            <span className="font-bold text-slate-900 block mb-0.5">Commentaires de la Direction de Chantier :</span>
            {data.notesAndReserves}
          </div>
        )}

        <div className="border border-slate-300 bg-slate-50/40 rounded-xl p-5 my-6 grid grid-cols-2 gap-6 text-xs break-inside-avoid">
          <div className="space-y-2">
            <p className="font-black text-slate-900 uppercase tracking-wide text-[11px]">LE CONDUCTEUR DE TRAVAUX</p>
            <p className="text-slate-700 font-bold">{data.siteManager}</p>
            <div className="h-12 border-b border-dashed border-slate-400 flex items-end pb-1 text-slate-400 italic text-[10px]">
              [ Visé et validé sur site ]
            </div>
          </div>

          <div className="space-y-2 border-l border-slate-200 pl-6">
            <p className="font-black text-slate-900 uppercase tracking-wide text-[11px]">LE MAÎTRE D'OUVRAGE</p>
            <p className="text-slate-700 font-bold">{data.clientName}</p>
            <div className="h-12 border-b border-dashed border-slate-400 flex items-end pb-1 text-slate-400 italic text-[10px]">
              [ Prise de connaissance du rapport ]
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center text-[10px] text-slate-500 border-t border-slate-200 pt-3 font-medium">
          ERG Rénovation — Audit de chantier certifié — Suivi Qualité & Respect du Planning
        </div>
      </div>
    </div>
  );
}
