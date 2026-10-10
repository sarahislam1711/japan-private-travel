/*
 * Where photographs go. Each slot names the manifest photo it shows, or null
 * for none yet. The brief is a
 * dev-only note for the photographer, never rendered in production.
 */
export type PhotoSlot = { photoId: string | null; brief: string };

export const photoSlots = {
  // Summer Journeys hero (10 Oct 2026): faded behind the empty side of the title, so the first screen is not text alone.
  "sj-hero": { photoId: "hokkaido-lavender", brief: "Hokkaido in July: a lavender field, someone walking away towards the hills, wide open sky." },
  // Summer Journeys regions (10 Oct 2026): one summer photo per region, faded behind its panel.
  "region-hokkaido": { photoId: "hokkaido-furano", brief: "Hokkaido in July or August: lavender at Furano, or a lake at Shikotsu-Toya." },
  "region-okinawa": { photoId: "okinawa-beach", brief: "Okinawa: calm sea and a quiet beach, a family at a distance." },
  "region-alps": { photoId: "alps-summer", brief: "The Japan Alps in summer: Kamikochi or Tateyama-Kurobe, green and clear." },
  // Experiences: one photo per card, faded behind its text (10 Oct 2026). Stand-ins only where they truly match.
  "exp-disneyland": { photoId: "tokyo-disneyland", brief: "Tokyo Disneyland, a family at a distance or from behind." },
  "exp-usj": { photoId: "universal-studios", brief: "Universal Studios Japan, Osaka." },
  "exp-nara": { photoId: "nara-park", brief: "Deer in Nara Park, or Tōdai-ji." },
  "exp-tea": { photoId: "japan-summer", brief: "A tea ceremony or a Kyoto tea house garden." },
  "exp-hiroshima": { photoId: "miyajima", brief: "Miyajima's shrine gate in the sea." },
  "exp-fuji": { photoId: "mt-fuji", brief: "Mt Fuji from Lake Kawaguchi." },
  "exp-monkeys": { photoId: "japan-trips-mountains", brief: "Snow monkeys at Jigokudani, Nagano, in winter." },
  "exp-ryokan": { photoId: "ryokan", brief: "A ryokan room or private open-air bath in Hakone." },
  "exp-nishiki": { photoId: "nishiki-market", brief: "Nishiki Market, Kyoto." },
  "exp-indigo": { photoId: "indigo-dyeing", brief: "Indigo dyeing, hands and cloth." },
  "exp-sakura": { photoId: "cherry-blossoms", brief: "Cherry blossom along the Philosopher's Path." },
  "exp-momiji": { photoId: "japan-private-tours", brief: "Red maples at a Kyoto temple in November." },
  // About: portraits (10 Oct 2026). Until supplied, each shows the person's initials.
  "about-founder": { photoId: null, brief: "Fathy Mohamed Mohamed Ismail Ahmed, Representative Director: portrait, natural light, 4:5." },
  "about-manager-1": { photoId: null, brief: "Mariko Kajiwara, licensed travel manager: portrait, natural light, square." },
  "about-manager-2": { photoId: null, brief: "Takashi Mino, licensed travel manager: portrait, natural light, square." },
  // How we work: one crisp photo per promise, shown in the split stage (Sarah, 8 Oct 2026). Stand-ins until matched photos arrive.
  "how-step-1": { photoId: "japan-alps", brief: "We confirm before you commit: a checked room, a ryokan interior, a quiet arrival." },
  "how-step-2": { photoId: "japan-trips-mountains", brief: "You know who is looking after you: your planner or guide with a family, from behind or at a distance." },
  "how-step-3": { photoId: "japan-summer-family", brief: "Your family's needs are planned in: generations together, unhurried." },
  "home-hero": {
    photoId: "japan-summer-family",
    brief: "Behind the place names in the hero's pine panel: a family together in summer, from behind.",
  },
  "home-summer-journeys": {
    photoId: "japan-summer",
    brief: "Hokkaido or the Japan Alps in July or August; a household at a distance or from behind; natural, overcast light.",
  },
  "home-private-japan": {
    photoId: "japan-private-tours",
    brief: "A family moving together in Japan outside summer; shot at a distance or from behind; no faces of real clients.",
  },
  // Private Japan onward tiles (10 Oct 2026): the photo is most of the tile, the page name sits on it.
  "pj-onward-summer": { photoId: "japan-summer", brief: "Hokkaido or the Japan Alps in summer, green and open." },
  "pj-onward-packages": { photoId: "mt-fuji", brief: "Mt Fuji or another first-trip landmark, clear light." },
  "private-japan-hero": {
    photoId: null,
    brief: "A household together in Japan in spring, autumn or winter; at a distance or from behind; natural light.",
  },
} satisfies Record<string, PhotoSlot>;

export type PhotoSlotId = keyof typeof photoSlots;
