import { getLocale } from "@/lib/locale";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { routeFor, type RouteKey, localePath } from "@content/routes";
import type { Copy } from "@content/schema";
import { CopyText } from "./CopyText";
import { SplitWords } from "./SplitWords";

const d = (n: number) => ({ "--d": n }) as CSSProperties;

export type Principle = { lead: Copy; body: Copy; proof?: ReactNode; link?: RouteKey };

/** A heading that holds its place while short principles scroll past it; each may carry proof and a link. */
export async function PrinciplesSection({ id, heading, items }: { id: string; heading: Copy; items: Principle[] }) {
  const locale = await getLocale();
  return (
    <section aria-labelledby={id} className="mx-auto mt-32 grid max-w-(--content-max) grid-cols-12 gap-x-6 gap-y-12 px-(--page-margin) desktop:mt-48">
      <div className="col-span-12 desktop:col-span-5">
        <h2 id={id} data-reveal="words" className="font-serif text-h1 [font-variation-settings:'opsz'_60] desktop:sticky desktop:top-28">
          <SplitWords copy={heading} />
        </h2>
      </div>
      <ul className="col-span-12 flex flex-col gap-16 desktop:col-span-6 desktop:col-start-7 desktop:gap-24 desktop:pt-4">
        {items.map((item, i) => (
          <li key={i} data-reveal style={d(i % 2)}>
            <h3 className="font-serif text-h2 [font-variation-settings:'opsz'_36]">
              <CopyText copy={item.lead} />
            </h3>
            <p className="mt-4 max-w-[32rem] font-gothic text-copy text-ink-soft">
              <CopyText copy={item.body} />
            </p>
            {item.proof ? <div className="mt-5">{item.proof}</div> : null}
            {item.link ? (
              <p className="mt-5 font-gothic text-label">
                <Link href={localePath(item.link, locale)}>
                  <CopyText copy={routeFor(item.link).navLabel!} />
                </Link>
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
