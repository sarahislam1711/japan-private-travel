"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

type Item = { href: string; label: ReactNode; description: ReactNode };

const CLOSE_DELAY = 140; // ms: lets the pointer travel from trigger to panel without flicker

/**
 * A header group that discloses its pages (Trips → Summer Journeys, Private
 * Japan). Opens on click or hover; closes on Escape, outside click or when
 * focus leaves. Each item carries its page name and a one-line description.
 */
export function NavGroup({ label, items }: { label: ReactNode; items: Item[] }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();
  const pathname = usePathname();
  const active = items.some((i) => i.href === pathname);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

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

  useEffect(() => cancelClose, []);

  return (
    <div
      ref={root}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={closeSoon}
      onBlur={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex cursor-pointer items-center gap-1.5 transition-colors hover:text-navy aria-expanded:text-navy ${
          active ? "underline decoration-2 underline-offset-[0.22em]" : ""
        }`}
      >
        {label}
        {/* Disclosure chevron: signals a menu, turns when open. */}
        <svg
          aria-hidden
          viewBox="0 0 10 6"
          className={`size-2.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {/* The top padding bridges trigger and panel so hover survives the gap. */}
      <div id={panelId} hidden={!open} className="absolute -start-3 top-full z-20 pt-2.5">
        <ul className="nav-panel w-80 rounded-[10px] bg-plate p-1.5 ring-1 ring-ink/20">
          {items.map((item) => {
            const current = item.href === pathname;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className="group/item block rounded-(--radius-control) px-3 py-2.5 no-underline transition-colors hover:bg-mist focus-visible:bg-mist"
                >
                  <span className="block text-ink group-aria-[current=page]/item:font-bold group-aria-[current=page]/item:text-navy">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-small text-ink-soft">{item.description}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
