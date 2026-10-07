/* Utility pages — Arabic mirror of utility.ts. DRAFT, awaiting native review. */
import { ard, type Translation } from "../schema";
import type { notFound, privacy, terms } from "./utility";

// Privacy and terms are placeholders only until written (D11); the renderer reuses them.
export const privacyAr: Translation<typeof privacy> = {};

export const termsAr: Translation<typeof terms> = {};

export const notFoundAr: Translation<typeof notFound> = {
  title: ard("لا توجد صفحة على هذا العنوان."),
};
