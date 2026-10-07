"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { isBot } from "./RevealObserver";

export type ShowcaseItem = { lead: ReactNode; body: ReactNode; link: ReactNode };

const SEGMENT_VH = 70; // scroll distance per item while pinned

/**
 * A pinned, scroll-driven showcase. On desktop with motion allowed, the
 * section holds one screen while scrolling moves through the items: the
 * active lead lights up and the pine panel crossfades to its detail. Leads
 * are also buttons (click or keyboard). Otherwise: a compact stacked list.
 */
export function Showcase({ id, heading, items }: { id: string; heading: ReactNode; items: ShowcaseItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);
  const n = items.length;

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 64rem)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Crawlers always get the plain list, with every promise visible.
    const update = () => setPinned(wide.matches && !still.matches && !isBot());
    update();
    wide.addEventListener("change", update);
    still.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      still.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!pinned) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = root.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const travel = el.offsetHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, travel)));
        setActive(Math.min(n - 1, Math.floor(progress * n)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pinned, n]);

  const jumpTo = (i: number) => {
    const el = root.current;
    if (!el) return setActive(i);
    const travel = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + (travel * (i + 0.5)) / n;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (!pinned) {
    return (
      <section aria-labelledby={id} className="mx-auto mt-28 max-w-(--content-max) px-(--page-margin) desktop:mt-40">
        <h2 id={id} data-reveal="words" className="font-serif text-display [font-variation-settings:'opsz'_60]">
          {heading}
        </h2>
        <ul className="mt-10 flex flex-col gap-10">
          {items.map((item, i) => (
            <li key={i} data-reveal>
              <h3 className="font-serif text-h2 [font-variation-settings:'opsz'_36]">{item.lead}</h3>
              <p className="mt-3 max-w-[32rem] font-gothic text-copy text-ink-soft">{item.body}</p>
              <p className="mt-4 font-gothic text-label">{item.link}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section aria-labelledby={id} className="mt-40">
      <div ref={root} style={{ height: `${100 + (n - 1) * SEGMENT_VH}vh` }}>
        <div className="sticky top-0 mx-auto grid h-svh max-w-(--content-max) grid-cols-12 items-center gap-x-6 px-(--page-margin)">
          <div className="col-span-5">
            {/* No scroll reveal here: this layout replaces the first render after the reveal observer has run. */}
            <h2 id={id} className="font-serif text-display [font-variation-settings:'opsz'_60]">
              {heading}
            </h2>
            <div role="tablist" aria-orientation="vertical" className="mt-10 flex flex-col gap-5">
              {items.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${i}`}
                  aria-selected={active === i}
                  aria-controls={`${id}-panel-${i}`}
                  onClick={() => jumpTo(i)}
                  className={`cursor-pointer text-start font-serif text-h2 transition-[color,opacity] duration-500 [font-variation-settings:'opsz'_36] ${
                    active === i ? "text-ink opacity-100" : "text-ink-soft opacity-35 hover:opacity-70"
                  }`}
                >
                  {item.lead}
                </button>
              ))}
            </div>
          </div>

          <div className="on-pine relative col-span-6 col-start-7 flex min-h-[28rem] flex-col justify-between overflow-hidden rounded-[20px] p-12">
            <div className="relative min-h-[14rem] flex-1">
              {items.map((item, i) => (
                <div
                  key={i}
                  role="tabpanel"
                  id={`${id}-panel-${i}`}
                  aria-labelledby={`${id}-tab-${i}`}
                  aria-hidden={active !== i}
                  inert={active !== i}
                  className={`absolute inset-0 flex flex-col transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] ${
                    active === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
                  }`}
                >
                  <p className="max-w-[28rem] font-serif text-h2 [font-variation-settings:'opsz'_36]">{item.body}</p>
                  <p className="mt-auto font-gothic text-label">{item.link}</p>
                </div>
              ))}
            </div>
            {/* Progress through the promises: one bar per item, the current ones filled. */}
            <div aria-hidden className="mt-10 flex gap-2">
              {items.map((_, i) => (
                <span key={i} className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${i <= active ? "bg-plate" : "bg-plate/25"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
