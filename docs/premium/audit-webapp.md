# Web app audit: app.astoryapp.com, signed out (2026-11-02)

Researcher pass for task 1 of `docs/plans/2026-11-02-premium-site-and-webapp.md`. Read-only: no account was made, no sign-in, no form submitted, nothing in `Desktop/phone app/*` was edited.

- Live pages captured at 390x844 and 1440x900 (1440 also full-page): `qa/premium-2026-11/webapp-before/` (60 PNGs). Naming: `app-<screen>-<width>.png` for the web app, `site-<screen>-<width>.png` for the astoryapp.com side of each handoff.
- Sources read: site `src/lib/app.ts`, `src/pages/site/AppDoor.tsx`, `src/App.tsx`, `index.html` (the redirect script), `src/styles/theme.ts`; web app `Desktop/phone app/web-app` (`src/App.tsx`, `src/state/RequireAuth.tsx`, `src/pages/Join.tsx`, `DESIGN.md`); phone app `Desktop/phone app/phone-app` (`src/lib/links.js`, `src/screens/WelcomeScreen.js`, `SignInScreen.js`, `FamilyLinkScreen.js`); `Desktop/phone app/WEB-PARITY-AUDIT.md` (26 Oct).

## 0. A correction to the brief

app.astoryapp.com is **not** the Expo web build of the phone app. The live HTML loads a Vite bundle (`/assets/index-*.js`, Montserrat + Cormorant/EB Garamond, `theme-color #F7F2EA`), and its routes match `Desktop/phone app/web-app/src/App.tsx` (React + Vite, its own `DESIGN.md`, local branch `main` at 9c9997a, 27 Oct). The phone app (`phone-app`, Expo) is a separate codebase; the two share data (Supabase) and some `app-core` logic, not screens. Phase 2 changes therefore land in `web-app`, which was not named as owned by the other session; still treated as read-only here. The site's own comment in `src/lib/app.ts` already says "web-app/src/App.tsx", so the site code is right and the brief is what drifted.

## 1. What a signed-out visitor can reach

| Address | What shows (live) | Shot |
|---|---|---|
| `/` | Redirects to `/welcome` (the 26 Oct audit said it opened Sign in; now fixed) | `app-root-*` |
| `/welcome` | Front door: paper card "Every life holds a story worth keeping." + three lines (question a day / family adds its side / book arrives), **Begin a book**, Sign in, "Have a family code? Use it here", plus a live sample-book turner (3 families, 8 cover colours) on the cloth | `app-welcome-*` |
| `/sign-in` | Open book spread: album photos left, ornate gilt frame with dog right. Email + password, Show, **Sign in**, "Email me a code instead", Forgot password, Create an account. "With the same account as the A Story app." | `app-sign-in-*` |
| `/create-account` | Same spread; "This book belongs to / Your name", email, **Continue**, "Free to start. No card." | `app-create-account-*` |
| `/forgot-password`, `/verify` | Same spread, one field each | `app-forgot-password-*`, `app-verify-*` |
| `/join/ZZZZZZ` | "Join your family's book." Code shown large, "Step 1 of 2: your own account", **Create an account** / I already have an account; left page explains what joining means | `app-join-badcode-*` |
| `/c/<unknown>` | "This link isn't available." + What is A Story? | `app-c-unknown-*` |
| `/p/<unknown>` | Cloth, small paper card with dog: "This story isn't shared." + Keep your own story | `app-p-unknown-*` |
| `/a/<unknown>` | One sentence on a paper sheet. No logo, no button, no way on | `app-a-unknown-*` |
| `/gift` | Live, 200 (was 404 on 26 Oct). Holiday gift form with a card preview; different look (see 3) | `app-gift-*` |
| `/plans` (and any signed-in page) | Sign in with `?next=` back to it | `app-plans-signedout-*` |
| `/no-such-page` | "This page isn't here." + Go home | `app-404-*` |

No horizontal scroll on any page at 390 or 1440. Console errors: one 404 resource on `/p/<unknown>` and `/a/<unknown>` (the expected lookup miss), none elsewhere.

## 2. The handoff seam (site to app)

How it works today:
- Every door is one constant: `START_HREF = https://app.astoryapp.com/create-account` (label "Start free"), `APP.signIn = /sign-in`. Used by the header, StickyStart, and the CTAs on How it works, For families, Pricing, Our story, Your story and the kit closer.
- The site's old addresses `/start`, `/sign-in`, `/sign-up`, `/account`, `/join/<code>`, `/join?ref=`, `/c/<slug>` are bounced to the app before paint by the inline script in `index.html` (also at the CloudFront edge), with `AppDoor.tsx` as the fallback page ("Start free. Make your account in A Story, in your browser. No card.", `site-start-door-nojs-1440.png`). Exception: `/sign-in?next=/reserve` and `/sign-up?next=/reserve` stay on the site for the $1 reservation (`site-sign-in-reserve-*`).

