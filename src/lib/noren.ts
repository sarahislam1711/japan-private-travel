/**
 * The HalaJapan mark: a noren, the curtain over a Japanese doorway. Three
 * panels under one rod, the middle one lifted: the door is open.
 * Drawn on a 64-unit square (docs/HalaJapan logo and favicon.html).
 */
export const NOREN_PATHS = [
  "M8.5 10h47a2.5 2.5 0 0 1 0 5h-47a2.5 2.5 0 0 1 0-5z",
  "M8 19h13v32a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3z",
  "M25.5 19h13v25a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3z",
  "M43 19h13v32a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3z",
] as const;

/** Brand colours as plain values, for image renderers that cannot read CSS tokens. */
export const BRAND_HEX = { pine: "#2C5F53", pineSoft: "#C7D8D1", ink: "#1A2230", snow: "#FAFAF8", paper: "#F1F2EE" } as const;

/** Splits the brand name for the two-colour wordmark: "Hala" + "Japan". */
export function splitBrand(name: string): [string, string] {
  const m = name.match(/^(.+?)([A-Z][^A-Z]*)$/);
  return m ? [m[1], m[2]] : ["", name];
}
