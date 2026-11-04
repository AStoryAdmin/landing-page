# Premium pass: website (minus home) + web app

**Ask (verbatim):** "For the website is this necessary that we separate institutions and care communities? Do you think it feels like too much on the bar? Can we make it less or somehow organize it better? In this session, have a research agents to actually understand our website + webapp and study the best website out there, what are the top companies doing regarding website -> apply it. Have a chief of agents taking charge of this one, the goal is make our website and webapp to the best it can be (at least 2 times better after this session). this agent can hire as many agents as he needs. Except for the home page -> iterate on every other aspects and sites make sure it's premium, warming, and top tier level (comparable to the best companies in the market and 10x better than competitors). have a supervisor, a design (find all the tates + good skills and top website repo for both phones and laptop view), and testers to actually test out -> users to try and give feedback. upload 1 demo video -> find the best space for it. I'm running another session on the app, this session is for the website and webapp -> after the phone version is done -> start iterate on the website and webapp version accordingly."

## Where things are
- Website: `AStoryAdmin/landing-page`, live = `origin/main` (cc87bfe). This plan works in worktree `Desktop/a-story-landing-premium`, branch `site-premium`. (The `Desktop/a-story-landing` checkout is on an old `web-accounts` branch with an older route map — not touched.)
- Web app: `app.astoryapp.com` = Expo web build of the phone app (`Desktop/phone app/phone-app*`). Another session owns that repo now.
- Demo video: `Desktop/a-story-demo-video/out/A-Story-demo-v5.6-{16x9,9x16}.mp4` (49.4 s, final YC cut, no CTA, ~60 MB each — must be re-encoded for web).

## Goal
Every page except `/` reads as premium, warm and calm on phone and laptop, the top bar asks a visitor to choose between fewer things, and the demo video plays where a doubting buyer will see it. The web app follows once the phone version is settled.

## Not doing
- The home page (`/`) — no layout or copy changes. Shared components (nav, footer) do change and therefore appear on it.
- Phone app / web app code while the other session is working there (phase 2 below waits for it).
- New pricing, plans or product claims. Copy states only what the app does today.
- Pushing or deploying. Daniel pushes.

## Team (run as one workflow, chief in charge)
| Role | Job | Output |
|---|---|---|
| Chief of agents | Owns the plan, hires/retires agents, merges, decides | `docs/premium/CHIEF-LOG.md` |
| Researcher – own site/app | Crawls every live route + app.astoryapp.com at 390 px and 1440 px, maps each page's job and weak spots | `docs/premium/audit-own.md` + screenshots |
| Researcher – best in class | Studies ~12 top sites (e.g. Stripe, Linear, Apple, Aesop, Headspace, Airbnb, Storyworth, Remento, Calm, Notion, Arc, Superhuman) for nav, video placement, pricing, trust, mobile; names patterns, not copies | `docs/premium/benchmarks.md` |
| Design lead | Taste references, skills and open-source repos (phone + laptop), turns findings into a page-by-page spec inside the existing design system (`design.md`) | `docs/premium/design-spec.md` |
| Builders (1 per page group) | Implement the spec | commits on `site-premium` |
| Supervisor | Reviews every diff against spec, copy rules (README, mission.md) and the "never frame around an ending" rule | review notes, blocks bad merges |
| Testers | Build, a11y, responsive, link and perf checks at 390/768/1440 | `qa/premium-2026-11/` |
| User panel (simulated) | 5 personas: adult child buying a gift, the storyteller (75+), a sibling invited in, a care-community director, an org buyer; each walks the site and scores 1–10 | `docs/premium/panel.md` |

## Answer to the nav question (proposed, in task 3)
Live bar today: How it works · Sample books · For families · Pricing · Our story · More ▾ (9 items: Compare, Q&A, Guides, Privacy, Institutions, Care communities, Your own story, Get in touch, Our story again) · Sign in · Start free.
Keep both pages (different buyers: a care director and a college/company buyer need different proof), but stop showing them as two equal top-level choices:
- Bar: **How it works · Samples · Pricing · For organizations ▾ · Our story** | Sign in · **Start free**.
- "For families" leaves the bar (families are the default audience the whole site already speaks to); it stays linked from How it works and the footer.
- "For organizations ▾" holds exactly: Care communities · Schools, libraries & companies · Programs & grants · Book a demo.
- "More" goes away; Compare, Q&A, Guides, Privacy, Your own story, Contact live in the footer and in context links.
- "Our story" appears once.

