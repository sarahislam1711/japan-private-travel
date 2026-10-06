import type { Metadata } from "next";
import { BIZ_UDPGothic, Noto_Serif_JP, Source_Serif_4 } from "next/font/google";
import type { ReactNode } from "react";
import { site } from "@content/site";
import { copyText } from "@/lib/copy";
import { isIndexable } from "@/lib/indexing";
import { siteUrl } from "@/lib/site-url";
import { RevealObserver } from "@/components/RevealObserver";
import { SmoothScroll } from "@/components/SmoothScroll";
import "@/styles/globals.css";

// Latin text and display. Upright only: no copy needs italic.
const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  style: ["normal"],
  display: "swap",
  variable: "--font-source-serif",
});

// Japanese text (registration line, place names). Its Latin shares Source Serif's design.
const notoSerifJp = Noto_Serif_JP({
  weight: ["400"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
  variable: "--font-noto-serif-jp",
});

// Field labels, navigation, notes, footer: the Universal Design face of Japanese official documents.
const bizUd = BIZ_UDPGothic({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-biz-ud",
});

const brand = copyText(site.brand.name);

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: { default: brand, template: `%s — ${brand}` },
  robots: isIndexable() ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${notoSerifJp.variable} ${bizUd.variable}`}>
      <body>
        <SmoothScroll />
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}
