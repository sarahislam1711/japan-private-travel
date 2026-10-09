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
| `registration.lineJa` | `[[REG_AUTHORITY_JA]]登録旅行業者代理業 第[[REG_NUMBER]]号` → 東京都知事登録旅行業者代理業 第11300号 (corrected 8 Oct 2026: Travel World is a travel agency agent of Air World; DRAFT for Sarah and the 行政書士) | DRAFT |
| `registration.lineEn` | `Travel Agency Agent, registered with the Governor of Tokyo, No. [[REG_NUMBER]]` | DRAFT |
| `brand (Arabic)` | On the Arabic site the brand reads **هلا يابان** (Sarah, 10 Oct 2026), in text and in the wordmark (هلا in pine, يابان in ink). DRAFT: native check of the spelling (يابان vs جابان). | DRAFT |
| `tradeNameLine` | `HalaJapan is a trading name of [[ENTITY_NAME_EN]]` (no closing full stop: the name ends with one) | DRAFT (COMPLIANCE C2) |
| `principal` | `Air World Co., Ltd. (観光庁長官登録旅行業第961号), JATA member` — the licensed travel company we sell for. JATA membership is Air World's, never shown as ours (replaces `memberships`, 8 Oct 2026). | LOCKED |
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
| `close` | Close (the mobile menu button while the menu is open) | DRAFT |
| `sourceLink` | Source | DRAFT |
| `whatsappButton` | Message us on WhatsApp | LOCKED (Sarah, 6 Oct 2026) |
| `footer.privacy` | Privacy | DRAFT |
| `footer.terms` | Terms of business | DRAFT |
| `footer.legal` | Legal | DRAFT (footer column heading) |
| `footer.talkToUs` | Talk to us | DRAFT (footer column heading) |
| `languageMenu.label` | Language (accessible name of the globe button; Arabic: اللغة) | DRAFT |
| `languageNames` | English · Arabic (in English on both sites, each beside a flag: United States, Saudi Arabia) | LOCKED (Sarah, 7 Oct 2026) |
| `seasonBandPending` | Temperatures to be added from the cited source. | DRAFT (placeholder text for the season band until CL-05 is sourced) |

## 1b. Page titles and meta descriptions (`content/meta.ts`)

Drafted 7 Oct 2026 for approval, for search intent in each language; Arabic in `content/meta.ts` and `docs/CONTENT.ar.md`. Titles render as "Title — HalaJapan" (under 60 characters); descriptions under 160.

| Page | Title | Description | Status |
|---|---|---|---|
| home | Private family trips to Japan for every age | Private trips to Japan for families who travel together, from grandparents to young children, planned in Arabic, English or Japanese from Tokyo and Osaka. | DRAFT |
| summerJourneys | Summer in Japan: Hokkaido, Okinawa and the Alps | Summer in Japan for families: Hokkaido and the Japan Alps stay cool and Okinawa is by the sea. Private trips for July and August, planned around your family. | DRAFT |
| privateJapan | Private Japan trips in spring, autumn and winter | Private trips across Japan outside summer, planned for the whole family: connecting rooms, days paced for every age, transport that keeps you together. | DRAFT |
| familyServices | Japan for Muslim families: halal and prayer | Halal certification explained honestly, private bathing confirmed room by room, prayer built into the day, and guides who work in Arabic, for the whole family. | DRAFT |
| experiences | Experiences in Japan, arranged with named people | Experiences in Japan for families, each arranged with a named person, in a stated season and with a stated lead time, and planned around the rest of your trip. | DRAFT |
| about | About HalaJapan and how we are registered | HalaJapan is run by Travel World Co., Ltd., a registered travel agency agent in Tokyo and Osaka, selling trips operated by Air World Co., Ltd., a JATA member. | DRAFT |
| forTravelAdvisors | For travel advisors: private Japan for families | For clients who travel as a household. You hold the client relationship; we arrange the trip, and Air World, our licensed principal, operates it in Japan. | DRAFT |
| contact | Plan your private family trip to Japan | Plan a private family trip to Japan in six short steps: who is coming, when, where and what the trip should do. We reply in Arabic, English or Japanese. | DRAFT |
| privacy | Privacy notice | How HalaJapan collects, uses, shares and protects the details families send when planning a trip, under Japan's APPI and the EU and UK GDPR where they apply. | DRAFT |
| terms | Terms of business | How HalaJapan works with you from first enquiry to journey home: plans, bookings, your travel contract with Air World, changes, cancellations, responsibility. | DRAFT |

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
  - Summer Journeys: "Hokkaido, Okinawa and the Japan Alps."
  - Private Japan: "Year-round, planned for your family."
