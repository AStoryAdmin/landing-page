-- ============================================================================
-- A Story — checkout leads ($1 Reserve, $29 Founding Family)
-- Run this in the Supabase Dashboard → SQL Editor → New query → Run.
-- Safe to re-run: every statement is IF NOT EXISTS / idempotent.
-- ============================================================================
--
-- Since 2026-10-01 the site sells a place instead of collecting a waitlist.
-- The popup before Stripe (src/pages/site/CheckoutDetails.tsx) writes the
-- buyer's name, email and phone here BEFORE they pay, and
-- supabase/functions/landing-checkout-webhook fills in the payment AFTER
-- Stripe confirms it. One row per person, matched on email.
--
-- So the table answers, at a glance:
--   source = 'reserve:checkout', paid_at empty  → opened checkout, did not pay
--   paid_at set                                 → paid; offer + amount say what
--   source = 'reserve:stripe'                   → paid without the popup
--                                                 (signed in, or no script)
--
-- The site works whether or not this has been run. Without it, leads.ts
-- folds source and note into the phone column — which is what the rows that
-- read "7347259212 — Note: Name as given: …" are. Running this stops that.

-- ── The columns lead-fields.sql adds, in case it was never run ───────────────
alter table public.waitlist_signups
  add column if not exists gift_for   text default '',
  add column if not exists needed_by  text default '',
  add column if not exists note       text default '',
  -- Which button: 'reserve:checkout', 'founding:checkout', 'reserve:stripe'…
  add column if not exists source     text default '';

-- ── Filled in by the webhook, from Stripe ────────────────────────────────────
alter table public.waitlist_signups
  -- 'reserve' or 'founding'
  add column if not exists offer              text default '',
  -- The founding week's number, from client_reference_id ("cohort2_…")
  add column if not exists cohort             integer,
  add column if not exists paid_at            timestamptz,
  -- In dollars, e.g. 1.00 or 29.00 (2.00 for two reserved places)
  add column if not exists amount_paid        numeric(10, 2),
  add column if not exists currency           text default '',
  add column if not exists stripe_session_id  text,
  add column if not exists stripe_customer_id text;

-- One Stripe checkout can only ever be recorded once.
create unique index if not exists waitlist_signups_stripe_session_unique
  on public.waitlist_signups (stripe_session_id)
  where stripe_session_id is not null;

-- ── Nothing about RLS changes ────────────────────────────────────────────────
-- The browser still has anon INSERT and nothing else, so it cannot read a row
-- or mark one paid. Only the webhook can — it runs with the service_role key,
-- after checking Stripe's signature.