Where it breaks or jars:
1. **Label changes at the door.** Site: "Start free". App: lands on "Create your account." and its front door says "Begin a book"; the phone app says "Begin your story". Three names for one act.
2. **Look changes at the door.** The site's top bar (logo, 5 links + More, Sign in, cream "Start free" pill) disappears; the app has only the logo, and the logo goes to `/welcome`, not back to astoryapp.com. There is no route back to the site from sign-in, create-account, join or the error pages, except "What is A Story?" on `/c/` which goes to the app's own `/welcome`.
3. **"Start free" skips the app's front door.** Site visitors go straight to `/create-account`; `/welcome` (the app's best signed-out page, with the live sample books) is only seen by people typing app.astoryapp.com. Fine for intent, but it means the two front doors (site home and app `/welcome`) duplicate each other with different headlines.
4. **Two readers for the same share link.** The phone app builds shared-story and contribute links on the **site**: `storyUrl` = `astoryapp.com/p/<slug>`, `contributeUrl` = `astoryapp.com/contribute/<slug>` (`phone-app/src/lib/links.js`, `WEB_BASE` defaults to astoryapp.com, `.env.example` leaves it blank). The site renders those itself (`BareLayout`: `PublicStory`, `Contribute`), and does **not** forward them. The web app has its own `/p/<slug>` (Wall) and `/c/<slug>` (Contribute), and the site forwards `/c/` but not `/contribute/`. Result: a relative opening a link from the phone sees the site's plain version; one opening a link from the web app sees the app's richer one. The error states differ too (site: centred logo, "This story isn't available. The link may be private or no longer shared.", HTTP 404, no button; app: dog card, "This story isn't shared.", button). Compare `site-p-unknown-1440.png` with `app-p-unknown-1440.png`.
5. **The join model differs by device.** Phone `FamilyLinkScreen`: a visitor reads and adds what they remember with just a name; the account is offered after. Web `/join/<code>`: "Step 1 of 2: your own account" before anything is shown.
6. **Sign-in defaults differ.** Phone defaults to the emailed code ("Email me six numbers") and offers Apple; web defaults to password, offers "Email me a code instead", and has no Apple or Google button. A phone user who signed up with Apple has no obvious way in on the web.
7. **No site door to `/gift`.** The gift page is live in the app but nothing on astoryapp.com links to it (grep: no `/gift` href in `src/`), during the gift season the plan names.
8. **Nothing on the site's Sign in link says where it goes.** Clicking "Sign in" changes domain and look with no in-between; acceptable, but the app sign-in's "With the same account as the A Story app." is the only reassurance.

## 3. Look: site vs web app

| | astoryapp.com | app.astoryapp.com (signed out) |
|---|---|---|
| Ground | Chocolate bookcloth band for heroes, ivory/paper sections below, full editorial layout | Chocolate bookcloth full-bleed; one paper sheet or an open-book spread on it |
| Type | Cormorant Garamond display, EB Garamond text, Montserrat UI (`theme.ts`; note `design.md` still says Source Serif 4 / Figtree: the doc is stale) | Same three faces (+ Mrs Saint Delafield, Caveat for captions). Matches |
| Primary button | Cream pill on cloth with arrow, chocolate pill on paper | Chocolate pill, no arrow; secondary is outline pill. Close, but arrow and label differ |
| Fields | Site reservation form: boxed | Ruled line inside an ornate gilt frame (sign-in, create, join); boxed rounded inputs on `/gift`. Two field styles inside the app itself |
| Ornament | Restrained: hairlines, foil rules, real photos | Heavy: a raster baroque frame, a cartoon puppy on every auth and error page, "This book belongs to" bookplate. The most "not the site" element |
| Logo colour | Cream "A" + gold "Story" on cloth; teal "A" + gold "Story" on paper (`site-p-unknown`) | Cream + gold on cloth; chocolate "A" + terracotta "Story" on `/gift`. Three lockup colourways in the family |
| Headline voice | Specific ("A Story does the asking.") | "Every life holds a story worth keeping." repeated above sign-in at 1440 and 390, then "Sign in." again in the frame: two headlines stacked |
| Footer / legal | Full footer | None on auth pages (privacy link only inside create-account per source) |
| Mobile 390 | Sticky Start, drawer | Sign-in: frame first, then three photos and a caption below the fold, 1838 px tall for two fields. Welcome: 1708 px; the sample-book front cover renders mostly blank at 390 |

