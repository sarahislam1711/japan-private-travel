"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { TripButton } from "./TripButton";

/** One string in the page's language: the rendered node (with dev markers) and its plain text. */
export type T = { node: ReactNode; text: string };

export type Category = { id: string; label: T; symbol: T };
export type Entry = {
  id: string;
  category: string;
  months: number[];
  leadTimeWeeks: number;
  /** Optional photo: faded behind the card, full colour at the top of the detail panel. */
  photo?: { src: string; focus?: string };
  title: T;
  city: T;
  venue: T;
  practitioner: T;
  what: T;
  duration: T;
  groupLimit: T;
};

type Season = "any" | "spring" | "summer" | "autumn" | "winter";
const SEASONS: Record<Exclude<Season, "any">, { months: number[]; kanji: string }> = {
  spring: { months: [2, 3, 4], kanji: "春" },
  summer: { months: [5, 6, 7], kanji: "夏" },
  autumn: { months: [8, 9, 10], kanji: "秋" },
  winter: { months: [11, 0, 1], kanji: "冬" },
};

/**
 * The Experiences library: filter by type and season, cards that rearrange
 * smoothly, and a detail panel with "Add to my trip" (My trip, carried into the
 * planner). Every card is in the HTML on first
 * render, so crawlers and visitors without JavaScript see the whole list.
 */
