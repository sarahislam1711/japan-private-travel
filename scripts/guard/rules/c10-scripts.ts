/* C10 (source side) — third-party scripts and connect-src only from the allowed hosts. */
import type { Finding } from "../types";
import { lineOf, type SourceFile } from "../files";

const allowed = [/^plausible\.io$/, /^challenges\.cloudflare\.com$/, /^[a-z0-9]+\.supabase\.co$/];
const isAllowed = (host: string) => allowed.some((re) => re.test(host));

export function c10(files: SourceFile[]): Finding[] {
  const findings: Finding[] = [];
  for (const f of files) {
    const checks = [
      ...f.code.matchAll(/<(?:script|Script)\b[^>]*?\bsrc=\{?["'`]https?:\/\/([^/"'`]+)/g),
      ...f.code.matchAll(/connect-src[^;"'`]*?https?:\/\/([^/\s;"'`]+)/g),
    ];
    for (const m of checks)
      if (!isAllowed(m[1]))
        findings.push({
          rule: "C10",
          severity: "error",
          where: `${f.path}:${lineOf(f.code, m.index)}`,
          match: m[1],
          fix: "Only self, Plausible, Cloudflare Turnstile and the Supabase project URL (portal only) are allowed.",
        });
  }
  return findings;
}
