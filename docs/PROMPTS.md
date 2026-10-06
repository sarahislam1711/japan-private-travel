# PROMPTS.md — the build, in nine steps

Paste one prompt at a time. Each ends at a checkpoint; review the report and the screenshots before pasting the next. If a checkpoint raises a question, answer it in your next message before the next prompt.

---

## Prompt 0 — Read and reflect back (no code)

```
Read CLAUDE.md, then every file in docs/, in this order: DECISIONS.md, DESIGN.md, CONTENT.md, COMPLIANCE.md, PROMPTS.md.

Do not write any code or create any files yet.

Report back:
1. In five sentences: what this site is for, who judges it, and what "done" means.
2. The design concept in your own words, and the one place it spends its boldness.
3. Every placeholder key in CONTENT.md, grouped by who must supply it (legal, operator, photography, team).
4. Anything in the docs that contradicts anything else in the docs. Quote both sides.
5. Anything you would need to invent to complete a step — list it so I can supply it instead.
6. Your questions for me, numbered.

Then stop.
```

---

## Prompt 1 — Scaffold, tokens, guard skeleton

```
Step 1 of the build. Follow CLAUDE.md exactly.

1. Create the Next.js app (App Router, TypeScript strict, pnpm, Tailwind v4, ESLint). Remove all starter content and assets.
2. Create src/styles/tokens.css with every colour, type, spacing and radius token from docs/DESIGN.md §2–4 as @theme variables. Load Newsreader (variable, opsz axis, normal + italic) and Zen Kaku Gothic New (400, 500, preload false) via next/font/google and wire them to --font-serif and --font-gothic.
3. Create /content with typed modules and zod schemas: site.ts, placeholders.ts, routes.ts, claims.ts, photography.manifest.ts, approvals.ts (empty, with a header comment saying Claude Code must never write entries), and one module per page. Transcribe every string from docs/CONTENT.md exactly, with status "locked" or "draft" as marked. Represent [[KEY]] values as references to placeholders.ts, not as literal strings scattered through modules.
4. Create scripts/guard with the source-scan layer implementing C2, C3, C3a, C4, C5, C7 (source side), C8, C10 (source side). Stub the render-crawl layer with a TODO that Prompt 8 completes. Add pnpm scripts: guard, guard:prod, and make build run guard:prod first.
5. Add a stylelint or ESLint rule, or a guard rule, that enforces C8 on class names and CSS.
6. Add Playwright with a shots script that captures every route in content/routes.ts at 390, 834 and 1440 widths.
7. Create empty route files for all nine pages plus /privacy, /terms and not-found, each rendering only its title from content.

Acceptance:
- pnpm dev runs; every route returns 200 and shows its title.
- pnpm guard runs and reports the expected placeholder, draft and superlative findings (list them).
- pnpm build fails on guard:prod — say which rules failed. That failure is correct at this stage.

Checkpoint: report in the CLAUDE.md format, then stop.
```

---

## Prompt 2 — Design system and styleguide

```
Step 2. Build the components in docs/DESIGN.md §6, and a dev-only /styleguide route (excluded from production build and from routes.ts) that shows each one.

Build in this order and check each in the styleguide before the next: typography scale (render every token with real copy from content, not lorem ipsum), SiteHeader + Wordmark, SiteFooter + ComplianceBlock, MarginNote with the grid behaviour at all three breakpoints, VerticalName, Plate (empty state and a manifest-backed state using a local test image that is flagged testOnly and fails C6 in production), FactList, WhatsAppLink, DeskStatus (with a test clock so both open and closed states show), EnquiryForm (visual states: empty, error, submitting, sent — no backend yet), SeasonBand (with obviously fake test data clearly labelled TEST, never shown outside the styleguide), ExperienceEntry, EntryPoint, Placeholder, Draft.

Rules to hold:
- Logical properties only. Test by temporarily setting dir="rtl" on the styleguide root and screenshotting: the layout must mirror without breaking. Report what you saw, then remove the dir attribute.
- No shadows, no radius beyond DESIGN.md, no icons, no arrows, no all-caps, no eyebrow labels.
- Focus visible on every interactive element; test by tabbing through the styleguide.
- Before building, write a short design self-review into your report: which parts of what you are about to build are at risk of looking like a generic template, and what you will do about it.

Run pnpm shots on /styleguide. Look at every screenshot. In the checkpoint, list anything that looks wrong or generic to you, even if you did not fix it.

Checkpoint, then stop.
```

