# Audit: astoryapp.com as it is live (baseline, 2 Nov 2026)

Researcher, own site. Task 1 of `docs/plans/2026-11-02-premium-site-and-webapp.md`.

**How this was measured.** Playwright (Chromium, `reducedMotion: reduce`) went to the **live** https://astoryapp.com at 390×844 (mobile, touch) and 1440×900. It covered every route in `scripts/site-routes.mjs`: 16 pages, `/samples` (staticPages), 7 guides and 7 privateRoutes, using their `visit` addresses. That is 31 routes × 2 widths = 62 full-page shots, plus 12 nav/state shots. Each page was scrolled once so lazy content loaded, then captured. The DOM was read for title, headings, word count, height, overflow, CTAs, console errors and failed requests. The nav was read from the live DOM with the More menu and the drawer both open.

- Screenshots: `qa/premium-2026-11/before/<slug>-<390|1440>.png`. The slug is the path with `/` → `_`, and `home` for `/`. Nav shots: `nav-more-1440.png`, `nav-drawer-390.png`, `nav-drawer-390-scrolled.png`, `nav-closed-390.png`, `nav-sticky-390.png`, `nav-footer-1440.png`, `nav-bar-{1024,1180,1280}.png`, `nav-samples-1440.png`. Extra states: `l-bare-390.png`, `not-found-390.png`.
- "Screens" = page height ÷ viewport height (844 or 900).
- Home (`/`) was captured for the record only. It is out of scope.
- Live type check: headings use **Cormorant Garamond**, body uses **EB Garamond**, and the interface uses **Montserrat**. Seven weights load. `design.md` still says Source Serif 4 + Figtree, so **design.md is out of date about the live type** and should be fixed before the design lead writes the spec.
- No console errors and no 4xx responses on any public page. The only failures are the `/l` cases below. No page has horizontal page scroll (documentElement width = viewport everywhere), except the off-site `/l` landing.
- **No page has a video** (`<video>` count 0 on all 31 routes).

---

## 1. Navigation map (live DOM)

### 1a. Top bar, ≥ 1180 px

| Slot | Items | Count |
|---|---|---|
| Logo | A Story → `/` | 1 |
| Text links | How it works · Sample books · For families · Pricing · Our story | 5 |
| Menu trigger | More ▾ | 1 |
| Right | Sign in (→ app.astoryapp.com/sign-in) · **Start free** (→ app.astoryapp.com/create-account) | 2 |
| **Total choices in view** | | **8, plus 9 more behind More = 17** |

- On `/organizations` and `/care-communities` the primary button becomes **Book a demo** (→ `#book`). That is the only page-aware behaviour.
- At **1024 px the full bar is replaced by the "Menu" drawer** (`nav-bar-1024.png`). An iPad in landscape or a small laptop gets the phone menu. At 1180 and 1280 the full bar fits.

### 1b. More ▾ panel (1440)

| Group | Items |
|---|---|
| Explore | How A Story is different (/compare) · Questions & answers · Conversation guides · Privacy |
| Also for | Institutions (/organizations) · Care communities · Your own story · Get in touch (/contact) |
| Feature card | Our story — "Why two founders started asking." |
| **Total** | **9 links, each with a one-line description** |

- **Duplicate:** Our story is in the bar *and* is the large feature card in More.
- More mixes four kinds of thing: proof (Compare), help (Q&A, Guides), legal (Privacy), audiences (Institutions, Care, Your own story) and contact. The visitor has to read all of it to find anything.
- Two audiences sit side by side as equals here, **Institutions** and **Care communities**. Together with For families and Your own story, that makes **four audience entries spread across two places** (bar + More).

### 1c. Mobile drawer (390)

- Closed bar: logo + "Menu".
- Open drawer, one flat screen (exactly 844 px tall, no inner scroll):
  - 5 large serif links (How it works, Sample books, For families, Pricing, Our story)
  - two small columns: **Explore** (4) and **Also for** (4)
  - Sign in
  - Start free
- **15 links in total.** Two levels of type size, no duplicates inside the drawer.
- Awkward:
  - The Explore column's labels wrap ("How A Story is / different", "Questions & / answers", "Conversation / guides"). The left column then reads as one dense block, while the right column is evenly spaced (`nav-drawer-390.png`). Tap areas measure 44 px, so this is a visual problem, not an a11y failure.
  - "Sign in" is set at headline size, as large as the product links. Start free sits at the very bottom.
