# Result: phone-first website, overnight (2026-11-04)

Plan: `docs/plans/2026-11-04-phone-first-overnight.md`. Branch `site-premium`, worktree `C:\Users\nguye\Desktop\a-story-landing-premium`. Scores: `docs/premium/panel-pf.md`.

**Nothing is pushed or deployed.** Every pass below is "passed only locally".

## Read this first

- **The site is reorganized.** The bar now has 4 tabs, Sign in and one button: **Get the iPhone app** -> `/get-the-app`, a new short page with a two-question form. The home page has no video. Its book section is a one-spread teaser whose button is **Open the sample books** -> /samples. The rest of home is the same apart from the hero's small print, the CTA labels and the closing band.
- **Every check passes locally**: lint, contracts, routing 35/35, build (31 routes), production-contracts, nav-count 252/252, CLS 0.0000, the form on a stubbed Supabase, 0 create-account links, 0 `<video>`. Two need a reading, not a fix: copy-check holds 1 standing hit (`/pricing` "Stop paying", chief ruling B3), and the overflow sweep finds the same 22 known non-overflow items as at 894f4b1.
- **The "at least 8" goal is not met for every persona.** Panel pf-3 has Harold at 8.14, Tuan 8.21, Maya 7.93, Denise 7.57 and Priya 7.57. The average is 7.89, against 7.51 in round 3. Navigation, mobile and clarity are 8 or more for everyone. All 7 cells under 8 are trust or desire, and nearly all of them wait on a fact only Daniel has (list in `panel-pf.md`).
- **Before deploying, Daniel must** confirm the production Supabase env and an anonymous-insert policy on `waitlist_signups`. Without them, every invite request ends in the email fallback. The full list is below.

## What changed

### The bar (header and phone drawer)

