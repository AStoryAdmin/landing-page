# Result: premium site, round 3 (2026-11-03)

This is the chief of agents' final report. Branch `site-premium` in `C:\Users\nguye\Desktop\a-story-landing-premium`. Round 3 starts after 2cd6376 and runs to HEAD f31e2e3, plus this report. Plan: `docs/plans/2026-11-03-premium-round-3.md`. Panel detail: `docs/premium/panel-r3.md`.

**Nothing is pushed or deployed.** Every pass below is "passed only locally".

## Read this first
1. **The goal (every persona at 9 or more on every criterion) is not met.** Final panel (r3-2): average **7.51** (round 2: 6.58, baseline: 6.08). Lowest persona: Priya 6.71. Lowest score: Priya desire 5. Three of 35 scores reach 9.
2. **What separates 7.5 from 9 is mostly facts, not pages.** Twenty deduplicated questions wait on Daniel (`panel-r3.md`, last table). The plan's three are devices, gift, and organizations price/equipment/export. Those three alone move Maya, Denise and Priya, and only Daniel can answer them.
3. **Some leftovers need no new fact:** five fixes listed under "Still keeping scores under 9" (desktop layout shift, the "Public" badge, the /join order, the duplicate demo agenda, length). They are a one-session job for one builder. One more (the privacy short line) is a wording change that needs Daniel's yes, because it is the policy's own summary line.
4. **Home is untouched.** 0 px at 1440. At 390, only the lazy prints the baseline renders blank, and the main height is the same (see checks).

## Builders and merges

