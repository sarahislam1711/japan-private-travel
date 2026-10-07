# CONTENT.md — the single source of copy

Status markers:
- **LOCKED** — taken verbatim from the strategy v2 §6. Claude Code reproduces exactly. The team may change it here; Claude Code may not.
- **LOCKED ⚑Dn** — locked, but flagged by an open decision in DECISIONS.md. Build as written; expect a change.
- **DRAFT** — written for this package. Renders with a DRAFT marker in dev; blocks production until the team changes the marker to LOCKED.
- `[[KEY]]` — a fact only the team or the operator can supply. Defined in `content/placeholders.ts`. Blocks production.
- `{CL-nn}` — a claim that must have a source in the claims register (§12) before production.

---

## 1. Site-wide (`content/site.ts`)

| Key | Value | Status |
|---|---|---|
| `brand.name` | `HalaJapan` | ⚑D1 |
| `entity.nameEn` | `[[ENTITY_NAME_EN]]` | |
| `entity.nameJa` | `[[ENTITY_NAME_JA]]` | |
| `entity.address` | `[[ENTITY_ADDRESS]]` (Tokyo) and `[[OSAKA_ADDRESS]]` | |
| `registration.lineJa` | `[[REG_AUTHORITY_JA]]登録旅行業 第[[REG_NUMBER]]号` — the prescribed form, e.g. 東京都知事登録旅行業第3-0000号 or 観光庁長官登録旅行業第0000号. Exact form to be confirmed by the 行政書士. | |
| `registration.lineEn` | `[[REG_AUTHORITY_EN]] Registered Travel Agency No. [[REG_NUMBER]]` | DRAFT |
| `tradeNameLine` | `HalaJapan is a trading name of [[ENTITY_NAME_EN]].` | DRAFT (COMPLIANCE C2) |
| `memberships` | `Member, [[ASSOCIATION]]` — one line per membership, never "licensed", "accredited" or "certified by". | LOCKED rule |
| `whatsapp` | `[[WHATSAPP_E164]]` | |
| `phone` | `[[PHONE]]` | |
| `email` | `[[EMAIL]]` | |
| `desk.enabled` | `false` until the desk is staffed | ⚑D3 |
| `desk.zone` / `desk.hours` | `[[DESK_ZONE]]` / `[[DESK_HOURS]]` | ⚑D3 |
| `whatsapp.prefill` | "Hello, I would like to plan a trip to Japan for my family." | DRAFT |

## 1a. Interface strings (`content/interface.ts`)

Drafted 6 Oct 2026 for approval. Most come from DESIGN.md, where they were specified but never listed here.

| Key | Value | Status |
|---|---|---|
| `skipLink` | Skip to content | DRAFT |
| `menu` | Menu | DRAFT |
| `sourceLink` | Source | DRAFT |
| `whatsappButton` | Message us on WhatsApp | LOCKED (Sarah, 6 Oct 2026) |
| `footer.privacy` | Privacy | DRAFT |
| `footer.terms` | Terms of business | DRAFT |
| `footer.legal` | Legal | DRAFT (footer column heading) |
| `languageMenu.label` | Language (accessible name of the globe button; Arabic: اللغة) | DRAFT |
| `languageNames` | English · Arabic (in English on both sites, each beside a flag: United States, Saudi Arabia) | LOCKED (Sarah, 7 Oct 2026) |
| `seasonBandPending` | Temperatures to be added from the cited source. | DRAFT (placeholder text for the season band until CL-05 is sourced) |

## 1b. Page titles and meta descriptions (`content/meta.ts`)

Drafted 7 Oct 2026 for approval, for search intent in each language; Arabic in `content/meta.ts` and `docs/CONTENT.ar.md`. Titles render as "Title — HalaJapan" (under 60 characters); descriptions under 160.

