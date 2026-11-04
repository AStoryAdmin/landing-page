# Phone-first website, overnight (4 tabs, invite to the iPhone app)

**Ask (verbatim):** "yes you have full permission tonight, remove the video from the home page. Do not significantly change anything from the home page, except for the book -> feels like it's duplicated since we're also having sample books tab -> fix the call to action there -> utilize our tabs (really) there are currently too much. Make it only 3-4 tab. Learn from best websites and startup (Quippy only needs 3 tab to make it to YC) we can definitely make it easier and more compelling. Goal is by next morning, our website will be organized significantly to make it better both on website and phone. at least 8 this time."

Earlier the same night Daniel said yes to going phone-first: the moat is the iPhone app; the web app stays live only as the family's side (join links, reading and adding, the book) and is no longer marketed.

## Goal
A visitor on laptop or phone understands in one screen what A Story is (it calls your parent, in the iPhone app) and does one thing: asks for an iPhone invite. The bar has 4 tabs. Every simulated user scores at least 8.

## Decisions (made tonight, Daniel asleep)
- **Base:** `site-premium` merged with the current `origin/main` first (it gained the Raymond sample book, PR #11). The home film lives only on `home-film` / the live deploy; the `site-premium` home has no video, and nothing brings it back. The film stays on /how-it-works#film.
- **Bar (desktop and phone drawer):** How it works · Sample books · Pricing · For organizations, then a small Sign in and one primary button **Get the iPhone app**. "Our story" moves to the footer. For organizations is a single link (to /organizations, which links on to care communities); no dropdown. Footer keeps every page.
- **Primary action everywhere** (lib/app.ts START_*, header, sticky bar, page CTAs): **Get the iPhone app** → `/get-the-app`, a new short page: one sentence on what the beta is (from existing sourced copy: private beta, rings in the A Story app on iPhone), a form with email + "Does the person you'll call have an iPhone?" (yes / no / not sure), written to `waitlist_signups` through `lib/leads.ts` with its existing fallback email, and a plain thank-you ("We'll send your invite to <email>."). No promise of timing.
- **The web app is not advertised.** No "Start free"/create-account links on the site except where a person already belongs to a family: /join (code and links) stays exactly as it works. Sign in stays (existing families).
- **Home:** unchanged except: the header/footer; the CTA labels/targets (Start free → Get the iPhone app); the book section (FamilyBook) — it duplicates /samples, so it becomes a short teaser (one open spread, one line) whose call to action is **Open the sample books** → /samples. Nothing else on home moves.
- **Copy for the stage:** pages say plainly what works today: calls ring on iPhone by invite in a private beta; the family reads and adds on any device through their link; the book. No dates, no counts, no new claims. Never framed around an ending.
- **Web app:** invite-only sign-up is the phone-app session's work. This plan only writes the brief `docs/premium/webapp-invite-only-brief.md`.

## Not doing
Push, deploy, new photographs, new facts (devices beyond iPhone, prices for organizations, launch date), phone-app or web-app code.

## Acceptance criteria
1. Header has exactly 4 tab links + Sign in + one primary button at 1440 and in the 390 drawer (nav-count updated to the new rule and passing).
2. Every primary CTA on the site goes to /get-the-app; the form validates, writes through leads.ts (checked against a stubbed Supabase or dry-run, never a real submit), and shows the thank-you.
3. No link on the site to app.astoryapp.com/create-account; /join flows unchanged (routing tests pass).
4. Home: no `<video>`; the book section is a teaser linking to /samples; home-diff shows changes only in header, CTA labels and the book section.
5. lint, build:static, test:contracts, test:routing, check, copy-check pass; no horizontal overflow at 320/390/1440 × 100/150% text; CLS < 0.1 on /, /pricing, /how-it-works, /get-the-app.
6. Panel (same 5 personas + rubric): every persona average ≥ 8.

## Tasks
- [ ] 1. Merge origin/main into site-premium — done when build + check pass.
- [ ] 2. Shell + action: lib/nav.ts, Header, Footer, StickyStart, lib/app.ts, /get-the-app page + route + sitemap/routes, nav-count rule.
- [ ] 3. Home: book teaser → /samples; CTAs; no video.
- [ ] 4. Pages for the stage: how-it-works, pricing, for-families, your-story, our-story, questions, organizations/care/programs, contact, join — phone-first copy, Start free removed, one "Today / by invite" explanation.
- [ ] 5. Web app brief.
- [ ] 6. Panel, fix rounds until every persona ≥ 8 (max 3), report `docs/premium/RESULT-phone-first.md`.

## Verification
| # | Check | Where | Evidence |
|---|---|---|---|
| 1 | nav-count, screenshots | local build | output, `qa/premium-2026-11/pf/` |
| 2 | Playwright form fill (stubbed submit) | local | test output |
| 3 | grep dist for create-account; test:routing | local | output |
| 4 | home-diff, grep `<video` | local vs live | output + diff images |
| 5 | all scripts + overflow sweep | local | output |
| 6 | panel | local | `docs/premium/panel-pf.md` |

## Claims that need a source
None new. Existing sourced lines only ("private beta", "rings in the A Story app on iPhone", "free for relatives", privacy promises).

## Risks
- Hiding Start free cuts web sign-ups to zero for strangers; that is the decision.
- `waitlist_signups` RLS may reject anonymous insert; leads.ts has a fallback email path — tester confirms which path runs.
