"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { JAPAN_MAP } from "@/lib/japan-map";

export type RegionPanel = {
  id: "hokkaido" | "okinawa" | "alps";
  kanji: string;
  name: ReactNode;
  nameText: string;
  body: ReactNode;
  facts: { label: ReactNode; value: ReactNode }[];
  note?: ReactNode;
  photo?: { src: string; focus?: string };
};

/**
 * The summer regions on a map of Japan (Sarah, 10 Oct 2026): three pins are
 * the tabs (Hokkaido, the Japan Alps, Okinawa), July and August marked in
 * Japanese; the chosen region's story and facts sit beside the map. Every
 * panel is rendered for crawlers; arrow keys move between pins (WAI-ARIA tabs).
 */
export function RegionSwitcher({ regions, label, months }: { regions: RegionPanel[]; label: string; months: string }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent) => {
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + regions.length) % regions.length;
    setActive(next);
    tabs.current[next]?.focus();
  };
  const { width: W, height: H, path, pins } = JAPAN_MAP;

  return (
    <div className="grid items-center gap-8 desktop:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] desktop:gap-14">
      {/* The map, with the regions as pins. */}
      <div className="relative mx-auto w-full max-w-[22rem] desktop:max-w-[30rem]" dir="ltr">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden>
          <path d={path} className="fill-pine/12 stroke-pine/40" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
        <p lang="ja" aria-hidden className="absolute top-[52%] start-0 font-mincho text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.15] text-pine [writing-mode:vertical-rl]">
          {months}
        </p>
        <div role="tablist" aria-label={label} aria-orientation="vertical" onKeyDown={onKey}>
          {regions.map((r, i) => {
            const on = i === active;
            const [px, py] = pins[r.id];
            // Labels sit to the left of Hokkaido and the Alps, to the right of Okinawa (open sea there).
            const right = r.id === "okinawa";
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
                // The dot (18px) sits exactly on the map point; the label runs away from it.
                style={{
                  insetInlineStart: `${(px / W) * 100}%`, // the map is always dir="ltr", so this is the x position
                  top: `${(py / H) * 100}%`,
                  transform: right ? "translate(-0.5625rem, -50%)" : "translate(calc(-100% + 0.5625rem), -50%)",
                }}
                className={`group absolute flex cursor-pointer items-center gap-2.5 ${right ? "" : "flex-row-reverse"}`}
              >
                {/* The dot grows on hover and focus; unchosen dots swell and ring in turn to invite a press. Solid colours, so a dot never melts into the island under it. */}
                <span className="relative flex size-[1.125rem] shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-130 group-focus-visible:scale-130">
                  {on ? <span className="absolute inset-0 animate-ping rounded-full bg-pine/40 motion-reduce:animate-none" /> : null}
                  <span
                    style={on ? undefined : ({ "--i": i } as CSSProperties)}
                    className={`relative size-full rounded-full ring-4 ring-ground transition-colors ${on ? "bg-pine" : "pin-pulse bg-[color-mix(in_srgb,var(--color-pine)_60%,var(--color-ground))] group-hover:bg-pine"}`}
                  />
                </span>
                <span
                  className={`flex flex-col whitespace-nowrap rounded-[12px] px-3 py-1.5 transition-[background-color,box-shadow,translate] duration-300 ease-(--ease-out-expo) ${right ? "items-start" : "items-end"} ${
                    on ? "bg-pine text-plate" : "bg-plate/90 text-ink group-hover:-translate-y-0.5 group-hover:bg-white group-hover:shadow-[0_6px_18px_-8px_rgb(26_34_48/0.35)]"
                  }`}
                >
                  <span lang="ja" className={`font-mincho text-[1rem] leading-tight ${on ? "text-pine-soft" : "text-pine"}`}>
                    {r.kanji}
                  </span>
                  <span className="sr-only font-gothic text-small leading-tight tablet:not-sr-only">{r.nameText}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The chosen region. */}
      <div>
        {regions.map((r, i) => (
          <div
            key={r.id}
            role="tabpanel"
            id={`region-panel-${r.id}`}
            aria-labelledby={`region-tab-${r.id}`}
            hidden={i !== active}
            className="region-panel relative overflow-hidden rounded-[24px] bg-plate"
          >
            {/* The region's summer photo, faded behind the text. */}
            {r.photo ? (
              <Image
                src={r.photo.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                // Clear across the top, fading out before the story so the reading text sits on a plain panel.
                className="pointer-events-none object-cover opacity-55 [mask-image:linear-gradient(to_bottom,black_0%,black_18%,transparent_42%)]"
                style={{ objectPosition: r.photo.focus }}
              />
            ) : null}
            <div className="relative flex flex-col gap-6 p-7 tablet:p-10">
              <div>
                <p lang="ja" aria-hidden className="font-mincho text-[1.5rem] leading-none text-pine">
                  {r.kanji}
                </p>
                <h3 className="mt-3 font-serif text-h2 font-[450] [font-variation-settings:'opsz'_36]">{r.name}</h3>
              </div>
              <p className="max-w-[36rem] font-serif text-[1.1875rem] leading-[1.6] text-ink [font-variation-settings:'opsz'_20]">{r.body}</p>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/10 pt-6">
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
    </div>
  );
}
