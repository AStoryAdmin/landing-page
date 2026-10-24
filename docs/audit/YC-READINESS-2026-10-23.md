# YC readiness: the live site is the problem, not the branch

Audit of 23 October 2026 (read-only). Sources: live https://astoryapp.com (GET only), the dev server at
localhost:5191 (branch `site-phase2`, including uncommitted edits to `src/lib/seo.ts` and
`src/pages/site/OurStory.tsx` from another session), `dist/` as built at 21:11 today, and the fact files
(PITCH-PLAYBOOK.md, ABOUT-ME.md, `src/lib/pricing.ts`, `founding.ts`, `seo.ts`).

**Bottom line.** A YC partner opening astoryapp.com tomorrow sees an older build. It has no "Start free" button
and no link into the web app, it shows Bao as "Co-founder & COO", and every page except `/` answers HTTP 404.
The branch fixes most of this. Ship a rebuilt `dist/` (with prerender and the Supabase env vars) tonight, then
fix the claims the product can't back up yet.

## Moves

1. **Rebuild and publish the branch tonight.** Owner: Bao. Date: 23 Oct. Build with `.env` holding `VITE_SUPABASE_URL`
   and `VITE_SUPABASE_ANON_KEY` (the current `dist/` has neither and is stale), upload all of `dist/`, then run
   `npm run verify:live`. Steps are in `docs/PUBLISHING.md`.
2. **Make the call claims match what "Start free" gives today.** Owner: Bao with Daniel. Date: 24 Oct, before the partners look.
   See S1-S3.
3. **Fix the Deepgram link and the unproven badges.** Owner: whoever builds next. Date: 24 Oct. See S4-S6.

## Decisions only Bao can make

- **What does a free sign-up get today?** The web app can't place a call: the browser call is v1.5
  (web-app/docs/PRD.md §6, §15b), and the phone app isn't in the App Store. Recommended: keep "Start free", and
  say in one line by the CTA and on /pricing that calls ring on iPhone in the private beta, while writing, the
  family archive and the book work today in the browser.
- **Label the sample calls on the page?** Rosa, Errol and Joan read like real calls. The only disclosure is a
  collapsed "About the examples" in the footer. Recommended: one quiet kicker, "A sample call", above the
  player. This is one label, not scattered disclaimers.

| Number | Value |
|---|---|
| Live inner pages answering HTTP 404 | 23 of 24 sitemap URLs (all but `/`; `/samples/` is 200) |
| Live HTML size per route | 4,446 bytes, the same title on every page |
| Questions the site claims / the app's bank has | 620 / 547 |
| Broken outbound links | 1 (Deepgram) |

---

## Blockers

### B1. The live site is an old build: no way into the product, and Bao's title is wrong
- **Page:** every page on https://astoryapp.com
- **Evidence:** the live bundle `assets/index-BPTCxeNC.js` has no `app.astoryapp.com` string and no "Start free".
  Every call to action is "Reserve for $1" → `/reserve`, and "Sign in" goes to the site's own `/sign-in`. The live
  `OurStory` chunk says "Co-founder & COO" for Bao. The live `index.html` noscript still says "start as a
  founding family for $29", and live `/samples/` still says "Or start now as a founding family for $29" (the
  founding places closed on 20 Oct). The live header menu lists "NVIDIA Inception, AssemblyAI, Cartesia" under
  Programs, without Google or Deepgram.
- **Why it matters:** a partner can't try the product from the site, and the site contradicts the YC application
  (title, offer).
- **Fix:** publish the branch (B2). Commit the uncommitted `seo.ts` and `OurStory.tsx` edits first, so the CTO
  title ships.

### B2. Every live page except `/` answers 404, with the same 4 KB shell and title (prerender not deployed)
- **Evidence:** `curl -sI https://astoryapp.com/pricing` → `301` to `/pricing/` → `404 Not Found`,
  `X-Cache: Error from cloudfront`, 4,446 bytes. That body is the home shell, titled "A Story - Your Family's
  Living Memories", with canonical `https://astoryapp.com/`. The same holds for all 23 inner routes and for any
  made-up URL. `https://astoryapp.com/pricing/index.html` → 404, so the page files were never uploaded.
  CloudFront's error response serves `/index.html` with the 404 status, and React then draws the right page.
