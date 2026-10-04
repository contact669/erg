"use client";

import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import { PdfDocumentCenter } from "@/components/pdf-studio/pdf-document-center";

export default function DocumentsDashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) router.push("/connexion");
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="flex h-[60vh] items-center justify-center">Chargement du Studio PDF...</div>}>
      <PdfDocumentCenter />
    </Suspense>
  );
}
