import { languageSwitch } from "@content/languages";
import { localePath, routes } from "@content/routes";
import { getLocale } from "@/lib/locale";
import { CopyText } from "./CopyText";
import { LanguageLink } from "./LanguageLink";

const pairs = routes.map((r) => ({ en: localePath(r.key, "en"), ar: localePath(r.key, "ar") }));

/** The switch to the other language, for the header, mobile menu and footer. */
export async function LanguageSwitch({ className }: { className?: string }) {
  const locale = await getLocale();
  return (
    <LanguageLink pairs={pairs} target={locale === "ar" ? "en" : "ar"} className={className}>
      <CopyText copy={languageSwitch.label} />
    </LanguageLink>
  );
}
