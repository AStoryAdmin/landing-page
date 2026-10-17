# Design — A Story (astoryapp.com)

The locked design system for this site. Every page change reads this first.
It records the system that already exists in `src/styles/theme.ts`,
`src/styles/global.ts` and `src/pages/site/kit/` — it does not replace them —
plus the rules added in the Hallmark redesign of 2026-10-14.

## Genre
Editorial. A family archive, not a tech launch: warm grounds, a serif voice for
anything a person says, a quiet sans for interface and explanation.

## Grounds and colour
Tokens live in `theme.ts` (`color.*`) and `kit.styles.ts` (`grounds`). Never
write a raw hex in a component; lift it into `theme.ts` first.

- Ivory — the house. Paper — a quieter room. Sand — practical detail.
- Night — openings and the moments the page wants the reader to stop.
- Teal — reserved for the conversation (the calls). One teal scene per page.
- Accent: terracotta on light grounds, brass/gold on dark. ≤ one emphasis word
  per heading.

## Typography
- Display and anything a person says: Source Serif 4.
- Interface, labels, explanation: Figtree.
- **Emphasis in headings is roman, carried by colour** — never italic
  (2026-10-14: fourteen italic `h1/h2/h3 em` rules were made upright). Italic
  survives only in quotations and running body copy.
- Display sizes are `var(--d-*)`, scaled by `--vs` on short screens.

## Height-aware sizing (the laptop rule)
A 16" laptop is nearly as wide as a 32" monitor and a third shorter. Anything
sized only by width (`vw`) balloons on it. Since 2026-10-14:

- **Every section's vertical padding multiplies by `var(--sy)`.** `--sy` steps
  down with screen height in `global.ts` (1 → 0.9 → 0.78 → 0.66 → 0.6).
- **Any large object is capped by height as well as width**: `min(<vw>, <svh>)`.
  Use `svh`, never `vh` (mobile toolbars). Current caps: the everyday collage
  `88svh`, the family book `60svh` tall, the lake-monster phone `80svh`, step
  cards `42svh`, sample covers `34svh`, the One-life band `54svh`.
- **No single element may be taller than the window** at 1280×720.
- Measure before and after: home page was 23.3 laptop screens (1280×720) and
  is 18.3.

## Device imagery
- **New work does not draw device chrome.** Show real app screens as
  themselves: rounded corners, a hairline, cropped to what matters, fading out
  (`kit/AppTour.tsx`). The single drawn phones in StepOne, EveryVoice and
  the How it works walkthrough remain until they are next redesigned.
- Never generate fake UI; screens come from `public/app/` (captured from the
  app) and covers from `/samples`.

