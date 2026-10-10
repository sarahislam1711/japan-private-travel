# Launch checklist

Everything that must be done before HalaJapan goes live, in order. Tick items as they are done; nothing here is optional unless marked.

Started 9 Oct 2026. Keep this file current: add anything new that blocks launch.

## 1. Facts still to supply

These show as `[[KEY]]` gaps on the site, and production builds are blocked until they are filled (`content/placeholders.ts`). `pnpm guard` lists every one.

- [ ] Japanese company name, as on the registration certificate (`ENTITY_NAME_JA`, e.g. 株式会社…)
- [ ] Public email address (`EMAIL`)
- [ ] WhatsApp number, display and international form (`WHATSAPP_DISPLAY`, `WHATSAPP_E164`)
- [ ] Which licensed manager is at which office (Mariko Kajiwara, Takashi Mino)
- [ ] How long enquiry details are kept (`RETENTION_PERIOD`, privacy notice)
- [ ] Production domain (`DOMAIN`)
- [ ] Hokkaido margin facts: confirm they are real (they were supplied as "Example")
- [ ] Any other placeholders `pnpm guard` reports (C7)

## 2. Copy approvals

Production builds fail while any copy is DRAFT (`pnpm guard:prod`). Review with `pnpm dev:drafts`, which shows the DRAFT tags.

- [ ] Approve every DRAFT string in `docs/CONTENT.md` (page titles and descriptions, planner labels, FAQ heading, Contact heading, CTA heading, Summer Journeys and Private Japan drafts, legal pages, registration corrections)
- [ ] Native Arabic review of every Arabic string (`docs/CONTENT.ar.md`), then mark them approved
- [ ] Superlative approvals (C4), which only Sarah adds in `content/approvals.ts`: "best months" (title), "Best weeks" (region labels), "What are the best months…" (FAQ), "finest" if still used
- [ ] Approve the guard fix for "WhatsApp" being read as pricing language (C3: `pp\b` to `\bpp\b`)
- [ ] Attach a checked source for each claim in `content/claims.ts` (C5): CL-01 to CL-04, CL-06, CL-07 (CL-05 temperatures sourced from JMA, 10 Oct 2026)
- [ ] Choose the Japan Alps weather station (D6) for the season chart. JMA has no temperature normals for Kamikochi; options: Hakuba (Northern Alps, ~700 m, mildly cool), Karuizawa (~1,000 m, cool, not in the Alps), or no Alps line

## 3. Legal review (行政書士)

- [ ] Registration wording everywhere: Travel World Co., Ltd. as a travel agency agent (東京都知事登録旅行業者代理業 第11300号) of Air World Co., Ltd. (観光庁長官登録旅行業第961号, JATA member)
- [ ] Confirm Air World operates the private inbound family trips this site sells
- [ ] Privacy notice (APPI, and GDPR for European enquirers)
- [ ] Terms of business, and that Air World's written conditions of travel (取引条件説明書面) are given before each booking
- [ ] If supplier packages (e.g. KN Tours) are ever sold, confirm they can be, and through whom

## 4. Pages still to finish

- [ ] Experiences: the page is built (9 Oct 2026) with **12 SAMPLE entries** (real public places, hosts by role, no named people). Replace or confirm each with real details: host, place, season, length, group size, booking lead time
- [ ] Family Packages: page built 10 Oct 2026 (drafts). Confirm the four starting routes and day ranges, and that every extra listed is really offered (female guides, Arabic-speaking guides, child seats, cots and high chairs, connecting rooms, step-free routes, private transport, private bathing, halal dining, prayer time and space, earlier dinners, a midday rest); approve the copy
- [ ] Muslim-focus wording left elsewhere: Home How we work step 3 and the FAQ halal answer
- [ ] For travel advisors: page built 10 Oct 2026 (drafts). Confirm the commission model (discount off published rates, or net rates), whether to state a response time, and the network list; approve the copy
- [ ] Advisor sign-in and rate portal: not built; the page has no sign-in link until it exists
- [ ] Advisor rate portal (planned, gated, noindex)
- [ ] Final photographs (currently stand-ins) and their alt text where they carry meaning
- [ ] Experiences photos: one per card (slots `exp-*` in `content/photography.slots.ts`); all 12 set (9 from Sarah; snow monkeys, autumn leaves and tea ceremony use stand-ins: replace with matching photos if possible)
- [ ] About portraits: Fathy Mohamed Mohamed Ismail Ahmed (4:5), Mariko Kajiwara and Takashi Mino (square). Add to `public/photos`, log in the photo manifest and set the `about-*` slots; initials show until then

