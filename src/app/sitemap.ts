import type { MetadataRoute } from "next";
import lastmod from "@content/lastmod.json";
import { routes, type RouteKey } from "@content/routes";
import { absolute } from "@/lib/site-url";

// How often each page honestly changes: trip pages are revised each season; legal pages rarely.
const changeFrequency: Partial<Record<RouteKey, "weekly" | "monthly" | "yearly">> = { privacy: "yearly", terms: "yearly" };

// Every route in both languages, each listing its alternates (hreflang in the sitemap).
// <lastmod> is when the page's content last changed (content/lastmod.json, from git).
// The portal and the admin area are never listed (C9).
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) => {
    const languages = { en: absolute(route.key, "en"), ar: absolute(route.key, "ar"), "x-default": absolute(route.key, "en") };
    const modified = (lastmod as Record<string, string>)[route.key];
    return (["en", "ar"] as const).map((locale) => ({
      url: absolute(route.key, locale),
      lastModified: modified ? new Date(modified) : undefined,
      changeFrequency: changeFrequency[route.key] ?? "monthly",
      priority: route.priority,
      alternates: { languages },
    }));
  });
}
