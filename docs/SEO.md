# SEO.md — how the site is set up to be crawled, indexed and cited

Audited and set up 7 Oct 2026; AI-readability pass (nine layers) 9 Oct 2026. Keep every item here true when changing routing, metadata or layout.

## Indexing switch
- The site is **indexable only on the Vercel production deployment of the real domain** (`VERCEL_ENV=production` and `[[DOMAIN]]` filled). Everywhere else (local, previews, pre-domain builds) it sends `noindex, nofollow` (meta tag and `X-Robots-Tag`) and robots.txt `Disallow: /`, so unfinished pages never reach an index.
- Verified by simulation: on production with a real domain, robots.txt opens, the noindex header disappears, and the sitemap lists all 20 URLs on the real domain.

## Crawling
- **robots.txt** (`src/app/robots.ts`): all crawlers allowed; search engines named explicitly (Googlebot, Bingbot, Applebot, DuckDuckBot, YandexBot) and AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, Amazonbot, meta-externalagent, DuckAssistBot, MistralAI-User). Decision: AI crawlers allowed, as nothing is paywalled and being cited is the point. Blocked: the advisor portal, the dev styleguide, `/admin` and `/api`. References the sitemap and host.
- **sitemap.xml** (`src/app/sitemap.ts`): every public page in English and Arabic, each with hreflang alternates, a real `<lastmod>` (when the page's content last changed, from git: `content/lastmod.json`, written by `pnpm lastmod` before each build) and an honest `<changefreq>` (monthly; yearly for legal pages).
- **llms.txt** and **llms-full.txt** (`src/lib/llms.ts`): a curated brief in the editor's voice, built from the site's own copy: what HalaJapan is, how it is registered (Travel World → Air World), what it offers, how it works (planned per enquiry, no fixed packages, no published prices), offices and contact, and every page in both languages. The full version adds the three summer regions with their facts, the FAQ and the company facts. In production, approved copy only.
- **Server-rendered content:** every page's full text is in the raw HTML (crawlers that run no JavaScript, including most AI crawlers, read it all). Scroll reveals and the pinned How we work showcase never apply to crawlers or reduced-motion visitors (`isBot()`), and nothing is hidden without JavaScript.
- **Internal links** are plain `<a href>` (Next `Link`), including the Trips and language menus (present in the HTML even when closed).

## Indexation signals
- One `<h1>` per page. `<html lang dir>` per language.
- **Canonical:** self-referencing, per language; tracking parameters don't create duplicates.
- **hreflang:** en, ar and x-default (→ English) on every page and in the sitemap, reciprocal.
- **One URL per page per language:** `/en/...` → `/...`, English slugs under `/ar/` → Arabic slugs, trailing slashes → none (all 308). Unknown URLs return a real 404 in the right language.
- **Titles and descriptions** in both languages (`content/meta.ts`, DRAFT until approved), made in one place (`pageMetadata` in `src/lib/metadata.ts`): "[Page] | HalaJapan", 50–60 characters (legal pages shorter by nature), descriptions 150–160.
- **Structured data** (`src/components/StructuredData.tsx`): one connected @graph per page and language, linked by @id. TravelAgency (brand, legal name Travel World Co., Ltd., description, slogan, logo at `/logo.png`, founding date, founder, both offices with phone and fax, opening hours, contact point, registration identifier, knowsAbout), the founder (Person), WebSite (no SearchAction: the site has no search), the page (AboutPage, ContactPage or WebPage, with dateModified and its OG image) and a separate BreadcrumbList. About also names Air World Co., Ltd. (Organization, JTA No. 961, JATA member) as it does on the page. The advisors page is a Service for a BusinessAudience. No priceRange: the site quotes per trip. Home also carries a FAQPage with its five questions (a question is left out until every fact in its answer is supplied). What the page offers is its mainEntity: TouristTrip for Summer Journeys (itinerary: its three regions) and Private Japan, Service for Family Services and Experiences. No prices, dates or ratings. Legal name, address, phone, email, registration and membership appear automatically once their placeholders are filled; placeholder text is never emitted.
- **Share previews:** Open Graph (site name, locale and alternate locale, type, title, description, url) and Twitter cards with a generated 1200×630 image per page and language (`/og/[locale]/[page]`; Arabic laid out right to left).
- **Semantic HTML:** offices in `<address>`; the legal pages show a "Last updated" `<time datetime>`.
- Favicon (`src/app/icon.svg`, the stepping-stones mark), Apple touch icon, web manifest, theme colour.

## Mobile (mobile-first indexing)
- Viewport set; no horizontal scroll at 390px in either language.
- Every tap target is at least 44×44px (text links carry a `.tap` touch area that doesn't move the layout).
- Body text 18px (Arabic 21px); nothing readable below 12px.

## Performance
- Server Components by default; client JavaScript only for the menus, smooth scroll, reveals and the showcase.
- Fonts self-hosted and split by script (`pnpm fonts`); Japanese cut to the characters used (12 KB). No third-party scripts.
- Security headers on every response: HSTS, nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy.
- **Measured 9 Oct 2026** (Lighthouse 12, mobile, production build): English pages performance 91–94, accessibility 100, best practices 100, SEO 100 once indexing is open (the only failing check is the intentional noindex off the live domain); CLS 0. Arabic pages performance 78–83 (Arabic font weight; see LAUNCH.md). Anything on screen at load is shown with no fade, so the main text paints with the first frame.
- **Accessibility:** `pnpm test:a11y` runs axe (WCAG 2.2 AA) on every route, both languages, at 390 and 1440: 40/40 pass.

## Launch
Everything still to do before and after launch is in `docs/LAUNCH.md`.