| | Before (cb745f3) | After (HEAD) |
|---|---|---|
| Laptop bar (1180-1440) | How it works, Sample books, Pricing, a **For organizations** menu (3-row panel), a quiet **Invited?** door, Sign in, **Start free** (-> app.astoryapp.com/create-account) | **How it works · Sample books · Pricing · For organizations** (one link to /organizations), Sign in, **Get the iPhone app** (-> /get-the-app). On /organizations and /care-communities the button reads **Book a demo** (-> #book). |
| Phone drawer (390) | 8 main rows (How it works, Sample books, Pricing, For families, Invited to a family's book, Asked to tell your story?, For organizations, Our story) + 4 quiet rows (Questions, Compare, Guides, Contact) + Start free | The same 4 tabs, Sign in and the one button. Nothing else. |
| Footer | 18 page links | 19 page links + email. Every page stays reachable. Our story moved here from the drawer. The three "If you were sent here" doors (Invited to a family's book, Asked to tell your story?, Your own story) sit under one heading. Program logos appear only on /our-story, /organizations and /care-communities. |

Source of truth: `src/lib/nav.ts`. The rule is enforced by `scripts/nav-count.mjs`, rewritten for 4 tabs + Sign in + 1 button.

### The one action

`src/lib/app.ts`: `START_LABEL` "Start free" -> **"Get the iPhone app"**, `START_HREF` `APP.createAccount` -> **`/get-the-app`**. The header, the phone sticky bar, every page closer and the /samples buy box use it. No site link goes to app.astoryapp.com/create-account. /join (code box and links) works exactly as before (routing test 35/35 unchanged). Sign in stays for existing families. The web app's own invite-only change is a brief, `docs/premium/webapp-invite-only-brief.md`.

### /get-the-app (new)

- **Heading:** "Get the A Story iPhone app."
- **Intro:** a short, sourced beta line: the calls ring in the A Story app on iPhone, in a private beta.
- **Form:** email plus "Does the person you'll call have an iPhone?" (yes / no / not sure). It writes to `waitlist_signups` through `lib/leads.ts` (intent `iphone_invite`).
- **After submitting:**
  - With Supabase configured: **"We'll send your invite to <email>."**
  - Without it: the calm fallback "Almost there… Press send, and it reaches Daniel", with "Open the email".
- **The note** "Use your own email. The invite comes to you." is shown to everyone. `?for=someone` switches on gift copy.
- **"Being called by A Story?"** is a band for the storyteller with three lines already published on /join: a computer that calls, you can stop at any time, Daniel answers himself. Daniel's 48 px photo sits beside it.
- **"After you ask":** the steps.
- **Timing:** no promise of timing.
- **Build:** prerendered, in the sitemap, with its own OG card.

### Home (the plan allowed the header/footer, CTA labels and the book only)

- **Video:** none. The home film never landed on `site-premium`. main's home film (PR #9) came in with the merge and was taken back out in 84a964b. The film stays on /how-it-works#film.
- **Book section** (`home/FamilyBook.tsx`, about 1,100 lines removed): it was a full book that duplicated /samples. It is now a teaser, "Seventy years, still being written.": one open spread from the Hartleys' sample book (one page on a phone), one caption line, and **Open the sample books** -> /samples. At 390 the section is 837 px tall (head 90, lead 90, spread 365, button 52), so it fits one 390x844 screen.
- **Hero small print:** "Start free in your browser, no card. The calls are in private beta…" became "The calls ring in the A Story app on your parent's iPhone, in a private beta. The family reads and adds in any browser." The button is "Get the iPhone app". It slides in at full strength and never looks disabled. The headline animation is shorter (0.7 s, 0.06 s apart, no delay). The settled layout is unchanged.
- **Closing band:**
  - **Title:** "Start the family's book *today*." became "It starts with *one call.*". An invite queue cannot keep "today".
  - **Line:** the "$19.99 a month" figure became "The calls ring in the A Story app on your parent's iPhone, by invite in a private beta. Inviting family, writing and reading never cost extra. See pricing".
  - **New quiet link:** "Running a program or a care community? For organizations".
- **Pixel check** (home-diff vs cb745f3, header and footer masked): main is 8814 -> 8431 px at 390 and 7564 -> 7424 px at 1440. Changed rows at 1440: 697-823 (the hero button and small print) and 5868-7423 (the book teaser and closing band). Nothing in between changed. Rows at 390 are listed under check 7.

### Page copy (phone-first stage)

- **Wording that changed on every page:**
  - "Start free" and every "starts free" closer are gone.
  - "Before launch, A Story can only ring an iPhone" became "Today, A Story rings on an iPhone". The fact is the same, with no implied date. Only `home/FoundingBand.tsx:121`, which is not mounted on home, keeps "Before launch".
  - The short privacy line now reads "Only your family hears the recordings. Nobody at A Story listens unless you ask us to help." (`lib/hears.ts`), in line with the policy.
- **/pricing:**
  - **Price story:** one price story, and "Asking for an invite is free, with no card."
  - **Label above the cards:** "When the calls go on sale".
  - **Phone and Menu widths:** "What's included" is folded on a phone and at the Menu breakpoint.
  - **Organizations:** "priced on the demo" -> For organizations.
  - **Removed from the first phone screen:** the Ledger thumbnail and the film link.
- **/organizations:**
  - **Doors and buttons:** a care-communities door near the top. One demo button in the opening and one at the form, with no per-kind buttons, no film link and no StoryCorps aside.
  - **Defaults and workaround:** stated defaults under "You decide. They agree." The iPhone workaround is published ("a staff member can start a conversation together with them").
  - **"Questions a review will ask":** 4 rows already public on /questions (storage, retention, exports, HIPAA/BAA -> demo).
  - **Folds:** at the Menu breakpoint, 16 % shorter at 1024 x 150 %.
- **/care-communities:**
  - **The screenshot:** the person page replaces the memory screenshot that showed a "Public" badge.
  - **Order:** "Know the person" comes right after "What you need".
  - **Consent:** the published consent line.
  - **Review questions:** the same review-questions block as /organizations.
- **/join:**
  - **Code box:** comes first and is full width on a phone. The label is "Your family code", with the hint "Six letters or digits" and a visible outline.
  - **Header button:** quieter.
  - **New lines:** "Adding works in any browser. You don't need the app." and "Your family's archive is private by default, and additions are reviewed before they are shared." (-> /questions).
  - **"Being asked" band:** three short lines for the storyteller, with Daniel's face.
  - **Sample photo:** its box is reserved, so it no longer pops in.
- **/for-families, /how-it-works, /questions, /contact, /our-story, /your-story, /programs:** the "Today / by invite" explanation is given once per screen, and Start free is removed.

## Commits (`git log --oneline cb745f3..HEAD`, before this report's commit)

There are 56 lines. The 14 commits from `7424e92` down are origin/main (sample books v2, Raymond, home film) that came in with merge `3e21fae`. The home film was then taken out in `84a964b`.

```
6668713 Get the iPhone app: the thank-you's 'Turn the pages of a sample book' link reads on the paper sheet (was ivory on paper, 1.05:1; now 11:1)
22bfc07 QA: pf-fix3 measurements and evidence script (heights, screenshots, hero frame sampler, /join CLS, 64-run sweep)
1058f79 Organizations: the steps, You decide and privacy folds apply wherever the header shows Menu, so 1024 px at 150 % text is 16 % shorter (pf-fix3 item 1 target)
84dd14c Footer: links at the note size with 44px rows at 150 % text; the three doors for someone sent a link under "If you were sent here" (pf-fix3 item 14)
dd40bac Join: who sees what you add, no app needed, a boxed family-code field with its hint, the sample photo's box reserved (pf-fix3 items 11-13)
27b5232 Get the iPhone app: a short band for the storyteller with the three /join lines and Daniel's face (pf-fix3 item 10)
66aa27a Home hero: the headline rises in 0.7 s from 0 s, 0.06 s apart (pf-fix3 item 9, timing only)
f0620a1 Home book teaser: one page on a phone so the section fits one 390x844 screen (pf-fix3 item 8)
91e6e51 Home closing band: a quiet For organizations link for programs and care communities (pf-fix3 item 2)
ad5ad6f Pricing: asking for an invite is free; one label over the cards; What's included folds below the header breakpoint; organizations priced on the demo (pf-fix3 items 5, 6)
daa941f Care communities: the person page instead of a memory with a Public badge; Know the person follows What you need (pf-fix3 items 3, 4)
b261cfb Copy: "Before launch, A Story can only ring an iPhone" -> "Today, A Story rings on an iPhone" (pf-fix3 item 7)
18724fa Organizations: one demo button in the opening and one at the form; no per-kind buttons, film link or StoryCorps aside (pf-fix3 item 1)
894f4b1 QA: pf-fix2 tester sweep (32 addresses x 320/390/1440 x 100/150 %), CLS check, home-diff row reader
f13cf3c QA: pf-fix2 evidence script, a plain static server, and how to serve the stub-env build for the panel (pf-fix2 item 14)
c1982a9 Home hero: the action slides in without fading, so it never looks disabled (pf-fix2 item 13)
005c6a9 Home: closing band title It starts with one call. (pf-fix2 item 12)
f7f00d3 Pricing: Express notes in the positive, one price story; What's included folds on a phone (pf-fix2 item 11)
797ba7d Get the app: own-email note for everyone, step 1 says whose address, the fallback reads as finished (pf-fix2 items 9-10)
7de3caa Privacy short line matches the policy: nobody at A Story listens unless you ask us to help (pf-fix2 item 8)
76a898a Join: the Being asked band speaks to the storyteller in three lines; full-width code box on a phone; sticky sample card (pf-fix2 items 6-7)
b8b12da Care + organizations: the iPhone workaround, stated defaults, the agenda once by the form, review questions, the published consent line (pf-fix2 items 1-5)
4fca5eb Questions: long words in an answer wrap, so contact@astoryapp.com no longer widens the page 4px at 320 x 150% text (pf-fix1 tester)
be5eb09 CHIEF-LOG: phone-first fix 1 brief and builder report
47d860a Join: Daniel's line keeps the whole sentence (pf-fix1 item 9c fix)
e6a3992 QA: pf-fix1 evidence scripts (first screens, heights, sweep, stubbed form)
95e3239 Footer: program logos and NVIDIA note only on our-story, organizations, care (pf-fix1 item 10)
cf66a42 Join: code box first, quieter header button, short storyteller block; Daniel's face beside his line (pf-fix1 items 9, 11)
ba84593 Get the app: gift and storyteller doors, ?for=someone gift copy, calm fallback state (pf-fix1 items 7, 8, 12)
e60f5a0 Pricing: no Ledger thumbnail or film link in the phone first screen (pf-fix1 item 6)
40e7540 Home CTA band: one price story, no monthly figure, quiet See pricing link (pf-fix1 item 5)
d4b0802 Org and care: care door on /organizations, workaround first, agenda blurb, shorter on a phone (pf-fix1 items 1-4)
abf4d03 Merge branch 'pf/b' into site-premium
072f97c Merge branch 'pf/a' into site-premium
445b794 CHIEF-LOG: Builder B request status after review round
994ce1f Review fixes: say the beta once per screen; care address wraps at 320
609fa4b Home: book becomes a teaser to /samples; CTA copy for the iPhone invite
944db74 Phone-first shell: 4 tabs, Get the iPhone app -> /get-the-app
0c2427c CHIEF-LOG: Builder B phone-first requests
6a51f73 Pages for the phone-first stage: invite copy, Today block, web-app brief
84a964b Merge follow-up: keep home-film out of site-premium
3e21fae Merge remote-tracking branch 'origin/main' into site-premium
7424e92 Merge pull request #11 from AStoryAdmin/raymond-v3
e5f16b6 Raymond: round-6 fixes; chapter numeral clears its label
abf1d60 Raymond: no photo shared with another page; chapters in order; round-5 fixes
329e3e2 Raymond: fixes from the round-4 panel; learned page names the memory, not a year
a066cfb Raymond: fixes from the round-3 panel; "What … learned" unnumbered
520511b Raymond: a grandfather's book, with photographs
e8e9650 Merge pull request #10 from AStoryAdmin/sample-books-v2
dea7a31 Sample books v2: fixes from the second reader panel
d8dbe2f Sample books v2: text flows like print, panel fixes, covers re-captured
40cb473 Sample books v2: three books in their own words, laid out as the app prints them
9a5e682 Merge pull request #9 from AStoryAdmin/home-film-main
ee17df8 qa: film section verified on the main-based branch
2d3a8c5 Home: mount the Film section after the hero
91a7daf Home: the film after the hero — silent 10 s loop, full film (v6.2) in a lightbox
```

This report's commit adds `docs/premium/panel-pf.md`, this file, the ticked plan, the CHIEF-LOG fix 2 and fix 3 briefs, and `qa/pf-final-form.mjs`.

## Handoff

### Passed on the real target
**None.** Nothing is pushed or deployed. `scripts/verify-live.mjs` has not run against astoryapp.com for this work.

### Passed only locally

The chief re-ran every check at HEAD 6668713 on 2026-11-04, starting from a fresh `npm run check` build. dist was served by `node qa/serve-dist.mjs dist 5461`. The stub-env build was served on 5462 and was not committed. Both servers were stopped afterwards.

| # | Check | Output |
|---|---|---|
| 1 | `npm run check` (lint, test:contracts, test:routing, build, production-contracts) | Exit 0. eslint: no output. contracts: 7 cases listed, none failed. "PASS: 35 addresses, edge function and inline script agree." "31 routes and 8 old addresses written to dist/". "PASS: 23 public snapshots with their own canonicals, 8 noindex snapshots, 466 asset references, 8 old addresses, seven exact brand tokens." |
| 2 | Generated files after the build | `git diff --ignore-cr-at-eol --stat -- vercel.json public/_redirects public/robots.txt public/sitemap.xml` was empty (line endings only), so they were restored with `git checkout --`. Same after the stub build. |
| 3 | `node scripts/nav-count.mjs --base http://localhost:5461` | "252/252 passed", 0 FAIL. For example: "PASS 1.1 / @1440 exactly the 4 tabs, in order ["How it works","Sample books","Pricing","For organizations"]"; "PASS 1.2 / @390 exactly 4 tabs + Sign in + 1 button [... "Sign in","Get the iPhone app"]"; "PASS 1.3 footer page links = 19 + 1 email 20"; "PASS 1.3 no create-account link in the chrome []"; "PASS 1.3 footer <= 1.3 screens @390 (folds closed) 582px = 0.69 screens". |
| 4 | `node scripts/copy-check.mjs --base http://localhost:5461` | 8 PASS and 1 HIT: /pricing "Stop paying, and it is still yours." That is the standing chief ruling B3 (CHIEF-LOG R-3), so the script exits 1 by design. Daniel or the chief may switch the heading to "Whatever you choose, it stays yours." |
| 5 | `grep -rhoE 'href="[^"]*create-account[^"]*"' dist` | No output: 0 links. The string still appears in 33 dist files, but only inside the inline routing script and the AppDoor/Start bundles (old /sign-up and /start addresses). That was already there before tonight and is covered by the web-app brief. |
| 6 | `grep -c "<video" dist/index.html` | `0`. A Playwright count of `video` on / is 0 at 390 and 1440. |
| 7 | `node scripts/home-diff.mjs --base cb745f3 --p0 none` | Prints "FAIL" by design, because the book and band were meant to change. 390: 9.55 % of pixels, main 8814 -> 8431. 1440: 7.09 %, main 7564 -> 7424. Changed row ranges (from `qa/pf-fix2-test-rows.mjs`) at 1440: 697-823 (hero button and small print), then 5868-7423 (#book from 5771, then the band). At 390: 396-772 (hero), many small ranges of 19 to 2,900 px each between 1838 and 6928 (inside the lazy-image prints of "everyday" and "kept"; the same noise has been logged since round 3), then 7014-8430 (#book from 7030, then the band). Diff images: `qa/premium-2026-11/pf-final/vs-cb745f3/`. |
| 8 | `node qa/pf-fix2-test-sweep.mjs --base http://localhost:5461` | "180 runs over 32 addresses", "22 runs with findings". This is the same 22 as at 894f4b1 (`qa/premium-2026-11/pf-fix2-test/sweep.txt`). None of them is a page scrolling sideways (scrollW = vw everywhere). They are: /samples at 1440 x2 (the 3-D book's page extends to x -246 inside its own clip), /sign-in and /sign-up?next=/reserve x14 (the password "Show" button sits inside its field by design), and /account x6 (redirects away from the site). |
| 9 | `node qa/pf-final-form.mjs` (new; plain dist on 5461, stub-env build on 5462) | "PASS plain @390 / @1440: empty submit -> 2 error(s) ["Check the email address.","Choose yes, no or not sure."]; valid submit -> fallback 'Almost there'; stub POSTs []". "PASS stub @390 / @1440: … valid submit -> thank-you; stub POSTs ["/rest/v1/waitlist_signups"]". supabase.co was never reached. Screenshots: `qa/premium-2026-11/pf-final/form-*.png`. |
| 10 | `node qa/pf-fix2-test-cls.mjs --base http://localhost:5461` | All 8 PASS, "worst 0.0000" (/, /pricing, /how-it-works, /get-the-app at 390 and 1440, load + scroll). |
| 11 | `node qa/pf-fix3-measure.mjs http://localhost:5461` | Page heights: /organizations 6575 at 390 and 9080 at 1024@150 %; /pricing 5471 and 7219; /care-communities 6337 at 390; /get-the-app 2936 at 390; /join 2620 at 390. The home #book section is 837 at 390. |
| 12 | `grep -rn "Before launch" src` | `home/FoundingBand.tsx:121` (not mounted on home; CHIEF-LOG R-1) and a comment in `kit/PriceLadder.tsx:121`. |
| 13 | Panel pf-3 (5 personas, local dist at 6668713) | Average 7.89. Harold 8.14, Tuan 8.21, Maya 7.93, Denise 7.57, Priya 7.57. Details in `panel-pf.md`. |

Plan acceptance criteria, locally:
- **AC1** passes (check 3).
- **AC2** passes (checks 3 and 9). The thank-you shows only on the stub build.
- **AC3** passes (checks 1 and 5).
- **AC4** passes with a reading: no video, the teaser links to /samples, and home-diff changes only in the hero small print and button, the book and the band.
- **AC5** passes (checks 1, 3, 8 and 10), with copy-check's standing B3 hit.
- **AC6 is not met.**

### Blocked
- **Deploy and the real target:** waiting on Daniel (the list below).
- **AC6, every persona at 8 or more:** waiting on the facts in `panel-pf.md` "Blocked on Daniel". The site can't honestly gain more trust or desire without them.
- **/join CLS:** varies from 0 to 0.087 between runs at 1440, because the serif fonts swap in. The fix (preloading EB Garamond and Cormorant in `index.html`) belongs to the owner of the head (CHIEF-LOG R-2). It was not done tonight.

## What Daniel must do before deploying

1. **Production form path (most important).**
   - **The env:** the GitHub repo variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` must be set. `.github/workflows/publish.yml:38-40` reads them, and `:59` fails the build if the URL is empty.
   - **The insert policy:** in Supabase, `waitlist_signups` needs an RLS policy that allows an `insert` for the `anon` role, with no `select`. The site writes only what `lib/leads.ts:184` sends.
   - **Test on staging:** check one insert on a staging project or a preview before going live. Without this, every invite request ends in "Almost there… Press send".
   - **Send the invites:** someone must actually send the invites. The site promises no timing.
2. **Web-app brief to the phone-app session.** Hand `docs/premium/webapp-invite-only-brief.md` to a session in `C:\Users\nguye\Desktop\phone app\phone-app` (web-app package). That makes `/create-account` invite-only, so strangers see "A Story starts on iPhone" with a button to `astoryapp.com/get-the-app`, while /join, /c/ links, sign-in and book checkout stay as they are. The site already sends no one there. Old `/sign-up` and `/start` addresses still redirect to create-account (`index.html:80-89`, `deploy/cloudfront-viewer-request.js`), so the brief is what closes that path.
3. **Stripe links stay off.** Every entry in `src/lib/checkout.ts` `LINKS` (lines 86-98) is empty, on purpose (the comment at :6-9 explains why). Do not paste Payment Links in until the app grants what was paid for. /pricing says the calls are not on sale yet.
4. **How to deploy `site-premium`.**
   - **Publish path:** astoryapp.com publishes from `main` (S3 + CloudFront, `docs/PUBLISHING.md`; every push to `main` runs `publish.yml`). site-premium is 146 commits ahead of origin/main.
   - **Steps:**
     1. Review the branch.
     2. `git push origin site-premium`.
     3. Open a PR site-premium -> main and look at its preview.
     4. Merge. The workflow builds with the repo vars and uploads.
     5. Run `npm run verify:live`.
   - **After deploying:** check /get-the-app with one real test email on the live site, then delete that row.
   - **If the home film is wanted back** on the live home, say so: it was deliberately left out of site-premium (84a964b), so this deploy takes the home film off the live site.
5. **Optional rulings:**
   - the /pricing "Stop paying" heading (B3);
   - `home/FoundingBand.tsx:121` "Before launch" (not mounted);
   - the policy label `privacy.tsx:97` ("Not even us");
   - font preloading for /join CLS.

## What still keeps a persona under 8 (panel pf-3)

All 7 cells under 8 are trust or desire.

- **Maya 7.93** (trust 7, desire 7.5):
  - On plain dist she saw the email fallback, not a thank-you (production env, item 1 above).
  - There is no real family or tester voice.
  - /pricing can't say what a beta family pays (blocked).
  - There is nothing to give as a gift (blocked).
  - The hero small print has low contrast over the photo (fixable, but it is home's hero, which is frozen: next session).
  - Home on a phone is about 9,000 px.
  - The /get-the-app email field reads as a hairline.
- **Denise 7.57** (trust 6, desire 7):
  - HIPAA/BAA and the consent of a resident who cannot decide alone are deferred to the demo.
  - There is no named security practice and no pilot or reference community.
  - There is no organization price.
  - "An iPhone for the calls, today" doesn't fit memory care, and shared devices are "ask on the demo".
  - /care-communities is 6,337 px on a phone.
- **Priya 7.57** (trust 6.5, desire 6):
  - There is no archival practice on the site: deed of gift or release, OHMS or Dublin Core, transcript formats, IRB, accessibility statement.
  - The storyteller's right to "delete it all" conflicts with institutional custody.
  - She can't use her own interview questions, and there is no in-person or studio mode.
  - There is no institutional proof.
  - The /organizations sample is a family book.
- **Harold 8.14** and **Tuan 8.21** are at 8. Their remaining notes:
  - Harold: iPad and landline, call length, a phone number.
  - Tuan: `/join?code=` not prefilled, time per addition, voice additions, a real voice.

Fixable without Daniel, for a next session:
- `/join?code=XXXXXX` prefilling the box, once the real invite-link shape is confirmed (the /join flow was frozen tonight);
- hero small-print contrast (frozen home hero);
- a visible box on the /get-the-app email field;
- "Programs & grants" filed under Company in the footer;
- the /join and /how-it-works lengths at 150 % text.

## Chief's assumptions (Daniel asleep)

- **The goal:** "at least 8" is read as every persona's average at 8 or more (plan AC6). It is reported as not met rather than pushed with invented facts.
- **AC4 home-diff** is read as a pass. The script prints FAIL because the book and the band were meant to change. Outside the hero button and small print, the book and the band, the only changed pixels at 390 are the lazy-print noise logged since round 3, and 1440 has none.
- **The 22 sweep findings** are the same set as at 894f4b1. None of them is horizontal page overflow.
- **The uncommitted CHIEF-LOG additions** are the chief's fix 2 and fix 3 briefs and the pf-fix3 builder's R-1 to R-3 requests. They are committed with this report.
- **`src/pages/site/Families.tsx`:** its earlier uncommitted 2-line edit was identical to pf/b, which is merged. The saved diff (`…\scratchpad\families-local.diff`) holds nothing that is not already in HEAD.
