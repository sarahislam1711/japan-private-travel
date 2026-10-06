# HalaJapan: project guide

Oct 4, 2026 · @Sarah Islam

You are branding, designing and building the full website for HalaJapan, a registered Japanese travel agency that plans private trips for families who travel as one household. This guide is everything you need before you build, in the order you need it.

## 1. The client and the business

The client runs a registered Japanese travel agency with offices in Tokyo and Osaka. HalaJapan is the brand it will trade under.

- **What it sells:** private, made-to-order trips to Japan for families who travel as one unit: three generations, children of different ages, household staff, one itinerary. No packages, no published prices.
- **Who buys:** mainly Gulf Muslim families, plus some from southern Europe.
- **What sets it apart:** a team that works in Arabic, English and Japanese with no interpreter in the middle, and honest handling of Muslim needs: halal dining explained properly, private bathing, prayer built into the day, female guides on request.
- **Lead product:** July and August in Hokkaido, Okinawa and the Japan Alps, cool or coastal while Tokyo is hot. Summer is exactly when Gulf school holidays fall.
- **How clients arrive:** mostly through travel advisors and family offices who book for wealthy families, not through Google.

## 2. The site's one job

The site must pass a quiet background check. An advisor meets the agency, likely at ILTM Cannes (30 November to 3 December), then checks the site alone before recommending HalaJapan to a family. If anything looks vague or exaggerated, the agency is dropped and nobody says why.

| The reader wants | So the site |
|---|---|
| Proof of registration | Shows the registration line in the footer of every page, in the official Japanese form |
| To know who is responsible | Names both legally required managers on every page |
| Claims they can check | Gives every fact a source |
| Calm, not hype | Bans words like "best", "luxury" and "exclusive" |
| An easy way to talk | Offers WhatsApp, phone, email and a short enquiry form |

It is not an SEO play, a sales funnel or a volume machine. Success: an advisor spends five minutes on the site and concludes this is a real, legal, careful operator.

## 3. Your scope and who does what

Your scope is the full project: brand, design, copy, frontend and backend. The kit only covered the build.

