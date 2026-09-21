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

## Pass 11b — the app, a real family, a book you can turn

- **The app is on the page.** `src/pages/site/app/` rebuilds the founder's Figma
  screens in HTML (call, memory with family versions, home with the question of
  the day, incoming call, archive with the review banner), sized in container units
  so one phone scales from thumbnail to hero.
- **Relatable examples.** `src/lib/homeExamples.ts` holds one fictional family —
  a mum journaling her daughter, Grandpa at his workbench, two old friends, a lake
  monster four people remember differently. Photographs are library stand-ins until
  the generated images arrive; briefs are in `docs/image-prompts.md`.
- **Three calls** now play inside the app's call screen (the scripts are unchanged).
- **Collaboration** is shown, not captioned: the family's additions fly into the
  memory in the app and wait for the storyteller's review.
- **The timeline is a book.** `home/FamilyBook.tsx` replaces the sideways timeline
  and the separate book section: a teal cloth hardcover on cream whose pages turn
  from 1952 to a blank page for what comes next (brown behind teal is gone).
- **Closing band** (superseded in 11c) was teal on brass; the spinning seal is removed; "You do step one"
  shows each step in the app.

## Pass 11c

- **Closing band beside the footer** is now sand (`color.sand`, the app's own
  mission-screen yellow) with chocolate type and one terracotta phrase, rising on a
  curve into the chocolate footer. Saturated brass next to near-black read as a
  warning stripe; brass stays a keyline colour only.
- **Descenders.** SplitText line masks clipped g/y/p. `openMasks()` in
  `lib/scrollMotion.ts` pads every mask by 0.16em (and pulls the margin back), used
  by `riseLines` and the hero.
- **How it works** shows only the turn where each call pivots, with "Read the whole
  call" to expand (`CALL_META` in `HowItWorks.tsx`).
- **Mission copy** from the 18-screen onboarding source now carries the home page
  (What gets lost, Three calls, Every voice, the book).
- **New page: `/compare`** — "How A Story is different". Content lives in
  `lib/landscape.ts`, taken verbatim from `A_STORY_COMPETITIVE_LANDSCAPE_2026.txt`:
  product models first, documentary vs memoir, the philosophy map, what one memory
  holds, genealogy/digitising/DIY, the full ●◐○ matrix folded, and "Why not…?"
  answers. No crosses, no "only" claims, investor framing left out. Linked from
  header More and the footer; social image `public/og/compare.jpg`.
  **Re-check the landscape facts before launch** — dated September 2026.

## Pass 11d

- **Phone frame** (`app/Phone.tsx`) is sized from its own width (`cqw`): thin even
  bezel, matched corner radii, side buttons. The lumpy corners are gone everywhere.
- **What gets lost** is three rooms, after the app's onboarding (CM02–CM05):
  the milestone words are live — hover, focus or tap and that print is pulled from
  the pile and laid on top (it shuffles itself until touched); "It's the everyday."
  sits in a drifting scatter of everyday prints on chocolate, then the three
  moments as polaroids; then "Nothing special happened that day" — the photograph
  fades as you scroll ("Quietly.") until the sand panel rises with "A Story exists to
  catch what the photograph can't" and the photo returns with the story caught behind it.
- **Three calls** plays like a film (`app/CallPlayer.tsx`): autoplays in view, typing
  pauses, chapter bar (It asks / listens / follows / remembers), play-pause-replay,
  and ends on "Saved to Joan's archive". Shared with How it works.
- **Every voice**: invited slots wait in the phone before each version arrives; notes
  refined; warm light under the phone.
- **The book** arrives closed (teal cloth, gold foil) and opens itself; endpaper with
  bookplate, title page; each spread laid out like the app's memory page (date, tags,
  drop cap, a second family voice); the last spread is the mission's ending — contact
  sheet with an empty frame, "Today belongs here too", "The story keeps going.
  Because so do you." and Begin your story. Timeline scrubber under the book.
- **Home comparison teaser** (`home/WhereWeSit.tsx`) before the closing band: one
  axis from "one narrator · a finished book" to "many witnesses · still growing",
  three product models, link to /compare. Locked wording from `lib/landscape.ts`.
- **How it works** rebuilt: sticky phone walkthrough (five moments), the call player,
  the complete annotated conversations folded under "Want every word?", the five
  rungs as a staircase, card / transcript / voice as three objects, "Good. Neither is
  this.", and the volume.

## Pass 11e

- **Real Figma screens.** 14 screens from "APP A Story Us 2026 for Web.pdf" exported to
  `public/app/*.webp`; `AppShot` (app/Phone.tsx) shows one inside the phone frame, tall
  ones scrolling slowly. Used in Step one, Families, and the QR section.
- **"Nothing special happened"** pinned scene removed. One static sand section (`CatchRoom`)
  curves up out of the everyday collage: "A Story exists to catch what the photograph
  can't" + the photo with its caught story, one crisp entrance.
- **Three calls** → `app/CallTrio.tsx`: three large phones, each opening on a cover
  (photo, the storyteller's line, Play). Press play and that call runs; the mission verbs
  above light up as it goes. `CallPlayer.tsx` deleted. Used on Home and How it works.
- **Every voice** plays once in full on arrival (no pin/scrub), resets above; wider notes,
  larger phone.
- **Book opening**: the left board waits until the cover passes the spine.
- **Step one**: large, zoomed-in phones with the real Home and Archive screens. Fixed a
  leaking `li p` style that had made the incoming-call screen unreadable.
- **Home comparison** is now a table (categories, not named products; ✓ / half / dash — no
  crosses; fair marks for others). **/compare**: 2×2 map removed; "Why not X?" → "A Story
  and X"; model columns relabelled "Built for a memoir / Built for a family record".
- **Pricing**: "Compare every plan" table (Free · Express · Individual · Family), every cell
  from pricing.ts; column heads select the plan.
- **How it works**: "Want every word?" replaced by three short "moves" cards; new QR section
  (scan a family's code → their story). Slipcase photo (39) removed site-wide — never use it.
- **For families**: new Occasions row and "Better together" (real app screens). Image
  briefs 6–11 in docs/image-prompts.md; placeholders are library photos until then.

## Pass 11f

- **Home comparison** is now A Story vs Storyworth, Remento and Spomen (`home/WhereWeSit`),
  Remento-style rows (bold benefit + one line) and a "The details" block; no lead
  paragraph; quiet dash, never a cross. The category table moved to /compare
  (`compare/CategoryTable`).
- **/compare opening** redesigned (`compare/CompareOpening`): chocolate ground, the lake
  photo as a gold-matted print with the four family versions around it.
- **Closing banner**: smaller type, slow constant drift (110s loop, no scroll speed-up).
- **"One life. Many witnesses."** is a full-width chocolate takeaway with a double gold
  keyline, the four witnesses on one thread, "Not a diary. A documentary."
- **Book**: the separate front board is gone — the cover's inside (endpaper on cloth) is
  the left board, so nothing appears behind the cover as it opens. Book padding in %
  (cqw resolved against the viewport and misaligned the boards). Prints fit their frames.
- **How it works**: walkthrough uses the real Figma screens (Home, memory, Archive);
  "How deep it goes" is a descent — one real question per step, stepping in, sinking
  below a curved teal surface.
- **Pricing book** now on sand, not chocolate.
- New photos (image for claude/, H01–H04, F01–F06) were already wired in by the founder.
