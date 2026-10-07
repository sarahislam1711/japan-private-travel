import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { locales } from "@content/routes";
import { site } from "@content/site";
import { copyText } from "@/lib/copy";
import { isIndexable } from "@/lib/indexing";
import { dirOf, getLocale } from "@/lib/locale";
import { siteUrl } from "@/lib/site-url";
import { RevealObserver } from "@/components/RevealObserver";
import { SmoothScroll } from "@/components/SmoothScroll";
import "@/styles/globals.css";

// Fonts are self-hosted from src/fonts (pnpm fonts), so builds never depend on Google.
// Each face is split by script; browsers only fetch a file when the page uses its characters.

// Latin text and display, variable (weight and optical size). Upright only.
const sourceSerif = localFont({
  src: [{ path: "../../fonts/source-serif-4-latin.woff2", weight: "200 900", style: "normal" }],
  display: "swap",
  variable: "--font-source-serif",
});
const sourceSerifExt = localFont({
  src: [{ path: "../../fonts/source-serif-4-latin-ext.woff2", weight: "200 900", style: "normal" }],
  display: "swap",
  preload: false,
  variable: "--font-source-serif-ext",
});

// Labels, navigation, notes, footer: the Universal Design face of Japanese official documents.
const bizUd = localFont({
  src: [
    { path: "../../fonts/biz-udpgothic-400-latin.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/biz-udpgothic-700-latin.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-biz-ud",
});
const bizUdExt = localFont({
  src: [
    { path: "../../fonts/biz-udpgothic-400-latin-ext.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/biz-udpgothic-700-latin-ext.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  preload: false,
  variable: "--font-biz-ud-ext",
});

// Japanese (place names, the registration line), cut to the characters the site uses.
const notoSerifJp = localFont({
  src: [{ path: "../../fonts/noto-serif-jp.woff2", weight: "400", style: "normal" }],
  display: "swap",
  preload: false,
  variable: "--font-noto-serif-jp",
});

// Arabic text and display: a calm serif that pairs with Source Serif.
const markazi = localFont({
  src: [{ path: "../../fonts/markazi-text-arabic.woff2", weight: "400 700", style: "normal" }],
  display: "swap",
  preload: false,
  variable: "--font-markazi",
});

// Arabic labels, navigation and notes: a clean sans that pairs with BIZ UDPGothic.
const notoKufi = localFont({
  src: [{ path: "../../fonts/noto-kufi-arabic-arabic.woff2", weight: "100 900", style: "normal" }],
  display: "swap",
  preload: false,
  variable: "--font-noto-kufi",
});

/** Both languages are built for every page; any other language code is a 404. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const brand = copyText(site.brand.name, locale);
  return {
    metadataBase: siteUrl(),
    title: { default: brand, template: `%s — ${brand}` },
    robots: isIndexable() ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: { locale: locale === "ar" ? "ar_AE" : "en_GB", alternateLocale: locale === "ar" ? ["en_GB"] : ["ar_AE"] },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={[sourceSerif, sourceSerifExt, bizUd, bizUdExt, notoSerifJp, markazi, notoKufi].map((f) => f.variable).join(" ")}
    >
      <body>
        <SmoothScroll />
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}
