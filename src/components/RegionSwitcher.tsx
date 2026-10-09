"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type RegionPanel = {
  id: string;
  kanji: string;
  name: ReactNode;
  body: ReactNode;
  facts: { label: ReactNode; value: ReactNode }[];
  note?: ReactNode;
  photo?: { src: string; focus?: string };
};

/**
 * The summer regions as one feature (Sarah, 10 Oct 2026): three large kanji
 * tabs, and one wide panel for the chosen region, with its picture (or its
 * name set vertically until a summer photo exists), story and facts. Every
 * panel is rendered, so search engines and AI crawlers read all three; only
 * the chosen one is shown. Arrow keys move between tabs (WAI-ARIA tabs).
 */
export function RegionSwitcher({ regions, label }: { regions: RegionPanel[]; label: string }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent) => {
    const dir = document.documentElement.dir === "rtl" ? -1 : 1;
    const step = e.key === "ArrowRight" ? dir : e.key === "ArrowLeft" ? -dir : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + regions.length) % regions.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={label} onKeyDown={onKey} className="grid grid-cols-3 gap-2 tablet:gap-3">
        {regions.map((r, i) => {
          const on = i === active;
          return (
            <button
              key={r.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`region-tab-${r.id}`}
              aria-selected={on}
              aria-controls={`region-panel-${r.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={`group flex cursor-pointer flex-col items-start gap-2 rounded-[20px] p-4 text-start transition-colors duration-300 tablet:p-6 ${
                on ? "bg-pine text-plate" : "bg-plate text-ink hover:bg-white"
              }`}
            >
              <span lang="ja" aria-hidden className={`font-mincho text-[clamp(1.5rem,2.6vw,2.5rem)] leading-none whitespace-nowrap ${on ? "text-pine-soft" : "text-pine"}`}>
                {r.kanji}
              </span>
              <span className="font-serif text-[clamp(1rem,1vw+0.7rem,1.5rem)] leading-tight [font-variation-settings:'opsz'_24]">{r.name}</span>
            </button>
          );
        })}
      </div>

      {regions.map((r, i) => (
        <div
          key={r.id}
          role="tabpanel"
          id={`region-panel-${r.id}`}
          aria-labelledby={`region-tab-${r.id}`}
          hidden={i !== active}
          className="region-panel mt-3 grid overflow-hidden rounded-[24px] bg-plate tablet:mt-4 desktop:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
        >
          {/* Picture side: the summer photo, or the name set vertically on pine soft until one exists. */}
          <div className="relative min-h-56 bg-pine-soft desktop:min-h-[26rem]">
            {r.photo ? (
              <Image src={r.photo.src} alt="" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" style={{ objectPosition: r.photo.focus }} />
            ) : (
              <span lang="ja" aria-hidden dir="ltr" className="absolute inset-0 flex flex-row-reverse items-center justify-center gap-3 font-mincho text-[clamp(4rem,8vw,7.5rem)] leading-[1.02] text-pine">
                {r.kanji.split("・").map((part) => (
                  <span key={part} className="[writing-mode:vertical-rl]">
                    {part}
                  </span>
                ))}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-6 p-7 tablet:p-10 desktop:p-12">
            <h3 className="font-serif text-h2 font-[450] [font-variation-settings:'opsz'_36]">{r.name}</h3>
            <p className="max-w-[36rem] font-serif text-[1.1875rem] leading-[1.6] text-ink [font-variation-settings:'opsz'_20]">{r.body}</p>
            {/* The facts as a strip: value large, label small. */}
            <dl className="mt-auto grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/10 pt-6 tablet:grid-cols-4">
              {r.facts.map((f, j) => (
                <div key={j} className="flex min-w-0 flex-col-reverse gap-1">
                  <dt className="font-gothic text-[0.8125rem] leading-snug text-ink-soft">{f.label}</dt>
                  <dd className="font-serif text-[1.25rem] leading-tight text-pine [font-variation-settings:'opsz'_24]">{f.value}</dd>
                </div>
              ))}
            </dl>
            {r.note ? <p className="font-gothic text-small text-ink-soft">{r.note}</p> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
