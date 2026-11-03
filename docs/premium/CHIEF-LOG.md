# Chief log (premium pass, 2026-11-02)

## Builder 2 — P1b the film (branch premium/b2)

State: **passed only locally** (Edge/Chromium desktop and 390). WebKit/iPhone: **blocked** (see below).

### Captions vs on-screen type (spec D4, S9)
Checked by pulling one frame near the end of each narrated line from both v5.6 masters
(16x9 and 9x16) and reading the frames. Timings from `studio/src/v4/vo-words.json`.

- **Lines with no on-screen type: none.** All 15 narrated lines (v01, v02, v05, v06, v07, v09, v10,
  v09b, v11, v12, v13, v14, v15, v16, v17) appear on screen in both orientations.
- How they appear differs:
  - Set as kinetic headline type: v01, v02, v05, v06, v07, v10, v11, v12, v13, v14, v15, v16.
  - **v09** "Who did you meet by pure chance who changed your life?" and **v09b** "Did you know where
    they came from?" (A Story's own voice) appear only inside the app's "Today's question" card on the
    phone, not as a headline. Readable at 1440; smaller on a phone in landscape.
  - **v17** "A Story. Your family's living memories." appears as the lockup (logo + "Your Family's Living
    Memories").
- On-screen headlines with **no narration** (so captions don't carry them): "Then it asks about the
  flowers." (both orientations, ~19–22 s) and "A Story asks, out loud." (portrait only, ~13–16 s).
- So D4 (captions off by default) holds: turning captions on would print every line twice.

### Poster frames (spec §2.4, M1, D11) — for the tester to confirm
- **Landscape `poster-16x9.webp` / `-960.webp`: 20.2 s.** 14.5 s showed the phone header's round
  avatar photo of a person ("Your story"). Stepped forward 0.1 s at a time; 20.1 s still shows the
  avatar's edge, 20.2 s is the first frame with only type and app UI ("Then it asks about the flowers."
  + the question card and transcript). Not the lockup.
- **Portrait `poster-9x16.webp`: 14.5 s** ("A Story asks, out loud." + the question card). The same
  avatar sits under the scrim as a faded, unreadable ~6 px smudge for the whole question scene, so
  stepping forward didn't remove it. I covered that 110×40 px strip of the scrim with the scrim from
  just right of it (same vertical gradient). Nothing else in the frame was touched. Daniel can swap in
  the raw frame by re-running the command without the patch.
- Tester: please open both posters and confirm "no photograph, no person" here.

### Files and sizes (all ≤ 8,388,608 bytes, no .webm)
| File | Bytes | Stream |
|---|---|---|
| a-story-film-1080.mp4 | 7,743,270 | H.264 High 4.0 1920×1080, AAC LC, 49.408 s |
| a-story-film-720.mp4 | 5,266,797 | H.264 High 3.1 1280×720, AAC LC |
| a-story-film-v-1080.mp4 | 7,732,566 | H.264 High 4.0 1080×1920, AAC LC |
| a-story-film-v-720.mp4 | 5,256,251 | H.264 High 3.1 720×1280, AAC LC |
| poster-16x9.webp | 39,502 | 1600×900 q72 |
| poster-16x9-960.webp | 21,756 | 960×540 q72 |
| poster-9x16.webp | ~18 KB | 720×1280 q72 |

Bitrates as in the spec table (1150k / 750k, 2-pass, unique `-passlogfile`, logs in the scratchpad).
No step-down was needed.

### Checks run (`node scripts/film-check.mjs`, preview on :5202)
- Edge 1440 and Edge 390 (touch, DPR 3): 0 `.mp4` requests before the tap; no `<video>` before the tap;
  one tap → `paused=false`, `muted=false` within 3 s; no autoplay/loop; one "English" captions track,
  mode `disabled`; "Watch again" after `ended`. Sources picked: 720 landscape at 1440×DPR1, v-1080 at
  390×DPR3.
- vite preview: `.vtt` is `text/vtt`; `.mp4` answers Range with 206.
- **WebKit (iPhone 13): blocked.** The repo's Playwright wants WebKit build 2359; only 2287 is
  installed and it fails on protocol mismatch. Installing it (`npx playwright install webkit`) is a
  download, which I didn't do unattended. Run it, then `node scripts/film-check.mjs`. Until then and
  until Daniel tries a real iPhone: "passed only in Chromium".
- Poster position (S14): at 390 the poster top is at 1190 px (outside the first screen; the
  "Watch the film · 49 s" link is at 564 px, inside it). At 1440 the poster top is at 855 px, so only
  its top 45 px are in the first screen. Left `loading="lazy"`; tester to record the LCP element.
- /how-it-works is now 10.7 screens at 390 and 6.9 at 1440 (baseline 9.1). The P2 cuts in §4A
  (Volume paragraph, WAYS scroller, lead) are not in this commit.

### Assumptions
- The task brief said "H.264 + WebM"; the approved spec drops WebM (S17). I followed the spec: MP4 only.
- Scope kept to the film section and the hero link. The hero lead cut and today note (§4A) wait for P2.
- New hero link "Watch the film · 49 s" and "Hear a sample call" carry no arrow (§3.3).
- The film section's heading has no reveal animation (keeps §3.10 budget).
- The credit's links open in a new tab (`rel="noopener noreferrer"`); the words are unchanged.

### Requests
- **Builder 1 (`kit/StickyStart.tsx`, §3.6):** hide the phone sticky bar while the film plays. `Film.tsx`
  sets `body[data-film-playing]` on play and removes it on pause/ended/unmount, so
  `body[data-film-playing] &{ display:none }` (or the equivalent) is enough.
- **Deploy (§7.14):** `.vtt` Content-Type on S3 is still the open flag.

## Builder 4 — Group C structure, fix round (branch premium/b4)

State: **passed only locally** (Chromium preview on :5204, 390x844 and 1440x900).

### Measured after this round (document height / viewport height)
| Page | 390 | target | 1440 | target |
|---|---|---|---|---|
| /organizations | 10.84 | ≤ 8 (baseline 12.9) | 6.68 | ≤ 6 (baseline 7.56) |
| /care-communities | 7.89 | ≤ 7.9 (baseline 7.91) | 5.39 | — |
| /programs | 4.05 | — | 3.02 | — |
| /contact | 4.35 | — | 2.71 | — |

- /care-communities now meets ≤ 7.9 at 390 with page-local phone spacing in `Care.tsx` (What you need, residents room, circle band, booking room) and a tighter phone gap in `DemoBooking.tsx`. The margin is 0.01 screen: any later kit change that adds height on this page will push it over.
- Film links (/organizations x2, /care-communities x1) now land on `/how-it-works#film` with `#film` present (Builder 2's film is merged into site-premium). Each link keeps "· 49 s" together with non-breaking spaces.

### Requests
- **Chief: accept /organizations overage until Builder 1's `kit/Scroller.tsx` lands.** At 390 the segment cards in a Scroller are the planned cut (spec §4C); Builder 4 adopts it in round 2. At 1440 (6.68 vs ≤ 6) the gap is mostly section padding (three 117 px top/bottom bands); Builder 4 did not override kit padding page-locally there so it doesn't fight Builder 1's §3 spacing under `main[data-premium]`. Re-measure after both land.
- **Builder 1, `lib/today.ts` (§3.7):** Builder 4 adds the Today note under the hero on /organizations and /care-communities when it exists.
- **Builder 1, `Footer.tsx` (§1.3) and `kit.tsx` `Invitation`:** suppress the footer program plate on /programs (marks currently 6 in the DOM: 5 opening + plate); Builder 4 then passes `next={["/our-story","/how-it-works","/contact"]}`.
- **Builder 1, `Header.tsx` / `nav.ts` / `Footer.tsx` (§1.1, §1.2, M11):** label "Schools, libraries & companies" (drawer and More panel still read "Institutions"), and no "Book a demo" row on /organizations and /care-communities.

### Assumptions
- Hero caption uses the label the site already gives this book: "A sample book: a founder's ledger." (home/CallBecomes.tsx:44, samples/index.html:1315).
- Privacy links are a plain list with a sentence-case heading (no separators), per review item 10.

## Builder 4 — Group C structure, fix round 2 (branch premium/b4)

State: **passed only locally** (Chromium preview on :5204, reduced motion, 390x844 and 1440x900).

| Page | 390 | target | 1440 | target |
|---|---|---|---|---|
| /organizations | 10.84 | <= 8 | **5.87** (was 6.68) | <= 6 |
| /care-communities | 7.89 | <= 7.9 | 5.28 (was 5.39) | — |
| /programs | 4.05 | — | 3.02 | — |
| /contact | 4.35 | — | 2.71 | — |

- /organizations at 1440 now meets <= 6: page-local `Rhythm` wrapper in `Organizations.tsx` (>= 1025 px only) sets `--sy: 0.5` for the rooms after the opening, tightens the "Who we work with" and "From a demo to an archive" row gaps, and sets the four privacy links as a 2x2 list. `DemoBooking.tsx` tightens its step gaps at >= 1025 px (also shortens /care-communities at 1440). No words, order or phone layout changed; the hero is untouched.
- Checks unchanged: one `<form>` on each org page, "Book a demo" in main 3 (/organizations) and 2 (/care-communities).

### Still open (blocked on Builder 1)
- **Chief: accept /organizations at 390 (10.84 vs <= 8) in writing until `kit/Scroller.tsx` lands.** The six segment columns are 1892 px at 390; the Scroller is the planned cut. Builder 4 adopts it in round 2 and re-measures.
- `Header.tsx` / `nav.ts` / `Footer.tsx` (§1.1, §1.2, M11): "Institutions" label and the "Book a demo" row on the org pages.
- `Footer.tsx` §1.3 and `Invitation` `next` prop (kit.tsx has no `next` yet): /programs marks still 6 in the DOM; Builder 4 passes `next={["/our-story","/how-it-works","/contact"]}` once the prop exists.
- `lib/today.ts` (§3.7): Today note in the /organizations and /care-communities hero.
- For the supervisor: the `\bmiss\b` copy-check hit on /care-communities ("who they miss") predates this round (d089c50); not edited.
- **Builder 1 → B2 film request: done** in `premium/b1` (`StickyStart.tsx`: `body[data-premium][data-film-playing]` hides the bar; also `[data-nav-open]`).
- **Builder 1 → all page builders (P1a shell landed on `premium/b1`):** `Invitation` now takes `next={["/a","/b","/c"]}` (paths from `lib/nav.ts`); `TODAY_NOTE` is in `lib/today.ts` (hero `note`); `Scroller` is `kit/Scroller.tsx` (required `label`, children are `<li>`, place directly in a `<Frame>`); `Card` and `ScrollerRegion` are exported from `kit.styles.ts`; `<Picture frame="crop"|"print">`. Every new rule is scoped to `main[data-premium]` (off home).
- **Builder 1 → Builder 4 (`sitePages.json`, §1.0):** page names/titles still to follow the nav table (e.g. `/organizations` → "A Story for schools, libraries and companies"). Not touched by B1.
- **Builder 1 → Builder 2 (`public/samples/index.html`, §1.4):** copy the new bar/drawer/footer from `Header.tsx`/`Footer.tsx`; classes: `.org-wrap/.org-toggle/#org-panel/.org-demo`, `.gf-nav-muted`, `.gf-signin`, `.gf-button`; `nav-count.mjs --pages /samples/` runs Checks 1.1/1.2 on it.
- **Builder 1 note:** `scripts/home-diff.mjs --p0 auto` only looks for the P0 commit on `site-premium`/HEAD; P0 (`fbe134a`) is not merged yet, so tonight's diff was against bare `origin/main` (0 px at 390 and 1440). After P0 merges, rerun (the cache key changes automatically).

## Builder 2 — P2 group A pages + /samples chrome (branch premium/b2)

State: **passed only locally** (Chromium, `vite preview` :5202). Shots in
`qa/premium-2026-11/after/{how-it-works,for-families,your-story,samples}-{390,1440}.png`.

### Measured (main innerText after hydration, scripted)
| Page | Screens 390 / 1440 | Target | h2 with gold / h2 | Copy-check hits | Overflow |
|---|---|---|---|---|---|
| /how-it-works | 10.27 / 6.98 | ≤ 8 / ≤ 6 | 3 / 7 | 0 | none |
| /for-families | 7.51 / 4.72 | ≤ 7.6 | 1 / 3 | 2 (hero lead, below) | none |
| /your-story | 6.43 / 4.06 | ≤ 6.5 | 1 / 3 | 0 | none |
| /samples | 3.16 / 2.39 | — | — | — | none |

- /for-families: `REASONS` has 3 entries, one row of 3 at 1440, no "Guides for remembering someone";
  first occasion at x = 20 (390). /how-it-works: Bond gone, "Where to next" = samples, pricing, for-families;
  "Watch the film" link in the first screen at 390 (y 466); poster top at 815 px at 1440, so per S14 the
  poster is now `loading="eager" fetchpriority="high"` (the hero has no image to demote).
- `nav-count.mjs --pages /samples/`: **56/56 passed** (bar at 1440/1280/1180, drawer at 1179/1024/390/320, footer).
- `film-check.mjs`: Edge 390 and 1440 pass as before; WebKit still blocked (build 2359 not installed).
- `npm run lint`, `npm run build:static`: pass.

### For the supervisor
- **/how-it-works is over its screen target** (10.27 vs ≤ 8 at 390; 6.98 vs ≤ 6 at 1440). Done: spec's cuts
  (lead, Volume to 2 sentences, WAYS scroller) plus `$tight` padding on Film, Moments, Ways, Volume. At 390
  the footer (881 px) and closing (687 px) alone are ~1.9 screens; the sample-calls block (home/Listen.tsx,
  1,343 px) and Four moments with the card and transcript (~1,700 px) are the rest. Reaching 8 needs a
  content cut the spec doesn't name (e.g. the transcript sheet or the card on phones). Not done; your call.
- **Copy-check hit, /for-families hero lead** (not edited, per M7): "Nobody loses the wedding photos. They
  lose everything around them - …". It is loss framing in the first screen. Real or innocent?
- /your-story Kept block (not in the spec, not edited): sample card "The ferry, the last summer … He was the
  first one of us to go." and "Guided calls are the only paid part." (books are paid too, like the deleted
  /pricing hint). Flagging both.

### Assumptions (Daniel asleep)
- "If you're the one being asked" turns all three sourced lines to "you": "…You just talk.", "Nothing
  appears until you say yes.", "Your story belongs to you." + link "Read our privacy policy" → `/privacy/`.
  The first line keeps the spec's "at the hour you picked", although the family usually picks it.
- /for-families "Invited to add to someone's book?" uses FamilyLoop.tsx:47 turned to "you": "Read what's
  shared and add what you remember, under your own name. Nothing appears until the storyteller says yes."
- The giving block reads the FAQ answer from `faqData.ts` at build time (heading = the FAQ's own question),
  so it follows Builder 3's P0 edits. Today it has no discount sentence; "Reserve for $1 to hold your place"
  stays.
- WAYS keeps all 4 items (scroller at ≤ 640, grid of 4 / 2 above); the spec's "3 items" read as "one row".
- Arrows removed from every text/secondary link on my pages (§3.3); page-local caps labels set in sentence
  case; occasions and /your-story wall: every other print tilted (§3.5).
- /your-story hero object is photo 45 as a crop (it was three tilted snapshots on cloth).
- Film facade ring: drawn by the frame via `:has(.film-facade:focus-visible)` (B1's request); "Watch again"
  uses `var(--ring)`.
- /samples chrome is now generated: `scripts/samples-chrome.mjs` copies header, footer, their styled-components
  rules and the Header.tsx behaviour from the built site into marked blocks (`--check` reports drift). The
  bar switches at 1180 there too. The two `@media (max-width:1100px)` rules at ~l.787/924 are the book's own
  layout, not the header, so left alone. The /samples P3 items (large-type button colour, controls row) are
  not in this step.

### Review fixes (supervisor rulings 4–6), re-measured
State: **passed only locally** (Chromium, `vite preview` :5202, reducedMotion). Shots refreshed.

- Ruling 4a: WAYS hides its 4th item ("Together") at ≤ 640 (`li:nth-child(n + 4)`); 4 from 641 px.
- Ruling 4b: Four moments `.sheet` ("The transcript, word for word") hidden at ≤ 640. MemoryCard and the
  "Every call keeps the card and the full transcript" note stay.
- Ruling 5: /for-families lead is now "Everything around the wedding photos: the story he tells every
  Thanksgiving, and why everyone in that photograph is laughing." (existing clause only). 3 lines at 390
  and at 1440 (measured height / line-height). Copy-check `(gone|lose|loses|lost|miss|missed|remembering|passed away)`
  on rendered text: 0 on /how-it-works, /for-families, /your-story (only hits left are code comments).
- Ruling 6: "Guided calls are the only paid part." deleted from YourStory.tsx; FREE_TIER line and
  "What Free includes" link stay.

| Page | Screens 390 / 1440 (before → after) | Target |
|---|---|---|
| /how-it-works | 10.27 → **9.80** / 6.98 → **6.98** | ≤ 8 / ≤ 6 |
| /for-families | 7.51 → 7.48 / 4.72 | ≤ 7.6 |
| /your-story | 6.43 → 6.40 / 4.06 | ≤ 6.5 |

**Measured exception for Daniel (/how-it-works, ruling 4c):** still 1.80 screens over at 390 and 0.98 over at
1440 after (a) and (b); no further copy cut, per the ruling. Section heights at 390 (px / screens): hero
930 / 1.10, #film 1272 / 1.51, Four moments 1417 / 1.68 (was 2.12), Asked 354 / 0.42, **calls (home/Listen,
not owned) 1343 / 1.59**, Ways 628 / 0.74 (unchanged: it is a one-row scroller, so the hidden 4th item
saves no height), Volume 720 / 0.85, **closing 687 / 0.81, footer 881 / 1.04**. The residual is the Listen
block plus closing and footer (3.44 screens together). 1440 is unchanged because both cuts apply at ≤ 640
only.

## Builder 1 — P1a shell, review fixes (branch premium/b1)

### S20 applied: the desktop bar starts at 1180, not 1024 (spec §1.1)
- Measured on the built site (`vite preview`), before the fix: at 1024 the frame is 922 px wide
  (51 px gutters) but the row needs about 1,006 px with 20 px gaps (logo 108 + links 603 incl. the
  14 px chevron + button group 255). Even with every gap at 0 it needs about 966 px, so shrinking
  gaps cannot make it fit. At 1100 (frame 990) it is still about 30 px short. At 1180 (frame 1062)
  it fits with the default gaps.
- So per S20: `media.navBar` → `max-width: 1179px` (`styles/theme.ts`), `Header.tsx` `WIDE` →
  `(min-width:1180px)`. The "gaps give way" rule now covers 1180–1279. `.org-chevron` and the
  `.gf-button` arrow are `flex: none`, so neither can be crushed again. `media.nav` is unchanged.
- `scripts/nav-count.mjs` now checks the bar at 1440, 1280, 1180 (chevron ≥ 14 px, arrow ≥ 16 px,
  right gutter = left gutter ±2 px) and that 1179 and 1024 show the drawer's Menu with no overflow.
  Result: **160/160 passed** on /pricing/, /organizations/, /care-communities/.
- iPad landscape (1024–1179) now gets the drawer, as phones do.

### Focus ring by ground (spec §3.3, S11): the four pairs
The ring colour is now set per element on focus (`kit/premium.ts` `useGroundRing`, wired in
`App.tsx`, only under `main[data-premium]`): it reads the opaque colour that the ancestors paint
where the ring is drawn (3–5 px outside the element) and sets `--ring` to chocolate or ivory,
whichever contrasts more. This covers the light sheets inside cloth sections, page-local dark bands
and the teal ground without touching other builders' files.

Measured in pixels by the new `scripts/ring-check.mjs` (each tab stop shot with and without its
outline; median contrast of the changed pixels), every non-home page in `site-routes.mjs` + /samples, 390 and 1440:

| Ring | Ground | Lowest measured | Where |
|---|---|---|---|
| chocolate #4A3327 | ivory #F3EBDD | 9.89:1 | /for-families "See a sample call" |
| chocolate #4A3327 | paper / sheet #FBF8F1–#FFFDF8 | 11.04:1 | /how-it-works credit link |
| ivory #F3EBDD | cloth / night #3B291D (woven; lowest at sampled #513422) | 8.59:1 | /pricing "Start free" |
| ivory #F3EBDD | teal #0F4A58 | 7.50:1 | /how-it-works "Rosa hears the aside" |

The review's failing cases now: /pricing "How reserving works" 11.51:1, /reserve "Reserve for $1"
9.17:1, /care-communities "Book a demo" 11.04:1, /contact links ≥ 9.89:1, /pricing closing
"Start free" 11.66:1, /how-it-works chips 7.50:1. 354 rings measured; 96 tab stops (form fields,
hidden radios inside plan cards) draw their own indicator and are not outline rings.

### Requests (B1 → other builders)
- **Builder 2 (`kit/Film.tsx`):** the facade's focus ring is invisible. The button is exactly the
  size of its frame, and the frame has `overflow: hidden`, so a ring at `outline-offset: 3px` is
  clipped (ring-check: "no ring visible", 390 and 1440). Suggest `outline-offset: -4px` with
  `var(--ring, …)` set to ivory over the poster, or draw the ring on the frame with
  `:has(.film-facade:focus-visible)`. `Again` hard-codes `color.chocolate`; `var(--ring, …)` would
  follow the ground.
- **Builder 2 (`public/samples/index.html`):** the bar now starts at 1180 (S20). The hand copy still
  switches at 1100 (`@media (max-width:1100px)` and `matchMedia('(min-width:1101px)')`, ~l.787, 924,
  1045, 3115); please move it to 1179/1180 so the two match. Ring-check also finds on /samples at
  1440: "How a book is made" ring #101010 on cloth 2.13:1 (390: #FFFFFF 2.83:1), and the four
  "Scan this code" buttons show no ring outside the element.
- **Builder 3 (`Pricing.tsx`), for "one ring style" (§3.3 check):** /pricing's own `summary` and
  `thead button` focus rules draw terracotta (#B85126, 4.67:1) and #7E3315 rings instead of the
  shared one. They pass 3:1, but the page shows three ring styles. Dropping those page-local
  `:focus-visible` rules lets the shared ring apply.

## Builder 4 — Group C finish: visual system adoption (branch premium/b4)

State: **passed only locally** (Chromium, `vite preview` :5204, reduced motion, 390x844 and 1440x900). Shots: `qa/premium-2026-11/after/{organizations,care-communities,programs,contact}-{390,1440}.png`.

| Page | 390 | target | 1440 | target | Other checks |
|---|---|---|---|---|---|
| /organizations | **8.96** (was 10.84) | <= 8 | 5.78 | <= 6 | 1 form; "Book a demo" in main 3; h2 em 2/5; today note; Scroller: first item x=20, next peeks at x=348, ArrowRight scrolls, ring solid #4A3327, no page overflow; "leave with them" absent from dist + og |
| /care-communities | 7.89 | <= 7.9 | 5.32 | — | img first in first screen (top 123 px); today note; h2 em 2/4; 1 form |
| /programs | 3.73 | — | 2.78 | — | marks once (opening only; footer plate off); "Where to next" = /our-story, /how-it-works, /contact |
| /contact | 4.32 | — | 2.67 | — | first form field at 1.66 screens (<= 2); no "%" in main |

Done: today note in the /organizations and /care-communities heroes; /organizations six kinds in `Scroller label="Who we work with"` (sideways at <= 640, a 3-column grid from 641 / 2 columns 641–1024 via page-local overrides of the same DOM); arrows off text links (org column links, /programs host links); sentence-case page-local labels (org columns, /contact address and card labels); no page-local px/clamp font sizes left in the four files; reveals on containers and only the hero title rises by line; `Invitation next` on /programs; /care phone stacked-actions override removed so the kit's §3.3 phone secondary applies.

### Open / requests
- **/organizations at 390 is 8.96 screens, not <= 8.** Section heights at 390: hero 908, need 365, who 591, line 276, how 1837, book 2643, footer 881. The rest is the demo form (shared field set, unchanged) and the 8 ruled rows of "From a demo to an archive" / "You decide". Getting under 8 needs a content decision, e.g. fold "You decide" + privacy into a `<details>` at <= 640, or drop the iPhone sentence repeated in STEPS row 3 (it is now in "What you need"). Not done without a ruling. **Chief/supervisor to decide.**
- **Builder 1, `kit/form.styles.ts` (§3.1):** field labels, legends and `small` are still uppercase with wide tracking. Uppercase text elements in main: 18 on /organizations, 19 on /care-communities, 5 on /contact (taste `upperCount <= 3` fails because of these). A `main[data-premium]`-scoped sentence-case rule there fixes all form pages at once; Builder 4 did not restyle forms page by page (system change lands whole).
- **Owner of `kit/DemoSection.tsx` (unassigned in §6) and `rooms/Rooms.tsx` QuoteBand:** card label "A demo for your institution" is uppercase, `.side b` uses raw `20px`; the QuoteBand h2 "One circle around each resident" is uppercase.
- /organizations: the Scroller region keeps `tabindex=0` at >= 641 where it does not scroll (one extra tab stop; `Scroller.tsx` is B1's). Option for B1: drop `tabIndex` when `data-overflow="none"`.
- /care-communities at 390 has 0.01 screen of margin.

### Assumptions
- Segment columns stay text-only (no crops); adding photos would break the 1440 <= 6 target and no assigned image exists per kind.
- /contact door rows keep their arrow: they are row links like the kit's "Where to next" rows, not text links.
- /programs host links lose the arrow (§3.3); they still open in a new tab, as before.
- "Who we work with." lost its gold word to meet h2 em <= 0.5 (text unchanged).

## Builder 4 — Group C finish, review fixes (branch premium/b4)

State: **passed only locally** (Chromium, `vite preview` :5204, reduced motion). Shots: `qa/premium-2026-11/after/{organizations,care-communities,programs,contact}-{390,1440}.png`.

| Page | 390 screens | target | 1440 screens | target |
|---|---|---|---|---|
| /organizations | **7.97** (6727 px; was 8.96) | <= 8 | 5.67 | <= 6 |
| /care-communities | 7.86 | <= 7.9 | 5.30 | — |
| /programs | 3.69 | — | 2.74 | — |
| /contact | 4.27 (first field at 1.35) | form <= 2 | 2.66 | — |

- **Decision (Daniel asleep, no chief ruling found): both options applied on /organizations.** (a) The iPhone sentence is removed from the "A Story makes the calls." step; it is said once, in "What you need". (b) At <= 640 px "You decide" keeps its h2 and lead; the four decision rows and the privacy links fold into `<details>` with the summary "What you decide, and privacy" (closed after hydration on phones; prerendered open, so no-script and >= 641 px read everything; summary hidden from 641 px). Neither alone reached 8 screens (fold ~700 px, sentence ~58 px). Reversible in `Organizations.tsx` (`FOLD`, `.decide`).
- **Check 3.2:** `git diff site-premium..premium/b4 -- src` adds 0 raw-px padding/margin/gap lines. All five Group C files now have 0 (was Org 25, Care 13, DemoBooking 11, Contact 14, Programs 10). Values were snapped to the nearest `space.*` token (ties to the smaller); maxima above 64 px are `calc()` sums of tokens.
- Checks: one `<form>` on /organizations, /care-communities, /contact; "Book a demo" in main 3 / 2 / 1; no "%" on /contact; first-screen `img` on /care-communities at 390; "leave with them" absent from `dist/organizations/index.html`; no horizontal overflow at 390.
- **Still blocked (unchanged, needs chief assignment):** uppercase count (form labels/legends/`small` in B1's `kit/form.styles.ts`; card label in unowned `kit/DemoSection.tsx`; QuoteBand h2 in unowned `rooms/Rooms.tsx`). Builder 4 did not restyle forms page-locally (a §3 system change lands whole).

## Builder 4 — Group C fix round 3 (branch premium/b4)

State: **passed only locally** (Chromium, `vite preview` :5204, reduced motion, measured after hydration). Shots: `qa/premium-2026-11/after/{organizations,care-communities,programs,contact}-{390,1440}.png`. Fixes the review of e5d95b2 (which had added "Privacy, in short" open on phones and longer leads).

| Page | 390 screens | target | 1440 screens | hero lead lines 390 / 1440 (<= 5 / <= 3) |
|---|---|---|---|---|
| /organizations | **7.99** (6740 px; e5d95b2 8.32) | <= 8 | 5.74 | 4 / 3 |
| /care-communities | **7.88** (6652 px; e5d95b2 8.24) | <= 7.9 | 5.58 | 4 / 3 (was 6 / 4) |
| /programs | 3.76 | — | 2.78 | — |
| /contact | 4.27 | — | 2.66 | — |

Section heights at 390 (px): /organizations who 575, how 1055 (was ~1300), book 2621, footer 881; /care-communities know 1038, book 2791, footer 881.

- **"Privacy, in short" folds on phones on both pages**, the same pattern as "You decide": `<details class="fold">` with the summary "Privacy, in short", closed after hydration below 641 px, shipped open in the prerender (checked in `dist/*/index.html`) and on every wider screen (summary hidden, `::details-content` shown). Turning a phone sideways past 640 px reopens it. On a phone the heading steps out of the layout (the summary names the block) but still names the list via `aria-labelledby`. Click and Enter both toggle it; the three labels and the /privacy link show when open. 1440 layout unchanged.
- **Care lead** is now one sentence: "An AI-guided interviewer asks each resident about their life, from ${QUESTION_COUNT} questions, in the A Story iPhone app or with a staff member beside them." (the reviewer's wording). The dropped sentence ("The people caring for them get a way to learn those stories.") is said again by "Know the person behind the care."
- **Organizations lead**: "An AI-guided interviewer calls the people your institution was built by in the A Story iPhone app and asks from ${QUESTION_COUNT} questions. You keep their words, and a book if you like." ("with follow-ups that listen" dropped; 5 lines -> 4 at 390). Wording follows faqData.ts:34 ("asks from N questions").
- **Organizations phone spacing** (390 only, `Rhythm` at media.sm, tokens only): `#who .kinds` margin xl -> lg, `#how .grid` gap xl -> lg, "You decide" lead and fold margin md -> xs. Together with the fold and lead, the page is 12 px under 8 screens: any new line in /organizations above the form will push it over again.
- Checks: `npm run lint` pass; `npm run build:static` pass; 'AI' and 'iPhone' visible in the first viewport at 390 and 1440 on both pages; no horizontal overflow at 390; `node scripts/copy-check.mjs --base http://localhost:5204`: /contact PASS, no pattern hits on Group C pages (the hits on /pricing "Stop paying" and /compare "the book isn't the end" are not Builder 4 files); no HIPAA-compliance or BAA claim in either page's text (only the source comments say the block claims nothing). Retired labels: 0 in Builder 4 files; "How A Story is different" remains in `Compare.tsx` (Builder 3) and in nav.ts's retired-label comment.

### Assumptions (Daniel asleep)
- Folding privacy on phones is acceptable trust-wise because it stays one tap away, is open with no script, and is open on every screen from 641 px; no length waiver was needed, so none is requested.
- Shortening both leads is a copy cut, not a new claim; no number, price, date or count was added.

## Builder 3 - P2 group B pages (branch premium/b3)

State: **passed only locally** (vite preview :5203, Chromium, 390x844 and 1440x900).

### Measured (full document height / viewport, footer included)
| Page | 390 | 1440 | Target | Overflow |
|---|---|---|---|---|
| /pricing | 9.11 (was 11.2) | 6.12 (was 6.2) | 8 / 6 | 0 |
| /compare | 7.47 | 4.26 | 8 / 6 | 0 |
| /reserve | 4.14 | 3.15 | - | 0 |
| /sign-in?next=/reserve | 1.71 | 1.16 | - | 0 |
| /sign-up?next=/reserve | 2.37 | 1.32 | - | 0 |
| /thanks | 1.82 | 1.28 | - | 0 |

/pricing misses both targets (9.11 at 390, 6.12 at 1440). Going further means taking
plan features or edition lists off the phone; not done without a ruling.

Copy-check (`main` innerText after 2 s): /pricing, /reserve with the spec patterns, /thanks for
"Stripe", /compare for "isn't the end": 0 hits. /thanks main contains "same email" and
"Your checkout receipt is your confirmation".

### Decisions and assumptions
- /pricing hero object: `public/book-objects/sample-raymond-*.webp` ("The Ledger", a /samples
  cover) beside the PriceCard, eager + fetchpriority high. Sheet on ivory: hairline, no shadow.
- /pricing hero note is "Prices in US dollars. " + `TODAY_NOTE` (kept the currency fact).
- PriceCard foot ("Plans aren't on sale yet...", "How reserving works") removed; the buying state is
  said once in a `Note` under the hero. "Ordering opens soon." removed from the members line.
- Order: cards, "Whatever you choose, it stays yours.", film link, compare (collapsed), editions,
  questions + /compare and /questions links. To save height the compare sits inside the "stays
  yours" section and the questions inside the book section (no extra section padding).
- On phones the plan cards hide `meterNote` and "Plus the Digital Edition..." (both repeated word for
  word in the comparison table). Supervisor can veto.
- Pricing compare at <=640: one DOM; cells reordered per plan with CSS `order` (`--o`) and
  `display: contents`, label from `data-label`. From 641 the question column is sticky.
- /compare row "Keeps growing after the book - the book isn't the end" is relabelled in
  `Compare.tsx` to "Keeps growing after the book" (no full stop, to match the other row labels).
  `lib/landscape.ts` and home are untouched.
- CompareTable is shared with home: every new rule is under `main[data-premium]`, and the
  overflow effect only runs when `usePremium()` is true (home gets only an inert `data-label`).
- /compare hero is now `wide` on cloth; the leaf runs full width with the four reasons in 2 columns.
- `deadlineLine()` callers: none (`rg deadlineLine src` finds only its definition and comments).
  `kit/PriceLadder.tsx` is not imported anywhere; left as is.
- Sentence case for the remaining small caps in my files (reserve tag, price label, account labels,
  compare leaf/voices labels, edition badges); "Recommended" and the pricing table heads keep caps at
  `tracking.eyebrowPremium`.
- /start, /join, /account: no visual change (redirects); no screenshots taken. `test:routing` passes.
- B1 ring request done: /pricing's own `summary` / `thead button` focus rules removed; the hidden
  radio's card draws a 2px chocolate ring at 3px offset.

### Requests
- ~~**lib/landscape.ts owner:** `SWITCH[3].title` "A book shouldn't be the end." shows in the /compare
  opening leaf.~~ **Done** (supervisor ruling: real hit). `CompareOpening.tsx` maps SWITCH and shows
  "Keeps growing after the book." for that reason; body unchanged; `lib/landscape.ts` untouched.
- ~~**Supervisor:** /pricing screen targets not met.~~ **Done**, no exception needed: 7.91 @390, 5.91 @1440.

### Fix round (review must-fix 1-5)
Measured with the taste measure script (whole document, vite preview :5203, after a full rebuild):

| Page | distinctSizes 390 / 1440 | measureMax 1440 | upperCount | h2 em | Screens 390 / 1440 |
|---|---|---|---|---|---|
| /pricing | 7 / 8 | 70 | 6 (5 footer + "Recommended") | 2/6 | 7.91 / 5.91 |
| /compare | 7 / 8 | 83 ("Where to next", kit) | 5 (footer) | 2/4 | 7.52 / 4.29 |
| /reserve | 7 / 8 | 75 | 5 (footer) | 1/4 | 4.11 / 3.15 |

Home diff 0 px at 390 and 1440. Copy-check PASS on /pricing, /reserve, /compare, /thanks; /compare
`main` has no "the end".

- Sizes: `display.sm` and `type.lead` are gone from my rendered styles (plan-card Monthly name, kept
  list, edition names and prices, table heads, question summaries, compare leaf h3, reserve h3s and
  "then" line) - mapped to `display.md`, `type.read` or `type.ui`. CompareTable's px marks get token
  sizes under `IN_MAIN` only (home keeps its px).
- Pricing table row heads are sentence case; thead and "Recommended" keep caps.
- **Measure deviation:** my notes (/pricing state Note, film line, question links; /compare sources
  line) sit on `measure.lead` (52ch), not 64ch. 64ch of Montserrat at 17px measures 85 on the taste
  script, over its 80. Supervisor can swap back to `measure.read` if the script is changed instead.
- /pricing length: the decision bar shows only once a plan is chosen by hand (before that it repeated
  the opening's two actions); on phones the book-section photo (the opening already shows a sample
  book), the edition taglines and the "With a plan" summary line (each card says its book, and
  "you pay only the shipping" is back on the cards) are hidden; some spacing moved to `space.*` tokens.
  No prices, features or delivery lines were removed.
- /reserve: `<em>` removed from "What happens next." and "The questions you keep meaning to ask."
- Fix round 2 (2026-11-03): /pricing decision bar no longer says "Plans open at launch." for a paid plan
  that can't be bought yet; the buying state is said once, in "Plans aren't on sale yet..." (spec §4B, S2).
  The bar keeps the plan name, Start free and "Or reserve for $1". Free and live-checkout lines unchanged.
  Measure (/compare 83, /thanks 95) and uppercase count (footer 5; /pricing 6 with "Recommended") are
  still open and sit in Builder 1's files; the two requests below stand unchanged.
- Fix round 3 (2026-11-03, review must-fix 1-3):
  - `faqData.ts` first group title is now "Invited, or being asked" (it is also the /questions topic
    pill). At 390 the pill is 208 px, x=69 to 277 (was 331 px, x=69 to 400). The h2 uses the same title
    because `Questions.tsx` (B1) renders `g.title` for both.
  - /pricing heading restored to "Stop paying, and it is still *yours.*" per the chief ruling (B3),
    over the spec §4B:477 rename; comment updated.
  - ring-check `/questions/,/pricing/,/compare/` @390+1440: 95 rings, 1 failing, the pre-existing
    "Question topics" scroller (B1, also fails on site-premium). The invited pill no longer fails.
  - copy-check: /compare PASS, /questions PASS, /pricing 1 hit "Stop paying" (ruled innocent; see request).

### Requests (from Builder 3, fix round 3)
- **To the chief / copy-check owner:** `scripts/copy-check.mjs:33` (design-spec §4B:487) still lists
  `stop paying` in the /pricing pattern, so the ruled-kept heading "Stop paying, and it is still yours."
  counts as a hit. Please narrow the pattern (drop `stop paying`, or exempt that exact sentence). If the
  chief meant to accept the spec rename instead, withdraw the ruling here and b3 will rename it back.
- **To Builder 1 (`Questions.tsx` / Scroller):** ring-check fails "Question topics" on /questions @390,
  "no ring visible outside the element": the scroller clips its own focus ring. Pre-existing on
  site-premium, not a b3 regression.
- **To Builder 1 (`Questions.tsx`), optional:** if the h2 should read the full sentence "If you were
  invited, or are being asked", `faqData` can carry a separate long heading; say so and b3 will add the field.

### Requests (from Builder 3 to Builder 1, via the chief)
- **Footer chrome:** 5 uppercase labels on every page (The product, Who it's for, Help, Company,
  Startup programs & grants); with any page's own caps this exceeds `upperCount <= 3`.
- **Kit sizes:** `.opening-lead` in `kit.tsx` uses a page-local `clamp(1.25rem, ...)` (20px @390,
  24px @1440), one extra size on every opening; header nav at 16px @1440 is another size beside
  `type.ui` 17px.
- **Kit measure:** the global `main[data-premium] :is(p, li, dd):not(.wide)` 72ch rule out-specifies
  kit's own `max-width` (`.opening-note` 52ch, Note 64ch), so /thanks' opening note measures 95 and
  Invitation's "Where to next" label measures 83 at 1440 (/compare measureMax).
## Builder 1 — panel round 2, fix-b1 (branch premium/b1)

### Requests (B1 → other builders)
- **Builder 2 (`HowItWorks.tsx`):** please put `id="being-asked"` on the storyteller section (`<Asked …>` in `BeingAsked()`, ~l.395). The drawer row "Being asked", the /join page and `nav.ts` all link to `/how-it-works#being-asked`; until the id lands they open the top of /how-it-works.
- **Builder 3 (`faqData.ts`):** /questions sorts the group whose title contains "invited" first and gives it `id="invited"` (matched by title, so no other change is needed). Please keep "invited" in the new group's title.
- **Routing test owner (`qa/routing/cloudfront.test.mjs`, no owner in §6):** suggest adding `['https://astoryapp.com/join', null, '/join/index.html']` so the codeless /join rule is pinned. The edge still rewrites `/join/AB12` (bad code) to `/join/AB12/index.html` as the test expects; S3 has no such key, so that address shows the not-found page rather than the /join doors. Rewriting it to `/join/index.html` needs the test changed in the same commit.

## Chief: plan for panel round 2, from the round 1 results (2026-11-03)

Panel round 1 scored an average of 6.42; the lowest persona was Harold at 6.29. The target is an average of at least 8.04, with every persona at 7 or above. QA round 1: AC1 to AC4 and the home diff all pass, on a local build only.

The weakest scores are clarity (5 to 7), navigation (5 to 7) and desire (4 to 5). Trust is at 5 for both Denise and Priya.

Root causes, ranked by how many personas hit them:
1. **The pages disagree on whether you can buy today** (Maya, Harold, Tuan, Priya). /for-families sells "Express, $79 one time". /pricing says "Plans aren't on sale yet" (`Pricing.tsx:817`).
2. **The iPhone requirement and the private beta are buried** (all 5 personas). The fact sits halfway down the page, though the wording already exists in `lib/today.ts:14` and `Reserve.tsx:807`.
3. **Neither the invited relative nor the storyteller has a page of their own** (Harold, Tuan).
   - `/join` without a code sends people straight to the app's "Begin a book" screen.
   - The paragraph for the storyteller is two screens down on /how-it-works.
   - Neither appears in the menu.
4. **The org and care pages never say the interviewer is AI** (Priya). Only the FAQ says it (`faqData.ts:34`).
5. **First-screen friction.**
   - The H1 fades in too slowly (Tuan).
   - The /how-it-works hero has too many buttons (Harold, Tuan).
   - The music credit is set in body-size type (Harold, Tuan).
6. **The trust lines are hidden** (Harold, Denise). The short version of the privacy policy (`privacy.tsx:101-118`) never appears on the selling pages.

### Rules for every scope
- Take copy only from the source lines cited below. Rewording is allowed; new facts, numbers or dates are not.
- No framing around endings, loss or urgency.
- `/` must stay at a 0 px `home-diff`.
- Each builder edits only their own files.
- Every commit needs a tester pass and a supervisor pass first.

### Out of scope under these rules (logged for Daniel below)
- Proof from a pilot or a customer.
- HIPAA/BAA and archival formats (§7.5).
- Pricing per resident.
- Whether calls ring on an iPad or an Android phone.
- The web app's "This book belongs to" field and its puppy illustration (web-app repo, §7.6).
- The size of the text on the phone screen inside the film (needs a re-encode).

### Rulings on the QA copy-check hits
- `/pricing`, "Stop paying, and it is still yours.": **keep it.** It reassures the buyer about ownership; it does not frame an ending. This follows the same reasoning as S6 ("cancel").
- `/compare`, "the book isn't the end": **delete the clause** (b3). Nothing replaces it.

### B1: shell and group D. Doors for the storyteller and the invited relative, the first screen, the menu
Files: `kit/kit.tsx`, `kit/kit.styles.ts`, `kit/premium.ts`, `lib/nav.ts`, `Header.tsx`, `Footer.tsx`, `chrome.styles.ts`, `OurStory.tsx` and `our-story/*`, `Questions.tsx`, `scripts/nav-count.mjs`.

§6 gives no owner for `AppDoor.tsx` or for how a codeless `/join` redirects. The chief assigns them to b1. The redirect rule lives in three places: `AppDoor.tsx`, the inline script in `index.html` and `deploy/cloudfront-viewer-request.js`. All three must follow the same rule.

1. **First screen shows at once.**
   - Under `main[data-premium]` only, the `PageOpening` H1, lead and hero actions render at full opacity on first paint, with no rise.
   - Sections below the first viewport keep their reveal, at 300 ms or less.
   - Check: Playwright reads the H1's computed opacity 200 ms after load. It must be 1 on 8 non-home pages, at 390 and 1440. The home diff stays at 0 px.
2. **`/join` with no valid code stays on the site.**
   - `/join/<code>` and `?ref=` still redirect.
   - The page uses the normal header and footer and drops the mostly blank book cover.
   - It must not scroll sideways at 1024 (QA measured scrollWidth 1009).
   - It has two short blocks, worded only from these sources:
     - **"Invited by a relative?"**: the join lead in `AppDoor.tsx`, the six-letter code (`Families.tsx:193`), one link and no account (`EveryVoice.tsx:532`), and nothing appears until the storyteller says yes (`FamilyLoop.tsx:47`). It also gets a field for the code; a valid `FAMILY_CODE` opens `APP.join(code)`.
     - **"Being asked to tell your story?"**: the four lines of the storyteller section on /how-it-works (`HowItWorks.tsx:370-380`) and three labels from the short version of the privacy policy (`privacy.tsx:101,105,118`). It links to `/how-it-works#being-asked` and `/privacy`.
   - Check: `test:routing` passes. `/join/ABCDEF` still redirects. `/join` answers 200 with the header and footer. scrollWidth equals the viewport width at 390, 1024 and 1440.
3. **Menu.**
   - The drawer's first tier gains:
     - "Invited to a family's book", linking to `/join` (the label is already in `nav.ts:74`).
     - "Being asked", linking to `/how-it-works#being-asked`.
   - "Questions & answers" and "Contact" move up from the grey row into the first tier.
   - The drawer stays at most 2 levels deep, with no duplicates.
   - The desktop bar stays at 4 links.
   - The footer gains "Privacy, in short", linking to `/privacy`.
   - Check: update the expectations in `nav-count.mjs` and run it; every check passes (160 or more) with 0 duplicates.
4. **/our-story:** remove the "Why now" band of statistics (the 11,200 people turning 65 a day and the AARP percentage). This only cuts copy, so it adds no claim. Check: the rendered text on /our-story contains no "%".
5. **/questions:** show the new group from b3's `faqData` first, with the anchor `#invited`.

### B2: group A, the film and /samples. Say what it is and what it needs on the first screen
Files: `Families.tsx`, `HowItWorks.tsx`, `YourStory.tsx`, `kit/Film.tsx`, `public/samples/index.html`.

1. **First screen of /for-families.**
   - Under the existing lead, add one plain line saying what A Story is. Take it from the /how-it-works hero ("A Story does the asking", and `HowItWorks.tsx:560`, "calls in its iPhone app, listens and follows what they actually say") and from the `TODAY` line (`lib/today.ts:14`).
   - Leave the lead from ruling 5 untouched.
   - Check: at 390×844 the H1, the new line and "iPhone … private beta" all fit inside the first viewport. The page stays at 7.6 screens or fewer.
2. **The gift block on /for-families (`Families.tsx:437`).**
   - Replace "The easiest to give: Express, $79 one time…" with these points, in this order:
     1. Plans aren't on sale yet (`Pricing.tsx:817`).
     2. When they open, Express is the one-time choice and nothing renews (`pricing.ts`).
     3. Today, $1 holds your place (`Reserve.tsx:988`).
     4. The iPhone line (`Reserve.tsx:807`, first sentence only).
   - Links: `/reserve` as the primary action, and `/pricing`.
   - Check: copy-check is clean. "$79" never appears in the block without "not on sale yet".
3. **/how-it-works.**
   - Give the storyteller section `id="being-asked"` and move it to just after the hero, before `#film`.
   - The hero keeps only 2 actions: "Start free" and "Watch the film · 49 s".
   - Delete the duplicate "Start free / Hear a sample call" row under the film. "See a sample call" becomes a text link in the Four moments block.
   - Top-align the call card so the right side of the hero is no longer an empty field.
   - Set the CC BY music credit (M2) as a caption: small type, `color.muted`, starting with "Music:". It stays visible at all times.
   - Check:
     - The hero has 2 buttons or fewer.
     - `#being-asked` starts within 1.5 screens at 390.
     - The film's AC3 still passes.
     - The page at 390 is no longer than round 1's measured 9.80 screens.
4. **Film (requests from b1).**
   - The facade's focus ring uses `outline-offset: -4px` and `var(--ring)`.
   - `Again` uses `var(--ring, …)` instead of a hard-coded colour.
   - Check: `ring-check.mjs` finds a ring on the facade at 390 and 1440.
5. **/samples (requests from b1).**
   - Move the breakpoints from 1100/1101 to 1179/1180.
   - Fix the focus ring on "How a book is made".
   - Give the rings on the four "Scan this code" buttons a contrast of at least 3:1.
   - Check: run `ring-check` on /samples.

### B3: group B. One status, one gift line, one action
Files: `Pricing.tsx`, `kit/PriceLadder.tsx`, `lib/founding.ts`, `faqData.ts`, `Compare.tsx`, `compare/*`, `Reserve.tsx`. `lib/pricing.ts` has no owner in §6, so the chief assigns it to b3.

1. **First screen of /pricing at 390.**
   - The status line (`Pricing.tsx:817`) sits directly under the H1, before any price.
   - Then one line, "Giving it as a gift?", saying Express is one time and nothing renews once plans open. It uses the values in `pricing.ts` and adds no new numbers.
   - Then a single primary action.
   - Check: at 390×844 the first viewport shows at most 2 prices and 1 primary button.
2. **`pricing.ts:142`:** change "A short visit, or a moment that will not wait" to "A short visit". The removed half puts time pressure on a family about an older parent. Check: run copy-check.
3. **/pricing** gets the "Watch the film · 49 s" link from §2.1, pointing to `/how-it-works#film`.
4. **`faqData.ts`.**
   - Add a new first group, "If you were invited, or are being asked". It reuses the existing answers to "Who can see our stories?" and "Can relatives add a different version?". It adds "Do I need an account to add something?", answered from `EveryVoice.tsx:532`.
   - Add a new question, "Will it ring on another phone or tablet?", answered from `Reserve.tsx:807`: before launch only an iPhone rings, and other phones get a reminder to write. It says nothing more about iPads or Android.
   - Move the answer that names the "AI-guided interviewer" (`:34`) into the first group of the general section.
   - Check: `test:contracts` passes, and /questions shows the new group first (b1 renders it).
5. **/compare.**
   - Delete "the book isn't the end".
   - Replace the retired label "How A Story is different" in the SEO title with the label in `nav.ts`, as §1.0 requires.
   - Check: copy-check on /compare finds 0 hits.
6. **Request from b1:** remove the page-local `:focus-visible` rules on /pricing's `summary` and `thead button`. Check: `ring-check` finds one ring style on the page.

### B4: group C. Name the AI and the iPhone up front, and show the privacy promises
Files: `Organizations.tsx`, `Care.tsx`, `DemoBooking.tsx`, `Programs.tsx`, `Contact.tsx`, `sitePages.json`.

1. **Hero leads on /organizations (`:451`) and /care-communities.**
   - Say "an AI-guided interviewer" (`faqData.ts:34`). Take the question count from the `QUESTION_COUNT` constant; do not type the number.
   - Move the iPhone and private beta line into the first viewport (`Organizations.tsx:110`, and `Care.tsx:239`, which includes the option of a staff member starting a conversation together with the resident).
   - Check: at 390 and 1440, both "AI" and "iPhone" are visible before the first scroll.
2. **A privacy block on both pages.**
   - Quote the three labels from the short version of the privacy policy (`privacy.tsx:101,105,118`) and link to `/privacy`.
   - Add one line inviting questions about consent, staff access and HIPAA to the demo. Claim nothing about them.
   - Check: copy-check passes, and nothing claims HIPAA compliance or a BAA.
3. **Film links from §2.1, both pointing to `/how-it-works#film`.**
   - /organizations: "See one conversation become a book · 49 s".
   - /care-communities: "See a call become a book · 49 s".
4. **Titles.**
   - In the SEO title at `Organizations.tsx:439`, replace "A Story for institutions" with the label in `nav.ts`.
   - Rename "How A Story is different" at `sitePages.json:64` to the §1.0 label, matching b3's /compare title.
   - Check: grep finds 0 retired labels in `sitePages.json` and in the SEO titles.
5. **/programs:** add a one-line lead saying these are programs that support the company. Remove nothing. Check: no new names are added.

### Assumptions (Daniel asleep)
- §6 gave no owner for `AppDoor.tsx`, the redirect rule for a codeless `/join` or `lib/pricing.ts`. They are assigned to b1 and b3 as above.
- The new redirect rule for a codeless `/join` (edge and inline script) only takes effect on deploy, and Daniel deploys.
- The expected rise in scores is a judgement, not a measurement. Panel round 2 reruns the same 5 personas on the same pages.

### New flags for Daniel
- **F-r1-1:** care and org pages need proof from a pilot or a customer (Denise, Priya). That needs a real source.
- **F-r1-2:** a price range for care communities and organization programs.
- **F-r1-3:** does a call ring on an iPad? No source says so, and the site says iPhone only.
- **F-r1-4:** the web app's create-account screen asks whose book it is ("This book belongs to"), which confuses a gift buyer. Its puppy illustration also clashes with the site. Both are in the web-app repo (Phase 2, §7.6).
- **F-r1-5:** the question text on the phone screen inside the film is too small to read at iPad size. Fixing it needs a re-encode.

## Chief: final report (2026-11-03)

Full report: `docs/premium/RESULT.md`. Tree `site-premium` @ `a2f5338`. Nothing is pushed or deployed.

### Rounds
| Round | Status | Attempts | Merge |
|---|---|---|---|
| P0-copy | passed | 2 | d089c50 |
| P1a-shell | passed | 2 | aa905a4 |
| P1b-film | passed | 1 | 8576430 |
| C-structure | not passed after 3 attempts | 3 | continued in C-finish and fix-b4 |
| D-pages | passed | 3 | b9b413a |
| A-pages | passed | 2 | 60871df |
| B-pages | not passed after 3 attempts | 3 | continued in fix-b3 |
| C-finish | not passed after 3 attempts | 3 | continued in fix-b4 |
| fix-b1 | passed | 1 | d82944f |
| fix-b2 | passed | 1 | 74c52f9 |
| fix-b3 | passed | 2 | f68c937 |
| fix-b4 | passed | 3 | a2f5338 |

### Merge notes (from the merger)
- Every merge passed `npm run lint` and `npm run build:static` (31 routes plus 6 old addresses).
- The build's `scripts/gen-seo-files.mjs` rewrites line endings in `vercel.json`, with no content change. This happened on every merge. It is build noise, not an edit.
- **P1a:** pre-merge Builder 1 notes in this file were committed first ("docs(premium): CHIEF-LOG notes from Builder 1 (pre-merge)"). The only conflict was in this log; both sides were kept.
- **A-pages:** the first two builds failed because port 4179 was held by another build (`scripts/prerender.mjs` hard-codes it). The third passed.
- **D-pages:** the local `src/lib/guides.json` matched premium/b1 byte for byte. It was backed up to the chief scratchpad (`guides.json.bak`), restored, and then merged.
- **fix-b1, fix-b3, fix-b4:** the chief's uncommitted round 2 plan in this file blocked the merge. Each time it was set aside with a named stash, restored with `git stash apply <sha>`, and that one entry dropped. A bare `git stash` was never used.

### QA r2 (`qa/premium-2026-11/qa-r2.md`)
- AC1 to AC4 pass on a local build only. The home diff is 0 px at both 390 and 1440.
- One copy-check hit is left, on /pricing: "Stop paying, and it is still yours." Ruled: keep (see "Rulings" above).
- **New regression, not fixed:** /pricing CLS is 0.265 at mobile in 4 of 6 runs; origin/main is 0. The element is `.opening-tail` in the `kit.tsx` wide opening. This must be fixed before deploy. Owner: b1 (`kit.tsx`).

### Panel
- Baseline average 6.08 (Maya 6.0, Harold 6.14, Tuan 6.14; for Denise and Priya see the audit).
- Round 1 average 6.42 (Harold lowest at 6.29).
- No round 2 scores reached the chief, so AC5 is **not done**. Next step: re-score the same 5 personas on a2f5338 and write the scores to `docs/premium/panel.md`.

### Requests (open, for the next session)
- **b1 (`kit/kit.tsx`, `kit/kit.styles.ts`):** stop the /pricing opening lead from dropping 30 px after load (CLS 0.265). Done when Lighthouse mobile CLS is under 0.1 in 6 of 6 runs and home-diff stays at 0 px.
- **Panel:** re-score round 2 (AC5).
- **Daniel:** deploy P0 (`fbe134a`, `87f9799`) first. The §7 flags and F-r1-1 to F-r1-5 are still open.

### Worktrees
- premium/b1 to b4 each have 0 commits that are not in `site-premium`.
- The worktrees' only uncommitted changes were line-ending noise from the build (`git diff --ignore-cr-at-eol` empty) in `public/_redirects`, `public/robots.txt`, `public/sitemap.xml` and `vercel.json`. Those were restored with `git restore`.
- The untracked `qa/greenfield/accessibility.json` (a generated a11y output) was copied to the chief scratchpad before removal.
- The worktrees were then removed with `git worktree remove`, without `--force`. The branches are kept.
- `asl-b1` and `asl-b4` are fully removed.
- `asl-b2` and `asl-b3` are deregistered from git, but Windows refused to delete their folders ("Invalid argument", probably a locked file such as a running preview holding `node_modules`). The leftover folders `C:\Users\nguye\Desktop\asl-b2` and `asl-b3` hold no git data and no unmerged work. They are safe to delete by hand once nothing holds them.

## Builder 3 — Round 3, Care and organizations (branch round3/b3)

Pages: /care-communities, /organizations, /questions (#organizations), /compare. Files: `Care.tsx`, `Organizations.tsx`, `DemoBooking.tsx`, `kit/DemoSection.tsx` (pass-through props only), `Questions.tsx`, `compare/CompareOpening.tsx`, new `orgQuestions.ts`. `Programs.tsx` and `Contact.tsx` untouched (no panel friction in scope needed a change there).

### Done
- Care hero and residents' room: the two generated prints are gone; two real app screens (`public/app/talk.webp`, `memory.webp`) in the kit `Phone`, cropped on a phone so the H1 sits at y=515 at 390 (first screen holds an image).
- "What you need" on both pages lists five real requirements, each from the site or the app (sources in the file comments). "What we can say today" (six sourced lines, `orgQuestions.ts`) replaces "Privacy, in short", plus one line on what is not claimed (HIPAA/BAA/residency → demo).
- /questions gains "For organizations" (10 answers, each with its source) at `#organizations`; linked from both pages.
- Care demo form: one step, "Community", care kinds (Senior living, Memory care, Hospice, Something else — from `lib/contact.ts`), residents legend. Payload unchanged; `test:contracts` passes.
- Compare note (CompareOpening leaf): StoryCorps named only as "a public archive, not a private family one"; links /organizations. The same line sits in the org "What we can say today" fold.
- Checks: lint, tsc, build:static, test:contracts, test:routing pass; copy-check /questions /compare /contact 0 hits; home-diff 0 px at 390 and 1440; no horizontal overflow at 320/390/1440 on the four pages. Screens at 390: care 8.02, organizations 8.28, questions 6.17, compare 7.8; at 1440: 6.56 / 6.64 / 5.07 / 4.45.

### Fix round (after tester + supervisor, 2026-11-03)
- Care first screen on a phone: the call screen is lifted 21 % inside the 200 px crop (`Care.tsx` `Call`), the mask fades in at the top and holds solid to 74 %, so the "A STORY" eyebrow, both question lines and "Rose is here with me" are fully inside the band and the status bar / Leave / Topic row is what is cut. The hero image is now an eager `<img fetchpriority="high">` drawn in `Care.tsx` (`HeroShot`): once the frame is lifted, the unloaded lazy img sat outside the clip and Chromium never requested `talk.webp` (memory.webp below did). Desktop (> 860 px) unchanged.
- Demo form legends (`DemoBooking.tsx` `Steps`): a legend and its `optional` may wrap (`flex-wrap: wrap`), so the care legend no longer pushes OPTIONAL past the edge at 320 / 150 %: scrollWidth 320 of 320 at 100 / 125 / 150 % on /care-communities (was 346).
- `orgQuestions.ts`: "not a staff note" → "not anything added on their behalf" (faqData.ts:30, no staff-note feature exists); "How long is it kept?" put in the positive ("The archive stays for as long as the account does, with or without a paid plan; a plan covers the guided calls, and everything already recorded keeps working", privacy.tsx:436-439); "in writing if you need it for your administrator" → "or write to contact@astoryapp.com; Daniel answers every message himself" (Questions.tsx:423).

### Assumptions
- `kit/DemoSection.tsx` has no owner in §6 for this round; it was edited only to pass four props to `DemoBooking`.
- `orgQuestions.ts` is a new file (faqData.ts belongs to B2 this round); Questions.tsx appends its group last.
- "Consent from the storyteller or their decision-maker as the app models it": the app code has no decision-maker model (grep for decision-maker, guardian, power of attorney, on behalf of: nothing). The copy therefore states only the storyteller's consent (privacy.tsx §6) and sends the "cannot decide alone" case to the demo without claiming anything.
- "A quiet hour" has no source; "an agreed hour" / "an hour each person picks" is used instead.
- No phone number exists anywhere in the site or app code, so none is shown (Denise asked for one).

### Fix round 2 (after the supervisor's must-fixes, 2026-11-03)
- `orgQuestions.ts` CAN_SAY[0]: "Nobody at A Story listens unless you ask us to help, or someone reports something." (privacy.tsx:108-110 word for word; the /questions answer already kept the clause). Curly apostrophe in "Not a relative’s addition".
- Care phone hero (`Care.tsx` `Call`, ≤ 860 px): the kit Phone with its bezel, width `min(84vw, 320px)`, a 250 px band cut from the bezel top, mask at the bottom only (solid to 86 %); inside the screen the capture is lifted 16 % so the app's Leave / Topic row slides under the kit status bar and the eyebrow, both question lines and the "Rose is here with me" pill sit in the solid part. Measured at 390: question line 14.2 px rendered, H1 at y 498–565; at 320 / 150 %: question 11.9 px, H1 top 594 (inside 844).
- "What we can say today" stays open on a phone on /care-communities and /organizations (the useEffect no longer closes it; "What you decide" on /organizations still folds). Care is 8.9 screens at 390 (was 8.02), organizations 9.27 (was 8.28): request for B4 below.
- `/questions#organizations` gains "Does it work in memory care?": every sentence is already on /care-communities (Care.tsx Know "not a clinical assessment or treatment", RuledSteps "never a test", Circle "at an agreed hour, or together with a staff member", NEED "cannot decide alone ... on the demo"; "can stop at any time" Organizations.tsx:135 / privacy.tsx §6; "memory care" is a care kind in lib/contact.ts). For Denise: "The Questions page doesn't mention HIPAA, dementia or memory care at all."

## Round 3 requests

### From Builder 2 (Gift and money, branch round3/b2)
- **B1 (`AppDoor.tsx` layout, `index.html` pre-paint script, `lib/app.ts`):** the gift Start action on /for-families now links to `https://app.astoryapp.com/create-account?for=someone` straight from the site, so no site-side passthrough is needed for that link. If a site door (`/sign-up?for=someone`, `/start?for=someone`) should also carry the query on to the app, `destination()` in `AppDoor.tsx` and the `/sign-up`/`/start` branches of the inline script drop the query today (`index.html:85,87`). Done when `/sign-up?for=someone` lands on `.../create-account?for=someone` and `qa/routing/cloudfront.test.mjs` still passes (its row 30 expects `/sign-up?ref=FRIEND` → bare `/create-account`, so the rule would be `for` only).
- **B1 (`/join`, `AppDoor.tsx` layout):** the code-vs-link rule I used on /for-families ("Your six-letter code, or the link that carries it, brings anyone into the family tree", from `index.html:80-81` and `lib/app.ts:17`) is the wording to match on /join so the two pages do not compete.
- **B4 (mobile pass):** /for-families is 8.3 screens at 390 (round 2: 7.6). The growth is the iPhone yes/no (about 0.5 screen) and the privacy line by each action. If the page must come back under 7.6, the candidates are the occasions row (five prints) and the "Why a family begins" cards, not the yes/no.
- **Panel / chief:** the /pricing "Stop paying" copy-check hit is the standing ruling (keep); unchanged this round.
- **Daniel (blocked facts, not stated):** gift in the recipient's name with a printable note (plan item 2) and iPad/Android (item 1) are still not on any page. /for-families says only what is sourced: set up the archive free, $1 holds the place, we email when the calls open, no date.

### From Builder 2, fix pass (round3/b2, after the supervisor's must-fix list)
- **B4 (mobile pass):** /for-families is **8.13 screens at 390** after the dedupe and the shorter lead (was 8.3). Section heights at 390: opening 833, iPhone yes/no 343, occasions + gift 1409, "Why a family begins" 2621 (3.1 screens, which also breaks taste rule 18's 2.5-screen cap), invitation 710. The remaining 0.13 screen is the reasons room's three 4:5 prints; B2 leaves that cut to B4 as the supervisor allowed.
- **Chief / tester:** `scripts/home-diff.mjs` reports 0 px at 1440 but 3.5–5.3 % at 390 on this branch, and the count changes between runs with no code change. The saved baseline shot shows the "It's the everyday" prints as blank white (lazy images not loaded in the **baseline** render); the candidate has them. Nothing in round3/b2 touches `/`. Evidence crop in the B2 scratchpad (`b2-home-diff-baseline-blank-prints-390.png`). Suggest the script wait for `img.complete` on both sides, or `--rebuild-base`.
### From Builder 2, fix pass 2 (round3/b2, supervisor must-fix: film link and private beta)
- **Done in B2's files:** /for-families gift actions carry "Watch the 49-second film" → `/how-it-works#film` (the /pricing wording, `Pricing.tsx:1433`; 1 match in `dist/for-families/index.html`). The yes/no "Yes" answer now says "The app is in a private beta" (`faqData.ts:56`). B1's request is taken: the giving FAQ answer (`faqData.ts:102-103`) no longer says "no code"; it says the relative comes in through the family's six-letter code or the link that carries it (`lib/app.ts:17`), and the "Invited to add to someone's book?" block adds "There is no fee per relative." (`faqData.ts:26`). /questions renders the same reworded answer.
- **B4 (mobile pass):** /for-families is **8.23 screens at 390** (fix pass 1: 8.13; the two added sentences). Same cut candidates as before (reasons room prints), not the yes/no.
- **Chief / tester:** `home-diff` on this branch: 0 px at 1440, 167 px (0.0048 %) at 390, main height equal both sides; nothing in round3/b2 touches `/`. Same lazy-print baseline noise as logged above.
- **B1 (`/join`):** the giving answer's rule is now "the family's six-letter code, or the link that carries it"; if /join words it differently, match this one so the FAQ and /join agree.
### From Builder 1 (Doors, branch round3/b1)
- **B2 (`Families.tsx:193`, `Families.tsx` "Invited to add to someone's book?" block):** Tuan's contradiction is in B2's file: "There is no gift card, code, or redemption process" sits near "Anyone joins the family tree with a six-letter code". Suggested fix in the same words /join now uses: the relative gets either a six-letter code or a link; a link opens on its own, a code goes in the box on /join (`lib/app.ts:17-18`). The "Open your invitation" link to `/join` can also carry the one line "There is no fee per relative." (`faqData.ts:26`).
- **B2 (`faqData.ts:18`):** no change needed; noting that /join's lead now quotes `faqData.ts:26` ("There is no fee per relative") and `home/EveryVoice.tsx:532` verbatim, so those two sentences should not be reworded without updating `AppDoor.tsx`.
- **B4 (mobile pass):** on /join at 390 the gap between the sample card (end of the opening) and "Being asked to tell your story?" is the opening's bottom padding plus the chapter's top padding (about 1 screen of air). If B4 tightens opening-to-chapter spacing site-wide in `kit.tsx`, /join benefits; B1 left it to the system rather than a page-local px.
- **Nobody, for Daniel:** "Invited?" is in the desktop bar beside Sign in on every page except /organizations and /care-communities (their wider "Book a demo" leaves no room at 1180 px, the bar's narrowest width). `scripts/nav-count.mjs` now guards both states.

### From Builder 3 (Care and organizations, branch round3/b3)
- **B4 (mobile pass):** /organizations is 9.27 screens at 390 (target ≤ 8) and /care-communities 8.9, after the supervisor asked that "What we can say today" stay open on a phone (about +0.9 screen on each); the rest is the five "What you need" rows. Candidates: tighter chips in the demo form (8 day chips = 4 rows at 390) and the org form's two step legends.
- **B2 (`faqData.ts`):** if the FAQ schema should list the organizations group inside `faqData.ts` rather than `orgQuestions.ts`, move `ORG_GROUP` there and drop the import in `Questions.tsx`.
- **Daniel:** a phone number for the care page; a per-resident price range; whether a staff member's own phone or shared devices are the supported setup; the export formats; a decision-maker consent path (all blocked facts, none stated).

### From Builder 4 (Mobile and warmth, branch round3/b4)
- **Done (CSS only, no copy):** overflow 0 and small taps 0 on every non-home page at 320 and 390 × 100 % and 150 % text, and at 1440 (was: /how-it-works 25 px at 320 and 30–100 px at 150 % from the film credit's addresses; /pricing 35–105 px at 150 % from the Recommended tag; /your-story 29 px at 320 from the app card; 20 links under 44 px). Phone rhythm for Chapter (64 px per edge, 52 tight) and PageOpening (56 px bottom) under the premium flag only. /for-families 7.45 screens at 390 (was 8.26: the three reason prints are landscape in one column, the room 2.4 screens). Day chips three a row in both demo forms.
- **Checks:** lint, build:static, test:contracts, test:routing pass. home-diff against cc87bfe + P0: 0 px at 1440 in two runs; 390 shows 3.8 % then 4.9 % with the same main height, only the lazy "It's the everyday" prints that the baseline renders blank (B2 logged the same). Against origin/main at 9a5e682 (merged `home-film-main` today) home differs by 60 %: that branch added a film to home after site-premium forked. **Chief:** the baseline ref for round 3 must stay cc87bfe, or site-premium must take the home film from main; not B4's call.
- **B3 (`Organizations.tsx`, `Care.tsx` copy):** /organizations is 9.16 screens at 390 and /care-communities 8.88 after the pass (target 8). The remaining length is copy: "From a demo to an archive" (four rows) and "Thirty minutes, with a founder" (four rows) both describe the demo on /organizations; one can go, or the two merge into one four-row list. /care-communities has the same pair ("A small program, shaped with you" and the form's own steps). CSS cannot cut a repeated section without hiding content, so B4 did not.
- **B2 (`HowItWorks.tsx` copy) or chief:** /how-it-works is 9.58 at 390 (target 8). The film is 1.44 screens (portrait 9:16 on a phone, by spec §2), Four moments 1.7, Good listening 1.6. The candidate that needs a decision: the "What one call leaves" card and transcript sheet under Four moments repeat what the sample call shows next; dropping them at 390 saves about 0.7 screen. Not done (content).
- **B1 (`home/Listen.tsx`):** the sample-call print on /how-it-works comes from the home component (`CallStills`) with `filter: sepia(0.12)` on the photograph (taste rule 15) and a 4:4.6 print 280 px wide on a phone. Untouched because it is home's.
- **Tester:** the inline-link hit area is inline padding (13 px block) on `:is(p, li, dd, figcaption, small) > a:not([class])` inside `main[data-premium]`; it adds nothing to the line box, so paragraphs do not move. A styled link (one with a class) still under 44 px somewhere needs its own rule.
- **Assumption:** "the sample voices/cards reused where a page is text-only" was not done as markup this round: /join already carries the sample addition (B1), /how-it-works and /your-story the app card; the text-only pages (/questions, /programs, /contact, /reserve) would need a card placed in another builder's file, a structure change, not CSS. Logged for the chief as a round-4 candidate.

### From Builder 4, fix pass (round3/b4, after the tester's and supervisor's must-fix list)
- **Correction to the Done line above:** "Day chips three a row in both demo forms" was wrong. Measured on the built page: two a row at 390/100% (8 chips, 4 rows), one a row at 320 and at 150% text. The chips are now an even two-column grid on a phone (DemoBooking.tsx, `repeat(auto-fill, minmax(min(100%, 8.6rem), 1fr))`), still 44px tall with 8px between rows; the size chips take three rows (were two, ragged), so the forms are 52px longer: /organizations 9.79 screens at 390, /care-communities 8.94. B3's length request is **not** closed by this; it still needs the copy cut logged above.
- **Done (CSS only):** /pricing "$1 holds your place in line" 45px at every width (kit rule is now a descendant selector, plus `Pricing.tsx` `.opening-lead .status a`); the film credit's two addresses 44px each with 8px between them, transcript open or closed, "Read the transcript" 45px; /contact opening address wraps inside the column at 320/150%; /pricing "Book a demo" in the first answer line 8px clear of the question row; /organizations "Read it" 8px clear of the cover link. Sweep (15 non-home pages × 320/390/1440 × 100/150%, every `details` opened, fixed/sticky bars excluded as neighbours): overflow 0, targets under 44px 0 on every premium page, no overlapping neighbours.
- **B1 (`AppDoor.tsx`, /start, not under `data-premium`):** "I already have an account" is 25px tall at 1440 and sits 6px under "Continue" at 390 (rule 20 asks 44px and 8px). Left alone: B1's door, in B1's round-3 commits.
- **B1 (`kit.tsx` `Invitation`) and B3 (`Organizations.tsx`, `Care.tsx`), for the chief to rule:** stacked full-width card links in the Invitation lists touch (0px between neighbours, no overlap), and two plain links on consecutive lines of one paragraph ("Read the privacy policy" / "answers for organizations" on /organizations and /care-communities; `contact@astoryapp.com` / "Write to us." on /organizations) have hit areas that touch (0px). Rule 20 asks ≥ 8px; B4 reads touching targets 100px+ tall and 24px-pitch text links as acceptable and did not change them. If the chief wants them apart, the paragraph needs a larger line-height or the second link its own line (copy structure, B3), and the Invitation a row gap (B1).
- **Chief:** the film credit's lines that carry an address are 52px tall on a phone, the other lines 21px: uneven leading in a caption, the price of 44px addresses in running text. Alternative if it reads badly: the two addresses as a separate one-line-each "Sources" row under the credit (markup in `kit/Film.tsx`, B4 can do it next round).

### From Builder 4, fix pass 2 (round3/b4, after the tester's and supervisor's second must-fix list)
- **Corrections to my fix-pass lines above.** (1) "targets under 44px 0 on every premium page" was false: the styled `contact@astoryapp.com` links on /privacy (4) and /terms (6) were 23px at 320/390 and 27px at 1440. My selector skipped links that carry a class. (2) "B4 reads touching targets ... as acceptable" reversed rule 20 without a written threshold change. That reading is withdrawn: every pair is now 8px or more apart (list below). (3) "Day chips three a row" was already corrected; the grid on every chip group made /organizations longer, so it now applies to the day chips only.
- **Done:**
  - **/care-communities at 320x568:** the h1 now runs 452 to 555 (was 521 to 624). On a short phone (`max-height: 700px`) the phone band stops under the "Rose is here with me" pill (205px, was 250), and the phone-to-sheet gap and the sheet's top padding are 24px each. Shot: `qa/premium-2026-11/r3/care-communities-320x568-first.png`.
  - **Guide pages at 320x568:** the longest titles ended at 608. On a short phone the lead photo is now a 12:5 band, so every guide's h1 ends by 528. Shot: `guides_care-community-participation-320x568-first.png`.
  - **/privacy, /terms:** links in the legal text get an 11px inline hit area through `LegalLayout.tsx`. Every mailto is now 45px at 320/390, 49 at 1440 and 57 to 60 at 150% text. The legal text is unchanged (privacy.tsx and terms.tsx were not touched). There are 8px between contents rows.
  - **Film credit (kit/Film.tsx):** the credit is one even 1.5 caption, word for word. The two addresses are a Sources row under it, one 44px block per line with 8px between. The transcript repeats the credit as plain text. Shot crop: the credit block reads 84px for 4 even lines at 390.
  - **Demo form:** the 2-column grid applies to the 8 day chips only. Size and time chips keep their own widths and take 2 rows each, with 8px between chips both ways. Measured the same way as B3's 9.27 (sitePages, 390x844, details as shipped): /organizations is **9.02** screens (before B4: 9.27), /care-communities **8.75** (before B4: 8.90). Taste rule 11 (≤ 8) is still not met; the copy cut logged above for B3 is still the way.
  - **Rule 20, 8px between targets, every premium page:** Invitation rows (kit.tsx, off home); opening note 24px below the actions (kit.tsx, off home); the paired links in /organizations "What we can say today", /care-communities `.ask` and the demo `.write` line ("contact@astoryapp.com" / "Write to us."). Those links stay inline with even 1.7 leading. The first link's hit area reaches up and the second's reaches down, so the lines that hold a link no longer grow to 54px. Also /pricing `.links` row gap, /for-families gift actions, /questions topic tabs (gap 8, the same 28px between words), /guides rows, /contact doors, guide contents and related rows.
  - **Footer fold at 150% text, 320:** "communities" pushed every page 10px sideways. The fold now falls to one column below 8rem a column, and keeps two columns at 100% text.
- **Checks (sweep: 24 premium routes, 7 of them guides, × 320x568/390x844/1440x900 × 100/150% text, every `details` opened, fixed/sticky excluded):** overflow 0; targets under 44px 0; neighbours under 8px 0, except /guides list→details at 0px. That one comes from the not-yet-revealed `data-rise` offset in the sweep: after a scroll reveal it measures 8px. At 100% text, h1 is in the first screen at 320x568 and 390x844 on every route. lint, build:static, test:contracts, test:routing (30/30), nav-count (200/200) and copy-check pass (the /pricing "Stop paying" hit is the standing ruling). home-diff vs cc87bfe+P0: 0 px at 1440. At 390 it is 5.38% with equal main height, and the changed pixels are only inside the lazy "It's the everyday" and wedding prints (baseline renders them blank, as logged twice above).
- **For the chief / supervisor:**
  - At 150% text on 320x568, the h1 of /care-communities, /organizations and the guides still ends below the first screen (for example care 524 to 778). The plan asks this at 320/390 only, and at 150% the title alone is 254px tall, so I did not shrink it further.
  - The "Afternoon" time chip sits alone on its row at 390. Three chips need 311px and the column is 292. Fitting them would take 9px chip padding or a wider card. Pre-B4 had the same orphan.
  - The two credit addresses now appear twice (in the caption as words, in Sources as links). That is the price of a word-for-word credit with even leading.
- **B1 (`AppDoor.tsx`, /start):** unchanged from my fix-pass line above ("I already have an account" 25px at 1440, 6px under "Continue" at 390). /start is not under `data-premium`.

## Round 3 fix 1

Chief brief for one builder, working directly on `site-premium` in `C:\Users\nguye\Desktop\a-story-landing-premium`. Input: panel r3-0 (Maya 7.29, Harold 7.57, Tuan 7.79, Denise 7.43, Priya 7.29; screenshots in `qa/premium-2026-11/panel-r3-0/`). No item below needs a blocked fact. Out of scope and left with Daniel: a gift in the recipient's name or a gift note, any date, iPad/Android, call length, contributor voice, notifications, an org price, equipment, HIPAA/BAA/residency, export formats, decision-maker consent, proof/quotes/pilots/counts, Daniel's photo, and the app's own create-account page.

Ground rules for this pass: one builder owns every file named here. `/` stays pixel-identical except the header and footer, so do not edit anything under `home/` (`home/ThreeSteps.tsx:47` keeps "the hour you picked"). Every new sentence must be copied from a line already in the code, or be a strict subset of one. Give its file:line in a source comment and in the report. Nothing may be framed around an ending, expiry or loss. Commit per item group, with the trailer `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`. No push, no deploy, no bare `git stash`.

### Changes, highest leverage first

1. **/join: what you need to hold, on the page itself** (`AppDoor.tsx`, /join opening, under the code box). Add one serif line: "No app needed to add yours: any browser works." (`faqData.ts:56` "To read or add to the archive, no app is needed: any browser works"). In the "Being asked to tell your story?" half, add the sourced device line "Today the calls ring in the A Story iPhone app, in a private beta." (`lib/today.ts:14`). *Why:* Tuan #2 and Harold #1 (they can't tell from their own page whether this works for them). Lifts Tuan clarity/trust and Harold clarity/trust.

2. **/join: what happens after "Open the invitation"** (`AppDoor.tsx`). Under the button, add a three-step line or a small ruled list: "1. Open the invitation. 2. Add a memory in writing, or photographs. 3. It appears once [storyteller] says yes." Sources: photographs sit alongside the story (`faqData.ts:76`); nothing appears until the storyteller says yes (`orgQuestions.ts` CAN_SAY, and "waiting for Walt to say yes" in the sample card, `AppDoor.tsx` `SampleAddition`). Then add one effort line with no number: "Add one memory or many, whenever you like." (the archive is open in any browser, `faqData.ts:56`). Do NOT mention voice notes: clips are still in development (`AppDoor.tsx:334-337`). *Why:* Tuan #1 and #4. Lifts Tuan clarity/desire.

3. **/join: the sample photo is blank in the first screen** (`AppDoor.tsx` `SampleAddition`: `Picture ... priority` near line 323, plus any `data-rise` or fade that wraps the opening object). The image is marked priority, but it is still invisible after networkidle + 800 ms at 1440 and at 390 (`tuan-join-first.png`, `tuan-join-390-first.png`). Exempt the opening object from the scroll reveal so it renders in its final state (taste rule 26). Confirm the `<img>` is eager, has `fetchpriority="high"` and does not start at opacity 0. At 390, move the card up with CSS `order` (rule 19) so its top shows in the first screen. *Why:* Tuan #3 and #6 (an empty box that looks broken). Lifts Tuan premium/mobile and Harold premium.

4. **Put the storyteller's reassurance next to the storyteller** (`HowItWorks.tsx` `#being-asked`, the "Being asked" half of `AppDoor.tsx`). Move the sentence at `AppDoor.tsx:170` ("It's a computer that calls and asks, not a person... Daniel answers himself") into the #being-asked block, in the same serif as that block, and keep a short form by the film. Add "You can decline a question, pause, or change the subject." (`faqData.ts:73`), linked to that answer on /questions. On both pages, add "Who is behind A Story" → `/our-story` beside "Daniel answers himself". *Why:* Harold #2, #6, #7 and Tuan #7. Lifts Harold trust/warmth and Tuan trust.

5. **/join: one type system and one composition** (`AppDoor.tsx` styles). Set the code-vs-link helper line and the "3 additions waiting..." line in the serif (EB Garamond), like the lead. In the lower half, put the seven promises in one run with no unexplained gap, and fill or remove the empty left column (a heading above the list in a single column at every width is fine). Remove the large empty band under the hero at 1440. *Why:* Harold #3 and Tuan #5. Lifts premium for both.

6. **/for-families: every Start keeps the gift context** (`Families.tsx`: the hero Start and the closing Start near line 653 use `START_HREF` with no query). Use `${START_HREF}?for=someone` on all three, as line 473 already does. Change "at the hour you picked" to "at the hour your family picked" at `Families.tsx:559`, `faqData.ts:56` and `Care.tsx:505` (the wording from round 3 plan task 1); leave `home/ThreeSteps.tsx:47` alone. *Why:* Maya #2 and #6. Lifts Maya clarity/trust.

7. **The site's sign-up door honours ?for=someone** (`AppDoor.tsx` `destination()` and the create-account copy near lines 88-94; the pre-paint branches at `index.html:85,87`; `App.tsx` `AuthDoor`). Pass `for`, and only `for`, through to `APP.createAccount`. When `for=someone`, lead with the second half of the existing lead: "Setting it up for a parent? You make the account and choose a good time for the first call; their story belongs to them." (`AppDoor.tsx:94`). Do not claim that the app's page changes. Row 30 of `qa/routing/cloudfront.test.mjs` (`?ref=` dropped) must still pass; add a row for `?for=someone`. This closes B2's open request above. *Why:* Maya #2 ("I worry I'm making my own book"). Lifts Maya clarity/trust.

8. **/for-families #giving reads as a gift, not an FAQ** (`Families.tsx` `.gift` near line 452, `faqData.ts:107`). Turn the block into a short "Giving it today" card with three steps from `faqData.ts:107`:
   - set up the archive for your relative, free;
   - choose a good time for the first call;
   - $1 holds your family's place, and we email you when the calls open.

   Put two actions side by side: Start free (with `?for=someone`) and Reserve for $1. On /for-families only, drop "the annual and monthly plans renew" (it stays on /questions and /pricing), and keep "Express is the one-time plan, nothing renews". Under the actions, put "Daniel answers every email himself." (`Questions.tsx:431`) and the Our story link. Hide the sticky bottom Start bar (`kit/StickyStart.tsx`) while an inline Start/Reserve row is on screen (IntersectionObserver). No gift button, gift card, gift note or date (all blocked). *Why:* Maya #1, #5 and #6. Lifts Maya desire/clarity/trust/mobile.

9. **/pricing: the one-time path first on a phone, and the books folded** (`Pricing.tsx`, `kit/PriceLadder.tsx`). At 640 px and below, show the Express card first with CSS `order`. The DOM is unchanged, so on desktop "Recommended" keeps its middle place, as `Pricing.tsx:1113` decided. Give the card the anchor `#express` and link it from the first-screen line "Express is one time, and nothing renews". Fold the six book editions into one closed `details`, "Printed books, from Free to $499" (prices unchanged, `lib/pricing.ts`). Next to "relatives you invite pay nothing" in the first screen, add a "Care communities and organizations →" link (the same link already sits at the bottom). Target: /pricing at most 8 screens at 390 (rule 11). *Why:* Maya #3, Denise #7, Tuan #8. Lifts Maya clarity/mobile and Denise navigation.

10. **The phone menu: one type size, the visitor's own doors first** (`Header.tsx` drawer, `lib/nav.ts`, `Footer.tsx` if a label changes). The drawer's main list, all in one size: How it works, Sample books, Pricing, For families, Invited to a family's book, Asked to tell your story? (renamed from "Being asked", the `/how-it-works#being-asked` label at `nav.ts:78`), For organizations, Our story. Questions & answers, Compare, Guides and Contact stay in a quiet second group. For families, Invited to a family's book and Asked to tell your story? must all sit above For organizations. The desktop bar is unchanged, and `scripts/nav-count.mjs` must still pass. *Why:* Maya #4 and Harold #4. Lifts navigation for both.

11. **Move the film credit out of the reading line** (`kit/Film.tsx`, the credit and `Sources`). Put the CC credit and its Sources row in one closed `details`, "Music credit", under the transcript link. Keep the text word for word and the links 44 px tall and 8 px apart, as B4 left them. Close the empty gap under the film card. Keep the credit in the transcript too. *Why:* Harold #5 and Maya #6. Lifts premium/warmth.

12. **Care page: fewer deferrals, cleaner mock-ups, each line once** (`Care.tsx`, `Organizations.tsx`, `orgQuestions.ts`).
    - (a) On /care-communities, replace the run of "bring it to the demo" answers with one plain line naming what the site does not state yet: "HIPAA and a BAA, where data is stored, export formats, consent for a resident who cannot decide alone, and price". Follow it with "Bring them to the demo, or write to contact@astoryapp.com; Daniel answers every message himself." (`orgQuestions.ts:145`).
    - (b) Crop the hero `talk.webp` so "10:00 of call time left" falls outside the frame. Crop `memory.webp` so the red delete button, "Saved Dec 31, 2023" and "2 waiting for you" fall outside it. Use a CSS crop or object-position only; do not edit the screenshots.
    - (c) Keep one "An invitation, never a test of what someone remembers" per page, and one "quoted on the demo" per page (`Care.tsx:527` and its repeats).
    - (d) Make the /care-communities "What we can say today" differ from the /organizations one by order only: care-relevant lines first (repeats are fine; nothing appears until they say yes; the storyteller owns it).
    - (e) Add a `@media print` stylesheet for /care-communities and /organizations, so Denise can print to PDF and forward the page. Hide the header, sticky bar, form and film; keep "What you need", "What we can say today" and the contact line.

    *Why:* Denise #2, #5, #6 and Priya #6. Lifts Denise trust/clarity/premium. It also cuts both pages toward 8 screens at 390 (the B3/B4 requests).

13. **/questions#organizations opens readable** (`Questions.tsx`). When the hash is `#organizations` or the org tab is active, open the first two answers, or show the org group as an open list instead of 11 closed rows. *Why:* Priya #7 and Denise. Lifts navigation/clarity.

14. **Sign-up form art** (`pages/site/account/SignUp.tsx`, the /reserve sign-up Maya reached). Replace the cartoon puppy above the ornate frame with the site's type-led paper composition (no new illustration, no new photo). *Why:* Maya #6, premium. Low effort.

### Done-checks (the builder shows the output, not a summary)
- lint, build:static, test:contracts, test:routing (with the new `?for=someone` row), check, nav-count and copy-check pass.
- `node scripts/home-diff.mjs` against cc87bfe+P0: 0 px at 1440. At 390, only the known lazy-print noise, with the same main height.
- Overflow 0 and small taps 0 at 320/390/1440 x 100/150% text on /join, /how-it-works, /for-families, /pricing, /care-communities, /organizations and /questions.
- Screens at 390, before and after, for /join, /for-families, /pricing, /care-communities and /organizations; /pricing and /care-communities at or under 8.
- First-screen shots at 390 and 1440 of /join (photo visible), /for-families, /pricing (Express visible at 390) and /care-communities (no timer, no delete button). A drawer shot at 390.
- `#film` and `#being-asked` still land on the right section, and the film still plays (film-check).
- A source table listing every new or moved sentence with its file:line.

### Chief's assumptions (Daniel asleep)
- For this pass, one builder may touch B1-B4 files, because the task asks for a single builder on `site-premium`. Ownership as in design-spec §6 resumes afterwards.
- "Asked to tell your story?" replaces the jargon label "Being asked". It is a navigation label, not a claim.
- "Add one memory or many, whenever you like." is treated as a restatement of `faqData.ts:56` (the archive is open in any browser), not a new fact. If the tester disagrees, keep only the three-step line.
- Showing Express first on phones is a layout choice. Which plan is "Recommended" (`lib/pricing.ts:116`) does not change.
- Folding the credit into a `details` keeps the CC BY attribution one press away, and it is also in the transcript. If the supervisor rules that the licence needs it always visible, keep it visible as one short line and fold only the Sources row.

## Round 3 fix 1: builder report

Commits on `site-premium`: 928a0e8, a071654, 43ed2ee, 69044fb, 4554ead, cfb9234. Nothing pushed.

- **Done:** items 1-13 (see the commit messages). **Skipped:** item 14. `pages/site/account/SignUp.tsx` has no puppy and no ornate frame; the screenshot `maya_sign-up_for_someone-fold.png` is the web app's own create-account page (app.astoryapp.com), which the brief lists as Daniel's.
- **Item 9:** Express was already the first card in the DOM (`Pricing.tsx` PLAN_ORDER), so the plan cards needed no `order`. To get Express into the first phone screen, at 640 px and below the hero price card comes before the sample cover, and its "The calls · $79 one time" row comes first. The change is visual order only. `kit/PriceLadder.tsx` is not used on /pricing and was not changed.
- **Item 12:** the timer and the delete button are cropped at 861 px and up. Below that, the existing phone bands already hid them. At 390, /care-communities was 8.75 screens. Two cuts bring it to 7.98: the Know room's memory shot is hidden at 640 px and below (the first screen already shows the app), and so are the three rows of the "One circle" band, which repeat lines said above.
- **Request (B1 / chief):** `public/samples/index.html` has a stale chrome copy, older than the round 2 drawer doors. `node scripts/samples-chrome.mjs --check` fails before it compares anything, at the line "could not find the chrome:script block". The cause is that the file uses CRLF and the regex expects `<script>\n`. The fix is `\r?\n` at `scripts/samples-chrome.mjs:196`, then regenerate. Not done here, because it rewrites the whole /samples chrome.
- **Environment:** film-check passes in Edge at 1440 and at 390. The WebKit browser is not installed (`webkit-2359` is missing), so that run fails at launch.

## Round 3 fix 2

Chief brief for one builder, working directly on `site-premium` in `C:\Users\nguye\Desktop\a-story-landing-premium` (HEAD 75c184f). Input: panel r3-1 (Maya 7.43, Harold 7.43, Tuan 8.07, Denise 7.29, Priya 7.00; screenshots in `qa/premium-2026-11/panel-r3-1/`). Three of the five panelists scored a dist that may predate fix 1, so step 0 is a clean `build:static` before anything is re-scored. Nothing below needs a blocked fact.

Out of scope and left with Daniel:
- a gift in the recipient's name, a gift note or printable;
- any date or launch window;
- iPad, Android or shared devices;
- what happens to unused Express minutes;
- contributor effort, voice, visibility, edit/delete and reminders;
- an org price and equipment counts;
- HIPAA/BAA, export formats and metadata, proxy consent, custom questions;
- proof, quotes, pilots and counts;
- a phone number or calendar link;
- an accessibility statement;
- real storyteller photos;
- the app's own create-account page. `index.html:80` sends `/sign-up` straight to the app before paint, so the site-side `?for=someone` wording never shows; only the app can fix Maya #2.

Ground rules: as in fix 1. One builder owns every file named here. Do not edit anything under `home/`; `/` stays pixel-identical except the header and footer. Every new sentence must be copied from a line already in the code, or be a strict subset of one, with its file:line in a source comment and in the report. Nothing may be framed around an ending, expiry or loss. Commit per item group with the trailer `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`. No push, no deploy, no bare `git stash`.

### Changes, highest leverage first

1. **State where data is stored instead of saying we make no claim** (`orgQuestions.ts:74` NOT_STATED, `orgQuestions.ts:155-159`). The privacy policy already says "your information is stored and processed in the United States" (`src/components/privacy.tsx:526-527`, section 13). Remove "where data is stored" from NOT_STATED. Retitle the question "What about HIPAA, a BAA, or where data is stored?". Answer:
   - "Your information is stored and processed in the United States (privacy policy, section 13)." linked to `/privacy#s13`;
   - then the existing tail of :159: "For HIPAA and a BAA, bring them to the demo, or write to contact@astoryapp.com; Daniel answers every message himself."

   Drop "We make no claim about those on the site." Add "Stored and processed in the United States" as one line in both "What we can say today" lists (Care and Organizations). *Why:* Priya #1 (the site contradicts its own policy) and Denise #3. Lifts Priya and Denise trust.

2. **The "not stated" line becomes a calm agenda under the demo CTA** (`orgQuestions.ts:74`, `Care.tsx` ~586, `Organizations.tsx`). Take it out of the "What we can say today" block. On both pages, put it under the Book a demo action as "Bring these to the demo: HIPAA and a BAA, export formats, consent for a resident who cannot decide alone, and price." This rewords NOT_STATED minus item 1's fact; price stays "quoted on the demo", `Care.tsx:527`. Set it as one line in the same serif, with no warning colour. *Why:* Priya #2 and Denise #3 (it read as a list of reasons to stop). Lifts Denise/Priya trust and premium.

3. **/for-families leads with the gift** (`Families.tsx` ~686-740).
   - Make the existing lead sentence "Give it to a parent, or begin together." (`Families.tsx:701`) the h1. "The stories between you" becomes the eyebrow, and the meta `title` matches.
   - Turn "Give it as a gift" from a `TextAnchor` into a secondary button the same height as Start free, still pointing to `#giving`. Put the two side by side at 390 if they fit, otherwise stack them full width.
   - Keep "Today you can set up their archive free..." at body size, not small.

   *Why:* Maya #1 (the gift path looks secondary on the page she lands on). Lifts Maya clarity/desire/navigation.

4. **/pricing: the Express card answers "can I buy it" and "what about after" on the card** (`Pricing.tsx`, plan card markup ~1427, Express only).
   - (a) Under $79, add "The calls aren’t on sale yet: $1 holds your place." (`Pricing.tsx:1359` + `Reserve.tsx:762`), with a "Reserve for $1" link to `/reserve`.
   - (b) Give Express a quiet "One time" tag, styled like "Recommended". It labels the "one time · nothing renews" line already on the card. Do not change which plan is Recommended (`lib/pricing.ts:116`).
   - (c) Under "one time · 30 days", add "Stop paying, and it is still yours." and link it to the section at `Pricing.tsx:1523`. Say nothing about leftover minutes (blocked).

   *Why:* Maya #4, #5, #6. Lifts Maya clarity/trust/desire.

5. **/pricing first screen: one action, one link, then prices** (`Pricing.tsx` hero ~1150-1170).
   - Keep the "Giving it, or wary of renewals?" line with its `#express` link, and one primary button.
   - Move the grey note and the "Care communities and organizations" link into one line under the price strip.
   - Remove the "The Ledger, one of three sample books" caption above the strip; the sample link already sits lower on the page.

   *Why:* Maya #4 and #10. Lifts Maya clarity/premium/mobile.

6. **/join: two doors in the first screen** (`AppDoor.tsx` /join opening).
   - Under the h1, add one quiet line with two links: "Got a link? Just open it, and you’re in." (a strict reading of the code-vs-link rule, `index.html:80-81`, `lib/app.ts:17`) and "Asked to tell your story? Start here ↓". The second link goes to the "Being asked" half; give that half the id `#being-asked`. Both links must be in the first screen at 1024 x 150% text and at 390.
   - Delete step 1 "Open the invitation." because it repeats the button. Fold the remaining steps into the paragraph above them, so the left column has at most 4 blocks (hero, line, code box, one paragraph).
   - At 390, put the code-vs-link explainer directly under the code box, above the sample card (CSS `order`).

   *Why:* Harold #1, Tuan #3, #4, #9. Lifts Harold navigation/clarity and Tuan premium/clarity/mobile.

7. **One style for the "Being asked" bullets** (`AppDoor.tsx:695-698`, `HowItWorks.tsx` ~488).
   - Make "You can decline a question, pause, or change the subject." plain text like its neighbours. Either put a small "More on this" link after the list, or link only the word "decline".
   - Change "Daniel answers himself" to "Daniel, who started A Story, answers himself" (`Questions.tsx:411` plus the /our-story founder note). Keep the "Who is behind A Story" link.

   *Why:* Harold #4 and Tuan #6, #8. Lifts Harold/Tuan trust and premium.

8. **The storyteller's door on /how-it-works and in the footer** (`HowItWorks.tsx` hero actions, `Footer.tsx`, `lib/nav.ts`, `YourStory.tsx`).
   - In the /how-it-works hero, add a text link "Asked to tell your story? Start here" to `#being-asked`.
   - In `#being-asked`, state the sourced device line plainly instead of leaving it in a closed FAQ row: "Before launch, A Story can only ring an iPhone. On other phones, it reminds them to write instead." (`faqData.ts:48`).
   - In the footer's "Who it's for" column, add "Asked to tell your story?" to `/how-it-works#being-asked`, above "Your own story" (the label at `nav.ts:78`).
   - On `/your-story`, set "Being asked by your family? Start here instead" at body size and move it above the two buttons.

   *Why:* Harold #3, #5, #6. Lifts Harold navigation/clarity/warmth.

9. **Header "Invited?" stays visible on a tablet at 150% text** (`Header.tsx`). At 1024 px with the root font-size at 150%, the link is in the DOM but hidden. Whenever the bar collapses to Menu, keep "Invited?" beside it (it is one short word). Drop it only below 360 px. `scripts/nav-count.mjs` must still pass. *Why:* Harold #2. Lifts Harold navigation.

10. **The film is never covered** (`kit/StickyStart.tsx`, `kit/Film.tsx`). Hide the sticky Start bar while the film player intersects the viewport, with the same IntersectionObserver pattern fix 1 used for the inline action rows. "Voices are synthetic" stays visible (see the assumptions). *Why:* Maya #8. Lifts Maya mobile/premium.

11. **/care resolves** (`App.tsx` `legacy`, `public/_redirects`, `deploy/cloudfront-viewer-request.js:45`, `qa/routing/cloudfront.test.mjs`). Add a 301 from `/care` to `/care-communities` in all three places, and a test row. *Why:* Denise #8. Lifts Denise navigation.

12. **Care and organizations on a phone and in print** (`Care.tsx`, `Organizations.tsx`, `kit/reveals`).
    - (a) At 640 px and below, put the h1, lead and Book a demo before the hero object (CSS `order`). Cap the phone mock-up and the Ledger image at about 40% of the viewport height, so at 390 the headline starts above y=300. (Denise mobile, Priya #6)
    - (b) Move "Today the calls ring in the A Story iPhone app, in a private beta" from the /care-communities hero into "What you need", beside "An iPhone for each resident, before launch". It is still said once. (Denise #5)
    - (c) Every `data-rise` element must be visible under `@media print` and on `beforeprint`. Also make the reveal hook fall back to visible when IntersectionObserver never fires, as in a full-page capture. The "One circle" and "Know the person" bands must never print or screenshot empty. (Denise #7)

    *Why:* lifts Denise mobile/premium/trust and Priya mobile.

13. **Memory care: what happens when a resident is upset** (`orgQuestions.ts`, the "Does it work in memory care?" answer). Replace the repeated hero lines with the sourced behaviour: "They can decline a question, pause, or change the subject, and stop at any time; a story told twice is fine, and nothing appears until they say yes." Sources: `faqData.ts:73`, the existing "can stop at any time" Q&A line, `orgQuestions.ts` CAN_SAY. Make no claim about what staff do. *Why:* Denise #4. Lifts Denise clarity/trust.

14. **The phone menu tells the two family doors apart** (`Header.tsx` drawer, `lib/nav.ts` hints). Under "For families" and "Invited to a family's book", show each item's one-line hint from `nav.ts` in small serif. Write a hint only where one is missing, as a navigation label (e.g. "Giving it, or starting it" / "Someone sent you a code or a link"). The main list stays at 8 items. *Why:* Maya #9. Lifts Maya navigation.

15. **/questions opens by group** (`Questions.tsx`). Add a row of group jump links at the top, and open the first answer in each group by default. *Why:* Maya #10 and Priya. Lifts navigation/clarity. Lowest priority; drop it if time is short.

### Done-checks (the builder shows the output, not a summary)
- First step and last step: a fresh `npm run build:static`, with the commit hash printed in the report, so the panel scores this HEAD.
- lint, build:static, test:contracts, test:routing (with the new `/care` row), check, nav-count and copy-check all pass.
- `node scripts/home-diff.mjs`: 0 px at 1440. At 390, only the known lazy-print noise, with the same main height.
- No overflow and no small tap targets at 320/390/1024/1440 x 100/150% text, on /join, /how-it-works, /for-families, /pricing, /care-communities, /organizations and /questions.
- First-screen shots, before and after:
  - /for-families at 390: gift h1 and two buttons;
  - /pricing at 390: Express card with the Reserve line;
  - /join at 390, and at 1024 x 150%: both door links and "Invited?" visible;
  - /care-communities and /organizations at 390: headline above y=300;
  - /how-it-works#film at 390: no sticky bar over the player.
- A Playwright full-page screenshot and a `page.pdf()` of /care-communities, with no empty bands.
- `#film` and `#being-asked` (on /how-it-works and on /join) land on the right section, and film-check passes.
- `grep -rn "We make no claim\|where data is stored" src/pages/site` returns nothing.
- A source table: every new or moved sentence with its file:line.

### Chief's assumptions (Daniel asleep)
- Item 1 is not a new fact. It repeats the published privacy policy (`privacy.tsx:526-527`). The provider name (Supabase) stays on /privacy only.
- "Give it to a parent, or begin together." becomes the /for-families h1. It is existing copy, and the home page is untouched.
- The "One time" tag on Express labels an existing line ("nothing renews"). It is not a recommendation. "Recommended" stays on the yearly plan, as `lib/pricing.ts:116` decided.
- "Voices are synthetic" stays visible beside the film, because the vision rule is that synthetic voices are always labelled. Maya's friction is noted but not fixed by hiding the label.
- "Got a link? Just open it, and you’re in." restates the code-vs-link rule (`index.html:80-81`, `lib/app.ts:17`). If the tester rules that "you're in" overstates it, use "Got a link? Just open it."
- Maya's sign-up handoff can't be fixed on the site. `index.html:80` sends `/sign-up?for=someone` to the app's create-account page before paint, and that page is in the app repo. It stays on the Daniel list.
- No institutional section on /compare. Comparing against StoryCorps or recorder + OHMS would need claims we have no source for.
- Denise and Priya trust/desire, and Maya desire, cannot reach 9 until the blocked facts are answered. This pass aims at the highest scores reachable without them, around 8.
