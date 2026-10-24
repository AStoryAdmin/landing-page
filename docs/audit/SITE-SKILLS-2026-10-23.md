# Site skills audit - 2026-10-23

The design skills are only partly applied on the marketing site. The verdict is **not APPLIED**.
Home and /our-story fail the most, and they fail measurably. Home is now 18.2 screens and
2,128 words at 1440×900. design.md records 14 screens and about 1,400 words after the
2026-10-15 cut, so the page has grown back. Five of its headings run 3 to 5 lines. On
/our-story the opening headline is 4 lines at every width, there are no pictures, and the
centred column leaves most of a wide screen empty. Across the site, the motion runs on the
wrong curves, there are no View Transitions, every secondary page uses one stock entrance,
and several hover and press states run longer than 300ms or animate layout.

Branch site-phase2, source `landing-page-publish/`. I made no edits to the site.

## How this was checked

- **Skills read:** taste-skill (SKILL.md, layout.md, motion.md), hallmark (slop-test, all 58 gates;
  interaction-and-states; the anti-pattern index), emil-design-eng, impeccable (craft-floor.md),
  gsap-scrolltrigger, gsap-react, gsap-performance and humanizer. I also read Bao's
  DESIGN-TASTE.md and the site's design.md.
- **Where Bao and the skills conflict, Bao and design.md win.** The skills ban tracked kickers,
  hairlines and colour-emphasis words. Bao allows tracked small-caps kickers at 11px or more,
  hairlines in small print and one to three emphasized phrases. Those inspector FAILs are
  **not** ranked as gaps. Each place where a skill and Bao disagree is noted.
- **Server:** the brief named http://localhost:5174, but that port serves Project Reboot. I ran
  the site's own Vite dev server from this folder on 127.0.0.1:5188. The coordinator later
  confirmed that 5191 is the A Story site. Both serve the same `src/`.
- **taste-skill `inspect.mjs`** ran on `/`, `/our-story`, `/how-it-works`, `/for-families`,
  `/pricing`, `/care-communities` and `/compare`, at 1440, 768 and 390. Every page FAILs; see §8.
  **`lint.mjs`** ran on `src/` and found 360 FAILs and 97 WARNs, most of them hairlines and
  shadows that Bao's taste allows.
- **Playwright headless** (my own probe, in the scratchpad) covered 14 routes at 1366×768,
  1920×1000 and 2560×1300. It measured heading line counts, text under 12.5px, tap targets,
  horizontal scroll, and content left faded after a full scroll. It also ran 7 client-side
  route changes with jump-scrolls to look for stuck reveals, and checked the keyboard focus
  ring on the first 8 tab stops of /pricing.
- **Not verified:**
  - The Playwright pass at 390×844 did not finish; inspect.mjs covered 390 instead.
  - Edge with `html { zoom }` zoomed out, and 3840 wide.
  - Live form submissions: by rule, no forms were sent.
  - The built-in browser pane was not used.

---

## Ranked gaps

Severity: **blocker** (Bao would call the page unfinished), **ugly** (visible defect),
**polish** (craft).

### 1. Headlines run past two lines on the two pages Bao flagged (blocker)

**Skills:** taste-skill house rule 1 (two lines or fewer at every width), hallmark gate 44
(the hero fits the fold), Bao's rule of one primary idea per page.

The measurements at 1366 and 1920:

| Page | Heading | Lines and size |
| --- | --- | --- |
| /our-story | h1 "The conversations we thought could wait." | **4 lines at 84px (1366) and 116px (1920)** |
| / | "The wedding, the graduation, the first house - the milestones usually survive." | 5 lines |
| / | "A Story exists to catch what the photograph can't." | 4 lines at 64-84px |
| / | "Your story isn't behind you. You're still inside it." | 3 lines |
| / | "Her words, as she said them - or lightly tidied." | 3 lines |
| / | "One life. Many witnesses." | 3 lines at 84px |

The same fault shows on the other pages:

