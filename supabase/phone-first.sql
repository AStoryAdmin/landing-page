-- ============================================================================
-- A Story — phone-first leads
-- Run this in the Supabase Dashboard → SQL Editor → New query → Run.
-- Safe to re-run: every statement is idempotent.
-- ============================================================================
--
-- OPTIONAL. The site works without it.
--
-- The landing page form now asks for a name and a phone number, and offers
-- email as an optional third field. `waitlist_signups.email` is NOT NULL and
-- UNIQUE, so src/lib/leads.ts fills the gap by synthesising an address from
-- the phone number — `no-email+15551234567@astoryapp.invalid`, on the reserved
-- .invalid TLD so it can never be mistaken for somewhere to write to. That
-- satisfies NOT NULL, and it makes the UNIQUE constraint dedupe on the phone
-- number, which is the behaviour we actually want.
--
-- It works. It is just untidy: the email column fills up with placeholders.
-- This file makes the schema say what is really true instead.
--
-- Run it and leads.ts keeps working unchanged — a real email still goes in the
-- email column, and a lead without one still dedupes on phone, because the
-- synthetic address is deterministic either way.

-- ── Email is no longer required ──────────────────────────────────────────────
alter table public.waitlist_signups
  alter column email drop not null;

-- ── Dedupe on the phone number, which is now the thing we always have ────────
-- Partial, so the rows that predate this file (and any future lead that
-- somehow arrives without a number) do not collide with each other on ''.
create unique index if not exists waitlist_signups_phone_unique
  on public.waitlist_signups (phone)
  where phone is not null and phone <> '';

-- The email constraint stays. Two people with the same real address are still
-- one lead, and dropping it would let a genuine duplicate through.

-- ── Nothing about RLS changes ────────────────────────────────────────────────
-- supabase/waitlist.sql already grants anon INSERT and nothing else, so leads
-- still cannot be read, updated or deleted through the public API. Read them in
-- the Dashboard, or with the service_role key.
