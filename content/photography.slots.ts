/*
 * Where photographs go. Each slot names the manifest photo it shows, or null
 * until a licensed photo is logged in photography.manifest.ts. The brief is a
 * dev-only note for the photographer, never rendered in production.
 */
export type PhotoSlot = { photoId: string | null; brief: string };

export const photoSlots = {
  "home-summer-journeys": {
    photoId: null,
    brief: "Hokkaido or the Japan Alps in July or August; a household at a distance or from behind; natural, overcast light.",
  },
  "home-private-japan": {
    photoId: null,
    brief: "A family moving together in Japan outside summer; shot at a distance or from behind; no faces of real clients.",
  },
} satisfies Record<string, PhotoSlot>;

export type PhotoSlotId = keyof typeof photoSlots;
