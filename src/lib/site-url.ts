import { localePath, type Locale, type RouteKey } from "@content/routes";
import { site } from "@content/site";
import { isResolved, copyText } from "./copy";

/**
 * The canonical origin. Apex host, https, no trailing slash. Until [[DOMAIN]]
 * is filled this falls back to SITE_URL, then to the local dev server.
 */
export function siteUrl(): URL {
  if (isResolved(site.domain)) return new URL(`https://${copyText(site.domain)}`);
  return new URL(process.env.SITE_URL ?? "http://localhost:3000");
}

/** The domain once known, for www → apex redirects. */
export function canonicalDomain(): string | null {
  return isResolved(site.domain) ? copyText(site.domain) : null;
}

/** Absolute URL of a route in a language. */
export const absolute = (key: RouteKey, locale: Locale) => new URL(localePath(key, locale), siteUrl()).toString();
