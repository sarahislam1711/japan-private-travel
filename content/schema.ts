/*
 * Content model. Every visible string on the site is a Copy node.
 *
 * - status "locked": verbatim from docs/CONTENT.md, marked LOCKED there.
 * - status "draft":  marked DRAFT (or unmarked) in docs/CONTENT.md; blocks production.
 * - placeholder segments reference keys in placeholders.ts; never write [[KEY]] literally.
 */
import { z } from "zod";
import { placeholderKeys, type PlaceholderKey } from "./placeholders";

export const decisionIds = ["D1", "D2", "D3", "D5", "D6", "D9", "D10", "D11", "D12"] as const;
export type DecisionId = (typeof decisionIds)[number];

export const claimIds = ["CL-01", "CL-02", "CL-03", "CL-04", "CL-05", "CL-06", "CL-07"] as const;
export type ClaimId = (typeof claimIds)[number];

export const SegmentSchema = z.union([
  z.string(),
  z.object({ ph: z.enum(placeholderKeys) }),
  z.object({ lang: z.enum(["ja", "ar"]), text: z.string() }),
]);
export type Segment = z.infer<typeof SegmentSchema>;

/** The Arabic version of a string: its own status, so unreviewed Arabic never reaches production. */
export const ArTextSchema = z.object({
  status: z.enum(["locked", "draft"]),
  body: z.array(SegmentSchema).min(1),
});
export type ArText = z.infer<typeof ArTextSchema>;

export const CopySchema = z.object({
  kind: z.literal("copy"),
  status: z.enum(["locked", "draft"]),
  body: z.array(SegmentSchema).min(1),
  /** Language of the whole node when it is not English. */
  lang: z.enum(["ja", "ar"]).optional(),
  /** Open decisions in docs/DECISIONS.md that flag this string. */
  flags: z.array(z.enum(decisionIds)).optional(),
  /** Claims in claims.ts this string relies on. */
  claims: z.array(z.enum(claimIds)).optional(),
  /** Arabic version, attached from the module's .ar.ts mirror. */
  ar: ArTextSchema.optional(),
});
export type Copy = z.infer<typeof CopySchema>;

type Meta = Pick<Copy, "lang" | "flags" | "claims">;
type Body = string | Segment[];

function node(status: Copy["status"], body: Body, meta: Meta = {}): Copy {
  return CopySchema.parse({
    kind: "copy",
    status,
    body: typeof body === "string" ? [body] : body,
    ...meta,
  });
}

/** A string marked LOCKED in docs/CONTENT.md. */
export const locked = (body: Body, meta?: Meta) => node("locked", body, meta);
/** A string marked DRAFT, or not marked, in docs/CONTENT.md. */
export const draft = (body: Body, meta?: Meta) => node("draft", body, meta);
/** A reference to a placeholder value. */
export const ph = (key: PlaceholderKey): Segment => ({ ph: key });
/** An inline run of Japanese or Arabic inside an English string. */
export const ja = (text: string): Segment => ({ lang: "ja", text });
/** A string with no copy yet: renders only its placeholder. */
export const missing = (key: PlaceholderKey) => node("draft", [ph(key)]);

export function isCopy(value: unknown): value is Copy {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as { kind?: unknown }).kind === "copy"
  );
}

/* ---------- Arabic ---------- */

const toBody = (body: Body): Segment[] => (typeof body === "string" ? [body] : body);

/** Arabic drafted, awaiting native review. Blocks production. */
export const ard = (body: Body): ArText => ({ status: "draft", body: toBody(body) });
/** Arabic approved by a native reviewer. */
export const arl = (body: Body): ArText => ({ status: "locked", body: toBody(body) });

/**
 * The shape of a module's Arabic mirror: every Copy becomes an ArText at the
 * same path; arrays and objects mirror the English structure. Non-copy fields
 * (route keys, numbers) are not translated.
 */
export type Translation<T> = T extends Copy
  ? ArText
  : T extends readonly (infer U)[]
    ? Translation<U>[]
    : T extends object
      ? { [K in keyof T]?: Translation<T[K]> }
      : never;

/** Attaches each Arabic string to its English Copy node, walking both structures in step. */
export function attachArabic<T>(en: T, ar: Translation<T>): T {
  const walk = (e: unknown, a: unknown) => {
    if (a === undefined || a === null) return;
    if (isCopy(e)) {
      (e as Copy).ar = ArTextSchema.parse(a);
      return;
    }
    if (Array.isArray(e) && Array.isArray(a)) {
      e.forEach((item, i) => walk(item, a[i]));
      return;
    }
    if (typeof e === "object" && e !== null && typeof a === "object") {
      for (const key of Object.keys(a as object)) walk((e as Record<string, unknown>)[key], (a as Record<string, unknown>)[key]);
    }
  };
  walk(en, ar);
  return en;
}
