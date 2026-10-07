import { pageMeta } from "@content/meta";
import { placeholders, type PlaceholderKey } from "@content/placeholders";
import { localePath, type RouteKey } from "@content/routes";
import { site } from "@content/site";
import { summerJourneys } from "@content/pages/summer-journeys";
import { copyText, isPublishable } from "@/lib/copy";
import { getLocale } from "@/lib/locale";
import { siteUrl } from "@/lib/site-url";

/** A supplied fact, or undefined: placeholder text never reaches structured data. */
const fact = (key: PlaceholderKey) => placeholders[key].value ?? undefined;
const clean = <T extends object>(o: T) => JSON.parse(JSON.stringify(o)) as T; // drops undefined

/**
 * JSON-LD for a page, as one graph in the page's language:
 * - the agency (TravelAgency) with its logo, offices and contact point;
 * - the website;
 * - the page, typed where schema.org has a fitting type (AboutPage, ContactPage);
 * - what the page offers (TouristTrip for the two trip pages, Service for
 *   Family Services and Experiences), provided by the agency;
 * - its breadcrumb.
 * Only supplied facts and approved copy are emitted (in development, drafts
 * too, for checking). Nothing is inferred: no prices, dates or ratings.
 */
export async function StructuredData({ page }: { page: RouteKey }) {
  const locale = await getLocale();
  const base = siteUrl();
  const abs = (p: string) => new URL(encodeURI(p), base).toString();
  const prod = process.env.NODE_ENV === "production";
  const text = (c: Parameters<typeof copyText>[0]) => (!prod || isPublishable(c, locale) ? copyText(c, locale) : undefined);
  const home = abs(localePath("home", locale));
  const orgId = `${abs("/")}#agency`;

  const office = (key: "ENTITY_ADDRESS" | "OSAKA_ADDRESS", locality: string) =>
    fact(key) ? { "@type": "PostalAddress", streetAddress: fact(key), addressLocality: locality, addressCountry: "JP" } : undefined;
  const address = office("ENTITY_ADDRESS", "Tokyo");
  const osaka = office("OSAKA_ADDRESS", "Osaka");
  const pageUrl = abs(localePath(page, locale));
  const pageId = `${pageUrl}#page`;
  const name = text(pageMeta[page].title);
  const description = text(pageMeta[page].description);
  const image = abs(`/og/${locale}/${page}`);

  // What the page offers, when it offers something.
  const offer =
    page === "summerJourneys" || page === "privateJapan"
      ? {
          "@type": "TouristTrip",
          "@id": `${pageUrl}#offer`,
          name,
          description,
          touristType: "Families",
          provider: { "@id": orgId },
          itinerary:
            page === "summerJourneys"
              ? {
                  "@type": "ItemList",
                  itemListElement: summerJourneys.regions.map((r, i) => ({
                    "@type": "ListItem",
                    position: i + 1,
                    item: { "@type": "TouristDestination", name: text(r.heading) },
                  })),
                }
              : undefined,
        }
      : page === "familyServices" || page === "experiences"
        ? {
            "@type": "Service",
            "@id": `${pageUrl}#offer`,
            name,
            description,
            provider: { "@id": orgId },
            areaServed: { "@type": "Country", name: "Japan" },
          }
        : undefined;

  const pageType = page === "about" ? "AboutPage" : page === "contact" ? "ContactPage" : "WebPage";

  const graph = [
    {
      "@type": "TravelAgency",
      "@id": orgId,
      name: copyText(site.brand.name),
      legalName: fact("ENTITY_NAME_EN"),
      url: abs("/"),
      telephone: fact("PHONE"),
      email: fact("EMAIL"),
      logo: { "@type": "ImageObject", "@id": `${abs("/")}#logo`, url: abs("/logo.png"), width: 512, height: 512 },
      image: { "@id": `${abs("/")}#logo` },
      address,
      location: osaka ? [address, osaka].filter(Boolean).map((a) => ({ "@type": "Place", address: a })) : undefined,
      contactPoint:
        fact("PHONE") || fact("EMAIL") || fact("WHATSAPP_DISPLAY")
          ? {
              "@type": "ContactPoint",
              contactType: "customer service",
              telephone: fact("PHONE") ?? fact("WHATSAPP_DISPLAY"),
              email: fact("EMAIL"),
              availableLanguage: ["Arabic", "English", "Japanese"],
            }
          : undefined,
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
      "@type": pageType,
      "@id": pageId,
      url: pageUrl,
      name,
      description,
      inLanguage: locale,
      isPartOf: { "@id": `${abs("/")}#website` },
      about: { "@id": orgId },
      mainEntity: offer ? { "@id": offer["@id"] } : page === "about" || page === "contact" ? { "@id": orgId } : undefined,
      primaryImageOfPage: { "@type": "ImageObject", url: image, width: 1200, height: 630 },
      breadcrumb:
        page === "home"
          ? undefined
          : {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: copyText(site.brand.name), item: home },
                { "@type": "ListItem", position: 2, name, item: pageUrl },
              ],
            },
    },
    ...(offer ? [offer] : []),
  ];

  const json = JSON.stringify(clean({ "@context": "https://schema.org", "@graph": graph })).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
