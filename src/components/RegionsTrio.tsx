import { getLocale } from "@/lib/locale";
import Link from "next/link";
import type { CSSProperties } from "react";
import { summerJourneys } from "@content/pages/summer-journeys";
import { routeFor, localePath } from "@content/routes";
import { copyText } from "@/lib/copy";
import { CopyText } from "./CopyText";

const d = (n: number) => ({ "--d": n }) as CSSProperties;

/**
 * The three summer regions under one heading, side by side in one light band
 * (Sarah, 8 Oct 2026): no green boxes; each column has the same pattern
 * (Japanese name, name, story, facts and note), so they read as a set and
 * take one row. One Family Services link below.
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

      {/* One light band holding the three regions side by side (Sarah, 8 Oct 2026): no green boxes,
          the same pattern in each column (Japanese name, name, story, facts), so they read as a set. */}
      <div data-reveal className="mt-10 grid gap-x-12 gap-y-12 rounded-[24px] bg-plate p-8 tablet:p-10 desktop:grid-cols-3 desktop:grid-rows-[auto_auto_1fr_auto_auto] desktop:gap-y-0 desktop:p-12">
        {summerJourneys.regions.map((region, i) => {
          const facts = [
            { key: "weeks", label: labels.bestWeeks, value: region.bestWeeks },
            { key: "stay", label: labels.stay, value: region.stay },
            { key: "tokyo", label: labels.fromTokyo, value: region.fromTokyo },
            { key: "extra", label: region.extra.label, value: region.extra.value },
          ];
          return (
            <article key={i} className="flex min-w-0 flex-col desktop:row-span-5 desktop:grid desktop:grid-rows-subgrid">
              {/* Shared rows across the three columns: names, headings, stories, facts and notes line up. */}
              <p lang="ja" className="font-mincho text-[1.75rem] leading-none text-pine">
                {copyText(region.verticalName, locale).replace(/\s*\/\s*/g, "・")}
              </p>
              <h3 className="pt-3 font-serif text-[clamp(1.5rem,1vw+1.1rem,1.875rem)] leading-tight font-[450] [font-variation-settings:'opsz'_36]">
                <CopyText copy={region.heading} />
              </h3>
              <p className="pt-3 font-serif text-[1.0625rem] leading-[1.6] text-ink [font-variation-settings:'opsz'_18]">
                <CopyText copy={region.body} />
              </p>
              <dl className="flex flex-col gap-1.5 pt-6">
                {facts.map((f) => (
                  <div key={f.key} className="flex flex-wrap items-baseline gap-x-2">
                    <dt className="font-gothic text-[0.8125rem] text-ink-soft">
                      <CopyText copy={f.label} />
                    </dt>
                    <dd className="font-gothic text-small text-ink">
                      <CopyText copy={f.value} />
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="pt-3 font-gothic text-small text-pine">{"note" in region && region.note ? <CopyText copy={region.note} /> : null}</p>
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
