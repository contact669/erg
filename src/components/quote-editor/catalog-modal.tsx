"use client";

import React, { useState } from "react";
import { ERG_PRICE_CATALOG, CatalogItem } from "@/lib/price-catalog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Sparkles, Building, Layers, Check } from "lucide-react";

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: CatalogItem) => void;
}

export function CatalogModal({ isOpen, onClose, onSelectItem }: CatalogModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("TOUS");
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const formatEuro = (val: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(val);

  const categories = ["TOUS", ...ERG_PRICE_CATALOG.map((c) => c.name)];

  const allItems = ERG_PRICE_CATALOG.flatMap((cat) => cat.items);

  const filteredItems = allItems.filter((item) => {
    const matchCategory = selectedCategory === "TOUS" || item.category === selectedCategory;
    const matchQuery =
      !searchQuery.trim() ||
      item.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.brandRef && item.brandRef.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchQuery;
  });

  const handleAdd = (item: CatalogItem) => {
    onSelectItem(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col p-0 overflow-hidden rounded-2xl">
        {/* HEADER */}
        <DialogHeader className="bg-slate-900 text-white p-6 pb-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" />
            <span>Bibliothèque ERG Rénovation Paris</span>
          </div>
          <DialogTitle className="text-xl font-black text-white">
            Catalogue de Prestations & Barème de Prix Officiel
          </DialogTitle>
          <DialogDescription className="text-slate-300 text-xs">
            Sélectionnez des prestations réelles extraites de vos devis (Leroy Merlin, Schneider, Grohe, Weber, Placo) pour les insérer dans vos chiffrages.
          </DialogDescription>
        </DialogHeader>

        {/* SEARCH & CATEGORY FILTERS */}
        <div className="p-4 bg-muted/40 border-b space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une prestation (ex: BA13, Parquet, Grohe, Tableau, Peinture, VMC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background h-9 rounded-xl text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all text-[11px] ${
                  selectedCategory === cat
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-background hover:bg-muted text-muted-foreground border border-border"
                }`}
              >
                {cat === "TOUS" ? "Toutes les prestations" : cat.split("&")[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* ITEMS LIST SCROLLABLE AREA */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground space-y-2">
              <Layers className="h-10 w-10 mx-auto opacity-40" />
              <p className="text-sm font-semibold">Aucune prestation ne correspond à votre recherche.</p>
              <p className="text-xs">Essayez un autre mot clé comme "peinture", "carrelage", "prise" ou "porte".</p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isAdded = addedItemIds[item.id];

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border bg-card hover:bg-muted/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] uppercase font-bold text-amber-900 border-amber-300 bg-amber-50">
                        {item.category}
                      </Badge>
                      {item.brandRef && (
                        <Badge variant="secondary" className="text-[10px] font-medium bg-slate-100 text-slate-700">
                          Réf: {item.brandRef}
                        </Badge>
                      )}
                      {item.sourceDevis && (
                        <span className="text-[10px] text-muted-foreground font-mono">
                          ({item.sourceDevis})
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-foreground leading-relaxed">
                      {item.designation}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                        Prix U.HT / {item.unit}
                      </span>
                      <span className="font-mono text-base font-black text-amber-700 dark:text-amber-400">
                        {formatEuro(item.unitPriceHT)}
                      </span>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => handleAdd(item)}
                      className={`gap-1 font-bold text-xs ${
                        isAdded ? "bg-emerald-600 hover:bg-emerald-500 text-white" : "bg-amber-600 hover:bg-amber-500 text-white"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="h-4 w-4" /> Ajouté !
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" /> Ajouter
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
