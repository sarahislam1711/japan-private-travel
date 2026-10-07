/*
 * The public route set — the single source for navigation, sitemap.xml,
 * robots.txt, guard C9 and `pnpm shots`. Eight pages plus privacy and terms.
 * The docs call for nine pages; the ninth is undecided (see checkpoint).
 *
 * `meta` holds the page's <title> and meta description. Both stay null until
 * written in Prompt 7 and approved; the guard fails production while null.
 */
import { z } from "zod";
import { navLabelsAr } from "./routes.ar";
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
  /** English path; also the internal folder under app/[lang]/(site). */
  path: z.string().regex(/^\/[a-z-]*$/),
  /** Arabic slug, Arabic script, served under /ar/ (draft until native review). Empty for Home. */
  arSlug: z.string(),
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
  { key: "home", path: "/", arSlug: "", kind: "page", navLabel: null, meta: noMeta, priority: 1 },
  {
    key: "summerJourneys",
    path: "/summer-journeys",
    arSlug: "رحلات-الصيف",
    kind: "page",
    navLabel: locked("Summer Journeys"),
    meta: noMeta,
    priority: 0.9,
  },
  {
    key: "privateJapan",
    path: "/private-japan",
    arSlug: "رحلات-خاصة",
    kind: "page",
    navLabel: locked("Private Japan"),
    meta: noMeta,
    priority: 0.8,
  },
  {
    key: "familyServices",
    path: "/family-services",
    arSlug: "خدمات-العائلات",
    kind: "page",
    navLabel: locked("Family Services"),
    meta: noMeta,
    priority: 0.8,
  },
  {
    key: "experiences",
    path: "/experiences",
    arSlug: "التجارب",
    kind: "page",
    navLabel: locked("Experiences"),
    meta: noMeta,
    priority: 0.7,
  },
  { key: "about", path: "/about", arSlug: "من-نحن", kind: "page", navLabel: locked("About"), meta: noMeta, priority: 0.8 },
  {
    key: "forTravelAdvisors",
    path: "/for-travel-advisors",
    arSlug: "لمستشاري-السفر",
    kind: "page",
    navLabel: locked("For travel advisors"),
    meta: noMeta,
    priority: 0.7,
  },
  { key: "contact", path: "/contact", arSlug: "تواصل-معنا", kind: "page", navLabel: locked("Contact"), meta: noMeta, priority: 0.8 },
  { key: "privacy", path: "/privacy", arSlug: "الخصوصية", kind: "utility", navLabel: null, meta: noMeta, priority: 0.2 },
  { key: "terms", path: "/terms", arSlug: "شروط-التعامل", kind: "utility", navLabel: null, meta: noMeta, priority: 0.2 },
]);

/** Gated routes: never in the sitemap, always noindex, nofollow (C9). */
export const privatePathPrefixes = ["/advisors/portal"] as const;

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

/** The public path of a route in a language: English at the root, Arabic under /ar/ with its Arabic slug. */
export function localePath(key: RouteKey, locale: Locale): string {
  const route = routeFor(key);
  if (locale === "en") return route.path;
  return route.arSlug ? `/ar/${route.arSlug}` : "/ar";
}

export function routeFor(key: RouteKey): Route {
  const route = routes.find((r) => r.key === key);
  if (!route) throw new Error(`No route for key "${key}"`);
  return route;
}

// Attach the Arabic navigation labels (routes.ar.ts).
for (const r of routes) if (r.navLabel && navLabelsAr[r.key]) r.navLabel.ar = navLabelsAr[r.key];
