# Website phase 2: the book on the bench (2026-10-23)

Bao, 2026-10-23, on seeing the live site: "a story can be massively designed to be better",
the home's "You do step one" section "looks horrible", "most of the homepage too. it's a
serious design quality downgrade", and /our-story needs a serious check with Bao's part
condensed "much harder". On 2026-10-18 Bao chose "Fix + match the app" for phase 2.

## The direction

The site becomes the web app's own world (app.astoryapp.com, `../web-app`, `web-app/docs/BAOS-STANDARD.md`,
`web-app/docs/DESIGN-SYSTEM.md`): a family book open on a bookbinder's bench.

- **Ground:** chocolate bookcloth (the app's woven texture and the faint A pattern) for heroes and
  bands; the ivory book page (#FFFDF8 / #F3EBDD) for reading. Teal cloth (#0F4A58) for the book.
- **Type:** Cormorant Garamond for display, EB Garamond for reading, Montserrat for UI and small caps,
  Caveat for handwritten photo captions only. The site's current serif goes.
- **Pictures:** real prints with white borders and black photo corners, slightly turned, a Caveat
  caption under each. Real app screens (the redesigned app, not the old Figma screens). Bond appears
  once or twice, on a ledge, never blocking a click.
- **Width:** use the screen. At 1920 and 2560 the content spans the window (two or three columns), never
  a ~1100px strip with empty margins.
- **Length:** brief. Home about 7 screens at 1920x1080 (it is 17 today). One idea per section, said once.

## Home, in order (target)

1. **The open book (hero):** cloth left page with 3 cornered prints and Caveat captions; ivory right
   page with the headline, one sentence, Start free + Reserve for $1, and Bond. Fits one screen.
2. **It's the everyday:** the photo wall, one screen, with the milestones line folded in.
3. **How it works, in three:** You set it up, they answer the phone, the family keeps it - each with a
   real screen from the redesigned app. Replaces StepOne (the "You do step one" block).
4. **What a call becomes:** the card, the words, the book. One section, not three.
5. **Many witnesses:** the family adds what they remember. One section (today it is said three times).
6. **The books:** the three sample covers, open one on /samples.
7. **Price and close:** one plain line and the two doors, then the footer.

Cut: duplicate witness sections, "Your story isn't behind you", the second invitation, anything
that repeats a promise.

## /our-story

Opening, then the two founders' notes side by side on the wide screen as letters on paper over
cloth, then one closing line with the doors. Bao's note is condensed (done 2026-10-23, Codex draft
checked against WRITING-VOICE.md); Daniel's stays as written unless Daniel approves a cut. Bao is
"Co-founder, COO & CTO".

## /samples

Use the screen: the book larger, the cover colours and the three families beside it, the price card
below without a narrow column.

## Rules

- Keep every real fact; invent nothing. Keep routes, SEO, prerender and the checks green.
- Every effect has a reduced-motion fallback; nothing is left half-faded.
- Check at 1366x768, 1920x1000, 2560x1300 and 390x844.

## Bao's rulings, 2026-10-23 (night before YC)

- No traction line on the site (no "private beta with 10 families").
- A short "why now" band on /our-story only, with sources linked: generative-AI use among adults 50+
  went from 18% (2024) to 30% (2025) (AARP 2026 Tech Trends, the linked page); 11,200 Americans turn 65 every day through 2027
  (Alliance for Lifetime Income, Peak 65). Kept off Home.
- Team on /our-story: Daniel and Bao only (not Nhi Tran), each with a small round photo and one
  credentials line. Daniel: Co-founder & CEO; BS Mathematics and Data Science, Bowling Green State
  University. Bao: Co-founder, COO & CTO; MS ECE, University of Michigan, doctoral fellow; led
  go-to-market for four biotech startups. Photos: `public/our-story/{daniel,bao}-320.webp` (from the
  MBC deck).
- Calls today: the parent installs the A Story iPhone app (private beta) and the call rings in the
  app. Say so plainly wherever calls are mentioned; never imply a regular phone call or no app.
- No launch month: "we email you when the calls open, in the order families reserved".
- Home headline becomes the app's line: "Every life holds a story worth keeping."
