'use client';

import React, { useEffect, useState } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import {
  Kanban,
  LayoutDashboard,
  FileText,
  Receipt,
  Construction,
  Users,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lock,
  LogOut,
  Building2,
  TrendingUp,
} from 'lucide-react';
import ConnexionPage from '../connexion/page';

export default function CRMPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSignOut = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  if (!isClient || isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-800 border-t-amber-500" />
      </div>
    );
  }

  if (!user) {
    return <ConnexionPage />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* BRAND HEADER */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <Image
              src="/images/logo-erg.webp"
              alt="ERG Rénovation Numérique Logo"
              width={160}
              height={50}
              className="h-10 w-auto object-contain"
              priority
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white">ERG Rénovation</span>
                <Badge variant="outline" className="text-[10px] uppercase font-extrabold text-amber-400 border-amber-500/30">
                  CRM Pro
                </Badge>
              </div>
              <span className="text-xs text-slate-400 block -mt-0.5">Portail de Gestion & Direction</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-300 font-medium hidden sm:inline-block">
              Connecté : <strong className="text-amber-400">{user.email}</strong>
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-xs text-slate-400 hover:text-white">
              <LogOut className="mr-1.5 h-3.5 w-3.5" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* HERO DASHBOARD PORTAL */}
      <main className="flex-grow container py-12 space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 text-xs font-bold text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Portail Exécutif Haute Performance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Espace de Pilotage & Direction Commerciale
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Accédez directement à vos outils de gestion de chantiers, au pipeline commercial Kanban, à l'édition des devis et au suivi de trésorerie.
          </p>
        </div>

        {/* CRM GRID ACCESS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="rounded-3xl border-slate-800 bg-slate-900/90 hover:border-amber-500/50 transition-all shadow-xl group">
            <CardHeader>
              <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <Kanban className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                Pipeline Commercial Kanban
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs leading-relaxed">
                Suivez vos prospects de la prise de contact à la signature du chantier. Vue Kanban par étape avec montants.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-md">
                <Link href="/dashboard/pipeline">
                  Ouvrir le Pipeline <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-800 bg-slate-900/90 hover:border-amber-500/50 transition-all shadow-xl group">
            <CardHeader>
              <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                Tableau de Bord Financier
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs leading-relaxed">
                Visualisez vos performances mensuelles, votre CA réalisé vs objectif et la répartition du pipeline.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800 font-bold rounded-xl">
                <Link href="/dashboard">
                  Accéder au Cockpit <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-800 bg-slate-900/90 hover:border-amber-500/50 transition-all shadow-xl group">
            <CardHeader>
              <div className="h-12 w-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
                <FileText className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                Devis & Chiffrage
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs leading-relaxed">
                Rédigez, modifiez et envoyez des devis poste par poste avec calcul automatique de TVA et décennale.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800 font-bold rounded-xl">
                <Link href="/dashboard/devis">
                  Gérer les Devis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-800 bg-slate-900/90 hover:border-amber-500/50 transition-all shadow-xl group">
            <CardHeader>
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <Construction className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                Suivi des Chantiers
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs leading-relaxed">
                Supervisez les étapes d'exécution des chantiers (démolition, électricité, plomberie, finitions).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800 font-bold rounded-xl">
                <Link href="/dashboard/chantiers">
                  Voir les Chantiers <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-800 bg-slate-900/90 hover:border-amber-500/50 transition-all shadow-xl group">
            <CardHeader>
              <div className="h-12 w-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3">
                <Receipt className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors">
                Facturation & Acomptes
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs leading-relaxed">
                Suivez le règlement des factures d'acomptes (30%, 40%, 30%) et relancez les impayés.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800 font-bold rounded-xl">
                <Link href="/dashboard/factures">
                  Consulter les Factures <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-800 bg-slate-900/90 hover:border-amber-500/50 transition-all shadow-xl group">
            <CardHeader>
              <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                Répertoire Clients 360°
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs leading-relaxed">
                Consultez les coordonnées, l'historique et les projets rattachés à chaque client.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800 font-bold rounded-xl">
                <Link href="/dashboard/clients">
                  Fiches Clients <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* SECURITY & REASSURANCE FOOTER */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-amber-400 flex-shrink-0" />
            <span>Environnement sécurisé SSL / Firebase Auth avec contrôle des rôles et garantie décennale ERG.</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white transition-colors">
              Retour au site public
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
