# Juror 3: the customer (CMO), 2026-10-23

**Verdict: FAIL.** Maria would believe the idea and enjoy reading about it. She would not know that her father needs an iPhone with an app, when the calls open, or what her dollar actually gets her. On her phone, the reserve offer on /pricing looks crossed out.

Walked as Maria (46, Columbus, father 79 two states away). I started on the phone at 390x844 in the evening, then re-read everything on a laptop at 1366x768. Route: home, /how-it-works, /pricing, /our-story, /samples, Start free (which goes to the live app's create-account page), /reserve, plus /questions and /privacy. I ran the dev server on :5191 in headless Chromium, captured page text and screenshots, and submitted nothing. Stripe was never opened.

## Scores

| Axis | Score | One line |
|---|---|---|
| 5-second clarity | 7 | "An AI biographer that calls your parents and grandparents" lands. The headline is abstract, "undocumented" carries a US political meaning, and "Reserve for $1" means nothing yet |
| Belief and trust | 6 | Founders' letters, program badges and "Nothing appears in Walt's story until he says yes" all build trust. But the iPhone-and-app requirement only appears in the FAQ, the strong privacy promises sit only on /privacy, there are no faces, and "real" and "fictional" appear side by side |
| What to do next, and what it costs | 6 | The two doors are clear. "From $119" is wrong because Express is $79. The calls can't be bought and no date is given. /pricing runs 12.8 phone screens and says the plans and the books twice. A mobile bug crosses out the offer |
| Sounds like a person (Bao's voice, humanizer) | 7 | No em dashes and no banned words. Mostly plain verbs with real images (the porch steps, the paddle). About 15 tells remain: not-X-but-Y on /reserve and in the FAQ, triplets, aphorisms, "The easy yes", "never charged by the person" |
| Emotional pull without drama | 8 | The photo wall, Ruth's porch and Walt's lake monster are warm and concrete. The Joan voice paragraph and /reserve's closer push into drama |
| Path from home to sign-up or reserve | 6 | The mobile sticky "Start free" works. /samples returns 404 on dev, and the samples page drops the site header and footer. The sign-up page sells "one small question a day", while the site sells calls |

PASS needs every axis at 8 or above with no blocker. Five axes are below 8, and there are three blockers.

## What Maria thinks, in order

1. **Home hero (phone).** "Most of a life goes undocumented." For a second she reads this as immigration. Then the subline explains the product well. "Reserve for $1" sits right beside "Start free" with no reason given, and the small print says "The calls ring on iPhone in our private beta". Her question: whose iPhone? Dad has an Android.
2. **Three steps.** "Two minutes on their phone" leaves her wondering whether she sets it up on Dad's phone, so she would have to drive two states to do it. Nothing on the page answers that.
3. **What one call becomes, and the witnesses.** This is the best part. She can picture Dad's porch story, and "Nothing appears in Walt's story until he says yes" reassures her.
4. **Close.** "Guided calls from $119 a year." Later she finds Express at $79 and Monthly at $19.99, so "from $119" feels slippery.
5. **/how-it-works.** Five steps, then a demo labelled "Rosa, 84, about a brother who lived four days" sitting over a quote about church and Father Dolan. Where is the brother? Then a whole paragraph on a voice clip that turns out to be "in development". She concludes that half of this doesn't exist yet.
6. **/pricing.** A long page. "Plans are not sold on the web yet. The 25 founding places are taken." So she can't buy the thing she came for. On her phone the "Or reserve Individual for $1 by 2 November, 15% off" link shows a line through "November, 15% off". It reads as a crossed-out offer.
7. **/our-story.** The letters are moving and Bao's is short and good. She still can't see a face, a city, or a person to write to by name, apart from an email in the footer.
8. **/samples.** "Turn the pages of a real A Story book." Next line: "Three fictional families". Which is it? The header changes and the footer disappears, so she wonders if she has left the site.
9. **Start free** goes to app.astoryapp.com: "One small question a day, answered in their own words". That's a different product from the one she just read about.
10. **/reserve.** "The easy yes", "The smallest thing that means something", "The question nobody has asked yet." This is the most salesy page on the site. It never says what happens when it's her turn, or whether Dad's phone will work.

## Blockers

| # | Page | What | Where | Fix |
|---|---|---|---|---|
| B1 | /pricing, phone | The reserve link wraps to two lines and its underline runs through the second line, so "November, 15% off" looks struck out. Seen at 390x844. At 1366 it fits on one line and looks fine | `src/pages/site/Pricing.tsx` lines 257-261 (`.decide .reserve` is `display:inline-flex`, with the underline from `textLink` in `kit/kit.styles.ts`) | Make the link `display:inline` with a real `text-decoration: underline` (or a `background-image` underline that follows wrapped lines), or shorten the copy to fit one line: "Or reserve for $1, 15% off" |
| B2 | Home, /how-it-works, /reserve | The storyteller needs an iPhone and the A Story app installed. Only the FAQ says so ("To be called, yes. You and your storyteller install A Story once"). The home page says "They answer the phone. Nothing to type or save." | `src/pages/site/home/OpenBook.tsx:433`, `home/ThreeSteps.tsx`, `HowItWorks.tsx:643`, `Reserve.tsx:976` | Say it once, plainly, on the home page, /how-it-works and /reserve (copy in fixes 1-3) |
| B3 | /samples (dev) | `http://localhost:5191/samples` shows "Page not found" because the dev router doesn't serve `public/samples/index.html`. The live astoryapp.com/samples returns 200. **I did not check the built `dist/` with `npm run preview`.** | `src/pages/site/Header.tsx:17-20`, `public/samples/index.html` | Check `dist/samples/index.html` in preview before deploy. Optionally add a dev middleware or a `/samples/` link so dev matches production |

## Ranked fix list (old -> new)

### Trust and honesty

1. **Home hero small print**, `src/pages/site/home/OpenBook.tsx` ~433 (and the same line in `Hero.tsx` if it's still rendered)
   - Old: "Start free with the family archive in your browser, no card. The calls ring on iPhone in our private beta."
   - New: "Start free in your browser tonight, no card. The calls are in a private beta on iPhone, with our app on their phone. A dollar holds your family a place in line."
2. **Home step I**, `src/pages/site/home/ThreeSteps.tsx`
   - Old: "Two minutes on their phone. Pick the hour A Story calls."
   - New: "Install A Story on their iPhone together, in person or over FaceTime. Two minutes, then pick the hour it calls."
   - Bao decides: is FaceTime or remote setup actually possible? If it isn't, use "Install A Story on their iPhone. It takes two minutes, then pick the hour it calls."
3. **/how-it-works lead**, `src/pages/site/HowItWorks.tsx:643`
   - Old: "...Calls ring on iPhone in our private beta. Writing, the family archive and the book work in your browser today."
   - New: "...For now the calls ring through the A Story app on iPhone, in a private beta. Writing, the family archive and the book work in any browser today."
4. **/how-it-works demo label**, `src/lib/demoScripts.ts:164`
   - Old: "Rosa, 84 - about a brother who lived four days" (shown over a quote about church and Father Dolan)
   - New: "Rosa, 84, about her mother and one winter". Alternatively, show the cover quote ("I'd tell her they moved the wall...") that the label belongs to.
   - Also mark the demo as a sample. Old lead: "Her grandson asked for her earliest memory of church." New: "A scripted sample: her grandson asked for her earliest memory of church."
5. **/how-it-works voice block**, `src/lib/joanArchive.ts` / `HowItWorks.tsx`. This is a feature in development, written as drama.
   - Old: "Forty-seven seconds, and the last eight are the ones her son has played most. She says "I'd had that wrong for fifty-one years as well", and then laughs - once, not happily - and that laugh is the whole marriage. It does not survive being typed out."
   - New: "Forty-seven seconds in her own voice. Her son plays the last eight most, where she says "I'd had that wrong for fifty-one years as well" and laughs once. Voice clips are in development. The card and transcript are kept from every call today."
6. **FAQ "What is A Story?"**, `src/pages/site/faqData.ts`. The answer promises voice highlights that the site elsewhere marks as in development.
   - Old: "Guided calls become readable memory cards, full transcripts, and voice highlights."
   - New: "Guided calls become memory cards to read and full transcripts. Voice clips are in development."
   - Do the same in "Is the summary the whole record?": "voice highlights are kept as audio" becomes "the call audio is kept".
7. **Free tier conversation, contradictory.** /pricing lists "One ten-minute conversation with A Story, to begin" on Free, but everywhere else the calls are iPhone beta only. Maria can't tell whether her dad can try it tonight. `src/lib/pricing.ts:174-194`.
   - Bao decides: if the first ten-minute conversation works in the browser, make it the hook. Home and pricing: "Try a ten-minute conversation free tonight, in your browser." If it is iPhone only, add "on iPhone" to the Free line.
8. **Surface three privacy promises outside /privacy.** They are strong and Maria never sees them. Add one quiet line near the home Witnesses section or the close, using /privacy's own words (`src/pages/site/home/Witnesses.tsx` or `home/Close.tsx`):
   - New: "Only your family sees it. We never sell it, and no AI is trained on it. Privacy policy ->"
9. **/samples headline**, `public/samples/index.html:983`
   - Old: "Turn the pages of a real A Story book." / "Three fictional families, printed exactly the way yours will be."
   - New: "Turn the pages of an A Story book." / "Three sample families, laid out the way yours will be."
   - "Printed" is premature because ordering opens soon.
10. **/our-story: who is behind it.** There are no faces, no city and no named contact on the page. Add small round portraits beside the signatures (DESIGN-TASTE allows round portraits, not posed heroes) and one closing line: "Write to Daniel at daniel@astoryapp.com. We answer every email ourselves." That second sentence is already on /questions. Bao decides whether to add the city: say "Ann Arbor, Michigan" only if it is true for the company.

### Cost and next step

11. **Home close headline**, `src/pages/site/home/Close.tsx`
    - Old: "Start free. Guided calls from $119 a year."
    - New: "Start free. Guided calls from $79."
    - Alternative: "Start free. Guided calls are $119 a year." "From $119" is false while Express is $79 once and Monthly is $19.99.
12. **Home close body**, `home/Close.tsx` ~149
    - Old: "Free is the family archive and writing, in your browser, with no card and no clock. The guided calls come with a plan, and they ring on iPhone in our private beta. A dollar today holds 15% off your first year, if you reserve by 2 November."
    - New: "Free is the family archive and writing, in your browser, with no card and no time limit. The calls come with a plan and run on iPhone, in a private beta. A dollar holds your place in line and 15% off your first year, if you reserve by 2 November."
13. **/pricing lead**, `src/pages/site/Pricing.tsx:842` and `src/lib/pricing.ts:181`
    - Old: "Every account starts on Free - No card and no clock. ... Inviting family, writing and reading are never charged by the person."
    - New: "Every account starts on Free, with no card and no time limit. ... Inviting family, writing and reading never cost extra, however many people join."
    - This fixes the stray capital "No" after the hyphen.
14. **/pricing "not sold yet" note**, `src/pages/site/kit/PriceLadder.tsx:317`
    - Old: "Plans are not sold on the web yet. The 25 founding places are taken. A reservation is still $1: a place in line, and 15% off the first year if you reserve by 2 November. The dollar comes off that year."
    - New: "Plans aren't on sale yet. All 25 founding places are taken. $1 still holds a place in line and 15% off your first year if you reserve by 2 November, and the dollar comes off that year."
    - Bao decides: add the launch month if one exists ("Calls open to families in line from [month]"). With no date, Maria can't judge the dollar.
15. **/pricing length.** 12.8 screens on a phone and 7.7 at 1366. The ladder (Archive / Calls / Book) and then the plan cards say the same prices twice, and the book list appears twice (ladder, then "Six ways to hold the book"). Cut the ladder's plan and book lists down to one line each that points to the cards below. `src/pages/site/kit/PriceLadder.tsx`.
16. **/reserve: what happens next.** Add one line under the card (`src/pages/site/Reserve.tsx` ~976):
    - New: "When it's your turn, we email you. Your parent installs A Story on their iPhone, you pick the hour, and the first call rings."
17. **/pricing jargon "listening codes"**, `src/lib/pricing.ts`. It is never explained.
    - Old: "Every memory, every photograph, the listening codes"
    - New: "Every memory and photograph, with a code beside each story that plays it on a phone"
    - Hide it while voice is in development.

### Voice (humanizer and WRITING-VOICE.md)

18. **/reserve label**, `Reserve.tsx`. Old: "THE EASY YES · ENDS 2 NOVEMBER". New: "RESERVE · ENDS 2 NOVEMBER".
19. **/reserve section head**, `Reserve.tsx:1017/1068` (staged aphorism)
    - Old: "The smallest thing that means something." / "To you, because it holds a price. To us, because it tells us who to open to first."
    - New: "Why a dollar." / "It holds your price, and it tells us which families to open the calls to first."
20. **/reserve point, inflated promise**, `src/lib/founding.ts`
    - Old: "It holds a price we will not offer again"
    - New: "15% off, until 2 November"
21. **/reserve point, not-X-but-Y**, `src/lib/founding.ts`
    - Old: "None of it is a fee" / "Whatever you pay today comes off your first year. It is a head start on the plan, not a charge on top of it."
    - New: "It comes off your plan" / "Whatever you pay today comes off your first year."
22. **/reserve point**, `src/lib/founding.ts`. Old: "It is how we know you mean it". New: "It sets the order". Keep the body.
23. **/reserve bullet**, `founding.ts` / `Reserve.tsx`. Old: "Up to 2 places per family - one for each parent". New: "Up to 2 places per family, so Mom and Dad can each have their own".
24. **/reserve closer**, `Reserve.tsx`
    - Old: "The question nobody has asked yet." / "A dollar puts you in line to have it asked, at 15% off if you reserve by 2 November. Either way, if the timing turns out wrong, the money comes back."
    - New: "The questions you keep meaning to ask." / "A dollar puts you in line, with 15% off if you reserve by 2 November. If the timing turns out wrong, we refund it."
25. **FAQ free trial**, `faqData.ts` (not-X-but-Y and sales tone)
    - Old: "No - there is something better: a Free tier that never runs out."
    - New: "No. Free never runs out."
    - The same tell appears in `pricing.ts:188`: "Not a trial that runs out." Cut that sentence.
26. **/how-it-works triplet**, `HowItWorks.tsx`
    - Old: "The people who know her stories tell their part, the one who writes gets help, and whoever typed it up years ago doesn't type it twice."
    - New: "Everyone who knows her stories can add their part, and a memoir someone typed years ago comes in as it is."
27. **/how-it-works clipped tail**, `HowItWorks.tsx`
    - Old: "Their photos and versions sit beside the original - nothing replaces anything."
    - New: "Their photos and versions sit beside the original, which stays as it was."
28. **/how-it-works intro**, `HowItWorks.tsx`
    - Old: "Five moments. You're in one." / "From the first two minutes to the family adding what they remember - follow it on the phone."
    - New: "Five moments, and you're in the first." / "Follow one family from the two-minute setup to everyone adding what they remember."
29. **/pricing "Stop paying" list**, `src/lib/pricing.ts` (triplet slogan)
    - Old: "Keep writing new chapters for as long as you live - unlimited, free, always"
    - New: "Keep writing new chapters free, for as long as you like"
30. **/pricing Family plan note**, `pricing.ts`
    - Old: "Pooled, so a quiet storyteller never wastes anyone else's minutes"
    - New: "Pooled, so minutes one storyteller doesn't use go to the others"
31. **/pricing books**, `pricing.ts`. Old: "Every page of it - there is no page limit." New: "No page limit."
32. **Home hero headline**, `home/OpenBook.tsx` / `Hero.tsx`. In the US, "undocumented" reads first as immigration status.
    - Old: "Most of a life goes undocumented."
    - New: "Most of a life never gets written down."
    - Bao's call. Keep the italic accent on "written down".
33. **/our-story, Bao's pull quote**, `src/pages/site/OurStory.tsx`. Flagged, not fixed, because it is Bao's own approved line.
    - "A family is not a résumé. A life shouldn't become one when we preserve it." This is an aphorism with a not-X turn (humanizer §1, §3). The note already ends well on "My parents should just be able to talk." Recommendation: cut the pull quote. Daniel's "what follows is not a story about dying" is his own words and stays unless he agrees otherwise.

### Path and consistency

34. **Sign-up page message mismatch** (web-app repo, outside this site). The site sells calls. The live create-account page says "One small question a day, answered in their own words, and the family's book grows page by page." Match the site: "A Story calls the people you love and keeps what they tell. Start free, no card."
35. **/samples chrome.** It uses a different header (inline nav, a different logo colour, no "Menu" on the phone) and has no footer or Reserve door. Use the site header and footer, or at least the footer. `public/samples/index.html`.
36. **/samples touch hint**, `public/samples/index.html`. On a phone it says "Click a page or use ← → to turn." Show "Tap a page to turn it." on touch devices.
37. **Too many sample names.** Maria meets Ruth, Walt, Sarah, Lily, Ben, Rosa, Errol, Joan, Rose, Carolyn, Raymond and Thomas, plus a second Ruth (the baker) inside the Carolyn book. Keep Ruth and Walt as the one sample family on home and /how-it-works where possible, and label the Rosa, Errol and Joan demos "sample call".
38. **AI-generated photos are disclosed only in a footer `<details>`** ("Photographs are AI-generated illustrations"). That is honest, but the archival-looking prints carry "Ruth, the summer of '58". The desktop hero already says "from a sample family's book". Add the same five words under the phone hero's print strip so the disclosure is visible where the pictures are.

## What works (keep)

- "A Story is an AI biographer that calls your parents and grandparents, asks about their lives, and keeps what they tell in a private book the whole family can add to." This is the clearest sentence on the site.
- "The Tuesday dinners, the drive home and what Grandpa said at the workbench slip away, unless someone asks." It's warm and concrete.
- Ruth's porch quote, and "Lightly tidied: the ums and false starts come out, and every word she chose stays."
- The lake-monster witnesses: four voices and a paddle. "Nothing appears in Walt's story until he says yes."
- "Stop paying, and it is still yours." It answers the fear Maria has without being asked.
- The /privacy short version is the most trust-building copy on the site (fix 8 brings it forward).
- No em dashes anywhere. En dashes appear only in year ranges. None of the banned words appear in the rendered text of the seven pages checked.

## Not verified

- 1920x1000 and 2560x1300 (my brief was phone plus laptop).
- I did not play the call demos, so the Rosa label may make sense once playback starts.
- The built `dist/` in preview, including whether /samples resolves (B3).
- The live sign-up flow beyond its first screen. I submitted no forms and never opened Stripe.
- Whether the free ten-minute conversation works in a browser (fix 7).