- **Impact:**
  - In a browser the pages look fine after JS runs.
  - Google and Bing treat every inner page as a 404 and drop it. Only the home page can be indexed.
  - A link pasted into Slack, iMessage, LinkedIn or X shows the home title, description and OG image for every
    page, so /pricing and /our-story previews say nothing specific.
  - Anything that checks the HTTP status (YC's link checks, uptime monitors, some email scanners) records the
    pages as broken.
  - The browser console shows "Failed to load resource: 404" on every inner page.
  - Client-side canonicals on the live build point to `/pricing` (no slash), which 301s into the 404.
  - The live `sitemap.xml` (lastmod 2026-10-11) lists the no-slash URLs plus `/samples`, so all but `/` and
    `/samples` resolve to 404.
- **Fix:** run `npm run build` (not `build:shell`) with the Supabase env set, then upload all of `dist/`. Each
  route then has its own `index.html` with its own title and canonical (checked in `dist/`, e.g. `dist/pricing/index.html`
  → "A Story pricing - plans, family participation and books", canonical `/pricing/`). The sitemap in `dist/` already
  uses trailing-slash URLs. Then attach `deploy/cloudfront-viewer-request.js` (PUBLISHING.md step 2) so `/pricing`
  answers 200 without the 301 and `/join/CODE` redirects at the edge.

### B3. Don't upload the current `dist/`: it has no Supabase config and is stale
- **Evidence:** `dist/assets/supabase-*.js` contains only the "Missing VITE_SUPABASE_URL" path, and no `supabase.co`
  project URL (live has `naxvjujewggrwflkvvzc.supabase.co`). There is no `.env` in the repo. `dist/our-story/index.html`
  still says "Co-founder & COO" (built at 21:11; OurStory.tsx changed at 21:29).
- **Impact if uploaded:**
  - The contact form and the institution demo form drop to a mailto, so nothing reaches `demo-request`.
  - `/sign-in?next=/reserve` can't sign anyone in.
  - The Reserve "details" step can't save leads to `waitlist_signups`.
- **Fix:** create `.env` from `.env.example` with the live project's URL and anon key, rebuild, and check
  `grep supabase.co dist/assets/supabase-*.js` before uploading. The GitHub workflow already refuses to publish
  without them, but it is skipped because `AWS_ROLE_ARN` is not set.

## Should-fix

### S1. "Start free" can't give the call the site promises
- **Pages:** Home hero, /how-it-works, /pricing, /your-story, FAQ
- **Evidence:**
  - The hero says "A Story calls someone you love". How it works says "Their phone rings. No app to open, no
    typing, no password."
  - Free lists "One ten-minute conversation with A Story, to begin" (`pricing.ts` FREE_TIER, START).
  - The web app can't place or receive a call: the PRD says "Talk on the web points at the phone… the live
    conversation in the browser is v1.5" (web-app/docs/PRD.md rows 6 and 15b), and "the browser cannot ring
    anyone" (PRODUCT-DECISIONS.md §3).
  - The phone app isn't publicly available (playbook: TestFlight, App Store in review; the live /reserve says
    "Coming soon to the App Store").
  - The FAQ admits the storyteller must install the app ("To be called, yes"), which contradicts "No app to open"
    and gives no place to get it.
- **Fix:** add one line next to the hero and pricing CTAs, e.g. "Calls ring on iPhone in our private beta;
  writing, the family archive and the book work today in your browser." Change "No app to open" to "Nothing to
  type" (`HowItWorks.tsx` step 02). Keep the free first conversation in copy only once it works on the web, or
  label it "on iPhone".

### S2. "Voice" is promised and also marked "in development"
- **Evidence:** the /pricing and home price block say "the card, the transcript and the voice that come of each
  one". The FAQ says "voice highlights are kept as audio" (`faqData.ts`). The same pages label "Voice · in
  development" (`home/Listen.tsx:492`, `HowItWorks.tsx:175, 392`).
