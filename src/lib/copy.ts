import { placeholders, type PlaceholderKey } from "@content/placeholders";
import type { Copy, Segment } from "@content/schema";

export function placeholderValue(key: PlaceholderKey): string | null {
  return placeholders[key].value;
}

function segmentText(segment: Segment): string {
  if (typeof segment === "string") return segment;
  if ("ph" in segment) return placeholderValue(segment.ph) ?? `[[${segment.ph}]]`;
  return segment.text;
}

/** Plain text of a copy node. Unfilled placeholders appear as [[KEY]]. */
export function copyText(copy: Copy): string {
  return copy.body.map(segmentText).join("");
}

/** True when every placeholder in the node has a value. */
export function isResolved(copy: Copy): boolean {
  return copy.body.every((s) => typeof s === "string" || !("ph" in s) || placeholderValue(s.ph) !== null);
}

/** True when the node can appear in production: locked and fully resolved. */
export function isPublishable(copy: Copy): boolean {
  return copy.status === "locked" && isResolved(copy);
}