- /how-it-works: "A memory to read. Every word underneath. The voice." runs 4 lines, and
  "She's not good with these things." runs 5 lines at 1920.
- /compare: the h1 runs 4 lines.
- /care-communities, /organizations, /contact and /pricing ("The app is yours…") each have a
  heading that runs 3 lines.

**Fixes:**
- `src/pages/site/OurStory.tsx:45`: the hero `max-width: 15ch` at `display.hero` forces the 4
  lines. Widen it to about 24ch and set the headline on one off-centre left edge (see #3), or
  cut it to about 32 characters ("The talks we thought could wait").
- `src/pages/site/home/WhatGetsLost.tsx:47-50`: `max-width: 19ch` and line-height 1.22. Cut the
  copy to the three milestones plus "usually survive." Set display leading to 1.0-1.05, as
  taste-skill and hallmark 44 require.
- Rewrite each of the other headings above to 32 characters or fewer, the arithmetic in
  taste-skill copy.md §2. Shorten first, then widen the measure, then size last.

### 2. Home has grown back to 18 screens and 2,128 words (blocker)

**Skills:** Bao's "Compact. Main content reachable without long scrolling" and "Less text",
design.md "Less text (2026-10-15)", taste-skill layout §1 (median 575 words).

The probe measured 19.5 screens at 1366×768 and 18.2 at 1920×1000. design.md recorded about
14 screens and 1,400 words. With 41 headings and 29 font sizes (7 to 117px), Home reads as
many small sections instead of a few big ones. This is the most likely root of Bao's
"downgrade" verdict.

**Fix:** `src/pages/site/Home.tsx:69-82` stacks 12 sections. Merge or cut back to the
design.md order:
- **Proof:** cut it to the card and the book. The word-for-word versus tidied toggle already
  lives on /how-it-works.
- **FamilyLoop:** fold its three app screens into StepOne's I / II / III. They show the same
  three steps.
- **WhatGetsLost:** keep one of its two rooms (milestones, then everyday), not both.

Target: 14 screens or fewer at 1366×768.

### 3. /our-story: no pictures, a centred narrow column and empty screens (blocker)

**Skills:** taste-skill picture floor (inspect: "Only 0 picture(s)"), hallmark gate 6
(centred-everything hero: kicker, h1, lede and CTA on one centre axis), taste-skill layout §3
(off-centre beats centred), Bao's "Use the screen" and "Show real people".

- The two letters are single `760px` sheets centred on the page (`OurStory.tsx:84`). At
  1920 and 2560 the flanks are bare cream.
- The founders appear only as a teal circle with an initial ("D", "B"). That is close to Bao's
  "tinted squares with an initial for a person", even though round monogram seals are allowed.

**Fix:**
- Lay out the opening left-aligned, with one real photograph from each founder's family
  archive. Bao's taste says not to use a posed Bao portrait in the hero, so use the uncles or
  the grandparents the letters talk about.
- Put the two letters side by side as two sheets on the desk from 1280px up.
- Give each signature a small round photo or a proper seal instead of the initial disc.
- Ask Bao which family photos are approved. Do not generate them.

### 4. The motion runs on the wrong curves (ugly, site-wide)

**Skills:** Bao's rule (entrances on `cubic-bezier(0.23,1,0.32,1)`, movement on
`cubic-bezier(0.77,0,0.175,1)`), emil-design-eng (custom curves, named tokens).

`src/styles/theme.ts:181-194` defines the tokens:
- `fast`, `base` and `slow` use `(0.22,0.61,0.36,1)`.
- `reveal` uses `(0.16,1,0.3,1)`.
- The GSAP tokens are `expo.out`, `power3.out` and `power2.inOut`.

Across `src/` there are 38 hard-coded curves:
- 18 × `(0.16,1,0.3,1)`
- 6 × `(0.22,0.61,0.36,1)`
- 3 × `(0.645,0.045,0.355,1)` in FamilyBook
- 2 × `(0.76,0,0.24,1)` in the mobile menu
- 1 × `(0.2,0.7,0.3,1)` in ArchivePile
- only 2 × the house `(0.23,1,0.32,1)`, in chrome.styles.ts:203 and kit.styles.ts:494

