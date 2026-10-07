import { pageTitles } from "@content/index";
import { pageMetadata } from "@/lib/metadata";
import { PageTitle } from "@/components/PageTitle";

export const generateMetadata = () => pageMetadata("contact");

export default function ContactPage() {
  return <PageTitle copy={pageTitles.contact} />;
}
