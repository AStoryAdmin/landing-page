# Juror 4 (YC partner): the branch is close, but the live site still fails

Read-only audit, 23 October 2026, about 22:00. I judged the dev server at http://localhost:5191 with headless
Playwright at 1366x768, 1920x1000 and 390x844, and checked live https://astoryapp.com with GET requests only.
I checked the facts against PITCH-PLAYBOOK.md, ABOUT-ME.md, `src/lib/pricing.ts`, `founding.ts`, `product.ts`
and `seo.ts`. I submitted no forms and opened no payment page.

**Verdict: FAIL.** The partner will open astoryapp.com, not localhost. Live still runs the old bundle
(`assets/index-BPTCxeNC.js`), and `/pricing/` and `/our-story/` answer HTTP 404 with the home title. On the
branch itself, the 10-second test passes and most of the earlier should-fixes are closed. Still open: the site
never says why now, the product is only shown through mockups and fictional families, and the "voice" promise
contradicts the "in development" labels.

| Axis | Score | One line |
|---|---|---|
| Clarity in 10 seconds (what, for whom, who pays) | 8 | The hero says "an AI biographer that calls your parents and grandparents". The price line ("Guided calls from $119 a year") only appears at the bottom of Home. |
| Product is real (shown, not described) | 6 | Good mockups: the call screen, the card, the transcript and a book you can flip through. But every person is a fictional sample, there's no audio, no real screen recording, and voice is "in development". |
| Why now | 3 | No page gives a reason it's possible or urgent now: not voice AI cost, not AI use among older adults, not the aging country. |
| Team | 6 | /our-story has two good founder notes with the correct titles (CEO; COO & CTO) and LinkedIn links. There are no credentials, no photos, no place (Ann Arbor / Michigan), and no founder on Home. |
| Claims: correct and consistent | 6 | Prices, the 547 questions, programs and titles are right. Still wrong: "the voice" is promised while also marked in development, pricing still says "The 25 founding places", and the FAQ says the storyteller must install the app while /compare and /programs say they won't need one. |
| Looks like a company that ships | 7 on the branch, 3 live | The branch is crafted and coherent, and "Start free" goes into a working app. The live site is an older build that 404s on every inner page. |
| Nothing embarrassing (placeholder, 404, dead end) | 4 | Branch: no console errors, no placeholders, no sideways scroll at 390. Live: 23 of 24 sitemap URLs return 404 (re-checked tonight: `/pricing/` 404, `/our-story/` 404, home 200). |

PASS needs every axis at 8 or above and no blocker. The live 404s are a blocker, and three axes are under 8.

---

## Status of the earlier audit (YC-READINESS-2026-10-23.md)

| Item | Status | Evidence tonight |
|---|---|---|
| B1 live site is an old build | **OPEN** | The live home still loads `index-BPTCxeNC.js` |
| B2 inner pages 404 live | **OPEN** | `curl -L https://astoryapp.com/pricing/` → 404, 4,446 bytes, home title |
| B3 `dist/` has no Supabase and is stale | Closed, but rebuild before upload | `dist/index.html` was built at 21:46. `supabase.co` is in `dist/assets/auth-*.js`. `dist/our-story` says "Co-founder, COO & CTO". It still holds "25 founding" (S10), so rebuild after the fixes below. |
| S1 Start free can't give the call | Closed, one gap left | Hero, /pricing, /how-it-works and /reserve all say "calls ring on iPhone in our private beta". "No app to open" is gone. The gap: FAQ "To be called, yes [install]" vs /compare "Your parent won't use an app" and /programs "people who will never download an app" (fix 4). |
| S2 voice promised and "in development" | **OPEN** | `kit/PriceLadder.tsx:274` "and the voice that come of each one"; `faqData.ts:9,42` "voice highlights"; `HowItWorks.tsx:704` "the voice, and who told it"; Organizations lead "in their own voice". The same site still labels voice "in development". |
| S3 hardcover "with every plan" | Closed | Pages now say "Individual, Family and Express include a Classic Hardcover" and "once ordering opens". Only a code comment remains (`Pricing.tsx:12`). |
| S4 Deepgram 404 | Closed | `seo.ts` and /programs use `deepgram.com/startup-program` |
| S5 usage badges | Closed | "Recommended"; no "Most chosen"; /compare says "Four reasons to choose A Story"; /organizations says "A program can begin…" and its meta says "can use A Story". A stale comment remains at `landscape.ts:422`. |
| S6 620 questions | Closed | The site shows 547 everywhere (`product.ts` uses `bank.questions`) |
| S7 hero never says AI / intro delay | Closed | The hero sub says "AI biographer". The intro was cut from Home. |
| S8 "Hear a conversation", samples unlabeled | Mostly closed | Home says "Read a sample call", "our sample family" and "sample book". Still open: /how-it-works "Watch a call" (there is no video) and the unlabeled Rosa 84 / Errol / Joan. The old `home/Hero.tsx:228` "Hear a conversation" is dead code; Home no longer imports it. |
| S9 legal name in footer | Closed | "© 2026 A Story Technologies, Inc." |
| S10 founding offer still live | **Half open** | /reserve is closed ("The founding places are filled - thank you"). /pricing still says "The 25 founding places are taken" (`kit/PriceLadder.tsx:318`). |
| S11 the 2 November date goes stale | **OPEN** (calendar) | The /reserve meta description still bakes in "if you reserve by 2 November" (`Reserve.tsx:925`). |
| Nice: Contact naming | Closed | /contact says "DANIEL HOANG NGUYEN, CO-FOUNDER AND CEO" |
| Nice: dead App Store link | Open (dead code) | `home/CodeFromFamily.tsx:18` |

