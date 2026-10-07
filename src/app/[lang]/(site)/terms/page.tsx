import { pageTitles } from "@content/index";
import { pageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/StructuredData";
import { PageTitle } from "@/components/PageTitle";

export const generateMetadata = () => pageMetadata("terms");

export default function TermsPage() {
  return (
    <>
      <StructuredData page="terms" />
      <PageTitle copy={pageTitles.terms} />
    </>
  );
}
