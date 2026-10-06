# Designer brief: Japan private travel website

Oct 4, 2026 · @Sarah Islam

## 1. The brand and the feeling

The brand is a registered Japanese travel agency, with offices in Tokyo and Osaka, that plans private trips for families who travel as one household. The site must feel like a careful, legitimate operator: calm, exact and quietly confident.

| The site should feel | Not |
|---|---|
| Calm and unhurried | Busy or salesy |
| Exact and checkable | Vague or boastful |
| Quietly premium, through restraint | Flashy luxury: gold, glamour, heavy imagery |
| Cool, like northern Japan in summer | Cherry blossom, torii at sunset, geisha |
| Personal: a household talking to people | Corporate, or a booking engine |

The test for every screen: if it could belong to any travel company, it is wrong.

## 2. Who uses it and the one job it does

The site has one job: pass a quiet background check, so that travel advisors and family offices keep the agency on their shortlist. Nobody arrives from Google. They arrive already knowing the name, and they are checking whether it is real.

| Reader | What they check | What they do next |
|---|---|---|
| Travel advisors (primary) | Registration, responsible managers, memberships, insurance, sources | Request access to net rates |
| Family offices | The same checks, on behalf of a family | Contact the desk |
| Gulf families, by referral | Whether the agency understands them | Message on WhatsApp |

This means: no prices, no packages, no pop-ups or booking funnels. Credentials are reachable from every page, and contact is never more than one step away.

## 3. The one design idea: the margin carries the proof

Every page is a main column and a margin. The main column says; the margin proves. A reader doing due diligence can read the margin alone and find everything they need.

- **Main column:** the claim, in calm reading text. For example: "We work directly from Tokyo and Osaka."
- **Margin:** the evidence, beside the paragraph it supports. For example: the registration number and a link to verify it.

The margin is not a sidebar. Each note sits level with its own paragraph, so claim and proof are read together. This is the site's one bold move; colour, motion and ornament stay quiet so it reads.

The site must also look finished with no photographs. Summer photos cannot be shot until July 2027, so type, space and the margin carry the design. Photos are an addition later, not a dependency.

## 4. Site structure and flow

Visitors enter at Home, explore the offer, verify on About, and act through Contact or advisor access. Every page should move the reader one step down this path.

Families end at Contact; advisors end at the request-access form and, once approved, the portal.

- **Navigation:** Summer Journeys, Private Japan, Family Services, Experiences, About, Contact. "For travel advisors" sits smaller at the far end. No sticky header.
- Every page closes with one next step, listed under "Leads to" in section 5. No dead ends.
- Every margin source links to the numbered Sources list on About, so proof is always one click away.
- Header and footer are identical everywhere, including the 404 and the portal. The footer carries the legal registration block.

## 5. Page by page

Each page has one job and ends by pointing to the next sensible step. Use the real copy from CONTENT.md, never lorem ipsum.

| Page | Its job | What is on it | Leads to |
|---|---|---|---|
| Home | First impression, two routes in | Hero headline and intro; registration line in the margin with a verify link; two entry points (Summer Journeys, Private Japan); contact band | Summer Journeys, Private Japan, Contact |
| Summer Journeys | The lead product; most care | Title and the case for summer; a month-by-month temperature band; three regions (Hokkaido, Okinawa, Hokuriku and the Japan Alps), each with its Japanese name set vertically in the margin and practical facts beside it; closing line and WhatsApp button | Contact |
| Private Japan | The year-round offer | Opening paragraph; four short sections (rooms, pacing, transport, privacy), each with a margin note; one photo slot | Family Services, Contact |
| Family Services ("For Muslim families") | The strongest differentiator | Five sections (dining, bathing, prayer, guiding, transport), each with a sourced margin note; no photos, on purpose | About (sources), Contact |
| Experiences | Proof of real access | Short intro; 8 to 12 entries as one plain list; margin holds the named person, season, duration, group size and lead time | Contact |
| About | The credentials page, checked hardest | Who we are; credentials list (registration, entity, offices, managers, memberships, insurance, languages); numbered sources | Contact, For travel advisors |
| For travel advisors | The main sales channel | How we work together; net rates; request-access form; sign-in link | About, Advisor portal |
| Contact | Enquiries | Heading; WhatsApp, phone and email; WhatsApp button; optional Arabic line; enquiry form | Confirmation state |

Also design: Privacy, Terms, a 404 page with navigation, and the advisor portal (sign-in, "being verified" state, rate sheet list).