## 5. Hosting and backend

- [ ] Vercel project connected to the GitHub repo; function region `hnd1` (Tokyo)
- [ ] Domain connected; apex canonical, www redirects (already coded)
- [ ] Supabase project in Tokyo (`ap-northeast-1`); run `supabase/migrations/0001_enquiries.sql`, `0002_advisor_requests.sql` and `0003_enquiries_email_picks.sql` (itinerary email and My trip picks); confirm row level security is on
- [ ] Vercel environment variables:
  - [ ] `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `ADMIN_PASSWORD` (new and strong; never the local one) and `ADMIN_SECRET` (a long random string)
  - [ ] `DOMAIN` filled in `content/placeholders.ts`, so production builds are indexable
- [ ] Send a test plan from the live Contact page and a test request from the advisors page; see them in `/admin/plans` and `/admin/advisors`; then delete them
- [ ] Optional, decided against for now: email alert per new plan (Resend), Cloudflare Turnstile on the planner

## 6. Analytics

- [ ] Plausible account and site; add the Plausible script (cookieless, no banner needed); exclude `/admin`

## 7. Search engines and AI (after the domain is live)

- [ ] `https://<domain>/robots.txt` opens to search engines and AI crawlers (it is closed on every non-production build, by design)
- [ ] Google Search Console: verify the domain property; submit `https://<domain>/sitemap.xml`
- [ ] Bing Webmaster Tools: import from Search Console (Bing also feeds ChatGPT search)
- [ ] Google Rich Results Test and validator.schema.org on one page of each type: Home, Summer Journeys, Private Japan, Family Packages, About, For travel advisors, Contact, a legal page, and an Arabic page
- [ ] Open `/llms.txt` and `/llms-full.txt` on the live domain and read them: only approved copy appears in production
- [ ] Share cards: paste the Home, Summer Journeys and About links into WhatsApp, LinkedIn and Slack; check the image, title and description in both languages
- [ ] Google Business Profile for the Tokyo and Osaka offices
- [ ] Brand profiles (Instagram, LinkedIn, Google Business Profile): add their URLs to the agency's `sameAs` in `src/components/StructuredData.tsx`
- [ ] Ask an AI assistant (ChatGPT, Claude, Perplexity) about a page URL and check the summary is accurate
- [ ] After about 28 days: Core Web Vitals in Search Console are "Good"

## 8. Performance and accessibility (re-check on the live site)

- [ ] Lighthouse on the live domain, mobile: 90+ in all four categories on the English pages (measured 91–94 on a production build, 9 Oct 2026; SEO reaches 100 once indexing is open)
- [ ] Arabic pages measured 78–83 for performance because of the Arabic font files; optional improvement: subset Noto Kufi Arabic and Markazi Text to the characters used (needs fonttools)
- [ ] `pnpm test:a11y` passes (40/40 on 9 Oct 2026)
- [ ] Keyboard-only pass through the header, menus, planner and FAQ; VoiceOver pass in English and Arabic

## 9. Final gate

- [ ] `pnpm build` passes (it runs `pnpm lastmod` and `pnpm guard:prod` first)
- [ ] `pnpm shots` reviewed at 390, 834 and 1440
- [ ] Everything above ticked
