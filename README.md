# ERG Rénovation : site et CRM

Site public de https://erg-renovation.fr et CRM interne (`/dashboard`), dans une seule application Next.js 14 (App Router) hébergée sur Firebase App Hosting.

## Stack

- Next.js 14, React 18, TypeScript, Tailwind, shadcn/ui
- Firebase : Firestore (base `ergrenov`), Auth (un compte admin), App Hosting
- Resend pour les emails (secret `RESEND_API_KEY` dans App Hosting)

## Démarrer

```bash
npm install
npm run dev        # http://localhost:9003
```

## Vérifications

```bash
npm run typecheck
npm run build
npm run check:seo        # après le build : canonicals, sitemap, H1, JSON-LD, liens internes
npm run check:quotes     # formulaire de devis et route /api/send-quote-email
npm run check:documents  # route /api/send-document-email (admin, pièce jointe)
npm run check:crm        # rapprochement des fiches clients par email
```

Ces vérifications tournent aussi sur GitHub à chaque push (`.github/workflows/ci.yml`).

## Où modifier quoi

- Identité légale, assurance, IBAN, certifications : `src/lib/company.ts`. Ne jamais y mettre de valeur d'exemple : ces champs sont imprimés sur les devis et les emails.
- Contenus SEO (services, réalisations, blog, villes) : `src/lib/data.tsx` et `src/lib/seo/`.
- Règles Firestore : `firestore.rules`. L'UID admin doit correspondre à `COMPANY.adminUid`.

## Déployer

```bash
firebase deploy
```
