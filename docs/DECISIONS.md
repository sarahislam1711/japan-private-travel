# DECISIONS.md — open decisions and problems found

Each item has a default the build uses until the team decides. "Blocks" says what it holds up.

## Problems in the strategy itself

**D2 — "No resellers" contradicts the primary channel.** The hero ends "Enquiry only. No packages, no resellers." Section 4.1 makes travel advisors — who are resellers — the primary channel, and the site has a For Travel Advisors page with net rates. An advisor reading the homepage during due diligence sees the operator saying it does not work with them.
**Resolved 6 Oct 2026:** Sarah's new Home copy (CONTENT.md §3) drops the line. *Default:* build as LOCKED. *Recommendation:* "Enquiry only. No packages." — or, if the intent was to exclude OTAs and wholesalers, "We do not sell through booking platforms." *Blocks:* launch.

**D3 — The response promise misses the hours when Gulf enquiries arrive.** Contact promises replies "within two hours during Japan business hours". 09:00–18:00 in Tokyo is 04:00–13:00 in Dubai and 03:00–12:00 in Riyadh. Gulf families message in the evening, which is 01:00–05:00 in Tokyo. The strategy's own evidence says latency is the top cause of lost business; as written, the promise excludes most of the Gulf day.
*Default:* `desk.enabled = false`; locked copy renders as written. *Recommendation:* define desk hours in Gulf time (for example 09:00–23:00 Gulf time, staffed from Japan in shifts or with a Gulf-based team member) and rewrite the line to state those hours. *Blocks:* Contact copy lock; DeskStatus.

**D4 — Eid does not fall in July–August for the life of this plan.** §3 says "Gulf school holidays and the two moving Eid windows land here." Eid al-Adha fell in late May in 2026 and falls in mid-May in 2027, moving about eleven days earlier each year; Eid al-Fitr is in March in 2027. Neither returns to high summer for decades. School holidays are right; Eid is not. The LOCKED site copy does not mention Eid, so the site is unaffected — but any sales deck, press pitch or partner conversation that repeats §3 will be wrong, and the product calendar should plan Eid as a spring window.
*Blocks:* nothing on the site.

**D5 — The Summer Journeys copy breaks the brand's own tone rule.** The tone rule is "no superlatives"; the lead page opens "the best months" and later "Japan's finest properties". Family Services uses "the luxury tier". The guard will warn on all three.
*Default:* build as LOCKED; approvals needed to ship. *Recommendation:* "July and August are the months to bring a family to Japan — in the right places." and "Japan's leading properties are quietest" → better still, name the properties once the operator confirms them. *Blocks:* launch (approval or rewrite).

**D6 — Hokuriku is not cool in summer.** The strategy groups Hokuriku with the cool summer regions. Kanazawa and Toyama at sea level are hot and humid in August, much like Tokyo. The honest case is altitude: Tateyama–Kurobe and Kamikochi in the Northern Alps, reached via Hokuriku. The build names the section "Hokuriku and the Japan Alps" and the Season band uses an Alps station, not a Hokuriku city.
*Recommendation:* the operator frames that section around altitude. *Blocks:* Summer Journeys region copy.

## Decisions needed

**D1 — Brand name.** Unnamed. Strategy: direction 1 (heritage-neutral Japanese word) or 3 (coined mark); must render cleanly in Latin, Arabic and Japanese and be searchable as a Latin brand term.
*Default:* `[[BRAND]]`, text-set wordmark. *Blocks:* launch, OG images, domain. Before locking a name, have Claude Code render the wordmark candidate in Newsreader, Shippori Mincho and Markazi Text side by side in the styleguide.

**D7 — Photography cannot be shot in time.** The lead product is July–August in Hokkaido and Okinawa. It is late September 2026; the next summer season is July 2027, well after Phase 1 launch. The design is type-led precisely so the site looks finished without photographs.
*Options:* (a) launch without Summer photography and shoot in July 2027; (b) license existing work from photographers based in Hokkaido and Okinawa — archive licensing is fast and fits the manifest rules; (c) shoot winter Hokkaido now for the tertiary product and Private Japan. *Recommendation:* (b) for Summer plus (c). *Blocks:* nothing technically; affects how the lead page lands.

**D8 — ILTM Cannes is nine weeks away (30 Nov–3 Dec).** Every advisor met there will check the site afterwards. The site can be built by then; launch depends on the compliance items. If the existing Tokyo–Osaka agency already has a qualified manager at each office — it must, to be operating both — then §7.3 may already be met and the remaining launch blockers are D1, D2, D3, the placeholders and the 行政書士's sign-off on the trade-name registration.
*Decision:* is a credential-complete launch before 30 November the target? *Blocks:* scheduling of Prompts 3–9.

**D9 — Advisor portal scope and pricing currency.** *Default in the build:* manually approved advisors download rate sheets (PDF) from private storage; no online booking, no live rates, no admin UI; portal switched off in production until you enable it. Rates quoted in yen, per strategy §8's FX warning.
*Decision:* confirm that scope, and whether rates are in yen with an FX clause or in USD. *Blocks:* Advisors page copy.

**D10 — One Arabic line on Contact.** The strategy defers Arabic pages until evidence justifies them, but the Arabic desk is its main differentiator. One Arabic sentence beside the WhatsApp button signals the desk without starting an Arabic tree. Draft in CONTENT.md; needs native review.
*Decision:* include or not. *Blocks:* Contact copy lock.

**D11 — Privacy notice and terms of business.** Collecting names, contact details and family composition requires an APPI-compliant privacy notice, and GDPR applies to European enquirers. Whether the 旅行業約款 and 取引条件 must appear online for an enquiry-only business is a question for the 行政書士. These are two utility pages outside the nine.
*Blocks:* launch.

**D12 — British English.** The strategy asks for confirmation. *Default:* British English. *Blocks:* copy lock.

**D13 — Accounts and assets Claude Code will ask for.** Domain `[[DOMAIN]]`; Vercel team; Supabase project in Tokyo; Resend with a verified sending domain; Plausible site; Cloudflare Turnstile keys; WhatsApp Business number and whether the desk uses the WhatsApp Business app or the API. *Blocks:* Prompts 5–7 (can be mocked until then).

## Verification owed before launch (from the claims register)

CL-01 (UAE certifier count — the strategy cites ESMA, whose functions moved to the Ministry of Industry and Advanced Technology in 2020) and CL-03 (the 13,000 female drivers figure) have no source in the strategy. Each needs a named source and year, or the sentence changes.
