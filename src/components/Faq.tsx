import Link from "next/link";
import { home } from "@content/pages/home";
import { localePath } from "@content/routes";
import { getLocale } from "@/lib/locale";
import { CopyText } from "./CopyText";
import { SplitWords } from "./SplitWords";

/**
 * Home's FAQ, before the contact close: the heading at inline-start, the
 * questions beside it, each answer opening on a toggle. Native <details>, so
 * it works without JavaScript and every answer stays in the page for search
 * engines. Marked up as FAQPage in StructuredData.
 */
export async function Faq() {
  const locale = await getLocale();
  const { heading, items } = home.faq;
  return (
    <section aria-labelledby="faq-title" className="mx-auto section-gap grid max-w-(--content-max) grid-cols-12 gap-x-6 gap-y-8 px-(--page-margin)">
      <h2 id="faq-title" data-reveal="words" className="col-span-12 font-serif text-h1 [font-variation-settings:'opsz'_60] desktop:col-span-4">
        <SplitWords copy={heading} />
      </h2>
      <div data-reveal className="col-span-12 flex flex-col gap-2 desktop:col-span-8">
        {items.map((item, i) => (
          <details key={i} className="faq group rounded-[16px] bg-plate transition-colors open:bg-plate hover:bg-mist/50">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 px-6 py-4 [&::-webkit-details-marker]:hidden">
              <span className="font-serif text-[1.3125rem] leading-snug [font-variation-settings:'opsz'_24]">
                <CopyText copy={item.question} />
              </span>
              {/* Plus that turns to a cross when open (a functional sign, like the chevron). */}
              <span aria-hidden className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-ground text-ink transition-[transform,background-color] duration-300 group-open:rotate-45 group-open:bg-pine group-open:text-plate">
                <svg viewBox="0 0 12 12" className="size-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M2 6h8M6 2v8" />
                </svg>
              </span>
            </summary>
            <div className="px-6 pb-6">
              <p className="max-w-[44rem] font-gothic text-copy text-ink-soft">
                <CopyText copy={item.answer} />
              </p>
              {"link" in item && item.link ? (
                <Link href={localePath(item.link.route, locale)} className="tap mt-3 font-gothic text-label">
                  <CopyText copy={item.link.text} />
                </Link>
              ) : null}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
