import type { ClaimId } from "@content/schema";
import type { ReactNode } from "react";

/**
 * The proof beside a claim. Sits level with its paragraph in the margin
 * column; on narrow screens it follows the paragraph. The claim ID links to
 * its numbered row in the About sources list.
 */
export function MarginNote({ children, claims = [] }: { children: ReactNode; claims?: ClaimId[] }) {
  return (
    <aside className="max-w-(--measure-note) border-t border-ink pt-2.5 font-gothic text-label text-ink-soft">
      <p>{children}</p>
      {claims.length ? (
        <p className="mt-1.5 flex gap-3 [font-variant-numeric:lining-nums_tabular-nums]">
          {claims.map((id) => (
            <a key={id} href={`/about#${id}`} className="text-ink">
              {id}
            </a>
          ))}
        </p>
      ) : null}
    </aside>
  );
}
