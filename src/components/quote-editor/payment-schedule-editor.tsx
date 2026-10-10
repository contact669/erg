"use client";

import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { PaymentStep } from "./quote-types";
import { SCHEDULE_PRESETS, presetSteps, scheduleError, scheduleTotal } from "@/lib/crm/payment-schedule";

interface PaymentScheduleEditorProps {
  steps: PaymentStep[];
  totalTTC: number;
  onChange: (steps: PaymentStep[]) => void;
}

const euro = (value: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value || 0);

/** Free payment schedule: any number of steps (label + %), totalling 100 %. */
export function PaymentScheduleEditor({ steps, totalTTC, onChange }: PaymentScheduleEditorProps) {
  const error = scheduleError(steps);
  const update = (index: number, patch: Partial<PaymentStep>) =>
    onChange(steps.map((step, i) => (i === index ? { ...step, ...patch } : step)));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">Modèles :</span>
        {SCHEDULE_PRESETS.map((preset) => (
          <Button key={preset.id} type="button" size="sm" variant="outline" className="h-7 text-xs" onClick={() => onChange(presetSteps(preset.id))}>
            {preset.label}
          </Button>
        ))}
      </div>

      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-2">
            <span className="w-5 text-xs font-bold text-muted-foreground">{index + 1}.</span>
            <Input
              value={step.label}
              onChange={(e) => update(index, { label: e.target.value })}
              placeholder="Ex. : au début des travaux"
              className="h-8 text-xs flex-1"
            />
            <Input
              type="number"
              min={0}
              max={100}
              value={step.percent}
              onChange={(e) => update(index, { percent: Number(e.target.value) })}
              className="h-8 w-20 text-xs font-bold"
            />
            <span className="text-xs font-bold">%</span>
            <span className="w-24 text-right text-xs font-mono font-semibold text-amber-700 dark:text-amber-400">
              {euro((totalTTC * (step.percent || 0)) / 100)}
            </span>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              disabled={steps.length <= 1}
              onClick={() => onChange(steps.filter((_, i) => i !== index))}
              title="Supprimer l'échéance"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-7 text-xs"
          onClick={() => onChange([...steps, { id: `step-${Date.now().toString(36)}`, label: "", percent: Math.max(0, 100 - scheduleTotal(steps)) }])}
        >
          <Plus className="mr-1 h-3.5 w-3.5" /> Ajouter une échéance
        </Button>
        <span className={`text-xs font-semibold ${error ? "text-destructive" : "text-emerald-600"}`}>
          {error ?? "Total : 100 %"}
        </span>
      </div>
    </div>
  );
}
