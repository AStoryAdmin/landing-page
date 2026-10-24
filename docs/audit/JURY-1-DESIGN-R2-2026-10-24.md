# Jury 1, design executive, round 2: FAIL, two small fixes from a pass (2026-10-24)

Read-only re-judgement of commit 94264d8 (site-phase2, dev http://localhost:5191) against my round-1 report
(`JURY-1-DESIGN-2026-10-23.md`) and the new rulings at the end of `docs/PHASE2-DIRECTION-2026-10-23.md`.

## Bottom line

This round closed the big things. Every page now opens on the cloth with its own object, `/samples` sits inside
the site's header and footer, the old app screens and drawn phones are gone, and no photograph repeats. How it
works is down from 9.1 to 6.1 screens. The site now reads as one world with the app. Two layout misses remain
and keep two axes at 7: For families' "Better together" has lost its pictures and is now about 600px of mostly
empty paper, and the product is shown as one recreated card, not as screens. Fix the first, accept or improve the
second, and this passes.

## Scores (1-10)

| Axis | R1 | R2 | Why |
|---|---|---|---|
| First impression and brand world | 7 | **8** | Home takes the app's line and its open book. `/samples` uses the site chrome. All 18 pages open on the cloth |
| Layout and use of the screen | 6 | **7** | Heroes now fill the width (Pricing has the ladder on the cloth, Reserve the card, Guides the question cards). Against it: For families "Better together" is mostly empty, and on `/samples` there is a wide empty gap between the book and its panel at 2560 |
| Typography | 7 | **8** | The Guide body is now EB Garamond (2,145 chars against 908 Montserrat). Privacy and Terms are still Montserrat running text |
| Imagery | 5 | **7** | No repeats (only Daniel's portrait, on purpose, on Our story, Questions and Contact). No upscaling at 1920. Every photo is a cornered print. But the product appears only as the recreated memory card and transcript (see #2) |
| Decoration | 7 | **8** | The trust strip, bordered 2×2 grids, tinted-disc initials and the Cartesia network card are gone. Seals are used throughout |
| Page length and rhythm | 6 | **8** | At 1920 / 390: How it works 6.1 / 9.0, Pricing 5.5 / 10.6, Organizations 5.1 / 10.1, Home 6.4 / 9.8. The mobile footer now collapses into two groups |
| Consistency across pages | 5 | **8** | One hero system with a different object per page, one print treatment, one seal style. A small leftover: Care and Your story share a mirrored band and checklist template |

**Verdict: FAIL**, because Layout and Imagery are at 7. There is no blocker. Fixes 1 and 2 below would lift both to 8.

## Round-1 items, one by one

| # | R1 item | Status | Evidence (round 2) |
|---|---|---|---|
| 1 | `/samples` has its own chrome | **Closed** | Site header, Menu on a phone, and the site footer. Leftover: its "Start free" is still the dark pill with a gold disc (see #6 below) |
| 2 | `/samples` doesn't use the screen | **Closed** | Book about 800×800 at 2560 (61% of the height). Families and colours sit beside it, the price card is a full-width row below. Leftover: the empty gap between book and panel, and the cover is upscaled 1.13× at 2560 |
| 3 | Old app screens in drawn phones | **Closed (by replacement)** | No `public/app` screens and no device chrome remain. Honestly: the app's memory card and transcript, an HTML call card and prints are a believable stand-in, but no page shows the archive, the family or the writer as screens. See #2 below |
| 4 | Same hero composition on 7 pages | **Closed** | Book (Home), call card (How it works), print left / text right (Families), headline over a row of 4 prints (Organizations), reasons sheet (Compare), Daniel's portrait (Contact), $1 card (Reserve), marks plate (Programs), question cards (Guides), a print beside a sheet (Care) |
| 5 | Ivory openings | **Closed** | Care, Your story, Questions and Guide open on the cloth |
| 6 | Text-only heroes | **Closed** | Pricing: the ladder on the cloth. Reserve: the card. Guides: 4 question cards |
| 7 | Repeated photographs | **Closed** | Repeated-source scan across all pages: only `our-story/daniel` (intentional) and the Carolyn cover (Home and Pricing) |
| 8 | Three photo treatments | **Closed** | Gift row, Care, Your story and Organizations all use cornered prints |
| 9 | Upscaled images | **Closed** | None over 1.1× at 1920. At 2560 only the `/samples` cover (1.13×) |
| 10 | Repeated templates | **Mostly closed** | Organizations' grid became ruled rows and Compare's 2×2 is gone. Care and Your story still share a mirrored "ledger + big quote" band and a "free + checklist" section |
| 11 | Footer | **Mostly closed** | Columns 5/4/4/4, marks at 48px (36 on a phone) on one plate, the legal lines merged, collapsible on a phone. Leftover: the marks plate wraps 1-2-2 on a phone and on the Programs hero (NVIDIA alone on a row), and "About the examples" sits alone |
| 12 | Home "What one call becomes" | **Closed** | The book spread fills the middle, the tidy note is folded into the attribution, the kicker fits on one line at 1366, and the tellers show as a W R seal row plus "Told by Ruth" |
| 13 | How it works too long, pills, Listen, Montserrat lede | **Closed** | 6.1 screens. Small-caps kickers. Listen tightened. Leftover: the "voice in development" disclaimer appears twice (see #4 below) |
| 14 | Pricing repeats prices, orphan pair, narrow FAQ | **Closed** | The ladder no longer lists the plans, the two "after" items joined the list, and the FAQ runs two-up |
| 15 | Guide and legal in Montserrat, misaligned columns | **Half closed** | Guide fixed. Privacy and Terms unchanged: Montserrat body, two column edges, "Find a section" with nothing under it |
| 16 | Header hides with a shadow | **Closed** | It condenses to 64px at 1366 and stays visible |
| 17 | Organizations trust strip, parking-lot photo | **Closed** | |
| 18 | Tinted-disc initials | **Closed** | Seals everywhere |
| 19 | Programs Cartesia card | **Closed** | Replaced by the marks plate (but see the 1-2-2 wrap in #11) |
| 20 | Questions | **Closed** | Sentence-case tabs, Daniel's round portrait, the single-answer group merged |
| 21 | Our story without faces | **Closed** | Round 64px portraits, a credentials line under each signature, and a why-now band with linked sources ("18% → 30%", "11,200") |
| 22 | Reserve scattered small print | **Closed** | Moved into the card's footer |
| 23 | Home hero lede and ribbon | **Closed** | Lede 462px at 1920, and the ribbon ends inside 768 at 1366 |
| 24 | Care hero uses Home's wall | **Closed** | Its own print and sheet |

## Remaining fixes, ranked

| # | Sev | Group | Page | What | Where | Fix |
|---|---|---|---|---|---|---|
| 1 | P1 | P | /for-families "Better together" | The pictures were removed and nothing replaced them. Three headings and 2-3 line paragraphs wrapped at about 170px inside 377px columns, then about 280px of empty paper before "Why a family begins". The section is roughly 600px tall for about 45 words. The headline repeats the rows ("together" three times) | `src/pages/site/Families.tsx` | Give each row a specimen: a group-call print, the memory card, a family-tree seal row. Or fold the three lines into "Why a family begins" and delete the section. Let paragraphs use the column |
| 2 | P1 | P | How it works, For families, Organizations | The product appears only as the recreated memory card and transcript, plus an HTML "is calling" card. No archive, family register or writer screen anywhere. This is the honest limit of round 2 (no sign-in) | `HowItWorks.tsx`, `Families.tsx`, `Organizations.tsx` | When Bao can sign in, capture 2-3 redesigned web-app screens (archive, family register, writer) and set them cropped with a hairline beside "Everyone has a way in" and "Better together". Until then, keep the card as it is (no fake screens) |
| 3 | P2 | P | Privacy, Terms | Running text is still Montserrat (Privacy about 18,600 chars). The summary and the sections use different column edges. "Find a section" has nothing under it | `LegalLayout.tsx`, `components/ui/legal.styles.ts`, `privacy.styles.ts`, `terms.styles.ts` | EB Garamond body at 18px, one column edge, and a real contents list or no label |
| 4 | P2 | P | How it works | The same disclaimer twice: "Every call keeps the card and the full transcript. Clips … in development" under the steps, then "Kept from every call: the card and the transcript. Voice · in development" in the Listen band | `HowItWorks.tsx`, `home/Listen.tsx` | Keep the one under the steps and delete the Listen line |
| 5 | P2 | K | Footer (phone) and Programs hero | The 5 marks wrap 1-2-2, so NVIDIA sits alone on a row. "About the examples" floats alone on the right of the legal line | `Footer.tsx`, `components/ui/ProgramMarks.tsx`, `Programs.tsx` | Use a 5-across row that scales down, or 3+2 left-aligned. Put "About the examples" inline after the copyright |
| 6 | P2 | S | /samples | Its "Start free" is a dark pill with a gold arrow disc, a different button from the site's. At 2560 there is an empty gap of about 480px between the book and the right panel | `public/samples/index.html` | Use the site's primary pill. Centre the book-and-panel pair, or let the book grow into the gap |
| 7 | P2 | P | Care, Your story | Mirrored templates: a cloth or teal band with ledger rows plus a big quote, then a "free / participation" heading with a ticked checklist. The two pages read as one template flipped | `Care.tsx`, `YourStory.tsx` | Change one of them, for example Your story's band as a photo strip of "the years that go fastest" with the quote laid over it |
| 8 | P2 | P | /guides | The last two rows ("The eleven chapters of a life", "Letting a conversation deepen at their pace") have no kicker, no line and no arrow, unlike the six rows above | `Guides.tsx` | Give them the same row anatomy, or move them under a "More" heading |
| 9 | P2 | H + P | Home close vs Pricing | Home's close reads "Calls from $19.99 a month" while Pricing leads with "$119 a year". Both are true, but the price story changes between pages (a CMO question, noted here because it is a page-to-page consistency fault) | `home/Close.tsx`, `Pricing.tsx` | Pick one opening price for both pages |

## How it was checked

- Headless Playwright 1.63 at 1366×768, 1920×1000, 2560×1300 and 390×844 on all 18 routes (`/samples/` now as a
  route): 72 page-views, each scrolled through, measured and screenshotted. Then sliced and looked at as screen
  sheets per page.
- Probes:
  - Header on scroll: condensed, top −8 / −16px, visible.
  - Footer marks: 48px desktop, 36px phone.
  - Home hero lede: 359 / 462px.
  - Memory card at 1366.
  - Repeated image sources across pages, and upscale factors.
  - Fonts by characters set.
- A suspected text overlap in the `/samples` hint on a phone was a full-page-capture artefact. It reads cleanly in
  the live viewport.
- Evidence: `C:\Users\vngia\AppData\Local\Temp\claude\C--Users-vngia-OneDrive---Umich-Desktop-My-startups-A-Story---W-Daniel-Web-App-Ver-Daniel-09212026\04cff20b-3776-4df6-bd0d-d6b89954a7b3\scratchpad\jury1\r2\`
  (`d_<page>.jpg` desktop sheets, `m_<page>.jpg` phone sheets, `c\` slices, `rows-<vp>.json`).
- **Not verified:**
  - A real browser zoom-out (2560 stands in for it).
  - DPR 2 sharpness.
  - The prerendered `dist/` build.
  - Hover, focus and reduced-motion states (Juror 2).
  - The new copy against the rulings word by word (Jurors 3 and 4). I only checked that the hero line is the
    app's and that no traction line appears in the pages I read.
