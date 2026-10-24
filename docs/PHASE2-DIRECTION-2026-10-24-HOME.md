# Home, 2026-10-24: back to the past version's best

Bao, after the phase-2 home went live (2026-10-24): "this does not look like a good landing at all.
it can be for later, but definitely not the first homepage of a story"; "the it's the everyday and
other major effect was better the last time, the multiperspective etc"; "the home page is much
stronger in the past ver. look for the best feature in the last build and integrate here. this web
looks too ai".

Ruling: the home is rebuilt from the past version (commit bd23f2f): the full-bleed Sunday-dinner hero
(headline "Every life holds a story worth keeping."), WhatGetsLost ("It's the everyday" and its
effects), the multi-perspective EveryVoice + "One life. Many witnesses.", the interactive FamilyBook,
and a short close. StepOne and the intro overlay stay out. The open book (OpenBook) is not the first
screen. Today's honesty fixes stay.

## Type floor (Bao, 2026-10-24)

Bao: "care less about the length and more about the readability. i despised the small text
everywhere u had. it's pathetic and bad".

Ruling, site-wide (the home builder applies the same numbers to the home):

- Running and reading text: 20px or more on a desktop, 18px or more on a phone. EB Garamond reads
  small, so it is sized for its x-height: line-height about 1.55, measure 60-72ch.
- Secondary lines, notes, card descriptions, form help, footer links: 16px or more.
- Labels, kickers, captions, small print under buttons, legal meta, chips, table headers: 14px or
  more. Nothing anywhere is set under 14px: not inside drawn app cards, sample slips, price cards,
  /samples, the footer or the header. The header nav is 16px or more.
- Buttons 16px or more.
- Anything under 18px has strong contrast, about 7:1; no faint grey on cloth.
- Headlines may grow where the screen allows and stay at two lines or fewer.
- The printed pages of the sample books keep their book size; "Read in large type" is a filled
  brass button beside the page controls, not a quiet outline.

At the source (src/styles/theme.ts `type`): `read` / `base` clamp(18px → 22px) (20.4px at 1366),
`lead` clamp(21px → 28px), `note` / `sm` clamp(16px → 18px), `ui` clamp(16px → 18px), `xs` 16px,
`label` / `eyebrow` clamp(14px → 16px), `caption` clamp(15px → 16px). Small-text inks deepened to
7:1: `bodyMuted` #514236, `faint` #56473A, `accentText` #7E3315, `ochreText` and `goldOnLight`
#664612, `onDarkFaint` #D9CCBA, and `goldOnTeal` #F2D98F for brass small text on the teal ground.
Pages write these tokens, never a raw px size under the floor.
