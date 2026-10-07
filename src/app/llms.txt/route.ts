import { pageMeta } from "@content/meta";
import { home } from "@content/pages/home";
import { localePath, routes } from "@content/routes";
import { site } from "@content/site";
import { copyText, isPublishable } from "@/lib/copy";
import { isIndexable } from "@/lib/indexing";
import { siteUrl } from "@/lib/site-url";

/**
 * /llms.txt — a plain summary of the site for AI systems (llmstxt.org): what
 * HalaJapan is and its key pages in English and Arabic. In production it
 * carries only approved copy; drafts never leave the building.
 */
export function GET() {
  const prod = process.env.NODE_ENV === "production";
  const use = (c: Parameters<typeof copyText>[0], locale: "en" | "ar") => (!prod || isPublishable(c, locale) ? copyText(c, locale) : null);
  const url = (p: string) => new URL(p, siteUrl()).toString();

  const lines = [`# ${copyText(site.brand.name)}`, ""];
  const summary = use(home.hero.paragraph, "en");
  if (summary) lines.push(`> ${summary}`, "");
  for (const locale of ["en", "ar"] as const) {
    lines.push(locale === "en" ? "## Pages (English)" : "## Pages (العربية)", "");
    for (const r of routes) {
      const title = use(pageMeta[r.key].title, locale);
      const description = use(pageMeta[r.key].description, locale);
      if (title) lines.push(`- [${title}](${url(encodeURI(localePath(r.key, locale)))})${description ? `: ${description}` : ""}`);
    }
    lines.push("");
  }
  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      ...(isIndexable() ? {} : { "x-robots-tag": "noindex, nofollow" }),
    },
  });
}
