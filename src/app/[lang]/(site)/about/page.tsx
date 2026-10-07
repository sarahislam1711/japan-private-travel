import { pageTitles } from "@content/index";
import { pageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/StructuredData";
import { PageTitle } from "@/components/PageTitle";

export const generateMetadata = () => pageMetadata("about");

export default function AboutPage() {
  return (
    <>
      <StructuredData page="about" />
      <PageTitle copy={pageTitles.about} />
    </>
  );
}
