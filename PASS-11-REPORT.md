# Pass 11 — One publication, every page

Pass 10 gave the homepage motion and scale and left the other nineteen routes on
older systems; GPT's follow-up pruned a lot of clutter but flattened several pages
and re-wrote code in a compressed style the repo's conventions reject. This pass
keeps what worked from both and rebuilds every route on one kit.

## The critique this pass answers

**1. The site explained itself instead of showing.** Photo captions ("Illustrative
archive photograph"), numbered section labels, a scripted-example notice under
every demo, a five-tab workbench on How it works. Each told the reader what they
were looking at. → One disclosure remains, in the footer ("About the examples").
Captions survive only where they add meaning (a year on the timeline, "An afternoon
at the lake · Summer 1975").

**2. The type spoke in the wrong voice.** Very large Figtree read as a tech launch.
The brand's own artefacts — the namecard ("Not a memoir to finish"), the app's
onboarding — speak in Source Serif with one keyword in terracotta or brass. →
Headlines are serif everywhere; Figtree carries explanation, labels, controls.
Italic is reserved for quotations and one emphasised phrase, not every second line.

**3. Decoration had no semantics.** Rounded cards, arches on unrelated pages,
shadows on interface panels. → Three ornaments, each with one meaning: the ivory
**mat** (a physical print — archival photographs only; contemporary ones are
bare), the **gold keyline plate** (a sentence the family should treat as precious —
used once per page), and the **rising cream edge** from the app (turning the page;
used once, after the hero).

**4. The strongest proof was missing.** The previous live site's best line —
"Three calls. Nobody changes the subject." — and its best evidence (Joan's family
six weeks later, the voice passage) had been lost. → Home's signature scene is the
three calls; How it works shows the complete calls with the interviewer's reasoning
in the margin, then what the family receives and adds.

**5. Secondary pages were variations of Home, or documents.** → Each route has one
job and its own composition: How it works = mechanism in three acts; For families =
five reasons someone begins; Our story = the founder's essay as six changes of
light; Pricing = a decision page; Care/Organizations = situations + what to agree;
Questions = scan and search; Guides = questions you could ask tonight.

## Decisions

- **Colour.** Brown/cream stays the house: it is the luxury register and the app's.
  Teal is not widened into a second base — large teal fields read institutional.
  Instead teal behaves like the namecard's second edition: it marks the two things
  A Story hands you, **the conversation** (Home's three calls, Our story's
  resolution) and **the book** (the binding, staged on the dark "night" ground).
  Terracotta is one word per headline; small text uses its deeper tone for 4.5:1.
- **Intro.** Rebuilt as the namecard: chocolate card, crop marks, centred lockup,
  "Your Family's Living Memories", "A story of you, by you, and yours"; the year
  runs 1952 → Today where the card prints the web address, then the card grows to
  fill the screen and lifts.
- **Voice.** `demoScripts.ts` says storing the storyteller's own audio is still being
  built, so every place the voice layer appears carries an "In development" mark.
- **Photography.** No new images were generated. Each image now has one job and
  appears once: 27 (hero), 02/04/03 (milestones), 28/29/17 (what gets lost),
  30 (the lake, Home only), 01…35 (the timeline), 33 (How it works), 34, 12, 25, 23
  (For families), 31 and 05 (Care). Our story and Organizations use none — a
  generated family would read as evidence of a real one.

## What GPT changed, and what survived

Kept: the nav (How it works · For families · Pricing · Our story · More), the
compact footer with the single disclosure, removal of the giant wordmark, the
hero's shorter lead and its unmount guard, the colour-based (not opacity) word fill,
the book's cover/inside toggle, removal of decorative openers on the sensitive,
care and retirement guides.
Replaced: its How it works demo and workbench, its homepage book section, the
homepage FAQ, and the one-line compressed components (house style requires
comments and readable structure).

## Verification

- `tsc -b`, `eslint`, the lead-contract tests, the production build and all 20
  prerendered routes pass. The final step of `npm run check` (source comparison)
  needs `../_reference-review/`, which is not in this checkout; the guarded files
  (`pricing.ts`, `product.ts`, `checkout.ts`, `demoScripts.ts`, `brand.json`) were
  compared byte-for-byte against the Pass 9 zip instead: unchanged.
- axe-core WCAG 2 A/AA: no violations on 14 routes at 1440 and 390 (settled state).
- No horizontal overflow on any route at 390px.
- The pre-pass source (including GPT's edits) is backed up outside the repo.

## Still worth doing

- Real product evidence: a clean screen recording of a call in the app, and the
  book photographed physically, would outperform any further synthetic imagery.
- `src/components/` still holds original-codebase modules nothing imports
  (`demoPhone`, `flipBook`, `product/*`, `ui/Reveal`…); `src/lib/joanArchive.ts`
  is now unused too.
