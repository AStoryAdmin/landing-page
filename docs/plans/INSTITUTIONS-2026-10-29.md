# Institutions page: book a demo, open to every kind of place, room for collaborations

Branch `institutions-page` (worktree `Desktop/a-story-landing-institutions`), cut from `origin/main` 3771031.
Asked by Daniel 2026-10-29 at night; he gave full permission and went to bed, so this plan is treated as
approved. Nothing is pushed or deployed: he reviews in the morning.

## Goal

1. `/organizations` is built around one action: **book a demo**. Every section moves the reader toward the form.
2. It speaks to **every kind of institution**, not mainly care. Healthcare is one door among equals, so a
   college, library, company or community group does not feel it landed on a care product.
3. There is a place to **propose a collaboration** (research, a co-hosted program, a heritage project,
   a grant, something else) that is not a demo request and reaches Daniel.
4. `/care-communities` gets a clear goal of its own: a care community books a demo **on that page**,
   instead of ending on the family "start free" close and bouncing to another page.

## Diagnosis (before)

- `/organizations`: the hero holds four large photo cards, so "Book a demo" sits above a very long object
  and the form is three sections down. Only four kinds are named (no schools, faith/cultural groups,
  associations). There is no path for anyone who wants to work *with* A Story rather than buy a program.
- `/care-communities`: "Book a demo" sends people to another page; the page ends on `<Invitation />`, whose
  line is the consumer one ("The archive is free... A plan adds A Story doing the asking") and whose button
  is the app start. The goal of the page is not on the page.
- Header "Also for" lists **Care communities above Institutions**, so healthcare reads as the main
  institutional audience.

## Acceptance criteria (pass/fail)

| # | Criterion |
|---|-----------|
| A1 | `/organizations` hero shows Book a demo as the primary action and Propose a collaboration as the second; the first screen at 1440x900 and 393x852 shows the primary button. |
| A2 | `/organizations` names at least six kinds of institution in equal tiles; care is one of them, not first. Each tile links to the form with its kind preselected (`?kind=…#book`). |
| A3 | Selecting a tile preselects the matching option in the demo form (existing `INSTITUTION_KINDS`). |
| A4 | `/organizations#collaborate` has a form (name, email, organization, kind of idea, the idea) that sends through `sendMessage` with `topic: "Collaboration: …"` and `source: "organizations:collaborate"`; on failure it offers the filled-in mailto. |
| A5 | `/care-communities` contains the demo form itself (`#book`), with the care kind preselected and `source: "care:demo"`; no `<Invitation />` consumer close; a link to `/organizations` for other kinds of place. |
| A6 | Header "Also for" lists Institutions before Care communities, and the Institutions line no longer reads as healthcare-only. |
| A7 | No new numbers, prices, counts or dates in copy. Existing promises kept word for word where reused ("within a working day", "private beta", "not a clinical assessment"). |
| A8 | `npm run lint`, `npm run build` (incl. prerender) and the existing contracts pass; no horizontal scroll at 768/1024/1728/393 on both routes. |

## Tasks

1. `DemoBooking`: accept `source` (default `organizations:demo`) and react to a changed `initialKind`.
2. `CollaborationForm.tsx`: new form on the contact function.
3. `/organizations` rebuilt: hero → who we work with (tiles) → night line → how a program runs + you decide
   → book a demo → propose a collaboration.
4. `/care-communities`: inline booking section replaces the BeginCard + Invitation close; checklist kept beside the form.
5. Header and footer order.
6. Verify: lint, build, contracts, screenshots before/after, overflow check, form submit with Supabase
   absent (falls back to mailto).

## Verification

| Task | Check | Result |
|------|-------|--------|
| 1–5 | `npm run check` (lint, contracts, routing, build + prerender 31 routes, production contracts) | PASS, exit 0 (local) |
| A1 | Book a demo in first screen, both routes, 1440x900 and 393x852 | PASS (y = 371 / 532 / 432 / 415) |
| A2/A3 | each of 6 tiles → kind preselected, #book scrolled to 80px; `?kind=School#book`, `?for=care` | PASS |
| A4 | collaboration form: validation, then fallback mailto with "Collaboration: A grant or funding partnership" (no Supabase locally) | PASS locally; **real email not tested** |
| A5 | care page: own form, care kind, no family close, door to /organizations | PASS |
| A6 | header + footer order; header pill and phone sticky bar say Book a demo on both routes, Start free elsewhere | PASS |
| A8 | no horizontal overflow at 768/1024/1728/393 | PASS |

Scripts: `node qa/institutions-2026-10-29/interact.mjs` and `node qa/institutions-2026-10-29/shoot.mjs <label>` against a dev server on :5191.
Screenshots (gitignored): `qa/institutions-2026-10-29/shots/before-*` and `after-*`.

## Open for Daniel (copy claims, unchanged from before this branch)

A fresh-eyes review flagged existing copy that may promise more than the beta does. Not changed without your call:

- "Daniel writes back within a working day" (demo form + booking room).
- "a link they sign up through", "Set per program", "ready to cite or exhibit", "We help everyone set it up" – do these institution features exist yet?
- "A list of names and phone numbers" reads like ordinary phone calls; the calls ring only in the iPhone app. Consider: "Each person needs an iPhone with the app; we help them install it."
