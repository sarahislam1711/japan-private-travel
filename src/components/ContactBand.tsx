import Link from "next/link";
import { home } from "@content/pages/home";
import { routeFor } from "@content/routes";
import { site } from "@content/site";
import { copyText, isResolved } from "@/lib/copy";
import { CopyText } from "./CopyText";
import { WhatsAppLink } from "./WhatsAppLink";

/** Home's closing step: one sentence, the WhatsApp button, and every other route to the desk. */
export function ContactBand() {
  const band = home.contactBand;
  const contact = routeFor("contact");
  const tel = isResolved(site.phone) ? `tel:${copyText(site.phone).replace(/[^\d+]/g, "")}` : undefined;
  const mail = isResolved(site.email) ? `mailto:${copyText(site.email)}` : undefined;
  return (
    <section aria-labelledby="contact-title" className="on-navy mt-32">
      <div className="mx-auto grid max-w-(--content-max) grid-cols-12 gap-x-6 px-(--page-margin) py-24">
      <h2 id="contact-title" className="col-span-12 max-w-[20ch] font-serif text-h1 [font-variation-settings:'opsz'_60] desktop:col-span-6 desktop:col-start-2">
        <CopyText copy={band.sentence} />
      </h2>
      <div className="col-span-12 mt-8 flex flex-col items-start gap-6 desktop:col-span-5 desktop:col-start-8 desktop:mt-3">
        <WhatsAppLink tone="light" />
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-gothic text-label">
          <dt className="text-ink-soft">
            <CopyText copy={band.emailLabel} />
          </dt>
          <dd>
            <a href={mail}>
              <CopyText copy={band.email} />
            </a>
          </dd>
          <dt className="text-ink-soft">
            <CopyText copy={band.phoneLabel} />
          </dt>
          <dd className="[font-variant-numeric:lining-nums]">
            <a href={tel}>
              <CopyText copy={band.phone} />
            </a>
          </dd>
        </dl>
        <p className="font-gothic text-label">
          <Link href={contact.path}>
            <CopyText copy={band.formLink} />
          </Link>
        </p>
      </div>
      </div>
    </section>
  );
}
