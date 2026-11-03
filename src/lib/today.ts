/**
 * Where the product stands today, said the same way wherever it is said
 * (premium pass, design spec §3.7). It renders as the hero `note` (one small
 * line under the actions) on /how-it-works, /pricing, /organizations,
 * /care-communities and /reserve, and never inside a hero lead.
 *
 * Source: HowItWorks.tsx hero lead ("For now the calls ring through the A
 * Story app on iPhone, in a private beta. Writing, the family archive and the
 * book work in any browser today.") and seo.ts JSON-LD description. A subset
 * of those facts, no new claim. "The book" is left out on purpose (spec S1):
 * it would contradict "once ordering opens" on /pricing and /reserve.
 */
export const TODAY_NOTE =
  "Today the calls ring in the A Story iPhone app, in a private beta. Writing and the family archive work in any browser.";
