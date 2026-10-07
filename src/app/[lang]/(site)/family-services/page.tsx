import { pageTitles } from "@content/index";
import { pageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/StructuredData";
import { PageTitle } from "@/components/PageTitle";

export const generateMetadata = () => pageMetadata("familyServices");

export default function FamilyServicesPage() {
  return (
    <>
      <StructuredData page="familyServices" />
      <PageTitle copy={pageTitles.familyServices} />
    </>
  );
}
