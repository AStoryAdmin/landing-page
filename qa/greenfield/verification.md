# Greenfield verification — September 19, 2026

## Result

Production build and lint passed. The rebuilt website is available locally and has not been publicly deployed.

- 13 functional check groups passed.
- 207 route/viewport checks passed: 23 destinations at widths 320, 393, 430, 700, 768, 1024, 1280, 1440 and 1728. No horizontal overflow, broken loaded images or duplicate main landmarks.
- 57 automated accessibility states passed with no WCAG A/AA violations detected by axe: 19 public routes at desktop and phone sizes, plus 19 expanded interaction states.
- 19 public routes retain meaningful, styled HTML with JavaScript disabled, unique metadata, canonical URLs and structured data. The compatibility design preview is separately noindex.
- Seven HTTP redirects preserve query parameters and documented hash destinations. Delayed route-chunk startup retains the static page; browser history restores position; anchors clear the measured header; mobile menus close on navigation and history.
- All 194 registered photographic derivatives and 9 transparent book-object derivatives decoded with expected dimensions. The source photographs and approved book objects are unchanged.
- Pricing/product exports, checkout outcomes, dependency files, lead service, share/contribution code, guide content and legal wording were compared with the supplied baseline. Policy edits change presentation imports only.
- Forms were exercised with local service fixtures: pending submission, confirmed success, known duplicate, missing-column compatibility, failure, retained input and retry. No real submissions were sent.
- Shared archives and contribution pages were exercised with populated, missing and unavailable local responses; contribution failure and retry passed.
- A 720-CSS-pixel / 2x-scale reflow check passed on nine principal routes. This is a 200% layout equivalent, not a claim of operating the browser’s native zoom UI.
- Reduced-motion content remains visible with animation disabled. A normal-motion walkthrough was recorded.

Automated accessibility results are not a claim of complete accessibility certification. Performance observations in `static-audit.json` are unthrottled local Chromium measurements, not field Core Web Vitals. There is no live-backend or payment-fulfilment claim.

## Interaction checks

The example can create a named collection, follow a context-aware scripted exchange, edit and reset the same memory, add a local fictional family perspective, search the archive, open an entry, and select each real product chapter. Direct contribution links open the correct step. Tabs support arrow keys, Home and End.

Pricing bundle controls retain the real $154 Individual-with-book and $319 Family-with-three-books selections; the selected plan survives arrival at the waitlist. Free, Monthly, Express and standalone book destinations remain supported through the existing checkout helper.

The mobile menu contains keyboard focus and restores scrolling/inert state when closed. The book reader supports desktop spreads, single mobile pages, story mode, contents, bounded paging, Escape, and focus return. Pending page transitions cannot queue uncontrolled turns.

## Message review, using only the finished website

What is it? The opening calls A Story a private, living family archive built from family conversations.

What problem does it solve? The opening explicitly says photographic context can be lost; the laughter chapter shows what the photograph cannot explain.

What do I do? Talk; the next chapter says you do not have to write your life down. How it works explains installation, a comfortable call time, and writing as an alternative.

Does it remember and follow up? The hero says so, the chair exchange follows a previously mentioned detail, and the working lake example asks a question based on the storyteller’s answer.

Can relatives participate? The collaborative section names concrete contributions and How it works lets visitors add a fictional recollection.

Can people disagree? Three attributed accounts share one lake photograph, with an explicit statement that there need not be one version.

Is it only about the past? The chronology stays open and the following chapter explicitly includes the life being lived now.

What is the book? Selected chapters can become a physical volume. The page says the book can be finished while the story is not.

## Visual review

Desktop and phone captures were inspected for the homepage and supporting routes. The new opening, photograph scale, wordmark-only navigation, continuous sequence, brown recollection chapter, vertical chronology and restrained book colophon replace the previous slide/collage concept. Photography has a specific narrative job and keeps natural proportions. The opening’s explanatory text and both actions fit in the first viewport at the checked widths.

Current captures are under `screenshots/`; `recordings/greenfield-walkthrough.webm` shows the normal-motion experience. Pre-implementation alternatives and the selected visual grammar are recorded in `DESIGN_STUDIES.md`.

## Corrections made during QA

A same-route contribution anchor initially left the example on its previous step; the route-specific example now resets to the correct entry point. The selected step’s small terracotta label was deepened for contrast. Mobile navigation now also resets on browser-history changes. These corrected behaviors passed their targeted checks.
