import { pageTitles } from "@content/index";
import { pageMetadata } from "@/lib/metadata";
import { PageTitle } from "@/components/PageTitle";

export const generateMetadata = () => pageMetadata("experiences");

export default function ExperiencesPage() {
  return <PageTitle copy={pageTitles.experiences} />;
}
