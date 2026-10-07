"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { isBot } from "./RevealObserver";

export type ShowcaseItem = { lead: ReactNode; body: ReactNode; proof?: ReactNode; link?: ReactNode; symbol?: ReactNode };

/** Step number, e.g. "01 / 03": these promises are done one by one. */
const stepLabel = (i: number, n: number) => `${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;

const SEGMENT_VH = 70; // scroll distance per item while pinned

/**
 * A pinned, scroll-driven stage. On desktop with motion allowed, the section
 * holds one screen while scrolling moves through the items, one at a time:
 * the current promise leaves upwards, the next one's words rise in, and a
 * progress bar fills continuously. Bar segments are buttons that jump to an
 * item. Otherwise (phones, reduced motion, crawlers): a compact stacked list.
 */
export function Showcase({ id, heading, items }: { id: string; heading: ReactNode; items: ShowcaseItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1 across the whole section
  const n = items.length;
  const active = Math.min(n - 1, Math.floor(progress * n));

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 64rem)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Crawlers always get the plain list, with every item visible.
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
        const travel = el.offsetHeight - window.innerHeight;
        setProgress(Math.min(1, Math.max(0, -el.getBoundingClientRect().top / Math.max(1, travel))));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pinned]);

  const jumpTo = (i: number) => {
    const el = root.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + (travel * (i + 0.35)) / n, behavior: "smooth" });
  };

  if (!pinned) {
    return (
      <section aria-labelledby={id} className="mx-auto mt-24 max-w-(--content-max) px-(--page-margin) desktop:mt-32">
        <h2 id={id} data-reveal="words" className="font-serif text-h1 [font-variation-settings:'opsz'_60]">
          {heading}
        </h2>
        <ul className="mt-8 flex flex-col gap-4">
          {items.map((item, i) => (
            <li key={i} data-reveal className="on-pine relative overflow-hidden rounded-[20px] p-7">
              {item.symbol ? (
                <span aria-hidden className="pointer-events-none absolute end-6 bottom-5 font-mincho text-[3.25rem] leading-none text-pine-soft/40">
                  {item.symbol}
                </span>
              ) : null}
              <p className="font-gothic text-small text-ink-soft [font-variant-numeric:lining-nums_tabular-nums]">
                <span dir="ltr">{stepLabel(i, n)}</span>
              </p>
              <h3 className="mt-2 font-serif text-h2 [font-variation-settings:'opsz'_36]">{item.lead}</h3>
              <p className="mt-3 font-gothic text-copy text-ink-soft">{item.body}</p>
              {item.proof ? <div className="mt-4 [&_aside]:text-ink-soft">{item.proof}</div> : null}
              {item.link ? <p className="mt-4 font-gothic text-label">{item.link}</p> : null}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section aria-labelledby={id} className="mt-32">
      <div ref={root} style={{ height: `${100 + (n - 1) * SEGMENT_VH}vh` }}>
        <div className="sticky top-0 mx-auto flex h-svh max-w-(--content-max) flex-col justify-center gap-8 px-(--page-margin) py-10">
          <div className="flex items-end justify-between gap-10">
            {/* No scroll reveal here: this layout replaces the first render after the reveal observer has run. */}
            <h2 id={id} className="font-serif text-h1 [font-variation-settings:'opsz'_60]">
              {heading}
            </h2>
            {/* Progress: fills continuously as you scroll; each segment jumps to its item. */}
            <div role="tablist" aria-orientation="horizontal" className="flex w-[min(26rem,40%)] gap-2">
              {items.map((_, i) => {
                const fill = Math.min(1, Math.max(0, progress * n - i));
                return (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={active === i}
                    aria-controls={`${id}-panel-${i}`}
                    aria-labelledby={`${id}-lead-${i}`}
                    onClick={() => jumpTo(i)}
                    className="group flex h-11 flex-1 cursor-pointer items-center"
                  >
                    <span className="relative h-[3px] w-full overflow-hidden rounded-full bg-ink/15 transition-[height] group-hover:h-[5px]">
                      <span className="absolute inset-y-0 start-0 rounded-full bg-pine" style={{ width: `${fill * 100}%` }} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="on-pine relative min-h-[min(64svh,40rem)] overflow-hidden rounded-[24px]">
            {items.map((item, i) => {
              const state = i === active ? "current" : i < active ? "past" : "next";
              return (
                <div
                  key={i}
                  role="tabpanel"
                  id={`${id}-panel-${i}`}
                  aria-hidden={state !== "current"}
                  inert={state !== "current"}
                  data-active={state === "current" ? "" : undefined}
                  className={`stage-item absolute inset-0 grid grid-cols-2 gap-12 p-12 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] desktop:p-16 ${
                    state === "current" ? "translate-y-0 opacity-100" : state === "past" ? "pointer-events-none -translate-y-10 opacity-0" : "pointer-events-none translate-y-10 opacity-0"
                  }`}
                >
                  {/* Number and promise top-left with its symbol beneath; detail and link bottom-right. */}
                  <div className="flex min-h-0 flex-col justify-between gap-6">
                    <div>
                      <p className="font-gothic text-label text-ink-soft [font-variant-numeric:lining-nums_tabular-nums]">
                        <span dir="ltr">{stepLabel(i, n)}</span>
                      </p>
                      <p id={`${id}-lead-${i}`} className="mt-4 font-serif text-h1 [font-variation-settings:'opsz'_60]">
                        {item.lead}
                      </p>
                    </div>
                    {item.symbol ? (
                      <span aria-hidden className="symbol-in block font-mincho text-[clamp(4.5rem,7.5vw,8rem)] leading-none text-pine-soft/45">
                        {item.symbol}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex max-w-[30rem] flex-col gap-5 self-end justify-self-end">
                    <p className="font-gothic text-copy text-ink-soft">{item.body}</p>
                    {item.proof ? <div className="[&_aside]:text-ink-soft">{item.proof}</div> : null}
                    {item.link ? <p className="font-gothic text-label">{item.link}</p> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
