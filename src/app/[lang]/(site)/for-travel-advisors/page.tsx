import { pageTitles } from "@content/index";
import { pageMetadata } from "@/lib/metadata";
import { PageTitle } from "@/components/PageTitle";

export const generateMetadata = () => pageMetadata("forTravelAdvisors");

export default function ForTravelAdvisorsPage() {
  return <PageTitle copy={pageTitles.forTravelAdvisors} />;
}
