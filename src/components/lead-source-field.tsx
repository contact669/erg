"use client"

import { leadSources, readLeadSource, type LeadSource } from "@/lib/lead-source"

export default function LeadSourceField({ id, value, onChange, disabled }: {
  id: string
  value: LeadSource
  onChange: (value: LeadSource) => void
  disabled?: boolean
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">Comment avez-vous connu ERG ? (facultatif)</label>
      <select id={id} value={value} onChange={event => onChange(readLeadSource(event.target.value))} disabled={disabled} className="flex min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
        <option value="">Je préfère ne pas préciser</option>
        {leadSources.map(source => <option key={source.value} value={source.value}>{source.label}</option>)}
      </select>
    </div>
  )
}
