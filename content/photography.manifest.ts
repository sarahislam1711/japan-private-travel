/*
 * Photography manifest: every photograph the site shows, by id. Files live in
 * public/photos/. Credit, place and month are optional (the photographer,
 * licence and no-stock rule was removed by Sarah, 7 Oct 2026). When place and
 * month are given they show as a small caption on the panel.
 */
import { z } from "zod";

export const PhotoSchema = z.object({
  id: z.string(),
  src: z.string(),
  /** Empty for a purely decorative background. */
  alt: z.string(),
  credit: z.string().optional(),
  place: z.string().optional(),
  monthTaken: z.string().optional(),
});
export type Photo = z.infer<typeof PhotoSchema>;

export const photographs: Photo[] = z.array(PhotoSchema).parse([
  { id: "japan-summer", src: "/photos/japan-summer.jpg", alt: "" },
  { id: "japan-private-tours", src: "/photos/japan-private-tours.jpg", alt: "" },
  { id: "japan-summer-family", src: "/photos/japan-summer-family.jpg", alt: "" },
]);
