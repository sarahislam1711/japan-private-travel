"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { isBot } from "./RevealObserver";

export type ShowcaseItem = { lead: ReactNode; body: ReactNode; proof?: ReactNode; link?: ReactNode; symbol?: ReactNode; photo?: string; photoFocus?: string };

/** Step number, e.g. "01 / 03": these promises are done one by one. */
const stepLabel = (i: number, n: number) => `${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;

const SEGMENT_VH = 70; // scroll distance per item while pinned

/**
 * A pinned, scroll-driven stage. On desktop with motion allowed, the section
 * holds one screen while scrolling moves through the items, one at a time.
 * Each wheel gesture moves exactly one step (a fast flick never skips through
 * the stage; its leftover momentum is absorbed), and scrolling on from the
 * last step carries on down the page:
 * the current promise leaves upwards, the next one's words rise in, and a
 * progress bar fills continuously. Bar segments are buttons that jump to an
 * item. Otherwise (phones, reduced motion, crawlers): a compact stacked list.
 */
export function Showcase({ id, heading, items }: { id: string; heading: ReactNode; items: ShowcaseItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);
  const n = items.length;
  const split = items.every((item) => item.photo);

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
        const progress = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / Math.max(1, travel)));
        // The bar fills through a CSS variable (no re-render per frame); React re-renders only when the step changes.
        el.style.setProperty("--progress", String(progress * n));
        setActive(Math.min(n - 1, Math.floor(progress * n)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pinned]);

  // Where each step rests: the first at the top of the pinned range, the last at its end, the rest centred in their segment.
  const stepTop = (i: number) => {
    const el = root.current;
    if (!el) return 0;
    const start = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    return start + travel * (i === 0 ? 0 : i === n - 1 ? 1 : (i + 0.5) / n);
  };

  const jumpTo = (i: number) => {
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(stepTop(i), { duration: 1 });
    else window.scrollTo({ top: stepTop(i), behavior: "smooth" });
  };

  // One gesture, one step.
  useEffect(() => {
    if (!pinned) return;
    const lenis = window.__lenis;
    if (!lenis) return;
    const MOVE_S = 0.65; // seconds per step
    const QUIET_MS = 90; // a pause this long ends a gesture
    const THRESHOLD = 24; // px of intent before a step moves
    let lockedUntil = 0;
    let armed = true;
    let lastWheel = 0;
    let lastAbs = 0;
    let intent = 0;

    const go = (y: number) => {
      lenis.scrollTo(y, { duration: MOVE_S, lock: true, easing: (t) => 1 - Math.pow(1 - t, 4) });
      lockedUntil = performance.now() + MOVE_S * 1000 + 250; // a short rest on each step
      armed = false;
      intent = 0;
    };

    window.__scrollGate = ({ deltaY, event }) => {
      if (!event.type.includes("wheel") || event.ctrlKey) return true;
      const now = performance.now();
      const gap = now - lastWheel;
      const abs = Math.abs(deltaY);
      // Momentum after a flick only ever fades; anything else (a pause, or a fresh or steady push) is the visitor still scrolling.
      const fading = abs < lastAbs * 0.97;
      lastWheel = now;
      lastAbs = abs;
      if (!armed && now > lockedUntil && (gap > QUIET_MS || !fading)) {
        armed = true;
        intent = 0;
      }
      const block = () => {
        if (event.cancelable) event.preventDefault();
        return false;
      };
      const start = stepTop(0);
      const end = stepTop(n - 1);
      const at = lenis.targetScroll;
      const TOL = 2;

      // Outside the stage: catch a gesture that would carry into (or across) it, and land on its first or last step.
      if (at < start - TOL || at > end + TOL) {
        if (deltaY > 0 && at < start && at + deltaY >= start - TOL) {
          go(start);
          return block();
        }
        if (deltaY < 0 && at > end && at + deltaY <= end + TOL) {
          go(end);
          return block();
        }
        return true;
      }

      // Inside: wait out a move and the rest of its gesture, then take one step.
      if (now < lockedUntil || !armed) return block();
      intent += deltaY;
      if (Math.abs(intent) < THRESHOLD) return block();
      let current = 0;
      for (let i = 1; i < n; i++) if (Math.abs(stepTop(i) - at) < Math.abs(stepTop(current) - at)) current = i;
      const next = current + Math.sign(intent);
      if (next < 0 || next >= n) {
        intent = 0;
        return true; // past the first or last step: carry on along the page
      }
      go(stepTop(next));
      return block();
    };
    return () => {
      delete window.__scrollGate;
    };
  }, [pinned, n]);

  if (!pinned) {
    return (
      <section aria-labelledby={id} className="mx-auto mt-24 max-w-(--content-max) px-(--page-margin) desktop:mt-32">
        <h2 id={id} data-reveal="words" className="font-serif text-h1 [font-variation-settings:'opsz'_60]">
          {heading}
        </h2>
        <ul className="mt-8 flex flex-col gap-4">
          {items.map((item, i) => (
            <li key={i} data-reveal className="on-pine relative overflow-hidden rounded-[20px] p-7">
              {item.photo ? (
                <div className="relative -mx-7 -mt-7 mb-6 aspect-[16/10]">
                  <Image src={item.photo} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: item.photoFocus }} />
                </div>
              ) : null}
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
                      <span
                        className="absolute inset-y-0 start-0 rounded-full bg-pine"
                        style={{ width: `calc(clamp(0, var(--progress, 0) - ${i}, 1) * 100%)` }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {split ? (
            // Split stage (Sarah, 8 Oct 2026): text on pine at inline-start, a crisp full-colour photo at inline-end.
            // Unlike the faded panel photos elsewhere, these are sharp and contained; each step's photo wipes up into place.
            <div className="on-pine relative min-h-[min(64svh,40rem)] overflow-hidden rounded-[24px]">
              {/* Sides alternate step by step: photo at inline-end, then inline-start, then inline-end again. */}
              {items.map((item, i) => {
                const state = i === active ? "current" : i < active ? "past" : "next";
                const flipped = i % 2 === 1;
                return (
                  <div key={i}>
                    <div
                      role="tabpanel"
                      id={`${id}-panel-${i}`}
                      aria-hidden={state !== "current"}
                      inert={state !== "current"}
                      data-active={state === "current" ? "" : undefined}
                      className={`stage-item absolute inset-y-0 flex w-1/2 flex-col justify-between gap-6 p-12 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] ${flipped ? "end-0" : "start-0"} ${
                        state === "current" ? "translate-y-0 opacity-100" : state === "past" ? "pointer-events-none -translate-y-10 opacity-0" : "pointer-events-none translate-y-10 opacity-0"
                      }`}
                    >
                      <div>
                        <p className="font-gothic text-label text-ink-soft [font-variant-numeric:lining-nums_tabular-nums]">
                          <span dir="ltr">{stepLabel(i, n)}</span>
                        </p>
                        <p id={`${id}-lead-${i}`} className="mt-4 font-serif text-[clamp(2rem,1.9vw+1rem,3.25rem)] leading-[1.08] [font-variation-settings:'opsz'_48]">
                          {item.lead}
                        </p>
                      </div>
                      {/* Promise, detail and link share one start edge; the kanji sits apart in the bottom-end corner. */}
                      <div className="flex max-w-[26rem] flex-col gap-4 pe-24">
                        <p className="font-gothic text-copy text-ink-soft">{item.body}</p>
                        {item.link ? <p className="font-gothic text-label">{item.link}</p> : null}
                      </div>
                      {item.symbol ? (
                        <span aria-hidden className="symbol-in pointer-events-none absolute end-10 bottom-8 block font-mincho text-[clamp(4.5rem,6vw,6.5rem)] leading-none text-pine-soft/40">
                          {item.symbol}
                        </span>
                      ) : null}
                    </div>
                    {item.photo ? (
                      <div aria-hidden data-state={state} className={`stage-photo absolute inset-y-0 w-1/2 overflow-hidden ${flipped ? "start-0" : "end-0"}`}>
                        <Image src={item.photo} alt="" fill sizes="50vw" className="object-cover" style={{ objectPosition: item.photoFocus }} priority={i === 0} />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </section>
  );
}
