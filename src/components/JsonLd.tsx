import React from "react";

type JsonLdProps = {
  data: Record<string, any> | Record<string, any>[];
  id?: string; // utile pour dédoublonnage/debug
};

export default function JsonLd({ data, id }: JsonLdProps) {
  const json = Array.isArray(data) ? data : [data];

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, '\\u003c') }}
    />
  );
}
