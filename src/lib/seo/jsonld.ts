type Address = {
  streetAddress?: string;
  addressLocality?: string;
  postalCode?: string;
  addressRegion?: string;
  addressCountry?: string; // "FR"
};

type SocialLinks = {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
};

type LocalBusinessInput = {
  name: string;                 // "ERG Rénovation"
  siteUrl: string;              // "https://erg-renovation.fr"
  logoUrl: string;              // "https://.../logo.png"
  imageUrl?: string;            // "https://.../og-image.jpg"
  phone?: string;               // "+33..."
  priceRange?: string;          // "€€€"
  address?: Address;
  social?: SocialLinks;
  areaServed?: string[];        // ["Paris (75)", "Hauts-de-Seine (92)", ...]
};

export function buildLocalBusinessJsonLd(input: LocalBusinessInput) {
  const sameAs = Object.values(input.social ?? {}).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${input.siteUrl}/#business`,
    name: input.name,
    url: input.siteUrl,
    logo: input.logoUrl,
    image: input.imageUrl ?? input.logoUrl,
    telephone: input.phone,
    priceRange: input.priceRange,
    address: input.address
      ? {
          "@type": "PostalAddress",
          streetAddress: input.address.streetAddress,
          addressLocality: input.address.addressLocality,
          postalCode: input.address.postalCode,
          addressRegion: input.address.addressRegion,
          addressCountry: input.address.addressCountry ?? "FR",
        }
      : undefined,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    areaServed: (input.areaServed ?? []).map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

type WebSiteInput = {
  name: string;
  siteUrl: string;
  // si tu n’as pas de page recherche, enlève searchUrlTemplate
  searchUrlTemplate?: string; // "https://.../recherche?q={search_term_string}"
};

export function buildWebSiteJsonLd(input: WebSiteInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${input.siteUrl}/#website`,
    name: input.name,
    url: input.siteUrl,
    potentialAction: input.searchUrlTemplate
      ? {
          "@type": "SearchAction",
          target: input.searchUrlTemplate,
          "query-input": "required name=search_term_string",
        }
      : undefined,
  };
}

type BuildServiceParams = {
  businessName: string;  // "ERG Rénovation"
  siteUrl: string;       // "https://erg-renovation.fr"
  url: string;           // "/renovation-courbevoie" ou URL absolue
  city?: string;         // "Courbevoie"
  postalCode?: string;   // "92400"
  department?: string;   // "Hauts-de-Seine (92)" (pour pages piliers)
  serviceType?: string;  // ex "Rénovation intérieure"
  name?: string;         // override du title du service
};

function toAbsoluteUrl(siteUrl: string, url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${siteUrl.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
}

/**
 * Helper principal : JSON-LD Service
 * - Pour une page ville : passe city + postalCode
 * - Pour une page pilier département : passe department
 */
export function buildServiceJsonLd(params: BuildServiceParams) {
  const absUrl = toAbsoluteUrl(params.siteUrl, params.url);

  const areaServed =
    params.city && params.postalCode
      ? {
          "@type": "City",
          name: params.city,
          postalCode: params.postalCode,
          addressCountry: "FR",
        }
      : params.department
      ? {
          "@type": "AdministrativeArea",
          name: params.department,
          addressCountry: "FR",
        }
      : {
          "@type": "AdministrativeArea",
          name: "Île-de-France",
          addressCountry: "FR",
        };

  const finalName =
    params.name ??
    (params.city && params.postalCode
      ? `Rénovation d’appartement à ${params.city} (${params.postalCode})`
      : params.department
      ? `Rénovation intérieure – ${params.department}`
      : "Rénovation intérieure");

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: finalName,
    serviceType: params.serviceType ?? "Rénovation intérieure",
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: params.businessName,
      url: params.siteUrl,
    },
    areaServed,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: absUrl,
    },
  };
}

type BreadcrumbItem = {
  name: string;
  url: string; // relatif ou absolu
};

export function buildBreadcrumbJsonLd(siteUrl: string, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: toAbsoluteUrl(siteUrl, it.url),
    })),
  };
}

type FaqItem = { q: string; a: string };

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };
}