- Phone sticky bar (`nav-sticky-390.png`): "Start free" fixed at the bottom (77 px tall) once the hero scrolls away. Together with the fixed header (~64 px), about 17 % of the 844 px window is chrome.

### 1d. Footer

| Viewport | Structure |
|---|---|
| 1440 | Brand block (logo, one line, daniel@astoryapp.com) + 4 columns: **The product** (How it works, Sample books, Pricing, Reserve for $1, Compare) · **Who it's for** (Families, Institutions, Care communities, Your own story) · **Help** (Conversation guides, Questions & answers, Contact, Write to us) · **Company** (Our story, Programs & grants, Privacy, Terms) · then a "Startup programs & grants" band of 5 badges · legal line with "About the examples" |
| 390 | Brand block + **two accordions** ("Explore A Story", "Help and company"), both collapsed · badge card · legal |

- **22 link targets** at 1440: 19 text links, 2 mailto links and the badge card → /programs.
- **Duplicates and synonyms:**
  - mailto appears twice: the address and "Write to us".
  - /programs appears twice: the text link and the badge card.
  - One intent has **three names**: Contact / Write to us / Get in touch (More).
  - One page has **three names**: Institutions (nav, footer) / Organizations (URL, H1 area) / "A Story for institutions" (title).
  - Families (footer) vs For families (bar). Compare (footer) vs How A Story is different (More).
- "Reserve for $1" lives in the footer's product column as a standing product. See the expiry issue below.
- Mobile badge card: the "What each one is →" label wraps to two lines beside the logos and looks broken on every page at 390.

### 1e. Repeated page-end blocks (inside pages, but they act as nav)

- **"Everyone starts free." band**: identical on 10 pages (how-it-works, for-families, compare, your-story, programs, questions, guides, and others).
- **"Where to next"**: the **same three cards on every page that has it** (How it works · Sample books · For families). It **links to the page you are on** on `/how-it-works` and `/for-families`. A dog illustration peeks over it on desktop How it works (`how-it-works-1440.png`).
- Net effect at 390: every page ends with about 2.5 screens of the same closing material (Everyone starts free → Where to next → footer → badges → legal).

### 1f. Nav load, summarised

| Surface | Choices |
|---|---|
| Desktop bar visible | 8 |
| Desktop bar + More | 17 |
| Mobile drawer | 15 |
| Footer | 22 |
| Distinct destinations across header + footer | 18 pages + email |

Against plan AC 1 (≤ 5 text links + Sign in + one button; drawer ≤ 2 levels, no duplicates):
- The bar already has 5 text links, **but More pushes the real load to 14 + 2**.
- The drawer passes "≤ 2 levels" and has no internal duplicates.
- **Our story is duplicated** between bar and More.

---

## 2. Page by page

The table covers the live route list. Mobile is the reading most visitors get, so it is judged first.

