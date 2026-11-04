# Panel scores, round 3 (simulated users, same rubric)

Same 5 personas and same 1-10 rubric as `docs/premium/panel.md`. Every round-3 panel scored a local `dist` build of `site-premium`; nothing was deployed.

- **Baseline** = live astoryapp.com (origin/main cc87bfe), 2026-11-02: **6.08**.
- **Round 2** = site-premium @ a2f5338: **6.58** (from `panel.md`).
- **r3-0** = after the four round-3 builders merged (96fc9fd). Screenshots: `qa/premium-2026-11/panel-r3-0/`.
- **r3-1** = after fix 1 (75c184f). Screenshots: `qa/premium-2026-11/panel-r3-1/`. Three of the five panelists said they scored a dist that might predate fix 1 (Maya, Harold, Tuan noted "did not rebuild").
- **r3-2** = after fix 2 (ec22f9c, dist rebuilt at that commit per the fix-2 builder report). Screenshots: `qa/premium-2026-11/panel-r3-2/`.

Target (plan AC1): every persona at 9 or more on every criterion. **Not met.** 3 of 35 cells reach 9 in r3-2 (Harold warmth 9, Harold trust 9, Tuan navigation 9). Lowest cell: Priya desire 5.

## Per persona (average of 7 criteria)

| Persona | Baseline | Round 2 | r3-0 | r3-1 | r3-2 | r3-2 vs round 2 |
|---|---|---|---|---|---|---|
| Maya (gift buyer, phone) | 6.00 | 6.30 | 7.29 | 7.43 | 7.43 | +1.13 |
| Harold (storyteller, 79, iPad 150 %) | 6.14 | 7.14 | 7.57 | 7.43 | 8.14 | +1.00 |
| Tuan (invited sibling, laptop) | 6.14 | 6.90 | 7.79 | 8.07 | 8.14 | +1.24 |
| Denise (memory-care director) | 6.00 | 6.14 | 7.43 | 7.29 | 7.14 | +1.00 |
| Priya (library oral-history lead) | 6.10 | 6.40 | 7.29 | 7.00 | 6.71 | +0.31 |
| **Average** | **6.08** | **6.58** | **7.47** | **7.44** | **7.51** | **+0.93** |
| Lowest single score | | | 6 | 6 | 5 | |

## Per criterion (average of 5, and the lowest score)

| Criterion | Baseline | Round 2 | r3-0 avg / min | r3-1 avg / min | r3-2 avg / min |
|---|---|---|---|---|---|
| premium | 6.8 | 7.0 | 7.80 / 7.5 | 7.80 / 7 | 7.70 / 7 |
| warmth | 7.8 | 7.8 | 8.10 / 8 | 8.00 / 8 | 8.20 / 8 |
| clarity | 5.2 | 6.2 | 7.70 / 7 | 7.50 / 7 | 7.50 / 7 |
| trust | 6.0 | 6.2 | 6.90 / 6 | 6.90 / 6 | 7.10 / 6 |
| navigation | 5.4 | 6.6 | 7.60 / 6.5 | 7.90 / 7 | 8.00 / 7 |
| mobile | 6.8 | 6.8 | 7.60 / 7 | 7.60 / 7 | 7.60 / 7 |
| desire | 4.6 | 5.4 | 6.60 / 6 | 6.40 / 6 | 6.50 / 5 |

## Every score, per round

Order: premium / warmth / clarity / trust / navigation / mobile / desire.

