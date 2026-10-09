import type { CSSProperties } from "react";
import { home } from "@content/pages/home";
import { site } from "@content/site";
import { copyText, isResolved } from "@/lib/copy";
import { CopyText } from "./CopyText";
import { SplitWords } from "./SplitWords";
import { WhatsAppLink } from "./WhatsAppLink";

const d = (n: number) => ({ "--d": n }) as CSSProperties;

/** Home's close on pine, flowing into the pine footer: the invitation, WhatsApp, email and telephone. */
export function ContactBand() {
  const c = home.contact;
  const tel = isResolved(site.phone) ? `tel:${copyText(site.phone).replace(/[^\d+]/g, "")}` : undefined;
  const mail = isResolved(site.email) ? `mailto:${copyText(site.email)}` : undefined;
  return (
    <section aria-labelledby="contact-title" className="mx-auto section-gap mb-24 max-w-(--content-max) px-(--page-margin) desktop:mb-32">
      {/* An inset pine panel on paper: the page's close, clearly apart from the footer. */}
      <div className="on-pine grid grid-cols-12 items-center gap-y-10 desktop:gap-x-10 rounded-[24px] px-8 py-14 tablet:px-14 tablet:py-16 desktop:px-16">
        <h2 id="contact-title" data-reveal="words" className="col-span-12 max-w-[20ch] font-serif text-display [font-variation-settings:'opsz'_60] desktop:col-span-8">
          <SplitWords copy={c.heading} />
        </h2>
        <div data-reveal style={d(2)} className="col-span-12 flex flex-col items-start gap-6 desktop:col-span-4">
          <p className="font-gothic text-copy text-ink-soft">
            <CopyText copy={c.reply} />
          </p>
          <WhatsAppLink tone="light" />
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-gothic text-label">
            <dt className="text-ink-soft">
              <CopyText copy={c.emailLabel} />
            </dt>
            <dd>
              <a href={mail} className="tap">
                <CopyText copy={c.email} />
              </a>
            </dd>
            <dt className="text-ink-soft">
              <CopyText copy={c.phoneLabel} />
            </dt>
            <dd className="[font-variant-numeric:lining-nums]">
              <a href={tel} className="tap">
                <CopyText copy={c.phone} />
              </a>
            </dd>
          </dl>
        </div>
      </div>
    </section>
  );
}
