/* The language switch label — docs/CONTENT.md §1a. Each language is named in its own script. */
import { ard, attachArabic, draft } from "./schema";

// English pages offer Arabic, so the English-side label is the Arabic word; Arabic pages offer English.
export const languageSwitch = attachArabic({ label: draft("العربية") }, { label: ard("English") });
