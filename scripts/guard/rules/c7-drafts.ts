/* C7 (source side) — DRAFT nodes, unfilled placeholders, unwritten metadata, literal [[KEY]] strings. */
import { routes } from "../../../content/routes";
import { placeholders } from "../../../content/placeholders";
import type { Finding } from "../types";
import { lineOf, type SourceFile } from "../files";
import { at, flatten, flattenAr, needsArabic, type CopyLocation } from "../walk";

export function c7(copy: CopyLocation[], files: SourceFile[]): Finding[] {
  const findings: Finding[] = [];

  for (const loc of copy) {
    const unfilled = loc.copy.body.flatMap((s) =>
      typeof s === "object" && "ph" in s && placeholders[s.ph].value === null ? [s.ph] : [],
    );
    if (loc.copy.status === "draft")
      findings.push({
        rule: "C7",
        severity: "error",
        where: at(loc),
        match: `DRAFT: ${flatten(loc.copy)}`,
        fix: "The team locks or rewrites it in docs/CONTENT.md; then sync.",
      });
    if (needsArabic(loc.copy) && !loc.copy.ar)
      findings.push({
        rule: "C7",
        severity: "error",
        where: `${at(loc)} (ar)`,
        match: `Arabic missing: ${flatten(loc.copy)}`,
        fix: "Draft the Arabic in the module's .ar.ts mirror and docs/CONTENT.ar.md.",
      });
    if (loc.copy.ar?.status === "draft")
      findings.push({
        rule: "C7",
        severity: "error",
        where: `${at(loc)} (ar)`,
        match: `Arabic DRAFT: ${flattenAr(loc.copy)}`,
        fix: "A native Arabic reviewer approves it (ard → arl) in the .ar.ts mirror and docs/CONTENT.ar.md.",
      });
    if (unfilled.length)
      findings.push({
        rule: "C7",
        severity: "error",
        where: at(loc),
        match: unfilled.map((k) => `[[${k}]]`).join(" "),
        fix: `Fill in content/placeholders.ts (owner: ${[...new Set(unfilled.map((k) => placeholders[k].owner))].join(", ")}).`,
      });
  }

  for (const route of routes)
    for (const field of ["title", "description"] as const)
      if (route.meta[field] === null)
        findings.push({
          rule: "C7",
          severity: "error",
          where: `content/routes.ts › routes.${route.key}.meta.${field}`,
          match: `meta ${field} not written`,
          fix: "Written in Prompt 7 and approved by the team.",
        });

  for (const f of files)
    for (const m of f.code.matchAll(/\[\[[A-Z][A-Z0-9_]*\]\]/g))
      findings.push({
        rule: "C7",
        severity: "error",
        where: `${f.path}:${lineOf(f.code, m.index)}`,
        match: m[0],
        fix: "Reference the key with ph() from content/schema.ts; never write [[KEY]] literally.",
      });

  return findings;
}
