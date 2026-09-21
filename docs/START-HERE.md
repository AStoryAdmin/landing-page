# Start here

Four documents. Read them in this order; feed them to a designer in this order.

| # | file | what it is |
|---|---|---|
| 1 | `mission.md` | What A Story is, in the company's own words. The source of truth for content and voice. |
| 2 | `design-brief.md` | What's fixed, what's open, what the page must accomplish. Deliberately stops before the composition. |
| 3 | `photo-library.md` + `photos/` | All 62 approved images, what each one is, and which nine can carry a screen. |
| 4 | `code-conventions.md` | The original engineer's house style, for whoever builds the result. Not needed for the design pass. |

`MAP.md` (repo root) is the code map — for implementation, not design.

---

## Feeding this to Claude Design

Attach **1, 2 and 3** — `mission.md`, `design-brief.md`, `photo-library.md`, and the
three contact sheets. That is about 1 MB. Leave out the code; it is not a design input.

Then ask for **one thing at a time.** The last attempt failed partly because it asked
for a whole site in a single pass, with the answers pre-written. Do the opposite:

**Pass 1 — the system, before any page.**
Ask for the design system only: type scale built from Source Serif 4 and Figtree, the
colour roles, the grid, button and caption treatments, how a photograph is presented at
three different scales, and the motion vocabulary. No homepage yet. Iterate until this
feels right, because everything after inherits it.

**Pass 2 — three different openings.**
Ask for three genuinely different treatments of the first viewport — not three variants
of one idea. Each must answer *what is this / why does it exist / what do I do* inside
one screen. Pick one. Say why, so the reasoning carries forward.

**Pass 3 — the rest of the homepage.**
Now ask it to carry the remaining movements of the argument in `mission.md`, in whatever
composition it judges right. This is the point at which a section count and an order
should be *proposed to you*, rather than handed down. If it proposes an order you
disagree with, argue about the order — don't just overwrite it with your own.

**Pass 4 — the supporting pages.**
How it works, who it's for, pricing, our story, waitlist. Same system, composed for each
page's job.

**Pass 5 — mobile.**
Composed, not stacked. Worth asking for explicitly; it is the thing most likely to be
skipped.

---

## What to resist

The failure mode last time was a brief that specified the answers — headlines, section
order, which photograph went where, type sizes in pixels, motion durations in
milliseconds — and then told the builder not to stop and ask. It got exactly what it
described, which was a transcription rather than a design.

So when you are tempted to write the headline yourself in the prompt: don't. Write the
*constraint* instead. "The first screen must make a visitor understand they can just
talk" is a brief. "YOU DON'T HAVE TO WRITE YOUR LIFE DOWN. TALK." is you doing the work
and then being disappointed that nobody did it for you.

The exception is `mission.md`. That language is already yours and already right — it is
content, not composition, and it should be protected rather than regenerated.

---

## Before production, decide four things

These are in §9 of the brief. None of them are design questions.

1. **The book is teal**, the site is brown and cream. Re-shoot the binding, give teal a
   deliberate role, or show the book so it doesn't fight the palette.
2. **One typeface story.** Source Serif 4 + Figtree is what's licensed and installed;
   the guideline says Recoleta + Montserrat; the old landing page used Cormorant
   Garamond. Four answers exist. Pick one.
3. **One token source.** Brand colours are declared twice — `theme.ts` and
   `greenfield.css`. Collapse to `theme.ts`.
4. **The 20 contemporary photos.** Give them a job or retire them.

---

## When the design comes back

Build it on `src/styles/theme.ts` and `src/components/ui/primitives.ts` — the original
architecture — and delete `greenfield.css` page by page as you go. `code-conventions.md`
explains why, with examples.

Keep `qa/greenfield/` running throughout. It tests behaviour rather than appearance, so
it will tell you what a new design broke.
