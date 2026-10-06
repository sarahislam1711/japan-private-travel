import Link from "next/link";
import type { CSSProperties } from "react";
import { home } from "@content/pages/home";
import { routeFor } from "@content/routes";
import { CopyText } from "./CopyText";
import { SplitWords } from "./SplitWords";

const d = (n: number) => ({ "--d": n }) as CSSProperties;

/**
 * Home's three working promises. The heading holds its place while the
 * points scroll past it; each point links to the page with the detail.
 */
export function HowWeWork() {
  const { heading, points } = home.howWeWork;
  return (
    <section aria-labelledby="how-title" className="mx-auto mt-32 grid max-w-(--content-max) grid-cols-12 gap-x-6 gap-y-12 px-(--page-margin) desktop:mt-48">
      <div className="col-span-12 desktop:col-span-5">
        <h2 id="how-title" data-reveal="words" className="font-serif text-display [font-variation-settings:'opsz'_60] desktop:sticky desktop:top-28">
          <SplitWords copy={heading} />
        </h2>
      </div>
      <ul className="col-span-12 flex flex-col gap-16 desktop:col-span-6 desktop:col-start-7 desktop:gap-24 desktop:pt-4">
        {points.map((point, i) => {
          const route = routeFor(point.link);
          return (
            <li key={i} data-reveal style={d(i % 2)}>
              <h3 className="font-serif text-h2 [font-variation-settings:'opsz'_36]">
                <CopyText copy={point.lead} />
              </h3>
              <p className="mt-4 max-w-[32rem] font-gothic text-copy text-ink-soft">
                <CopyText copy={point.body} />
              </p>
              <p className="mt-5 font-gothic text-label">
                <Link href={route.path}>
                  <CopyText copy={route.navLabel!} />
                </Link>
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
