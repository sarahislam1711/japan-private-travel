/* Private Japan (/private-japan) — docs/CONTENT.md §5. */
import { attachArabic, draft, locked, ph } from "../schema";
import { privateJapanAr } from "./private-japan.ar";

export const privateJapan = {
  // Page sections drafted 6 Oct 2026 (CONTENT.md §5).
  title: draft("Japan in spring, autumn and winter, planned for the whole family."),
  heroImage: [draft("春", { lang: "ja" }), draft("秋", { lang: "ja" }), draft("冬", { lang: "ja" })],
  sectionsHeading: draft("Planned for the unit."),
  lede: locked(
    "A family trip to Japan is a household moving together. We plan for the unit, not the individual traveller: rooms that connect, pacing that works for a grandparent and a six-year-old on the same day, transport that keeps the group together, and privacy for the group as a whole rather than as a request added at the end.",
  ),
  sections: [
    {
      lead: draft("Rooms."),
      body: draft(
        "Connecting rooms, or rooms on one floor, confirmed room by room rather than by category. We tell you what is confirmed before you commit.",
      ),
    },
    {
      lead: draft("Pacing."),
      body: draft(
        "Days planned so that the grandparent and the six-year-old both finish them well: fewer stops, longer at each, rest written into the day.",
      ),
    },
    {
      lead: draft("Transport."),
      body: draft(
        "Private vehicles sized for the whole group and its luggage, so no one travels separately.",
      ),
      margin: draft([
        "Vehicles and drivers are supplied by ",
        ph("TRANSPORT_OPERATOR"),
        ", a licensed hire operator.",
      ]),
    },
    {
      lead: draft("Privacy."),
      body: draft(
        "Private dining rooms, private bathing and a guide who works for your household alone, planned from the first draft.",
      ),
    },
  ],
};

attachArabic(privateJapan, privateJapanAr);
