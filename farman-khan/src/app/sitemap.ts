import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

// Populated automatically once NEXT_PUBLIC_SITE_URL (the real domain) is set.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE.url) return [];
  return [{ url: `${SITE.url}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
