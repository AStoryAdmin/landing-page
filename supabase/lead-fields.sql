-- ============================================================================
-- A Story — extra columns for landing-page leads
-- Run this in the Supabase Dashboard → SQL Editor → New query → Run.
-- Safe to re-run: every statement is IF NOT EXISTS / idempotent.
-- ============================================================================
--
-- The base table is `waitlist_signups`, created by phone-app-main's
-- supabase/waitlist.sql, which holds first_name, last_name, email and phone.
-- That was enough for a waitlist. It is not enough for a gift: fulfilment is
-- manual, and the two things whoever fulfils it needs on the first read are
-- WHO the story is for and WHETHER there is a date it has to be ready by.
--
-- These are all nullable with defaults, so the site works whether or not this
-- file has been run — src/lib/leads.ts sends the full payload, and on the
-- "column does not exist" error it retries with the original four columns and
-- folds the extra detail into the note. Running this simply stops that
-- second attempt from ever being needed.

alter table public.waitlist_signups
  -- Who the archive is for, in the buyer's words: "my mum", "Grandma Ruth,
  -- she's 91". Free text on purpose — a relationship dropdown gets the answer
  -- wrong for the half of families this is bought by.
  add column if not exists gift_for   text default '',
  -- A date it needs to be ready by, if there is one. Free text, because
  -- "before Christmas" and "her birthday, 14th" are both real answers and
  -- neither is a date picker.
  add column if not exists needed_by  text default '',
  -- Anything else they typed.
  add column if not exists note       text default '',
  -- Which page and which button this came from, so paid traffic can be told
  -- apart from the home page without a tracking cookie.
  add column if not exists source     text default '';

-- Nothing about RLS changes: supabase/waitlist.sql already grants anon INSERT
-- and nothing else, so leads still cannot be read, updated or deleted through
-- the public API. Read them in the Dashboard or with the service_role key.