---

## Ranked fix list

| # | Sev | Page | What | File | Exact fix |
|---|---|---|---|---|---|
| 1 | Blocker | every live page | Live is the old build. Inner pages 404, the CTO title is missing, and there's no "Start free" | deploy | Make fixes 2-3 first. Then `npm run build` with `.env.production`, upload all of `dist/`, attach `deploy/cloudfront-viewer-request.js`, and run `npm run verify:live`. Check that `curl -I https://astoryapp.com/pricing/` returns 200 before the application goes in. |
| 2 | High | /pricing, Home FAQ, /how-it-works, /organizations | "Voice" is promised and also labeled "in development". A partner will ask "can I hear one?" | `kit/PriceLadder.tsx:274`, `faqData.ts:9` and `:42`, `HowItWorks.tsx:704`, `Organizations.tsx:530` and `:51` | PriceLadder: "…and the card and the transcript that come of each one." faqData:9: "…readable memory cards and full transcripts." faqData:42: drop ", and voice highlights are kept as audio". HowItWorks:704: "the date, the chapter, and who told it". Organizations lead: "You keep their words, and a book when you want one." Card title: "Alumni, in their own words." |
| 3 | High | /pricing | "The 25 founding places are taken" still names the number | `kit/PriceLadder.tsx:317-318` | "The founding places are filled." (drop `{FOUNDING_PLACES}`) |
| 4 | High | /compare, /programs, FAQ | "Your parent won't use an app" and "people who will never download an app" vs FAQ "To be called, yes - you install A Story once". The FAQ also gives no place to get the app (it's on TestFlight). | `landscape.ts:429`, `Programs.tsx:146`, `faqData.ts:17` | landscape: "Your parent won't type." Programs: "For people who would rather talk than type, the only screen is a voice." FAQ: "To be called, yes: A Story rings through its iPhone app, now in private beta. We help set it up. To read or add to the archive, any browser works at app.astoryapp.com." |
| 5 | High | site-wide (best on /our-story) | No why-now. A partner's first question after "what" is "why now". | `pages/site/OurStory.tsx`, new short band above the closing CTA | Three sourced lines in Bao's playbook wording: "Generative-AI use among adults 50+ went from 9% to 30% in two years (AARP 2026)." "11,200 Americans turn 65 every day (Alliance for Lifetime Income)." "Voice AI can now hold a real 15-minute conversation for well under a dollar." The last line is **modeled**: label it, or cut it if Bao prefers. |
| 6 | High | /our-story, Home | The team is a feeling, not a fact. There are no credentials, no photo and no place, and Home never names a founder. | `OurStory.tsx` signature blocks; `home/Close.tsx` | Under each signature, one quiet 13-14px line. Daniel: "Finance researcher" (plus any school or fact Daniel approves). Bao: "MS ECE, University of Michigan · doctoral fellow · startup strategy consultant (miLEAD)". Add small round portraits (DESIGN-TASTE: round portraits, not hero portraits). Home close: "Built in Ann Arbor by Daniel Hoang Nguyen and Bao Vo → Our story". |
| 7 | Medium | /how-it-works, /for-families | "Watch a call" goes to an animated mockup, not a video | `HowItWorks.tsx:649`, `Families.tsx:143` | Rename to "See a call", or link a real 60-90 s screen recording of a beta call (with consent) and keep "Watch". |
| 8 | Medium | /how-it-works | Rosa, 84 / Errol / Joan read like real customers, and only the collapsed footer says they're fictional | `HowItWorks.tsx` (the Rosa/Errol/Joan tabs section) | One small kicker above the tabs: "Sample calls". Home already does this for Ruth ("our sample family"). |
| 9 | Medium | Home, /our-story | No real product evidence: zero traction and no real screen | `OurStory.tsx` or `home/Close.tsx` | Bao's call (see the decision below). The approved, honest line: "In private beta with 10 families." Never "customers". Optionally, one real app screenshot from the TestFlight build beside the HTML card mockup on Home ("In the app"). |
| 10 | Medium | /pricing hero | The lead reads "Every account starts on Free - No card and no clock…" (capital after the dash), the phrase "never charged by the person" is unclear, and the right half of the hero is empty at 1366 | `Pricing.tsx:842`, `pricing.ts:180` | `lead={\`${START.detail} Family, writing and reading are never charged per person. Prices in US dollars; calls ring on iPhone in our private beta.\`}`. Put the price ladder or the $0 / $119 / book trio in the empty right column. |
| 11 | Medium | /programs | "In very good company", plus a grand line under NVIDIA ("The most important thing AI will ever do…") that reads like NVIDIA said it. Partners know these programs are credit programs anyone can apply to. | `Programs.tsx:336`, `:62` | Title: "Startup programs and grants." Under each program, say what it is or gives (e.g. "Member since October 2026 · GPU credits and support"; check each perk before writing it), not a slogan. |
| 12 | Low | /reserve meta | "if you reserve by 2 November" is baked into prerendered HTML | `Reserve.tsx:925` | Calendar a rebuild and publish for 3 November, or drop the date from the meta description. |
| 13 | Low | Home (dead code) | Dead App Store link (404) and the unused old hero with "Hear a conversation" | `home/CodeFromFamily.tsx:18`, `home/Hero.tsx` | Delete the unused `Hero.tsx`, and point the App Store constant at TestFlight or remove it until the listing is live. |
| 14 | Low | /pricing book editions | "Ships in 7-10 days" on editions that can't be ordered yet | `Pricing.tsx` (editions grid) | Add "Ordering opens soon" in each card's footer, or say "Will ship in 7-10 days". |
| 15 | Low | stale comments | `landscape.ts:422` and `Compare.tsx:11` still say "Why families switch" | comments only | Update them so the next editor doesn't put the old kicker back. |

## What to add or cut to help the application (within honesty)

- **Add a one-liner partners can copy**, in the meta and OG card: "An AI biographer that calls your parents, and the whole family adds their part." It's the playbook sentence. The home OG card still never says what A Story is.
- **Add a demo link**: a 60-90 s unlisted screen recording of one real beta call (with consent), linked from "See a call". It answers "is it real?" in one click.
- **Add a founders line on Home** and credentials on /our-story (fix 6).
- **Add one why-now band** with sourced numbers (fix 5).
- **Cut the "voice" promises** until voice ships (fix 2), and the leftover "25" (fix 3).
- **Keep:** the private-beta line by every CTA, "Recommended", 547, the programs disclaimer, the legal name in the footer, and the footer note that the examples are fictional. These are the honest choices a partner respects.

## Decisions only Bao can make

1. **Show traction on the site?** Recommended: one quiet line on /our-story, "In private beta with 10 families." It's approved (playbook §3), and it turns "a nice site" into "a product people use". Leave 50 leads and the 5 waiting for the application form.
2. **Why-now numbers on a consumer site?** Recommended: yes, as one band on /our-story only, not on Home, so Maria never meets a statistic and the partner does.
3. **Deploy tonight?** The project rule is to ask before deploying. Without the deploy, every fix above is invisible to YC.

## Checked and fine

- Prices match `pricing.ts` and the playbook: $119, $229, $79, $19.99, Free, and books at $19/$39/$69/$149/$499. The reserve maths is right ($101.15, $194.65).
- Titles: Daniel Hoang Nguyen, Co-founder & CEO; Bao Vo, Co-founder, COO & CTO (page and JSON-LD). LinkedIn links: `/in/gbaovo/` and Daniel's profile.
- Programs: five, named correctly, with "None of them is an endorsement, an investment or a partnership". The Deepgram URL is fixed.
- Features the site names exist in `phone-app/src`: group calls (`groupCalls.js`), trusted person (`TrustedPersonScreen.js`), letters for later (`LettersScreen.js`) and memoir import (`ImportScreen.js`).
- No console errors on 19 crawled routes. No sideways scroll at 390 (/, /pricing, /our-story, /how-it-works) or at 1920. `/start` goes to `app.astoryapp.com/create-account`.
- No testimonials, user counts or invented traction anywhere.

## Not verified

- Production behaviour after a fresh deploy (`/samples` is a static file that 404s on the dev server, by design).
- Whether the free "ten-minute conversation" can be started by a new iPhone user today (TestFlight access).
- Competitor marks in the /compare table against each competitor's site this week.
- 2560x1300 and zoomed-out windows (Juror 1's remit).
