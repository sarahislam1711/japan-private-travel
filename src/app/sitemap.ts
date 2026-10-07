import type { MetadataRoute } from "next";
import { routes } from "@content/routes";
import { absolute } from "@/lib/metadata";

// Every route in both languages, each listing its alternates (hreflang in the sitemap).
// The portal is never listed (C9). No lastModified: there are no real dates to give yet.
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) => {
    const languages = { en: absolute(route.key, "en"), ar: absolute(route.key, "ar"), "x-default": absolute(route.key, "en") };
    return (["en", "ar"] as const).map((locale) => ({
      url: absolute(route.key, locale),
      priority: route.priority,
      alternates: { languages },
    }));
  });
}
