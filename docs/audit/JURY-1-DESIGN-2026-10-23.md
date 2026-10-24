# Jury 1, design executive: FAIL (2026-10-23)

Read-only review of http://localhost:5191 (dev, branch site-phase2, commit 594a40e), against
`docs/PHASE2-DIRECTION-2026-10-23.md`, `design.md`, `web-app/docs/BAOS-STANDARD.md`, DESIGN-TASTE,
WORKING-STYLE and WRITING-VOICE, and compared with the signed-out web app at app.astoryapp.com.

## Bottom line

Home is now good. The open-book hero copies the app's sign-in book closely, it fits one screen at 1366, and the
page is 6.4 screens at 1920. The rest of the site has not followed it. Seven pages open on the same
"headline left, tilted print right" template. Four pages open on ivory instead of the cloth. `/samples` has its
own header. How it works, For families, Organizations and Care still show the old phone-app screens of 10 October
inside drawn phones. The same five photographs keep coming back across pages. The site reads as "Home is
designed, the rest is a template".

## Scores (1-10)

| Axis | Score | Why |
|---|---|---|
| First impression and brand world | 7 | Home hero matches the app's open book. `/samples` chrome and the ivory openings break that world, and so do the old app screens |
| Layout and use of the screen | 6 | Pricing, Reserve and Guides heroes are text on the left with about 1,100px of empty cloth on the right at 1920. The `/samples` book is about 630px wide at 2560 |
| Typography | 7 | Cormorant, EB Garamond, Montserrat and Caveat are used well on Home. Legal, Guide body and some ledes fall back to Montserrat paragraphs |
| Imagery | 5 | Staged GPT-style photos sit next to archival prints. The kitchen photo appears on 4 pages and Ruth on 4. Three print treatments are mixed. Images are upscaled 1.57× on Care and Your story |
| Decoration | 7 | Cloth, the A pattern, photo corners and Bond are earned. Against them: a SaaS trust strip, a bordered 2×2 grid, tinted pills and tinted-disc initials |
| Page length and rhythm | 6 | Home is good. How it works is 9.1 screens at 1920 and 14.8 on a phone. Organizations is 12 on a phone, Pricing 12.8, and the mobile footer about 2.5 screens |
| Consistency across pages | 5 | The hero template repeats, grounds differ, `/samples` has its own header, and there are three avatar styles and three photo treatments |

**Verdict: FAIL.** Not every axis is 8 or higher. `/samples` having its own header and nav is a blocker for the
"one world" direction.

## How it was checked

- Headless Chromium (Playwright 1.63) at 1366×768, 1920×1000, 2560×1300 and 390×844 (mobile, touch). That covers
  all 18 routes in the brief: 72 page-views, each scrolled through to fire its reveals, then a full-page
  screenshot, sliced into screens and looked at.
- Measured: page height in screens, horizontal overflow (0 everywhere), text under 12 and 13px, uppercase, tap
  targets, fonts by characters set, images (natural vs rendered size), repeated image sources across pages, header
  behaviour on scroll, and the sticky phone on How it works.
