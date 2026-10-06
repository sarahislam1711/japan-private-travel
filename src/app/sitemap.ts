import type { MetadataRoute } from "next";
import { routes } from "@content/routes";
import { siteUrl } from "@/lib/site-url";

// From content/routes.ts only: the portal is never listed (C9).
// No lastModified: there are no real dates to give yet.
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route.path, siteUrl()).toString(),
    priority: route.priority,
  }));
}
