import type { PlaceholderKey } from "@content/placeholders";

const isDev = process.env.NODE_ENV !== "production";

/**
 * A value nobody has supplied yet. Dev: dashed outline in the surrounding ink, with the key.
 * Production: the bare [[KEY]] text, which the guard's render crawl fails on (C7).
 */
export function Placeholder({ name }: { name: PlaceholderKey }) {
  if (!isDev) return <span data-placeholder={name} dir="ltr">{`[[${name}]]`}</span>;
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
