# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Travel advisors (primary).** They meet the agency (likely at ILTM Cannes, 30 November–3 December 2026), then check the site alone before recommending it to a client family. They look for registration, responsible managers, memberships, insurance and sources, then request access to net rates.
- **Family offices.** The same checks, on behalf of a family; they contact the desk.
- **Gulf families, by referral.** They check whether the agency understands them, then message on WhatsApp.

Nobody is expected to arrive from search. Readers already know the name and are checking whether it is real.

## Product Purpose

HalaJapan is the trading name of a registered Japanese travel agency (offices in Tokyo and Osaka) that plans private, made-to-order trips for families who travel as one household: three generations, children of different ages, household staff, one itinerary. No packages, no published prices; enquiry only.

The site is a credential asset, not an acquisition engine. Its one job is to pass a quiet background check so advisors and family offices keep the agency on their shortlist. Success: an advisor spends five minutes on the site and concludes this is a real, legal, careful operator.

## Positioning

- A registered agency working directly from Tokyo and Osaka, in Arabic, English and Japanese, with no interpreter in the middle.
- Honest handling of Muslim needs: halal certification explained properly (never "pork-free means halal"), private bathing confirmed room by room, prayer built into the day, female guides on request.
- Lead product: July and August in Hokkaido, Okinawa and the Japan Alps — cool or coastal while Honshu is hot, when Gulf school holidays fall.
- Every specific claim is checkable: it carries a source a reader can follow.

## Operating Context

- Readers arrive with a name, often from an in-person meeting, and audit the site quietly; vagueness or exaggeration gets the agency dropped without explanation.
- Advisors work through consortia (Virtuoso, Traveller Made, Signature, Ensemble) and need net rates behind a verified sign-in.
- Families and the desk communicate mainly by WhatsApp.

## Capabilities and Constraints

- Pages: Home, Summer Journeys, Private Japan, Family Services ("For Muslim families"), Experiences, About, For travel advisors, Contact; plus Privacy, Terms, 404 and a gated advisor portal (switched off until enabled). The docs call for nine pages; the ninth is undecided.
- Travel Agency Act: every page footer carries the trading-name line, registered entity (English and Japanese), address, the registration line in prescribed Japanese form, and both travel services managers' names.
- All copy lives in `docs/CONTENT.md` and `/content`; LOCKED copy is verbatim; DRAFT copy blocks production. A compliance guard (`docs/COMPLIANCE.md`) fails production builds on banned claims, unsourced claims, placeholders and drafts.
- No invented facts: unknown values are `[[KEY]]` placeholders.
- No pricing language on public pages.
- Layouts use logical (start/end) properties only; an Arabic version is planned.
- Stack is fixed: Next.js App Router, Tailwind v4, Supabase (Tokyo), Resend, Turnstile, Plausible, Vercel (hnd1).

## Brand Commitments

- Name: HalaJapan ("Hala", هلا, is the Gulf Arabic word of welcome). Final written form, trademark and Japanese native-reading checks are still open (`docs/PROJECT-GUIDE.md` §4).
- Voice: calm, exact, British English, sentence case, no superlatives ("best", "finest", "luxury", "exclusive" and the like need explicit approval).
- Binding design commitments (confirmed 4 Oct 2026): the main column says, the margin proves; and the banned list — no icons, arrows on links or buttons, cards, shadows, gradients, all-caps, letter-spaced or eyebrow labels, numbered markers, centred layouts, Japan clichés (geisha, torii at sunset, drone, golden hour), dark mode, prices, "book now", pop-ups, badges or trust seals.

## Evidence on Hand

- Real copy in `docs/CONTENT.md` (LOCKED and DRAFT).
- Claims register CL-01 to CL-07 (`content/claims.ts`); none sourced yet, and CL-01 and CL-03 have no source at all.
- No photographs. None may be stock or AI-generated; summer photography cannot be shot before July 2027. The site must look finished without images.
- Registration details, managers, addresses, insurance and experiences are not yet supplied; they must never be fabricated.

## Product Principles

1. Assert less, show more: every claim sits beside its proof.
2. Nothing invented, nothing inflated: a missing fact stays visibly missing.
3. Credentials are always one step away, from every page.
4. Restraint is the premium signal: if a screen could belong to any travel company, it is wrong.
5. Built to mirror: everything that works left to right must work right to left.

## Accessibility & Inclusion

WCAG 2.2 AA; full keyboard access, visible focus, skip link. Japanese text carries `lang="ja"`, Arabic `lang="ar" dir="rtl"`. Lighthouse mobile: Performance ≥ 95, others 100; LCP under 2.0s on 4G.
