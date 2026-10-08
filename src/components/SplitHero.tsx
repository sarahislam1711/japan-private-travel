import type { CSSProperties, ReactNode } from "react";
import type { PhotoSlotId } from "@content/photography.slots";
import type { Copy } from "@content/schema";
import { CopyText } from "./CopyText";
import { PanelPhoto } from "./PanelPhoto";
import { SplitWords } from "./SplitWords";

const d = (n: number) => ({ "--d": n }) as CSSProperties;

type Props = {
  id: string;
  title: Copy;
  /** Lede, links and actions under the title. */
  children: ReactNode;
  /** Japanese words set vertically on the pine panel (decorative). */
  verticals: Copy[];
  /** Optional photograph faded behind the panel. */
  slot?: PhotoSlotId;
  /** Replaces the default title size and weight. */
  titleClass?: string;
  /** "top" sets the title higher in the screen (for a hero with more beneath it). */
  align?: "end" | "top";
  /** Content for the pine panel in place of the vertical Japanese (Summer Journeys' story). */
  panel?: ReactNode;
  /** Title words to set in pine with a Japanese note above (e.g. { July: "七月" }). */
  titleAccent?: Record<string, string>;
};

/** An inner page's first screen: title and lede beside a pine panel set with vertical Japanese. */
export function SplitHero({ id, title, children, verticals, slot, titleClass, align = "end", panel, titleAccent }: Props) {
  return (
    <section
      aria-labelledby={id}
      className={`mx-auto grid max-w-(--content-max) grid-cols-12 gap-x-6 gap-y-10 px-(--page-margin) pt-6 desktop:min-h-[calc(100svh-5.5rem)] desktop:pt-2 ${panel ? "desktop:content-center desktop:pb-10" : ""}`}
    >
      {/* With a panel: two equal columns, the text column's top and bottom lined up with the panel's. */}
      <div className={`col-span-12 flex flex-col ${panel ? "desktop:col-span-6" : `desktop:col-span-7 desktop:pb-10 ${align === "top" ? "justify-center" : "justify-end"}`}`}>
        <h1 id={id} data-reveal="words" className={`font-serif [font-variation-settings:'opsz'_60] ${titleClass ? `max-w-[20ch] ${titleClass}` : "max-w-[17ch] text-h1"}`}>
          <SplitWords copy={title} accent={titleAccent} />
        </h1>
        <div data-reveal style={d(3)} className="mt-10 max-w-[36rem]">
          {children}
        </div>
      </div>
      <div
        data-reveal
        style={d(1)}
        className={`on-pine group relative isolate col-span-12 overflow-hidden rounded-[20px] ${panel ? "desktop:col-span-6" : "h-72 tablet:h-[24rem] desktop:col-span-5 desktop:h-auto desktop:min-h-[24rem]"}`}
      >
        {panel}
        {slot ? <PanelPhoto slot={slot} tone="pine" note="bottom" /> : null}
        {/* Short names set large; three or more columns step down so every column fits the panel. */}
        {panel ? null : (
        <span
          aria-hidden
          dir="ltr"
          className={`absolute inset-8 flex flex-row-reverse gap-[0.25em] font-mincho leading-[1.04] text-pine-soft desktop:inset-12 ${
            verticals.length >= 3 ? "text-[clamp(3.5rem,7vw,7rem)]" : "text-[clamp(4rem,9vw,10rem)]"
          }`}
        >
          {verticals.map((v, i) => (
            <span key={i} className="h-full [writing-mode:vertical-rl]">
              <CopyText copy={v} />
            </span>
          ))}
        </span>
        )}
      </div>
    </section>
  );
}
