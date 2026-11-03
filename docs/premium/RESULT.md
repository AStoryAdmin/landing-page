# Result: premium pass, every page but home (2026-11-03)

Chief of agents, final report. Branch `site-premium` @ `a2f5338` in `C:\Users\nguye\Desktop\a-story-landing-premium`. Baseline: `origin/main` @ `cc87bfe`.
**Nothing is pushed or deployed.** Every pass below is "passed only locally" until Daniel deploys and `scripts/verify-live.mjs` runs on astoryapp.com.

## Read this first
1. **Deploy the P0 commits first, on their own** (spec §6.1, §7.9). See "Deploy P0 first" below.
2. **Fix /pricing layout shift before you deploy this branch.** QA r2 measured CLS 0.265 on mobile in 4 of 6 Lighthouse runs (origin/main: 0 in all 6). That is in the "poor" band. The shifting element is `.opening-tail` in the pricing hero (`kit.tsx` wide opening): the lead drops 30 px about 2.7 s after load. Not fixed tonight. Evidence: `qa/premium-2026-11/qa-r2.md` rows 10 and 12, `qa/premium-2026-11/after-r2/logs/pricing-cls-probe.log`.
3. **AC5 (the panel) is not met on the evidence we have.** Panel round 1 averaged 6.42 against a target of 8.04. A round 2 re-score was planned, but no round 2 scores reached the chief, so there is no final panel number. See "Panel".
4. **The film's stills licence (§7.10) is still open.** The film is in the build. If the wedding, porch and family stills can't be documented, pull `#film` and the "Watch the film" links before deploying.

## Panel (simulated, 5 personas, same rubric)

Target for AC5: close half the gap to 10 from the baseline average, so 6.08 + (10 − 6.08) / 2 = **8.04**, and no persona below 7.

| Persona | Baseline (live origin/main) | Round 1 (after first build) | Final (round 2) |
|---|---|---|---|
| Maya (adult child, gift buyer) | 6.0 | not recorded per persona | not available |
| Harold (storyteller, 75+) | 6.14 | 6.29 (lowest) | not available |
| Tuan (sibling, invited in) | 6.14 | not recorded per persona | not available |
| Denise (care-community director) | see audit | not recorded per persona | not available |
| Priya (org buyer) | see audit | not recorded per persona | not available |
| **Average** | **6.08** | **6.42** | **not available** |

Notes:
- Baseline persona values for Maya, Harold and Tuan and the 6.08 average come from the chief's workflow inputs. The Denise and Priya baseline values were never written to a file in this repo (`docs/premium/panel.md`, named in the plan, was never created). From the average, Denise and Priya together come to 12.12, so they average 6.06. That is arithmetic, not their individual scores.
- Round 1 values come from `CHIEF-LOG.md` ("Chief: plan for panel round 2").

Final panel per criterion: **not available.** The only per-criterion data is round 1's ranges (`CHIEF-LOG.md`):

| Criterion | Round 1 | Final |
|---|---|---|
| Clarity | 5 to 7 | not available |
| Navigation | 5 to 7 | not available |
| Desire | 4 to 5 | not available |
| Trust | 5 for both Denise and Priya (others not recorded) | not available |

Round 2's fixes targeted the 6 root causes the panel named in round 1 (`CHIEF-LOG.md`). B1 changed the first screen and added doors for the storyteller and the invited relative. B2 said what A Story is up front and fixed /how-it-works. B3 gave /pricing one status, one gift line and one action. B4 named the AI and the iPhone on the org and care pages and showed the privacy promises. Whether this reaches 8.04 is **not measured**. Next step: run the same 5 personas on `site-premium @ a2f5338` and write the scores to `docs/premium/panel.md`.

## Rounds

| Round | Status | Attempts | Merge |
|---|---|---|---|
| P0-copy | passed | 2 | d089c50 |
| P1a-shell | passed | 2 | aa905a4 |
| P1b-film | passed | 1 | 8576430 |
| C-structure | **not passed after 3 attempts** | 3 | (its work continued in C-finish and fix-b4) |
| D-pages | passed | 3 | b9b413a |
| A-pages | passed | 2 | 60871df |
| B-pages | **not passed after 3 attempts** | 3 | (its work continued in fix-b3) |
| C-finish | **not passed after 3 attempts** | 3 | (its work continued in fix-b4) |
| fix-b1 | passed | 1 | d82944f |
| fix-b2 | passed | 1 | 74c52f9 |
| fix-b3 | passed | 2 | f68c937 |
| fix-b4 | passed | 3 | a2f5338 |

Every merge was checked with `npm run lint` and `npm run build:static` (31 routes plus 6 old addresses written to `dist/`). Merge notes are in `CHIEF-LOG.md` under "Chief: final report".