- **Fix:** drop "and the voice" from the price block (`kit/PriceLadder.tsx`) and the FAQ answer, or remove the
  "in development" labels if voice ships.

### S3. "A Classic Hardcover comes with every plan", but printed ordering isn't open
- **Evidence:** `home/FamilyBook.tsx:1399` and `HowItWorks.tsx:1262` say "a Classic Hardcover comes with every
  plan". In `pricing.ts`, Monthly gets the Digital Edition only and Free none. `BOOK.opens` says printed ordering
  "opens soon", the pricing page says "Ordering opens soon", and the PRD says printed ordering is off until a printer
  is set up. Plans themselves are not sold on the web yet (/pricing).
- **Fix:** "Individual, Family and Express include a Classic Hardcover" (the wording /pricing already uses), and
  add "printed ordering opens soon" wherever a hardcover is promised.

### S4. The Deepgram link is a 404
- **Page:** /programs (and Organization JSON-LD on every page)
- **Evidence:** `https://deepgram.com/startups` → 404. Deepgram's own nav links `/startup-program` → 200.
- **Fix:** change the URL in `src/lib/seo.ts:194` and `src/pages/site/Programs.tsx:104` to
  `https://deepgram.com/startup-program`.

### S5. Usage badges with no usage behind them
- **Evidence:**
  - /pricing, Individual card: "MOST FAMILIES" (`Pricing.tsx:817`), and its blurb "The one most people want"
    (`pricing.ts:108`). Plans aren't on sale yet.
  - /pricing book editions, Classic Hardcover: "MOST CHOSEN" (`pricing.ts:270`). No printed book can be ordered yet.
  - /compare: section kicker "Why families switch" (`Compare.tsx:209`, `landscape.ts:422`). No switching data exists.
  - /organizations: "Most programs begin with one class, one floor or one team" (`Organizations.tsx:95`), and the
    meta description "Colleges, care communities, libraries and organizations use A Story…"
    (`Organizations.tsx:488`). No institutional customer is an approved fact.
- **Why:** a partner reads these as traction claims. Approved traction is only the owner-reported 50 leads, 10 beta
  families and 5 waiting (playbook §3).
- **Fix:**
  - "Recommended" instead of "Most families".
  - Drop "Most chosen", or use "Our pick".
  - "Why choose A Story" instead of "Why families switch".
  - "A program can begin with one class, one floor or one team."
  - "…can use A Story to record…" in the organizations description.

### S6. "620 questions" is more than the app has today
- **Evidence:** `product.ts:29` sets `QUESTION_COUNT = Math.max(bank.questions, 620)`. The generated count from the
  app is 547 (`questionBank.json`), and the comment there says bank v2 "is not in web-app/ or phone-app/ yet". The
  site shows "All 620 questions" on every plan card and in the FAQ.
- **Fix:** ship bank v2 to the app before the partners look, or show the generated 547 until it lands.

### S7. The hero never says "AI", and doesn't match the pitch line
- **Evidence:** hero h1 "Most of a life goes undocumented." with the sub "A Story calls someone you love, listens,
  and follows up…" (`home/Hero.tsx`). The playbook's one sentence is "An AI biographer that calls your parents, and
  the whole family adds their part." On a first visit, a 5-second teal intro (`index.html` inline script and
  `home/Intro.tsx`) plays before the hero. It can be skipped, but it delays the one-liner.
- **Fix:** put "An AI biographer that calls your parents" in the hero sub or kicker. Consider skipping the intro
  for visitors coming from a link (any `document.referrer`), or shortening it.

### S8. "Hear a conversation" has nothing to hear, and the sample calls aren't labeled on the page
- **Evidence:** the hero secondary link "Hear a conversation" → `/#listen` (`home/Hero.tsx:228`). The section is
  text only, with no audio (`home/Listen.tsx`, and "Voice · in development"). Rosa, Errol and Joan appear with ages and
  "A Story follows" turns. The fiction disclosure sits only in the footer's collapsed "About the examples". The
  samples band reads "See a real book. Three fictional families."
