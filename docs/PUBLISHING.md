# Publishing astoryapp.com

astoryapp.com is S3 + CloudFront. Once the one-time setup below is done,
**every push to `main` publishes the site by itself** (GitHub Actions,
`.github/workflows/publish.yml`) and checks the live result. Until then it is
published by hand with the procedure further down.

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

`npm run build:static` writes each page as `dist/<page>/index.html`. S3 only
finds exact file names, so CloudFront has to add the `index.html`:

1. CloudFront → **Functions** → *Create function*, runtime `cloudfront-js-2.0`.
2. Paste `deploy/cloudfront-index-rewrite.js`, **Publish**.
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
3. **Build the whole site — `build:static`, not `build`.**
   ```sh
   npm ci
   npm run build:static
   ```
   It ends with "22 routes written to dist/". `npm run build` alone makes only
   the shell; uploading that is what broke the site.
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

The app sends family-call invitations as `https://app.astoryapp.com/?join=…`
(its `EXPO_PUBLIC_JOIN_URL`). That address does not exist yet, so a
grandparent tapping the link gets nothing. It needs the app's web build on its
own small host:

1. In the app repo: `npx expo export -p web` (with the app's `EXPO_PUBLIC_*`
   settings) → `dist/`.
2. A second S3 bucket + CloudFront distribution for `app.astoryapp.com`, with
   403/404 → `/index.html`, **status 200** (the page is one screen that reads
   `?join=` from the address).
3. DNS: `app.astoryapp.com` → that distribution; certificate in ACM
   (us-east-1).
4. Check: open a family-call link from the app on a phone that does not have
   the app.
