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
  // My trip (10 Oct 2026): the list a visitor builds from experiences, packages and summer regions.
  trip: {
    add: locked("Add to my trip"), // Sarah, 10 Oct 2026
    added: draft("Added to my trip"),
    title: draft("My trip"),
    plan: draft("Plan my trip"),
    remove: draft("Remove"),
    empty: draft("Nothing here yet. Choose Add to my trip on an experience, a package or a summer region."),
  },
};

attachArabic(ui, uiAr);