| Route | Lands on | Screens 390 / 1440 | Words | CTAs in main (1440) |
|---|---|---|---|---|
| / (out of scope) | / | 11.6 / 9.2 | 998 | 19 |
| /how-it-works | same | 9.1 / 5.9 | 718 | 8 |
| /for-families | same | 7.6 / 4.3 | 361 | 7 |
| /care-communities | same | 7.9 / 4.9 | 472 | 4 |
| /organizations | same | **12.9** / 7.6 | 914 | **15** |
| /pricing | same | **11.2** / 6.2 | 785 | 6 |
| /compare | same | 5.7 / 4.2 | 401 | 1 |
| /your-story | same | 6.5 / 4.1 | 346 | 4 |
| /our-story | same | 6.1 / 4.0 | 439 | 9 |
| /programs | same | 4.0 / 2.7 | 158 | 6 |
| /questions | same | 5.7 / 4.5 | 235 | 7 |
| /reserve | same | 4.3 / 3.3 | 297 | 3 |
| /guides | same | 6.3 / 4.5 | 503 | 1 |
| /contact | same | 4.3 / 2.7 | 145 | 5 |
| /privacy | /privacy (no slash) | 19.5 / 13.2 | 3,447 | 20 |
| /terms | /terms (no slash) | 18.0 / 12.8 | 2,904 | 29 |
| /samples | same (static page) | 3.2 / 2.4 | (book text in DOM) | 8 |
| /guides/* (7) | same | 5.6–6.0 / 4.1–4.2 | 473–516 | 3–6 |
| /start | **app.astoryapp.com/create-account** | 2 / 1 | 20 | 2 |
| /sign-in?next=/reserve | same | 2.5 / 1.8 | 64 | 4 |
| /sign-up?next=/reserve | same | 3.2 / 2.0 | 132 | 5 |
| /account | **app.astoryapp.com/welcome** | 2 / 1 | 88 | 3 |
| /join | **app.astoryapp.com/welcome** | 2 / 1 | 88 | 3 |
| /thanks | same | 2.7 / 2.0 | 120 | 2 |
| /l?m=…&k=… | **naxvjujewggrwflkvvzc.supabase.co/functions/v1/listen** (404) | — | 4 | 0 |

### /how-it-works

- **Job:** turn "what is this?" into "I see how it works and it's easy for my parent". **For:** the adult child, first visit.
- **Works:**
  - "A Story does the asking." is a strong, warm H1.
  - "Four moments. You're in the first." (You / Them / A Story / Everyone) is the clearest explanation on the site.
  - The real memory card + transcript (Joan) is honest proof, labelled as a sample.
  - The teal "Good listening changes the next question" scene with Rosa/Errol/Joan is the site's most distinctive moment.
- **Weak:**
  - The 1440 hero's right card is small and sparse: one quote on a big empty field. The hero carries no picture of a person and **no video**, which is exactly where the plan proposes it.
  - The hero paragraph spends a third of its length on stage disclaimers ("For now the calls ring through the A Story app on iPhone, in a private beta. Writing, the family archive and the book work in any browser today."). That is honest, but it reads as a notice in the most valuable spot.
  - 9.1 screens on a phone.
  - The page ends with Where to next linking back to How it works itself.
  - The dog illustration over Where to next is the only mascot on the marketing site. It is off-tone with the editorial genre.

### /for-families

- **Job:** the emotional case for giving it to a parent or family. **For:** adult children and gift buyers.
- **Works:**
  - "The stories between you." is a good H1.
  - The "Why a family begins" cards each pair a real-feeling photo, a voiced quote and one link.
  - It is short (361 words).
- **Weak:**
  - The "The gift of a good question" occasions carousel bleeds off both edges at 390, with no left gutter on the first card and no scroll affordance (`for-families-390.png`).
  - **"SOMEONE WHO HAS ALREADY GONE"** is a section eyebrow framed around loss. It conflicts with the "never frame around an ending" rule.
  - It is unclear why this page exists separately from How it works, given it is also in the bar. The plan proposes taking it off the bar.
  - Where to next links to For families itself.

### /care-communities

- **Job:** get a care director to book a demo. **For:** life-enrichment directors and administrators.
- **Works:**
  - "Every resident has a life worth knowing." is warm and on-mission.
  - The night band "One circle around each resident" (resident / family / team) explains roles clearly.
  - It is explicit that it is not clinical.
  - The form is honest ("No payment, and no mailing list").
- **Weak:**
  - The hero is a boxed card on a night ground with the photo stacked below on mobile, so the first screen is all text.
  - There is no proof a director would look for: no sample program outline, no example output, no video.
  - The demo form is long (about 10 fields/chip groups).
  - The date chips (Thu Nov 5 … Mon Nov 16) are computed at runtime in `DemoBooking.tsx` ("the next eight weekdays"), so they do not go stale.
  - It duplicates the /organizations form almost exactly.

### /organizations

- **Job:** get schools, libraries, companies and faith/community groups to book a demo or propose a collaboration. **For:** institutional buyers.
- **Works:**
  - "The people who made the place." is a good H1.
  - The 6 segment cards each give one concrete example.
  - "From a demo to an archive" and "You decide. They agree." answer the consent question well.
- **Weak:**
  - **The longest page on the site: 12.9 phone screens, 914 words, 15 CTAs.** "Book a demo" appears 7+ times.
  - **There are two full forms on one page** (demo + "Propose a collaboration"). The second form plus "Another idea? Build it with us." makes the page feel unfinished, as if it were still deciding what it sells.
  - The senior-living card duplicates /care-communities.
  - The title says "institutions", the nav says Institutions, the URL says organizations.

### /pricing

- **Job:** make the price feel fair and the choice easy. **For:** the family buyer about to commit.
- **Works:**
  - "Free to start. Pay for calls." is a clear promise.
  - The three-part ladder (Archive $0 / Calls from $19.99 / Book Free) is a good first read.
  - Plan cards are well-structured. Book editions show real photography.
- **Weak, in priority order:**
  1. **Expiry framing that ends today:** "Plans aren't on sale yet. $1 holds your place in line, and 15% off your first year if you reserve by 2 November." The sticky bar says "Or reserve for $1, 15% off". From 3 Nov this is false. It breaks the no-expiry rule. **The source value is needed from Daniel before any replacement copy** (plan already flags this).
  2. **Contradictory buying state.** Plans carry prices and a RECOMMENDED tag, yet the page says "Plans aren't on sale yet", "Plans open at launch" and "Ordering opens soon". A buyer cannot tell what can be bought today.
  3. **Number overload.** About 16 distinct figures on one page: $0, $19.99, $119, $9.92, $229, $19.08, $79, $69, $19, $39, $29, $49, $149, $119, $499, $1, 547 and 15 %. The book-editions grid alone has 6 cards with prices.
  4. **Loss and ending framing:**
     - "Stop paying, and it is still yours." (heading)
     - "Name a trusted person, who receives what you wrote if you can't."
     - "Write a letter to one person, delivered on the date you choose."
     These pull the page toward death and expiry, which the rules forbid.
  5. The compare table (collapsed by default, good) is 880 px wide inside a 390 screen. When opened it scrolls sideways.
  6. 11.2 phone screens.
- **Claims to source:** every price → `src/lib/pricing.ts`. "547 questions" needs a source (not in the plan's claims table). "Ships in 7–10 days / 2–3 weeks / 6–8 weeks" also needs one.

### /compare

- **Job:** answer "why not Storyworth / a memoir service?" **For:** the comparison shopper.
- **Works:**
  - "The whole family's story." gives a clear position.
  - "Four reasons to choose A Story" is crisp.
  - The table is honestly dated ("From each company's public pages, September 2026").
- **Weak:**
  - **At 390 the table's competitor columns are off-screen.** The first view shows a feature list with an empty header row and no visible "us vs them". The table is 1,080 px inside a 390 viewport, and there is no hint that it scrolls (`compare-390.png`).
  - "Keeps growing after the book - the book isn't the end" leans on the word "end".
  - Only 1 CTA in main.

### /your-story

- **Job:** widen the audience to younger people recording their own life. **For:** 20–40-year-olds.
- **Works:**
  - "You don't have to be old to have a story." is the most on-mission page (movement 2).
  - The real-looking photos of young adults and the teal "Future you" scene are good.
- **Weak:**
  - "The friends you'll miss later." is loss framing again.
  - It is hidden in More / footer, so few visitors will find it.

### /our-story

- **Job:** trust: who is behind this, and why. **For:** every doubting buyer, institutions especially.
- **Works:**
  - Two signed founder letters with photos and credentials.
  - "Why now." has **cited** stats (AARP 18 %→30 %; Alliance for Lifetime Income 11,200/day).
  - "A family archive is never finished." gives a good close.
- **Weak:**
  - Daniel's letter opens with uncles' strokes. It explicitly says "not a story about dying", but the first image is still illness.
  - The letters are long cards with drop caps, so the page reads as text-heavy on phone.
  - It is in the bar *and* in More.

### /programs

- **Job:** credibility (NVIDIA Inception, Google for Startups, AssemblyAI, Deepgram, Cartesia). **For:** investors and institutions.
- **Works:** careful wording ("None of them is an endorsement, an investment or a partnership"). Membership dates are given.
- **Weak:**
  - The five logos appear in the hero and then **again in the footer badge card on the same page**.
  - The page is thin (158 words) and closes with the generic Everyone starts free + Where to next.

### /questions

- **Job:** remove practical objections. **For:** late-funnel family buyers.
- **Works:**
  - "Rather ask a person? Daniel answers every email himself." with a photo is a strong trust move.
  - Grouped accordions with counts.
  - Search.
- **Weak:**
  - At 390 the category filter row is clipped mid-word ("Conversation, arch") with no fade or arrow.
  - Only 18 answers across 4 groups.
  - Ending-framed questions: **"Who looks after this if I can't?"**, **"Can I leave a letter for later?"** and "What happens if I cancel?".

### /reserve

- **Job:** take $1 to hold a place and price. **For:** a committed family before launch.
- **Works:** a clear, honest mechanism ("It is yours back if you ask"). Stripe payment methods are named.
- **Weak:**
  - **"RESERVE · ENDS 2 NOVEMBER"** is printed in the card header.
  - "15% off your first year, for every family that reserves by 2 November" appears twice.
  - Struck-through prices: $119 → $101.15, $229 → $194.65.
  - All of the above stops being true tomorrow. It is the purest expiry/urgency framing on the site.
  - **"The founding places are filled - thank you."** is a "filled" claim. Its source value (`lib/founding.ts` / Supabase) must be shown before it stays.
  - The page is linked from the footer as a standing product, "Reserve for $1".

### /guides and the 7 guide pages

- **Job:** SEO and helpful content that earns trust; a soft path into the product. **For:** searchers.
- **Works:**
  - Good index ("A place to begin." with four question cards).
  - Each guide has a byline and date, an in-page contents list, a pull-quote, "The A Story point of view" box and Keep exploring links.
  - Consistent 5.6–6 phone screens.
- **Weak:**
  - The /guides index has only 1 CTA, and the guide cards are text only.
  - Guide heroes are dark brown with a small photo, so they look the same as marketing pages and less like an editorial library.
  - Guide titles are long sentence H1s (up to 82 characters). At 390 they take 4–5 lines.
  - "Finish while there is still somewhere to return" (interview guide) is fine in context, but the word choice leans on ending. Review it.

### /contact

- **Job:** reach a human. **For:** anyone stuck, press, partners.
- **Works:** "A person reads every message." Daniel's photo and signature are personal and warm. Routing links (institution demo, reserve, quick question).
- **Weak:**
  - The form sits *below* a hero that already has "Send a message" + email + photo, so on mobile the reader scrolls past the person to reach the form.
  - "answered within a working day" is a service claim that needs to be true.
  - It routes to "Reserve for $1 – it comes off your first year", which has the same expiry problem.

### /privacy and /terms

- **Job:** legal. **For:** careful buyers and institutions.
- **Works:** both open with "The short version". The headings are clear.
- **Weak:**
  - 19.5 and 18 phone screens with no sticky or in-page contents list on phone. Desktop has many anchor links (20 and 29).
  - Both serve at `/privacy` and `/terms` without the trailing slash. Every other page has a slash, and `canonicalPath()` expects one. Check for a redirect or canonical mismatch.

### /samples (static page, outside React)

- **Job:** let a buyer hold the product: flip three sample books. **For:** everyone. It is the single best proof.
- **Works:** real book with cover colours, large-type mode, page turning, and a summary card (Print at home Free / Printed from $39 / With a plan Included).
- **Weak:**
  - At 390 the controls stack is busy: three family tabs, seven swatches, Back / Front cover, Open the book, a bright yellow "Read in large type" button, a "Jump to" slider and two paragraphs of instructions.
  - The yellow button is off-palette.
  - A 7 px "APRIL 23, 2026" sits on the cover (inside the book, so exempt from the 13 px rule, but unreadable).
  - Its header and footer are a hand copy of the React chrome. Any nav change has to be made twice (`public/samples/index.html`).

### /start → app.astoryapp.com/create-account

- **Job:** create an account. **For:** a convinced visitor clicking "Start free" anywhere.
- **Works:** short (name + email). "Free to start. No card."
- **Weak:**
  - **It leaves the site's visual system abruptly.** The page shows:
    - a cartoon puppy
    - an ornate engraved "This book belongs to" frame
    - different logo placement
    - no site nav
  - It is the primary CTA's destination, so every "Start free" click lands in a different-looking product.
  - **A second, different sign-up exists at /sign-up** (site styling, name + email + password, "Reserve · your account"). That makes two account-creation experiences.

### /sign-in, /sign-up (reserve state)

- **Job:** an account for the $1 reserve. **Works:** clear three-point reassurance and "Nobody is called until you say so."
- **Weak:**
  - It carries the full marketing footer and badges on an auth page.
  - The "CREATE ACCOUNT" button is set in tracked capitals with a yellow circle arrow, a different button style from the rest of the site.

### /account, /join → app.astoryapp.com/welcome

- They redirect to the app's welcome ("Every life holds a story worth keeping."). That is expected.
- They have no site chrome and the same visual break as /start.

### /thanks

- **Job:** reassure after purchase and set up the first call.
- **Works:** three Roman-numeral steps.
- **Weak:**
  - The tone is hedged and cold for a moment that should feel celebratory: "*If* you've completed a purchase…" and "This page does not verify a payment. Your checkout receipt is your confirmation."
  - It shows the full marketing footer.

### /l (QR listen link)

- **Bare `/l`:** a branded "This code didn't open." with help text. Good.
- **`/l?m=…&k=…` with a bad or expired code:** the browser is **sent off-site to `naxvjujewggrwflkvvzc.supabase.co/functions/v1/listen`**. That page is an unbranded 404 with the plain text "This recording isn't available." It has no logo, no way back and a raw Supabase project URL in the address bar.
  - This is the page a person reaches from a printed book's QR code, so it is the worst trust moment found.
  - The fix may live in the Supabase function (not `src/`). Flag it to the chief.

### Not found (`/does-not-exist`)

- Branded: "This page isn't here." with links back. Fine.

---

## 3. Cross-cutting weak spots

1. **Expiry and loss framing in live copy:**
   - /pricing: "by 2 November", "15% off", "Stop paying", "trusted person… if you can't"
   - /reserve: "ENDS 2 NOVEMBER", struck prices
   - /questions: "if I can't", "letter for later", "cancel"
   - /for-families: "Someone who has already gone"
   - /your-story: "friends you'll miss later"

   Several of these become false on 3 Nov 2026.
2. **Buy state is unclear.** Pricing shows prices and "Recommended", but also "not on sale yet", "open at launch", "ordering opens soon", plus Reserve, plus Start free. A visitor cannot tell what happens if they pay today.
3. **"Private beta" / "iPhone only" disclaimers repeat in heroes:** how-it-works, organizations, care-communities, pricing, reserve. They are honest, but repeated in the first paragraph they read as a stage notice. design.md already removed program badges from the main path for this exact reason.
4. **Sameness at the bottom of pages.** The same "Everyone starts free" band, the same three "Where to next" cards (self-linking on two pages) and the same badge card make about 2.5 phone screens of repeated closing on most pages.
5. **Two different sign-up experiences,** and the main CTA lands in a visually different app (puppy, ornate frame). Premium brands keep the hand-off seamless.
6. **Mobile tables and scrollers with no affordance:** /compare (1,080 px table), /pricing compare (880 px), the /questions filter chips, the /for-families gift carousel.
7. **Long institutional pages:** /organizations is 12.9 phone screens with two forms. Care-communities repeats the same form.
8. **No video anywhere.** How it works, Pricing and Organizations each have an obvious slot: hero right on How it works at 1440, which is currently sparse.
9. **Naming drift:** Institutions / Organizations; Contact / Get in touch / Write to us; Families / For families; Compare / How A Story is different.
10. **design.md is out of date about the live type** (it says Source Serif 4/Figtree; live uses Cormorant/EB Garamond/Montserrat across 7 weights).
11. **Off-system moments:** the dog illustration on How it works, the yellow "Read in large type" button on /samples, and the tracked-caps "CREATE ACCOUNT" on /sign-up.
12. **Minor:**
    - /privacy and /terms have no trailing slash.
    - The mobile footer badge label "What each one / is" wraps badly.
    - The mobile chrome (fixed header + sticky Start bar) is about 141 px of 844.

## 4. What already works (keep)

- The warm editorial system: night brown cloth, ivory cards, photo prints with corner mounts, handwriting captions.
- Strong H1s across the board.
- Honest labelling: "Joan is a sample", "Clips… are in development", "From each company's public pages, September 2026", the programs disclaimer, cited stats on /our-story.
- A human face on Contact and Q&A ("Daniel answers every email himself").
- Fast and clean:
  - /pricing transfers about 391 KB across 18 requests at load, with DOMContentLoaded around 0.7 s.
  - No console errors and no broken images.
  - No page-level horizontal overflow.
  - Drawer and menu tap targets are 44 px.

## Assumptions

- "Live" = https://astoryapp.com on 2026-11-02, with no cache-busting. Shots were taken with reduced motion, so animated scenes show their end state.
- `/samples` was included because it is in the bar and `staticPages`, although the task named pages + guides + privateRoutes.
- Private routes were opened at their `visit` addresses from `site-routes.mjs`, which is why `/l` used the prerender placeholder code.
- I did not sign in, create accounts or submit any form.
- The demo-form date chips were checked in source: they are computed (`src/pages/site/DemoBooking.tsx`, `upcomingDays`).
