import Link from "next/link";
import type { CSSProperties } from "react";
import { home } from "@content/pages/home";
import { routeFor } from "@content/routes";
import { CopyText } from "./CopyText";
import { SplitWords } from "./SplitWords";

const d = (n: number) => ({ "--d": n }) as CSSProperties;

/** Home's two ways in, as two large panels: Summer Journeys on snow, Private Japan on pine. Each panel is the link. */
export function EntryPoints() {
  const sj = routeFor("summerJourneys");
  const pj = routeFor("privateJapan");
  const items = [
    { route: sj, ...home.entryPoints.summerJourneys, tone: "bg-plate hover:bg-[#ffffff]", span: "desktop:col-span-7" },
    { route: pj, ...home.entryPoints.privateJapan, tone: "on-pine hover:bg-[#28574c]", span: "desktop:col-span-5" },
  ];
  return (
    <section className="mx-auto mt-32 grid max-w-(--content-max) grid-cols-12 gap-6 px-(--page-margin) desktop:mt-40">
      {items.map(({ route, heading, text, tone, span }, i) => (
        <Link
          key={route.key}
          href={route.path}
          data-reveal
          style={d(i)}
          className={`group col-span-12 flex min-h-[26rem] flex-col justify-between rounded-[20px] p-8 no-underline transition-colors duration-300 tablet:p-12 ${span} ${tone}`}
        >
          <h2 data-reveal="words" className="max-w-[14ch] font-serif text-h1 [font-variation-settings:'opsz'_60]">
            <SplitWords copy={heading} />
          </h2>
          <div>
            <p className="max-w-[30rem] font-gothic text-copy text-ink-soft">
              <CopyText copy={text} />
            </p>
            <p className="mt-6 font-gothic text-label underline decoration-1 underline-offset-[0.22em] group-hover:decoration-2">
              <CopyText copy={route.navLabel!} />
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}
