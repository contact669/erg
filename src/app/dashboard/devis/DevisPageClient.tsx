"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { collection, query, orderBy, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useUser, useCollection, useMemoFirebase, useFirestore } from "@/firebase";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  PlusCircle,
  MoreHorizontal,
  FileText,
  Pencil,
  Trash2,
  Send,
  Download,
  Copy,
  LayoutList,
  LayoutGrid,
  Search,
  CheckCircle2,
  Clock,
  Euro,
  FileCheck,
  Building,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import { SendDocumentModal } from "@/components/pdf-studio/send-document-modal";

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "Accepté":
      return "default";
    case "Facturé":
      return "secondary";
    case "Envoyé":
      return "outline";
    case "Brouillon":
      return "destructive";
    case "Refusé":
      return "destructive";
    default:
      return "default";
  }
}

function toDateSafe(value: any): Date | null {
  if (value?.toDate && typeof value.toDate === "function") return value.toDate();
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

const MOCK_QUOTES = [
  {
    id: "D00207",
    number: "D00207",
    clientName: "Mr BAH",
    clientEmail: "bah.client@gmail.com",
    clientPhone: "06 12 34 56 78",
    clientAddress: "8 bis, rue de l'Argonne, 75020 Paris",
    projectTitle: "Rénovation d'un appartement de type F2",
    projectDescription: "Démolition, chape allégée Weber P3, électricité Schneider ODACE, plomberie cuivre/PVC, VMC SAUTER, chauffe-eau connecté, carrelage & faïence, peinture intégrale 37m².",
    total: 29645,
    totalHT: 26950,
    status: "Accepté",
    createdAt: "2025-03-12",
  },
  {
    id: "D0192",
    number: "D0192",
    clientName: "Mr Jacques Sebaouni",
    clientEmail: "j.sebaouni@wanadoo.fr",
    clientPhone: "06 98 76 54 32",
    clientAddress: "206 boulevard de Charonne, 75020 Paris",
    projectTitle: "Rénovation d'un appartement de type F3 67m²",
    projectDescription: "Protection du chantier, dépose moquette & colle 50m², fourniture et pose parquet contrecollé avec isolant phonique 20dB, plinthes 70ml, peinture générale acrylique/glycéro 67.8m².",
    total: 18227,
    totalHT: 16570,
    status: "Envoyé",
    createdAt: "2025-03-12",
  },
  {
    id: "D0192-SOL",
    number: "D0192-SOL",
    clientName: "Soliko (Copropriété)",
    clientEmail: "contact@soliko-copro.fr",
    clientPhone: "01 43 56 89 20",
    clientAddress: "5 bis Rue de Tlemcen, 75020 Paris",
    projectTitle: "Entretien & Nettoyage Récurrent Copropriétés (18 Appts)",
    projectDescription: "Nettoyage immeubles 8 et 10 appts F2, entretien hebdomadaire cour/escaliers/rampe/paliers/hall, sortie quotidienne conteneurs poubelles, nettoyage mensuel des vitres.",
    total: 1728,
    totalHT: 1440,
    status: "Facturé",
    createdAt: "2025-03-31",
  },
];

export default function DevisPageClient() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const firestore = useFirestore();

  const [isClientMounted, setIsClientMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("TOUS");

  const [sendModalDoc, setSendModalDoc] = useState<{
    isOpen: boolean;
    number: string;
    clientName: string;
    clientEmail: string;
  }>({
    isOpen: false,
    number: "",
    clientName: "",
    clientEmail: "",
  });

  useEffect(() => {
    setIsClientMounted(true);
  }, []);

  useEffect(() => {
    if (!isUserLoading && !user) router.push("/connexion");
  }, [user, isUserLoading, router]);

  const quotesQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return query(collection(firestore, "quotes"), orderBy("createdAt", "desc"));
  }, [firestore, user?.uid]);

  const { data: dbQuotes, isLoading, error } = useCollection<any>(quotesQuery);

  const displayQuotes = useMemo(() => {
    const list = dbQuotes && dbQuotes.length > 0 ? dbQuotes : MOCK_QUOTES;

    return list.filter((item: any) => {
      const matchSearch =
        !searchQuery.trim() ||
        (item.clientName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.clientEmail || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.projectTitle || item.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.number || item.id || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = selectedStatus === "TOUS" || (item.status || "Brouillon") === selectedStatus;

      return matchSearch && matchStatus;
    });
  }, [dbQuotes, searchQuery, selectedStatus]);

  // Statistics calculation
  const stats = useMemo(() => {
    const list = dbQuotes && dbQuotes.length > 0 ? dbQuotes : MOCK_QUOTES;
    const totalCount = list.length;
    const totalAmount = list.reduce((sum: number, q: any) => sum + (q.total || q.totalTTC || 0), 0);
    const acceptedCount = list.filter((q: any) => q.status === "Accepté" || q.status === "Facturé").length;
    const acceptRate = totalCount > 0 ? Math.round((acceptedCount / totalCount) * 100) : 0;
    const pendingCount = list.filter((q: any) => q.status === "Envoyé").length;

    return { totalCount, totalAmount, acceptRate, pendingCount };
  }, [dbQuotes]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>
    );
  }

  const handleView = (id: string) => router.push(`/dashboard/devis/${id}?mode=preview`);
  const handleEdit = (id: string) => router.push(`/dashboard/devis/${id}?mode=edit`);

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    if (confirm("Êtes-vous sûr de vouloir supprimer ce devis ?")) {
      try {
        await deleteDoc(doc(firestore, "quotes", id));
      } catch (err) {
        console.error("Erreur de suppression:", err);
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (!firestore) return;
    try {
      await updateDoc(doc(firestore, "quotes", id), { status: newStatus });
    } catch (err) {
      console.error("Erreur mise à jour statut:", err);
    }
  };

  const openSendModal = (item: any) => {
    setSendModalDoc({
      isOpen: true,
      number: item.number || item.id || "DEV-2026-004",
      clientName: item.clientName || "Alexandre de Saint-Germain",
      clientEmail: item.clientEmail || "a.stgermain@gmail.com",
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
            <Sparkles className="h-4 w-4" />
            <span>Gestion Chiffrages & Devis BTP</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            Devis & Propositions Commerciales
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Éditez, suivez, téléchargez et transmettez vos devis haute définition aux clients.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => router.push("/dashboard/devis/nouveau")} className="bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-md">
            <PlusCircle className="mr-2 h-4 w-4" />
            Créer un Devis BTP
          </Button>
          <Button variant="outline" onClick={() => router.push("/dashboard/demandes")} className="rounded-xl font-medium">
            Importer une Demande
          </Button>
        </div>
      </div>

      {/* KPI METRICS COCKPIT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border p-4 flex items-center gap-4 bg-background shadow-xs">
          <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">Devis Émis</p>
            <h3 className="text-2xl font-black text-foreground">{stats.totalCount}</h3>
          </div>
        </Card>

        <Card className="rounded-2xl border p-4 flex items-center gap-4 bg-background shadow-xs">
          <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
            <Euro className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">Volume Devisé</p>
            <h3 className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
              {stats.totalAmount.toLocaleString("fr-FR")} €
            </h3>
          </div>
        </Card>

        <Card className="rounded-2xl border p-4 flex items-center gap-4 bg-background shadow-xs">
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">Taux de Conversion</p>
            <h3 className="text-2xl font-black text-foreground">{stats.acceptRate} %</h3>
          </div>
        </Card>

        <Card className="rounded-2xl border p-4 flex items-center gap-4 bg-background shadow-xs">
          <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">En Attente d'Envoi</p>
            <h3 className="text-2xl font-black text-foreground">{stats.pendingCount}</h3>
          </div>
        </Card>
      </div>

      {/* FILTER & VIEW MODE CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/40 p-4 rounded-2xl border border-border">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par client, projet, N°..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 rounded-xl text-xs bg-background"
          />
        </div>

        {/* Filter Chips & View Mode Toggle */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1 text-xs">
            {["TOUS", "Brouillon", "Envoyé", "Accepté", "Facturé"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  selectedStatus === status
                    ? "bg-amber-600 text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-background"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* View Switcher Buttons */}
          <div className="bg-background border p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "table" ? "bg-amber-600 text-white" : "text-muted-foreground hover:text-foreground"
              }`}
              title="Vue Tableau"
            >
              <LayoutList className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-amber-600 text-white" : "text-muted-foreground hover:text-foreground"
              }`}
              title="Vue Grille"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* RENDER CONTENT: TABLE VIEW OR GRID VIEW */}
      {viewMode === "table" ? (
        <Card className="rounded-2xl border shadow-xs">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Répertoire des Devis ({displayQuotes.length})</CardTitle>
            <CardDescription className="text-xs">
              Éditez, modifiez, téléchargez en PDF ou transmettez vos devis aux clients.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">N° Devis & Date</TableHead>
                  <TableHead className="font-bold">Client / Maître d'Ouvrage</TableHead>
                  <TableHead className="font-bold">Chantier & Désignation</TableHead>
                  <TableHead className="hidden md:table-cell text-right font-bold">Montant TTC</TableHead>
                  <TableHead className="hidden sm:table-cell font-bold">Statut</TableHead>
                  <TableHead className="text-right font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isClientMounted &&
                  displayQuotes.map((item: any) => {
                    const createdAt = toDateSafe(item.createdAt);
                    const formattedDate = createdAt
                      ? format(createdAt, "d MMM yyyy", { locale: fr })
                      : item.createdAt || item.date || "Récents";

                    return (
                      <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell>
                          <div className="font-mono font-bold text-amber-600">{item.number || item.id}</div>
                          <div className="text-xs text-muted-foreground">{formattedDate}</div>
                        </TableCell>

                        <TableCell>
                          <div className="font-bold text-foreground">{item.clientName || "Client"}</div>
                          <div className="text-xs text-muted-foreground">{item.clientEmail || ""}</div>
                        </TableCell>

                        <TableCell>
                          <div className="font-medium text-foreground line-clamp-1">{item.projectTitle || item.title || "Devis Travaux"}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{item.projectDescription || "—"}</div>
                        </TableCell>

                        <TableCell className="hidden md:table-cell text-right font-mono font-bold text-slate-900 dark:text-white">
                          {(item.total || item.totalTTC || 0).toLocaleString("fr-FR")} €
                        </TableCell>

                        <TableCell className="hidden sm:table-cell">
                          <Badge variant={getStatusBadgeVariant(item.status || "Brouillon")}>
                            {item.status || "Brouillon"}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleView(item.id)}
                              title="Aperçu PDF Officiel"
                              className="h-8 w-8 p-0"
                            >
                              <FileText className="h-4 w-4 text-amber-600" />
                            </Button>

                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(item.id)}
                              title="Modifier le devis"
                              className="h-8 w-8 p-0"
                            >
                              <Pencil className="h-4 w-4 text-muted-foreground" />
                            </Button>

                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openSendModal(item)}
                              title="Envoyer par Email"
                              className="h-8 w-8 p-0"
                            >
                              <Send className="h-4 w-4 text-emerald-600" />
                            </Button>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions Devis</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleView(item.id)}>
                                  <Download className="mr-2 h-4 w-4 text-amber-600" /> Aperçu & Télécharger PDF Direct
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEdit(item.id)}>
                                  <Pencil className="mr-2 h-4 w-4" /> Modifier le chiffrage
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => openSendModal(item)}>
                                  <Send className="mr-2 h-4 w-4 text-emerald-600" /> Envoyer au Client (Email)
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleStatusChange(item.id, "Accepté")}>
                                  Passer en "Accepté"
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(item.id, "Facturé")}>
                                  Passer en "Facturé"
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleDelete(item.id)}
                                  className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        /* GRID CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayQuotes.map((item: any) => (
            <Card key={item.id} className="rounded-2xl border p-5 space-y-4 hover:shadow-md transition-shadow bg-background">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-600 text-sm">{item.number || item.id}</span>
                    <Badge variant={getStatusBadgeVariant(item.status || "Brouillon")}>
                      {item.status || "Brouillon"}
                    </Badge>
                  </div>
                  <h3 className="font-extrabold text-lg text-foreground mt-1">
                    {item.clientName || "Client"}
                  </h3>
                  <p className="text-xs text-muted-foreground">{item.clientEmail || ""}</p>
                </div>

                <div className="text-right">
                  <span className="text-xs uppercase font-bold text-muted-foreground block">Montant TTC</span>
                  <span className="font-mono text-xl font-black text-emerald-700 dark:text-emerald-400">
                    {(item.total || item.totalTTC || 0).toLocaleString("fr-FR")} €
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-muted/30 border border-border/50 text-xs space-y-1">
                <p className="font-bold text-foreground line-clamp-1">{item.projectTitle || item.title || "Projet de Rénovation"}</p>
                <p className="text-muted-foreground line-clamp-2">{item.projectDescription || "Pas de description renseignée."}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t text-xs">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> Émis le {item.createdAt || item.date || "2026-03-01"}
                </span>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item.id)} className="h-8 gap-1 text-xs font-semibold">
                    <Pencil className="h-3.5 w-3.5" /> Modifier
                  </Button>
                  <Button size="sm" onClick={() => handleView(item.id)} className="h-8 gap-1 text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white">
                    <FileText className="h-3.5 w-3.5" /> Aperçu PDF
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => openSendModal(item)} className="h-8 w-8 p-0">
                    <Send className="h-3.5 w-3.5 text-emerald-600" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* EMAIL TRANSMISSION MODAL */}
      <SendDocumentModal
        isOpen={sendModalDoc.isOpen}
        onClose={() => setSendModalDoc({ ...sendModalDoc, isOpen: false })}
        documentType="Devis Officiel BTP"
        documentNumber={sendModalDoc.number}
        defaultClientName={sendModalDoc.clientName}
        defaultClientEmail={sendModalDoc.clientEmail}
      />
    </div>
  );
}
