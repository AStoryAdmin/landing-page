# House style

Derived from the original codebase — the layer written before the rewrites, dated
2026-09-13 to 09-15. Everything quoted here is real code from this repo.

This is the standard to hold new work to, including whatever comes out of a redesign.

---

## Why this document exists

The repo contains three generations of code and they do not agree with each other.
The original layer and the rewrites differ on indentation, quote style, styling
approach, and — most importantly — on whether code explains itself.

Measured, comment lines as a share of the file:

| file | stratum | comments / lines |
|---|---|---|
| `lib/pricing.ts` | original | 80 / 243 — 33% |
| `lib/leads.ts` | original | 68 / 182 — 37% |
| `components/ui/LeadForm.tsx` | original | 31 / 283 — 11% |
| `design/a-story-greenfield/Home.tsx` | rewrite | 0 / 481 |
| `design/a-story-greenfield/greenfield.css` | rewrite | 3 / 2,604 |

The original is the standard. The rewrites are the drift.

---

## 1. A module header says why the module exists

Not what it does — that is readable from the code. Why it is here, what it replaced,
and what breaks if someone changes it carelessly.

From `lib/leads.ts`:

> Turning someone who wants this into a row we can act on.
>
> **THIS REPLACED A `mailto:` LINK**, which was the single most expensive thing on the
> site. Every "Gift a story" button opened the visitor's email client and asked them to
> compose a message — at the exact moment they had decided to buy. Almost nobody does
> that. The demo above it can be the most moving thing on the internet and it does not
> matter if the next click is Outlook.

A reader who has never seen the file now knows what it is for and why deleting it would
be expensive. That is the bar.

## 2. Load-bearing constraints get a ruled banner

A constraint that will cause real damage if violated is set off so it cannot be skimmed
past:

```ts
/**
 * What A Story costs.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THIS FILE MIRRORS THE APP. Every figure here is the one PricingScreen.js
 * shows and the one Stripe actually charges [...]. If a number changes there,
 * change it here. Nothing on this site is allowed to quote a price the app
 * does not honour.
 * ─────────────────────────────────────────────────────────────────────────
 */
```

Use the banner sparingly — it only works because it is rare. Reserve it for
cross-system invariants and for facts that cost money when they are wrong.

## 3. Record what an earlier version got wrong

When a decision reverses an earlier one, the comment says so and says why. This is what
stops the same mistake being made a third time.

`pricing.ts` again:

> An earlier version of this file invented a different model entirely — one-time
> "capture windows" [...]. It read well and none of it was true [...]. A marketing site
> that argues for pricing the product does not have is worse than one with no pricing
> page at all, because the first thing a buyer discovers after paying attention is that
> we were making it up.

## 4. Document failure modes by naming them

Not "handles errors." Name each thing that will actually happen and say what the code
does about it. `leads.ts` names three, each with its reasoning:

- the extra columns may not exist yet — so the first attempt sends everything and the
  retry sends the original four, and *"no lead is ever lost to a migration nobody ran"*
- the same person will submit twice — *"a duplicate is not a failure, it is the same
  human being asking again"*, reported as success
- the environment may have no Supabase at all — the caller gets `fallbackMailto`
  *"rather than a dead form on the page that matters most"*

## 5. Explain product decisions where they are implemented

`LeadForm.tsx` documents why the form asks for two things instead of five, and why it
asks for a phone number rather than an email:

> The thing we are asking them to believe is that A Story rings a person and has a
> conversation with them — so the first thing we do should be to ring them and have one.
> An email reply is a worse demonstration of the product than a call is.

The reasoning lives next to the code it constrains, so the next person to "improve" the
form by adding fields back has to argue with it first.

## 6. Name magic values, and say what they mean

```ts
/** Postgres unique_violation — the same person, asking again. */
const UNIQUE_VIOLATION = '23505';
```

## 7. Annotate type fields in human terms

