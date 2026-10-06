/* C8 — Logical properties only, in CSS and in Tailwind class names. */
import type { Finding } from "../types";
import { lineOf, type SourceFile } from "../files";

const css = [
  /(?<![\w-])(?:margin|padding|border|scroll-margin|scroll-padding)-(?:left|right)\b/g,
  /(?<![\w-])(?:left|right)\s*:/g,
  /text-align\s*:\s*(?:left|right)\b/g,
  /float\s*:\s*(?:left|right)\b/g,
];

// Tailwind utilities with any modifier prefix (md:, hover:, rtl:, !) and optional negative.
const tw =
  /(?<=^|[\s"'`{(])!?(?:[\w-]+:)*!?-?(?:(?:m[lr]|p[lr]|left|right)-[\w./[\]()%-]+|(?:rounded-[lr]|border-[lr])(?:-[\w./[\]()%-]+)?|text-(?:left|right)|float-(?:left|right))(?=$|[\s"'`})])/gm;

export function c8(files: SourceFile[]): Finding[] {
  const findings: Finding[] = [];
  for (const f of files) {
    const res = f.path.endsWith(".css") ? css : [...css, tw];
    for (const re of res)
      for (const m of f.code.matchAll(re))
        findings.push({
          rule: "C8",
          severity: "error",
          where: `${f.path}:${lineOf(f.code, m.index)}`,
          match: m[0].trim(),
          fix: "Use logical equivalents: ms-/me-/ps-/pe-/start-/end-/text-start/text-end, margin-inline-start, inset-inline-start.",
        });
  }
  return findings;
}
