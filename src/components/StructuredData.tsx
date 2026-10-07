import { pageMeta } from "@content/meta";
import { placeholders, type PlaceholderKey } from "@content/placeholders";
import { localePath, type RouteKey } from "@content/routes";
import { site } from "@content/site";
import { copyText, isPublishable } from "@/lib/copy";
import { getLocale } from "@/lib/locale";
import { siteUrl } from "@/lib/site-url";

/** A supplied fact, or undefined: placeholder text never reaches structured data. */
const fact = (key: PlaceholderKey) => placeholders[key].value ?? undefined;
const clean = <T extends object>(o: T) => JSON.parse(JSON.stringify(o)) as T; // drops undefined

/**
 * JSON-LD for a page: the agency (TravelAgency), the website, the page itself
 * and its breadcrumb, in the page's language. Only supplied facts and
 * approved copy are emitted (in development, drafts too, for checking).
 */
export async function StructuredData({ page }: { page: RouteKey }) {
  const locale = await getLocale();
  const base = siteUrl();
  const abs = (p: string) => new URL(encodeURI(p), base).toString();
  const prod = process.env.NODE_ENV === "production";
  const text = (c: Parameters<typeof copyText>[0]) => (!prod || isPublishable(c, locale) ? copyText(c, locale) : undefined);
  const home = abs(localePath("home", locale));
  const orgId = `${abs("/")}#agency`;

  const address = fact("ENTITY_ADDRESS")
    ? { "@type": "PostalAddress", streetAddress: fact("ENTITY_ADDRESS"), addressCountry: "JP" }
    : undefined;

  const graph = [
    {
      "@type": "TravelAgency",
      "@id": orgId,
      name: copyText(site.brand.name),
      legalName: fact("ENTITY_NAME_EN"),
      url: abs("/"),
      telephone: fact("PHONE"),
      email: fact("EMAIL"),
      address,
      areaServed: { "@type": "Country", name: "Japan" },
      knowsLanguage: ["ar", "en", "ja"],
      identifier: fact("REG_NUMBER") ? { "@type": "PropertyValue", name: "Travel agency registration", value: fact("REG_NUMBER") } : undefined,
      memberOf: fact("ASSOCIATION") ? { "@type": "Organization", name: fact("ASSOCIATION") } : undefined,
    },
    {
      "@type": "WebSite",
      "@id": `${abs("/")}#website`,
      url: abs("/"),
      name: copyText(site.brand.name),
      inLanguage: ["en", "ar"],
      publisher: { "@id": orgId },
    },
    {
      "@type": "WebPage",
      "@id": `${abs(localePath(page, locale))}#page`,
      url: abs(localePath(page, locale)),
      name: text(pageMeta[page].title),
      description: text(pageMeta[page].description),
      inLanguage: locale,
      isPartOf: { "@id": `${abs("/")}#website` },
      about: { "@id": orgId },
      breadcrumb:
        page === "home"
          ? undefined
          : {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: copyText(site.brand.name), item: home },
                { "@type": "ListItem", position: 2, name: text(pageMeta[page].title), item: abs(localePath(page, locale)) },
              ],
            },
    },
  ];

  const json = JSON.stringify(clean({ "@context": "https://schema.org", "@graph": graph })).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
