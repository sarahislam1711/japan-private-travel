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
    <section aria-labelledby="close-title" className="mx-auto mt-40 mb-24 max-w-(--content-max) px-(--page-margin) desktop:mt-56 desktop:mb-32">
      {/* An inset pine panel on paper: the page's close, clearly apart from the footer. */}
      <div className="on-pine grid grid-cols-12 items-center gap-x-10 gap-y-10 rounded-[24px] px-8 py-14 tablet:px-14 tablet:py-16 desktop:px-16">
        <h2 id="close-title" data-reveal="words" className="col-span-12 max-w-[18ch] font-serif text-h1 [font-variation-settings:'opsz'_60] desktop:col-span-8">
          <SplitWords copy={heading} />
        </h2>
        <div data-reveal style={d(2)} className="col-span-12 flex flex-wrap items-center gap-x-6 gap-y-4 desktop:col-span-4">
          <WhatsAppLink tone="light" />
          <Link href={localePath(contact.key, locale)} className="tap font-gothic text-label">
            <CopyText copy={contact.navLabel!} />
          </Link>
        </div>
      </div>
    </section>
  );
}
