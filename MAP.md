# A Story — current code map

Updated 21 September 2026 after Pass 11, the site-wide redesign (see `PASS-11-REPORT.md`). Earlier maps are preserved in `docs/history/`.

## Architecture

React 19, TypeScript, Vite, React Router and styled-components. Home is eager; supporting pages and the three-call demonstration remain lazy. `src/lib/brand.json` defines the seven exact brand colors. `src/styles/theme.ts` maps those colors into semantic roles and defines typography, spacing, controls and motion. `src/styles/global.ts` contains the reset, responsive gutters and accessibility defaults.

Active marketing pages live in `src/pages/site/`. The former `src/design/a-story-greenfield/` directory and its global `greenfield.css` were retired. Some `gf-` class names remain as scoped markup hooks, not a separate global styling system.

- `kit/kit.styles.ts`: the site kit every route is built from — frame, section grounds (ivory, paper, sand, night, teal) with their ink/label colours, serif `Title`/`Statement`, the three actions (primary, secondary, text), the matted `PrintMat`, the gold keyline `Plate`, the rising cream edge.
- `kit/kit.tsx`: `Picture`, `Print` (archival prints matted, contemporary bare), `PageOpening` (the standard route opening) and `Invitation` (the closing marquee on narrative routes). `kit/reveals.ts`: the quieter shared motion for secondary routes. `kit/Situations.tsx`: the professional-audience composition (Care, Organizations).
- `chrome.styles.ts`, `Header.tsx`, `Footer.tsx`: header transparent over the home opening and tucking away on scroll; footer as the back of the namecard; the one "About the examples" disclosure lives there.
- `Home.tsx` and `home/`: `Intro` (full-screen teal namecard, 1952 → Today), `Hero`, `WhatGetsLost`, `ThreeCalls` (teal, pinned, in the app's call screen), `EveryVoice` (family additions arrive in the app), `FamilyBook` (interactive book — the timeline), `StepOne` (steps shown in the app).
- `app/`: the A Story app rebuilt from the founder's Figma — `Phone.tsx` (device frame), `screens.tsx` (call, memory, home, incoming, archive), `tokens.ts`.
- `src/lib/homeExamples.ts`: the homepage's fictional family and the photo slot for each example; `docs/image-prompts.md` has the generation briefs.
- Routes: `HowItWorks.tsx` (sticky-phone walkthrough, call player, folded transcripts, depth stairs), `Families.tsx` (five reasons), `OurStory.tsx` (founder essay, verbatim), `Compare.tsx` (/compare, content in `lib/landscape.ts`), `Pricing.tsx`, `Start.tsx`, `Care.tsx`, `Organizations.tsx`, `Questions.tsx`, `Guides.tsx`, `Guide.tsx`, `Thanks.tsx`, `NotFound.tsx`, `LegalLayout.tsx` + `legalPrimitives.ts`.
- `shared.tsx`: the header wordmark and the legacy `Photo`. `src/lib/scrollMotion.ts`: GSAP ScrollTrigger/SplitText and `useScene`; every scene is complete without motion.
- Retired in Pass 11: `pass7/`, `pass9/`, `system.tsx`, `pages.styles.ts`, `Pricing.styles.ts`, `HowItWorks.styles.ts`, `ProcessJourney.tsx`, `home/parts*`.
- `src/components/ui/Logo.tsx` and `logoGeometry.json`: one custom A followed by Story; shared geometry for browser and generated brand assets.

## Routes

`src/App.tsx` owns all route wiring and seven query/hash-preserving legacy aliases.

The marketing routes are Home, How it works, For families, Care communities, Organizations, Pricing, Our story, Start, Questions, Guides and seven guide articles. Privacy and Terms use the existing legal components through `LegalLayout.tsx`. Thanks and NotFound retain recovery paths. `/p/:slug` and `/contribute/:slug` keep their standalone service-backed layout. The private design route remains noindex and outside the sitemap.

`src/lib/sitePages.json`, `scripts/site-routes.mjs` and `scripts/prerender.mjs` drive metadata and 20 production snapshots. `vercel.json` retains hosting rewrites and redirects; `vite.config.ts` mirrors static routing in local production previews.

## Facts and service contracts

- `src/lib/pricing.ts`: exact plan prices, allowances and book bundles.
- `src/lib/product.ts`: product facts, chapters and questions.
- `src/lib/demoScripts.ts`: original Rosa, Errol and Joan scripts, unchanged in meaning and structure from the supplied refresh ZIP.
- `src/lib/checkout.ts`: intentionally unconfigured checkout destinations, carrying selected plans to Start.
- `src/lib/sampleMemory.ts`: Eleanor, Daniel and Maya; one continuous fictional example.
- `src/lib/leads.ts` and `src/components/ui/LeadForm.tsx`: validation, phone normalization, duplicate handling, optional email, schema fallback and retries. Email fallbacks now distinguish waitlist, gift and demo intent.
- `src/lib/supabase.ts`, `.env.example`, `supabase/`: existing service configuration and schema.
- `src/lib/guides.json`, `src/pages/site/faqData.ts`: guide and FAQ content.
- `src/components/terms.tsx`, `privacy.tsx`: preserved legal wording.

The retained UI primitives, error boundaries, lazy-route helper, original-record views, SEO components and native book dialog continue to support the redesign. `docs/code-conventions.md` remains the coding reference.

## Assets

`public/mission/` holds 189 derivatives from 63 supplied photographs, with source hashes in `handoff-manifest.json`. `scripts/restore-handoff-assets.mjs` reproduces them from the extracted handoff folder. Natural dimensions and captions remain in `src/lib/mission.ts` and `assetRegistry.json`.

`public/book-objects/` contains the supplied transparent book objects. Teal is now an active product/conversation color as specified by the definitive brief; earlier brown-only instructions are superseded.

Self-hosted Figtree and Source Serif 4 are retained with their licenses. `assets/render-fonts/` contains licensed TTF conversions for social-card rendering. `npm run social` regenerates 19 route-specific social cards from supplied photographs and the approved wordmark.

`scripts/brand-svg.mjs` shares the browser logo geometry and brand colors. `scripts/brand-assets.mjs` generates custom-A-only icons, and `scripts/social-cards.mjs` uses the complete single-A wordmark.

## Run and verify

```sh
npm ci
npm run dev
npm run check
npm run preview -- --host 127.0.0.1 --port 4173
```

`npm run check` runs lint, seven lead-contract test groups, the TypeScript/Vite build, prerender and `qa/definitive/production-contracts.mjs`. Current browser evidence and screenshots are in `qa/pass7/`; earlier visual evidence is historical. Source comparisons are regenerated by `qa/definitive/compare-sources.mjs`. `qa/fixture-server.mjs` supplies local fictional service states for browser QA; it is not production code. The lead-contract test remains active.

See `BUILD-REPORT.md` for the completed scope, verification and launch requirements.

## Pass 10 refinement

See `PASS-10-REFINEMENT.md` for the follow-up design and usability work. Home retains the Pass 10 scenes; its mobile timeline now reads vertically. Scroll scenes avoid pinning on short screens or when their content cannot fit. Supporting pages share the wider editorial frame and refined controls; the founder page uses open narrative sections. Current responsive and interaction evidence is in `qa/refinement/`.

- Shared: `app/CallPlayer.tsx` (the call as a playable film, Home + How it works); `home/WhereWeSit.tsx` (competitive teaser on Home).
