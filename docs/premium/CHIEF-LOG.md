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
- **lib/landscape.ts owner:** `SWITCH[3].title` "A book shouldn't be the end." shows in the /compare
  opening leaf. Supervisor to rule; I did not edit it (not my file).
- **Supervisor:** /pricing screen targets not met (above).
