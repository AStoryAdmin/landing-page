# A Story — production redesign

Completed locally on 20 September 2026. Production preview: http://127.0.0.1:4173/

## Creative concept

A life is more than its milestones. One family photograph opens into a conversation, then a memory with several attributed perspectives, then an archive that continues into today. The physical book is an optional chapter drawn from that archive.

The design adapts the personal-site references through substantial, quietly edged buttons; compact navigation; Figtree for the interface; Source Serif 4 for editorial emphasis; and selective terracotta highlights. Brown and cream remain the web palette. Photographs keep their natural proportions, and the page alternates intimate imagery, strong statements, documentary voices and an open timeline.

## Material changes

Rebuilt Home and redesigned all supporting marketing pages, pricing, start, guides, FAQ, legal presentation and fallback pages. The functional How it works workbench, editable example memory, archive search, family contributions and book reader remain usable. The header supports mobile focus containment, Escape and focus return. The book offers page and continuous reading modes, with one page on narrow screens.

Consolidated active styling into the original styled-components architecture and shared theme. Removed the separate global greenfield stylesheet, retired its former page directory and removed misleading teal token aliases. Preserved the router, lazy chunks, SEO/prerender, shared components, error boundaries, product facts, plan prices, legal wording and standalone sharing/contribution service contracts.

Fixed the existing fallback-email mismatch: a failed demo or waitlist request now uses its corresponding email subject rather than always the gift subject.

## Assets

Restored 189 responsive derivatives from 63 supplied photos and nine transparent book files. Created 19 social-sharing cards using those assets, existing licensed typography and the approved wordmark. No new AI-generated photography was introduced.

## Completed routes

Home; How it works; For families; Care communities; Organizations; Pricing; Our story; Start; Questions; Guides and all seven articles; Privacy; Terms; Thanks; NotFound. Standalone public-story and contribution routes retain their existing service-backed behavior. All seven legacy redirects remain. The private design route stays noindex.

## Verification

- Full lint, TypeScript/Vite production build and all 20 prerendered snapshots passed.
- Seven lead-contract test groups passed, including fallback intent, phone normalization, optional email, duplicates and schema fallback.
- 147 responsive checks: 21 routes at 320, 390, 768, 1024, 1280, 1440 and 1600 pixels; no detected horizontal overflow, duplicate main/H1 or broken loaded images.
- 38 axe-core audits: all 19 public pages at 390 and 1440 pixels; zero detected WCAG 2 A/AA or WCAG 2.1 AA violations after correcting four small-text contrast issues. This is automated evidence, not a claim of exhaustive accessibility certification.
- Browser-tested memory progression/editing, archive search, contribution insertion, keyboard tabs, plan/bundle continuity, mobile navigation and native book dialog.
- Local fictional fixtures exercised success, duplicate, schema fallback, request failure/retry, public archives and contribution failure/retry. No live customer data was submitted.
- Static checks validated 366 asset references and protected source comparisons. Production HTTP checks passed 19 public routes, seven redirects with query parameters, and 47 served asset URLs.
- Production browser smoke test confirmed the rendered homepage and mobile focus loop/Escape restoration. Reduced-motion overrides are present in the shared styles and reader; no content depends on an entrance animation.

Evidence lives in `qa/redesign/browser-results.json`, `preserved-contracts.json` and `production-http.json`. Re-run local checks with `npm run check`. Historical greenfield visual scripts were not counted as current QA.

## Remaining launch configuration

Only `.env.example` was supplied. Live waitlist, shared-story and contribution services need the intended Supabase URL/key and corresponding deployed schema/policies. These service states were verified against local fixtures, not a live production backend. Checkout remains intentionally routed to the waitlist; no payment provider has been activated.

The production output is in `dist/`. Hosting and domain deployment have not been performed. The local preview must be running for its link to work.
