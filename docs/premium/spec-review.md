# Supervisor review: `design-spec.md` (2026-11-02)

Reviewer: supervisor (premium pass). The spec was checked against plan ACs 1–7, `taste.md` rules 1–28, the copy rules (no ending framing, no invented claims, home untouched), `docs/mission.md`, and the source files it cites. I opened every cited file I could.

**Verdict: not approved yet.** The structure is sound and most of it is well sourced. But 11 items (M1–M11; M11 is at the end) would either ship a false or unsourced claim, change the home page, fail `npm run a11y`/AC 1, or break the one instruction `/thanks` exists to give. Fix the MUST list in the spec before builders start; the SHOULD list can be done during the build.

Daniel is asleep, so the assumptions I made are marked **[A]**.

---

## MUST-FIX (blocks builders)

### M1. The film note claims the photographs are fictional, and nothing sources that. The poster frame is a photo with no recorded provenance.
- Spec §2.2 Line: "The family in it is fictional, and so are their photographs." Spec §2.4 poster: 3.40 s, "the wedding photograph".
- Source check: `a-story-demo-video/brief/ai-footage/character-bible.md` §0 says the wedding still (`02_milestone_wedding_1961.jpg`, used in v4 as `v4a/wedding_x2.jpg` via `studio/src/v4/a/kit.tsx:167` and `b/SquareBook.tsx:26`) has "no photographer, licence, stock ID or 'generated' note". It looks like "a real mid-century flash photograph of two identifiable people", and the ruling is "we treat it as one". `stills/34_x2.png` (`a/StillLife.tsx:166`) is covered by the same open flag (`integration.md` D3).
- **Fix:**
  - Line becomes "A 49-second film. The Millers are a fictional family." The fictional family is sourced: the demo studio's `CLAUDE.md` house rules.
  - Say nothing about the photographs until Daniel documents them.
  - Take the poster from a frame that shows only app UI, the square book or type: no wedding still, no `34`. Fallback per spec: 14.5 s, the question card. The tester confirms the chosen frame shows no `02`/`33`/`34`/porch photograph.
  - Add to §7 Flags: "Confirm the licence or provenance of the wedding, porch and family stills in v5.6 before deploying the film."
  - **[A]** The film still ships in the build, because Daniel deploys and can pull it.

### M2. Missing licence credit for the film's music.
- The score uses Salamander Grand Piano under CC BY 3.0 (`a-story-demo-video/brief/credits.md`), and that licence requires attribution wherever the film is distributed.
- **Fix:** add this line to §2.2 under the transcript, in `Note`, and to the transcript `<details>`: "Music: original score. Piano: Salamander Grand Piano by Alexander Holm (CC BY 3.0)." Use the exact credit string from `credits.md` line 14.

### M3. The spec changes the home page beyond nav and footer.
- Plan "Not doing" allows only nav and footer changes on `/`. But home imports the kit pieces the spec rewrites:
  - `Home.tsx` uses `Invitation`. §3.8 changes its closing h2, adds `next` links and removes `<Bond>` from it.
  - `home/Founders.tsx` uses `Eyebrow`. §3.1 makes it sentence case with new tracking.
  - `home/Close.tsx` and `home/OpenBook.tsx` use `SecondaryLink`. §3.3 turns it into a text link at ≤ 640 and adds new focus and active states.
  - `global.ts` rules (§3.1 `main p` 72ch measure, tabular numbers), `Band` padding (§3.2), `StickyStart` height (§3.6) and the `media.nav` breakpoint all render on `/`.
- §5 lists some of this as "will show there", which is exactly the violation.
- **Fix:**
  - Every §3 kit change is opt-in, not global. Either add a `$premium` prop / `data-premium` attribute that non-home pages set, or scope global rules to `main:not([data-page="home"])`. `Invitation` on `/` keeps today's output (closing, links, Bond); give it a `legacy` prop that `Home.tsx` doesn't need to pass, defaulting on for `/`.
  - The header and footer are the only allowed diff.
  - Add a check: pixel-diff `/` at 390 and 1440, before vs after, with the header and footer regions masked. It must be 0 changed pixels (or ≤ 0.1 % for anti-aliasing).

