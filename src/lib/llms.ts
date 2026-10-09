import { pageMeta } from "@content/meta";
import { about } from "@content/pages/about";
import { home } from "@content/pages/home";
import { privateJapan } from "@content/pages/private-japan";
import { summerJourneys } from "@content/pages/summer-journeys";
import { localePath, routes, type RouteKey } from "@content/routes";
import type { Copy } from "@content/schema";
import { site } from "@content/site";
import { copyText, isPublishable } from "@/lib/copy";
import { siteUrl } from "@/lib/site-url";

/**
 * /llms.txt and /llms-full.txt (llmstxt.org): a curated, editor's-voice brief
 * on HalaJapan for AI assistants, written from the site's own approved copy.
 * In production a string appears only once it is approved, so drafts never
 * leave the building; empty sections are dropped.
 */
export function buildLlms(full: boolean) {
  const prod = process.env.NODE_ENV === "production";
  const t = (c: Copy, locale: "en" | "ar" = "en") => (!prod || isPublishable(c, locale) ? copyText(c, locale) : null);
  const url = (key: RouteKey, locale: "en" | "ar" = "en") => new URL(encodeURI(localePath(key, locale)), siteUrl()).toString();
  const out: string[] = [];
  const section = (heading: string, lines: (string | null | false | undefined)[]) => {
    const kept = lines.filter((l): l is string => Boolean(l));
    if (kept.length) out.push(`## ${heading}`, "", ...kept, "");
  };
  const brand = copyText(site.brand.name);

  out.push(`# ${brand}`, "");
  const summary = t(home.hero.paragraph);
  if (summary) out.push(`> ${summary}`, "");
  out.push(
    ...[t(about.intro), ...about.registration.steps.slice(1).map((s) => t(s.title) && t(s.text) && `- **${t(s.title)}**: ${t(s.text)}`)].filter(
      (l): l is string => Boolean(l),
    ),
    "",
  );

  section("What we offer", [
    t(home.entryPoints.summerJourneys.text) && `- **Summer Journeys** (${url("summerJourneys")}): ${t(home.entryPoints.summerJourneys.text)}`,
    t(home.entryPoints.privateJapan.text) && `- **Private Japan** (${url("privateJapan")}): ${t(home.entryPoints.privateJapan.text)}`,
  ]);

  section("How we work", [
    t(home.faq.items[1].answer),
    ...home.howWeWork.points.map((p) => t(p.lead) && `- ${t(p.lead)}${full && t(p.body) ? ` ${t(p.body)}` : ""}`),
  ]);

  if (full) {
    section(
      "Summer regions (July and August)",
      summerJourneys.regions.flatMap((r) => {
        const name = t(r.heading);
        if (!name) return [];
        const facts = [
          [summerJourneys.factLabels.bestWeeks, r.bestWeeks],
          [summerJourneys.factLabels.stay, r.stay],
          [summerJourneys.factLabels.fromTokyo, r.fromTokyo],
          [r.extra.label, r.extra.value],
        ]
          .map(([l, v]) => t(l) && t(v) && `${t(l)}: ${t(v)}`)
          .filter(Boolean)
          .join(" · ");
        const note = "note" in r && r.note ? t(r.note) : null;
        return [`### ${name}`, "", t(r.body), facts || null, note, ""].filter((l): l is string => typeof l === "string");
      }),
    );
    section("Private Japan", [t(privateJapan.lede)]);
    section(
      "Frequently asked questions",
      home.faq.items.flatMap((q) => (t(q.question) && t(q.answer) ? [`**${t(q.question)}**`, t(q.answer), ""] : [])),
    );
    section(
      "Company facts",
      about.facts.rows.map((r) => t(r.label) && t(r.value) && `- ${t(r.label)}: ${t(r.value)}`),
    );
  }

  section("Offices and contact", [
    ...about.offices.list.map((o) => t(o.name) && `- ${t(o.name)}: ${t(o.address)} · Tel ${o.tel}`),
    t(about.offices.hours) && `- ${t(about.offices.hours)}`,
    `- Plan a trip or send an enquiry: ${url("contact")}`,
  ]);

  section(
    "Pages",
    routes.map((r) => t(pageMeta[r.key].title) && `- [${t(pageMeta[r.key].title)}](${url(r.key)})${t(pageMeta[r.key].description) ? `: ${t(pageMeta[r.key].description)}` : ""}`),
  );
  section(
    "الصفحات بالعربية",
    routes.map((r) => t(pageMeta[r.key].title, "ar") && `- [${t(pageMeta[r.key].title, "ar")}](${url(r.key, "ar")})`),
  );
  if (!full) section("More", [`- Full brief with regions, FAQ and company facts: ${new URL("/llms-full.txt", siteUrl())}`]);

  return out.join("\n");
}
