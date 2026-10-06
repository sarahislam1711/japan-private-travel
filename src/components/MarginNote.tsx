import { ui } from "@content/interface";
import type { ClaimId } from "@content/schema";
import type { ReactNode } from "react";
import { CopyText } from "./CopyText";

/**
 * The proof beside a claim: level with its paragraph in the margin column,
 * following it on narrow screens. A light inline-start rule marks it as
 * evidence. The source link goes to the claim's entry in the About sources list.
 */
export function MarginNote({ children, claims = [] }: { children: ReactNode; claims?: ClaimId[] }) {
  return (
    <aside className="max-w-(--measure-note) border-s-2 border-hairline ps-4 font-gothic text-label text-ink-soft">
      <p>{children}</p>
      {claims.length ? (
        <p className="mt-2">
          <a href={`/about#${claims[0]}`} className="text-ink">
            <CopyText copy={ui.sourceLink} />
          </a>
        </p>
      ) : null}
    </aside>
  );
}
