import type { Metadata } from "next";
import { notFoundPage } from "@content/index";
import { copyText } from "@/lib/copy";
import { PageTitle } from "@/components/PageTitle";

export const metadata: Metadata = {
  title: copyText(notFoundPage.content.title),
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <PageTitle copy={notFoundPage.content.title} />;
}
