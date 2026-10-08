import type { CSSProperties } from "react";
import type { Copy } from "@content/schema";
import { resolve } from "@/lib/copy";
import { getLocale } from "@/lib/locale";
import { CopyText } from "./CopyText";

/**
 * A heading whose words rise into place when its [data-reveal] ancestor
 * enters view, in the page's language. Only plain, approved text is split;
 * drafts, placeholders and missing translations render unsplit so their dev
 * markers stay intact. Arabic splits on spaces, so each word keeps its joins.
 */
export async function SplitWords({ copy, accent }: { copy: Copy; accent?: Record<string, string> }) {
  const locale = await getLocale();
  const r = resolve(copy, locale);
  // With accents the text is split even as a draft (DRAFT tags no longer show on pages).
  const plain = !r.missing && (r.status === "locked" || !!accent) && !copy.lang && r.body.every((s) => typeof s === "string");
  if (!plain) return <CopyText copy={copy} />;
  const words = (r.body as string[]).join("").split(/\s+/).filter(Boolean);
  return (
    <>
      {/* The words themselves are the text: no hidden duplicate, so search engines and screen readers read the heading once. */}
      {words.map((word, i) => {
        // An accented word (July, August) is set in pine with its Japanese name above it as ruby.
        const note = accent ? Object.entries(accent).find(([k]) => word.includes(k))?.[1] : undefined;
        return (
          <span key={i}>
            <span className={note ? "split-word split-accent" : "split-word"}>
              <span style={{ "--w": i } as CSSProperties}>
                {note ? (
                  <ruby className="text-pine">
                    {word}
                    <rt lang="ja">{note}</rt>
                  </ruby>
                ) : (
                  word
                )}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </>
  );
}
