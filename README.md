# A Story — landing page

Marketing site for A Story.

**The buyer is the gift giver.** Someone buys A Story as a present for a parent
or grandparent, sends one link, and the whole family ends up with the archive
and the printed book. Every page is written for that person — what they hand
over, how little work it is for them, and every reason they might talk
themselves out of it. Organizations and care communities are real but secondary
audiences with their own pages.

React 19 · TypeScript · Vite · styled-components · React Router · Supabase.

---

## Getting started

```bash
npm install
cp .env.example .env      # fill in the Supabase keys
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Regenerates `sitemap.xml`/`robots.txt`, typechecks, builds to `dist/` |
| `npm run build:static` | `build` plus a static HTML snapshot of every route (see **Prerendering**) |
| `npm run preview` | Serves `dist/` locally on :4173 |
| `npm run lint` | ESLint |
| `npm run assets` | Regenerates favicons, icons, the social card and the manifest from the traced logo |
| `npm run logo` | Re-traces the logo artwork out of the brand source (see **The brand system**) |
| `npm run images` | Converts `src/assets` photography to WebP |
| `npm run seo` | Regenerates `public/sitemap.xml` and `public/robots.txt` |
| `npm run a11y` | axe-core WCAG 2.1 A/AA audit of every route (needs `npm run preview` running) |
| `npm run shots` | Screenshots every route at desktop and phone widths |

### Environment

| Variable | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
| `VITE_SITE_URL` | Canonical origin — used for canonical tags, OG URLs and the sitemap. Defaults to `https://astoryapp.com`. |

Supabase now only powers the standalone `/p/:slug` and `/contribute/:slug`
flows; the marketing pages do not touch it. Without the variables those two
routes show their "not found" state and everything else is unaffected.

---

## The brand system

Everything visual resolves back to **`src/styles/theme.ts`**, which implements
the *A Story Brand Guideline, Version Teal (2026)*. No component should contain
a raw hex value.

| Token | Value | Role |
| --- | --- | --- |
| `color.primary` | `#0F4A58` Deep Teal | Primary ground and headings |
| `color.accent` | `#B85126` Terracotta | Calls to action, emphasis |
| `color.gold` | `#E0A03F` Warm Gold | Highlight — **fills and display type only** |
| `color.goldText` | `#EBC86A` Vintage Brass | Gold *text* on dark grounds |
| `color.goldOnLight` | `#8A5A12` | Gold-toned text on light grounds |
| `color.body` | `#4C4C4C` Charcoal | Body copy |
| `color.ivory` | `#F3EBDD` Soft Ivory | Page ground |

The guideline's alternate **Version Terracotta** palette is preserved in
`palette.terracottaVersion` — switching versions is a change to one file.

**Type**: Cormorant Garamond (display), Figtree (body), Caveat (script accent),
on the guideline's scale — 84 / 60 / 48 / 32 / 24px, rendered fluidly with
`clamp()` so the ratios hold from a 360px phone to a 1600px desktop.

**Logo**: the site ships the guideline's own artwork as vector, not a lookalike
rebuilt from a web font. `scripts/trace-logo.mjs` traces the approved lockups
out of the Illustrator source into `src/components/ui/logoPaths.ts`, and
`src/components/ui/Logo.tsx` renders them:

| Variant | What it is | Used by |
| --- | --- | --- |
| `simple` | Simplified Horizontal Logo — mark + wordmark | Navbar (default) |
| `horizontal` | Horizontal Logo — mark + wordmark + descriptor line | Footer |
| `mark` | The mark alone | Favicons, icons |

Each element (the mark's strokes, the gold waveform, the "A", "Story", the
descriptor) is a separate path purely so the approved light and dark colourways
can be applied. **The geometry is never altered** — the guideline forbids
compressing, distorting, restructuring or recolouring the logo's internals, and
the safe zone is carried as padding on the component. `npm run assets` derives
the favicons, touch icons, PWA icons and social card from the same paths, so a
favicon cannot drift out of step with the navbar.

To regenerate after an artwork change, render the two lockups out of the brand
source and re-trace:

```bash
node scripts/pdfshot.mjs <guideline.pdf> /tmp/a 2 12 "95,1362,270,115"   # horizontal
node scripts/pdfshot.mjs <guideline.pdf> /tmp/b 2 16 "229,811,178,66"    # simplified
node scripts/trace-logo.mjs /tmp/a-p2.png /tmp/b-p2.png
npm run assets
```

(The Illustrator file is PDF-compatible, so `.ai` can be passed directly.)

### Colour rules worth knowing

Two are enforced by the audit and easy to break by accident:

- **Warm Gold is not a text colour.** At 13px it measures 4.33:1 on Deep Teal
  and 1.91:1 on Soft Ivory. Use `goldText` on dark, `goldOnLight` on light.
- **Terracotta text uses `accentText` (`#9E4420`)**, not `accent`. Full
  Terracotta is 4.13:1 on ivory — fine as a fill, short of AA as small text.

---

## Structure