| Persona | r3-0 | r3-1 | r3-2 |
|---|---|---|---|
| Maya | 7.5 / 8.5 / 7.5 / 7 / 6.5 / 7.5 / 6.5 | 8 / 8 / 7 / 7 / 8 / 8 / 6 | 7.5 / 8 / 7.5 / 6.5 / 8 / 8 / 6.5 |
| Harold | 8 / 8 / 8 / 8 / 7 / 8 / 6 | 8 / 8 / 7 / 8 / 7 / 8 / 6 | 8 / **9** / 8 / **9** / 8 / 8 / 7 |
| Tuan | 7.5 / 8 / 8 / 7.5 / 8.5 / 7.5 / 7.5 | 8 / 8 / 8.5 / 7.5 / 8.5 / 8 / 8 | 8 / 8 / 8 / 8 / **9** / 8 / 8 |
| Denise | 8 / 8 / 8 / 6 / 8 / 7 / 7 | 8 / 8 / 8 / 6 / 8 / 7 / 6 | 8 / 8 / 7 / 6 / 8 / 7 / 6 |
| Priya | 8 / 8 / 7 / 6 / 8 / 8 / 6 | 7 / 8 / 7 / 6 / 8 / 7 / 6 | 7 / 8 / 7 / 6 / 7 / 7 / 5 |

**Reading the trend.** The storyteller and the invited relative (Harold, Tuan) moved up each round, because their frictions were layout and wording the site could fix. Maya rose once and then held at 7.43, because her remaining frictions are a gift she can wrap and a sign-up page that knows it is a gift; the first needs Daniel and the second lives in the app. Denise and Priya drifted down a little across the round-3 panels. Each fix made the open questions more visible ("Bring these to the demo: HIPAA and a BAA, export formats, consent ..., and price"), and every one of those answers is a fact the site does not have. Simulated panelists also vary by about ±0.3 between runs, so changes smaller than that are noise.

## Final round (r3-2): what each persona still names

### Maya 7.43 (trust 6.5, desire 6.5)
- The sign-up step still says "Create your account / This book belongs to: Your name". `index.html:80` sends `/sign-up?for=someone` to the app's create-account page before the site paints, so only the app can fix this.
- "Give it as a gift" lands on an honest 3-step "Giving it today" card, but there is nothing to wrap or hand over.
- /pricing on a phone still holds many numbers ($79, $119, $229, $19.99, $1, $39 to $499, 140/90/200 minutes). Express shows $79 next to "The calls aren't on sale yet".
- "Only your family hears the recordings. Not even us." (`lib/hears.ts:21`, from `privacy.tsx:97`) sits near "Nobody at A Story reads or listens… unless you ask us to help, or someone reports something" (`privacy.tsx:108-110`). A careful reader sees the short line as overstated.
- No real family, review or tester voice anywhere.
- /reserve repeats itself on a phone ("Reserve" / "Reserve", four reasons that say two things).
- The "No" iPhone answer turns the gift into writing for Dad.
- The menu is long, and "Asked to tell your story?" and "Invited to a family's book" sit side by side.

### Harold 8.14 (desire 7)
- His part of /join ("Being asked to tell your story?") starts more than one screen down at 150 % text; only a small link leads to it.
- "can only ring an iPhone" leaves an iPad reader unsure (blocked: devices).
- "Invited?" in the header goes to the relative's door, not his.
- The footer still lists "Your own story", and /your-story opens on young adults.
- The privacy promises read as a checklist next to one dense paragraph.
- The sample card meta mixes sans and serif, and wraps badly at 150 %.
- The menu at 150 % is long and has a thin Start button.

### Tuan 8.14 (premium, warmth, clarity, trust, mobile, desire 8)
- The /join first screen speaks to two other audiences ("Got a link?...", "Asked to tell your story?") before it says what he is invited to do.
- Code-vs-link is stated three times in one screen.
- The help paragraph under the button is the densest text on the page; three short items would read better.
- He doesn't see what happens after "Open the invitation".
- At 390 the sample card sits below the first screen.
- Card labels and links are sans next to serif body text.
- The lower half of /join is unbalanced at 1440: a short left column beside 8 bullets.

