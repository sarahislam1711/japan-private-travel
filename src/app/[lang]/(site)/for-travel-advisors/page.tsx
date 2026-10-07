import { pageTitles } from "@content/index";
import { pageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/StructuredData";
import { PageTitle } from "@/components/PageTitle";

export const generateMetadata = () => pageMetadata("forTravelAdvisors");

export default function ForTravelAdvisorsPage() {
  return (
    <>
      <StructuredData page="forTravelAdvisors" />
      <PageTitle copy={pageTitles.forTravelAdvisors} />
    </>
  );
}
