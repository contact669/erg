"use client";

import { useState } from "react";
import { Download, FileSpreadsheet } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { downloadCsv, invoicesCsv, paymentsCsv, type ExportableInvoice } from "@/lib/crm/accounting-export";

const iso = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

/** Common periods: last month, current quarter, current year. */
function presets(now = new Date()) {
  const y = now.getFullYear();
  const m = now.getMonth();
  const q = Math.floor(m / 3) * 3;
  return [
    { label: "Mois dernier", from: iso(new Date(y, m - 1, 1)), to: iso(new Date(y, m, 0)) },
    { label: "Trimestre en cours", from: iso(new Date(y, q, 1)), to: iso(new Date(y, q + 3, 0)) },
    { label: "Trimestre précédent", from: iso(new Date(y, q - 3, 1)), to: iso(new Date(y, q, 0)) },
    { label: `Année ${y}`, from: `${y}-01-01`, to: `${y}-12-31` },
  ];
}

export function AccountingExportDialog({ invoices }: { invoices: ExportableInvoice[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [from, setFrom] = useState(() => presets()[0].from);
  const [to, setTo] = useState(() => presets()[0].to);

  const inPeriod = invoices.filter((invoice) => invoice.date >= from && invoice.date <= to).length;
  const suffix = `${from}_${to}`;

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)} className="font-semibold">
        <FileSpreadsheet className="mr-2 h-4 w-4 text-emerald-600" /> Export comptable
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[480px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Export pour le comptable</DialogTitle>
            <DialogDescription className="text-xs">
              Fichiers CSV qui s'ouvrent dans Excel : factures et avoirs émis sur la période (HT, TVA par taux, TTC), et paiements reçus.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex flex-wrap gap-2">
              {presets().map((preset) => (
                <Button
                  key={preset.label}
                  size="sm"
                  variant={preset.from === from && preset.to === to ? "default" : "outline"}
                  onClick={() => {
                    setFrom(preset.from);
                    setTo(preset.to);
                  }}
                  className="text-xs"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Du</Label>
                <Input type="date" value={from} max={to} onChange={(e) => setFrom(e.target.value)} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Au</Label>
                <Input type="date" value={to} min={from} onChange={(e) => setTo(e.target.value)} className="h-9" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{inPeriod} facture(s) ou avoir(s) émis sur cette période.</p>
            <div className="flex flex-col gap-2">
              <Button onClick={() => downloadCsv(invoicesCsv(invoices, from, to), `ERG_factures_avoirs_${suffix}.csv`)} className="bg-amber-600 hover:bg-amber-500 text-white font-bold">
                <Download className="mr-2 h-4 w-4" /> Factures et avoirs
              </Button>
              <Button variant="outline" onClick={() => downloadCsv(paymentsCsv(invoices, from, to), `ERG_paiements_${suffix}.csv`)} className="font-semibold">
                <Download className="mr-2 h-4 w-4" /> Paiements reçus
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
