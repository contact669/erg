import { Suspense } from "react";
import DevisDetailClient from "./DevisDetailClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Chargement…</div>}>
      <DevisDetailClient />
    </Suspense>
  );
}