---

## Prompt 3 — Home and Summer Journeys

```
Step 3. Build / and /summer-journeys to the wireframes in docs/DESIGN.md §7, using only components from Step 2 and copy from /content.

Home:
- The hero fits one 1440×900 viewport with the top of the entry points visible beneath it. Verify with a screenshot at exactly 1440×900.
- Implement the single load sequence from DESIGN.md §5. Confirm it is fully disabled under prefers-reduced-motion (emulate in Playwright and screenshot).
- Hero margin carries the registration line and the verification link.

Summer Journeys:
- This is the lead page. Give it the most care.
- SeasonBand renders its placeholder state until CL-05 has data. Do not supply temperatures.
- Region sections render the operator brief slots as Placeholders with their keys visible in dev.
- VerticalName in the margin beside each region, aria-hidden.

Screenshot both pages at all widths, and Home at 1440×900. Compare against the wireframes and describe every deviation.

Checkpoint, then stop.
```

---

## Prompt 4 — Private Japan, Family Services, Experiences

```
Step 4. Build /private-japan, /family-services and /experiences per DESIGN.md §7.

- Family Services has no Plates. Each section's margin note links to its claim in the About sources list. The Japanese term 貸切風呂 carries lang="ja".
- Experiences renders the list from content; with zero real entries it shows two Placeholder entries in dev so the layout can be judged. The ExperienceEntry margin is a definition list.
- Private Japan: Transport margin note references [[TRANSPORT_OPERATOR]].

Run pnpm guard and report every C3, C3a and C4 finding on these pages verbatim — do not change copy to clear them.

Screenshots, checkpoint, stop.
```

---

## Prompt 5 — About, Contact, enquiries backend, utility pages

```
Step 5.

About: Who we are, Credentials (FactList), Sources (claims register as a numbered list with anchor IDs that margin notes link to).

Contact: LOCKED copy, routes as a FactList, WhatsAppLink + DeskStatus, the Arabic line (lang="ar" dir="rtl", Draft-marked), and EnquiryForm.

Backend:
1. supabase/migrations: enquiries table (id uuid pk, created_at, name, reply_channel enum whatsapp|email|phone, phone, email, household, dates, purpose, reply_language enum ar|en|ja, source_path, utm jsonb, status enum new|replied|closed default new). RLS enabled, no anon or authenticated policies — inserts happen only via the service role in a server action.
2. Server action in the contact route: zod validation (conditional requirement of phone or email by reply_channel), Turnstile verification server-side, insert, then a Resend email to [[DESK_EMAIL]] with every field in plain text and the reply language in the subject line.
3. Rate limit the action (per IP, 5 per hour) without adding a new service if possible; say how you did it.
4. .env.example with every variable and a one-line comment each. No secrets committed.
5. Errors: field errors inline in plain words; a failed send shows "Your enquiry did not send. Message us on WhatsApp instead, or try again." (DRAFT) with the WhatsApp link.

Utility: /privacy and /terms render their placeholders; not-found renders the 404 copy and navigation, with the footer.

Tests: Playwright e2e for the form (valid submit with Supabase and Resend mocked, each validation error, the failure state). Screenshots. Checkpoint, stop.
```

---

## Prompt 6 — For Travel Advisors and the rate portal

