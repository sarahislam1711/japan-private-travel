import type { ReactNode } from "react";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Copy marked DRAFT in docs/CONTENT.md. Dev: dashed outline and a DRAFT tag.
 * Production: unmarked text carrying data-draft, which the guard's render crawl fails on (C7).
 */
export function Draft({ children }: { children: ReactNode }) {
  if (!isDev) return <span data-draft="">{children}</span>;
  return (
    <span
      data-draft=""
      className="outline-1 outline-offset-2 outline-dashed [outline-color:color-mix(in_oklab,currentColor_35%,transparent)]"
    >
      {children}
      <span className="ms-1.5 align-super font-gothic text-[0.6rem] leading-none tracking-normal opacity-70">DRAFT</span>
    </span>
  );
}
