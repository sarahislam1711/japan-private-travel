/* C3a — "halal" within 60 characters of pork-free, kitchen, menu or friendly. Review, not error. */
import type { Finding } from "../types";
import { scanText, type Target } from "./scan";

const near = /halal[\s\S]{0,60}?(pork-free|kitchen|menu|friendly)|(pork-free|kitchen|menu|friendly)[\s\S]{0,60}?halal/gi;

export function c3a(targets: Target[]): Finding[] {
  return scanText(targets, near).map((hit) => ({
    rule: "C3a",
    severity: "warning" as const,
    where: hit.where,
    match: hit.excerpt,
    fix: "Needs an approval entry confirming 'halal' is not applied to anything uncertified.",
  }));
}
