-- How many Founding Family places are taken, per cohort.
--
-- The website shows "19 of 25 places left" for the week a family is choosing
-- (src/lib/foundingCount.ts). That number has to be true, so it is counted
-- here rather than typed into the site by hand, where it would go stale the
-- first week nobody updated it.
--
-- A place is taken when an account carries user_metadata.founding_requested_at.
-- The site sets it in two ways (src/lib/auth.ts, markOffer):
--   - before payment is live: pressing "Request a founding place";
--   - after: arriving back from Stripe on /reserve?paid=founding, signed in.
-- Alongside it, user_metadata.founding_cohort holds the week chosen (1, 2…),
-- when the browser still knew it. Accounts without one come back with a null
-- cohort; the site counts those against the first cohort.
--
-- Stripe's own payments remain the record of who paid, and for which week:
-- client_reference_id is `cohort2` or `cohort2_<account id>`. This is the
-- public number; reconcile it by hand if the two ever disagree.
--
-- SECURITY DEFINER so it can read auth.users, which anon cannot. It returns
-- cohort numbers and counts and nothing else — no emails, no ids — so
-- granting it to anon exposes nothing but the counts themselves.
--
-- This replaces founding_places_taken(), the single total from before there
-- were cohorts (2026-10-01). Run the whole file once in the Supabase SQL
-- editor for the app's project; running it again is harmless.

drop function if exists public.founding_places_taken();

create or replace function public.founding_places_by_cohort()
returns table (cohort integer, taken integer)
language sql
stable
security definer
set search_path = ''
as $$
  select
    case when raw_user_meta_data->>'founding_cohort' ~ '^[0-9]+$'
         then (raw_user_meta_data->>'founding_cohort')::integer
    end as cohort,
    count(*)::integer as taken
  from auth.users
  where raw_user_meta_data ? 'founding_requested_at'
  group by 1;
$$;

revoke all on function public.founding_places_by_cohort() from public;
grant execute on function public.founding_places_by_cohort() to anon, authenticated;