```
src/
  styles/theme.ts        brand tokens — the single source of truth
  styles/global.ts       reset, focus rings, skip link, reduced motion
  components/ui/         primitives (Section, Button, Card…), Logo, icons, Seo, Reveal
  components/*.tsx       one file per route, with its own *.styles.ts
  lib/seo.ts             per-route head tags + JSON-LD builders
  lib/supabase.ts        lazily constructed client
  hooks/                 shared hooks
scripts/                 build and maintenance tooling (see the table above)
```

Routes: `/`, `/experience`, `/family`, `/organizations`, `/institution`,
`/pricing`, `/story`, `/faq`, `/privacy`, `/terms`, plus the standalone
`/p/:slug` (shared archive) and `/contribute/:slug` flows and a 404.

`/family` is the "why it matters" case for the gift buyer; `/experience` is what
the recipient receives.

Only the home page ships in the initial bundle; every other route is a separate
chunk fetched on navigation.

## Pricing

One number, defined once in **`src/lib/pricing.ts`**, read by the home page,
the pricing page, the experience page and the FAQ. The file also records *why*
the pricing is shaped this way — a one-time gift price rather than a free
archive plus a paid book — which matters more than the figure.

**The figure itself is a recommendation, not a decision.** Validate it against
your cost of goods and change the constant.

**Grandfathered users.** Anyone who came in under the earlier free offer keeps
it — that promise is in the terms (section 9), not just in an email. Note the
distinction: that is a *closed cohort*, not a free tier. Deliberately nothing on
the pricing page says so, because publishing it would invite everyone to ask,
and a standing free tier would undo the reason the pricing is shaped this way.
Pin the cutoff date somewhere durable before the cohort starts growing by
accident.

## Calls to action

There is no signup form. Every conversion path on the site is a `mailto:` with
a pre-filled subject line, defined once in **`src/lib/contact.ts`** — `gift`,
`giftFor(occasion)`, `organization`, `community` and `general`. An incoming
message therefore already says which page and which intent it came from.

When a checkout or booking flow exists, change those five constants and every
button on the site follows. Nothing else references a destination.

---

## Prerendering

`npm run build:static` loads the production build in headless Chromium and
writes a finished HTML snapshot to `dist/<route>/index.html`. Social crawlers
(LinkedIn, Slack, X, iMessage) do not run JavaScript, so without this every
shared link shows the same generic card. With it, each route carries its own
title, description, OG image, canonical URL and JSON-LD.

Your host must serve static files *before* the SPA fallback — Netlify
(`public/_redirects`) and Vercel (`vercel.json`) both do, as does nginx with
`try_files $uri $uri/index.html /index.html`. Note that `vite preview` does
not: it answers `/organizations` with the SPA shell, and only
`/organizations/` with the snapshot. That is a preview-server quirk, not a
build problem.

Prerendering needs the `playwright` devDependency. Plain `npm run build` never
touches it, so CI without browsers still works.

---

## Accessibility

`npm run a11y` runs axe-core (WCAG 2.1 A and AA) over every route at 1440px and
390px. The site currently reports **zero violations**. Please keep it there —
the audit takes about a minute.

Also in place: a skip link, one visible focus ring on every interactive
element, `prefers-reduced-motion` honoured throughout, keyboard controls on the
album spread, labelled scrollable regions for wide tables, and a compact
non-3D album layout below 700px.

---

## Route transitions

`src/components/ui/RouteTransition.tsx` handles what happens between pages, and
it is fussier than it looks. Three things bite here, all documented in the file:

- The global stylesheet needs `scroll-behavior: smooth` for in-page anchors,
  which turns a programmatic `scrollTo(0, 0)` into an animated ride back up
  through the page you just left. The reset temporarily suspends it.
- The component must sit **outside** `<Suspense>`. Inside it, a lazy route chunk
  suspends the subtree, so it unmounted on every navigation and its effect never
  ran at all.
- Chrome's scroll anchoring re-pins the position when the route placeholder is
  swapped for real content, which left every navigation a few dozen pixels below
  the top. Disabled on `body`.

Anchors on other pages (`/experience#book`) belong to a chunk that has not
loaded yet, so the target is polled for briefly rather than abandoned on the
first frame.

---

## Known follow-ups

- `src/assets/astoryDaniel.webp` and `astoryBao.webp` are generated brand
  placeholders. Replace them with real headshots (600×600) and remove the two
  names from `SKIP` in `scripts/optimize-images.mjs`.
- Pricing shows "Free" for families during early access and "Quoted" for the two
  programme plans. When list prices exist, edit `PLANS` at the top of
  `src/components/pricing.tsx` — nothing else needs to change.
- The gift card shown on the home page is rendered from CSS, not a photograph,
  so it always matches the brand. The real artefact a buyer receives does not
  exist yet — building it is the obvious next step, and the copy promises it.
- The terms now promise a refund for a gift that goes unused, and the privacy
  policy describes the buyer/storyteller split. Both need a lawyer's eye before
  launch; they are written to be honest, not to be authoritative.
- Testimonials are hard-coded in `src/components/home.tsx`, and the
  announcement strip above the navbar is in `src/components/navbar.tsx`.
- The book price ($79–$129) appears on `/experience`, `/pricing` and `/faq`.
  Change all three together.
