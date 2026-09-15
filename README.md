# A Story — landing page

Marketing site for A Story.

**The buyer is the gift giver.** Someone buys A Story as a present for a parent
or grandparent, sends one link, and the whole family ends up with the archive
and the printed book. Every page is written for that person — what they hand
over, how little work it is for them, and every reason they might talk
themselves out of it. Organizations and care communities are real but secondary
audiences with their own pages.

React 19 · TypeScript · Vite · styled-components · React Router · Supabase.

**The frame is "the everyday goes undocumented", not "the window is closing".**
The site used to argue urgency — 1.4B people over 60, 10K Americans turning 65
a day, a last Christmas to ask. That is the case every product in this category
makes, and it contradicted the product: a record that keeps growing cannot also
be a race against a deadline, and a documentary of many voices needs everyone
alive and contributing. What leads now is what genuinely goes missing (the
ordinary talk, not the milestones), that A Story captures the life being lived
as well as the one behind it, that many voices sit on the same moment, and that
the book is a chapter rather than an ending. `/family` carries the full
argument; every other page is written against it. Urgency is not banned — it is
just never the reason to buy.

**There is an app, and the storyteller never has to operate it.** Both the
buyer and the storyteller install A Story, but the conversations happen over a
*phone call*: setup is one-time and someone else can do it, after which the
phone rings and they answer. Copy must not say "no app to install" — that was
true once and is not now. The claim to make is "they just answer the phone",
which is stronger anyway.

**The chapters are the app's, not ours to invent.** `src/lib/product.ts`
mirrors `phone-app-main/src/data/eras.js` — eleven named chapters, 504
questions, the depth ladder, and the sensitive-question line. The site used to
say "childhood, school years, career, family, legacy", which was a
plausible-sounding list that was nobody's actual product. The real one is both
true and better copy: "Work & making a living" rather than "Career" because
most of the women this exists for never had one; "From the family" because
somebody else's account of the same afternoon is what makes it a documentary
rather than a diary. `/experience#chapters` shows all eleven with the reasoning.

**A memory card is the summary, not the whole record.** Every conversation is
kept in three layers — the card you skim, the full verbatim transcript beneath
it, and the voice highlights kept as audio. The printed book is the edited
version of the first layer. Say all three; the site used to imply only the
card existed.

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
descriptor) is a separate path purely so the approved light and dark colorways
can be applied. **The geometry is never altered** — the guideline forbids
compressing, distorting, restructuring or recoloring the logo's internals, and
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

### Color rules worth knowing

Two are enforced by the audit and easy to break by accident:

- **Warm Gold is not a text color.** At 13px it measures 4.33:1 on Deep Teal
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

**This site quotes the app's prices, and nothing else.** Every figure lives in
**`src/lib/pricing.ts`**, which mirrors `phone-app-main/src/screens/PricingScreen.js`
and `src/lib/callUsage.js`. If a number changes there, change it here. The site
is never allowed to quote a price the app does not honour.

| Plan | Price | Metered |
| --- | --- | --- |
| Free | $0 | 3 guided questions a day, no calls, unlimited writing |
| Trial | free, 3 days | Everything, no card. Falls back to Free. |
| Individual | $119/yr · $154 with the book | 90 min of guided calls a month |
| Family | $229/yr · $319 with 3 books | 200 min a month, shared across 3 storytellers |
| Express | $79 once, ~30 days | 140 min · first 40 book pages included |
| Monthly | $19.99/mo | Same as Individual, billed worse on purpose |
| Book | $69 for 40 color pages | then $0.75/page color, $0.35 B&W |

The shape, and why it holds:

- **The meter is AI call minutes**, because that is the only thing here with a
  real marginal cost. Writing your own memories is never metered on any plan,
  including Free — charging for that would meter the wrong side of the product.
- **Nobody is charged per family member.** Plans count *storytellers*, since
  minutes scale with them. Everyone else — reading, correcting, adding photos,
  recording their own version of the same afternoon — is free and unlimited.
- **Express is the gift plan.** It is the only one that does not renew, which
  is what makes it giveable without saddling the recipient with a subscription.
- **The book is unbundled but offered as a bundle**, because some people want a
  year of recording and to decide about the object later.

**The promise is "your recordings are always yours to keep — even if you
cancel."** Cancelling drops the account to Free; nothing is deleted or locked.
That sentence is the app's own, which is exactly why the site can use it.

### A warning, learned the expensive way

An earlier version of this file argued a completely different model — one-time
"capture windows", *pay to capture never to keep*, no free tier, a $150
headline — and none of it existed in the product. It was well argued and it was
fiction. A marketing site that reasons its way to pricing the product does not
have is worse than one with no pricing page, because the first thing an
attentive buyer discovers is that we were making it up.

If the site and the app disagree again, **the app wins** — it is the thing that
actually charges the card.

**Grandfathered users.** Anyone who came in under an earlier offer keeps it.
That promise is in the terms (section 9), not just in an email. It is a *closed
cohort*, not a tier, and deliberately nothing on the pricing page says so —
publishing it would invite everyone to ask. Pin the cutoff date somewhere
durable before the cohort starts growing by accident.

**Still to validate:** the plans are sized against an estimate of voice-AI cost
per minute. `api_usage` in the app already logs `audio_seconds` and `cost_usd`
per call, so the real number is one SQL query away. Nobody has run it, and the
annual plans' margin depends entirely on it.

## How the product is allowed to be described

**A Story is not a memoir to finish. It is a story to keep and carry on.** That
is the company's own line, and it is a constraint on copy rather than a slogan
to quote. Every other product in this category is a project with a deadline,
and the deadline is a person: get it written down before it is too late, print
the book, done — which means the moment the book is printed the work is over
and everything after it has nowhere to go. This one is a journal, an
autobiography and a memoir at once, and none of the three ever closes.

