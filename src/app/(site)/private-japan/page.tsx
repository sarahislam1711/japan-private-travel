import { pageTitles } from "@content/index";
import { pageMetadata } from "@/lib/metadata";
import { PageTitle } from "@/components/PageTitle";

export const metadata = pageMetadata("privateJapan");

export default function PrivateJapanPage() {
  return <PageTitle copy={pageTitles.privateJapan} />;
}
