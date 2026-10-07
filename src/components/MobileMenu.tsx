"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

/**
 * The small-screen menu: a button that opens the navigation as a full-screen
 * sheet on the page ground, with the brand and a Close button in the same
 * place as the bar it covers. Closes on Escape, on Close, or once a link is
 * followed; the page behind does not scroll while it is open.
 */
export function MobileMenu({
  openLabel,
  closeLabel,
  brand,
  extra,
  children,
}: {
  openLabel: ReactNode;
  closeLabel: ReactNode;
  brand: ReactNode;
  extra?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const sheetId = useId();
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      trigger.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={sheetId}
        onClick={() => setOpen(true)}
        data-menu-trigger
        className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full px-3 font-gothic text-label transition-colors hover:bg-mist"
      >
        {openLabel}
        {/* Two bars: the conventional sign for a menu (a functional sign, like the chevron). */}
        <svg aria-hidden viewBox="0 0 18 10" className="w-[1.125rem]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M1 1.5h16M1 8.5h16" />
        </svg>
      </button>

      <div
        id={sheetId}
        hidden={!open}
        data-lenis-prevent
        className="menu-sheet fixed inset-0 z-50 overflow-y-auto bg-ground"
        onClick={(e) => {
          // Following a link to the page already open does not change the path; close anyway.
          if ((e.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        <div className="flex min-h-full flex-col px-(--page-margin) pt-6 pb-8">
          <div className="flex items-center justify-between gap-4 pb-5">
            {brand}
            <div className="flex items-center gap-1">
              {extra}
              <button
                ref={closeButton}
                type="button"
                aria-expanded={open}
                aria-controls={sheetId}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full px-3 font-gothic text-label transition-colors hover:bg-mist"
              >
                {closeLabel}
                <svg aria-hidden viewBox="0 0 14 14" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M1.5 1.5l11 11M12.5 1.5l-11 11" />
                </svg>
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
