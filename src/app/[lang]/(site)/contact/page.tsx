import { pageTitles } from "@content/index";
import { pageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/StructuredData";
import { PageTitle } from "@/components/PageTitle";

export const generateMetadata = () => pageMetadata("contact");

export default function ContactPage() {
  return (
    <>
      <StructuredData page="contact" />
      <PageTitle copy={pageTitles.contact} />
    </>
  );
}
