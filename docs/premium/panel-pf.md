# Panel scores, phone-first (simulated users, same rubric)

The 5 personas and the 1-10 rubric are the same as in `docs/premium/panel.md` and `panel-r3.md`. Every phone-first panel scored a local build of `site-premium` at 390x844, at 1024x1366 with 150 % text, and at 1440x900. Nothing was deployed. Each panelist stubbed every off-site request and sent no real form.

- **r3-2** is the last round-3 panel (ec22f9c), average **7.51** (`panel-r3.md`). It is the comparison point.
- **pf-0** ran after the two phone-first builders merged (abf4d03). Screenshots: `qa/premium-2026-11/panel-pf-0/`.
- **pf-1** ran after fix 1 (4fca5eb). Screenshots: `qa/premium-2026-11/panel-pf-1/`.
- **pf-2** ran after fix 2 (894f4b1, dist built 00:13). Screenshots: `qa/premium-2026-11/panel-pf-2/`.
- **pf-3** ran after fix 3 (6668713, which is HEAD before this report). Screenshots: `qa/premium-2026-11/panel-pf-3/`. Panelists scored the plain dist, which has no Supabase env, so they saw the form's email fallback and not the thank-you. The thank-you path was checked separately (see `RESULT-phone-first.md`, check 9).

The target was plan AC6: every persona averages 8 or more. **It was not met.** In pf-3, 2 of 5 personas reach 8 (Harold 8.14, Tuan 8.21). The lowest is 7.57 (Denise and Priya). 28 of 35 cells are at 8 or above.

## Per persona (average of 7 criteria)

| Persona | r3-2 | pf-0 | pf-1 | pf-2 | pf-3 | pf-3 vs r3-2 |
|---|---|---|---|---|---|---|
| Maya (gift buyer, phone) | 7.43 | 7.43 | 7.86 | 7.86 | 7.93 | +0.50 |
| Harold (storyteller, 79, iPad 150 %) | 8.14 | 8.07 | 7.57 | 8.21 | 8.14 | 0.00 |
| Tuan (invited sibling, laptop) | 8.14 | 7.86 | 8.36 | 8.21 | 8.21 | +0.07 |
| Denise (memory-care director) | 7.14 | 7.21 | 7.71 | 7.64 | 7.57 | +0.43 |
| Priya (library oral-history lead) | 6.71 | 7.64 | 7.36 | 7.50 | 7.57 | +0.86 |
| **Average** | **7.51** | **7.64** | **7.77** | **7.89** | **7.89** | **+0.38** |
| Lowest persona | 6.71 | 7.21 | 7.36 | 7.50 | 7.57 | +0.86 |
| Cells at 8 or more (of 35) | 20 | 23 | 24 | 27 | 28 | +8 |

## Per criterion (average of 5 / lowest)

| Criterion | r3-2 | pf-0 | pf-1 | pf-2 | pf-3 | pf-3 avg vs r3-2 |
|---|---|---|---|---|---|---|
| premium | 7.70 / 7 | 8.00 / 8 | 8.00 / 7.5 | 7.90 / 7.5 | 8.00 / 8 | +0.30 |
| warmth | 8.20 / 8 | 8.20 / 8 | 8.30 / 8 | 8.40 / 8 | 8.40 / 8 | +0.20 |
| clarity | 7.50 / 7 | 7.70 / 7 | 7.80 / 7 | 8.10 / 8 | 8.10 / 8 | +0.60 |
| trust | 7.10 / 6 | 6.90 / 6 | 7.00 / 6.5 | 7.40 / 6.5 | 7.20 / 6 | +0.10 |
| navigation | 8.00 / 7 | 8.20 / 7.5 | 8.20 / 8 | 8.40 / 8 | 8.30 / 8 | +0.30 |
| mobile | 7.60 / 7 | 7.90 / 7.5 | 8.10 / 8 | 8.00 / 8 | 8.00 / 8 | +0.40 |
| desire | 6.50 / 5 | 6.60 / 6 | 7.00 / 6 | 7.00 / 6 | 7.20 / 6 | +0.70 |

## Every score, per round

Order: premium / warmth / clarity / trust / navigation / mobile / desire. A score under 8 is in bold.