## Acceptance criteria (plan `docs/plans/2026-11-02-premium-site-and-webapp.md`)

| # | Criterion | Status | Evidence |
|---|---|---|---|
| 1 | Bar at 1440 has ≤ 5 text links + Sign in + 1 button; the 390 drawer has ≤ 2 levels and no duplicates | **passed only locally** | `nav-count.mjs`: 185/185 checks pass. At 1440 the bar shows 4 links, a "For organizations" menu, Sign in and Start free. `qa-r2.md` row 4, `after-r2/logs/nav-count.log`, `after-r2/nav/` |
| 2 | Every route except `/` has a before/after pair at 390 and 1440 | **passed only locally** | 62/62 shots (31 routes × 2 widths) answer 200, with no horizontal scroll and 0 page errors. Each one has a match in `before/`. `qa-r2.md` rows 7 and 8, `after-r2/shots-index.json` |
| 3 | Film: poster, captions, no autoplay sound, `preload="none"`, LCP worse by no more than 10 % | **passed only locally** | Before the tap there is no `<video>`. After the tap: `preload="none"`, no autoplay, a poster and English captions, and the film plays. Mobile LCP: how-it-works 4687 → 4784 ms (+2.1 %), pricing 4203 → 4296 ms (+2.2 %). Checked in Playwright Chromium and WebKit only, not on a real iPhone (§7.16). `qa-r2.md` rows 10 and 11, `after-r2/lighthouse/` |
| 4 | build:static, lint, a11y with 0 new violations against origin/main | **passed only locally** | `npm run check` exits 0. Axe passes 46 states with 0 violations. `a11y.mjs` exits 1 on **both** branches, on the same `interactive-a11y.mjs` timeout ("Follow the thread"), so there are 0 new violations. `qa-r2.md` rows 2, 3 and 9 |
| 5 | Panel average ≥ 8.04 and no persona below 7 | **not done** | Round 1 averaged 6.42, with Harold lowest at 6.29. No round 2 scores exist. See "Panel" |
| 6 | Supervisor signs off each page group, and no copy claim lands without a source | **passed only locally, with exceptions** | Groups A and D and fix rounds b1 to b4 passed tester and supervisor. B-pages, C-structure and C-finish did not pass in their own rounds. Their scopes were finished and passed in fix-b3 and fix-b4. One copy-check hit is left: /pricing, "Stop paying, and it is still yours." The chief ruled to keep it as an ownership reassurance, not an ending (`CHIEF-LOG.md`, "Rulings on the QA copy-check hits") |
| 7 | Phase 2 web app starts only after Daniel says the phone version is done | **not done (by design)** | Waiting on Daniel. See "Phase 2 web app" |

Home `/`: `home-diff.mjs` changed 0 pixels at 390 (of 3,464,760) and 0 at 1440 (of 10,892,160). The baseline is origin/main with P0 applied. Evidence: `qa/premium-2026-11/after-r2/home-diff-390.png`, `home-diff-1440.png`, `after-r2/logs/home-diff.log`.

## Before/after screenshot pairs (key pages)

