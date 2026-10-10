/**
 * The HalaJapan mark: stepping stones, the path laid through a Japanese
 * garden. Three stones: the way through Japan, laid for you, and three
 * generations walking it together.
 * Drawn on a 64-unit square (docs/HalaJapan logo and favicon.html).
 */
export const MARK_STONES = [
  { cx: 17, cy: 47, rx: 12, ry: 8.5 },
  { cx: 33, cy: 31, rx: 10, ry: 7.5 },
  { cx: 48, cy: 16, rx: 8, ry: 6 },
] as const;

/** Each stone as SVG ellipse attributes, all leaning the same way, rising towards the far corner. */
export const STONE_ELLIPSES = MARK_STONES.map((s) => ({ ...s, transform: `rotate(-18 ${s.cx} ${s.cy})` }));

/** Brand colours as plain values, for image renderers that cannot read CSS tokens. */
export const BRAND_HEX = { pine: "#2C5F53", pineSoft: "#C7D8D1", ink: "#1A2230", snow: "#FAFAF8", paper: "#F1F2EE" } as const;

/** Splits the brand name for the two-colour wordmark: "Hala" + "Japan". */
export function splitBrand(name: string): [string, string] {
  const m = name.match(/^(.+?)([A-Z][^A-Z]*)$/);
  return m ? [m[1], m[2]] : ["", name];
}
