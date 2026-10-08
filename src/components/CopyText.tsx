import type { Copy } from "@content/schema";
import { placeholderValue, resolve } from "@/lib/copy";
import { getLocale } from "@/lib/locale";
import { Draft } from "./Draft";
import { Placeholder } from "./Placeholder";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Renders a content node in the page's language: placeholders, inline
 * Japanese, the DRAFT marker, and a visible marker where Arabic is missing.
 */
export async function CopyText({ copy }: { copy: Copy }) {
  const locale = await getLocale();
  const r = resolve(copy, locale);

  if (r.missing) {
    // Never fall back to English on an Arabic page. Production: [[AR]], which the guard fails on.
    if (!isDev) return <span data-missing-ar="">[[AR]]</span>;
    return (
      <span data-missing-ar="" lang="en" dir="ltr" className="outline-1 outline-offset-2 outline-dashed [outline-color:color-mix(in_oklab,currentColor_45%,transparent)]">
        <span className="me-1 font-gothic text-[0.6rem] opacity-70">[[AR]]</span>
        {copy.body.map((s) => (typeof s === "string" ? s : "")).join("")}
      </span>
    );
  }

  const segments = r.body.map((segment, i) => {
    if (typeof segment === "string") return segment;
    if ("ph" in segment) {
      const value = placeholderValue(segment.ph);
      // A supplied value keeps its own direction inside the sentence (Latin names and addresses in Arabic text).
      return value !== null ? <bdi key={i}>{value}</bdi> : <Placeholder key={i} name={segment.ph} />;
    }
    return (
      // Japanese runs left to right even inside an Arabic page; Arabic right to left inside an English one.
      <span key={i} lang={segment.lang} dir={segment.lang === "ar" ? "rtl" : "ltr"}>
        {segment.text}
      </span>
    );
  });

  const inner = copy.lang ? (
    <span lang={copy.lang} dir={copy.lang === "ar" ? "rtl" : "ltr"}>
      {segments}
    </span>
  ) : (
    <>{segments}</>
  );

  return r.status === "draft" ? <Draft>{inner}</Draft> : inner;
}
