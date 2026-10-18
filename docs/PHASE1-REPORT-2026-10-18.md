# astoryapp.com, phase 1: report

18 October 2026. Branch `site-phase1`, made from `motion`. Nothing is pushed or
merged, and nothing in AWS, Cloudflare or Supabase was touched. No form on the
live site was submitted. The only live requests were read-only `curl -I` checks.

## The starting point

`motion` (dfc01c1, 4ad82dc) is sound. Lint, the lead-form tests, the build and
the prerender all passed on it. `npm run check` failed on it, but not because of
those commits: `production-contracts.mjs` compared four source files with a
September reference copy at `../_reference-review/`, which is no longer on disk.
That check would also fail on `main`. It is replaced (see commit 1).

## Why live answers 404

Checked with `curl -I` on 18 October:

- `https://astoryapp.com/pricing/index.html` answers 404. The page files are
  not on S3. The last upload (15 October, 05:26 UTC) was the app shell only.
- `/pricing` gets a 301 to `/pricing/` from S3 itself (`Server: AmazonS3`,
  `X-Cache: Miss from cloudfront`). With the rewrite function attached,
  CloudFront would ask S3 for `/pricing/index.html` and there would be no 301.
  So the function is not attached.
- `/pricing/` then misses on S3, and the 404 error response serves the shell
  with status 404.

## What changed, by commit

**4b512b4 Every page its own file, and the doors into the web app**
- `npm run build` builds every page now (shell plus prerender). The shell-only
  build is `build:shell`, so nobody uploads it by accident. `build:static` is
  kept as an alias, because the workflow calls it.
- The prerender writes 30 pages, each with its own title, description and
  canonical: the 22 public ones, plus `/start`, `/sign-in`, `/sign-up`,
  `/account`, `/join`, `/thanks` and `/l` (noindex, not in the sitemap). It
  also writes a small file at each old address (`/experience`, `/faq`, …) with
  a canonical and a meta refresh, so those answer 200 and move on.
- Canonicals, og:url, breadcrumbs and the sitemap use the trailing-slash form
  (`https://astoryapp.com/pricing/`). S3 answers that with a 200 whether or not
  the function is attached. Before, every canonical pointed at a 301.
- `/your-story` was both a page and a redirect. It is a page now.
- Invitations: `/?ref=CODE`, `/join?ref=CODE` and `/join/CODE` go to
  `https://app.astoryapp.com/join/CODE`. The code must match
  `^[A-Za-z0-9]{6}$` and is uppercased, as the app does. `/c/SLUG` goes to the
  app's `/c/SLUG` (the site has no `/c` of its own). `/sign-in`, `/signin`,
  `/login`, `/sign-up`, `/signup`, `/account` and plain `/start` go to the
  app. The exception is `?next=/reserve...`, the $1/$29 reservation's own
  sign-in, which stays on the site.
- This is done three ways:
  - an inline script at the top of `index.html`, which runs before anything
    paints and is carried into every prerendered page. It needs no AWS change;
  - `src/pages/site/AppDoor.tsx`, the React fallback, which says where it is
    going and gives the link. It is also the prerendered `/join` page;
  - `deploy/cloudfront-viewer-request.js`, the edge version for the founder to
    attach. It replaces `deploy/cloudfront-index-rewrite.js` and keeps its
    index rewrite. It also 301s www to the bare domain and the old addresses
    to their pages.
- `/l`, `/p/` and `/contribute/` are not redirected. `/l` changes only in that
  it does not leave while the prerender takes its snapshot, so its file says
  "Opening the recording…". A real scan behaves exactly as before.
- `qa/routing/cloudfront.test.mjs` (now part of `npm run check`) runs the edge
  function and the inline script on the same 30 addresses, plus the old ones,
  and checks they agree.
- `production-contracts.mjs` checks every snapshot's canonical and that each
  carries the invitation script. It no longer compares against the missing
  September copy.
- `verify-live.mjs` checks every page from `site-routes.mjs`, the canonicals,
  the invitation script and the old addresses. It takes a local origin.
- `scripts/question-bank.mjs` is added here; commit 2 uses it.

**62de8ee Send people into the web app, and say what the product does**
- One primary action, "Start free", goes to
  `https://app.astoryapp.com/create-account`. It is in the header, the Home
  hero, the book's last page, each page's closing invitation, the phone bar
  and every page's own call to action. Home's price ladder now ends on "Every
  plan, side by side", so Home shows one action, not six.
- "Sign in" goes to `https://app.astoryapp.com/sign-in`, in the header and in
  the footer.
- "Reserve for $1" and the $29 founding place are on Pricing only:
  - beside "Start free" in the decision bar, for a paid plan, as a text link;
  - in the price ladder's "early ways in" box.
  The `/reserve` page itself stays. Its opening now says anyone can start free
  and that plans are not on sale yet.
