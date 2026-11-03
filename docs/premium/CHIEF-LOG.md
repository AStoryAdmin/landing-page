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
