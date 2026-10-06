import { pageTitles } from "@content/index";
import { pageMetadata } from "@/lib/metadata";
import { PageTitle } from "@/components/PageTitle";

export const metadata = pageMetadata("summerJourneys");

export default function SummerJourneysPage() {
  return <PageTitle copy={pageTitles.summerJourneys} />;
}
