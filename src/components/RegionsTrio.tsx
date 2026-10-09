import { getLocale } from "@/lib/locale";
import { summerJourneys } from "@content/pages/summer-journeys";
import { copyText } from "@/lib/copy";
import { CopyText } from "./CopyText";
import { RegionSwitcher } from "./RegionSwitcher";
import { photographs } from "@content/photography.manifest";
import { photoSlots } from "@content/photography.slots";


/**
 * The three summer regions under one heading, as a switcher (Sarah, 10 Oct
 * 2026): kanji tabs above one feature panel with the region's picture, story
 * and facts.
 */
export async function RegionsTrio() {
  const locale = await getLocale();
  const labels = summerJourneys.factLabels;
  return (
    <section aria-labelledby="regions-title" className="mx-auto section-gap max-w-(--content-max) px-(--page-margin)">
      <h2 id="regions-title" className="sr-only">
        <CopyText copy={summerJourneys.months.heading} />
      </h2>

      {/* The regions as one switcher: kanji tabs and a single feature panel (Sarah, 10 Oct 2026). */}
      <div data-reveal>
        <RegionSwitcher
          label={copyText(summerJourneys.months.heading, locale)}
          months={summerJourneys.heroImage.map((m) => copyText(m, locale)).join("・")}
          regions={summerJourneys.regions.map((region, i) => {
            const slot = (["region-hokkaido", "region-okinawa", "region-alps"] as const)[i];
            const id = photoSlots[slot].photoId;
            const photo = id ? photographs.find((p) => p.id === id) : undefined;
            return {
              id: slot.replace("region-", "") as "hokkaido" | "okinawa" | "alps",
              nameText: copyText(region.heading, locale),
              kanji: copyText(region.verticalName, locale).replace(/\s*\/\s*/g, "・"),
              name: <CopyText copy={region.heading} />,
              body: <CopyText copy={region.body} />,
              facts: [
                { label: <CopyText copy={labels.bestWeeks} />, value: <CopyText copy={region.bestWeeks} /> },
                { label: <CopyText copy={labels.stay} />, value: <CopyText copy={region.stay} /> },
                { label: <CopyText copy={labels.fromTokyo} />, value: <CopyText copy={region.fromTokyo} /> },
                { label: <CopyText copy={region.extra.label} />, value: <CopyText copy={region.extra.value} /> },
              ],
              note: "note" in region && region.note ? <CopyText copy={region.note} /> : undefined,
              photo: photo ? { src: photo.src, focus: photo.focus } : undefined,
            };
          })}
        />
      </div>
    </section>
  );
}