```ts
export type Lead = {
    firstName: string;
    lastName: string;
    /** Optional now — the form asks for a phone number instead. */
    email?: string;
    phone: string;
    /** Who the archive is for, in their words. */
    giftFor?: string;
    /** A date it has to be ready by, if there is one. */
    neededBy?: string;
    note?: string;
    /** Which page and button this came from. */
    source: string;
};
```

## 8. Return results, don't throw

Outcomes that callers must handle are discriminated unions, so the compiler forces the
caller to deal with the failure path:

```ts
export type LeadResult =
    | { ok: true; alreadyKnown: boolean }
    | { ok: false; fallbackMailto: string; reason: 'unconfigured' | 'failed' };
```

---

## Styling architecture

**styled-components against one central theme.** `src/styles/theme.ts` is the single
source: `color`, `font`, `type`, `weight`, `leading`, `tracking`, `space`, `radius`,
`shadow`, `motion`, `layout`, `bp`, `media`. Nothing hardcodes a hex value.

**`components/ui/primitives.ts` is the design system** — 499 lines providing `Section`,
`Container`, `Eyebrow`, `Display`, `H2`–`H4`, `Lead`, `Body`, `Note`, `Button` with
variants, `Card`, `Grid`, `Split`, `Divider`, `Badge`, `StatNum`, `TextLink`. Section
backgrounds are a typed `Tone` union (`ivory`, `paper`, `wash`, `deep`, `brown`, `gold`,
`ivoryDeep`) rather than loose strings.

**Transient props** carry style variation: `$variant`, `$onDark`, `$center`, `$wide`,
`$narrow`, `$size`, `$tone`. The `$` prefix keeps them out of the DOM.

**Colocated `.styles.ts`** next to the component that uses them —
`contribute.tsx` / `contribute.styles.ts`, `publicStory.tsx` / `publicStory.styles.ts`.

**Section-divider comments** organise long style files:

```ts
/* ── Section grounds ──────────────────────────────────────────────────── */
```

### What the rewrites did instead

`design/a-story-greenfield/greenfield.css` is 2,604 lines of plain CSS on a `gf-`
prefix, redeclaring the five brand colours as `--gf-brown`, `--gf-cream`, `--gf-orange`,
`--gf-gold`, `--gf-sand` — a second, independent copy of what `theme.ts` already holds.
It uses none of `primitives.ts`. Every marketing page is written against these classes.

That is the architecture a redesign should be undoing, not extending.

---

## Naming and formatting

| | original |
|---|---|
| Indentation | 4 spaces |
| Quotes | single |
| Page components | lowercase, named for the route — `experience.tsx`, `family.tsx`, `institution.tsx`, `story.tsx`, `faq.tsx` |
| Shared components | PascalCase — `LeadForm.tsx`, `BookReader.tsx`, `MissionPhoto.tsx` |
| Style files | colocated, `<component>.styles.ts` |
| Data and services | `src/lib/`, one concern per file |

The rewrites use 2-space indentation and double quotes, and put pages in
`src/design/<codename>/` in PascalCase. Both conventions are currently live.

**There is no Prettier or EditorConfig in this repo**, and `eslint.config.js` carries no
formatting rules — only `js.recommended`, `tseslint.recommended`, `react-hooks` and
`react-refresh`. That is why the two styles could diverge without anything complaining.
Adding a Prettier config set to 4-space / single-quote would pin the original convention
and reformat the rest to match in one pass.

---

## Applying this to new work

1. Pick one convention and enforce it mechanically — Prettier, committed, in CI.
2. New presentation code goes through `primitives.ts` and `theme.ts`. If a primitive is
   missing, add it there rather than writing a one-off class.
3. Delete `greenfield.css` as its pages are rebuilt. Do not grow it.
4. Every module gets a header saying why it exists. Every reversed decision gets a note
   saying what was wrong before.
5. Business facts stay in `src/lib/` with the banner rule intact — `pricing.ts` mirrors
   the app, and that must stay true.
