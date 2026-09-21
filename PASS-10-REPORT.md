# Pass 10 — Most of a life goes undocumented

A redesign of the homepage and the site chrome toward the craft level of Bearplus's work
(CargoKite, Binder): motion authored by scroll position, very large type, numbered
editorial sections, and one message per scene. Palette, typefaces, photography, logo and
product facts are unchanged; they remain fixed by `docs/design-brief.md` §4.

## What changed

- **The company's opening line is back as the headline.** `mission.md` warns it was lost
  once; it now opens the site over photograph 27 (someone mid-story at dinner).
- **The page follows the mission's five movements in order**, numbered (01)–(05):
  what gets lost · not a memoir · how it works · everyone who was in the room · the book.
  (06) states the facts plainly; the close asks once.
- **Motion is tied to reading.** The timeline from 1952 to today scrolls sideways while
  pinned; Joan's call builds one layer per verb; the lake photograph opens and three voices
  join it; the section 02 sentence fills in word by word. GSAP ScrollTrigger + SplitText,
  set up in `src/lib/scrollMotion.ts`.
- **First-visit intro** counts through the years of the archive, 1952 → Today, instead of
  a percentage. Once per session; skipped under reduced motion.
- **Header** loses the announcement bar, floats transparent over the opening, tucks away on
  scroll down and returns on scroll up. Mobile menu is a full-screen sheet.
  **Footer** ends on the wordmark set at the full page width.

## Open decisions from the brief, as this pass answers them

- **§9a, the teal book:** teal is the colour of what A Story hands you — the call in (03)
  and the book in (05) — and nothing else. The book stands on cream beside a teal panel.
- **§9d, the contemporary photographs:** 20, 21 and 35 sit on the same timeline as 1952,
  making the argument that today's ordinary afternoon is tomorrow's missing story.

## Verification

- `tsc -b` and `eslint` clean.
- `npm run check`: lint, lead-contract tests, build and all 20 prerendered routes pass. The
  final source-comparison step cannot run in this checkout — it reads
  `../_reference-review/`, which is not in the Pass 9 zip. The four guarded files
  (`pricing.ts`, `product.ts`, `checkout.ts`, `demoScripts.ts`) and `brand.json` were
  compared byte-for-byte against the zip instead: unchanged.
- axe-core (WCAG 2 A/AA) on the homepage at 1440 and 390: no violations in the settled
  state. Mid-scroll, section 02's words are deliberately faint until reached; the sentence
  is exposed whole to assistive technology.
- No horizontal overflow at 390px. Desktop reviewed at 1440×900.

## Not yet done

- Supporting pages (How it works, For families, Pricing, Our story, Start…) take the new
  header and footer but keep their Pass 7 bodies. They should be rebuilt on
  `home/parts.tsx` and `scrollMotion.ts`.
- `pass9/` and the Pass 7 homepage scenes (`ArchiveHero`, `MemoryLens`, `ArchiveBloom`,
  `LifeActs`) are no longer imported and can be removed.
