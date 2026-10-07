import { pageTitles } from "@content/index";
import { pageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/StructuredData";
import { PageTitle } from "@/components/PageTitle";

export const generateMetadata = () => pageMetadata("privacy");

export default function PrivacyPage() {
  return (
    <>
      <StructuredData page="privacy" />
      <PageTitle copy={pageTitles.privacy} />
    </>
  );
}
