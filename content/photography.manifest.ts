/*
 * Photography manifest — COMPLIANCE C6. Only images listed here may render.
 * No stock and no AI-generated imagery, ever. Empty until licensed images exist.
 */
import { z } from "zod";

export const PhotoSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: z.string(),
  photographer: z.string(),
  licence: z.string(),
  licenceExpires: z.union([z.iso.date(), z.literal("perpetual")]),
  place: z.string(),
  prefecture: z.string(),
  monthTaken: z.string(),
  releaseOnFile: z.boolean(),
  identifiablePeople: z.boolean(),
  ratio: z.enum(["3:2", "4:5", "16:9"]),
  /** Styleguide-only test image; fails C6 in production. */
  testOnly: z.boolean().optional(),
});
export type Photo = z.infer<typeof PhotoSchema>;

export const photographs: Photo[] = z.array(PhotoSchema).parse([]);
