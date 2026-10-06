/* Shared text scanning for the wording rules (C3, C3a, C4). */
export type Target = { where: string; text: string };

export type Hit = { where: string; excerpt: string; full: string; matched: string };

/** Each match with up to 40 characters of context either side. */
export function scanText(targets: Target[], re: RegExp): Hit[] {
  const hits: Hit[] = [];
  for (const t of targets) {
    for (const m of t.text.matchAll(new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g"))) {
      const start = Math.max(0, m.index - 40);
      const end = Math.min(t.text.length, m.index + m[0].length + 40);
      const excerpt = `${start > 0 ? "…" : ""}${t.text.slice(start, end)}${end < t.text.length ? "…" : ""}`;
      hits.push({ where: t.where, excerpt: excerpt.replace(/\s+/g, " "), full: t.text, matched: m[0] });
    }
  }
  return hits;
}
