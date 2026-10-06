import type { Copy } from "@content/schema";
import { CopyText } from "./CopyText";

/** Prompt 1 stand-in: a page that renders only its title. Replaced page by page from Prompt 3. */
export function PageTitle({ copy }: { copy: Copy }) {
  return (
    <main id="main" className="mx-auto max-w-(--content-max) px-(--page-margin) py-24">
      <h1 className="max-w-(--measure-main) font-serif text-h1 [font-variation-settings:'opsz'_60]">
        <CopyText copy={copy} />
      </h1>
    </main>
  );
}