- **Fix:** rename the link "Read a call" or "See a call". Add one kicker, "A sample call", to the player. Change
  "See a real book" to "See a sample book". The footer disclosure itself is good: "Photographs are AI-generated
  illustrations. Names and conversations in the demonstrations are fictional, not customer testimonials." No page
  presents the Hartleys or Rosa as customers, and there are no testimonials or traction numbers anywhere
  (grep checked).

### S9. The legal company name is missing from the footer
- **Evidence:** the footer says "© 2026 A Story · A story of you, by you, and yours" (`pages/site/Footer.tsx`).
  "A Story Technologies, Inc., a Delaware corporation" appears only inside /privacy and /terms. Both are current
  ("Last updated: October 18, 2026").
- **Fix:** "© 2026 A Story Technologies, Inc." in the footer bottom line.

### S10. The founding offer is still described as a live choice on /reserve and /pricing
- **Evidence:**
  - /reserve keeps the full $29 card (marked FILLED), plus a "Which one is yours? … $29, Founding, if you would
    rather start now" block that ends "The founding places are filled."
  - /pricing says "The 25 founding places are taken", while /reserve and the home band say "filled" with no number
    (the ruling in commit d877836).
  - /reserve also says "We open a few families at a time", while the same page says "Anyone can start A Story free
    in a browser".
- **Fix:** collapse the founding card to one line ("The founding places are filled - thank you") and remove the
  "$29" half of "Which one is yours?". Drop "25" from `kit/PriceLadder.tsx:313`.

### S11. Static copy for 2 November will go stale
- **Evidence:** the deadline line flips in the browser (`founding.ts` deadlineLine). But the /reserve meta
  description ("15% off your first year if you reserve by 2 November", in `Reserve.tsx:823` and the prerendered
  HTML) and every prerendered snapshot keep the old wording until the site is rebuilt.
- **Fix:** put a rebuild and publish for 3 November in the calendar, or keep dates out of meta descriptions.

## Nice

- **Contact naming.** /contact says "Daniel Nguyen, co-founder and CEO" (`Contact.tsx:237`); everywhere else it is
  "Daniel Hoang Nguyen".
- **Two contact addresses.** Site contact is `daniel@`, legal and noscript use `contact@` (`index.html:108`). MX
  records are Google Workspace. I did not test whether `contact@` is a monitored inbox.
- **NVIDIA date.** "Member since October 2026" (`Programs.tsx:58`): confirm the acceptance month. The playbook
  lists it as accepted by 14 Oct.
- **404 page canonical.** The page sets canonical `https://astoryapp.com/404/`, a URL that doesn't exist. It is
  noindex, so leave out the canonical. After the prerender deploy, an unknown URL first paints the prerendered
  *home* HTML (CloudFront serves `/index.html`) before React swaps in the 404 page. A `dist/404.html` set as the
  CloudFront error page would avoid the flash.
- **Contact OG image.** /contact reuses `og/our-story.jpg` (`sitePages.json:135`).
- **OG card.** `og/home.jpg` renders (1200×630, logo, "Every family has more to tell", photo). The kicker reads
  "HOME" and the card never says what A Story is. Consider "An AI biographer that calls your parents".
- **Dead App Store link.** `home/CodeFromFamily.tsx:18` links `https://apps.apple.com/app/id6787438875` → 404. It
  only renders with `?ref=`, which `index.html` now redirects to the app first, so it is effectively dead code.