### M4. `/thanks` rewrite deletes the one instruction the page exists to give, and claims a receipt nothing sources.
- `lib/checkout.ts:61-62`: "/thanks must be the thing that carries the promise, and the buyer must be told plainly to sign up with the email they paid with." The current lead (`Thanks.tsx:101`) does exactly that.
- The spec replaces it with "Your receipt comes by email from Stripe…". That has three problems:
  - It drops the same-email instruction.
  - It asserts a Stripe receipt. Whether Stripe sends one depends on a dashboard setting that no file in the repo records.
  - It tells anyone who opens `/thanks` directly that they paid.
- **Fix:**
  - Keep the lead's instruction, warmed but complete: "Thank you. Sign up in the app with the same email you paid with, and your purchase joins your account."
  - Keep "Your checkout receipt is your confirmation" wording from the source, not "comes by email from Stripe".
  - Drop the check that greps out "If you've".

### M5. The nav hint "Only calls are paid for." is false, and the spec spreads it.
- §1.0 makes `kit.tsx:675`'s hint the single source for the dropdown and "Where to next". Books (from $39) and Express ($79 once) are paid too (`lib/pricing.ts`).
- **Fix:** hint for /pricing becomes "Everyone starts free. Writing and reading never cost extra." This is sourced from `pricing.ts:183`: "Inviting family, writing and reading never cost extra".

### M6. The /for-families "already gone" card can't be fixed by changing the kicker alone. Decide now.
- `Families.tsx:178-188`: the title "A memory you can still *add to.*", the text "hold their memory without speaking for them" and the link "Guides for remembering someone" all speak of a person who has died. Under the spec's new kicker "Someone you want to know better", the card stops making sense. The spec defers this to the supervisor; I have read it.
- **Fix:** remove the whole card from `REASONS` (and its photo `15`). The grid keeps the remaining cards; check the layout is still balanced at 1440 (it must not leave an orphan; if it does, use 2 per row).
- **[A]** I chose removal over rewriting because rewriting means new copy without a source. Add to §7 Flags: "Remembering someone who has died: where should this use case live?"

### M7. Several copy-gate greps match innocent words, so they will fail forever or push builders to mangle good copy.

| Check | Pattern | False hits |
|---|---|---|
| /for-families | "lose" | close, closer, closing (the `Invitation` closer itself) |
| /for-families | "miss" | mission, permission, dismiss |
| /reserve | "ends" | friends, sends, extends, weekends, spends |
| /pricing | "letter" | the founder letters link, newsletter |
| /pricing | "filled" | fulfilled |

- **Fix:** every copy grep uses word boundaries and the exact phrase.
  - `\b(gone|lose|loses|lost|miss|missed)\b` on visible text only (Playwright `innerText` of `main`, not raw HTML with scripts and JSON).
  - For /reserve, `\b(ends|ended|expire[sd]?)\b`.
  - For /pricing, `letter for later|leave a letter` and `\bfilled\b`.
  - Builders do not edit copy to satisfy a grep. A hit is reviewed by the supervisor first.

