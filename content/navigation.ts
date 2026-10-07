/* Header navigation — docs/CONTENT.md §2. Labels come from routes.ts navLabel unless a group sets its own. */
import type { RouteKey } from "./routes";
import { mainNavAr } from "./navigation.ar";
import { attachArabic, draft, locked, type Copy } from "./schema";

export type NavEntry =
  | { kind: "group"; label: Copy; items: { route: RouteKey; description: Copy }[] }
  | { kind: "link"; route: RouteKey }
  /** A quieter link with its own short label. */
  | { kind: "utility"; route: RouteKey; label: Copy }
  | { kind: "cta"; route: RouteKey };

export const mainNav: NavEntry[] = [
  {
    kind: "group",
    label: locked("Trips"),
    // Short menu descriptions (CONTENT.md §2), drafts.
    items: [
      { route: "summerJourneys", description: draft("Hokkaido, Okinawa and the Japan Alps.") },
      { route: "privateJapan", description: draft("Year-round, planned for your family.") },
    ],
  },
  { kind: "link", route: "familyServices" },
  { kind: "link", route: "experiences" },
  { kind: "link", route: "about" },
  { kind: "utility", route: "forTravelAdvisors", label: locked("Advisors") },
  { kind: "cta", route: "contact" },
];

attachArabic(mainNav, mainNavAr);
