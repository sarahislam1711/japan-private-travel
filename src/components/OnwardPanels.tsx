import { getLocale } from "@/lib/locale";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { PhotoSlotId } from "@content/photography.slots";
import { routeFor, type RouteKey, localePath } from "@content/routes";
import type { Copy } from "@content/schema";
import { CopyText } from "./CopyText";
import { PanelPhoto } from "./PanelPhoto";

const d = (n: number) => ({ "--d": n }) as CSSProperties;

export type OnwardPanel = { route: RouteKey; heading: Copy; text: Copy; tone: "snow" | "pine"; slot?: PhotoSlotId };

/** Two panels that send the reader on to related pages. Each whole panel is the link. */
export async function OnwardPanels({ items }: { items: OnwardPanel[] }) {
  const locale = await getLocale();
  return (
    <section className="mx-auto mt-32 grid max-w-(--content-max) grid-cols-12 gap-6 px-(--page-margin) desktop:mt-48">
      {items.map((item, i) => {
        const route = routeFor(item.route);
        return (
          <Link
            key={item.route}
            href={localePath(route.key, locale)}
            data-reveal
            style={d(i)}
            className={`group relative isolate col-span-12 flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-[20px] p-8 no-underline transition-colors duration-300 tablet:col-span-6 tablet:p-12 ${
              item.tone === "pine" ? "on-pine hover:bg-[#28574c]" : "bg-plate hover:bg-[#ffffff]"
            }`}
          >
            {item.slot ? <PanelPhoto slot={item.slot} tone={item.tone} /> : null}
            <h2 className="relative max-w-[16ch] font-serif text-h1 [font-variation-settings:'opsz'_60]">
              <CopyText copy={item.heading} />
            </h2>
            <div className="relative">
              <p className="max-w-[28rem] font-gothic text-copy text-ink-soft">
                <CopyText copy={item.text} />
              </p>
              <p className="mt-6 font-gothic text-label underline decoration-1 underline-offset-[0.22em] group-hover:decoration-2">
                <CopyText copy={route.navLabel!} />
              </p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
