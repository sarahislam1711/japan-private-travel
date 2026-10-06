/* Header navigation — docs/CONTENT.md §2. Labels come from routes.ts navLabel unless a group sets its own. */
import { home } from "./pages/home";
import type { RouteKey } from "./routes";
import { locked, type Copy } from "./schema";

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
    // Descriptions reuse the Home entry-point sentences.
    items: [
      { route: "summerJourneys", description: home.entryPoints.summerJourneys.sentence },
      { route: "privateJapan", description: home.entryPoints.privateJapan.sentence },
    ],
  },
  { kind: "link", route: "familyServices" },
  { kind: "link", route: "experiences" },
  { kind: "link", route: "about" },
  { kind: "utility", route: "forTravelAdvisors", label: locked("Advisors") },
  { kind: "cta", route: "contact" },
];
