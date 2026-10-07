import { getLocale } from "@/lib/locale";
import { ui } from "@content/interface";
import { site } from "@content/site";
import { copyText, isResolved } from "@/lib/copy";
import { CopyText } from "./CopyText";

/**
 * The WhatsApp button: solid by default, outlined beside the hero's Plan your trip. Opens WhatsApp with the drafted greeting.
 * Until [[WHATSAPP_E164]] is supplied it links nowhere real, and the guard's
 * C7 and C12 checks keep it out of production.
 */
export async function WhatsAppLink({ tone = "ink", className = "" }: { tone?: "ink" | "light" | "outline"; className?: string }) {
  const locale = await getLocale();
  const number = isResolved(site.whatsapp.e164) ? copyText(site.whatsapp.e164).replace(/\D/g, "") : "";
  const href = `https://wa.me/${number}?text=${encodeURIComponent(copyText(site.whatsapp.prefill, locale))}`;
  return (
    <a
      href={href}
      className={`${className} inline-flex min-h-12 items-center justify-center rounded-(--radius-control) px-6 font-gothic text-label font-bold no-underline transition-colors ${
        tone === "light"
          ? "bg-plate text-pine hover:bg-ground hover:text-pine"
          : tone === "outline"
            ? "text-ink ring-1 ring-ink ring-inset hover:bg-ink hover:text-plate"
            : "bg-ink text-plate hover:bg-pine hover:text-plate"
      }`}
    >
      <CopyText copy={ui.whatsappButton} />
    </a>
  );
}
