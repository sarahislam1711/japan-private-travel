import { useSyncExternalStore } from "react";

/**
 * My trip: the experiences, packages and summer regions a visitor adds as
 * they browse. Kept on this device only (localStorage), like the planner's
 * answers, and shared by the header, the add buttons and the planner.
 */
export type TripKind = "experience" | "package" | "region";
export type TripItem = { id: string; kind: TripKind };

const KEY = "halajapan-trip";
const EVENT = "halajapan-trip";
const NONE: TripItem[] = [];

let cache: { raw: string | null; items: TripItem[] } = { raw: null, items: NONE };

function read(): TripItem[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {}
  if (raw === cache.raw) return cache.items;
  let items = NONE;
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) items = parsed.filter((x) => x && typeof x.id === "string" && typeof x.kind === "string");
  } catch {}
  cache = { raw, items };
  return items;
}

function write(items: TripItem[]) {
  try {
    if (items.length) localStorage.setItem(KEY, JSON.stringify(items));
    else localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

/** Adds the item, or takes it out if it is already there. A package is a starting route, so a new one replaces the last. */
export function toggleTrip(item: TripItem) {
  const items = read();
  if (items.some((x) => x.id === item.id)) return write(items.filter((x) => x.id !== item.id));
  write([...items.filter((x) => item.kind !== "package" || x.kind !== "package"), item]);
}

export const removeFromTrip = (id: string) => write(read().filter((x) => x.id !== id));
export const clearTrip = () => write([]);

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange); // other tabs
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** The current list; empty on the server and until the page hydrates. */
export function useTrip(): TripItem[] {
  return useSyncExternalStore(subscribe, read, () => NONE);
}
