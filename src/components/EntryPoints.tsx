import Link from "next/link";
import { home } from "@content/pages/home";
import { summerJourneys } from "@content/pages/summer-journeys";
import { routeFor } from "@content/routes";
import { CopyText } from "./CopyText";

/**
 * Home's two ways in. Summer Journeys, the lead product, carries the site's
 * image in place of photography: its three place names set vertically, large
 * and pale. Each whole block is the link; no card, no border.
 */
export function EntryPoints() {
  const sj = routeFor("summerJourneys");
  const pj = routeFor("privateJapan");
  return (
    <section className="mx-auto mt-24 grid max-w-(--content-max) grid-cols-12 gap-x-6 gap-y-12 px-(--page-margin) desktop:mt-12">
      <Link
        href={sj.path}
        className="group relative col-span-12 flex flex-col overflow-hidden tablet:min-h-[28rem] no-underline tablet:col-span-7 desktop:col-span-6 desktop:col-start-2"
      >
        <h2 className="relative z-10 font-serif text-h1 [font-variation-settings:'opsz'_60] group-hover:text-pine group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[0.14em]">
          <CopyText copy={home.entryPoints.summerJourneys.heading} />
        </h2>
        <p className="relative z-10 mt-3 max-w-[26ch] font-serif text-lede">
          <CopyText copy={home.entryPoints.summerJourneys.text} />
        </p>
        {/* The image: place names in vertical Japanese, decorative (the English sentence says it). */}
        {/* The row stays horizontal so inset-inline-end is the page edge. Each name is set
            vertically, read from the edge inward, and wraps into a further column when long
            (北陸 / 北アルプス), as Japanese vertical setting does. Below tablet it sits after the
            text instead of behind it. */}
        <span
          aria-hidden
          className="pointer-events-none mt-8 flex h-64 flex-row-reverse gap-[0.2em] self-end font-mincho leading-[1.05] text-ghost transition-colors duration-300 text-[clamp(2.75rem,4.2vw,4.5rem)] group-hover:text-pine-soft tablet:absolute tablet:end-0 tablet:top-20 tablet:mt-0 tablet:h-[calc(100%-5.5rem)]"
        >
          {summerJourneys.regions.map((r, i) => (
            <span key={i} lang="ja" className="h-full [writing-mode:vertical-rl]">
              <CopyText copy={r.verticalName} />
            </span>
          ))}
        </span>
      </Link>

      <Link
        href={pj.path}
        className="group col-span-12 self-start no-underline tablet:col-span-5 desktop:col-span-5 desktop:col-start-8"
      >
        <h2 className="font-serif text-h2 [font-variation-settings:'opsz'_36] group-hover:text-pine group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[0.18em]">
          <CopyText copy={home.entryPoints.privateJapan.heading} />
        </h2>
        <p className="mt-3 max-w-(--measure-main)">
          <CopyText copy={home.entryPoints.privateJapan.text} />
        </p>
      </Link>
    </section>
  );
}
