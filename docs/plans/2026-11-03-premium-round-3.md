# Premium site, round 3: every panel score at least 9

**Ask (verbatim):** "keep iterating, goal is to make every scores at least 9"

## Goal
Each of the five simulated users (Maya, Harold, Tuan, Denise, Priya) scores every criterion (premium, warmth, clarity, trust, navigation, mobile, desire) at 9 or more on the same rubric as `docs/premium/panel.md`. Round 2 ended at 6.58 average, lowest persona 6.14.

## Not doing
- The home page `/` (header/footer only). The phone app and web app (Phase 2).
- New numbers, prices, dates, device claims, export formats, pilots or quotes that are not already in the site or app code. Where a friction needs one, it goes in "Claims that need a source" and waits for Daniel.
- New photographs (licence). Imagery comes from what the repo already ships (sample-book pages, illustrations, type-led compositions).
- Push or deploy.

## Acceptance criteria
1. Panel re-score (same 5 personas, same rubric, local build of `site-premium`): every persona ≥ 9 on every criterion. If a friction is blocked on a fact, the panel report names it under "blocked on Daniel" with the exact question.
2. Every page group's frictions from `panel.md` that need no new fact are gone (tester checks them one by one).
3. `/` differs from live by 0 px at 390 and 1440 (home-diff).
4. lint, build:static, test:contracts, test:routing, check, nav-count, copy-check, home-diff pass; no horizontal overflow at 320/390/1440 at 100–150% text; CLS 0 on key pages.
5. Film still plays on /how-it-works; `#film` and `#being-asked` scroll to the right place.

## Tasks (builders in their own worktrees, gated by tester + supervisor, merged into `site-premium`)
- [ ] 1. **Doors (B1)** — `/join` first screen says, from sourced copy: free for relatives (faqData.ts:26), no account needed, where the code comes from (a text or email from the relative who invited you), one rule for code vs link; example `ABC123` placeholder; a sample "addition" card from the sample-book data so the page is not bare; privacy promises set in the same serif as the bullets; "the hour you picked" → "the hour your family picked" on /join and /how-it-works#being-asked; one plain line near the film and on /join: a computer makes the call, a person (Daniel) reads only if you ask (source: privacy summary); `#film` opens at the film; "Your own story" label/lead no longer excludes a 79-year-old; "Invited?" reachable from the header without breaking nav-count. Files: `AppDoor.tsx`, `YourStory.tsx`, `Header.tsx`, `Footer.tsx`, `HowItWorks.tsx`, `kit/Film*`.
- [ ] 2. **Gift and money (B2)** — `/for-families` first screen answers the gift buyer (what you can do today, truthfully: start free in their name, hold a place for $1; no date promised); "Does your parent have an iPhone?" as a clear yes/no near the top with the sourced answer; one line near every Start/Reserve CTA on who hears the recordings (privacy summary); `/pricing`: one-time path (Express $79) visible first for people who fear renewals, fewer numbers in the first screen, Ledger thumbnail captioned or removed, contributor line "free for relatives" in the first screen; sign-up handoff carries "for someone else" (site side only: copy on the door page, `?for=someone` passed through). Files: `Families.tsx`, `Pricing.tsx`, `kit/PriceLadder.tsx`, `Reserve.tsx`, `Compare.tsx`, `faqData.ts`, `AppDoor.tsx` WORDS only (coordinate: B1 owns layout).
- [ ] 3. **Care and organizations (B3)** — `/care`, `/organizations`, `/programs`: hero imagery from existing non-photo assets that reads as older adults / a program (no new photos); "What you need" lists the real requirements from the code (an iPhone per storyteller before launch, a quiet hour, a staff contact, consent from the storyteller or their decision-maker as the app models it); an honest "What we can say today" block built only from the privacy policy and app behaviour (never sell, never train, delete, open-format export, nothing appears until the storyteller says yes, repeats are fine — never a test); a Questions section "For organizations" (staff access, ownership, retention, export, consent) with every answer sourced; demo form: care-specific "What kind" options, one step where possible, phone/email line; institutional compare note (StoryCorps mention only as "a public archive, not a private family one" — no claims about its features). Pricing range stays "quoted on the demo" until Daniel answers. Files: `Care.tsx`, `Organizations.tsx`, `Programs.tsx`, `DemoBooking.tsx`, `Contact.tsx`, `Questions.tsx`, `compare/*`.
- [ ] 4. **Mobile and warmth pass (B4, after 1–3 merge)** — every non-home page at 320/390: hero headline inside the first screen, page length cut where sections repeat, no overflow at 150% text (pricing "Recommended" tag, film credit line), one type system per page (no serif/sans switches inside a block), 44 px targets, warmth: the sample voices/cards reused where a page is text-only. Files: any `src/pages/site/**` CSS and `kit/*`; no copy changes except B1–B3's leftovers listed in CHIEF-LOG.
- [ ] 5. **Panel re-score, fix round, re-score** — up to two fix rounds driven by the lowest persona; `docs/premium/panel-r3.md`, `docs/premium/RESULT-r3.md`.

## Verification
| # | Check | Where | Evidence |
|---|---|---|---|
| 1 | Panel re-score, 5 personas | local build | `docs/premium/panel-r3.md` |
| 2 | Tester walks `panel.md` frictions per page | local build, Playwright | pass/fail list in tester verdicts, CHIEF-LOG |
| 3 | `node scripts/home-diff.mjs` | local vs live | 0 px at 390 and 1440 |
| 4 | lint, build:static, test:*, check, nav-count, copy-check; overflow sweep at 320/390/1440 × 100/125/150% | local | command output in RESULT-r3.md |
| 5 | film-check | Chromium local | output in RESULT-r3.md; iPhone still Daniel's check |

## Claims that need a source (blocked on Daniel; the build must not state them)
1. **Devices.** Does the app run, and do calls ring, on an iPad or Android? Today the only source is "Before launch, A Story can only ring an iPhone." Recommended: if the iPad works, say "iPhone or iPad" everywhere the iPhone caveat appears.
2. **Gift.** May the $1 reservation be made in the recipient's name, with a printable note the buyer can hand over? Recommended: yes — it is the only honest thing a gift buyer can wrap today.
3. **Organizations.** A starting price or per-resident range, the equipment a community needs (shared iPhones? how many?), and the export formats (WAV/MP3/transcript). Recommended: state them plainly on /care, /organizations and /questions as soon as they are true.

## Risks
- The ≥ 9 target is likely out of reach for Denise and Priya until item 3 above is answered; the panel report will say how far each persona is and why.
- Adding "Invited?" to the header could crowd the bar; nav-count guards it.

## Assumptions
- Daniel said "keep iterating" with full permission, so round 3 starts without approval of this file; questions 1–3 go to him in the handoff with recommended answers.
- The P0 branch `p0-deploy` (worktree `Desktop\asl-p0`) is the deploy candidate; round 3 builds on `site-premium`.
