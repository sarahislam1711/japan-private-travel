/* C4 — Superlatives (tone of voice). Each occurrence needs an approval entry. */
import type { Finding } from "../types";
import { scanText, type Target } from "./scan";

const words = /\b(best|finest|world-class|unparalleled|unrivalled|ultimate|exceptional|luxury|luxurious|bespoke|curated|unforgettable|seamless|once-in-a-lifetime)\b/gi;

export function c4(targets: Target[]): Finding[] {
  return scanText(targets, words).map((hit) => ({
    rule: "C4",
    severity: "warning" as const,
    where: hit.where,
    match: hit.excerpt,
    fix: "Reword, or the team adds an approval entry for this exact string.",
  }));
}
