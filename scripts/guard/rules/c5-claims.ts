/* C5 — Every referenced claim has sourceUrl, publisher and a verifiedOn under 180 days old. */
import { claims } from "../../../content/claims";
import type { Finding } from "../types";
import type { CopyLocation } from "../walk";

const MAX_AGE_DAYS = 180;

export function c5(copy: CopyLocation[], today = new Date()): Finding[] {
  const referenced = new Map<string, string[]>();
  for (const loc of copy)
    for (const id of loc.copy.claims ?? []) referenced.set(id, [...(referenced.get(id) ?? []), `${loc.file} › ${loc.path}`]);

  const findings: Finding[] = [];
  for (const [id, where] of referenced) {
    const claim = claims.find((c) => c.id === id);
    const missingFields = !claim
      ? ["not in register"]
      : (["sourceUrl", "publisher", "verifiedOn"] as const).filter((f) => !claim[f]);
    if (missingFields.length) {
      findings.push({
        rule: "C5",
        severity: "error",
        where: where.join(", "),
        match: `${id} missing ${missingFields.join(", ")}`,
        fix: `Attach a checked source in content/claims.ts. Status: ${claim?.sourceStatus ?? "—"}`,
      });
      continue;
    }
    const age = (today.getTime() - new Date(claim!.verifiedOn!).getTime()) / 86_400_000;
    if (age > MAX_AGE_DAYS)
      findings.push({
        rule: "C5",
        severity: "error",
        where: where.join(", "),
        match: `${id} verified ${claim!.verifiedOn} (${Math.floor(age)} days ago)`,
        fix: "Re-check the source and update verifiedOn.",
      });
  }
  return findings;
}
