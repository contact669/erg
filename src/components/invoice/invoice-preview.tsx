"use client";

import { COMPANY } from "@/lib/company";
import { INVOICE_KIND_LABELS, type InvoiceData } from "@/lib/crm/invoices";
import type { TvaRate } from "@/components/quote-editor/quote-types";

export const INVOICE_PDF_CONTAINER_ID = "invoice-pdf-container";

const euro = (value: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value || 0);
const frDate = (iso: string) => (iso ? new Date(`${iso}T12:00:00`).toLocaleDateString("fr-FR") : "");
const TVA_RATES: TvaRate[] = [5.5, 10, 20];
const tvaKey = { 5.5: "totalTVA55", 10: "totalTVA10", 20: "totalTVA20" } as const;

/** A4 rendering of an issued invoice, read-only. */
export function InvoicePreview({ invoice }: { invoice: InvoiceData }) {
  const isCreditNote = invoice.kind === "avoir";
  const reducedVat = invoice.totalTVA55 !== 0 || invoice.totalTVA10 !== 0;
  const alreadyPaid = invoice.paid ?? 0;

  // HT per VAT rate on the quote, used to show the base of a deposit for each rate.
  const quoteHTByRate = (rate: TvaRate) =>
    (invoice.lots ?? []).reduce(
      (sum, lot) => sum + lot.items.filter((item) => item.tvaRate === rate).reduce((s, item) => s + (item.totalHT || 0), 0),
      0,
    );

  return (
    <div
      id={INVOICE_PDF_CONTAINER_ID}
      className="bg-white text-slate-900 p-8 sm:p-12 rounded-xl border border-slate-200 shadow-xl print:shadow-none print:border-none print:p-0 max-w-4xl mx-auto font-sans text-xs"
    >
      {/* HEADER */}
      <div className="flex justify-between items-start border-b border-slate-300 pb-6 gap-6">
        <div className="space-y-2 max-w-md">
          <img src="/images/logo-erg.webp" alt="ERG Rénovation" className="h-20 w-auto max-w-[260px] object-contain" />
          <p className="leading-relaxed text-slate-700">
            <strong className="text-slate-900">{COMPANY.name}</strong> — {COMPANY.legalName}, {COMPANY.legalForm}
            <br />
            {COMPANY.address}
            <br />
            Tél : {COMPANY.phoneLabel} — {COMPANY.email}
            <br />
            SIREN {COMPANY.siren} — SIRET {COMPANY.siret}
            {COMPANY.vatNumber && <> — TVA intracom. {COMPANY.vatNumber}</>}
          </p>
        </div>
        <div className="text-right space-y-2 shrink-0">
          <div className="inline-block bg-amber-500/10 border border-amber-300 text-amber-950 px-4 py-1.5 rounded-lg text-sm font-black uppercase tracking-wider">
            {INVOICE_KIND_LABELS[invoice.kind]}
          </div>
          <p className="font-mono font-bold text-sm">N° {invoice.number}</p>
          <div className="text-slate-600 space-y-0.5">
            <p>Date d'émission : <strong className="text-slate-900">{frDate(invoice.date)}</strong></p>
            {isCreditNote ? (
              <p>
                Facture d'origine : <strong className="text-slate-900">{invoice.invoiceNumber}</strong> du {frDate(invoice.invoiceDate ?? "")}
              </p>
            ) : (
              <p>Date d'échéance : <strong className="text-slate-900">{frDate(invoice.dueDate)}</strong></p>
            )}
            <p>Devis de référence : <strong className="text-slate-900">{invoice.quoteNumber}</strong></p>
          </div>
        </div>
      </div>

      {/* CLIENT & SITE */}
      <div className="grid grid-cols-2 gap-6 my-6">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <h4 className="font-extrabold text-amber-900 uppercase tracking-wider text-[10px]">Client</h4>
          <p className="font-extrabold text-sm">{invoice.clientName}</p>
          {invoice.clientAddress && <p className="whitespace-pre-wrap text-slate-700">{invoice.clientAddress}</p>}
          {invoice.clientEmail && <p className="text-slate-600">{invoice.clientEmail}</p>}
          {invoice.clientPhone && <p className="text-slate-600">{invoice.clientPhone}</p>}
        </div>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <h4 className="font-extrabold text-amber-900 uppercase tracking-wider text-[10px]">Chantier</h4>
          <p className="font-extrabold text-sm">{invoice.projectTitle}</p>
          {invoice.siteAddress && <p className="whitespace-pre-wrap text-slate-700">{invoice.siteAddress}</p>}
        </div>
      </div>

      {/* LINES */}
      {isCreditNote ? (
        <table className="w-full border border-slate-200 rounded-xl overflow-hidden mb-6">
          <thead>
            <tr className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider text-left">
              <th className="py-2.5 px-3">Désignation</th>
              <th className="py-2.5 px-3 text-right">Montant TTC</th>
            </tr>
          </thead>
          <tbody>
            <tr className="align-top">
              <td className="py-2.5 px-3">
                {invoice.creditType === "total" ? "Annulation" : "Annulation partielle"} de la facture N° {invoice.invoiceNumber} du{" "}
                {frDate(invoice.invoiceDate ?? "")} (devis N° {invoice.quoteNumber})
                {invoice.reason && <span className="block text-slate-600 whitespace-pre-wrap">Motif : {invoice.reason}</span>}
              </td>
              <td className="py-2.5 px-3 text-right font-mono font-bold">{euro(invoice.totalTTC)}</td>
            </tr>
          </tbody>
        </table>
      ) : invoice.kind === "acompte" ? (
        <table className="w-full border border-slate-200 rounded-xl overflow-hidden mb-6">
          <thead>
            <tr className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider text-left">
              <th className="py-2.5 px-3">Désignation</th>
              <th className="py-2.5 px-2 text-center">TVA</th>
              <th className="py-2.5 px-3 text-right">Montant HT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {TVA_RATES.filter((rate) => invoice[tvaKey[rate]] > 0).map((rate) => (
              <tr key={rate}>
                <td className="py-2.5 px-3">
                  Acompte de {invoice.percent} % sur le devis N° {invoice.quoteNumber} — travaux au taux de {String(rate).replace(".", ",")} %
                  <span className="block text-slate-500">Base devis : {euro(quoteHTByRate(rate))} HT</span>
                </td>
                <td className="py-2.5 px-2 text-center font-mono">{String(rate).replace(".", ",")} %</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold">{euro((quoteHTByRate(rate) * (invoice.percent ?? 0)) / 100)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="space-y-4 mb-6">
          {(invoice.lots ?? []).map((lot) => (
            <div key={lot.id} className="border border-slate-200 rounded-xl overflow-hidden break-inside-avoid">
              <div className="bg-slate-100 px-4 py-2 flex justify-between font-bold">
                <span className="uppercase text-amber-900">{lot.name}</span>
                <span className="font-mono">{euro(lot.subtotalHT)} HT</span>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <th className="py-2 px-3 w-[50%]">Désignation</th>
                    <th className="py-2 px-2 text-center">Unité</th>
                    <th className="py-2 px-2 text-right">Qté</th>
                    <th className="py-2 px-2 text-right">P.U. HT</th>
                    <th className="py-2 px-2 text-center">TVA</th>
                    <th className="py-2 px-3 text-right">Total HT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lot.items.map((item) => (
                    <tr key={item.id} className="align-top">
                      <td className="py-2 px-3 whitespace-pre-wrap">{item.designation}</td>
                      <td className="py-2 px-2 text-center font-mono text-slate-500">{item.unit}</td>
                      <td className="py-2 px-2 text-right font-mono">{item.quantity}</td>
                      <td className="py-2 px-2 text-right font-mono">{euro(item.unitPriceHT)}</td>
                      <td className="py-2 px-2 text-center font-mono text-slate-500">{item.tvaRate} %</td>
                      <td className="py-2 px-3 text-right font-mono font-bold">{euro(item.totalHT)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {invoice.kind === "solde" && invoice.previous.length > 0 && (
            <div className="border border-slate-200 rounded-xl p-4 space-y-1 break-inside-avoid">
              <div className="flex justify-between font-bold">
                <span>Total des travaux du devis N° {invoice.quoteNumber}</span>
                <span className="font-mono">{euro(invoice.quoteTotals.totalTTC)} TTC</span>
              </div>
              {invoice.previous.map((previous) => (
                <div key={previous.number} className="flex justify-between text-slate-600">
                  <span>
                    {previous.totalTTC < 0 ? "Avoir" : "À déduire : facture"} N° {previous.number} du {frDate(previous.date)}
                  </span>
                  <span className="font-mono">{euro(-previous.totalTTC)} TTC</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TOTALS & CONDITIONS */}
      <div className="grid grid-cols-2 gap-6 my-6 break-inside-avoid">
        {isCreditNote ? (
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5 text-[11px] text-slate-700 leading-relaxed">
            <h4 className="font-extrabold text-amber-900 uppercase tracking-wider text-[10px]">Imputation de l'avoir</h4>
            <p>
              Cet avoir vient en déduction de la facture N° {invoice.invoiceNumber}. Toute somme déjà réglée au-delà du montant restant
              dû sera remboursée au client ou imputée sur une prochaine facture.
            </p>
          </div>
        ) : (
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5 text-[11px] text-slate-700 leading-relaxed">
          <h4 className="font-extrabold text-amber-900 uppercase tracking-wider text-[10px]">Conditions de règlement</h4>
          <p>Paiement à régler au plus tard le <strong>{frDate(invoice.dueDate)}</strong>, par virement ou chèque.</p>
          <p>Pas d'escompte pour paiement anticipé.</p>
          <p>En cas de retard de paiement, pénalités au taux de {COMPANY.latePenalty}, exigibles dès le lendemain de l'échéance.</p>
          <p>Pour les clients professionnels : indemnité forfaitaire pour frais de recouvrement de 40 € (art. L441-10 et D441-5 du Code de commerce).</p>
          {COMPANY.iban && (
            <p className="font-mono pt-1">
              IBAN : <strong>{COMPANY.iban}</strong>
              {COMPANY.bic && <> — BIC : <strong>{COMPANY.bic}</strong></>}
            </p>
          )}
        </div>
        )}

        <div className="p-4 rounded-xl border border-slate-300 bg-white space-y-2">
          <div className="flex justify-between font-bold">
            <span className="uppercase tracking-wider">Total HT</span>
            <span className="font-mono">{euro(invoice.totalHT)}</span>
          </div>
          <div className="space-y-1 text-slate-600 border-t border-slate-200 pt-2">
            {TVA_RATES.filter((rate) => invoice[tvaKey[rate]] !== 0).map((rate) => (
              <div key={rate} className="flex justify-between">
                <span>TVA {String(rate).replace(".", ",")} %</span>
                <span className="font-mono">{euro(invoice[tvaKey[rate]])}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold border-t border-slate-200 pt-2">
            <span className="uppercase tracking-wider">Total TTC</span>
            <span className="font-mono">{euro(invoice.totalTTC)}</span>
          </div>
          {!isCreditNote && alreadyPaid > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>Déjà réglé</span>
              <span className="font-mono">− {euro(alreadyPaid)}</span>
            </div>
          )}
          {!isCreditNote && (invoice.credited ?? 0) > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>Avoirs émis</span>
              <span className="font-mono">− {euro(invoice.credited ?? 0)}</span>
            </div>
          )}
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-300 flex justify-between items-center">
            <span className="font-black uppercase tracking-wider">{isCreditNote ? "Montant de l'avoir" : "Net à payer"}</span>
            <span className="font-mono text-xl font-black text-amber-900">{euro(isCreditNote ? invoice.totalTTC : invoice.restant)}</span>
          </div>
        </div>
      </div>

      {(reducedVat || COMPANY.decennale) && (
        <div className="mb-6 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed space-y-1 break-inside-avoid">
          {reducedVat && (
            <p>
              TVA à taux réduit appliquée aux travaux sur un logement achevé depuis plus de deux ans (art. 279-0 bis et 278-0 bis A du CGI),
              sur la base de l'attestation du client.
            </p>
          )}
          {COMPANY.decennale && <p>Assurance décennale : {COMPANY.decennale}.</p>}
        </div>
      )}

      <div className="text-center text-[10px] text-slate-500 border-t border-slate-200 pt-3">
        {COMPANY.name} — {COMPANY.legalName} — {COMPANY.legalForm} — SIRET {COMPANY.siret} — {COMPANY.address} — {COMPANY.siteUrl.replace("https://", "")}
      </div>
    </div>
  );
}
