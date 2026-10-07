/*
 * SYNC — every content string must appear verbatim in docs/CONTENT.md
 * (placeholders match any [[KEY]]). Not a COMPLIANCE.md rule: it proves the
 * transcription in /content is exact, which CLAUDE.md rule 1 depends on.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { placeholders } from "../../../content/placeholders";
import type { Finding } from "../types";
import { root } from "../files";
import { at, flattenAr, needsArabic, type CopyLocation } from "../walk";

const doc = readFileSync(join(root, "docs/CONTENT.md"), "utf8")
  .replace(/^>\s?/gm, "")
  .replace(/\*\*|`|\*/g, "")
  .replace(/\s+/g, " ");

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, " ");

const arSheet = (() => {
  try {
    return readFileSync(join(root, "docs/CONTENT.ar.md"), "utf8").replace(/\\\|/g, "|").replace(/\s+/g, " ");
  } catch {
    return "";
  }
})();

/** Arabic must appear in docs/CONTENT.ar.md exactly as in /content (regenerate with pnpm content:ar). */
export function syncAr(copy: CopyLocation[]): Finding[] {
  return copy.flatMap((loc) => {
    const ar = flattenAr(loc.copy);
    if (!ar || !needsArabic(loc.copy) || arSheet.includes(ar.replace(/\s+/g, " "))) return [];
    return [
      {
        rule: "SYNC",
        severity: "error" as const,
        where: `${at(loc)} (ar)`,
        match: ar,
        fix: "Not in docs/CONTENT.ar.md. Run pnpm content:ar to regenerate the review sheet.",
      },
    ];
  });
}

export function sync(copy: CopyLocation[]): Finding[] {
  return copy.flatMap((loc) => {
    const body = loc.copy.body;
    // A node that is only a "copy" placeholder has, by definition, no text in CONTENT.md yet.
    if (body.every((s) => typeof s === "object" && "ph" in s && placeholders[s.ph].kind === "copy")) return [];
    const pattern = body
      .map((s) => {
        if (typeof s === "string") return escape(s);
        if (!("ph" in s)) return escape(s.text);
        // A placeholder matches any [[KEY]] in the doc, or its value once filled.
        const value = placeholders[s.ph].value;
        return value === null ? "\\[\\[[^\\]]*\\]\\]" : `(?:\\[\\[[^\\]]*\\]\\]|${escape(value)})`;
      })
      .join("");
    if (new RegExp(pattern).test(doc)) return [];
    return [
      {
        rule: "SYNC",
        severity: "error" as const,
        where: at(loc),
        match: body.map((s) => (typeof s === "string" ? s : "ph" in s ? `[[${s.ph}]]` : s.text)).join(""),
        fix: "Not found verbatim in docs/CONTENT.md. Re-transcribe exactly.",
      },
    ];
  });
}