## Acceptance criteria
1. On astoryapp.com-equivalent build at 1440 px, the top bar shows ≤ 5 text links + Sign in + one primary button; at 390 px the drawer has ≤ 2 levels and no duplicate entries.
2. Every route in `scripts/site-routes.mjs` except `/` has a before/after screenshot pair at 390 and 1440 px in `qa/premium-2026-11/`.
3. The demo video plays on its chosen page(s) with a poster frame, captions, no autoplay sound, `preload="none"` or equivalent, and the page's LCP does not get worse by more than 10 % (measured).
4. `npm run build:static`, `npm run lint`, `npm run a11y` pass with zero new violations vs `origin/main`.
5. The simulated panel's average score across the five personas closes at least half of the gap to 10 vs the baseline (e.g. 6.0 → ≥ 8.0) on the same rubric (baseline scored first, on live origin/main), and no persona scores below 7/10. (This is how "2× better" is measured: half the remaining distance to perfect. Changed 2026-11-02 at launch because a plain 2× multiplier is impossible once the baseline is above 5.)
6. The supervisor signs off each page group; no copy claim lands without its source (table below).
7. Phase 2 (web app): only starts after Daniel says the phone version is done; it gets its own criteria then.

## Tasks
- [ ] 1. Baseline: researchers audit live site + web app; panel scores baseline — files: `docs/premium/audit-own.md`, `docs/premium/panel.md` — done when: every route has 390/1440 shots and a baseline score.
- [ ] 2. Benchmarks + design spec — files: `docs/premium/benchmarks.md`, `docs/premium/design-spec.md` — done when: Daniel has seen the spec summary (one message, top 10 changes).
- [ ] 3. Nav + footer restructure — files: `src/components/navbar*`, `footer*` — done when: AC 1 passes in local build.
- [ ] 4. Demo video: re-encode (H.264 1080p + 720p, WebM, ≤ 8 MB each), VTT captions, poster; place it (proposed: `/how-it-works` hero, and a short "See it in 50 seconds" block on `/pricing` and `/organizations`) — done when: AC 3 passes.
- [ ] 5. Page group A: How it works, Samples, For families, Your own story.
- [ ] 6. Page group B: Pricing, Compare, Reserve, Start/Sign-up/Sign-in/Account.
- [ ] 7. Page group C: Organizations, Care communities, Programs, Contact.
- [ ] 8. Page group D: Our story, Questions, Guides (+ guide pages), Privacy, Terms (visual only; legal text unchanged), 404, Thanks.
- [ ] 9. Full QA + panel re-score — done when: AC 2, 4, 5 pass; report in `docs/premium/RESULT.md`.
- [ ] 10. Phase 2 plan for the web app — written after Daniel confirms the phone version is done.

Each of 3–8 is one commit after tester + supervisor pass.

## Verification
| # | Check | Where it runs | Evidence |
|---|---|---|---|
| 1 | Count nav links via script at 390/1440 | local `vite preview` of build | DOM dump + screenshots |
| 2 | `npm run shots` / `scripts/responsive.mjs` over all routes | local build | `qa/premium-2026-11/{before,after}/` |
| 3 | Lighthouse mobile on video pages, before vs after | local build (real target after Daniel deploys) | JSON reports |
| 4 | `npm run build:static && npm run lint && npm run a11y` | local | command output |
| 5 | Panel rubric, same personas and questions both times | agents over local build | `docs/premium/panel.md` |
| 6 | Supervisor review log per commit | repo | `docs/premium/CHIEF-LOG.md` |
| — | Real-target check | astoryapp.com after Daniel deploys | `scripts/verify-live.mjs` output |

Until Daniel deploys, everything is "passed only locally".

## Claims that need a source
- Prices ($19.99/mo, $119/yr, $79/30 days, books from $39, $1 reserve, 15 % off by 2 Nov) — source: app `PricingScreen.js` / `src/lib/pricing.ts`. Note: the "15 % off if you reserve by 2 November" line expires **today**; needs Daniel's call on what replaces it.
- Video length "50 seconds" — source: the file (49.4 s).
- Any count of testers, families, books or institutions — none will be added without a number from Supabase.

## Risks
- The panel is simulated; it can flatter. Mitigation: baseline and after use the same rubric, and the supervisor reads the reasoning, not just numbers. Real-user feedback (Daniel's TestFlight families) is the true check.
- Shared nav/footer changes show on the home page. Mitigation: home screenshots before/after are reviewed too.
- 60 MB video files would wreck mobile load. Mitigation: task 4 size limits.
- Another session might push to `origin/main` meanwhile. Mitigation: rebase before each commit; no force-push.

## Assumptions
- "Premium, warming" = within the current brand (brown/cream cloth, serif) rather than a rebrand.
- One video = the v5.6 16:9 cut (9:16 for phone widths).
- Workflow size: ~10–14 agents across phases (above the default medium guideline, because you asked the chief to hire as many as needed).
