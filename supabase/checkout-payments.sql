-- ============================================================================
-- A Story — one row per website payment, refunds, and a true founding count
-- Run this in the Supabase Dashboard → SQL Editor → New query → Run.
-- Safe to re-run. Run checkout-leads.sql first (it adds the summary columns).
-- ============================================================================
--
-- Why this exists. The first landing-checkout-webhook kept one payment per
-- person on waitlist_signups. On 2026-10-08 a family paid $29 and then $1 with
-- the same email, and the $1 overwrote the $29. It also never heard about
-- refunds, and the founding count on /reserve only counted signed-in accounts,
-- so a $29 paid by somebody who never made an account took no place.
--
-- Now:
--   waitlist_payments   one row per completed Stripe checkout, never replaced;
--                       a refund fills refunded_amount / refunded_at.
--   waitlist_signups    a SUMMARY per person, recomputed on every payment and
--                       refund: offer 'founding' if any live $29, else
--                       'reserve' ('refunded' if everything was refunded),
--                       amount_paid the total kept, paid_at the first payment.
--   founding_places_by_cohort()
--                       counts accounts that requested a place AND unrefunded
--                       $29 payments, once per email.
--
-- `email` here is what Stripe received. With Apple Pay, Google Pay or Link it
-- can differ from what was typed in the popup; `name` is the wallet's
-- cardholder name, which helps tell who is who.

-- ── Payments ────────────────────────────────────────────────────────────────
create table if not exists public.waitlist_payments (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  paid_at               timestamptz not null,
  email                 text not null,
  name                  text default '',
  offer                 text not null,            -- 'reserve' | 'founding'
  amount                numeric(10, 2) not null,
  currency              text default '',
  cohort                integer,                  -- founding week, from client_reference_id
  stripe_session_id     text not null unique,     -- a checkout is recorded once
  stripe_payment_intent text,                     -- how a refund finds its payment
  stripe_customer_id    text,
  client_reference_id   text default '',
  refunded_amount       numeric(10, 2) not null default 0,
  refunded_at           timestamptz               -- set when fully refunded
);

create index if not exists waitlist_payments_email on public.waitlist_payments (email);
create index if not exists waitlist_payments_intent on public.waitlist_payments (stripe_payment_intent);

-- RLS on with no policies: the browser can neither read nor write it. Only
-- the webhook can, with the server key, after checking Stripe's signature.
alter table public.waitlist_payments enable row level security;

-- ── The founding count on /reserve ──────────────────────────────────────────
-- Same signature and return shape as before, so the site needs no change.
-- A family is counted once: by email, preferring the week on their payment.
-- SECURITY DEFINER to read auth.users and waitlist_payments; it returns cohort
-- numbers and counts only — no emails, no ids.
create or replace function public.founding_places_by_cohort()
returns table (cohort integer, taken integer)
language sql
stable
security definer
set search_path = ''
as $$
  with accounts as (
    select
      lower(email) as email,
      case when raw_user_meta_data->>'founding_cohort' ~ '^[0-9]+$'
           then (raw_user_meta_data->>'founding_cohort')::integer
      end as cohort
    from auth.users
    where raw_user_meta_data ? 'founding_requested_at'
  ),
  paid as (
    select distinct on (email) email, cohort
    from public.waitlist_payments
    where offer = 'founding' and refunded_at is null
    order by email, paid_at desc
  ),
  families as (
    select coalesce(p.cohort, a.cohort) as cohort
    from paid p
    full outer join accounts a on a.email = p.email
  )
  select cohort, count(*)::integer as taken
  from families
  group by 1;
$$;

revoke all on function public.founding_places_by_cohort() from public;
grant execute on function public.founding_places_by_cohort() to anon, authenticated;
