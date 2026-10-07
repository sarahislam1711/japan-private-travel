import { getLocale } from "@/lib/locale";
import Link from "next/link";
import type { CSSProperties } from "react";
import { home } from "@content/pages/home";
import type { PhotoSlotId } from "@content/photography.slots";
import { routeFor, localePath } from "@content/routes";
import { CopyText } from "./CopyText";
import { PanelPhoto } from "./PanelPhoto";
import { SplitWords } from "./SplitWords";

const d = (n: number) => ({ "--d": n }) as CSSProperties;

/**
 * Home's two ways in, as two large panels: Summer Journeys on snow, Private
 * Japan on pine. Each panel is the link, with a faded licensed photograph
 * behind its text once one is logged in the manifest.
 */
export async function EntryPoints() {
  const locale = await getLocale();
  const sj = routeFor("summerJourneys");
  const pj = routeFor("privateJapan");
  const items: {
    route: typeof sj;
    heading: typeof home.entryPoints.summerJourneys.heading;
    text: typeof home.entryPoints.summerJourneys.text;
    slot: PhotoSlotId;
    tone: "snow" | "pine";
    surface: string;
    span: string;
  }[] = [
    { route: sj, ...home.entryPoints.summerJourneys, slot: "home-summer-journeys", tone: "snow", surface: "bg-plate hover:bg-[#ffffff]", span: "desktop:col-span-7" },
    { route: pj, ...home.entryPoints.privateJapan, slot: "home-private-japan", tone: "pine", surface: "on-pine hover:bg-[#28574c]", span: "desktop:col-span-5" },
  ];
  return (
    <section className="mx-auto mt-32 grid max-w-(--content-max) grid-cols-12 gap-6 px-(--page-margin) desktop:mt-40">
      {items.map(({ route, heading, text, slot, tone, surface, span }, i) => (
        <Link
          key={route.key}
          href={localePath(route.key, locale)}
          data-reveal
          style={d(i)}
          className={`group relative isolate col-span-12 flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-[20px] p-8 no-underline transition-colors duration-300 tablet:p-12 ${span} ${surface}`}
        >
          <PanelPhoto slot={slot} tone={tone} />
          <h2 data-reveal="words" className="relative max-w-[14ch] font-serif text-h1 [font-variation-settings:'opsz'_60]">
            <SplitWords copy={heading} />
          </h2>
          <div className="relative">
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
