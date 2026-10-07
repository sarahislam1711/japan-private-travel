import { getLocale } from "@/lib/locale";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Copy } from "@content/schema";
import { routeFor, localePath } from "@content/routes";
import { CopyText } from "./CopyText";
import { SplitWords } from "./SplitWords";
import { WhatsAppLink } from "./WhatsAppLink";

const d = (n: number) => ({ "--d": n }) as CSSProperties;

/** A page's closing invitation on pine, flowing into the pine footer. */
export async function PageClose({ heading }: { heading: Copy }) {
  const locale = await getLocale();
  const contact = routeFor("contact");
  return (
    <section aria-labelledby="close-title" className="on-pine mt-40 desktop:mt-56">
      <div className="mx-auto grid max-w-(--content-max) grid-cols-12 gap-x-6 gap-y-10 px-(--page-margin) pt-28 pb-20">
        <h2 id="close-title" data-reveal="words" className="col-span-12 max-w-[18ch] font-serif text-h1 [font-variation-settings:'opsz'_60] desktop:col-span-7">
          <SplitWords copy={heading} />
        </h2>
        <div data-reveal style={d(2)} className="col-span-12 flex flex-wrap items-center gap-x-6 gap-y-4 desktop:col-span-4 desktop:col-start-9 desktop:self-end">
          <WhatsAppLink tone="light" />
          <Link href={localePath(contact.key, locale)} className="font-gothic text-label">
            <CopyText copy={contact.navLabel!} />
          </Link>
        </div>
      </div>
    </section>
  );
}
