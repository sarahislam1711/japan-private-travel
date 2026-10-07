import { languageMenu, languageNames } from "@content/languages";
import { localePath, routes } from "@content/routes";
import { copyText } from "@/lib/copy";
import { getLocale } from "@/lib/locale";
import { CopyText } from "./CopyText";
import { LanguageMenu } from "./LanguageMenu";

const pairs = routes.map((r) => ({ en: localePath(r.key, "en"), ar: localePath(r.key, "ar") }));

/** The language menu (globe and dropdown), for the header and the mobile menu. */
export async function LanguageSwitch() {
  const locale = await getLocale();
  return (
    <LanguageMenu
      pairs={pairs}
      current={locale}
      label={copyText(languageMenu.label, locale)}
      names={{ en: <CopyText copy={languageNames.en} />, ar: <CopyText copy={languageNames.ar} /> }}
    />
  );
}
