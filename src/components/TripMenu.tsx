"use client";

import Image from "next/image";
import { useEffect, useId, useRef, type ReactNode } from "react";
import type { Catalogue } from "@/lib/trip-catalogue";
import { removeFromTrip, useTrip } from "@/lib/trip";

type L = { node: ReactNode; text: string };

/**
 * My trip in the header: a quiet "My trip" with a count, shown once the
 * visitor has added something. It opens a panel at inline-end listing what
 * they added, each removable, with "Plan my trip" to the planner.
 */
export function TripMenu({ catalogue, labels, contactPath }: { catalogue: Catalogue; labels: Record<"title" | "plan" | "remove" | "empty" | "close", L>; contactPath: string }) {
  const items = useTrip().filter((x) => catalogue[x.id]);
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const close = () => dialog.current?.close();

  // Close on a click on the backdrop.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClick = (e: MouseEvent) => e.target === d && d.close();
    d.addEventListener("click", onClick);
    return () => d.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      {items.length ? (
        <button
          type="button"
          onClick={() => dialog.current?.showModal()}
          className="trip-count inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-plate ps-4 pe-1.5 font-gothic text-label whitespace-nowrap text-ink transition-colors hover:bg-white max-tablet:ps-1.5"
        >
          {/* Small phones: the count alone, so the bar keeps room for the globe and Menu; the label stays for screen readers. */}
          <span className="max-tablet:sr-only">{labels.title.node}</span>
          <span key={items.length} className="trip-count-n flex size-8 items-center justify-center rounded-full bg-pine text-small text-plate tabular-nums" dir="ltr">
            {items.length}
          </span>
        </button>
      ) : null}

      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        className="trip-panel fixed inset-y-0 end-0 start-auto m-0 h-dvh max-h-dvh w-full max-w-[26rem] bg-plate p-0 text-ink backdrop:bg-ink/35"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-6 py-5">
            <h2 id={titleId} className="font-serif text-h3 [font-variation-settings:'opsz'_24]">
              {labels.title.node}
            </h2>
            <button type="button" onClick={close} className="tap cursor-pointer font-gothic text-label text-ink-soft underline hover:text-pine">
              {labels.close.node}
            </button>
          </div>

          {items.length ? (
            <ul data-lenis-prevent className="flex flex-1 flex-col gap-3 overflow-y-auto px-6 py-5">
              {items.map((x) => {
                const c = catalogue[x.id];
                return (
                  <li key={x.id} className="flex items-center gap-4 rounded-[16px] bg-ground p-3">
                    <span className="relative size-16 shrink-0 overflow-hidden rounded-[12px] bg-mist">
                      {c.img ? <Image src={c.img} alt="" fill sizes="64px" className="object-cover" style={{ objectPosition: c.focus }} /> : null}
                    </span>
                    <span className="min-w-0 flex-1 font-serif text-[1.125rem] leading-snug [font-variation-settings:'opsz'_20]">{c.title}</span>
                    <button
                      type="button"
                      onClick={() => removeFromTrip(x.id)}
                      aria-label={`${labels.remove.text}: ${c.title}`}
                      className="tap shrink-0 cursor-pointer pe-1 font-gothic text-small text-ink-soft underline hover:text-pine"
                    >
                      {labels.remove.node}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="flex-1 px-6 py-5 font-gothic text-copy text-ink-soft">{labels.empty.node}</p>
          )}

          <div className="border-t border-ink/10 px-6 py-5">
            <a
              href={contactPath}
              className="flex min-h-12 w-full items-center justify-center rounded-(--radius-control) bg-ink px-6 font-gothic text-label font-bold text-plate no-underline transition-colors hover:bg-pine hover:text-plate"
            >
              {labels.plan.node}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