| Page | Title | Description | Status |
|---|---|---|---|
| home | Private family trips to Japan | A registered Japanese travel agency in Tokyo and Osaka, planning private trips for families who travel together, in Arabic, English or Japanese. | DRAFT |
| summerJourneys | Summer in Japan: Hokkaido, Okinawa and the Alps | Summer in Japan for families: Hokkaido and the Japan Alps stay cool and Okinawa is by the sea. Private trips planned for July and August. | DRAFT |
| privateJapan | Private Japan trips in spring, autumn and winter | Private trips across Japan outside summer, planned for the whole family: connecting rooms, days paced for every age, transport that keeps you together. | DRAFT |
| familyServices | Japan for Muslim families: halal and prayer | Halal certification explained honestly, private bathing confirmed room by room, prayer built into the day, and guides who work in Arabic. | DRAFT |
| experiences | Experiences in Japan, arranged with named people | Each experience is arranged with a named person, in a stated season, with a stated lead time. | DRAFT |
| about | About us: a registered travel agency in Japan | A registered Japanese travel agency working from Tokyo and Osaka. Our registration and travel services managers are named on every page. | DRAFT |
| forTravelAdvisors | For travel advisors: private Japan for families | A registered Japanese agency for clients who travel as a household. You hold the client relationship; we plan and operate the trip in Japan. | DRAFT |
| contact | Plan a private family trip to Japan | Tell us who is travelling and when. Message us on WhatsApp, email or call, and we will reply in your language. | DRAFT |
| privacy | Privacy notice | How HalaJapan uses the details you send us. | DRAFT |
| terms | Terms of business | Terms of business for trips arranged by HalaJapan. | DRAFT |

## 2. Navigation (`content/navigation.ts`)

Page names: Summer Journeys · Private Japan · Family Services · Experiences · About · Contact — and "For travel advisors". Status: LOCKED (page names from strategy §5).

Header structure (set by Sarah, 6 Oct 2026):

```
HalaJapan        Trips   Family Services   Experiences   About   | Advisors   [ Contact ]
                 ├ Summer Journeys
                 └ Private Japan
```

- Group label: Trips. Status: LOCKED (Sarah, 6 Oct 2026).
- Contact sits last, set as a boxed link.
- Trips dropdown descriptions — DRAFT (the earlier Home entry-point lines, kept for the menu):
  - Summer Journeys: "Hokkaido, Okinawa and the Japan Alps in July and August."
  - Private Japan: "Year-round journeys for families and small groups who travel together."
- Short header label for the For travel advisors page: Advisors. Status: LOCKED (Sarah, 6 Oct 2026). Set smaller and quieter, before Contact, after a thin divider. The footer keeps the full name.

## 3. Home (`/`)

All Home copy below is **LOCKED** — written and approved by Sarah, 6 Oct 2026. It replaces the strategy's hero and resolves D2 (the "no resellers" line is gone).

**Hero**

> **Japan, planned for the whole household.**
>
> We plan private trips to Japan for families who travel together, from grandparents to young children. Every trip starts with a conversation and is planned from scratch for your family, in Arabic, English or Japanese.

