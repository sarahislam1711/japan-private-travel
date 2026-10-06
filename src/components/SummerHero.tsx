import Link from "next/link";
import type { CSSProperties } from "react";
import { summerJourneys } from "@content/pages/summer-journeys";
import { routeFor } from "@content/routes";
import { CopyText } from "./CopyText";
import { SplitWords } from "./SplitWords";

const d = (n: number) => ({ "--d": n }) as CSSProperties;

/** Summer Journeys' first screen: the case for summer beside a pine field set with 七月 八月. */
export function SummerHero() {
  const pj = routeFor("privateJapan");
  return (
    <section aria-labelledby="sj-title" className="mx-auto grid max-w-(--content-max) grid-cols-12 gap-x-6 gap-y-10 px-(--page-margin) pt-6 desktop:min-h-[calc(100svh-5.5rem)] desktop:pt-2">
      <div className="col-span-12 flex flex-col justify-end desktop:col-span-7 desktop:pb-10">
        <h1 id="sj-title" data-reveal="words" className="max-w-[17ch] font-serif text-h1 [font-variation-settings:'opsz'_60]">
          <SplitWords copy={summerJourneys.title} />
        </h1>
        <div data-reveal style={d(3)} className="mt-8 max-w-[36rem] space-y-4 font-gothic text-copy text-ink-soft">
          {summerJourneys.lede.map((p, i) => (
            <p key={i}>
              <CopyText copy={p} />
            </p>
          ))}
        </div>
        <p data-reveal style={d(4)} className="mt-8 font-gothic text-label text-ink-soft">
          <CopyText copy={summerJourneys.otherSeasons} />{" "}
          <Link href={pj.path} className="text-ink">
            <CopyText copy={pj.navLabel!} />
          </Link>
        </p>
      </div>
      <div
        aria-hidden
        data-reveal
        style={d(1)}
        className="on-pine relative col-span-12 h-72 overflow-hidden rounded-[20px] tablet:h-[24rem] desktop:col-span-5 desktop:h-auto desktop:min-h-[30rem]"
      >
        <span className="absolute inset-8 flex flex-row-reverse gap-[0.3em] font-mincho leading-[1.04] text-pine-soft text-[clamp(3.5rem,7vw,8rem)] desktop:inset-12">
          {summerJourneys.heroImage.map((m, i) => (
            <span key={i} className="h-full [writing-mode:vertical-rl]">
              <CopyText copy={m} />
            </span>
          ))}
        </span>
      </div>
    </section>
  );
}