## 6. Visual system

Cool, restrained and type-led. Full values are in DESIGN.md in the repo; these are the essentials.

**Colour.** One light theme, one accent.

| Token | Hex | Use |
|---|---|---|
| Paper | #F1F2EE | Page background |
| Snow | #FAFAF8 | Form fields |
| Ink | #1A2230 | Text, the one solid button, footer background |
| Ink soft | #4A5462 | Margin notes, captions |
| Mist | #DADDD8 | Thin rules between different kinds of information |
| Pine | #2C5F53 | The only accent: link hover, focus ring, July and August in the season band |

**Type.**

- Newsreader for all headings and reading text. Light and fine at display size, sturdy at body size.
- Zen Kaku Gothic New for margin notes, labels, navigation, footer and all Japanese text.
- Sentence case everywhere. Base size 18px; reading lines about 64 characters.

**Grid and space.** 12 columns, 1.5rem gutter, max width 84rem. Everything aligns to the start; nothing is centred. Spacing on a 4px base, with 96px between sections on desktop and 64px on mobile.

**Shape.** No shadows. Square photos. A 3px radius only on inputs and the one button.

**Motion.** One moment only: the Home hero lines fade in one after another, then the registration line. Elsewhere, only small hover and menu transitions.

## 7. Viewports

The same page, in the same order, at every width. Nothing is hidden on mobile, and a margin fact is never dropped; it only moves.

| | Desktop (1440) | Tablet (834) | Mobile (390) |
|---|---|---|---|
| Main column | Columns 2 to 8 | Columns 1 to 9 | Full width |
| Margin | Columns 10 to 12, level with its paragraph | Columns 10 to 12, notes only | Directly under its paragraph, small text, thin mist rule on the inline-start edge |
| Navigation | Full nav; "For travel advisors" smaller at the far end | Full nav or Menu, whichever fits | Wordmark and a text button reading "Menu", no hamburger icon |
| Home entry points | Side by side | Side by side | Stacked |
| Photos | Bleed to the right edge only | Same | Full width |

Two hard requirements:

- **Home hero at 1440×900** fits on one screen, with the top of the entry points visible below it.
- **Mirror-ready for Arabic.** Think in start and end, not left and right. Every layout must flip cleanly when the site later runs right to left.

## 8. What to avoid

Each of these makes the site look like a template or an advert, which works against the background check.

- Icons, arrows on links or buttons, cards, gradients, shadows
- All-caps, letter-spaced labels, eyebrow text above headings, numbered markers
- Italic or coloured single words in headings
- Centred layouts
- Stock or AI-generated images, and Japan clichés (geisha, torii at sunset, drone shots, golden hour)
- Dividers that do not separate different kinds of information
- Any animation beyond the Home hero
- Prices, "book now", pop-ups, badges or trust seals
- Dark mode

## 9. Deliverables, in this order

Work from the system outward, so every page is built from the same parts. Set up colours, type and spacing as named styles that match the tokens in DESIGN.md, so the build can use them one to one.

1. **Wordmark exploration.** The brand name in Latin, Japanese and Arabic, set in Newsreader, Shippori Mincho and Markazi Text side by side. Until the name is chosen, use [[BRAND]].
2. **Style tile.** Colours, the full type scale with real copy, and link, focus and button states.
3. **Components.** Header, footer with the legal block, margin note, vertical Japanese name, photo frame (with and without a photo), credentials list, WhatsApp button, desk status, enquiry form (empty, error, sending, sent), season band, experience entry, entry point.
4. **Key screens** at 1440, 834 and 390. Home, Summer Journeys, Family Services, About, Contact.
5. **Remaining screens.** Private Japan, Experiences, For travel advisors, advisor portal, 404, Privacy, Terms.
6. **Clickable prototype** linking the pages along the flow in section 4.

Review with me after steps 2, 4 and 6 before moving on.

## 10. Open items to design around

These are not settled yet. Design so each can land without a redesign.

- **Brand name.** Not chosen. Use a text wordmark reading [[BRAND]].
- **Photos.** None yet. Design the empty photo frame; the site must still look complete.
- **Facts.** Many values are placeholders like [[REG_NUMBER]]. Show them in a visibly different style so they are easy to spot.
- **Page count.** The brief says nine pages but defines eight. Leave room in the navigation for one more.
- **Arabic line on Contact.** May or may not ship. Design it right to left beside the WhatsApp button.
- **Desk status** ("The desk is open now"). May not appear at launch. The contact layout must work with and without it.