| Persona | r3-2 | pf-0 | pf-1 | pf-2 | pf-3 |
|---|---|---|---|---|---|
| Maya | 7.5 / 8 / 7.5 / 6.5 / 8 / 8 / 6.5 | 8 / 8 / **7** / **7** / 8 / 8 / **6** | 8 / 8.5 / 8 / **7** / 8.5 / 8 / **7** | 8 / 8.5 / 8 / **7** / 8.5 / 8 / **7** | 8 / 8.5 / 8 / **7** / 8.5 / 8 / **7.5** |
| Harold | 8 / 9 / 8 / 9 / 8 / 8 / 7 | 8 / 9 / 8 / 8 / 8.5 / 8 / **7** | 8 / 8 / **7** / **7** / 8 / 8 / **7** | 8 / 9 / 8 / 9 / 8 / 8 / **7.5** | 8 / 9 / 8 / 8.5 / 8 / 8 / **7.5** |
| Tuan | 8 / 8 / 8 / 8 / 9 / 8 / 8 | 8 / 8 / 8 / **7** / 8 / 8 / 8 | 8.5 / 8.5 / 8.5 / 8 / 8.5 / 8.5 / 8 | 8 / 8.5 / 8.5 / 8 / 8.5 / 8 / 8 | 8 / 8.5 / 8.5 / 8 / 8.5 / 8 / 8 |
| Denise | 8 / 8 / 7 / 6 / 8 / 7 / 6 | 8 / 8 / **7.5** / **6** / **7.5** / **7.5** / **6** | 8 / 8.5 / 8 / **6.5** / 8 / 8 / **7** | 8 / 8 / 8 / **6.5** / 8.5 / 8 / **6.5** | 8 / 8 / 8 / **6** / 8 / 8 / **7** |
| Priya | 7 / 8 / 7 / 6 / 7 / 7 / 5 | 8 / 8 / 8 / **6.5** / 9 / 8 / **6** | **7.5** / 8 / **7.5** / **6.5** / 8 / 8 / **6** | **7.5** / 8 / 8 / **6.5** / 8.5 / 8 / **6** | 8 / 8 / 8 / **6.5** / 8.5 / 8 / **6** |

The scale is integers, but some panelists gave half points, and those are kept as given (Harold pf-0 navigation 8.5, for example). Simulated panelists vary by about ±0.3 between runs, as logged in round 3. That means pf-2 to pf-3 (7.89 to 7.89) is flat, and per-persona moves of 0.1 or less are noise.

## Reading the trend

- **What the phone-first structure fixed.** In pf-3 every persona scores navigation and mobile at 8 or more (in r3-2 the lowest were 7 and 7), and clarity is 8 or more for all five (r3-2 lowest: 7). The bar went from 4 links, a menu, "Invited?", Sign in and Start free, with 12 rows in the phone drawer, down to 4 tabs, Sign in and one button. The book teaser, one action, no video and no sideways scroll were confirmed by every panelist in every round.
- **What did not move.** Trust (avg 7.20, min 6) and desire (avg 7.20, min 6) hold all 7 sub-8 cells in pf-3. Nearly every friction behind them asks for a fact the site does not have: a real tester or family voice, invite timing, what a beta family pays, iPad or other devices, BAA/HIPAA, guardian consent, export formats, a pilot or partner, a phone number. The fix rounds moved facts the repo already publishes onto the pages buyers read (fix 2 items 1, 4, 5; fix 3 items 5, 10, 11). Nothing new was invented.
- **Priya** gained the most (+0.86 over r3-2). Her navigation and mobile scores rose once /organizations stopped repeating itself. Trust and desire stay at 6.5 and 6, held there by archival practice: release/deed of gift, metadata, IRB and accessibility.
- **Denise** moved +0.43 over r3-2 and then held at about 7.6. Trust 6 is held by BAA/HIPAA and guardian consent being deferred to the demo.
- **Maya** rose from 7.43 to 7.93, mostly on clarity (one price story, whose email it is). She stays under 8 on trust 7 (no real voice) and desire 7.5. Desire is held by the fallback she saw on plain dist (the production thank-you depends on the env) and by having nothing to wrap as a gift.

## Blocked on Daniel (deduplicated across 4 rounds x 5 personas = 20 reports)

Each question is listed once, followed by the personas who asked it.

### Before any deploy
1. **The production form path.** Does the production build have `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` set, and does an RLS policy allow an anonymous insert into `waitlist_signups`? Without both, every visitor who asks for an invite sees the email fallback ("Almost there… Press send") and not "We'll send your invite to <email>". *Maya, Harold, Tuan, Priya; it affects every visitor.*

