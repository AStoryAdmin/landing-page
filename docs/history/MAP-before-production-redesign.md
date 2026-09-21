# A Story — code map

92 files, ~19,100 lines. Two strata, both kept deliberately:

- **the original codebase** (2026-09-13 to 09-15) — styled-components against a central
  theme, a real primitives layer, heavily documented. This is the house style. See
  [code-conventions.md](docs/code-conventions.md).
- **the current marketing pages** (`src/design/a-story-greenfield/`, 09-19) — what the
  site serves today, written on a separate 2,604-line CSS file that bypasses the
  original architecture.

Three intermediate rewrites were removed. See *Strata* below.

Run it: `npm ci`, then `npm run dev`. Node 22 or 24 both work.
Production: `npm run build:static` (Vite build + Playwright prerender of 20 routes).

---

## The one thing to know first

**There are two styling systems, and they do not share tokens.** This is the single
biggest thing to fix, and it is a regression — the original had one.

| | Used by | Colors defined in |
|---|---|---|
| **Plain CSS**, `gf-` prefixed | Every marketing page (`src/design/a-story-greenfield/`) | `greenfield.css` `:root` |
| **styled-components** | Retained functional components (forms, reader, legal, shared-story pages) | `src/styles/theme.ts` |

The same five brand colors are declared twice, independently:

```
greenfield.css          theme.ts
--gf-brown:  #3b291d    palette.deepBrown: '#3B291D'
--gf-cream:  #f3ebde    palette.cream:     '#F3EBDE'
--gf-orange: #b85327    palette.terracotta:'#B85327'
--gf-gold:   #eac668    palette.gold:      '#EAC668'
--gf-sand:   #f0dda8    palette.sand:      '#F0DDA8'
```

Change a brand color in one place and half the site changes. This is the first
thing to fix in any redesign — collapse to one source of truth.

Also note: `theme.ts` defines `teal: '#3B291D'`. Teal was removed by pointing the
token at deep brown rather than by deleting its uses. Anything reading `color.teal`
silently renders brown, and the token name now lies.

---

## Routes

All wiring is in `src/App.tsx`. Home ships in the initial bundle; every other route
is a lazy chunk.

| Route | Component |
|---|---|
| `/` | `design/a-story-greenfield/Home.tsx` |
| `/how-it-works` | `HowItWorks.tsx` |
| `/for-families` | `Families.tsx` |
| `/care-communities` | `Care.tsx` |
| `/organizations` | `Organizations.tsx` |
| `/pricing` | `Pricing.tsx` |
| `/our-story` | `OurStory.tsx` |
| `/start` | `Start.tsx` — the waitlist; every CTA on the site ends here |
| `/questions` | `Questions.tsx` + `faqData.ts` |
| `/guides`, `/guides/:slug` | `Guides.tsx`, `Guide.tsx` — content from `lib/guides.json` |
| `/terms`, `/privacy` | `components/terms.tsx`, `privacy.tsx` via `LegalLayout.tsx` |
| `/thanks` | `Thanks.tsx` — post-checkout, noindex |
| `*` | `NotFound.tsx` |
| `/p/:slug` | `components/publicStory.tsx` — no marketing chrome |
| `/contribute/:slug` | `components/contribute.tsx` — no marketing chrome |
| `/__design/a-story-home-vnext` | `PrivateHome.tsx` — noindex, absent from sitemap |

Seven legacy redirects (`/experience`, `/family`, `/your-story`, `/institution`,
`/story`, `/faq`, `/why-it-matters`) live in the `legacy` map in `App.tsx` and
preserve query strings and hashes.

Hosting rules are in `vercel.json`; the prerender route list comes from
`scripts/site-routes.mjs`.

---

## Where the facts live

Change these, not the components.

| What | File |
|---|---|
| Plans, prices, call allowances, book bundles | `src/lib/pricing.ts` |
| Chapter names, product questions | `src/lib/product.ts` |
| Checkout destinations and labels | `src/lib/checkout.ts` (deliberately unconfigured — routes to `/start` with the selected plan) |
| Waitlist submission, validation, dedupe, retry, mail fallback | `src/lib/leads.ts` + `components/ui/LeadForm.tsx` |
| Supabase client | `src/lib/supabase.ts` (credentials via `.env`, see `.env.example`) |
| Guide articles | `src/lib/guides.json` |
| FAQ content | `src/design/a-story-greenfield/faqData.ts` |
| Demo memory content | `src/lib/sampleMemory.ts` |
| Route list for SEO/prerender | `src/lib/sitePages.json` |
| Image dimensions | `src/lib/mission.ts` |
| Image provenance, captions, alt text, crops | `src/lib/assetRegistry.json` |

---

## Photography

Files live in `public/mission/`, named `<id>-640.webp`, `-1200`, `-1800`.
62 images × 3 widths. Rendered through `components/ui/MissionPhoto.tsx`, which reads
natural dimensions from `lib/mission.ts` and builds the srcset.

`src/lib/assetRegistry.json` is the catalog — 75 entries with source hash, natural
dimensions, derivative mapping, focal requirements, caption, alt text, era and
provenance. It is the most valuable file in the repo for design work. It is not
imported by the app; only build scripts read it.

Two distinct sets:

- **01–35** — archival. B&W film, faded 70s color, historical prints. This is the set
  the site actually uses.
