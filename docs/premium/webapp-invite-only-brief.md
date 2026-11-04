# Web app brief: create-account becomes invite-only

For the phone-app session (repo `C:\Users\nguye\Desktop\phone app\phone-app`, the `web-app/` package). Written 2026-11-03 by website Builder B for plan task 5 of `docs/plans/2026-11-04-phone-first-overnight.md`. This site repo did not touch the web app. Everything below is a request. The phone-app session checks it against the real code and decides.

## Why

Tonight the website went phone-first. Its one action is now **Get the iPhone app**, which goes to `astoryapp.com/get-the-app` (lib/app.ts START_*; plan :13). The web app stays live, but only as the family's side: join links, reading and adding, the book, and existing accounts (plan :5, :14). The site no longer links strangers to `app.astoryapp.com/create-account`. Strangers still reach it in three ways:

1. They type or bookmark `app.astoryapp.com/create-account`.
2. Old links to `astoryapp.com/sign-up`, `/signup` or `/start`. The site's inline script still sends these to create-account before the page paints (`index.html:80`, `:87`, `:89`), and so does the edge (`deploy/cloudfront-viewer-request.js:17-19`, `:99`). Changing those is the site chief's call (CHIEF-LOG request "Phone-first B-1"). This brief assumes they keep pointing at create-account, so the web app is the one place the rule is enforced.
3. Old emails and ads.

## What should change

**`/create-account` opens only with a family behind it.** It accepts one of:

| Way in | Today's address (lib/app.ts:8-10, :17-18) | Rule |
|---|---|---|
| Family code | `/join/:code`, `/?ref=CODE` (six letters or digits, `lib/app.ts:27`) | The code must belong to an existing family. Then account creation goes on as it does today. |
| Invite link | `/join/:code` from a share or invite link, `/c/:slug` | Same as the code. The link carries the family. |
| An invite from the iPhone beta | (new: a token in the invite email, if the app sends one) | Optional. Only if the phone app already mails beta invites. Otherwise the code is enough. |

Without one of these, `/create-account` does not show the form.

**What a stranger sees instead** (copy for the web app, sourced from the site):

> **A Story starts on iPhone.**
> A Story calls your parent in its iPhone app, which is in a private beta. Ask for an invite, and we help you set it up.
> [Get the iPhone app] → `https://astoryapp.com/get-the-app`
> Joining your family? Enter the six-letter code they sent. [code box → `/join/CODE`]
> Already have an account? [Sign in]

Sources: "Today the calls ring in the A Story iPhone app, in a private beta" (site `src/lib/today.ts:13`). "we help you set it up" (site `src/pages/site/faqData.ts:74`). The six-letter code (site `lib/app.ts:27`). The title is the site's create-account fallback title (site `src/pages/site/AppDoor.tsx`, WORDS["create-account"]).

**`?for=someone`** (the old gift-buyer context; `index.html:80`, AppDoor.tsx `destination`). For a stranger it now shows the same page. Leave out the "You're setting this up for someone you love" variant (panel-r3 item 11). That change is moot for strangers.

## What must not break

Check each one before shipping. Test against a staging Supabase, never production rows.

1. **Join by code.** `/join/ABC123` and `/?ref=ABC123` still open the family and let a relative add, with or without an account. The site's routing test (`npm run test:routing`, `qa/routing/cloudfront.test.mjs`) pins the site side of these addresses. The web-app side needs its own test.
2. **Contribute links.** `/c/:slug` still works with no account ("One link, no account", site faqData.ts:44).
3. **Share and public links.** Public-story and contribution links the family has turned on keep working (faqData.ts:36).
4. **Existing accounts.** Sign in (`/sign-in`) is unchanged. Password reset, magic links and email confirmation for existing users are unchanged. The site's header keeps **Sign in** (`lib/nav.ts:94`).
5. **Book orders.** The book checkout (`create-book-checkout`, named in site `src/lib/checkout.ts:30`) and the PDF print-at-home path still work for any signed-in family member.
6. **Paid plans and purchases.** The site's `/thanks` page tells a buyer to "sign up in the app with the same email you paid with" (site `src/pages/site/Thanks.tsx:96`). If a Stripe purchase can happen without a family (Payment Links, `checkout.ts`; not live today, `checkout.ts:6-9`), then **a paid email must count as an invite**. Otherwise that buyer is locked out. Today no link is live, so this is a guard for later.
7. **Free tier for families.** People who come in through a family keep the Free tier as it is (`lib/pricing.ts` FREE_TIER, mirrored from the app's PricingScreen). Invite-only changes who can create an account, not what an account gets.
8. **iPhone app sign-up.** The iPhone app's own onboarding (TestFlight beta) still creates accounts. If it calls the same Supabase auth, put the invite rule in the web UI and its RPC, not in a database trigger that would also block the iPhone app.
9. **The site's reservation sign-up** (`astoryapp.com/sign-up?next=/reserve`, site `src/pages/site/account/SignUp.tsx`). The site's own Supabase sign-up for old reservation holders. `/reserve` now redirects to `/pricing` (`src/App.tsx` legacy map), so new traffic is close to zero. Decide whether it stays.

## Done when (suggested acceptance for the phone-app session)

- A logged-out visit to `/create-account` with no code or link shows the stranger page above, and its button goes to `https://astoryapp.com/get-the-app`.
- `/join/<valid code>` → create account → lands in that family, as today.
- `/join/<invalid code>` shows "A family code is six letters or digits" or the app's equivalent, not the form.
- `/c/<slug>`, sign in and book checkout each pass a manual or Playwright check on staging.
- No change to Supabase RLS that the iPhone app depends on.

## Not in this brief

Android, iPad, launch dates, prices, and any change to how the calls work. None of these is decided (plan "Not doing").