### Family side (Maya, Harold, Tuan)
2. **Invite timing.** How long after asking does an invite arrive (same day, within a week)? May the thank-you say so, and name Daniel as the sender? *Maya, Harold.*
3. **Beta price.** What does a beta family pay today: nothing, $79 Express, or a plan? May /pricing say "free during the beta"? Is Express on sale to invitees? *Maya.*
4. **A gift.** Can the invite go to the recipient (Dad) with a gift note? Is there a printable card, a gift link or a first-question card to hand over? Whose email should the form collect, and who installs and sets up the app on the parent's iPhone? *Maya.*
5. **Setup help.** What does "we help you set it up" mean in practice: a phone call, a video call, a guide? Can the adult child do it remotely? Who helps if the parent gets stuck? *Maya, Harold.*
6. **Devices.** Does a call ring on an iPad? Can a relative's iPhone, or a landline, take the call for a storyteller with no iPhone? Which iOS versions and iPhone models does the beta support? *Harold, Maya.*
7. **Call length.** How long is a typical call? May the site say "about N minutes, and you can stop at any time"? Can the storyteller skip a question? *Harold, Maya.*
8. **A person to reach.** May a phone number, a postal address or a calendar link appear next to contact@astoryapp.com? *Harold, Denise, Maya.*
9. **The storyteller's line.** May /get-the-app say "Your family sets it up; you just answer", and is that true of the beta? *Harold.*
10. **Contributors on /join.**
    - What does the web app's join screen ask for (a name only, or a name and email), and does it greet the relative with the inviter's name?
    - After the storyteller says yes, who sees an addition, and is the contributor's name shown?
    - Can a contributor edit or delete their addition?
    - Are relatives notified when an addition is approved?
    - Can they add voice, or only writing and photos (AppDoor.tsx says voice is in development)?
    - About how long does one addition take?
    - Should `/join?code=XXXXXX` prefill the code box, and what URL shape do real invite links use?

    *Tuan.*

### Proof (every persona)
11. **A real voice.** Is there one real beta family, tester or storyteller (first name, relation, one line, or a photo) who has given written consent to be quoted? Is there a real number of families or calls with a source? *All five.*
12. **Institutional proof.** Is there any care-community, library, school or historical-society pilot, partner or letter of interest that may be named? If none, may the site say "we are looking for our first partner programs" (this is a new claim, so it waits for Daniel)? *Denise, Priya.*
13. **Daniel's photo.** Is the /our-story photo cleared for /join, #being-asked and home? Fix 1 and fix 3 already show it at 48 px on /join and /get-the-app, so this is about home and larger use. *Harold, Tuan, Maya.*
14. **An advisor.** Is there an eldercare, dementia-care or clinical advisor who may be named? *Denise.*

### Organizations (Denise, Priya)
15. **Compliance.** Will A Story sign a BAA? If not, what is the plain line to publish? Is there a security summary (encryption at rest and in transit, the storage provider and region, staff access, a subprocessor list, SOC 2 status or plans), a DPA, or a FERPA statement for student narrators? *Denise, Priya.*
16. **Consent for a resident who cannot decide alone.** Can a guardian, POA or health-care proxy consent, with the resident assenting? How is that recorded? *Denise.*
17. **Organization price.** Is there a starting figure, a per-resident or per-program range, or a pilot price, to replace "quoted on the demo"? *Denise, Priya.*
18. **Shared devices.** Can one community- or program-owned iPhone or iPad serve several residents or narrators? How many per device? Is there an in-person or studio recording mode? *Denise, Priya.*
19. **Archival practice.** *Priya.*
    - Which export formats exist (audio codec, TXT/DOCX/VTT/TEI transcripts, timestamps, OHMS XML, Dublin Core, CSV/JSON metadata)?
    - Is there a release or deed-of-gift template, and can a library use its own?
    - Who holds copyright under a program, and does institutional custody override the storyteller's "delete it all"?
    - Does it support IRB-reviewed use?
    - Can an institution use its own questions instead of the 547-question bank?
    - Is there a real program or staff view (cohort list, consent status) to show?
20. **Retention.** What happens to the data when a community ends its program, or when a resident dies? Which privacy-policy section is the source? *Denise.*
21. **Accessibility.** Is there a WCAG 2.1/2.2 AA target, and an accessibility statement for the site and app? *Priya.*

### Settled during the night (no longer blocked)
- "Only your family hears the recordings. Not even us." now reads "… Nobody at A Story listens unless you ask us to help." (fix 2 item 8, `lib/hears.ts`). The policy's own label (`privacy.tsx:97`) is left for Daniel.
- The footer logo wall on family pages now shows only on /our-story, /organizations and /care (fix 1 item 10).
- The "Public" badge on the care screenshot is gone: /care-communities now shows the person page (fix 3 item 3).
