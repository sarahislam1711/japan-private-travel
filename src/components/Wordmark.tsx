import { site } from "@content/site";
import { CopyText } from "./CopyText";

/** Text-set wordmark from content/site.ts until a drawn mark exists. */
export function Wordmark() {
  return (
    <span className="font-serif text-[1.375rem] leading-none font-semibold tracking-[-0.015em] [font-variation-settings:'opsz'_24]">
      <CopyText copy={site.brand.name} />
    </span>
  );
}