export function ExperiencesBrowser({
  categories,
  entries,
  ui,
  locale,
  header,
}: {
  categories: Category[];
  entries: Entry[];
  ui: Record<string, T>;
  locale: "en" | "ar";
  /** The page's title and intro, set beside the season tiles. */
  header: ReactNode;
}) {
  const [type, setType] = useState<string>("all");
  const [season, setSeason] = useState<Season>("any");
  const [open, setOpen] = useState<Entry | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const lastCard = useRef<HTMLButtonElement | null>(null);

  const monthNames = useMemo(() => {
    const f = new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", { month: "short" });
    return Array.from({ length: 12 }, (_, m) => f.format(new Date(2026, m, 1)));
  }, [locale]);

  // Filters live in the address, so a filtered view can be shared.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const t = q.get("type");
    const s = q.get("season") as Season | null;
    if (t && categories.some((c) => c.id === t)) setType(t);
    if (s && (s === "any" || s in SEASONS)) setSeason(s);
  }, [categories]);

  const change = (next: { type?: string; season?: Season }) => {
    const apply = () => {
      if (next.type !== undefined) setType(next.type);
      if (next.season !== undefined) setSeason(next.season);
    };
    const q = new URLSearchParams(window.location.search);
    const nt = next.type ?? type;
    const ns = next.season ?? season;
    if (nt === "all") q.delete("type");
    else q.set("type", nt);
    if (ns === "any") q.delete("season");
    else q.set("season", ns);
    window.history.replaceState(null, "", `${window.location.pathname}${q.size ? `?${q}` : ""}`);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Cards glide to their new places where the browser supports view transitions.
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (!still && doc.startViewTransition) doc.startViewTransition(() => flushSync(apply));
    else apply();
  };

  const shown = entries.filter(
    (e) => (type === "all" || e.category === type) && (season === "any" || e.months.some((m) => SEASONS[season].months.includes(m))),
  );
  const cat = (id: string) => categories.find((c) => c.id === id)!;
  const lead = (n: number) => `${n} ${(n === 1 ? ui.week : ui.weeks).text}`;
  const when = (e: Entry) => (e.months.length === 12 ? ui.yearRound.text : e.months.map((m) => monthNames[m]).join(" · "));

  const show = (e: Entry, card: HTMLButtonElement) => {
    lastCard.current = card;
    setOpen(e);
    requestAnimationFrame(() => dialog.current?.showModal());
  };
  const hide = () => dialog.current?.close();

  const chip = (active: boolean) =>
    `inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 font-gothic text-small transition-colors ${
      active ? "bg-ink text-plate" : "bg-plate text-ink hover:bg-mist"
    }`;

  return (
    <>
      {/* Header: just the title and intro. */}
      <div className="max-w-[48rem] pt-10 desktop:pt-16">{header}</div>

      {/* Filters in a slim column beside the experiences (desktop, sticky); above them on phones.
          The experiences keep the main width. */}
      <div className="mt-10 grid gap-8 desktop:grid-cols-[12.5rem_1fr] desktop:gap-14">
        <aside className="flex min-w-0 flex-col gap-6 desktop:sticky desktop:top-8 desktop:self-start desktop:gap-9">
          {/* When: the kanji dial. Choosing the season again clears it. */}
          <div>
            <p id="exp-season-q" className="font-gothic text-small text-ink-soft">
              {ui.seasonQuestion.node}
            </p>
            <div role="group" aria-labelledby="exp-season-q" className="mt-3 grid grid-cols-4 gap-1.5 desktop:grid-cols-2">
              {(["spring", "summer", "autumn", "winter"] as const).map((s) => {
                const on = season === s;
                return (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={on}
                    onClick={() => change({ season: on ? "any" : s })}
                    className={`group flex cursor-pointer flex-col items-center gap-1.5 rounded-[14px] py-3 transition-colors ${on ? "bg-pine/10" : "hover:bg-plate"}`}
                  >
                    <span
                      lang="ja"
                      aria-hidden
                      className={`font-mincho text-[2.25rem] leading-none transition-colors duration-300 ${on ? "text-pine" : "text-ink/25 group-hover:text-ink/50"}`}
                    >
                      {SEASONS[s].kanji}
                    </span>
                    <span className={`font-gothic text-[0.8125rem] ${on ? "text-pine" : "text-ink-soft"}`}>{ui[s].node}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* What: the types, a list on desktop, a row on phones. */}
          <div>
            <p id="exp-type-q" className="font-gothic text-small text-ink-soft">
              {ui.categoryLabel.node}
            </p>
            <div
              role="group"
              aria-labelledby="exp-type-q"
              className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] desktop:mx-0 desktop:flex-col desktop:gap-1 desktop:overflow-visible desktop:px-0"
            >
              {[{ id: "all", label: ui.all, symbol: null as T | null }, ...categories].map((c) => {
                const on = type === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => change({ type: c.id })}
                    className={`inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2.5 rounded-full px-4 font-gothic text-small transition-colors desktop:w-full desktop:justify-start ${
                      on ? "bg-ink text-plate" : "bg-plate text-ink hover:bg-mist desktop:bg-transparent desktop:hover:bg-plate"
                    }`}
                  >
                    {c.symbol ? (
                      <span lang="ja" aria-hidden className={`w-5 font-mincho text-[1.0625rem] leading-none ${on ? "text-pine-soft" : "text-pine"}`}>
                        {c.symbol.text}
                      </span>
                    ) : (
                      <span aria-hidden className="hidden w-5 desktop:inline" />
                    )}
                    {c.label.node}
                  </button>
                );
              })}
            </div>
          </div>

        </aside>

        <div className="min-w-0">
          {/* The results' count, heading the grid: it changes as the filters do. */}
          <p aria-live="polite" className="mb-5 flex items-baseline gap-2.5">
            <span dir="ltr" className="font-serif text-[2.5rem] leading-none text-pine tabular-nums [font-variation-settings:'opsz'_48]">
              {shown.length}
            </span>
            <span className="font-gothic text-label text-ink-soft">{(shown.length === 1 ? ui.countOne : ui.count).node}</span>
          </p>
      {shown.length === 0 ? (
        <p className="rounded-[20px] bg-plate p-8 text-center font-gothic text-copy text-ink-soft">{ui.empty.node}</p>
      ) : (
        <ul className="grid gap-4 tablet:grid-cols-2">
          {shown.map((e) => {
            const c = cat(e.category);
            return (
              <li key={e.id} style={{ viewTransitionName: `exp-${e.id}` } as CSSProperties}>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={(ev) => show(e, ev.currentTarget)}
                  className="exp-card group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[20px] bg-plate p-6 text-start transition-colors duration-300 hover:bg-white focus-visible:bg-white"
                >
                  {e.photo ? (
                    <Image
                      src={e.photo.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 834px) 50vw, 100vw"
                      className="pointer-events-none object-cover opacity-35 grayscale-[15%] transition-opacity duration-500 group-hover:opacity-45"
                      style={{ objectPosition: e.photo.focus }}
                    />
                  ) : null}
                  {/* The category's kanji, large and faint: the site's motif. */}
                  <span
                    lang="ja"
                    aria-hidden
                    className="pointer-events-none absolute -end-2 -bottom-6 font-mincho text-[8.5rem] leading-none text-pine/[0.07] transition-transform duration-500 group-hover:-translate-y-1"
                  >
                    {c.symbol.text}
                  </span>
                  <span className="relative flex items-center gap-2 font-gothic text-[0.8125rem] text-ink-soft">
                    <span lang="ja" aria-hidden className="font-mincho text-[1.0625rem] leading-none text-pine">
                      {c.symbol.text}
                    </span>
                    {c.label.node}
                    <span aria-hidden>·</span>
                    {e.city.node}
                  </span>
                  <span className="relative mt-4 font-serif text-[1.375rem] leading-[1.2] text-ink [font-variation-settings:'opsz'_24]">{e.title.node}</span>
                  <span className="relative mt-3 line-clamp-3 font-gothic text-small leading-relaxed text-ink-soft">{e.what.node}</span>
                  <span className="relative mt-auto flex flex-col gap-2 pt-6">
                    <MonthStrip months={e.months} />
                    <span className="flex items-center justify-between gap-3 font-gothic text-[0.8125rem] text-ink-soft">
                      <span>{e.duration.node}</span>
                      <span>
                        {ui.lead.node} <span dir="ltr">{lead(e.leadTimeWeeks)}</span>
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
        </div>
      </div>

      {/* Detail panel: a native dialog (focus trapped, Escape closes); a click outside closes too. */}
      <dialog
        ref={dialog}
        aria-labelledby="exp-dialog-title"
        onClose={() => {
          setOpen(null);
          lastCard.current?.focus();
        }}
        onClick={(ev) => {
          if (ev.target === dialog.current) hide();
        }}
        className="exp-dialog m-auto w-[min(44rem,calc(100vw-2rem))] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-ink/40 backdrop:backdrop-blur-[2px] max-tablet:mb-0 max-tablet:w-full"
      >
        {open ? (
          <div className="relative max-h-[88svh] overflow-y-auto rounded-[24px] bg-plate p-7 tablet:p-10 max-tablet:rounded-b-none" data-lenis-prevent>
            {open.photo ? (
              <div className="relative -mx-7 -mt-7 mb-7 h-48 overflow-hidden rounded-t-[24px] tablet:-mx-10 tablet:-mt-10 tablet:h-56">
                <Image src={open.photo.src} alt="" fill sizes="44rem" className="object-cover" style={{ objectPosition: open.photo.focus }} />
              </div>
            ) : null}
            {open.photo ? null : (
              <span lang="ja" aria-hidden className="pointer-events-none absolute end-6 top-4 font-mincho text-[7rem] leading-none text-pine/[0.08]">
                {cat(open.category).symbol.text}
              </span>
            )}
            <p className="relative font-gothic text-small text-ink-soft">
              {cat(open.category).label.node} · {open.city.node}
            </p>
            <h2 id="exp-dialog-title" className="relative mt-2 max-w-[28rem] font-serif text-h2 leading-tight [font-variation-settings:'opsz'_36]">
              {open.title.node}
            </h2>
            <p className="relative mt-5 font-gothic text-copy text-ink-soft">{open.what.node}</p>
            <dl className="relative mt-7 grid grid-cols-2 gap-x-6 gap-y-4">
              {[
                [ui.host, open.practitioner],
                [ui.where, open.venue],
                [ui.duration, open.duration],
                [ui.group, open.groupLimit],
              ].map(([label, value], i) => (
                <div key={i} className="min-w-0">
                  <dt className="font-gothic text-[0.8125rem] text-ink-soft">{label.node}</dt>
                  <dd className="mt-1 font-gothic text-label text-ink">{value.node}</dd>
                </div>
              ))}
            </dl>
            <div className="relative mt-7">
              <p className="font-gothic text-[0.8125rem] text-ink-soft">
                {ui.months.node}: <span className="text-ink">{when(open)}</span>
              </p>
              <MonthStrip months={open.months} labels={monthNames} />
              <p className="mt-3 font-gothic text-small text-ink-soft">
                {ui.lead.node} <span dir="ltr" className="text-ink">{lead(open.leadTimeWeeks)}</span>
              </p>
            </div>
            <div className="relative mt-8 flex flex-col gap-3 tablet:flex-row tablet:items-center">
              <TripButton id={`exp:${open.id}`} kind="experience" add={ui.addToTrip.node} added={ui.addedToTrip.node} className="px-6" />
              <button type="button" onClick={hide} className="tap cursor-pointer font-gothic text-label text-ink-soft underline hover:text-pine">
                {ui.close.node}
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}

/** Twelve months as a strip: filled where the experience runs. Labels in the detail panel. */
function MonthStrip({ months, labels }: { months: number[]; labels?: string[] }) {
  return (
    <span className={`grid grid-cols-12 gap-[3px] ${labels ? "mt-2" : ""}`} dir="ltr" aria-hidden>
      {Array.from({ length: 12 }, (_, m) => (
        <span key={m} className="flex flex-col items-center gap-1">
          <span className={`h-1.5 w-full rounded-full ${months.includes(m) ? "bg-pine" : "bg-mist"}`} />
          {labels ? <span className="font-gothic text-[0.625rem] leading-none text-ink-soft">{labels[m]}</span> : null}
        </span>
      ))}
    </span>
  );
}