GSAP adds 22 × `expo.out` plus `expo.inOut`, `power1/2/3.inOut` and `power2.in`. Nothing
uses `(0.77,0,0.175,1)`.

**Fix:**
- Set `motion.*` in `theme.ts` to `cubic-bezier(0.23,1,0.32,1)`.
- Add `motion.move` with `cubic-bezier(0.77,0,0.175,1)`.
- In `lib/scrollMotion.ts`, register both with `CustomEase` ("house-out", "house-move") and
  point `ease.out` and `ease.inOut` at them.
- Replace every literal curve and every `expo.out` in the files listed under §6.

### 5. No View Transitions between pages (ugly)

**Skills:** Bao's "Smooth View Transitions between pages", taste-skill motion §1 (a page that
does not move reads as a mock-up).

`src/components/ui/RouteTransition.tsx:20-38` runs a 280ms keyframe fade on
`(0.22,0.61,0.36,1)`. A grep found no `startViewTransition` and no `view-transition-name`.

**Fix:**
- Wrap navigations in `document.startViewTransition`. With React Router 7, use
  `<Link viewTransition>` or `useViewTransitionState`, or wrap `navigate` calls.
- Add `::view-transition-old/new(root)` with a 220ms cross-fade on the house curve.
- Name one shared element, such as the header logo or the book cover on Home → /samples, so it
  morphs between pages.
- Keep the current fade as the fallback when the API is missing. Turn both off under
  reduced motion.

### 6. One stock entrance on every secondary page (ugly)

**Skills:** taste-skill motion §1 ("the same fade-and-slide-up with the same timing on every
block … the most cited motion tell"), impeccable craft-floor (not one identical entrance on
every section), emil (reveals 500-900ms).

`src/pages/site/kit/reveals.ts:43-52`: every `[data-rise]` on 14 routes does the same thing:
`y: 26/32`, opacity, 1.1s `expo.out`. Headlines use `riseLines` (1.2s) everywhere. Prints
(`:59-67`) open with `clipPath` on `expo.inOut` over 1.4s. That is an in-out curve on an
arrival, so it starts slow, and clip-path breaks Bao's transform-and-opacity-only rule.

**Fix:**
- Give each page one authored signature move and vary the entrance by content (a list
  arrives row by row, a figure counts up once, a quote rises by line).
