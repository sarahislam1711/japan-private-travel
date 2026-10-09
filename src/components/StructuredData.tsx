import { pageMeta } from "@content/meta";
import { placeholders, type PlaceholderKey } from "@content/placeholders";
import { localePath, type RouteKey } from "@content/routes";
import { site } from "@content/site";
import { summerJourneys } from "@content/pages/summer-journeys";
import { home as homeContent } from "@content/pages/home";
import { about } from "@content/pages/about";
import { experiences as experienceContent } from "@content/pages/experiences";
import lastmod from "@content/lastmod.json";
import { copyText, isPublishable } from "@/lib/copy";
import { getLocale } from "@/lib/locale";
import { siteUrl } from "@/lib/site-url";

/** A supplied fact, or undefined: placeholder text never reaches structured data. */
const fact = (key: PlaceholderKey) => placeholders[key].value ?? undefined;
const clean = <T extends object>(o: T) => JSON.parse(JSON.stringify(o)) as T; // drops undefined

/**
 * JSON-LD for a page, as one connected graph (linked by @id) in the page's language:
 * - the agency (TravelAgency: the brand, run by Travel World Co., Ltd.) with
 *   its logo, offices, hours, contact point and founder;
 * - the founder (Person) and the website;
 * - the page, typed where schema.org has a fitting type (AboutPage, ContactPage),
 *   with its breadcrumb (BreadcrumbList) and the date its content last changed;
 * - what the page offers: TouristTrip (Summer Journeys with its three
 *   destinations, Private Japan), Service (Family Services, Experiences, and
 *   the advisor service for a business audience);
 * - on About, Air World Co., Ltd., the licensed principal named on the page;
 * - on Home, the FAQ.
 * Every value is something the page shows. Only supplied facts and approved
 * copy are emitted in production. No prices (the site quotes per trip, so
 * no priceRange), no ratings, no search action (the site has no search).
 */