| Who | Does |
|---|---|
| You | Every decision and approval; brand identity and wordmark; design (with your designer); copy for DRAFT and missing sections; the full build through Claude Code; reviewing every checkpoint; chasing missing facts; accounts and domain; launch timing; deployment |
| The operator (the agency's team in Japan) | Real-world facts: region details, 8 to 12 experiences with named people, transport company, managers' names |
| The 行政書士 (administrative lawyer) | Legal wording, trading-name registration, privacy notice, terms, final sign-off |
| Photographers | Licensed photos, later; the site launches without them |
| Claude Code | Writes the code under the kit's rules, stops at each checkpoint |

Two limits stay in place even with your wider scope: no fact is ever invented, and every copy change goes through `docs/CONTENT.md` and your approval.

## 4. The brand: HalaJapan

The name is chosen. "Hala" (<span lang="ar" dir="rtl">هلا</span>) is the Gulf Arabic word of welcome, so the name greets the core audience in their own language before they read a word of copy.

How it appears on the site:

- **Legally**, as a trading name of the registered company: "HalaJapan is a trading name of [[ENTITY_NAME_EN]]." The 行政書士 registers it as a secondary trade name.
- **As a wordmark**, set in Newsreader until you design a drawn mark, with Arabic and Japanese versions planned.

Checks before it locks:

| Check | Why |
|---|---|
| Final written form | HalaJapan, Halajapan or Hala Japan; plus the Arabic form (<span lang="ar" dir="rtl">هلا جابان</span> or <span lang="ar" dir="rtl">هلا اليابان</span>) and the Japanese form (ハラジャパン) |
| Domain | .com and .jp availability |
| Trademark | Japan (J-PlatPat), UAE and Saudi registers, for travel services |
| Japanese native check | ハラ is also slang shorthand for harassment (セクハラ, パワハラ); confirm how ハラジャパン reads |
| Halal confusion | The site deliberately avoids loose halal claims; confirm readers do not take the name as "Halal Japan" |
| Fit with the kit | The kit's naming rule was a Japanese word or a coined word; you confirm the change and DECISIONS.md D1 is updated |
| Font test | Render the name in Newsreader, Shippori Mincho and Markazi Text side by side |

Once the checks pass, you replace `[[BRAND]]` with the final form in `docs/CONTENT.md`, approve it, and Claude Code syncs it.

## 5. The pages and how they connect

Visitors enter at Home, explore the offer, verify on About, and act through Contact or advisor access. Every page ends with one next step.

| Page | Its job | Still missing | Leads to |
|---|---|---|---|
| Home | First impression; two routes in | Registration line, contact details | Summer Journeys, Private Japan, Contact |
| Summer Journeys | The lead product; most care | Region facts, temperature data | Contact |
| Private Japan | The year-round offer | Transport company name | Family Services, Contact |
| Family Services ("For Muslim families") | The strongest differentiator; no photos | Sources for 5 claims, 2 with none yet | About, Contact |
| Experiences | Proof of real access | All 8 to 12 entries | Contact |
| About | Credentials; checked hardest | Nearly every credential value | Contact, For travel advisors |
| For travel advisors | The main sales channel | Rates currency decision; copy is DRAFT | About, Advisor portal |
| Contact | Enquiries | Contact details; desk-hours fix | Confirmation |

Also: Privacy and Terms (written by the lawyer), a 404 page, and the advisor portal (email sign-in, then rate sheet downloads; hidden from Google and switched off until you enable it).

Every page carries the same footer: trading-name line, legal company name in English and Japanese, address, registration line in Japanese, and both managers' names. The kit says nine pages but defines eight; decide which is missing.

## 6. The design essentials

The main column makes the claim; the margin beside it proves it. That is the one bold idea, and everything else stays quiet. The full detail for your designer is in *Designer brief: Japan private travel website*.

- **Feeling:** calm, exact, quietly premium, cool like northern Japan in summer. Never flashy luxury or Japan clichés.
- **Colour:** paper background, ink text, one accent (pine green, #2C5F53). One light theme.
- **Type:** Newsreader for headings and reading text; Zen Kaku Gothic New for margin notes, labels, footer and all Japanese.
- **Layout:** 12-column grid, everything start-aligned. On mobile, margin notes drop under their paragraph.
- **Motion:** one moment only, the Home hero fading in.
- **Photos:** none at launch; the site must look finished without them.
- **Banned:** icons, arrows, cards, shadows, gradients, all-caps, centred layouts, stock or AI images.
- **Arabic-ready:** layouts use start and end, never left and right, so they mirror cleanly later.
- **Quality floor:** WCAG 2.2 AA; Lighthouse mobile 95 for performance and 100 for the rest; under 2 seconds to load on 4G.

## 7. The rules and the compliance guard

The copy carries legal risk under Japan's Travel Agency Act, so the build runs under strict rules and a script that checks them.

**Build rules**

1. All text lives in `/content`, mirroring `docs/CONTENT.md`. You write copy there; Claude Code never edits it.
2. No invented facts. Unknown values stay as placeholders like `[[REG_NUMBER]]`.
3. No stock or AI images; only licensed photos logged with photographer, licence, place and month.
4. Never hard-code left or right in CSS: `ms-`, `me-`, `text-start`, not `ml-`, `mr-`, `text-left`.
5. British English in code comments and commits.
6. Stop at every checkpoint; check screenshots, not just code.
7. No new package without a stated reason.

The guard blocks any production build that breaks these:

| Rule | Checks |
|---|---|
| C1, C2 | Full legal footer on every page; the brand reads as a trading name of the registered company |
| C3, C3a, C4 | No banned claims ("licensed by", "exclusive access", prices); halal wording and superlatives need your approval |
| C5, C6 | Every claim has a recent source; every photo a valid licence |
| C7 | No placeholders or DRAFT text in production |
| C8, C11 | No hard-coded left or right; Japanese and Arabic text correctly marked |
| C9, C10, C12 | Exact page set, portal hidden, no outside scripts, contact details consistent |

A failing production build is expected for most of the project: it is the guard listing what is still missing. Never weaken a rule; fix the cause or make the call yourself.

## 8. How you build it

Setup is done. The repo is at `~/PROJECTS/Clients/japan-private-travel`, committed on main, with no other copies on the laptop. You build by pasting the prompts in `docs/PROMPTS.md` into Claude Code in VS Code, one at a time.

**Stack:** Next.js (App Router, TypeScript strict), Tailwind v4, Supabase in Tokyo, Resend, Cloudflare Turnstile, Plausible, Vercel (Tokyo region), Playwright, pnpm.

| Step | What gets built | What you check |
|---|---|---|
| 0 | Nothing: Claude Code reads the docs and reports | Its findings match this guide |
| 1 | App scaffold, design tokens, content files, guard skeleton | Every route loads; production build fails, as expected |
| 2 | All components on a dev-only styleguide | Screenshots, mirrored layout test, keyboard focus |
| 3 | Home and Summer Journeys | Hero fits 1440×900; animation off for reduced motion |
| 4 | Private Japan, Family Services, Experiences | Guard findings listed, copy untouched |
| 5 | About, Contact, enquiry backend, utility pages | Form tests pass; database locked down |
| 6 | For travel advisors and the rate portal | Portal switched off; sign-in tests pass |
| 7 | Page titles, share images, structured data, sitemap, analytics | Titles and descriptions approved by you |
| 8 | Full guard, accessibility, performance, launch report | Zero accessibility issues; Lighthouse targets met |
| 9 | Final copy sync and a preview deploy | Only after you clear the launch report; you approve going live |

**Routine for each step**

1. Type `/clear`, then paste the step's prompt with any answers from the last checkpoint at the top.
2. Review each change in VS Code's diff view, especially in `/content` and `scripts/guard`.
3. Run `pnpm dev` in a second terminal tab and open the site.
4. Open the screenshots in `tests/shots/` and compare all three widths.
5. Ask Claude Code to save its report to `docs/checkpoints/prompt-N.md`, then commit.
6. Answer the report's questions before the next step.

Before steps 5 and 6, which touch the database and sign-in, ask Claude Code for a plan first and approve it before any code.

## 9. Open decisions and what you need from whom

The build can run on placeholders through step 4. Launch needs everything below resolved.

**Decisions to make**

| Decision | Problem | Recommendation | Blocks |
|---|---|---|---|
| Brand (D1) | Chosen: HalaJapan | Run the checks in section 4 | Launch, domain, share images |
| "No resellers" (D2) | The hero says it, yet advisors are the main channel | "Enquiry only. No packages." | Launch |
| Desk hours (D3) | "Two hours during Japan business hours" misses the Gulf evening | State hours in Gulf time | Contact copy |
| Superlatives (D5) | "Best", "finest", "luxury" break the brand's own tone rule | Approve or rewrite | Launch |
| Hokuriku (D6) | It is hot in summer at sea level | Frame the section around altitude | Summer copy |
| Photos (D7) | Summer cannot be shot before July 2027 | License archive work now | Nothing technical |
| Cannes (D8) | 30 November to 3 December | Decide if launch before then is the target | Schedule |
| Portal and currency (D9) | Scope and yen or USD | Confirm | Advisors copy |
| Arabic line (D10) | One Arabic sentence on Contact | Include, after native review | Contact copy |
| Privacy and terms (D11) | Required by law | Lawyer supplies | Launch |
| Accounts (D13) | Domain, Vercel, Supabase, Resend, Plausible, Turnstile, WhatsApp Business | Provide before step 5 | Steps 5 to 7 |
| Ninth page | The kit says nine pages, defines eight | Confirm | Route list |
| Strategy document | Cited throughout, not supplied | Send it | Copy and naming context |

**Inputs by owner**

| Owner | Supplies |
|---|---|
| Lawyer | Registration line in the official form, entity names in English and Japanese, both addresses, trading-name sign-off, privacy notice, terms |
| Operator | Region facts, 8 to 12 experiences, transport company, both managers' names and grades, insurer, language staff, founder's start year |
| Sources | Links for claims CL-01 to CL-07; CL-01 (UAE halal certifiers) and CL-03 (13,000 female drivers) have no source at all |
| Photographers | Licensed images with place and month |
| You | The decisions above, approvals of every DRAFT string, WhatsApp, phone, email |

## 10. Next actions

- [ ] Make the decisions in section 9, settle the ninth page, and obtain the strategy document
- [ ] Run the brand checks in section 4 and confirm the final written form of HalaJapan
- [ ] Send the designer brief to your designer, with HalaJapan in place of `[[BRAND]]`
- [ ] Run step 0 in Claude Code and save its report to `docs/checkpoints/prompt-0.md`
- [ ] Start step 1 once the decisions are made, or on placeholders if they are not
