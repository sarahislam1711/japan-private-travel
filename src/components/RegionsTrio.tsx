import { getLocale } from "@/lib/locale";
import Link from "next/link";
import type { CSSProperties } from "react";
import { summerJourneys } from "@content/pages/summer-journeys";
import { routeFor, localePath } from "@content/routes";
import { copyText } from "@/lib/copy";
import { CopyText } from "./CopyText";

const d = (n: number) => ({ "--d": n }) as CSSProperties;

/**
 * The three summer regions as one joined block (Sarah, 8 Oct 2026): side by
 * side on desktop, alternating snow, pine, snow, each with its Japanese name,
 * its story and its facts. One heading above, one Family Services link below.
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

      <div data-reveal className="mt-10 grid overflow-hidden rounded-[24px] desktop:grid-cols-3">
        {summerJourneys.regions.map((region, i) => {
          const pine = i === 1;
          const facts = [
            { key: "weeks", label: labels.bestWeeks, value: region.bestWeeks },
            { key: "length", label: labels.length, value: region.length },
            { key: "tokyo", label: labels.fromTokyo, value: region.fromTokyo },
            { key: "bath", label: labels.privateBathCount, value: region.privateBathCount },
          ];
          return (
            <article key={i} style={d(i)} className={`flex flex-col gap-6 p-8 tablet:p-10 ${pine ? "on-pine" : "bg-plate"}`}>
              <div>
                <p lang="ja" className={`font-mincho text-[1.75rem] leading-none ${pine ? "text-pine-soft" : "text-pine"}`}>
                  {copyText(region.verticalName, locale).replace(/\s*\/\s*/g, "・")}
                </p>
                <h3 className="mt-4 font-serif text-h2 font-[450] [font-variation-settings:'opsz'_36]">
                  <CopyText copy={region.heading} />
                </h3>
              </div>
              <p className={`flex-1 font-serif text-[1.125rem] leading-[1.65] [font-variation-settings:'opsz'_18] ${pine ? "text-plate" : "text-ink"}`}>
                <CopyText copy={region.body} />
              </p>
              <dl className="grid grid-cols-2 gap-x-5 gap-y-4">
                {facts.map((f) => (
                  <div key={f.key} className="min-w-0">
                    <dt className="font-gothic text-[0.8125rem] leading-snug text-ink-soft">
                      <CopyText copy={f.label} />
                    </dt>
                    <dd className="mt-1 font-gothic text-small leading-snug [overflow-wrap:anywhere]">
                      <CopyText copy={f.value} />
                    </dd>
                  </div>
                ))}
              </dl>
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
