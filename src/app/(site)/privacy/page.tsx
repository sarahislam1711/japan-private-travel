import { pageTitles } from "@content/index";
import { pageMetadata } from "@/lib/metadata";
import { PageTitle } from "@/components/PageTitle";

export const metadata = pageMetadata("privacy");

export default function PrivacyPage() {
  return <PageTitle copy={pageTitles.privacy} />;
}
