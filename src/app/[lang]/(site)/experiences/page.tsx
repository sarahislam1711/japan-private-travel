import { pageTitles } from "@content/index";
import { pageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/StructuredData";
import { PageTitle } from "@/components/PageTitle";

export const generateMetadata = () => pageMetadata("experiences");

export default function ExperiencesPage() {
  return (
    <>
      <StructuredData page="experiences" />
      <PageTitle copy={pageTitles.experiences} />
    </>
  );
}
