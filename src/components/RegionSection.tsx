import { getLocale } from "@/lib/locale";
import Link from "next/link";
import type { CSSProperties } from "react";
import { summerJourneys } from "@content/pages/summer-journeys";
import { routeFor, localePath } from "@content/routes";
import { CopyText } from "./CopyText";
import { FieldTable } from "./FieldTable";

const d = (n: number) => ({ "--d": n }) as CSSProperties;
type Region = (typeof summerJourneys.regions)[number];

/**
 * One summer region, one screen: a snow panel with its Japanese name and the
 * practical facts (the proof), beside the region's description (the claim).
 * Panels alternate sides down the page.
 */
export async function RegionSection({ region, index }: { region: Region; index: number }) {
  const locale = await getLocale();
  const labels = summerJourneys.factLabels;
  const fs = routeFor("familyServices");
  const flip = index % 2 === 1;
  return (
    <section className="mx-auto mt-28 grid max-w-(--content-max) grid-cols-12 items-center gap-x-6 gap-y-10 px-(--page-margin) desktop:mt-40">
      <div
        data-reveal
        className={`relative col-span-12 flex min-h-[34rem] flex-col overflow-hidden rounded-[20px] bg-plate p-8 tablet:p-10 desktop:col-span-6 desktop:min-h-[40rem] ${flip ? "desktop:order-2 desktop:col-start-7" : "desktop:order-1"}`}
      >
        {/* The name takes the space above the facts: a horizontal box sized by the flex column
            (logical insets on a vertical element would mean top and bottom), with the name set
            vertically inside it, wrapping to a further column when long. */}
        <div aria-hidden className="relative mb-8 min-h-0 flex-1">
          <span className="absolute inset-0 flex justify-end">
            <span lang="ja" className="h-full font-mincho leading-[1.04] text-pine [writing-mode:vertical-rl] text-[clamp(2.5rem,4vw,3.75rem)]">
              <CopyText copy={region.verticalName} />
            </span>
          </span>
        </div>
        <FieldTable
          variant="bare"
          className="relative max-w-[24rem] [&_dl>div]:grid-cols-1"
          fields={[
            { key: "weeks", label: <CopyText copy={labels.bestWeeks} />, value: <CopyText copy={region.bestWeeks} /> },
            { key: "length", label: <CopyText copy={labels.length} />, value: <CopyText copy={region.length} /> },
            { key: "tokyo", label: <CopyText copy={labels.fromTokyo} />, value: <CopyText copy={region.fromTokyo} /> },
            { key: "bath", label: <CopyText copy={labels.privateBathCount} />, value: <CopyText copy={region.privateBathCount} /> },
          ]}
        />
      </div>
      <div data-reveal style={d(1)} className={`order-first col-span-12 desktop:col-span-5 ${flip ? "desktop:order-1 desktop:col-start-1" : "desktop:order-2 desktop:col-start-8"}`}>
        <h2 className="font-serif text-h1 [font-variation-settings:'opsz'_60]">
          <CopyText copy={region.heading} />
        </h2>
        <p className="mt-6 max-w-[30rem] font-gothic text-copy text-ink-soft">
          <CopyText copy={region.body} />
        </p>
        <p className="mt-7 font-gothic text-label text-ink-soft">
          <CopyText copy={summerJourneys.familyLink} />{" "}
          <Link href={localePath(fs.key, locale)} className="tap text-ink">
            <CopyText copy={fs.navLabel!} />
          </Link>
        </p>
      </div>
    </section>
  );
}
