import { lang } from "next/root-params";
import { defaultLocale, isLocale, localePath, type Locale, type RouteKey } from "@content/routes";

/** The page's language, from the root [lang] segment; readable from any Server Component. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  return value && isLocale(value) ? value : defaultLocale;
}

/** A route's public path in the current page's language. */
export async function href(key: RouteKey): Promise<string> {
  return localePath(key, await getLocale());
}

export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");
