/* Header navigation — docs/CONTENT.md §2. Labels come from routes.ts navLabel unless a group sets its own. */
import type { RouteKey } from "./routes";
import { locked, type Copy } from "./schema";

export type NavEntry =
  | { kind: "group"; label: Copy; items: RouteKey[] }
  | { kind: "link"; route: RouteKey }
  | { kind: "cta"; route: RouteKey };

export const mainNav: NavEntry[] = [
  { kind: "group", label: locked("Trips"), items: ["summerJourneys", "privateJapan"] },
  { kind: "link", route: "familyServices" },
  { kind: "link", route: "experiences" },
  { kind: "link", route: "about" },
  { kind: "cta", route: "contact" },
];
