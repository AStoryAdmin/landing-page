# Publishing astoryapp.com

astoryapp.com is S3 + CloudFront. Once the one-time setup below is done,
**every push to `main` publishes the site by itself** (GitHub Actions,
`.github/workflows/publish.yml`) and checks the live result. Until then it is
published by hand with the procedure further down.

## 2026-10-18: what the founder does in AWS and DNS

**Why the live site answers 404 today.** Two things, both checked against
live on 18 October:

1. The last upload (15 October, 05:26 UTC) was the app shell only.
   `https://astoryapp.com/pricing/index.html` answers 404, so the page files
   are not on S3. Only `/` and `/samples/` are.
2. The CloudFront rewrite function is not attached. `/pricing` gets a 301 to
   `/pricing/` from S3 itself (`Server: AmazonS3`, `X-Cache: Miss`). With the
   function attached, CloudFront would ask S3 for `/pricing/index.html`
   directly and there would be no 301.

**What changed in this repo so it cannot happen the same way again.**
`npm run build` now builds every page (30 of them, plus a small file at each
old address). The shell-only build is called `build:shell`, so nobody uploads
it by mistake. Canonicals and the sitemap use the trailing-slash address
(`/pricing/`), which S3 answers with a 200 whether or not the function is
attached. Invitation links, `/c/` links, sign-in and www are handled by a
script inside every page, so they work before anything below is done.

**What only the founder can do.** In this order. Steps 1 and 2 are the ones
that matter; 3 and 4 make it tidy.

