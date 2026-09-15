import { getSupabase, isSupabaseConfigured } from './supabase';
import { CONTACT } from './contact';

/**
 * Turning someone who wants this into a row we can act on.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THIS REPLACED A `mailto:` LINK, which was the single most expensive thing
 * on the site. Every "Gift a story" button opened the visitor's email client
 * and asked them to compose a message — at the exact moment they had decided
 * to buy. Almost nobody does that. The demo above it can be the most moving
 * thing on the internet and it does not matter if the next click is Outlook.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * The destination already existed: `waitlist_signups`, created by the app's
 * supabase/waitlist.sql, whose own header says it "stores the leads captured
 * by the landing page /signup form". It grants anon INSERT and nothing else,
 * so a lead can be written from the browser and cannot be read, changed or
 * deleted from it.
 *
 * Three things this has to survive, because all three will happen:
 *
 *   The extra columns may not exist yet. supabase/lead-fields.sql adds
 *   gift_for, needed_by, note and source. Until somebody runs it, PostgREST
 *   rejects the insert with "column does not exist" — so the first attempt
 *   sends everything, and the retry sends the original four columns with the
 *   detail folded into the name fields' neighbour. No lead is ever lost to a
 *   migration nobody ran.
 *
 *   The same person will submit twice. The email column is UNIQUE, which is
 *   deliberate, and a duplicate is not a failure — it is the same human being
 *   asking again. Reported as success.
 *
 *   The environment may have no Supabase at all — a preview deploy, a fork, a
 *   missing env var. Then the caller gets `fallbackMailto` and the button
 *   still does something, rather than a dead form on the page that matters
 *   most.
 */

export type Lead = {
    firstName: string;
    lastName: string;
    /** Optional now — the form asks for a phone number instead. */
    email?: string;
    phone: string;
    /** Who the archive is for, in their words. */
    giftFor?: string;
    /** A date it has to be ready by, if there is one. */
    neededBy?: string;
    note?: string;
    /** Which page and button this came from. */
    source: string;
};

export type LeadResult =
    | { ok: true; alreadyKnown: boolean }
    | { ok: false; fallbackMailto: string; reason: 'unconfigured' | 'failed' };

/** Postgres unique_violation — the same person, asking again. */
const UNIQUE_VIOLATION = '23505';

/**
 * Strips a phone number down to something two submissions of the same number
 * agree on. "+1 (555) 123-4567" and "+1 555 123 4567" are one person, and the
 * unique constraint has to see them that way.
 */
export const normalizePhone = (value: string): string => {
    const trimmed = value.trim();
    const digits = trimmed.replace(/\D/g, '');
    return trimmed.startsWith('+') ? `+${digits}` : digits;
};

/** Loose on purpose: international formats vary more than any regex allows. */
export const looksLikePhone = (value: string) => value.replace(/\D/g, '').length >= 7;

/**
 * The form no longer asks for an email, but `waitlist_signups.email` is NOT
 * NULL and UNIQUE — that is the app's table and this site does not get to
 * redefine it.
 *
 * So a lead with no email gets a synthetic one derived from the phone number.
 * It uses the reserved `.invalid` TLD, which can never resolve to a real
 * mailbox, so nobody can mistake it for an address to write to. Two useful
 * things fall out of that: the insert satisfies NOT NULL without a migration,
 * and the UNIQUE constraint now dedupes on the phone number, which is exactly
 * what we want it to do.
 */
const syntheticEmail = (phone: string) => `no-email+${phone.replace(/\D/g, '')}@astoryapp.invalid`;

/**
 * PostgREST's codes for "that column isn't there".
 * 42703 is Postgres's own undefined_column; PGRST204 is the schema cache
 * saying the same thing before the query ever reaches the database.
 */
const MISSING_COLUMN = new Set(['42703', 'PGRST204']);

/** Everything the extra columns would have held, as one readable line. */
function foldedNote(lead: Lead): string {
    return [
        lead.giftFor && `For: ${lead.giftFor}`,
        lead.neededBy && `Needed by: ${lead.neededBy}`,
        lead.note && `Note: ${lead.note}`,
        `Source: ${lead.source}`,
    ]
        .filter(Boolean)
        .join(' · ');
}

export async function submitLead(lead: Lead): Promise<LeadResult> {
    const supabase = getSupabase();
    if (!supabase || !isSupabaseConfigured) {
        return { ok: false, fallbackMailto: CONTACT.gift, reason: 'unconfigured' };
    }

    /* Lowercased so the UNIQUE constraint behaves case-insensitively — the
       app's own client does the same, and the two have to agree or the same
       person lands twice. */
    const givenEmail = (lead.email ?? '').trim().toLowerCase();
    const core = {
        first_name: lead.firstName.trim(),
        last_name: lead.lastName.trim(),
        email: givenEmail || syntheticEmail(lead.phone),
        phone: normalizePhone(lead.phone),
    };

    const full = {
        ...core,
        gift_for: (lead.giftFor ?? '').trim(),
        needed_by: (lead.neededBy ?? '').trim(),
        note: (lead.note ?? '').trim(),
        source: lead.source,
    };

    const first = await supabase.from('waitlist_signups').insert(full);
    if (!first.error) return { ok: true, alreadyKnown: false };
    if (first.error.code === UNIQUE_VIOLATION) return { ok: true, alreadyKnown: true };

    if (MISSING_COLUMN.has(first.error.code ?? '')) {
        /* supabase/lead-fields.sql has not been run. Keep the lead rather than
           the schema: the detail goes into the phone-adjacent free text so it
           is still readable in the Dashboard. */
        const folded = await supabase
            .from('waitlist_signups')
            .insert({ ...core, phone: [core.phone, foldedNote(lead)].filter(Boolean).join(' — ') });

        if (!folded.error) return { ok: true, alreadyKnown: false };
        if (folded.error.code === UNIQUE_VIOLATION) return { ok: true, alreadyKnown: true };

        console.error('[leads] insert failed after column fallback:', folded.error);
        return { ok: false, fallbackMailto: CONTACT.gift, reason: 'failed' };
    }

    console.error('[leads] insert failed:', first.error);
    return { ok: false, fallbackMailto: CONTACT.gift, reason: 'failed' };
}

/** Enough to catch a typo, and nothing like enough to reject a real address. */
export const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
