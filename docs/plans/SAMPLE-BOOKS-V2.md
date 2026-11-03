# Sample books v2 — the three books at /samples, rebuilt as the book the app prints

Date: 2026-11-03. Branch `sample-books-v2` (worktree `Desktop/a-story-landing-samples`, from main).
Owner: Daniel. Chief agent runs the team; Daniel approves the publish.

## Goal

The three sample books on astoryapp.com (Carolyn Bennett, Raymond Ortiz, Thomas Kessler)
read as the finished book a family receives: the parent's own voice and words, how they
lived, the family's memories of the same moments. Nothing of the product's machinery
stands between the reader and the person. The page anatomy is the app's own book
(`phone-app/src/lib/legacyBook.js`), so the sample and the real book are the same object.

Daniel's note (3 Nov): "They just want the book of their loved one's voice and words and
to know how that person lived." The devices "We asked…", "A Story asked for more, nine
minutes later", layer bars, stats, summaries, lesson boxes were not necessary.

## Pass / fail

1. **Her words only.** Every paragraph in a memory is the storyteller's own words, first
   person. No narrator, no "A Story" on the page except the colophon line and the listen
   line. Raymond's book moves from third person to his own voice.
2. **App anatomy.** A memory page carries: running head (chapter), title, dateline
   ("Summer 1968 · aged 8"), optional "Asked by Ellie", her words with a drop cap, photos
   with a caption, an optional kept line (her exact words) ruled in the margin, family
   versions as "Dylan remembers it too / differently…" + "Remembered by Dylan Ellison, her
   daughter", and on recorded memories the listen block "Scan with a phone camera to hear
   Carolyn tell this." Nothing else.
3. **Gone from every book:** layer bars, Summary boxes and source tags, "The question /
   Asked by" line as a box, "Going deeper / We asked", "The lesson she carries",
   "Still alive / For Ellie" boxes, stats, "four layers" page, "sources" page, revenue
   chart, "what she passes on" list, legacy grid, "to the reader / five questions"
   marketing pages, posts/diary import demos, notebook page, "nine minutes later" page.
4. **Chapters are the app's chapters** (`data/eras.js`): Where we come from, Childhood,
   Growing up, Love & family, Work & making a living, The world we lived through, When
   everything changed, Faith & what carried me, Looking back, then "What <name> learned"
   (her exact words by theme, only quotes that appear verbatim on an earlier page), then
   "From the family" (In their own words). A book prints only the chapters it has.
5. **Front and back matter are the app's:** cover (kept as today), endpapers, title page
   (title / "The life of Carolyn Bennett" / "A Life, In Their Words" style line), dedication
   in her words, contents, chapters, colophon in the app's wording ("Moments & Memories /
   The life of Carolyn Bennett, in Carolyn's own words. / 15 memories, 9 photographs. /
   Kept by … / With memories from … / This book is private to the Bennett family. / A
   sample book: the Bennetts are fictional. / Shaped, designed and printed by A Story."),
   back cover.
6. **Numbers are true to the book.** Memory and photograph counts in the colophon equal
   what is printed. Page numbers in the contents equal the folios.
7. **Nothing overflows.** An automated check (`scripts/qa/samples-overflow.mjs`) opens
   /samples in a browser, walks every face of every book, and fails if any `.pg` content
   is taller than its page. Zero failures.