Practically, that rules out a shape of sentence that is very easy to write:

- Never head a section, a FAQ or a commitment with cancellation, expiry, a
  deadline, or what is lost. `FOREVER` in `src/lib/pricing.ts` used to open on
  *"what happens the day you stop paying"* and the pricing page had a band
  headed *"What happens if you stop paying"*. Every sentence in them was true,
  and the frame was still wrong: it centred an ending on a product whose entire
  argument is that there isn't one.
- Say what a plan **buys** instead — A Story doing the asking: calling,
  listening, following up. A plan is a service you switch on and off, never a
  lease on your own archive. Switching it off pauses the asking and nothing
  else.
- Keep the kept things in the present tense: the app is yours, the archive is
  still growing, the family is still adding, you can print another book in five
  years from the same archive.
- **Legal pages are the exception.** `terms.tsx` and `privacy.tsx` state plainly
  that cancelling returns the account to Free and that nothing is deleted,
  because in those two files accuracy outranks framing.

The home page section `#what-it-is` and the pricing band `#forever` are where
this argument is made explicitly; `family.tsx` carries the contrast card that
names the usual approach and rejects it.

## Calls to action

**Nothing is on sale, and every button says so.** Checkout does not work yet —
every row in `LINKS` is empty, and the app's webhook cannot grant a plan to a
buyer who has no account (the reasoning is at the top of
`src/lib/checkout.ts`). So a button reading "Buy" or "Choose Individual" would
promise a transaction that cannot happen. Until a Payment Link goes in, the
site asks for a place on the waitlist, which is a thing we can honour.

Two constants in **`src/lib/checkout.ts`** carry every conversion path:

| Constant | Where it goes | Used by |
| --- | --- | --- |
| `WAITLIST_LABEL` / `WAITLIST_HREF` | `/start` | Every primary call to action, ~70 of them |
| `DEMO_HREF` | `/start?intent=demo` | "Book a demo", including the organization and care-community pages |

`buyLabel(id, live)` falls back to `WAITLIST_LABEL` whenever that plan has no
Payment Link, so **switching the site from waitlist to selling is editing one
file**: paste the links into `LINKS` and every button changes wording and
destination together.

`/start` is the only form. It asks for a name and a phone number, with email
optional — see **`src/components/ui/LeadForm.tsx`** for why a number rather
than an address — and writes to `waitlist_signups` through
**`src/lib/leads.ts`**.

`src/lib/contact.ts` still defines the `mailto:` constants, but they are no
longer calls to action: they are the fallback `leads.ts` hands back if the form
cannot save, and the footer's "Talk to us". An earlier version of this site
made every conversion path a `mailto:`, which is the most expensive thing a
page can do at the moment somebody decides to act.

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
element, `prefers-reduced-motion` honored throughout, keyboard controls on the
album spread, labeled scrollable regions for wide tables, and a compact
non-3D album layout below 700px.

---

## Route transitions

`src/components/ui/RouteTransition.tsx` handles what happens between pages, and
it is fussier than it looks. Three things bite here, all documented in the file:

- The global stylesheet needs `scroll-behavior: smooth` for in-page anchors,
  which turns a programmatic `scrollTo(0, 0)` into an animated ride back up
  through the page you just left. Two things are needed to suppress it, and
  either alone still animates: `scrollTo` must be passed `behavior: 'instant'`
  (`'auto'` means "use the CSS value", i.e. smooth), **and** the temporary
  inline `scroll-behavior: auto` must be followed by a computed-style read,
  because Chrome otherwise answers `scrollTo` from the style cache it built
  before the assignment. This was the bug that made an apparently-correct fix
  do nothing.
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
- **Social import is on the site as "in development" and must stay labelled.**
  `/experience#next` describes linking Instagram/Facebook and building books by
  year. Nothing on this site may describe it as something a buyer can use
  today, and no package is priced against it. `/privacy` carries the matching
  paragraph on imported content.
- The two program plans stay quoted rather than listed.
- **Every buy button goes to `/start`, and none of them is a mailto.** The
  primary call to action used to open the visitor's email client — 42 buttons
  across 8 pages, all asking somebody who had just decided to buy to go and
  compose a message. `/start` is a form-first conversion page that also
  serves as the landing page for paid traffic. It writes to Supabase's
  `waitlist_signups` (created by the app's `supabase/waitlist.sql`), and
  `supabase/lead-fields.sql` here adds the four columns manual fulfilment
  needs. The site works whether or not that migration has been run —
  `src/lib/leads.ts` retries with the original four columns and folds the
  rest into free text. Stripe, when it exists, still wins: `checkoutFor`
  returns a Payment Link if one is configured and `/start?plan=…` otherwise.
- **There is no gift card, and the site must not invent one.** The app has no
  gift infrastructure at all: no code, nothing to redeem, nothing that arrives
  in an envelope. The site used to promise a printed card in eight places and
  ship a `/card` page that generated one; the page is deleted and the copy now
  says what a buyer actually hands over, which is an archive somebody else has
  already set up with the first call already booked.
- The terms now promise a refund for a gift that goes unused, and the privacy
  policy describes the buyer/storyteller split. Both need a lawyer's eye before
  launch; they are written to be honest, not to be authoritative.
- Testimonials are hard-coded in `src/components/home.tsx`, and the
  announcement strip above the navbar is in `src/components/navbar.tsx`.
- The book price ($79–$129) appears on `/experience`, `/pricing` and `/faq`.
  Change all three together.