export async function StructuredData({ page }: { page: RouteKey }) {
  const locale = await getLocale();
  const base = siteUrl();
  const abs = (p: string) => new URL(encodeURI(p), base).toString();
  const prod = process.env.NODE_ENV === "production";
  const text = (c: Parameters<typeof copyText>[0]) => (!prod || isPublishable(c, locale) ? copyText(c, locale) : undefined);
  const home = abs(localePath("home", locale));
  const orgId = `${abs("/")}#agency`;

  // "〒106-0031 Kasumicho Corp 302, …" → postal code and street address.
  const office = (key: "ENTITY_ADDRESS" | "OSAKA_ADDRESS", locality: string) => {
    const v = fact(key);
    if (!v) return undefined;
    const m = v.match(/^〒?\s*(\d{3}-\d{4})\s*(.*)$/);
    return { "@type": "PostalAddress", streetAddress: m ? m[2] : v, postalCode: m?.[1], addressLocality: locality, addressRegion: locality, addressCountry: "JP" };
  };
  const address = office("ENTITY_ADDRESS", "Tokyo");
  const osaka = office("OSAKA_ADDRESS", "Osaka");
  const intl = (tel: string) => `+81-${tel.replace(/^0/, "")}`;
  const founderId = `${abs("/")}#founder`;
  const airWorldId = `${abs("/")}#air-world`;
  const breadcrumbId = `${abs(localePath(page, locale))}#breadcrumb`;
  const modified = (lastmod as Record<string, string>)[page];
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
                    item: {
                      "@type": "TouristDestination",
                      name: text(r.heading),
                      description: text(r.body),
                      containedInPlace: { "@type": "Country", name: "Japan" },
                    },
                  })),
                }
              : undefined,
        }
      : page === "familyServices" || page === "experiences" || page === "forTravelAdvisors"
        ? {
            "@type": "Service",
            "@id": `${pageUrl}#offer`,
            name,
            description,
            provider: { "@id": orgId },
            areaServed: { "@type": "Country", name: "Japan" },
            hasOfferCatalog:
              page === "experiences"
                ? {
                    "@type": "OfferCatalog",
                    name,
                    itemListElement: experienceContent.entries
                      .map((e) => ({ title: text(e.title), what: text(e.what), city: text(e.city) }))
                      .filter((e) => e.title)
                      .map((e) => ({
                        "@type": "Offer",
                        itemOffered: { "@type": "TouristAttraction", name: e.title, description: e.what, address: { "@type": "PostalAddress", addressLocality: e.city, addressCountry: "JP" } },
                      })),
                  }
                : undefined,
            audience:
              page === "forTravelAdvisors"
                ? { "@type": "BusinessAudience", audienceType: locale === "ar" ? "مستشارو السفر" : "Travel advisors" }
                : { "@type": "Audience", audienceType: locale === "ar" ? "العائلات" : "Families" },
          }
        : undefined;

  const pageType = page === "about" ? "AboutPage" : page === "contact" ? "ContactPage" : "WebPage";

  const graph = [
    {
      "@type": "TravelAgency",
      "@id": orgId,
      name: copyText(site.brand.name),
      alternateName: "Hala Japan",
      legalName: fact("ENTITY_NAME_EN"),
      description: text(homeContent.hero.paragraph),
      slogan: text(homeContent.hero.headline),
      url: abs("/"),
      telephone: fact("PHONE"),
      email: fact("EMAIL"),
      logo: { "@type": "ImageObject", "@id": `${abs("/")}#logo`, url: abs("/logo.png"), width: 512, height: 512 },
      image: { "@id": `${abs("/")}#logo` },
      address,
      // Both offices, as on the About page.
      location: about.offices.list.map((o, i) => ({
        "@type": "Place",
        name: text(o.name),
        address: i === 0 ? address : osaka,
        telephone: intl(o.tel),
        faxNumber: intl(o.fax),
      })),
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "17:00",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: fact("PHONE") ? intl(fact("PHONE")!) : undefined,
        email: fact("EMAIL"),
        availableLanguage: ["Arabic", "English", "Japanese"],
        hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "17:00" },
      },
      knowsAbout: summerJourneys.regions.map((r) => text(r.heading)).filter(Boolean),
      areaServed: { "@type": "Country", name: "Japan" },
      knowsLanguage: ["ar", "en", "ja"],
      identifier: fact("REG_NUMBER")
        ? { "@type": "PropertyValue", name: "Travel Agency Agent registration, Governor of Tokyo (東京都知事登録旅行業者代理業)", value: fact("REG_NUMBER") }
        : undefined,
      foundingDate: "2016-09-23",
      founder: { "@id": founderId },
      brand: { "@type": "Brand", name: copyText(site.brand.name) },
    },
    {
      "@type": "Person",
      "@id": founderId,
      name: text(about.people.director.name),
      alternateName: copyText(about.people.director.nameJa),
      jobTitle: text(about.people.director.role),
      description: text(about.people.director.bio),
      alumniOf: { "@type": "CollegeOrUniversity", name: "Cairo University" },
      knowsLanguage: ["ja", "ar"],
      worksFor: { "@id": orgId },
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
      dateModified: modified,
      mentions: page === "about" ? [{ "@id": airWorldId }, { "@id": founderId }] : undefined,
      mainEntity: offer ? { "@id": offer["@id"] } : page === "about" || page === "contact" ? { "@id": orgId } : undefined,
      primaryImageOfPage: { "@type": "ImageObject", url: image, width: 1200, height: 630 },
      breadcrumb: page === "home" ? undefined : { "@id": breadcrumbId },
    },
    ...(page === "home"
      ? []
      : [
          {
            "@type": "BreadcrumbList",
            "@id": breadcrumbId,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: copyText(site.brand.name), item: home },
              { "@type": "ListItem", position: 2, name, item: pageUrl },
            ],
          },
        ]),
    ...(offer ? [offer] : []),
    // About names the licensed travel company we sell for.
    ...(page === "about"
      ? [
          {
            "@type": "Organization",
            "@id": airWorldId,
            name: "Air World Co., Ltd.",
            alternateName: "エアーワールド株式会社",
            identifier: { "@type": "PropertyValue", name: "Registered Travel Agency, Commissioner of the Japan Tourism Agency (観光庁長官登録旅行業)", value: "961" },
            memberOf: { "@type": "Organization", name: "Japan Association of Travel Agents (JATA)" },
          },
        ]
      : []),
    // Home's FAQ: each question with its answer, as on the page.
    ...(page === "home"
      ? [
          {
            "@type": "FAQPage",
            "@id": `${pageUrl}#faq`,
            inLanguage: locale,
            isPartOf: { "@id": pageId },
            mainEntity: homeContent.faq.items
              .map((q) => ({ name: text(q.question), answer: text(q.answer) }))
              .filter((q) => q.name && q.answer)
              .map((q) => ({ "@type": "Question", name: q.name, acceptedAnswer: { "@type": "Answer", text: q.answer } })),
          },
        ]
      : []),
  ];

  const json = JSON.stringify(clean({ "@context": "https://schema.org", "@graph": graph })).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
