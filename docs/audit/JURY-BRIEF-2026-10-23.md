# The jury: how the phase-2 site is judged (2026-10-23)

Bao asked for the site to be judged "as a top tier design executive, UI/UX, CMO - content,
writing, design, elements, decorations, interactions, motions - both as customer and investor".
A Story applies to YC on 2026-10-24.

Every judge reads `docs/PHASE2-DIRECTION-2026-10-23.md`, `~/.claude/bao/DESIGN-TASTE.md`,
`WORKING-STYLE.md`, `WRITING-VOICE.md`, `design.md`, and the web app's
`web-app/docs/BAOS-STANDARD.md`, then judges the running site (dev http://localhost:5191,
or the built `dist/` served by `npm run preview`) at 1366x768, 1920x1000, 2560x1300 and
390x844. Read-only: judges write only their report.

Each judge scores 1-10 on each axis, names the verdict (PASS only if every axis is 8+ and
there is no blocker), and gives a ranked fix list: severity, page, what, where in code, the fix.

## 1. Design executive (bao-design-review)
Axes: first impression and brand world (does it match the app, does it feel premium,
warm, crafted, never template); layout and use of the screen; typography; imagery (real,
earns its place, consistent treatment); decoration (earned, restrained); page length and
rhythm; consistency across pages.

## 2. Craft, interaction and motion (skills-steward)
Axes: taste-skill house rules (inspector), hallmark structural variety, impeccable craft
floor, emil-design-eng polish, GSAP motion (house curves, arrivals, view transitions,
reduced motion, nothing half-faded), interaction states and 44px targets, performance.

## 3. CMO, as the customer
Persona: Maria, 46, Columbus, her father is 79 and lives two states away. She found the
site from a friend's link on her phone in the evening. Axes: does she understand what it
is in 5 seconds; does she believe it (trust, privacy, who is behind it); does she know
what to do next and what it costs; does the copy sound like a person (Bao's voice, humanizer);
emotional pull without drama; the path from home to sign-up or reserve.

## 4. YC partner, as the investor
Persona: a YC partner with 4 minutes between applications, on a laptop. Axes: clarity of
what it is and for whom in 10 seconds; is the product real (shown, not described); why now;
the team; any number, claim or name that is wrong, unproven or inconsistent; does it look
like a company that ships; anything embarrassing (placeholder, broken link, 404, dead end).