```
Step 6. Build behind a feature flag ADVISOR_PORTAL_ENABLED (default false in production until I say otherwise).

Public page /for-travel-advisors: DRAFT copy from content, credentials summary linking to About, request-access form.

Backend:
1. advisor_requests table (the form fields + status pending|approved|declined). Insert via server action with zod + Turnstile, Resend notification to [[DESK_EMAIL]].
2. advisors table (id = auth.users.id, agency, country, consortium, approved boolean default false, approved_at). RLS: an authenticated user may select only their own row; nobody but the service role may update approved.
3. Private storage bucket "rates". Storage policy: no direct access; files are served only through a server route that checks advisors.approved and returns a signed URL valid for 10 minutes.
4. rate_downloads table logging advisor id, file path, timestamp.
5. /advisors/portal: Supabase Auth magic-link sign-in; middleware redirects unauthenticated users to sign-in and signed-in-but-unapproved users to a "Your access is being verified" page (DRAFT copy). Approved advisors see a plain list of rate sheets (file name, updated date, download). noindex, nofollow; excluded from sitemap.
6. No admin UI. Write docs/ADVISOR-OPS.md explaining, step by step, how the desk approves an advisor and uploads a rate sheet in the Supabase dashboard.

Tests: e2e for unauthenticated redirect, unapproved state, approved download (auth mocked), and that a direct storage URL without a signed token fails. Checkpoint, stop.
```

---

## Prompt 7 — Metadata, structured data, analytics

```
Step 7.

1. Per-page title and meta description: write one DRAFT pair per page into content (title under 60 characters, description under 155, no superlatives, no pricing). List them all in the checkpoint for approval.
2. Open Graph: one generated OG image per page using next/og, set in Newsreader on --paper with the page title and the wordmark. No photographs in OG images until licensed images exist.
3. JSON-LD on every page: Organization; on About additionally TravelAgency with legalName, address (both offices), telephone, email, identifier as PropertyValue for the registration number, and memberOf for each association. Emit a block only when its placeholder values are real — never emit placeholder text into structured data.
4. sitemap.xml and robots.txt from content/routes.ts; portal excluded.
5. Plausible with these custom events only: whatsapp_click (with page), enquiry_sent, advisor_request_sent, credentials_view (About, fired when the FactList enters the viewport), sources_open. No other tracking.
6. Canonical URLs using [[DOMAIN]]; hreflang not added yet (English only).

Validate JSON-LD with a schema check in tests. Checkpoint, stop.
```

---

## Prompt 8 — Quality, guard completion, launch report

```
Step 8. Finish and prove.

1. Complete the guard's render-crawl layer: C1, C3–C7 and C9–C12 against rendered HTML of every route.
2. Accessibility: axe on every route at all three widths — zero violations. Keyboard-only walkthrough of Home → Contact → submit enquiry, recorded as a Playwright trace. Skip link present.
3. Performance: Lighthouse CI with the budgets in DESIGN.md §9 on mobile emulation for every public route. Fix what fails; report what you changed.
4. RTL smoke test: render every public route with dir="rtl" forced on <html> in a test-only mode, screenshot, and list anything that breaks. Do not ship the mode.
5. Visual review: pnpm shots of everything. Look at every screenshot and write a short, honest critique of the site as a designer would: the three weakest moments and what you would do about each. Do not make those changes; propose them.
6. Write docs/LAUNCH-REPORT.md with:
   a. Guard output in production mode — every remaining failure, grouped by who must resolve it.
   b. The human checklist the guard cannot verify, from strategy §7 items 1, 3, 4, 7: registration type confirmed, two travel services managers in post, bond obligation modelled, transport contract signed — each as an unchecked box with the owner.
   c. Every placeholder key still unresolved.
   d. Every DRAFT string still awaiting approval, quoted.

Checkpoint, stop. Do not deploy.
```

---

## Prompt 9 — Content lock and deploy (run only when LAUNCH-REPORT is clear)

```
Step 9. I have updated docs/CONTENT.md and content/approvals.ts. 

1. Sync /content to docs/CONTENT.md exactly. Show me the diff of /content before committing.
2. Run pnpm guard:prod. If anything fails, stop and report — do not proceed.
3. Run the full test suite and Lighthouse CI.
4. Deploy a preview to Vercel. Screenshot the preview deployment (not localhost) at all widths, and check the footer registration line renders correctly in Japanese on the live preview.
5. Report the preview URL and wait for my approval before promoting to production.
```