### Denise 7.14 (trust 6, desire 6)
- The hero ends on "Bring these to the demo: HIPAA and a BAA, export formats, consent ..., and price". To her it reads as homework and an admission.
- The "Know the person" app screen shows a memory card with a **Public** badge. That badge is in the `memory.webp` screenshot, visible above 640 px.
- No proof from any community.
- The memory-care and HIPAA answers on /questions still point to the demo.
- Equipment for residents without an iPhone is not stated.
- /care-communities is about 6,700 px long on a phone.
- No calendar booking and no phone number.
- /pricing reads as consumer-only and "not on sale yet".

### Priya 6.71 (desire 5, trust 6)
- The "Bring these to the demo" agenda appears in the hero and mid-page.
- Nothing on archival practice: deed of gift, release, Dublin Core/OHMS metadata, IRB, accessibility statement.
- The film is a family story, with no program view.
- /care-communities and /organizations repeat sections.
- /programs is titled "Startup programs and grants", which she read as programs for institutions.
- The header changes between page groups, and the dropdown accessibility text runs labels together ("For familiesGiving it...").
- /compare is a family table.
- The /questions accordion closes one answer when the next opens.

## Blocked on Daniel: every question the panels asked, deduplicated

"Plan" means the recommended answer in `docs/plans/2026-11-03-premium-round-3.md` ("Claims that need a source"). The plan only has recommendations for its items 1-3. For every other question, "Chief" gives the chief's suggestion, which is an assumption for Daniel to accept or change. Nothing below is stated on the site.