8. **The home cards still open the right book** (/samples#carolyn, #raymond, #tom) and
   the covers in `public/book-objects/sample-*.webp` still match the covers on the page.
9. **Reads as a life.** A cold-reader panel (adult child, 35–55, never seen A Story) scores
   each book ≥ 8/10 on "I understand who this person was and I'd want this for my parent",
   and names nothing on the page as "the product talking".
10. `npm run lint` and `npm run build` pass on the branch.

## Tasks

| # | Task | Check |
|---|------|-------|
| 1 | Research: what great legacy books do; competitors; the 10x list; verdict on each device | `scratchpad/research-great-book.md` |
| 2 | Design-parity spec: the app book's anatomy, mapping to sample CSS, delete list | `scratchpad/design-parity-spec.md` |
| 3 | Writers' brief + content schema (this file, §Schema) | writers can start |
| 4 | Builder: new page templates + CSS + `compileBook(DATA)`; trim the scanned view to listen + archive | page renders Carolyn from DATA |
| 5 | Writers ×3: Carolyn, Raymond, Tom as DATA files | each passes the word budget + verbatim-quote check |
| 6 | Integrate, overflow check, counts check | criteria 6–8 |
| 7 | Cold-reader panel; fix | criterion 9 |
| 8 | Lint, build, screenshots, commit | criterion 10 |

## Schema (what a writer hands in)

One JS file per book, `DATA.<id> = { … }`, plain JS object literal, no HTML in strings except `<i>…</i>`. Checked by `scratchpad/check-data.mjs`.

```js
DATA.carolyn = {
  id: "carolyn", name: "Carolyn", full: "Carolyn Bennett", family: "the Bennett family",
  pronoun: "she", poss: "her",                      // "he"/"his" for Raymond and Tom
  born: "April 23, 1960", place: "Holland, Michigan",
  cover: { title: "MOMENTS & MEMORIES", date: "APRIL 23, 2026", names: "Carolyn & Dylan", motto: "Finish the parade." },  // keep today's cover words unless they lie
  title: "Moments & Memories",                      // title page + colophon
  subtitle: "The life of Carolyn Bennett",          // title page line 2; line 3 is always "in her own words"
  dedication: { text: "For Dylan, who made me a mother…", sig: "Carolyn" },   // her spoken words
  epigraph: { text: "Everything important in my life got decided at a kitchen table.", from: "m1" },  // verbatim from that memory
  chapters: [ { era: "Childhood", memories: [ /* memory objects, see below */ ] } ],   // era = one of the app's chapter names
  learned: [ { theme: "Love", quotes: [ { text: "…", from: "m3" } ] } ],   // 3–5 total, verbatim sentences from the memory named; themes: Hard choices, Work, Love, Money, Loss, Raising children, Getting through, Starting again, What matters, Health
  little: [ { q: "What did you want to be when you grew up?", a: "A lighthouse keeper. I didn't know yet that you had to like being alone." } ],  // 10–12, no dates, answers ≤ 28 words
  people: [ { name: "Rick Bennett", relation: "her husband", line: "Held the umbrella." } ],   // "The people in this book": 5–9, line in her words
  family_chapter: [ { who: "Dylan Ellison", relation: "her daughter", title: "The box under the bed", dateline: "2026", faces: [[ "…", "…" ]] } ],   // 2–4 pieces, their own words
  letter: { to: "Dylan, Ellie and Sam,", faces: [[ "…", "…" ]], sig: "Mom" },   // one, last, ≤ 230 words
  colophon: { conversations: 11, gathered: "between October 2025 and March 2026", keepers: ["Dylan Ellison", "Mark Ellison"], archiveId: "AS-BENNETT-2026", edition: "First edition, April 23, 2026" },
  back: { dedicatedTo: "The Bennetts", quote: "“To the Bennetts, who always pulled up a chair.”" },
};
```

A memory:

```js
{ id: "m2", title: "Tulip Time, 1968", dateline: "May 1968 · aged 8", askedBy: "Ellie",   // askedBy optional, first name
  headnote: "Twelve to twenty-two words of scene, in the editor's plain voice, no question.",
  faces: [ [ "para", "para" ], [ "para", "para", "para" ] ],   // one array per printed page, max 2 pages
  photos: [ { img: "paint", pos: "50% 40%", caption: "Dylan at the easel, Pine Avenue, 1987", face: 0 } ],   // Carolyn only; keys paint, paintd, kiss, beach, beachd
  kept: "exact substring of one of her paragraphs",   // optional, ruled in the margin
  sides: [ { heading: "Rick remembers it differently", body: "…", by: "Remembered by Rick Bennett, her husband" } ],   // ≤ 80 words each
  voice: { rec: "Oct 16, 2025", len: "0:31", quote: "the first real sentence she said" },   // optional; prints the listen block + recording id
  plate: null,   // or { kind: "recipe"|"ledger"|"letter"|"calendar", … } — one object page after this memory (see the current page for the fields)
}
```

Word budgets per face (the page is fixed-size and cannot scroll): page 1 ≤ 140 words
(≤ 90 with a photo); page 2 ≤ 220 (≤ 140 with a photo); minus 60 per side and 40 for the
listen block on the page that carries them.

## Decisions from the research (3 Nov, `scratchpad/research-great-book.md`)

Every competitor book is the same object: prompt as title → prose → photo → QR. StoryWorth
is verbatim-and-flat ("prompts were automatically inserted into the stories… I really
disliked this"); Remento is AI-rewritten ("It paraphrases. It 'tidies.' It rewrites").
Nobody edits like a book editor, and nobody puts the family in the book. So:

1. **Edit like Terkel.** Her exact words, false starts and repetition removed, grammar and
   dialect untouched. Forty minutes becomes the 300–600 words that leave a mark.
2. **Headnote, not question.** Each memory opens with the title, the dateline, and an
   italic headnote of 12–22 words of scene in the editor's plain voice ("At the kitchen
   table on 17th Street; the bread is in the oven for the whole call."). The question is
   never printed. "Asked by Ellie" stays as the app's small line under the dateline.
3. **One memory, one or two pages.** Nothing runs past two faces.
4. **The family on the page.** A relative's version of the same day sits under her words
   as the app prints it ("Rick remembers it differently…" / "Remembered by Rick Bennett,
   her husband"), 30–80 words, a real disagreement or a real addition.
5. **Short answers.** One spread of 10–12 one-liners in her exact phrasing, no dates.
6. **The voice, offline-proof.** The listen block on recorded memories, and the colophon
   names the archive and the recording IDs so the voice outlives any server.
7. **Her epigraph and dedication in her own spoken words.**
8. **"The people in this book"** at the back: each person, relation, and one line about
   them in her words. No chart.
9. **A letter, not a lesson.** The last thing in her voice is one letter to the family,
   verbatim, then the colophon.
10. **"What Carolyn learned"** stays (Daniel's standard §18), 3–5 verbatim quotes by
    theme, each a sentence she says on an earlier page, sourced "— from Tulip Time, 1968".
11. **Photos: fewer, larger, captioned** with names and years in her phrasing.
12. **A truthful colophon:** how many conversations, between which dates, who kept the
    book, who added memories, "Nothing on these pages was added that she did not say",
    private to the family, sample disclaimer, "Shaped, designed and printed by A Story."

Banned on the page: summary boxes, source tags, layer bars, stats, lesson boxes, "we
asked", "A Story asked for more", "nine minutes later", "still alive / for Ellie",
"what she passes on", "to the reader", "five questions", revenue chart, import demos,
and any sentence an editor wrote about her ("a testament to", "not just X but Y").
