/*
 * The public route set — the single source for navigation, sitemap.xml,
 * robots.txt, guard C9 and `pnpm shots`. Eight pages plus privacy and terms.
 * The docs call for nine pages; the ninth is undecided (see checkpoint).
 *
 * `meta` holds the page's <title> and meta description. Both stay null until
 * written in Prompt 7 and approved; the guard fails production while null.
 */
import { z } from "zod";
import { CopySchema, locked } from "./schema";

export const routeKeys = [
  "home",
  "summerJourneys",
  "privateJapan",
  "familyServices",
  "experiences",
  "about",
  "forTravelAdvisors",
  "contact",
  "privacy",
  "terms",
] as const;
export type RouteKey = (typeof routeKeys)[number];

export const RouteSchema = z.object({
  key: z.enum(routeKeys),
  path: z.string().regex(/^\/[a-z-]*$/),
  kind: z.enum(["page", "utility"]),
  /** Navigation label, LOCKED from CONTENT.md §2; null if not in the main navigation. */
  navLabel: CopySchema.nullable(),
  meta: z.object({
    title: CopySchema.nullable(),
    description: CopySchema.nullable(),
  }),
  /** Relative sitemap priority. Lead page highest. */
  priority: z.number().min(0).max(1),
});
export type Route = z.infer<typeof RouteSchema>;

const noMeta = { title: null, description: null };

export const routes: Route[] = z.array(RouteSchema).parse([
  { key: "home", path: "/", kind: "page", navLabel: null, meta: noMeta, priority: 1 },
  {
    key: "summerJourneys",
    path: "/summer-journeys",
    kind: "page",
    navLabel: locked("Summer Journeys"),
    meta: noMeta,
    priority: 0.9,
  },
  {
    key: "privateJapan",
    path: "/private-japan",
    kind: "page",
    navLabel: locked("Private Japan"),
    meta: noMeta,
    priority: 0.8,
  },
  {
    key: "familyServices",
    path: "/family-services",
    kind: "page",
    navLabel: locked("Family Services"),
    meta: noMeta,
    priority: 0.8,
  },
  {
    key: "experiences",
    path: "/experiences",
    kind: "page",
    navLabel: locked("Experiences"),
    meta: noMeta,
    priority: 0.7,
  },
  { key: "about", path: "/about", kind: "page", navLabel: locked("About"), meta: noMeta, priority: 0.8 },
  {
    key: "forTravelAdvisors",
    path: "/for-travel-advisors",
    kind: "page",
    navLabel: locked("For travel advisors"),
    meta: noMeta,
    priority: 0.7,
  },
  { key: "contact", path: "/contact", kind: "page", navLabel: locked("Contact"), meta: noMeta, priority: 0.8 },
  { key: "privacy", path: "/privacy", kind: "utility", navLabel: null, meta: noMeta, priority: 0.2 },
  { key: "terms", path: "/terms", kind: "utility", navLabel: null, meta: noMeta, priority: 0.2 },
]);

/** Gated routes: never in the sitemap, always noindex, nofollow (C9). */
export const privatePathPrefixes = ["/advisors/portal"] as const;

export function routeFor(key: RouteKey): Route {
  const route = routes.find((r) => r.key === key);
  if (!route) throw new Error(`No route for key "${key}"`);
  return route;
}

