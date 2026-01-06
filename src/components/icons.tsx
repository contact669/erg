import type { SVGProps } from "react"

/**
 * Google Icon — version “pro” :
 * - préfère une version monochrome (hérite du thème) pour UI (boutons, header, etc.)
 * - option `brand` pour la version couleurs Google si tu veux
 */
export function GoogleIcon({
  width = 20,
  height = 20,
  className,
  ...props
}: SVGProps<SVGSVGElement> & { brand?: boolean }) {
  // ⚠️ Monochrome (recommandé pour un design premium et cohérent)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      role="img"
      aria-label="Google"
      className={className}
      {...props}
    >
      <path
        fill="currentColor"
        d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.37a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.99-4.34 2.99-7.36ZM12 22c2.7 0 4.97-.9 6.63-2.42l-3.24-2.51c-.9.6-2.06.96-3.39.96-2.6 0-4.8-1.76-5.59-4.12H3.06v2.58A10 10 0 0 0 12 22Zm-5.59-7.09A6 6 0 0 1 6.1 13c0-.66.11-1.3.31-1.91V8.51H3.06A10 10 0 0 0 2 13c0 1.62.39 3.15 1.06 4.49l3.35-2.58ZM12 6.97c1.47 0 2.79.51 3.83 1.5l2.87-2.87C16.96 3.88 14.69 3 12 3A10 10 0 0 0 3.06 8.51l3.35 2.58C7.2 8.73 9.4 6.97 12 6.97Z"
      />
    </svg>
  )
}

/**
 * Si tu veux ABSOLUMENT la version Google “brand” (couleurs officielles),
 * utilise plutôt ce composant séparé pour éviter les mélanges de styles.
 */
export function GoogleBrandIcon({
  width = 20,
  height = 20,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      role="img"
      aria-label="Google"
      {...props}
    >
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.37a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.99-4.34 2.99-7.36Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.97-.9 6.63-2.42l-3.24-2.51c-.9.6-2.06.96-3.39.96-2.6 0-4.8-1.76-5.59-4.12H3.06v2.58A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.41 14.91A6 6 0 0 1 6.1 13c0-.66.11-1.3.31-1.91V8.51H3.06A10 10 0 0 0 2 13c0 1.62.39 3.15 1.06 4.49l3.35-2.58Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.97c1.47 0 2.79.51 3.83 1.5l2.87-2.87C16.96 3.88 14.69 3 12 3A10 10 0 0 0 3.06 8.51l3.35 2.58C7.2 8.73 9.4 6.97 12 6.97Z"
      />
    </svg>
  )
}
