import type { MetadataRoute } from "next";

import { absoluteUrl, siteRoutes } from "@/config/site";

/**
 * Generated from `config/site.ts` so a new route cannot be added without also
 * appearing in the sitemap, llms.txt and the markdown variants.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
