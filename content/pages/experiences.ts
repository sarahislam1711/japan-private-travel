/* Experiences (/experiences) — docs/CONTENT.md §7. */
import { z } from "zod";
import { attachArabic, CopySchema, draft, missing } from "../schema";
import { experiencesAr } from "./experiences.ar";

/** Fixed entry format, strategy §6 (LOCKED). Supplied by the operator, 8 to 12 entries. */
export const ExperienceSchema = z.object({
  venue: CopySchema,
  city: CopySchema,
  what: CopySchema,
  practitioner: CopySchema,
  season: CopySchema,
  duration: CopySchema,
  groupLimit: CopySchema,
  leadTimeWeeks: z.number().int().positive(),
});
export type Experience = z.infer<typeof ExperienceSchema>;

export const experiences = {
  title: missing("EXPERIENCES_TITLE"),
  intro: draft(
    "Each of these is arranged with a named person, in a stated season, with a stated lead time. If an entry says six weeks, it needs six weeks.",
  ),
  entries: z.array(ExperienceSchema).parse([]),
};

attachArabic(experiences, experiencesAr);
