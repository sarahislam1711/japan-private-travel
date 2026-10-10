import { experiences } from "@content/pages/experiences";
import { familyServices } from "@content/pages/family-services";
import { summerJourneys } from "@content/pages/summer-journeys";
import { photographs } from "@content/photography.manifest";
import { photoSlots, type PhotoSlotId } from "@content/photography.slots";
import { copyText } from "@/lib/copy";

/** Summer regions in content order; region i is planner place `summer-i`. */
export const REGION_IDS = ["hokkaido", "okinawa", "alps"] as const;

export type CatalogueEntry = { title: string; img?: string; focus?: string };
export type Catalogue = Record<string, CatalogueEntry>;

const photo = (id: string | null | undefined) => (id ? photographs.find((p) => p.id === id) : undefined);

/** Everything that can go on My trip, by id, with its title in the page's language and a photo for the list. */
export function tripCatalogue(locale: "en" | "ar"): Catalogue {
  const out: Catalogue = {};
  for (const e of experiences.entries) {
    const p = photo(photoSlots[`exp-${e.id}` as PhotoSlotId]?.photoId);
    out[`exp:${e.id}`] = { title: copyText(e.title, locale), img: p?.src, focus: p?.focus };
  }
  for (const pk of familyServices.packages) {
    const p = photo(pk.photo);
    out[`pkg:${pk.id}`] = { title: copyText(pk.name, locale), img: p?.src, focus: p?.focus };
  }
  summerJourneys.regions.forEach((r, i) => {
    const p = photo(photoSlots[`region-${REGION_IDS[i]}` as PhotoSlotId]?.photoId);
    out[`region:${REGION_IDS[i]}`] = { title: copyText(r.heading, locale), img: p?.src, focus: p?.focus };
  });
  return out;
}
