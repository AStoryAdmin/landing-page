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

## Startup programs
- One component, `components/ui/ProgramMarks.tsx`; NVIDIA's artwork unmodified.
- Size: 48px badges on Home and in the footer, under a 56px footer logo —
  legible, and never larger than the A Story logo beside them (NVIDIA rule).
- Home: one labelled row under the hero ("Startup programs & grants" → /programs).
  Footer: the marks. Intro: NVIDIA credit only.
- Wording: membership and grant status only. Never "backed by", "supported
  by" or "partner".

## Home page order (2026-10-14)
Hero → what gets lost (programs row on top) → you do step one → the family
book → sample books → listen → every memory has more than one witness → the
easiest way → why we started → founding families → how A Story compares →
invitation.

## /samples (public/samples/index.html)
- A self-contained page outside the React app. The book casts one shadow per
  stack (not one per leaf, which summed to a black halo), and sizes itself
  from the measured space above and below it so the controls never sit on
  the book. Home's sample covers are captured from it.

## Motion
GSAP via `lib/scrollMotion.ts`. Animate transform and opacity only. Every
scene must be complete with `prefers-reduced-motion: reduce` (the prerender
runs with it). No autoplay of anything long; no pinned scroll scenes.

## Guarded files — never edit
`src/lib/pricing.ts`, `product.ts`, `checkout.ts`, `demoScripts.ts`,
`brand.json`.
