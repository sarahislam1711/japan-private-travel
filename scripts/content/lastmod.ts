/*
 * Records when each page's content last changed (git commit dates of its
 * content module, Arabic mirror and page file) in content/lastmod.json, for
 * the sitemap's <lastmod> and the pages' dateModified. Runs before each build;
 * on a shallow clone (no history, as on Vercel) it keeps the committed file.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { pages } from "../../content/index";
import { routes } from "../../content/routes";

const OUT = "content/lastmod.json";

function main() {
  let shallow = true;
  try {
    shallow = execFileSync("git", ["rev-parse", "--is-shallow-repository"]).toString().trim() !== "false";
  } catch {}
  if (shallow) {
    console.log(`lastmod: no full git history; keeping ${OUT}`);
    return;
  }
  const dates: Record<string, string> = {};
  for (const r of routes) {
    const file = pages[r.key].file;
    const pageDir = r.path === "/" ? "src/app/[lang]/(site)/page.tsx" : `src/app/[lang]/(site)${r.path}/page.tsx`;
    const files = [file, file.replace(/\.ts$/, ".ar.ts"), pageDir].filter((f) => existsSync(f));
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...files]).toString().trim();
    if (iso) dates[r.key] = new Date(iso).toISOString();
  }
  const next = JSON.stringify(dates, null, 2) + "\n";
  const prev = existsSync(OUT) ? readFileSync(OUT, "utf8") : "";
  if (next !== prev) writeFileSync(OUT, next);
  console.log(`lastmod: ${Object.keys(dates).length} pages`);
}

main();
