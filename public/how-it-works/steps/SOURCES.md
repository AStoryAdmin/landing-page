# How it works: setup-step screenshots

Every image is a capture of the real A Story phone app (Expo web build of `phone app/phone-app`, branch `design-sprint` at `bdc70edd` plus that checkout's uncommitted edits), with the app's fake family data (the Millers). Nothing is drawn or mocked.

- Captured: 2026-11-07 by `qa/tester-1107/capture-steps.mjs` (re-run: `npx expo start --web --port 8095` in the phone-app folder, then `node qa/tester-1107/capture-steps.mjs`).
- Viewport: 390 x 844 CSS px, deviceScaleFactor 3 (PNGs are 1170 x 2532; WebPs are resized to 780 x 1688, since the page shows them at ≤ 260 CSS px), light theme (`localStorage astory-theme=light`), iPhone safe areas emulated (top 47, bottom 34). App screen only, no device frame.
- PNG originals: `qa/tester-1107/steps-raw/`. WebP here at quality 82, 780 px wide.
- Base URL: `http://localhost:8095`.

| File | Step | URL (after the base) | How it was reached | Screen source (phone-app) |
|---|---|---|---|---|
| `01-install-welcome.webp` | Install and sign in | `/?screenshot=1&screen=Welcome` | Screenshot harness | `src/screens/WelcomeScreen.js` |
| `02-pick-hour.webp` | Pick the hour | `/?demo=1&as=rose` | Demo walkthrough as Rose: Your account → "A Story calls you at 10:00 AM" → "Change the hour" (the hour wheel open). Not in the harness's SCREENS. | `src/screens/ScheduleCallScreen.js` + `src/components/guide/HourWheel.js` |
| `03-phone-rings.webp` | The phone rings | `/?demo=1&as=rose&call=1` | Demo as Rose: the incoming call at rest, before Answer (re-shot 2026-11-07 so 03 and 04 are Rose's own view) | `src/screens/IncomingCallScreen.js` |
| `04-they-talk.webp` | They talk | `/?demo=1&as=rose&call=1` | Demo: the incoming call → "Answer" → 12 s into the call | `src/screens/LiveTalkScreen.js` |
| `05-memory-appears.webp` | The memory appears | `/?screenshot=1&screen=Memory&params={"storyId":"story-1","memId":"mem-1"}` | Screenshot harness | `src/screens/MemoryScreen.js` |
| `06-family-adds.webp` | The family adds | `/?screenshot=1&screen=FamilyMemory&params={"storyId":"story-1","name":"Rose","personId":"p-rose","memoryId":"mem-1","memoryTitle":"The house with the blue door"}` | Screenshot harness (a side of one memory) | `src/screens/FamilyMemoryScreen.js` |

`params` is URL-encoded in the actual request (`encodeURIComponent(JSON.stringify(...))`); the exact requested URLs are in `qa/tester-1107/steps-raw/results.json`.
