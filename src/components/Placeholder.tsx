import type { PlaceholderKey } from "@content/placeholders";

const showMarkers = process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_SHOW_DRAFTS === "1";

/**
 * A value nobody has supplied yet: the bare [[KEY]] text, which the guard's
 * render crawl fails on (C7). With pnpm dev:drafts: a dashed outline as well.
 */
export function Placeholder({ name }: { name: PlaceholderKey }) {
  if (!showMarkers) return <span data-placeholder={name} dir="ltr">{`[[${name}]]`}</span>;
  return (
    <span
      data-placeholder={name}
      dir="ltr"
      className="font-gothic text-[0.8em] tracking-normal [font-variant-numeric:lining-nums] outline-1 outline-offset-2 outline-dashed [outline-color:color-mix(in_oklab,currentColor_45%,transparent)]"
    >
      {`[[${name}]]`}
    </span>
  );
}
