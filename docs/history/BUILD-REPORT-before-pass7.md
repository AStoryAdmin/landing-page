# A Story — definitive production redesign

Completed locally on 20 September 2026. Preview: http://127.0.0.1:4173/

## Delivered design

The latest definitive brief governs this implementation. The supplied product sources preserve facts and behavior; the namecard supplies brand geometry and colors; the refreshed landing-page source supplies restored narrative. Earlier brown-only directions are superseded. Personal-site references inform button weight, navigation, typographic contrast and selective emphasis.

The seven exact core colors are centralized in src/lib/brand.json: ivory #F3EBDD, chocolate #4A3327, terracotta #B85126, teal #0F4A58, warm gold #E0A03F, brass #EBC86A and charcoal #4C4C4C. Derived surfaces remain semantic theme values. Teal is an active conversation and product color. Figtree handles functional and declarative text; Source Serif 4 supplies the editorial voice.

The logo is one custom heart/waveform A followed by Story. Header, footer and social cards share its geometry. Favicons use the custom A alone. Nineteen social cards and browser/app icons have been regenerated.

## Homepage and restored content

Home follows the specified ten movements: clear phone-call proposition; photograph to conversation to memory; three accounts of the same afternoon; three scripted calls; Joan's living archive; simple setup; past and present; optional physical book; privacy; ordinary-day invitation.

Rosa, Errol and Joan use the original demo scripts. Only one phone plays at a time, playback pauses offscreen, and narrow screens show a scenario selector with one phone. Pause, manual progression, replay, complete transcripts and memory views work. Reduced-motion users receive manual progression. Voice highlights are explicitly illustrative and do not pretend to play recordings.

Joan's archive includes the 14/6/23/4 summary, all five activity entries, attributed contributions, approval state, voice passage with its meaningful pause, eleven chapters with six begun and the optional book. Fictional examples are identified clearly.

Restored supporting content includes the five-step journey, four family roles, eleven chapters and five interview depths; concrete family memories and multiple perspectives; the first-person founder story and verified team links; the simple waitlist introduction; original pricing and book separation; care-community positioning; and five organizational uses. Footer navigation has four groups. All public marketing, guide and legal routes retain navigation and metadata.

Intentionally retired: the brown-only web palette, duplicate-A logo treatments, crowded primary navigation, generic replacement founder copy and competing older homepage compositions. Unsupported outcome statistics and compliance claims were not introduced. Pricing, interview scripts, product facts, checkout intent, service contracts, legal wording, editable-memory workbench and book reader were retained.

## Verification

- npm run check passes: lint, seven lead-contract test groups, TypeScript/Vite build, twenty prerendered snapshots and static production contracts.
- Static checks cover nineteen public snapshots, a private noindex snapshot, 383 asset references, seven redirects, exact brand colors and preserved product sources.
- AST comparison confirms pricing, product, checkout and demo-script sources are equivalent to the supplied refresh ZIP. LeadForm retains earlier validation/accessibility improvements and was not rewritten by this definitive pass.
- 133 responsive checks cover nineteen public routes at 1600×1000, 1440×900, 1280×800, 1024×768, 768×1024, 430×932 and 390×844. No horizontal overflow or broken loaded images were detected; actual viewport dimensions matched each request.
- Thirty-eight axe audits cover nineteen public routes at 1440 and 390 pixels with zero detected violations. This is automated evidence, not exhaustive accessibility certification.
- Final targeted checks also passed for the updated mobile signup and memory voice highlight. The five-row journey was visually corrected, checked again at all seven sizes, and audited on mobile. Production HTTP checks passed all nineteen public routes and seven query-preserving redirects.
- Browser checks exercised call autoplay, pause, manual progression, refusal handling, scenario switching, transcript and voice views; mobile menu Escape; book page navigation, Escape and focus restoration; memory editing, contributions and archive search.
- Local fictional form fixtures verified validation/focus, optional email, schema fallback, successful signup, duplicate signup, plan intent, demo intent, request failure, retained input and successful retry. No live customer data was submitted.
- Small text on teal uses brass where warm gold would fail contrast. Terracotta buttons use white text because ivory would fail normal-text contrast. Exact core brand colors remain unchanged.

Current evidence and screenshots live in qa/definitive/. Prior qa/redesign/ results are historical, not the current color/content verification. The previous report is archived in docs/history/.

## Genuine launch dependencies

Only .env.example was supplied. Live waitlist, shared-story and contribution services require the intended Supabase configuration and deployed schema/policies. Service behavior was tested locally with fictional fixtures. Checkout intentionally continues to the waitlist; no payment provider was activated.

The production build is in dist/. Hosting/domain deployment has not been performed. The preview requires the local preview server to remain running.

