import { getLocale } from "@/lib/locale";
import Link from "next/link";
import type { CSSProperties } from "react";
import { summerJourneys } from "@content/pages/summer-journeys";
import { routeFor, localePath } from "@content/routes";
import { copyText } from "@/lib/copy";
import { CopyText } from "./CopyText";

const d = (n: number) => ({ "--d": n }) as CSSProperties;

/**
 * The three summer regions under one heading, as compact zig-zag rows (Sarah,
 * 8 Oct 2026): each region's story beside a pine panel of its facts, the
 * panel swapping sides row by row, its Japanese name set large across the
 * top. One Family Services link below.
 */
export async function RegionsTrio() {
  const locale = await getLocale();
  const labels = summerJourneys.factLabels;
  const fs = routeFor("familyServices");
  return (
    <section aria-labelledby="regions-title" className="mx-auto mt-24 max-w-(--content-max) px-(--page-margin) desktop:mt-32">
      <h2 id="regions-title" data-reveal="words" className="font-serif text-h1 font-[450] [font-variation-settings:'opsz'_60]">
        <CopyText copy={summerJourneys.months.heading} />
      </h2>

      {/* Zig-zag rows (Sarah, 8 Oct 2026): story on one side, a pine panel of facts on the other,
          swapping sides each row; the region's Japanese name set large and vertical in the panel. */}
      <div className="mt-10 flex flex-col gap-6 desktop:gap-8">
        {summerJourneys.regions.map((region, i) => {
          const flip = i % 2 === 1;
          const facts = [
            { key: "weeks", label: labels.bestWeeks, value: region.bestWeeks },
            { key: "stay", label: labels.stay, value: region.stay },
            { key: "tokyo", label: labels.fromTokyo, value: region.fromTokyo },
            { key: "extra", label: region.extra.label, value: region.extra.value },
          ];
          return (
            <article key={i} data-reveal style={d(i)} className="grid grid-cols-12 items-center gap-x-6 gap-y-5 desktop:gap-x-12">
              <div className={`col-span-12 desktop:col-span-7 ${flip ? "desktop:order-2" : ""}`}>
                <p className="font-gothic text-small text-ink-soft tabular-nums">
                  <span dir="ltr">
                    {String(i + 1).padStart(2, "0")} / {String(summerJourneys.regions.length).padStart(2, "0")}
                  </span>
                </p>
                <h3 className="mt-2 font-serif text-h2 font-[450] [font-variation-settings:'opsz'_36]">
                  <CopyText copy={region.heading} />
                </h3>
                <p className="mt-4 max-w-[38rem] font-serif text-[1.1875rem] leading-[1.6] text-ink [font-variation-settings:'opsz'_18]">
                  <CopyText copy={region.body} />
                </p>
              </div>
              <div className={`on-pine col-span-12 rounded-[20px] p-7 desktop:col-span-5 ${flip ? "desktop:order-1" : ""}`}>
                {/* The region's Japanese name, large across the top of the panel. */}
                <p aria-hidden lang="ja" className="mb-6 font-mincho text-[clamp(2rem,2.4vw,2.75rem)] leading-none text-pine-soft/70">
                  {copyText(region.verticalName, locale).replace(/\s*\/\s*/g, "・")}
                </p>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
                  {facts.map((f) => (
                    <div key={f.key} className="min-w-0">
                      <dt className="font-gothic text-[0.8125rem] leading-snug text-pine-soft">
                        <CopyText copy={f.label} />
                      </dt>
                      <dd className="mt-1 font-serif text-[1.125rem] leading-snug text-plate [overflow-wrap:anywhere]">
                        <CopyText copy={f.value} />
                      </dd>
                    </div>
                  ))}
                </dl>
                {"note" in region && region.note ? (
                  <p className="mt-5 font-gothic text-small leading-relaxed text-pine-soft">
                    <CopyText copy={region.note} />
                  </p>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      <p data-reveal className="mt-6 font-gothic text-label text-ink-soft">
        <CopyText copy={summerJourneys.familyLink} />{" "}
        <Link href={localePath(fs.key, locale)} className="tap text-ink">
          <CopyText copy={fs.navLabel!} />
        </Link>
      </p>
    </section>
  );
}
