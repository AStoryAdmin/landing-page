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

## Pass 11g

- **Buttons** (kit): pill shape, tracked small caps, arrow in a gold coin that turns on hover.
  Secondary = hairline pill. Applies site-wide.
- **Header**: small-caps links with a gold lozenge for the current page; "Join the waitlist"
  is a pill with the gold coin; the More panel is two columns of serif links plus an
  "Our story" feature card with photo.
- **Footer motto** breaks after "finish —" so the dash stays with the word.
- **"One life. Many witnesses."**: names removed; full-bleed lake photo, dimmed, with the
  two lines and a gold double-rule ornament; slow parallax.
- **Home comparison table**: editorial — no card, hairline rows, serif names, fine check /
  "Partly" / thin rule, raised teal A Story slab.
- **How it works · What the family receives**: illustrated with the app — memory page
  phone, a typed transcript sheet, and the Figma voice player (placeholder text blanked,
  Joan's real words laid in: `public/app/player.webp`).
- **Home · Why we started** (`home/Founders.tsx`): Remento-style photo + Daniel's letter
  excerpt + signature + "Read our story".
- **Our story** rebuilt as two letters on paper. Daniel's is VERBATIM from the earliest site
  (09142026 baseline). **Bao's letter is a draft to approve** (invented family detail).
- **Questions**: concierge card, sticky topic pills + search, roman-numbered chapters,
  answers as cards with a gold +/× coin, "Still wondering?" band.
- **Care communities, Organizations, Your own story (new `/your-story`, aimed younger)**
  share `kit/Audience.tsx`: collage opening, illustrated moments, real app screen + steps,
  statement band, checklist card. Image briefs 12–18 in docs/image-prompts.md.

## Pass 11h

- **Home comparison**: Storii replaces Spomen (beta). Three differentiating rows only
  (versions kept side by side; follow-up questions; one record for the whole family), then
  "The model": built around / finished when / covers. Removed "how they answer" and "core
  product". Marks from lib/landscape.ts.
- **Milestone words**: only "wedding", "graduation", "first house" are live; colour change,
  no underline.
- **Book cover** follows coverbook.pdf: MOMENTS & MEMORIES, date line, italic family name,
  a cluster of prints, a foot line; the inside cover is the dedication page. (Script font
  not added — the site self-hosts its fonts; the names use the serif italic.)
- **Our story**: Bao's own letter ("The story was never told the same way twice."), lightly
  tightened; key phrases in both letters set as a soft gold highlighter.
- **Waitlist (/start)**: full-height split — dark photograph with title, steps on a gold
  thread and the motto; the form as an invitation card (double gold keyline, underline
  fields, pill submit). LeadForm logic unchanged.

## Pass 11j — comparison, rebuilt

- One table component (`compare/CompareTable`) in the founder's reference style (Quippy):
  white card, plain "this, not that" rows from A Story's core values, ✓ / ~ / soft-grey ×,
  tinted A Story column, legend beneath. Data: `HOME_ROWS`, `COMPARE_ROWS`, `SWITCH` in
  lib/landscape.ts (marks from the research matrix; in-development capabilities left out).
- **Home**: Storyworth, Remento, Storii; six rows; "One moment does not need one official
  version" + link.
- **/compare** is now the case for switching: opening → 7-competitor table (adds "their real
  words — never an AI imitation") → "Why families switch" (four reasons) → Joan / Paul /
  the photograph → actions. Removed: market table, documentary contrast, category table,
  "beside what you already use", and the per-competitor "side by side" answers.

## Pass 11k

- **Navigation**: links set in the serif (no capitals, no gold lozenge); the current page is
  terracotta with a fine gold rule under the word; a double hairline under the bar
  (namecard keyline); taller row; the waitlist pill tightened.
- **Our story photographs**: the dinner-table photo is gone. The homepage "Why we started"
  section uses 12 (a hallway telephone, 1981 — the call nobody made) in a portrait frame;
  the header's Our story card uses 31 (the 1958 portrait), which reads better small.

## Pass 12 — craft pass (short screens, browser surfaces, interaction timing)

Run against three installed design skills (`emilkowalski/skills`, `pbakaus/impeccable`,
`leonxlnx/taste-skill`, in `.claude/skills/`). No page was redesigned; the structure,
copy and art direction are unchanged.

### A 16" laptop is a wide viewport with a short one's height

The whole scale was written in `vw`, so a 1536×730 laptop got a 32" monitor's display
type and section rhythm inside two-thirds of the height. Every composition meant to be
read in one look arrived in pieces.

- `display.*` are now custom properties (`--d-hero` … `--d-sm`) declared in `styles/global.ts`
  and multiplied by `--vs`; every chapter's padding is multiplied by `--sy`.
- Four height steps (940 / 840 / 760 / 680px, above 1024px wide) bring both back a notch at
  a time. A tall screen is unchanged — `--vs` and `--sy` are 1.
- Result on a 1536×730 laptop: the homepage is ~1,300px shorter and each section fits its
  viewport again. `theme.displayBase` keeps the literal ramp for the property declarations.

### The surfaces we did not draw

Selection was themed; the caret, scrollbar, underline offset and figure alignment were not.
All now come from the namecard palette (`styles/global.ts`). The keyboard focus ring reads
`--focus` / `--focus-halo` from the ground it lands on — brass on night and teal, where a
chocolate ring on a paper halo was invisible.

### Interaction timing

Hover and press ran on the 520ms / 900ms scroll curves and read as lag. Pills and text
links now answer on 180–220ms, with the arrow coin at 420ms; hover states are behind
`@media (hover: hover)` so they no longer stick after a tap.

### Reveals

`[data-rise]` siblings are grouped by parent and staggered from one trigger, so a row of
cards cascades instead of landing as a slab. Prints settle from 1.035 as they open.

### Fixes found by inspection

- The book and "Why we started" share a ground; two full chapter paddings met there and left
  a third of a laptop screen of empty sand. The seam is closed.
- The eyebrow is `inline-flex`, so in a centred composition (Our story, For families, Care,
  Organizations, Your own story) it centres with the headline instead of sitting in the gutter.
- How it works: the inactive step recedes by colour, not `opacity: 0.3`, which had put the
  heading at 1.7:1 and its sentence at 1.6:1 against the ivory.
- The one-line statement on the audience pages rises as a block; splitting it put an
  `aria-label` on a `<p>`, which ARIA prohibits.
- The comparison close block reads as one 58ch block instead of a full-width line over a
  narrow column.
- The header condenses (84 → 68px, a resting shadow) once the reader leaves the top, and a
  nav link draws its gold rule under the word on hover.

### Verified

`tsc -b`, `eslint src`, `build:static` (22 routes), axe-core WCAG 2.1 AA at 1536×730,
2560×1380 and 390×844: **no violations in the settled state**. Five groups appear only when
the audit samples a frame mid-reveal on the home intro and one card — they clear as the tween
finishes and never occur under `prefers-reduced-motion`, which is what the prerender captures.

Guarded files (`pricing.ts`, `product.ts`, `checkout.ts`, `demoScripts.ts`, `brand.json`)
byte-identical to the 2026-09-24 export.

## Pass 13 — the opening

The first-visit opening is rebuilt from the founder's own idea: the prints rise
along the timeline at their year, gather, and bind into the keepsake.

**The scene** (`home/introGather.ts`) is WebGL (`three`). It was a namecard, then
a CSS-3D book, then a CSS-3D corridor; all three read as flat rectangles, because
what the opening has to sell is depth and CSS perspective cannot light a surface.

1. A brass rule lies across the dark, the year at 1952.
2. As the count climbs, a photograph rises out of the rule at the year it was
   taken. By "Today" a whole life is hanging there, scattered — which is how a
   family actually holds it, and the problem the product exists to solve.
3. They gather, oldest first, into one block at the centre.
4. Boards close over the block and it *is* the keepsake, in the cover the product
   prints (coverbook.pdf: tracked capitals, the date line, the names in brass
   italic, the clustered prints, "Family is everything to us").
5. The volume turns three-quarters under one warm key and the name resolves above.
6. One more photograph arrives *after* the book is shut, and goes in anyway. The
   book is not the end; that is the product, in one gesture.

Teal and brass only — the site's chocolate goes muddy against the teal.

**Cost.** `three` is imported dynamically, so it is a 134 kB gzip chunk fetched
only when the opening actually runs (first home visit per session, motion allowed,
one route). The main bundle is unchanged at ~109 kB gzip. Under
`prefers-reduced-motion` none of it is built or fetched. Any input runs the
remainder out, and there is a Skip.

## Pass 13b — the three skills, applied

- **Eyebrows.** Both skills flag the label-above-every-heading rhythm as the
  single clearest templated tell; impeccable bans it outright, the taste skill
  caps it at one per three sections. Home ran six on nine sections. Twelve are
  gone across Home, How it works, Pricing, Compare, Our story and the audience
  pages; the ones that survive say something the headline does not. ("Side by
  side" went with them — it should have gone in Pass 11j.)
- **Section headers.** A page that opens every section with the statement left
  and its explanation floating right reads as one template repeated. `StackHead`
  is a second header family (statement, house hairline, explanation at a reading
  measure); Home and How it works each had a run of three split headers, now
  broken.
- **One label per intent.** "Begin your story" and "Start your story" were the
  same action as "Join the waitlist" under three names. One label now.
- **Press and hover** (Emil): `:active` compresses (`scale(0.97)`) instead of
  sliding down; the nav rule draws in at 380ms and withdraws at 200ms; the More
  panel scales from its trigger with `@starting-style` instead of appearing from
  `display:none`; `transition: all` is gone.
- **Delight**: an archival print straightens and lifts under the pointer, and its
  shadow opens with it — a photograph picked up off a table. Real prints only,
  pointer devices only.

Verified: `tsc -b`, `eslint src`, `build:static` (22 routes), axe-core WCAG 2.1 AA
at 1536×730, 2560×1380 and 390×844 — no violations in the settled state. The
opening is absent from every prerendered route. Guarded files byte-identical to
the 2026-09-24 export.

## Pass 13c — the inner pages

The skills had reached the inner pages only through shared primitives. This
pass went page by page.

- **The closing band, on every route.** It ran the mission line as an endless
  marquee. The founder asked for a way onward instead: it is now the one
  action beside "Where to next" — three rooms with a line each, the current
  route filtering itself out. One infinite animation removed from every page.
- **The audience section** (For families, Care communities, Organizations,
  Your own story — four pages from one component). Three identical white tiles
  of photo + label + heading + paragraph is the most templated shape on the
  web. They now sit on the ground: one print taken larger because it matters
  more, each in the house keyline frame, the gold rule between the picture and
  what is said about it, and no label above the heading.
- **The occasions** (For families, Your own story). Five equal rounded cards
  became a frieze of prints — square, keylined, alternately dropped so the row
  has a rhythm, the occasion named in the caption voice underneath.
- **Conversation guides.** The four starter questions were four white boxes
  each repeating the same closing sentence; the same words four times is
  filler. They are now four questions under the house rule, and the sentence
  is said once beneath the row.
- **Page openings.** `max-width: 18ch` on a solo title broke a twelve-word
  headline into four narrow lines — a size error dressed as a measure. 28ch.
- **Drawn ticks, not glyphs.** The audience checklist used a Unicode "✓" in a
  sand disc, which reads khaki on paper; the pricing grid used another in a
  `::before`. Both are now the same authored SVG at the site's stroke weight.
- **The letters' highlighter** sat so low it read as an underline; the band
  now covers the x-height.

Verified: `tsc -b`, `eslint src`, `build:static` (22 routes), axe-core WCAG 2.1
AA across 14 routes at 1536×730, 2560×1380 and 390×844 — no violations.
Guarded files untouched (2026-09-20).

## Pass 13d — final runthrough

The routes the earlier passes never opened, plus a mechanical sweep of the
whole codebase for the things the eye misses.

**Routes reviewed this pass:** the seven guide articles, /privacy, /terms and
the 404. All four shapes hold up — the guide article carries a contents rail
beside the text, and the legal pages are appropriately restrained. No changes
were needed there, which is the right outcome for a legal page.

**Mechanical sweep** (grep across `src/`, not by eye):

| Check | Result |
|---|---|
| `transition: all` | none |
| `scale(0)` entries | none |
| `ease-in` on a transition | none |
| Unicode glyphs standing in for icons | 2 found, 1 fixed |
| Raw hex outside the palette | only app-mockup tokens and the intro's documented `ROOM` |
| Type below the 14px floor | all tracked uppercase labels, contrast clean |
| Perpetual animations | 6 found, none of them stopping off screen |

- **The waitlist submit** drew its arrow as a Unicode "→" while every other
  button on the site uses the drawn `ArrowIcon`. It is now the same path,
  painted into the gold coin, with the ink interpolated from the palette
  rather than written as a hex. (The remaining glyph is inside the phone
  mockup, where it is reproducing the app's own UI.)
- **Loops now stop when nobody is looking.** The app mockups ran six
  perpetual animations between them — typing dots, the live mark, the scan
  line and the slow drift over the two large screenshots — and browsers do
  not reliably throttle those off screen, so on a 12,000px page they kept
  compositing for the whole visit. `hooks/usePauseOffscreen` marks a phone
  `data-paused` when it leaves the viewport and one rule in `global.ts`
  pauses everything beneath it. Pausing rather than cancelling means a loop
  resumes where it left off. Verified: visible phones run, off-screen phones
  are paused.

**Verified across all 22 routes:** `tsc -b`, `eslint src`, `build:static`,
axe-core WCAG 2.1 AA at 1536×730, 2560×1380 and 390×844 — no violations; no
console errors or failed requests on any route. Guarded files untouched.


---

## Pass 14 — NVIDIA Inception membership

A Story Technologies, Inc. was approved into the NVIDIA Inception program on
6 October 2026. This pass carries that fact on the site, inside NVIDIA's rules.

### The rules, from NVIDIA's own guidelines

Read from `design.nvidia.com/partners/inception/nvidia-inception-program/`
(Member Badge, Writing About the Program, Examples of Usage):

- Badge artwork is never recreated, recoloured, re-proportioned, or its text
  altered. The two SVGs in `src/assets/partners/` are byte-for-byte the files
  from the member pack (md5 verified against the download).
- The badge is never larger than the partner logo beside it, and never under
  30px tall.
- "NVIDIA Inception Program" in a headline, "the NVIDIA Inception program"
  mid-sentence. Never "NV Inception", "Inception Program by NVIDIA", "Nvidia".
- Membership only — never endorsement, investment, partnership or backing.
- Trademark attribution wherever the marks appear.

### What the artwork forced

The badge carries **its own white card** — a white rect under a black keyline
is part of the drawing. So no placement frames it; they give it clear space and
nothing else. An earlier version mounted it on a brass-hairline plate, which
read as a frame around a frame.

### Placements

| Where | Treatment |
|---|---|
| **Intro** | Title-card credit, top left, opposite Skip intro. Label + badge at 34px. Label hides under 720px wide or 560px tall. |
| **Hero** | "PROUD MEMBER OF" in brass small-caps + badge at 40px, in the text column under the actions, on a brass hairline. |
| **Our story** | Full section: headline, co-brand lockup, NVIDIA's approved boilerplate, what it means for a family, and the not-an-endorsement line. |
| **Footer** | Badge at 34px under the contact line, sitewide. Trademark attribution once, on its own row. |

### Two design problems and their fixes

**The badge was unrecognisable.** First version was a bare badge in the hero's
bottom-right corner. At the size NVIDIA's own rule allows, the words inside the
artwork are unreadable — so nobody could tell what it was, which is no honour
to the company that gave it, and a white card floating on the photograph was
not ours either. Fixed the way the sites that carry this well do it: **the words
do the recognising and the badge confirms them.** A brass small-caps label sits
beside it, and the pair moved into the text column with the headline.

**The badge was under-scaled on Our story.** Alone, it is capped at the 40px of
the header logo, which is lost in a section that wide. Setting the A Story logo
and the badge at the same 52px in a lockup satisfies the rule exactly (120x52
against 165x52) and gives the credential its weight.

### Editorial

A developer program means nothing to a daughter deciding whether to call her
father, so NVIDIA's description of the program is followed by what it buys her:
tools that hear a name said once, an accent, a sentence that restarts. The
section closes by saying plainly that membership is not endorsement or
investment — honest, and what the guidelines require.

### Verified

`tsc -b` clean · `eslint src` clean · `build:static` 22 routes ·
**PASS 42 public-page accessibility states** · zero console errors and zero
failed requests across /, /our-story, /pricing at 1536x730 and 390x844 ·
no horizontal overflow · guarded files still 2026-09-20 · badge md5 matches the
source download.

### Pre-existing, not from this pass

`qa/greenfield/interactive-a11y.mjs`, `verify.mjs` and `static-audit.mjs` drive a
button named **"Follow the thread"** and a `.gf-thread-answer` selector. Neither
string exists anywhere in `src/` — they are from an earlier homepage. The
interactive half of `npm run a11y` has been failing on that selector since the
rename; the public-page sweep above is unaffected.

## Publication refinement - 6 October 2026

Merged the new NVIDIA membership files into current main while retaining the
new pricing, account pages, hyphenated search title and publishing setup.

The intro, hero and footer share a readable badge-plus-membership credit.
Our Story uses a two-column editorial layout, with larger company and member
marks on the left and the supplied explanation on the right. Phones stack
the columns. The membership explanation and trademark attribution remain.
Official SVG artwork matches the supplied Inception Badges.zip byte for byte.

Lint, lead contract checks and the 22-route static build passed. Desktop and
390px phone captures have no horizontal overflow or page errors. Source and
rendered copy checks found no long dashes; the search title remains
“A Story - Your Family’s Living Memories”. The build retains its existing
large JavaScript chunk warning.
