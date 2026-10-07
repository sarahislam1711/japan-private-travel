"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Compares addresses in one form: Arabic slugs may arrive percent-encoded or not. */
export const samePath = (a: string, b: string) => {
  const norm = (p: string) => {
    try {
      return decodeURI(p).replace(/\/$/, "") || "/";
    } catch {
      return p;
    }
  };
  return norm(a) === norm(b);
};

/** A header link that marks itself as the current page. */
export function NavLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  const current = samePath(usePathname(), href);
  return (
    <Link href={href} aria-current={current ? "page" : undefined} className={className}>
      {children}
    </Link>
  );
}
