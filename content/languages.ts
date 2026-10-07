/* The language menu — docs/CONTENT.md §1a. Each language is named in its own script. */
import { ard, attachArabic, draft } from "./schema";

export const languageMenu = attachArabic(
  {
    /** Accessible name of the globe button. */
    label: draft("Language"),
  },
  { label: ard("اللغة") },
);

/** Language names, always in their own script, identical on both sites. */
export const languageNames = attachArabic(
  { en: draft("English"), ar: draft("العربية", { lang: "ar" }) },
  { en: ard("English"), ar: ard("العربية") },
);
