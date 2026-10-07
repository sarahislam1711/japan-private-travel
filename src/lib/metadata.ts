import type { Metadata } from "next";
import { localePath, routeFor, type RouteKey } from "@content/routes";
import { copyText } from "./copy";
import { getLocale } from "./locale";
import { siteUrl } from "./site-url";

/** Absolute URL of a route in a language. */
export const absolute = (key: RouteKey, locale: "en" | "ar") => new URL(localePath(key, locale), siteUrl()).toString();

/**
 * Per-page metadata in the page's language: title and description from
 * content/routes.ts (null until written in Prompt 7), a self-referencing
 * canonical, and reciprocal hreflang for English, Arabic and x-default (English).
 */
export async function pageMetadata(key: RouteKey): Promise<Metadata> {
  const locale = await getLocale();
  const route = routeFor(key);
  return {
    title: route.meta.title ? copyText(route.meta.title, locale) : `[[META_TITLE ${key} ${locale}]]`,
    description: route.meta.description ? copyText(route.meta.description, locale) : undefined,
    alternates: {
      canonical: localePath(key, locale),
      languages: {
        en: localePath(key, "en"),
        ar: localePath(key, "ar"),
        "x-default": localePath(key, "en"),
      },
    },
    openGraph: { url: localePath(key, locale) },
  };
}
