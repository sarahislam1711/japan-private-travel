/* Summer Journeys (/summer-journeys) — docs/CONTENT.md §4. */
import { attachArabic, draft, locked, ph, type Copy } from "../schema";
import { summerJourneysAr } from "./summer-journeys.ar";

type Region = {
  heading: Copy;
  verticalName: Copy;
  body: Copy;
  bestWeeks: Copy;
  length: Copy;
  fromTokyo: Copy;
  privateBathCount: Copy;
};

export const summerJourneys = {
  // Title and the hero's story, written by Sarah (8 Oct 2026); set as a sequence of beats, her words unchanged.
  title: locked("July and August are the best months a family can visit Japan"),
  story: {
    before: locked("In summer the big cities are hot and crowded."),
    turn: locked("The north is not."),
    places: [
      { name: draft("北海道", { lang: "ja" }), line: locked("Hokkaido is cool") },
      { name: draft("北アルプス", { lang: "ja" }), line: locked("The Japan Alps are cool up high") },
      { name: draft("沖縄", { lang: "ja" }), line: locked("Okinawa is by the sea") },
    ],
    payoff: locked("We build your tour around that."),
  },
  seasonBand: {
    caption: draft(
      "Average daily maximum temperature by month. Source: Japan Meteorological Agency, 1991–2020 normals.",
      { claims: ["CL-05"] },
    ),
    rows: [draft("Tokyo"), draft("Sapporo"), draft([ph("ALPS_STATION")], { flags: ["D6"] })],
  },
  regions: [
    {
      heading: locked("Hokkaido"),
      verticalName: locked("北海道", { lang: "ja" }),
      // Body written by Sarah (8 Oct 2026). The margin facts came in a table headed "Example":
      // DRAFT until Sarah confirms they are the real values.
      body: locked("In July and August, Hokkaido is where a family slows down. Mornings in the lavender fields around Furano, afternoons by the lakes at Shikotsu-Toya, and dinners that a kitchen can prepare without alcohol-based seasoning when you ask. The distances are short, the air is cool, and a grandparent and a child can share the same easy day."),
      bestWeeks: draft("Mid-July to late August"),
      length: draft("4–5 nights"),
      fromTokyo: draft("90 minutes by air to Sapporo"),
      privateBathCount: draft("6"),
    },
    {
      heading: draft("Okinawa"),
      verticalName: draft("沖縄", { lang: "ja" }),
      body: draft([ph("OKINAWA_BODY")]),
      bestWeeks: draft([ph("OKINAWA_BEST_WEEKS")]),
      length: draft([ph("OKINAWA_LENGTH")]),
      fromTokyo: draft([ph("OKINAWA_FROM_TOKYO")]),
      privateBathCount: draft([ph("OKINAWA_PRIVATE_BATH_COUNT")]),
    },
    {
      heading: draft("Hokuriku and the Japan Alps", { flags: ["D6"] }),
      verticalName: draft("北陸 / 北アルプス", { lang: "ja" }),
      body: draft([ph("ALPS_BODY")], { flags: ["D6"] }),
      bestWeeks: draft([ph("ALPS_BEST_WEEKS")]),
      length: draft([ph("ALPS_LENGTH")]),
      fromTokyo: draft([ph("ALPS_FROM_TOKYO")]),
      privateBathCount: draft([ph("ALPS_PRIVATE_BATH_COUNT")]),
    },
  ] satisfies Region[],
  closing: draft("Summer dates go first. Tell us the household and the weeks you are weighing."),
  // Page sections drafted 6 Oct 2026 (CONTENT.md §4).
  heroImage: [draft("七月", { lang: "ja" }), draft("八月", { lang: "ja" })],
  otherSeasons: draft("Travelling at another time of year?"),
  months: {
    heading: draft("Two months, three places."),
    text: draft(
      "Tokyo's summer is hot and crowded. The places we plan for families in July and August sit further north, higher up, or by the sea.",
    ),
  },
  // Labels as Sarah set them (8 Oct 2026).
  factLabels: {
    bestWeeks: locked("Best weeks"),
    length: locked("Suggested length"),
    fromTokyo: locked("Getting there from Tokyo"),
    privateBathCount: locked("Properties with private bathing"),
  },
  familyLink: draft("Planning for Muslim families:"),
};

attachArabic(summerJourneys, summerJourneysAr);
