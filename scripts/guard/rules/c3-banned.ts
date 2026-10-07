/* C3 — Banned claims (strategy §6, §7.6). Patterns exactly as COMPLIANCE.md states them. */
import type { Finding } from "../types";
import { scanText, type Target } from "./scan";

const patterns: { re: RegExp; why: string }[] = [
  { re: /licensed (under|by)|accredited by|certified by (JATA|ANTA|ETAA)/gi, why: "Associations are memberships, not licensors — Art. 12-8" },
  { re: /government[- ]licensed|licensed guide|certified guide|通訳案内士/gi, why: "Title protection under the 通訳案内士法" },
  { re: /exclusive access|private access|after[- ]hours|relationship (held|since)|behind closed doors/gi, why: "Purchasable access presented as relational — Art. 12-8" },
  { re: /we have (operated|been operating|worked) since|(founded|established) in \d{4}/gi, why: "Years of operation the entity may not have" },
  { re: /guarantee[ds]? (a )?female driver|female drivers? (on request|available)/gi, why: "Promise the business cannot confirm; 白タク exposure" },
  { re: /clients? (come|travel) from/gi, why: "Unverifiable client-city lists" },
  { re: /from (US)?\$|from ¥|per person|pp\b|packages? from/gi, why: "No pricing language on public pages" },
  // Arabic equivalents (Arabic site). Meaning-level mirrors of the rules above; to be confirmed by the 行政書士.
  { re: /مرخّ?صة? (من|لدى)|معتمدة? من|حاصلة? على اعتماد/g, why: "Associations are memberships, not licensors — Art. 12-8 (Arabic)" },
  { re: /مرشد(ون)? (مرخّ?ص|معتمد)|مرشد سياحي حكومي/g, why: "Title protection under the 通訳案内士法 (Arabic)" },
  { re: /دخول حصري|وصول حصري|بعد ساعات (العمل|الإغلاق)|خلف الأبواب المغلقة/g, why: "Purchasable access presented as relational — Art. 12-8 (Arabic)" },
  { re: /نضمن (توفير )?سائقة|سائقات (عند الطلب|متوفرات)/g, why: "Promise the business cannot confirm (Arabic)" },
  { re: /تبدأ الأسعار من|الأسعار من|للشخص الواحد|باقات (تبدأ )?من/g, why: "No pricing language on public pages (Arabic)" },
];

export function c3(targets: Target[]): Finding[] {
  return patterns.flatMap(({ re, why }) =>
    scanText(targets, re).map((hit) => ({
      rule: "C3",
      severity: "error" as const,
      where: hit.where,
      match: hit.excerpt,
      fix: `Remove or reword. ${why}`,
    })),
  );
}