All paths are under `C:\Users\nguye\Desktop\a-story-landing-premium\qa\premium-2026-11\`. Before = live-equivalent origin/main; after = `after-r2/` (site-premium @ a2f5338). Each page also has a `-full.png` full-page shot in `after-r2/`.

| Page | 390 before → after | 1440 before → after |
|---|---|---|
| /how-it-works (the film) | `before/how-it-works-390.png` → `after-r2/how-it-works-390.png` | `before/how-it-works-1440.png` → `after-r2/how-it-works-1440.png` |
| /pricing | `before/pricing-390.png` → `after-r2/pricing-390.png` | `before/pricing-1440.png` → `after-r2/pricing-1440.png` |
| /for-families | `before/for-families-390.png` → `after-r2/for-families-390.png` | `before/for-families-1440.png` → `after-r2/for-families-1440.png` |
| /organizations | `before/organizations-390.png` → `after-r2/organizations-390.png` | `before/organizations-1440.png` → `after-r2/organizations-1440.png` |
| /care-communities | `before/care-communities-390.png` → `after-r2/care-communities-390.png` | `before/care-communities-1440.png` → `after-r2/care-communities-1440.png` |
| /reserve | `before/reserve-390.png` → `after-r2/reserve-390.png` | `before/reserve-1440.png` → `after-r2/reserve-1440.png` |
| /join (now its own page) | `before/join-390.png` → `after-r2/join-390.png` | `before/join-1440.png` → `after-r2/join-1440.png` |
| /our-story | `before/our-story-390.png` → `after-r2/our-story-390.png` | `before/our-story-1440.png` → `after-r2/our-story-1440.png` |
| /questions | `before/questions-390.png` → `after-r2/questions-390.png` | `before/questions-1440.png` → `after-r2/questions-1440.png` |
| /compare | `before/compare-390.png` → `after-r2/compare-390.png` | `before/compare-1440.png` → `after-r2/compare-1440.png` |
| / (home, must not change) | `before/home-390.png` → `after-r2/home-390.png` (diff: `after-r2/home-diff-390.png`) | `before/home-1440.png` → `after-r2/home-1440.png` (diff: `after-r2/home-diff-1440.png`) |

On a local preview, /start and /account redirect into the web app, so their shots show the web app, not a site page.
The after-r2 screenshots (about 163 MB) are **not committed**. Only `docs/premium` is committed.

## Deploy P0 first

`git log --grep 'P0 deploy first'` on `site-premium`:
- `fbe134a` P0 deploy first: remove the expired 15% offer, "filled" and after-death copy (D1/D2/D3)
- `87f9799` P0 deploy first: keep "Up to 2 places per family" on the /reserve card

Both are on `site-premium` and neither is on `origin/main`. They were merged as d089c50 (P0-copy). Until they ship, production still shows the closed 15% offer (§7.9). They can go out ahead of everything else, for example by cherry-picking both onto main. Daniel decides and deploys.

## Flags for Daniel (spec §7, all still open)

1. The reservation offer from 3 Nov: D1 removes the discount. Do you want a new offer?
2. Trusted person and letter features are hidden on selling pages (D3). Where should they be described?
3. Daniel's letter still opens with his uncles' strokes. Unchanged; your call.
4. The `/gift` link and its 25 December date (D6).
5. Org buyers ask about HIPAA/BAA, security review, iPad/Android, archival formats and StoryCorps in /compare. Nothing is claimed until you give the facts. The org and care pages now invite these questions to the demo and claim nothing.
6. Web app Phase 2 (`audit-webapp.md` §5).
7. `/privacy` and `/terms` answer without the trailing slash. Check the CloudFront setup.
8. Captions on by default (D4) and "Our story" in the bar (D7) can each be reversed in one line.
9. **Deploy the P0 commit first** (above).
10. **The film's stills licence or provenance** (wedding, porch and family stills in v5.6). If it can't be documented, pull `#film` and the film links before deploy.
11. The film's music credit (Salamander Grand Piano, CC BY 3.0) must go in any social post of the film.
12. Where should the "remembering someone who has died" use case live? The /for-families card for it was removed (D10).
13. "We email you when the calls open" (`founding.ts:309`) sits next to "the calls ring … in a private beta". Which one is true today?
14. `.vtt` Content-Type on deploy: add `--content-type text/vtt` for `film/*.vtt` in `publish.yml`.
15. The `/l` error copy assumes a scan problem. A genuinely invalid code needs its own line (Phase 2).
16. Try the film once on a real iPhone. It was checked only in Playwright WebKit.

New flags from panel round 1 (`CHIEF-LOG.md`): F-r1-1 the care and org pages need proof from a pilot or customer; F-r1-2 a price range for care communities and org programs; F-r1-3 does a call ring on an iPad?; F-r1-4 the web app's "This book belongs to" field and its puppy illustration; F-r1-5 the question text inside the film is too small at iPad size (fixing it needs a re-encode).
New from QA r2: the /pricing CLS 0.265 (above). The redirect rule for a codeless `/join` (edge function and inline script) only takes effect on deploy.

## Phase 2 web app

Not started (AC7). The audit is `docs/premium/audit-webapp.md`, and its §5 lists 12 candidates in order of visitor impact. The first five: one host for share links, remove "Codes last 30 days" and "N days left", the same words at the door, a way back to the site, and calmer sign-in screens. Its before shots are in `qa/premium-2026-11/webapp-before/`. The work is in the web-app repo under `Desktop\phone app\`, which this team does not touch. It starts when Daniel says the phone version is done, with its own plan and criteria.

## Housekeeping
- All four builder branches (`premium/b1` to `premium/b4`) have 0 commits that are not in `site-premium`. Their worktrees were removed with `git worktree remove` (no `--force`) once their only changes were confirmed to be build line-ending noise. Details are in `CHIEF-LOG.md`.
- `vercel.json` in the main worktree shows as modified with no content change (line endings from `gen-seo-files.mjs`). Left alone.

## Assumptions (Daniel asleep)
- No round 2 panel scores were given to the chief, so AC5 is reported as not done rather than estimated.
- Denise and Priya's baseline scores are not in any repo file, so the table says "see audit", as instructed.
- C-structure, B-pages and C-finish count as superseded by the fix rounds that passed (fix-b3, fix-b4) on the same files. The rounds themselves stay "not passed" above.
