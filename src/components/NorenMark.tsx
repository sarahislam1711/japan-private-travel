import { NOREN_PATHS } from "@/lib/noren";

/** The noren mark, drawn in currentColor. Decorative: the wordmark beside it carries the name. */
export function NorenMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={className}>
      {NOREN_PATHS.map((d) => (
        <path key={d} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}