- The site's own `/account` page is deleted (the app has accounts). The
  site's `/sign-in` and `/sign-up` stay for the reservation only. Their "when
  it opens to you" and "when it is your turn" lines are gone.
- The "coming soon" and waitlist wording is gone:
  - the App Store note says what works in a browser today;
  - the FAQ's "Can I sign up today?" says yes;
  - Reserve's "Join the waitlist" (for the next founding group) is "Ask for a
    place".
- Product truth:
  - 547 questions, counted from the web app's `ALL_PROMPTS` at the start of
    every build into `src/lib/questionBank.json`. When the app isn't checked
    out beside the site (as in GitHub Actions), the committed count is used,
    and the script says so. Sensitive questions: 66.
  - Free includes one ten-minute conversation (`firstCall.js`,
    `FREE_FIRST_CALL_MINUTES = 10`). The compare table no longer says "No
    calls".
  - The hardcover is on Individual, Family and Express only
    (`bookAllowance.js`). Monthly gets the Digital Edition. Fixed in the FAQ,
    `BOOK.members`, the price ladder and the Pricing description.
  - Monthly is "90 minutes of guided calls a month" (`callUsage.js`).
  - Express is "30 days" (`EXPRESS_DAYS = 30`), not "about 30 days".
- The browser:
  - a new FAQ entry, "Can I use A Story on a computer?";
  - one line in Home's step three, "on a phone or in any browser at
    app.astoryapp.com";
  - the install question now says reading and adding need only a browser.
- Family promise: "They open your family’s story, read what is there, and add
  their side." The FAQ says the same. "Correct details" is gone, because
  nothing shows it is a feature.

**2137ee3 The bugs from both audits that are not design work**
- `/samples` on a phone:
  - The header button was `position: fixed`, but the nav's
    `backdrop-filter` made the nav its containing block, so the button sat on
    top of the links. It stays in the nav row now.
  - The links wrap instead of running off the edge, and the nav no longer
    sticks on phones.
  - Its two "Reserve for $1" buttons are "Start free".
- Guide header: "All conversation guides" sits on its own line.
- Questions: the search box is at least 300px wide, and the placeholder is
  "Search: privacy, books, calls".
- Heading order:
  - Pricing's price ladder has an h2 (visually hidden).
  - `/samples`' h4s are h3s.
  - The drawn app screens' titles are no longer h4/h5. They broke the order
    on Home and How it works. They look the same.
  - axe `heading-order` is clean on the pages checked.
- Tap targets of 44px:
  - footer and phone-menu links;
  - the Programs badges;
  - "open" on the sample books;
  - Show/Hide, "Forgot your password?" and the referral checkbox;
  - the swatches on `/samples` (44px hit area).
  The book's timeline stops share the rail on a phone (about 40×44, see
  below).
- Descriptions under 160 characters: `/compare`, `/your-story`,
  `/guides/interview-a-parent`. `/reserve` was fixed in commit 2. None is over
  160 now.
- `/programs` has its own share card, `public/og/programs.jpg`.
  `npm run social -- programs` renders one card.
- `/start` layout shift: plain `/start` now goes to the app, so the 0.59 is
  gone. See below for `/reserve`.

**3c69bea Publishing notes for 18 October; header and copy touch-ups**
- `docs/PUBLISHING.md` gets a dated section: why live answers 404, and what
  the founder does in AWS and DNS. The by-hand steps use `npm run build`.
- "Sign in" sits last in the header row, beside "Start free".
- MAP.md and README are updated, with small copy fixes.

**(this report)** `docs/PHASE1-REPORT-2026-10-18.md`.

## What the founder must do (also in docs/PUBLISHING.md, "2026-10-18")

1. **Turn on the publish workflow.** It has been skipped on every push because
   the repository variable `AWS_ROLE_ARN` is not set.
   - In AWS IAM: add the GitHub OIDC identity provider. Then create the role
     `astoryapp-publish`, trusted for `AStoryAdmin/landing-page` on branch
     `main`, with the S3 and CloudFront policy in PUBLISHING.md.
   - In GitHub → Settings → Secrets and variables → Actions → Variables, add
     `AWS_ROLE_ARN`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`, `AWS_REGION`,
     `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
   - Then Actions → Publish astoryapp.com → Run workflow.
   The workflow's safety checks are unchanged.
2. **Attach the CloudFront function.**
   - Open CloudFront → Functions, and open the existing rewrite function or
     create one (`cloudfront-js-2.0`).
   - Paste `deploy/cloudfront-viewer-request.js`, then Save and Publish.
   - Associate it with the default behavior as the Viewer request.
   - Check: `curl -sI https://astoryapp.com/pricing` answers 200, and
     `/join/ABC123` answers 302 to `app.astoryapp.com/join/ABC123`.
3. **www.** www.astoryapp.com serves this site today, so it reaches this
   distribution, and the function will 301 it to the bare domain. If that
   check fails, add a Cloudflare Redirect Rule instead. It needs the `www`
   record proxied.
