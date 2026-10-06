import type { CSSProperties } from "react";
import type { Copy } from "@content/schema";
import { CopyText } from "./CopyText";

/**
 * A heading whose words rise into place when its [data-reveal] ancestor
 * enters view. Only plain, approved copy is split; drafts and placeholders
 * render unsplit so their dev markers stay intact.
 */
export function SplitWords({ copy }: { copy: Copy }) {
  const plain = copy.status === "locked" && !copy.lang && copy.body.every((s) => typeof s === "string");
  if (!plain) return <CopyText copy={copy} />;
  const words = (copy.body as string[]).join("").split(/\s+/).filter(Boolean);
  return (
    <>
      {words.map((word, i) => (
        <span key={i}>
          <span className="split-word" aria-hidden>
            <span style={{ "--w": i } as CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
      <span className="sr-only">{words.join(" ")}</span>
    </>
  );
}
