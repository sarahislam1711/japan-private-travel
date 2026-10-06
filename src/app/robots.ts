import type { MetadataRoute } from "next";
import { privatePathPrefixes } from "@content/routes";
import { isIndexable } from "@/lib/indexing";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable()) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: [...privatePathPrefixes] },
    sitemap: new URL("/sitemap.xml", siteUrl()).toString(),
  };
}
