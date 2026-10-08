import { getLocale } from "@/lib/locale";
import Link from "next/link";
import type { CSSProperties } from "react";
import { summerJourneys } from "@content/pages/summer-journeys";
import { routeFor, localePath } from "@content/routes";
import { copyText } from "@/lib/copy";
import { CopyText } from "./CopyText";

const d = (n: number) => ({ "--d": n }) as CSSProperties;
type Region = (typeof summerJourneys.regions)[number];

/**
 * One summer region as a story with its proof (Sarah, 8 Oct 2026): the main
 * column tells what a household does here in July and August; the margin
 * beside it, always at inline-end, holds the region's Japanese name set
 * vertically and the practical facts.
 */
export async function RegionSection({ region }: { region: Region; index: number }) {
  const locale = await getLocale();
  const labels = summerJourneys.factLabels;
  const fs = routeFor("familyServices");
  const facts = [
    { key: "weeks", label: labels.bestWeeks, value: region.bestWeeks },
    { key: "length", label: labels.length, value: region.length },
    { key: "tokyo", label: labels.fromTokyo, value: region.fromTokyo },
    { key: "bath", label: labels.privateBathCount, value: region.privateBathCount },
  ];
  return (
    <section className="mx-auto mt-24 grid max-w-(--content-max) grid-cols-12 items-start gap-x-6 gap-y-10 px-(--page-margin) desktop:mt-32">
      {/* Main column: the story. */}
      <div data-reveal className="col-span-12 desktop:col-span-7">
        <h2 className="font-serif text-h1 font-[450] [font-variation-settings:'opsz'_60]">
          <CopyText copy={region.heading} />
        </h2>
        <p className="mt-8 max-w-[38rem] font-serif text-[clamp(1.25rem,0.5vw+1.1rem,1.5rem)] leading-[1.6] text-ink [font-variation-settings:'opsz'_20]">
          <CopyText copy={region.body} />
        </p>
        <p className="mt-8 font-gothic text-label text-ink-soft">
          <CopyText copy={summerJourneys.familyLink} />{" "}
          <Link href={localePath(fs.key, locale)} className="tap text-ink">
            <CopyText copy={fs.navLabel!} />
          </Link>
        </p>
      </div>

      {/* Margin: the proof. The Japanese name set vertically, then the facts. */}
      <aside data-reveal style={d(1)} className="col-span-12 rounded-[20px] bg-plate p-8 tablet:p-10 desktop:col-span-4 desktop:col-start-9">
        {/* A two-part name (北陸 / 北アルプス) is set as two vertical columns, read right to left. */}
        <span aria-hidden lang="ja" dir="ltr" className="flex flex-row-reverse justify-end gap-3 font-mincho text-[clamp(2.75rem,3.4vw,3.75rem)] leading-[1.05] text-pine">
          {copyText(region.verticalName, locale)
            .split("/")
            .map((part) => (
              <span key={part} className="[writing-mode:vertical-rl]">
                {part.trim()}
              </span>
            ))}
        </span>
        <dl className="mt-8 flex flex-col gap-5">
          {facts.map((f) => (
            <div key={f.key}>
              <dt className="font-gothic text-small text-ink-soft">
                <CopyText copy={f.label} />
              </dt>
              <dd className="mt-1 font-gothic text-label text-ink">
                <CopyText copy={f.value} />
              </dd>
            </div>
          ))}
        </dl>
      </aside>
    </section>
  );
}
