# Greenfield architecture and composition studies

The existing website has no visual authority. This document records decisions made before new production UI. Business data, routes, approved image derivatives, local fonts, lead handling, public-story services, and browser history behavior are the engineering constraints. No presentation component from the rejected homepage will be imported by the new homepage.

## Composition studies

Hero: (A) a full photographic cover with overprinted headline; (B) a typographic newspaper opening followed by a single broad photograph; (C) a tall photographic margin with a compact text column. Choose B: product explanation and actions remain immediately legible without text over people's faces. Headline spans the opening; definition occupies a deliberate narrow column, then the photograph cuts across the page below. Mobile brings the explanation and actions together before a single natural-ratio photograph.

Laughter: (A) photograph inside the headline; (B) uninterrupted large photograph with question directly underneath; (C) question first and intimate cropped detail. Choose B. Let visitors look, then name the missing context. No cropping of faces and no decorative photos.

Conversation: (A) transcript beside a full-height photo; (B) photograph across the upper field and a typographic spoken exchange along its lower edge; (C) progressively revealed centered lines without a photo. Choose B: human image leads, then two voices create a readable sequence with a working reveal control. No bubbles, phone, or floating software cards.

Milestone to everyday: (A) pinned dissolving photo stack; (B) formal small three-image register giving way to a large full-color dinner image; (C) an equal diptych with captions. Choose B. Native scroll changes photographic scale and framing; a controlled crossfade between ordinary details is optional, never required to read. Mobile shows one formal photograph at a time through accessible buttons before the ordinary photograph.

Multiple voices: (A) three independent portrait cards; (B) one lake image on brown with quotes typeset beneath; (C) a photograph between two quotations. Choose B. A single event carries all three perspectives; attribution distinguishes firsthand and inherited recollection. No preferred or correct voice.

Chronology: (A) a curved connecting line; (B) a numbered table of contents; (C) a continuous vertical date rail with broad irregular photographic intervals and occasional small adjacent memory excerpts. Choose C. No snake, slideshow, horizontal scroller, or end cap. Photographic scale changes with the source's proportions. The final rail continues into an open invitation.

Book: (A) full brown product stage; (B) centered approved transparent object above a concise publication colophon; (C) book beside a paragraph. Choose B on a muted sand ground. The object is an outcome, not the opening product pitch. Keep its original colors and proportions.

## Chosen system: a family documentary in continuous pages

12 columns, 1360px maximum reading field, 32–64px desktop gutters and 20px mobile gutters. Proportion follows content, never a viewport-height quota. Large Figtree statements and Source Serif 4 only for memories and reflective passages. Desktop opening 88–100px, statements 56–76px, editorial text 23–27px, ordinary text 18–20px, nav 16px, captions 13px. All text remains readable at mobile size and zoom.

Brown #3B291D, terracotta #B85327, cream #F3EBDE, gold #EAC668, sand #F0DDA8. Brown carries text and one substantial memory chapter. Cream is a reading ground, not filler. No teal website panels. The approved book artwork remains unchanged.

Wordmark only: extract the existing approved name paths, excluding the A-shaped mark. A 78px integrated navigation, smaller on scroll, generous text links, fine active underline, plain mobile menu. Primary controls 50px high and 12px radius. No pills or automatic arrows.

Captions are plain documentary information: short subject, small date where supported, no decorative labels on every photo. Approved source photos keep natural ratios. No overlays, fades, fake aging, rotated prints, uniform image cards, or universal photo frames.

Motion: native scroll; one-time short text discovery only, restrained photo reveal and 200ms control feedback. Never hide content when JavaScript is absent or reduced motion is enabled. Mobile does not inherit desktop choreography. Reader changes use a crossfade, not a 3D page flip.

Sequence: definition → missing context → listening and follow-up → connected details → documented occasions versus ordinary life → different recollections → family contribution → open chronology → present life → optional physical volume → quiet invitation.

Supporting pages get distinct new compositions: How it works is a readable process with a functional example workbench; audiences are real situations in a continuous essay; pricing is a transparent list with preserved bundle selection; Our story explains the conviction; waitlist is one concise form without a decorative panel.

## Preservation boundaries

Keep all pricing constants, checkout routing and availability, product chapter/question data, lead submission and fallback behavior, share/contribution service contracts, legal text and guide content. Build new presentation around these contracts. Demonstrations are clearly identified as fictional/local. Never submit a real lead during QA. Existing source directories remain available for recovery but no longer define marketing composition.
