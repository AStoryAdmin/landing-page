# Image candidates from the pitch decks (2026-10-23)

Read-only scout. No site file was changed.

## Bottom line

Most of the decks' photographs are the site's own library (62 `mission` images), recropped
into circles and polaroids. That framing is a big part of why the decks feel better. Only
about 10 deck images are new and usable. The best of them are a 1962 lake series, a hands-over-the-album
shot, and an adult child with a parent over a phone. Nothing on disk shows an older person
answering a call today. For the "You do step one" strip, the best options are a crop of an existing image or one new GPT image (brief below).

## How this was checked

- I mapped every image on Home and /our-story at http://localhost:5191, plus every `photo`/`id` in `src/pages/site/**` and `src/lib/homeExamples.ts`.
- I extracted `ppt/media` from 6 decks into `C:\Users\vngia\AppData\Local\Temp\claude\scout-images\` (temp; copy out before using): `pitch-oct` = Final final final/A Story - Pitch Deck (Oct 2026).pptx, `investor`, `pitch-sep`, `mbc-3slide`, `mbc-v19`, `elevenlabs`.
- I ran a perceptual-hash dedupe of 372 deck images against `public/mission`, `book-objects`, `app` and `og`. 129 were not on the site, and most of those are charts, icons and slide backgrounds. I looked at every remaining photo.
- I did not view screenshots of the pages at Bao's sizes. The intro overlay blocked the screenshot, so I read the page structure with the DOM instead.

## Where images sit today (relevant slots)

| Page / section | Component | Images now |
|---|---|---|
| Home hero | `home/Hero.tsx` | 27 |
| Home "milestones" | `home/WhatGetsLost.tsx` (`lib/homeExamples.ts`) | 02, 04, 03 |
| Home "It's the everyday" | `WhatGetsLost.tsx` | 05 09 11 12 14 17 07 13 20 25 06 10 |
| Home "catch what the photograph can't" | `WhatGetsLost.tsx` QUIET | 18 |
| **Home "You do step one"** | `home/StepOne.tsx` | 3 app screens: `/app/home`, `/app/talk`, `/app/archive` (cards ~250x323 at 1024w) |
| Home family book | `home/FamilyBook.tsx` | 01, H01-H04, 35 |
| Home "Three calls" | `home/Listen.tsx` via `app/calls.ts` | 31, 07, 14 |
| Home "Every memory has more than one witness" | `home/EveryVoice.tsx` | H04 (also used in FamilyBook) |
| Home founders teaser | `home/Founders.tsx:137` | **02, the same wedding photo used in the milestones trio higher on the page** |
| **/our-story** | `OurStory.tsx` | **No images at all.** About 900 words across two founder letters, which is the text-heavy page Bao's taste forbids |

## Recommended swaps, ranked by impact

All candidates are AI-generated illustrations. The deck brief (`Powerpoint Design/IMAGE-BRIEF.md`) shows the S4 and S12 images were generated. The Gemini folder images carry a visible Gemini sparkle watermark. That fits the footer's existing note that photographs are AI-generated illustrations.

### 1. /our-story: give the page pictures (3 slots)
The page has none, so this is the largest gap.

| Slot | Candidate | Shows | Size | Why | Crop |
|---|---|---|---|---|---|
| Opening, beside "The conversations we thought could wait." | `...\scout-images\pitch-oct\image-8-1.jpeg` | Older hands turning a 1960s photo album, loose snapshots on a kitchen table | 1100x825 | This is the idea itself: faces and dates with no story attached. It's warm, tactile and anonymous, so it doesn't stand in for Daniel's uncles | Keep the hand and the right page. Cap at about 900px wide |
| Bao's letter ("An old photograph would come out...") | Site `34` (`public/mission/34-*`), already in the library | Family leaning over a spread of photos, someone pointing | 1800 | It matches the letter almost word for word. It isn't on Home, which keeps it fresh here | Natural |
| "A family archive is never finished." | `...\scout-images\pitch-oct\image-11-6.jpeg` | 1962 B&W: a teenage boy mid-jump off a dock, three girls cheering | 1000x750 | Several witnesses to one summer, archival and candid. This is "Uncle John's race" from the deck script | Natural. Too small for full-bleed at 2560; use it as a print, 640px or less |

Don't use the Gemini `astory_senior_voice_interview.png`. The lavalier mic and recorder read as a film crew, which contradicts "they just answer the phone."

### 2. Home "You do step one": replacing the phone-screen strip
The pitch folders have no clean "elder answers the phone at home today" image. Options in order:

| Option | Candidate | Shows | Size | Notes |
|---|---|---|---|---|
| A (best on disk) | `...\A Story - W Daniel\Pitchdeck Iterations\06262026\Gemini Images\astory_adult_child_phone_photo.png` | A daughter and her father on a sofa, smiling at her phone | 848x1264 portrait | This is literally step I, "Set it up once. Two minutes on their phone." It's warm and candid-ish, though slightly glossy. **The Gemini sparkle watermark sits bottom right, so crop about 10% off the bottom and right.** It's fine as one portrait panel up to about 600px wide, and soft above that |
| B | `...\Pitch Competition\Powerpoint Design\.codex-build\assets\story-editorial.png` | Older hands with a teal handset, a lake snapshot and a stack of story cards on a table | 1672x941 | It shows the call and the card together. **But it has drawn gold sound-ribbons over the photo, a decorative waveform that Bao has banned, and the overlay can't be cropped out.** Only usable if regenerated without the ribbons |
| C (no new asset) | Site `F04` or `F03` (For Families cards) | A grandmother telling a story to grandkids with a phone on her lap / two women on a bench with a phone | 1122x1402 | Already approved and on brand, but they repeat For Families |
| D (recommended if Bao wants it right) | New GPT image via Codex | See the brief below | - | - |

Brief for D (paste-ready): *"Candid photoreal phone-camera snapshot, present day, natural window light, slight grain, imperfect framing, no text. A woman about 80 at her kitchen table answers a call on her own smartphone held to her ear, mid-laugh, looking off to the side as she remembers. A mug and one old printed photograph lie on the table. Warm wood, cream walls, a little clutter. Landscape 3:2, 1800px wide."* Save as `assets/generated/step-two-call.png`.

Also: the MBC v19 deck has a "Grandma - voice" image (a grandmother on the phone under a beach umbrella) that would suit this slot. Its original is not on disk. It exists only as `/_blob/9af25c6e53e420e41751a189b9756acc` inside the MBC claude.ai artifact (PITCH-PLAYBOOK.md links https://claude.ai/artifact/PgnB9KSionF1AVm5EdPF4c). Fetch it with Artifact `read` + `path` if you want it. I did not fetch or view it at full size.

### 3. Home founders teaser: stop showing the wedding twice
- **Now:** `02` in `home/Founders.tsx:137`, already shown in the milestones trio (`WhatGetsLost.tsx`).
- **Swap to:** `...\scout-images\pitch-oct\image-8-1.jpeg` (album hands, 1100x825). If /our-story takes that one, use `...\scout-images\pitch-oct\image-11-7.jpeg` instead: 1962 B&W, a family leaning out of a loaded station wagon, 1000x750.
- **Why:** the teaser links to /our-story, so the same image should carry across. It also ends the duplicate.

### 4. Home "Every memory has more than one witness": a new image instead of a reused one
- **Now:** `H04` campfire, also used in FamilyBook.
- **Candidate:** `...\scout-images\pitch-oct\image-11-6.jpeg` (dock jump, 1000x750), with `image-11-8.jpeg` (two teens racing down the dock, 1000x750) as an alternate.
- **Why:** several people witnessing one moment, from different spots on the dock. That is the section's claim. It also removes a repeat.
- **Caveat:** the faces are model-pretty and a bit glossy. 11-6 is the most candid of the three. At 1000px it works only at half width.

### 5. Reserve: the 1958 portrait
- `...\scout-images\pitch-oct\image-4-3.jpeg`: a sepia woman laughing at a dance, 1958, 1000x1000.
- It's an alternate face for "Three calls" (Rosa) or the Header menu thumbnail (`Header.tsx:274`, now `31-640`). `31` is still the stronger portrait, so keep this in reserve.

### 6. Reserve: book on the shelf
- `...\scout-images\pitch-oct\image-8-2.jpeg`: a teal cloth book standing on a wooden shelf, 1100x825.
- It's a good "the book lives in the house" moment for Pricing (`Pricing.tsx:1050`, now `closed-1200`). **But it isn't the approved A Story volume** (no title or cover photos), and design.md allows approved book objects only. Use it only if Bao rules it close enough.

### 7. Worth recovering: "Mom, before she was Mom" (MBC v19)
This then-and-now pair (the same woman singing in an 80s band and today packing a lunchbox) is the strongest new idea in the decks. It would replace the weak contemporary set (`45 42 44 46 48 49`) on /your-story (`YourStory.tsx:44-69`). The original is only in the MBC artifact: `/_blob/1a00c4663edd0ee50523c388173cd734`. I didn't view it beyond the slide render.

## Excluded, and why

- **`Pitchdeck Iterations\...\deck\assets\real\family-lawn.png` and `running-kid.png`:** `deck/MATERIALS.md` says they come from **Storii's marketing site** (a competitor). Never use them.
- **Gemini `astory_album_*` (1952 home, 1961 dance, 1962 wedding, 1973 Sunday, 1994 generations, 2026 portrait):** posed and glossy, with the watermark. The site's own 01-04 already do this better.
- **Gemini `astory_family_table_closing`, `astory_hardcover_book_table`, `astory_product_flatlay`, `General Deck\gpt-book-table.jpg`:** stock-like mood shots, and none shows the real book.
- **`pitch-oct\image-11-10`, `11-2`, `11-3`:** studio-style headshots of older people that read as stock.
- **`pitch-oct\image-17-2`** (illustrated window), **`image-2-2`** (photo-folder collage), **`image-5-1`** (porch with flying photos): illustration or collage.
- **`Pitchdeck Iterations\...\gen2\*`:** blurred placeholder figures.
- Founder headshots (`mbc-3slide\image-3-3`, `image-3-5`, `astory_founder_*`): real people, and /our-story deliberately uses monograms.
- App screens in the decks are the same Figma screens as `public/app`, so they add nothing new.
