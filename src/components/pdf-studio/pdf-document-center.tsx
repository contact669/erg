"use client";

import React, { useState } from "react";
import { DocumentType, SiteReportData, HandoverPVData } from "./pdf-types";
import { QuoteData } from "../quote-editor/quote-types";
import { createEmptyQuote } from "../quote-editor/quote-helpers";
import { createDefaultSiteReport, createDefaultHandoverPV } from "./pdf-helpers";

import { QuoteBuilder } from "../quote-editor/quote-builder";
import { QuotePreview } from "../quote-editor/quote-preview";
import { SiteReportPdf } from "./templates/site-report-pdf";
import { HandoverPvPdf } from "./templates/handover-pv-pdf";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Printer,
  Edit3,
  Eye,
  Construction,
  FileCheck,
  Receipt,
  Sparkles,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
} from "lucide-react";

import { useSearchParams } from "next/navigation";

import { SendDocumentModal } from "./send-document-modal";
import { Send, Download } from "lucide-react";

import { downloadElementAsPdf } from "@/lib/generate-pdf";

export function PdfDocumentCenter() {
  const searchParams = useSearchParams();
  const initialTypeParam = searchParams?.get("type");

  const parseDocType = (param: string | null): DocumentType => {
    if (!param) return "DEVIS";
    const u = param.toUpperCase();
    if (u === "FACTURE") return "FACTURE";
    if (u === "SUIVI" || u === "SUIVI_CHANTIER") return "SUIVI_CHANTIER";
    if (u === "PV" || u === "PV_RECEPTION") return "PV_RECEPTION";
    return "DEVIS";
  };

  const [docType, setDocType] = useState<DocumentType>(() => parseDocType(initialTypeParam));
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("preview");

  // State for each document model
  const [quoteData, setQuoteData] = useState<QuoteData>(() => createEmptyQuote());
  const [siteReportData, setSiteReportData] = useState<SiteReportData>(() => createDefaultSiteReport());
  const [pvData, setPvData] = useState<HandoverPVData>(() => createDefaultHandoverPV());

  const [isSaved, setIsSaved] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSimulateSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    let targetId = "quote-pdf-container";
    let filename = "Document_ERG_Renovation";

    if (docType === "DEVIS") {
      targetId = "quote-pdf-container";
      filename = `Devis_ERG_${quoteData.number || "DEV-2026-004"}`;
    } else if (docType === "FACTURE") {
      targetId = "quote-pdf-container";
      filename = `Facture_ERG_${quoteData.number || "FAC-2026-001"}`;
    } else if (docType === "SUIVI_CHANTIER") {
      targetId = "site-report-pdf-container";
      filename = `Suivi_Chantier_ERG_${siteReportData.reportNumber || "RAP-2026-003"}`;
    } else if (docType === "PV_RECEPTION") {
      targetId = "handover-pv-pdf-container";
      filename = `PV_Reception_ERG_${pvData.pvNumber || "PV-2026-001"}`;
    }

    await downloadElementAsPdf(targetId, filename);
    setIsDownloading(false);
  };

  const sendInfo = (() => {
    if (docType === "DEVIS") return { typeLabel: "Devis Officiel BTP", docNum: quoteData.number || "DEV-2026-004", clientName: quoteData.clientName, clientEmail: quoteData.clientEmail };
    if (docType === "FACTURE") return { typeLabel: "Facture d'Acompte / Travaux", docNum: quoteData.number || "FAC-2026-001", clientName: quoteData.clientName, clientEmail: quoteData.clientEmail };
    if (docType === "SUIVI_CHANTIER") return { typeLabel: "Rapport de Suivi de Chantier", docNum: siteReportData.reportNumber || "RAP-2026-003", clientName: siteReportData.clientName, clientEmail: "a.stgermain@gmail.com" };
    return { typeLabel: "Procès-Verbal de Réception", docNum: pvData.pvNumber || "PV-2026-001", clientName: pvData.clientName, clientEmail: "a.stgermain@gmail.com" };
  })();

  return (
    <div className="space-y-6 pb-16">
      {/* BRAND HEADER & DOCUMENT TYPE SWITCHER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-background border p-4 sm:p-6 rounded-2xl shadow-sm print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
            <Sparkles className="h-4 w-4" />
            <span>Studio Général d'Édition PDF Haute Définition</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            Centre de Documents & Édition PDF
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Générez des devis, factures, rapports de chantier et procès-verbaux de réception conformes aux normes BTP.
          </p>
        </div>

        {/* DOCUMENT TYPE SELECTOR CHIPS */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={() => {
              setDocType("DEVIS");
              setActiveTab("preview");
            }}
            variant={docType === "DEVIS" ? "default" : "outline"}
            className={docType === "DEVIS" ? "bg-amber-600 hover:bg-amber-500 font-bold" : "font-semibold"}
            size="sm"
          >
            <FileText className="mr-1.5 h-4 w-4" /> Devis Officiel
          </Button>

          <Button
            onClick={() => {
              setDocType("FACTURE");
              setActiveTab("preview");
            }}
            variant={docType === "FACTURE" ? "default" : "outline"}
            className={docType === "FACTURE" ? "bg-amber-600 hover:bg-amber-500 font-bold" : "font-semibold"}
            size="sm"
          >
            <Receipt className="mr-1.5 h-4 w-4" /> Factures & Acomptes
          </Button>

          <Button
            onClick={() => {
              setDocType("SUIVI_CHANTIER");
              setActiveTab("preview");
            }}
            variant={docType === "SUIVI_CHANTIER" ? "default" : "outline"}
            className={docType === "SUIVI_CHANTIER" ? "bg-emerald-600 hover:bg-emerald-500 font-bold" : "font-semibold"}
            size="sm"
          >
            <Construction className="mr-1.5 h-4 w-4" /> Suivi de Chantier
          </Button>

          <Button
            onClick={() => {
              setDocType("PV_RECEPTION");
              setActiveTab("preview");
            }}
            variant={docType === "PV_RECEPTION" ? "default" : "outline"}
            className={docType === "PV_RECEPTION" ? "bg-purple-600 hover:bg-purple-500 font-bold" : "font-semibold"}
            size="sm"
          >
            <FileCheck className="mr-1.5 h-4 w-4" /> PV de Réception
          </Button>
        </div>
      </div>

      {/* CONTROLS BAR: MODE EDIT vs PREVIEW */}
      <div className="flex items-center justify-between bg-muted/40 p-3 rounded-xl border border-border print:hidden">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-bold text-xs uppercase bg-background">
            Document actif : {docType.replace("_", " ")}
          </Badge>
          {isSaved && (
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" /> Document sauvegardé !
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-background border p-1 rounded-lg flex items-center gap-1 text-xs">
            <button
              onClick={() => setActiveTab("edit")}
              className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "edit"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Edit3 className="h-3.5 w-3.5" /> Éditer les Données
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "preview"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye className="h-3.5 w-3.5" /> Aperçu PDF A4
            </button>
          </div>

          <Button onClick={handleDownloadPdf} disabled={isDownloading} size="sm" className="gap-1.5 font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-sm">
            <Download className="h-4 w-4" /> {isDownloading ? "Génération PDF..." : "Télécharger PDF Direct (1-Clic)"}
          </Button>

          <Button onClick={() => setIsSendModalOpen(true)} size="sm" className="gap-1.5 font-bold bg-amber-600 hover:bg-amber-500 text-white">
            <Send className="h-4 w-4" /> Envoyer par Email
          </Button>

          <Button onClick={handleSimulateSave} size="sm" variant="ghost" className="gap-1.5 font-semibold text-xs">
            <Save className="h-3.5 w-3.5" /> Sauvegarder
          </Button>
        </div>
      </div>

      {/* DYNAMIC CONTENT SWITCHER */}
      {docType === "DEVIS" || docType === "FACTURE" ? (
        activeTab === "edit" ? (
          <QuoteBuilder quote={quoteData} onChange={(updated) => setQuoteData(updated)} />
        ) : (
          <QuotePreview quote={quoteData} onEditRequested={() => setActiveTab("edit")} />
        )
      ) : docType === "SUIVI_CHANTIER" ? (
        activeTab === "edit" ? (
          <Card className="border-border shadow-sm">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Construction className="h-5 w-5 text-emerald-600" /> Formulaire d'Édition — Rapport de Chantier
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs font-semibold uppercase text-muted-foreground">Numéro de Rapport</Label>
                  <Input
                    value={siteReportData.reportNumber}
                    onChange={(e) => setSiteReportData({ ...siteReportData, reportNumber: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase text-muted-foreground">Date d'Inspection</Label>
                  <Input
                    type="date"
                    value={siteReportData.date}
                    onChange={(e) => setSiteReportData({ ...siteReportData, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase text-muted-foreground">Conducteur de Travaux</Label>
                  <Input
                    value={siteReportData.siteManager}
                    onChange={(e) => setSiteReportData({ ...siteReportData, siteManager: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
                <div>
                  <Label className="text-xs font-semibold uppercase text-muted-foreground">Progression Globale (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={siteReportData.overallProgressPercent}
                    onChange={(e) => setSiteReportData({ ...siteReportData, overallProgressPercent: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase text-muted-foreground">Effectif sur Site</Label>
                  <Input
                    type="number"
                    value={siteReportData.workforceCount}
                    onChange={(e) => setSiteReportData({ ...siteReportData, workforceCount: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase text-muted-foreground">Conditions Météo</Label>
                  <Input
                    value={siteReportData.weatherConditions}
                    onChange={(e) => setSiteReportData({ ...siteReportData, weatherConditions: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2 border-t pt-4">
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Commentaires de Direction</Label>
                <Textarea
                  rows={3}
                  value={siteReportData.notesAndReserves}
                  onChange={(e) => setSiteReportData({ ...siteReportData, notesAndReserves: e.target.value })}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setActiveTab("preview")} className="bg-emerald-600 hover:bg-emerald-500 font-bold gap-2">
                  <Eye className="h-4 w-4" /> Générer Aperçu PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <SiteReportPdf data={siteReportData} onEditRequested={() => setActiveTab("edit")} />
        )
      ) : docType === "PV_RECEPTION" ? (
        activeTab === "edit" ? (
          <Card className="border-border shadow-sm">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-purple-600" /> Formulaire d'Édition — PV de Réception
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs font-semibold uppercase text-muted-foreground">Numéro de PV</Label>
                  <Input
                    value={pvData.pvNumber}
                    onChange={(e) => setPvData({ ...pvData, pvNumber: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase text-muted-foreground">Date de Réception</Label>
                  <Input
                    type="date"
                    value={pvData.date}
                    onChange={(e) => setPvData({ ...pvData, date: e.target.value, guaranteeStartDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase text-muted-foreground">Statut Réception</Label>
                  <select
                    value={pvData.acceptanceType}
                    onChange={(e) => setPvData({ ...pvData, acceptanceType: e.target.value as any })}
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  >
                    <option value="SANS_RESERVES">Sans Réserves</option>
                    <option value="AVEC_RESERVES">Avec Réserves</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <Label className="text-xs font-semibold uppercase text-muted-foreground">Client (Maître d'Ouvrage)</Label>
                  <Input
                    value={pvData.clientName}
                    onChange={(e) => setPvData({ ...pvData, clientName: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase text-muted-foreground">Adresse du Chantier</Label>
                  <Input
                    value={pvData.siteAddress}
                    onChange={(e) => setPvData({ ...pvData, siteAddress: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2 border-t pt-4">
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Observations & Clauses</Label>
                <Textarea
                  rows={3}
                  value={pvData.notes}
                  onChange={(e) => setPvData({ ...pvData, notes: e.target.value })}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setActiveTab("preview")} className="bg-purple-600 hover:bg-purple-500 font-bold gap-2">
                  <Eye className="h-4 w-4" /> Générer Aperçu PDF Officiel
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <HandoverPvPdf data={pvData} onEditRequested={() => setActiveTab("edit")} />
        )
      ) : null}

      <SendDocumentModal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        documentType={sendInfo.typeLabel}
        documentNumber={sendInfo.docNum}
        defaultClientName={sendInfo.clientName}
        defaultClientEmail={sendInfo.clientEmail}
      />
    </div>
  );
}