| # | Question (who asked) | Recommended answer |
|---|---|---|
| 1 | **Devices.** Does the app install, and do calls ring, on an iPad? On Android? (all five) | **Plan item 1:** if the iPad works, say "iPhone or iPad" everywhere the iPhone caveat appears (/join, #being-asked, /for-families yes/no, /questions, care and org "What you need"). The only source today is "Before launch, A Story can only ring an iPhone" (`faqData.ts:48`). |
| 2 | **No-iPhone storyteller.** If the storyteller has no iPhone, can a relative's or staff member's iPhone take the call for them, or a landline? Can one shared program iPhone or iPad serve several residents or narrators, and how many per floor or cohort? (Maya, Harold, Denise, Priya) | **Plan item 3** covers the equipment part: state plainly on /care-communities, /organizations and /questions as soon as it is true. For families, Chief: if a relative's iPhone may take the call, say so in the "No" answer, so the gift doesn't turn into writing. |
| 3 | **Gift.** May the $1 reservation (or Express) be made in the recipient's name, with a printable or emailable gift note? (Maya, all three rounds) | **Plan item 2:** yes. It is the only honest thing a gift buyer can wrap today. This is the biggest single lever on Maya's desire score. |
| 4 | **Organizations price.** A starting price, or a per-resident, per-narrator or per-program range, so a buyer can write a budget request before a demo. (Denise, Priya) | **Plan item 3:** state it on /care-communities, /organizations and /questions#organizations as soon as it is true. It replaces "quoted on the demo". |
| 5 | **Export formats and metadata.** Audio (WAV/MP3/M4A, sample rate), transcripts (TXT/DOCX/VTT/PDF/OHMS XML), photos; per-item metadata (narrator, date, interviewer, consent record) as CSV/JSON? (Denise, Priya) | **Plan item 3:** name them on /organizations and in "Can we export it?" as soon as they are true. Today the only source is "open formats: audio, transcripts and photographs". |
| 6 | **HIPAA / BAA / research use.** Will A Story sign a BAA? May recordings be used in IRB-approved research? (Denise, Priya) | Chief: if the answer is no, publish the plain no ("A Story does not sign BAAs today and is not for clinical records"). A clear no scores better than "bring it to the demo". Where the data is stored is **already answered** on the site: United States (`privacy.tsx:526-527`, section 13), stated since fix 2. |
| 7 | **Proxy consent.** Can a legal decision-maker (POA, guardian) consent for a resident who cannot decide alone, and how is it recorded? (Denise, Priya) | Chief: the app code has no decision-maker model (B3 grep: no hits for decision-maker, guardian, power of attorney or "on behalf of"). Until it does, the site says only the storyteller consents. Daniel decides whether to build it, or to say on the site that it is out of scope. |
| 8 | **Proof.** Any real beta family or tester quote with written consent, a count of TestFlight families, or a care or library pilot (even unnamed) that may be named or quoted? If none, may the site say "we are looking for our first care-community and library partners"? (all five) | Chief: no count. The source is "1-20 testers", too small to state. Ask 2-3 testers for a consented one-line quote. Publish the "looking for our first partners" line on /organizations and /care-communities now, because it is true and needs no number. |
| 9 | **Launch window.** Any honest window (even "early 2027") for when the calls open? (Maya) | Chief: state one only if Daniel will hold to it. Otherwise the line stays "we email you when the calls open". |
| 10 | **Express.** Can Express be bought before launch, or only held with $1? What happens to unused minutes after 30 days? (Maya) | Chief: the card now says "The calls aren't on sale yet: $1 holds your place" (fix 2). The unused-minutes rule needs Daniel. Say it in the positive (what stays: the archive and the book), never as an expiry. |
| 11 | **Sign-up handoff (app repo).** Should app.astoryapp.com/create-account read `?for=someone` and say "You're setting this up for someone you love"? (Maya, every round) | Chief: yes. The site already passes `?for=someone` on every /for-families Start. This is the one Maya friction no site change can fix (`index.html:80` redirects before paint). |
| 12 | **Privacy short line.** May "Only your family hears the recordings. Not even us." become "Only your family hears the recordings. Nobody at A Story listens unless you ask us to help."? (Maya r3-2) | Chief: yes. Both halves are already in the privacy summary (`privacy.tsx:97` and `:108-110`), so the change is wording, not a new fact. It needs Daniel because `privacy.tsx:97` is the policy's own summary line. |
| 13 | **Call length.** How long is a typical call? May the site say "about N minutes, and you can stop anytime"? (Harold, Tuan) | Chief: "you can stop at any time" is sourced and on the site; the duration needs Daniel. |
| 14 | **Contributor (invited relative).** How long an addition takes; whether relatives get reminders; voice recordings or only writing and photos; who sees an addition once approved; whether name or email is shown; edit or delete own addition; notification when the storyteller says yes; whether an invite link greets with the inviter's name; what a relative must give (name only?); whether the organizer can turn a link off. (Tuan) | Chief: each of these is app behaviour. Daniel (or Thành) confirms it from the app code, then /join gets one line per confirmed yes. Voice clips are "still in development" (`AppDoor.tsx:334-337`), so not yet. Any link-off rule is stated only in the positive. |
| 15 | **A face for "Daniel answers himself".** May /join and #being-asked show Daniel's photo (from /our-story, if licensed), or a real consented storyteller photo or voice? (Harold) | Chief: yes for Daniel's photo if the /our-story asset is cleared. No real storyteller until consent is in writing. |
| 16 | **Phone number, postal address or calendar link** next to contact@astoryapp.com. (Harold, Denise) | Chief: none exists in the code. If Daniel wants one public, a calendar link for demos is the safer first step. |
| 17 | **Releases and rights.** A release or deed-of-gift template; an exportable consent record per narrator; who holds copyright when the storyteller owns it but an institution archives it; whether an institution keeps an archive after a narrator deletes; a staff or admin role. (Priya) | Chief: none of this is in the app today. Say on /organizations only "the storyteller owns it" (sourced) until Daniel decides. |
| 18 | **Custom question sets** for an institution beyond the 547-question bank. (Priya) | Chief: needs Daniel and the app. Not stated. |
| 19 | **Accessibility statement / WCAG target** for site and app; captions or transcripts for d/Deaf narrators. (Priya) | Chief: publishing a WCAG 2.2 AA target for the site is low-risk if Daniel commits to it. The film already has English captions (film-check). |
| 20 | **Program-view film** (cohort, consent step, staff archive view) from real app screens. (Priya) | Chief: a round-4 candidate if the app has the screens. Not before Daniel approves. |
