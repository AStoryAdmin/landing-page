# Juror 3: the customer (CMO), round 2, 2026-10-24

**Verdict: FAIL, by one fix.** Round 2 closed 36 of my 38 items and all three blockers. Maria now knows what A Story is, that her dad needs the iPhone app, what it costs, and what happens after she pays $1. One new defect fails her on her own phone: on /samples at 390px the "Tap a page to turn it" hint is printed on top of the "Seven cover colors" note. Fix that and I'd PASS; every axis would then be 8 or higher.

I re-walked commit 94264d8 on the dev server at :5191. I went phone first at 390x844 (home, /how-it-works, /pricing, /our-story, /samples, /reserve, /questions), then re-read each page at 1366x768 in headless Chromium. I submitted no forms and opened no payment pages.

## Scores

| Axis | R1 | R2 | Why it moved |
|---|---|---|---|
| 5-second clarity | 7 | 9 | "Every life holds a story worth keeping." plus the AI-biographer line, with the iPhone-app line right under the buttons |
| Belief and trust | 6 | 8 | Round photos, credentials, "We answer every email ourselves", the privacy line on home, every sample labelled. Two things hold it at 8: the sample book still promises "VOICE HIGHLIGHT", and the "Why now" statistics |
| What to do next, and what it costs | 6 | 8 | "Calls from $19.99 a month" is true. /reserve now has a "What happens next" section. The strikethrough is gone. There is still no date, but the page says so honestly |
| Sounds like a person | 7 | 8 | 17 of my 18 voice fixes landed. A few small tells remain |
| Emotional pull without drama | 8 | 8 | The Joan voice paragraph is gone. Ruth, Walt and the lake still carry the page |
| Path from home to sign-up or reserve | 6 | 7 | /samples works and has the site header and footer. It loses a point for the text collision on the phone and for the sign-up page that still sells "one small question a day" |

## Round 1 items

**Blockers**
- B1 (the mobile reserve link read as struck out): **closed.** It now reads "Or reserve for $1, 15% off" on one line with a clean underline.
- B2 (the iPhone app requirement was hidden): **closed.** It's now on the home hero, home step I, /how-it-works, /pricing, /reserve and the FAQ.
- B3 (/samples showed 404 on dev): **closed.**

**Fixes 1-38**

| # | Status | Note |
|---|---|---|
| 1 hero small print | closed | "...The calls ring in the A Story app on your parent's iPhone, now in private beta. Reserve, and we email you when the calls open." |
| 2 step I | closed | "Install A Story on their iPhone together. Two minutes, then pick the hour it calls." |
| 3 /how-it-works lead | closed | |
| 4 Rosa label, "sample" | closed | "Rosa, 84, about her mother and one winter", "A scripted sample call." |
| 5 Joan voice paragraph | closed | Ends with "Clips in the storyteller's own voice are in development. Joan is a sample." |
| 6 FAQ voice claims | closed | Both answers fixed |
| 7 free ten-minute conversation | partly closed | It now says "on iPhone". See R2-3 |
| 8 privacy on home | closed | "Only your family sees it. We never sell data, and we never train AI on your stories. How we keep it private" |
| 9 /samples "real"/"fictional" | closed | |
| 10 who is behind it | closed | Photos, credentials, and "Write to Daniel at daniel@astoryapp.com. We answer every email ourselves." The city was left out, which is right with no ruling |
| 11 "from $119" | closed | "Start free. Calls from $19.99 a month." |
| 12 close body | closed | |
| 13 /pricing lead | closed | |
| 14 "not sold yet" note | closed | |
| 15 /pricing length | closed | Down from 12.8 to 10.6 phone screens, and the ladder now shows each price once |
| 16 /reserve, what happens next | closed | |
| 17 "listening codes" | closed | Removed from the pricing lists |
| 18-25 /reserve and FAQ voice | closed | "RESERVE · ENDS 2 NOVEMBER", "Why a dollar.", "It comes off your plan", "It sets the order", "so Mom and Dad can each have their own", "The questions you keep meaning to ask.", "No. Free never runs out." |
| 26-31 /how-it-works and /pricing voice | closed | |
| 32 headline | closed | Bao's ruling: "Every life holds a story worth keeping." |
| 33 Bao's pull quote | closed by ruling | Bao keeps "A family is not a résumé..." |
| 34 sign-up page copy (web-app) | **open** | See R2-2 |
| 35 /samples header and footer | closed | |
| 36 touch hint | closed | Shows "Tap a page to turn it" on touch devices |
| 37 too many names | mostly closed | /how-it-works now shows one card (Joan) and labelled sample tabs |
| 38 AI-photo disclosure near the prints | closed | "From a sample family's book" now sits under the phone hero |