- **Small text in mockups.** Phone status bars and the open-book mockup render 7-10px text ("9:41", "Later /
  Answer", "1952 - STILL BEING WRITTEN"). These are mockups, but they break the 12px floor.
- **Dev server /samples.** `/samples` shows the 404 page on the dev server because it is a static file in
  `public/samples/index.html`. Production serves it, so this is fine to leave.
- **Hard-coded lastmod.** `sitemap.xml` lastmod is fixed at `2026-10-18` (`scripts/gen-seo-files.mjs:9`).
- **Font preload warnings.** Every live page logs two "preloaded but not used" warnings for the woff2 files
  (`index.html:46-47`).
- **Generic web app title.** The web app's `<title>` is just "A Story" on every route (app.astoryapp.com).

---

## Checked and fine

**Links.** The dev server crawl covered 26 rendered pages, about 90 unique hrefs.
- Header and footer go to all 15 marketing routes, plus "Sign in" (`https://app.astoryapp.com/sign-in`, 200)
  and "Start free" (`https://app.astoryapp.com/create-account`, 200).
- `/start` and `/sign-up` leave for the app, as intended.
- Every in-page and cross-page anchor resolves (`/#listen`, `/pricing#book`, `/how-it-works#calls`,
  `/organizations#book`, `/care-communities#begin-title`, `/for-families#your-own-story`, `#s1-#s24`, `#part-1-3`).
  `/samples#carolyn|raymond|tom` is handled by the samples page's own script.
- Contact goes to `mailto:daniel@astoryapp.com`.
- External links return 200: nvidia.com/en-us/startups, startup.google.com, assemblyai.com, cartesia.ai and
  oralhistory.org. LinkedIn answers 999 to bots, which is normal. Deepgram is the one 404 (S4).
- I found no loops.

**Reserve.** "Reserve for $1" opens CheckoutDetails (name, email, optional phone, written to
`waitlist_signups`), then goes on to the Stripe Payment Link `buy.stripe.com/dRme…` with `prefilled_email` and
`client_reference_id`. **Bao confirmed this checkout works himself (verified by Bao).**
- The founding link `buy.stripe.com/fZu4…` answers HTTP 200 on a plain GET. Stripe serves the same shell whether
  or not a link is active, so the status can't tell whether it was switched off as `founding.ts` asks. Check it in
  the Stripe Dashboard.
- No payment page was opened in the browser.

**Facts.**
- Prices match `pricing.ts` and the playbook everywhere: Individual $119/yr, Family $229/yr, Express $79, Monthly
  $19.99, Free $0, books $19/$39/$69/$149/$499.
- The reserve maths is right: $101.15, $194.65, $59.50, $114.50 and $30.50.
- Founders on /our-story and in the JSON-LD: Daniel Hoang Nguyen (Co-founder & CEO) and Bao Vo (Co-founder, COO &
  CTO, uncommitted).
- The five programs are named correctly, with the disclaimer "None of them is an endorsement, an investment or a
  partnership".
- The deadline "2 November" is 10 days out and correct.
- There are no testimonials, user counts or invented traction (the badge wording in S5 is the exception).

**Trust basics.**
- Privacy and Terms are current (18 Oct 2026, A Story Technologies, Inc., Delaware).
- There is no lorem, TODO or placeholder text in rendered pages, and the only `TODO`-like hit is a code comment.
- Contact is in the header, the footer and its own page. Founders appear on Home (Daniel) and /our-story (both).
- The dev server console logged no errors.

**Meta in `dist/`.** Every route has a distinct title, description and canonical with a trailing slash, plus a
route-specific OG image (24 files in `dist/og/`). The favicon SVG, apple-touch-icon and manifest return 200 live.
robots.txt is fine. The sitemap in `dist/` has 24 trailing-slash URLs.

**Mobile at 390 wide.** No page scrolls sideways (19 routes measured). The /compare table scrolls inside its own
container (1060px table in a 350px box). The hero titles on Home and /reserve were still in their line-reveal
about 6-7 s after load on the dev server, then settled fully. I did not measure this on a production build.

## Not verified

- Whether the Free "ten-minute conversation" can be started anywhere today.
- Whether the founding Stripe link is deactivated.
- Whether `contact@astoryapp.com` is read by anyone.
- Screens at 1920, 2560 or zoomed-out widths (only 1366×768 and 390×844 were checked).
- Behaviour after the CloudFront function is attached.
- The dev server was being edited live by another session during the audit (the /compare hero changed between
  two loads), so copy may have moved since.
