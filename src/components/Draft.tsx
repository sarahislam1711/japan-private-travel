import type { ReactNode } from "react";

/** Visible markers only on request (pnpm dev:drafts); Sarah, 7 Oct 2026: pages read clean by default. */
const showMarkers = process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_SHOW_DRAFTS === "1";

/**
 * Copy marked DRAFT in docs/CONTENT.md. Always unmarked text carrying data-draft,
 * which the guard's render crawl fails on (C7). With pnpm dev:drafts: a dashed
 * outline and a DRAFT tag, for reviewing copy.
 */
export function Draft({ children }: { children: ReactNode }) {
  if (!showMarkers) return <span data-draft="">{children}</span>;
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
