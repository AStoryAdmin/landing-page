-- How many of the hundred Founding Family places are taken.
--
-- The website shows "37 of 100 founding places left" (src/lib/foundingCount.ts).
-- That number has to be true, so it is counted here rather than typed into
-- the site by hand, where it would go stale the first week nobody updated it.
--
-- A place is taken when an account carries user_metadata.founding_requested_at.
-- The site sets it in two ways (src/lib/auth.ts, markOffer):
--   - before payment is live: pressing "Request a founding place";
--   - after: arriving back from Stripe on /reserve?paid=founding, signed in.
-- Stripe's own payment count (the Payment Link is limited to 100) remains the
-- record of who paid. This is the public number; reconcile it by hand if the
-- two ever disagree.
--
-- SECURITY DEFINER so it can read auth.users, which anon cannot. It returns a
-- single integer and nothing else — no emails, no ids — so granting it to
-- anon exposes nothing but the count itself.
--
-- Run once in the Supabase SQL editor for the app's project.

create or replace function public.founding_places_taken()
returns integer
language sql
stable
security definer
set search_path = ''
as $$
  select count(*)::integer
  from auth.users
  where raw_user_meta_data ? 'founding_requested_at';
$$;

revoke all on function public.founding_places_taken() from public;
grant execute on function public.founding_places_taken() to anon, authenticated;
