import { privacy } from "@content/pages/utility";
import { LegalPage } from "@/components/LegalPage";
import { StructuredData } from "@/components/StructuredData";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("privacy");

export default function PrivacyPage() {
  return (
    <>
      <StructuredData page="privacy" />
      <LegalPage doc={privacy} />
    </>
  );
}
