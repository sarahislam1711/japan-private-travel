import Link from "next/link";
import type { RouteKey } from "@content/routes";
import { pageTitles } from "@content/index";
import { localePath } from "@content/routes";
import type { Copy } from "@content/schema";
import lastmod from "@content/lastmod.json";
import { legalUpdated } from "@content/pages/utility";
import { getLocale } from "@/lib/locale";
import { CopyText } from "./CopyText";

type Section = { id?: string; heading: Copy; body: Copy[]; link?: RouteKey };
type Doc = { title: Copy; contents: Copy; intro: Copy; sections: Section[] };

/**
 * A long-form legal page (privacy notice, terms of business): title and
 * intro, then the sections in a reading column, with "On this page" held in
 * view beside them on desktop. Plain type, no panels: it is read, not browsed.
 */
export async function LegalPage({ doc, page }: { doc: Doc; page: "privacy" | "terms" }) {
  const locale = await getLocale();
  const updated = (lastmod as Record<string, string>)[page];
  const anchor = (s: Section, i: number) => s.id ?? `section-${i + 1}`;
  return (
    <main id="main" className="mx-auto max-w-(--content-max) px-(--page-margin) pt-10 pb-24 desktop:pt-16 desktop:pb-32">
      <header className="max-w-[44rem]">
        <h1 className="font-serif text-h1 font-[450] [font-variation-settings:'opsz'_60]">
          <CopyText copy={doc.title} />
        </h1>
        <p className="mt-6 font-gothic text-copy text-ink-soft">
          <CopyText copy={doc.intro} />
        </p>
        {updated ? (
          <p className="mt-4 font-gothic text-small text-ink-soft">
            <CopyText copy={legalUpdated} />:{" "}
            <time dateTime={updated.slice(0, 10)}>
              {new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", { dateStyle: "long", timeZone: "Asia/Tokyo" }).format(new Date(updated))}
            </time>
          </p>
        ) : null}
      </header>

      <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-10 desktop:mt-20">
        <nav aria-labelledby="legal-contents" className="col-span-12 desktop:col-span-4">
          <div className="rounded-[20px] bg-plate p-6 desktop:sticky desktop:top-8">
            <p id="legal-contents" className="font-gothic text-small text-ink-soft">
              <CopyText copy={doc.contents} />
            </p>
            <ol className="mt-3 flex flex-col font-gothic text-label">
              {doc.sections.map((s, i) => (
                <li key={i}>
                  <a href={`#${anchor(s, i)}`} className="flex min-h-10 items-baseline gap-3 no-underline hover:text-pine">
                    <span className="w-6 shrink-0 text-small text-ink-soft tabular-nums" dir="ltr">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <CopyText copy={s.heading} />
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="col-span-12 flex max-w-[44rem] flex-col gap-12 desktop:col-span-8">
          {doc.sections.map((s, i) => (
            <section key={i} id={anchor(s, i)} aria-labelledby={`${anchor(s, i)}-h`} className="scroll-mt-8">
              <h2 id={`${anchor(s, i)}-h`} className="flex items-baseline gap-4 font-serif text-h3 [font-variation-settings:'opsz'_24]">
                <span className="font-gothic text-small text-ink-soft tabular-nums" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <CopyText copy={s.heading} />
              </h2>
              <div className="mt-4 flex flex-col gap-4 font-gothic text-copy text-ink-soft">
                {s.body.map((p, j) => (
                  <p key={j}>
                    <CopyText copy={p} />
                  </p>
                ))}
                {s.link ? (
                  <p>
                    <Link href={localePath(s.link, locale)} className="tap text-ink">
                      <CopyText copy={pageTitles[s.link]} />
                    </Link>
                  </p>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
