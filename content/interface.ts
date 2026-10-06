/* Interface strings — docs/CONTENT.md §1a. */
import { draft, locked } from "./schema";

export const ui = {
  skipLink: draft("Skip to content"),
  menu: draft("Menu"),
  sourceLink: draft("Source"),
  whatsappButton: locked("Message us on WhatsApp"),
  footer: {
    privacy: draft("Privacy"),
    terms: draft("Terms of business"),
  },
  seasonBandPending: draft("Temperatures to be added from the cited source."),
};
