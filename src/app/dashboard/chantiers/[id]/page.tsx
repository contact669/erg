import { Suspense } from "react";
import ChantierDetailClient from "./ChantierDetailClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Chargement…</div>}>
      <ChantierDetailClient />
    </Suspense>
  );
}