- Menu (390) and More (1920) opened. Nothing submitted, no sign-in.
- Web app: `/sign-in`, `/create-account` and `/` (redirects to sign-in) captured at 1920 and 390.
- Evidence: `C:\Users\vngia\AppData\Local\Temp\claude\C--Users-vngia-OneDrive---Umich-Desktop-My-startups-A-Story---W-Daniel-Web-App-Ver-Daniel-09212026\04cff20b-3776-4df6-bd0d-d6b89954a7b3\scratchpad\jury1\`
  (`s\<vp>__<page>.jpg` full pages, `c\` sliced screens, `m_*.jpg` mobile sheets, `rows-<vp>.json` measurements).
- **Not verified:** a real browser zoom-out (2560 stands in for it), DPR 2 sharpness (upscale factors are given at
  DPR 1, so a retina display is worse), the prerendered `dist/` build, hover, focus and reduced-motion states (Juror 2
  owns those), and `/samples/` as a route (dev serves `/samples/index.html`).

## Ranked fix list

Severity: **P0** blocker or brand-world break. **P1** a clear rule broken on a page that matters. **P2** polish.
The group shows who owns the files: **H** = `home/**`, **K** = kit + styles + Header + Footer, **P** = other pages,
**S** = `public/samples`.

| # | Sev | Group | Page | What | Where | Fix |
|---|---|---|---|---|---|---|
| 1 | P0 | S | /samples | Its own header: ivory bar, teal-A logo, Cormorant nav with Sign in inline, a dark "Start free" pill with a gold disc. On a phone the nav is inline links, not Menu. No site footer. Every other page has the chocolate Montserrat bar | `public/samples/index.html` (header + CTA styles) | Copy the site header's markup and tokens (cloth bar, cream logo, More, Sign in, cream Start free pill, Menu on phones) and add the site footer, or link `/samples` into the app shell |
| 2 | P0 | S | /samples | Doesn't use the screen. The book is about 640px wide at 1920 and about 630px at 2560 (25% of the width), with about 320px of empty cloth under it at 2560. The price card sits in the 280px left rail, though the direction says "below without a narrow column" | `public/samples/index.html` (book sizing + layout) | Size the book from the available height and width (target about 70% of window height), put families and colours beside it, and move the price card below as one wide row |
| 3 | P0 | P | How it works, For families, Organizations, Care | Old phone-app screens (`public/app/*.webp`, dated 10 Oct: green "Childhood" tags, orange progress bar, "Rose Miller") inside drawn iPhone chrome. They don't match the bookcloth web app the site now copies, and the direction says "the redesigned app, not the old Figma screens". How it works stacks 5 drawn phones on a phone screen | `HowItWorks.tsx`, `Families.tsx`, `Organizations.tsx`, `Care.tsx`, `app/Phone.tsx`, `kit/AppTour.tsx`, `public/app/` | Capture the redesigned web app (memory page, archive, family, writer) and show the screens cropped with a hairline, without device chrome, as `design.md` says. Keep the one sticky phone only if it shows new screens |
| 4 | P1 | P | How it works, For families, Organizations, Contact, Our story, Compare | Every page opens on the same composition: cloth, headline and lede on the left, one tilted cornered print on the right. Standard 36: "No two pages open on the same composition" | `kit/kit.tsx` `PageOpening` and its callers | Give each page its own object on the cloth: How it works the call card or ringing screen, Families the gift-wrapped book, Organizations a stack of name cards or a reunion photo strip, Contact a letter with Daniel's round portrait, Compare the four witness notes alone |
| 5 | P1 | P | Care communities, Your story, Questions, Guide | They open on ivory with no cloth. The Standard says the top of every page is chocolate bookcloth, and the other 12 pages follow it | `Care.tsx`, `YourStory.tsx`, `Questions.tsx` (`$ground="ivory"`), `Guide.tsx` | Open them on the cloth through `PageOpening` (or the same ground), keeping their own composition |
| 6 | P1 | P | Pricing, Reserve, Guides | The hero is text only, with about 1,100px of empty cloth on the right at 1920 and more at 2560. Pricing's lede runs 7 lines | `Pricing.tsx`, `Reserve.tsx`, `Guides.tsx` | Fill the right side with the real object: on Pricing the three plan objects (archive, a call card, the book) or the price ladder itself, on Reserve the $1 reservation card (move it up from below), on Guides the four questions as cards on the cloth. Cut Pricing's lede to 2 lines |
| 7 | P1 | P + H | Site-wide | The same photographs repeat. `mission/33` (kitchen) is on How it works, Questions, the interview guide and Contact. `mission/31` (Ruth) is on Home, How it works, Organizations and Care. `mission/12` and `mission/34` are on 3 pages each. The campfire photo and the four witness quotes appear on both Home and Compare. Care shows the photo-sorting scene twice | `Contact.tsx`, `Guide.tsx`, `Questions.tsx`, `Care.tsx`, `Organizations.tsx`, `compare/CompareOpening.tsx` | One photograph, one page. Give Contact, Guide and Questions their own images, or none (Contact can use Daniel's portrait). Replace Compare's opening so it doesn't replay Home's Witnesses |
| 8 | P1 | P | Site-wide | Photos get three treatments: white border with black corners (Home, heroes), plain rectangle with shadow (For families gift row, Care "Know the person", Your story "years that go fastest"), and white border without corners (For families "Why a family begins", Organizations). The direction says real prints with white borders and photo corners | `Families.tsx`, `Care.tsx`, `YourStory.tsx`, `Organizations.tsx`; `kit/kit.tsx` `Print` | Route every photograph through `Print` with `PhotoCorners` and a Caveat caption |
| 9 | P1 | P | Care, Your story | Images upscaled on screen: `mission/11-640` and `46-640` (576px natural) are drawn 907px wide (1.57×), and `34/12/48/49-640` at 743px (1.29×). That is at DPR 1, so it's worse on retina and at 2560 | `Care.tsx`, `YourStory.tsx` (srcset) | Add the 1100 and 1600 widths to `srcset`/`sizes`, or cap the frame at the natural width |
| 10 | P1 | P | Org, Care, For families, Your story | Same templates repeated: Care's "Know the person" and Your story's "years that go fastest" are the same zigzag (large photo left, small right, captions under, big empty area under the left caption). Organizations' "You decide. They agree." is a bordered 2×2 grid, which reads like a form. Compare's "Four reasons" is a 2×2 grid of white cards | `Care.tsx`, `YourStory.tsx`, `Organizations.tsx`, `Compare.tsx` | Make each a different room: a photo wall for Your story, ruled ledger rows for Org decisions, and on Compare drop the four cards into the table's closing line or a single column of ruled rows |
| 11 | P1 | K | Footer, all pages | The columns are ragged: "The product" has 7 links and the others 3-5. Program marks are about 28px tall in white sticker boxes (`design.md`: 48px). On a phone they wrap 2-1-1-1. "About the examples" sits alone on the right. There are two copyright lines. The mobile footer is about 2.5 screens | `src/pages/site/Footer.tsx`, `components/ui/ProgramMarks.tsx` | Balance into four columns of 4-5 (Start free and Sign in move out, they're in the header). Set marks at 48px on a single cream plate or as mono-cream logos in a row that wraps evenly. Merge the legal lines. On a phone, fold the columns into two collapsible groups |
| 12 | P1 | H | Home "What one call becomes" | The middle column ends halfway down, leaving about 390px of blank paper at 1920. "Lightly tidied: the ums…" is a disclaimer caption (Never: scattered captions). At 1366 the memory card's "LIVE CONVERSATION · 14 MIN" wraps to 3 lines. The card's initials show "W R" overlapped, with the W clipped, plus a lone "R" at the right | `home/CallBecomes.tsx`, `app/MemoryCard.tsx` | Put the book spread in the middle column under the quote (or let the quote run beside the spread), fold the tidy note into the quote's attribution line, give the card 440px+ at 1366, and draw the tellers as one seal row (no overlap, no orphan R) |
| 13 | P1 | P | How it works | 9.1 screens at 1920 and 14.8 on a phone. Sections: hero, five steps, Listen, card/transcript/voice, "Everyone has a way in" (4 screens), book, close. The step kickers are tinted pills ("YOU", "THEM", "A STORY"). In the Listen band the cards float far apart with about 300px of empty teal, and the lede is in Montserrat while other ledes are EB Garamond | `HowItWorks.tsx`, `home/Listen.tsx` | Merge "Each call leaves a memory" into step 04 (it repeats "It becomes a memory"). Cut "Everyone has a way in" to 2 screens or move it to For families. Replace the pills with small-caps text. Tighten Listen so the three cards sit as one composition. Set the lede in EB Garamond |
| 14 | P1 | P | Pricing | Prices are said three times: the ladder ($0 / $119 / Free, each with a list that names Individual, Family and Express with prices again), the plan cards ($119 / $229 / $79), and the Monthly bar. "547 questions" appears 3 times. After the list, "Who looks after this" and "A letter for later" sit as an orphan pair in a 3-column grid, and the FAQ sits in a half-width column | `Pricing.tsx`, `kit/PriceLadder.tsx` | Keep the ladder as the summary, without the per-plan sub-lists. Let the cards carry the plans. Put the two "after" items into the 6-row list as rows 7-8, and run the FAQ two-up across the width |
| 15 | P1 | P | Guide (/guides/interview-a-parent), Privacy, Terms | Running text is set in Montserrat (Guide body 2,960 chars of Montserrat against 114 of EB Garamond; Privacy 18,600 Montserrat). The Standard says EB Garamond text on the sheet. The Guide column ends at x=1356 of 1920, leaving the right ~560px blank. Privacy's summary (x 304-1040) and its sections (x 406-938) use two different column edges, and "Find a section" is a label with nothing under it | `Guide.tsx`, `components/guide.tsx`, `pages/site/LegalLayout.tsx`, `components/ui/legal.styles.ts` | Set body copy in EB Garamond 18-19px, centre the article with the "In this guide" rail on the left and the photo beside the opening, align the legal summary and sections to one column, and make "Find a section" a real contents list or remove it |
| 16 | P2 | K | Header on scroll | The header slides fully away (translateY −72px) on scroll down, and a shadow band stays at the top edge of the window (seen at scrollY 1500 and 2600 on Pricing). The Standard says the bar follows and condenses | `src/pages/site/Header.tsx`, `chrome.styles.ts` | Condense to a 56px bar instead of hiding it, or drop the shadow when it's hidden |
| 17 | P2 | P | Organizations | The trust strip under the hero ("◇ A FOUNDER ON EVERY DEMO · ◇ CONSENT… · ◇ QUOTED…") is a SaaS pattern in uppercase. The "Libraries and museums" photo is a brick building and a parking lot, which doesn't show the idea | `Organizations.tsx` | Drop the strip (the form already says it), and use an archive or reading-room print for libraries |
| 18 | P2 | P | Compare hero, How it works Listen | Initials sit in solid tinted discs (teal W, orange L, brown B, orange R, gold A). Home's Witnesses uses gold-ring seals. Never: tinted shapes with an initial | `compare/CompareOpening.tsx`, `home/Listen.tsx` | Use the seal from Home's Witnesses everywhere |
| 19 | P2 | P | Programs | The hero image is Cartesia's grant card: grid, node connectors, a green waveform (Never: network graphics, decorative waveforms), with a caption under it | `Programs.tsx` | Replace with the five marks set large on a cream plate on the cloth, and drop the caption |
| 20 | P2 | P | Questions | "Family participation" has 1 answer, an orphan section. The filter pills are tracked uppercase in a white rounded bar. "Rather ask a person?" uses a blurry thumbnail avatar | `Questions.tsx`, `faqData.ts` | Merge single-answer groups. Set the filters as sentence-case text tabs. Use Daniel's round portrait (`public/our-story/daniel-320.webp`) |
| 21 | P2 | P | Our story | No faces. `public/our-story/bao-320.webp` and `daniel-320.webp` exist and are unused. Letters signed only by name read anonymous to a YC reader | `OurStory.tsx`, `our-story/*` | Add a 56-64px round portrait beside each signature (not a hero portrait) |
| 22 | P2 | P | Reserve | Small print is scattered under the card: "The founding places are filled - thank you." centred under the card, and "Already have an account? Sign in" centred on the page, alone | `Reserve.tsx` | Fold both into the card's footer line |
| 23 | P2 | H | Home hero | The right page's text column is about 400px wide in an 830px page, so the right half of the page is empty above Bond. The ribbon stub under the gutter is cut by the fold at 1366 | `home/OpenBook.tsx` | Widen the lede to about 520px and lift Bond onto the page's lower-right ledge. Shorten the ribbon so it ends inside 768px |
| 24 | P2 | P | Care | The hero is a three-print collage of Home's wall photos (dough, Ruth, photo-sorting), so Care looks like Home | `Care.tsx` | Use care-setting prints: an activity room, a resident with a staff member, an album in a lounge |

## What already holds (keep it)

- Home: the open-book hero matches the app's sign-in book (same cloth, A pattern, cornered prints, Caveat
  captions, ivory page, ribbon, Bond). It fits one screen at 1366 (book bottom at 730 of 768). The page is 6.3-6.4
  screens on desktop, and each idea is said once.
- No horizontal overflow on any page at any size. No visible text under 12px outside drawn phones and the books.
  Uppercase is used only for tracked kickers at 12-13px.
- "Where to next" closing bands with ruled rows and round arrows. Our story's two letters side by side on paper
  over cloth. The mobile menu and the More panel are well made.

## Grouped for builders (disjoint files)

- **home/** (H): #12 CallBecomes + MemoryCard, #23 OpenBook, and the Home half of #7 (the Witnesses photo and quotes
  stay on Home. Compare changes).
- **kit + styles + Header + Footer** (K): #4 `PageOpening` variants (an `object` slot per page), #8 `Print` used
  everywhere, #11 Footer + ProgramMarks, #16 Header condense.
- **other pages** (P): #3 (new app screens + AppTour without chrome), #4 callers, #5, #6, #7, #9, #10, #13, #14,
  #15, #17-#22, #24.
- **public/samples** (S): #1 chrome, #2 layout and book size.
