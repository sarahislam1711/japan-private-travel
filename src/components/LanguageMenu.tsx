"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

export type PathPair = { en: string; ar: string };
type Locale = "en" | "ar";

const norm = (p: string) => {
  try {
    return decodeURI(p).replace(/\/$/, "") || "/";
  } catch {
    return p;
  }
};

/**
 * A globe button that opens a short list of languages. Each choice goes to
 * the current page in that language; the current language is marked.
 * Closes on Escape, outside click or when focus leaves.
 */
export function LanguageMenu({
  pairs,
  current,
  label,
  names,
}: {
  pairs: PathPair[];
  current: Locale;
  label: string;
  names: Record<Locale, ReactNode>;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const here = norm(usePathname());
  const pair = pairs.find((p) => norm(p.en) === here || norm(p.ar) === here);
  const hrefFor = (l: Locale) => (pair ? pair[l] : l === "ar" ? "/ar" : "/");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className="relative"
      onBlur={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-mist hover:text-ink aria-expanded:bg-mist aria-expanded:text-ink"
      >
        {/* Globe: the functional, universally recognised sign for language. */}
        <svg aria-hidden viewBox="0 0 20 20" className="size-[1.15rem]" fill="none" stroke="currentColor" strokeWidth="1.4">
          <circle cx="10" cy="10" r="7.5" />
          <path d="M2.5 10h15M10 2.5c2.2 2.3 3.3 4.8 3.3 7.5S12.2 15.2 10 17.5M10 2.5C7.8 4.8 6.7 7.3 6.7 10s1.1 5.2 3.3 7.5" />
        </svg>
      </button>
      <div id={panelId} hidden={!open} className="absolute end-0 top-full z-30 pt-2">
        <ul data-pointer className="nav-panel menu-surface relative flex w-40 flex-col p-1 font-gothic text-small [--pointer-end:1rem]">
          {(["en", "ar"] as const).map((l) => (
            <li key={l}>
              <Link
                href={hrefFor(l)}
                hrefLang={l}
                aria-current={l === current ? "true" : undefined}
                onClick={() => setOpen(false)}
                className="flex min-h-10 items-center gap-2.5 rounded-[8px] px-2.5 text-start no-underline transition-colors hover:bg-ground focus-visible:bg-ground aria-[current=true]:text-pine"
              >
                {names[l]}
                {/* A tick marks the language in use (a functional sign, like the chevron). */}
                {l === current ? (
                  <svg aria-hidden viewBox="0 0 16 16" className="ms-auto size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8.5l3.2 3L13 4.5" />
                  </svg>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