- **41–52, S01–S08** — contemporary phone snapshots. Almost all marked
  "Approved reserve" and unused.
- **36–40, `book-closed`, `book-slipcase`** — the physical book object. **Teal**, which
  conflicts with the brown/cream web palette. Unresolved.

---

## Shared pieces

| File | Does |
|---|---|
| `design/a-story-greenfield/shared.tsx` | `Wordmark`, `Photo`, `Reveal`, `Invitation`, `BookStage` — the only shared presentation primitives |
| `components/ui/MissionPhoto.tsx` | Responsive image with registry-backed dimensions |
| `components/ui/Logo.tsx` + `logoPaths.ts` | Wordmark paths. The A-shaped symbol is not rendered anywhere |
| `components/ui/Seo.tsx`, `EditorialSeo.tsx` | Per-route metadata and structured data |
| `components/ui/RouteTransition.tsx`, `RouteErrorBoundary.tsx` | Route fade and per-route error recovery |
| `components/product/BookReader.tsx` | The book reader dialog — keyboard paging, focus return, story mode |
| `hooks/useActiveSection.ts` | Scroll-spy for in-page nav |
| `lib/lazyRoute.ts` | Lazy import plus hover preload |
| `styles/global.ts` | Global reset, skip link, focus rings |

---

## Homepage structure

`Home.tsx` is nine sections in fixed order, each a `gf-` class block:

```
gf-hero          photo 29    the proposition
gf-missing       photo 28    "what were they laughing about"
gf-conversation  photo 33    talk / listen / follow up
gf-context       photos 31,32 connected detail
gf-between       photos 02,04,03 → 27  milestone to everyday
gf-perspectives  photo 30    multiple recollections (deep brown chapter)
gf-together      photo 34    family contribution
gf-chronology    01,05,07,09,10,26,21,35
gf-present       photo 35    the archive continues
```

This maps one-to-one onto the eleven chapters of the original brief. If the page is
being redesigned, this order is the thing being replaced — it is a transcription of a
specification, not a composition that was arrived at.

---

## Build scripts

`scripts/` holds one-off asset generators alongside the two the build depends on.

Build chain: `gen-seo-files.mjs` → `tsc -b` → `vite build` → `prerender.mjs`.
Both read `site-routes.mjs`.

Everything else (`brand-assets`, `optimize-images`, `responsive`, `social-cards`,
`trace-logo`, `local-fonts`, `*-assets.mjs`) is a generator you run by hand when
source artwork changes. They read `assetRegistry.json` and write into `public/`.

`prerender.mjs` needs a Playwright Chromium matching the pinned `playwright` version.
If it fails with "Executable doesn't exist", run `npx playwright install chromium`.

---

## QA harness

`qa/greenfield/` holds runnable checks and their recorded results — accessibility
(axe), responsive matrix across 8 widths, lead-form contract tests against a local
fixture, checkout outcomes, static audit, motion. `qa/fixture-server.mjs` stands in
for Supabase so form tests never write real rows.

These are worth keeping through a redesign: they validate behavior, not appearance,
so they will tell you what a new design broke.

`qa/greenfield/verification.md` records the previous design's results.

---

## Strata

File dates separate three generations. `mtime` records the last edit, not creation, so a
file touched later may still be original in origin — `useMediaQuery.ts` and
`ProductViews.tsx` read as later but are imported by 09-15 code.

**Original — 09-13 to 09-15. Kept.**
`lib/` (pricing, product, checkout, leads, contact, supabase, seo, guides, mission,
lazyRoute, demoScripts, nodeText) · `components/ui/` (primitives, LeadForm, Seo,
EditorialSeo, legal, icons, Reveal, CarePhoto, ConversationPhoto, and the `.styles.ts`
files) · `components/` (contribute, publicStory, footer, guide, guides, notFound,
thanks, yourStory, demoPhone, flipBook) · `components/product/` · `hooks/` · `assets/`

**First rewrite — 09-16. Removed.**
`components/mission/` (8) · `design/a-story-vnext/` (19) · `components/home.tsx`,
`navbar.tsx`, `navbar.styles.ts`

**Later rewrites — 09-19. Partly removed.**
`design/a-story-mission-rebuild/` (25) removed · `design/a-story-greenfield/` (21) kept,
because it is what the site currently serves · `components/` page rewrites removed
(experience, family, faq, institution, organizations, pricing, story, start)

**Overwritten in place and not recoverable from this archive:** the original
`experience.tsx`, `family.tsx`, `faq.tsx`, `institution.tsx`, `story.tsx`, `start.tsx`,
`home.tsx` and `navbar.tsx`. Only the rewritten versions survive here. If the repo at
`github.com/AStoryAdmin/landing-page` has history from before 09-16, the originals are
there and worth recovering — they are the missing examples of how the original author
composed a page.

---

## History

`docs/history/` holds the superseded planning documents from earlier rebuilds.
They describe designs that no longer exist. `CHANGELOG.md` is the short version.

Removed in this cleanup, all recoverable from `A-Story-Greenfield-Rebuild.zip`: the two
rewrite design folders, `components/mission/`, the 09-16/09-19 page rewrites, the
committed `dist/`, and `qa/mission-rebuild/` (a full second copy of an older repo).
Removing them left the built bundle byte-identical.
