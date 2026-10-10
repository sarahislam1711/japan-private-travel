import { z } from "zod";

/** Statuses a plan moves through in the admin area. */
export const STATUSES = ["new", "in_progress", "quoted", "booked", "closed"] as const;
export type Status = (typeof STATUSES)[number];

export const PLACE_IDS = ["summer-0", "summer-1", "summer-2", "anywhere", "suggest"] as const;

/** What the planner sends. Every field is checked again here, on the server. */
export const PlanInput = z
  .object({
    locale: z.enum(["en", "ar"]),
    name: z.string().trim().min(1).max(120),
    reply: z.enum(["whatsapp", "email", "phone"]),
    contact: z.string().trim().min(3).max(160),
    /** Where the itinerary goes: asked of everyone (Sarah, 10 Oct 2026). */
    email: z.email().max(160),
    /** What the visitor added to My trip: titles in the page's language. */
    picks: z.array(z.string().trim().min(1).max(160)).max(30).default([]),
    language: z.enum(["ar", "en", "ja"]),
    adults: z.number().int().min(0).max(12),
    grandparents: z.number().int().min(0).max(12),
    childAges: z.array(z.number().int().min(0).max(17)).max(12),
    months: z.array(z.number().int().min(0).max(11)).max(12),
    notSure: z.boolean(),
    datesNote: z.string().trim().max(200),
    places: z.array(z.enum(PLACE_IDS)).max(PLACE_IDS.length),
    needs: z.string().trim().max(1500),
    /** Honeypot: left empty by people, filled by some bots. */
    website: z.string().max(0).optional(),
  })
  .refine((p) => p.adults + p.grandparents >= 1, { path: ["adults"] })
  .refine((p) => p.reply !== "email" || z.email().safeParse(p.contact).success, { path: ["contact"] });

/** Plans saved before email and My trip existed have neither. */
export const withDefaults = <E extends object>(e: E) => ({ email: "", picks: [] as string[], ...e });

export type PlanInput = z.infer<typeof PlanInput>;

/** A stored plan, as the admin area sees it. */
export type Enquiry = Omit<PlanInput, "website"> & {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: Status;
  notes: string;
};
