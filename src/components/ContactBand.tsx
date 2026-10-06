import { home } from "@content/pages/home";
import { site } from "@content/site";
import { copyText, isResolved } from "@/lib/copy";
import { CopyText } from "./CopyText";
import { WhatsAppLink } from "./WhatsAppLink";

/** Home's closing step on a pine field: the invitation, the WhatsApp button, email and telephone. */
export function ContactBand() {
  const c = home.contact;
  const tel = isResolved(site.phone) ? `tel:${copyText(site.phone).replace(/[^\d+]/g, "")}` : undefined;
  const mail = isResolved(site.email) ? `mailto:${copyText(site.email)}` : undefined;
  return (
    <section aria-labelledby="contact-title" className="on-pine mt-36">
      <div className="mx-auto grid max-w-(--content-max) grid-cols-12 gap-x-6 gap-y-8 px-(--page-margin) pt-24 pb-16">
        <div className="col-span-12 desktop:col-span-6 desktop:col-start-2">
          <h2 id="contact-title" className="max-w-[20ch] font-serif text-h1 [font-variation-settings:'opsz'_60]">
            <CopyText copy={c.heading} />
          </h2>
          <p className="mt-4 font-serif text-lede text-ink-soft">
            <CopyText copy={c.reply} />
          </p>
        </div>
        <div className="col-span-12 flex flex-col items-start gap-6 desktop:col-span-5 desktop:col-start-8 desktop:pt-3">
          <WhatsAppLink tone="light" />
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-gothic text-label">
            <dt className="text-ink-soft">
              <CopyText copy={c.emailLabel} />
            </dt>
            <dd>
              <a href={mail}>
                <CopyText copy={c.email} />
              </a>
            </dd>
            <dt className="text-ink-soft">
              <CopyText copy={c.phoneLabel} />
            </dt>
            <dd className="[font-variant-numeric:lining-nums]">
              <a href={tel}>
                <CopyText copy={c.phone} />
              </a>
            </dd>
          </dl>
        </div>
      </div>
    </section>
  );
}
