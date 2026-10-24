# astoryapp.com review, 23 October 2026: FAIL

Read-only review of branch `site-phase2` (working copy, with the uncommitted edits to `OurStory.tsx` and
`lib/seo.ts` that a builder was making during the review). Judged against `design.md`, Bao's
DESIGN-TASTE, WORKING-STYLE and WRITING-VOICE, and the two 18 October audits. Items those audits
raised that are now fixed are not repeated. Items they raised that are still open are marked
**(still open from 18 Oct)**.

## Bottom line

The big scenes are good: the hero, "It's the everyday", the three calls and the Hartley book. Around
them the site has grown long, says the same thing again and again, and makes claims the product
can't back yet. Home is 19.5 laptop screens (25 on a phone) against the 14 that `design.md` set. Fix
first: cut Home hard, take out the unproven claims, fix the crushed price units, and use the width
of a big screen.

| Number | Value | Why it matters |
|---|---|---|
| Home length | 19.5 screens at 1366×768, 25.3 at 390×844, 2,188 words | `design.md` target: about 14 screens and 1,400 words |
| Content width at 2560 | 1,440 px, which is 56% of the screen. Display type stops growing at 84 px from 1920 up | "Use the screen" |
| Questions claimed | 620 on Pricing, Questions and the plan cards. The app ships 547 | The 620 is typed by hand into `lib/product.ts` |
| Price-unit letter-spacing | −1.49 px on 16 px text | "nocard,noclock" shows on Home and Pricing at every size |

## How it was checked

- Pages: headless Chromium (Playwright 1.63) at 1366×768, 1920×1000, 2560×1300 and 390×844
  (mobile, touch). I covered all 18 public routes, two guides, `/samples/index.html` and the 404 page:
  80 page-views in all. I scrolled each page to trigger its reveals. Then I measured height, words,
  overflow, text under 12 and 13 px, uppercase text, headline line counts, tap targets, images and
  hidden text. I took a full-page screenshot of each.
- Probes: the home intro's timing (fresh session), the price ladder's computed styles, and the text
  left hidden on How it works. The hidden text is only the phone's alternate screens, which is by
  design.
- Web app: the signed-out front door at app.astoryapp.com (`/`, `/sign-in`, `/create-account`) at
  1920 and 390, compared on faces, buttons, ground and copy.