- Short header label for the For travel advisors page: Advisors. Status: LOCKED (Sarah, 6 Oct 2026). Set smaller and quieter, before Contact, after a thin divider. The footer keeps the full name.

## 3. Home (`/`)

All Home copy below is **LOCKED** — written and approved by Sarah, 6 Oct 2026 (hero headline and paragraph revised and approved 7 Oct 2026). It replaces the strategy's hero and resolves D2 (the "no resellers" line is gone).

**Hero**

> **Japan, planned for the whole family.**
>
> Private trips for every generation, from grandparents to young children. Each one planned from scratch with you, in Arabic, English or Japanese.
>
> Buttons: **Plan your trip** (solid, to Contact) · Message us on WhatsApp (outlined)


**Margin** (set as a seal at the foot of the hero's pine panel, Sarah 6 Oct 2026)

> We are a registered travel agency agent for Air World, a JATA member, with offices in Tokyo and Osaka. (corrected 8 Oct 2026: Travel World is a travel agency agent of Air World; DRAFT for Sarah and the 行政書士)
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

Step symbols, set large under each promise in the How we work stage — DRAFT (drafted 7 Oct 2026; decorative Japanese, each the meaning of its promise): 確 (certain, confirmed) · 名 (name) · 家 (family, household).

**FAQ** (before the contact close; each answer opens on a toggle; marked up as FAQPage. Questions and answers written by Sarah, 7 Oct 2026, LOCKED; heading DRAFT: "Frequently asked questions")

> **Is HalaJapan registered in Japan?**
> Yes. HalaJapan is run by [[ENTITY_NAME_EN]], a travel agency agent registered with the Governor of Tokyo, No. [[REG_NUMBER]], with offices in Tokyo and Osaka. The trips we sell are organised and operated by Air World Co., Ltd., Japan Tourism Agency Registered Travel Agency No. 961 and a full member of JATA. You can verify both registrations. {CL-06} (corrected 8 Oct 2026: Travel World is a travel agency agent of Air World; DRAFT for Sarah and the 行政書士)
>
> **What kind of trips does HalaJapan plan?**
> Private trips for families and small groups who travel together. Each one is planned from scratch after an enquiry. We do not sell fixed packages.
>
> **What are the best months to travel to Japan?**
> July and August, in Hokkaido, the Japan Alps and Okinawa, when these regions are cool or coastal and the cities are not. We also plan private trips year-round.
>
> **Does HalaJapan arrange halal dining and prayer?**
> Yes. We tell you which certification a restaurant holds and whether your authority recognises it, and we arrange prayer time and space within the day. We say plainly what is certified and what is prepared to your requirements.
>
> **We are a travel advisor. Can we work with you?**
> Yes. You keep the client relationship. We arrange the trip, and Air World Co., Ltd., the licensed travel company we sell for, operates it in Japan. (corrected 8 Oct 2026: Travel World is a travel agency agent of Air World; DRAFT for Sarah and the 行政書士) Learn more about how we can partner (→ For travel advisors)

**Contact**

> **Start with a conversation. We plan the rest.** (DRAFT, value-led rewrite requested by Sarah, 8 Oct 2026. Previous locked text: "Tell us who is travelling and when you would like to go.")
> We will reply in your language.
> [Message us on WhatsApp] · Email [[EMAIL]] · Telephone [[PHONE]]

## 4. Summer Journeys (`/summer-journeys`)

**Title and hero story — LOCKED** (written by Sarah, 8 Oct 2026; replaces the earlier title and lede, so "best" and "finest" are gone. Set as a visual story, her words unchanged.)

> **July and August are the best months a family can visit Japan**

(Title changed by Sarah, 8 Oct 2026, from "July and August are the months to bring a family to Japan, in the right places.". "best" is hers; the C4 approval entry is hers to add.)
>
>
> In summer the big cities are hot and crowded. The north is not. Hokkaido is cool, the Japan Alps are cool up high, and Okinawa is by the sea. We build your tour around that.

Beats as set on the page: "In summer the big cities are hot and crowded." → "The north is not." → three places, each with its Japanese name (DRAFT, decorative: 北海道 · 北アルプス · 沖縄): "Hokkaido is cool" · "The Japan Alps are cool up high" · "Okinawa is by the sea" → "We build your tour around that." ("These are also the months Gulf and southern European families most want to travel." removed by Sarah, 8 Oct 2026.)

**Season band — needs data** {CL-05}
Caption (DRAFT): "Average daily maximum temperature by month. Source: Japan Meteorological Agency, 1991–2020 normals."
Headline (DRAFT, 10 Oct 2026): "In August, Sapporo is about 5°C cooler than Tokyo." Under the chart, three figures (DRAFT label): Tokyo · Aug 31.3° · Sapporo · Aug 26.4° · "Tokyo humidity · Jul" 76% (JMA, Tokyo mean relative humidity, July). (31.3 vs 26.4 °C.) Shown as a line chart, July and August shaded. Data sourced 10 Oct 2026 from JMA 1991–2020 normals (Tokyo 47662, Sapporo 47412); the Alps row appears once its station is chosen.

Rows: Tokyo, Sapporo, and one Japan Alps station `[[ALPS_STATION]]`. No Okinawa row — Okinawa's case is coastal, not cool, and a Naha row would undercut the page (⚑D6).

**Region sections** (stories and margins written by Sarah, 8 Oct 2026; set as zig-zag rows: story beside a pine panel with the Japanese name and the facts)

Shared fact labels (LOCKED): "Best weeks" · "Suggested stay" · "From Tokyo". The fourth fact and the note differ by region.

**Hokkaido** — heading and body LOCKED; margin values DRAFT (supplied in a table headed "Example"; confirm)

> In July and August, Hokkaido is where a family slows down. Mornings in the lavender fields around Furano, afternoons by the lakes at Shikotsu-Toya, and dinners that a kitchen can prepare without alcohol-based seasoning when you ask. The distances are short, the air is cool, and a grandparent and a child can share the same easy day.
>
> 北海道 · Best weeks: Mid-July to late August · Suggested stay: 4–5 nights · From Tokyo: 90 minutes by air to Sapporo · Properties with private bathing: 6

**Okinawa** — LOCKED

> Warm sea and quiet islands while the mainland is busy. Calm water for children, slow beach days, and resorts with private pools. Dinners cooked the way you ask.
>
> 沖縄 · Best weeks: July to September · Suggested stay: 4 to 5 nights · From Tokyo: 2.5 hours by air · Private-pool stays: 5
> Note: The case here is the sea, not cooler air.

**Hokuriku and the Japan Alps** — body and margin LOCKED; heading DRAFT ⚑D6

> Cool mountain air, a few hours from Tokyo. Green valleys, clear rivers, and gentle walks that suit every age. A quiet change from the heat below.
>
> 北アルプス · Best weeks: July to August · Suggested stay: 3 to 4 nights · From Tokyo: 3 hours by rail · Reached via: Hokuriku / Nagano
> Note: The cool is the altitude: Tateyama-Kurobe, Kamikochi.

**Closing — DRAFT**

> Summer books up early. Tell us who is coming and when. (DRAFT, simplified at Sarah's request, 10 Oct 2026)
> [WhatsApp button]

**Page sections — DRAFT** (drafted 6 Oct 2026 for approval; restates approved copy, no new facts)

- Hero image, set vertically in the pine panel (decorative): 七月 · 八月
- Below the lede: "Travelling at another time of year?" — *Link:* Private Japan
- Months section heading: "Two months, three places."
- Months section text: "Tokyo's summer is hot and crowded. The places we plan for families in July and August sit further north, higher up, or by the sea."
- Region fact labels: see Region sections above.
- (Removed by Sarah, 10 Oct 2026: the "Planning for Muslim families: Family Services" line under the regions.)

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
- Step symbols under each principle (decorative Japanese): 室 (room) · 歩 (pace) · 車 (vehicle) · 静 (quiet, private)
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

**Experiences** (rebuilt 9 Oct 2026). All DRAFT. **The twelve entries are SAMPLES** written at Sarah's request to design the page: real public places, hosts described by role, no named people. They must be replaced or confirmed before launch (the guard blocks drafts in production).

> **Experiences we build into the trip.**
> Planned around your family's days. Choose what catches your eye, and we fit it in.

Categories: Family days (遊) · Culture (寺) · Nature (山) · Ryokan and onsen (湯) · Food (食) · Craft (匠)

Labels: "All" · "Season" · "Type" · "Spring" · "Summer" · "Autumn" · "Winter" · "Host" · "Where" · "Length" · "Group" · "Book ahead" · "weeks" · "week" · "When" · "All year" · "Plan this into my trip" · "Close" · "experiences" · "experience" · "When are you travelling?" · "Nothing in that season yet. Try another, or ask us." · "Details"

Entries (SAMPLE):

- **Tokyo Disneyland, paced for every age** · Urayasu, Tokyo · Tokyo Disneyland · Host: Your family's guide for the day · Full day · Your family · book 4 weeks ahead · months [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  A full day planned around the youngest and the oldest: rides chosen in advance, a quiet lunch booked, and a rest in the middle of the afternoon.
- **Universal Studios Japan, Osaka** · Osaka · Universal Studios Japan · Host: Your family's guide for the day · Full day · Your family · book 4 weeks ahead · months [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  A day at the park with entry times planned ahead, so the children see what they came for and the adults are not left waiting.
- **Deer, temples and Nara Park** · Nara · Nara Park and Tōdai-ji · Host: A guide who knows the park · Half day · Your family · book 1 weeks ahead · months [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  A gentle half day among the deer of Nara Park and the great hall of Tōdai-ji, flat paths and short walks, easy for grandparents and small children.
- **A tea ceremony in a Kyoto tea house** · Kyoto · A tea house in Kyoto · Host: A tea teacher · 90 minutes · Up to 8 · book 3 weeks ahead · months [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  A tea teacher explains each step of the ceremony, then the family prepares and drinks matcha together. Chairs are available for anyone who cannot kneel.
- **Hiroshima and the island of Miyajima** · Hiroshima · Peace Memorial Park and Itsukushima Shrine · Host: A guide from Hiroshima · Full day · Your family · book 2 weeks ahead · months [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  The Peace Memorial Park in the morning, then a short ferry to Miyajima and the shrine gate that stands in the sea at high tide.
- **Mt Fuji from Lake Kawaguchi** · Yamanashi · Lake Kawaguchi · Host: Your driver and guide · Full day · Your family · book 3 weeks ahead · months [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  A day by the lake facing Mt Fuji: a slow walk along the shore, the ropeway for the view, and lunch with the mountain in sight. Winter mornings are often the clearest.
- **Snow monkeys at Jigokudani** · Nagano · Jigokudani Monkey Park · Host: Your driver and guide · Full day · Your family · book 4 weeks ahead · months [11, 0, 1, 2]
  A forest walk of about thirty minutes to the hot springs where wild monkeys bathe in the snow. Boots and warm layers are arranged for the children.
- **A night at a ryokan in Hakone** · Hakone · A ryokan in Hakone · Host: The ryokan's own staff · One night · Your family · book 8 weeks ahead · months [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  A traditional inn with a private open-air bath for the family, dinner served in the room, and futons laid out for the night. Bathing is confirmed private, room by room.
- **Nishiki Market and a family cooking class** · Kyoto · Nishiki Market · Host: A Kyoto cook · 3 hours · Up to 8 · book 3 weeks ahead · months [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  A morning walk through Nishiki Market choosing ingredients, then a cooking class where the family makes lunch together. Dishes are adapted to your dietary needs.
- **Indigo dyeing in Tokyo** · Tokyo · An indigo dyeing workshop · Host: An indigo craftsman · 2 hours · Up to 10 · book 2 weeks ahead · months [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  Each member of the family dyes a cotton cloth by hand in natural indigo, with the craftsman showing the folds and ties. The cloths are dried and ready to take home the same day.
- **Cherry blossom morning on the Philosopher's Path** · Kyoto · The Philosopher's Path · Host: A Kyoto guide · 3 hours · Your family · book 10 weeks ahead · months [2, 3]
  An early walk along the canal under the cherry trees, before the crowds, ending with breakfast nearby. Blossom dates move each year, so we plan the week around the forecast.
- **Autumn leaves at Eikan-dō** · Kyoto · Eikan-dō temple · Host: A Kyoto guide · 3 hours · Your family · book 10 weeks ahead · months [10]
  A temple garden known for its red maples in November, visited at the quietest hour we can arrange, with a slow walk up to the pagoda for the view over the city.

Banned in any entry (COMPLIANCE C3): "private access", "exclusive", "arranged through a relationship", "after hours" at any Imperial Household Agency property.

## 8. About (`/about`)

**LOCKED** — approved by Sarah, 8 Oct 2026 (built from the company details she supplied; Travel World Co., Ltd. was formerly A.T.S). Layout: hero with three key facts; the people; "How we are registered" as a three-step chain (You → HalaJapan · Travel World → Air World); two office cards; a company facts table.

> **About [[BRAND]]**
> [[BRAND]] is run by [[ENTITY_NAME_EN]], founded in Tokyo in 2016, with offices in Tokyo and Osaka.
>
> Key facts: Since 2016 · Tokyo and Osaka · Tokyo Governor Registration No. [[REG_NUMBER]]
>
> **The people**
> Fathy Mohamed Mohamed Ismail Ahmed · ファトヒー・モハメド・モハメド・イスマイル・アフメド · Representative Director
> A graduate of Cairo University's Japanese department, he worked as a Japanese-speaking guide in Egypt for more than twenty years before founding the company in Tokyo, where he is based.
> Licensed travel managers (総合旅行業務取扱管理者): Mariko Kajiwara and Takashi Mino
> Japan's Travel Agency Act requires a licensed manager at each office.
>
> **How we are registered**
> Japan licenses travel companies in tiers. This is exactly where we sit, and who stands behind your booking.
> You — You plan your trip with us.
> [[BRAND]] · [[ENTITY_NAME_EN]] — Travel Agency Agent, registered with the Governor of Tokyo, No. [[REG_NUMBER]] (東京都知事登録旅行業者代理業 第[[REG_NUMBER]]号). We sell on behalf of one licensed travel company.
> Air World Co., Ltd. (エアーワールド株式会社) — Registered Travel Agency No. 961 with the Commissioner of the Japan Tourism Agency (観光庁長官登録旅行業第961号), and a full member of JATA, the Japan Association of Travel Agents. Air World organises and operates the trips we sell, and your travel contract is with Air World.
> You can check both registrations with the Tokyo Metropolitan Government and the Japan Tourism Agency. {CL-06}
>
> **Offices**
> Tokyo (head office): [[ENTITY_ADDRESS]] · Tel 03-6432-9234 · Fax 03-6432-9134
> Osaka: [[OSAKA_ADDRESS]] · Tel 06-6585-0136 · Fax 06-6585-0640
> Monday to Friday, 10:00–17:00 Japan time. Closed at weekends and on public holidays.
>
> **Company facts**
> Company: [[ENTITY_NAME_EN]] ([[ENTITY_NAME_JA]])
> Founded: 23 September 2016, Tokyo
> Capital: ¥5,000,000
> Representative Director: Fathy Mohamed Mohamed Ismail Ahmed
> Licensed travel managers: Mariko Kajiwara, Takashi Mino
> Registration: Governor of Tokyo, Travel Agency Agent No. [[REG_NUMBER]]
> Principal travel company: Air World Co., Ltd., Japan Tourism Agency Registered Travel Agency No. 961 (JATA member)

Decorative Japanese (DRAFT): 登録 (registration) on the hero seal; 東京 and 大阪 heading the office columns; chapter marks on the page's thread: 人 (people) · 証 (registration) · 所 (offices) · 記 (facts).

People cards (10 Oct 2026): Mariko Kajiwara · Takashi Mino (LOCKED, as supplied) · role line "Licensed travel manager" (DRAFT). Portraits to come; initials show until then.

Footer labels (LOCKED): Registered entity · Registration · Tokyo office · Osaka office · Licensed travel managers · Principal travel company

Left out by choice (8 Oct 2026): the Cairo office, bank names and the registered business scope. Still to supply: the Japanese company name; which manager is at which office.

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

> **Plan your trip.** (DRAFT, 8 Oct 2026: Sarah asked for a less crowded page top; the heading repeats the button that leads here. Earlier texts: "Tell us who is coming, when, and what the trip should do." and the locked "Tell us the household, the dates you are weighing, and what the trip needs to do.")
>
> Telephone: `[[PHONE]]`
> Email: `[[EMAIL]]`

(Removed by Sarah, 7 Oct 2026: the "Or use the form: …" line and the WhatsApp reply-time line. WhatsApp, telephone and email now show as three icon buttons.)

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

**Trip planner** (Sarah, 7 Oct 2026: the Contact page becomes a six-step planner built on the form fields above; "Plan your trip" on Home links here. Same LOCKED rule: no budget step, no traveller-type step. Plans are sent as an enquiry, saved for the team's admin area, or on WhatsApp; 9 Oct 2026.) All DRAFT.

Steps: Who → When → Where → The trip → Reply → Your plan. Month names come from the browser's own calendar names; place options reuse the Summer Journeys region names and the Private Japan label.

| Key | Text | Status |
|---|---|---|
| `planner.steps.who` | Who | DRAFT |
| `planner.steps.when` | When | DRAFT |
| `planner.steps.where` | Where | DRAFT |
| `planner.steps.needs` | The trip | DRAFT |
| `planner.steps.reply` | Reply | DRAFT |
| `planner.steps.review` | Your plan | DRAFT |
| `planner.questions.who` | Who is coming? | DRAFT |
| `planner.questions.when` | When are you thinking of travelling? | DRAFT |
| `planner.questions.where` | Where would you like to go? | DRAFT |
| `planner.questions.needs` | What does the trip need to do? | DRAFT |
| `planner.hints.who` | Everyone travelling, from grandparents to the youngest. | DRAFT |
| `planner.hints.when` | Pick the months you are weighing. A rough idea is enough. | DRAFT |
| `planner.hints.where` | Choose as many as you like, or let us suggest. | DRAFT |
| `planner.hints.needs` | A celebration, a first visit, slower days for older travellers: whatever matters to you. Optional. | DRAFT |
| `planner.hints.reply` | We reply in your language, by the route you choose. | DRAFT |
| `planner.hints.review` | Check your plan, then send it to us. | DRAFT |
| `planner.people.adults` | Adults | DRAFT |
| `planner.people.grandparents` | Grandparents | DRAFT |
| `planner.people.children` | Children | DRAFT |
| `planner.people.age` | Age | DRAFT |
| `planner.people.under1` | Under 1 | DRAFT |
| `planner.people.add` | Add | DRAFT |
| `planner.people.remove` | Remove | DRAFT |
| `planner.when.notSure` | Not sure yet | DRAFT |
| `planner.when.datesNote` | Anything else about dates? (optional) | DRAFT |
| `planner.where.anywhere` | Elsewhere in Japan, any season | DRAFT |
| `planner.where.suggest` | Not sure yet: suggest somewhere | DRAFT |
| `planner.buttons.next` | Continue | DRAFT |
| `planner.buttons.back` | Back | DRAFT |
| `planner.buttons.edit` | Edit | DRAFT |
| `planner.buttons.startOver` | Start again | DRAFT |
| `planner.buttons.sendWhatsApp` | Send on WhatsApp | DRAFT |
| `planner.sending` | Sending… | DRAFT |
| `planner.sendError` | Your plan could not be sent just now. Please try again, or send it on WhatsApp. | DRAFT |
| `planner.summary.title` | Your plan so far | DRAFT |
| `planner.summary.empty` | Your answers appear here as you go. | DRAFT |
| `planner.summary.travelling` | Travelling | DRAFT |
| `planner.summary.months` | Months | DRAFT |
| `planner.summary.places` | Places | DRAFT |
| `planner.whatsappIntro` | Hello, here is our trip plan: | DRAFT |
| `planner.errors.needTraveller` | Add at least one adult or grandparent. | DRAFT |
| `planner.errors.needWhen` | Choose a month, or Not sure yet. | DRAFT |
| `planner.errors.needName` | Please add your name. | DRAFT |
| `planner.errors.needContact` | Please add a number or email so we can reply. | DRAFT |
| `planner.saved` | Your answers stay on this device until you send them. | DRAFT |

## 11. Utility pages

- `/privacy` and `/terms`: drafted by Claude at Sarah's request, 7 Oct 2026 (below). DRAFT; the 行政書士 or a lawyer reviews both before launch (⚑D11). Deposits, payment schedules and cancellation charges are not stated here: they belong in the written conditions of travel (取引条件説明書面) given before each booking.

### Privacy notice (`/privacy`)

**Privacy notice** (DRAFT, 7 Oct 2026; for review by the 行政書士 / a lawyer before launch, ⚑D11)

> How we look after the personal information you share when you plan a trip.

> **Who we are**
> [[BRAND]] is a trading name of [[ENTITY_NAME_EN]], a travel agency agent registered with the Governor of Tokyo, No. [[REG_NUMBER]]. The trips we sell are organised and operated by Air World Co., Ltd., Japan Tourism Agency Registered Travel Agency No. 961. Our offices are at [[ENTITY_ADDRESS]] (Tokyo) and [[OSAKA_ADDRESS]] (Osaka).
> For anything in this notice, write to [[EMAIL]].
>
> **What we collect**
> Only what you choose to tell us: your name; how to reach you (WhatsApp, telephone or email); who is travelling and their ages; the dates and places you are considering; what the trip needs to do; and the language you would like us to reply in.
> If you tell us about dietary, religious, medical or mobility needs, we use that information only to plan your trip, and only with your consent.
>
> **How we use it**
> To reply to you, plan and quote your trip, make the bookings you ask for, and look after you while you travel. We do not sell your information, and we do not use it for advertising.
>
> **The trip planner**
> Your answers in the trip planner stay in your browser, on your device, until you send them. Sending opens WhatsApp with your plan written out; once you send it, WhatsApp's own privacy terms also apply.
>
> **Who we share it with**
> To book your trip, we share the details it needs with Air World Co., Ltd., the licensed travel company that organises and operates it.
> Only the people who make your trip happen: the hotels, ryokan, restaurants, drivers, guides and other suppliers you have agreed to, and the services that run this website and our messages (hosting, email and spam protection). Each receives only what it needs.
> Where a supplier or service holds information outside Japan, we use it only with the safeguards the law requires.
>
> **Cookies and visit counts**
> This website sets no advertising or tracking cookies. We count visits with Plausible, which uses no cookies and collects no personal information.
>
> **How long we keep it**
> We keep enquiry details for [[RETENTION_PERIOD]] after our last contact with you, and booking records for as long as the law requires. Then we delete them.
>
> **Your rights**
> You can ask to see the information we hold about you, to correct it, to stop us using it, or to delete it. Write to [[EMAIL]] and we will reply within the time the law allows.
> If you live in the EU or the UK, you can also complain to your local data protection authority.
>
> **Changes to this notice**
> If we change this notice, we will publish the new version on this page.

Contents label: "On this page" · Date line: "Last updated" (DRAFT; Arabic آخر تحديث), followed by the date the page last changed

### Terms of business (`/terms`)

**Terms of business** (DRAFT, 7 Oct 2026; for review by the 行政書士 / a lawyer before launch, ⚑D11)

> How we work with you, from your first enquiry to your journey home.

> **Enquiries and plans**
> An enquiry, and the plans we send in reply, do not commit you to anything. A plan becomes a booking only when you accept our written quotation.
>
> **Who your contract is with**
> We are a travel agency agent. Your travel contract is with Air World Co., Ltd. (Japan Tourism Agency Registered Travel Agency No. 961), which organises and operates your trip; we arrange it with you on Air World's behalf.
>
> **Your booking and conditions of travel**
> Before you book, you receive Air World's written conditions of travel, as Japan's Travel Agency Act requires. They set out the price, what it includes, how and when to pay, and the charges if you change or cancel. They form part of your travel contract, alongside these terms.
>
> **Prices and payment**
> Each quotation states its price, what is included and the payment schedule. Prices are confirmed only when we confirm your booking in writing.
>
> **Changes and cancellations**
> If you need to change or cancel your trip, please tell us in writing. Any charges are those set out in your conditions of travel.
> If we or a supplier must change your trip, we will tell you as soon as we can and offer you alternatives.
>
> **Booking through a travel advisor**
> When you book through a travel advisor, the advisor keeps the relationship with you; we arrange the trip, and Air World operates it in Japan.
>
> **What we ask of you**
> Please make sure that everyone travelling has a valid passport, any visa they need, and meets any health requirements, and that the names, ages and needs you give us are accurate.
> We strongly recommend travel insurance that covers cancellation, medical care and repatriation for everyone travelling.
>
> **Dietary and religious requirements**
> We tell you plainly which certification a restaurant holds and what is prepared to your requirements without certification. We cannot guarantee any supplier's preparation beyond what it is certified for.
>
> **Our responsibility**
> We arrange your trip with reasonable care as Air World's agent. Air World is responsible for operating it, as set out in the Travel Agency Act and your conditions of travel.
>
> **Your personal information**
> We handle the information you share with us as our privacy notice describes.
> (links to the privacy notice)
>
> **The law that applies**
> These terms are governed by the laws of Japan.
>
> **Questions**
> For any question about these terms, write to [[EMAIL]].

Contents label: "On this page"

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
