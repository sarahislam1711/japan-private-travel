import type { MetadataRoute } from "next";
import { privatePathPrefixes } from "@content/routes";
import { isIndexable } from "@/lib/indexing";
import { siteUrl } from "@/lib/site-url";

// AI crawlers named explicitly, so the site can be read and cited by AI search and assistants.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

// Never crawled: the gated portal (C9) and the dev-only styleguide, in both languages.
const blocked = [...privatePathPrefixes, ...privatePathPrefixes.map((p) => `/ar${p}`), "/styleguide", "/ar/styleguide"];

/**
 * Production on the real domain: everything public is open to search engines
 * and AI crawlers. Previews, local builds and pre-domain builds: closed.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable()) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: blocked },
      { userAgent: aiCrawlers, allow: "/", disallow: blocked },
    ],
    sitemap: new URL("/sitemap.xml", siteUrl()).toString(),
    host: siteUrl().host,
  };
}
