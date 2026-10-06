import { pageTitles } from "@content/index";
import { pageMetadata } from "@/lib/metadata";
import { PageTitle } from "@/components/PageTitle";

export const metadata = pageMetadata("about");

export default function AboutPage() {
  return <PageTitle copy={pageTitles.about} />;
}
