/*
 * Compliance guard — docs/COMPLIANCE.md.
 *   pnpm guard       report errors and warnings, exit 0
 *   pnpm guard:prod  exit 1 on any error or any unapproved warning
 */
import { approvals } from "../../content/approvals";
import { crawl } from "./crawl";
import { sourceFiles } from "./files";
import { c2 } from "./rules/c2-trade-name";
import { c3 } from "./rules/c3-banned";
import { c3a } from "./rules/c3a-halal";
import { c4 } from "./rules/c4-superlatives";
import { c5 } from "./rules/c5-claims";
import { c7 } from "./rules/c7-drafts";
import { c8 } from "./rules/c8-logical";
import { c10 } from "./rules/c10-scripts";
import type { Target } from "./rules/scan";
import { sync } from "./rules/sync";
import type { Finding, Mode } from "./types";
import { allCopy, at, flatten } from "./walk";

const mode: Mode = process.argv.includes("--prod") ? "prod" : "dev";

const copy = allCopy();
const files = sourceFiles();
const codeFiles = files.filter((f) => !f.path.startsWith("content/"));

// Wording rules read content as rendered text, and /src with comments removed.
const wording: Target[] = [
  ...copy.map((loc) => ({ where: at(loc), text: flatten(loc.copy) })),
  ...codeFiles.map((f) => ({ where: f.path, text: f.code })),
];

const findings: Finding[] = [
  ...c2(),
  ...c3(wording),
  ...c3a(wording),
  ...c4(wording),
  ...c5(copy),
  ...c7(copy, files),
  ...c8(files),
  ...c10(files),
  ...sync(copy),
];

async function main() {
const rendered = await crawl();

const approved = (f: Finding) =>
  f.severity === "warning" &&
  approvals.some((a) => a.rule === f.rule && f.match.includes(a.string.length > 0 ? a.string : "\u0000"));

const order = ["C1", "C2", "C3", "C3a", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12", "SYNC"];
const byRule = Map.groupBy(findings, (f) => f.rule);
const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + "…" : s);

for (const rule of order) {
  const list = byRule.get(rule);
  if (!list?.length) continue;
  console.log(`\n${rule} — ${list.length} finding${list.length === 1 ? "" : "s"}`);
  for (const f of list) {
    const sev = approved(f) ? "approved" : f.severity;
    console.log(`  ${sev.padEnd(8)} ${f.where}`);
    console.log(`           ${clip(f.match, 140)}`);
    console.log(`           fix: ${f.fix}`);
  }
}

const errors = findings.filter((f) => f.severity === "error");
const warnings = findings.filter((f) => f.severity === "warning" && !approved(f));
const count = (list: Finding[]) =>
  Object.entries(Object.groupBy(list, (f) => f.rule))
    .map(([r, l]) => `${r} ${l!.length}`)
    .join(", ") || "none";

console.log(`\nGuard (${mode}) — source scan`);
console.log(`  errors:   ${errors.length} (${count(errors)})`);
console.log(`  warnings: ${warnings.length} unapproved (${count(warnings)})`);
console.log(`  render crawl: ${rendered.ran ? "ran" : "not implemented yet (Prompt 8) — C1, C6, C9, C11, C12 unchecked"}`);

if (mode === "prod" && (errors.length || warnings.length)) {
  console.log("\nguard:prod FAILED — production build blocked.");
  process.exit(1);
}
}

void main();
