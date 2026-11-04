# Design spec: premium pass, every page but home (2026-11-02)

Design lead, task 2 of `docs/plans/2026-11-02-premium-site-and-webapp.md`.
Inputs: `audit-own.md`, `audit-webapp.md`, `benchmarks-ia.md`, `benchmarks-convert.md`,
`taste.md`, `qa/premium-2026-11/before/`, the baseline panel (avg 6.07; lowest scores are
clarity 4–6, desire 4–5, navigation 5–6), and the source read on 2026-11-02.

This spec stays inside `design.md` (same brand, cloth, faces, tokens). Where it changes a rule,
§3.0 says which line of `design.md` changes. Every change names its files and a check.
"Check" means something a tester can run or see at **390×844** and **1440×900** on the local
build (`npm run build:static`, then `npx vite preview --port <p> --strictPort`).

**Revision 2 (after `spec-review.md`).** All 11 MUST-FIX items (M1–M11) are applied. Of the 28
SHOULD-FIX items, 24 are applied in full, 1 in part (S24), and 3 are flagged to Daniel instead of edited
(S3, S13, S18). The full list is in **§8 Changes after review**. Build order and the cut line are in **§6.1**.

---

## 0. Decisions made tonight (Daniel asleep; all reversible)

| # | Decision | Why | Daniel can change it by |
|---|---|---|---|
| D1 | **The 15 % reservation discount is not mentioned anywhere public from this build on.** No date, no "closed", no struck prices. The $1 reservation itself stays (place in line, refundable, comes off the first year: all already stated in `lib/founding.ts` `INCLUDES.reserve`). | The deadline is 2 Nov 23:59 PT (`founding.ts:110`). The deploy happens after that, so any discount line would be false. The code's own "closed" branch (`deadlineLine`, "The 15% offer closed on 2 November") frames an ending, so it can't be used either. Saying less invents nothing. | Asking for a new offer: it then goes through the claims table. |
| D2 | **"The founding places are filled" is not shown.** When `OFFERS.founding.open` is false (`founding.ts:277`, a hand-set flag, not a count), the founding offer simply isn't rendered. | A "filled" claim needs a source number. The flag isn't one, and a sold-out sign reads as scarcity (Maya). | Opening founding again, or giving the count. |
| D3 | **The "trusted person" and "letter for later" features leave the marketing pages** (/pricing, /questions). Legal text that mentions them (`privacy.tsx:613`, `terms.tsx:334`) stays word for word. | Both features exist to describe what happens after someone dies, which breaks the "never frame around an ending" rule on a selling page. | Saying where, if anywhere, they should be described. |
| D4 | **Film captions: a `<track>` ships, `default` OFF, and a transcript sits under the player.** | The v5.6 film already sets almost every narrated line on screen as kinetic type (checked on `a-story-demo-video/out/review-v5.6/contact.png`), so captions on by default would print each line twice. The CC button and the transcript cover hearing and sound-off viewing. **This deviates from taste rule 27.** Builder 2 lists in `CHIEF-LOG.md` which of v01–v17 have no on-screen type, so Daniel can judge the trade. | Flipping one attribute (`default`). |
| D5 | **The `/l` QR fix is done site-side.** `/l` plays the recording in our own branded page and never sends anyone to the Supabase address. | The `listen` function answers a good code with a 302 to a signed audio URL and a bad code with a plain-text 404 (`phone-app/supabase/functions/listen/index.ts:47,88`, read only). An `<audio>` element follows the 302, and its `error` event catches the 404. No function change is needed. | — |
| D6 | **No site link to `app.astoryapp.com/gift` yet.** | Its "arrive on 25 December" has no source (audit-webapp §3). | Confirming the date. Then one line on /for-families and /pricing. |
| D7 | **"Our story" stays in the bar.** | Trust for the gift buyer. Maya, Denise and Priya all went looking for who is behind it. | Moving it to the footer (one array entry). |
| D8 | The nav label for `/samples` stays **"Sample books"**, not "Samples". | Harold and Maya need to know what a sample *is*. It still fits at 1024 (see §1.1 check). | — |
| D9 | **The home page `/` stays pixel-identical outside the header and footer.** Every §3 kit and global change is opt-in for non-home pages (§3.00). The one exception is the P0 copy removal (D1/D2), which removes ending and scarcity lines wherever they render, home included. | Plan "Not doing" allows only nav and footer on `/`. But leaving "The 15% offer closed on 2 November" on home would break the ending-framing rule. Removing a false line is not a redesign. | Saying the P0 removal should skip home. |
| D10 | **The /for-families card "Someone who has already gone" is removed**, with its photo `15`. | Its title, text and "Guides for remembering someone" link all speak of someone who has died (`Families.tsx:178-188`). A new kicker can't fix it, and rewriting it means new copy with no source. | Saying where remembering someone belongs (§7 flag). |
| D11 | **The film's note says nothing about its photographs, and its poster shows no photograph.** | The wedding still has no recorded provenance and looks like a real photo of real people (`a-story-demo-video/brief/ai-footage/character-bible.md` §0; `v4a/wedding_x2.jpg`). `stills/34_x2.png` is under the same open flag. The film still ships in the build; Daniel deploys and can pull it. | Documenting the stills' licence (§7 flag). |

---

## 1. Navigation and footer (task 3)

### 1.0 One source for labels
New file **`src/lib/nav.ts`** exports `ROUTES`: path → label + one-line hint. `Header.tsx`, `Footer.tsx`,
`kit/kit.tsx` (`ROOMS`) and the hand copy in `public/samples/index.html` all use these words.

| Path | Label (everywhere) | Hint (dropdown / Where to next) |
|---|---|---|
| /how-it-works | How it works | The call, then the card and the book. |
| /samples | Sample books | Three books you can flip through, page by page. |
| /pricing | Pricing | Everyone starts free. Writing and reading never cost extra. (source: `pricing.ts:183`) |
| /our-story | Our story | Why we started, in our own words. |
| /for-families | For families | Giving it, and using it together. |
| /your-story | Your own story | Your life belongs here too. |
| /care-communities | Care communities | Senior living and memory care. Know the person behind the care. |
| /organizations | Schools, libraries & companies | Colleges, schools, libraries, companies and community groups. |
| /organizations#book (or /care-communities#book) | Book a demo | Thirty minutes, with a founder. (source: `Organizations.tsx:101,588`) |
| /compare | Compare | Beside the products you may be comparing. |
| /questions | Questions & answers | The practical things, answered plainly. |
| /guides | Conversation guides | A good place to begin. |
| /contact | Contact | A person reads every message. |
| /programs | Programs & grants | — |
| /privacy, /terms | Privacy, Terms | — |
| APP.signIn | Sign in | — |

The old `/pricing` hint in `kit.tsx:675`, "Everyone starts free. Only calls are paid for.", is false (books
from $39 and Express at $79 once are paid too) and is deleted everywhere, not copied.

Retired labels that must not appear in header, footer, drawer or page titles: *Institutions, Get in touch,
Write to us, How A Story is different, More, Families* (as a bare footer label), *Also for, Explore*.
`sitePages.json` names and `<title>`s follow the table (for example `/organizations` →
"A Story for schools, libraries and companies").

### 1.1 Desktop bar (≥ 1024 px)

```
[A Story]   How it works · Sample books · Pricing · For organizations ▾ · Our story        Sign in   [Start free →]
```

- **5 text items** (one is a menu trigger), then Sign in as a quiet text link, then **one** filled button.
- "For families" leaves the bar (benchmarks-ia §3.4). "More" is deleted, with its panel, its `groups` array, the feature card and the `.gf-mobile-more` block.
- **For organizations ▾** opens a panel about 380 px wide, anchored under its trigger, with three rows (label in `font.ui` 600, hint in `type.note`):
  1. Care communities → `/care-communities`
  2. Schools, libraries & companies → `/organizations`
  3. A **Book a demo** row, set apart on `color.primaryWash` with an arrow, going to `/organizations#book`. **This row is not rendered on `/organizations` and `/care-communities`** (trailing slash stripped before the test), because there the bar's filled button already reads "Book a demo" (M11). On those two pages the panel has two rows.
- **Programs & grants** is *not* in this menu (benchmarks-ia §3.1). It lives in the footer only.
- The trigger is active (`aria-current="true"` styling, gold underline) on `/organizations` and `/care-communities`.
- Context button: on `/organizations` and `/care-communities` the filled button reads **Book a demo** → `#book` (existing `DEMO_PAGES` logic, kept). Everywhere else it is **Start free**.
- Behaviour copies Radix NavigationMenu:
  - It opens on click, and on hover after 120 ms on `(hover:hover)`. A click on a panel that hover has already opened keeps it open (Radix behaviour); only a second click closes it.
  - It closes on Esc, on an outside pointer and on route change, and Esc returns focus to the trigger.
  - `aria-expanded` and `aria-controls` are set.
  - It enters with opacity plus a 4 px rise in `motion.base` (200 ms), and has no exit animation.
- **Breakpoint:** add a **new** token `media.navBar` = **`max-width: 1023px`** in `theme.ts`, used only by `Header.tsx`, the drawer and `chrome.styles.ts`. `Header.tsx` `matchMedia("(min-width:1101px)")` changes to `(min-width:1024px)`. **`media.nav` itself stays `max-width: 1100px`**, so nothing else that uses it (home included) moves (M3). iPad landscape and small laptops then get the bar.
  - If the row doesn't fit at 1024–1179 px, the gaps shrink to 20 px first. Labels never wrap and are never cut, and type never shrinks.
  - **Fallback (S20):** if `nav-count` still finds a wrap at 1024 with 20 px gaps, `media.navBar` and the `matchMedia` move to 1179 / 1180, and the builder logs it in `CHIEF-LOG.md`.