1. **Turn on automatic publishing.** The publish workflow has been skipped on
   every push because the repository variable `AWS_ROLE_ARN` is not set. Do
   the one-time setup in the next section: the identity provider, the
   `astoryapp-publish` role and its policy, then six repository variables
   (`AWS_ROLE_ARN`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`, `AWS_REGION`,
   `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`). Then *Actions* →
   *Publish astoryapp.com* → *Run workflow*. Green means every page is
   uploaded and `verify:live` passed. If you would rather publish by hand
   once first, follow "Every publish" below.
2. **Attach the CloudFront function.** CloudFront → *Functions*. If a
   function from `deploy/cloudfront-index-rewrite.js` already exists, open
   it; otherwise *Create function*, runtime `cloudfront-js-2.0`. Paste all of
   `deploy/cloudfront-viewer-request.js` (it replaces the old file), *Save*,
   *Publish*. Then the distribution → *Behaviors* → the default behavior →
   *Edit* → *Function associations* → *Viewer request* → CloudFront
   Functions → this function → *Save changes*. Leave the existing 403/404
   error responses (they serve `/index.html`) as they are.
   Check: `curl -sI https://astoryapp.com/pricing` answers 200, not 301, and
   `curl -sI "https://astoryapp.com/join/ABC123"` answers 302 with
   `location: https://app.astoryapp.com/join/ABC123`.
3. **www → astoryapp.com.** www.astoryapp.com answers today with the same
   page, so it reaches this distribution. Once step 2 is done, the function
   answers www with a 301 to the bare domain. Check:
   `curl -sI https://www.astoryapp.com/pricing` gives
   `location: https://astoryapp.com/pricing`. If it does not (www is on a
   different distribution or bucket), add a Cloudflare Redirect Rule instead:
   host equals `www.astoryapp.com` → static redirect to
   `https://astoryapp.com` with the path and query kept, 301. That rule only
   runs if the `www` DNS record is proxied (orange cloud).
4. **Check.** `npm run verify:live` from any checkout. It must end
   "https://astoryapp.com is good."

Not AWS, but it finishes the invitation fix: in Supabase → Edge Functions →
Secrets, set `INVITE_JOIN_URL=https://app.astoryapp.com`, so new invitation
emails link straight to the web app's join page instead of
`astoryapp.com/?ref=`. The site now forwards the old links either way.

## Automatic publishing — one-time setup (AWS account owner, ~15 minutes)

The workflow signs in to AWS with a role GitHub is allowed to use for this one
repository's `main` branch — no access keys stored anywhere.

1. **Let GitHub sign in.** AWS → IAM → *Identity providers* → *Add provider* →
   OpenID Connect. Provider URL `https://token.actions.githubusercontent.com`,
   audience `sts.amazonaws.com`. (Skip if it already exists.)
2. **The role.** IAM → *Roles* → *Create role* → *Web identity* → that
   provider, audience `sts.amazonaws.com`, GitHub organization `AStoryAdmin`,
   repository `landing-page`, branch `main`. Name it `astoryapp-publish`.
3. **What it may do** — add this inline policy, with the real bucket name and
   distribution ID:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       { "Effect": "Allow", "Action": "s3:ListBucket",
         "Resource": "arn:aws:s3:::BUCKET" },
       { "Effect": "Allow", "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
         "Resource": "arn:aws:s3:::BUCKET/*" },
       { "Effect": "Allow", "Action": ["cloudfront:CreateInvalidation", "cloudfront:GetInvalidation"],
         "Resource": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID" }
     ]
   }
   ```
4. **Tell GitHub where to publish.** github.com/AStoryAdmin/landing-page →
   *Settings* → *Secrets and variables* → *Actions* → **Variables** tab →
   *New repository variable*, one for each:

   | Variable | Value |
   |---|---|
   | `AWS_ROLE_ARN` | the role's ARN, `arn:aws:iam::…:role/astoryapp-publish` |
   | `S3_BUCKET` | the bucket name |
   | `CLOUDFRONT_DISTRIBUTION_ID` | the distribution ID (`E…`) |
   | `AWS_REGION` | the bucket's region (default `us-east-1`) |
   | `VITE_SUPABASE_URL` | the app's Supabase URL |
   | `VITE_SUPABASE_ANON_KEY` | the app's public anon key |

   The Supabase values are public keys that ship in the browser anyway, so
   variables, not secrets, are right for them.
5. **The CloudFront rule** in "Once: the CloudFront rule" below, if not done.
6. **First run.** *Actions* → *Publish astoryapp.com* → *Run workflow*. Green
   means the live site matches `main` and passed `verify:live`. From then on,
   every push to `main` does the same.

While `AWS_ROLE_ARN` is unset the workflow is skipped (grey), not failed.

## By hand

Only needed before the setup above, or if GitHub Actions is down.

## Why this document exists

Two things went wrong in the last week of September 2026, and both were silent:

1. **A publish from a stale checkout.** On 2026-09-29 a publish uploaded files
   from before the latest merge and overwrote 22 of them, which took `/reserve`
   off the live site. Step 1 below prevents it.
2. **Only the app shell was uploaded.** The live site served a 4 KB
   `index.html` for every address with a **404 status**. Pages still drew in a
   browser, so nobody noticed, but Google, link previews and Apple's check of
   the privacy-policy URL all saw "404 Not Found". Steps 3 and 5 prevent it.

## Once: the CloudFront rule

`npm run build` writes each page as `dist/<page>/index.html`. S3 only
finds exact file names, so CloudFront has to add the `index.html`. Since
2026-10-18 the same function also sends invitation links, `/c/` links, the
old sign-in pages and www on to the right place (its header lists them):

1. CloudFront → **Functions** → *Create function*, runtime `cloudfront-js-2.0`
   (or open the existing one).
2. Paste `deploy/cloudfront-viewer-request.js`, **Save**, **Publish**.
3. Distribution → **Behaviors** → default behavior → *Function associations* →
   **Viewer request** → this function. Save.

Leave the existing 403/404 error response (which serves `/index.html`) in
place: it still catches addresses that have no prebuilt page, like `/p/<slug>`
and `/l`, and lets the app draw them.

## Every publish

1. **Start from main, up to date.**
   ```sh
   git checkout main && git pull
   git status            # must be clean
   ```
2. **Build settings.** The build must have these, or sign-up, sign-in and the
   founding counts do nothing (they are public keys, safe in the browser):
   ```
   VITE_SUPABASE_URL=https://<project>.supabase.co
   VITE_SUPABASE_ANON_KEY=<anon key>
   ```
   Put them in `.env.production` (not committed) or the shell.
3. **Build the whole site.**
   ```sh
   npm ci
   npx playwright install chromium   # once per computer: the prerender uses it
   npm run build
   ```
   It ends with "30 routes and 6 old addresses written to dist/". Since
   2026-10-18 `npm run build` is the whole site (`build:static` is the same
   thing, kept for the workflow). `npm run build:shell` makes only the app
   shell; never upload that, it is what broke the site twice.
4. **Upload all of `dist/`**, replacing what is there:
   ```sh
   aws s3 sync dist/ s3://<bucket>/ --delete \
     --cache-control "public, max-age=0, must-revalidate" --exclude "assets/*"
   aws s3 sync dist/assets/ s3://<bucket>/assets/ \
     --cache-control "public, max-age=31536000, immutable"
   ```
   Hashed files in `assets/` never change, so they cache forever; pages must
   not, or a fix waits for every browser's cache to expire.
5. **Clear CloudFront and check.**
   ```sh
   aws cloudfront create-invalidation --distribution-id <id> --paths "/*"
   npm run verify:live
   ```
   `verify:live` checks every page answers 200 with its prebuilt HTML, that
   the waitlist is gone, and that the build has its Supabase settings. It
   exits non-zero on any problem. Do not call a publish done until it says
   "astoryapp.com is good."

## app.astoryapp.com — the family-call page

Since October app.astoryapp.com is the web app (Cloudflare Pages, repo
`AStoryAdmin/web-app`). The phone app still sends family-call invitations as
`https://app.astoryapp.com/?join=…` (its `EXPO_PUBLIC_JOIN_URL`), and the web
app has no `?join=` page: on 18 October it sent such a link to its sign-in
form. The guest call needs a home of its own, either a `?join=` route in the
web app or the phone app's web build on its own host, as below, with
`EXPO_PUBLIC_JOIN_URL` pointed at it:

1. In the app repo: `npx expo export -p web` (with the app's `EXPO_PUBLIC_*`
   settings) → `dist/`.
2. A second S3 bucket + CloudFront distribution for `app.astoryapp.com`, with
   403/404 → `/index.html`, **status 200** (the page is one screen that reads
   `?join=` from the address).
3. DNS: `app.astoryapp.com` → that distribution; certificate in ACM
   (us-east-1).
4. Check: open a family-call link from the app on a phone that does not have
   the app.
