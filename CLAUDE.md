# astoryapp.com — the marketing site

This repo (`AStoryAdmin/landing-page`) is the live astoryapp.com. `Desktop/a-story-site` is an old static demo, not this site.

## Where things are
- Code map: `MAP.md`. Design and voice: `docs/START-HERE.md`, `docs/mission.md`, `docs/code-conventions.md`.
- Pages: `src/pages/site/` (How it works = `HowItWorks.tsx`, home sections in `home/`, the film in `kit/Film.tsx`).
- Sample books: `public/samples/index.html` + one data file per book in `public/samples/books/<id>.js` (edit the data, not the HTML).
- Plans: `docs/plans/YYYY-MM-DD-<slug>.md`. Browser evidence: `qa/<topic>/`.
- Copy rules come from the phone app: `phone app/phone-app/docs/PHILOSOPHY.md` (never "legacy", "memoir", "immigrant"; no "It's not X, it's Y"; no invented numbers).

## Checks
- `npm run check` (lint, contracts, routing, full build with prerender, production contracts).
- Sample books: `node scripts/qa/samples-check-data.mjs <file>` and `node scripts/qa/samples-overflow.mjs <url>`.
- Page checks are Playwright scripts under `qa/`; each accepts `--base` (local preview or `https://astoryapp.com`).

## Publishing
- A merge to `main` publishes astoryapp.com within minutes (S3 + CloudFront; the GitHub `publish.yml` job is skipped, the upload happens outside it). See `docs/PUBLISHING.md`.
- Then re-run the change's checks with `--base https://astoryapp.com`. Until that passes it is "passed only locally".

## Worktrees
- Many worktrees of this repo sit on the Desktop (`a-story-landing-*`, `asl-*`). Start new work from `origin/main` in a fresh worktree.
- A worktree never runs `npm ci`/`npm install`: junction `node_modules` to a checkout with the same `package-lock.json` (e.g. `a-story-landing-main`).

## Lessons
One line per mistake that a rule would have prevented.
- 2026-11: Before reusing a `public/mission/` photo, grep the built `dist/**/index.html`, not only `src/`; two photos were already live elsewhere.
- 2026-11: A page offered "See a sample call" that led to written stills only. → Every Watch/See/Hear control must lead to something that plays; `qa/tester-1107/promises.mjs` checks it.