### M8. `Scroller` will fail `npm run a11y` (AC 4).
- §3.9 explicitly declines roles and labels. A horizontally scrollable region whose items contain no focusable element (the /for-families occasions, /pricing editions, /organizations segment cards when they're text plus image) trips axe `scrollable-region-focusable` (serious). Keyboard users can't scroll it.
- The sentence "`role="list"` and a visible 'Scroll' hint for screen readers is not needed; keyboard focus scrolls items into view" is also ambiguous.
- **Fix:**
  - `Scroller` renders `<div role="region" aria-label={label} tabIndex={0}>` around a `<ul>` with `<li>` items. `label` is a required prop (for example "Occasions", "Book editions").
  - It gets a visible focus ring.
  - The end fade is CSS-only (`mask-image` driven by a `data-overflow` attribute set by one `ResizeObserver`). No arrows or dots.
  - Check: `npm run a11y` shows zero new violations on the 4 pages that use it.

### M9. The film's single tap may not play on iPhone Safari, the main buyer's phone (AC 3).
- §2.3 swaps the button for `<video autoplay>` through a React state update. WebKit allows playback with sound only when `play()` comes from a user gesture. React commits the update after the handler returns, so the new element's `autoplay` can be refused, leaving a second "play" step or a frozen poster.
- **Fix:**
  - In the click handler, `flushSync(() => setPlaying(true))`, then call `videoRef.current.play()` synchronously in the same handler.
  - On a rejected promise, leave the native controls visible (no error copy).
  - Check: Playwright **webkit** project plus one real iPhone run when Daniel can. Until then, record it as "passed only in Chromium/WebKit-desktop".
  - Add a check row for it.

### M10. No cut line. The night's scope is larger than four builders can finish, and the time-critical piece isn't marked shippable on its own.
- The spec covers 15 pages, nav, footer, kit, film encodes, the `/samples` static file, the `/l` rewrite, stacked tables, legal contents and design.md. "Commit 1 by ~2 h" covers theme, global, kit, header, footer, nav.ts, today.ts and a nav script at once.
- Meanwhile the reservation discount expires 2 Nov 23:59 PT (`founding.ts:110`). The live site's `deadlineLine()` then renders "The 15% offer closed on 2 November", which is ending framing on production, until Daniel deploys.
- **Fix:** add §6.1 Priorities, in this order:
  1. **P0, its own commit first:** D1/D2/D3 copy removals (`founding.ts`, `PriceLadder.tsx`, `faqData.ts`, `Pricing.tsx`, `Reserve.tsx`). Make it deployable alone and flag it to Daniel as "deploy first".
  2. **P1:** nav and footer (AC 1), then the film (AC 3).
  3. **P2:** group pages in the order B, A, C, D.
  4. **P3:** §3.4 Card, §3.9 Scroller adoption, legal contents, `/samples` recolour, /guides restyle.

  Anything not passing tester + supervisor by 07:00 is left uncommitted and listed in `CHIEF-LOG.md`. A half-landed system change (for example Eyebrow case on some pages only) is worse than none.

---

## SHOULD-FIX

### Copy and claims
- **S1. The today note contradicts /pricing and /reserve.** "Writing, the family archive and the book work in any browser" sits next to "once ordering opens" and "Ordering opens soon". Use "Writing and the family archive work in any browser." (a subset of the same source, `seo.ts:233`).
- **S2. "Plans open at launch"** is not in the source. `Pricing.tsx:822` says "Plans aren't on sale yet." Use the source words: "Plans aren't on sale yet. Today you can start free, and $1 holds your place in line."
- **S3. WHY_PAY / INCLUDES conflict.** "We email you when the calls open" (`founding.ts:309`) is inconsistent with "the calls ring … in a private beta". It's pre-existing, but the spec now puts both on one page. Flag it to Daniel; no edit (it's a claim about the product state).
- **S4. Dangling "that year".** After `INCLUDES.reserve[1]` is removed, "The dollar comes off that year too" refers to nothing. Change it to "The dollar comes off your first year", which matches the wording of D1 itself.
- **S5. `deadlineLine()` returning `""`.** Every caller must skip rendering its wrapper (tag or pill) when the string is empty. The tester checks for an empty pill on /reserve and /pricing.
- **S6. "What happens if I cancel?" → "Can I go back to Free?" hides a question buyers search for.** Cancelling a plan is not a life-ending frame; "cancel" is the word people use, and saying plainly how cancelling works is a trust signal. Keep "What happens if I cancel?", and drop "cancel" from the /questions grep.
- **S7. Synthetic voices are unlabelled.** The film's voices are synthetic (demo studio `CLAUDE.md`). A product whose promise is real family voices should say so beside the film: add "Voices are synthetic." to the note line. This is consistent with the "real voices by default, synthetic labelled" principle.
- **S8. The guides heading replacement doesn't match its paragraph.** The paragraph is about closing the session and saving the recording well (`guides.json:29-30`). "Leave room to come back to it" doesn't describe that. Use "End gently, and keep the recording well". The supervisor rechecks it.

