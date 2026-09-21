# A Story — website design brief

This replaces the previous 1,696-line specification.

That document prescribed the headlines, the section order, the photo assigned to each
section, the type scale in pixels, the motion durations in milliseconds and the button
height, then instructed the builder not to pause for approval. The result is the site
we have: a faithful transcription of a spec. What it never got was design.

So this brief deliberately stops before the composition. It states what is true, what
is fixed, and what the page has to accomplish. The page itself — its order, its
sections, its headlines, its rhythm — is the work, and it is open.

---

## 1. What A Story is

**Read `mission.md` first.** It is the company's own statement, in the company's own
voice, and it outranks this brief wherever the two differ. The five movements of its
argument are the content the site has to carry.

In one line: a private, living, collaborative family archive built through conversation.
The archive is the product; the book is an output of it.

It is not a memoir app, a genealogy service, a photo album, a journaling product, a
photobook company, a chatbot, or storage.

Positioning: legacy capture is the way in; ongoing journaling is what it becomes after
the first book. Both are true, in that order.

**The copy in `mission.md` is not a placeholder.** The previous specification instructed
the builder to discard the existing "Most of a life goes undocumented" sequence, and it
was discarded — the current homepage has no trace of the company's own opening line.
That language predates the design and survives it.

## 2. Who it is for

Adult children in their thirties to fifties who have realised a parent's life is mostly
undocumented, and who will not get a second chance to ask. They are the buyer. The
parent or grandparent is the user. Care communities and organisations are a separate,
secondary audience with their own pages.

## 3. What the first viewport has to do

A visitor who has never heard of A Story must leave the first screen able to answer:

- What is this? — it turns family conversations into a private living archive
- Why does it exist? — most of a life disappears even when the photographs survive
- What do I do? — you talk

Clarity first. Emotional discovery after. The previous site put four philosophical
sections ahead of the explanation; that is the specific failure to avoid.

## 4. What is fixed

These are constraints, not suggestions.

**Palette** — cream is the environment, deep brown is text and structure, terracotta is
semantic emphasis only, gold and sand are rare accents.

```
Deep brown  #3B291D
Terracotta  #B85327
Cream       #F3EBDE
Gold        #EAC668
Sand        #F0DDA8
```

**Typefaces** — only two are licensed and self-hosted: **Source Serif 4** and
**Figtree**. The previous brief asked for Lyon and Graphik; neither is in the project
and neither is licensed. Adding a typeface is a purchasing decision, not a design one.
The brand guideline names Recoleta and Montserrat, the old landing page used Cormorant
Garamond — there are now four competing typeface stories and this needs one answer
before any production work.

**Photography** — the approved A Story library only. No stock, no new AI families.
Catalogued in `src/lib/assetRegistry.json`, files in `public/mission/`.
See `photo-library.md`.

**Logo** — the approved "A Story" wordmark alone. No standalone letter-A icon. Do not
invent a lettermark.

**Product facts** — pricing, plans, chapters and checkout destinations come from
`src/lib/pricing.ts`, `product.ts` and `checkout.ts`. Do not invent numbers.

**Engineering** — React 19, Vite, TypeScript, react-router, 20 prerendered routes, a
Supabase waitlist. None of it constrains composition.

**Implementation architecture** — build on the original codebase's conventions, not the
current marketing pages'. The original author (a senior engineer) left a central theme
in `src/styles/theme.ts` and a 499-line design-system layer in
`src/components/ui/primitives.ts` — typed section tones, a real button variant system,
grid and split primitives, all driven from one token source. The later rewrites bypassed
all of it for a 2,604-line `greenfield.css` that redeclares the brand colours on a `gf-`
prefix and comments almost nothing.

A redesign should extend `primitives.ts` and retire `greenfield.css`, not add a fourth
parallel system. Full detail in `code-conventions.md`.

## 5. What is open

Everything else. Explicitly including:

the homepage composition · the order the story is told in · how many sections there are
· their heights · every headline · every line of supporting copy · which photographs
appear and at what scale · the navigation · the grid · the type hierarchy · the motion ·
where the CTAs sit · the footer · the mobile composition, which should be composed
rather than stacked

Do not preserve anything from the current site because it exists. The current
homepage's nine sections are the specification being replaced, not a starting point.

