"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { collection, doc, query, where } from "firebase/firestore";
import { ArrowLeft, CheckCircle2, FileCheck, FileText, HardHat, Loader2, MapPin, Receipt, Save } from "lucide-react";

import { useCollection, useDoc, useFirestore, useMemoFirebase, useUser } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { PROJECT_STATUSES, billingSummary, clampProgress, statusForProgress, updateProject, type ProjectData, type ProjectStatus } from "@/lib/crm/projects";
import { displayStatus, type InvoiceData } from "@/lib/crm/invoices";
import { quoteSchedule, scheduleProgress } from "@/lib/crm/payment-schedule";

const euro = (value: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value || 0);
const today = () => new Date().toISOString().split("T")[0];
const frDate = (iso?: string) => (iso ? new Date(`${iso}T12:00:00`).toLocaleDateString("fr-FR") : "—");

export default function ChantierDetailClient() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  useEffect(() => {
    if (!isUserLoading && !user) router.push("/connexion");
  }, [user, isUserLoading, router]);

  const projectRef = useMemoFirebase(() => (firestore && id && user ? doc(firestore, "projects", id) : null), [firestore, id, user]);
  const { data: project, isLoading } = useDoc<ProjectData>(projectRef);

  const quoteRef = useMemoFirebase(
    () => (firestore && project?.quoteId ? doc(firestore, "quotes", project.quoteId) : null),
    [firestore, project?.quoteId],
  );
  const { data: quote } = useDoc<any>(quoteRef);

  const invoicesQuery = useMemoFirebase(
    () => (firestore && project?.quoteId ? query(collection(firestore, "factures"), where("quoteId", "==", project.quoteId)) : null),
    [firestore, project?.quoteId],
  );
  const { data: invoiceDocs } = useCollection<InvoiceData>(invoicesQuery);
  const invoices = [...(invoiceDocs ?? [])].sort((a, b) => a.date.localeCompare(b.date) || a.number.localeCompare(b.number));

  const [form, setForm] = useState<Pick<ProjectData, "status" | "progress" | "startDate" | "plannedEndDate" | "receptionDate"> | null>(null);
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (project) {
      setForm({
        status: project.status ?? "Planification",
        progress: project.progress ?? 0,
        startDate: project.startDate ?? "",
        plannedEndDate: project.plannedEndDate ?? "",
        receptionDate: project.receptionDate ?? "",
      });
    }
  }, [project?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isUserLoading || !user || isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>
    );
  }

  if (!project || !form) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => router.push("/dashboard/chantiers")} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Retour
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Chantier introuvable</CardTitle>
            <CardDescription>Ce chantier n'existe pas ou n'est plus accessible.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const quoteTTC = Number(quote?.totalTTC ?? quote?.total) || 0;
  const billing = billingSummary(quoteTTC, invoices);
  const steps = quote ? scheduleProgress(quoteSchedule(quote), invoices) : [];

  const save = async (extra: Partial<ProjectData> = {}) => {
    if (!firestore) return;
    setIsSaving(true);
    setError("");
    try {
      await updateProject(firestore, project.id, { ...form, ...extra });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error("Enregistrement du chantier impossible:", err);
      setError("Le chantier n'a pas pu être enregistré.");
    } finally {
      setIsSaving(false);
    }
  };

  const addNote = async () => {
    if (!note.trim()) return;
    await save({ notes: [...(project.notes ?? []), { date: today(), text: note.trim() }] });
    setNote("");
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-background border p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/chantiers")} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Retour
          </Button>
          <div>
            <h1 className="font-bold text-xl tracking-tight flex items-center gap-2">
              <HardHat className="h-5 w-5 text-amber-600" /> {project.title}
            </h1>
            <p className="text-xs text-muted-foreground">
              {project.clientName} — devis{" "}
              <button className="underline" onClick={() => router.push(`/dashboard/devis/${project.quoteId}?mode=preview`)}>
                {project.quoteNumber}
              </button>
            </p>
          </div>
          <Badge variant={form.status === "En cours" ? "default" : "outline"}>{form.status}</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => router.push(`/dashboard/documents?type=pv&projectId=${project.id}`)} className="gap-1.5 font-semibold">
            <FileCheck className="h-4 w-4 text-purple-600" /> PV de réception
          </Button>
          <Button size="sm" onClick={() => save()} disabled={isSaving} className="gap-1.5 font-bold bg-amber-600 hover:bg-amber-500 text-white">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saved ? "Enregistré" : "Enregistrer"}
          </Button>
        </div>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Avancement</CardTitle>
            <CardDescription className="text-xs flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {project.siteAddress || "Adresse du chantier non renseignée"}
              {project.siteAccessDetails && <> — accès : {project.siteAccessDetails}</>}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <Label className="text-xs font-semibold">Avancement des travaux</Label>
                <span className="font-bold">{form.progress} %</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={form.progress}
                onChange={(e) => {
                  const progress = clampProgress(Number(e.target.value));
                  setForm({ ...form, progress, status: statusForProgress(progress, form.status) });
                }}
                className="w-full accent-amber-600"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Statut</Label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as ProjectStatus })}
                  className="h-9 w-full rounded-md border border-input bg-transparent px-2 text-sm"
                >
                  {PROJECT_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Début</Label>
                <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Fin prévue</Label>
                <Input type="date" value={form.plannedEndDate} onChange={(e) => setForm({ ...form, plannedEndDate: e.target.value })} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Réception</Label>
                <Input
                  type="date"
                  value={form.receptionDate}
                  onChange={(e) => setForm({ ...form, receptionDate: e.target.value, status: e.target.value ? "Réceptionné" : form.status })}
                  className="h-9"
                />
              </div>
            </div>

            <div className="space-y-2 border-t pt-4">
              <Label className="text-xs font-semibold">Journal de chantier</Label>
              {(project.notes ?? []).length === 0 && <p className="text-xs text-muted-foreground">Aucune note pour le moment.</p>}
              <ul className="space-y-1.5 text-sm">
                {[...(project.notes ?? [])].reverse().map((entry, index) => (
                  <li key={`${entry.date}-${index}`} className="flex gap-3">
                    <span className="shrink-0 text-xs text-muted-foreground w-20">{frDate(entry.date)}</span>
                    <span className="whitespace-pre-wrap">{entry.text}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <Textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ex. : livraison du chauffe-eau, réserve levée, visite du conseil syndical…" className="text-sm" />
                <Button onClick={addNote} disabled={isSaving || !note.trim()} variant="outline" className="self-end">Ajouter</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2"><Receipt className="h-4 w-4 text-amber-600" /> Facturation</CardTitle>
            <CardDescription className="text-xs">Devis {project.quoteNumber} : {euro(quoteTTC)} TTC</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="space-y-1">
              <Progress value={billing.billedPercent} className="h-2" />
              <div className="flex justify-between text-xs"><span>Facturé (avoirs déduits)</span><span className="font-mono">{euro(billing.billed)}</span></div>
              <div className="flex justify-between text-xs"><span>Encaissé</span><span className="font-mono">{euro(billing.paid)}</span></div>
              <div className="flex justify-between text-xs font-semibold"><span>Reste à facturer</span><span className="font-mono">{euro(billing.toBill)}</span></div>
            </div>

            {steps.length > 0 && (
              <div className="space-y-1 border-t pt-3">
                <p className="text-xs font-semibold">Échéancier</p>
                {steps.map(({ step, index, invoice }) => (
                  <div key={step.id} className="flex justify-between gap-2 text-xs">
                    <span>{index + 1}. {step.label} ({step.percent} %)</span>
                    <span className={invoice ? "text-emerald-700 font-mono" : "text-muted-foreground"}>{invoice ? invoice.number : "à facturer"}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-1 border-t pt-3">
              <p className="text-xs font-semibold">Factures et avoirs</p>
              {invoices.length === 0 && <p className="text-xs text-muted-foreground">Aucune facture pour ce chantier.</p>}
              {invoices.map((invoice) => (
                <button
                  key={invoice.id}
                  onClick={() => router.push(`/dashboard/factures/${invoice.id}`)}
                  className="flex w-full justify-between gap-2 rounded px-1 py-0.5 text-left text-xs hover:bg-muted"
                >
                  <span className="font-mono">{invoice.number}</span>
                  <span>{displayStatus(invoice)}</span>
                  <span className="font-mono">{euro(invoice.totalTTC)}</span>
                </button>
              ))}
            </div>

            <Button variant="outline" size="sm" className="w-full gap-1.5" onClick={() => router.push(`/dashboard/devis/${project.quoteId}?mode=preview`)}>
              <FileText className="h-4 w-4" /> Ouvrir le devis pour facturer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
