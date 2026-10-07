import { placeholders, type PlaceholderKey } from "@content/placeholders";
import type { Locale } from "@content/routes";
import type { Copy, Segment } from "@content/schema";

export function placeholderValue(key: PlaceholderKey): string | null {
  return placeholders[key].value;
}

const onlyPlaceholders = (body: Segment[]) => body.every((s) => typeof s === "object" && "ph" in s);
/** Japanese-only nodes (place names, the registration line) read the same on both sites. */
const sameInEveryLanguage = (copy: Copy) => copy.lang === "ja" || onlyPlaceholders(copy.body);

export type Resolved = { status: Copy["status"]; body: Segment[]; missing: boolean };

/**
 * The text of a node in a language. Arabic comes from the node's .ar mirror;
 * nodes that read the same in every language reuse the English body. A missing
 * Arabic string is reported as missing, never filled with English.
 */
export function resolve(copy: Copy, locale: Locale): Resolved {
  if (locale === "en" || sameInEveryLanguage(copy)) return { status: copy.status, body: copy.body, missing: false };
  if (copy.ar) return { status: copy.ar.status, body: copy.ar.body, missing: false };
  return { status: "draft", body: copy.body, missing: true };
}

function segmentText(segment: Segment): string {
  if (typeof segment === "string") return segment;
  if ("ph" in segment) return placeholderValue(segment.ph) ?? `[[${segment.ph}]]`;
  return segment.text;
}

/** Plain text of a node in a language. Unfilled placeholders appear as [[KEY]]; missing Arabic as [[AR]]. */
export function copyText(copy: Copy, locale: Locale = "en"): string {
  const r = resolve(copy, locale);
  if (r.missing) return "[[AR]]";
  return r.body.map(segmentText).join("");
}

/** True when every placeholder in the node has a value. */
export function isResolved(copy: Copy): boolean {
  return copy.body.every((s) => typeof s === "string" || !("ph" in s) || placeholderValue(s.ph) !== null);
}

/** True when the node can appear in production in this language: locked, resolved, translated. */
export function isPublishable(copy: Copy, locale: Locale = "en"): boolean {
  const r = resolve(copy, locale);
  return !r.missing && r.status === "locked" && isResolved(copy);
}
