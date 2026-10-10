import { STONE_ELLIPSES } from "@/lib/mark";

/** The stepping-stones mark, drawn in currentColor. Decorative: the wordmark beside it carries the name. */
export function StonesMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={className}>
      {STONE_ELLIPSES.map((e) => (
        <ellipse key={e.cx} {...e} fill="currentColor" />
      ))}
    </svg>
  );
}