4. **Check.** Run `npm run verify:live` until it says "astoryapp.com is good".
5. **Not AWS, but related.** Set the Supabase secret
   `INVITE_JOIN_URL=https://app.astoryapp.com`, so new invitation emails skip
   the hop through astoryapp.com.

Until steps 1 and 2 are done, merging this branch changes nothing live. A
person has to upload `dist/` (PUBLISHING.md, "Every publish").

## Verified

- `npm run check`: green. Lint, the lead-form tests, the routing test (30
  addresses agree), the build, the prerender (30 routes and 6 old addresses)
  and the production contracts (22 public snapshots with their own canonical,
  8 noindex snapshots, 673 asset references).
- `npm run preview`, headless Chromium 1.63 from `09142026/node_modules`:
  - Coverage: 28 pages at 1366×768, 1920×1080, 2560×1440 and 390×844
    (mobile, touch), 112 page-views in all.
  - No console errors, no failed requests and no horizontal overflow on any
    of them.
  - All 16 redirect cases pass at 1366 and at 390. Requests to
    app.astoryapp.com were intercepted, so nothing reached the real app.
  - The cases: `?ref`, `/join` (lower case, trailing slash), `/c/`,
    sign-in/up, `/account`, `/start`, a bad code that stays, `/start?intent=demo`
    and `?next=/reserve` that stay, and the old addresses.
- `node scripts/verify-live.mjs http://127.0.0.1:4173`: every page 200 with
  its prebuilt HTML, its canonical and the invitation script; all old
  addresses move on. One expected failure: "no Supabase address in the build",
  because this computer builds without `VITE_SUPABASE_URL`. CI has it.
- axe-core on 8 pages at 1366 and 390: `heading-order`, `target-size`,
  `link-name`, `button-name`, `image-alt` and `label` are clean.

## Not sure, or not done

- **The family-call link.** `app.astoryapp.com/?join=…` goes to the web app's
  sign-in. The web app has no `?join=` route (checked in `web-app/src`, commit
  41260ae), and its Talk page says the calls happen on the phone. So "he
  taps it, his browser opens… no app, no account, no password" was false, and
  it is cut. The card now reads: "Call Grandpa from the app. Ring anyone in
  the family who has A Story on their phone, and A Story listens to you both."
  That is based on the phone app's `familyCalls.js`, which rings family
  members in the tree who have their own account. I did not check that
  `family_calls.sql` is deployed, or that phone-to-phone calls work in a
  released build.
- **Family readers.** I took the founder's word, and web-app commit f059ffb
  ("Family readers on the web… family_story_read"), that someone who joins by
  code can now read the shared memories and add their side. I did not test it
  end to end.
- **Whether the phone app is public.** The site still says the storyteller
  installs A Story to be called. Reserve still says that before launch only an
  iPhone rings. I did not find an App Store listing (`APP_STORE_URL` is
  empty).
- **Paid plans on the web.** Nobody can buy Individual, Family or Express on
  the web yet. The `checkout.ts` links are empty, and the web app's `/plans`
  "Choose" still opens astoryapp.com/pricing. Pricing now says so plainly and
  offers the $1 reservation as the secondary link. Breaking the loop on the
  web app side is web-app work and was not done here.
- **The $1 deadline.** The Pricing link reads "by 2 November, 15% off" from
  `founding.ts`. After 2 November it drops the date by itself.
- **`/reserve` layout shift.** It is 0 on a normal load. In the four-size
  audit run it measured 0.13 to 0.16 on desktop, and I reproduced it once
  with CPU and network throttling. The cause is the display font arriving
  after first paint: the headline gains a line and pushes the lead down
  86px. It is a font-loading issue, best fixed with the phase 2 type change.
  Separately, with Supabase configured, the page can switch from the founding
  layout to the reserve layout when the live count says all places are taken.
  I could not test that locally.
- **The book's timeline on a phone.** 9 stops on a 358px rail give about
  40×44 each. That is above WCAG's 24px minimum but under 44 wide. The
  `/samples` spread dots are 24×24 boxes with a 44px-tall hit area: 27 of
  them cannot all be 44 wide.
- **Colour contrast.** axe flags contrast on Home, How it works, Pricing and
  For families. Many of the flagged nodes are mid-animation (opacity reveals),
  but not all. It is phase 2 design work, and not fixed here.
- **www.** I did not confirm in the AWS console that www is an alternate name
  on the same distribution. I inferred it from both hosts serving identical
  bytes.
- **Old dead config.** `public/_redirects` and `vercel.json` are still
  generated. Neither host reads them. I left them in place.
- **Referral codes.** `/sign-up?ref=…` used to keep a referral code; it now
  goes to the app's create-account, which does not read `ref`. With
  `?next=/reserve` it still works on the site.
