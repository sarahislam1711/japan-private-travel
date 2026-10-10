import { placeholderValue } from "@/lib/copy";
import { getLocale } from "@/lib/locale";
import { splitBrand } from "@/lib/mark";
import { StonesMark } from "./StonesMark";
import { Placeholder } from "./Placeholder";

/**
 * The logo lockup: stepping-stones mark and wordmark, the first word in Pine and the
 * second in Ink. English: "Hala" + "Japan" in Source Serif 4. Arabic site
 * (Sarah, 10 Oct 2026): "هلا" + "يابان" in Markazi Text, right to left.
 * `stacked` sets the mark above the name (footer).
 */
export async function Wordmark({ stacked = false }: { stacked?: boolean }) {
  const locale = await getLocale();
  const ar = locale === "ar";
  const name = placeholderValue("BRAND", locale);
  const [first, second] = name ? (ar ? (name.split(/\s+/) as [string, string]) : splitBrand(name)) : ["", ""];
  return (
    <span dir={ar ? "rtl" : "ltr"} className={`inline-flex ${stacked ? "flex-col items-start gap-2" : "items-center gap-2.5"}`}>
      <StonesMark className={`shrink-0 text-pine ${stacked ? "size-8" : "size-[1.875rem]"}`} />
      <span
        lang={ar ? "ar" : "en"}
        className={
          ar
            ? "font-[family-name:var(--font-markazi)] text-[1.875rem] leading-none font-[600]"
            : "font-[family-name:var(--font-source-serif)] text-[1.5rem] leading-none font-[450] tracking-[-0.01em] [font-variation-settings:'opsz'_32]"
        }
      >
        {name ? (
          <>
            <span className="text-pine">{first}</span>
            {ar ? " " : null}
            <span className="text-ink">{second}</span>
          </>
        ) : (
          <Placeholder name="BRAND" />
        )}
      </span>
    </span>
  );
}