### Accessibility
- **S9. Captions default off breaks taste rule 27.** The rule says "captions on by default". D4's reason is sound, but "almost every narrated line" is on screen, so some aren't.
  - Either list in the spec which of v01–v17 have no on-screen type and turn on captions for those cues only (a separate track isn't possible, so this means default on), or keep default off and log the deviation from rule 27 with the line list in `CHIEF-LOG.md`.
  - **[A]** Default off plus a logged deviation is acceptable for tonight.
- **S10. The facade fails label-in-name (WCAG 2.5.3).** The visible text is "Play · 49 s"; the accessible name is "Play the film, 49 seconds, with sound". Make the visible text the start of the name: visible "Play the film · 49 s", aria-label "Play the film, 49 seconds, with sound".
- **S11. The focus ring is not specified per ground.**
  - `outline: currentColor` on a filled chocolate button is ivory, which disappears on ivory or paper grounds.
  - `shadow.focus` (`rgba(184,81,38,.55)`) on ivory is about 2.2:1, under the 3:1 non-text minimum.
  - Specify chocolate rings on light grounds and ivory rings on cloth, and measure ≥ 3:1 for each.
- **S12. Stacked compare tables at ≤ 640 should be one DOM.** Use CSS reflow with `data-label` attributes; don't keep a second hidden copy, which duplicates content for screen readers and the prerender.
- **S13. The `/l` error copy assumes a scan problem.** "Try scanning the code again, a little closer" is wrong for a code that is genuinely invalid. Acceptable tonight; flag it to Phase 2.

### Performance
- **S14. The poster is `loading="lazy"` but may be the LCP element.** Check 2.1 wants it in the first 390 screen. If it is in the first viewport at any tested width, it must be eager with `fetchpriority="high"` and the hero's own image must not also be high. Measure which element is LCP before and after.
- **S15. The LCP baseline must be the local build of `origin/main` on the same machine,** 3 runs each, median, mobile preset. Not the live site.
- **S16. Parallel 2-pass encodes share the log file.** Running several 2-pass encodes in one folder clobbers `ffmpeg2pass-0.log`. Add `-passlogfile <name>` per output.
- **S17. Drop the two WebM files.** H.264 plays everywhere the site supports, and VP9 at these bitrates saves about 10 %. Dropping them halves the encode time and keeps about 14 MB of binaries out of git, which has no LFS (`.gitattributes` is absent). Six videos add about 41 MB to the repo per encode.
- **S18. Deploy MIME types for `.vtt` aren't guaranteed.** `publish.yml` uses `aws s3 sync`, which guesses Content-Type, and `.vtt` may upload as `binary/octet-stream`, which some browsers refuse for tracks. Flag to Daniel: add `--content-type text/vtt` for `film/*.vtt` (a deploy change, so not tonight). `verify-live` must check it.
- **S19. Image weight check missing.** Rule 16 (≤ 250 KB per image at 390, real `sizes`) needs to appear in the group checks for the new photo-led heroes (/for-families, /your-story, /organizations, /guides cards).

### Mobile composition and nav
- **S20. No fallback if the bar doesn't fit at 1024 px.** If 20 px gaps still don't fit, the spec has no plan. Add: if `nav-count` finds a wrap at 1024, the drawer breakpoint moves to 1179 and that's logged. Never shrink type.
- **S21. Hover-open plus click-toggle conflict on the desktop menu.** A click on a menu already opened by hover must not close it (Radix behaviour). Add this to Check 1.1.
- **S22. Garbled sentences builders will misread.**
  - §3.3: "for example `Home Close.tsx` excluded (home untouched)".
  - §3.9: "role=list … is not needed".
  - Rewrite both (§3.9 is covered by M8).

### Premium versus template-y (the harsh part)
- **S23. `Card` everywhere is the generic SaaS look.** A paper fill, a 1 px line and `radius.lg` on pricing, organizations, guides, questions headers and care roles is the shadcn default card. It is exactly what the taste skill's "third-wave generated look" warning describes.
  - Limit `Card` to the pricing plan cards and the sign-in form.
  - The /questions group headers are type, not boxes.
  - The /guides index reads as an editorial contents page: photo, title, one line, hairline between rows. Not a card grid.
  - The care roles stay on the night band as three typeset columns.
- **S24. Scroller overuse hides what buyers came for.** Putting the /pricing book editions in a sideways scroller hides prices. Keep them as a 2-column grid at 390; use scrollers for occasions and chips only.
- **S25. The hero photographs are AI illustrations, and three pages become photo-led on them.** The pages are /for-families, /your-story and /organizations, plus the guide cards.
  - `taste.md` §2 says our warmth has to come from what generators cannot fake.
  - Prefer the real objects for first screens: the square book from `/samples`, real app screens (`public/app/`) and the film's UI frames.
  - Where an AI photograph stays in a hero, keep the "About the examples" honesty one click away; it is in the footer, which is fine.
- **S26. Pages that still fail taste rule 12 (a real picture in the first screen).**
  - /pricing (PriceCard is a UI drawing), /compare (cloth and type only) and /reserve.
  - /how-it-works' check accepts "the Watch link is visible" instead of a picture.
  - **Fix:**
    - /pricing hero object becomes the square book plus an app screen beside the PriceCard at 1440. At 390, the book thumbnail sits above the price.
    - /compare and /reserve: log as accepted exceptions with a reason.
    - /how-it-works: the CallSlip counts only if it's the real app call screen (`public/app/`). Otherwise use the poster.
- **S27. The spec is a lint pass with no story.** Nothing carries `mission.md` movements 2 and 4 (a living story, not a memoir; many voices on one moment), and movement 4 is the one the mission says the last site buried.
  - Add to /how-it-works: one existing mission phrase at the "Everyone in the family has a way in" section: "Not one narrator, but everyone who was in the room."
  - Add to /for-families: "It never assumes the story is finished, because it isn't. Today is part of it too." in the hero note or the giving block.
  - Both are verbatim from `mission.md` "Phrases worth keeping", so they need no new source.
- **S28. The film link repeats verbatim on 5 pages.** "Watch the film · 49 s" reads like a component, not a voice. Keep it on hero actions, but write the in-section links on /care-communities and /organizations for that reader, using existing words. For example, on care: "See a call become a book · 49 s".

---

## What is good (keep)
- D1 and D2 are correct and well sourced. Saying less is the right answer to the expired discount.
- The nav meets AC 1 on desktop, and the drawer structure is right apart from M11 below.
- The film facade (zero bytes before the tap), the file budget math (1150k + 96k × 49.4 s ≈ 7.7 MB, under 8 MiB) and captions generated from `vo-words.json` (which exists, with `DURATION_S = 49.4` in `timeline.ts:6`) are good.
- The `Invitation` trailing-slash bug find is real and valuable (fix it with the M3 scoping).
- The "If you're the one being asked" section for the storyteller, removing the dog from every closing, the `/l` branded page, and the honest-label list in §5.

## M11 (MUST, listed last because it was found last): the drawer duplicates "Book a demo" on org pages
- §1.2: on `/organizations` and `/care-communities` the org disclosure opens by default and contains "Book a demo", and the drawer foot button also reads "Book a demo". That is a duplicate label in the drawer, which fails AC 1 ("no duplicate entries") and Check 1.2.
- The desktop bar has the same duplicate (dropdown row plus context button).
- **Fix:** on those two paths, the disclosure's third row is not rendered (desktop and drawer), since the context button already is "Book a demo". Check 1.2 runs on `/organizations/` as well as `/pricing/`.