**Check 1.1:** a script (`scripts/nav-count.mjs`, Builder 1) loads `/pricing/` and `/organizations/` at 1440, 1180 and 1024 and counts the visible `nav#site-navigation` links outside the dropdown.
- It expects 4 links + 1 menu button + Sign in + exactly 1 `.gf-button`, with no text node wrapping (each link's `getClientRects().length === 1`), and no element whose text is `More`.
- On `/organizations/` the `.gf-button` text is "Book a demo", and the open dropdown has 2 rows with no "Book a demo" row. On `/pricing/` it has 3 rows.
- Hover the trigger, wait 200 ms, click it: the panel is still open (S21). Esc closes it and focus is on the trigger.

### 1.2 Phone bar and drawer (≤ 1023 px)

- The closed bar is unchanged: logo + "Menu". StickyStart stays (see §3.6).
- Drawer, top to bottom. **There are only two levels, and no label appears twice:**
  1. Five large serif rows: How it works · Sample books · Pricing · **For organizations** · Our story.
     - "For organizations" is a disclosure button (`aria-expanded`). It opens **in place**, under itself, to three indented rows: Care communities · Schools, libraries & companies · Book a demo. It is closed by default and opens by default when you are on an org page.
     - **On `/organizations` and `/care-communities` the "Book a demo" row is not rendered** (two rows only), because the foot button there already reads "Book a demo" (M11). Same rule and same helper as the desktop panel (`isOrgPage(path)` in `nav.ts`).
  2. A hairline, then one muted group in a 2 × 2 grid, set in `type.ui` (16 px+) at `color.onDarkMuted` or better (≥ 7:1 on cloth; Harold could not read today's small grey): For families · Your own story · Questions & answers · Contact.
  3. At the foot: **Sign in** as a text link (`type.ui`, *not* headline size), then **Start free** as a full-width filled button (Book a demo on org pages).
- No label wraps at 320 px. Muted links are at least 44 px tall with 8 px between them.
- Focus is trapped and page scroll locked (both exist today). The drawer moves on `motion.move`.

**Check 1.2:** at 390, on **`/pricing/` and `/organizations/`** (and `/care-communities/`), open the drawer and the org disclosure, and collect the text of every link and button inside `#site-navigation`. There are no duplicates (on the org pages "Book a demo" appears exactly once), there is no "More", and the maximum nesting depth is 2. Screenshots `qa/premium-2026-11/after/nav-drawer-390.png` (on `/pricing/`, disclosure open and closed) and `nav-drawer-org-390.png` (on `/organizations/`, open).

### 1.3 Footer (`src/pages/site/Footer.tsx`, `chrome.styles.ts` FooterShell)

There are four columns with no repeats: 16 page links + 1 email.

| The product | Who it's for | Help | Company |
|---|---|---|---|
| How it works | For families | Questions & answers | Our story |
| Sample books | Your own story | Conversation guides | Programs & grants |
| Pricing | Joining a family's book → `/join` | Contact | Privacy |
| Compare | Care communities | | Terms |
| | Schools, libraries & companies | | |

- **Removed:**
  - "Reserve for $1". Reserve is reached from Pricing. A standing footer offer reads as a product line.
  - "Write to us". The address shown once in the brand block is the email.
- **"Joining a family's book"** is new. `/join` already exists and hands off to the app. It is the door Tuan couldn't find. The label describes his situation, not the act of buying.
- **The program-marks plate stops being a link.** It becomes a `<figure>` with the five marks and a `figcaption`, "Startup programs & grants" (the "Programs & grants" text link is the way in). This removes the duplicate `/programs` link and the "What each one / is" wrap. On `/programs` itself the plate isn't rendered.
- **Phone:** the two `<details>` folds stay, renamed "The product and who it's for" and "Help and company".
- **Slim variant:** `Footer` takes `variant="slim"`, which renders only the legal line plus Privacy · Terms · Contact. It is used by `/sign-in`, `/sign-up`, `/account`, `/thanks` and `/l` (see §4B, §4D).

**Check 1.3:**
- At 1440 every public route in `scripts/site-routes.mjs` (`pages` + `/samples`, excluding `/`, `/reserve` and `/start`) is reachable from the footer or the bar in one click, and no `href` appears twice in `footer`.
- At 390 the footer is ≤ 1.3 screens with both folds closed.

### 1.4 `/samples` hand copy
`public/samples/index.html` carries a static copy of the header, drawer and footer (lines ~1303 and ~1355, CSS ~828–1000, scripts ~3082).

Builder 2 replaces the link lists, the More panel markup and its script with the §1.1–1.3 structure, using the same labels and classes. It deletes the More-wiring script.

**Check:** run the §1.1 and §1.2 scripts against `/samples/` too.

---

## 2. The film (task 4)

### 2.1 Placement
- **One player, on `/how-it-works`**, as its own section `id="film"`, directly after the hero and before "Four moments. You're in the first." (benchmarks-convert §5).
- The hero's actions become: **Start free** (filled) · "See a sample call" (secondary) · a text link **"Watch the film · 49 s"** → `#film`.
- **Links to it, no second player:**

| Page | Where | Text |
|---|---|---|
| `/pricing` | under the plan cards | "Not sure yet? Watch the 49-second film" → `/how-it-works#film` |
| `/for-families` | hero secondary action | "Watch the film · 49 s" → `/how-it-works#film` |
| `/care-communities` | inside "how it works for residents" | "See a call become a book · 49 s" → `/how-it-works#film` |
| `/organizations` | inside "From a demo to an archive" | "See one conversation become a book · 49 s" → `/how-it-works#film` |

"Watch the film · 49 s" stays only as a hero action (/how-it-works, /for-families, /organizations). The in-section links are written for their reader (S28).

- **Home: no change** (out of scope; left for Daniel).
- "49 s" is sourced from `DURATION_S = 49.4` in `a-story-demo-video/studio/src/v4/timeline.ts` and ffprobe on the master.

### 2.2 Section layout (`src/pages/site/kit/Film.tsx`, new; used only by `HowItWorks.tsx`)
- **Ground:** `paper`.
  - At 1440 the heading and one line sit left (5 of 12 columns) and the player right (7 of 12). It is capped at `min(100%, 128svh)` wide, so the player never exceeds about 72svh in height.
  - At ≤ 860 it stacks: heading, then player, then the line.
- **Heading** (h2, `Statement $size="lg"`, no gold word): "Watch a call become a book."
- **Line** (`Note`): **"A 49-second film. The Millers are a fictional family. Voices are synthetic."**
  - "The Millers are a fictional family" is sourced from `a-story-demo-video/CLAUDE.md:38`; "Voices are synthetic" from `:45` (S7).
  - **Nothing is said about the photographs** (M1, D11). Do not write "fictional", "illustrated" or "AI" about them until Daniel documents their provenance.
- **Player frame:** `radius.lg`, `shadow.md`, no border, no device chrome.
- **Under the player, in this order:**
  1. **Music credit** (`Note`, always visible, never inside a fold) (M2). The exact string from `a-story-demo-video/brief/credits.md` ("Video description" block):
     "Music: original score for A Story. Piano: Salamander Grand Piano by Alexander Holm (CC BY 3.0, creativecommons.org/licenses/by/3.0), via FreePats (freepats.zenvoid.org)."
     The two addresses are links (`https://creativecommons.org/licenses/by/3.0/`, `https://freepats.zenvoid.org/`). No words change.
  2. `<details>` "Read the transcript". The 15 lines, with "A Story:" before the two lines in A Story's own voice (v09, v09b). **The last line inside the transcript repeats the same music credit**, so the credit travels with the text (M2).
  3. The page's next step: `PrimaryLink` **Start free** + `TextAnchor` "Hear a sample call" → `#calls`.

### 2.3 Playback pattern (facade)
1. **Before any tap** there is a `<button class="film-facade" aria-label="Play the film, 49 seconds, with sound">`. It wraps a `<picture>` poster with the right aspect ratio set (no layout shift), `decoding="async"`, and a 72 px round play glyph on `color.chocolate` with an ivory triangle. The visible label **"Play the film · 49 s"** sits beside it in `font.ui`; the visible text is the start of the accessible name (WCAG 2.5.3, S10). **No `<video>` element exists in the DOM yet**, so there are zero video bytes before the tap.
   - **Poster loading (S14):** `loading="lazy"` by default. If the tester finds the poster inside the first viewport at 390 or 1440, it becomes `loading="eager" fetchpriority="high"` and the hero's own image drops `fetchpriority="high"`. The tester records which element is LCP before and after.
2. **On tap (iPhone-safe, M9).** WebKit allows sound only when `play()` runs inside the user gesture, so the swap must not wait for a React commit:
   ```ts
   const onPlay = () => {
     flushSync(() => setPlaying(true));        // <video> is in the DOM now
     const v = videoRef.current!;
     v.play().catch(() => { /* leave native controls visible; no error copy */ });
     v.focus();
   };
   ```
   - The element is `<video ref={videoRef} controls playsinline preload="none" poster=…>` with **no `autoplay` attribute**; `play()` in the handler starts it, with sound on.
   - Sources are chosen in the same handler, before `flushSync`:
     - **Orientation:** `matchMedia("(max-width: 600px)")` picks portrait (9:16, `max-height: 80svh`, centred) or landscape (16:9).
     - **Size:** landscape uses 1080 when `innerWidth × devicePixelRatio ≥ 1600`, else 720. Portrait uses 1080 when `DPR ≥ 2`, else 720.
     - **Format:** **MP4 (H.264/AAC) only.** No WebM (S17).
   - `<track kind="captions" srclang="en" label="English" src="/film/a-story-film.en.vtt">`, **without** `default` (D4).
3. **No autoplay before a tap, no muted loop, no `loop`.** On `ended` the last frame (the lockup) is held. A text button "Watch again" appears and the page's Start free sits right below.
4. **Reduced motion:** nothing moves before the tap, so no special case is needed.
5. **Analytics:** if `src/lib/analytics.ts` exposes a track function, fire `film_play` and `film_complete`. Otherwise do nothing; don't add a vendor.

### 2.4 Files (Builder 2 encodes; ffmpeg = `C:\Users\nguye\Desktop\a-story-demo-video\tools\ffmpeg.exe`)
- **Sources:** `a-story-demo-video/out/A-Story-demo-v5.6-16x9.mp4` and `-9x16.mp4`. These are the masters: 1920×1080 / 1080×1920, 30 fps, 49.40 s. The `-yc` files are byte-identical.
- **Output:** `public/film/`. **Every file ≤ 8 MB**; each target bitrate below already includes the audio.

| File | Size | Codec | Target |
|---|---|---|---|
| `a-story-film-1080.mp4` | 1920×1080 | H.264 High 4.0, yuv420p, 2-pass 1150k, AAC 96k stereo, `+faststart` | ≈ 7.7 MB |
| `a-story-film-720.mp4` | 1280×720 | H.264 High 3.1, 2-pass 750k, AAC 96k | ≈ 5.2 MB |
| `a-story-film-v-1080.mp4` | 1080×1920 | H.264, 2-pass 1150k, AAC 96k | ≈ 7.7 MB |
| `a-story-film-v-720.mp4` | 720×1280 | H.264, 2-pass 750k, AAC 96k | ≈ 5.2 MB |
| `poster-16x9.webp` + `poster-16x9-960.webp` | 1600×900 / 960×540 | WebP q 72 | ≤ 100 KB / ≤ 50 KB |
| `poster-9x16.webp` | 720×1280 | WebP q 72 | ≤ 90 KB |
| `a-story-film.en.vtt` | — | WebVTT | — |

**WebM is dropped (S17):** H.264 plays everywhere the site supports, VP9 saved only ~10 %, and the repo has no LFS. Four MP4s (≈ 26 MB total) instead of six files (≈ 41 MB).

Example landscape 1080 command (the others change `-vf scale`, `-b:v` and the **`-passlogfile`**, which is unique per output so parallel encodes never share `ffmpeg2pass-0.log` (S16)):
```
ffmpeg -y -i A-Story-demo-v5.6-16x9.mp4 -c:v libx264 -preset slow -profile:v high -level 4.0 -pix_fmt yuv420p -b:v 1150k -pass 1 -passlogfile pl-h1080 -an -f mp4 NUL
ffmpeg -y -i A-Story-demo-v5.6-16x9.mp4 -c:v libx264 -preset slow -profile:v high -level 4.0 -pix_fmt yuv420p -b:v 1150k -pass 2 -passlogfile pl-h1080 -c:a aac -b:a 96k -ac 2 -movflags +faststart public/film/a-story-film-1080.mp4
```
Pass logs live in the scratchpad, not in `public/`.
If a file comes out over 8 MB, lower `-b:v` by 100k and re-run. Don't drop below 900k at 1080. If 900k still misses, ship 720 only for that orientation and note it.

- **Poster frame (M1, D11): app UI, the square book or type only. Never a photograph.**
  - Start at **14.5 s** (the "Who did you meet by pure chance…" question card), landscape and portrait.
  - The frame must show **no** wedding still (`02` / `v4a/wedding_x2.jpg`), no porch still, no family still (`33`, `34` / `stills/34_x2.png`), and no person. If 14.5 s shows any of them or a half-faded word, step forward in 0.1 s until a frame shows only app UI, the square book or type, and record the chosen time.
  - Not the lockup.
  - The tester opens both posters and confirms "no photograph, no person" in `CHIEF-LOG.md` with the timestamps.
  - Command: `-ss <t> -frames:v 1 -vf scale=1600:-2` → png → `sharp` → webp.
- **Captions:** generated by a new **`scripts/film-captions.mjs`** from **`a-story-demo-video/studio/src/v4/vo-words.json`**, the timings the v5.6 render actually used: 15 lines, v01–v17.
  - **Do not use `brief/vo-lines-v5.3.json`.** It still contains v18 "Coming soon to iPhone…", which v5.4+ removed.
  - Cues use `t_in`/`t_out` (rounded to ms) and `<v A Story>` for speaker `emma`, with no voice tag for the narrator.
  - The script writes `public/film/a-story-film.en.vtt` and the transcript array `src/lib/filmTranscript.json`, so both come from one source.
- **Hosting:** self-hosted next to the site (no YouTube/Vimeo). Tester checks `vite preview` serves `.vtt` as `text/vtt` and supports Range on `.mp4`. After Daniel deploys, `verify-live` checks the same on CloudFront.
  - **Deploy MIME (S18, flag only):** `publish.yml` uses `aws s3 sync`, which may upload `.vtt` as `binary/octet-stream`. Not changed tonight; flagged in §7, and `verify-live` must check the live Content-Type.

**Check 2 (AC 3):**
- Network panel at 390 and 1440 on `/how-it-works/` shows **0 bytes of `.mp4` before the tap**.
- After the tap the film plays with sound, the CC menu offers English, and `ended` shows "Watch again".
- **One-tap play on WebKit (M9):** a Playwright **webkit** project (iPhone 13 device descriptor) taps the facade once; within 3 s `video.paused === false` and `video.muted === false`, with no second tap. Same run in Chromium. Until Daniel tries a real iPhone, the result is recorded as **"passed only in Chromium/WebKit-desktop"**, never as passed on iPhone.
- The music credit is visible under the player without opening anything, and is the last line of the transcript (M2). The note line contains no "photograph" (M1).
- `ls -l public/film` shows every video ≤ 8,388,608 bytes, and no `.webm`.
- Lighthouse mobile LCP on `/how-it-works/` is within +10 % of before. **Baseline (S15):** the local build of `origin/main` on the same machine, mobile preset, 3 runs each, medians compared. Not the live site.

---

## 3. Shared system upgrades (Builder 1; priority per §6.1)

### 3.00 Scope: opt-in for non-home pages only (M3, D9)
Home imports `Invitation`, `Eyebrow` (`home/Founders.tsx`), `SecondaryLink` (`home/Close.tsx`, `home/OpenBook.tsx`),
`Band`, `StickyStart` and the global styles. So **no §3 change may be global.** The mechanism:

- **One flag.** The shared site layout sets `data-premium` on `<main>` for every route **except `/`** (path with the trailing slash stripped), and provides the same boolean through a small `PremiumContext` (`usePremium()` in `kit/premium.ts`, new, Builder 1).
- **Styled components** put every new rule under an ancestor selector, `main[data-premium] &` (or, for `StickyStart` and the header-adjacent pieces that sit outside `main`, under `body[data-premium]`, set by the same layout effect). The un-scoped base style is today's style, byte for byte.
- **Global rules** in `global.ts` (measure, tabular numbers, focus rings) are written as `main[data-premium] :is(…)`, never `main :is(…)`.
- **Components with logic** (`Invitation`, `StickyStart`) read `usePremium()`. When it is false they render exactly today's output: on `/`, `Invitation` keeps its current closing h2, its links and `<Bond>` (the "legacy" path is the default whenever the flag is false; `Home.tsx` passes nothing and is not edited).
- **Allowed on `/`:** the header and footer (§1), and the P0 copy removals (D1/D2, §6.1), nothing else.

**Check 3.00 (home pixel diff):** a script `scripts/home-diff.mjs` (Builder 1) builds a baseline from `origin/main` **with the P0 commit applied**, and the candidate from the current tree. It screenshots `/` full-page at **390×844 and 1440×900** with reduced motion and fonts loaded, masks the `header` and `footer` boxes (and the `StickyStart` bar at 390, which is chrome), and diffs with `pixelmatch` (threshold 0.1). It must report **0 changed pixels, or ≤ 0.1 % for anti-aliasing**, with the diff PNGs saved to `qa/premium-2026-11/after/home-diff-<390|1440>.png`. It runs before every commit in §6.1 from P1 on. Separately, P0's own effect on home is checked as text: the visible text of home `main` before and after P0 differs only by the removed D1/D2 strings.

### 3.0 `design.md` corrections (doc only)
- **Typography** section: replace Source Serif 4 / Figtree with the four faces in `theme.ts` and their jobs: Cormorant Garamond (display), EB Garamond (reading), Montserrat (interface), Caveat (handwritten captions only).
- **Add a section "Premium pass (2026-11-02)"** listing §3.1–3.7 below in one line each.
- **Update "The phone bar"** for §3.6, and the nav notes for §1.

### 3.1 Type
| Change | File | Check |
|---|---|---|
| *All rows below apply only under `main[data-premium]` (§3.00). Home keeps today's eyebrows, measure and numbers.* | | |
| **Eyebrows become sentence case.** In `Eyebrow`, `text-transform: none`, `letter-spacing: 0.01em`, weight 600, `type.label`, colour `var(--label)`. The same applies to `.next-label` in `kit.tsx`. a **new** token `tracking.eyebrowPremium = 0.08em` (the existing `tracking.eyebrow` stays `0.16em` for home) is used for the few caps that remain (plan-card "Recommended", table heads). | `kit/kit.styles.ts:204`, `kit/kit.tsx` Band, `styles/theme.ts` | taste script `upperCount ≤ 3` per page at both widths |
| **No page-local font sizes.** Replace raw `font: … clamp(…)` sizes in page files with `type.*` / `display.*` (for example `HowItWorks.tsx` `.price` → `type.read`, `Families.tsx` kickers → `type.label`). | each page file in §4 (owner per group) | `rg "font(-size)?:.*(clamp\(|\d+px)" src/pages/site/<file>` returns only token interpolations. Taste `distinctSizes ≤ 7` (390) / `≤ 8` (1440). |
| **Measure tokens:** add `measure = { lead: "52ch", read: "64ch", max: "72ch" }` to `theme.ts`. `Lead` max 52ch, `Body`/`Note` 64ch. Scoped rule `main[data-premium] :is(p, li, dd):not(.wide) { max-inline-size: 72ch }` in `global.ts` (not on home). | `theme.ts`, `kit.styles.ts`, `global.ts` | taste `measureMax ≤ 80` on /pricing, /organizations, /compare, /how-it-works at 1440 (baseline 126/126/149/91) |
| **Hero lead ≤ 3 lines at 1440, ≤ 5 at 390.** Stage caveats move to the hero `note` (§3.7). | each page's `PageOpening` | count lines in 390 shot |
| **Tabular numbers:** in `global.ts`, `main[data-premium] :is(.price, [data-num], table td, .tag) { font-variant-numeric: tabular-nums lining-nums }` (not on home). | `global.ts` | computed style on /pricing price elements |
| **Gold word = a moment:** `<em>` appears in the h1 and in **at most half** of a page's h2s. Builders remove the others; the heading text stays. | page files | count `h2 em` ÷ `h2` ≤ 0.5 per page |

### 3.2 Spacing
- No raw px margins or paddings in page styles outside `theme.ts` `space.*`. Section padding is always `space.section × var(--sy)`.
- `kit.tsx` `Band` (the closing) goes from `clamp(64px, 6vw, 120px)` top to `space.section × var(--sy)`, so the ending is quieter. **Under `main[data-premium]` only**; home's Band keeps today's padding.
- **Check:** grep the diff for `\d+px` in `padding|margin|gap` outside `theme.ts`/tokens. Taste rule 9: gap between sections ≥ 2× the largest gap inside them, verified on one shot per group.

### 3.3 Buttons and links (`kit/kit.styles.ts`, all under `main[data-premium]`, §3.00)
- **The primary carries the arrow (`ArrowIcon`); secondary and text links never do.** Builders remove arrows from the `SecondaryLink`/`SecondaryAnchor` children in non-home page files. Files under `src/pages/site/home/` are not edited, and the home `SecondaryLink`s (`home/Close.tsx`, `home/OpenBook.tsx`) keep their arrows and today's look.
- **Phone composition:** at `media.sm` (≤ 640 px), inside `Actions`:
  - the primary is full width;
  - any `Secondary*` renders as a text link: no fill, no border, underline with 4 px offset, a 44 px min-height hit area, centred under the primary.
  - Implement on the `Secondary*` styled components with `${media.sm}` and an `Actions &` selector. Don't style by `nth-child`.
- **States** on Primary/Secondary/TextLink (taste rule 21):
  - `:focus-visible` is `outline: 2px solid <ring>; outline-offset: 3px`, where the ring is set **by ground, not by `currentColor`** (S11): `color.chocolate` on ivory and paper grounds, `color.ivory` on cloth and night grounds (via the section's ground variable, `--ring`). `shadow.focus` is not used as the only indicator. The tester measures each ring against its ground and needs **≥ 3:1** (record the four pairs in `CHIEF-LOG.md`).
  - `:active` is `transform: scale(0.97)` over `motion.press`.
  - Hover only inside `media.hover`.
  - `[aria-disabled=true]` at 0.5 opacity with no pointer events.
  - No `transition: all`.
- **Check:**
  - 390 shots of every hero and closing show no two stacked full-width pills.
  - Keyboard-tab `/pricing/` and see one ring style.
  - `rg "transition: all" src` returns 0.

### 3.4 Cards (narrowed after review, S23)
- **New `Card` styled export in `kit.styles.ts`:** `background: var(--sheet)` (paper on ivory, ivory on paper), `border: 1px solid color.primaryLine`, `radius.lg`, padding `space.lg`→`space.xl`, **no shadow on light grounds**. On cloth, `shadow.lie` and no border.
- **Used in exactly two places:** the /pricing plan cards and the /sign-in · /sign-up form. A box everywhere is the generic template look `taste.md` warns about.
- **Everywhere else, type and hairlines instead of boxes:**
  - /questions group headers: a `display.sm` heading with a hairline above, no box.
  - /guides index: an editorial contents list. Each row is a 3:2 photo, title, one line, with a hairline between rows (§4D).
  - /care "One circle around each resident": the three roles stay on the night band as three typeset columns.
  - /organizations segments and /pricing book editions: open columns with a hairline top, no fill, no border box.
- **Check:** `rg "<Card" src` lists only `Pricing.tsx` (or `PriceLadder.tsx`) and the account form files. `rg "box-shadow" src/pages/site/{Pricing,Organizations,Guides,Questions,Care}.tsx` returns only token references, and no card on an ivory/paper ground has a shadow.

### 3.5 Photographs
- **Two treatments, one per section:**
  - **Print** (`kit` `Print`/`PrintMat`): white border, corners. Tilt ≤ 2°, at most every other print tilted.
  - **Crop** (`Picture` with `radius.md`, no border).
  - New prop on `Picture`: `frame="crop"` (default) | `"print"`.
- **One aspect ratio per row:** 4:5 or 3:2, with `aspect-ratio` set.
- **First-screen image** is `loading="eager" fetchpriority="high"`; all others are lazy. Real `sizes`.
- **No filters or overlays on photographs, and no text over a face.**
- The site's photographs are AI-generated illustrations (footer "About the examples"). Never caption them as real customers. **Prefer real objects for first screens (S25):** the square book from `/samples`, real app screens from `public/app/`, and the film poster (UI/type only, §2.4). Where an existing AI photograph stays in a hero, the "About the examples" note in the footer stays one click away. This rule is about the site's own images, not the film's stills (D11).
- **Image weight (S19, taste rule 16):** every image delivered at 390 is ≤ 250 KB, with real `sizes`.
- **Check:** visual pass per section. `rg "filter:|mix-blend" src/pages/site` shows nothing on `img`. Lighthouse CLS < 0.05 on each group's heaviest page. At 390 the tester lists image transfer sizes (Playwright `response` sizes) on /for-families, /your-story, /organizations, /pricing and /guides; none is over 250 KB.

### 3.6 The phone sticky bar (`kit/StickyStart.tsx`)
- Content height 56 px (from ~77), plus the safe area, **only when `usePremium()` is true**. On `/` it keeps today's height (§3.00).
- The same pages already excluded stay excluded. It is also hidden while the drawer is open and while the film plays.
- **Check:** at 390, chrome (header + sticky) is ≤ 128 px of 844.

### 3.7 The "today" note (new `src/lib/today.ts`)
- **One sentence, said the same way wherever it appears:** "Today the calls ring in the A Story iPhone app, in a private beta. Writing and the family archive work in any browser."
  - Source: `HowItWorks.tsx:476` and `seo.ts:233`; a subset of the same facts, no new claim.
  - "The book" is left out on purpose (S1): it would contradict "once ordering opens" on /pricing and /reserve.
  - It renders as the hero `note` (one small line under the actions) on /how-it-works, /pricing, /organizations, /care-communities and /reserve, **and nowhere in a hero lead**.
- **Org pages** additionally keep the specific requirement inside their "what you need" block (§4C), because Denise and Priya need it early.
- **Check:** `rg "private beta" src/pages/site/*.tsx` returns only `today.ts` imports or the org requirement lines. No hero `lead` contains "beta".

### 3.8 Page endings (`kit/kit.tsx` `Invitation`) — a real bug, fixed here
- `Invitation` compares `useLocation().pathname` (live: **with** the trailing slash, `/how-it-works/`) to `ROOMS[].to` and `CLOSERS` keys (**without** it). So the self-link filter and the per-page closing lines never match on the static site. That is why every page says "Everyone starts free." and links to itself.
- **Fix:** `const path = pathname.replace(/(.)\/$/, "$1")` before both lookups (as `Header.tsx` already does for `DEMO_PAGES`).
- **Home is protected (M3):** everything in this section runs only when `usePremium()` is true. On `/` the component takes its legacy path and renders exactly today's closing h2, "Where to next" links and `<Bond>`. The slash fix itself cannot change home (its path is `/`, which the regex leaves alone), and the home pixel diff (§3.00) proves it.
- **Then (non-home pages):**
  - `Invitation` takes `next?: string[]` (three paths from `nav.ts`), so each page chooses where to send people (§4 lists them).
  - Add `CLOSERS` for every page that renders `Invitation`, using existing plain facts, never a new promise.
  - **Remove `<Bond>` from the closing band** on non-home pages. On the marketing pages Bond (the founder's dog) then appears only on `/our-story` (§4D) and, unchanged, on `/`.
- **Check:** on 390 shots of every page using `Invitation`, no "Where to next" row links to the current page, and no two pages in the same group share the same closing h2.

### 3.9 Horizontal scrollers (new `Scroller` component in `kit/Scroller.tsx`, styles in `kit.styles.ts`) (M8)
- **Markup (accessible, passes axe `scrollable-region-focusable`):**
  ```tsx
  <Scroller label="Occasions">            // label is a REQUIRED prop (TypeScript: string, no default)
    {items.map(i => <li key=…>…</li>)}
  </Scroller>
  // renders:
  <div role="region" aria-label="Occasions" tabIndex={0} class="scroller" data-overflow="end|none">
    <ul class="scroller-track"> <li>…</li> … </ul>
  </div>
  ```
  - The region is focusable, so keyboard users can scroll it with the arrow keys. It has the visible focus ring of §3.3 (by ground).
  - Items are real `<ul>/<li>`; no `role="list"` override is needed.
- **Track CSS:** `display: grid; grid-auto-flow: column; grid-auto-columns: min(80%, 340px); overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding-inline: var(--page-gutter); padding-inline: var(--page-gutter); list-style: none; margin: 0;`
- **End fade, CSS only:** `mask-image` on `[data-overflow="end"]`. One `ResizeObserver` (plus a passive `scroll` listener) sets `data-overflow` to `end` while there is content to the right, else `none`. No arrows, no dots, no "Scroll" hint. The next item peeks ≥ 15 %.
- **Used by (narrowed, S24):** /for-families occasions, the /questions filter chips, /how-it-works WAYS (≤ 640), and /organizations segments (≤ 640).
  - **Not** the /pricing book editions: they are a 2-column grid at 390 so every price is visible without scrolling.
  - I kept WAYS and the org segments (the review suggested occasions and chips only), because neither hides a price and both are needed to reach the screen targets (9.1 → 8 and 12.9 → 8). The supervisor can veto per page.
- **Check:**
  - at 390, the first item starts at x ≥ 16 px and the next item is visibly peeking;
  - no page-level horizontal overflow (`scrollWidth === innerWidth`);
  - Tab reaches each scroller, it shows a ring, and ArrowRight scrolls it;
  - **`npm run a11y` shows zero new violations** on the 4 pages that use it (compare against the baseline run).

### 3.10 Motion
- **One hero arrival per page** (the existing `data-lines` rise), plus **at most 3** `data-rise`/`Reveal` groups below it, and those go on containers, not on each `li` (for example `HowItWorks` WAYS, `Pricing` `.kept`).
- Menus and drawer follow §1. No new motion library (GSAP stays).
- **Check:** `rg -c "data-rise" <page>` ≤ 6 (hero items + 3 groups). With reduced motion, everything is visible in place.

---

## 4. Page by page

Targets for every page:
- **Length:** ≤ 8 screens at 390 and ≤ 6 at 1440 (taste rule 11).
- **First screen:** a real object in it at both widths: the book, an app screen, the film poster or a photograph (rule 12).
- **Copy:** nothing framed around an ending, a deadline, scarcity or loss.
- **Claims:** no new number or claim. Every figure keeps coming from `lib/pricing.ts`, `lib/founding.ts`, `lib/product.ts` or the page's existing sourced text.
- **Hero spread (rule 28):** across the 15 pages, at least 3 compositions and at least 2 grounds, as set in the "Hero" lines.
- **First-screen exceptions (S26):** /compare (cloth and type; the table is the object) and /reserve (the reservation card is a UI drawing) are **accepted exceptions** to rule 12, logged in `CHIEF-LOG.md` with that reason.

**Copy checks, one method for every page (M7).** A shared script `scripts/copy-check.mjs` (tester-owned):
- loads the page in Playwright at 390 after hydration (wait 2 s) and reads **`document.querySelector("main").innerText`** only, never raw HTML, scripts, JSON-LD or the footer;
- matches **case-insensitive, with word boundaries and exact phrases**, using the per-page patterns written in each "Check" below (for example `\b(gone|lose|loses|lost|miss|missed)\b`, never bare `lose` or `miss`, which hit close, closer, mission, permission);
- prints each hit with 60 characters of context.
- **A hit is not a licence to edit.** Builders never change copy to satisfy a grep. Every hit goes to the supervisor, who rules "real" (then the copy is fixed per this spec) or "innocent" (then the pattern is narrowed and logged).

### Group A — Builder 2: /how-it-works, /samples, /for-families, /your-story (+ the film)

**/how-it-works** (`HowItWorks.tsx`, new `kit/Film.tsx`, `lib/filmTranscript.json`)
- **Hero:** cloth, `object` variant, CallSlip kept.
  - Lead cut to: "You set it up once and choose the hour. A Story calls, asks about their life and follows whatever they say." Today note (§3.7).
  - Actions as in §2.1.
- Film section `#film` (§2).
- **New short section "If you're the one being asked"**, for the storyteller (Harold), on `ivory`, 4 lines max. It uses only sentences already on the site:
  - "It rings in the app at the hour you picked. Nothing to type or save. They just talk." (`home/ThreeSteps.tsx:47`, rewritten in second person: "You just talk.")
  - "Nothing appears until the storyteller says yes." (`home/FamilyLoop.tsx:47`)
  - "Their story belongs to them." (the old nav hint) with a link to `/privacy`.
  - **No new facts** (no call length, no iPad claim).
  - It sits after "Four moments".
- "Everyone in the family has a way in": `WAYS` list `data-rise` goes on the `ul` only. Under its heading, one line from `mission.md` "Phrases worth keeping", verbatim (S27): *"Not one narrator, but everyone who was in the room."* This carries mission movement 4 (many voices on one moment).
- **First screen (S26):** the CallSlip counts as the hero's real object only if it is the real app call screen from `public/app/`. If it is a drawing, the film poster (UI/type frame) must be inside the first screen at 1440, and at 390 the tester records it as an exception.
- **Remove the Bond dog** (it comes from Invitation; §3.8).
- `Invitation next={["/samples","/pricing","/for-families"]}` with closer "Set it up for someone *you love.*" (existing).
- **Target:** ≤ 8 screens at 390 (baseline 9.1). The film adds ~1.2, so cut:
  - Volume's paragraph down to 2 sentences;
  - WAYS to 3 items at 390 via `Scroller`.
- **Check:**
  - poster top edge < 844 px at 390, or the Watch link is visible in the first screen;
  - screens ≤ 8 / ≤ 6;
  - §2 checks.

**/samples** (`public/samples/index.html`, static)
- Chrome per §1.4.
- **"Read in large type" button:** recolour from the yellow (`.btn-read`, `#F3D88A` hover etc., ~line 1289–1295) to the site's secondary style: ivory fill, chocolate 1px border, chocolate text. It is still the second action.
- **Controls at 390:**
  - family tabs, swatches and Back/Front sit in one `Scroller` row;
  - the two instruction paragraphs merge into one line, "Tap a page edge or swipe to turn.", without changing other instructions' meaning;
  - the "Jump to" slider stays.
- Nothing inside the book changes (print typography, dates, text).
- **Check:**
  - no `#F` yellow hex left in `.btn-read`;
  - controls block ≤ 1 screen tall at 390;
  - §1 nav scripts pass on `/samples/`.

**/for-families** (`Families.tsx`)
- **Hero:** **ivory ground**, `object` variant, photograph-led (the gift-wrapped book, existing).
  - Actions: Start free · "Watch the film · 49 s".
- **Remove the "Someone who has already gone" card (M6, D10).** Delete the whole entry from `REASONS` (`Families.tsx:178-188`: kicker, title "A memory you can still *add to.*", text, the "Guides for remembering someone" link) and its photo `15` import. Three cards remain ("For your parents", "For your own life", "More than one version").
  - Layout: at 1440 the three sit in one row of 3 (no orphan). If the grid is set to 2 per row today, change it to 3 so nothing sits alone; at 390 they stack.
  - The remembering use case is flagged to Daniel (§7), not rewritten here.
- **Mission line (S27):** in the "Giving it" block below, one line verbatim from `mission.md` "Phrases worth keeping": *"It never assumes the story is finished, because it isn't. Today is part of it too."*
- **Gift clarity (Maya):** promote the existing FAQ answer "How does giving A Story work?" (`faqData.ts:66-67`, verbatim, minus the reserve-discount sentence) into a short "Giving it" block under the occasions.
  - It sits beside the existing Express line ("$79 once … Nothing renews", from `pricing.ts`) as the subscription-sceptic answer.
- **Invited family (Tuan):** one 2-line block, "Invited to add to someone's book?", using `home/FamilyLoop.tsx:47` text plus a link to `/join` ("Open your invitation").
- **Occasions carousel:** move to `Scroller` (fixes the edge bleed).
- `Invitation next={["/how-it-works","/samples","/pricing"]}`.
- **Check:**
  - copy-check (§4 method) with `\b(gone|lose|loses|lost|miss|missed|remembering|passed away)\b` on `main` returns 0, or only hits the supervisor rules innocent;
  - `REASONS` has 3 entries; no "Guides for remembering someone" link; 1440 shot shows no orphan card;
  - the first occasion has x ≥ 16 at 390;
  - ≤ 7.6 screens (do not grow).

**/your-story** (`YourStory.tsx`)
- **Hero:** **paper ground**, `split`, the young-adult photograph as a crop.
- "The friends you'll miss later." (`YourStory.tsx:309`) becomes **"The friends who shaped you."**
- Teal "Future you" scene stays.
- `Invitation next={["/how-it-works","/samples","/pricing"]}`.
- **Check:** copy-check with `\b(miss|missed|lose|lost|gone)\b` on `main` returns 0 (or supervisor-cleared hits); ≤ 6.5 screens.

### Group B — Builder 3: /pricing, /compare, /reserve, /start, /sign-up, /sign-in, /account, /join, /thanks

**/pricing** (`Pricing.tsx`, `kit/PriceLadder.tsx`, `lib/founding.ts` copy only, `faqData.ts:13`)
- **Hero:** **ivory ground**, `wide` variant, with PriceCard as the object.
  - **Real object (S26):** at 1440 the square book (an existing `/samples` cover or spread image) sits beside the PriceCard; at 390 a book thumbnail sits above the price. No new image is made; the builder picks an existing asset and names it in the log.
  - Actions: Start free (filled) · "Reserve for $1" (secondary → text link at 390).
  - Today note.
- **One plain buying-state line**, said once, directly under the hero, in `Note`: **"Plans aren't on sale yet. Today you can start free, and $1 holds your place in line."** (S2: "Plans aren't on sale yet" is the source's own wording, not "open at launch".)
  - These are existing facts (`Pricing.tsx:822`, `founding.ts INCLUDES.reserve[0]`).
  - Delete the other repetitions ("Plans aren't on sale yet" in `PriceCard` foot, "Ordering opens soon" duplicates). Keep "once ordering opens" on book delivery lines, which come from `pricing.ts`.
- **D1 removals:**
  - every `reserveDiscountOpen() ? … : …` branch keeps only its false branch;
  - the sticky bar reads "Or reserve for $1";
  - `PriceLadder.tsx:262-296`: drop "and 15% off … by 2 November" and "The founding places are filled." from the closed branch;
  - `faqData.ts:13`: drop "Reserve by 2 November to hold 15% off your first year.";
  - `founding.ts`: `INCLUDES.reserve[1]` removed, `WHY_PAY[0]` → "It holds your place: we email you when the calls open, in the order families reserved." (from `INCLUDES.reserve[0]`), and `deadlineLine()` returns `""` once passed (no "closed").
  - `founding.ts:311` "The dollar comes off that year too" → **"The dollar comes off your first year"** (S4: "that year" would point at the removed line; D1 already uses this wording).
  - `founding.ts:360` closed-founding sentence: drop its first sentence "The founding places are filled." (D2); the rest stays.
  - **Empty `deadlineLine()` (S5):** every caller renders nothing, not an empty tag, pill or line, when the string is `""`. Builder 3 lists the callers (`rg "deadlineLine" src`) in the log; the tester checks /pricing, /reserve and `/` for an empty pill.
  - **S3, no edit:** "we email you when the calls open" sits beside "the calls ring … in a private beta". It is a product-state claim, so it is flagged to Daniel (§7), not reworded.
- **Order after the hero:** Plans (cards) → **"Whatever you choose, it stays yours."** (renamed from "Stop paying, and it is still yours.") → the film link line → Compare table (collapsed) → Book editions → questions.
  - The ownership block moves up so it sits right after the cards (benchmarks-convert §2.5).
  - **D3:** delete the two `<li>` items "Name a trusted person…" and "Write a letter…" (`Pricing.tsx:1202-1207`). `FOREVER.kept` stays.
- **Plan cards:** use `Card` (§3.4), tabular numbers, and keep "Recommended" (our recommendation, not a claim). Prices are untouched.
- **Compare table at ≤ 640:** each plan becomes a stacked block (plan name, then rows as "label: value"), replacing the 880 px sideways table. At ≥ 641 keep the table with a sticky first column.
- **Book editions:** a **2-column grid at ≤ 640** (every price visible, no scroller, S24); at 1440, a 3 × 2 grid (exists). Open columns with a hairline top, not `Card` (S23).
- **Questions block:** add links "Compare A Story with others" → `/compare` and "All questions & answers" → `/questions` (the context links that replace More).
- **Shipping times** stay. Source: `pricing.ts:265-302`. **"547 questions"** stays. Source: `lib/product.ts` / `questionBank.json` (`"questions": 547`).
- **Targets:** ≤ 8 screens at 390 (baseline 11.2) and ≤ 6 at 1440 (6.2).
- **Check:**
  - copy-check (§4 method) on `main` with `\bnovember\b|15\s?%|\bfilled\b|trusted person|letter for later|leave a letter|stop paying|\bclosed\b` returns 0 (no bare "letter", which hits the founder-letters link; no bare "filled", which hits "fulfilled"). Any hit goes to the supervisor;
  - every price in the DOM equals a `pricing.ts`/`founding.ts` value. The tester dumps the prices with a script and diffs them against the before list in `audit-own.md`, which must be the same set minus the discounted reserve figures ($101.15, $194.65) and "15 %". $9.92 and $19.08 are the per-month equivalents of $119 and $229, so they stay;
  - screens.

**/compare** (`Compare.tsx`, `compare/CompareTable.tsx`, `compare/CompareOpening.tsx`)
- **Hero:** cloth, `wide`.
- **Table at ≤ 640:** stacked rows. Each feature is a block with "A Story" first, then each company as "Name: value". At ≥ 641, a sticky first column plus an end fade showing it scrolls.
  - **One DOM (S12):** the same `<table>` reflows with CSS at ≤ 640 (`display: block` rows, each `td` showing its company from a `data-label` attribute via `::before`). No second hidden copy. The same rule applies to the /pricing compare table. Check: the prerendered HTML contains each competitor value exactly once.
- "Keeps growing after the book - the book isn't the end" → **"Keeps growing after the book."**
- The table's sources line ("From each company's public pages, September 2026") stays.
- **No new competitors** (StoryCorps would need sourced research; flagged).
- Add the CTA pair at the end of the table: Start free + "See pricing".
- `Invitation next={["/pricing","/samples","/how-it-works"]}`.
- **Check:** at 390, no competitor value sits off-screen without its own scroller, and no page overflow; ≤ 1080 px element width removed; "end" not in rendered row labels.

**/reserve** (`Reserve.tsx`, `lib/founding.ts` copy)
- **Hero:** cloth, `object` (the reservation card).
- **D1:**
  - tag reads "Reserve" (`Reserve.tsx:968`) with no date;
  - no struck-through prices;
  - no 15 % lines (`:1278`, `INCLUDES`, `WHY_PAY`).
- **D2:** when `!OFFERS.founding.open`, the founding card, its "Filled" tag and every "The founding places are filled" sentence (`:767`, `:1109`, `:1259`) are not rendered.
- The hero lead loses the beta sentence (→ Today note).
- **Check:**
  - copy-check (§4 method, `main` only, after a 2 s hydration wait) with `\b(ends|ended|expire[sd]?|closed)\b|\bnovember\b|\bfilled\b|15\s?%` returns 0 (bare "ends" would hit friends, sends, weekends). The offer-terms fine print, if it renders in `main`, is excluded only by the supervisor, by name;
  - no empty tag or pill where `deadlineLine()` used to render (S5).

**/start → app, /account, /join (redirects)**
- No site visual change (they leave for app.astoryapp.com before paint).
- Footer "Joining a family's book" → `/join` (§1.3).
- The app-side seam (puppy, frame, names, way back) is **Phase 2** (`audit-webapp.md` §5). Not in this night.
- **Check:** `/join/` and `/start/` still redirect (the `npm run test:routing` pass).

**/sign-in, /sign-up (reserve state)** (`account/SignIn.tsx`, `SignUp.tsx`, `AccountShell.tsx`)
- "CREATE ACCOUNT" becomes **"Create account"**: sentence case, the standard `PrimaryButton` with `ArrowIcon`, no yellow circle.
- Footer → `variant="slim"`.
- The form gets one `Card` on ivory, max 440 px wide.
- "Nobody is called until you say so." stays.
- **Check:** no `text-transform: uppercase` on buttons in these files; footer has ≤ 4 links.

**/thanks** (`Thanks.tsx`, `components/thanks.tsx`)
This page exists to carry one instruction: `lib/checkout.ts:61-62` says the buyer "must be told plainly to sign up with the email they paid with". The rewrite keeps it and claims nothing new (M4).
- **h1:** "Thank you."
- **Lead (keeps the instruction, warmer, complete):** **"If you've completed a purchase, sign up in the app with the same email you paid with. That connects your purchase to your account."**
  - Source: `Thanks.tsx:101`. Only the phrasing is warmed; the condition ("If you've completed a purchase") stays, so a visitor who opens `/thanks` directly is not told they paid.
- **Confirmation line, in `Note`, kept in the source's words:** **"Your checkout receipt is your confirmation."** (`Thanks.tsx:123-124`, `components/thanks.tsx:39-40`).
  - The spec does **not** say the receipt "comes by email from Stripe": whether Stripe sends it depends on a dashboard setting no repo file records.
  - "This page does not verify a payment." may move into the same `Note`, after the confirmation line; it is not deleted.
- The three Roman-numeral steps stay. Where a step says "within a working day", that is sourced (`founding.ts:53`).
- Footer slim. `components/thanks.tsx` (SEO/prerender copy) stays consistent with the page: same instruction, same confirmation sentence.
- **Check:** the visible text of `main` contains "same email" and "Your checkout receipt is your confirmation", and does not contain "Stripe".

### Group C — Builder 4: /organizations, /care-communities, /programs, /contact

**/organizations** (`Organizations.tsx`, `CollaborationForm.tsx` (unmounted, kept), `DemoBooking.tsx`, `sitePages.json`)
- **Name:** "Schools, libraries & companies" in nav and footer. Title "A Story for schools, libraries and companies". H1 stays "The people who made the place."
- `sitePages.json` phrase "The knowledge people carry / should not leave with them." becomes **"The people who made the place. / In their own words."** (loss framing; used for the OG card. Re-run `npm run social` if og cards are generated from it; builder checks `scripts/social-cards.mjs`.)
- **Hero:** **paper ground**, `split`, with **one real object** (S25): the square book (an existing `/samples` image) or a real app screen from `public/app/`, as a crop. Not four prints, and not a new AI photograph. If neither asset reads well at 390, fall back to one existing crop photograph and log it.
  - Actions: Book a demo · "Watch the film · 49 s".
  - Today note.
- **"What you need" block** (new, 3 lines, after the hero), using existing lines only:
  - "Each person needs an iPhone, and we help them install the app." (`Organizations.tsx:110`)
  - "Nothing leaves the archive unless you and the person both say so." (`:133`)
  - "Program pricing is quoted individually, on the demo." (`Pricing.tsx`)
  - This is where Denise and Priya find the requirement, early and plainly.
- **Segment cards:**
  - the senior-living card links to `/care-communities` with "See care communities", rather than repeating its content;
  - at 390 the cards sit in a `Scroller`;
  - at 1440 a 3-column grid of open columns (hairline top, no box, S23) with clean crops, one aspect ratio (fixes the four tilted prints).
- **Film link** inside "From a demo to an archive": "See one conversation become a book · 49 s" (S28).
- **Remove the second form:**
  - The "Propose a collaboration" section and `<CollaborationForm>` are no longer mounted. The file is kept; its lead contract (`qa/greenfield/lead-contracts.mjs`) must still pass or be updated by the tester with the supervisor.
  - "Another idea? Build it with us." becomes one line: "Another idea? Write to us." → `/contact`.
- **"Book a demo" CTAs: 3 total** (hero, after "From a demo to an archive", the form itself), plus the bar button.
- **Privacy for organizations:** one short block linking to `/privacy` anchors. No HIPAA, BAA, SOC 2 or residency claims either way (flagged for Daniel).
- **Targets:** ≤ 8 screens at 390 (12.9) and ≤ 6 at 1440 (7.6). CTAs in main ≤ 6.
- **Check:**
  - `rg -c "Book a demo"` in rendered main ≤ 4;
  - exactly one `<form>` on the page;
  - screens;
  - "leave with them" absent from `dist/organizations/index.html` and `og` meta.

**/care-communities** (`Care.tsx`, `DemoBooking.tsx`)
- **Hero:** cloth, `letter` (existing).
  - **At 390 the photograph comes first** (CSS `order`, DOM unchanged), so the first screen isn't all text.
  - Today note.
- **"What you need" block:** "A Story calls in its iPhone app at an agreed hour (in a private beta), or a staff member starts a conversation together with them." (`Care.tsx:239`). Placed directly after the hero.
- The night band "One circle around each resident" stays, with the three roles as **three typeset columns** (no Card, S23).
- Film link inside the residents section: "See a call become a book · 49 s" (S28).
- **Demo form:** shared `DemoBooking`. **Field set unchanged** (data contract); visually grouped into 2 steps with `<fieldset>` + `legend` (contact, then preferences) on one page, with no wizard.
- **Check:** first screen at 390 contains an `img`; screens ≤ 7.9; lead-contracts test passes.

**/programs** (`Programs.tsx`)
- **Hero:** cloth `wide` (the marks are the object, existing).
- The footer plate is suppressed on this route (§1.3).
- `Invitation next={["/our-story","/how-it-works","/contact"]}`.
- Wording rules from `design.md` ("membership and grant status only") stay.
- **Check:** program marks appear once in the DOM on `/programs/`.

**/contact** (`Contact.tsx`)
- **Hero:** `letter` (existing), Daniel's photo kept.
- **At 390 the form comes before the letter's second half:** the letter keeps its first paragraph and signature, then the form, then the routing links.
- **Routing links:**
  - "Reserve for $1" with no discount mention;
  - "Book a demo" → `/organizations#book`;
  - "Questions & answers".
- "Answered within a working day" stays (sourced: `Contact.tsx:281`, `founding.ts:53`).
- **Check:** at 390 the form's first field is within 2 screens; there is no "%" in rendered text.

### Group D — Builder 1 after §1 and §3: /our-story, /questions, /guides + guide pages, /privacy, /terms, 404, /l
(Builder 4 takes /our-story and /guides if Builder 1 is not done with §1/§3 by mid-night. Swap logged in `CHIEF-LOG.md`.)

**/our-story** (`OurStory.tsx`, `our-story/*`)
- The founder letters' **words are not edited** (Daniel's voice; the illness opening is flagged to Daniel, not changed).
- **At 390:** each letter shows its first 3 paragraphs and the signature, with a `<details>` "Read the whole letter" for the rest. Drop caps only at ≥ 861.
- **Bond** (the founder's dog) lives here: one `<Bond pose="sleep">` on the letters' ledge. This is the only place the dog appears on the marketing site.
- The "Why now." cited stats stay with their citations.
- **Check:** ≤ 5 screens at 390 with letters folded; all letter text is still in the DOM (prerender).

**/questions** (`Questions.tsx`, `faqData.ts`)
- **Hero:** **paper ground**, with Daniel's photo and "Rather ask a person?" moved up as the hero object (existing trust move).
- **D3:**
  - delete "Who looks after this if I can't?" and "Can I leave a letter for later?" (`faqData.ts:87-92`);
  - **"What happens if I cancel?" stays as written** (S6). Cancelling a plan is not an ending frame, it is the word buyers search for, and the answer (archive stays open, family keeps access) is a trust signal;
  - `faqData.ts:13` per D1.
- **Filter chips:** `Scroller label="Question topics"`, with no clipping mid-word.
- Group headers are type (`display.sm` with a hairline above), not boxes (S23).
- `Invitation next={["/pricing","/how-it-works","/contact"]}`.
- **Check:** at 390 no chip is cut at the viewport edge without the fade; copy-check on `main` with `if I can't|letter for later|leave a letter|trusted person` returns 0 ("cancel" is not in the pattern).

**/guides and the 7 guide pages** (`Guides.tsx`, `Guide.tsx`, `components/guide*.tsx`, `lib/guides.json`)
- **Index:**
  - **paper ground**, `wide` (existing variant, ground changes), so it reads as an editorial library rather than another cloth hero;
  - the index becomes an **editorial contents list, not a card grid** (S23): each row is a 3:2 crop photograph (already used by that guide's hero), the title, one line, and a hairline between rows. At 1440, photo left and text right; at 390, photo above.
- **Guide pages:**
  - head on **paper**, not cloth;
  - h1 at `display.lg` (not hero size), so the 82-character titles take ≤ 4 lines at 390;
  - the guide photo larger: half the row at 1440, full width above the title at 390.
- `guides.json:28` heading "Finish while there is still somewhere to return" → **"End gently, and keep the recording well"** (S8). The two paragraphs under it (`guides.json:29-30`) are about closing the session and keeping the recording, so this heading describes them. The supervisor rechecks the pair.
- `Invitation next={["/how-it-works","/questions","/samples"]}` on the index.
- **Check:** guide h1 ≤ 4 lines at 390; guide pages ≤ 6 screens at 390.

**/privacy and /terms** (`components/privacy.tsx`, `terms.tsx`, `ui/legal.tsx`, `legal.styles.ts`; **legal text unchanged, byte for byte**)
- **At ≤ 860:** a "Contents" `<details>` (closed) right under "The short version", listing the existing section anchors. Each section ends with a small "Back to contents" link.
- Reading measure 68ch. h2 at `display.sm`.
- Links to these pages use the slash form `/privacy/`, `/terms/`.
- Testers confirm whether the no-slash serve is `dist/privacy.html` (it exists beside `dist/privacy/`). If the static `privacy.html`/`terms.html` files are prerender leftovers, Builder 1 notes it for Daniel. **Do not change hosting tonight.**
- **Check:** `git diff` of the legal string literals is empty (the tester extracts the text of `main` before and after and diffs it: identical apart from "Contents" and "Back to contents"); at 390 the contents list opens and jumps.

**404** (`pages/site/NotFound.tsx`, `components/notFound.tsx`)
- Keep "This page isn't here."
- Links: How it works · Sample books · Questions & answers · Contact (from `nav.ts`).
- **Ground:** ivory, `solo`.
- **Check:** `/does-not-exist` renders with 4 links and the footer.

**/l** (`pages/site/Listen.tsx`)
- Branded page on ivory: the logo (links to `/`), then h1 **"A memory from an A Story book."**
- With both `m` and `k`:
  - render `<audio controls preload="none" src={destination}>` plus a large "Play the recording" button that calls `audio.play()`;
  - **no `location.replace`** any more.
- **On the audio `error` event:**
  - h1 "This recording didn't open.";
  - line "Try scanning the code again, a little closer. If it still won't play, write to contact@astoryapp.com and we'll help.";
  - links "What is A Story?" → `/` and Contact.
  - It never says "expired", "no longer" or "isn't available".
  - **Known limit (S13):** "Try scanning again, a little closer" assumes a scan problem and is wrong for a genuinely invalid code. Accepted tonight; flagged for Phase 2 (§7).
- Missing params keep today's "This code didn't open." state with the same links.
- Slim footer.
- Prerender shows the ready state.
- **Check:**
  - `/l/?m=x&k=y` at 390 stays on the astoryapp.com origin (`page.url()` host unchanged after 5 s) and shows the error state with the logo and two links;
  - no request navigates the top frame to `supabase.co`.

---

## 5. Not to change

- **`/` home page layout and copy (M3, D9).** Only the header and footer may change on `/`, plus the P0 removal of D1/D2 lines (ending and scarcity copy). Every §3 kit and global change is scoped to `main[data-premium]` / `usePremium()` and does not render on `/`: not the eyebrows, measure, tabular numbers, button states, Band padding, StickyStart height, `Invitation` closing/links/Bond, or the `media.nav` breakpoint. Proof: the home pixel diff in §3.00 (0 changed pixels, or ≤ 0.1 %, outside header and footer). Do not edit `src/pages/site/home/*` or `Home.tsx`.
- **Prices, plans, minutes, editions, shipping times, question counts:**
  - guarded files `src/lib/pricing.ts`, `product.ts`, `checkout.ts`, `demoScripts.ts` and `brand.json` are not touched;
  - `founding.ts` gets **copy-only** edits per D1 (strings and `deadlineLine`); its numbers, flags, links and `RESERVE_DEADLINE` stay.
- **Legal text** in `privacy.tsx` and `terms.tsx`: visual changes only.
- **Form fields, names and endpoints** in `DemoBooking`, `LeadForm`, `CheckoutDetails` and the reserve sign-up (data contracts, `npm run test:contracts`).
- **Redirect and handoff logic** (`index.html` pre-paint script, `AppDoor.tsx`, `lib/app.ts` `START_HREF`/`APP`), and the "Start free" label.
- **The demo-film masters** and anything in `a-story-demo-video/` (read only). **`Desktop/phone app/*`** (read only; Phase 2).
- **The brand:** palette, cloth, the four faces, the logo, the program-mark rules.
- **Honest labels:** "sample", "fictional", "in development", the footer "About the examples", the Compare sources line, the cited stats on /our-story.
- **Founder letters' wording, and Daniel's photo** on Contact and Questions.
- **No new claims:** no testimonials, counts, ratings, logos, press, HIPAA/BAA/SOC 2, iPad or Android support, gift delivery dates, call length, or new competitors.

---

## 6. Build plan for one night (4 builders)

**File ownership** prevents merge conflicts. Only the owner edits a file. Others ask via the chief.

| Builder | Owns | Order |
|---|---|---|
| **1 — Shell** | `theme.ts`, `global.ts`, `kit/kit.styles.ts`, `kit/kit.tsx`, `kit/StickyStart.tsx`, new `kit/premium.ts`, new `kit/Scroller.tsx`, the shared site layout (for `data-premium`), `Header.tsx`, `Footer.tsx`, `chrome.styles.ts`, new `lib/nav.ts`, `lib/today.ts`, `scripts/nav-count.mjs`, `scripts/home-diff.mjs`, `design.md`; then group D files | §6.1 order: P1 nav/footer (with the §3.00 scoping and home diff), then the §3 pieces each page group needs, then group D |
| **2 — A + film** | `HowItWorks.tsx`, `Families.tsx`, `YourStory.tsx`, `public/samples/index.html`, new `kit/Film.tsx`, `public/film/*`, `scripts/film-captions.mjs`, `lib/filmTranscript.json`, the webkit Playwright check | Encodes + VTT first (no dependency), then `Film.tsx`, then group A pages |
| **3 — B** | `Pricing.tsx`, `kit/PriceLadder.tsx`, `lib/founding.ts` (copy), `faqData.ts`, `Compare.tsx`, `compare/*`, `Reserve.tsx`, `account/*`, `Thanks.tsx`, `components/thanks.tsx` | **P0 first** (D1/D2/D3 copy removals, its own commit), then group B layout |
| **4 — C** | `Organizations.tsx`, `Care.tsx`, `DemoBooking.tsx`, `Programs.tsx`, `Contact.tsx`, `sitePages.json` | Copy and structure first, then Scroller where §3.9 lists it |

- **Commit order:** strictly the §6.1 priorities. Each commit needs a tester and supervisor pass (plan tasks 3–8) and, from P1 on, a clean home diff (§3.00).
- **Rebase** on `site-premium` before each commit. Do not push.
- **Testers:**
  - copy `…\scratchpad\taste\measure.mjs` to `scripts/taste-measure.mjs` (point `base` at the preview port) and run it before and after on the same 8 pages;
  - run `scripts/nav-count.mjs`, `npm run build:static && npm run lint && node scripts/a11y.mjs`, `npm run test:contracts`, `npm run test:routing`;
  - save shots to `qa/premium-2026-11/after/<slug>-<390|1440>.png`;
  - run `scripts/copy-check.mjs` (§4) and `scripts/home-diff.mjs` (§3.00) before every commit.

### 6.1 Priorities and the cut line (M10)

The night is bigger than four builders can finish, so work lands in this order. A lower priority never starts a commit while a higher one is unpassed, though builders may prepare it in their own files.

| Priority | What | Commit | Why first |
|---|---|---|---|
| **P0** | **D1/D2/D3 copy removals only:** `founding.ts` (copy, `deadlineLine()` → `""`, S4 wording), `PriceLadder.tsx` (closed-branch sentences), `faqData.ts` (`:13` discount sentence, `:87-92` trusted person / letter), `Pricing.tsx` (`reserveDiscountOpen()` false branches, the two `<li>`s at `:1202-1207`, sticky bar "Or reserve for $1"), `Reserve.tsx` (tag, struck prices, 15 % lines, D2 filled card and sentences), plus empty-`deadlineLine` callers (S5). **No layout, no kit change.** | Its own commit, message starting **"P0 deploy first:"**. Deployable alone on top of `origin/main`. | The discount expired 2 Nov 23:59 PT (`founding.ts:110`). Until it ships, the live `deadlineLine()` shows "The 15% offer closed on 2 November", which is ending framing on production. Logged for Daniel as **deploy first**. |
| **P1a** | Nav and footer (§1, §1.4 `/samples` chrome), with the §3.00 scoping flag and the home pixel diff | One commit | AC 1 |
| **P1b** | The film (§2) on /how-it-works, plus the hero links | One commit | AC 3 |
| **P2** | Page groups in this order: **B** (/pricing, /compare, /reserve, account, /thanks), **A** (/how-it-works, /for-families, /your-story), **C** (/organizations, /care-communities, /programs, /contact), **D** (/our-story, /questions, 404, /l), each with the §3 type, spacing, button, today-note and `Invitation` pieces it needs | One commit per group | Clarity and navigation scores |
| **P3** | `Card` (§3.4, pricing + sign-in only), `Scroller` adoption (§3.9), /privacy and /terms contents, the `/samples` "Read in large type" recolour and controls row, the /guides restyle | One commit per item | Polish |

- **A §3 system change lands whole or not at all.** For example, sentence-case eyebrows go to every non-home page in one commit, never to some pages only. If a system change can't finish for all its pages, it waits.
- **Cut line: 07:00 (local).** Anything not passed by tester and supervisor by 07:00 stays **uncommitted**, and the chief lists each item, its state and its blocker in `CHIEF-LOG.md`.
- Hand-off states follow Daniel's rule: "passed on the real target", "passed only locally", or "blocked". Everything tonight is at most "passed only locally"; the film's iPhone play is "passed only in Chromium/WebKit-desktop" (M9).

---

## 7. Flags for Daniel (not decided here)
1. **The reservation offer from 3 Nov.** D1 removes the discount. Do you want a new offer?
2. **Trusted person and letter features.** D3 hides them on selling pages. Where should they be described?
3. **Daniel's letter opens with his uncles' strokes.** Unchanged; your call.
4. **`/gift` link and its 25 December date** (D6).
5. **Org buyers ask about HIPAA/BAA, security review, iPad/Android, archival formats (WAV/MP3, metadata, release forms) and StoryCorps in /compare.** Nothing is claimed until you give the facts.
6. **Web app Phase 2:** one host for share links, no "Codes last 30 days", one name for the first step, a way back to the site, a calmer sign-in (`audit-webapp.md` §5).
7. `/privacy` and `/terms` answer without the trailing slash (hosting); check with the CloudFront setup.
8. Captions default (D4) and "Our story" in the bar (D7) are one-line reversals. D4 deviates from taste rule 27; the uncaptioned-on-screen lines are listed in `CHIEF-LOG.md`.
9. **Deploy the P0 commit first** (§6.1). Until it ships, production shows "The 15% offer closed on 2 November".
10. **Film stills: confirm the licence or provenance of the wedding, porch and family stills in v5.6 before deploying the film** (`character-bible.md` §0, `v4a/wedding_x2.jpg`, `stills/34_x2.png`). The film is in the build, but its note says nothing about the photographs and its poster shows none (D11). If they can't be documented, pull `#film` and the "Watch the film" links before deploy.
11. **The film's music credit** (Salamander Grand Piano, CC BY 3.0) is on the page and in the transcript. It must also go in any YouTube/X/LinkedIn description if the film is posted there (`brief/credits.md`).
12. **Remembering someone who has died: where should this use case live?** The /for-families card for it was removed (D10), together with its "Guides for remembering someone" link.
13. **"We email you when the calls open"** (`founding.ts:309`) sits beside "the calls ring … in a private beta". Which is true for a reserving family today? Not reworded (S3).
14. **`.vtt` Content-Type on deploy:** `aws s3 sync` may upload it as `binary/octet-stream`. Add `--content-type text/vtt` for `film/*.vtt` in `publish.yml` (not changed tonight, S18).
15. **`/l` error copy** assumes a scan problem; a genuinely invalid code needs its own line (Phase 2, S13).
16. **The film on iPhone:** one tap should play with sound; checked only in Playwright WebKit. Please try it once on your iPhone (M9).

---

## 8. Changes after review

Source: `docs/premium/spec-review.md` (11 MUST, 28 SHOULD). Every MUST is applied. SHOULD items are applied unless the row says otherwise.

### MUST-FIX

| # | Change | Where |
|---|---|---|
| M1 | Film note is now "A 49-second film. The Millers are a fictional family. Voices are synthetic." Nothing is said about the photographs. Poster moved from 3.40 s (wedding still) to a UI/type-only frame starting at 14.5 s; tester confirms no photo or person. Stills licence flagged. | D11, §2.2, §2.4, §7.10 |
| M2 | Exact CC BY 3.0 credit from `brief/credits.md` sits under the player (always visible) and as the transcript's last line. | §2.2, Check 2, §7.11 |
| M3 | New §3.00: every kit and global change is scoped to `main[data-premium]` / `usePremium()`, false on `/`. `Invitation` keeps its legacy output on home; new `media.navBar` and `tracking.eyebrowPremium` tokens leave `media.nav` and `tracking.eyebrow` untouched. New `scripts/home-diff.mjs`: pixel diff of `/` at 390 and 1440, header/footer/sticky masked, 0 px or ≤ 0.1 %. | D9, §1.1, §3.00, §3.1–3.8, §5 |
| M4 | `/thanks` keeps the same-email instruction (`checkout.ts:61-62`) and the source's "Your checkout receipt is your confirmation." No Stripe receipt claim; the "If you've" grep is gone. | §4B /thanks |
| M5 | /pricing hint is "Everyone starts free. Writing and reading never cost extra." (`pricing.ts:183`). The false "Only calls are paid for." is deleted, not spread. | §1.0 |
| M6 | The "Someone who has already gone" card is removed entirely (kicker, title, text, link, photo 15); 3 cards in one row. Remembering use case flagged. | D10, §4A /for-families, §7.12 |
| M7 | One copy-check method: `main` `innerText` only, word boundaries and exact phrases, per-page patterns rewritten; builders never edit copy for a grep, the supervisor rules on each hit. | §4 intro, every group Check |
| M8 | `Scroller` is `role="region"` + required `aria-label` + `tabIndex={0}` around `<ul>/<li>`, focus ring, CSS-only end fade driven by `data-overflow`; `npm run a11y` zero new violations. | §3.9 |
| M9 | Facade uses `flushSync`, then `video.play()` in the same click handler, no `autoplay` attribute; rejected promise leaves native controls. Playwright webkit (iPhone descriptor) check row; reported as "passed only in Chromium/WebKit-desktop" until a real iPhone run. | §2.3, Check 2, §7.16 |
| M10 | New §6.1 priorities P0–P3 with P0 (D1/D2/D3 copy) as its own "deploy first" commit; 07:00 cut line, unpassed work stays uncommitted and logged. | §6, §6.1, §7.9 |
| M11 | "Book a demo" row is not rendered in the desktop panel or the drawer disclosure on `/organizations` and `/care-communities`; Checks 1.1 and 1.2 run on `/organizations/` too. | §1.1, §1.2 |

### SHOULD-FIX

| # | Taken? | Change |
|---|---|---|
| S1 | Yes | Today note drops "and the book". |
| S2 | Yes | "Plans aren't on sale yet. Today you can start free, and $1 holds your place in line." |
| S3 | Flag only | §7.13; no edit. |
| S4 | Yes | "The dollar comes off your first year". |
| S5 | Yes | Empty `deadlineLine()` renders nothing; callers listed; empty-pill check. |
| S6 | Yes | "What happens if I cancel?" stays; "cancel" out of the grep. |
| S7 | Yes | "Voices are synthetic." in the film note. |
| S8 | Yes | Guide heading "End gently, and keep the recording well". |
| S9 | Yes (option b) | Captions default off, deviation from rule 27 logged with the line list. |
| S10 | Yes | Visible "Play the film · 49 s" starts the accessible name. |
| S11 | Yes | Focus ring by ground (chocolate on light, ivory on cloth), measured ≥ 3:1. |
| S12 | Yes | Compare tables reflow in one DOM with `data-label`. |
| S13 | Flag only | §7.15. |
| S14 | Yes | Poster eager + high priority if in first viewport; LCP element recorded. |
| S15 | Yes | LCP baseline = local `origin/main` build, same machine, 3 runs, medians. |
| S16 | Yes | `-passlogfile` per output. |
| S17 | Yes | WebM dropped; MP4 only. |
| S18 | Flag only | §7.14; `verify-live` checks the live Content-Type. |
| S19 | Yes | ≤ 250 KB per image at 390 checked on five pages. |
| S20 | Yes | Wrap at 1024 → breakpoint moves to 1179, logged; type never shrinks. |
| S21 | Yes | Hover-open then click keeps the panel open; in Check 1.1. |
| S22 | Yes | §3.3 and §3.9 sentences rewritten. |
| S23 | Yes | `Card` only on pricing plan cards and the sign-in/up form; questions, guides, care, org and editions use type and hairlines. |
| S24 | **Partly** | /pricing editions leave the scroller (2-column grid at 390). I kept `Scroller` for /how-it-works WAYS and /organizations segments at ≤ 640, because they hide no price and are needed to reach the screen targets; the supervisor can veto per page. |
| S25 | Yes | Real objects first (square book, `public/app/` screens, UI-only poster); /organizations hero uses one, with a logged fallback. |
| S26 | Yes | /pricing gets the square book beside PriceCard; /compare and /reserve are logged exceptions; CallSlip counts only if it is the real app screen. |
| S27 | Yes | Two verbatim `mission.md` phrases: /how-it-works WAYS and the /for-families giving block. |
| S28 | Yes | Hero actions keep "Watch the film · 49 s"; care reads "See a call become a book · 49 s", organizations "See one conversation become a book · 49 s". |

### Assumptions made tonight (Daniel asleep)
- The P0 copy removal is allowed to show on `/` (D9). Removing a false or ending line is not a home redesign. The home pixel diff is measured against `origin/main` + P0.
- `/thanks` keeps its "If you've completed a purchase" condition (the review's suggested lead dropped it), so a visitor who opens the page directly is never told they paid.
- The film still ships in the build with the stills flag open, because Daniel deploys and can pull it (§7.10).
