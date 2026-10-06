import { pageTitles } from "@content/index";
import { pageMetadata } from "@/lib/metadata";
import { PageTitle } from "@/components/PageTitle";

export const metadata = pageMetadata("terms");

export default function TermsPage() {
  return <PageTitle copy={pageTitles.terms} />;
}
