/* Private Japan (/private-japan) — docs/CONTENT.md §5. */
import { attachArabic, draft, locked, ph } from "../schema";
import { privateJapanAr } from "./private-japan.ar";

export const privateJapan = {
  // Page sections drafted 6 Oct 2026 (CONTENT.md §5).
  title: draft("Japan in spring, autumn and winter, planned for the whole family."),
  heroImage: [draft("春", { lang: "ja" }), draft("秋", { lang: "ja" }), draft("冬", { lang: "ja" })],
  sectionsHeading: draft("Planned for the unit."),
  // Shortened and approved by Sarah, 10 Oct 2026.
  lede: locked("We plan for the whole household, not the individual traveller: rooms together, a pace for every age, and privacy from the start."),
  sections: [
    {
      lead: draft("Rooms."),
      symbol: draft("室", { lang: "ja" }),
      body: draft(
        "Connecting rooms, or rooms on one floor, confirmed room by room rather than by category. We tell you what is confirmed before you commit.",
      ),
    },
    {
      lead: draft("Pacing."),
      symbol: draft("歩", { lang: "ja" }),
      body: draft(
        "Days planned so that the grandparent and the six-year-old both finish them well: fewer stops, longer at each, rest written into the day.",
      ),
    },
    {
      lead: draft("Transport."),
      symbol: draft("車", { lang: "ja" }),
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
      symbol: draft("静", { lang: "ja" }),
      body: draft(
        "Private dining rooms, private bathing and a guide who works for your household alone, planned from the first draft.",
      ),
    },
  ],
};

attachArabic(privateJapan, privateJapanAr);
