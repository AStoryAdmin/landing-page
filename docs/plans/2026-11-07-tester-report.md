# The 7 November tester report becomes five fixes, shipped in the order the tester gave them

**Ask (verbatim):** In C:\Users\nguye\Desktop\a-story-site (the marketing site) and C:\Users\nguye\Desktop\phone app\web-app (the app's web pages; branch t18-read-page holds the /read page). Read each repo's CLAUDE.md first. A tester's report, 7 Nov; build what follows, in this order: (1) How it works page: four moments to the top, then the setup as numbered steps, each with a real screenshot, the daily call showing the phone's own call screen lighting up; each step folds; screenshots from the harness, never mock-ups. (2) "Watch a call": a real recorded call or the button goes; Daniel decides. (3) The sample book's QR codes open the real /read page with the chapter's transcript and "Hear it"; works the moment the owner's /read deploy lands. (4) The short film: "A Story" said right, each visual held ≥ 3 s, film no longer than now; before/after clips. (5) The hero line: three proposals in the family's own words plus "Capturing the joy in life" as a fourth, with why. Each change has a Playwright check under the site's qa folder and a before/after screenshot. Passed only locally until live on astoryapp.com; three buckets at the end.

*As of 7 Nov 2026 · Claude for Daniel · branch `tester-2026-11-07` (worktree `Desktop/asl-tester-1107`, from `origin/main` 4deef9b)*

## Decisions Daniel makes before the build starts

| # | Decision | Recommendation | Why |
|---|---|---|---|
| D1 | "Watch a call": real recording, or remove the button | **Remove now** (task 2a); a real recording is a follow-up | The only "call" on the page today is scripted text (`home/Listen.tsx` stills behind "See a sample call"). A real call needs a real voice; the demo call room on Expo web speaks with a synthetic voice, which would have to be labelled, and that undercuts "watch a call". |
| D2 | The phone's own call screen (iOS CallKit) for step 2 | **Daniel takes one screenshot on his iPhone** from the TestFlight build at a scheduled call (about 2 minutes) | The harness renders `IncomingCall` (the in-app door), not the iOS system call screen. On an iPhone the daily call is a real CallKit call (`IncomingCallScreen.js` header). This PC has no iOS simulator, and a drawn call screen would be a mock-up. |
| D3 | What the sample books' codes open on /read | **A sample mode on /read**: `/read?sample=<book>&c=<chapter>` reads a static JSON file bundled in the web app, labelled "Sample book" | The sample families are fictional; the real path (`book_read` rpc) needs a story row and a key in live Supabase. Seeding fictional stories into production is worse. "Hear it" for a sample is a synthetic voice, labelled once: "A sample. The voice is synthetic." |
| D4 | The line that replaces "It’s the everyday." | **A** (below) | See the hero section. |

**Approved 7 Nov 2026 as recommended** (D1 remove, D2 Daniel's iPhone capture, D3 sample mode, D4 line A). Daniel gave full permission for the night and asked for more agents: the harness screenshots, the /read sample mode with the QR codes, and the film run as parallel agents; the site page work runs in this session.

## Goal

A visitor to astoryapp.com/how-it-works understands, in order, what happens and what each step looks like on the phone, including the moment the phone rings; every button on the page shows what it promises; a phone that scans a sample book's code opens that chapter's words and its voice; the short film says "A Story" the way people do and lets each picture land.

## What I found that changes the ask

- **`Desktop/a-story-site` is not the live site.** It is an old static demo (no git, no `CLAUDE.md`). astoryapp.com is `AStoryAdmin/landing-page` (memory: demo-video-studio). All site work goes there, on the new branch above.
- **Neither `landing-page` nor `web-app` has a `CLAUDE.md`.** I used `docs/START-HERE.md`, `docs/code-conventions.md` and `MAP.md` (site), `DEPLOY.md`, `DESIGN.md`, `PRODUCT.md` (web app), and the phone-app `CLAUDE.md` → Lessons. Task 0 adds a short `CLAUDE.md` to the site repo.
- **"It’s the everyday." is the second section, not the hero.** It is the `h2` of `src/pages/site/home/WhatGetsLost.tsx:485`, under the hero. I treat it as the line the tester meant and leave the hero `h1` alone.
- **The short film is the 49-second v5.6 cut** in `public/film/` (`kit/Film.tsx`, /how-it-works only). The home-page v6.2 film is not on `main`. The fix is a new v5.7 from the studio (`Desktop/a-story-demo-video`), which already tried "AY Story" via quoted-A SSML on Edge's free voice (`brief/v4-sound-notes.md` §v5.3); the tester still hears a machine.
- **The sample books' codes today are fixed drawings** (`const QR` in `public/samples/index.html:1450`) that open an in-page phone. They do not encode a /read URL.

## Not doing

- No change to the phone app or its `chapterReadUrl` format, and no edits in `phone app\phone-app` (another session owns it).
- No production Supabase writes, no edge-function deploys, no merge of `t18-read-page` to `web-app` `main` (that is §6 step 3 of `docs/THANH-2026-11-06.md`, Daniel's).
- No new film concept, script or music; the film is re-cut and re-voiced, not rewritten.
- No change to the home hero `h1`, prices or the CTA.
- A real recorded call (D1) is a follow-up, unless Daniel chooses it.

## Acceptance criteria

1. On /how-it-works (1440 px and 390 px), the first section after the hero is "Four moments", followed by numbered setup steps 1–N.
2. Each setup step shows one line and a real phone screenshot; its detail sits behind a `<details>` disclosure that is closed on load and opens by click and keyboard.
3. Every step screenshot comes from the phone-app harness (`?screenshot=1&screen=…`) or a device capture, and its file name and source are listed in `public/how-it-works/steps/SOURCES.md`. No drawn phone UI.
4. The daily-call step shows the iPhone's own incoming-call screen (D2) beside the app's door.
5. No button or link on /how-it-works promises something to watch or hear that the page cannot play (D1). A Playwright check clicks every "Watch" / "See" / "Hear" control and proves it plays or scrolls to something that plays.
6. Each sample-book code decodes to `https://app.astoryapp.com/read?sample=<book>&c=<chapter>`, the same base the app prints (`APP_READ_URL`).
7. On the `t18-read-page` web app run locally, that URL shows the chapter name, each memory's words in full and a working "Hear it", labelled as a sample with a synthetic voice.
8. The v5.7 film is ≤ 49.4 s, every shot holds ≥ 3.0 s (measured from the render's cut list), and "A Story" is heard as "AY Story" by an ASR check and by Daniel's ear.
9. The site plays v5.7 on /how-it-works, with the note "A 49-second film" updated to the real length.
10. Four candidate lines sit in this plan; once Daniel picks one, it replaces "It’s the everyday." with no other change to that section.
11. Every change has a Playwright check under `qa/tester-1107/` and a before/after screenshot pair in `qa/tester-1107/shots/`.

## Tasks

- [ ] 0. Add a site `CLAUDE.md` (where the live site is, its checks, deploy, Lessons) — files: `CLAUDE.md` — done when: it names the build, the qa folder and the publish steps from `docs/PUBLISHING.md`.
- [ ] 1a. "Before" shots of /how-it-works, /samples and home at 1440 and 390 px from astoryapp.com — files: `qa/tester-1107/before.mjs` — done when: 6 PNGs saved.
- [ ] 1b. Capture the step screenshots from the phone-app harness on my own Expo web server on port 8095 (never 8081; output only into this worktree): Welcome / sign-up, schedule the hour, `IncomingCall`, `CallVoice` mid-call, the memory card, the family's add — files: `public/how-it-works/steps/*.webp`, `SOURCES.md` — done when: each file lists its harness URL.
- [ ] 1c. Daniel's iPhone CallKit screenshot (D2) → `public/how-it-works/steps/02-iphone-rings.webp` — done when: the file is in place; until then the step shows the app's door and the plan marks 1c blocked.
- [ ] 1d. Rebuild the page order: hero → Four moments → numbered setup steps (`<ol>`, each a `<details>` with a one-line `<summary>`) → the rest as now — files: `src/pages/site/HowItWorks.tsx`, `src/pages/site/how-it-works/SetupSteps.tsx` — done when: `npm run build` passes and `qa/tester-1107/steps.spec.mjs` (order, closed on load, opens by click and Enter, images load, no horizontal scroll at 390 px) is green.
- [ ] 2a. (D1 = remove) Remove "See a sample call" and the hero "Watch the film · 49 s" stays only because it plays; rename the `CallStills` section heading to say it is a written sample — files: `HowItWorks.tsx` — done when: `qa/tester-1107/promises.spec.mjs` is green.
- [ ] 2b. (D1 = record, instead of 2a) Record the demo call room (`?demo=1&as=rose&call=1`) with its transcript, labelled "A sample call. The voice is synthetic.", encode to `public/call/` — done when: the same spec plays it.
- [ ] 3a. Web app, on `t18-read-page`: add the sample mode — `parseReadQuery` accepts `sample` + `c`, `loadBook` reads `public/read-samples/<book>.json`, `HearIt` plays the bundled clip, a "Sample book" label — files: `src/lib/bookRead.ts`, `src/pages/read/ReadPage.tsx`, `public/read-samples/*` — done when: vitest (new cases in `machine.test.ts` / `bookRead.test.ts`), `npm run build` and a Playwright run on `/read?sample=carolyn&c=…` are green.
- [ ] 3b. Export each sample book's chapters from `public/samples/books/<id>.js` into the JSON the /read sample mode reads, by a script so they never drift — files: `scripts/samples-to-read.mjs` (site) — done when: the script's output matches the web app's fixture byte for byte.
- [ ] 3c. Re-draw the sample codes as real QR codes of `APP_READ_URL?sample=…&c=…` — files: `public/samples/index.html`, `scripts/qa/samples-qr.mjs` — done when: the script decodes every code on every spread and the in-page phone still opens; `samples-overflow.mjs` stays green.
- [ ] 4a. Studio: audition four spellings of the brand for the narrator (quoted-A raw SSML today, "Ay-Story", "A. Story", and a voice with `<phoneme>` support: Azure neural with a key, or a local engine already in `tools/tts`), score with `ay-measure` + wav2vec2 ASR — files: `a-story-demo-video/tools/tts/` — done when: one spelling passes ASR on every line and Daniel picks it by ear from four 3-second clips.
- [ ] 4b. Re-cut v5.6 → v5.7: list every shot's hold from the composition, merge or drop shots under 3.0 s, keep ≤ 49.4 s — files: `studio/src/v5/…`, `brief/v5.7-cut-list.md` — done when: the cut list shows no shot under 3.0 s and `ffprobe` duration ≤ 49.400 s.
- [ ] 4c. Encode v5.7 into the site (`scripts/film-encode.mjs`), regenerate captions/transcript, update the length note — files: `public/film/*`, `lib/filmTranscript.json`, `kit/Film.tsx` — done when: `qa/tester-1107/film.spec.mjs` plays to the end and the note matches the file's duration; before/after clips in `qa/tester-1107/clips/`.
- [ ] 5. After Daniel picks (D4), replace the line — files: `src/pages/site/home/WhatGetsLost.tsx` — done when: `qa/tester-1107/line.spec.mjs` finds the new line, the section fits at 390 px, before/after shots saved.
- [ ] 6. Open the PR to `AStoryAdmin/landing-page` `main`; after merge, re-run every spec against astoryapp.com — done when: each spec is green with `BASE=https://astoryapp.com`.

## Verification

| # | Check | Where it runs | Evidence |
|---|---|---|---|
| 1 | `qa/tester-1107/steps.spec.mjs` section order | local build, then astoryapp.com | spec output, before/after 1440 + 390 |
| 2 | same spec: `<details>` closed, opens by click and Enter | local, then live | spec output, open/closed shots |
| 3 | `SOURCES.md` lists a harness URL per image; spec fails on any image not listed | local | file + spec output |
| 4 | step 2 image is the device capture (1c) | local, then live | screenshot |
| 5 | `qa/tester-1107/promises.spec.mjs` clicks every Watch/See/Hear control | local, then live | spec output, before/after |
| 6 | `scripts/qa/samples-qr.mjs` decodes every code | local, then live /samples | decoded URL list |
| 7 | Playwright on `/read?sample=…` in `t18-read-page` | **local only** until §6 step 3 lands; then app.astoryapp.com | spec output, screenshot, audio `currentTime > 0` |
| 8 | cut list + `ffprobe` duration + ASR transcript of each brand line | studio, local | `brief/v5.7-cut-list.md`, ASR log, before/after clips |
| 9 | `qa/tester-1107/film.spec.mjs` | local, then live | spec output |
| 10 | `qa/tester-1107/line.spec.mjs` | local, then live | before/after shots |
| 11 | all of the above with `BASE=https://astoryapp.com` | astoryapp.com after merge | one run log |

Nothing counts as passed on the real target until it runs against astoryapp.com (and app.astoryapp.com for 7).

## The line that replaces "It’s the everyday."

The product in the family's own words is three things: a question a day, their voice kept, a book when you're ready. Each line below says all three or two of them; the fourth says none.

| | Line | What it says |
|---|---|---|
| **A** (recommended) | One question a day. Their voice, kept. A book when you’re ready. | All three, in the order they happen |
| B | Mom answers one question a day. You keep her voice, and her book. | All three, from the family's side; names one parent |
| C | A question a day, in their own voice, until it fills a book. | All three as one motion; quieter |
| D | Capturing the joy in life. | None of them |

**Why A–C are closer than D:** D could sit on a camera or a photo-album app; it never says there is a question, a voice or a book, so a visitor still does not know what A Story does. "Capturing" also sounds like recording happens to you; in A Story the parent talks and the family listens. A–C use the words a family would use to tell a friend about it.

Each line avoids "legacy", hype words and the "It’s not X, it’s Y" shape (`phone-app/docs/PHILOSOPHY.md`).

## Claims that need a source

| Claim | Where it would appear | Source to show before approval |
|---|---|---|
| "a question a day" / "daily" | line A–C, setup steps | `phone-app/src/lib/scheduledCall.js:1` ("The daily call's schedule"); confirm a family cannot pick fewer days, or say "at the hour you choose" |
| "Their voice, kept" / "Hear it" | line A–C, /read | Today the site says voice clips are "in development" (`HowItWorks.tsx`, "Clips in the storyteller’s own voice are in development"). The voice by link ships with the `listen` function (§6 step 2). The line waits until that is live, or the site's "in development" sentence changes with it. |
| Film length ("A 49-second film") | `kit/Film.tsx` | `ffprobe` of the v5.7 master |
| "two-minute setup" | Four moments lead | already on the page; time Daniel's own setup once, or cut the number |

## Risks

- **The CallKit screenshot (D2) does not arrive.** Step 2 ships with the app's door only, and the hand-off says so.
- **/read sample mode is unseen until the web app deploys.** The codes point at app.astoryapp.com/read; until §6 step 3, a scan gets the web app's current 404. Mitigation: the codes ship only when /read is live, or the site's in-page phone stays the click behaviour (it does either way) and scans fail quietly for a few days. I recommend shipping the codes with the /read deploy.
- **Edge's free voice cannot say the name.** Then the narrator moves to a voice with phoneme support, which changes the film's sound; Daniel hears it before encode.
- **Fewer, longer shots read slower.** The film must still pass the cold-viewer panel used for v6 (mean ≥ 8); I run it on v5.7.
- **The PC is short of RAM.** Render chunked, concurrency 1 (studio notes).

## Assumptions

- The live site repo is `AStoryAdmin/landing-page`, not `Desktop/a-story-site`.
- "The hero line" means "It’s the everyday." in `WhatGetsLost.tsx`.
- "The short film" means the /how-it-works film (v5.6), not the YC file, which stays frozen.
- Setup steps are: install and sign in, pick the hour, the phone rings, they talk, the memory appears, the family adds. Final count follows the screens the harness can show.

## Next steps

| What | Who | By when |
|---|---|---|
| Pick D1–D4 (change at least one) | Daniel | before the build |
| iPhone CallKit screenshot (D2) | Daniel | with approval |
| Tasks 0–5 | Claude | after approval, one commit each |
| /read deploy (§6 step 3) | Daniel | unblocks criterion 7 on the real target |
| Merge the site PR | Daniel | after review |

## Hand-off (7 Nov 2026, night)

**Passed on the real target:** none yet. Merging was blocked in this session ("merge without review"), so nothing is live on astoryapp.com.

**Passed only locally / in preview**
| Criterion | Evidence | Where it lives |
|---|---|---|
| 1–3 Four moments first, six folding steps with real screens | `qa/tester-1107/steps.mjs` all passed at 1440 and 390; `npm run check` exit 0; shots `qa/tester-1107/shots/{before,after}-how-it-works-*.png` | PR #14 (`tester-2026-11-07`) |
| 5 No empty Watch/See/Hear promise | `qa/tester-1107/promises.mjs` 8/8 locally; live fails 4 (before) | PR #14 |
| 6 Sample codes decode to `app.astoryapp.com/read?sample=…&c=…` | `scripts/qa/samples-qr.mjs` 24 codes, 21 URLs, 0 failures; overflow and data checks OK | branch `tester-1107-samples` (held) |
| 7 /read sample page: chapter words + "Hear it", labelled synthetic | web-app vitest 1174 pass, build OK, `e2e/readSample` 4/4 | web-app `t18-read-page` 17e59d8 |
| 8 Film ≤ 49.4 s, every shot ≥ 3.0 s, "AY Story" by ASR | 49.400 s, 13 shots, min 3.03 s (v5.6: min 0.60 s), ASR "a story"; `brief/v5.7-cut-list.md` | studio a65c1c2 |
| 9 Site plays v5.7 | `qa/tester-1107/film.mjs` 14/14 locally; live fails 4 (before) | PR #15 (`tester-1107-film`) |
| 10 Line A in place | `qa/tester-1107/line.mjs` 12/12 at 1440/390/320 | branch `tester-1107-line` (held) |

**Blocked or not done**
- Merge PR #14 and PR #15 (Daniel). Then re-run `steps.mjs`, `promises.mjs` and `film.mjs` with `--base https://astoryapp.com`.
- Criterion 4 (D2): the iPhone's own lock-screen call needs Daniel's device screenshot → `public/how-it-works/steps/02b-iphone-rings.webp`, then set `DEVICE_RING` in `SetupSteps.tsx`.
- Criterion 8, by ear: Daniel listens to `a-story-demo-video/out/v5.7/compare/` and `audition/` before merging #15.
- Criterion 7 on the real target: the /read deploy (THANH-2026-11-06 §6 step 3). Then merge `tester-1107-samples` to the site; until then its codes would land on a page that does not exist yet.
- Criterion 10: "Their voice, kept" disagrees with the site's "clips … are in development". It ships once the voice playback (the `listen` function) is live and that sentence changes with it.
