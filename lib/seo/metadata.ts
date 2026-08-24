import type { Metadata } from "next";

import { absoluteUrl, findRoute, person } from "@/config/site";
import { markdownPathFor } from "@/lib/content/markdown";

/**
 * Canonical URL plus the `rel="alternate" type="text/markdown"` pointer that
 * lets an agent discover the markdown twin of a page without guessing.
 */
export function alternatesFor(path: string): Metadata["alternates"] {
  return {
    canonical: absoluteUrl(path),
    types: {
      "text/markdown": absoluteUrl(markdownPathFor(path)),
    },
  };
}

/** Full metadata for a route described in `config/site.ts`. */
export function buildPageMetadata(path: string): Metadata {
  const route = findRoute(path);
  if (!route) {
    throw new Error(`No site route configured for "${path}"`);
  }

  const image = {
    url: person.image,
    width: 1200,
    height: 630,
    alt: "Aakrit Subedi - Software Engineer Portfolio",
  };

  return {
    title: route.title,
    description: route.description,
    alternates: alternatesFor(route.path),
    robots: "index, follow",
    openGraph: {
      title: route.title,
      description: route.description,
      url: absoluteUrl(route.path),
      images: [image],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
      creator: "@SubediAakrit",
      images: [person.image],
    },
  };
}