**Margin** (set as a seal at the foot of the hero's pine panel, Sarah 6 Oct 2026)

> We are a registered travel agency with offices in Tokyo and Osaka.
> `registration.lineJa`
> You can check our registration with [[REG_AUTHORITY_EN]].

**Two ways in**

> **Summer Journeys**
> In July and August, Tokyo is hot and crowded. Hokkaido and the Japan Alps stay cool, and Okinawa is by the sea. These are the places we plan for families in summer.
>
> **Private Japan**
> We also plan private trips across Japan in every other season, with rooms that connect, days paced for every age, and transport that keeps everyone together.

**How we work**

> **How we work**
>
> **We confirm before you commit.** We check every room one by one, not just the room type, and we tell you exactly what is confirmed before you agree to anything. *Link:* Private Japan
>
> **You know who is looking after you.** We tell you your guide's name before you travel, and the managers responsible for our agency are named at the bottom of every page. *Link:* About
>
> **Your family's needs are planned in from the start.** Dining, private bathing, prayer times, guiding and transport for Muslim families are part of the first plan we send you, not extras added at the end. *Link:* Family Services

Each point links to its page under the page's name (internal linking).

**Contact**

> **Tell us who is travelling and when you would like to go.**
> We will reply in your language.
> [Message us on WhatsApp] · Email [[EMAIL]] · Telephone [[PHONE]]

## 4. Summer Journeys (`/summer-journeys`)

**Title and lede — LOCKED ⚑D5** (Sarah chose to keep "best" and "finest", 6 Oct 2026; the C4 approval entries are hers to add in `content/approvals.ts`)

> **July and August are the best months to bring a family to Japan — in the right places.**
>
> Honshu in high summer is hot and crowded. Hokkaido is not. Okinawa is coastal. The Japan Alps are cool at altitude. These are the months when Japan's finest properties are quietest and most available, and they are also the months when families from the Gulf and southern Europe most need to travel.
>
> We built this company around that overlap.

**Season band — needs data** {CL-05}
Caption (DRAFT): "Average daily maximum temperature by month. Source: Japan Meteorological Agency, 1991–2020 normals."
Rows: Tokyo, Sapporo, and one Japan Alps station `[[ALPS_STATION]]`. No Okinawa row — Okinawa's case is coastal, not cool, and a Naha row would undercut the page (⚑D6).

**Region sections — BRIEF, not copy.** The strategy calls this the page with "the most specific content". Only the operator can write it truthfully. For each region the team/the operator supplies, and Claude Code renders:

| Slot | Hokkaido | Okinawa | Hokuriku and the Japan Alps ⚑D6 |
|---|---|---|---|
| Body, 80–120 words: what a household does here in July–August, named places | `[[HOKKAIDO_BODY]]` | `[[OKINAWA_BODY]]` | `[[ALPS_BODY]]` |
| Margin: vertical name | 北海道 | 沖縄 | 北陸 / 北アルプス |
| Margin: best weeks | `[[..]]` | `[[..]]` | `[[..]]` |
| Margin: suggested length | `[[..]]` | `[[..]]` | `[[..]]` |
| Margin: getting there from Tokyo | `[[..]]` | `[[..]]` | `[[..]]` |
| Margin: properties with private bathing we use | count `[[..]]` | `[[..]]` | `[[..]]` |

**Closing — DRAFT**

> Summer dates go first. Tell us the household and the weeks you are weighing.
> [WhatsApp button]

**Page sections — DRAFT** (drafted 6 Oct 2026 for approval; restates approved copy, no new facts)

- Hero image, set vertically in the pine panel (decorative): 七月 · 八月
- Below the lede: "Travelling at another time of year?" — *Link:* Private Japan
- Months section heading: "Two months, three places."
- Months section text: "Tokyo's summer is hot and crowded. The places we plan for families in July and August sit further north, higher up, or by the sea."
- Region fact labels: "Weeks we recommend" · "Suggested length" · "Getting there from Tokyo" · "Properties with private bathing we use"
- Under each region: "Planning for Muslim families:" — *Link:* Family Services

## 5. Private Japan (`/private-japan`)

**Lede — LOCKED**

> A family trip to Japan is a household moving together. We plan for the unit, not the individual traveller: rooms that connect, pacing that works for a grandparent and a six-year-old on the same day, transport that keeps the group together, and privacy for the group as a whole rather than as a request added at the end.

**Sections — DRAFT**

- **Rooms.** Connecting rooms, or rooms on one floor, confirmed room by room rather than by category. We tell you what is confirmed before you commit.
- **Pacing.** Days planned so that the grandparent and the six-year-old both finish them well: fewer stops, longer at each, rest written into the day.
- **Transport.** Private vehicles sized for the whole group and its luggage, so no one travels separately. *Margin:* Vehicles and drivers are supplied by `[[TRANSPORT_OPERATOR]]`, a licensed hire operator.
- **Privacy.** Private dining rooms, private bathing and a guide who works for your household alone, planned from the first draft.

**Page sections — DRAFT** (drafted 6 Oct 2026 for approval; restates approved copy, no new facts)

- Title: "Japan in spring, autumn and winter, planned for the whole family."
- Hero image, set vertically in the pine panel (decorative): 春 · 秋 · 冬
- Sections heading: "Planned for the unit."
- Onward panels reuse approved text: Summer Journeys (Home §3 entry text) and Family Services (§6 title and intro).
- Close reuses the Home contact heading (§3, LOCKED).

## 6. Family Services (`/family-services`)

**All copy — LOCKED.** Page title: **For Muslim families**

> We build these into the itinerary from the first draft, not as requests added later.
>
> **Dining.** Japan has no national halal standard — certification is issued by private bodies, and the certifier matters: the UAE recognises three Japanese certifiers, and Saudi recognition is narrower still. We tell you which certification a restaurant holds and whether your authority recognises it. Where it does not, we arrange a private chef or a kitchen briefed to cook without alcohol-based seasoning — mirin, cooking sake and most commercial soy sauces — and we say plainly which of the two we have arranged. We do not describe a pork-free kitchen as halal. {CL-01} {CL-07}
>
> **Bathing.** Communal bathing is the norm in Japan. We book only properties with private bathing — 貸切風呂 or rooms with their own bath — and we confirm the specific room, not the room category. At the luxury tier this narrows the property list considerably, and in Kyoto it narrows it to a handful. We will tell you which properties are available for your dates before you commit.
>
> **Prayer.** Prayer times shape the day's pacing rather than interrupting it. Mosques and prayer rooms are concentrated in Tokyo, Osaka and Kyoto, and are limited outside them, so we provide prayer space in the vehicle and at the hotel when the itinerary goes regional. {CL-04}
>
> **Guiding.** We provide guides who work in Arabic, and female guides where requested. Japan has no Arabic guide credential — Arabic is not one of the ten languages of the national interpreter-guide examination — so ours are people we have recruited, trained and worked with ourselves. We will name your guide before you travel. {CL-02}
>
> **Transport.** Private vehicles with professional drivers, arranged through a licensed hire operator. Where a female driver is requested we will say honestly whether one is available for your dates: there are roughly 13,000 female professional drivers in all of Japan, and we will not promise what we cannot confirm. {CL-03}

`貸切風呂` renders with `lang="ja"`.

**Margin notes — DRAFT** (one per section, each carrying the claim's source link): e.g. beside Guiding — "National interpreter-guide examination languages: ten. Arabic is not among them." {CL-02}

## 7. Experiences (`/experiences`)

**Intro — DRAFT**

> Each of these is arranged with a named person, in a stated season, with a stated lead time. If an entry says six weeks, it needs six weeks.

**Entries — 8 to 12, supplied by the operator.** Fixed format (strategy §6, LOCKED):

```ts
{
  venue: "[[VENUE]]", city: "[[CITY]]",
  what: "[[WHAT_HAPPENS]]",
  practitioner: "[[NAMED_PRACTITIONER]]",   // cleric, artisan, chef — a real name
  season: "[[SEASON_OR_MONTHS]]",
  duration: "[[DURATION]]",
  groupLimit: "[[GROUP_LIMIT]]",
  leadTimeWeeks: 0,                          // number
}
```

Banned in any entry (COMPLIANCE C3): "private access", "exclusive", "arranged through a relationship", "after hours" at any Imperial Household Agency property.

## 8. About (`/about`)

**Who we are — LOCKED**

> We are a registered Japanese travel agency working from Tokyo and Osaka. Our registration and the name of our certified travel services manager appear at the foot of every page — you can verify both with the Japan Tourism Agency.
>
> The company is led by an Egyptian founder who works in Japanese, alongside a team that covers Arabic, Japanese and English as first languages. Client conversations happen in the client's own language, without an interpreter in the middle.
>
> Our work is enquiry-only. Most of what we arrange, we arrange once.

Note: the copy says the manager's name appears at the foot of every page. Strategy §7.5 puts the manager on About only. **Build it in the footer** so the copy is true (COMPLIANCE C1).

**Credentials — FactList, labels LOCKED, values placeholders**

| Label | Value |
|---|---|
| Registration | `registration.lineJa` / `registration.lineEn` |
| Registering authority | `[[REG_AUTHORITY_EN]]` |
| Registered entity | `[[ENTITY_NAME_EN]]` (`[[ENTITY_NAME_JA]]`) |
| Tokyo office | `[[ENTITY_ADDRESS]]` |
| Osaka office | `[[OSAKA_ADDRESS]]` |
| Travel services manager, Tokyo | `[[MANAGER_TOKYO]]`, 旅行業務取扱管理者 (`[[MANAGER_TOKYO_GRADE]]`) |
| Travel services manager, Osaka | `[[MANAGER_OSAKA]]`, 旅行業務取扱管理者 (`[[MANAGER_OSAKA_GRADE]]`) |
| Memberships | `Member, [[ASSOCIATION]]` |
| Public liability insurance | `[[INSURER]]`, cover `[[COVER_LEVEL]]` |
| Languages | Arabic, English, Japanese — `[[LANGUAGE_STAFF_NOTE]]` (who speaks each natively) |
| How we quote | "Net supplier rates plus a stated service margin." (LOCKED) |
| Founder | "Our founder has worked in Japanese inbound travel since `[[FOUNDER_YEAR]]`." — attributed to the person, never the entity (LOCKED rule) |

**Sources — DRAFT heading "Sources"**: the claims register rendered as a numbered list.

## 9. For Travel Advisors (`/for-travel-advisors`)

**All copy — DRAFT ⚑D9**

> **For travel advisors**
>
> We work with advisors whose clients travel to Japan as a household. You hold the client relationship; we plan and operate the trip in Japan, and we speak with your clients in Arabic, English or Japanese when you ask us to.
>
> Everything a due-diligence check needs is public: our registration, our named travel services managers, our memberships and our insurance are on the About page. Only net rates sit behind a sign-in, issued to advisors we have verified.

Sections:
- **Net rates.** Quoted in yen, net of our margin, so your commission is yours to set. ⚑D9 (confirm yen pricing and FX clause per strategy §8)
- **Response.** The same desk that answers clients answers advisors, on the same response commitment.
- **Request access.** Form fields: your name; agency; country; consortium or network (Virtuoso, Traveller Made, Signature, Ensemble, independent, other); agency registration or IATA number; work email. Submit: "Request access". Confirmation: "Request received. We verify every agency by hand and reply by email."
- **Already approved?** Link "Sign in to net rates".

## 10. Contact (`/contact`)

**LOCKED ⚑D3**

> **Tell us the household, the dates you are weighing, and what the trip needs to do.**
>
> WhatsApp: `[[WHATSAPP_DISPLAY]]` — answered in Arabic or English, within two hours during Japan business hours.
> Telephone: `[[PHONE]]`
> Email: `[[EMAIL]]`
>
> Or use the form: who is travelling (and ages), dates you are considering, language preference.

**Arabic line — DRAFT ⚑D10, requires native review before LOCK**

> يسعدنا التواصل معكم باللغة العربية عبر واتساب.

**Form fields** (no budget field, no traveller-type field — LOCKED rule)

| Field | Type | Required |
|---|---|---|
| Your name | text | yes |
| How should we reply? | WhatsApp / Email / Telephone | yes |
| WhatsApp or telephone number | tel | if chosen |
| Email | email | if chosen |
| Who is travelling, and their ages | textarea | yes |
| Dates you are considering | textarea (free text; families weigh ranges) | yes |
| What the trip needs to do | textarea | no |
| Language for our reply | Arabic / English / Japanese | yes |

Submit: "Send enquiry" (DRAFT). Confirmation (DRAFT): "Enquiry received. We will reply in the language you chose, by the route you chose."

Privacy line under the form (DRAFT): "We use these details only to reply to you and plan your trip. See our privacy notice."

## 11. Utility pages

- `/privacy` — `[[PRIVACY_NOTICE]]`. APPI-compliant notice, to be supplied by the 行政書士 (⚑D11).
- `/terms` — `[[TERMS_OF_BUSINESS]]` (旅行業約款 / 取引条件 as advised, ⚑D11).
- 404 — DRAFT: "There is no page at this address." followed by the site navigation.
- Page titles and meta descriptions: DRAFT, one per page, written in Prompt 7 and listed in the checkpoint for approval.

## 12. Claims register (`content/claims.ts`)

Every `{CL-nn}` must have a source URL, publisher, and date verified before production (COMPLIANCE C5).

| ID | Claim as used in copy | Source status |
|---|---|---|
| CL-01 | The UAE recognises three Japanese halal certifiers | **Unsourced.** Strategy cites ESMA; ESMA's functions moved to the Ministry of Industry and Advanced Technology in 2020 — verify against the current MoIAT list. |
| CL-02 | Arabic is not one of the ten languages of the national interpreter-guide examination | JNTO / JTA exam pages — to attach |
| CL-03 | Roughly 13,000 female professional drivers in Japan | **Unsourced** — needs a named statistic and year |
| CL-04 | Mosques and prayer rooms concentrated in Tokyo, Osaka, Kyoto | JNTO Muslim-traveller resources — to attach |
| CL-05 | Monthly mean maximum temperatures (Season band) | JMA 1991–2020 normals — to attach, with station names |
| CL-06 | Registration verifiable with the Japan Tourism Agency | Link to the registering authority's public register — to attach |
| CL-07 | Japan has no national halal standard | To attach (MAFF / JNTO) |
