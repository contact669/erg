import React, { useState } from "react";
import {
  QuoteData,
  QuoteLot,
  QuoteLineItem,
  TvaRate,
  LineUnit,
  PRESET_LOTS_TEMPLATES,
} from "./quote-types";
import { recalculateQuote } from "./quote-helpers";
import { CatalogModal } from "./catalog-modal";
import { CatalogItem } from "@/lib/price-catalog";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  Sparkles,
  Layers,
  Building2,
  User,
  MapPin,
  Calendar,
  CreditCard,
  FileCheck,
  Zap,
  BookOpen,
  AlertTriangle,
} from "lucide-react";
import { COMPANY } from "@/lib/company";
import { PaymentScheduleEditor } from "./payment-schedule-editor";
import { quoteSchedule } from "@/lib/crm/payment-schedule";

interface QuoteBuilderProps {
  quote: QuoteData;
  onChange: (updatedQuote: QuoteData) => void;
}

export function QuoteBuilder({ quote, onChange }: QuoteBuilderProps) {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [targetLotIdForCatalog, setTargetLotIdForCatalog] = useState<string | null>(null);
  const handleQuoteFieldChange = (field: keyof QuoteData, value: any) => {
    const updated = { ...quote, [field]: value };
    onChange(recalculateQuote(updated));
  };

  const handlePaymentTermChange = (field: "downPaymentPercent" | "midTermPercent" | "completionPercent", value: number) => {
    const updated = {
      ...quote,
      paymentTerms: {
        ...quote.paymentTerms,
        [field]: value,
      },
    };
    onChange(recalculateQuote(updated));
  };

  // Lot Management
  const addEmptyLot = () => {
    const newLot: QuoteLot = {
      id: `lot-${Date.now()}`,
      name: `Lot ${quote.lots.length + 1}. NOUVEAU LOT TECHNIQUE`,
      items: [],
      subtotalHT: 0,
    };
    const updated = { ...quote, lots: [...quote.lots, newLot] };
    onChange(recalculateQuote(updated));
  };

  const loadPresetTemplate = () => {
    const newLots: QuoteLot[] = PRESET_LOTS_TEMPLATES.map((tmpl, idx) => ({
      id: `lot-${Date.now()}-${idx}`,
      name: tmpl.name,
      items: tmpl.items.map((item, iIdx) => ({
        ...item,
        id: `item-${Date.now()}-${idx}-${iIdx}`,
        totalHT: item.quantity * item.unitPriceHT,
      })),
      subtotalHT: 0,
    }));

    const updated = { ...quote, lots: newLots };
    onChange(recalculateQuote(updated));
  };

  const addPresetLot = (presetIndex: number) => {
    const tmpl = PRESET_LOTS_TEMPLATES[presetIndex];
    if (!tmpl) return;

    const newLot: QuoteLot = {
      id: `lot-${Date.now()}`,
      name: tmpl.name,
      items: tmpl.items.map((item, iIdx) => ({
        ...item,
        id: `item-${Date.now()}-${iIdx}`,
        totalHT: item.quantity * item.unitPriceHT,
      })),
      subtotalHT: 0,
    };

    const updated = { ...quote, lots: [...quote.lots, newLot] };
    onChange(recalculateQuote(updated));
  };

  const updateLotName = (lotId: string, name: string) => {
    const updatedLots = quote.lots.map((lot) =>
      lot.id === lotId ? { ...lot, name } : lot
    );
    onChange(recalculateQuote({ ...quote, lots: updatedLots }));
  };

  const deleteLot = (lotId: string) => {
    const updatedLots = quote.lots.filter((lot) => lot.id !== lotId);
    onChange(recalculateQuote({ ...quote, lots: updatedLots }));
  };

  // Line Item Management
  const addLineItem = (lotId: string) => {
    const newItem: QuoteLineItem = {
      id: `item-${Date.now()}`,
      designation: "Nouvelle prestation de rénovation",
      unit: "U",
      quantity: 1,
      unitPriceHT: 100,
      tvaRate: 10,
      totalHT: 100,
    };

    const updatedLots = quote.lots.map((lot) => {
      if (lot.id === lotId) {
        return { ...lot, items: [...lot.items, newItem] };
      }
      return lot;
    });

    onChange(recalculateQuote({ ...quote, lots: updatedLots }));
  };

  const updateLineItem = (lotId: string, itemId: string, field: keyof QuoteLineItem, value: any) => {
    const updatedLots = quote.lots.map((lot) => {
      if (lot.id === lotId) {
        const updatedItems = lot.items.map((item) => {
          if (item.id === itemId) {
            return { ...item, [field]: value };
          }
          return item;
        });
        return { ...lot, items: updatedItems };
      }
      return lot;
    });

    onChange(recalculateQuote({ ...quote, lots: updatedLots }));
  };

  const openCatalogForLot = (lotId?: string) => {
    setTargetLotIdForCatalog(lotId || null);
    setIsCatalogOpen(true);
  };

  const handleSelectCatalogItem = (catalogItem: CatalogItem) => {
    const newItem: QuoteLineItem = {
      id: `item-${Date.now()}`,
      designation: catalogItem.designation,
      unit: catalogItem.unit,
      quantity: 1,
      unitPriceHT: catalogItem.unitPriceHT,
      tvaRate: catalogItem.tvaRate,
      totalHT: catalogItem.unitPriceHT,
    };

    let targetId = targetLotIdForCatalog;
    let updatedLots = [...quote.lots];

    if (!targetId) {
      if (updatedLots.length > 0) {
        targetId = updatedLots[updatedLots.length - 1].id;
      } else {
        const newLot: QuoteLot = {
          id: `lot-${Date.now()}`,
          name: `Lot ${updatedLots.length + 1}. ${catalogItem.category}`,
          items: [],
          subtotalHT: 0,
        };
        updatedLots.push(newLot);
        targetId = newLot.id;
      }
    }

    updatedLots = updatedLots.map((lot) => {
      if (lot.id === targetId) {
        return { ...lot, items: [...lot.items, newItem] };
      }
      return lot;
    });

    onChange(recalculateQuote({ ...quote, lots: updatedLots }));
  };

  const deleteLineItem = (lotId: string, itemId: string) => {
    const updatedLots = quote.lots.map((lot) => {
      if (lot.id === lotId) {
        return { ...lot, items: lot.items.filter((item) => item.id !== itemId) };
      }
      return lot;
    });

    onChange(recalculateQuote({ ...quote, lots: updatedLots }));
  };

  const formatEuro = (val: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(val);

  return (
    <div className="space-y-8">
      {/* HEADER INFORMATIONS DEVIS */}
      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/30 border-b pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-amber-600" />
                Informations du Devis BTP
              </CardTitle>
              <CardDescription>
                Renseignez le numéro, le statut et les informations du client et du chantier.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs uppercase tracking-wider font-semibold">
                N° {quote.number}
              </Badge>
              <Select
                value={quote.status}
                onValueChange={(val) => handleQuoteFieldChange("status", val)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Brouillon">Brouillon</SelectItem>
                  <SelectItem value="Envoyé">Envoyé</SelectItem>
                  <SelectItem value="Accepté">Accepté</SelectItem>
                  <SelectItem value="Refusé">Refusé</SelectItem>
                  <SelectItem value="Facturé">Facturé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {!COMPANY.decennale && (
            <div className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 print:hidden">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
              <p>
                <strong>Assurance décennale non renseignée.</strong> Sa mention (assureur, numéro de police, zone couverte) est
                obligatoire sur les devis du bâtiment. Ajoutez-la dans <code>src/lib/company.ts</code> avant d&apos;envoyer ce devis.
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase">
                Numéro de Devis
              </Label>
              <Input
                value={quote.number}
                onChange={(e) => handleQuoteFieldChange("number", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase">
                Date d'émission
              </Label>
              <div className="relative mt-1">
                <Input
                  type="date"
                  value={quote.date}
                  onChange={(e) => handleQuoteFieldChange("date", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase">
                Validité du devis (jours)
              </Label>
              <Input
                type="number"
                value={quote.validityDays}
                onChange={(e) => handleQuoteFieldChange("validityDays", parseInt(e.target.value) || 30)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            {/* CLIENT */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <User className="h-4 w-4 text-amber-600" /> Client (Maître d'Ouvrage)
              </h3>
              <div className="space-y-2">
                <Input
                  placeholder="Nom complet / Raison Sociale"
                  value={quote.clientName}
                  onChange={(e) => handleQuoteFieldChange("clientName", e.target.value)}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Email client"
                    type="email"
                    value={quote.clientEmail}
                    onChange={(e) => handleQuoteFieldChange("clientEmail", e.target.value)}
                  />
                  <Input
                    placeholder="Téléphone"
                    value={quote.clientPhone}
                    onChange={(e) => handleQuoteFieldChange("clientPhone", e.target.value)}
                  />
                </div>
                <Textarea
                  placeholder="Adresse de facturation du client"
                  rows={2}
                  value={quote.clientAddress}
                  onChange={(e) => handleQuoteFieldChange("clientAddress", e.target.value)}
                />
              </div>
            </div>

            {/* CHANTIER */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <MapPin className="h-4 w-4 text-amber-600" /> Adresse du Chantier & Accès
              </h3>
              <div className="space-y-2">
                <Input
                  placeholder="Intitulé du projet (ex: Rénovation globale 120m²)"
                  value={quote.projectTitle}
                  onChange={(e) => handleQuoteFieldChange("projectTitle", e.target.value)}
                />
                <Textarea
                  placeholder="Adresse exacte du chantier"
                  rows={2}
                  value={quote.siteAddress}
                  onChange={(e) => handleQuoteFieldChange("siteAddress", e.target.value)}
                />
                <Input
                  placeholder="Accès : étage, ascenseur, digicode, interphone"
                  value={quote.siteAccessDetails || ""}
                  onChange={(e) => handleQuoteFieldChange("siteAccessDetails", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-xs font-semibold text-muted-foreground uppercase">
              Description globale du projet
            </Label>
            <Textarea
              className="mt-1"
              rows={2}
              placeholder="Synthèse des prestations de rénovation commandées..."
              value={quote.projectDescription}
              onChange={(e) => handleQuoteFieldChange("projectDescription", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* QUICK PRESETS & LOT CREATION BAR */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-amber-950 text-white shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              Bibliothèque d'Ouvrages BTP & Modèles Rénovation
            </h3>
            <p className="text-xs text-slate-300">
              Gagnez du temps : insérez un modèle complet ou ajoutez des lots techniques spécifiques pré-chiffrés.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => openCatalogForLot()}
              className="bg-amber-600 hover:bg-amber-500 text-white font-bold gap-2 shadow-md"
              size="sm"
            >
              <BookOpen className="h-4 w-4" />
              Bibliothèque de Prix ERG
            </Button>
            <Button
              onClick={loadPresetTemplate}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 gap-2 font-semibold"
              size="sm"
            >
              <Zap className="h-4 w-4" />
              Charger Modèle BTP
            </Button>
            <Button
              onClick={addEmptyLot}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 gap-2"
              size="sm"
            >
              <Plus className="h-4 w-4" />
              Créer Lot Sur-Mesure
            </Button>
          </div>
        </div>

        {/* Quick Lot Chips */}
        <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-amber-400 font-semibold flex items-center gap-1">
            <Layers className="h-3.5 w-3.5" /> Insérer un Lot prédéfini :
          </span>
          {PRESET_LOTS_TEMPLATES.map((tmpl, idx) => (
            <button
              key={idx}
              onClick={() => addPresetLot(idx)}
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-amber-500/30 hover:border-amber-400 border border-white/10 transition-colors text-slate-200"
            >
              + {tmpl.name.split(".")[1]?.trim() || tmpl.name}
            </button>
          ))}
        </div>
      </div>

      {/* TECHNICAL LOTS SECTION */}
      <div className="space-y-6">
        {quote.lots.length === 0 ? (
          <Card className="border-dashed border-2 py-12 text-center text-muted-foreground space-y-4">
            <Layers className="h-12 w-12 mx-auto text-muted-foreground/50" />
            <div className="space-y-1">
              <h3 className="font-semibold text-lg text-foreground">Aucun lot technique dans ce devis</h3>
              <p className="text-sm max-w-md mx-auto">
                Cliquez sur "Charger Modèle Rénovation Complète" ci-dessus ou ajoutez votre premier lot sur-mesure pour commencer le chiffrage.
              </p>
            </div>
            <Button onClick={loadPresetTemplate} className="gap-2 bg-amber-600 hover:bg-amber-500">
              <Zap className="h-4 w-4" /> Charger un modèle type BTP
            </Button>
          </Card>
        ) : (
          quote.lots.map((lot, lIdx) => (
            <Card key={lot.id} className="border-border shadow-md overflow-hidden">
              <CardHeader className="bg-slate-900 text-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 flex items-center gap-3">
                  <span className="h-7 w-7 rounded-lg bg-amber-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    L{lIdx + 1}
                  </span>
                  <Input
                    value={lot.name}
                    onChange={(e) => updateLotName(lot.id, e.target.value)}
                    className="bg-slate-800/80 border-slate-700 text-white font-semibold text-sm h-9 focus-visible:ring-amber-500"
                  />
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Sous-Total Lot HT</span>
                    <span className="font-mono font-bold text-amber-400 text-sm">{formatEuro(lot.subtotalHT)}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteLot(lot.id)}
                    className="text-slate-400 hover:text-red-400 hover:bg-slate-800"
                    title="Supprimer ce lot"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-muted/40 text-muted-foreground border-b text-xs uppercase font-semibold">
                      <th className="py-2.5 px-4 w-[40%]">Désignation des ouvrages</th>
                      <th className="py-2.5 px-2 w-[10%] text-center">Unité</th>
                      <th className="py-2.5 px-2 w-[10%] text-right">Qté</th>
                      <th className="py-2.5 px-2 w-[14%] text-right">P.U. HT (€)</th>
                      <th className="py-2.5 px-2 w-[11%] text-center">TVA</th>
                      <th className="py-2.5 px-3 w-[15%] text-right">Total HT (€)</th>
                      <th className="py-2.5 px-2 w-[5%] text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {lot.items.map((item) => (
                      <tr key={item.id} className="hover:bg-muted/20 transition-colors group">
                        <td className="p-3">
                          <Textarea
                            value={item.designation}
                            onChange={(e) => updateLineItem(lot.id, item.id, "designation", e.target.value)}
                            rows={2}
                            className="text-xs resize-y min-h-[44px]"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <Select
                            value={item.unit}
                            onValueChange={(val) => updateLineItem(lot.id, item.id, "unit", val as LineUnit)}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="m²">m²</SelectItem>
                              <SelectItem value="m.l.">m.l.</SelectItem>
                              <SelectItem value="U">U</SelectItem>
                              <SelectItem value="Ens.">Ens.</SelectItem>
                              <SelectItem value="Forfait">Forfait</SelectItem>
                              <SelectItem value="h">h</SelectItem>
                              <SelectItem value="kg">kg</SelectItem>
                              <SelectItem value="m³">m³</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="p-2 text-right">
                          <Input
                            type="number"
                            step="0.1"
                            value={item.quantity}
                            onChange={(e) => updateLineItem(lot.id, item.id, "quantity", parseFloat(e.target.value) || 0)}
                            className="h-8 text-xs text-right font-mono"
                          />
                        </td>
                        <td className="p-2 text-right">
                          <Input
                            type="number"
                            step="0.01"
                            value={item.unitPriceHT}
                            onChange={(e) => updateLineItem(lot.id, item.id, "unitPriceHT", parseFloat(e.target.value) || 0)}
                            className="h-8 text-xs text-right font-mono"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <Select
                            value={item.tvaRate.toString()}
                            onValueChange={(val) => updateLineItem(lot.id, item.id, "tvaRate", parseFloat(val) as TvaRate)}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5.5">5.5% (Isolation/RGE)</SelectItem>
                              <SelectItem value="10">10% (Rénovation)</SelectItem>
                              <SelectItem value="20">20% (Neuf/Équipement)</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-slate-900 dark:text-slate-100">
                          {formatEuro(item.totalHT)}
                        </td>
                        <td className="p-2 text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteLineItem(lot.id, item.id)}
                            className="h-7 w-7 text-muted-foreground hover:text-red-500"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-3 bg-muted/20 border-t flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => addLineItem(lot.id)}
                      variant="outline"
                      size="sm"
                      className="text-xs gap-1.5 border-dashed"
                    >
                      <Plus className="h-3.5 w-3.5 text-amber-600" /> Ajouter un ouvrage vierge
                    </Button>
                    <Button
                      onClick={() => openCatalogForLot(lot.id)}
                      variant="outline"
                      size="sm"
                      className="text-xs gap-1.5 bg-amber-500/10 border-amber-300 text-amber-900 hover:bg-amber-500/20 font-bold"
                    >
                      <BookOpen className="h-3.5 w-3.5 text-amber-700" /> Insérer depuis le barème ERG
                    </Button>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {lot.items.length} ouvrage(s) dans ce lot
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* RECAPITULATIF FINANCIER & CONDITONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CONDITIONS & PAIEMENT */}
        <Card className="lg:col-span-2 border-border shadow-sm space-y-4">
          <CardHeader className="bg-muted/30 border-b pb-4">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-amber-600" />
              Conditions de Règlement & Notes Légales BTP
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="space-y-3">
              <Label className="text-xs font-semibold uppercase text-muted-foreground">
                Échéancier de règlement
              </Label>
              <PaymentScheduleEditor
                steps={quoteSchedule(quote)}
                totalTTC={quote.totalTTC}
                onChange={(schedule) => handleQuoteFieldChange("schedule", schedule)}
              />
            </div>

            <div>
              <Label className="text-xs font-semibold uppercase text-muted-foreground">
                Clauses Particulières & Garanties
              </Label>
              <Textarea
                rows={4}
                className="mt-1 text-xs"
                value={quote.notes}
                onChange={(e) => handleQuoteFieldChange("notes", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* RECAP TOTALS CARD */}
        <Card className="border-border shadow-md bg-slate-900 text-white flex flex-col justify-between">
          <CardHeader className="border-b border-white/10 pb-4">
            <CardTitle className="text-lg font-bold flex items-center justify-between">
              <span>Récapitulatif Financier</span>
              <Badge className="bg-amber-600 text-white">HT & TTC</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="py-6 space-y-4 font-mono">
            <div className="flex justify-between items-center text-sm text-slate-300">
              <span>Total Général HT :</span>
              <span className="text-base font-bold text-white">{formatEuro(quote.totalHT)}</span>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs text-slate-400">
              {quote.totalTVA55 > 0 && (
                <div className="flex justify-between items-center">
                  <span>TVA 5,5% (Isolation RGE) :</span>
                  <span className="text-slate-200">{formatEuro(quote.totalTVA55)}</span>
                </div>
              )}
              {quote.totalTVA10 > 0 && (
                <div className="flex justify-between items-center">
                  <span>TVA 10% (Rénovation) :</span>
                  <span className="text-slate-200">{formatEuro(quote.totalTVA10)}</span>
                </div>
              )}
              {quote.totalTVA20 > 0 && (
                <div className="flex justify-between items-center">
                  <span>TVA 20% (Matériel neuf) :</span>
                  <span className="text-slate-200">{formatEuro(quote.totalTVA20)}</span>
                </div>
              )}
              <div className="flex justify-between items-center font-bold text-slate-200 pt-1">
                <span>Total Cumulé TVA :</span>
                <span>{formatEuro(quote.totalTVA55 + quote.totalTVA10 + quote.totalTVA20)}</span>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-amber-500/50 flex justify-between items-end">
              <div>
                <span className="text-xs font-sans text-amber-400 font-bold uppercase tracking-wider block">
                  Montant Net TTC
                </span>
                <span className="text-2xl font-extrabold text-amber-400">{formatEuro(quote.totalTTC)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CATALOG SELECTOR MODAL */}
      <CatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onSelectItem={handleSelectCatalogItem}
      />
    </div>
  );
}