## 6. Quality bar

The site should feel expensive because a few hundred small decisions were made
correctly — proportion, restraint, deliberate photography, subtle interaction,
consistent spacing, editorial judgement, quietness.

It should not read as: a startup template, a SaaS landing page, a scrapbook, a wedding
site, a genealogy service, a Figma deck exported to HTML, or a sequence of full-screen
pitch slides.

Premium here does **not** mean vast empty cream, gold gradients, sepia, fake paper,
ornate borders, ultra-thin type, giant pill buttons, or glass cards. The previous site
mistook emptiness for luxury and read as unfinished. Whitespace should separate ideas
and give photographs authority, not fill a viewport to 100vh.

**Reference for craft, not for looks:** the level of motion and typographic confidence
on bao-vo.com. Borrow the qualities — authored movement, narrative progression, large
confident type, premium interaction. Do not borrow its palette, its typefaces, or its
timeline device literally. A Story's equivalent should be more archival and quieter.

## 7. Photography rules

The photographs are the strongest asset in the project and the previous site's worst
failure was how it used them: too many at once, arbitrary overlap, translucent images
as decoration, equal-weight mosaics, photos filling space rather than carrying meaning.

One message, one visual idea. Sometimes that is a single enormous photograph. Sometimes
an image plus a detail. Occasionally a controlled pair. For every photograph: why this
one, why here, why this size, why after the last one, what does the visitor understand
because they saw it. If those answers are weak, remove it.

Real archives are inconsistent — allow square, portrait, landscape, phone-vertical and
historical print proportions to coexist. Do not build one universal photo card.
Historical prints may take a restrained warm edge; modern photographs should be
borderless. No fake Polaroids, no rotation, no tape, no torn edges, no artificial aging.

## 8. Copy voice

Set by `mission.md`. Read its "Phrases worth keeping" list before writing a headline —
several of them are already better than anything a fresh pass will produce.

Concrete detail is the emotional language of A Story. Write the specific thing, not the
category.

Good: *"The joke everyone remembers but nobody can explain."* · *"The street your mother
still calls by its old name."* · *"Why nobody ever sat in Grandpa's chair."*

Banned: unlock, journey, cherish, treasured memories, capture what matters, reimagine
storytelling, AI-powered storytelling, preserve your legacy. Nothing that reads as
startup copy, therapy copy, greeting-card sentiment or brand-consultancy language.

## 9. Open decisions — answer before production

**a. The book is teal.** The only approved book artwork (`36`–`40`, `book-closed`,
`book-slipcase`) is teal, and teal is a print-only colour in the brand decision. So the
site's one physical object is off-palette. Either the book gets re-shot in a brown
binding, or teal earns a deliberate role on the page, or the book is shown in a way
that does not fight the palette. Pick one.

**b. One typeface story.** Source Serif 4 + Figtree is what exists. Recoleta +
Montserrat is what the guideline says. Decide, then make the guideline and the code
agree.

**c. One token source.** Brand colours are currently declared twice — in
`greenfield.css` and in `styles/theme.ts` — and can drift apart. Collapse to one, and
make it `theme.ts`, which is where the original architecture already put it. Note that
`theme.ts` currently defines `teal: '#3B291D'` — teal was removed by aliasing the token
to brown rather than by removing its uses, so the name now lies.

**d. The contemporary photo set.** Images `41`–`52` and `S01`–`S08` are modern phone
snapshots, mostly unused, and weaker than the archival set. Either they have a job
(the argument that today's ordinary moments become tomorrow's missing stories) or they
should be retired from the site.

## 10. How to judge the result

Ask, honestly:

- Could this be mistaken for the old site? If yes, start again.
- Does it still read as a slideshow? If yes, start again.
- Is collage doing the work that composition should do? If yes, start again.
- Is there more than one dominant message in any viewport? If yes, simplify.
- Is whitespace standing in for luxury? If yes, recompose.
- Does every photograph have a narrative job? If not, cut it.
- Does the software dominate the people? If yes, rebalance.

Then read only the finished site and answer: what is A Story, what problem does it
solve, why aren't photographs enough, what do I actually do, does it remember context,
can relatives take part, can two people remember differently, is this only about the
past, what is the book. Any unclear answer means it isn't finished.
