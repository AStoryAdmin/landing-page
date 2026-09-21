# Pass 9 — Someone, finally, to ask

The homepage now follows two promises: someone asks a worthwhile question, and the family gives the answers somewhere to keep going. The main edit was to reduce competing demonstrations and give each section its own purpose and composition.

## Creative decisions

- New opening: a large typographic introduction above a mounted family photograph and an interactive Ask / Keep / Continue sequence. The image depicts people comparing photographs and recollections, which explains the collaborative archive.
- Recognition: two formal milestone photographs establish what families already preserve; the adjacent text names the ordinary life that gets missed.
- Listening: three deliberately selected exchanges demonstrate noticing an aside, respecting a refusal, and following a detail. Readers reveal the next question, then inspect the memory card, full transcript, and illustrated voice layer. The complete timed phone conversations remain on How it works.
- Continuation: family contributions accumulate around Joan's memory. Amy's different account is explicit. The final stage points toward another conversation; the duplicate book was removed.
- Open chronology: past, today, and future have different visual weights. A second present-day scene shows the archive continuing without replacing the past.
- Book: one larger physical product presentation with cover/pages controls and the existing reader. It remains an optional chapter, never the archive's finish line.
- Supporting pages: Daniel's essential reflection is visible; the family page gives telling your own story a stronger field of color, consolidates the competing-accounts explanation, and removes an unrelated memorial photograph.

## Research and interpretation

Studied the live [Bearplus](https://bear.plus/), [Binder](https://www.binder-consulting.de/), and [CargoKite](https://cargokite.com/) sites. Binder's selective service presentation and CargoKite's visual explanation of its mechanism informed the decision to make interaction explain the product rather than decorate it. These are interpretations, not borrowed layouts.

Bearpop and Roxtaw case pages returned 404 in the live browser. Indexed Bearplus case descriptions and the studio's [Bearpop art-direction presentation](https://dribbble.com/shots/23038111-BEARPOP-Art-Direction) supplied limited supporting context. They were not treated as inspected live sites.

## Validation

- `npm run check` passed: lint, seven lead-form contract checks, production build, twenty prerendered routes, and production contracts.
- Production contracts verified nineteen public snapshots, the private noindex snapshot, 369 asset references, seven redirects, exact brand tokens, and preserved pricing, product, checkout, and conversation sources.
- Browser route review covered all nineteen public routes, with no horizontal overflow at the inspected desktop width.
- Responsive visual checks included 320, 390, 768, and 1440px. The homepage had no horizontal overflow at the inspected narrow and tablet widths.
- Accessibility audits reported no violations on the inspected mobile Home, How it works, Families, Our story, and Pricing states. The expanded complete-conversations state also passed after correcting the typing indicator's role and text arrival opacity.
- Tested all three listening reveals, keyboard activation, card/transcript/voice selection, opening stages, archive progression, and the present-day scene change. Voice remains clearly labeled as an illustrated feature in development; no playable audio is claimed.
- Final static build repeated after the last visual correction. Local production preview runs at http://127.0.0.1:4173/.

Screenshots: `qa/pass9/home-desktop.png`, `qa/pass9/home-mobile.png`, `qa/pass9/listening-desktop.png`. Route evidence: `qa/pass9/route-review.json`.

No public deployment or live form submission was performed. Automated audits cover inspected states and do not constitute exhaustive accessibility certification.