## Remaining fixes, ranked

### R2-1 (blocker): /samples at 390px, two blocks of text overlap
- **Where:** `public/samples/index.html`, the `.notes` block. The "Linen hardcover" `.note` collapses to 0px height on a phone. I measured top 966 and bottom 966, while its paragraph runs from 989 to 1043. The `.hint` that follows starts at 978 and prints over it. The likely cause is the mobile `.note`/`.notes` rules around lines 158, 268 and 910 (`min-height:0` inside a flex column). At 1366 the two sit side by side and look fine.
- **Fix:** give `.notes .note` `flex: none` (or `height: auto`) on small screens so it keeps its height, then check at 390 and 1366. The copy needs no change.

### R2-2: the sign-up page sells a different product (web-app repo, outside this site)
- **Where:** `web-app/src/pages/auth/AuthFrame.tsx:193`
  - Old: "One small question a day, answered in their own words, and the family's book grows page by page."
  - New: "A Story calls the people you love and keeps what they tell. Start free, no card."
- **Same file set:** `web-app/src/pages/Wall.tsx:537`
  - Old: "One small question a day, and the family adds the rest."
  - New: "The calls, the memories and the book, explained."

### R2-3: the free first conversation versus the private beta
The Free tier says "One ten-minute conversation with A Story on iPhone, to begin" (`src/lib/pricing.ts` lines 174, 181, 190, 196). The same page says the iPhone app is in private beta, so Maria can't tell whether her dad can use it tonight.
- Old: "One ten-minute conversation with A Story on iPhone, to begin"
- New: "One ten-minute conversation with A Story, once your family is in the iPhone beta"

The `FREE_TIER.blurb` in the same file says "a printed book whenever you want one", but ordering hasn't opened and Free doesn't include a printed book. If it renders anywhere, change it to "the whole book to print at home".

### R2-4: the sample book still promises voice
Book pages in `public/samples/index.html` carry the label "FULL TRANSCRIPT · VOICE HIGHLIGHT" eight times, and the hint says "Tap a QR code to see what it opens". The page also says "laid out the way yours will be". Voice clips are in development.
- Old: "FULL TRANSCRIPT · VOICE HIGHLIGHT"
- New: "FULL TRANSCRIPT"
- Alternative while voice is in development: "FULL TRANSCRIPT · VOICE CLIP COMING"

### R2-5: /our-story "Why now" reads like a pitch deck
`src/pages/site/OurStory.tsx`. Maria doesn't need "18% → 30% Adults 50 and over who use generative AI" in the middle of two letters. It's an investor point and breaks the mood the letters set.
- **Option A (recommended):** move it off /our-story.
- **Option B:** keep only the human number, with a plain head:
  - Old: "Why now." / "11,200 Americans turn 65 every day, through 2027."
  - New: "11,200 Americans turn 65 every day." (keep the source line)

Juror 4 should check both sources.

### R2-6: /reserve repeats itself
`src/lib/founding.ts`. The first "Why a dollar" point has a heading and body that say the same thing.
- Old: "15% off, until 2 November" / "15% off the first year for everyone who reserves by 2 November."
- New: "It holds your price" / "15% off your first year, for every family that reserves by 2 November."

### R2-7: Bao's credential, worded exactly
`src/pages/site/OurStory.tsx`
- Old: "Led go-to-market for four biotech startups."
- New: "Go-to-market strategy for four biotech startups."

ABOUT-ME describes this as consulting work ("market-entry and pivot strategy"), so "led" overstates it slightly. Flagged once. It's Bao's call.

### R2-8: British spellings on a US site
- `public/samples/index.html:1245-1246`: "Cover colour" becomes "Cover color". The same page already says "Seven cover colors".
- `src/lib/pricing.ts:264, 273`: "full colour" becomes "full color".

### R2-9: one demo label still uses the not-X-but-Y pattern
`src/lib/demoScripts.ts`
- Old: "Follow the aside, not the answer"
- New: "It follows the aside"

## Not verified
- 1920x1000 and 2560x1300 (my brief was phone plus laptop).
- Demo playback and what the sample-book QR codes open.
- The built `dist/` in preview.
- The live sign-up flow past its first screen.
