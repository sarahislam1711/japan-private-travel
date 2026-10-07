import { readFileSync } from "node:fs";
import { join } from "node:path";

// Flag artwork from flag-icons (MIT); see src/assets/flags/SOURCE.md.
const svg = (code: string) => readFileSync(join(process.cwd(), "src/assets/flags", `${code}.svg`), "utf8").replace("<svg ", '<svg aria-hidden="true" focusable="false" ');
const flags = { us: svg("us"), sa: svg("sa") };

/** A small inline flag (4:3), decorative: the language name beside it carries the meaning. */
export function Flag({ code }: { code: keyof typeof flags }) {
  return (
    <span
      aria-hidden
      className="inline-block h-[0.95rem] w-[1.27rem] shrink-0 overflow-hidden rounded-[2px] ring-1 ring-ink/10 [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
      dangerouslySetInnerHTML={{ __html: flags[code] }}
    />
  );
}
