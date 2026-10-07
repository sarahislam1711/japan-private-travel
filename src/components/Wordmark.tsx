import { placeholderValue } from "@/lib/copy";
import { splitBrand } from "@/lib/noren";
import { NorenMark } from "./NorenMark";
import { Placeholder } from "./Placeholder";

/**
 * The logo lockup: noren mark and wordmark, "Hala" in Pine and "Japan" in Ink
 * (Source Serif 4, weight 450). Always Latin and always drawn left to right,
 * on the Arabic site too. `stacked` sets the mark above the name (footer).
 */
export function Wordmark({ stacked = false }: { stacked?: boolean }) {
  const name = placeholderValue("BRAND");
  const [first, second] = name ? splitBrand(name) : ["", ""];
  return (
    <span dir="ltr" className={`inline-flex ${stacked ? "flex-col items-start gap-2" : "items-center gap-2.5"}`}>
      <NorenMark className={`shrink-0 text-pine ${stacked ? "size-8" : "size-[1.875rem]"}`} />
      <span
        lang="en"
        className="font-[family-name:var(--font-source-serif)] text-[1.5rem] leading-none font-[450] tracking-[-0.01em] [font-variation-settings:'opsz'_32]"
      >
        {name ? (
          <>
            <span className="text-pine">{first}</span>
            <span className="text-ink">{second}</span>
          </>
        ) : (
          <Placeholder name="BRAND" />
        )}
      </span>
    </span>
  );
}
