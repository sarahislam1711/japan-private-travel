import type { Metadata } from "next";
import { pageMeta } from "@content/meta";
import { localePath, type RouteKey } from "@content/routes";
import { site } from "@content/site";
import { copyText } from "./copy";
import { getLocale } from "./locale";

/**
 * Per-page metadata in the page's language: title and description from
 * content/meta.ts, a self-referencing
 * canonical, reciprocal hreflang for English, Arabic and x-default (English),
 * and complete Open Graph and Twitter cards (the page's own 1200×630 image).
 * Next replaces a layout's openGraph object wholesale, so everything is set here.
 */
/** buildPageMetadata: the one place every page's metadata is made. */
export async function pageMetadata(key: RouteKey): Promise<Metadata> {
  const locale = await getLocale();
  const meta = pageMeta[key];
  const title = copyText(meta.title, locale);
  const description = copyText(meta.description, locale);
  return {
    title,
    description,
    alternates: {
      canonical: localePath(key, locale),
      languages: {
        en: localePath(key, "en"),
        ar: localePath(key, "ar"),
        "x-default": localePath(key, "en"),
      },
    },
    openGraph: {
      type: "website",
      siteName: copyText(site.brand.name, locale),
      locale: locale === "ar" ? "ar_AE" : "en_GB",
      alternateLocale: locale === "ar" ? ["en_GB"] : ["ar_AE"],
      url: localePath(key, locale),
      title,
      description,
      images: [{ url: `/og/${locale}/${key}`, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`/og/${locale}/${key}`] },
  };
}
