"use client";

import type { ReactNode } from "react";
import { toggleTrip, useTrip, type TripKind } from "@/lib/trip";

/**
 * "Add to my trip": adds the item to My trip without leaving the page, and
 * turns to "Added to my trip" with a tick; pressing again takes it out.
 */
export function TripButton({ id, kind, add, added, className = "" }: { id: string; kind: TripKind; add: ReactNode; added: ReactNode; className?: string }) {
  const on = useTrip().some((x) => x.id === id);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => toggleTrip({ id, kind })}
      className={`inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-(--radius-control) px-5 font-gothic text-label font-bold no-underline transition-colors ${
        on ? "bg-pine text-plate hover:bg-ink" : "bg-ink text-plate hover:bg-pine"
      } ${className}`}
    >
      <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {on ? <path d="M3 8.5l3.2 3L13 4.5" /> : <path d="M8 3v10M3 8h10" />}
      </svg>
      {on ? added : add}
    </button>
  );
}
