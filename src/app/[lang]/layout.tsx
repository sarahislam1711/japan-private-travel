import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { locales } from "@content/routes";
import { site } from "@content/site";
import { copyText } from "@/lib/copy";
import { isIndexable } from "@/lib/indexing";
import { dirOf, getLocale } from "@/lib/locale";
import { siteUrl } from "@/lib/site-url";
import { RevealObserver } from "@/components/RevealObserver";
import { SmoothScroll } from "@/components/SmoothScroll";
import { fontVariables } from "@/lib/fonts";
import "@/styles/globals.css";

// Fonts are self-hosted from src/fonts (pnpm fonts), so builds never depend on Google.
// Each face is split by script; browsers only fetch a file when the page uses its characters.


export const viewport: Viewport = { themeColor: "#F1F2EE", colorScheme: "light" };

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
    title: { default: brand, template: `%s | ${brand}` },
    applicationName: brand,
    robots: isIndexable()
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
      : { index: false, follow: false },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={fontVariables}
    >
      <body>
        <SmoothScroll />
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}
