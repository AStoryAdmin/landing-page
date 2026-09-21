# Route and component map

All main routes use the new wordmark Header and Footer from `src/design/a-story-greenfield`, wired directly in `src/App.tsx`.

- `/`: Home; new photographic editorial sequence, conversation reveal, mobile occasion selector, open chronology, BookStage and Invitation.
- `/how-it-works`: HowItWorks; clear process followed by a functional fictional example and chapter browser.
- `/for-families`: Families; parents, your own life, shared recollections and thoughtful gifting. The `#your-own-story` destination remains supported.
- `/care-communities`: Care; resident choice, family context and participation planning.
- `/organizations`: Organizations; retirement, anniversary, founding accounts and scope.
- `/pricing`: Pricing; source-driven plan rows, bundle controls, waitlist intent and reader.
- `/our-story`: OurStory; verified source origin and product convictions, with a restrained founder note.
- `/start`: Start; existing LeadForm with a new focused layout. Plan and demo query parameters remain supported.
- `/questions`: Questions; searchable factual FAQ data and schema.
- `/guides`, `/guides/:slug`: Guides and Guide; new library and article composition, preserved source content, copy/share and related reading.
- `/terms`, `/privacy`: existing policy text with new legalPrimitives and LegalLayout. Policy wording and dates were not rewritten.
- `/thanks`: Thanks; conditional post-purchase guidance, without claiming payment verification.
- Missing route: NotFound.
- `/p/:slug`, `/contribute/:slug`: existing standalone service flows and approved wordmark; no marketing navigation.
- `/__design/a-story-home-vnext`: compatibility preview of the new home, noindex and absent from sitemap.

Seven legacy redirects retain query strings and documented hash destinations. Route history, scroll restoration, lazy loading, error recovery, accessible skip link and prerendering remain active.
