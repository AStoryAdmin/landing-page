# Pass 10 refinement — 21 September 2026

This pass builds on Claude's homepage and chrome. The attached Pass 9-oriented prompt was treated as historical design context, not as a direction to restore the older scenes or overwrite the newer composition.

## Design decisions

Kept the full-bleed dinner photograph, mission headline, numbered narrative, archive timeline, layered conversation, three equal family voices, teal book and oversized footer. Their strength is the relationship between the photographs, the text and the scroll progression.

- Reframed the mobile hero around the storyteller and fitted the headline deliberately to the narrow viewport.
- Replaced the mobile sideways timeline with a vertical chronology: the years, Today and the open Next entry are all encountered naturally. Desktop retains its horizontal sequence; the unpinned version exposes its scrollbar and keyboard focus.
- Kept the scroll-reading statement legible throughout by deepening readable ink instead of fading words almost to invisibility.
- Shortened the desktop listening sequence and stopped dimming its explanatory rows. Listening and family-voice scenes use ordinary document flow when too tall for the viewport. Short screens do not pin scenes.
- Made the header follow the actual hero boundary instead of assuming the photograph ends at one viewport height.
- Widened supporting-page containers to the existing 1520px editorial frame, strengthened opening type and reduced automatic terracotta emphasis.
- Gave For families its own opening, “The stories between you.”
- Removed the founder photograph's decorative mount, the rounded dark section edge, the deadline card and the team cards. The narrative pivot now has the scale of a main statement.
- Reused the homepage action component for shared closing invitations and the founder's call to action. Refined supporting-page controls and pricing row feedback without changing plan logic.
- Added cleanup for delayed hero animation and pending scroll measurements. The intro's decorative wordmark no longer exposes a focusable link inside an aria-hidden cover.

No new imagery, dependencies, pricing facts, conversation scripts or lead-submission behavior were introduced. Existing assets carry the narrative adequately.

## Verification

- ESLint, seven lead-contract groups, TypeScript/Vite build and all 20 prerendered pages pass.
- The aggregate `npm run check` still stops at the original external source-comparison step: `../_reference-review/definitive/landing-page-brand-refresh-2026/` is absent. The preceding production snapshot/asset checks execute successfully. The missing baseline was not fabricated and the comparison was not bypassed.
- 50 browser layout checks: ten marketing routes at 393, 768, 1024, 1440 and 1728 pixels. No horizontal page overflow, duplicate/missing H1 or browser page errors.
- Normal-motion first-visit intro releases scrolling. Family plan plus books selects correctly. The example memory can be edited and saved. Mobile menu makes the background inert, closes on Escape and restores focus.
- Changing to reduced motion while the page is running restores readable hero content and removes pinned scenes. A 1024 × 650 laptop viewport has no pinned scenes.
- Automated WCAG 2 A/AA checks: no violations on Home, Our story, For families, Pricing, Start and How it works at 393 pixels. These are automated checks, not a complete manual accessibility certification.

Evidence and repeatable browser checks: `qa/refinement/`. The changes are local; nothing was published. This is a refinement of the existing implementation, not a complete rewrite of every supporting page.
