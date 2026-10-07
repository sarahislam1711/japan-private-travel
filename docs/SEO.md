# SEO.md — how the site is set up to be crawled, indexed and cited

Audited and set up 7 Oct 2026. Keep every item here true when changing routing, metadata or layout.

## Indexing switch
- The site is **indexable only on the Vercel production deployment of the real domain** (`VERCEL_ENV=production` and `[[DOMAIN]]` filled). Everywhere else (local, previews, pre-domain builds) it sends `noindex, nofollow` (meta tag and `X-Robots-Tag`) and robots.txt `Disallow: /`, so unfinished pages never reach an index.
- Verified by simulation: on production with a real domain, robots.txt opens, the noindex header disappears, and the sitemap lists all 20 URLs on the real domain.

## Crawling
- **robots.txt** (`src/app/robots.ts`): all crawlers allowed; AI crawlers named explicitly (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot). Blocked: the advisor portal and the dev styleguide, both languages. References the sitemap and host.
- **sitemap.xml** (`src/app/sitemap.ts`): every public page in English and Arabic, each with hreflang alternates.
- **llms.txt** (`src/app/llms.txt/route.ts`): a plain summary for AI systems with every page in both languages; in production, approved copy only.
- **Server-rendered content:** every page's full text is in the raw HTML (crawlers that run no JavaScript, including most AI crawlers, read it all). Scroll reveals and the pinned How we work showcase never apply to crawlers or reduced-motion visitors (`isBot()`), and nothing is hidden without JavaScript.
- **Internal links** are plain `<a href>` (Next `Link`), including the Trips and language menus (present in the HTML even when closed).

## Indexation signals
- One `<h1>` per page. `<html lang dir>` per language.
- **Canonical:** self-referencing, per language; tracking parameters don't create duplicates.
- **hreflang:** en, ar and x-default (→ English) on every page and in the sitemap, reciprocal.
- **One URL per page per language:** `/en/...` → `/...`, English slugs under `/ar/` → Arabic slugs, trailing slashes → none (all 308). Unknown URLs return a real 404 in the right language.
- **Titles and descriptions** in both languages (`content/meta.ts`, DRAFT until approved): titles under 60 characters with the brand, descriptions under 160, written for search intent in each language.
- **Structured data** (`src/components/StructuredData.tsx`): TravelAgency, WebSite, WebPage and BreadcrumbList per page and language. Legal name, address, phone, email, registration and membership appear automatically once their placeholders are filled; placeholder text is never emitted.
- **Share previews:** Open Graph and Twitter cards with a generated 1200×630 image per page and language (`/og/[locale]/[page]`; Arabic laid out right to left).
- Favicon (`src/app/icon.svg`, the noren mark), Apple touch icon, web manifest, theme colour.

## Mobile (mobile-first indexing)
- Viewport set; no horizontal scroll at 390px in either language.
- Every tap target is at least 44×44px (text links carry a `.tap` touch area that doesn't move the layout).
- Body text 18px (Arabic 21px); nothing readable below 12px.

## Performance
- Server Components by default; client JavaScript only for the menus, smooth scroll, reveals and the showcase.
- Fonts self-hosted and split by script (`pnpm fonts`); Japanese cut to the characters used (12 KB). No third-party scripts.
- Security headers on every response: HSTS, nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy.
- Not yet measured: Lighthouse and Core Web Vitals need a production build (Phase 5).

## Launch-day checklist
- [ ] Fill `[[DOMAIN]]`; deploy to Vercel production; confirm robots.txt, `X-Robots-Tag` absent, sitemap URLs on the domain.
- [ ] Approve titles and descriptions (both languages) in CONTENT.md §1b / CONTENT.ar.md.
- [ ] Verify the domain in Google Search Console and Bing Webmaster Tools (DNS TXT); submit the sitemap in both.
- [ ] Test a page in Google's Rich Results Test and URL Inspection (rendered HTML).
- [ ] Run Lighthouse mobile on the production URL (targets in DESIGN.md quality floor).
