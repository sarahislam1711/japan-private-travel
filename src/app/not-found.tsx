import type { Metadata } from "next";
import { notFoundPage } from "@content/index";
import { copyText } from "@/lib/copy";
import { PageTitle } from "@/components/PageTitle";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: copyText(notFoundPage.content.title),
  robots: { index: false, follow: false },
};

export default function NotFound() {
  // The 404 sits outside the (site) group, so it carries the header and footer itself.
  return (
    <>
      <SiteHeader />
      <PageTitle copy={notFoundPage.content.title} />
      <SiteFooter />
    </>
  );
}