- Bring durations down to 0.6-0.9s on `house-out`.
- Swap `data-print` to opacity plus `scale(1.035 → 1)`, or get Bao's ok to keep the clip
  (impeccable allows clip-path; Bao's rule does not).

### 7. Content left half-faded by a scrubbed fade (ugly)

**Skills:** Bao ("Nothing is ever left hidden or half-faded by an animation that didn't
finish"), gsap-scrolltrigger (scrub ties state to position).

`src/pages/site/home/Hero.tsx:189-198` scrubs `.hero-body` to `opacity: 0.2`. Measured at
1366×768: at scroll 500 the hero text sits at **0.63 opacity** with 225px of it still on
screen. A reader who stops there reads a faded hero.

**Fix:** drop the opacity from the scrub and keep only `yPercent` drift. If the fade has to
stay, start it at `"bottom 40%"` so it only happens once the text is nearly gone.

### 8. Animations that move layout properties (ugly)

**Skills:** emil-design-eng and gsap-performance (only transform and opacity), hallmark gate
14, Bao's transform-and-opacity-only rule.

| Where | What animates |
| --- | --- |
| `src/pages/site/home/Intro.tsx:476-479` | GSAP tweens `.bead` `left: 0% → 100%` over 2.1s |
| `src/pages/site/chrome.styles.ts:70, 78` | The nav condense on scroll transitions `min-height` and the logo svg's `height` (520ms) |
| `src/pages/site/Guides.tsx:90, 96` | The index hover transitions `padding` |
| `src/components/ui/primitives.ts` ghost variant hover | Changes `gap` |

**Fixes:**
- Intro bead: put it in a full-width track and tween `xPercent`, or `x` from the track's
  width.
- Nav: animate `scale` on the logo and `translateY` on a fixed-height bar instead.
- Guides index: use `translateX(12px)` on the entry's inner span.
- Ghost button: translate the arrow instead of changing `gap`.

### 9. Interaction states are missing on the house buttons and inputs (ugly)

**Skills:** hallmark interaction-and-states (8 states) and gates 13, 26, 39; emil (`:active`
scale, hover only on hover devices).

- **Kit actions** (`src/pages/site/kit/kit.styles.ts:296-397`: `actionBase`, `primary`,
  `secondary`), used by every Start / Reserve / Contact / DemoBooking / Checkout submit:
  - There is no `:disabled` or `[aria-busy]` style, so a busy "Sending…" button still looks
    live and still lifts on hover.
  - Add `&:disabled, &[aria-busy="true"] { opacity:.55; cursor:not-allowed; transform:none }`
    and set `aria-busy` while busy in Contact.tsx:359, DemoBooking.tsx:272,
    CheckoutDetails.tsx:450, Reserve.tsx:718 and SignIn/SignUp.
- **Too many hover effects at once:** the kit primary hover changes four things together
  (`translateY(-1px)`, the coin's `rotate(-45deg)`, the background, the coin's colour), which
  fails hallmark gate 13. Keep the background shift and the coin rotate; drop the lift.
- **Hover on touch screens:** in `src/components/ui/primitives.ts:232-288`, every
  `buttonVariants` hover and the kit primary and secondary background hovers sit outside
  `@media (hover:hover)`, so the hover state sticks after a tap on a phone. Only 18 of 86
  hover rules in `src/` are guarded.
- **Weak disabled state:** `primitives.ts:221` `buttonBase:disabled` uses `opacity:.75` only.
  Use .55, with `cursor` and `aria-disabled` as well.
- **Inputs:** `src/pages/site/kit/form.styles.ts:72-77`: focus changes `border-bottom` from
  1px to 2px, so the field shifts (hallmark 39). Keep 1px and add
  `box-shadow: 0 1px 0 gold` or an `outline`. The field has no hover state and no
  success/valid state.
- **Tap targets under 44px:**
  - /organizations and /contact: inputs measured 41px tall, and the "How we handle privacy"
    link is 27px tall.
  - /contact: the email link is 27-32px tall.
  - /start: "I already have an account" is 20-26px tall.

  Give each a 44px hit area.
- **Small win:** the global `:focus-visible` (2px outline, instant) is correct. It was
  verified on 8 tab stops on /pricing.

### 10. Controls that animate too long, or with ease-in (ugly)

**Skills:** emil-design-eng (UI under 300ms, never ease-in on UI, the frequency rule);
taste-skill motion (hover 150-200ms, menus 150-250ms).

| Where | Control | What it does |
| --- | --- | --- |
| `chrome.styles.ts:432-438` | Mobile menu | Opens with clip-path over **700ms** |
| `Questions.tsx:290-291` | FAQ toggle icon | `transform motion.reveal` (**900ms**) on every open |
| `kit/form.styles.ts:51, 116-117` and `motion.slow` everywhere it serves a state (19 uses) | Inputs and chips | **520ms** |
| `home/WhatGetsLost.tsx:157-166` | Hovering a milestone word | Pulls the photo out with **`power2.in`** (0.34s), then 0.7s; ease-in on a hover-frequency action |
| `kit.styles.ts:334` | Coin rotate | 420ms |
| `Families.tsx:210`, `kit/Audience.tsx:165`, `Organizations.tsx:183` | Image hover zoom | 900-1100ms |
| `WhatGetsLost.tsx:61`, `HowItWorks.tsx:245-273` | Colour and step changes | 400-500ms |

**Fixes:**
- Menu: 240ms on `house-move`.
- FAQ icon: 200ms.
- Field and chip states: 150ms.
- Milestone hover: `house-move` at 0.3s and 0.45s.
- Hover zooms: 400ms at most.

### 11. Text under 13px on Home (ugly)

**Skills:** design.md ship rule (no text under 13px outside the books), Bao (nothing under
12px), taste-skill (small-text FAIL: 34 blocks).

The Home probe found 29 text blocks under 12.5px at 1366:
- The MemoryCard kicker is 10.5px (`app/MemoryCard.tsx:98`).
- The drawn app screens in StepOne and FamilyLoop are 7-9px.
- /organizations `p.n` is 12px.
- /contact `<small>` is 12px.

**Fix:**
- Show the app screens larger, cropped to the part that matters (design.md "cropped real
  screens"), so their text renders at 13px or more.
- Raise the kicker and `.n` to 13px.

### 12. Section rhythm repeats across Home and the secondary pages (ugly)

**Skills:** hallmark gates 8, 9 and 42-43 (structural fingerprint, nav and footer), taste-skill
layout §5 (no two neighbours share a layout).

- **Home:** "Your story isn't behind you", "See a real book", "The card. The words. The book."
  and "Every memory has more than one witness" all use the same head: kicker, then the
  heading on the left and a grey paragraph on the right.
- **Secondary pages:** every one opens the same way: a tracked kicker naming the page ("How it
  works", "Pricing · USD", "For families", "Our story", "For care communities", "How A Story
  is different"), a 70-94px serif h1, a grey lede and two pills.
- **Closing:** every page ends with the same `Invitation` (`kit/kit.tsx:300-365`), "The story
  keeps going. Because so do you." plus a where-to-next list. Then comes the 4-column link
  footer with a logo row.
- **Nav:** wordmark, links and a pill, with a hairline under it, matches hallmark gate 42.
- **Kicker contrast:** the inspector measured the page-name kickers at 4.2:1, below 4.5.

**Fixes:**
- Delete the page-name kickers that only repeat the nav's active item. Bao allows kickers;
  these carry no information, and impeccable bans them outright.
- Give each secondary hero its own composition from its content: Pricing opens on the ladder
  itself, For families on a photograph, Compare on the four witnesses.
- Vary the Invitation per page: one line in that page's voice, not the same sentence nine
  times.

### 13. Copy reads as AI-written in places (polish)

**Skills:** humanizer (§1 not-X-but-Y, §2 one-line closers, §6 forced triads), Bao's writing
voice (no triplet slogans, no not-X-but-Y, no repeating the same promise).

- **Repeated closer:** "The story keeps going. Because so do you." appears on 9 pages
  (`kit/kit.tsx:361`). On /our-story it sits right after "A family archive is never
  finished.", and the footer then says "Not a memoir to finish". That is three closing
  promises in one screen.
- **Fragment triads:**
  - "The card. The words. The book." (Proof)
  - "A memory to read. Every word underneath. The voice." (HowItWorks)
  - "The call, the card, the book." (`kit/kit.tsx:309`)
  - "The wedding, the graduation, the first house"
  - "One life. Many witnesses."
- **Not-X-but-Y:**
  - "More than a memoir. A family's whole story." (/compare h1, `compare/CompareOpening.tsx:253`)
  - "Your story isn't behind you. You're still inside it."
  - "Not a memoir to finish - A Story to keep"
  - "Never - it's free" (Pricing)
  - "If it isn't heard, it's gone." (Programs)
  - "Not a description." (Proof lead)
- **Fix:** keep one signature line per page and say the rest plainly. Send the rewrite through
  Codex with Bao's voice brief; do not hand-patch it.

### 14. Effects the skills ban outright (polish)

- **Gradient text:** `home/FamilyBook.tsx:668-684` gives the end page's `h3 em` a "foil"
  `background-clip:text` gradient. Hallmark gate 2 says no genre allows gradient text, and
  impeccable bans it. **Fix:** use a flat gold, or move the shimmer onto a foil-stamp graphic
  that is not text.
- **Bounce easing:** `home/WhatGetsLost.tsx:671` uses `back.out(1.6)` and
  `compare/CompareOpening.tsx:239` uses `back.out(1.8)`. This fails hallmark 12 and the
  taste-skill motion bans. **Fix:** use house-out.
- **Pictures over headlines:** "It's the everyday." has polaroids lying across it at 390
  (inspect covered-text FAIL). **Fix:** keep the pile clear of the headline box.
- **Intro cover:** on a first visit the intro covers the hero, and the inspector's
  covered-text FAIL shows the hero line hidden. It has a skip and runs once per session. That
  is acceptable under Bao's "one-shot arrival", but it delays the page's first idea by about
  3.5s.

### 15. Too many colours in one heading (polish)

**Skill:** design.md (one emphasis word or fewer per heading).

`home/WhatGetsLost.tsx:225-243` sets three milestone words in brown, with one turning
terracotta. They are inline `<button>`s inside the `h2`, with no 44px target. **Fix:** make
the pile itself the control, or give the buttons a padded hit area, and keep one emphasis
colour.

### 16. Unreadable text in the How it works steps (ugly)

**Skill:** hallmark gate 40 (contrast).

The inspector measured 1.8:1 at 768 and 390: "All but one. So you've counted them…" in
`#786655` on teal `#0f4a58`. The likely cause is `HowItWorks.tsx:258-268`:
`.step:not(.on) p { color: faint }` reaching the teal call scene's paragraphs. **Fix:** scope
the selector to the steps list. Verify at 768.

### 17. Near-empty screens and sideways rows (polish)

**Skill:** taste-skill fullness.

- /how-it-works has 3 of 12 desktop screens that are nearly empty (screens 2, 3 and 11).
- /for-families, /pricing and /compare each have a row that scrolls sideways at 768.
- The teal Listen scene on Home leaves its right half bare at 1440.

**Fix:** enlarge the main element of each of those screens, or cut the screen.

### 18. ScrollTrigger positions are not refreshed off Home (polish)

**Skills:** gsap-scrolltrigger (refresh after layout changes), gsap-react (cleanup).

- **Good:** `lib/scrollMotion.ts` `useScene` uses `gsap.matchMedia(root)` with `mm.revert()`.
  Reduced motion is honoured, cleanup is correct, and nothing pins.
- **Gap:** only `Home.tsx:66` calls `refreshWhenSettled()`. On secondary routes, lazy images
  load after the triggers are measured. No stuck reveal showed up in the 7-route jump-scroll
  test, but trigger starts can drift. **Fix:** call `refreshWhenSettled` inside `useReveals`
  (once per route), or `ScrollTrigger.refresh()` after `Suspense` resolves.
- **Fallback condition:** the `MOTION.wide` condition (`scrollMotion.ts:32`) needs
  min-height 800, so at Bao's 1366×768 EveryVoice falls back to its non-wide scene. Confirm
  that fallback is intended.

### 19. Small leftovers (polish)

- **Dead code:** `components/ui/Reveal.tsx` is not used anywhere and runs on an off-house
  curve. Delete it.
- **Fonts:** MemoryCard names `"EB Garamond"` and `"Montserrat"` (`app/MemoryCard.tsx:31-32`).
  They are not loaded, but a machine with them installed renders them: the inspector found
  EB Garamond rendering here. Drop the local names so every visitor sees Source Serif and
  Figtree.
- **Dated dashboard props:** `Sat, 17 Aug 2024` and `9:41` status bars inside the drawn
  phones. design.md already says the drawn phones go at their next redesign (hallmark 47,
  re-drawn chrome).

---

## By skill: what is and is not applied

| Skill | Applied | Not applied |
| --- | --- | --- |
| taste-skill | Real photography throughout Home (60 images) and For families; one live thing per page (milestone pile, book flip, call picker, tidy toggle); no horizontal scroll on any route; no `transition: all` | Two-line headlines (#1); fullness and length (#2, #17); picture floor on /our-story (0) and Pricing/Compare (1 each); 29 type sizes on Home (ceiling 5); a single stock reveal (#6) |
| hallmark | Focus-visible instant and visible; `minmax(0,1fr)` on image grids sampled; native-feeling forms with `aria-invalid`, `role=alert` and busy labels | 8 states on kit buttons (#9); gate 6 centred hero (/our-story); gates 8/9/42/43 template rhythm (#12); gate 2 gradient text, gate 12 bounce (#14); gate 13 stacked hover; gate 14 layout animation (#8); gate 39 input border shift; gate 40 contrast (#16) |
| emil-design-eng | `:active scale(0.97)` with a 60ms press on both button systems; hover guarded on kit primary | Curves (#4); over-300ms UI (#10); ease-in on a hover action; hover not guarded in primitives |
| impeccable | Themed focus ring and selection; product's own language; errors name the fallback ("Send it by email instead") | One authored moment per page (#6); eyebrow ban (Bao overrides, but page-name kickers carry nothing); gradient text |
| GSAP skills | matchMedia + revert cleanup; transform-first tweens; `once:true` reveals with no content hidden under reduced motion (prerender is reduced-motion); intro has Skip, Esc and wheel-to-skip | Layout tween (`left`); scrubbed opacity (#7); refresh off Home (#18) |
| humanizer | Plain verbs, spaced hyphens, few banned words (grep found none in copy) | Triads, not-X-but-Y, repeated closer (#13) |

## Inspector FAILs (taste-skill `inspect.mjs`)

Pages: `/`, `/our-story`, `/how-it-works`, `/for-families`, `/pricing`, `/care-communities`,
`/compare`.

| Page | FAILs (ranked gaps first; Bao-allowed ones in brackets) |
| --- | --- |
| `/` | headline-lines (1440, 768, 390); small-text (34); covered-text (intro, story-keeps-going band, "It's the everyday" polaroids); gradient-text; icon-cards (1 row); [eyebrow 20, micro-label 46, gradient 16 (scrims and paper radials), shadow 58, hairline 25, text-shadow 2, button-fx] |
| `/our-story` | headline-lines (all widths); **few-pictures (0)**; icon-cards (where-to-next row); [eyebrow 3, micro-label 5, gradient (highlighter `mark`), shadow 4, hairline 8, button-fx, palette-claude] |
| `/how-it-works` | headline-lines; **contrast 1.8:1**; **empty-screens 3/12**; covered-text at 768; small-text 15; numbering 01-05; [eyebrow 9, micro-label 35, gradient 5, shadow 20, hairline 18, button-fx] |
| `/for-families` | headline-lines; covered-text at 390; [eyebrow 3, shadow 11, hairline 9, button-fx] |
| `/pricing` | headline-lines; few-pictures (1); [eyebrow 8, micro-label 18, shadow 9, hairline 25, outlined-box 5] |
| `/care-communities` | headline-lines; icon-cards; [eyebrow 1, gradient 2, shadow 11, hairline 13] |
| `/compare` | headline-lines; few-pictures (1); numbering 01-04; [eyebrow 2, gradient 1, shadow 12, hairline 7] |

Common WARNs: 11-29 type sizes per page (ceiling 5), grey body text (5.8-6.7:1), no footage,
and the cream palette, which is A Story's own brand and is defended.

**`lint.mjs` on `src/`** (360 FAIL, 97 WARN):
- The FAILs that count are gradient text (FamilyBook.tsx:676) and the emoji ✓ in
  `app/screens.tsx:308`.
- The others are hairlines (146), shadows (127) and numbering (30, mostly dates and sample
  data), which Bao allows or which are not real problems.
- `100vh` in contribute.styles.ts, publicStory.styles.ts and Listen.tsx:27 should be `svh`, per
  design.md.

Screenshots and raw reports are in the scratchpad, not the repo:
`C:\Users\vngia\AppData\Local\Temp\claude\C--Users-vngia-OneDrive---Umich-Desktop-My-startups-A-Story---W-Daniel-Web-App-Ver-Daniel-09212026\04cff20b-3776-4df6-bd0d-d6b89954a7b3\scratchpad\inspect\`