| Builder | Scope | Gate | Merge |
|---|---|---|---|
| B1 | Doors: /join, /how-it-works #being-asked and #film, /your-story, header, footer | passed, attempt 1 | c36d311 |
| B2 | Gift and money: /for-families, /pricing, faqData | passed, attempt 3 | c7ecaae |
| B3 | Care and organizations | **not passed after 3 attempts**, merged; the leftovers went into fix 1 and fix 2 | 5f226b0 |
| B4 | Mobile and warmth pass | **not passed after 3 attempts**, merged; the leftovers went into fix 1 and fix 2 | 96fc9fd |
| Fix 1 | From panel r3-0, one builder on site-premium | 13 of 14 items done; item 14 not applicable (the puppy is on the app's page) | direct commits |
| Fix 2 | From panel r3-1, one builder on site-premium | 15 of 15 items done | direct commits |

## What changed, per page group (commits from `git log --oneline 2cd6376..HEAD`)

### Doors: /join, /how-it-works, /your-story, header, footer, menu
- **/join first screen** (4449cba, then 928a0e8 and 5cc2047)
  - Says it is free for relatives ("There is no fee per relative", `faqData.ts:26`), that no account is needed, and where the code comes from.
  - One code-vs-link rule and an `ABC123` placeholder.
  - A sample addition card from the sample-book data, eager and visible in the first screen.
  - "No app needed to add yours: any browser works", then what happens next, and "Add one memory or many, whenever you like".
  - One serif for the helper lines.
  - Both doors in the first screen: "Got a link? Just open it, and you're in." and "Asked to tell your story? Start here", which goes to `/join#being-asked`.
- **Storyteller reassurance** (4449cba, a071654, 5cc2047)
  - "It's a computer that calls and asks, not a person" sits in #being-asked and on /join, in that block's serif.
  - "the hour your family picked".
  - "You can decline a question, pause, or change the subject" as plain text.
  - "Daniel, who started A Story, answers himself", with a "Who is behind A Story" link to /our-story.
  - The device line is stated in #being-asked rather than left in a closed FAQ row.
- **Film** (4449cba, a071654, b9f8442): `#film` opens at the film. The music credit is folded into "Music credit". The phone's sticky Start bar steps away while the film is on screen.
- **Header and menu**
  - "Invited?" in the desktop bar (4449cba), kept beside Menu at any text size (29f4e62).
  - Phone drawer in one size with the visitor's own pages first, "Asked to tell your story?" (4554ead), and hints that tell the two family rows apart (29f4e62).
  - Footer and /your-story link the storyteller's door (5cc2047).

### Gift and money: /for-families, /pricing, /questions answers
- **/for-families** (e4c2ce1, d5ebc90, 935252e, 43ed2ee, 79e19ab)
  - The h1 is "Give it to a parent, or begin together.", with a "Give it as a gift" button the same height as Start free.
  - An iPhone yes/no near the top, from the sourced answer.
  - A "Giving it today" card with three steps.
  - Every Start carries `?for=someone`.
  - The privacy line by each action.
  - A film link in the gift block.
  - The sticky bar steps aside while an inline action row is on screen.
- **/pricing** (e4c2ce1, d5ebc90, 69044fb, 32ef203)
  - First screen: "Giving it, or wary of renewals? Express is one time, and nothing renews" with an `#express` anchor, and "relatives you invite pay nothing", with one action.
  - The Express card has a "One time" tag, "The calls aren't on sale yet: $1 holds your place" and "Stop paying, and it is still yours".
  - Books folded into one `details`.
  - The Ledger caption is gone from the first screen.
  - "Recommended" is unchanged (`lib/pricing.ts:116`).
- **Sign-up door** (928a0e8): the site door passes `?for=someone` to the app's create-account page. There is a routing test row for it. The app's page itself is not changed (app repo).

### Care and organizations: /care-communities, /organizations, /questions#organizations, /compare
- **Hero and imagery** (f467764, 90e3de3, 8cc72ac, cfb9234, 96b2c37)
  - Two real app screens in the kit phone replace the generated prints. CSS crops hide the timer and delete button.
  - On a phone the words come before the picture: the h1 is above y=300 at 390 (fix-2 measurements).
  - Reveal blocks never print or screenshot empty, and there is a print stylesheet.
- **What you need / What we can say today** (f467764, cfb9234, 07e1b35)
  - Real requirements from the code.
  - Six to seven sourced lines, with care lines first on /care-communities.
  - Now includes "Stored and processed in the United States" (`privacy.tsx:526-527`).
  - The old "not stated / we make no claim" line is now one calm demo agenda under the Book a demo action.
- **Questions** (f467764, 8cc72ac, 07e1b35, a071654, ec22f9c)
  - The "For organizations" group (11 answers, each sourced, in `orgQuestions.ts`).
  - "Does it work in memory care?" gives the sourced behaviour (decline, pause, stop at any time; a story told twice is fine).
  - /questions opens what an address names, has group jump links, and opens the first answer in each group.
- **Demo form** (f467764, 5a55658, 5f3cd23): one step, with care kinds (Senior living, Memory care, Hospice). Even day-chip grid.
- **Compare** (f467764): StoryCorps only as "a public archive, not a private family one".
- **Routing** (0b1a06d): `/care` redirects 301 to `/care-communities` in all three places, with a test row.

### Mobile and warmth, every non-home page (B4: 1025afd, 5a55658, 5f3cd23, 5e704f6, 55ebe14)
- No overflow at 320/390/1440 and 100/150 % text.
- 44 px targets, 8 px apart.
- Phone rhythm for Chapter and PageOpening.
- The h1 inside the first screen at 320x568 on care and guide pages.
- The film credit in even leading.
- The legal pages' mailto links at 44 px.

### Logs and merges (no page change)
815721a, 75c184f, 104779a, f31e2e3, 72de63e, c65a181, 9c6fc19 (CHIEF-LOG); 807abed, 7c2424c, 0dc133b (branch syncs).

## Handoff

### Passed on the real target
**None.** Nothing is deployed. `scripts/verify-live.mjs` has not run against astoryapp.com for round 3.

### Passed only locally (chief re-ran every check at HEAD f31e2e3, 2026-11-03, fresh `npm run check` build, `vite preview` on :5202)

| Check | Output |
|---|---|
| `npm run check` | exit 0. lint clean; test:contracts printed its 7 cases with no failure; `test:routing`: "PASS: 35 addresses, edge function and inline script agree."; build: "31 routes and 7 old addresses written to dist/"; production contracts: "PASS: 23 public snapshots with their own canonicals, 8 noindex snapshots, 590 asset references, 7 old addresses, seven exact brand tokens." |
| `scripts/nav-count.mjs --base :5202` | "206/206 passed" |
| `scripts/copy-check.mjs --base :5202` | 8 PASS, 1 HIT: /pricing "Stop paying" (… "$79 one time · 30 days Stop paying, and it is still yours."). This is the standing chief ruling (keep; CHIEF-LOG B3), so the script exits 1 by design. |
| `scripts/home-diff.mjs --base cc87bfe` (+ P0 87f9799f) | "PASS home @1440: 0 changed px of 10892160 (0.0000 %); main height 7564 / 7564". "FAIL home @390: 192401 changed px (5.5531 %); main height 8884 / 8884". The 390 diff image shows changes only inside the lazy prints ("It's the everyday", wedding, sample-call prints), which the cached baseline renders blank. This noise has been logged since B2. **Read as pass with that caveat.** Not checked against current origin/main: it merged a home film after site-premium forked. |
| `scripts/film-check.mjs :5202` | Edge 1440 and Edge 390: every assertion PASS (0 .mp4 before the tap, plays with sound after one tap, captions "English" off by default, "Watch again"). Hosting: vtt `text/vtt`, mp4 Range 206. WebKit FAIL at launch (`webkit-2359` not installed). Not a site result. **iPhone playback is still Daniel's check.** |
| `qa/r3-fix2-shots.mjs --sweep --base :5202` | 64 runs (/join, /for-families, /pricing, /how-it-works, /care-communities, /organizations, /questions, /your-story at 320/390/1024/1440 x 100/150 % text): `over: 0` in 64 of 64, `smallCount: 0` in 64 of 64. First screens: /for-families h1 at y 158 ("Give it to a parent, or begin together."); /join at 390 and at 1024 x 150 %: "Invited?" visible and the "Asked to tell your story?" link visible; /care-communities h1 at y 151; /organizations h1 at y 120. Shots: `qa/premium-2026-11/r3-fix2/final-*.png` (local only; `qa/premium-2026-11/` is git-excluded). |
| Anchors (chief script, 390x844) | `/how-it-works#film` scrollY 1499, target top 88 (under the header); `/how-it-works#being-asked` 903 / 88; `/join#being-asked` 1369 / 88. `/care` gives 200 at `/care-communities`. |
| Overflow at 390 and 1440 (chief script) | 0 px on /join, /for-families, /pricing, /how-it-works, /care-communities, /organizations, /questions, /your-story, /reserve. |
| CLS, iPhone 13 emulation, 4 s after network idle (the round-2 method) | 0.000 on /pricing, /for-families, /care-communities, /your-story, /join, with and without reduced motion. |
| CLS at **1440x900** | **FAIL**, see the next section. |

Page length at 390 (screens of 844 px; taste rule 11 asks at most 8): /join 3.78, /reserve 4.06, /your-story 6.40, /pricing 6.81, /for-families 7.51, /questions 7.89, /care-communities 7.99, **/organizations 9.26**, **/how-it-works 9.85**.

### Blocked

**On Daniel (facts the site must not state until he answers):** the 20 questions in `panel-r3.md`. The plan's three come first:
1. **Devices.** iPad / Android. Recommended: "iPhone or iPad" everywhere if the iPad works.
2. **Gift.** $1 reservation in the recipient's name with a printable note. Recommended: yes.
3. **Organizations.** Price range, equipment, export formats. Recommended: state them plainly once true.

After those:
- Proof (quotes, pilots, or a "looking for our first partners" line).
- HIPAA/BAA (a plain no is fine).
- Proxy consent.
- The launch window.
- Express minutes.
- Contributor behaviour (voice, visibility, edit, notifications).
- Call length.
- Daniel's photo.
- A phone or calendar link.
- Releases and rights.
- Custom questions.
- An accessibility statement.
- A program-view film.

**Outside this repo:**
- The app's create-account page should read `?for=someone`. This is the one Maya friction the site cannot fix: `index.html:80` redirects before paint.
- iPhone film playback on a real device.
- WebKit for film-check is not installed on this machine.

**Builders could not finish (fixable without a new fact):**
- **CLS at 1440.** By the chief's measurement, the opening shifts about 0.5 s after load: /pricing 0.231 (`opening-object`, `gift`, `opening-tail`), /for-families 0.208 (`opening-lead`), /your-story 0.151 (`opening-object`, `opening-lead`), /join 0.054 (sample card), /care-communities 0.008. Plan AC4 asks for CLS 0 on key pages. Phones measure 0. Likely hydration replacing the prerendered opening at desktop width; not yet diagnosed.
- **Page length.** /organizations 9.26 and /how-it-works 9.85 screens at 390 (rule 11: at most 8). B3/B4 logged the cut: /organizations' two demo-description lists ("From a demo to an archive" and "Thirty minutes, with a founder") into one. On /how-it-works, the "What one call leaves" card at 390. Both are content decisions.
- **B4 leftovers:**
  - At 150 % text on 320x568 the h1 of /care-communities, /organizations and the guides ends below the first screen (the plan asks this at 100 % only).
  - The "Afternoon" chip sits alone on its row at 390.
  - The sample voices and cards are not reused on the text-only pages (/questions, /programs, /contact, /reserve). That needs markup in other builders' files.
  - /start "I already have an account" is 25 px at 1440 and 6 px under "Continue" at 390 (not under `data-premium`).
- **Samples chrome.** `public/samples/index.html` has a stale hand-copied header and footer, without "Asked to tell your story?" or the drawer hints. `scripts/samples-chrome.mjs:196` needs `\r?\n` (the file is CRLF), then a regeneration.

## Still keeping scores under 9 (the exact list from panel r3-2)

Fixable now, no new fact (one builder, one session):
1. **The /care-communities "Know the person" screenshot shows a "Public" badge** on a resident's memory card (Denise). Crop it out with CSS or pick another crop, as fix 1 did for the timer and delete button.
2. **The demo agenda appears twice.** "Bring these to the demo: HIPAA and a BAA, export formats, consent ..., and price" is in the /care-communities hero and in the middle of /organizations (Denise, Priya). Keep one copy, under the form or in /questions#organizations, not in a hero.
3. **/join order for the relative** (Tuan): put "Someone in your family invited you..." first. Move "Asked to tell your story?" below the form at 1440 while keeping it in the first screen for Harold. Make the help paragraph into three short items (what you can add, any browser, it appears once they say yes). Set card labels in the serif.
4. **/join for the storyteller at 150 % text** (Harold): the "Being asked" half sits more than one screen down. A clearer first-screen link, or a door choice above the code box. The header "Invited?" goes to the relative's door only.
5. **Footer "Your own story"** still reads as Harold's page (Harold). Rename or reorder the "Who it's for" column. **/your-story** opens on young adults.
6. **/reserve on a phone** repeats "Reserve" / "Reserve" and its four reasons (Maya).
7. **/programs title** "Startup programs and grants" reads as programs for institutions (Priya). Retitle it as the vendor's backers.
8. **The header changes between page groups**, and the dropdown accessibility text runs labels together (Priya). Add a separator or `aria-label` per row.
9. **/questions accordion** closes one answer when another opens (Priya). Let several stay open.
10. **CLS at 1440** and **page length** on /organizations and /how-it-works (see Blocked above).

Fixable with a wording yes from Daniel:

11. **"Only your family hears the recordings. Not even us."** (`lib/hears.ts:21`, `privacy.tsx:97`) beside the policy's "unless you ask us to help, or someone reports something" (`privacy.tsx:108-110`). It costs Maya trust. Suggested line: "Nobody at A Story listens unless you ask us to help."

Needs a fact from Daniel (no page change can lift these):

12. **Maya desire and trust:** nothing to wrap (gift), no date, an Android dad, no real family voice, and the app's sign-up page does not know it is a gift.
13. **Harold desire and clarity:** whether his iPad rings; no call length; no face beside "Daniel answers himself".
14. **Tuan desire:** voice additions, who sees his addition, edit/delete, a notification when it is approved, a greeting with the inviter's name.
15. **Denise trust and desire:** HIPAA/BAA, proxy consent, equipment for residents without an iPhone, a price range, export formats, any community proof, a phone or calendar link.
16. **Priya desire and trust:** export formats and metadata, releases/deed of gift, IRB, accessibility statement, an institutional price, proof from a library or school, a program-view film, custom questions.

## Chief's assumptions (Daniel asleep)
- The panels' averages are taken as reported by the harness (7.474 / 7.444 / 7.512). Recomputing from the per-criterion scores gives 7.471 / 7.443 / 7.514; the difference is rounding.
- The home-diff 390 result is read as a pass. The only changed pixels are the lazy prints, and the main height is equal, as logged by B2, B4 and fix 2. The script still prints FAIL, so it should wait for `img.complete` on the baseline.
- CLS at 1440 is reported as a failure of AC4, even though the round-2 method (iPhone 13) measures 0. The plan does not name a viewport.
- Port 5201 was held by another process serving an unknown build. Its first nav-count run read 181/206 and is discarded. Every result above is from the chief's own `vite preview` on :5202, serving the fresh build, which was stopped afterwards.
- `npm run build` rewrote line endings in `public/_redirects`, `public/robots.txt`, `public/sitemap.xml` and `vercel.json` (empty content diff). The chief restored them with `git checkout --`, so they are not in the commit.
