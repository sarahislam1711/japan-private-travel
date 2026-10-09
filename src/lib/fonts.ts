import localFont from "next/font/local";

// Latin text and display, variable (weight and optical size). Upright only.
export const sourceSerif = localFont({
  src: [{ path: "../fonts/source-serif-4-latin.woff2", weight: "200 900", style: "normal" }],
  display: "swap",
  variable: "--font-source-serif",
});
export const sourceSerifExt = localFont({
  src: [{ path: "../fonts/source-serif-4-latin-ext.woff2", weight: "200 900", style: "normal" }],
  display: "swap",
  preload: false,
  variable: "--font-source-serif-ext",
});

// Labels, navigation, notes, footer: the Universal Design face of Japanese official documents.
export const bizUd = localFont({
  src: [
    { path: "../fonts/biz-udpgothic-400-latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/biz-udpgothic-700-latin.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-biz-ud",
});
export const bizUdExt = localFont({
  src: [
    { path: "../fonts/biz-udpgothic-400-latin-ext.woff2", weight: "400", style: "normal" },
    { path: "../fonts/biz-udpgothic-700-latin-ext.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  preload: false,
  variable: "--font-biz-ud-ext",
});

// Japanese (place names, the registration line), cut to the characters the site uses.
export const notoSerifJp = localFont({
  src: [{ path: "../fonts/noto-serif-jp.woff2", weight: "400", style: "normal" }],
  display: "swap",
  preload: false,
  variable: "--font-noto-serif-jp",
});

// Arabic text and display: a calm serif that pairs with Source Serif.
export const markazi = localFont({
  src: [{ path: "../fonts/markazi-text-arabic.woff2", weight: "400 700", style: "normal" }],
  display: "swap",
  preload: false,
  variable: "--font-markazi",
});

// Arabic labels, navigation and notes: a clean sans that pairs with BIZ UDPGothic.
export const notoKufi = localFont({
  src: [{ path: "../fonts/noto-kufi-arabic-arabic.woff2", weight: "100 900", style: "normal" }],
  display: "swap",
  preload: false,
  variable: "--font-noto-kufi",
});

/** Browser chrome takes the page's paper colour; light scheme only. */

/** Every face as CSS variables on <html>, for the site and the admin area. */
export const fontVariables = [sourceSerif, sourceSerifExt, bizUd, bizUdExt, notoSerifJp, markazi, notoKufi].map((f) => f.variable).join(" ");
