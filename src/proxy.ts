import { NextResponse, type NextRequest } from "next/server";
import { routes } from "@content/routes";

/**
 * Language routing. Pages live under app/[lang]; visitors never see /en.
 *
 * - English is served at the root: /summer-journeys → internally /en/summer-journeys.
 * - Arabic is served under /ar with Arabic slugs: /ar/رحلات-الصيف → internally /ar/summer-journeys.
 * - Duplicate addresses redirect permanently to the one canonical form
 *   (/en/... → /..., /ar/summer-journeys → /ar/رحلات-الصيف), so each page has one URL per language.
 * - No redirect by browser language or location: the language switch is the visitor's choice.
 */

const englishSlug = (path: string) => path.replace(/^\//, "");
const arToInternal = new Map(routes.filter((r) => r.arSlug).map((r) => [r.arSlug, englishSlug(r.path)]));
const internalToAr = new Map(routes.filter((r) => r.arSlug).map((r) => [englishSlug(r.path), r.arSlug]));

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const segments = url.pathname.split("/").filter(Boolean).map((s) => decodeURIComponent(s));
  const [first, second, ...rest] = segments;
  const join = (parts: string[]) => "/" + parts.filter((p) => p !== undefined).map(encodeURIComponent).join("/");

  // /en and /en/... are not public addresses: send them to the root form.
  if (first === "en") {
    const target = url.clone();
    target.pathname = join(segments.slice(1));
    return NextResponse.redirect(target, 308);
  }

  if (first === "ar") {
    if (!second) return NextResponse.next();
    const internal = arToInternal.get(second);
    if (internal !== undefined) {
      const target = url.clone();
      target.pathname = join(["ar", internal, ...rest]);
      return NextResponse.rewrite(target);
    }
    // An English slug under /ar: redirect to the Arabic address.
    const arSlug = internalToAr.get(second);
    if (arSlug) {
      const target = url.clone();
      target.pathname = join(["ar", arSlug, ...rest]);
      return NextResponse.redirect(target, 308);
    }
    // Anything else under /ar (e.g. the dev styleguide) resolves as it is, or 404s.
    return NextResponse.next();
  }

  // English: serve the root address from the internal /en route.
  const target = url.clone();
  target.pathname = join(["en", ...segments]);
  return NextResponse.rewrite(target);
}

export const config = {
  // Skip Next internals, share images, icons, metadata files and anything with a file extension.
  // The admin area (/admin) is English-only and outside the language routing.
  matcher: ["/((?!_next/|api/|admin|og/|icon|apple-icon|robots\\.txt|sitemap\\.xml|favicon\\.ico|.*\\.[a-zA-Z0-9]+$).*)"],
};
