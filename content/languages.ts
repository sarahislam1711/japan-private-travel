/* The language menu — docs/CONTENT.md §1a. */
import { ard, arl, attachArabic, draft, locked } from "./schema";

export const languageMenu = attachArabic(
  {
    /** Accessible name of the globe button. */
    label: draft("Language"),
  },
  { label: ard("اللغة") },
);

/** Language names in the menu: English on both sites, beside a flag (Sarah, 7 Oct 2026). */
export const languageNames = attachArabic(
  { en: locked("English"), ar: locked("Arabic") },
  // The same English names on the Arabic site, by Sarah's choice: approved as they are.
  { en: arl("English"), ar: arl("Arabic") },
);
