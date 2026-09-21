# A Story — current code map

Updated 20 September 2026 after the production redesign. The previous map is preserved in `docs/history/MAP-before-production-redesign.md`.

## Architecture

React 19, TypeScript, Vite, React Router and styled-components. Home is eager; supporting pages remain lazy. The shared theme in `src/styles/theme.ts` is the source of truth for color, typography, spacing, controls and motion. `src/styles/global.ts` contains the reset and accessibility defaults.

Active marketing pages live in `src/pages/site/`. The former `src/design/a-story-greenfield/` directory and its global `greenfield.css` were retired. Some `gf-` class names remain as scoped markup hooks, not a separate global styling system.

- `system.tsx`: shared page primitives and supporting-page styles.
- `chrome.styles.ts`: sticky header, mobile menu and footer.
- `pages.styles.ts`: audience, story, start, FAQ and guide layouts.
- `Pricing.styles.ts`, `HowItWorks.styles.ts`: page-specific presentation.
- `shared.tsx`: approved wordmark, responsive photography, invitation and book stage.
- `Home.tsx`: homepage composition and photograph-to-memory interaction.

## Routes

`src/App.tsx` owns all route wiring and seven query/hash-preserving legacy aliases.

The marketing routes are Home, How it works, For families, Care communities, Organizations, Pricing, Our story, Start, Questions, Guides and seven guide articles. Privacy and Terms use the existing legal components through `LegalLayout.tsx`. Thanks and NotFound retain recovery paths. `/p/:slug` and `/contribute/:slug` keep their standalone service-backed layout. The private design route remains noindex and outside the sitemap.

`src/lib/sitePages.json`, `scripts/site-routes.mjs` and `scripts/prerender.mjs` drive metadata and 20 production snapshots. `vercel.json` retains hosting rewrites and redirects; `vite.config.ts` mirrors static routing in local production previews.

## Facts and service contracts

- `src/lib/pricing.ts`: exact plan prices, allowances and book bundles.
- `src/lib/product.ts`: product facts, chapters and questions.
- `src/lib/checkout.ts`: intentionally unconfigured checkout destinations, carrying selected plans to Start.
- `src/lib/sampleMemory.ts`: Eleanor, Daniel and Maya; one continuous fictional example.
- `src/lib/leads.ts` and `src/components/ui/LeadForm.tsx`: validation, phone normalization, duplicate handling, optional email, schema fallback and retries. Email fallbacks now distinguish waitlist, gift and demo intent.
- `src/lib/supabase.ts`, `.env.example`, `supabase/`: existing service configuration and schema.
- `src/lib/guides.json`, `src/pages/site/faqData.ts`: guide and FAQ content.
- `src/components/terms.tsx`, `privacy.tsx`: preserved legal wording.

The retained UI primitives, error boundaries, lazy-route helper, original-record views, SEO components and native book dialog continue to support the redesign. `docs/code-conventions.md` remains the coding reference.

## Assets

`public/mission/` holds 189 derivatives from 63 supplied photographs, with source hashes in `handoff-manifest.json`. `scripts/restore-handoff-assets.mjs` reproduces them from the extracted handoff folder. Natural dimensions and captions remain in `src/lib/mission.ts` and `assetRegistry.json`.

`public/book-objects/` contains the supplied transparent book objects. Teal exists in the photographed object; the web interface uses brown and cream.

Self-hosted Figtree and Source Serif 4 are retained with their licenses. `assets/render-fonts/` contains licensed TTF conversions for social-card rendering. `npm run social` regenerates 19 route-specific social cards from supplied photographs and the approved wordmark.

## Run and verify

```sh
npm ci
npm run dev
npm run check
npm run preview -- --host 127.0.0.1 --port 4173
```

`npm run check` runs lint, seven lead-contract test groups, the TypeScript/Vite build, prerender and static production checks. `qa/redesign/` stores browser and preservation evidence from this run. `qa/fixture-server.mjs` supplies local fictional service states for browser QA; it is not production code. Older visual scripts under `qa/greenfield/` are historical and are not the current redesign verification suite; the lead-contract test remains active.

See `BUILD-REPORT.md` for the completed scope, verification and launch requirements.
