/* C2 — Trade-name line names the registered entity (Art. 14-2). */
import { site } from "../../../content/site";
import type { Finding } from "../types";

export function c2(): Finding[] {
  const line = site.tradeNameLine;
  const namesEntity = line?.body.some((s) => typeof s === "object" && "ph" in s && s.ph === "ENTITY_NAME_EN");
  if (line && namesEntity) return [];
  return [
    {
      rule: "C2",
      severity: "error",
      where: "content/site.ts › site.tradeNameLine",
      match: line ? "does not reference ENTITY_NAME_EN" : "missing",
      fix: "The brand must read as a trading name of the registered entity, named in the line.",
    },
  ];
}
