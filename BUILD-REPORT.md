# A Story — Pass 7 production rebuild

Completed locally, 20 September 2026. Preview: http://127.0.0.1:4173/

The direct rejection of the hero overrides the conflicting headline in the attached brief. This report supersedes prior design/QA claims. The old report is preserved in docs/history/BUILD-REPORT-before-pass7.md.

## 1. Retired presentation
The former Home structure, two-column kitchen-photo hero, headline, paired CTA row and italic note are removed. Old MemoryExample, ThreeCalls and JoanArchive presentation files were deleted. Baseline commit fdc6b71 preserves the earlier code.

## 2. New structure
Eight scenes now compose Home: ArchiveHero, MemoryLens, CallsCinema, ArchiveBloom, EasyAct, LivingTimeline, BookAtelier and TrustAndBegin. They live in src/pages/site/pass7/ with shared materials and entry helpers.

## 3. Preserved engineering
React/TypeScript, scoped styled-components, semantic tokens, responsive images, lazy routes, prerendering and service boundaries remain. AST checks confirm pricing.ts, product.ts, checkout.ts and demoScripts.ts match the supplied refresh ZIP. Lead behavior, editable-memory workbench and native BookReader remain. Hash navigation now preserves homepage interaction state.

## 4. Asset choices
Home uses approved photographs 34 (hero), 30 (memory), 31 (archive), 05 and 21 (past/present). Supporting pages use 01, 27, 32, 34 and 35. Books use transparent assets. Photo 33 is absent from the new Home presentation.

## 5. New visuals and brand
No generated photography or external stock was needed. Code-native visuals include mounted arches, archival notes, waveforms, contribution connectors and the open S-curve. All seven canonical colors remain unchanged. Figtree handles the interface; Source Serif 4 provides editorial emphasis. Nineteen social cards were refreshed.

## 6. Hero
“Every family has more to tell.” sits above a centered, mounted arch with a caption plaque, one CTA and a teal three-state conversation object. Heading, photograph and artifact enter in sequence. It has a different silhouette and hierarchy from the retired left-copy/right-photo hero.

## 7. Conversation cinema
Original Rosa, Errol and Joan scripts play inside large phones. One selected call advances; playback pauses offscreen. Typing pauses, arriving bubbles, transcript following and interview-depth progression tell the story. Pause, next, restart, replay and three saved-memory layers remain. Automatic completion tours the saved layers until user input. Narrow screens show one phone with descriptive selectors. Reduced-motion code disables automatic progression. Voice highlights clearly identify that no recording plays.

## 8. Archive scene
Joan’s memory grows through Paul’s date, Christine’s letters, Amy’s voice and an optional book. The full 14/6/23/4 archive, five entries, approval state, voice passage and eleven chapters remain behind a disclosure.

## 9. Living timeline
An open curved path connects past and present photographs, journal, autobiography and optional memoir. Mobile keeps that curve behind the stacked objects. The final line leaves room for what happens next.

## 10. Book
The warm atelier switches between transparent volume, cover and pages. Look inside opens the retained chapter reader. The black photographic rectangle and dark book stage are retired.

## 11. Navigation
Four primary links, a descriptive two-column More menu and a single waitlist CTA replace the crowded navigation. Controls have restrained depth and a brass lower edge. Mobile navigation contains focus and closes on Escape.

## 12. Supporting routes
How it works has a five-state storyboard, four roles, progressive chapters and a depth ladder. Families has three photographic motivations, attributed voice selection and a quiet memorial passage. Pricing leads with 90/200/140 call minutes and wide expandable plan rows. Our story keeps the founder writing and both team members. Care, organizations and signup use distinct framed compositions. Guides and legal pages inherit the readable type and new navigation.

## 13. Visual review
Reviewed the desktop full page and 15% thumbnail, tablet and phone layouts, and major supporting routes. Fixed mobile timeline overflow, dark headings on teal, inactive-phone contrast, a care caption, tablet hero overlap, mobile memory-caption overlap and missing spaces where desktop headline breaks disappear. Details: qa/pass7/visual-critique.md.

## 14. Verification and limits
- npm run check passes lint, seven lead-contract groups, TypeScript/Vite and twenty prerenders. Production contracts verify nineteen public routes, a private noindex route, 389 asset references, seven redirects, seven exact tokens and four preserved sources.
- HTTP checks pass nineteen production routes and seven query-preserving redirects.
- Nineteen routes were checked with axe at 1440px and 390px: settled default states have zero detected violations. Expanded archive and saved voice-layer checks also return zero. Nineteen routes at 768px have no horizontal overflow and one h1. This is automated evidence, not exhaustive accessibility certification.
- Browser checks cover hero/memory progression, phone playback and saved layers, archive stages/disclosures, incoming call, book views/page navigation/Escape/focus restoration, menus, storyboard/chapters/depth, family voices and pricing-to-signup intent.
- A fictional local submission with optional email preserved start:plan:family and showed confirmation. No live customer submission was made. Contract checks cover normalization, duplicate handling, optional email, legacy fallback and transport failure.
- Main bundle is about 268 KB / 80 KB gzip; lazy phone cinema 44 KB / 13 KB gzip. Responsive assets and lazy loading remain. No Lighthouse score is claimed. Reduced-motion guards were code-reviewed; an OS-level reduced-motion session was not run in this pass.

Only .env.example was supplied. Live waitlist/shared-story/contribution services require the intended Supabase configuration and schema. Checkout intentionally goes to the waitlist. Nothing was deployed or charged.

## 15. Review artifacts
qa/pass7/ contains hero-desktop.png, hero-mobile.png, hero-768.png, navigation-desktop.png, home-1440-full.png, home-1440-thumbnail.png and home-390-full.png. Full-page captures were assembled from real viewport captures because the browser’s automatic stitching duplicated content. They represent a sequence of interactive states. Audit and responsive evidence: audit.json, tablet-layout.json. Older qa/definitive visual results are historical.

Production output is in dist/. The local preview requires its server to remain running.
