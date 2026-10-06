import type { Copy } from "@content/schema";
import { placeholderValue } from "@/lib/copy";
import { Draft } from "./Draft";
import { Placeholder } from "./Placeholder";

/** Renders a content node: placeholders, inline Japanese or Arabic, and the DRAFT marker. */
export function CopyText({ copy }: { copy: Copy }) {
  const segments = copy.body.map((segment, i) => {
    if (typeof segment === "string") return segment;
    if ("ph" in segment) return placeholderValue(segment.ph) ?? <Placeholder key={i} name={segment.ph} />;
    return (
      <span key={i} lang={segment.lang} dir={segment.lang === "ar" ? "rtl" : undefined}>
        {segment.text}
      </span>
    );
  });

  const inner = copy.lang ? (
    <span lang={copy.lang} dir={copy.lang === "ar" ? "rtl" : undefined}>
      {segments}
    </span>
  ) : (
    <>{segments}</>
  );

  return copy.status === "draft" ? <Draft>{inner}</Draft> : inner;
}
