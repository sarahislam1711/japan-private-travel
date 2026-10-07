/* Interface strings — docs/CONTENT.md §1a. */
import { uiAr } from "./interface.ar";
import { attachArabic, draft, locked } from "./schema";

export const ui = {
  skipLink: draft("Skip to content"),
  menu: draft("Menu"),
  close: draft("Close"),
  sourceLink: draft("Source"),
  whatsappButton: locked("Message us on WhatsApp"),
  footer: {
    privacy: draft("Privacy"),
    terms: draft("Terms of business"),
    legal: draft("Legal"),
    talkToUs: draft("Talk to us"),
  },
  seasonBandPending: draft("Temperatures to be added from the cited source."),
};

attachArabic(ui, uiAr);