Rule check (never frame around an ending/expiry/loss):
- `/join/<code>`: "Codes last 30 days." (`web-app/src/pages/Join.tsx:268`) frames the code by its expiry. Also `familyRoster.js:126-132` prints "N days left" / "ends today" on invite codes (signed-in, not captured; source-confirmed).
- Site `/p/` error: "no longer shared" frames a loss; app's "This story isn't shared." is the better line.
- `/gift`: "The card, as it will arrive on 25 December." and "A gift for the holidays": a date claim, not a countdown; fine as long as delivery on that date is real (source not checked here; flag for the supervisor's claims table).

## 4. What is already good (keep)
- One constant for every door (`src/lib/app.ts`) and the pre-paint redirect: no flash of the old site page.
- The app's signed-out pages share the site's fonts, chocolate cloth and gold accent; the gap is ornament and chrome, not palette.
- Error pages say what happened and what to do; `/c/` and `/p/` give a next step.
- `/welcome`'s live sample-book turner is the strongest "show, don't tell" asset across both properties.

## 5. Phase 2 candidates (after Daniel says the phone version is done)

Ordered by visitor impact. Each is a web-app (`Desktop/phone app/web-app`) change unless marked "site". None should start while the other session owns that tree.

1. **One share link, one reader.** Decide which host renders `/p/<slug>` and contribute links. Recommendation: the web app (richer Wall, same error copy as the app). Then: site forwards `/p/<slug>` and `/contribute/<slug>` to `app.astoryapp.com/p/` and `/c/` in `index.html` + edge function + `AppDoor` (site), or the phone sets `EXPO_PUBLIC_WEB_URL=https://app.astoryapp.com` (phone). Old printed/sent links keep working either way.
2. **Take "Codes last 30 days" and "N days left" out.** Say what the code does, not when it stops (e.g. "If a code doesn't open, ask them for a fresh one").
3. **Same words at the door.** Pick one name for the first act across site CTA, app `/welcome` and phone ("Start free" on the site, "Begin your story" on phone, "Begin a book" on web today). Suggest the app's create-account heading echo the site ("Start free. No card." is already the site's line).
4. **A way back to the site.** Logo on signed-out pages links to astoryapp.com (or a small "About A Story" text link as AppDoor does); a slim footer with Privacy, Terms, Questions on sign-in / create / join / errors.
5. **Calmer auth chrome to match the site.** Replace the raster baroque frame with the site's hairline foil frame; drop the repeated "Every life holds..." headline above "Sign in."; keep the puppy to one place (welcome or empty states), not every form. At 390, put the photos above the form as one small print or remove them, so the form is the page (today 1838 px for two fields).
6. **Sign-in parity with the phone.** Default to the emailed code like the phone, keep password as the alternative, and add Apple (and Google if the phone has it) once the provider config is approved; otherwise phone-Apple users are locked out on the web.
7. **Join like the phone.** Let a visitor with a code or link read what's shared and add what they remember with just a name, offering the account after (phone `FamilyLinkScreen` model), instead of "Step 1 of 2: your own account".
8. **`/a/<token>` dead end.** Give the error the same card as `/p/` and `/c/`: logo, one line, and "What is A Story?".
9. **One field style, one lockup.** `/gift` uses boxed inputs and a terracotta lockup; auth uses ruled lines and cream/gold. Pick the site's.
10. **Door to `/gift` from the site** (site, once Daniel confirms the gift offer and its delivery date are real): Pricing and For families link to `app.astoryapp.com/gift`; add `APP.gift` to `src/lib/app.ts`.
11. **Primary button match.** Site pills carry an arrow; app pills don't. Align (either way) so the click from site to app feels like the same button.
12. **Fix the stale `design.md`** (site): it names Source Serif 4 / Figtree; `theme.ts` and both live properties use Cormorant / EB Garamond / Montserrat.

## Assumptions
- "Phone app source" in the brief was read as both `phone-app` (for share links, sign-in defaults, join model) and `web-app` (the code actually behind app.astoryapp.com). Both untouched.
- Unknown slugs/tokens were used for `/p`, `/c`, `/a`, `/join` because no real share link appears on the site; only the error/landing states were captured. Real shared-story pages need a family's link from Daniel.
- The local `web-app` checkout may differ from production; every claim about live behaviour above comes from the screenshots, and source lines are cited only where the live page agrees.
