"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

type Item = { href: string; label: ReactNode };

/**
 * A header group that discloses its pages (Trips → Summer Journeys, Private
 * Japan). Opens on click or hover; closes on Escape, outside click or when
 * focus leaves. No chevron: the banned list rules out icons and arrows.
 */
export function NavGroup({ label, items }: { label: ReactNode; items: Item[] }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const pathname = usePathname();
  const active = items.some((i) => i.href === pathname);

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
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
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
        className={`cursor-pointer hover:underline aria-expanded:underline ${active ? "underline decoration-2" : ""}`}
      >
        {label}
      </button>
      {/* pt bridges the gap so the pointer can travel into the panel without closing it */}
      <div id={panelId} hidden={!open} className="absolute start-0 top-full z-20 pt-3">
        <ul className="min-w-52 rounded-(--radius-control) bg-plate px-4 py-3 ring-1 ring-hairline">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={item.href === pathname ? "page" : undefined}
                className="block py-1.5 no-underline hover:underline aria-[current=page]:underline aria-[current=page]:decoration-2"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
