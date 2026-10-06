import { pageTitles } from "@content/index";
import { pageMetadata } from "@/lib/metadata";
import { PageTitle } from "@/components/PageTitle";

export const metadata = pageMetadata("home");

export default function HomePage() {
  return <PageTitle copy={pageTitles.home} />;
}