- Evidence (screenshots, `rows.json`, scripts) is in
  `C:\Users\vngia\AppData\Local\Temp\claude\C--Users-vngia-OneDrive---Umich-Desktop-My-startups-A-Story---W-Daniel-Web-App-Ver-Daniel-09212026\04cff20b-3776-4df6-bd0d-d6b89954a7b3\scratchpad\review1023\`.
  Files are named `s\<vp>__<page>__pN.jpg`.
- **Not verified:**
  - I tested the Vite dev server (port 5188, same folder as 5191), not the prerendered build. On it,
    `/samples/` falls through to the 404 page, which is a dev-only effect. I checked
    `/samples/index.html` directly.
  - A real browser-zoomed window was not tested. The 2560 run stands in for it: 1920 at 67% gives a
    2866-wide CSS viewport.
  - I did not test hover, focus or keyboard states, or reduced motion.
  - I submitted no form and did not sign in to the app. The app's signed-in screens were not compared.
  - Product claims ("up to four phones on one call", "Call Grandpa from the app", the Sunday email,
    the trusted person, letters for later) were not tested in the app. They are flagged as needing a
    check, not as false.
- Note: http://localhost:5174 serves Project Reboot, not this site.

---

## Ranked punch list

Severity: **P0** = wrong or broken, or the founder named it. **P1** = a clear rule from the standard is
broken. **P2** = polish.

### P0

**1. Home is too long and says the same thing three times.** Home (`Home.tsx` and `home/*`), all sizes.
- Measured: 19.5 screens at 1366, 18.2 at 1920, 25.3 on a phone. That is 2,188 words against
  `design.md`'s ~14 screens and ~1,400.
- Repeats on the page:
  - The book appears three times: `FamilyBook` (the Hartley book), `SampleBooks` ("See a real
    book") and `Proof` step 3 ("A printed book is Volume I" plus "Three sample books are here to
    turn"). Four links to /samples.
  - "The family adds their side" runs three sections in a row: `EveryVoice` ("Every memory has more
    than one witness"), the "One life. Many witnesses." band, then `FamilyLoop` ("One person tells
    it. The family fills it in.").
  - Two near-identical rows of three cropped screens with roman numerals: `StepOne` (I/II/III with
    YOU/THEM/EVERYONE) and `FamilyLoop` (I/II/III).
  - The price ladder says "only the calls are paid for" three times: headline, lede and closing line.
- Breaks: Never (repeating the same promise), Layout (compact), "less text" in `design.md`.
- **Fix (cut, don't polish):**
  - Delete `StepOne` from Home. How it works already owns the steps.
  - Delete `Proof` step 3, the book part.
  - Fold "One life. Many witnesses." into `EveryVoice` as its last line, or delete it.
  - Delete `FamilyLoop` from Home. The sharing story is told by `EveryVoice`.
  - In `PriceLadder`, keep the headline and drop the closing paragraph.
  - Target: Hero → everyday → the photograph can't → book (Hartley, with the sample covers as its
    "open another" row) → calls → one memory, raw and tidied → witnesses → founders → price → close.
    That is about 12 screens.

**2. "You do step one. That's the whole job." looks broken.** The founder named it. `home/StepOne.tsx`,
all sizes. Screens `s\d1366__home__p1.jpg` and `s\d2560__home__p1.jpg`.
- Three app screenshots sit in tiles of three different grounds: sand, chocolate and yellow
  (`.shot`, lines 84–120).
- Each screen is cut mid-element at the top, for example "Grandmother · born 1945" sliced in half,
  and the app's 16 px text renders at about 6 px. The 860 px-wide `/app/*.webp` files are shown at
  about 330 px.
- The roman numeral sits at the left and an uppercase YOU/THEM/EVERYONE floats at the far right.
- Hairline dividers run past the tiles, and the 15–17 px grey captions are smaller than the tiles'
  own detail.
- The headline takes the left half and leaves the right half empty at 1920 and 2560.
- The second tile shows the app string "Listening — just start talking", with an em dash.
- Breaks: Never (three cards with icons, form-like); the 12 px floor; no orphans or patchiness.
- **Fix:** remove it from Home (item 1). If a steps beat must stay, make it one line under the hero
  ("Set it up once. They answer the phone. The family keeps it."), with no screens.

**3. Claims the product can't back yet.** Facts are never invented. Pricing, Questions, Home, How it
works, Organizations.
- **"620 questions"**:
  - Where: plan cards, the compare table, "Every paid plan includes all 620 questions".
  - `lib/product.ts:28` sets `QUESTION_COUNT = Math.max(bank.questions, 620)`, and the comment admits
    v2 "is not in web-app/ or phone-app/ on GitHub yet". The app ships 547 today
    (`questionBank.json`).
  - The file's own rule: "do not type the number by hand".
- **"A Classic Hardcover comes with every plan"**:
  - Where: `home/FamilyBook.tsx` (closing line) and `HowItWorks.tsx` (the volume section).
  - Monthly gets only the Digital Edition and Free gets none (`pricing.ts`, and Pricing's own "With a
    plan" box).
- **Popularity badges while nothing is sold**:
  - "Most families" (`Pricing.tsx:817`), "Most chosen" on the Classic Hardcover (`pricing.ts:270`),
    "The one most people want" (`pricing.ts:108`).
  - Plans "are not sold on the web yet" and book "Ordering opens soon".
- **"Most programs begin with one class, one floor or one team"** (`Organizations.tsx:95`): no
  programs have run yet.
- **Need a check in the app before they stay:**
  - "Up to four phones on one call" (`Families.tsx:271`, `HowItWorks.tsx:87`, `home/EasiestWay.tsx:50`)
  - "Call Grandpa from the app" (the phase-1 report could not confirm it)
  - the Sunday email (`kit/MoreWays.tsx`)
  - "Member since October 2026" for NVIDIA (`Programs.tsx:58`)
- **Fix:**
  - Show the shipped count (547) until v2 is in the app, or say "over 500".
  - Change "every plan" to "every yearly plan and Express".
  - Delete the three popularity badges and the "most programs" line.
  - Confirm the four features or cut them.
  - `pricing.ts` and `product.ts` are guarded files, so the number and badge copy are Bao's call
    (Decision 1).

**4. The price units are crushed into one word.** `kit/PriceLadder.tsx:102` (`.price span`), Home and
Pricing, every size.
- "no card, no clock", "a year, one storyteller" and "to print at home, every page" render as
  "nocard,noclock".
- Cause: `.price` sets `letter-spacing: -0.03em` on 50–64 px type. The span inherits it as −1.49 px
  and sets no spacing of its own. Measured: computed letter-spacing −1.48674 px, font 16 px Figtree.
- **Fix:** add `letter-spacing: normal` to `.price span`.

**5. The site doesn't use a big screen.** **(Still open from 18 Oct.)** Every page at 1920 and 2560,
and a zoomed-out window.
- The frame is capped at 1440 px (`kit/kit.styles.ts`, `width: min(1440px, …)`). Text spans x
  240–1680 at 1920 and x 560–2000 at 2560.
- Display type stops at 84 px (116 px for the largest) from 1920 up, so 2560 is the 1920 page
  shrunk into the middle.
- Our story's letters are 760 px wide on a 2560 screen, 30% of it.
- Pricing's hero and Home's section heads leave the right half empty at 1920.
- **Fix:**
  - Let the frame grow to about 1680–1760 px, with fluid gutters.
  - Scale the display tokens with `min(vw, svh)` above 1920.
  - Use the width with columns, not just bigger type: the Our story letters side by side, and Pricing
    ladder plus cards in one row.

**6. Our story is long, repeats itself and has no picture.** The founder named it. `OurStory.tsx`
(being edited).
- The H1 is 4 lines at every desktop size (116 px in a 920 px box). It was flagged on 18 Oct and is
  still open.
- The italic deck under it is a copy of Daniel's first paragraph, with the facts drifting: "same
  year" in the deck, "within months of each other" in the letter.
- Daniel's letter uses "I had never thought to ask." twice: as its title and as the pull line.
- Bao's working-copy letter (about 110 words now):
  - Its title "What stayed in that room." repeats its own highlighted line.
  - It ends on a not-X slogan, "A family is not a résumé. A life shouldn't become one…", a banned
    construction.
  - It carries two highlighter `<mark>`s, which act as decorative emphasis.
- Both founders are shown as tinted circles with an initial (Never: tinted shapes with an initial
  for a person). The page has no photograph at all, which makes it text-heavy.
- It ends on two calls to action back to back: "A family archive is never finished" plus Start free,
  then the closing Invitation plus Start free. Flagged on 18 Oct and still open.
- **Fix:**
  - H1 on 2 lines (wider box, `text-wrap: balance`).
  - Delete the deck.
  - Delete Daniel's repeated pull line.
  - Set the two letters side by side from 1280 px up.
  - Use small round portraits, or one real family photograph each, if the founders supply them.
    Never big posed portraits.
  - Delete the `Together` block.
  - Use the condensed letter below, in Bao's voice. It keeps every fact and adds none.

> **Most of it stayed in that room.**
>
> In my family, a story never belonged to one person. Someone started it at dinner. Someone else cut in,
> because they remembered it differently. Then dinner ended, the photographs went back in the drawer,
> and most of it stayed in that room.
>
> Both of my grandfathers were soldiers during the Vietnam War. My parents built a life in Saigon from
> almost nothing. I know what happened. I don't always know what it felt like.
>
> A Story is how my family keeps that. My parents only have to talk.
>
> Bao Vo · Co-founder, COO & CTO

(About 85 words. Facts from the earlier, longer letter. No marks, no pull line. Close on why it
matters.)

### P1

**7. Pricing says everything three or four times.** `Pricing.tsx`, 10.4 screens and 1,727 words at 1366.
- Free is explained five times:
  - the hero lede
  - the ladder's "$0" column
  - the ladder's closing line
  - the "Free · $0" strip under the cards
  - the paragraph under the table
- The paragraph under the table is the hero lede word for word, flagged on 18 Oct and still open.
- Books are explained three times: the ladder column, the table row, and the 6-card book section.
  "Printed when it is worth holding" and "Printed when a chapter is worth holding" both appear.
- "A printed book is Volume I. The archive goes on…" is Home's `Proof` copy again.
- The decision bar says "reserve for $1 by 2 November and hold 15% off" in its sub-line, then again
  in its link.
- The book mockup's cover reads "Family name", a template placeholder.
- The "With a plan" box sits alone on a half-width row (an orphan).
- **Fix:**
  - Ladder, then plan cards, then the table behind a "See every detail" disclosure.
  - Book editions as one compact row.
  - Delete the Free strip and the under-table paragraph.
  - Put a real family name on the cover.
  - One sentence in the decision bar.

**8. The site doesn't match the app it sends people to.** **(Still open from 18 Oct.)** Every page
compared with app.astoryapp.com.

| | Site | App |
|---|---|---|
| Faces | Source Serif 4 and Figtree | Cormorant Garamond 600, EB Garamond, Montserrat, with Caveat captions |
| Ground | Flat ivory, with near-black `#2A1F18` footer and bands | Chocolate bookcloth with a foil frame and Bond the dog |
| Buttons | Uppercase tracked 13 px pills with a gold coin arrow | Sentence-case Montserrat 16 px chocolate pills |
| Lockup | Teal A plus gold "Story" | Ivory A plus gold "Story" on cloth |

- Copy: "Start free" lands on a page whose line is "One small question a day, answered in their own
  words". The site's promise is the calls, with three questions a day on Free.
- **Fix (Decision 4):**
  - Move the site to the app's three faces, in `theme.ts` and `fonts.css`.
  - Buttons in sentence case.
  - Bookcloth for the footer and the dark bands.
  - Bond on the 404 and the closing band.
  - Ask the app team to align its sign-up line with the site's promise.

**9. The Home intro holds the page for 5 seconds or more every session.** `home/Intro.tsx` (`SEEN` in
`sessionStorage`, `EXIT = 4.0`).
- Measured: the cover is fully opaque at 0.8 s, 2.5 s and 4.5 s, and gone by 6.5 s.
- The first thing read is the NVIDIA badge, top left.
- It carries the not-X tagline, a title-case "Your Family's Living Memories" and the wedding photo
  again.
- It also uses raw hex (`#04161C`, `#0c3d49`), which `design.md` bans in components.
- Breaks: words and real content lead; prefer one-shot arrivals that don't block.
- **Fix:** cut it, or cap it at 1.5 s, once per browser (`localStorage`), without the NVIDIA badge.

**10. Not-X-but-Y contrasts and slogans throughout.** WRITING-VOICE.

| Line | Where |
|---|---|
| "Not a memoir to finish - A Story to keep" | `Footer.tsx:26`, intro |
| "Not a diary. A documentary." | Home band |
| "Not a description." | `home/Proof.tsx` |
| "Not a questionnaire." | `HowItWorks.tsx:142` |
| "Not only the one being asked." | How it works |
| "Not a trial that runs out" | `pricing.ts:188`, `YourStory.tsx:103` |
| "not a sales queue" | `Organizations.tsx:92` |
| "not a help desk" | `Contact.tsx` |
| "Choose a doorway, not a whole lifetime" | `guides.json` |
| "A family is not a résumé" | `OurStory.tsx` |
| "what follows is not a story about dying" | Daniel's letter |

- Also:
  - The triplet slogan "A story of you, by you, and yours" (footer and intro).
  - Semicolons in body copy ("stay free; a plan buys one thing").
  - British spellings mixed into US copy ("realised", "neighbours", "organised", "colour").
- **Fix:** rewrite each as a plain statement. Pick US spelling.

**11. The same photographs on many pages.**
- The dinner table: Home hero and the Organizations hero.
- The Walt & Ruth wedding: Home milestones, Home "Why we started", the intro and the app's sign-up.
  Next to Daniel's quote, the sample wedding photo reads as his grandparents, which is misleading.
- The kitchen interview: How it works hero, the interview guide and the Contact hero.
- The family sorting prints: For families, and Care twice (hero and section).
- The woman on the hallway phone: For families and Care.
- Rosa: Home, How it works, Care and Organizations.
- **Fix:** keep a per-route image ledger, one job per photo. For "Why we started", use a founder's own
  family photo, or none.

**12. Compare marks competitors down, and repeats its pitch four times.** `Compare.tsx`,
`compare/CompareTable.tsx`, `lib/landscape.ts`.
- The table uses × marks against the other products (Never: no red X, polish your own side).
- "Memoir products help one person finish a book…" appears in the hero lede, again in the table
  lede, then in reason 01 and in the teal band.
- The hero reuses Home's lake-monster cards.
- The hero photo's caption is clipped by the Sarah card ("e lake · 2024").
- There are 2×2 numbered cards (01–04), and the H1 is 4 lines at 1920 and 2560.
- **Fix:**
  - Show only A Story's column, with ticks and the one-line why; move the competitor detail to a
    disclosure, or drop it.
  - One statement of the difference.
  - A new hero picture.

**13. Uppercase tracked labels on controls everywhere.** 71 uppercase text nodes on Home and 34 on
Organizations.
- Where: buttons (START FREE, BOOK A DEMO, PLANNING PARTICIPATION, EVERY PLAN, SIDE BY SIDE), the
  Questions filter pills, form labels (YOUR NAME, OPTIONAL), the Organizations trust strip, and card
  kickers.
- Breaks: uppercase only for tracked kickers. The app uses sentence case.
- **Fix:** sentence case on every control and form label, in `kit/kit.styles.ts` (actions) and
  `kit/form.styles.ts`. Keep tracked caps only for real kickers.

**14. A kicker over nearly every section.** **(Still open from 18 Oct.)**
- Examples: "PRICING · USD", "OUR STORY" over the Our story H1, "HOW IT WORKS" over the How it works
  H1, "FOR FAMILIES" over the For families H1, "WHAT IT COSTS", "THE FAMILY LOOP", "NOT A MEMOIR",
  "WHERE TO NEXT".
- For families uses two kicker styles on one page: small terracotta, and large grey with wide
  tracking.
- **Fix:** delete every kicker that repeats the page or the heading. One style.

**15. Numbered lists stacked up.**
- Where:
  - I/II/III: `StepOne`, `FamilyLoop`, and the chapters on Questions
  - 01–05: How it works
  - 1–5: the depth stairs
  - i–iv twice, plus 1–4, on Organizations
  - 01–04: Compare
  - 01–03: Care, Your story and How it works ("One scan")
- Breaks: hallmark's "index numbering" tell. Organizations has three numbered lists on one page.
- **Fix:** number only real sequences: the steps of a call, and booking a demo. Remove the rest.

**16. Care, Your story and Organizations share one template, and Care overlaps Organizations.**
- Care and Your story run the same sequence: tilted three-print hero → one large and two small photos
  with captions → phone card plus 01–03 → dark quote band → "Before you begin" checklist card →
  Invitation.
- Organizations covers "Senior living and care" as well.
- The generic closing Invitation tells care homes and institutions to "Start free · One conversation
  to begin".
- **Fix:**
  - Merge Care into Organizations as a section (Decision 5).
  - Give Your story its own composition.
  - Let `Invitation` (`kit/kit.tsx`) take a per-audience action: Book a demo on the B2B pages.

**17. Reserve gives half its space to an offer that's gone.** `Reserve.tsx`.
- The full Founding Family card ($29, six benefits) is labelled "FILLED".
- "Which one is yours?" still offers "$29, Founding, if you would rather start now… The founding
  places are filled".
- A phone icon sits beside "work today in any browser".
- **Fix:** one Reserve card. A single line saying "The 25 founding places are filled - thank you".
  Delete the $29 option from "Which one". Use a browser icon or none.

### P2

**18. Programs.** `Programs.tsx`.
- The badges appear three times on the page (hero row, list, footer).
- A pasted NVIDIA marketing paragraph ("accelerate innovation and growth") is a scattered caption.
- The page's main picture is Cartesia's own grant card. Flagged on 18 Oct and still open.
- **Fix:** drop the hero badge row and the NVIDIA paragraph (the footer trademark line suffices). Use
  an A Story picture.

**19. Footer.** `Footer.tsx`, every page.
- Three contact links: "Contact us · daniel@…", "Get in touch" and "Contact".
- The link says "Institutions" but the page is `/organizations` and its kicker says "For
  institutions".
- The column titles are italic.
- On a phone the program badges stack at different widths and offsets, with NVIDIA at about 60 px.
- The ground is the near-black `#2A1F18`.
- **Fix:** one Contact link. One name for the B2B page. Upright titles. The badges on a grid of equal
  cells. Bookcloth or chocolate ground.

**20. Small print and tap targets.**
- 10.5 px kickers on Home's memory card: "Early days", "Live conversation · 14 min"
  (`app/MemoryCard.tsx`).
- 12 px card kickers and form kickers on Organizations and Contact.
- Tap targets on a phone:
  - milestone words 43 px tall on Home
  - "How we handle privacy" 27 px, email links 19–25 px (Organizations, Contact)
  - Reserve "Sign in" 18 px
  - Privacy and Terms contact@ links 22 px
- **Fix:** 13 px minimum outside the books. 44 px hit areas.

**21. Headlines past two lines at desktop.**
- At 1920:
  - Home: "The wedding, the graduation, the first house -" (5 lines, 643 px box), still open from
    18 Oct; "A Story exists to catch what the photograph can't" (4 lines)
  - How it works: "A memory to read. Every word underneath. The voice." (4 lines); "She's not good
    with these things. Good. Neither is this." (5 lines)
  - Compare H1 (4 lines)
  - Our story H1 (4 lines)
  - 3 lines on: Organizations, Care, Your story, Pricing "The app is yours", Contact, both guides
- **Fix:** widen the boxes past about 640 px, use `text-wrap: balance`, and shorten the copy.

**22. Scattered disclaimers.**
- "Kept from every call: the card and the transcript. Voice · in development." appears on Home and
  How it works.
- How it works also adds an "IN DEVELOPMENT" badge and a "VOICE · IN DEVELOPMENT" chip.
- **Fix:** say "in development" once, in the How it works volume or voice beat. Delete the rest.

**23. 404.** `NotFound.tsx`. **(Still open from 18 Oct.)**
- A headline on the left; the right 60% is empty at every desktop size, and there's no Bond.
- **Fix:** a page of the book or Bond (curious pose) on the right. One line of cause, one action.

**24. /samples chrome.** `public/samples/index.html`.
- Its own lockup ("A Story" with a separate A in another face).
- Its own nav: it has "Programs", which the main nav dropped, and no More or Sign in.
- An em dash in the title, in title case: "A Story — Sample Books" (lines 6, 15, 23, 27).
- The book is about 430 px wide at 1366.
- **Fix:** the shared header markup. Title "Sample books - A Story". Size the book by
  `min(svh, vw)`.

**25. Guide pages.** `Guide.tsx`.
- The hero photo spans half the column and leaves the right half empty. Flagged on 18 Oct and still
  open.
- Body copy is grey Figtree.
- **Fix:** full-width photo, or the photo beside the lead. Body in full ink.

**26. Your story.** `YourStory.tsx`.
- Low-resolution phone snapshots enlarged soft (the laundry photo). Flagged on 18 Oct and still open.
- The phone mock shows "Rose · Grandmother · Good morning, Jamie" on a page about your own life.
- "Future you will want to know what this felt like" appears twice.
- **Fix:** fresh images. A screen of the writer's own archive. One use of the line.

**27. For families.** `Families.tsx`.
- The occasion row staggers the tops of the 2nd and 4th photos (tops don't line up).
- The alternating split rows remain. Flagged on 18 Oct and still open.
- **Fix:** level the row. Break the alternation with one full-bleed scene.

**28. App strings with em dashes**, shown in the site's screenshots: "Listening — just start
talking", "Rose's story — half-written". Pass to the web-app team; recapture `public/app/*.webp`
afterwards.

---

## Fix groups (disjoint files)

| Builder | Owns | Items |
|---|---|---|
| A. Home | `Home.tsx`, `home/StepOne.tsx`, `home/Proof.tsx`, `home/EveryVoice.tsx`, `home/FamilyLoop.tsx`, `home/FamilyBook.tsx`, `home/Founders.tsx`, `home/Intro.tsx`, `home/WhatGetsLost.tsx`, `app/MemoryCard.tsx` | 1, 2, 3 (the FamilyBook line), 9, 11 (Home photos), 20 (memory card) |
| B. Our story | `OurStory.tsx`, `lib/seo.ts` (already in progress) | 6 |
| C. Pricing | `kit/PriceLadder.tsx`, `Pricing.tsx` | 4, 7, 3 (the badge in `Pricing.tsx`) |
| D. System and chrome | `kit/kit.styles.ts`, `kit/kit.tsx` (Invitation), `kit/form.styles.ts`, `styles/theme.ts`, `styles/global.ts`, `Header.tsx`, `Footer.tsx`, `chrome.styles.ts`, `NotFound.tsx` | 5, 8, 13, 14 (shared Eyebrow), 16 (Invitation), 19, 21 (tokens), 23 |
| E. Audience pages | `Care.tsx`, `Organizations.tsx`, `YourStory.tsx`, `Families.tsx`, `kit/Situations.tsx`, `kit/Audience.tsx` | 3 (the Organizations line), 11, 15, 16, 26, 27 |
| F. Other pages | `Compare.tsx`, `compare/*`, `Reserve.tsx`, `Programs.tsx`, `Questions.tsx`, `Contact.tsx`, `Guide.tsx` | 12, 17, 18, 20, 25 |
| G. Copy and claims | `HowItWorks.tsx`, `kit/MoreWays.tsx`, `lib/guides.json`, `faqData.ts`, `lib/landscape.ts` | 3 (checks), 10, 22 |
| H. Samples | `public/samples/index.html` | 24 |
| Founder only | `lib/pricing.ts`, `lib/product.ts` (guarded) | 3: the count, the badges, the "most people" line |
| Web-app team | the app's strings and sign-up line | 8 (copy), 28 |

## Decisions only Bao can make

1. **The question count and the popularity badges** (guarded files). Recommend: show 547, or "over
   500", until v2 ships in the app. Remove "Most families", "Most chosen" and "The one most people
   want" until there are sales.
2. **The Home cut list in item 1** (StepOne, Proof's book step, the One-life band, FamilyLoop).
   Recommend: approve as written. It brings Home to about 12 screens.
3. **The condensed founder letter in item 6.** Recommend: use it, and supply one family photograph if
   you want one.
4. **Match the app's type and material** (Cormorant / EB Garamond / Montserrat, sentence-case
   buttons, bookcloth, Bond). Recommend: yes, as the next phase, after the cuts.
5. **Merge Care into Organizations.** Recommend: yes. One B2B page with a care section.

## Measurements (words, and screens at each size)

| Page | Words | 1366 | 1920 | 2560 | 390 |
|---|---|---|---|---|---|
| / | 2,188 | 19.5 | 18.2 | 14.7 | 25.3 |
| /how-it-works | 1,637 | 16.0 | 14.9 | 12.1 | 22.0 |
| /pricing | 1,727 | 10.4 | 8.5 | 6.5 | 15.9 |
| /for-families | 555 | 8.8 | 8.1 | 6.3 | 11.6 |
| /organizations | 799 | 8.2 | 7.2 | 5.5 | 12.8 |
| /our-story | 835, then 557 after the edit | 8.0 | 5.8 | 4.5 | 7.4 |
| /care-communities | 479 | 7.1 | 6.3 | 4.9 | 8.9 |
| /your-story | 449 | 7.1 | 6.4 | 4.9 | 8.6 |
| /compare | 616 | 6.2 | 5.3 | 4.1 | 8.3 |
| /questions | 1,104 | 6.2 | 5.0 | 3.9 | 7.3 |
| /reserve | 708 | 5.8 | 5.1 | 4.0 | 8.0 |
| /privacy | 3,570 | 15.0 | 11.6 | 8.9 | 23.5 |
| /terms | 3,019 | 14.3 | 11.0 | 8.4 | 21.6 |

No horizontal overflow, console errors or failed requests on any page at any size. No em dash in
rendered site text; the em dashes on screen are inside the app screenshots, plus the /samples title.
