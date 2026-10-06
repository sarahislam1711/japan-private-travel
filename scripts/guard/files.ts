/* Source files the guard scans: /content and /src (which includes /src/styles). */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

// Commands run from the repo root (pnpm scripts).
export const root = process.cwd();

function list(dir: string, exts: string[]): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...list(full, exts));
    else if (exts.some((e) => name.endsWith(e))) out.push(full);
  }
  return out;
}

export type SourceFile = { path: string; text: string; code: string };

/** Removes comments so rules see only code and strings. Line count is preserved. */
export function stripComments(text: string): string {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:"'`\\])\/\/[^\n]*/g, "$1");
}

export function sourceFiles(dirs = ["content", "src"], exts = [".ts", ".tsx", ".css"]): SourceFile[] {
  return dirs.flatMap((d) =>
    list(join(root, d), exts).map((full) => {
      const text = readFileSync(full, "utf8");
      return { path: relative(root, full), text, code: stripComments(text) };
    }),
  );
}

export function lineOf(text: string, index: number): number {
  return text.slice(0, index).split("\n").length;
}
