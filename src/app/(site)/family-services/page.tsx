import { pageTitles } from "@content/index";
import { pageMetadata } from "@/lib/metadata";
import { PageTitle } from "@/components/PageTitle";

export const metadata = pageMetadata("familyServices");

export default function FamilyServicesPage() {
  return <PageTitle copy={pageTitles.familyServices} />;
}
