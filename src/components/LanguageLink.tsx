"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export type PathPair = { en: string; ar: string };

const norm = (p: string) => {
  try {
    return decodeURI(p).replace(/\/$/, "") || "/";
  } catch {
    return p;
  }
};

/**
 * Links to the current page in the other language (never back to Home).
 * Pairs map each page's English path to its Arabic path.
 */
export function LanguageLink({ pairs, target, className, children }: { pairs: PathPair[]; target: "en" | "ar"; className?: string; children: ReactNode }) {
  const here = norm(usePathname());
  const pair = pairs.find((p) => norm(p.en) === here || norm(p.ar) === here);
  const href = pair ? pair[target] : target === "ar" ? "/ar" : "/";
  return (
    <Link href={href} hrefLang={target} lang={target} dir={target === "ar" ? "rtl" : "ltr"} className={className}>
      {children}
    </Link>
  );
}
