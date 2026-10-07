import { terms } from "@content/pages/utility";
import { LegalPage } from "@/components/LegalPage";
import { StructuredData } from "@/components/StructuredData";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("terms");

export default function TermsPage() {
  return (
    <>
      <StructuredData page="terms" />
      <LegalPage doc={terms} />
    </>
  );
}