## The calls
- One component, `home/Listen.tsx`, on Home and How it works (#calls): pick
  Rosa, Errol or Joan; one still per call — the call's photograph, its setup
  line, the words they let slip set large, and A Story's reply.
- The three-phone player (`app/CallTrio.tsx`) is no longer used; it is kept
  in the repo, not deleted.
- Quotes come from `lib/demoScripts.ts` verbatim via `app/calls.ts`. The
  voice layer is always labelled "in development".

## Showing the app
- No rows of three drawn phones anywhere. App screens appear as cropped real
  screens (Home "The easiest way", How it works, For families).
- "The easiest way" asks who in the family the reader means and shows one
  screen and two sentences at a time.

## The family book (Home)
- Cloth: `kit/cloth.ts` + `book-objects/bookcloth.jpg`, cut from the product
  photo of the closed teal book. Every book on the site wears it.
- Inside cover: the real endpaper - the A mark (`book-objects/a-mark.png`)
  repeated on cloth in the cover colour. Title page in the sample books' style.
- Memory pages stay light: chapter line, title, words set big, one other voice.

## Startup programs
- One component, `components/ui/ProgramMarks.tsx`; NVIDIA's artwork unmodified.
- Size: 48px badges on Home and in the footer, under a 56px footer logo —
  legible, and never larger than the A Story logo beside them (NVIDIA rule).
- Footer only (2026-10-16): the marks and the "Programs & grants" link. The
  labelled row under Home's hero and the nav entries were removed - a
  credential in the main path read as a notice about the company's stage.
  Intro: NVIDIA credit only.
- /programs: one big idea on night, then one verb per program (Build, Hear,
  Answer) setting what the program is for beside why A Story belongs.
  Grand is allowed in A Story's voice; the programs' side is paraphrase.
- Wording: membership and grant status only. Never "backed by", "supported
  by" or "partner".

## Home page order (2026-10-16)
Hero → what gets lost → you do step one → the family book → sample books →
listen → what a call becomes (Proof: the app's memory card, the words raw and
tidied, a real spread of the book) → every memory has more than one witness →
the family loop (three steps on the app's screens) → why we started → the
price ladder → invitation. "The easiest way" and the comparison table left
Home; they live on How it works and /compare. FoundingBand left Home on
2026-10-16 (kept in the repo).

## One price ladder (2026-10-16)
Prices are said once, in `kit/PriceLadder.tsx`, on Home and at the top of
Pricing: the archive (free, forever), the calls (from $119 a year; the $29
founding place and the $1 reservation explained there as early access to the
same calls), the book (print at home free; the printed editions). No other
section on Home quotes a figure; the hero and StepOne lost theirs. Every
number is from `lib/pricing.ts` and `lib/founding.ts`.

## Showing the app's own surfaces (2026-10-16)
`app/MemoryCard.tsx` is the web app's memory card (its component and
astory.css §9) carried over line for line, with the app's inks in
`theme.ts` (`app`). Its book faces are not loaded here - no new fonts - so
it falls through to Source Serif 4 and Figtree, the app's own fallbacks.

## The phone bar (2026-10-16)
`kit/StickyStart.tsx`: on phones only, once the opening has scrolled out of
view, the primary action in one bar at the foot of the window, inside the
safe area (`viewport-fit=cover` in index.html). It steps away when the
closing invitation or the footer is in view, and is not shown on Pricing
(its own decision bar), Reserve, Start, the account or legal pages. No
countdown, no urgency copy.

## Scripts off (2026-10-16)
The `<noscript>` block in index.html is the name, one sentence and where to
write - never a notice that reads as beta, and never a price. The prerender
strips it from the static snapshots.

## Less text (2026-10-15)
Home sections are a headline, one line, a picture and a link; the detail
lives on the topic's own page. Home went from 1,878 words / 18 screens to
about 1,400 / 14 (a third of what is left is the Hartley book's pages).

## /samples (public/samples/index.html)
- A self-contained page outside the React app. The book casts one shadow per
  stack (not one per leaf, which summed to a black halo), and sizes itself
  from the measured space above and below it so the controls never sit on
  the book.
- Its chrome dresses like the site (ivory, Figtree + Source Serif, pill
  buttons); the book keeps its print typography. Fictional families are
  stated once, under the title. Home's sample covers are captured from it.

## Ship rules (audit, 2026-10-15)
- No text under 13px outside the books themselves; tracked capitals are 13px
  with at most 0.16em spacing.
- Every tap target is at least 44px tall (or has a 44px hit area).
- Nothing sticky may cover content the reader has not chosen: the Pricing
  decision bar floats only after a plan is picked; the Questions filter does
  not stick on phones.
- Things that are not links do not look like buttons (App Store line).

## Motion
GSAP via `lib/scrollMotion.ts`. Animate transform and opacity only. Every
scene must be complete with `prefers-reduced-motion: reduce` (the prerender
runs with it). No autoplay of anything long; no pinned scroll scenes.

## Guarded files — never edit
`src/lib/pricing.ts`, `product.ts`, `checkout.ts`, `demoScripts.ts`,
`brand.json`.
