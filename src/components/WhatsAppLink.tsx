import { getLocale } from "@/lib/locale";
import { ui } from "@content/interface";
import { site } from "@content/site";
import { copyText, isResolved } from "@/lib/copy";
import { CopyText } from "./CopyText";

/**
 * The one solid button on the site. Opens WhatsApp with the drafted greeting.
 * Until [[WHATSAPP_E164]] is supplied it links nowhere real, and the guard's
 * C7 and C12 checks keep it out of production.
 */
export async function WhatsAppLink({ tone = "ink" }: { tone?: "ink" | "light" }) {
  const locale = await getLocale();
  const number = isResolved(site.whatsapp.e164) ? copyText(site.whatsapp.e164).replace(/\D/g, "") : "";
  const href = `https://wa.me/${number}?text=${encodeURIComponent(copyText(site.whatsapp.prefill, locale))}`;
  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center rounded-(--radius-control) px-6 font-gothic text-label font-bold no-underline transition-colors ${
        tone === "light"
          ? "bg-plate text-pine hover:bg-ground hover:text-pine"
          : "bg-ink text-plate hover:bg-pine hover:text-plate"
      }`}
    >
      <CopyText copy={ui.whatsappButton} />
    </a>
  );
}
