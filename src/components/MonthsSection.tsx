import type { CSSProperties } from "react";
import { summerJourneys } from "@content/pages/summer-journeys";
import { CopyText } from "./CopyText";
import { SeasonBand } from "./SeasonBand";

const d = (n: number) => ({ "--d": n }) as CSSProperties;

/** The case in data: two summer months marked against the year, on a snow panel. */
export function MonthsSection() {
  const { heading, text } = summerJourneys.months;
  return (
    <section aria-labelledby="months-title" className="mx-auto mt-24 grid max-w-(--content-max) grid-cols-12 gap-x-6 gap-y-10 px-(--page-margin) desktop:mt-40">
      <div className="col-span-12 desktop:col-span-4">
        <h2 id="months-title" data-reveal className="font-serif text-h1 [font-variation-settings:'opsz'_60]">
          <CopyText copy={heading} />
        </h2>
        <p data-reveal style={d(1)} className="mt-5 max-w-[26rem] font-gothic text-copy text-ink-soft">
          <CopyText copy={text} />
        </p>
      </div>
      <div data-reveal style={d(2)} className="col-span-12 rounded-[20px] bg-plate p-6 tablet:p-10 desktop:col-span-7 desktop:col-start-6">
        <SeasonBand />
      </div>
    </section>
  );
}
