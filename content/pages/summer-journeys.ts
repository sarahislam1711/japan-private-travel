/* Summer Journeys (/summer-journeys) — docs/CONTENT.md §4. */
import { attachArabic, draft, locked, ph, type Copy } from "../schema";
import { summerJourneysAr } from "./summer-journeys.ar";

type Region = {
  heading: Copy;
  verticalName: Copy;
  body: Copy;
  bestWeeks: Copy;
  stay: Copy;
  fromTokyo: Copy;
  /** The fourth fact differs by region (private bathing, private pools, the route in). */
  extra: { label: Copy; value: Copy };
  /** A short line under the facts. */
  note?: Copy;
};

export const summerJourneys = {
  // Title and the hero's story, written by Sarah (8 Oct 2026); set as a sequence of beats, her words unchanged.
  title: locked("July & August are the best months to visit Japan"),
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
    /** Monthly mean of daily maximum, °C, Jan–Dec. JMA 1991–2020 normals, verified 10 Oct 2026 (CL-05). Alps row awaits D6. */
    data: [
      [9.8, 10.9, 14.2, 19.4, 23.6, 26.1, 29.9, 31.3, 27.5, 22.0, 16.7, 12.0],
      [-0.4, 0.4, 4.5, 11.7, 17.9, 21.8, 25.4, 26.4, 22.8, 16.4, 8.7, 2.0],
    ] as number[][],
    headline: draft("In August, Sapporo is about 5°C cooler than Tokyo.", { claims: ["CL-05"] }),
    /** JMA 1991–2020 normals, Tokyo, mean relative humidity in July: 76%. */
    humidity: { label: draft("Tokyo humidity · Jul", { claims: ["CL-05"] }), value: 76 },
  },
  regions: [
    {
      heading: locked("Hokkaido"),
      verticalName: locked("北海道", { lang: "ja" }),
      // Body written by Sarah (8 Oct 2026). The margin facts came in a table headed "Example":
      // DRAFT until Sarah confirms they are the real values.
      body: locked("In July and August, Hokkaido is where a family slows down. Mornings in the lavender fields around Furano, afternoons by the lakes at Shikotsu-Toya, and dinners that a kitchen can prepare without alcohol-based seasoning when you ask. The distances are short, the air is cool, and a grandparent and a child can share the same easy day."),
      bestWeeks: draft("Mid-July to late August"),
      stay: draft("4–5 nights"),
      fromTokyo: draft("90 minutes by air to Sapporo"),
      extra: { label: locked("Properties with private bathing"), value: draft("6") },
    },
    {
      heading: locked("Okinawa"),
      verticalName: locked("沖縄", { lang: "ja" }),
      // Body and margin written by Sarah (8 Oct 2026).
      body: locked("Warm sea and quiet islands while the mainland is busy. Calm water for children, slow beach days, and resorts with private pools. Dinners cooked the way you ask."),
      bestWeeks: locked("July to September"),
      stay: locked("4 to 5 nights"),
      fromTokyo: locked("2.5 hours by air"),
      extra: { label: locked("Private-pool stays"), value: locked("5") },
      note: locked("The case here is the sea, not cooler air."),
    },
    {
      heading: draft("Hokuriku and the Japan Alps", { flags: ["D6"] }),
      verticalName: locked("北アルプス", { lang: "ja" }),
      // Body and margin written by Sarah (8 Oct 2026).
      body: locked("Cool mountain air, a few hours from Tokyo. Green valleys, clear rivers, and gentle walks that suit every age. A quiet change from the heat below."),
      bestWeeks: locked("July to August"),
      stay: locked("3 to 4 nights"),
      fromTokyo: locked("3 hours by rail"),
      extra: { label: locked("Reached via"), value: locked("Hokuriku / Nagano") },
      note: locked("The cool is the altitude: Tateyama-Kurobe, Kamikochi."),
    },
  ] satisfies Region[],
  closing: draft("Summer books up early. Tell us who is coming and when."),
  // Page sections drafted 6 Oct 2026 (CONTENT.md §4).
  heroImage: [draft("七月", { lang: "ja" }), draft("八月", { lang: "ja" })],
  otherSeasons: draft("Travelling at another time of year?"),
  months: {
    heading: draft("Two months, three places."),
    text: draft(
      "Tokyo's summer is hot and crowded. The places we plan for families in July and August sit further north, higher up, or by the sea.",
    ),
  },
  // Labels as Sarah set them (8 Oct 2026; shortened to her margin mock-ups).
  factLabels: {
    bestWeeks: locked("Best weeks"),
    stay: locked("Suggested stay"),
    fromTokyo: locked("From Tokyo"),
  },
};

attachArabic(summerJourneys, summerJourneysAr);
