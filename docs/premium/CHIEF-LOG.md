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
