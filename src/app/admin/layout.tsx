import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontVariables } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "HalaJapan · Plans",
  robots: { index: false, follow: false },
};

/** The admin area: its own root layout, English only, never indexed. */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-svh bg-ground font-gothic text-ink">{children}</body>
    </html>
  );
}
