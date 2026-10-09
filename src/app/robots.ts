import type { MetadataRoute } from "next";
import { privatePathPrefixes } from "@content/routes";
import { isIndexable } from "@/lib/indexing";
import { siteUrl } from "@/lib/site-url";

// Search engines named explicitly alongside the wildcard.
const searchCrawlers = ["Googlebot", "Bingbot", "Applebot", "DuckDuckBot", "YandexBot"];

// AI crawlers named explicitly, so the site can be read and cited by AI search and assistants.
// Decision (9 Oct 2026): allowed. Nothing here is paywalled or proprietary; being cited is the point.
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
  "Amazonbot",
  "meta-externalagent",
  "DuckAssistBot",
  "MistralAI-User",
];

// Never crawled: the gated portal (C9) and the dev-only styleguide, in both languages.
const blocked = [...privatePathPrefixes, ...privatePathPrefixes.map((p) => `/ar${p}`), "/styleguide", "/ar/styleguide", "/admin", "/api"];

/**
 * Production on the real domain: everything public is open to search engines
 * and AI crawlers. Previews, local builds and pre-domain builds: closed.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable()) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: blocked },
      { userAgent: searchCrawlers, allow: "/", disallow: blocked },
      { userAgent: aiCrawlers, allow: "/", disallow: blocked },
    ],
    sitemap: new URL("/sitemap.xml", siteUrl()).toString(),
    host: siteUrl().host,
  };
}
