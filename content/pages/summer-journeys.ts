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
  title: locked(
    "July and August are the best months to bring a family to Japan — in the right places.",
    { flags: ["D5"] },
  ),
  lede: [
    locked(
      "Honshu in high summer is hot and crowded. Hokkaido is not. Okinawa is coastal. The Japan Alps are cool at altitude. These are the months when Japan's finest properties are quietest and most available, and they are also the months when families from the Gulf and southern Europe most need to travel.",
      { flags: ["D5"] },
    ),
    locked("We built this company around that overlap.", { flags: ["D5"] }),
  ],
  seasonBand: {
    caption: draft(
      "Average daily maximum temperature by month. Source: Japan Meteorological Agency, 1991–2020 normals.",
      { claims: ["CL-05"] },
    ),
    rows: [draft("Tokyo"), draft("Sapporo"), draft([ph("ALPS_STATION")], { flags: ["D6"] })],
  },
  regions: [
    {
      heading: draft("Hokkaido"),
      verticalName: draft("北海道", { lang: "ja" }),
      body: draft([ph("HOKKAIDO_BODY")]),
      bestWeeks: draft([ph("HOKKAIDO_BEST_WEEKS")]),
      length: draft([ph("HOKKAIDO_LENGTH")]),
      fromTokyo: draft([ph("HOKKAIDO_FROM_TOKYO")]),
      privateBathCount: draft([ph("HOKKAIDO_PRIVATE_BATH_COUNT")]),
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
  factLabels: {
    bestWeeks: draft("Weeks we recommend"),
    length: draft("Suggested length"),
    fromTokyo: draft("Getting there from Tokyo"),
    privateBathCount: draft("Properties with private bathing we use"),
  },
  familyLink: draft("Planning for Muslim families:"),
};

attachArabic(summerJourneys, summerJourneysAr);
